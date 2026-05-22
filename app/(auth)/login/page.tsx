import Link from "next/link";
import { LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-lg bg-primary text-white">
            <LineChart className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to review trades, risk, goals, and AI insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="trader@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button className="w-full">Sign in</Button>
            <Button type="button" variant="outline" className="w-full">
              Continue with Google
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-between text-sm">
            <Link className="text-primary" href="/forgot-password">
              Forgot password?
            </Link>
            <Link className="text-muted-foreground" href="/dashboard">
              Demo dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
