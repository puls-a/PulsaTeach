begin;

create or replace function public.save_quiz_draft_atomic(
  p_id text,
  p_user_id text,
  p_quiz_id text,
  p_current_index integer,
  p_responses jsonb,
  p_rationales jsonb
)
returns setof public.quiz_sessions
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_current public.quiz_sessions%rowtype;
  v_saved public.quiz_sessions%rowtype;
  v_draft jsonb := jsonb_build_object(
    'currentIndex', coalesce(p_current_index, 0),
    'responses', coalesce(p_responses, '{}'::jsonb),
    'rationales', coalesce(p_rationales, '{}'::jsonb)
  );
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id || chr(31) || p_quiz_id, 0));
  select * into v_current from public.quiz_sessions
  where user_id = p_user_id and quiz_id = p_quiz_id for update;

  if found then
    update public.quiz_sessions set
      payload = case when coalesce((v_current.payload->>'gradingVersion')::integer, 0) = 1
        then (v_current.payload - 'currentIndex' - 'responses' - 'rationales') || v_draft
        else v_draft end,
      status = case when coalesce((v_current.payload->>'gradingVersion')::integer, 0) = 1 then v_current.status else 'draft' end,
      score = case when coalesce((v_current.payload->>'gradingVersion')::integer, 0) = 1 then v_current.score else null end,
      updated_at = now()
    where id = v_current.id returning * into v_saved;
  else
    insert into public.quiz_sessions (id, user_id, quiz_id, payload, status, score, updated_at)
    values (p_id, p_user_id, p_quiz_id, v_draft, 'draft', null, now())
    returning * into v_saved;
  end if;
  return next v_saved;
end;
$$;

create or replace function public.submit_quiz_session_atomic(
  p_id text,
  p_user_id text,
  p_quiz_id text,
  p_current_index integer,
  p_responses jsonb,
  p_rationales jsonb,
  p_score jsonb,
  p_question_set_version text
)
returns setof public.quiz_sessions
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  v_current public.quiz_sessions%rowtype;
  v_saved public.quiz_sessions%rowtype;
  v_now timestamptz := now();
  v_best_score jsonb;
  v_qualified_at text;
  v_qualified_version text;
  v_payload jsonb;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_user_id || chr(31) || p_quiz_id, 0));
  select * into v_current from public.quiz_sessions
  where user_id = p_user_id and quiz_id = p_quiz_id for update;

  if coalesce((p_score->>'passed')::boolean, false) then
    v_best_score := p_score;
    v_qualified_at := v_now::text;
    v_qualified_version := p_question_set_version;
  elsif coalesce((v_current.payload->'bestScore'->>'passed')::boolean, false) then
    v_best_score := v_current.payload->'bestScore';
    v_qualified_at := v_current.payload->>'qualifiedAt';
    v_qualified_version := v_current.payload->>'qualifiedQuestionSetVersion';
  elsif coalesce((v_current.score->>'passed')::boolean, false) then
    v_best_score := v_current.score;
    v_qualified_at := v_current.payload->>'gradedAt';
    v_qualified_version := v_current.payload->>'questionSetVersion';
  end if;

  v_payload := jsonb_build_object(
    'currentIndex', coalesce(p_current_index, 0),
    'responses', coalesce(p_responses, '{}'::jsonb),
    'rationales', coalesce(p_rationales, '{}'::jsonb),
    'gradingVersion', 1,
    'gradedAt', v_now,
    'questionSetVersion', p_question_set_version,
    'bestScore', v_best_score,
    'qualifiedAt', v_qualified_at,
    'qualifiedQuestionSetVersion', v_qualified_version
  );

  if v_current.id is null then
    insert into public.quiz_sessions (id, user_id, quiz_id, payload, status, score, updated_at)
    values (p_id, p_user_id, p_quiz_id, v_payload, 'completed', p_score, v_now)
    returning * into v_saved;
  else
    update public.quiz_sessions set payload = v_payload, status = 'completed', score = p_score, updated_at = v_now
    where id = v_current.id returning * into v_saved;
  end if;
  return next v_saved;
end;
$$;

revoke execute on function public.save_quiz_draft_atomic(text, text, text, integer, jsonb, jsonb) from public, anon, authenticated;
revoke execute on function public.submit_quiz_session_atomic(text, text, text, integer, jsonb, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.save_quiz_draft_atomic(text, text, text, integer, jsonb, jsonb) to service_role;
grant execute on function public.submit_quiz_session_atomic(text, text, text, integer, jsonb, jsonb, jsonb, text) to service_role;

notify pgrst, 'reload schema';
commit;
