export type BrokerProvider = "mt4" | "mt5" | "ctrader" | "ninjatrader" | "tradingview" | "binance" | "bybit" | "okx" | "interactive_brokers";

export interface BrokerImportResult {
  provider: BrokerProvider;
  imported: number;
  skipped: number;
  errors: string[];
}

export async function importBrokerTrades(provider: BrokerProvider, rows: unknown[]): Promise<BrokerImportResult> {
  return {
    provider,
    imported: rows.length,
    skipped: 0,
    errors: []
  };
}
