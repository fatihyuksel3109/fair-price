// components/ThemeToggle.tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button onClick={toggleTheme} variant="outline" size="icon">
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 transform scale-100 opacity-100" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-transform duration-300 transform scale-100 opacity-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}