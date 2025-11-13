"use client"

import { useEffect } from "react"

interface AdminThemeWrapperProps {
  children: React.ReactNode
}

export function AdminThemeWrapper({ children }: AdminThemeWrapperProps) {
  useEffect(() => {
    document.body.classList.add("admin-theme")
    return () => {
      document.body.classList.remove("admin-theme")
    }
  }, [])

  return <>{children}</>
}

