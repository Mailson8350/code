import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin-dashboard"
import { AdminThemeWrapper } from "@/components/admin-theme-wrapper"

export default async function AdminPage() {
  const supabase = await createClient()

  // Buscar candidatos sem campos pesados (fotos)
  const { data: candidates } = await supabase
    .from("candidates")
    .select("id, name, number, city, stage_name, talent, bio, created_at, updated_at")
    .order("number", { ascending: true })

  // Buscar contagem total de votos
  const { count: totalVotes } = await supabase.from("votes").select("*", { count: "exact", head: true })

  // Buscar todos os votos e agrupar no código (mais compatível)
  const { data: allVotes } = await supabase.from("votes").select("candidate_id")

  // Contar votos por candidato
  const voteCounts: Record<string, number> = {}
  ;(allVotes || []).forEach((vote) => {
    voteCounts[vote.candidate_id] = (voteCounts[vote.candidate_id] || 0) + 1
  })

  const results = (candidates || []).map((candidate) => ({
    ...candidate,
    votes: voteCounts[candidate.id] || 0,
  }))

  return (
    <AdminThemeWrapper>
      <AdminDashboard candidates={results} totalVotes={totalVotes || 0} userEmail="Admin" />
    </AdminThemeWrapper>
  )
}
