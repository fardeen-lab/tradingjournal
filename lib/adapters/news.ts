import { demoNews } from "@/lib/demo-data";
import type { NewsEvent } from "@/types/database";

export async function getMarketNews(): Promise<NewsEvent[]> {
  if (!process.env.MARKET_NEWS_API_KEY) {
    return demoNews;
  }

  return demoNews;
}

export async function getEventsActiveAtTrade(symbol: string, tradedAt: string) {
  const tradeTime = new Date(tradedAt).getTime();
  const windowMs = 1000 * 60 * 60 * 8;
  const news = await getMarketNews();
  return news.filter((event) => {
    const eventTime = new Date(event.published_at).getTime();
    return event.assets.includes(symbol.toUpperCase()) && Math.abs(eventTime - tradeTime) <= windowMs;
  });
}
