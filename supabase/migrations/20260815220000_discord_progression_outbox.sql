begin;

create table if not exists public.verified_track_completions (
  user_id text not null,
  track_id text not null check (track_id in ('html', 'css', 'javascript')),
  completed_at timestamptz not null default now(),
  primary key (user_id, track_id)
);

create table if not exists public.discord_outbox (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  event_type text not null check (event_type in ('module_completed', 'certificate_earned')),
  entity_id text not null,
  status text not null default 'pending' check (status in ('pending', 'delivered', 'failed')),
  attempts integer not null default 0,
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  delivered_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, event_type, entity_id)
);

alter table public.verified_track_completions enable row level security;
alter table public.discord_outbox enable row level security;
revoke all on table public.verified_track_completions, public.discord_outbox from anon, authenticated;

create or replace function public.enqueue_discord_certificate_event()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.discord_outbox (user_id, event_type, entity_id) values (new.user_id, 'certificate_earned', new.certificate_id) on conflict (user_id, event_type, entity_id) do nothing;
  return new;
end;
$$;

drop trigger if exists issued_certificate_discord_outbox on public.issued_certificates;
create trigger issued_certificate_discord_outbox after insert on public.issued_certificates for each row execute function public.enqueue_discord_certificate_event();

create or replace function public.enqueue_discord_module_event()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  insert into public.discord_outbox (user_id, event_type, entity_id) values (new.user_id, 'module_completed', new.track_id) on conflict (user_id, event_type, entity_id) do nothing;
  return new;
end;
$$;

drop trigger if exists verified_track_discord_outbox on public.verified_track_completions;
create trigger verified_track_discord_outbox after insert on public.verified_track_completions for each row execute function public.enqueue_discord_module_event();

create or replace function public.claim_discord_outbox(p_limit integer default 10)
returns setof public.discord_outbox language plpgsql security definer set search_path = public, pg_temp as $$
begin
  return query with claimed as (
    select id from public.discord_outbox where status = 'pending' and next_attempt_at <= now() and (locked_at is null or locked_at < now() - interval '10 minutes') order by created_at for update skip locked limit greatest(1, least(coalesce(p_limit, 10), 100))
  ) update public.discord_outbox event set attempts = event.attempts + 1, locked_at = now(), updated_at = now() from claimed where event.id = claimed.id returning event.*;
end;
$$;

revoke all on function public.claim_discord_outbox(integer) from public, anon, authenticated;
grant execute on function public.claim_discord_outbox(integer) to service_role;

commit;
