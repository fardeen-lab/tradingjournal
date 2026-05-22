create extension if not exists "pgcrypto";

create type public.market_type as enum ('forex', 'crypto', 'stocks', 'futures');
create type public.trade_direction as enum ('long', 'short');
create type public.trade_outcome as enum ('win', 'loss', 'breakeven');
create type public.sentiment_type as enum ('bullish', 'bearish', 'neutral');
create type public.goal_period as enum ('daily', 'weekly', 'monthly', 'challenge');
create type public.goal_status as enum ('active', 'completed', 'paused');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  base_currency text not null default 'USD',
  timezone text not null default 'UTC',
  starting_balance numeric(14, 2) not null default 0,
  current_balance numeric(14, 2) not null default 0,
  risk_per_trade numeric(5, 2) not null default 1,
  daily_loss_limit numeric(5, 2) not null default 3,
  weekly_loss_limit numeric(5, 2) not null default 6,
  monthly_loss_limit numeric(5, 2) not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.strategies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text,
  rules text[] not null default '{}',
  market text not null default 'all',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trades (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  strategy_id uuid references public.strategies(id) on delete set null,
  trade_date date not null,
  symbol text not null,
  market public.market_type not null,
  direction public.trade_direction not null,
  entry_price numeric(20, 8) not null,
  exit_price numeric(20, 8),
  stop_loss numeric(20, 8),
  take_profit numeric(20, 8),
  position_size numeric(20, 8) not null,
  risk_percent numeric(6, 2) not null default 0,
  account_size numeric(14, 2) not null,
  fees numeric(14, 2) not null default 0,
  pnl numeric(14, 2) not null default 0,
  rr_ratio numeric(10, 2) not null default 0,
  percent_gain numeric(10, 2) not null default 0,
  r_multiple numeric(10, 2) not null default 0,
  outcome public.trade_outcome not null default 'breakeven',
  setup text not null,
  trading_session text not null check (trading_session in ('asia', 'london', 'new_york', 'overlap')),
  duration_minutes integer,
  notes text,
  emotion_before text,
  emotion_after text,
  market_context jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.trade_screenshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade_id uuid not null references public.trades(id) on delete cascade,
  stage text not null check (stage in ('before', 'during', 'after')),
  storage_path text not null,
  ai_analysis jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.news_events (
  id uuid primary key default gen_random_uuid(),
  headline text not null,
  source text not null,
  published_at timestamptz not null,
  impact text not null check (impact in ('low', 'medium', 'high')),
  sentiment public.sentiment_type not null default 'neutral',
  assets text[] not null default '{}',
  url text,
  raw_payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.trade_news (
  trade_id uuid not null references public.trades(id) on delete cascade,
  news_id uuid not null references public.news_events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  primary key (trade_id, news_id)
);

create table public.emotion_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trade_id uuid references public.trades(id) on delete set null,
  confidence int not null check (confidence between 1 and 10),
  fear int not null check (fear between 1 and 10),
  stress int not null check (stress between 1 and 10),
  sleep_quality int not null check (sleep_quality between 1 and 10),
  mood int not null check (mood between 1 and 10),
  energy int not null check (energy between 1 and 10),
  notes text,
  logged_at timestamptz not null default now()
);

create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  period public.goal_period not null,
  metric text not null,
  target_value numeric(14, 2) not null,
  current_value numeric(14, 2) not null default 0,
  status public.goal_status not null default 'active',
  starts_at date not null default current_date,
  ends_at date,
  created_at timestamptz not null default now()
);

create table public.playbook_setups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text not null,
  rules text[] not null default '{}',
  screenshots text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now()
);

create table public.portfolio_accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  account_type text not null check (account_type in ('forex', 'crypto', 'stocks', 'futures')),
  provider text,
  balance numeric(14, 2) not null default 0,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.analytics_cache (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cache_key text not null,
  payload jsonb not null,
  computed_at timestamptz not null default now(),
  unique (user_id, cache_key)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text not null,
  type text not null,
  read_at timestamptz,
  scheduled_for timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.strategies enable row level security;
alter table public.trades enable row level security;
alter table public.trade_screenshots enable row level security;
alter table public.trade_news enable row level security;
alter table public.emotion_logs enable row level security;
alter table public.goals enable row level security;
alter table public.playbook_setups enable row level security;
alter table public.portfolio_accounts enable row level security;
alter table public.analytics_cache enable row level security;
alter table public.notifications enable row level security;

create policy "profiles isolated" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "strategies isolated" on public.strategies for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "trades isolated" on public.trades for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "screenshots isolated" on public.trade_screenshots for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "trade news isolated" on public.trade_news for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "emotion logs isolated" on public.emotion_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "goals isolated" on public.goals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "playbook isolated" on public.playbook_setups for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "portfolio isolated" on public.portfolio_accounts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "analytics isolated" on public.analytics_cache for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "notifications isolated" on public.notifications for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "news readable by authenticated users" on public.news_events for select using (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('trade-screenshots', 'trade-screenshots', false, 10485760, array['image/png', 'image/jpeg', 'image/webp'])
on conflict (id) do nothing;

create policy "users upload own screenshots"
on storage.objects for insert
with check (bucket_id = 'trade-screenshots' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users read own screenshots"
on storage.objects for select
using (bucket_id = 'trade-screenshots' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "users delete own screenshots"
on storage.objects for delete
using (bucket_id = 'trade-screenshots' and auth.uid()::text = (storage.foldername(name))[1]);

create index trades_user_date_idx on public.trades(user_id, trade_date desc);
create index trades_user_symbol_idx on public.trades(user_id, symbol);
create index trades_user_strategy_idx on public.trades(user_id, strategy_id);
create index emotion_logs_user_logged_idx on public.emotion_logs(user_id, logged_at desc);
create index goals_user_status_idx on public.goals(user_id, status);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
