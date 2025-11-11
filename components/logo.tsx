"use client"

import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <Image
          src="/logo-vozes-do-amanha.png"
          alt="VOZES DO AMANHÃ"
          fill
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            VOZES DO AMANHÃ
          </h1>
          <p className="text-xs text-slate-300">Concurso de Talentos</p>
        </div>
      )}
    </Link>
  )
}

