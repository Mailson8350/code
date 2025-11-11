import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createDefaultAdmin() {
  const email = "admin@votacao.com"
  const password = "Admin@2024!Seguro"

  console.log("[v0] Criando usuário admin padrão...")

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) {
    console.error("[v0] Erro ao criar admin:", error)
    return
  }

  console.log("[v0] ✅ Admin criado com sucesso!")
  console.log("\n📧 Email:", email)
  console.log("🔑 Senha:", password)
  console.log("\nAcesse /auth/login para fazer login\n")
}

createDefaultAdmin()
