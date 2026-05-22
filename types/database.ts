export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type TradeDirection = "long" | "short";
export type MarketType = "forex" | "crypto" | "stocks" | "futures";
export type TradeOutcome = "win" | "loss" | "breakeven";
export type Sentiment = "bullish" | "bearish" | "neutral";

export interface Trade {
  id: string;
  user_id: string;
  trade_date: string;
  symbol: string;
  market: MarketType;
  direction: TradeDirection;
  entry_price: number;
  exit_price: number | null;
  stop_loss: number | null;
  take_profit: number | null;
  position_size: number;
  risk_percent: number;
  account_size: number;
  fees: number;
  pnl: number;
  rr_ratio: number;
  percent_gain: number;
  r_multiple: number;
  outcome: TradeOutcome;
  setup: string;
  strategy_id: string | null;
  trading_session: "asia" | "london" | "new_york" | "overlap";
  duration_minutes: number | null;
  notes: string | null;
  emotion_before: string | null;
  emotion_after: string | null;
  market_context: MarketContext;
  created_at: string;
}

export interface MarketContext {
  trend: "bullish" | "bearish" | "range";
  volatility: "low" | "medium" | "high";
  sentiment: Sentiment;
  volume: "thin" | "normal" | "heavy";
  liquidity: "poor" | "normal" | "excellent";
  vix?: number;
  btcDominance?: number;
  activeNewsIds?: string[];
}

export interface Strategy {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  rules: string[];
  market: MarketType | "all";
  created_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  period: "daily" | "weekly" | "monthly" | "challenge";
  target_value: number;
  current_value: number;
  metric: string;
  status: "active" | "completed" | "paused";
  ends_at: string | null;
}

export interface EmotionLog {
  id: string;
  user_id: string;
  trade_id: string | null;
  confidence: number;
  fear: number;
  stress: number;
  sleep_quality: number;
  mood: number;
  energy: number;
  notes: string | null;
  logged_at: string;
}

export interface NewsEvent {
  id: string;
  headline: string;
  source: string;
  published_at: string;
  impact: "low" | "medium" | "high";
  sentiment: Sentiment;
  assets: string[];
  url?: string;
}
