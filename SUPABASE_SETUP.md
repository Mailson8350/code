# Configuração do Supabase para Desenvolvimento

## Problema: Email não confirmado

Se você está recebendo o erro "Email not confirmed" ao tentar fazer login, siga estas instruções:

## Solução: Desabilitar confirmação de email (Desenvolvimento)

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá para **Authentication** no menu lateral
4. Clique em **Settings**
5. Na seção **Email Auth**, encontre a opção **"Enable email confirmations"**
6. **Desmarque** esta opção
7. Clique em **Save**

## Alternativa: Confirmar email manualmente

Se preferir manter a confirmação de email habilitada:

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para **Authentication > Users**
3. Encontre o usuário que você criou
4. Clique nos três pontos (...) ao lado do usuário
5. Selecione **"Confirm email"**

## Para Produção

⚠️ **IMPORTANTE**: Em produção, você deve manter a confirmação de email habilitada por questões de segurança. Configure um serviço de email SMTP no Supabase para enviar emails de confirmação automaticamente.

## Credenciais Padrão para Teste

Após desabilitar a confirmação de email, crie uma conta usando:

1. Acesse `/auth/signup`
2. Cadastre seu email e senha
3. Você será automaticamente redirecionado para o painel admin

## Suporte

Se continuar tendo problemas, verifique:
- As variáveis de ambiente estão configuradas corretamente
- O projeto Supabase está ativo
- Você tem acesso ao dashboard do Supabase
