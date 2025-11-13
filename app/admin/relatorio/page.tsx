import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"
import { PrintButton } from "@/components/print-button"
import { AdminThemeWrapper } from "@/components/admin-theme-wrapper"

export const revalidate = 0

export default async function RelatorioPage() {
  const supabase = await createClient()

  const { data: candidates } = await supabase.from("candidates").select("*").order("number", { ascending: true })

  const rows = await Promise.all(
    (candidates || []).map(async (c) => {
      const { count } = await supabase.from("votes").select("*", { count: "exact", head: true }).eq("candidate_id", c.id)
      return {
        candidate: c,
        votes: count || 0,
      }
    }),
  )

  const total = rows.reduce((acc, r) => acc + r.votes, 0)

  return (
    <AdminThemeWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Relatório Detalhado da Votação</h1>
              <p className="text-sm text-gray-600">Resumo completo e pronto para impressão</p>
            </div>
          </div>
          <PrintButton>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </PrintButton>
        </div>
      </header>

        <div className="container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-white">
                <div className="text-sm text-muted-foreground">Total de Candidatos</div>
                <div className="text-2xl font-semibold mt-1">{rows.length}</div>
              </div>
              <div className="p-4 rounded-lg border bg-white">
                <div className="text-sm text-muted-foreground">Total de Votos</div>
                <div className="text-2xl font-semibold mt-1">{total}</div>
              </div>
              <div className="p-4 rounded-lg border bg-white">
                <div className="text-sm text-muted-foreground">Data/Hora</div>
                <div className="text-2xl font-semibold mt-1">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detalhamento por Candidato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg bg-white print:min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 border-b">Número</th>
                    <th className="px-4 py-3 border-b">Nome</th>
                    <th className="px-4 py-3 border-b">Nome Artístico</th>
                    <th className="px-4 py-3 border-b">Cidade</th>
                    <th className="px-4 py-3 border-b">Talento</th>
                    <th className="px-4 py-3 border-b">Votos</th>
                    <th className="px-4 py-3 border-b">Percentual</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ candidate, votes }) => {
                    const pct = total > 0 ? ((votes / total) * 100).toFixed(2) : "0.00"
                    return (
                      <tr key={candidate.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border-b">{candidate.number}</td>
                        <td className="px-4 py-3 border-b">{candidate.name}</td>
                        <td className="px-4 py-3 border-b">{candidate.stage_name || "-"}</td>
                        <td className="px-4 py-3 border-b">{candidate.city || "-"}</td>
                        <td className="px-4 py-3 border-b">{candidate.talent || "-"}</td>
                        <td className="px-4 py-3 border-b">{votes}</td>
                        <td className="px-4 py-3 border-b">{pct}%</td>
                      </tr>
                    )
                  })}
                  <tr className="font-semibold bg-gray-50">
                    <td className="px-4 py-3 border-b" colSpan={5}>
                      Total
                    </td>
                    <td className="px-4 py-3 border-b">{total}</td>
                    <td className="px-4 py-3 border-b">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </AdminThemeWrapper>
  )
}


