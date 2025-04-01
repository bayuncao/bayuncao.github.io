"use client"

import { Suspense } from "react"
import Link from "next/link"
import ProfileHeader from "@/components/profile-header"
import FeaturedSection from "@/components/featured-section"
import StatsCounter from "@/components/stats-counter"
import { getProfile } from "@/lib/data"

// IBM Design Language UI icons
const IBMIcons = {
  Terminal: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M28 4H4C2.89543 4 2 4.89543 2 6V26C2 27.1046 2.89543 28 4 28H28C29.1046 28 30 27.1046 30 26V6C30 4.89543 29.1046 4 28 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 16L6 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 20H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  Briefcase: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26 8H6C3.79086 8 2 9.79086 2 12V24C2 26.2091 3.79086 28 6 28H26C28.2091 28 30 26.2091 30 24V12C30 9.79086 28.2091 8 26 8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 8V6C22 4.93913 21.5786 3.92172 20.8284 3.17157C20.0783 2.42143 19.0609 2 18 2H14C12.9391 2 11.9217 2.42143 11.1716 3.17157C10.4214 3.92172 10 4.93913 10 6V8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2 16H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22L6 16L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 10L26 16L20 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export default async function Home() {
  const profile = await getProfile()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/90 relative">
      <div className="absolute inset-0 warm-gradient pointer-events-none"></div>
      <div className="container px-4 py-10 mx-auto relative">
        <ProfileHeader profile={profile} />

        <HomeContent profile={profile} />
      </div>
    </main>
  )
}

function HomeContent({ profile }: { profile: any }) {
  return (
    <>
      <WelcomeSection profile={profile} />

      <Suspense fallback={<div>Loading stats...</div>}>
        <StatsCounter />
      </Suspense>

      <ExploreSection />

      <FeaturedSection />
    </>
  )
}

function WelcomeSection({ profile }: { profile: any }) {
  return <ClientWelcomeSection profile={profile} />
}

function ExploreSection() {
  return <ClientExploreSection />
}

// Client components that use the language context
import { useLanguage } from "@/lib/i18n/language-context"

function ClientWelcomeSection({ profile }: { profile: any }) {
  const { t } = useLanguage()

  return (
    <section
      className="relative mt-16 p-6 rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-background/95 to-background via-primary/5 backdrop-blur-sm shadow-lg"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)",
      }}
    >
      <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm font-medium">
        {t.common.welcome}
      </div>
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <IBMIcons.Terminal />
          <h2 className="text-2xl font-bold tracking-tight">{t.home.welcomeTitle}</h2>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform hover:scale-[1.03]">
          <div className="flex items-center space-x-2 mb-3">
            <IBMIcons.Terminal className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors hover:scale-110 transform transition-transform duration-300" />
            <h3 className="text-xl font-semibold hover:scale-105 transform transition-transform duration-300">
              {t.home.aboutSiteTitle}
            </h3>
          </div>
          <p className="mt-2 text-muted-foreground hover:text-foreground transition-colors">
            {t.home.aboutSiteDescription}
          </p>
        </div>
        <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform hover:scale-[1.03]">
          <div className="flex items-center space-x-2 mb-3">
            <IBMIcons.Analytics className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700 transition-colors hover:scale-110 transform transition-transform duration-300" />
            <h3 className="text-xl font-semibold hover:scale-105 transform transition-transform duration-300">
              {t.home.latestUpdatesTitle}
            </h3>
          </div>
          <ul className="mt-2 space-y-2">
            {profile.updates.slice(0, 3).map((update: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary">→</span>
                <span className="text-muted-foreground hover:text-foreground transition-colors">{update}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function ClientExploreSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative mt-16 p-6 rounded-xl border border-dashed border-primary/30 bg-gradient-to-br from-background/95 to-background via-primary/5 backdrop-blur-sm shadow-lg"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.03) 10px, rgba(59, 130, 246, 0.03) 20px)",
      }}
    >
      <div className="absolute -top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-md text-sm font-medium">
        {t.common.explore}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/experience" className="group">
          <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform group-hover:scale-[1.05]">
            <div className="flex justify-center mb-4">
              <IBMIcons.Briefcase className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors group-hover:scale-110 transform transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-center group-hover:scale-105 transform transition-transform duration-300">
              {t.home.workExperience}
            </h3>
            <p className="mt-2 text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
              {t.home.workExperienceDesc}
            </p>
          </div>
        </Link>

        <Link href="/competitions" className="group">
          <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform group-hover:scale-[1.05]">
            <div className="flex justify-center mb-4">
              <IBMIcons.Trophy className="w-12 h-12 text-amber-500 group-hover:text-amber-600 transition-colors group-hover:scale-110 transform transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-center group-hover:scale-105 transform transition-transform duration-300">
              {t.home.competitions}
            </h3>
            <p className="mt-2 text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
              {t.home.competitionsDesc}
            </p>
          </div>
        </Link>

        <Link href="/papers" className="group">
          <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform group-hover:scale-[1.05]">
            <div className="flex justify-center mb-4">
              <IBMIcons.Document className="w-12 h-12 text-emerald-600 group-hover:text-emerald-700 transition-colors group-hover:scale-110 transform transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-center group-hover:scale-105 transform transition-transform duration-300">
              {t.home.researchPapers}
            </h3>
            <p className="mt-2 text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
              {t.home.researchPapersDesc}
            </p>
          </div>
        </Link>

        <Link href="/projects" className="group">
          <div className="p-6 transition-all duration-300 border border-dashed rounded-lg bg-white/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-md group-hover:transform group-hover:scale-[1.05]">
            <div className="flex justify-center mb-4">
              <IBMIcons.Code className="w-12 h-12 text-purple-600 group-hover:text-purple-700 transition-colors group-hover:scale-110 transform transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-center group-hover:scale-105 transform transition-transform duration-300">
              {t.home.openSource}
            </h3>
            <p className="mt-2 text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors">
              {t.home.openSourceDesc}
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

