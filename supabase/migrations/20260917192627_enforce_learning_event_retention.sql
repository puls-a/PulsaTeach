begin;

create or replace function public.purge_expired_operational_data()
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_used_nonces integer := 0;
  v_delivered_outbox integer := 0;
  v_failed_outbox integer := 0;
  v_learning_events integer := 0;
begin
  delete from public.used_link_nonces where used_at < now() - interval '24 hours';
  get diagnostics v_used_nonces = row_count;

  delete from public.discord_outbox
  where status = 'delivered' and delivered_at < now() - interval '30 days';
  get diagnostics v_delivered_outbox = row_count;

  delete from public.discord_outbox
  where status = 'failed' and updated_at < now() - interval '90 days';
  get diagnostics v_failed_outbox = row_count;

  delete from public.learning_events where created_at < now() - interval '180 days';
  get diagnostics v_learning_events = row_count;

  return jsonb_build_object(
    'usedLinkNonces', v_used_nonces,
    'deliveredDiscordOutbox', v_delivered_outbox,
    'failedDiscordOutbox', v_failed_outbox,
    'learningEvents', v_learning_events
  );
end;
$$;

revoke all on function public.purge_expired_operational_data() from public, anon, authenticated;
grant execute on function public.purge_expired_operational_data() to service_role;

notify pgrst, 'reload schema';
commit;
