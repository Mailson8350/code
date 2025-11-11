"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  candidateName: string
}

export function SuccessDialog({ open, onOpenChange, candidateName }: SuccessDialogProps) {
  const router = useRouter()

  const handleViewResults = () => {
    onOpenChange(false)
    router.push("/resultados")
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-slate-900 to-blue-950 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="h-10 w-10 text-amber-400" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
            Voto registrado com sucesso!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <span className="block text-base mb-2">
              Seu voto em <span className="font-bold text-slate-900">{candidateName}</span> foi registrado.
            </span>
            <span className="block text-sm text-slate-600">Obrigado por participar! Você pode acompanhar os resultados em tempo real.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction 
            onClick={handleViewResults} 
            className="bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 text-amber-50 font-semibold shadow-md hover:shadow-lg border border-amber-500/20"
          >
            Ver Resultados
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
