-- Create pilot_signups table for storing form submissions
CREATE TABLE public.pilot_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  role TEXT NOT NULL,
  company_name TEXT NOT NULL,
  company_size TEXT NOT NULL,
  user_type TEXT NOT NULL,
  biggest_pains TEXT[] NOT NULL,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts (signup form is public)
ALTER TABLE public.pilot_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup form)
CREATE POLICY "Anyone can submit pilot signup" 
ON public.pilot_signups 
FOR INSERT 
WITH CHECK (true);

-- No public read access - only admins via Lovable Cloud can view submissions
-- This keeps signups private