"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light"

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  attribute?: string
  enableSystem?: boolean
  forcedTheme?: Theme
}

const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
}>({
  theme: "light",
  setTheme: () => null,
})

export function ThemeProvider({
  children,
  defaultTheme = "light",
  attribute = "class",
  enableSystem = false,
  forcedTheme,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement

    // Always use light theme
    root.classList.remove("dark")
    root.classList.add("light")

    if (attribute === "class") {
      root.classList.add("light")
    } else {
      root.setAttribute(attribute, "light")
    }
  }, [attribute])

  const value = {
    theme: "light" as Theme,
    setTheme: (theme: Theme) => {
      // No-op since we're forcing light mode
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

