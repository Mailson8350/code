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

    if (!id) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#64748b" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif" text-anchor="middle">
    <text x="200" y="155" font-size="18" font-weight="600">Sem foto</text>
  </g>
</svg>`
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      })
    }

    const { data, error } = await supabase
      .from("candidates")
      .select("photo_thumb, photo_thumb_mime, photo, photo_mime")
      .eq("id", id)
      .maybeSingle()

    // Debug: verificar o que foi retornado
    if (data) {
      console.log(`[DEBUG] Candidate ${id} - has photo_thumb: ${!!data.photo_thumb}, has photo: ${!!data.photo}`)
      if (data.photo_thumb) {
        console.log(`[DEBUG] photo_thumb type: ${typeof data.photo_thumb}, length: ${typeof data.photo_thumb === 'string' ? data.photo_thumb.length : 'N/A'}`)
      }
    }

    // Se houver erro ou candidato não encontrado, retornar placeholder
    if (error || !data) {
      console.log(`[DEBUG] Error or no data for candidate ${id}:`, error)
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#64748b" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif" text-anchor="middle">
    <text x="200" y="155" font-size="18" font-weight="600">Sem foto</text>
  </g>
</svg>`
      return new NextResponse(svg, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      })
    }

    // Preferir thumbnail; fallback para original; fallback para SVG
    // Supabase/PostgREST retorna bytea como string hex (formato \x...)
    if (data?.photo_thumb) {
      try {
        let buffer: Buffer
        if (typeof data.photo_thumb === 'string') {
          // PostgREST retorna bytea como string hex com prefixo \x
          const hexString = data.photo_thumb.startsWith('\\x') 
            ? data.photo_thumb.slice(2) 
            : data.photo_thumb.replace(/^\\x/, '')
          buffer = Buffer.from(hexString, 'hex')
          console.log(`[DEBUG] Converted photo_thumb from hex, size: ${buffer.length} bytes`)
        } else if (data.photo_thumb instanceof Buffer) {
          buffer = data.photo_thumb
        } else if (data.photo_thumb instanceof Uint8Array) {
          buffer = Buffer.from(data.photo_thumb)
        } else {
          // Tentar como ArrayBuffer
          buffer = Buffer.from(data.photo_thumb as unknown as ArrayBuffer)
        }
        
        if (buffer.length === 0) {
          throw new Error('Empty buffer')
        }
        
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": data.photo_thumb_mime || "image/jpeg",
            "Cache-Control": "public, max-age=86400, immutable",
          },
        })
      } catch (err) {
        console.error(`[DEBUG] Error processing photo_thumb:`, err)
        // Continuar para fallback
      }
    }

    if (data?.photo) {
      try {
        let buffer: Buffer
        if (typeof data.photo === 'string') {
          const hexString = data.photo.startsWith('\\x') 
            ? data.photo.slice(2) 
            : data.photo.replace(/^\\x/, '')
          buffer = Buffer.from(hexString, 'hex')
          console.log(`[DEBUG] Converted photo from hex, size: ${buffer.length} bytes`)
        } else if (data.photo instanceof Buffer) {
          buffer = data.photo
        } else if (data.photo instanceof Uint8Array) {
          buffer = Buffer.from(data.photo)
        } else {
          buffer = Buffer.from(data.photo as unknown as ArrayBuffer)
        }
        
        if (buffer.length === 0) {
          throw new Error('Empty buffer')
        }
        
        return new NextResponse(buffer, {
          headers: {
            "Content-Type": data.photo_mime || "image/jpeg",
            "Cache-Control": "public, max-age=86400, immutable",
          },
        })
      } catch (err) {
        console.error(`[DEBUG] Error processing photo:`, err)
        // Continuar para fallback SVG
      }
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0e7ff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <g fill="#64748b" font-family="system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif" text-anchor="middle">
    <text x="200" y="155" font-size="18" font-weight="600">Sem foto</text>
  </g>
</svg>`
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch {
    return new NextResponse("Error", { status: 500 })
  }
}


