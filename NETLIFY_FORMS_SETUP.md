# Netlify Forms Email Configuration Guide

## Custom Email Subject Line

The email subject line for contact form submissions can be customized in two ways:

### Option 1: Configure in Netlify Dashboard (Recommended)

1. Go to your Netlify Dashboard: https://app.netlify.com
2. Select your site (AmerLaw_Web)
3. Navigate to: **Site settings** → **Forms** → **Form notifications**
4. Click **Add notification** (or edit existing notification)
5. Select **Email notification**
6. In the **Subject** field, enter your custom subject line

#### Using Form Field Placeholders

You can use form field values in the subject line using placeholders:

- `{{name}}` - Submitter's full name
- `{{email}}` - Submitter's email address
- `{{practice-area}}` - Selected practice area
- `{{phone}}` - Phone number

#### Example Subject Templates

```
New Contact: {{name}} - {{practice-area}}
Contact Form: {{name}} ({{email}})
{{practice-area}} Inquiry from {{name}}
New Contact Form Submission from {{name}} - {{practice-area}}
```

### Option 2: Use Pre-configured Subject (Code Reference)

The default subject templates are configured in `src/utils/constants.js`:

```javascript
FIRM.email.contactFormSubject: "New Contact Form Submission from {{name}} - {{practice-area}}"
FIRM.email.contactFormSubjectSimple: "New Contact Form Submission from Amer Law Website"
```

You can copy these templates and paste them into the Netlify Dashboard notification settings.

## Complete Setup Steps

1. **Enable Form Detection** (if not already enabled):
   - Go to **Site settings** → **Forms** → **Usage and configuration** → **Form detection**
   - Ensure "Enable form detection" is selected

2. **Configure Email Notification**:
   - Go to **Site settings** → **Forms** → **Form notifications**
   - Click **Add notification**
   - Select **Email notification**
   - Configure:
     - **Notification name**: "Contact Form Submissions"
     - **Recipient email**: `WAELAMER@AMERLAWLLC.COM` (or `mjamilamer@gmail.com` for testing)
     - **Subject**: Use one of the templates above or create your own
     - **From email**: (optional, can leave default)
   - Click **Save**

3. **Test the Form**:
   - Submit a test form on your live site
   - Check your email inbox for the notification

## Notes

- The subject line is configured in the Netlify Dashboard, not in the form code
- Form field placeholders (like `{{name}}`) are replaced with actual values when the email is sent
- You can change the subject line anytime in the Netlify Dashboard without redeploying
- The subject templates in `constants.js` are for reference only - the actual subject is set in Netlify

