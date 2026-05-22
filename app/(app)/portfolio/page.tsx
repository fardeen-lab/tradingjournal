import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const accounts = [
  ["Forex Account", "forex", 18240],
  ["Crypto Wallet", "crypto", 12450],
  ["Stock Portfolio", "stocks", 48310],
  ["Futures Account", "futures", 22100]
];

export default function PortfolioPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {accounts.map(([name, type, balance]) => (
        <Card key={name as string}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{formatCurrency(balance as number)}</p>
            <p className="mt-2 text-sm capitalize text-muted-foreground">{type} tracker</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
