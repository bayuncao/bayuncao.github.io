"use client"

import { useEffect, useState } from "react"
import { BookOpen, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPapers } from "@/lib/data"
import PageHeader from "@/components/page-header"
import { useLanguage } from "@/lib/i18n/language-context"

export default function PapersPage() {
  const { t } = useLanguage()
  const [papers, setPapers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await getPapers()
      setPapers(data)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container px-4 py-10 mx-auto">
      <PageHeader
        title={t.papers.title}
        description={t.papers.description}
        icon={<BookOpen className="w-10 h-10 text-primary" />}
      />

      <div className="grid gap-6 mt-10">
        {papers.map((paper) => (
          <Card key={paper.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <CardTitle className="text-xl">{paper.title}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {paper.publishedDate}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2 text-sm text-muted-foreground">
                <span>{paper.journal || paper.conference}</span>
                {paper.doi && <span className="ml-2">• DOI: {paper.doi}</span>}
              </div>

              <div className="mb-4">
                <span className="text-sm font-medium">{t.papers.authors}: </span>
                <span className="text-sm text-muted-foreground">{paper.authors.join(", ")}</span>
              </div>

              <p className="mb-4">{paper.abstract}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {paper.keywords.map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    {t.papers.viewPdf}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
                {paper.citationUrl && (
                  <a
                    href={paper.citationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    {t.papers.viewCitation}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

