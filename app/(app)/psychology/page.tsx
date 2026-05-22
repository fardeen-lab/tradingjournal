import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const logs = [
  ["Confidence", 8, "Profit correlation +0.44"],
  ["Fear", 3, "Loss correlation -0.31"],
  ["Stress", 5, "Avoid entries above 7"],
  ["Sleep Quality", 7, "Best trades above 7"],
  ["Mood", 8, "Stable"],
  ["Energy", 6, "Midday dip"]
];

export default function PsychologyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Psychology Journal</h2>
        <p className="text-sm text-muted-foreground">Track mindset, emotions, sleep, and profitability correlations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {logs.map(([label, value, note]) => (
          <Card key={label as string}>
            <CardHeader>
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span>Today</span><span>{value}/10</span></div>
              <Progress value={(value as number) * 10} />
              <p className="text-sm text-muted-foreground">{note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
