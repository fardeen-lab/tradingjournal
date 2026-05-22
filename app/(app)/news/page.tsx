import { CalendarClock, LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoNews } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">News & Economic Calendar</h2>
        <p className="text-sm text-muted-foreground">Real-time adapters for market news, CPI, NFP, FOMC, earnings, crypto events, and trade-linked news.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>Market News Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoNews.map((news) => (
              <article key={news.id} className="rounded-lg border p-4">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-md px-2 py-1 text-xs", news.impact === "high" ? "bg-danger/10 text-danger" : "bg-warning/10 text-warning")}>{news.impact} impact</span>
                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{news.sentiment}</span>
                </div>
                <h3 className="font-medium">{news.headline}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{news.source} - {new Date(news.published_at).toLocaleString()}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {news.assets.map((asset) => <span key={asset} className="rounded-md bg-muted px-2 py-1 text-xs">{asset}</span>)}
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>High Impact Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["CPI", "NFP", "FOMC", "Interest Rate Decision", "Earnings", "Crypto Unlock"].map((event) => (
              <div key={event} className="flex items-center gap-3 rounded-lg border p-3">
                <CalendarClock className="h-4 w-4 text-primary" />
                <span className="text-sm">{event}</span>
                <LinkIcon className="ml-auto h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
