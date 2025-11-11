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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div 
          className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-indigo-100 cursor-pointer group"
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
          <Badge className="absolute top-3 right-3 bg-blue-600 text-white text-lg font-bold px-3 py-1 z-10">
            {candidate.number}
          </Badge>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2">
              <ZoomIn className="h-6 w-6 text-gray-900" />
            </div>
          </div>
        </div>
      <CardHeader>
        <CardTitle className="text-xl">{displayName}</CardTitle>
        {candidate.city && <CardDescription className="font-medium text-blue-600">{candidate.city}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        {candidate.talent && (
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-900">Talento:</p>
            <p className="text-sm text-gray-700">{candidate.talent}</p>
          </div>
        )}
        {candidate.bio && <p className="text-sm text-gray-700 line-clamp-3">{candidate.bio}</p>}
      </CardContent>
      <CardFooter>
        <Button onClick={onVote} className="w-full bg-blue-600 hover:bg-blue-700">
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
