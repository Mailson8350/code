# 🚀 Guia Completo de Execução - Sistema de Votação

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **pnpm** (gerenciador de pacotes - recomendado) ou **npm**
- Conta no **Supabase** (gratuita em https://supabase.com)

---

## 🔧 Passo 1: Configurar o Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: Nome do seu projeto (ex: "sistema-votacao")
   - **Database Password**: Crie uma senha forte (guarde bem!)
   - **Region**: Escolha a região mais próxima
4. Clique em **"Create new project"**
5. Aguarde alguns minutos até o projeto ser criado

### 1.2 Obter Credenciais do Supabase

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie as seguintes informações:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (chave pública anônima)

### 1.3 Configurar Variáveis de Ambiente

1. Na raiz do projeto, crie um arquivo `.env.local`:

```bash
# Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# Linux/Mac
touch .env.local
```

2. Adicione as credenciais do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

**⚠️ IMPORTANTE**: Substitua pelos valores reais do seu projeto!

---

## 🗄️ Passo 2: Configurar o Banco de Dados

### 2.1 Executar Scripts SQL no Supabase

1. No Supabase Dashboard, vá em **SQL Editor**
2. Execute os scripts na seguinte ordem:

#### Script 1: Criar Tabelas
1. Clique em **"New Query"**
2. Copie e cole o conteúdo de `scripts/001_create_tables.sql`
3. Clique em **"Run"** (ou pressione `Ctrl+Enter`)
4. Verifique se apareceu "Success. No rows returned"

#### Script 2: Inserir Candidatos de Exemplo
1. Crie uma nova query
2. Copie e cole o conteúdo de `scripts/006_setup_complete_system.sql`
3. Clique em **"Run"**
4. Verifique se apareceu "Success. 4 rows inserted"

### 2.2 Verificar Tabelas Criadas

1. No dashboard, vá em **Database** → **Tables**
2. Você deve ver duas tabelas:
   - ✅ `candidates` (com 4 candidatos)
   - ✅ `votes` (vazia por enquanto)

### 2.3 Desabilitar Confirmação de Email (Opcional mas Recomendado)

Para facilitar o desenvolvimento:

1. Vá em **Authentication** → **Settings**
2. Role até **Email Auth**
3. **Desmarque** a opção **"Enable email confirmations"**
4. Clique em **Save**

---

## 📦 Passo 3: Instalar Dependências

No terminal, na raiz do projeto:

```bash
# Se usar pnpm (recomendado)
pnpm install

# Ou se usar npm
npm install
```

---

## 🏃 Passo 4: Executar o Projeto

### Modo Desenvolvimento

```bash
# Com pnpm
pnpm dev

# Com npm
npm run dev
```

O sistema estará disponível em: **http://localhost:3000**

### Modo Produção

```bash
# Build
pnpm build
# ou
npm run build

# Iniciar servidor
pnpm start
# ou
npm start
```

---

## 👤 Passo 5: Criar Conta de Administrador

Você tem **2 opções**:

### Opção 1: Via Interface Web (Mais Fácil) ⭐

1. Acesse: **http://localhost:3000/auth/signup**
2. Preencha:
   - **Email**: `admin@votacao.com` (ou qualquer email)
   - **Senha**: Mínimo 6 caracteres
   - **Confirmar Senha**: Mesma senha
3. Clique em **"Criar Conta Admin"**
4. Você será redirecionado automaticamente para `/admin`

### Opção 2: Via Supabase Dashboard

1. No Supabase Dashboard, vá em **Authentication** → **Users**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: `admin@votacao.com`
   - **Password**: `Admin123!Voto` (ou outra senha)
   - ✅ **Marque**: "Auto Confirm User"
4. Clique em **"Create user"**
5. Agora faça login em: **http://localhost:3000/auth/login**

---

## ✅ Passo 6: Verificar se Está Funcionando

### Teste 1: Página Principal
1. Acesse: **http://localhost:3000**
2. Você deve ver 4 candidatos de exemplo
3. Tente votar em um candidato

### Teste 2: Resultados
1. Acesse: **http://localhost:3000/resultados**
2. Você deve ver gráficos e estatísticas

### Teste 3: Painel Admin
1. Acesse: **http://localhost:3000/auth/login**
2. Faça login com as credenciais criadas
3. Você deve ver o painel administrativo
4. Teste adicionar um novo candidato

---

## 🔍 Verificar Conexão com Supabase

### Verificação Automática

O sistema verifica automaticamente a conexão. Se houver problemas, você verá erros no console do navegador.

### Verificação Manual

1. Abra o **Console do Navegador** (F12)
2. Vá na aba **Network**
3. Recarregue a página
4. Procure por requisições para `supabase.co`
5. Se aparecerem erros 401/403, verifique as variáveis de ambiente

### Teste de Conexão via Código

Crie um arquivo temporário `test-connection.ts` na raiz:

```typescript
import { createClient } from './lib/supabase/client'

async function testConnection() {
  const supabase = createClient()
  const { data, error } = await supabase.from('candidates').select('*').limit(1)
  
  if (error) {
    console.error('❌ Erro de conexão:', error.message)
  } else {
    console.log('✅ Conexão OK! Candidatos encontrados:', data?.length)
  }
}

testConnection()
```

Execute com: `npx tsx test-connection.ts`

---

## 🐛 Problemas Comuns e Soluções

### Erro: "Variáveis de ambiente do Supabase não configuradas"

**Solução**: 
- Verifique se o arquivo `.env.local` existe
- Verifique se as variáveis estão corretas
- Reinicie o servidor de desenvolvimento (`Ctrl+C` e `pnpm dev` novamente)

### Erro: "Invalid API key" ou 401/403

**Solução**:
- Verifique se copiou a chave correta (anon key, não service role key)
- Verifique se não há espaços extras nas variáveis
- Certifique-se de que o projeto Supabase está ativo

### Erro: "relation does not exist"

**Solução**:
- Execute o script `001_create_tables.sql` no Supabase SQL Editor
- Verifique se as tabelas foram criadas em **Database** → **Tables**

### Erro: "Email not confirmed"

**Solução**:
- Desabilite a confirmação de email em **Authentication** → **Settings**
- Ou confirme o email manualmente no dashboard

### Página em branco ou erros de build

**Solução**:
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
pnpm install
pnpm dev
```

---

## 📊 Estrutura do Sistema

```
/                    → Página de votação pública
/resultados          → Dashboard de resultados em tempo real
/auth/login          → Login do administrador
/auth/signup         → Criar conta de administrador
/admin               → Painel administrativo (protegido)
```

---

## 🔐 Credenciais Padrão Sugeridas

```
Email: admin@votacao.com
Senha: Admin123!Voto
```

*(Você pode usar qualquer email/senha)*

---

## 📝 Checklist de Execução

- [ ] Projeto Supabase criado
- [ ] Variáveis de ambiente configuradas (`.env.local`)
- [ ] Scripts SQL executados no Supabase
- [ ] Tabelas criadas e verificadas
- [ ] Confirmação de email desabilitada (opcional)
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Servidor rodando (`pnpm dev`)
- [ ] Conta admin criada
- [ ] Login funcionando
- [ ] Página principal carregando candidatos
- [ ] Votação funcionando
- [ ] Resultados aparecendo

---

## 🎉 Pronto!

Se todos os passos foram concluídos, seu sistema de votação está funcionando!

**Próximos passos:**
- Personalize os candidatos no painel admin
- Configure o domínio para produção
- Ajuste as políticas de segurança conforme necessário

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador (F12)
2. Verifique os logs do terminal onde o servidor está rodando
3. Verifique o Supabase Dashboard para erros de API
4. Consulte a documentação do Supabase: https://supabase.com/docs

