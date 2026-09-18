begin;

create or replace function public.publish_due_courses_atomic(p_now timestamptz default now())
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_course public.course_drafts%rowtype;
  v_version integer;
  v_workflow_log jsonb;
  v_published jsonb := '[]'::jsonb;
begin
  for v_course in
    select * from public.course_drafts
    where status = 'scheduled' and scheduled_at is not null and scheduled_at <= p_now
    order by scheduled_at, id
    for update skip locked
  loop
    v_version := v_course.version + 1;
    select coalesce(jsonb_agg(entry order by position), '[]'::jsonb)
    into v_workflow_log
    from jsonb_array_elements(
      jsonb_build_array(jsonb_build_object(
        'from', 'scheduled',
        'to', 'published',
        'actor', 'system',
        'comment', 'Scheduled publication',
        'at', p_now,
        'kind', 'transition'
      )) || coalesce(v_course.workflow_log, '[]'::jsonb)
    ) with ordinality as items(entry, position)
    where position <= 200;

    update public.course_drafts set
      status = 'published',
      version = v_version,
      workflow_log = v_workflow_log,
      updated_at = p_now,
      published_at = coalesce(v_course.published_at, p_now),
      scheduled_at = null,
      archived_at = null
    where id = v_course.id;

    insert into public.course_versions (
      id, course_id, version, status, actor, change_type, comment, snapshot, created_at
    ) values (
      v_course.id || ':v' || v_version::text,
      v_course.id,
      v_version,
      'published',
      'system',
      'transition',
      'Scheduled publication',
      jsonb_build_object(
        'slug', v_course.slug,
        'title', v_course.title,
        'description', v_course.description,
        'level', v_course.level,
        'language', v_course.language,
        'curriculum', v_course.curriculum
      ),
      p_now
    );

    v_published := v_published || jsonb_build_array(jsonb_build_object(
      'id', v_course.id,
      'version', v_version,
      'publishedAt', coalesce(v_course.published_at, p_now)
    ));
  end loop;

  return jsonb_build_object('published', jsonb_array_length(v_published), 'courses', v_published);
end;
$$;

revoke all on function public.publish_due_courses_atomic(timestamptz) from public, anon, authenticated;
grant execute on function public.publish_due_courses_atomic(timestamptz) to service_role;

notify pgrst, 'reload schema';
commit;
