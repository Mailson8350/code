# 🔐 Credenciais do Administrador Padrão

## Informações de Acesso

### URL de Login
`/auth/login`

### Credenciais Padrão
\`\`\`
Email: admin@votacao.com
Senha: Admin123!Voto
\`\`\`

---

## 📋 Como Criar o Usuário Admin

O sistema não permite criação de contas via interface. O administrador deve ser criado uma única vez no Supabase Dashboard.

### Passo a Passo

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Navegue para **Authentication** → **Users**
4. Clique em **Add user** → **Create new user**
5. Preencha os campos:
   - **Email:** `admin@votacao.com`
   - **Password:** `Admin123!Voto`
   - ✅ Marque **Auto Confirm User**
6. Clique em **Create user**

### Configuração Recomendada

Para evitar problemas com confirmação de email:

1. Vá para **Authentication** → **Settings**
2. Desmarque **Enable email confirmations**
3. Clique em **Save**

---

## 🔧 Solução de Problemas

### Erro: "Email not confirmed"

Execute este comando no Supabase SQL Editor:

\`\`\`sql
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email = 'admin@votacao.com';
\`\`\`

### Erro: "Invalid login credentials"

Verifique se:
- O usuário foi criado no Supabase Dashboard
- O email está correto: `admin@votacao.com`
- A senha está correta: `Admin123!Voto`
- O usuário está confirmado (auto-confirm ativado)

### Página /admin trava ou não carrega

1. Abra as ferramentas de desenvolvedor (F12)
2. Verifique o console para erros
3. Limpe o cache do navegador
4. Faça logout e login novamente

---

## ⚠️ Segurança

- **Usuário Único:** Este sistema foi projetado para um único administrador
- **Sem Cadastro Público:** A página de signup foi removida para segurança
- **Altere a Senha:** Após o primeiro acesso, altere a senha padrão no Supabase Dashboard
- **Guarde com Segurança:** Mantenha estas credenciais em local seguro

---

## 🎯 Funcionalidades do Admin

Após autenticação bem-sucedida, você terá acesso a:

### Dashboard Administrativo (`/admin`)
- ✅ Estatísticas em tempo real (total de votos, candidatos, participação)
- ✅ Gerenciamento completo de candidatos
- ✅ Adicionar novos candidatos com upload de foto
- ✅ Editar informações de candidatos existentes
- ✅ Remover candidatos do sistema
- ✅ Visualizar contagem de votos por candidato

### Recursos do Sistema
- 🔒 Autenticação via Supabase Auth
- 🛡️ Proteção de rotas com middleware
- 🗄️ Database com Row Level Security (RLS)
- 📊 Atualizações em tempo real
- 📸 Upload de imagens via Vercel Blob
- 🎨 Interface moderna e responsiva

---

## 📁 Estrutura de Rotas

### Públicas
- `/` - Página de votação
- `/resultados` - Resultados em tempo real

### Protegidas (Requer Login)
- `/admin` - Painel administrativo
- `/auth/login` - Login do administrador

---

## 🚀 Próximos Passos

1. Crie o usuário admin no Supabase Dashboard
2. Faça login em `/auth/login` com as credenciais padrão
3. Execute os scripts SQL para criar tabelas:
   - `scripts/001_create_tables.sql`
   - `scripts/002_seed_candidates.sql`
4. Comece a adicionar candidatos no painel admin
5. Compartilhe a URL pública (`/`) para votação

---

**Última atualização:** Novembro 2025
