import { NextResponse } from "next/server"
import profileData from "@/data/profile.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(profileData)
}

