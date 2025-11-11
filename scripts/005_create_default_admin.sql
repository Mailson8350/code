-- Criar usuário admin padrão no Supabase Auth
-- Este comando documenta como criar o admin via Supabase Dashboard

-- CREDENCIAIS DO ADMINISTRADOR PADRÃO:
-- Email: admin@votacao.com
-- Senha: Admin123!Voto

-- INSTRUÇÕES PARA CRIAR O ADMIN:
-- 1. Acesse o Supabase Dashboard do seu projeto
-- 2. Navegue para Authentication > Users
-- 3. Clique em "Add user" > "Create new user"
-- 4. Preencha:
--    - Email: admin@votacao.com
--    - Password: Admin123!Voto
-- 5. Marque "Auto Confirm User" para ativar imediatamente
-- 6. Clique em "Create user"

-- Se o usuário já existe mas não está confirmado, execute:
UPDATE auth.users 
SET email_confirmed_at = NOW(), 
    confirmed_at = NOW()
WHERE email = 'admin@votacao.com';

-- Desabilitar confirmação de email (opcional mas recomendado):
-- Authentication > Settings > Desmarcar "Enable email confirmations"
