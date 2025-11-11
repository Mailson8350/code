# Sistema de Administração - Guia Completo

## Credenciais de Acesso

O sistema já está funcionando! Você pode criar sua conta admin seguindo os passos abaixo.

## Como Criar Conta Admin

### Método 1: Via Interface Web (Recomendado)

1. Acesse: `/auth/signup`
2. Preencha:
   - **Email**: qualquer email válido (ex: `admin@votacao.com`)
   - **Senha**: mínimo 6 caracteres (ex: `Admin123!`)
   - **Confirmar Senha**: mesma senha
3. Clique em "Criar Conta"
4. Você será automaticamente redirecionado para `/admin`

### Método 2: Via Supabase Dashboard

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Authentication > Users**
3. Clique em **"Add User"** (botão verde)
4. Preencha:
   - Email: `admin@votacao.com`
   - Password: `Admin123!`
   - Auto Confirm User: ✓ (marcar)
5. Clique em **"Create User"**
6. Faça login em `/auth/login` com essas credenciais

## Importante: Configuração do Supabase

Se você encontrar o erro **"Email not confirmed"**, siga estes passos:

1. Acesse o Supabase Dashboard do seu projeto
2. Vá em **Authentication > Settings**
3. Role até **Auth Providers > Email**
4. **Desmarque** a opção **"Enable email confirmations"**
5. Clique em **"Save"**
6. Tente criar a conta novamente

## Estrutura do Sistema

### Rotas Públicas
- `/` - Página de votação
- `/resultados` - Dashboard de resultados em tempo real

### Rotas Admin (Requer Autenticação)
- `/auth/login` - Login de administrador
- `/auth/signup` - Criar nova conta admin
- `/admin` - Painel administrativo

### Funcionalidades Admin
- Visualizar estatísticas em tempo real
- Adicionar novos candidatos
- Editar candidatos existentes
- Remover candidatos
- Monitorar total de votos

## Recursos de Segurança

- **Autenticação Supabase**: Sistema robusto de autenticação
- **Middleware de Proteção**: Rotas `/admin/*` protegidas automaticamente
- **RLS (Row Level Security)**: Apenas usuários autenticados podem modificar candidatos
- **Prevenção de Votos Duplicados**: Sistema de identificador único por eleitor

## Troubleshooting

### Problema: "Email not confirmed"
**Solução**: Desabilite confirmação de email no Supabase (veja seção acima)

### Problema: "Invalid login credentials"
**Solução**: 
- Verifique se digitou o email/senha corretamente
- Confirme que a conta foi criada com sucesso
- Tente criar uma nova conta via `/auth/signup`

### Problema: Página /admin não carrega
**Solução**:
- Limpe o cache do navegador (Ctrl+Shift+R)
- Verifique se está logado (faça login novamente)
- Verifique o console do navegador para erros

### Problema: Múltiplas instâncias de GoTrueClient
**Solução**: Já corrigido! O sistema usa singleton pattern para evitar isso.

## Banco de Dados

### Tabelas
- **candidates**: Armazena informações dos candidatos
- **votes**: Registra todos os votos com timestamp

### RLS Policies
- Candidatos: Leitura pública, escrita apenas para autenticados
- Votos: Inserção pública (com prevenção de duplicatas), leitura pública

## Suporte

Se você continuar tendo problemas:
1. Verifique os logs do console do navegador (F12)
2. Verifique as configurações do Supabase
3. Tente limpar cookies e cache
4. Crie um novo usuário com email diferente
