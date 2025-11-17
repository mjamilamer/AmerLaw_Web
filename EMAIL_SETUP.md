# Free Email Setup with Resend

This setup bypasses Netlify Forms limits by using:
- **Neon Database** - Stores all form submissions (unlimited)
- **Resend** - Free email service (3,000 emails/month free tier)

## Setup Instructions

### 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Go to [Resend Dashboard](https://resend.com/api-keys)
2. Click **Create API Key**
3. Name it (e.g., "Amer Law Contact Form")
4. Copy the API key (starts with `re_`)

### 3. Add Domain (Optional but Recommended)

For professional emails (e.g., `noreply@amerlawllc.com`):

1. Go to [Resend Domains](https://resend.com/domains)
2. Click **Add Domain**
3. Enter your domain (e.g., `amerlawllc.com`)
4. Add the DNS records Resend provides to your domain
5. Wait for verification (usually a few minutes)

**Note:** You can use Resend's default domain for testing, but it's recommended to use your own domain for production.

### 4. Configure Netlify Environment Variables

1. Go to Netlify Dashboard → Your Site → Site Settings → Environment Variables
2. Add the following variables:

```
RESEND_API_KEY=re_your_api_key_here
CONTACT_FORM_EMAIL=WAELAMER@AMERLAWLLC.COM
RESEND_FROM_EMAIL=noreply@amerlawllc.com
```

**If you haven't set up a custom domain:**
- Use Resend's default domain: `onboarding@resend.dev` (for testing)
- Or use your verified domain: `noreply@yourdomain.com`

### 5. Test the Form

1. Submit a test contact form
2. Check your email inbox
3. Verify the email was received
4. Check Netlify Function logs for any errors

## How It Works

```
User submits form
    ↓
Netlify Function (save-contact.js)
    ↓
    ├─→ Save to Neon Database (unlimited)
    └─→ Send email via Resend (3,000/month free)
    ↓
Success response to user
```

## Benefits vs Netlify Forms

| Feature | Netlify Forms | Database + Resend |
|---------|---------------|-------------------|
| **Submissions/month** | 100 (free) | Unlimited |
| **File uploads** | 10 MB (free) | Unlimited (stored separately) |
| **Email notifications** | Included | Included (3,000/month free) |
| **Data storage** | Limited retention | Permanent in database |
| **Cost** | Free (with limits) | Free (3,000 emails/month) |

## Resend Free Tier Limits

- ✅ **3,000 emails/month** - More than enough for most law firms
- ✅ **Unlimited domains** - Add multiple domains
- ✅ **API access** - Full API access
- ✅ **Email logs** - View sent emails
- ✅ **No credit card required**

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly in Netlify
2. **Check From Email**: Must be verified domain or use `onboarding@resend.dev`
3. **Check Function Logs**: Go to Netlify Dashboard → Functions → `save-contact` → View logs
4. **Verify Domain**: If using custom domain, ensure DNS records are correct

### Database Not Saving

1. **Check Database Connection**: Verify Neon is connected in Netlify
2. **Check Table Exists**: Run `SELECT * FROM contact_submissions LIMIT 1;` in Neon
3. **Check Function Logs**: Look for database errors

### Both Failing

- Check Netlify Function logs for detailed error messages
- Verify all environment variables are set
- Ensure database table exists (run `database/schema.sql`)

## Alternative Free Email Services

If Resend doesn't work for you, here are alternatives:

### SendGrid (100 emails/day free)
- Similar setup
- Change `RESEND_API_KEY` to `SENDGRID_API_KEY`
- Update function to use SendGrid SDK

### Mailgun (5,000 emails/month free)
- Similar setup
- Change `RESEND_API_KEY` to `MAILGUN_API_KEY`
- Update function to use Mailgun SDK

## Cost Comparison

**Netlify Forms:**
- Free: 100 submissions/month
- Pro ($19/month): 1,000 submissions/month
- Business ($99/month): 5,000 submissions/month

**Database + Resend:**
- Free: 3,000 emails/month
- Pro ($20/month): 50,000 emails/month
- **Savings: Unlimited database storage + more emails for less cost**

## Next Steps

1. Set up Resend account
2. Add environment variables to Netlify
3. Test form submission
4. Monitor usage in Resend dashboard
5. Set up email templates (optional) for better formatting

