import { VotingSection } from "@/components/voting-section"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { Trophy, BarChart3 } from "lucide-react"

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-slate-200/50 bg-gradient-to-r from-slate-900/95 via-blue-950/95 to-slate-900/95 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex gap-3">
              <Link
                href="/resultados"
                className="px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800 rounded-lg transition-all hover:shadow-md flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Ver Resultados
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 hover:from-amber-400 hover:to-yellow-400 font-semibold rounded-lg transition-all hover:shadow-lg"
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
            <div className="inline-flex items-center justify-center mb-4">
              <Trophy className="h-8 w-8 text-amber-500 mr-2" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-4 text-balance">
                Escolha seu candidato
              </h2>
            </div>
            <p className="text-lg text-foreground/80 text-pretty">
              Vote de forma segura e transparente. Seu voto é anônimo e conta em tempo real.
            </p>
          </div>

          <VotingSection />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-gradient-to-r from-slate-900 to-blue-950 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <Logo size="sm" showText={true} className="justify-center mb-4" />
          <p className="text-sm text-amber-400 font-medium">Concurso de Talentos</p>
          <p className="text-xs text-slate-300 mt-1">Votação segura e transparente <br /> By: NEXUS Tech - +245 956 338 807</p>
        </div>
      </footer>
    </div>
  )
}
