"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Candidate {
  id: string
  name: string
  number: number
  stage_name?: string
  city?: string
  talent?: string
  bio: string
  votes: number
}

interface AdminCandidateTableProps {
  candidates: Candidate[]
  onCandidateDeleted: () => void
}

export function AdminCandidateTable({ candidates, onCandidateDeleted }: AdminCandidateTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [candidateToDelete, setCandidateToDelete] = useState<Candidate | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (candidate: Candidate) => {
    setCandidateToDelete(candidate)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!candidateToDelete) return

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/candidates/${candidateToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao deletar candidato")
      }

      setDeleteDialogOpen(false)
      setCandidateToDelete(null)
      onCandidateDeleted()
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao deletar")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Nome Artístico</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Talento</TableHead>
              <TableHead>Votos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhum candidato cadastrado
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <Badge variant="outline" className="font-bold">
                      {candidate.number}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell className="text-sm text-gray-600">{candidate.stage_name || "-"}</TableCell>
                  <TableCell className="text-sm text-gray-600">{candidate.city || "-"}</TableCell>
                  <TableCell className="text-sm text-gray-600">{candidate.talent || "-"}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-600">{candidate.votes}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(candidate)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o candidato <span className="font-bold">{candidateToDelete?.name}</span>?
              Esta ação não pode ser desfeita e todos os votos serão perdidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
