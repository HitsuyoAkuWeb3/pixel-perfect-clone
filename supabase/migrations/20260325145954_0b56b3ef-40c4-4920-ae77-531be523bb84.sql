
-- 1. B2B Waitlist table
CREATE TABLE public.b2b_waitlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  company_name text NOT NULL,
  role text,
  contact_name text,
  company_size text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT b2b_waitlist_email_unique UNIQUE (email)
);

ALTER TABLE public.b2b_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit b2b waitlist" ON public.b2b_waitlist
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 2. Analytics events table
CREATE TABLE public.analytics_events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert analytics events" ON public.analytics_events
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read own analytics" ON public.analytics_events
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- 3. Add subscription_tier and shopify_customer_id to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_tier text NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS shopify_customer_id text;
