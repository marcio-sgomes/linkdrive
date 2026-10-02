-- Cria profile + assinatura em trial (7 dias) a cada novo usuário (RN-01)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.raw_user_meta_data->>'phone');
  insert into public.subscriptions (user_id) values (new.id); -- defaults: trialing, +7 dias
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Políticas RLS mínimas (usuário só vê o que é seu)
create policy "own profile" on public.profiles for select using (auth.uid() = id);
create policy "own subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "own vehicles" on public.vehicles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rides" on public.rides for all using (auth.uid() = driver_id) with check (auth.uid() = driver_id);
-- Rastreamento público (/track/:uuid): será exposto via RPC/view restrita na próxima etapa
