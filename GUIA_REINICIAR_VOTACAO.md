# 🔄 Guia: Configurar Reiniciar Votação

## ⚠️ Passo Obrigatório: Executar Script SQL

Para que o botão "Reiniciar Votação" funcione, você precisa executar o script SQL que adiciona a política RLS necessária.

### Como Executar:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard
   - Selecione seu projeto

2. **Abra o SQL Editor**
   - No menu lateral, clique em **SQL Editor**
   - Clique em **New query**

3. **Execute o Script**
   - Abra o arquivo `scripts/010_add_votes_delete_policy.sql`
   - Copie todo o conteúdo
   - Cole no SQL Editor do Supabase
   - Clique em **Run** (ou pressione Ctrl+Enter)

4. **Verificar Sucesso**
   - Você deve ver a mensagem: "Success. No rows returned"
   - Isso significa que a política foi criada com sucesso

## ✅ Após Executar o Script

O botão "Reiniciar Votação" no painel administrativo (`/admin`) agora funcionará corretamente e irá:

1. ✅ Deletar todos os votos registrados
2. ✅ Reabrir a votação automaticamente
3. ✅ Permitir que novos votos sejam registrados

## 🔒 Segurança

A política RLS criada permite apenas que **usuários autenticados** (administradores) deletem votos. Usuários não autenticados não têm permissão para esta operação.

## 🐛 Troubleshooting

### Erro: "Permissão negada"
- **Causa**: O script SQL não foi executado
- **Solução**: Execute o script `010_add_votes_delete_policy.sql` no Supabase

### Erro: "Não autorizado"
- **Causa**: Você não está logado como administrador
- **Solução**: Faça login em `/auth/login` antes de usar o botão

### O botão não aparece
- **Causa**: Você não está na página `/admin`
- **Solução**: Acesse `/admin` após fazer login

