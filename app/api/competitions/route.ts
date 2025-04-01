import { NextResponse } from "next/server"
import competitionsData from "@/data/competitions.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(competitionsData)
}

