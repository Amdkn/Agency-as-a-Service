-- PROJECT GENESIS — MASTER SQL SCHEMA
-- Source: Canon_BMad_DEAL/03_Phase3_Master_SQL_Schema.md & 09_Seed_Legal_Documents.md

-- =============================================
-- 1. INFRASTRUCTURE & MULTI-TENANCY (Le Socle)
-- =============================================

-- Table des Clients SaaS (Agences, Cabinets, PME)
-- C'est ici que se joue le "White Label" via config_json
create table public.tenants (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null, -- ex: "Agence Alpha"
  slug text unique not null, -- ex: "agence-alpha" (pour l'URL)
  tier text default 'start' check (tier in ('start', 'sovereign', 'fleet')), -- Les 3 Tiers
  
  -- La configuration White Label (Logo, Couleurs, Wording)
  config_json jsonb default '{
    "branding": {"primary_color": "#10b981", "logo_url": null},
    "vocabulary": {"project": "Projet", "task": "Tâche"}
  }'::jsonb,
  
  subscription_status text default 'active'
);

-- Table des Utilisateurs (Lien entre Auth Supabase et Tenant)
create table public.profiles (
  id uuid references auth.users not null primary key, -- Lien vers Supabase Auth
  tenant_id uuid references public.tenants not null,
  role text default 'member' check (role in ('owner', 'admin', 'member', 'client')),
  full_name text,
  avatar_url text
);

-- =============================================
-- 2. FACTORY (OPS) — LA RÈGLE D'OR
-- =============================================

-- La Bibliothèque de Procédures (L'Actif)
create table public.sops (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  title text not null,
  department text not null, -- Ops, Sales, Finance...
  content_markdown text, -- Le contenu venant de Notion
  video_url text, -- Loom
  estimated_time int, -- En minutes
  is_template boolean default false,
  -- Icone pour le Dashboard (champs virtuel ou réel)
  department_icon text
);

-- Les Projets (Dossiers Clients)
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  client_id uuid, -- Sera lié à la table clients plus bas
  name text not null,
  status text default 'todo',
  deadline date
);

-- Les Tâches (L'Exécution Atomique)
-- CONTRAINTE FORTE : Impossible de créer une tâche sans SOP (sauf si null autorisé temporairement, mais l'UI doit forcer)
create table public.tasks (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  project_id uuid references public.projects,
  sop_id uuid references public.sops, -- Le lien Ops obligatoire
  title text not null,
  status text default 'todo' check (status in ('todo', 'doing', 'done')),
  assigned_to uuid references public.profiles,
  due_date timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- 3. STOREFRONT (PRODUCT) — LE MENU
-- =============================================

-- Le Catalogue d'Offres (Ce qu'on vend)
create table public.offerings (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  name text not null, -- ex: "Audit SEO"
  price numeric not null, -- Paiement Upfront
  description text,
  
  -- RÈGLE D'OR : On lie l'offre à une SOP Racine (ex: "SOP Livraison Audit")
  root_sop_id uuid references public.sops, 
  
  is_public boolean default false -- Si True, visible sur la Landing Page générée
);

-- =============================================
-- 4. ENGINE (GROWTH) — LE PIPELINE
-- =============================================

-- Les Prospects (Leads)
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  email text not null,
  name text,
  status text default 'cold' check (status in ('cold', 'warm', 'won', 'lost')),
  
  -- On sait dès le début ce qu'on leur vend
  interested_in_offering_id uuid references public.offerings,
  source text default 'inbound',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- 5. PULSE (FINANCE & PEOPLE & LEGAL)
-- =============================================

-- Clients (Ceux qui ont payé)
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  name text not null,
  email text,
  stripe_customer_id text,
  onboarding_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Mettre à jour la table projects pour lier client_id correctement maintenant que la table existe
alter table public.projects add constraint fk_projects_clients foreign key (client_id) references public.clients(id);


-- Factures (Générées par Stripe)
create table public.invoices (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  client_id uuid references public.clients,
  amount numeric not null,
  status text default 'draft' check (status in ('draft', 'paid', 'overdue')),
  issued_at date default now()
);

-- People Capacity (Charge Fondateur)
create table public.capacity_logs (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  user_id uuid references public.profiles,
  week_start date,
  hours_logged numeric, -- Si > 10h alerte rouge
  stress_level int check (stress_level between 1 and 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- 6. LEGAL & COMPLIANCE (The Shield)
-- =============================================

create table public.legal_docs (
  id uuid default gen_random_uuid() primary key,
  tenant_id uuid references public.tenants not null,
  title text not null, -- ex: "CGV 2026"
  type text check (type in ('template', 'signed_contract')),
  content_markdown text, -- Le texte juridique
  version text default '1.0',
  is_active boolean default true,
  
  -- Si c'est un contrat signé :
  client_id uuid references public.clients,
  signed_at timestamp with time zone,
  ip_address text, -- Preuve de signature numérique
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =============================================
-- 7. SECURITÉ (RLS - Row Level Security)
-- =============================================

-- Helper function to get current user's tenant_id
create or replace function get_current_tenant_id()
returns uuid
language sql
security definer
as $$
  select tenant_id from public.profiles where id = auth.uid();
$$;


-- Active la sécurité sur toutes les tables
alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.sops enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.offerings enable row level security;
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.invoices enable row level security;
alter table public.capacity_logs enable row level security;
alter table public.legal_docs enable row level security;


-- Exemple de Police RLS (La "Muraille de Chine")
-- "Un utilisateur ne peut voir que les lignes qui portent son tenant_id"

create policy "Tenant Isolation" on public.sops
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.projects
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.tasks
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.offerings
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.leads
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.clients
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.invoices
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());
  
create policy "Tenant Isolation" on public.capacity_logs
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.legal_docs
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

create policy "Tenant Isolation" on public.profiles
  using (tenant_id = get_current_tenant_id())
  with check (tenant_id = get_current_tenant_id());

-- Special Policy for Tenants table
create policy "View own tenant" on public.tenants
  for select using (id = get_current_tenant_id());
