import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("election_settings")
      .select("is_open, updated_at")
      .eq("id", 1)
      .maybeSingle()

    // Se a tabela não existir ou não houver linha, retornar padrão aberto
    if (error) {
      return NextResponse.json({ is_open: true, updated_at: null })
    }
    if (!data) {
      return NextResponse.json({ is_open: true, updated_at: null })
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar configurações" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

    const { is_open } = await request.json()
    if (typeof is_open !== "boolean") {
      return NextResponse.json({ error: "Parâmetro inválido" }, { status: 400 })
    }

    // Upsert garante criação da linha com id=1 caso não exista
    const { error } = await supabase.from("election_settings").upsert(
      { id: 1, is_open, updated_at: new Date().toISOString() },
      { onConflict: "id", ignoreDuplicates: false },
    )

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[settings] POST error:", error)
    // Tentar extrair mensagem clara
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "message" in (error as any)
        ? String((error as any).message)
        : "Erro ao atualizar configurações"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


