alter table public.course_drafts
  add column if not exists version integer not null default 1,
  add column if not exists workflow_log jsonb not null default '[]'::jsonb,
  add column if not exists scheduled_at timestamptz,
  add column if not exists archived_at timestamptz;

alter table public.course_drafts
  drop constraint if exists course_drafts_status_check;

alter table public.course_drafts
  add constraint course_drafts_status_check
  check (status in ('draft', 'review', 'changes_requested', 'approved', 'scheduled', 'published', 'archived'));

create table if not exists public.course_versions (
  id text primary key,
  course_id text not null references public.course_drafts(id) on delete cascade,
  version integer not null check (version > 0),
  status text not null,
  actor text not null,
  change_type text not null check (change_type in ('created', 'content', 'transition', 'rollback')),
  comment text not null default '',
  snapshot jsonb not null,
  created_at timestamptz not null default now(),
  unique (course_id, version)
);

create index if not exists course_versions_course_created_idx
  on public.course_versions (course_id, created_at desc);

alter table public.course_versions enable row level security;

alter table public.submissions
  add column if not exists root_id text,
  add column if not exists supersedes_id text,
  add column if not exists version integer not null default 1,
  add column if not exists repository_url text not null default '',
  add column if not exists archive_url text not null default '',
  add column if not exists screenshots jsonb not null default '[]'::jsonb,
  add column if not exists deliverables jsonb not null default '[]'::jsonb,
  add column if not exists self_assessment text not null default '',
  add column if not exists visibility text not null default 'private',
  add column if not exists contextual_comments jsonb not null default '{}'::jsonb,
  add column if not exists review_log jsonb not null default '[]'::jsonb,
  add column if not exists updated_at timestamptz not null default now();

update public.submissions set root_id = id where root_id is null;

alter table public.submissions
  alter column root_id set not null,
  drop constraint if exists submissions_visibility_check;

alter table public.submissions
  add constraint submissions_visibility_check
  check (visibility in ('private', 'unlisted', 'public'));

create index if not exists submissions_root_version_idx
  on public.submissions (root_id, version desc);

alter table public.issued_certificates
  add column if not exists certificate_version integer not null default 1,
  add column if not exists expires_at timestamptz,
  add column if not exists revocation_reason text;
