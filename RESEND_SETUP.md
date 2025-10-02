# Resend Email Integration Setup Guide

## Overview
This guide will help you set up Resend for contact form email functionality on your website.

## Features
- ✅ Contact form submissions sent to church admin email
- ✅ Automatic response emails to users
- ✅ Professional HTML email templates
- ✅ Delivery tracking and logging

## Setup Steps

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address
3. Complete account setup

### 2. Verify Your Domain
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `rccgbrantford.com`
4. Follow the DNS setup instructions to verify ownership
5. Wait for verification (can take a few minutes to hours)

### 3. Get Your API Key
1. Go to **API Keys** in the Resend dashboard
2. Click **Create API Key**
3. Give it a name like "Church Website"
4. Select **Full Access** or **Sending Access**
5. Copy the generated API key

### 4. Update Environment Variables
Open your `.env.local` file and update these values:

```env
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Update these email addresses
FROM_EMAIL=noreply@rccgbrantford.com
TO_EMAIL=hello@rccgbrantford.com
```

**Important Notes:**
- `FROM_EMAIL` must use your verified domain
- `TO_EMAIL` is where contact form submissions will be sent
- Both emails should be real addresses

### 5. Test the Integration
Once you've updated the environment variables:

1. **Development Health Check**: Visit `http://localhost:3000/api/resend/health`
2. **Test Contact Form**: Use the contact form on your website

## Email Templates

### Admin Notification Email
When someone submits the contact form, you'll receive:
- Clean HTML formatted email
- All contact details (name, email, phone)
- Subject and message content
- Timestamp and source information

### Auto-Response Email
Users who submit the form receive:
- Professional thank you message
- Expected response timeframe (24-48 hours)
- Church contact information
- Your phone number for urgent matters

## Troubleshooting

### "RESEND_API_KEY is not configured"
- Check that your API key is set in `.env.local`
- Restart your development server after updating environment variables

### "Domain verification failed"
- Ensure your domain is verified in the Resend dashboard
- FROM_EMAIL must use your verified domain
- Allow up to 24 hours for DNS propagation

### Emails not sending
- Check your API key is valid and active
- Verify the FROM_EMAIL domain is verified
- Check the server console for detailed error messages

### Test email works but contact form doesn't
- Verify all environment variables are set correctly
- Check that TO_EMAIL and FROM_EMAIL are valid addresses
- Review browser network tab for API errors

## Production Considerations

### Free Tier Limits
- **3,000 emails per month**
- **100 emails per day**
- More than sufficient for most church contact forms

### Upgrading
If you exceed the free tier:
- Pay-as-you-go: $1 per 1,000 emails
- Very cost-effective for church use

### Monitoring
- View delivery status in Resend dashboard
- Check logs for any failed deliveries
- Monitor monthly usage

## Email Best Practices

### Deliverability
- Use a professional FROM_EMAIL address
- Keep subject lines clear and concise
- Include unsubscribe links for promotional emails (not needed for transactional)

### Security
- Never share your API key publicly
- Use environment variables for all sensitive data
- Validate all form inputs before sending

---
*Integration ready for Restoration House Brantford website*