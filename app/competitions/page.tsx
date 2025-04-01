"use client"

import { useEffect, useState } from "react"
import { Trophy, Calendar, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCompetitions } from "@/lib/data"
import PageHeader from "@/components/page-header"
import { useLanguage } from "@/lib/i18n/language-context"

export default function CompetitionsPage() {
  const { t } = useLanguage()
  const [competitions, setCompetitions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await getCompetitions()
      setCompetitions(data)
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
        title={t.competitions.title}
        description={t.competitions.description}
        icon={<Trophy className="w-10 h-10 text-primary" />}
      />

      <div className="grid gap-6 mt-10">
        {competitions.map((competition) => (
          <Card key={competition.id} className="overflow-hidden border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex items-center">
                  <CardTitle className="text-xl">{competition.name}</CardTitle>
                  {competition.rank && (
                    <Badge className="ml-2" variant={getRankVariant(competition.rank)}>
                      {formatRank(competition.rank)}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {competition.date}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4 text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-1" />
                {competition.type} • {competition.location}
              </div>
              <p className="mb-4">{competition.description}</p>
              <div className="flex flex-wrap gap-2">
                {competition.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              {competition.writeupUrl && (
                <div className="mt-4">
                  <a
                    href={competition.writeupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    {t.competitions.viewWriteup}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getRankVariant(rank: number): "default" | "secondary" | "destructive" {
  if (rank === 1) return "destructive"
  if (rank <= 3) return "default"
  return "secondary"
}

function formatRank(rank: number): string {
  if (rank === 1) return "1st Place"
  if (rank === 2) return "2nd Place"
  if (rank === 3) return "3rd Place"
  return `${rank}th Place`
}

