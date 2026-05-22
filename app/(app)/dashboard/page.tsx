import { Activity, Banknote, ShieldCheck, Target, TrendingDown, TrendingUp } from "lucide-react";
import { EquityCurve } from "@/components/charts/equity-curve";
import { PerformanceCharts } from "@/components/charts/performance-charts";
import { MetricCard } from "@/components/app/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { buildAnalytics, traderScore } from "@/lib/calculations";
import { demoGoals, demoTrades } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const analytics = buildAnalytics(demoTrades);
  const score = traderScore({
    winRate: analytics.winRate,
    profitFactor: analytics.profitFactor,
    maxDrawdown: analytics.maxDrawdown,
    ruleAdherence: 86,
    riskScore: 91
  });
  const balance = demoTrades.at(-1)?.account_size || 25000;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total P&L" value={formatCurrency(analytics.totalPnl)} change="+8.4% this month" icon={Banknote} tone="success" />
        <MetricCard label="Win Rate" value={`${analytics.winRate}%`} change={`${analytics.totalTrades} total trades`} icon={TrendingUp} />
        <MetricCard label="Profit Factor" value={`${analytics.profitFactor}`} change="Target above 1.8" icon={Activity} tone="warning" />
        <MetricCard label="Max Drawdown" value={`${analytics.maxDrawdown}%`} change="Protection active" icon={TrendingDown} tone="danger" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <EquityCurve data={analytics.equityCurve} />
        <Card>
          <CardHeader>
            <CardTitle>Trader Performance Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-5xl font-semibold">{score.score}</p>
                <p className="text-sm text-muted-foreground">Overall score out of 100</p>
              </div>
              <div className="rounded-lg bg-primary/10 px-4 py-3 text-3xl font-semibold text-primary">{score.grade}</div>
            </div>
            {[
              ["Discipline", 86],
              ["Risk Management", 91],
              ["Psychology", 74],
              ["Consistency", 82],
              ["Profitability", 88]
            ].map(([label, value]) => (
              <div key={label as string} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{label}</span>
                  <span>{value}%</span>
                </div>
                <Progress value={value as number} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <PerformanceCharts trades={demoTrades} />

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Current Balance" value={formatCurrency(balance + analytics.totalPnl)} icon={ShieldCheck} />
        <MetricCard label="Average R/R" value={`${analytics.averageRr}:1`} icon={Target} />
        <MetricCard label="Best Trade" value={formatCurrency(Math.max(...demoTrades.map((trade) => trade.pnl)))} icon={TrendingUp} tone="success" />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Active Goals</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {demoGoals.map((goal) => (
            <div key={goal.id} className="rounded-lg border p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-medium">{goal.title}</p>
                <span className="rounded-md bg-success/10 px-2 py-1 text-xs text-success">{goal.status}</span>
              </div>
              <Progress value={Math.min(100, (goal.current_value / goal.target_value) * 100)} />
              <p className="mt-2 text-sm text-muted-foreground">
                {goal.current_value} / {goal.target_value} {goal.metric}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
