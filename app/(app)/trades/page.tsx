import { TradeTable } from "@/components/app/trade-table";
import { demoTrades } from "@/lib/demo-data";

export default function TradesPage() {
  return <TradeTable trades={demoTrades} />;
}
