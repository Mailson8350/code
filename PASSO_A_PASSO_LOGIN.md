# 🔐 GUIA DEFINITIVO - Como Fazer Login no Sistema

## ✅ SOLUÇÃO MAIS RÁPIDA (Recomendada)

### Opção 1: Criar Conta pela Interface

1. **Acesse**: `/auth/signup`
2. **Preencha o formulário**:
   - Email: `admin@votacao.com` (ou qualquer email que preferir)
   - Senha: `Admin123!` (mínimo 6 caracteres)
3. **Clique em "Criar Conta Admin"**
4. **Pronto!** Você será automaticamente redirecionado para `/admin`

### ⚠️ Se aparecer erro "Email not confirmed":

Você precisa **desabilitar a confirmação de email** no Supabase:

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** (menu lateral esquerdo)
4. Clique em **Email Auth** 
5. **Desmarque** a opção "Enable email confirmations"
6. Clique em **Save**
7. Volte para `/auth/signup` e crie sua conta novamente

---

## 🔧 SOLUÇÃO ALTERNATIVA

### Opção 2: Criar Usuário Manualmente no Dashboard

Se a página de signup não estiver funcionando:

1. Acesse [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Authentication** → **Users**
4. Clique em **Add User** → **Create new user**
5. Preencha:
   - **Email**: `admin@votacao.com`
   - **Password**: `Admin123!`
   - **Auto Confirm User**: ✅ MARQUE ESTA OPÇÃO
6. Clique em **Create user**

Agora você pode fazer login em `/auth/login` com essas credenciais!

---

## 📋 CREDENCIAIS PADRÃO SUGERIDAS

\`\`\`
Email: admin@votacao.com
Senha: Admin123!
\`\`\`

**IMPORTANTE**: Após o primeiro login, você pode alterar essas credenciais se quiser.

---

## 🐛 RESOLUÇÃO DE PROBLEMAS

### Erro: "Failed to fetch"
- **Causa**: Problema de rede ou variáveis de ambiente
- **Solução**: Recarregue a página e tente novamente

### Erro: "Email not confirmed"
- **Causa**: Confirmação de email está habilitada
- **Solução**: Siga os passos da Opção 1 acima para desabilitar

### Erro: "Invalid login credentials"
- **Causa**: Email ou senha incorretos
- **Solução**: Verifique se você digitou corretamente ou crie um novo usuário

### Não consigo acessar o Supabase Dashboard
- **URL**: https://supabase.com/dashboard
- Faça login com a conta que você usou para criar o projeto

---

## ✨ PRÓXIMOS PASSOS

Após fazer login com sucesso:

1. **Adicionar Candidatos**: Vá em `/admin` e clique em "Adicionar Candidato"
2. **Ver Resultados**: Acesse `/resultados` para ver os votos em tempo real
3. **Página de Votação**: A página principal `/` mostra todos os candidatos

---

## 🎯 RESUMO RÁPIDO

1. Desabilite a confirmação de email no Supabase
2. Acesse `/auth/signup`
3. Crie sua conta com email e senha
4. Faça login em `/auth/login`
5. Gerencie candidatos em `/admin`

**Pronto! Sistema 100% funcional!** 🎉
\`\`\`

```tsx file="" isHidden
