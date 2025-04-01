import { NextResponse } from "next/server"
import competitionsData from "@/data/competitions.json"

export async function GET() {
  return NextResponse.json(competitionsData)
}

