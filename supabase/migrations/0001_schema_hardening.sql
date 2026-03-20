-- Phase 2: Schema Hardening
-- Additive-only migration — no destructive changes, existing data preserved.

-- 1. Leads: add UTM tracking + funnel metadata
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_source TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_medium TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm_campaign TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS entry_point TEXT DEFAULT 'landing_page';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS converted_to_user BOOLEAN DEFAULT FALSE;

-- 2. B2B Waitlist: create table if it doesn't exist, then add columns
CREATE TABLE IF NOT EXISTS public.b2b_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  company_name TEXT,
  role TEXT,
  contact_name TEXT,
  company_size TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on b2b_waitlist
ALTER TABLE public.b2b_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public waitlist form)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'b2b_waitlist' AND policyname = 'Anyone can join the B2B waitlist'
  ) THEN
    CREATE POLICY "Anyone can join the B2B waitlist"
      ON public.b2b_waitlist FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
END
$$;
