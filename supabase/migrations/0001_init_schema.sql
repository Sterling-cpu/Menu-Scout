-- Menu Scout initial schema
-- Run in Supabase SQL editor or via `supabase db push`

create extension if not exists "uuid-ossp";

-- User profiles with dietary goals (US2)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  calorie_target integer,
  protein_target_g integer,
  carb_target_g integer,
  sugar_limit_g integer,
  dietary_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Food allergies (US3)
create table if not exists public.allergies (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  allergen text not null,
  severity text check (severity in ('mild', 'moderate', 'severe')),
  created_at timestamptz not null default now(),
  unique (profile_id, allergen)
);

alter table public.allergies enable row level security;

create policy "Users can manage their own allergies"
  on public.allergies for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- Restaurants for discovery (US9)
create table if not exists public.restaurants (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address text,
  cuisine text,
  latitude double precision,
  longitude double precision,
  created_at timestamptz not null default now()
);

alter table public.restaurants enable row level security;

create policy "Anyone can read restaurants"
  on public.restaurants for select
  using (true);

create policy "Authenticated users can add restaurants"
  on public.restaurants for insert
  with check (auth.role() = 'authenticated');

-- Menu items with estimated nutrition (US1, US4, US5, US6)
create table if not exists public.menu_items (
  id uuid primary key default uuid_generate_v4(),
  restaurant_id uuid not null references public.restaurants (id) on delete cascade,
  name text not null,
  description text,
  estimated_calories integer,
  protein_g numeric(6, 1),
  carbs_g numeric(6, 1),
  sugar_g numeric(6, 1),
  fat_g numeric(6, 1),
  allergens text[] not null default '{}',
  source text not null default 'manual' check (source in ('manual', 'scan')),
  created_at timestamptz not null default now()
);

alter table public.menu_items enable row level security;

create policy "Anyone can read menu items"
  on public.menu_items for select
  using (true);

create policy "Authenticated users can add menu items"
  on public.menu_items for insert
  with check (auth.role() = 'authenticated');

-- Menu scans (future: US1 camera scanning)
create table if not exists public.menu_scans (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  restaurant_id uuid references public.restaurants (id) on delete set null,
  image_url text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamptz not null default now()
);

alter table public.menu_scans enable row level security;

create policy "Users can manage their own scans"
  on public.menu_scans for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- Favorite dishes (US7)
create table if not exists public.favorites (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  menu_item_id uuid not null references public.menu_items (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (profile_id, menu_item_id)
);

alter table public.favorites enable row level security;

create policy "Users can manage their own favorites"
  on public.favorites for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- Meal tracking (spec: tracking meals)
create table if not exists public.meal_logs (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  menu_item_id uuid not null references public.menu_items (id) on delete cascade,
  logged_at timestamptz not null default now(),
  notes text
);

alter table public.meal_logs enable row level security;

create policy "Users can manage their own meal logs"
  on public.meal_logs for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- Shared dish recommendations (US8)
create table if not exists public.dish_shares (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  menu_item_id uuid not null references public.menu_items (id) on delete cascade,
  share_token text not null unique default uuid_generate_v4()::text,
  recipient text,
  created_at timestamptz not null default now()
);

alter table public.dish_shares enable row level security;

create policy "Users can manage their own shares"
  on public.dish_shares for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

create policy "Anyone with a share token can read shares"
  on public.dish_shares for select
  using (true);

-- Indexes for common lookups
create index if not exists idx_menu_items_restaurant on public.menu_items (restaurant_id);
create index if not exists idx_menu_items_name on public.menu_items (name);
create index if not exists idx_restaurants_coords on public.restaurants (latitude, longitude);
create index if not exists idx_favorites_profile on public.favorites (profile_id);
create index if not exists idx_meal_logs_profile on public.meal_logs (profile_id, logged_at desc);
