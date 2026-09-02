begin;

create table if not exists public.legal_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document text not null,
  version text not null,
  method text not null,
  accepted_at timestamptz not null default now(),
  unique (user_id, document, version)
);

create index if not exists legal_acceptances_user_accepted_idx
  on public.legal_acceptances (user_id, accepted_at desc);

alter table public.legal_acceptances enable row level security;
revoke all on table public.legal_acceptances from anon, authenticated;

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
begin
  delete from public.used_link_nonces where used_at < now() - interval '24 hours';
  get diagnostics v_used_nonces = row_count;

  delete from public.discord_outbox
  where status = 'delivered' and delivered_at < now() - interval '30 days';
  get diagnostics v_delivered_outbox = row_count;

  delete from public.discord_outbox
  where status = 'failed' and updated_at < now() - interval '90 days';
  get diagnostics v_failed_outbox = row_count;

  return jsonb_build_object(
    'usedLinkNonces', v_used_nonces,
    'deliveredDiscordOutbox', v_delivered_outbox,
    'failedDiscordOutbox', v_failed_outbox
  );
end;
$$;

revoke all on function public.purge_expired_operational_data() from public, anon, authenticated;
grant execute on function public.purge_expired_operational_data() to service_role;

notify pgrst, 'reload schema';
commit;
