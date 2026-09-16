begin;

drop policy if exists "Users manage own Discord link" on public.discord_links;
drop policy if exists "Users read own Discord link" on public.discord_links;
create policy "Users read own Discord link"
  on public.discord_links
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

commit;
