import { NextResponse } from "next/server"
import featuredData from "@/data/featured.json"

// This is required for static export
export const dynamic = "force-static"

export async function GET() {
  return NextResponse.json(featuredData)
}

