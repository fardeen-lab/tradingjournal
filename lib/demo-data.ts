import type { Goal, NewsEvent, Strategy, Trade } from "@/types/database";

export const demoStrategies: Strategy[] = [
  {
    id: "strat-1",
    user_id: "demo",
    name: "Liquidity Sweep Reversal",
    description: "Fade failed breaks after sweep, displacement, and retest.",
    rules: ["Sweep prior high/low", "Displacement candle", "Enter on retrace", "Stop beyond sweep"],
    market: "all",
    created_at: "2026-05-01T10:00:00Z"
  },
  {
    id: "strat-2",
    user_id: "demo",
    name: "London Breakout",
    description: "Trade continuation after Asian range expansion.",
    rules: ["Define Asian range", "Wait for volume", "Target 2R minimum"],
    market: "forex",
    created_at: "2026-05-02T10:00:00Z"
  }
];

export const demoTrades: Trade[] = [
  {
    id: "1",
    user_id: "demo",
    trade_date: "2026-05-01",
    symbol: "EURUSD",
    market: "forex",
    direction: "long",
    entry_price: 1.0721,
    exit_price: 1.0784,
    stop_loss: 1.0695,
    take_profit: 1.079,
    position_size: 100000,
    risk_percent: 1,
    account_size: 25000,
    fees: 8,
    pnl: 622,
    rr_ratio: 2.39,
    percent_gain: 2.49,
    r_multiple: 2.39,
    outcome: "win",
    setup: "Liquidity Sweep",
    strategy_id: "strat-1",
    trading_session: "london",
    duration_minutes: 185,
    notes: "Clean sweep and strong London continuation.",
    emotion_before: "Focused",
    emotion_after: "Calm",
    market_context: {
      trend: "bullish",
      volatility: "medium",
      sentiment: "bullish",
      volume: "heavy",
      liquidity: "excellent",
      activeNewsIds: ["news-1"]
    },
    created_at: "2026-05-01T11:00:00Z"
  },
  {
    id: "2",
    user_id: "demo",
    trade_date: "2026-05-03",
    symbol: "BTCUSDT",
    market: "crypto",
    direction: "short",
    entry_price: 66500,
    exit_price: 67120,
    stop_loss: 66800,
    take_profit: 65400,
    position_size: 0.8,
    risk_percent: 0.8,
    account_size: 25622,
    fees: 18,
    pnl: -514,
    rr_ratio: 2.14,
    percent_gain: -2.01,
    r_multiple: -2.14,
    outcome: "loss",
    setup: "Order Block",
    strategy_id: "strat-1",
    trading_session: "new_york",
    duration_minutes: 72,
    notes: "Entered before confirmation after missing first move.",
    emotion_before: "FOMO",
    emotion_after: "Frustrated",
    market_context: {
      trend: "range",
      volatility: "high",
      sentiment: "neutral",
      volume: "normal",
      liquidity: "normal",
      btcDominance: 54.2
    },
    created_at: "2026-05-03T14:00:00Z"
  },
  {
    id: "3",
    user_id: "demo",
    trade_date: "2026-05-05",
    symbol: "AAPL",
    market: "stocks",
    direction: "long",
    entry_price: 183.2,
    exit_price: 188.1,
    stop_loss: 181.8,
    take_profit: 189,
    position_size: 120,
    risk_percent: 0.7,
    account_size: 25108,
    fees: 2,
    pnl: 586,
    rr_ratio: 3.49,
    percent_gain: 2.33,
    r_multiple: 3.49,
    outcome: "win",
    setup: "Breakout",
    strategy_id: "strat-2",
    trading_session: "new_york",
    duration_minutes: 240,
    notes: "Earnings momentum with controlled risk.",
    emotion_before: "Confident",
    emotion_after: "Disciplined",
    market_context: {
      trend: "bullish",
      volatility: "medium",
      sentiment: "bullish",
      volume: "heavy",
      liquidity: "excellent",
      vix: 14.7,
      activeNewsIds: ["news-2"]
    },
    created_at: "2026-05-05T15:00:00Z"
  }
];

export const demoNews: NewsEvent[] = [
  {
    id: "news-1",
    headline: "Euro strength builds ahead of CPI release",
    source: "MarketDesk",
    published_at: "2026-05-01T08:30:00Z",
    impact: "high",
    sentiment: "bullish",
    assets: ["EURUSD", "DXY"]
  },
  {
    id: "news-2",
    headline: "Mega-cap earnings beat estimates as risk appetite improves",
    source: "EquityWire",
    published_at: "2026-05-05T13:00:00Z",
    impact: "medium",
    sentiment: "bullish",
    assets: ["AAPL", "SPY", "QQQ"]
  }
];

export const demoGoals: Goal[] = [
  {
    id: "goal-1",
    user_id: "demo",
    title: "No revenge trading this week",
    period: "weekly",
    target_value: 7,
    current_value: 5,
    metric: "days",
    status: "active",
    ends_at: "2026-05-24"
  },
  {
    id: "goal-2",
    user_id: "demo",
    title: "Maintain 2:1 average reward/risk",
    period: "monthly",
    target_value: 2,
    current_value: 2.67,
    metric: "rr",
    status: "active",
    ends_at: "2026-05-31"
  }
];
