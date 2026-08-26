begin;

create or replace function public.consume_discord_link(p_user_id uuid, p_discord_id text, p_nonce text, p_linked_at timestamptz default now())
returns jsonb language plpgsql security definer set search_path = public, pg_temp as $$
declare v_existing_user_id uuid;
begin
  if exists (select 1 from public.used_link_nonces where nonce = p_nonce) then return jsonb_build_object('status', 'replayed'); end if;
  begin insert into public.used_link_nonces (nonce) values (p_nonce); exception when unique_violation then return jsonb_build_object('status', 'replayed'); end;
  select user_id into v_existing_user_id from public.discord_links where discord_id = p_discord_id;
  if v_existing_user_id is not null and v_existing_user_id <> p_user_id then return jsonb_build_object('status', 'conflict'); end if;
  begin
    insert into public.discord_links (user_id, discord_id, linked_at) values (p_user_id, p_discord_id, p_linked_at)
    on conflict (user_id) do update set discord_id = excluded.discord_id, linked_at = excluded.linked_at;
  exception when unique_violation then return jsonb_build_object('status', 'conflict'); end;
  return jsonb_build_object('status', 'linked', 'discordId', p_discord_id, 'linkedAt', p_linked_at);
end;
$$;
revoke all on function public.consume_discord_link(uuid, text, text, timestamptz) from public, anon, authenticated;
grant execute on function public.consume_discord_link(uuid, text, text, timestamptz) to service_role;

commit;
