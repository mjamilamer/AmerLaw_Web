# Security Checklist for GitHub Repository

## ✅ What's Protected

### Files Automatically Excluded (via .gitignore)
- `.env` - Your local environment variables (NEVER commit this)
- `.env.local` - Local overrides
- `.env.production` - Production environment variables
- `.env.development` - Development environment variables
- `*.secret` - Any files ending in .secret
- `*.key` - Any files ending in .key
- `secrets.json` - Sensitive configuration files
- `config.local.js` - Local configuration files

### Sensitive Information That Can Be Hidden

The following information can be kept private via `.env` file:

1. **Contact Information** (optional - defaults are public)
   - Phone numbers
   - Email addresses
   - Physical addresses

2. **API Keys & Tokens** (if added in future)
   - Any third-party service API keys
   - Authentication tokens
   - Webhook secrets

3. **Internal Configuration**
   - Custom email domains
   - Social media URLs (if you want to change them privately)

## ⚠️ Important Notes

### What's Currently Public
Since this is a **public website**, the following information is intentionally visible:
- Contact phone: `973-356-6222`
- Contact email: `WAELAMER@AMERLAWLLC.COM`
- Address: `1536 State Route 23, #1020, Wayne, NJ 07470`

**This is normal for a business website** - contact information is meant to be public so clients can reach you.

### When to Use .env
Use environment variables when you want to:
- ✅ Keep API keys private
- ✅ Use different values for dev/staging/production
- ✅ Test with different contact info without committing changes
- ✅ Hide internal notes or configuration

## 🔒 Best Practices

1. **Never commit `.env` files**
   - They're already in `.gitignore`
   - Double-check before committing: `git status`

2. **Use `.env.example` as a template**
   - This file IS committed (safe, no real values)
   - Others can copy it to create their own `.env`

3. **Review before pushing**
   ```bash
   git status
   git diff
   ```

4. **If you accidentally committed sensitive data:**
   - Remove it from Git history (contact support if needed)
   - Rotate any exposed credentials immediately

## 📝 Quick Commands

```bash
# Check what files are tracked
git ls-files

# Verify .env is ignored
git check-ignore .env

# See what would be committed
git status

# Review changes before committing
git diff
```

## 🚀 For Netlify Deployment

When deploying, add environment variables in Netlify Dashboard:
1. Go to Site Settings → Environment Variables
2. Add variables with `VITE_` prefix
3. Variables are automatically available in production builds

