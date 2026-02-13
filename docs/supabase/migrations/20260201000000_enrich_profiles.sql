-- Enrich profiles table with new fields
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS job_title text,
ADD COLUMN IF NOT EXISTS is_ai boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS bio text;

-- Seed AI Agents (The Justice League)
-- Using INSERT SELECT WHERE NOT EXISTS to avoid duplicates without DO block complexity

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Jerry', 'admin', 'Orchestrator', true, 'Your Co-Pilot and Chief of Staff.', '🧠'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Jerry' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Superman', 'member', 'Growth Manager', true, 'Leads, Sales, and Marketing Engine.', '🚀'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Superman' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Batman', 'member', 'Ops Manager', true, 'Project Delivery and Quality Control.', '🦇'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Batman' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Flash', 'member', 'Product Manager', true, 'Product Roadmap and Velocity.', '⚡'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Flash' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Wonder Woman', 'member', 'Finance Manager', true, 'Financial Health and Strategy.', '💫'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Wonder Woman' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Green Lantern', 'member', 'People Manager', true, 'HR, Culture, and Recruiting.', '💚'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Green Lantern' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Cyborg', 'member', 'IT Manager', true, 'Tech Stack and Automation.', '🦾'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Cyborg' AND is_ai = true)
LIMIT 1;

INSERT INTO public.profiles (id, tenant_id, full_name, role, job_title, is_ai, bio, avatar_url)
SELECT gen_random_uuid(), id, 'Aquaman', 'member', 'Legal Manager', true, 'Contracts and Risk Management.', '🔱'
FROM public.tenants 
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE full_name = 'Aquaman' AND is_ai = true)
LIMIT 1;

