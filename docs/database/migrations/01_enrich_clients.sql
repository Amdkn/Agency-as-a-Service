-- Migration: Enrich Clients Table with CRM fields
-- Author: Antigravity
-- Date: 2026-01-30

ALTER TABLE public.clients
ADD COLUMN IF NOT EXISTS contact_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS tier text DEFAULT 'Standard',
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active' CHECK (status IN ('active', 'onboarding', 'archived')),
ADD COLUMN IF NOT EXISTS logo_symbol text,
ADD COLUMN IF NOT EXISTS health_score int DEFAULT 100,
ADD COLUMN IF NOT EXISTS total_revenue numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_interaction timestamp with time zone;
