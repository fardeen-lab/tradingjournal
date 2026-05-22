import { Activity, Brain, Percent, Shield, Sigma, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/app/metric-card";
import { EquityCurve } from "@/components/charts/equity-curve";
import { PerformanceCharts } from "@/components/charts/performance-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildAnalytics } from "@/lib/calculations";
import { demoTrades } from "@/lib/demo-data";
import { formatCurrency } from "@/lib/utils";

export default function AnalyticsPage() {
  const analytics = buildAnalytics(demoTrades);
  const stats = [
    ["Sharpe Ratio", "1.74"],
    ["Risk of Ruin", "2.8%"],
    ["Consecutive Wins", "3"],
    ["Consecutive Losses", "1"],
    ["Average Winner", formatCurrency(analytics.averageWinner)],
    ["Average Loser", formatCurrency(analytics.averageLoser)]
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Expectancy" value={formatCurrency(analytics.expectancy)} icon={Sigma} />
        <MetricCard label="Profit Factor" value={`${analytics.profitFactor}`} icon={TrendingUp} tone="success" />
        <MetricCard label="Win Rate" value={`${analytics.winRate}%`} icon={Percent} />
        <MetricCard label="Max Drawdown" value={`${analytics.maxDrawdown}%`} icon={Shield} tone="warning" />
      </section>
      <EquityCurve data={analytics.equityCurve} />
      <PerformanceCharts trades={demoTrades} />
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monte Carlo Simulation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1,000-path simulation placeholder uses historical expectancy and variance.</p>
            <div className="rounded-lg bg-muted/40 p-4">
              95% confidence drawdown band: <span className="font-medium text-foreground">8.2% - 16.9%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Correlation Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["FOMO vs P&L: -0.62", "Sleep Quality vs P&L: +0.41", "High Volatility vs R: +0.28"].map((item) => (
              <div key={item} className="rounded-lg border p-3 text-sm">{item}</div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Advanced Metrics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {stats.map(([label, value]) => (
              <div key={label} className="flex justify-between rounded-lg border p-3 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <MetricCard label="Trade Duration Edge" value="2h 21m" change="Best median hold time" icon={Activity} />
        <MetricCard label="Behavioral Risk" value="Medium" change="FOMO cluster detected" icon={Brain} tone="warning" />
      </section>
    </div>
  );
}
