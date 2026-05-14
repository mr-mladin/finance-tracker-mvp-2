-- Отдельная схема для нового MVP.
-- Старый Supabase-проект и старые ключи не использовать.

create extension if not exists "uuid-ossp";

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.accounts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  icon text not null default '💳',
  color text not null default '#57BE7A',
  currency text not null default 'RUB',
  initial_balance numeric(14, 2) not null default 0,
  sort_order integer not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists accounts_user_id_idx on public.accounts(user_id);
drop trigger if exists accounts_set_updated on public.accounts;
create trigger accounts_set_updated before update on public.accounts
  for each row execute function public.set_updated_at();

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  parent_id uuid references public.categories(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  title text not null,
  icon text not null default '•',
  color text not null default '#565963',
  sort_order integer not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists categories_user_id_idx on public.categories(user_id);
create index if not exists categories_parent_id_idx on public.categories(parent_id);
drop trigger if exists categories_set_updated on public.categories;
create trigger categories_set_updated before update on public.categories
  for each row execute function public.set_updated_at();

create table if not exists public.tags (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  color text not null default '#D8D1C3',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, title)
);
create index if not exists tags_user_id_idx on public.tags(user_id);

create table if not exists public.operations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  operation_date date not null,
  type text not null check (type in ('income', 'expense', 'transfer')),
  status text not null default 'fact' check (status in ('fact', 'plan')),
  account_id uuid references public.accounts(id) on delete restrict,
  from_account_id uuid references public.accounts(id) on delete restrict,
  to_account_id uuid references public.accounts(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  title text,
  amount numeric(14, 2) not null check (amount > 0),
  to_amount numeric(14, 2),
  currency text not null default 'RUB',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint transfer_accounts_are_different check (
    type <> 'transfer'
    or (
      from_account_id is not null
      and to_account_id is not null
      and from_account_id <> to_account_id
    )
  ),
  constraint regular_operation_has_account check (
    type = 'transfer'
    or account_id is not null
  )
);
create index if not exists operations_user_id_idx on public.operations(user_id);
create index if not exists operations_user_date_idx on public.operations(user_id, operation_date desc);
drop trigger if exists operations_set_updated on public.operations;
create trigger operations_set_updated before update on public.operations
  for each row execute function public.set_updated_at();

create table if not exists public.operation_tags (
  operation_id uuid not null references public.operations(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (operation_id, tag_id)
);

create table if not exists public.planned_operations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  amount numeric(14, 2) not null check (amount > 0),
  account_id uuid not null references public.accounts(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  operation_date date not null,
  title text,
  note text,
  is_done boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists planned_operations_user_id_idx on public.planned_operations(user_id);
create index if not exists planned_operations_user_date_idx on public.planned_operations(user_id, operation_date);
drop trigger if exists planned_operations_set_updated on public.planned_operations;
create trigger planned_operations_set_updated before update on public.planned_operations
  for each row execute function public.set_updated_at();

create table if not exists public.budgets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  amount numeric(14, 2) not null check (amount > 0),
  period text not null default 'month' check (period in ('week', 'month')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category_id, period)
);
create index if not exists budgets_user_id_idx on public.budgets(user_id);
drop trigger if exists budgets_set_updated on public.budgets;
create trigger budgets_set_updated before update on public.budgets
  for each row execute function public.set_updated_at();

create table if not exists public.goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references public.accounts(id) on delete set null,
  title text not null,
  target_amount numeric(14, 2) not null check (target_amount > 0),
  current_amount numeric(14, 2) not null default 0,
  target_date date,
  color text not null default '#57BE7A',
  icon text not null default '🎯',
  sort_order integer not null default 0,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists goals_user_id_idx on public.goals(user_id);
drop trigger if exists goals_set_updated on public.goals;
create trigger goals_set_updated before update on public.goals
  for each row execute function public.set_updated_at();

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  base_currency text not null default 'RUB',
  theme text not null default 'auto' check (theme in ('light', 'dark', 'auto')),
  first_day_of_week integer not null default 1 check (first_day_of_week between 0 and 6),
  financial_month_start integer not null default 1 check (financial_month_start between 1 and 28),
  number_format text not null default 'space' check (number_format in ('space', 'comma', 'none')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists profiles_set_updated on public.profiles;
create trigger profiles_set_updated before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.tags enable row level security;
alter table public.operations enable row level security;
alter table public.operation_tags enable row level security;
alter table public.planned_operations enable row level security;
alter table public.budgets enable row level security;
alter table public.goals enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Users can manage own accounts" on public.accounts;
create policy "Users can manage own accounts"
  on public.accounts
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own categories" on public.categories;
create policy "Users can manage own categories"
  on public.categories
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own tags" on public.tags;
create policy "Users can manage own tags"
  on public.tags
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own operations" on public.operations;
create policy "Users can manage own operations"
  on public.operations
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own operation tags" on public.operation_tags;
create policy "Users can manage own operation tags"
  on public.operation_tags
  for all
  using (
    exists (
      select 1 from public.operations o
      where o.id = operation_id and o.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.operations o
      where o.id = operation_id and o.user_id = auth.uid()
    )
  );

drop policy if exists "Users can manage own planned operations" on public.planned_operations;
create policy "Users can manage own planned operations"
  on public.planned_operations
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own budgets" on public.budgets;
create policy "Users can manage own budgets"
  on public.budgets
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own goals" on public.goals;
create policy "Users can manage own goals"
  on public.goals
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can manage own profile" on public.profiles;
create policy "Users can manage own profile"
  on public.profiles
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- В MVP от Клода этот auth-триггер отдельно удалялся.
-- Профиль лучше создавать/обновлять из приложения после входа пользователя.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
