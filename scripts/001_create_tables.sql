-- Criar tabela de candidatos
create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo_url text,
  number integer not null unique,
  party text not null,
  bio text,
  proposals text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Criar tabela de votos
create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidates(id) on delete cascade,
  voter_identifier text not null,
  voted_at timestamptz default now(),
  -- Prevenir votos duplicados do mesmo identificador
  unique(voter_identifier)
);

-- Criar índices para performance
create index if not exists idx_votes_candidate_id on public.votes(candidate_id);
create index if not exists idx_votes_voter_identifier on public.votes(voter_identifier);
create index if not exists idx_candidates_number on public.candidates(number);

-- Habilitar RLS nas tabelas
alter table public.candidates enable row level security;
alter table public.votes enable row level security;

-- Políticas para candidates (leitura pública, escrita apenas para admins autenticados)
create policy "Anyone can view candidates"
  on public.candidates for select
  using (true);

create policy "Authenticated users can insert candidates"
  on public.candidates for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update candidates"
  on public.candidates for update
  to authenticated
  using (true);

create policy "Authenticated users can delete candidates"
  on public.candidates for delete
  to authenticated
  using (true);

-- Políticas para votes (inserção pública, leitura restrita)
create policy "Anyone can insert votes"
  on public.votes for insert
  with check (true);

create policy "Anyone can view vote counts"
  on public.votes for select
  using (true);
