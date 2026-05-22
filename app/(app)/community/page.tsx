import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {["Private Groups", "Shared Setups", "Leaderboards", "Mentor Feedback", "Strategy Marketplace"].map((feature) => (
        <Card key={feature}>
          <CardHeader>
            <CardTitle>{feature}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Supabase tables and policies can be extended with invite-only collaboration and marketplace review workflows.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
