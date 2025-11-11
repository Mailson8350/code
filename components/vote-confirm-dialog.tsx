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
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-lg space-y-2 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-lg">{candidate.name}</div>
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 text-lg font-bold border-amber-400/50">
                {candidate.number}
              </Badge>
            </div>
            {candidate.party && <div className="text-sm text-slate-700">{candidate.party}</div>}
          </div>
          <div className="text-sm text-slate-600">Seu voto é anônimo e não pode ser alterado após a confirmação.</div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 text-amber-50 font-semibold shadow-md hover:shadow-lg border border-amber-500/20"
          >
            Confirmar Voto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
