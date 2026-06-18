alter table public.profiles
  add column if not exists bio text not null default '',
  add column if not exists avatar_url text not null default '',
  add column if not exists onboarding_completed boolean not null default false,
  add column if not exists roles text[] not null default '{}';

create table if not exists public.course_drafts (
  id text primary key,
  slug text not null unique,
  title jsonb not null,
  description jsonb not null default '{}'::jsonb,
  level text not null default 'beginner',
  language text not null default 'fr',
  status text not null default 'draft',
  author_user_id text not null,
  curriculum jsonb not null default '{"modules":[]}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

create table if not exists public.issued_certificates (
  id uuid primary key default gen_random_uuid(),
  verification_code text not null unique,
  user_id text not null,
  certificate_id text not null,
  learner_name text not null,
  title jsonb not null,
  evidence jsonb not null default '{}'::jsonb,
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (user_id, certificate_id)
);

create table if not exists public.learning_events (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  event_type text not null,
  lesson_id text,
  track_id text,
  payload jsonb not null default '{}'::jsonb,
  request_id text,
  created_at timestamptz not null default now()
);

create index if not exists learning_events_user_created_idx
  on public.learning_events (user_id, created_at desc);

create index if not exists learning_events_lesson_created_idx
  on public.learning_events (lesson_id, created_at desc);

alter table public.course_drafts enable row level security;
alter table public.issued_certificates enable row level security;
alter table public.learning_events enable row level security;
