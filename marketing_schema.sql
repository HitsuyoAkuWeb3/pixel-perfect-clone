-- Marketing Engine Database Initialization Script
-- Run this in your Supabase SQL Editor for project: mgojyplsthzjndjemnwm

-- 1. Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  variant TEXT NOT NULL CHECK (variant IN ('audit', 'breakthrough')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public lead capture form)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2. Create audit_results table
CREATE TABLE public.audit_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  scores JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for audit_results
ALTER TABLE public.audit_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public audit submission)
CREATE POLICY "Anyone can submit audit results"
  ON public.audit_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
