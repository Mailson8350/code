-- Ajustes para concurso de talentos/beleza e suporte a foto binária
alter table public.candidates
  add column if not exists stage_name text,
  add column if not exists city text,
  add column if not exists age smallint check (age between 14 and 120),
  add column if not exists height_cm smallint check (height_cm between 120 and 230),
  add column if not exists talent text,
  add column if not exists measurements text, -- ex: "86-64-94"
  add column if not exists instagram text,
  add column if not exists photo bytea,
  add column if not exists photo_mime text,
  add column if not exists photo_thumb bytea,
  add column if not exists photo_thumb_mime text;

-- Flexibilizar campos antigos não mais obrigatórios neste contexto
alter table public.candidates
  alter column party drop not null;

-- Índices úteis
create index if not exists idx_candidates_city on public.candidates(city);
create index if not exists idx_candidates_created_at on public.candidates(created_at);

-- Trigger para manter updated_at atualizado
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_candidates_set_updated_at on public.candidates;
create trigger trg_candidates_set_updated_at
before update on public.candidates
for each row
execute function public.set_updated_at();


