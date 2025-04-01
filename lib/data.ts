import type {
  ProfileType,
  WorkExperience,
  Presentation,
  Competition,
  Paper,
  Project,
  FeaturedItem,
  Stats,
} from "./types"

// Fetch profile data
export async function getProfile(): Promise<ProfileType> {
  const response = await fetch("/api/profile")
  if (!response.ok) {
    throw new Error("Failed to fetch profile data")
  }
  return response.json()
}

// Fetch work experience data
export async function getWorkExperience(): Promise<WorkExperience[]> {
  const response = await fetch("/api/work-experience")
  if (!response.ok) {
    throw new Error("Failed to fetch work experience data")
  }
  return response.json()
}

// Fetch presentations data
export async function getPresentations(): Promise<Presentation[]> {
  const response = await fetch("/api/presentations")
  if (!response.ok) {
    throw new Error("Failed to fetch presentations data")
  }
  return response.json()
}

// Fetch competitions data
export async function getCompetitions(): Promise<Competition[]> {
  const response = await fetch("/api/competitions")
  if (!response.ok) {
    throw new Error("Failed to fetch competitions data")
  }
  return response.json()
}

// Fetch papers data
export async function getPapers(): Promise<Paper[]> {
  const response = await fetch("/api/papers")
  if (!response.ok) {
    throw new Error("Failed to fetch papers data")
  }
  return response.json()
}

// Fetch projects data
export async function getProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects")
  if (!response.ok) {
    throw new Error("Failed to fetch projects data")
  }
  return response.json()
}

// Fetch featured items
export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  const response = await fetch("/api/featured")
  if (!response.ok) {
    throw new Error("Failed to fetch featured items")
  }
  return response.json()
}

// Fetch stats
export async function getStats(): Promise<Stats> {
  const response = await fetch("/api/stats")
  if (!response.ok) {
    throw new Error("Failed to fetch stats")
  }
  return response.json()
}

