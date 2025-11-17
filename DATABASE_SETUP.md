# Neon Database Setup Guide

This guide will help you set up the Neon database to store contact form submissions.

## Quick Setup Steps

### 1. Connect Neon Database to Netlify

1. Go to your [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Navigate to **Integrations** → **Neon**
4. Click **Connect** or **Add Integration**
5. Follow the prompts to connect your Neon database
6. Netlify will automatically set the `NETLIFY_DATABASE_URL` environment variable

### 2. Create the Database Table

**Option A: Using Neon Console (Recommended)**

1. Go to your [Neon Console](https://console.neon.tech)
2. Select your project
3. Click on your database
4. Go to the **SQL Editor**
5. Copy the entire contents of `database/schema.sql`
6. Paste it into the SQL Editor
7. Click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

**Option B: Using psql Command Line**

```bash
psql "your-neon-connection-string" -f database/schema.sql
```

### 3. Verify Table Creation

Run this query in the Neon SQL Editor to verify:

```sql
SELECT * FROM contact_submissions LIMIT 1;
```

You should see an empty result (or data if you've already submitted forms).

### 4. Test the Integration

1. Submit a test contact form on your website
2. Check the Netlify Function logs:
   - Go to Netlify Dashboard → Your Site → Functions → `save-contact`
   - Check for any errors
3. Verify data was saved:
   - Go to Neon Console → SQL Editor
   - Run: `SELECT * FROM contact_submissions ORDER BY submitted_at DESC LIMIT 5;`

## Troubleshooting

### "Database not configured" Error

- **Check**: Is `NETLIFY_DATABASE_URL` set in Netlify Dashboard?
  - Go to Site Settings → Environment Variables
  - Look for `NETLIFY_DATABASE_URL`
  - If missing, reconnect the Neon integration

### "Table does not exist" Error

- **Solution**: Run the `database/schema.sql` script in your Neon database
- Verify the table exists: `SELECT * FROM contact_submissions LIMIT 1;`

### Function Not Found (404)

- **Check**: Is the function file at `netlify/functions/save-contact.js`?
- **Solution**: Redeploy your site after adding the function

### Database Connection Timeout

- **Cause**: Neon databases can pause after inactivity
- **Solution**: 
  1. Go to Neon Console
  2. Wake up your database if it's paused
  3. The database will stay active while connected to Netlify

## Database Schema

The `contact_submissions` table stores:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL | Auto-incrementing primary key |
| `name` | VARCHAR(100) | Client's full name |
| `email` | VARCHAR(254) | Client's email address |
| `phone` | VARCHAR(20) | Client's phone number |
| `practice_area` | VARCHAR(100) | Selected practice area |
| `message` | TEXT | Message content |
| `file_count` | INTEGER | Number of files uploaded |
| `file_names` | TEXT | Comma-separated file names |
| `submitted_at` | TIMESTAMP | When the form was submitted |
| `created_at` | TIMESTAMP | Record creation timestamp |

## Security Notes

✅ **Database connection is server-side only** - The `NETLIFY_DATABASE_URL` is never exposed to the browser

✅ **Form data is sanitized** - All inputs are validated and sanitized before saving

✅ **Files are not stored** - Only file names and count are saved (not file contents)

✅ **Non-blocking saves** - If database save fails, the form submission still succeeds

## Next Steps

After setup, you can:

1. **Query submissions** via Neon Console SQL Editor
2. **Create an admin panel** using Netlify Functions (see `database/README.md`)
3. **Set up automated exports** using Neon's scheduled queries
4. **Add analytics** by querying the database for insights

## Support

- [Neon Documentation](https://neon.tech/docs)
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [@netlify/neon Package](https://github.com/netlify/neon)

