"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, FileText, Trophy, PresentationIcon, Code } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getFeaturedItems } from "@/lib/data"
import { useLanguage } from "@/lib/i18n/language-context"

export default function FeaturedSection() {
  const [featured, setFeatured] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadData = async () => {
      const data = await getFeaturedItems()
      setFeatured(data)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <section
        className="relative mt-16 p-6 rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-background/95 to-background via-primary/5 backdrop-blur-sm shadow-lg"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)",
        }}
      >
        <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm font-medium">
          {t.common.featured}
        </div>
        <h2 className="text-2xl font-bold mb-6">{t.home.featuredContentTitle}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white/80 backdrop-blur-sm border border-dashed border-primary/10">
              <CardHeader>
                <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="w-full h-20 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  // Function to get icon based on content type
  const getIconForType = (type: string) => {
    switch (type) {
      case "project":
        return <Code className="w-5 h-5 text-blue-600" />
      case "paper":
        return <FileText className="w-5 h-5 text-emerald-600" />
      case "presentation":
        return <PresentationIcon className="w-5 h-5 text-purple-600" />
      case "competition":
        return <Trophy className="w-5 h-5 text-amber-500" />
      default:
        return <Star className="w-5 h-5 text-primary" />
    }
  }

  return (
    <section
      className="relative mt-16 p-6 rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-background/95 to-background via-primary/5 backdrop-blur-sm shadow-lg"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)",
      }}
    >
      <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm font-medium">
        {t.common.featured}
      </div>
      <div className="flex items-center space-x-2 mb-6">
        <Star className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">{t.home.featuredContentTitle}</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((item, index) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 border border-dashed hover:border-primary/50 hover:shadow-md bg-white/80 backdrop-blur-sm group-hover:transform group-hover:scale-[1.03]">
                <CardHeader className="p-4 border-b border-border/50 bg-muted/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors group-hover:scale-105 transform transition-transform duration-300">
                      {item.title}
                    </CardTitle>
                    {getIconForType(item.type)}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={item.link} className="flex items-center text-sm text-primary hover:underline group">
                    {t.common.viewDetails}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

