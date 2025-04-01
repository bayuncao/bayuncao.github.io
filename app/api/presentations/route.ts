import { NextResponse } from "next/server"
import presentationsData from "@/data/presentations.json"

export async function GET() {
  return NextResponse.json(presentationsData)
}

