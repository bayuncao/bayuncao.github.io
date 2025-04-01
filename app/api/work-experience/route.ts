import { NextResponse } from "next/server"
import workExperienceData from "@/data/work-experience.json"

export async function GET() {
  return NextResponse.json(workExperienceData)
}

