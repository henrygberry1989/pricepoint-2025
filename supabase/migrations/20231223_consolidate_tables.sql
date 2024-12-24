-- Create new leads table with all fields we need
CREATE TABLE IF NOT EXISTS new_leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT NOT NULL,
    objective TEXT,
    metric_goal TEXT,
    budget TEXT,
    phone_region TEXT,
    phone_number TEXT,
    company_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed BOOLEAN DEFAULT false
);

-- Copy data from funnels table (completed submissions)
INSERT INTO new_leads (email, objective, metric_goal, budget, phone_region, phone_number, company_url, created_at, completed)
SELECT email, objective, metric_goal, budget, phone_region, phone_number, company_url, created_at, true
FROM funnels
WHERE objective IS NOT NULL;

-- Copy data from leads table (email captures)
INSERT INTO new_leads (email, created_at)
SELECT email, created_at
FROM leads
WHERE id NOT IN (
    SELECT id FROM funnels WHERE objective IS NOT NULL
);

-- Drop old tables
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS funnels;

-- Rename new table to leads
ALTER TABLE new_leads RENAME TO leads;

-- Add indexes
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at);
CREATE INDEX IF NOT EXISTS leads_completed_idx ON leads (completed);
