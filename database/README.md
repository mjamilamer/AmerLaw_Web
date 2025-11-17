# Database Setup for Contact Form Submissions

This project uses a Neon database (via Netlify) to store contact form submissions.

## Setup Instructions

### 1. Connect Neon Database to Netlify

1. Go to your Netlify Dashboard
2. Navigate to your site settings
3. Go to **Integrations** → **Neon**
4. Connect your Neon database
5. Netlify will automatically set the `NETLIFY_DATABASE_URL` environment variable

### 2. Create the Database Table

Run the SQL script in `schema.sql` in your Neon database:

**Option A: Using Neon Console**
1. Go to your Neon project dashboard
2. Click on your database
3. Go to the SQL Editor
4. Copy and paste the contents of `database/schema.sql`
5. Execute the script

**Option B: Using psql or Database Client**
```bash
psql "your-connection-string" -f database/schema.sql
```

### 3. Verify Table Creation

After running the schema, verify the table was created:

```sql
SELECT * FROM contact_submissions LIMIT 1;
```

## Database Schema

The `contact_submissions` table stores:
- `id` - Auto-incrementing primary key
- `name` - Client's full name
- `email` - Client's email address
- `phone` - Client's phone number
- `practice_area` - Selected practice area
- `message` - Message content
- `file_count` - Number of files uploaded
- `file_names` - Comma-separated list of file names
- `submitted_at` - Timestamp of submission

## How It Works

1. User submits the contact form
2. Form data is sent to Netlify Forms (for email notification)
3. Form data is also saved to the Neon database (non-blocking)
4. If database save fails, the form submission still succeeds

## How It Works

1. User submits the contact form
2. Form data is sent to Netlify Forms (for email notification)
3. Form data is also sent to `/netlify/functions/save-contact` (Netlify Function)
4. The Netlify Function saves the data to your Neon database
5. If database save fails, the form submission still succeeds (non-blocking)

## Accessing Submissions

### Option 1: Via Neon Console (Easiest)

1. Go to your Neon project dashboard
2. Click on your database
3. Go to the SQL Editor
4. Run queries like:
   ```sql
   SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 50;
   ```

### Option 2: Create a Netlify Function to Query (Recommended for Admin Panel)

Create a Netlify Function to query the database:

```javascript
// netlify/functions/get-submissions.js
import { neon } from '@netlify/neon';

export async function handler(event, context) {
  // Add authentication here in production!
  
  const sql = neon();
  
  const limit = parseInt(event.queryStringParameters?.limit || '50');
  const offset = parseInt(event.queryStringParameters?.offset || '0');
  
  const submissions = await sql`
    SELECT * FROM contact_submissions
    ORDER BY submitted_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(submissions)
  };
}
```

### Via Database Client

Connect directly to your Neon database using any PostgreSQL client:
- pgAdmin
- DBeaver
- TablePlus
- psql command line

## Security Notes

- Database connection is handled server-side only (via Netlify Functions)
- The `NETLIFY_DATABASE_URL` is never exposed to the client
- Form data is sanitized before being saved
- File contents are NOT stored (only file names and count)

## Troubleshooting

### Database not saving submissions

1. Check that `NETLIFY_DATABASE_URL` is set in Netlify Dashboard
2. Verify the table exists: `SELECT * FROM contact_submissions LIMIT 1;`
3. Check Netlify Function logs for errors
4. Ensure the database connection is active (Neon databases can pause after inactivity)

### Connection Errors

- Make sure your Neon database is active (not paused)
- Verify the connection string in Netlify Dashboard
- Check that your Neon project allows connections from Netlify

