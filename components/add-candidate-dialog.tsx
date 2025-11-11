"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddCandidateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AddCandidateDialog({ open, onOpenChange, onSuccess }: AddCandidateDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    city: "",
    stage_name: "",
    age: "",
    height_cm: "",
    talent: "",
    bio: "",
    instagram: "",
  })
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const body = new FormData()
      body.set("name", formData.name)
      body.set("number", String(Number.parseInt(formData.number)))
      body.set("city", formData.city)
      if (formData.stage_name) body.set("stage_name", formData.stage_name)
      if (formData.age) body.set("age", String(Number.parseInt(formData.age)))
      if (formData.height_cm) body.set("height_cm", String(Number.parseInt(formData.height_cm)))
      body.set("talent", formData.talent)
      if (formData.bio) body.set("bio", formData.bio)
      if (formData.instagram) body.set("instagram", formData.instagram)
      if (photoFile) {
        // Reduzir imagem no cliente e gerar thumbnail para melhor performance
        const originalBlob = photoFile
        const resized = await resizeImage(originalBlob, 800) // largura máx 800px
        const thumb = await resizeImage(originalBlob, 320) // thumbnail 320px
        body.set("photo", resized)
        body.set("photo_thumb", thumb)
      }

      const response = await fetch("/api/candidates", { method: "POST", body })

      const data = await response.json()

      if (!response.ok) {
        const errorMsg = data.error || data.details || "Erro ao adicionar candidato"
        console.error("[AddCandidate] API Error:", { status: response.status, error: errorMsg, data })
        throw new Error(errorMsg)
      }

      // Resetar form
      setFormData({
        name: "",
        number: "",
        city: "",
        stage_name: "",
        age: "",
        height_cm: "",
        talent: "",
        bio: "",
        instagram: "",
      })
      setPhotoFile(null)

      onSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao adicionar")
    } finally {
      setIsLoading(false)
    }
  }

  async function resizeImage(file: Blob, maxWidth: number): Promise<Blob> {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, maxWidth / bitmap.width)
    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return file
    ctx.drawImage(bitmap, 0, 0, width, height)
    const type = (file.type && file.type !== "application/octet-stream") ? file.type : "image/jpeg"
    const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b || file), type, 0.85))
    return blob
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Candidato</DialogTitle>
          <DialogDescription>Preencha os dados do candidato. Campos essenciais: Nome, Número, Cidade e Talento.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  type="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage_name">Nome Artístico (opcional)</Label>
                <Input
                  id="stage_name"
                  value={formData.stage_name}
                  onChange={(e) => setFormData({ ...formData, stage_name: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="talent">Talento</Label>
              <Input
                id="talent"
                value={formData.talent}
                onChange={(e) => setFormData({ ...formData, talent: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade (opcional)</Label>
                <Input
                  id="age"
                  type="number"
                  min={14}
                  max={120}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height_cm">Altura em cm (opcional)</Label>
                <Input
                  id="height_cm"
                  type="number"
                  min={120}
                  max={230}
                  value={formData.height_cm}
                  onChange={(e) => setFormData({ ...formData, height_cm: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografia (opcional)</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (opcional)</Label>
              <Input
                id="instagram"
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/usuario"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Foto (upload do computador, opcional)</Label>
              <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adicionando..." : "Adicionar Candidato"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
