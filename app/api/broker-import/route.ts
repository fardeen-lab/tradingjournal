import { NextResponse } from "next/server";
import { importBrokerTrades, type BrokerProvider } from "@/lib/adapters/brokers";

const providers = new Set(["mt4", "mt5", "ctrader", "ninjatrader", "tradingview", "binance", "bybit", "okx", "interactive_brokers"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (!providers.has(body.provider)) {
    return NextResponse.json({ error: "Unsupported broker provider" }, { status: 400 });
  }

  const result = await importBrokerTrades(body.provider as BrokerProvider, Array.isArray(body.rows) ? body.rows : []);
  return NextResponse.json(result);
}
