begin;

alter table public.lesson_drafts
  add column if not exists revision integer not null default 1;

alter table public.lesson_drafts
  drop constraint if exists lesson_drafts_revision_check;

alter table public.lesson_drafts
  add constraint lesson_drafts_revision_check check (revision >= 1);

commit;
