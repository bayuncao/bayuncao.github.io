import { NextResponse } from "next/server"
import presentationsData from "@/data/presentations.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(presentationsData)
}

