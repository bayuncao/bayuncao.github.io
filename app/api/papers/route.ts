import { NextResponse } from "next/server"
import papersData from "@/data/papers.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(papersData)
}

