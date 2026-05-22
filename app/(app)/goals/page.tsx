import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoGoals } from "@/lib/demo-data";

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Challenges & Goals</h2>
          <p className="text-sm text-muted-foreground">Daily, weekly, monthly, and rule-based trading targets.</p>
        </div>
        <Button><Plus className="h-4 w-4" />New Goal</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {demoGoals.map((goal) => (
          <Card key={goal.id}>
            <CardHeader>
              <CardTitle>{goal.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={Math.min(100, (goal.current_value / goal.target_value) * 100)} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{goal.period}</span>
                <span>{goal.current_value} / {goal.target_value} {goal.metric}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
