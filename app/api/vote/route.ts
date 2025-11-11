import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { candidateId } = await request.json()

    if (!candidateId) {
      return NextResponse.json({ error: "ID do candidato é obrigatório" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verificar se eleição está aberta
    const { data: settings, error: settingsError } = await supabase
      .from("election_settings")
      .select("is_open")
      .eq("id", 1)
      .maybeSingle()
    
    if (settingsError) {
      console.error("[v0] Error checking election settings:", settingsError)
      // Continuar mesmo se houver erro na verificação
    } else if (settings && settings.is_open === false) {
      return NextResponse.json({ error: "Votação encerrada no momento" }, { status: 403 })
    }

    // Gerar identificador único baseado em IP e user agent
    const forwarded = request.headers.get("x-forwarded-for")
    const ip = forwarded ? forwarded.split(",")[0] : "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"
    const voterIdentifier = `${ip}-${userAgent}`

    // Verificar se já votou
    const { data: existingVote } = await supabase
      .from("votes")
      .select("id")
      .eq("voter_identifier", voterIdentifier)
      .single()

    if (existingVote) {
      return NextResponse.json({ error: "Você já votou! Cada pessoa pode votar apenas uma vez." }, { status: 400 })
    }

    // Registrar o voto
    const { error: voteError } = await supabase.from("votes").insert({
      candidate_id: candidateId,
      voter_identifier: voterIdentifier,
    })

    if (voteError) throw voteError

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error registering vote:", error)
    return NextResponse.json({ error: "Erro ao registrar voto" }, { status: 500 })
  }
}
