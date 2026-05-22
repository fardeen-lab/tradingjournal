import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoStrategies, demoTrades } from "@/lib/demo-data";

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Strategy Tracker</h2>
          <p className="text-sm text-muted-foreground">Create, tag, compare, and improve every trading strategy.</p>
        </div>
        <Button><Plus className="h-4 w-4" />New Strategy</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {demoStrategies.map((strategy) => {
          const trades = demoTrades.filter((trade) => trade.strategy_id === strategy.id);
          const wins = trades.filter((trade) => trade.pnl > 0).length;
          const winRate = trades.length ? Math.round((wins / trades.length) * 100) : 0;
          return (
            <Card key={strategy.id}>
              <CardHeader>
                <CardTitle>{strategy.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{strategy.description}</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg border p-3"><p className="text-muted-foreground">Trades</p><p className="text-lg font-semibold">{trades.length}</p></div>
                  <div className="rounded-lg border p-3"><p className="text-muted-foreground">Win Rate</p><p className="text-lg font-semibold">{winRate}%</p></div>
                  <div className="rounded-lg border p-3"><p className="text-muted-foreground">P&L</p><p className="text-lg font-semibold">${trades.reduce((sum, trade) => sum + trade.pnl, 0)}</p></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {strategy.rules.map((rule) => <span key={rule} className="rounded-md bg-muted px-2 py-1 text-xs">{rule}</span>)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
