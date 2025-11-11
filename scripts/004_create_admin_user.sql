-- Script para criar um usuário admin padrão no Supabase Auth
-- IMPORTANTE: Este script deve ser executado via SQL Editor do Supabase Dashboard
-- ou via API, pois a tabela auth.users é protegida

-- Instruções:
-- 1. Acesse o Supabase Dashboard
-- 2. Vá em SQL Editor
-- 3. Cole e execute este script
-- 4. Use as credenciais abaixo para fazer login

-- CREDENCIAIS DO ADMIN PADRÃO:
-- Email: admin@votacao.com
-- Senha: Admin123!@#

-- Nota: O Supabase requer que você crie usuários via:
-- 1. Authentication > Users > Add User (no dashboard), OU
-- 2. Via signup page em /auth/signup, OU  
-- 3. Desabilitar email confirmation em Authentication > Settings

-- Para facilitar, desabilite a confirmação de email:
-- Authentication > Settings > Email Auth > Enable email confirmations = OFF

-- Depois você pode criar o admin via /auth/signup com:
-- Email: admin@votacao.com
-- Senha: Admin123!@#
