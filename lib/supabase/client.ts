"use client"

import { createBrowserClient } from "@supabase/ssr"
import type { SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | undefined

export function createClient(): SupabaseClient {
  // Verifica se já existe um cliente cached
  if (client) {
    return client
  }

  // As variáveis NEXT_PUBLIC_* devem estar disponíveis no build
  // Se não estiverem, criamos um cliente placeholder que não falhará
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nvhvmcuhujfefrvffbyr.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52aHZtY3VodWpmZWZydmZmYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MjYxNTUsImV4cCI6MjA3ODEwMjE1NX0.FcQjpTcee2mkSzKyDAjBzkcnmIiYXcT6KV4df9fYDTg"

  // Se as variáveis não estiverem definidas, cria um cliente placeholder
  // Isso evita erros durante o build, mas o cliente não funcionará até
  // que as variáveis sejam configuradas corretamente
  if (!supabaseUrl || !supabaseAnonKey) {
    // Durante o build, isso permite que o código compile sem erros
    // No runtime, o usuário verá erros ao tentar usar o cliente
    console.warn(
      "⚠️ Variáveis de ambiente do Supabase não configuradas. " +
      "Configure NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY"
    )
    
    // Cria um cliente com valores placeholder
    // Isso não funcionará, mas permite que o build continue
    client = createBrowserClient(
      "https://placeholder.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )
    return client
  }

  // Cria o cliente real com as credenciais corretas
  client = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })

  return client
}
