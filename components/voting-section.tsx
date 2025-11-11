"use client"

import { useState, useEffect } from "react"
import { CandidateCard } from "@/components/candidate-card"
import { VoteConfirmDialog } from "@/components/vote-confirm-dialog"
import { SuccessDialog } from "@/components/success-dialog"
import { supabase } from "@/lib/supabase/client"

interface Candidate {
  id: string
  name: string
  number: number
  city?: string
  stage_name?: string
  talent?: string
  bio?: string
}

export function VotingSection() {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 8
  const [page, setPage] = useState(0)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    loadPage(0, true)
  }, [])

  async function loadPage(nextPage: number, replace = false) {
    if (nextPage < 0) return
    if (!replace && !hasMore) return
    if (!replace) setLoadingMore(true)
    const from = nextPage * pageSize
    const to = from + pageSize - 1
    // Não buscar campos pesados (fotos) na listagem - serão carregadas via API separada
    const { data } = await supabase
      .from("candidates")
      .select("id, name, number, city, stage_name, talent, bio")
      .order("number", { ascending: true })
      .range(from, to)
    const newItems = data || []
    if (replace) {
      setCandidates(newItems)
    } else {
      setCandidates((prev) => [...prev, ...newItems])
    }
    setHasMore(newItems.length === pageSize)
    setPage(nextPage)
    setLoading(false)
    if (!replace) setLoadingMore(false)
  }

  const handleVoteClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setShowConfirmDialog(true)
  }

  const handleConfirmVote = async () => {
    if (!selectedCandidate) return

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateId: selectedCandidate.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao registrar voto")
      }

      setShowConfirmDialog(false)
      setShowSuccessDialog(true)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao votar")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12 px-4">
        <div className="text-gray-600">Carregando candidatos...</div>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} onVote={() => handleVoteClick(candidate)} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => loadPage(page + 1)}
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={loadingMore}
          >
            {loadingMore ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}

      {selectedCandidate && (
        <>
          <VoteConfirmDialog
            open={showConfirmDialog}
            onOpenChange={setShowConfirmDialog}
            candidate={selectedCandidate}
            onConfirm={handleConfirmVote}
          />
          <SuccessDialog
            open={showSuccessDialog}
            onOpenChange={setShowSuccessDialog}
            candidateName={selectedCandidate.name}
          />
        </>
      )}
    </>
  )
}
