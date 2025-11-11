import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const supabase = await createClient()
    // Compatibilidade com Next.js 15 (params pode ser Promise) e versões anteriores
    const params = context.params instanceof Promise ? await context.params : context.params
    const id = params.id

    const { data, error } = await supabase
      .from("candidates")
      .select("photo, photo_mime")
      .eq("id", id)
      .single()

    if (error) {
      return new NextResponse("Not found", { status: 404 })
    }

    if (!data?.photo) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#64748b" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif" text-anchor="middle">
    <text x="300" y="210" font-size="22" font-weight="600">Sem foto</text>
    <text x="300" y="240" font-size="14">Concurso de Talentos</text>
  </g>
</svg>`
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=86400, immutable",
        },
      })
    }

    // Tratar bytea do Supabase
    let buffer: Buffer
    if (typeof data.photo === 'string') {
      buffer = Buffer.from(data.photo.replace(/^\\x/, ''), 'hex')
    } else if (data.photo instanceof Buffer) {
      buffer = data.photo
    } else {
      buffer = Buffer.from(data.photo as unknown as ArrayBuffer)
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": data.photo_mime || "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}


