-- PulsaTeach Supabase bootstrap schema.
-- Run this in the Supabase SQL Editor before setting SUPABASE_URL and keys.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id) on delete set null,
  local_user_id text unique,
  display_name text not null default 'PulsaTeach Learner',
  goal text not null default 'frontend-foundations',
  weekly_minutes integer not null default 120,
  locale text not null default 'en',
  bio text not null default '',
  avatar_url text not null default '',
  onboarding_completed boolean not null default false,
  roles text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.progress (
  user_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.attempts (
  id text primary key,
  user_id text not null,
  lesson_id text not null,
  track_id text,
  module_id text,
  passed integer not null default 0,
  total integer not null default 0,
  success boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id text primary key,
  user_id text not null,
  project_id text not null,
  title text not null,
  description text not null default '',
  url text not null default '',
  status text not null default 'submitted',
  feedback text,
  reviewer text,
  score numeric,
  rubric jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.enrollments (
  id text primary key,
  email text not null unique,
  locale text not null default 'en',
  source text not null default 'landing',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_drafts (
  id text primary key,
  track_id text not null,
  module_id text not null default 'backlog',
  title jsonb not null,
  objective jsonb not null default '{}'::jsonb,
  prompt jsonb not null default '{}'::jsonb,
  type text not null default 'html',
  difficulty text not null default 'starter',
  skills text[] not null default '{}',
  xp integer not null default 25,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    auth_user_id,
    local_user_id,
    display_name,
    locale
  )
  values (
    new.id,
    'supabase-' || new.id::text,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', new.email, 'PulsaTeach Learner'),
    coalesce(new.raw_user_meta_data ->> 'locale', 'en')
  )
  on conflict (local_user_id) do update set
    auth_user_id = excluded.auth_user_id,
    display_name = excluded.display_name,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.attempts enable row level security;
alter table public.submissions enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_drafts enable row level security;
alter table public.course_drafts enable row level security;
alter table public.issued_certificates enable row level security;
alter table public.learning_events enable row level security;

-- The Express API uses SUPABASE_SERVICE_ROLE_KEY server-side, so RLS is bypassed there.
-- Add authenticated user policies later when PulsaTeach moves learner reads/writes directly to Supabase from the browser.
