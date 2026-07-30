begin;

lock table public.submissions in share row exclusive mode;

alter table public.submissions
  add column if not exists review_revision integer;

update public.submissions
set review_revision = case
  when jsonb_typeof(review_log) = 'array' then jsonb_array_length(review_log)
  else 0
end
where review_revision is null;

alter table public.submissions
  alter column review_revision set default 0,
  alter column review_revision set not null;

do $$
begin
  if exists (
    select 1 from public.submissions
    where version is null or version < 1
  ) then
    raise exception 'Cannot enable atomic submission versions: invalid versions exist.';
  end if;

  if exists (
    select 1 from public.submissions
    group by user_id, project_id, version
    having count(*) > 1
  ) then
    raise exception 'Cannot enable atomic submission versions: duplicate learner/project versions exist.';
  end if;

  if exists (
    select 1 from public.submissions
    group by user_id, project_id
    having count(distinct root_id) > 1
  ) then
    raise exception 'Cannot enable atomic submission versions: forked project roots exist.';
  end if;
end;
$$;

alter table public.submissions
  drop constraint if exists submissions_version_positive_check,
  drop constraint if exists submissions_review_revision_nonnegative_check;

alter table public.submissions
  add constraint submissions_version_positive_check check (version > 0),
  add constraint submissions_review_revision_nonnegative_check check (review_revision >= 0);

create unique index if not exists submissions_user_project_version_uidx
  on public.submissions (user_id, project_id, version);

create index if not exists submissions_user_project_latest_idx
  on public.submissions (user_id, project_id, version desc);

create index if not exists issued_certificates_user_issued_idx
  on public.issued_certificates (user_id, issued_at desc);

create or replace function public.create_submission_atomic(
  p_id text,
  p_user_id text,
  p_project_id text,
  p_title text,
  p_description text,
  p_url text,
  p_repository_url text,
  p_archive_url text,
  p_screenshots jsonb,
  p_deliverables jsonb,
  p_self_assessment text,
  p_visibility text
)
returns setof public.submissions
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_previous public.submissions%rowtype;
  v_created public.submissions%rowtype;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id || chr(31) || p_project_id, 0));

  select * into v_previous
  from public.submissions
  where user_id = p_user_id and project_id = p_project_id
  order by version desc, created_at desc, id desc
  limit 1
  for update;

  if found and v_previous.status not in ('changes_requested', 'approved') then
    raise exception using
      errcode = 'PT001',
      message = 'SUBMISSION_ALREADY_ACTIVE',
      detail = jsonb_build_object('submissionId', v_previous.id, 'version', v_previous.version, 'status', v_previous.status)::text;
  end if;

  insert into public.submissions (
    id, root_id, supersedes_id, version, user_id, project_id, title, description,
    url, repository_url, archive_url, screenshots, deliverables, self_assessment,
    visibility, status, rubric, contextual_comments, review_log, review_revision,
    created_at, updated_at
  ) values (
    p_id,
    case when v_previous.id is null then p_id else coalesce(v_previous.root_id, v_previous.id) end,
    v_previous.id,
    coalesce(v_previous.version, 0) + 1,
    p_user_id, p_project_id, p_title, coalesce(p_description, ''), coalesce(p_url, ''),
    coalesce(p_repository_url, ''), coalesce(p_archive_url, ''), coalesce(p_screenshots, '[]'::jsonb),
    coalesce(p_deliverables, '[]'::jsonb), coalesce(p_self_assessment, ''), coalesce(p_visibility, 'private'),
    'submitted', '{}'::jsonb, '{}'::jsonb, '[]'::jsonb, 0, now(), now()
  ) returning * into v_created;

  return next v_created;
exception
  when unique_violation then
    raise exception using errcode = 'PT006', message = 'SUBMISSION_VERSION_CONFLICT';
end;
$$;

