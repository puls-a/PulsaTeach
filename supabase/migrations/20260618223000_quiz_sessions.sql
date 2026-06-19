create table if not exists public.quiz_sessions (
  id text primary key,
  user_id text not null,
  quiz_id text not null,
  payload jsonb not null default '{"currentIndex":0,"responses":{},"rationales":{}}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'completed')),
  score jsonb,
  updated_at timestamptz not null default now(),
  unique (user_id, quiz_id)
);

create index if not exists quiz_sessions_user_updated_idx
  on public.quiz_sessions (user_id, updated_at desc);

alter table public.quiz_sessions enable row level security;

