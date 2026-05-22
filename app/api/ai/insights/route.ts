import { NextResponse } from "next/server";
import { generateAiInsights } from "@/lib/adapters/ai";
import { demoTrades } from "@/lib/demo-data";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const trades = Array.isArray(body.trades) ? body.trades : demoTrades;
  const insights = await generateAiInsights(trades);
  return NextResponse.json(insights);
}
