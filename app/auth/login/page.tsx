"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LogIn, ArrowLeft } from "lucide-react"
import { AdminThemeWrapper } from "@/components/admin-theme-wrapper"

// Força a página a ser renderizada dinamicamente (não pré-renderizada)
export const dynamic = 'force-dynamic'

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        setError(signInError.message || "Erro ao fazer login")
        setLoading(false)
        return
      }

      if (data.user) {
        router.push("/admin")
        router.refresh()
      }
    } catch (err) {
      setError("Erro inesperado ao fazer login")
      setLoading(false)
    }
  }

  return (
    <AdminThemeWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-700 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para início
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-slate-900 to-blue-950 shadow-lg">
                <LogIn className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Login Administrativo
            </CardTitle>
            <CardDescription className="text-center">
              Acesse o painel de administração do sistema de votação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@votacao.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 text-amber-50 font-semibold shadow-md hover:shadow-lg border border-amber-500/20" 
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
              Não tem uma conta?{" "}
              <Link href="/auth/signup" className="text-slate-900 hover:text-blue-900 font-medium hover:underline">
                Criar conta admin
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </AdminThemeWrapper>
  )
}