create or replace function public.review_submission_atomic(
  p_id text,
  p_expected_version integer,
  p_expected_review_revision integer,
  p_status text,
  p_feedback text,
  p_reviewer text,
  p_score numeric,
  p_rubric jsonb,
  p_contextual_comments jsonb
)
returns setof public.submissions
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_user_id text;
  v_project_id text;
  v_current public.submissions%rowtype;
  v_updated public.submissions%rowtype;
  v_latest_version integer;
  v_entry jsonb;
  v_review_log jsonb;
  v_reviewed_at timestamptz := now();
begin
  select user_id, project_id into v_user_id, v_project_id
  from public.submissions where id = p_id;
  if not found then
    raise exception using errcode = 'PT002', message = 'SUBMISSION_NOT_FOUND';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id || chr(31) || v_project_id, 0));
  select * into v_current from public.submissions where id = p_id for update;
  if not found then
    raise exception using errcode = 'PT002', message = 'SUBMISSION_NOT_FOUND';
  end if;

  if p_expected_version is not null and p_expected_version <> v_current.version then
    raise exception using errcode = 'PT006', message = 'SUBMISSION_VERSION_CONFLICT';
  end if;
  if p_expected_review_revision is null or p_expected_review_revision <> v_current.review_revision then
    raise exception using
      errcode = 'PT003',
      message = 'SUBMISSION_REVIEW_REVISION_CONFLICT',
      detail = jsonb_build_object('expectedReviewRevision', p_expected_review_revision, 'currentReviewRevision', v_current.review_revision)::text;
  end if;
  if p_status not in ('in_review', 'approved', 'changes_requested') then
    raise exception using errcode = '22023', message = 'Invalid review status';
  end if;
  if p_status = 'approved' and p_score is null then
    raise exception using errcode = 'PT005', message = 'REVIEW_SCORE_REQUIRED';
  end if;

  select max(version) into v_latest_version
  from public.submissions
  where user_id = v_current.user_id and project_id = v_current.project_id;
  if p_status = 'approved' and v_current.version < v_latest_version then
    raise exception using errcode = 'PT004', message = 'SUBMISSION_SUPERSEDED';
  end if;

  v_entry := jsonb_build_object(
    'status', p_status,
    'feedback', coalesce(p_feedback, ''),
    'reviewer', coalesce(p_reviewer, 'PulsaTeach reviewer'),
    'score', p_score,
    'rubric', coalesce(p_rubric, '{}'::jsonb),
    'contextualComments', coalesce(p_contextual_comments, '{}'::jsonb),
    'at', v_reviewed_at
  );

  select coalesce(jsonb_agg(entry.value order by entry.position), '[]'::jsonb)
  into v_review_log
  from jsonb_array_elements(
    jsonb_build_array(v_entry) || case when jsonb_typeof(v_current.review_log) = 'array' then v_current.review_log else '[]'::jsonb end
  ) with ordinality as entry(value, position)
  where entry.position <= 100;

  update public.submissions set
    status = p_status,
    feedback = coalesce(p_feedback, ''),
    reviewer = coalesce(p_reviewer, 'PulsaTeach reviewer'),
    score = p_score,
    rubric = coalesce(p_rubric, '{}'::jsonb),
    contextual_comments = coalesce(p_contextual_comments, '{}'::jsonb),
    review_log = v_review_log,
    review_revision = review_revision + 1,
    reviewed_at = v_reviewed_at,
    updated_at = v_reviewed_at
  where id = p_id and review_revision = p_expected_review_revision
  returning * into v_updated;

  if not found then
    raise exception using errcode = 'PT003', message = 'SUBMISSION_REVIEW_REVISION_CONFLICT';
  end if;
  return next v_updated;
end;
$$;

revoke execute on function public.create_submission_atomic(text, text, text, text, text, text, text, text, jsonb, jsonb, text, text) from public, anon, authenticated;
revoke execute on function public.review_submission_atomic(text, integer, integer, text, text, text, numeric, jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.create_submission_atomic(text, text, text, text, text, text, text, text, jsonb, jsonb, text, text) to service_role;
grant execute on function public.review_submission_atomic(text, integer, integer, text, text, text, numeric, jsonb, jsonb) to service_role;

notify pgrst, 'reload schema';

commit;
