-- ============================================================================
-- SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS) POLICIES
-- E-Commerce Platform Storefront Foundation
-- ============================================================================

-- 1. Profiles (linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-create profile on signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Products table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  currency text not null default 'USD',
  image_index integer not null default 0,
  image_alt text not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Allow public read access to products"
  on public.products for select
  using (true);

create policy "Allow admins full access to products"
  on public.products for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 3. Inventory table
create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  product_id text references public.products(id) on delete cascade not null,
  size text not null check (size in ('XS', 'S', 'M', 'L', 'XL', 'One Size')),
  stock_quantity integer not null default 15 check (stock_quantity >= 0),
  reserved_quantity integer not null default 0 check (reserved_quantity >= 0),
  updated_at timestamptz not null default now(),
  unique (product_id, size)
);

alter table public.inventory enable row level security;

create policy "Allow public read access to inventory"
  on public.inventory for select
  using (true);

create policy "Allow admins and service to manage inventory"
  on public.inventory for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 4. Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  shipping numeric(10, 2) not null default 0 check (shipping >= 0),
  total numeric(10, 2) not null check (total >= 0),
  currency text not null default 'USD',
  shipping_name text not null,
  shipping_address text not null,
  shipping_city text not null,
  shipping_postal_code text not null,
  shipping_country text not null default 'US',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id or auth.uid() is null);

create policy "Anyone can create an order"
  on public.orders for insert
  with check (true);

create policy "Admins can view and manage all orders"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 5. Order items table
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text references public.products(id) on delete restrict not null,
  product_name text not null,
  size text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null check (unit_price >= 0),
  total_price numeric(10, 2) not null check (total_price >= 0)
);

alter table public.order_items enable row level security;

create policy "Users can view items in their orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where id = order_items.order_id and (user_id = auth.uid() or user_id is null)
    )
  );

create policy "Anyone can create order items"
  on public.order_items for insert
  with check (true);

create policy "Admins can view all order items"
  on public.order_items for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 6. Initial Product Seeds
insert into public.products (id, slug, name, category, description, price, currency, image_index, image_alt, featured)
values
  ('product-001', 'wool-overcoat', 'The Wool Overcoat', 'Outerwear', 'A structured mid-length overcoat in heavyweight wool blend. Notch lapel, double-breasted button closure, fully lined.', 285.00, 'USD', 0, 'Wool overcoat in natural stone, belted at the waist', true),
  ('product-002', 'linen-wide-leg-trousers', 'Linen Wide-Leg Trousers', 'Bottoms', 'Wide-leg trousers in breathable linen. High rise, elasticated back waistband, two front slash pockets.', 125.00, 'USD', 1, 'Linen wide-leg trousers in ecru, cropped slightly above the ankle', true),
  ('product-003', 'ribbed-knit-crewneck', 'Ribbed Knit Crewneck', 'Knitwear', 'An everyday crewneck in fine-gauge ribbed cotton. Relaxed fit, dropped shoulders, raw hem finish.', 98.00, 'USD', 2, 'Ribbed knit crewneck in oat, tucked loosely into trousers', true),
  ('product-004', 'relaxed-oxford-shirt', 'Relaxed Oxford Shirt', 'Shirts', 'Classic Oxford weave cotton shirt. Relaxed cut through the chest and waist, button-down collar, single chest pocket.', 88.00, 'USD', 3, 'Relaxed Oxford shirt in pale blue, half-tucked', false),
  ('product-005', 'tailored-blazer', 'The Tailored Blazer', 'Outerwear', 'A clean-lined tailored blazer in stretch-wool blend. Single-breasted, lightly padded shoulders, flap pockets.', 245.00, 'USD', 4, 'Tailored blazer in charcoal, worn open over a white shirt', true),
  ('product-006', 'slip-midi-dress', 'Slip Midi Dress', 'Dresses', 'Bias-cut slip dress in washed silk-look satin. Midi length, adjustable straps, side seam slit.', 168.00, 'USD', 5, 'Slip midi dress in champagne satin, worn with a cardigan', false),
  ('product-007', 'high-rise-straight-jeans', 'High-Rise Straight Jeans', 'Denim', 'Straight-leg jeans in rigid selvedge denim. High waist, clean front, two back patch pockets.', 145.00, 'USD', 6, 'High-rise straight jeans in deep indigo, cuffed at the ankle', false),
  ('product-008', 'merino-turtleneck', 'Fine Merino Turtleneck', 'Knitwear', 'An ultra-fine merino wool turtleneck. Slim fit, ribbed knit construction, long sleeve.', 115.00, 'USD', 7, 'Fine merino turtleneck in ivory, tucked into high-waist trousers', false),
  ('product-009', 'canvas-work-jacket', 'Washed Canvas Jacket', 'Outerwear', 'A utility work jacket in washed canvas cotton. Relaxed fit, four flap pockets, raw denim-style finish.', 195.00, 'USD', 8, 'Washed canvas jacket in sand, worn over a knit', false)
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  description = excluded.description;
