# 🔍 Verificar Conexão com Supabase

## Verificação Rápida

### 1. Verificar Variáveis de Ambiente

Certifique-se de ter um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

### 2. Executar Script de Verificação

```bash
npx tsx scripts/verify-connection.ts
```

Este script irá:
- ✅ Verificar se as variáveis de ambiente estão configuradas
- ✅ Testar conexão com a tabela `candidates`
- ✅ Testar conexão com a tabela `votes`
- ✅ Mostrar estatísticas do banco de dados

### 3. Verificação Manual no Navegador

1. Inicie o servidor: `pnpm dev`
2. Acesse: http://localhost:3000
3. Abra o Console do Navegador (F12)
4. Verifique se há erros relacionados ao Supabase

### 4. Verificar no Supabase Dashboard

1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Database** → **Tables**
4. Verifique se as tabelas `candidates` e `votes` existem
5. Vá em **Settings** → **API** e confirme as credenciais

## Problemas Comuns

### ❌ "Variáveis de ambiente não configuradas"
**Solução**: Crie o arquivo `.env.local` com as credenciais do Supabase

### ❌ "relation does not exist"
**Solução**: Execute `scripts/001_create_tables.sql` no Supabase SQL Editor

### ❌ "Invalid API key" ou 401/403
**Solução**: Verifique se copiou a chave correta (anon key) e se não há espaços extras

### ❌ "RLS policy violation"
**Solução**: Verifique se as políticas RLS foram criadas corretamente no script SQL

