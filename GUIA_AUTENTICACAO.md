# 🔐 Guia de Autenticação do Sistema de Votação

## ❓ Por que não vejo a tabela de usuários?

Os usuários do Supabase **NÃO** aparecem no schema público (`public.users`). Eles são gerenciados pelo Supabase Auth no schema separado **`auth.users`**.

Quando você olha no Supabase Dashboard em "Database" → "Tables", você só vê:
- `candidates` (candidatos)
- `votes` (votos)

Isso é **NORMAL**! ✅

---

## 🚀 Como Criar o Primeiro Admin (2 Opções)

### **Opção 1: Usar a Página de Signup (MAIS FÁCIL)** ⭐

1. Acesse `/auth/signup` no navegador
2. Preencha o formulário com:
   - Email do admin (ex: `admin@votacao.com`)
   - Senha (mínimo 6 caracteres)
   - Confirmação da senha
3. Clique em "Criar Conta Admin"
4. Você será automaticamente redirecionado para `/admin`

**✅ Pronto! Sua conta está criada.**

---

### **Opção 2: Criar no Supabase Dashboard**

Se preferir criar manualmente:

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** → **Users**
4. Clique em **"Add User"** ou **"Invite"**
5. Preencha:
   - **Email**: `admin@votacao.com`
   - **Password**: `Admin123!Voto`
   - **Auto Confirm User**: ✅ MARQUE ESTA OPÇÃO
6. Clique em **"Create User"** ou **"Send Invite"**

**✅ Usuário criado!** Agora você pode fazer login em `/auth/login`

---

## 🔧 Configuração Importante: Desabilitar Confirmação de Email

Por padrão, o Supabase exige confirmação de email. Para facilitar o desenvolvimento:

1. No Supabase Dashboard, vá em **Authentication** → **Settings**
2. Role até **Email Auth**
3. **DESMARQUE** a opção **"Enable email confirmations"**
4. Clique em **Save**

Agora você pode criar contas sem precisar confirmar email!

---

## 🎯 Fluxo Completo de Uso

\`\`\`
1. Criar Admin (uma única vez)
   ↓
2. Login em /auth/login
   ↓
3. Gerenciar sistema em /admin
   - Adicionar candidatos
   - Ver estatísticas
   - Deletar candidatos
   ↓
4. Votação pública em /
   - Usuários votam sem login
   - Previne votos duplicados por IP
   ↓
5. Ver resultados em /resultados
   - Atualização automática a cada 5 segundos
   - Gráficos e estatísticas em tempo real
\`\`\`

---

## 📝 Credenciais Sugeridas

**Email**: `admin@votacao.com`  
**Senha**: `Admin123!Voto`

*(Você pode usar qualquer email/senha, essas são apenas sugestões)*

---

## 🐛 Problemas Comuns

### "Email not confirmed"
**Solução**: Desabilite a confirmação de email nas configurações do Supabase Auth (instruções acima).

### "Invalid login credentials"
**Solução**: Certifique-se de que criou o usuário corretamente. Tente criar novamente pela página `/auth/signup`.

### "Não consigo acessar /admin"
**Solução**: Faça logout e login novamente. O middleware verifica a sessão.

---

## 📚 Onde os Dados São Armazenados

| Dados | Localização | Como Ver |
|-------|-------------|----------|
| **Candidatos** | `public.candidates` | Dashboard → Database → Tables → candidates |
| **Votos** | `public.votes` | Dashboard → Database → Tables → votes |
| **Usuários Admin** | `auth.users` | Dashboard → Authentication → Users |

---

## ✅ Checklist Rápido

- [ ] Desabilitei confirmação de email no Supabase
- [ ] Criei conta admin (via signup ou dashboard)
- [ ] Consegui fazer login em `/auth/login`
- [ ] Acessei o painel `/admin` com sucesso
- [ ] Adicionei pelo menos 1 candidato
- [ ] Testei votação na página principal `/`
- [ ] Visualizei resultados em `/resultados`

---

**🎉 Sistema pronto para uso!**
