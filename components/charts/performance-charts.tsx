"use client";

import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Trade } from "@/types/database";

export function PerformanceCharts({ trades }: { trades: Trade[] }) {
  const monthly = Object.values(
    trades.reduce<Record<string, { month: string; pnl: number }>>((acc, trade) => {
      const month = trade.trade_date.slice(0, 7);
      acc[month] ||= { month, pnl: 0 };
      acc[month].pnl += trade.pnl;
      return acc;
    }, {})
  );

  const distribution = [
    { name: "Wins", value: trades.filter((trade) => trade.pnl > 0).length, color: "#22C55E" },
    { name: "Losses", value: trades.filter((trade) => trade.pnl < 0).length, color: "#EF4444" },
    { name: "Breakeven", value: trades.filter((trade) => trade.pnl === 0).length, color: "#F59E0B" }
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.12} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 8, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
                {monthly.map((item) => (
                  <Cell key={item.month} fill={item.pnl >= 0 ? "#22C55E" : "#EF4444"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Win/Loss Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={96} paddingAngle={4}>
                {distribution.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
