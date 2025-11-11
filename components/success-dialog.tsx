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
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-2xl">Voto registrado com sucesso!</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            <span className="block text-base mb-2">
              Seu voto em <span className="font-bold text-gray-900">{candidateName}</span> foi registrado.
            </span>
            <span className="block text-sm">Obrigado por participar! Você pode acompanhar os resultados em tempo real.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction onClick={handleViewResults} className="bg-blue-600 hover:bg-blue-700">
            Ver Resultados
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
