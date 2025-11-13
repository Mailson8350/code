"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, BarChart3 } from "lucide-react"
import { ResultsChart } from "@/components/results-chart"
import { useRouter } from "next/navigation"
import { PhotoViewerDialog } from "@/components/photo-viewer-dialog"

interface CandidateResult {
  id: string
  name: string
  number: number
  city?: string
  stage_name?: string
  votes: number
}

interface ResultsDashboardProps {
  results: CandidateResult[]
  totalVotes: number
}

export function ResultsDashboard({ results: initialResults, totalVotes: initialTotal }: ResultsDashboardProps) {
  const [results, setResults] = useState(initialResults)
  const [totalVotes, setTotalVotes] = useState(initialTotal)
  const [selectedPhoto, setSelectedPhoto] = useState<{ id: string; name: string; stageName?: string } | null>(null)
  const router = useRouter()

  // Auto-refresh a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh()
    }, 5000)

    return () => clearInterval(interval)
  }, [router])

  // Atualizar quando os props mudarem
  useEffect(() => {
    setResults(initialResults)
    setTotalVotes(initialTotal)
  }, [initialResults, initialTotal])

  // Ordenar por número de votos
  const sortedResults = [...results].sort((a, b) => b.votes - a.votes)
  const winner = sortedResults[0]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Total de Votos</CardTitle>
            <Users className="h-4 w-4 text-foreground/80" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              {totalVotes}
            </div>
            <p className="text-xs text-foreground/70 mt-1">Atualização automática a cada 5s</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Concorrendo nesta eleição</p>
          </CardContent>
        </Card>

        <Card className="border-amber-400/50 bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-400">Liderando</CardTitle>
            <Trophy className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-300">
              {winner?.stage_name ? `${winner.stage_name} (${winner.name})` : winner?.name}
            </div>
            <p className="text-xs text-amber-200 mt-1 font-medium">
              {winner?.votes} votos ({totalVotes > 0 ? ((winner?.votes / totalVotes) * 100).toFixed(1) : 0}%)
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Votos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResultsChart results={sortedResults} />
        </CardContent>
      </Card>

      {/* Detailed Results - mobile friendly list */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados Detalhados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sortedResults.map((candidate, index) => {
            const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0
            const isLeader = index === 0

            return (
              <div key={candidate.id} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={`/api/candidates/${candidate.id}/photo/thumb`}
                      alt={candidate.name}
                      className="h-10 w-10 rounded object-cover flex-shrink-0 bg-slate-800 cursor-pointer hover:opacity-80 transition-opacity"
                      loading="lazy"
                      onClick={() => setSelectedPhoto({ id: candidate.id, name: candidate.name, stageName: candidate.stage_name })}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground flex items-center gap-2 truncate">
                        {candidate.stage_name ? `${candidate.stage_name} (${candidate.name})` : candidate.name}
                        {isLeader && <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <Badge 
                          variant={isLeader ? "default" : "outline"} 
                          className={isLeader ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 border-amber-400/50 font-bold" : "border-slate-300 text-slate-700"}
                        >
                          {candidate.number}
                        </Badge>
                        {candidate.city && <span className="truncate">{candidate.city}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-lg bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                      {candidate.votes}
                    </p>
                    <p className="text-sm text-foreground/70">{percentage.toFixed(1)}%</p>
                  </div>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-slate-900 [&>div]:to-blue-900" 
                />
              </div>
            )
          })}
        </CardContent>
      </Card>
      
      {selectedPhoto && (
        <PhotoViewerDialog
          open={!!selectedPhoto}
          onOpenChange={(open) => !open && setSelectedPhoto(null)}
          candidateName={selectedPhoto.name}
          candidateId={selectedPhoto.id}
          stageName={selectedPhoto.stageName}
        />
      )}
    </div>
  )
}
