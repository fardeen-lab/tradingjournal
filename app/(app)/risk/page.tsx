import { ShieldAlert } from "lucide-react";
import { MetricCard } from "@/components/app/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Daily Loss Limit" value="3%" icon={ShieldAlert} tone="danger" />
        <MetricCard label="Weekly Loss Limit" value="6%" icon={ShieldAlert} tone="warning" />
        <MetricCard label="Monthly Loss Limit" value="10%" icon={ShieldAlert} />
        <MetricCard label="Max Drawdown Stop" value="12%" icon={ShieldAlert} tone="danger" />
      </section>
      <section className="grid gap-4 lg:grid-cols-4">
        {["Position Size", "Risk", "Margin", "Compounding"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title} Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Account", "Risk %", "Entry", "Stop"].map((label) => (
                <div key={label} className="space-y-2">
                  <Label>{label}</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
              ))}
              <div className="rounded-lg bg-primary/10 p-3 text-sm text-primary">Result: ready</div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
