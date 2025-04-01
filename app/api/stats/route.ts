import { NextResponse } from "next/server"
import statsData from "@/data/stats.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(statsData)
}

