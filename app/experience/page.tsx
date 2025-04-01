"use client"

import { Suspense, useEffect, useState } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getWorkExperience, getPresentations } from "@/lib/data"
import PageHeader from "@/components/page-header"
import { useLanguage } from "@/lib/i18n/language-context"

export default function ExperiencePage() {
  const { t } = useLanguage()
  const [workExperience, setWorkExperience] = useState<any[]>([])
  const [presentations, setPresentations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const workData = await getWorkExperience()
      const presData = await getPresentations()
      setWorkExperience(workData)
      setPresentations(presData)
      setIsLoading(false)
    }

    loadData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container px-4 py-10 mx-auto relative">
      <div className="absolute inset-0 warm-gradient pointer-events-none"></div>

      <PageHeader
        title={t.experience.title}
        description={t.experience.description}
        icon={<Briefcase className="w-10 h-10 text-primary" />}
      />

      <Tabs defaultValue="work" className="mt-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="work">{t.experience.workTab}</TabsTrigger>
          <TabsTrigger value="presentations">{t.experience.presentationsTab}</TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="mt-6">
          <Suspense fallback={<div>Loading work experience...</div>}>
            <div className="space-y-6">
              {workExperience.map((job, index) => {
                const isWarm = index % 2 === 1
                return (
                  <Card
                    key={job.id}
                    className={`overflow-hidden border-l-4 ${isWarm ? "border-l-accent" : "border-l-primary"}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <CardTitle className="text-xl">
                          {job.title} at {job.company}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {job.startDate} - {job.endDate || "Present"}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <p className="mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech: string, i: number) => (
                          <Badge key={i} variant={i % 2 === 0 ? "secondary" : "warm"}>
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Suspense>
        </TabsContent>

        <TabsContent value="presentations" className="mt-6">
          <Suspense fallback={<div>Loading presentations...</div>}>
            <div className="space-y-6">
              {presentations.map((presentation, index) => {
                const isWarm = index % 2 === 0
                return (
                  <Card key={presentation.id} className={isWarm ? "warm-accent-bg warm-accent-border" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                        <CardTitle className="text-xl">{presentation.title}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {presentation.date}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {presentation.event}, {presentation.location}
                      </div>
                      <p className="mb-4">{presentation.description}</p>
                      {presentation.slidesUrl && (
                        <a
                          href={presentation.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          {t.experience.viewSlides}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

