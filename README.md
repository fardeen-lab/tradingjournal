# TradeMind Journal

Premium trading journal built with Next.js 15, TypeScript, Tailwind CSS, Supabase, Recharts, and dark/light mode.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
MARKET_NEWS_API_KEY=
ECONOMIC_CALENDAR_API_KEY=
BROKER_WEBHOOK_SECRET=
```

4. Run the Supabase migration in `supabase/migrations/001_initial_schema.sql`.

5. Start the app:

```bash
npm run dev
```

## Included

- Auth screens for email/password, Google login, and password reset
- Dashboard with P&L, win rate, profit factor, account balance, trader score, equity curve, and monthly performance
- Trade form with market context, emotions, screenshots, and auto calculations
- Trade history with filters and export API
- Analytics, strategy tracker, playbook, risk center, psychology journal, calendar, goals, news, portfolio, and community pages
- Supabase schema with RLS, secure screenshot storage bucket, and user isolation
- Adapter files for AI analysis, screenshot analysis, market news, economic calendar, and broker imports

## Required From You

- Supabase project URL and anon key
- Supabase service role key for trusted server-side operations
- AI provider key, default adapter is prepared for OpenAI
- Market news/economic calendar provider key
- Broker import format preferences for MT4/MT5, cTrader, TradingView, Binance, Bybit, OKX, and Interactive Brokers
