import { NextResponse } from "next/server"
import papersData from "@/data/papers.json"

export async function GET() {
  return NextResponse.json(papersData)
}

