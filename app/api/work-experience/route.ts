import { NextResponse } from "next/server"
import workExperienceData from "@/data/work-experience.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(workExperienceData)
}

