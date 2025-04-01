"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { getStats } from "@/lib/data"
import { useLanguage } from "@/lib/i18n/language-context"
import { getStatLabel } from "@/lib/i18n/translations"

// IBM Design Language UI icons
const IBMIcons = {
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22L6 16L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10L26 16L20 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Document: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2H8C6.89543 2 6 2.89543 6 4V28C6 29.1046 6.89543 30 8 30H24C25.1046 30 26 29.1046 26 28V8L20 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 2V8H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 12H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 24H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Trophy: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 20C20.4183 20 24 16.4183 24 12V4H8V12C8 16.4183 11.5817 20 16 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 4H6C4.89543 4 4 4.89543 4 6V8C4 10.2091 5.79086 12 8 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 4H26C27.1046 4 28 4.89543 28 6V8C28 10.2091 26.2091 12 24 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 20V24H20V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 28H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Presentation: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 4H6C4.89543 4 4 4.89543 4 6V22C4 23.1046 4.89543 24 6 24H26C27.1046 24 28 23.1046 28 22V6C28 4.89543 27.1046 4 26 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 24V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 30H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12L16 18L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Analytics: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 28V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 28H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default function StatsCounter() {
  const [stats, setStats] = useState<Record<string, number>>({})
  const { language, t } = useLanguage()

  useEffect(() => {
    const loadStats = async () => {
      const data = await getStats()
      setStats(data)
    }

    loadStats()
  }, [])

  return (
    <div
      className="relative mt-16 p-6 rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-background/95 to-background via-primary/5 backdrop-blur-sm shadow-lg"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)",
      }}
    >
      <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm font-medium">
        {t.common.statistics}
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Object.entries(stats).map(([key, value], index) => {
          // Define different colors for each stat type
          const iconColors = {
            projects: "text-blue-600 group-hover:text-blue-700",
            papers: "text-emerald-600 group-hover:text-emerald-700",
            competitions: "text-amber-500 group-hover:text-amber-600",
            presentations: "text-purple-600 group-hover:text-purple-700",
          }

          const iconColor = iconColors[key as keyof typeof iconColors] || "text-primary/80"

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 text-center border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 transition-all group hover:shadow-md group-hover:transform hover:scale-[1.05] duration-300"
            >
              <div className="flex justify-center mb-3">
                <div
                  className={`${iconColor} transition-colors group-hover:scale-110 transform transition-transform duration-300`}
                >
                  {getIconForStat(key)}
                </div>
              </div>
              <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                {value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {getStatLabel(key, language)}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function getIconForStat(key: string) {
  switch (key) {
    case "projects":
      return <IBMIcons.Code className="w-8 h-8" />
    case "papers":
      return <IBMIcons.Document className="w-8 h-8" />
    case "competitions":
      return <IBMIcons.Trophy className="w-8 h-8" />
    case "presentations":
      return <IBMIcons.Presentation className="w-8 h-8" />
    default:
      return <IBMIcons.Analytics className="w-8 h-8" />
  }
}

