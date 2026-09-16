begin;

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;
revoke all on function public.enqueue_discord_certificate_event() from public, anon, authenticated;
revoke all on function public.enqueue_discord_module_event() from public, anon, authenticated;

create index if not exists profiles_auth_user_id_idx on public.profiles (auth_user_id);

drop policy if exists "Users read own Discord link" on public.discord_links;
create policy "Users read own Discord link"
  on public.discord_links
  for select
  using ((select auth.uid()) = user_id);

commit;
