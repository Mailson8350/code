"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PhotoViewerDialog } from "@/components/photo-viewer-dialog"
import { ZoomIn } from "lucide-react"

interface Candidate {
  id: string
  name: string
  number: number
  city?: string
  stage_name?: string
  talent?: string
  bio?: string
}

interface CandidateCardProps {
  candidate: Candidate
  onVote: () => void
}

export function CandidateCard({ candidate, onVote }: CandidateCardProps) {
  const [showPhotoViewer, setShowPhotoViewer] = useState(false)
  const displayName = candidate.stage_name ? `${candidate.stage_name} (${candidate.name})` : candidate.name
  const photoSrc = `/api/candidates/${candidate.id}/photo/thumb`
  
  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all border-slate-200 bg-white">
        <div 
          className="relative h-48 w-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50 cursor-pointer group"
          onClick={() => setShowPhotoViewer(true)}
        >
          <Image 
            src={photoSrc} 
            alt={candidate.name} 
            fill 
            className="object-cover transition-transform group-hover:scale-105" 
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-lg font-bold px-3 py-1 z-10 shadow-lg border-2 border-amber-400/50">
            {candidate.number}
          </Badge>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 rounded-full p-2 shadow-lg">
              <ZoomIn className="h-6 w-6 text-slate-900" />
            </div>
          </div>
        </div>
      <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50/50">
        <CardTitle className="text-xl text-slate-900">{displayName}</CardTitle>
        {candidate.city && <CardDescription className="font-medium text-slate-700">{candidate.city}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {candidate.talent && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-900">Talento:</p>
            <p className="text-sm text-slate-700">{candidate.talent}</p>
          </div>
        )}
        {candidate.bio && <p className="text-sm text-slate-600 line-clamp-3">{candidate.bio}</p>}
      </CardContent>
      <CardFooter className="bg-gradient-to-r from-slate-50 to-blue-50/30">
        <Button 
          onClick={onVote} 
          className="w-full bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 text-amber-50 font-semibold shadow-md hover:shadow-lg transition-all border border-amber-500/20"
        >
          Votar
        </Button>
      </CardFooter>
    </Card>
    
    <PhotoViewerDialog
      open={showPhotoViewer}
      onOpenChange={setShowPhotoViewer}
      candidateName={candidate.name}
      candidateId={candidate.id}
      stageName={candidate.stage_name}
    />
    </>
  )
}
