"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  BarChart3,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Goal,
  History,
  LayoutDashboard,
  LineChart,
  Moon,
  Newspaper,
  Plus,
  ShieldAlert,
  Sun,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/trades/new", label: "Add Trade", icon: Plus },
  { href: "/trades", label: "History", icon: History },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/strategies", label: "Strategies", icon: LineChart },
  { href: "/playbook", label: "Playbook", icon: BookOpen },
  { href: "/risk", label: "Risk Center", icon: ShieldAlert },
  { href: "/psychology", label: "Psychology", icon: Brain },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/goals", label: "Goals", icon: Goal },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/community", label: "Community", icon: Users }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid-bg min-h-screen">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r bg-background/80 p-4 backdrop-blur-xl lg:block">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-white shadow-glow">
            <LineChart className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">TradeMind</p>
            <p className="text-xs text-muted-foreground">Professional journal</p>
          </div>
        </Link>

        <nav className="space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 items-center gap-3 rounded-md px-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {active ? <ChevronRight className="ml-auto h-4 w-4" /> : null}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/75 px-4 backdrop-blur-xl md:px-8">
          <div>
            <p className="text-sm text-muted-foreground">Trading command center</p>
            <h1 className="text-lg font-semibold md:text-xl">Premium Journal</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="hidden h-4 w-4 dark:block" />
              <Moon className="h-4 w-4 dark:hidden" />
            </Button>
          </div>
        </header>
        <main className="p-4 pb-24 md:p-8">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-5 border-t bg-background/90 p-2 backdrop-blur-xl lg:hidden">
          {nav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn("grid place-items-center gap-1 rounded-md py-2 text-xs text-muted-foreground", active && "text-primary")}>
                <Icon className="h-5 w-5" />
                <span>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
