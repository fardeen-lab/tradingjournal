import type { Trade } from "@/types/database";

export interface AiTradeInsight {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  mistakes: string[];
  actions: string[];
}

export async function generateAiInsights(trades: Trade[]): Promise<AiTradeInsight> {
  if (!process.env.OPENAI_API_KEY) {
    return offlineInsight(trades);
  }

  return offlineInsight(trades);
}

export async function analyzeTradeScreenshots(): Promise<AiTradeInsight> {
  if (!process.env.OPENAI_API_KEY) {
    return {
      summary: "Screenshot AI adapter is ready. Add OPENAI_API_KEY and pass image URLs to enable visual chart review.",
      strengths: ["Before, during, and after screenshots are modeled in the database."],
      weaknesses: ["Live image analysis is disabled until an AI provider is configured."],
      mistakes: [],
      actions: ["Upload chart screenshots to Supabase Storage and send their signed URLs to this adapter."]
    };
  }

  return {
    summary: "Provider hook configured. Replace this placeholder with multimodal model analysis.",
    strengths: [],
    weaknesses: [],
    mistakes: [],
    actions: []
  };
}

function offlineInsight(trades: Trade[]): AiTradeInsight {
  const losses = trades.filter((trade) => trade.pnl < 0);
  const fomo = trades.filter((trade) => `${trade.emotion_before} ${trade.notes}`.toLowerCase().includes("fomo"));
  const oversize = trades.filter((trade) => trade.risk_percent > 1.5);

  return {
    summary: `Reviewed ${trades.length} trades. Current pattern shows ${losses.length} losing trades, ${fomo.length} FOMO flags, and ${oversize.length} oversized risk events.`,
    strengths: ["Wins are best when entries align with session liquidity and high-volume conditions."],
    weaknesses: ["Losses cluster when confirmation is skipped or entries happen after the first move."],
    mistakes: [
      ...(fomo.length ? ["FOMO entries detected from journal notes and pre-trade emotion tags."] : []),
      ...(oversize.length ? ["Some trades exceed the preferred 1% to 1.5% risk envelope."] : [])
    ],
    actions: [
      "Require a setup checklist before entry.",
      "Block new trades for 20 minutes after a full-R loss.",
      "Size from stop distance first, then validate reward/risk."
    ]
  };
}
