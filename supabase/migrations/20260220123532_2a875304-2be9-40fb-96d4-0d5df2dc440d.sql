
-- Published projects for the public gallery
CREATE TABLE public.published_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  community_name TEXT NOT NULL,
  community_region TEXT NOT NULL,
  problem_category TEXT NOT NULL,
  problem_title TEXT NOT NULL,
  summary TEXT,
  interventions JSONB NOT NULL DEFAULT '[]',
  outcomes JSONB NOT NULL DEFAULT '[]',
  student_count INT DEFAULT 1,
  school_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.published_projects ENABLE ROW LEVEL SECURITY;

-- Public read for approved projects only
CREATE POLICY "Anyone can view approved projects"
ON public.published_projects
FOR SELECT
USING (status = 'approved');

-- Allow inserts from authenticated users
CREATE POLICY "Authenticated users can submit projects"
ON public.published_projects
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow anon inserts for demo/MVP (no auth yet)
CREATE POLICY "Anon can submit projects for MVP"
ON public.published_projects
FOR INSERT
TO anon
WITH CHECK (true);
