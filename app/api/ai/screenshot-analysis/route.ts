import { NextResponse } from "next/server";
import { analyzeTradeScreenshots } from "@/lib/adapters/ai";

export async function POST() {
  const analysis = await analyzeTradeScreenshots();
  return NextResponse.json(analysis);
}
