-- Configuração global da eleição (abre/fecha votação)
create table if not exists public.election_settings (
  id int primary key default 1,
  is_open boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Garantir linha única com id = 1
insert into public.election_settings (id, is_open)
values (1, true)
on conflict (id) do nothing;

-- Habilitar RLS
alter table public.election_settings enable row level security;

-- Políticas: leitura pública (para UI), escrita apenas autenticados
create policy "Anyone can read election settings"
  on public.election_settings for select
  using (true);

create policy "Authenticated can update election settings"
  on public.election_settings for update
  to authenticated
  using (true)
  with check (true);

-- Permitir inserir (necessário para upsert criar a linha id=1)
create policy "Authenticated can insert election settings"
  on public.election_settings for insert
  to authenticated
  with check (true);


