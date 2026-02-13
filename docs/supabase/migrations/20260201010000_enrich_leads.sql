-- Enrich leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS estimated_value numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS probability integer DEFAULT 20;
