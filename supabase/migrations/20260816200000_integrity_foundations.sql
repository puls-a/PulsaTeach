begin;

alter table public.progress
  add column if not exists revision bigint not null default 0;

alter table public.submissions
  drop constraint if exists submissions_status_check,
  drop constraint if exists submissions_score_check,
  drop constraint if exists submissions_approved_score_check;

alter table public.submissions
  add constraint submissions_status_check
    check (status in ('submitted', 'in_review', 'changes_requested', 'approved')),
  add constraint submissions_score_check
    check (score is null or (score >= 0 and score <= 100)),
  add constraint submissions_approved_score_check
    check (status <> 'approved' or score is not null);

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
  delete from public.learning_events where user_id = p_local_user_id;
  delete from public.issued_certificates where user_id = p_local_user_id;
  delete from public.submissions where user_id = p_local_user_id;
  delete from public.attempts where user_id = p_local_user_id;
  delete from public.quiz_sessions where user_id = p_local_user_id;
  delete from public.progress where user_id = p_local_user_id;
  delete from public.profiles where auth_user_id = p_auth_user_id or local_user_id = p_local_user_id;
end;
$$;

revoke all on function public.purge_application_user_data(uuid, text) from public, anon, authenticated;
grant execute on function public.purge_application_user_data(uuid, text) to service_role;

create or replace function public.create_course_atomic(p_course jsonb, p_actor text)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.course_drafts (
    id, slug, title, description, level, language, status, version, author_user_id,
    curriculum, workflow_log, created_at, updated_at, published_at, scheduled_at, archived_at
  ) values (
    p_course->>'id', p_course->>'slug', p_course->'title', p_course->'description',
    p_course->>'level', p_course->>'language', p_course->>'status', 1,
    p_course->>'authorUserId', p_course->'curriculum', p_course->'workflowLog',
    (p_course->>'createdAt')::timestamptz, (p_course->>'updatedAt')::timestamptz,
    null, null, null
  );
  insert into public.course_versions (id, course_id, version, status, actor, change_type, comment, snapshot, created_at)
  values (
    p_course->>'id' || ':v1', p_course->>'id', 1, 'draft', p_actor, 'created', 'Course created',
    jsonb_build_object(
      'slug', p_course->>'slug', 'title', p_course->'title', 'description', p_course->'description',
      'level', p_course->>'level', 'language', p_course->>'language', 'curriculum', p_course->'curriculum'
    ), (p_course->>'createdAt')::timestamptz
  );
  return p_course;
end;
$$;

create or replace function public.save_course_atomic(
  p_course jsonb,
  p_expected_version integer,
  p_actor text,
  p_change_type text,
  p_comment text default ''
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_current public.course_drafts%rowtype;
  v_next_version integer;
  v_next jsonb;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_course->>'id', 0));
  select * into v_current from public.course_drafts where id = p_course->>'id' for update;
  if not found then raise exception 'COURSE_NOT_FOUND'; end if;
  if v_current.version is distinct from p_expected_version then
    raise exception using errcode = 'P0001', message = 'COURSE_VERSION_CONFLICT', detail = v_current.version::text;
  end if;
  v_next_version := v_current.version + 1;
  v_next := p_course || jsonb_build_object('version', v_next_version);

  update public.course_drafts set
    slug = v_next->>'slug', title = v_next->'title', description = v_next->'description',
    level = v_next->>'level', language = v_next->>'language', status = v_next->>'status',
    version = v_next_version, curriculum = v_next->'curriculum', workflow_log = v_next->'workflowLog',
    updated_at = (v_next->>'updatedAt')::timestamptz,
    published_at = nullif(v_next->>'publishedAt', '')::timestamptz,
    scheduled_at = nullif(v_next->>'scheduledAt', '')::timestamptz,
    archived_at = nullif(v_next->>'archivedAt', '')::timestamptz
  where id = v_current.id;

  insert into public.course_versions (id, course_id, version, status, actor, change_type, comment, snapshot, created_at)
  values (
    v_current.id || ':v' || v_next_version::text, v_current.id, v_next_version,
    v_next->>'status', p_actor, p_change_type, coalesce(p_comment, ''),
    jsonb_build_object(
      'slug', v_next->>'slug', 'title', v_next->'title', 'description', v_next->'description',
      'level', v_next->>'level', 'language', v_next->>'language', 'curriculum', v_next->'curriculum'
    ), (v_next->>'updatedAt')::timestamptz
  );
  return v_next;
end;
$$;

revoke all on function public.create_course_atomic(jsonb, text) from public, anon, authenticated;
revoke all on function public.save_course_atomic(jsonb, integer, text, text, text) from public, anon, authenticated;
grant execute on function public.create_course_atomic(jsonb, text) to service_role;
grant execute on function public.save_course_atomic(jsonb, integer, text, text, text) to service_role;

notify pgrst, 'reload schema';
commit;
