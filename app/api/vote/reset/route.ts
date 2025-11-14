import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Tentar deletar todos os votos usando o cliente autenticado
    // Isso requer que a política RLS "Authenticated users can delete votes" esteja criada
    // Usamos uma condição que sempre é verdadeira para deletar todos os registros
    const { error: deleteError } = await supabase.from("votes").delete().gte("voted_at", "1970-01-01")
    
    if (deleteError) {
      // Se falhar, pode ser que a política RLS não esteja configurada
      // Verificar se é erro de permissão
      if (deleteError.code === "42501" || deleteError.message?.includes("permission")) {
        return NextResponse.json(
          { 
            error: "Permissão negada. Execute o script SQL: scripts/010_add_votes_delete_policy.sql no Supabase para habilitar esta funcionalidade." 
          },
          { status: 403 }
        )
      }
      throw deleteError
    }

    // Atualizar configurações da eleição para reabrir
    const { error: settingsError } = await supabase.from("election_settings").upsert(
      {
        id: 1,
        is_open: true,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id", ignoreDuplicates: false },
    )

    if (settingsError) throw settingsError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[vote-reset] POST error:", error)
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in (error as any)
          ? String((error as any).message)
          : "Erro ao reiniciar votação"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

