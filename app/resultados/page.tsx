import { createClient } from "@/lib/supabase/server"
import { ResultsDashboard } from "@/components/results-dashboard"
import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"

export const revalidate = 0 // Disable caching for real-time updates

export default async function ResultadosPage() {
  const supabase = await createClient()

  // Buscar candidatos sem campos pesados (fotos serão carregadas via API)
  const { data: candidates } = await supabase
    .from("candidates")
    .select("id, name, number, city, stage_name, talent, bio")
    .order("number", { ascending: true })

  // Buscar todos os votos e agrupar no código (mais compatível)
  const { data: allVotes } = await supabase.from("votes").select("candidate_id")

  // Contar votos por candidato
  const voteCounts: Record<string, number> = {}
  ;(allVotes || []).forEach((vote) => {
    voteCounts[vote.candidate_id] = (voteCounts[vote.candidate_id] || 0) + 1
  })

  const results = (candidates || []).map((c) => ({ ...c, votes: voteCounts[c.id] || 0 }))

  // Total de votos
  const { count: totalVotes } = await supabase.from("votes").select("*", { count: "exact", head: true })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-slate-900/95 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-slate-100" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md">
                  <TrendingUp className="h-6 w-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-amber-400">
                    Resultados em Tempo Real
                  </h1>
                  <p className="text-sm text-slate-300">Acompanhe a apuração ao vivo</p>
                </div>
              </div>
            </div>
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 hover:from-amber-400 hover:to-yellow-400 font-semibold rounded-lg transition-all hover:shadow-lg"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <ResultsDashboard results={results} totalVotes={totalVotes || 0} />
      </div>
    </div>
  )
}
