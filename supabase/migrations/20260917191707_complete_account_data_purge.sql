begin;

create or replace function public.purge_application_user_data(p_auth_user_id uuid, p_local_user_id text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if p_local_user_id is distinct from 'supabase-' || p_auth_user_id::text then
    raise exception 'USER_ID_MISMATCH';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_local_user_id, 0));
  delete from public.discord_outbox where user_id = p_local_user_id;
  delete from public.verified_track_completions where user_id = p_local_user_id;
  delete from public.learning_events where user_id = p_local_user_id;
  delete from public.issued_certificates where user_id = p_local_user_id;
  delete from public.submissions where user_id = p_local_user_id;
  delete from public.attempts where user_id = p_local_user_id;
  delete from public.quiz_sessions where user_id = p_local_user_id;
  delete from public.progress where user_id = p_local_user_id;
  delete from public.legal_acceptances where user_id = p_auth_user_id;
  delete from public.discord_links where user_id = p_auth_user_id;

  update public.course_drafts
  set author_user_id = case when author_user_id = p_local_user_id then 'deleted-account' else author_user_id end,
      workflow_log = coalesce((
        select jsonb_agg(
          case when entry->>'actor' = p_local_user_id
            then jsonb_set(entry, '{actor}', '"deleted-account"'::jsonb)
            else entry
          end
        )
        from jsonb_array_elements(coalesce(workflow_log, '[]'::jsonb)) as items(entry)
      ), '[]'::jsonb)
  where author_user_id = p_local_user_id
    or exists (
      select 1 from jsonb_array_elements(coalesce(workflow_log, '[]'::jsonb)) as items(entry)
      where entry->>'actor' = p_local_user_id
    );

  update public.course_versions set actor = 'deleted-account' where actor = p_local_user_id;
  delete from public.profiles where auth_user_id = p_auth_user_id or local_user_id = p_local_user_id;
end;
$$;

revoke all on function public.purge_application_user_data(uuid, text) from public, anon, authenticated;
grant execute on function public.purge_application_user_data(uuid, text) to service_role;

notify pgrst, 'reload schema';
commit;
