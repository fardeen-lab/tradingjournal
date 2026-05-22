import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const setups = ["Breakout", "Pullback", "Reversal", "Liquidity Sweep", "Order Block", "Fair Value Gap", "Support/Resistance", "Scalping Setup"];

export default function PlaybookPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Trade Playbook</h2>
        <p className="text-sm text-muted-foreground">A setup library with automatic performance tracking.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {setups.map((setup, index) => (
          <Card key={setup}>
            <CardHeader>
              <CardTitle>{setup}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video rounded-lg bg-muted/50" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Win rate</span>
                <span className="font-medium">{64 + index * 3}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average R</span>
                <span className="font-medium">{(1.4 + index * 0.2).toFixed(1)}R</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
