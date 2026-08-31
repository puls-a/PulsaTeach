begin;

create table if not exists public.discord_links (
  user_id uuid primary key references auth.users(id) on delete cascade,
  discord_id text not null unique,
  discord_username text,
  linked_at timestamptz not null default now()
);
create table if not exists public.used_link_nonces (
  nonce text primary key,
  used_at timestamptz not null default now()
);
alter table public.discord_links enable row level security;
alter table public.used_link_nonces enable row level security;
drop policy if exists "Users read own Discord link" on public.discord_links;
create policy "Users read own Discord link" on public.discord_links for select using (auth.uid() = user_id);
revoke insert, update on table public.discord_links from anon, authenticated;
revoke all on table public.used_link_nonces from anon, authenticated;

commit;
