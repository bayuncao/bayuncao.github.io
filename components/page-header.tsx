"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface PageHeaderProps {
  title: string
  description: string
  icon?: ReactNode
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-start">
      <Link href="/" className="flex items-center mb-6 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="w-4 h-4 mr-1" />
        {t.common.backToHome}
      </Link>

      <div className="flex items-center space-x-4">
        {icon && <div>{icon}</div>}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
}

