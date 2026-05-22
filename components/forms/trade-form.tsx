"use client";

import { useMemo, useState } from "react";
import { Calculator, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateTrade } from "@/lib/calculations";
import { formatCurrency } from "@/lib/utils";

const setups = ["Breakout", "Pullback", "Reversal", "Liquidity Sweep", "Order Block", "Fair Value Gap", "Support/Resistance", "Scalping Setup"];

export function TradeForm() {
  const [direction, setDirection] = useState<"long" | "short">("long");
  const [entry, setEntry] = useState(100);
  const [exit, setExit] = useState(104);
  const [stop, setStop] = useState(98);
  const [size, setSize] = useState(100);
  const [account, setAccount] = useState(25000);
  const [fees, setFees] = useState(0);

  const result = useMemo(
    () =>
      calculateTrade({
        direction,
        entryPrice: entry,
        exitPrice: exit,
        stopLoss: stop,
        positionSize: size,
        accountSize: account,
        fees
      }),
    [account, direction, entry, exit, fees, size, stop]
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <Card>
        <CardHeader>
          <CardTitle>Add Trade</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2">
            <Field label="Trade Date" type="date" defaultValue="2026-05-22" />
            <Field label="Asset / Symbol" placeholder="EURUSD, BTCUSDT, AAPL" />

            <SelectBlock label="Market" defaultValue="forex" options={["forex", "crypto", "stocks", "futures"]} />
            <div className="space-y-2">
              <Label>Direction</Label>
              <Select value={direction} onValueChange={(value) => setDirection(value as "long" | "short")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <NumberField label="Entry Price" value={entry} onChange={setEntry} />
            <NumberField label="Exit Price" value={exit} onChange={setExit} />
            <NumberField label="Stop Loss" value={stop} onChange={setStop} />
            <Field label="Take Profit" type="number" placeholder="Optional" />
            <NumberField label="Position Size" value={size} onChange={setSize} />
            <Field label="Risk %" type="number" defaultValue="1" />
            <NumberField label="Account Size" value={account} onChange={setAccount} />
            <NumberField label="Fees / Commission" value={fees} onChange={setFees} />
            <SelectBlock label="Trade Setup" defaultValue="Liquidity Sweep" options={setups} />
            <Field label="Strategy Used" placeholder="Liquidity Sweep Reversal" />
            <SelectBlock label="Trading Session" defaultValue="london" options={["asia", "london", "new_york", "overlap"]} />
            <Field label="Trade Duration" type="number" placeholder="Minutes" />
            <Field label="Emotion Before Trade" placeholder="Focused, fearful, FOMO..." />
            <Field label="Emotion After Trade" placeholder="Calm, frustrated, disciplined..." />
            <div className="space-y-2 md:col-span-2">
              <Label>Notes</Label>
              <textarea className="min-h-28 w-full rounded-md border bg-background/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Upload Trade Screenshots</Label>
              <div className="grid gap-3 rounded-lg border border-dashed p-4 md:grid-cols-3">
                {["Before Entry", "During Trade", "After Exit"].map((label) => (
                  <button key={label} type="button" className="flex h-28 flex-col items-center justify-center gap-2 rounded-md bg-muted/40 text-sm text-muted-foreground">
                    <Upload className="h-5 w-5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Button className="md:col-span-2">Save Trade</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Auto Calculations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Result label="P&L" value={formatCurrency(result.pnl)} positive={result.pnl >= 0} />
          <Result label="Risk/Reward" value={`${result.rrRatio}:1`} />
          <Result label="Percentage Gain/Loss" value={`${result.percentGain}%`} positive={result.percentGain >= 0} />
          <Result label="R-Multiple" value={`${result.rMultiple}R`} positive={result.rMultiple >= 0} />
          <div className="rounded-lg bg-primary/10 p-4 text-sm text-primary">
            These values are recalculated instantly and should also be recomputed server-side before insert.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </div>
  );
}

function SelectBlock({ label, defaultValue, options }: { label: string; defaultValue: string; options: string[] }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option.replaceAll("_", " ")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function Result({ label, value, positive = true }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={positive ? "font-semibold text-success" : "font-semibold text-danger"}>{value}</span>
    </div>
  );
}
