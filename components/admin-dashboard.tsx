"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminCandidateTable } from "@/components/admin-candidate-table"
import { AddCandidateDialog } from "@/components/add-candidate-dialog"
import { Users, UserPlus, LogOut, Home, TrendingUp, RefreshCcw } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Candidate {
  id: string
  name: string
  number: number
  party: string
  bio: string
  proposals: string
  photo_url: string
  votes: number
}

interface AdminDashboardProps {
  candidates: Candidate[]
  totalVotes: number
  userEmail: string
}

export function AdminDashboard({ candidates: initialCandidates, totalVotes, userEmail }: AdminDashboardProps) {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const supabase = createClient()
      const { data } = await supabase.from("election_settings").select("is_open").eq("id", 1).single()
      setIsOpen(data?.is_open ?? true)
    })()
  }, [])

  const toggleElection = async () => {
    const newValue = !(isOpen ?? true)
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_open: newValue }),
      })
      if (!res.ok) throw new Error("Erro ao atualizar status da eleição")
      setIsOpen(newValue)
      router.refresh()
    } catch (e) {
      // noop simple alert for now
      alert(e instanceof Error ? e.message : "Erro ao atualizar")
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const handleCandidateAdded = () => {
    setShowAddDialog(false)
    router.refresh()
  }

  const handleCandidateDeleted = () => {
    router.refresh()
  }

  const handleResetElection = async () => {
    setIsResetting(true)
    try {
      const response = await fetch("/api/vote/reset", { method: "POST" })
      const payload = await response.json().catch(() => null)
      if (!response.ok) {
        throw new Error(payload?.error ?? "Erro ao reiniciar votação")
      }
      setIsOpen(true)
      router.refresh()
      alert("Votação reiniciada com sucesso!")
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao reiniciar votação")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200/50 bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-slate-900/95 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-400">
                Painel Administrativo
              </h1>
              <p className="text-sm text-slate-300">Logado como: {userEmail}</p>
              <p className="text-sm mt-1">
                Status da votação:{" "}
                <span className={isOpen ? "text-amber-400 font-medium" : "text-red-400 font-medium"}>
                  {isOpen ? "Aberta" : "Encerrada"}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant={isOpen ? "destructive" : "default"} onClick={toggleElection} disabled={isOpen === null}>
                {isOpen ? "Encerrar Votação" : "Iniciar Votação"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" disabled={isOpen === null} className="border border-slate-500/40">
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reiniciar votação?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação encerra a votação atual, remove todos os votos registrados e reabre uma nova votação. Essa operação não pode ser
                      desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isResetting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetElection} disabled={isResetting}>
                      {isResetting ? "Reiniciando..." : "Confirmar"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Início
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resultados">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Resultados
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/relatorio">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Relatório
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Votos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{totalVotes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Candidatos Cadastrados</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{candidates.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Candidates Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gerenciar Candidatos</CardTitle>
                <Button onClick={() => setShowAddDialog(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Adicionar Candidato
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <AdminCandidateTable candidates={candidates} onCandidateDeleted={handleCandidateDeleted} />
            </CardContent>
          </Card>
        </div>
      </div>

      <AddCandidateDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSuccess={handleCandidateAdded} />
    </div>
  )
}
