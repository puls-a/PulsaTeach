begin;

drop function if exists public.save_quiz_draft_atomic(text, text, text, integer, jsonb, jsonb);

create function public.save_quiz_draft_atomic(
  p_id text,
  p_user_id text,
  p_quiz_id text,
  p_current_index integer,
  p_responses jsonb,
  p_rationales jsonb,
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
  v_draft jsonb := jsonb_build_object(
    'currentIndex', coalesce(p_current_index, 0),
    'responses', coalesce(p_responses, '{}'::jsonb),
    'rationales', coalesce(p_rationales, '{}'::jsonb),
    'draftQuestionSetVersion', p_question_set_version
  );
begin
  if nullif(p_question_set_version, '') is null then
    raise exception using errcode = 'PT010', message = 'QUIZ_VERSION_CONFLICT';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_user_id || chr(31) || p_quiz_id, 0));
  select * into v_current from public.quiz_sessions
  where user_id = p_user_id and quiz_id = p_quiz_id for update;

  if found then
    update public.quiz_sessions set
      payload = case when coalesce((v_current.payload->>'gradingVersion')::integer, 0) = 1
        then (v_current.payload - 'currentIndex' - 'responses' - 'rationales' - 'draftQuestionSetVersion') || v_draft
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

revoke execute on function public.save_quiz_draft_atomic(text, text, text, integer, jsonb, jsonb, text) from public, anon, authenticated;
grant execute on function public.save_quiz_draft_atomic(text, text, text, integer, jsonb, jsonb, text) to service_role;

notify pgrst, 'reload schema';
commit;
