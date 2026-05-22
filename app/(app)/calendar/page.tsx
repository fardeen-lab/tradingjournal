import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoTrades } from "@/lib/demo-data";
import { cn, formatCurrency } from "@/lib/utils";

export default function CalendarPage() {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const pnlByDay = demoTrades.reduce<Record<number, number>>((acc, trade) => {
    const day = Number(trade.trade_date.slice(-2));
    acc[day] = (acc[day] || 0) + trade.pnl;
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trading Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => {
            const pnl = pnlByDay[day] || 0;
            return (
              <div key={day} className={cn("min-h-24 rounded-lg border p-3", pnl > 0 && "bg-success/10", pnl < 0 && "bg-danger/10")}>
                <p className="text-sm font-medium">{day}</p>
                {pnl ? <p className={pnl > 0 ? "mt-6 text-sm text-success" : "mt-6 text-sm text-danger"}>{formatCurrency(pnl)}</p> : null}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
