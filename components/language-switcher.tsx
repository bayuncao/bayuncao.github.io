"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

// Removed lucide-react icons in favor of IBM Design Language UI icons

// IBM Design Language UI icons
const IBMIcons = {
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 16H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M16 4C19.3137 7.31371 21.3137 11.3137 22 16C21.3137 20.6863 19.3137 24.6863 16 28C12.6863 24.6863 10.6863 20.6863 10 16C10.6863 11.3137 12.6863 7.31371 16 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ArrowUp: () => (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 14L16 4L26 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Ribbon: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4L19.2411 10.5589L26.5 11.4822L21.25 16.5411L22.4821 23.75L16 20.3L9.51792 23.75L10.75 16.5411L5.5 11.4822L12.7589 10.5589L16 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial scroll position
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
      <div className="floating-controls relative group">
        {/* Main trigger button */}
        <Button
          size="icon"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl rounded-full w-12 h-12 transition-all duration-300 hover:scale-105 z-20 flex items-center justify-center"
        >
          <IBMIcons.Ribbon className="w-6 h-6 text-primary-foreground group-hover:animate-pulse transition-all duration-500" />
        </Button>

        {/* Drawer that appears on hover */}
        <div className="absolute bottom-full mb-3 right-0 flex flex-col gap-3 items-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {/* Back to top button */}
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-white hover:bg-primary/10 text-primary shadow-md rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 border-2 border-primary/30"
          >
            <IBMIcons.ArrowUp className="h-5 w-5" />
          </Button>

          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white hover:bg-primary/10 text-primary shadow-md rounded-full w-10 h-10 transition-all duration-300 hover:scale-110 border-2 border-primary/30 relative"
              >
                <IBMIcons.Globe className="h-5 w-5" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-primary-foreground font-medium shadow-sm">
                  {language.toUpperCase()}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-primary/30 bg-white/95 backdrop-blur-md shadow-lg p-1 min-w-[150px] rounded-xl"
            >
              <DropdownMenuItem
                onClick={() => changeLanguage("en")}
                className={`
                  ${language === "en" ? "bg-primary/10 font-medium" : ""} 
                  hover:bg-primary/5 cursor-pointer mb-1 rounded-lg py-3 px-4
                  flex items-center justify-between
                `}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">🇺🇸</span>
                  <span>English</span>
                </div>
                {language === "en" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => changeLanguage("zh")}
                className={`
                  ${language === "zh" ? "bg-primary/10 font-medium" : ""} 
                  hover:bg-primary/5 cursor-pointer rounded-lg py-3 px-4
                  flex items-center justify-between
                `}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3">🇨🇳</span>
                  <span>中文</span>
                </div>
                {language === "zh" && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

