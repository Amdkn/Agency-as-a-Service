ALTER TABLE public.sops ADD COLUMN IF NOT EXISTS locked boolean default false;
ALTER TABLE public.sops ADD COLUMN IF NOT EXISTS created_at timestamp with time zone default timezone('utc'::text, now()) not null;
ALTER TABLE public.sops ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
