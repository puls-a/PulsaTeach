begin;

do $$
declare
  v_function record;
  v_definition text;
begin
  for v_function in
    select procedure.oid
    from pg_catalog.pg_proc as procedure
    join pg_catalog.pg_namespace as namespace on namespace.oid = procedure.pronamespace
    where namespace.nspname = 'public'
      and procedure.proname = any(array[
        'create_submission_atomic',
        'review_submission_atomic',
        'save_quiz_draft_atomic',
        'submit_quiz_session_atomic',
        'issue_certificate_atomic'
      ])
  loop
    v_definition := pg_catalog.pg_get_functiondef(v_function.oid);
    v_definition := pg_catalog.regexp_replace(v_definition, '''PT[0-9]{3}''', '''P0001''', 'g');
    execute v_definition;
  end loop;
end;
$$;

notify pgrst, 'reload schema';
commit;
