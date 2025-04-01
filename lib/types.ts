export interface ProfileType {
  name: string
  title: string
  avatar: string
  shortBio: string
  longBio: string
  shortBio_zh?: string
  longBio_zh?: string
  skills?: string[]
  skills_zh?: string[]
  skillsTree: Record<string, string[]>
  skillsTree_zh?: Record<string, string[]>
  updates: string[]
  updates_zh?: string[]
}

export interface WorkExperience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
}

export interface Presentation {
  id: string
  title: string
  event: string
  location: string
  date: string
  description: string
  slidesUrl?: string
}

export interface Competition {
  id: string
  name: string
  type: string
  location: string
  date: string
  rank?: number
  description: string
  skills: string[]
  writeupUrl?: string
}

export interface Paper {
  id: string
  title: string
  authors: string[]
  abstract: string
  publishedDate: string
  journal?: string
  conference?: string
  doi?: string
  keywords: string[]
  pdfUrl?: string
  citationUrl?: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  stars: number
  forks: number
  githubUrl: string
  demoUrl?: string
}

export interface FeaturedItem {
  id: string
  title: string
  description: string
  type: "project" | "paper" | "competition" | "presentation"
  link: string
}

export interface Stats {
  projects: number
  papers: number
  competitions: number
  presentations: number
}

