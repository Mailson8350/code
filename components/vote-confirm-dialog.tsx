"use client"

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
import { Badge } from "@/components/ui/badge"

interface Candidate {
  name: string
  number: number
  party: string
}

interface VoteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidate: Candidate
  onConfirm: () => void
}

export function VoteConfirmDialog({ open, onOpenChange, candidate, onConfirm }: VoteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar seu voto</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a confirmar seu voto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-3 pt-2">
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-gray-900 text-lg">{candidate.name}</div>
              <Badge className="bg-blue-600 text-white text-lg font-bold">{candidate.number}</Badge>
            </div>
            <div className="text-sm text-blue-700">{candidate.party}</div>
          </div>
          <div className="text-sm">Seu voto é anônimo e não pode ser alterado após a confirmação.</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-blue-600 hover:bg-blue-700">
            Confirmar Voto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
