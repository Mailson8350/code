# 🚀 Guia Completo de Deploy na Vercel com Supabase

Este guia vai te ajudar a hospedar seu sistema de votação na Vercel usando Supabase como banco de dados.

---

## 📋 Pré-requisitos

- ✅ Conta no [Vercel](https://vercel.com) (gratuita)
- ✅ Conta no [Supabase](https://supabase.com) (gratuita)
- ✅ Projeto no Supabase já configurado
- ✅ Código do projeto no GitHub, GitLab ou Bitbucket

---

## 🔧 Passo 1: Preparar o Projeto Localmente

### 1.1 Verificar se está tudo funcionando

```bash
# Instalar dependências
npm install

# Testar localmente
npm run dev
```

Certifique-se de que tudo funciona antes de fazer o deploy.

### 1.2 Verificar variáveis de ambiente

Crie um arquivo `.env.local` (não commitar no Git) com:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

**⚠️ IMPORTANTE**: Este arquivo NÃO deve ser commitado no Git!

---

## 🗄️ Passo 2: Configurar o Banco de Dados no Supabase

### 2.1 Executar Scripts SQL na Ordem Correta

Acesse o **Supabase Dashboard** → **SQL Editor** e execute os scripts nesta ordem:

#### ✅ Script 1: Criar Tabelas Base
```sql
-- Execute: scripts/001_create_tables.sql
```

#### ✅ Script 2: Configurações de Eleição
```sql
-- Execute: scripts/007_election_settings.sql
```

#### ✅ Script 3: Ajustes para Concurso de Beleza
```sql
-- Execute: scripts/008_alter_candidates_for_beauty.sql
```

#### ✅ Script 4: Função para Upload de Fotos
```sql
-- Execute: scripts/009_create_bytea_function.sql
```

### 2.2 Criar Usuário Admin

1. No Supabase Dashboard, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: `admin@votacao.com` (ou o que preferir)
   - **Password**: Crie uma senha forte
   - ✅ Marque **"Auto Confirm User"**
4. Clique em **"Create user"**

### 2.3 Verificar Políticas RLS

Certifique-se de que as políticas RLS estão ativas:
- ✅ `candidates` - leitura pública, escrita autenticada
- ✅ `votes` - inserção pública, leitura pública
- ✅ `election_settings` - leitura pública, escrita autenticada

---

## 🌐 Passo 3: Deploy na Vercel

### 3.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New Project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Selecione o repositório do projeto

### 3.2 Configurar Projeto

A Vercel detectará automaticamente que é um projeto Next.js. Configure:

- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install` (padrão)

### 3.3 Configurar Variáveis de Ambiente

**⚠️ CRÍTICO**: Configure as variáveis de ambiente antes de fazer o deploy!

Na tela de configuração do projeto, vá em **"Environment Variables"** e adicione:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://seu-projeto.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sua_chave_anon_aqui` | Production, Preview, Development |

**Como obter essas credenciais:**
1. Acesse o Supabase Dashboard
2. Vá em **Settings** → **API**
3. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3.4 Fazer o Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (2-5 minutos)
3. Quando terminar, você terá uma URL como: `https://seu-projeto.vercel.app`

---

## ✅ Passo 4: Verificações Pós-Deploy

### 4.1 Testar a Aplicação

1. Acesse a URL fornecida pela Vercel
2. Teste:
   - ✅ Página inicial carrega
   - ✅ Lista de candidatos aparece
   - ✅ Login admin funciona
   - ✅ Upload de fotos funciona
   - ✅ Votação funciona

### 4.2 Verificar Logs

Se algo não funcionar:
1. Na Vercel Dashboard, vá em **Deployments**
2. Clique no deployment mais recente
3. Vá em **"Functions"** ou **"Logs"** para ver erros

### 4.3 Configurar Domínio Personalizado (Opcional)

1. Na Vercel Dashboard, vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Siga as instruções de DNS

---

## 🔒 Passo 5: Configurações de Segurança

### 5.1 Configurar CORS no Supabase (se necessário)

Se houver problemas de CORS:
1. Supabase Dashboard → **Settings** → **API**
2. Em **CORS**, adicione o domínio da Vercel: `https://seu-projeto.vercel.app`

### 5.2 Verificar RLS Policies

Certifique-se de que as políticas RLS estão corretas:
- Público pode ler candidatos e votar
- Apenas autenticados podem criar/editar candidatos

---

## 🐛 Troubleshooting

### Erro: "Variáveis de ambiente não configuradas"
**Solução**: Verifique se adicionou as variáveis na Vercel Dashboard

### Erro: "Function not found" (insert_candidate_with_photo)
**Solução**: Execute o script `009_create_bytea_function.sql` no Supabase

### Erro: "RLS policy violation"
**Solução**: Verifique se executou todos os scripts SQL na ordem correta

### Fotos não aparecem
**Solução**: 
1. Verifique se a função RPC foi criada
2. Verifique os logs da Vercel para erros específicos
3. Teste o upload de uma nova foto

### Build falha na Vercel
**Solução**:
1. Verifique os logs do build
2. Certifique-se de que `package.json` está correto
3. Verifique se não há erros de TypeScript (mesmo com `ignoreBuildErrors: true`)

---

## 📊 Monitoramento

### Vercel Analytics
O projeto já inclui Vercel Analytics. Você pode ver:
- Visitas
- Performance
- Erros

Acesse: Vercel Dashboard → **Analytics**

### Supabase Dashboard
Monitore:
- Uso do banco de dados
- Queries lentas
- Uso de storage

---

## 🔄 Atualizações Futuras

### Fazer Deploy de Atualizações

1. Faça commit das mudanças no Git
2. Push para o repositório
3. A Vercel detecta automaticamente e faz novo deploy

### Rollback

Se algo der errado:
1. Vercel Dashboard → **Deployments**
2. Encontre o deployment anterior que funcionava
3. Clique nos três pontos → **"Promote to Production"**

---

## 📝 Checklist Final

Antes de considerar o deploy completo, verifique:

- [ ] Todos os scripts SQL foram executados no Supabase
- [ ] Usuário admin foi criado
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Build passou sem erros
- [ ] Página inicial carrega corretamente
- [ ] Login admin funciona
- [ ] Upload de fotos funciona
- [ ] Votação funciona
- [ ] Resultados aparecem corretamente
- [ ] Fotos aparecem nos cards
- [ ] Visualização de foto completa funciona

---

## 🎉 Pronto!

Seu sistema está no ar! Compartilhe a URL com os usuários.

**URL da aplicação**: `https://seu-projeto.vercel.app`

---

## 💡 Dicas Adicionais

### Performance
- ✅ O sistema já está otimizado para performance
- ✅ Imagens usam thumbnails
- ✅ Lazy loading implementado
- ✅ Cache configurado

### Escalabilidade
- A Vercel escala automaticamente
- O Supabase Free tier suporta até 500MB de banco
- Para mais tráfego, considere upgrade nos planos

### Backup
- O Supabase faz backup automático
- Considere exportar dados periodicamente
- Use o Supabase Dashboard → **Database** → **Backups**

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs na Vercel
2. Verifique os logs no Supabase
3. Consulte a documentação:
   - [Vercel Docs](https://vercel.com/docs)
   - [Supabase Docs](https://supabase.com/docs)

