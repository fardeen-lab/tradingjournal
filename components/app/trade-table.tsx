"use client";

import { Download, FileSpreadsheet, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import type { Trade } from "@/types/database";

export function TradeTable({ trades }: { trades: Trade[] }) {
  return (
    <Card>
      <CardHeader className="gap-4 md:flex md:flex-row md:items-center md:justify-between">
        <CardTitle>Trade History</CardTitle>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="h-4 w-4" />
            Excel
          </Button>
          <Button variant="outline" size="sm">PDF</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_160px_160px_160px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by symbol, setup, notes..." />
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All strategies</SelectItem>
              <SelectItem value="liquidity">Liquidity Sweep</SelectItem>
              <SelectItem value="breakout">Breakout</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All outcomes</SelectItem>
              <SelectItem value="win">Wins</SelectItem>
              <SelectItem value="loss">Losses</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b text-muted-foreground">
              <tr>
                {["Date", "Symbol", "Market", "Direction", "Setup", "Session", "R", "P&L", "Actions"].map((head) => (
                  <th key={head} className="px-3 py-3 font-medium">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b last:border-0">
                  <td className="px-3 py-4">{trade.trade_date}</td>
                  <td className="px-3 py-4 font-medium">{trade.symbol}</td>
                  <td className="px-3 py-4 capitalize">{trade.market}</td>
                  <td className="px-3 py-4 capitalize">{trade.direction}</td>
                  <td className="px-3 py-4">{trade.setup}</td>
                  <td className="px-3 py-4 capitalize">{trade.trading_session.replace("_", " ")}</td>
                  <td className="px-3 py-4">{trade.r_multiple}R</td>
                  <td className={trade.pnl >= 0 ? "px-3 py-4 font-medium text-success" : "px-3 py-4 font-medium text-danger"}>
                    {formatCurrency(trade.pnl)}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
