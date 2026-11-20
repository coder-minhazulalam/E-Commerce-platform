-- =========================================================================
-- Supabase Schema & Security Rules for South Asian Heritage E-Commerce
-- =========================================================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Allow users to view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Allow users to update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Allow admins full access to profiles"
  on public.profiles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Trigger to create profile when auth.users signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'customer')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Products table (South Asian Outfits)
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

create policy "Allow admins to update inventory"
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
  customer_name text not null,
  customer_email text not null,
  shipping_address jsonb not null,
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  shipping_fee numeric(10, 2) not null check (shipping_fee >= 0),
  total numeric(10, 2) not null check (total >= 0),
  status text not null default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id or auth.uid() is null);

create policy "Anyone can create an order"
  on public.orders for insert
  with check (true);

create policy "Admins can view and update all orders"
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

-- 6. Initial South Asian Outfit Seeds
insert into public.products (id, slug, name, category, description, price, currency, image_index, image_alt, featured)
values
  ('product-001', 'royal-zardozi-sherwani', 'Royal Zardozi Sherwani', 'Sherwani', 'Imperial ivory raw silk sherwani adorned with handcrafted metallic Zari & dabka embroidery. Tailored mandarin collar with concealed front placket.', 340.00, 'USD', 0, 'Royal ivory raw silk sherwani with intricate gold zardozi embroidery', true),
  ('product-002', 'banarasi-silk-saree', 'Banarasi Katan Silk Saree', 'Saree', 'Pure handwoven Katan silk drape featuring intricate antique gold zari floral jaal with a regal pallu border. Mastercrafted in Varanasi.', 290.00, 'USD', 1, 'Crimson Banarasi Katan silk saree with antique gold zari border', true),
  ('product-003', 'chanderi-silk-kurta', 'Heritage Chanderi Kurta Set', 'Kurta', 'Hand-spun Chanderi cotton-silk blend kurta with tonal resham threadwork, paired with tailored ivory churidar trousers.', 145.00, 'USD', 2, 'Ivory and sage handwoven Chanderi silk kurta set with churidar', true),
  ('product-004', 'tussar-handloom-panjabi', 'Handloom Tussar Silk Panjabi', 'Panjabi', 'Wild textured Tussar wild silk panjabi with minimalist kantha stitch embroidery along the placket and cuffs. Effortlessly breathable.', 120.00, 'USD', 3, 'Textured beige handloom Tussar silk panjabi with subtle kantha collar', true),
  ('product-005', 'velvet-bandhgala-jodhpuri', 'Midnight Velvet Bandhgala', 'Bandhgala', 'Structured royal Jodhpuri silhouette crafted in plush midnight blue velvet with bespoke handcrafted brass crest buttons.', 275.00, 'USD', 4, 'Tailored midnight velvet bandhgala jacket with hammered brass buttons', true),
  ('product-006', 'chikankari-organza-anarkali', 'Lucknowi Chikankari Anarkali', 'Anarkali', 'Ethereal hand-embroidered Lucknowi shadow-work chikankari gown in pure silk organza with delicate mukaish embellishments.', 210.00, 'USD', 5, 'Pastel mint Lucknowi chikankari organza anarkali ensemble', false),
  ('product-007', 'raw-silk-nehru-vest', 'Raw Silk Bundi Nehru Vest', 'Nehru Vest', 'Sleek tailored Nehru waistcoat in textured Matka raw silk. Classic stand collar with welted breast pocket and horn buttons.', 135.00, 'USD', 6, 'Structured ochre raw silk Nehru vest over an off-white kurta', false),
  ('product-008', 'kashmiri-pashmina-shawl', 'Kashmiri Jamawar Pashmina', 'Pashmina', 'Hand-spun high-altitude Himalayan cashmere shawl woven with heritage paisley jaal tapestry patterns from Srinagar.', 185.00, 'USD', 7, 'Authentic hand-spun Kashmiri Jamawar pashmina shawl', false),
  ('product-009', 'embroidered-silk-lehenga', 'Gota Patti Raw Silk Lehenga', 'Lehenga', 'Contemporary flared raw silk lehenga ensemble with handcrafted gold gota patti borders, cropped choli, and scalloped dupatta.', 320.00, 'USD', 8, 'Emerald raw silk lehenga with handcrafted gold gota patti embroidery', true)
on conflict (id) do update set
  name = excluded.name,
  price = excluded.price,
  description = excluded.description;

-- 7. Seed Inventory across sizes for all products
insert into public.inventory (product_id, size, stock_quantity)
select p.id, s.size, 15
from public.products p
cross join (values ('XS'), ('S'), ('M'), ('L'), ('XL')) as s(size)
on conflict (product_id, size) do nothing;
