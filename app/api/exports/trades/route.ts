import { NextResponse } from "next/server";
import { demoTrades } from "@/lib/demo-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "csv";

  if (format === "json") {
    return NextResponse.json({ trades: demoTrades });
  }

  const headers = ["date", "symbol", "market", "direction", "setup", "session", "pnl", "r_multiple"];
  const rows = demoTrades.map((trade) => [
    trade.trade_date,
    trade.symbol,
    trade.market,
    trade.direction,
    trade.setup,
    trade.trading_session,
    trade.pnl,
    trade.r_multiple
  ]);
  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=trades.csv"
    }
  });
}
