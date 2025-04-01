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

// Directly import JSON data
import profileData from "@/data/profile.json";
import workExperienceData from "@/data/work-experience.json";
import presentationsData from "@/data/presentations.json";
import competitionsData from "@/data/competitions.json";
import papersData from "@/data/papers.json";
import projectsData from "@/data/projects.json";
import featuredData from "@/data/featured.json";
import statsData from "@/data/stats.json";

// Fetch profile data
export async function getProfile(): Promise<ProfileType> {
  // Simply return the data directly for static export
  return profileData as ProfileType;
}

// Fetch work experience data
export async function getWorkExperience(): Promise<WorkExperience[]> {
  // Simply return the data directly for static export
  return workExperienceData as WorkExperience[];
}

// Fetch presentations data
export async function getPresentations(): Promise<Presentation[]> {
  // Simply return the data directly for static export
  return presentationsData as Presentation[];
}

// Fetch competitions data
export async function getCompetitions(): Promise<Competition[]> {
  // Simply return the data directly for static export
  return competitionsData as Competition[];
}

// Fetch papers data
export async function getPapers(): Promise<Paper[]> {
  // Simply return the data directly for static export
  return papersData as Paper[];
}

// Fetch projects data
export async function getProjects(): Promise<Project[]> {
  // Simply return the data directly for static export
  return projectsData as Project[];
}

// Fetch featured items
export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  // Simply return the data directly for static export
  return featuredData as FeaturedItem[];
}

// Fetch stats
export async function getStats(): Promise<Stats> {
  // Simply return the data directly for static export
  return statsData as Stats;
}

