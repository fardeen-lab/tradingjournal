import type { Trade } from "@/types/database";

export function calculateTrade(input: {
  direction: "long" | "short";
  entryPrice: number;
  exitPrice: number;
  stopLoss?: number | null;
  positionSize: number;
  accountSize: number;
  fees?: number;
}) {
  const multiplier = input.direction === "long" ? 1 : -1;
  const grossPnl = (input.exitPrice - input.entryPrice) * multiplier * input.positionSize;
  const pnl = grossPnl - (input.fees || 0);
  const riskPerUnit = input.stopLoss ? Math.abs(input.entryPrice - input.stopLoss) : 0;
  const riskAmount = riskPerUnit * input.positionSize;
  const rrRatio = riskAmount > 0 ? Math.abs(pnl / riskAmount) : 0;
  const percentGain = input.accountSize > 0 ? (pnl / input.accountSize) * 100 : 0;
  const rMultiple = riskAmount > 0 ? pnl / riskAmount : 0;

  return {
    pnl: roundMoney(pnl),
    rrRatio: round(rrRatio),
    percentGain: round(percentGain),
    rMultiple: round(rMultiple),
    outcome: pnl > 0 ? "win" : pnl < 0 ? "loss" : "breakeven"
  };
}

export function buildAnalytics(trades: Pick<Trade, "pnl" | "account_size" | "trade_date" | "outcome" | "rr_ratio" | "duration_minutes">[]) {
  const totalTrades = trades.length;
  const wins = trades.filter((trade) => trade.pnl > 0);
  const losses = trades.filter((trade) => trade.pnl < 0);
  const totalPnl = trades.reduce((sum, trade) => sum + trade.pnl, 0);
  const grossProfit = wins.reduce((sum, trade) => sum + trade.pnl, 0);
  const grossLoss = Math.abs(losses.reduce((sum, trade) => sum + trade.pnl, 0));
  const winRate = totalTrades ? (wins.length / totalTrades) * 100 : 0;
  const profitFactor = grossLoss ? grossProfit / grossLoss : grossProfit > 0 ? grossProfit : 0;
  const expectancy = totalTrades ? totalPnl / totalTrades : 0;
  const averageWinner = wins.length ? grossProfit / wins.length : 0;
  const averageLoser = losses.length ? grossLoss / losses.length : 0;
  const averageRr = totalTrades ? trades.reduce((sum, trade) => sum + trade.rr_ratio, 0) / totalTrades : 0;
  const equityCurve = trades
    .slice()
    .sort((a, b) => a.trade_date.localeCompare(b.trade_date))
    .reduce<{ date: string; equity: number; pnl: number }[]>((curve, trade, index) => {
      const previous = curve[index - 1]?.equity || trade.account_size;
      curve.push({ date: trade.trade_date, equity: previous + trade.pnl, pnl: trade.pnl });
      return curve;
    }, []);
  const maxDrawdown = calculateMaxDrawdown(equityCurve.map((point) => point.equity));

  return {
    totalTrades,
    totalPnl: roundMoney(totalPnl),
    winRate: round(winRate),
    lossRate: round(totalTrades ? (losses.length / totalTrades) * 100 : 0),
    profitFactor: round(profitFactor),
    expectancy: roundMoney(expectancy),
    averageWinner: roundMoney(averageWinner),
    averageLoser: roundMoney(averageLoser),
    averageRr: round(averageRr),
    maxDrawdown: round(maxDrawdown),
    equityCurve
  };
}

export function traderScore(metrics: { winRate: number; profitFactor: number; maxDrawdown: number; ruleAdherence: number; riskScore: number }) {
  const profitability = Math.min(25, metrics.winRate * 0.18 + metrics.profitFactor * 5);
  const risk = Math.max(0, 25 - metrics.maxDrawdown * 1.2) * (metrics.riskScore / 100);
  const discipline = metrics.ruleAdherence * 0.25;
  const consistency = Math.min(25, metrics.profitFactor * 10);
  const score = Math.round(Math.max(0, Math.min(100, profitability + risk + discipline + consistency)));
  const grade = score >= 95 ? "A+" : score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F";
  return { score, grade };
}

export function calculatePositionSize(account: number, riskPercent: number, entry: number, stop: number) {
  const riskAmount = account * (riskPercent / 100);
  const perUnitRisk = Math.abs(entry - stop);
  return perUnitRisk ? round(riskAmount / perUnitRisk) : 0;
}

function calculateMaxDrawdown(values: number[]) {
  let peak = values[0] || 0;
  let maxDrawdown = 0;
  for (const value of values) {
    peak = Math.max(peak, value);
    maxDrawdown = Math.max(maxDrawdown, peak ? ((peak - value) / peak) * 100 : 0);
  }
  return maxDrawdown;
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}
