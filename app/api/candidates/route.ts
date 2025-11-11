import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // Verificar autenticação
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    // Suporte a multipart/form-data (upload de foto) e JSON como fallback
    let payload:
      | {
          name?: string
          number?: number
          city?: string
          stage_name?: string
          age?: number
          height_cm?: number
          talent?: string
          bio?: string
          instagram?: string
        }
      | null = null
    let photoBytes: Uint8Array | null = null
    let photoMime: string | null = null
    let photoThumbBytes: Uint8Array | null = null
    let photoThumbMime: string | null = null

    const contentType = request.headers.get("content-type") || ""
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData()
      const file = form.get("photo") as File | null
      if (file && file.size > 0) {
        // Validações de upload
        const maxBytes = 3 * 1024 * 1024 // 3MB
        const allowed = new Set(["image/jpeg", "image/png", "image/webp"])
        if (file.size > maxBytes) {
          return NextResponse.json({ error: "A foto deve ter no máximo 3MB" }, { status: 400 })
        }
        if (file.type && !allowed.has(file.type)) {
          return NextResponse.json({ error: "Formato de imagem inválido (use JPG, PNG ou WEBP)" }, { status: 400 })
        }
        const arrayBuffer = await file.arrayBuffer()
        photoBytes = new Uint8Array(arrayBuffer)
        photoMime = file.type || "application/octet-stream"
      }
      // Thumb opcional vinda do cliente
      const thumb = form.get("photo_thumb") as File | null
      if (thumb && thumb.size > 0) {
        const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"])
        if (thumb.type && !allowed.has(thumb.type)) {
          return NextResponse.json({ error: "Formato de thumbnail inválido" }, { status: 400 })
        }
        const ab = await thumb.arrayBuffer()
        photoThumbBytes = new Uint8Array(ab)
        photoThumbMime = thumb.type || "application/octet-stream"
      }
      payload = {
        name: (form.get("name") as string) || undefined,
        number: form.get("number") ? Number.parseInt(form.get("number") as string, 10) : undefined,
        city: (form.get("city") as string) || undefined,
        stage_name: (form.get("stage_name") as string) || undefined,
        age: form.get("age") ? Number.parseInt(form.get("age") as string, 10) : undefined,
        height_cm: form.get("height_cm") ? Number.parseInt(form.get("height_cm") as string, 10) : undefined,
        talent: (form.get("talent") as string) || undefined,
        bio: (form.get("bio") as string) || undefined,
        instagram: (form.get("instagram") as string) || undefined,
      }
    } else {
      const body = await request.json().catch(() => ({}))
      payload = body
    }

    const { name, number, city, stage_name, age, height_cm, talent, bio, instagram } = payload || {}

    // Log para debug
    console.log("[v0] Received payload:", { name, number, city, talent, hasPhoto: !!photoBytes, hasThumb: !!photoThumbBytes })

    // Validações mínimas para concurso de talentos/beleza
    if (!name || name.trim() === "") {
      return NextResponse.json({ error: "Nome é obrigatório" }, { status: 400 })
    }
    if (!number || isNaN(Number(number)) || Number(number) <= 0) {
      return NextResponse.json({ error: "Número é obrigatório e deve ser um número válido maior que zero" }, { status: 400 })
    }
    if (!city || city.trim() === "") {
      return NextResponse.json({ error: "Cidade é obrigatória" }, { status: 400 })
    }
    if (!talent || talent.trim() === "") {
      return NextResponse.json({ error: "Talento é obrigatório" }, { status: 400 })
    }

    // Garantir que number é um número inteiro
    const candidateNumber = Number.parseInt(String(number), 10)
    if (isNaN(candidateNumber)) {
      return NextResponse.json({ error: "Número inválido" }, { status: 400 })
    }

    // Verificar se número já existe
    const { data: existing, error: checkError } = await supabase
      .from("candidates")
      .select("id")
      .eq("number", candidateNumber)
      .maybeSingle()

    if (checkError) {
      console.error("[v0] Error checking existing candidate:", checkError)
    }

    if (existing) {
      return NextResponse.json({ error: `Número ${candidateNumber} já está em uso por outro candidato` }, { status: 400 })
    }

    // Preparar dados para inserção
    const insertData: Record<string, unknown> = {
      name: name.trim(),
      number: candidateNumber,
      city: city.trim(),
      stage_name: stage_name?.trim() || null,
      age: age ? Number.parseInt(String(age), 10) : null,
      height_cm: height_cm ? Number.parseInt(String(height_cm), 10) : null,
      talent: talent.trim(),
      bio: bio?.trim() || null,
      instagram: instagram?.trim() || null,
    }

    // Adicionar fotos apenas se existirem
    // Se houver fotos, tentar usar função RPC que aceita bytea corretamente
    if ((photoBytes && photoBytes.length > 0) || (photoThumbBytes && photoThumbBytes.length > 0)) {
      try {
        // Converter para base64 para passar via JSON (PostgREST aceita base64 para bytea)
        const photoBase64 = photoBytes ? Buffer.from(photoBytes).toString('base64') : null
        const thumbBase64 = photoThumbBytes ? Buffer.from(photoThumbBytes).toString('base64') : null
        
        // Usar função RPC que converte base64 para bytea no banco
        // Ordem: obrigatórios primeiro, depois opcionais
        const { data: candidateId, error: rpcError } = await supabase.rpc('insert_candidate_with_photo', {
          p_name: name.trim(),
          p_number: candidateNumber,
          p_city: city.trim(),
          p_talent: talent.trim(),
          p_stage_name: stage_name?.trim() || null,
          p_age: age ? Number.parseInt(String(age), 10) : null,
          p_height_cm: height_cm ? Number.parseInt(String(height_cm), 10) : null,
          p_bio: bio?.trim() || null,
          p_instagram: instagram?.trim() || null,
          p_photo_base64: photoBase64,
          p_photo_mime: photoMime || null,
          p_photo_thumb_base64: thumbBase64,
          p_photo_thumb_mime: photoThumbMime || null,
        })

        if (rpcError) {
          console.error("[v0] RPC error (function may not exist):", rpcError)
          throw rpcError // Vai para o catch abaixo
        }

        if (!candidateId) {
          throw new Error("RPC returned no candidate ID")
        }

        // Buscar o candidato criado
        const { data: candidateData, error: fetchError } = await supabase
          .from("candidates")
          .select("*")
          .eq("id", candidateId)
          .single()

        if (fetchError) throw fetchError
        return NextResponse.json(candidateData)
      } catch (rpcError) {
        // Se a função RPC não existir ou falhar, inserir sem fotos primeiro
        console.warn("[v0] RPC failed, inserting candidate without photos first:", rpcError)
        
        const { data: candidateData, error: insertError } = await supabase
          .from("candidates")
          .insert(insertData)
          .select()
          .single()
        
        if (insertError) {
          console.error("[v0] Insert error:", insertError)
          throw insertError
        }

        // Se conseguiu inserir, retornar (fotos serão adicionadas depois se necessário)
        // Por enquanto, retornamos o candidato sem fotos
        console.warn("[v0] Candidate created without photos. Please run the SQL function script: scripts/009_create_bytea_function.sql")
        return NextResponse.json(candidateData)
      }
    }

    // Inserir candidato sem fotos usando insert direto
    const { data, error } = await supabase
      .from("candidates")
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error("[v0] Supabase error:", error)
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error creating candidate:", error)
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
    return NextResponse.json({ 
      error: "Erro ao criar candidato",
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    }, { status: 500 })
  }
}
