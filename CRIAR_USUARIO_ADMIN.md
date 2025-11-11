# Como Criar o Usuário Admin no Supabase

## PROBLEMA IDENTIFICADO

Os logs mostram:
- Login com `admin@votacao.com` falhou: **invalid_credentials** (usuário não existe)
- Signup com `william@gmail.com` falhou: **email_address_invalid** (validação de email)

## SOLUÇÃO: Criar Usuário Admin no Supabase Dashboard

### PASSO 1: Acessar o Supabase Dashboard

1. Vá para https://supabase.com/dashboard
2. Faça login na sua conta Supabase
3. Selecione o projeto "Voting system"

### PASSO 2: Desabilitar Confirmação de Email

**IMPORTANTE**: Faça isso ANTES de criar o usuário!

1. No menu lateral, clique em **Authentication**
2. Clique em **Providers**
3. Clique em **Email** na lista
4. **DESMARQUE** a opção "Confirm email"
5. Clique em **Save**

### PASSO 3: Criar o Usuário Admin

1. No menu lateral, clique em **Authentication**
2. Clique em **Users**
3. Clique no botão **Add user** (canto superior direito)
4. Escolha **Create new user**
5. Preencha os dados:
   - **Email**: `admin@votacao.com`
   - **Password**: `Admin123!Voto`
   - **Auto Confirm User**: ATIVE essa opção ✓
6. Clique em **Create user**

### PASSO 4: Verificar Criação

Após criar, você verá o usuário na lista com:
- Email: admin@votacao.com
- Status: **Confirmed** (verde)

### PASSO 5: Fazer Login

Agora você pode fazer login no sistema:

1. Acesse `/auth/login`
2. Use as credenciais:
   - **Email**: `admin@votacao.com`
   - **Senha**: `Admin123!Voto`
3. Você será redirecionado para `/admin`

## CREDENCIAIS PADRÃO

\`\`\`
Email: admin@votacao.com
Senha: Admin123!Voto
\`\`\`

## Troubleshooting

### Se ainda receber "Email not confirmed"

1. Volte em Authentication > Users
2. Clique nos 3 pontinhos ao lado do usuário
3. Selecione "Confirm email"

### Se o email for rejeitado como inválido

O Supabase pode ter configurações de domínio restritivas. Use um email completo e válido como `admin@votacao.com`.

### Múltiplas instâncias do GoTrueClient

Esse aviso foi corrigido no código com o padrão singleton adequado.
\`\`\`

```tsx file="" isHidden
