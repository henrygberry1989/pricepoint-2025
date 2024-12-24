-- Create the objectives table
create table if not exists public.objectives (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    objective text,
    improvement_metric text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create the contacts table
create table if not exists public.contacts (
    id uuid default gen_random_uuid() primary key,
    email text not null unique,
    budget text,
    phone text,
    company_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.objectives enable row level security;
alter table public.contacts enable row level security;

-- Allow authenticated users to read all data
create policy "Allow authenticated users to read objectives"
    on public.objectives
    for select
    to authenticated
    using (true);

create policy "Allow authenticated users to read contacts"
    on public.contacts
    for select
    to authenticated
    using (true);

-- Allow anyone to insert data
create policy "Allow public to insert objectives"
    on public.objectives
    for insert
    to anon
    with check (true);

create policy "Allow public to insert contacts"
    on public.contacts
    for insert
    to anon
    with check (true);
