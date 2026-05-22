import { z } from "zod";

export const tradeSchema = z.object({
  trade_date: z.string().min(1),
  symbol: z.string().min(1).max(20),
  market: z.enum(["forex", "crypto", "stocks", "futures"]),
  direction: z.enum(["long", "short"]),
  entry_price: z.coerce.number().positive(),
  exit_price: z.coerce.number().positive(),
  stop_loss: z.coerce.number().positive(),
  take_profit: z.coerce.number().positive().optional(),
  position_size: z.coerce.number().positive(),
  risk_percent: z.coerce.number().min(0).max(100),
  account_size: z.coerce.number().positive(),
  fees: z.coerce.number().min(0).default(0),
  setup: z.string().min(1),
  strategy_id: z.string().optional(),
  trading_session: z.enum(["asia", "london", "new_york", "overlap"]),
  duration_minutes: z.coerce.number().min(0).optional(),
  notes: z.string().optional(),
  emotion_before: z.string().optional(),
  emotion_after: z.string().optional()
});

export type TradeFormValues = z.infer<typeof tradeSchema>;
