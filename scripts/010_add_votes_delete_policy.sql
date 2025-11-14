-- Adicionar política RLS para permitir usuários autenticados deletarem todos os votos
-- Isso é necessário para a funcionalidade de reiniciar votação

-- Remover política existente se houver (para evitar duplicatas)
drop policy if exists "Authenticated users can delete votes" on public.votes;

-- Criar política que permite usuários autenticados deletarem todos os votos
create policy "Authenticated users can delete votes"
  on public.votes for delete
  to authenticated
  using (true);

