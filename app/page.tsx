import { VotingSection } from "@/components/voting-section"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistema de Votação</h1>
                <p className="text-sm text-gray-600">Eleições 2025</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                href="/resultados"
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Ver Resultados
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">Escolha seu candidato</h2>
            <p className="text-lg text-gray-600 text-pretty">
              Vote de forma segura e transparente. Seu voto é anônimo e conta em tempo real.
            </p>
          </div>

          <VotingSection />
        </div>
      </section>

      <footer className="border-t bg-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>Sistema de Votação Online - Eleições 2025</p>
          <p className="mt-2">Votação segura e transparente</p>
        </div>
      </footer>
    </div>
  )
}
