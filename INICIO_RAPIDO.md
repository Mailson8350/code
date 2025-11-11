# 🚀 Início Rápido - Sistema de Votação

## ✅ Status Atual

**Banco de Dados:** ✅ Configurado  
**Tabelas:** ✅ Criadas (candidates, votes)  
**Candidatos:** ✅ Exemplos inseridos  
**Admin:** ⚠️ Precisa ser criado manualmente

---

## 🔐 Criar Conta Admin (OBRIGATÓRIO)

Como o Supabase Auth não permite criar usuários via SQL, você precisa criar o admin manualmente:

### Opção 1: Via Supabase Dashboard (Recomendado)
1. Acesse seu [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Authentication** → **Users**
3. Clique em **Add user** → **Create new user**
4. Preencha:
   - **Email:** `admin@votacao.com`
   - **Password:** `Admin123!Voto`
   - ✅ Marque: **Auto Confirm User**
5. Clique em **Create user**

### Opção 2: Via Interface do Sistema
1. Acesse: `/auth/login`
2. Use as credenciais na tela para login
3. Se o usuário ainda não existe, você verá uma mensagem de erro
4. Siga a Opção 1 acima para criar o usuário

---

## 📋 Credenciais do Admin

\`\`\`
Email: admin@votacao.com
Senha: Admin123!Voto
\`\`\`

---

## 🎯 Fluxo de Uso

### Para Usuários (Público)
1. Acesse: `/` (página inicial)
2. Visualize os candidatos
3. Clique em **Votar** no candidato desejado
4. Confirme seu voto
5. Veja a confirmação de sucesso

### Para Visualizar Resultados
1. Acesse: `/resultados`
2. Veja gráficos e estatísticas em tempo real
3. Atualiza automaticamente a cada 5 segundos

### Para Administradores
1. Acesse: `/auth/login`
2. Faça login com as credenciais acima
3. Será redirecionado para `/admin`
4. Gerencie candidatos (adicionar, editar, deletar)
5. Veja estatísticas em tempo real

---

## 🛠️ Estrutura do Sistema

\`\`\`
/                    → Página de votação pública
/resultados          → Dashboard de resultados
/auth/login          → Login do admin
/admin              → Painel administrativo (protegido)
\`\`\`

---

## 🔒 Segurança

- ✅ RLS (Row Level Security) habilitado
- ✅ Rotas admin protegidas via middleware
- ✅ Prevenção de votos duplicados (por IP + User Agent)
- ✅ Autenticação via Supabase Auth

---

## 📊 Candidatos de Exemplo

O sistema já vem com 4 candidatos de exemplo:
- **#10** - João Silva (Partido Progressista)
- **#20** - Maria Santos (Partido Democrático)
- **#30** - Carlos Oliveira (Partido Trabalhista)
- **#40** - Ana Costa (Partido Verde)

Você pode gerenciar esses candidatos no painel admin após fazer login.

---

## ⚡ Próximos Passos

1. ✅ Execute o script `006_setup_complete_system.sql` para inserir os candidatos
2. ⚠️ Crie o usuário admin no Supabase Dashboard
3. 🎉 Faça login em `/auth/login`
4. 🚀 Comece a usar o sistema!
