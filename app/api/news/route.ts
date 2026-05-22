import { NextResponse } from "next/server";
import { getMarketNews } from "@/lib/adapters/news";

export async function GET() {
  const news = await getMarketNews();
  return NextResponse.json({ news });
}
