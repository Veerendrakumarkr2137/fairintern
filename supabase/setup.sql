-- Create internships table
CREATE TABLE IF NOT EXISTS internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  stipend TEXT NOT NULL,
  fairness_score NUMERIC DEFAULT 0,
  fairness_label TEXT DEFAULT 'Unclear',
  flags JSONB DEFAULT '[]'::jsonb,
  source TEXT DEFAULT 'User',
  start_date DATE,
  end_date DATE,
  recruiter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable Row Level Security
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policy: Anyone can view internships
CREATE POLICY "Public internships are viewable by everyone" 
ON internships FOR SELECT 
USING (true);

-- 2. Recruiter Create Policy: Authenticated users can create internships
CREATE POLICY "Authenticated users can create internships" 
ON internships FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = recruiter_id);

-- 3. Owner Update Policy: Recruiters can update only their own internships
CREATE POLICY "Recruiters can update their own internships" 
ON internships FOR UPDATE 
TO authenticated 
USING (auth.uid() = recruiter_id)
WITH CHECK (auth.uid() = recruiter_id);

-- 4. Owner Delete Policy: Recruiters can delete only their own internships
CREATE POLICY "Recruiters can delete their own internships" 
ON internships FOR DELETE 
TO authenticated 
USING (auth.uid() = recruiter_id);

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_internships_role ON internships(role);
CREATE INDEX IF NOT EXISTS idx_internships_company ON internships(company);
