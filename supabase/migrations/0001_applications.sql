-- Deltanova CRM substrate — applications table.
-- Canonical store for every design-partner application landing via /api/apply.
-- Pillar 01: queryable, structured, audited.

create extension if not exists "uuid-ossp";

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  link text not null,
  answer text not null,
  locale text not null default 'en',
  variant text,
  created_at timestamptz not null default now()
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

create index if not exists applications_email_idx
  on public.applications (email);

-- RLS is enabled but no policies are defined.
-- Server-side writes use SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- Public/anon reads are denied by default. We can add read policies later
-- if/when we expose application data to authenticated dashboards.
alter table public.applications enable row level security;
