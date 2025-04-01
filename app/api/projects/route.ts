import { NextResponse } from "next/server"
import projectsData from "@/data/projects.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(projectsData)
}

