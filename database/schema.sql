-- Contact Form Submissions Table
-- Run this SQL in your Neon database to create the table

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  practice_area VARCHAR(100),
  message TEXT,
  file_count INTEGER DEFAULT 0,
  file_names TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Create index on practice_area for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_practice_area ON contact_submissions(practice_area);

-- Optional: Add a column to track if submission was processed
-- ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT FALSE;
-- CREATE INDEX IF NOT EXISTS idx_contact_submissions_processed ON contact_submissions(processed);

