begin;

create or replace function public.issue_certificate_atomic(
  p_id uuid,
  p_verification_code text,
  p_user_id text,
  p_certificate_id text,
  p_certificate_version integer,
  p_learner_name text,
  p_title jsonb,
  p_evidence jsonb,
  p_required_exams jsonb,
  p_required_projects jsonb,
  p_issued_at timestamptz
)
returns jsonb
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_existing public.issued_certificates%rowtype;
  v_created public.issued_certificates%rowtype;
  v_session public.quiz_sessions%rowtype;
  v_submission public.submissions%rowtype;
  v_requirement jsonb;
  v_requirement_found boolean;
  v_qualified_score jsonb;
  v_qualified_at text;
  v_qualified_version text;
  v_exam_ids jsonb := '[]'::jsonb;
  v_exam_versions jsonb := '{}'::jsonb;
  v_exam_scores jsonb := '[]'::jsonb;
  v_project_evidence jsonb := '[]'::jsonb;
  v_evidence jsonb;
begin
  if jsonb_typeof(coalesce(p_evidence, '{}'::jsonb)) <> 'object'
    or jsonb_typeof(coalesce(p_required_exams, '[]'::jsonb)) <> 'array'
    or jsonb_typeof(coalesce(p_required_projects, '[]'::jsonb)) <> 'array' then
    raise exception using errcode = 'PT009', message = 'CERTIFICATE_REQUIREMENTS_INCOMPLETE';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id || chr(31) || p_certificate_id, 0));

  select * into v_existing from public.issued_certificates
  where user_id = p_user_id and certificate_id = p_certificate_id
  for update;
  if found then
    if v_existing.revoked_at is not null then
      raise exception using errcode = 'PT008', message = 'CERTIFICATE_REVOKED';
    end if;
    return jsonb_build_object('created', false, 'certificate', to_jsonb(v_existing));
  end if;

  for v_requirement in select value from jsonb_array_elements(coalesce(p_required_exams, '[]'::jsonb))
  loop
    if jsonb_typeof(v_requirement) <> 'object'
      or nullif(v_requirement->>'quizId', '') is null
      or nullif(v_requirement->>'questionSetVersion', '') is null then
      raise exception using errcode = 'PT009', message = 'CERTIFICATE_REQUIREMENTS_INCOMPLETE';
    end if;
    select * into v_session from public.quiz_sessions
    where user_id = p_user_id and quiz_id = v_requirement->>'quizId'
    for update;
    v_requirement_found := found;
    v_qualified_score := case
      when coalesce((v_session.payload->'bestScore'->>'passed')::boolean, false) then v_session.payload->'bestScore'
      else v_session.score
    end;
    v_qualified_at := coalesce(v_session.payload->>'qualifiedAt', v_session.payload->>'gradedAt');
    v_qualified_version := coalesce(v_session.payload->>'qualifiedQuestionSetVersion', v_session.payload->>'questionSetVersion');
    if not v_requirement_found
      or v_session.status is distinct from 'completed'
      or coalesce((v_session.payload->>'gradingVersion')::integer, 0) <> 1
      or v_qualified_version is distinct from v_requirement->>'questionSetVersion'
      or not coalesce((v_qualified_score->>'passed')::boolean, false)
      or jsonb_typeof(v_qualified_score->'percent') is distinct from 'number'
      or v_qualified_at is null then
      raise exception using
        errcode = 'PT009',
        message = 'CERTIFICATE_REQUIREMENTS_INCOMPLETE',
        detail = jsonb_build_object('kind', 'exam', 'quizId', v_requirement->>'quizId')::text;
    end if;
    v_exam_ids := v_exam_ids || jsonb_build_array(v_requirement->>'quizId');
    v_exam_versions := v_exam_versions || jsonb_build_object(v_requirement->>'quizId', v_qualified_version);
    v_exam_scores := v_exam_scores || jsonb_build_array(jsonb_build_object(
      'quizId', v_requirement->>'quizId',
      'percent', (v_qualified_score->>'percent')::numeric,
      'gradedAt', v_qualified_at
    ));
  end loop;

  for v_requirement in select value from jsonb_array_elements(coalesce(p_required_projects, '[]'::jsonb))
  loop
    if jsonb_typeof(v_requirement) <> 'object'
      or nullif(v_requirement->>'projectId', '') is null
      or nullif(v_requirement->>'sourceProjectId', '') is null
      or nullif(v_requirement->>'submissionId', '') is null
      or jsonb_typeof(v_requirement->'version') is distinct from 'number'
      or jsonb_typeof(v_requirement->'minimumScore') is distinct from 'number' then
      raise exception using errcode = 'PT009', message = 'CERTIFICATE_REQUIREMENTS_INCOMPLETE';
    end if;
    select * into v_submission from public.submissions
    where id = v_requirement->>'submissionId' and user_id = p_user_id
    for update;
    v_requirement_found := found;
    if not v_requirement_found
      or v_submission.status is distinct from 'approved'
      or v_submission.project_id is distinct from v_requirement->>'sourceProjectId'
      or v_submission.version is distinct from (v_requirement->>'version')::integer
      or coalesce(v_submission.score, 0) < (v_requirement->>'minimumScore')::numeric then
      raise exception using
        errcode = 'PT009',
        message = 'CERTIFICATE_REQUIREMENTS_INCOMPLETE',
        detail = jsonb_build_object('kind', 'project', 'projectId', v_requirement->>'projectId')::text;
    end if;
    v_project_evidence := v_project_evidence || jsonb_build_array(jsonb_build_object(
      'projectId', v_requirement->>'projectId',
      'sourceProjectId', v_submission.project_id,
      'submissionId', v_submission.id,
      'version', v_submission.version,
      'score', v_submission.score,
      'minimumScore', (v_requirement->>'minimumScore')::numeric
    ));
  end loop;

  v_evidence := coalesce(p_evidence, '{}'::jsonb) || jsonb_build_object(
    'exams', (coalesce(p_evidence->'exams', '{}'::jsonb) - 'completed' - 'required' - 'versions' - 'scores') || jsonb_build_object(
      'completed', v_exam_ids,
      'required', v_exam_ids,
      'versions', v_exam_versions,
      'scores', v_exam_scores
    ),
    'projects', v_project_evidence
  );

  insert into public.issued_certificates (
    id, verification_code, user_id, certificate_id, certificate_version,
    learner_name, title, evidence, issued_at, expires_at, revoked_at, revocation_reason
  ) values (
    p_id, p_verification_code, p_user_id, p_certificate_id, coalesce(p_certificate_version, 1),
    p_learner_name, p_title, v_evidence, coalesce(p_issued_at, now()),
    null, null, null
  ) returning * into v_created;

  return jsonb_build_object('created', true, 'certificate', to_jsonb(v_created));
exception
  when unique_violation then
    select * into v_existing from public.issued_certificates
    where user_id = p_user_id and certificate_id = p_certificate_id;
    if v_existing.id is null then raise; end if;
    if v_existing.revoked_at is not null then
      raise exception using errcode = 'PT008', message = 'CERTIFICATE_REVOKED';
    end if;
    return jsonb_build_object('created', false, 'certificate', to_jsonb(v_existing));
end;
$$;

revoke execute on function public.issue_certificate_atomic(uuid, text, text, text, integer, text, jsonb, jsonb, jsonb, jsonb, timestamptz) from public, anon, authenticated;
grant execute on function public.issue_certificate_atomic(uuid, text, text, text, integer, text, jsonb, jsonb, jsonb, jsonb, timestamptz) to service_role;

notify pgrst, 'reload schema';
commit;
