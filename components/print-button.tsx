"use client"

import { Button } from "@/components/ui/button"

export function PrintButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      onClick={() => {
        if (typeof window !== "undefined") window.print()
      }}
    >
      {children}
    </Button>
  )
}


