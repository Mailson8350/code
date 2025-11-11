"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidateName: string
  candidateId: string
  stageName?: string
}

export function PhotoViewerDialog({
  open,
  onOpenChange,
  candidateName,
  candidateId,
  stageName,
}: PhotoViewerDialogProps) {
  const displayName = stageName ? `${stageName} (${candidateName})` : candidateName
  const photoSrc = `/api/candidates/${candidateId}/photo`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
        <DialogTitle className="sr-only">
          Foto completa de {displayName}
        </DialogTitle>
        <div className="relative w-full aspect-[3/4] max-h-[90vh] bg-black">
          <Image
            src={photoSrc}
            alt={displayName}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 text-white">
              <h3 className="font-bold text-lg">{displayName}</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/60 backdrop-blur-sm hover:bg-black/80 text-white rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <DialogDescription className="sr-only">
          Visualização em tamanho completo da foto de {displayName}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

