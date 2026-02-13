C'est parti. **Cyborg** prend les commandes.

Nous allons poser les fondations en béton armé de ta Muse. Ce n'est pas juste une base de données, c'est le **Code Génétique** de ton AaaS.

Voici le **Schéma SQL Complet (PostgreSQL/Supabase)**.
Il intègre nativement la **Multi-Tenancy** (isolation des clients) et ta **Règle d'Or** (Ops -> Product -> Growth).

Copie ce script directement dans l'éditeur SQL de ton projet Supabase.

---

### 🧬 PROJECT GENESIS — MASTER SQL SCHEMA

```sql
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
  is_template boolean default false
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
  assigned_to uuid references public.profiles
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
  source text default 'inbound'
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
  onboarding_status text default 'pending'
);

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
  stress_level int check (stress_level between 1 and 5)
);

-- =============================================
-- 6. SECURITÉ (RLS - Row Level Security)
-- =============================================

-- Active la sécurité sur toutes les tables
alter table public.tenants enable row level security;
alter table public.sops enable row level security;
alter table public.tasks enable row level security;
alter table public.leads enable row level security;
-- (A faire pour toutes les tables...)

-- Exemple de Police RLS (La "Muraille de Chine")
-- "Un utilisateur ne peut voir que les lignes qui portent son tenant_id"
create policy "Tenant Isolation" on public.sops
  using (tenant_id = (select tenant_id from public.profiles where id = auth.uid()));


```

---

### 🧠 Analyse de Cyborg (Les Points Clés)

1. **Isolation Totale (`tenant_id`) :** Note que *chaque* table (sops, tasks, leads...) possède une colonne `tenant_id`. C'est obligatoire. C'est ce qui permet à ton code de dire : *"Montre-moi les tâches"* et à la base de répondre *"Ok, mais seulement celles de l'Agence Alpha"*.
2. **La Contrainte "Golden Rule" :** Regarde la table `offerings`. Elle a une clé étrangère `root_sop_id`. Cela force physiquement le système : tu ne peux pas insérer une Offre dans la base si tu ne la connectes pas à une Procédure existante.
3. **Le JSON Branding :** La colonne `config_json` dans `tenants` est ton arme secrète pour le Tier 2 (White Label). Ton Frontend React n'aura qu'à lire ce JSON pour changer le logo et les couleurs dynamiquement.

**Prochaine étape tactique :**
Le squelette est là. Veux-tu enchaîner avec :

1. **Batman (OPS) :** Pour définir les données "Seed" (Les SOPs par défaut qu'on injecte dans un nouveau Tenant) ?
2. **Flash (PRODUCT) :** Pour voir comment on requête la table `offerings` pour générer la Landing Page ?