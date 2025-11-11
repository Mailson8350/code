




/**
 * Script para verificar a conexão com o Supabase (executa em Node/Windows)
 * Execute: npx tsx scripts/verify-connection.ts
 */
import * as path from 'node:path'
import * as fs from 'node:fs'
import dotenv from 'dotenv'
// Carregar .env.local explicitamente (prioritário). Se não existir, carrega .env.
const envLocalPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath })
} else {
  dotenv.config()
}
import { createClient } from '@supabase/supabase-js'

async function verifyConnection() {
  console.log('🔍 Verificando conexão com Supabase...\n')

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERRO: Variáveis de ambiente não configuradas!')
    console.error('\nCrie .env.local com:')
    console.error('NEXT_PUBLIC_SUPABASE_URL=https://nvhvmcuhujfefrvffbyr.supabase.co')
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52aHZtY3VodWpmZWZydmZmYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MjYxNTUsImV4cCI6MjA3ODEwMjE1NX0.FcQjpTcee2mkSzKyDAjBzkcnmIiYXcT6KV4df9fYDTg\n')
    process.exit(1)
  }

  console.log('✅ Variáveis de ambiente encontradas')
  console.log(`   URL: ${supabaseUrl.substring(0, 30)}...`)

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Testar candidates
    console.log('\n📊 Testando conexão com "candidates"...')
    const { data: candidates, error: candidatesError } = await supabase
      .from('candidates')
      .select('*')
      .limit(5)

    if (candidatesError) {
      console.error('❌ ERRO ao acessar "candidates":', candidatesError.message)
      console.error('\nPossíveis causas:')
      console.error('1) Tabelas não criadas → rode scripts/001_create_tables.sql')
      console.error('2) Políticas RLS incorretas')
      console.error('3) Credenciais incorretas\n')
      process.exit(1)
    }
    console.log(`✅ OK. Registros retornados: ${candidates?.length || 0}`)

    // Testar votes (count)
    console.log('\n📊 Testando conexão com "votes"...')
    const { count: votesCount, error: votesError } = await supabase
      .from('votes')
      .select('*', { count: 'exact', head: true })

    if (votesError) {
      console.error('❌ ERRO ao acessar "votes":', votesError.message)
      process.exit(1)
    }
    console.log(`✅ OK. Total de votos: ${votesCount || 0}`)

    console.log('\n' + '='.repeat(50))
    console.log('✅ VERIFICAÇÃO COMPLETA - TUDO OK!')
    console.log('='.repeat(50) + '\n')
  } catch (error) {
    console.error('\n❌ ERRO inesperado:', error)
    process.exit(1)
  }
}

verifyConnection()

