# Environment Variables Setup

This project uses environment variables to keep sensitive information private and out of GitHub.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file** with your actual values (this file is gitignored and will never be committed)

3. **Restart your development server** after making changes

## What Gets Hidden

The following information can be kept private via environment variables:

- **Contact Information**: Phone, email, address
- **Location Details**: City, state, zip code, street address
- **Social Media URLs**: Facebook, Twitter, LinkedIn, Instagram
- **API Keys**: Any future API integrations
- **Email Domain**: For team member email generation

## Default Values

If environment variables are not set, the code will use default values from `src/utils/constants.js`. This ensures the site works even without a `.env` file.

## Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Contact Information
```
VITE_CONTACT_PHONE=973-356-6222
VITE_CONTACT_EMAIL=WAELAMER@AMERLAWLLC.COM
VITE_CONTACT_ADDRESS=123 Main Street, Newark, NJ 07102
VITE_CONTACT_HOURS=Monday - Friday: 8:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 2:00 PM<br>Sunday: Closed
```

### Location
```
VITE_LOCATION_CITY=Newark
VITE_LOCATION_STATE=New Jersey
VITE_LOCATION_STATE_ABBR=NJ
VITE_LOCATION_ZIP=07102
VITE_LOCATION_STREET=123 Main Street
VITE_LOCATION_FULL_ADDRESS=123 Main Street, Newark, NJ 07102
```

### Social Media
```
VITE_SOCIAL_HANDLE=amerlawllc
VITE_SOCIAL_FACEBOOK=https://facebook.com/amerlawllc
VITE_SOCIAL_TWITTER=https://twitter.com/amerlawllc
VITE_SOCIAL_LINKEDIN=https://linkedin.com/company/amerlawllc
VITE_SOCIAL_INSTAGRAM=https://instagram.com/amerlawllc
```

### Email
```
VITE_EMAIL_DOMAIN=amerlawllc.com
```

### Database (Neon/Netlify)
```
NETLIFY_DATABASE_URL=postgresql://user:password@host/database
```
**Note:** This is automatically set by Netlify when you connect your Neon database. You don't need to set this manually in your `.env` file for local development - it's only available in Netlify Functions/serverless functions.

## Security Notes

- ✅ `.env` files are automatically excluded from Git (via `.gitignore`)
- ✅ Never commit `.env` files to the repository
- ✅ The `.env.example` file is safe to commit (it contains no real values)
- ✅ Default values in `constants.js` are public (intended for public website)

## For Production (Netlify)

When deploying to Netlify, add environment variables in:
1. Netlify Dashboard → Site Settings → Environment Variables
2. Add each variable with the `VITE_` prefix
3. Redeploy after adding variables

## Important

**For a public website, contact information is typically meant to be visible.** This environment variable system allows you to:
- Override values for different environments (dev/staging/prod)
- Keep sensitive API keys private
- Easily change contact info without committing to Git
- Use different values for testing vs production

