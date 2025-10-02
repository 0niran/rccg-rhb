# Deployment Guide - Restoration House Brantford Website

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] Copy `.env.example` to `.env.local` (for local) or configure in your hosting platform
- [ ] Set all required environment variables:
  - `MAILCHIMP_API_KEY`
  - `MAILCHIMP_AUDIENCE_ID`
  - `MAILCHIMP_SERVER_PREFIX`
  - `RESEND_API_KEY`
  - `FROM_EMAIL`
  - `TO_EMAIL`
- [ ] Verify domain ownership for email sending (Resend)
- [ ] Test Mailchimp API connection

### 2. Security Verification
- [ ] Ensure `.env.local` is in `.gitignore`
- [ ] Remove any sensitive data from git history
- [ ] Verify CORS settings are production-ready
- [ ] Test all security headers are working
- [ ] Verify CSP (Content Security Policy) is properly configured

### 3. Performance Optimization
- [ ] Run `npm run build` to check for build errors
- [ ] Optimize all images (already using WebP/AVIF)
- [ ] Test page load speeds
- [ ] Verify mobile responsiveness on real devices

### 4. SEO Checklist
- [ ] Verify sitemap.xml is accessible at `/sitemap.xml`
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Test structured data with Google Rich Results Test
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify all meta descriptions are unique
- [ ] Test social media sharing (Open Graph tags)

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to Project Settings > Environment Variables
   - Add all variables from `.env.local`
   - Make sure to set them for Production, Preview, and Development

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

6. **Configure Custom Domain**:
   - Go to Project Settings > Domains
   - Add `rccgbrantford.com` and `www.rccgbrantford.com`
   - Update DNS records as instructed by Vercel

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize Site**:
   ```bash
   netlify init
   ```

4. **Set Environment Variables**:
   ```bash
   netlify env:set MAILCHIMP_API_KEY your_key_here
   # Repeat for all environment variables
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Option 3: Self-Hosted (VPS/AWS/etc.)

1. **Build the Application**:
   ```bash
   npm run build
   ```

2. **Set Environment Variables** on the server

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Use Process Manager** (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "rccg-website" -- start
   pm2 startup
   pm2 save
   ```

5. **Configure Reverse Proxy** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name rccgbrantford.com www.rccgbrantford.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Setup SSL** with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d rccgbrantford.com -d www.rccgbrantford.com
   ```

## Post-Deployment

### 1. Monitoring Setup
- [ ] Set up uptime monitoring (UptimeRobot, StatusCake, etc.)
- [ ] Configure error tracking (Sentry, LogRocket, etc.)
- [ ] Set up Google Analytics (if desired)
- [ ] Monitor API rate limits

### 2. SEO Submission
- [ ] Submit to Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create and submit Google My Business listing
- [ ] Update church directory listings

### 3. Performance Testing
- [ ] Run Lighthouse audit
- [ ] Test on PageSpeed Insights
- [ ] Verify mobile usability
- [ ] Test all forms and API endpoints

### 4. Backup Strategy
- [ ] Set up automated database backups (if applicable)
- [ ] Configure git repository backups
- [ ] Document recovery procedures

## Maintenance

### Regular Tasks
- **Weekly**: Monitor uptime and performance
- **Monthly**: Review analytics and error logs
- **Quarterly**: Update dependencies and security patches
- **Annually**: Renew SSL certificates (if manual)

### Updating the Site
```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Build and deploy
npm run build
vercel --prod  # or your deployment method
```

## Troubleshooting

### Build Errors
- Check Node.js version (should be 18+ or 20+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Email Not Sending
- Verify Resend API key is correct
- Check domain verification status
- Review API rate limits
- Check error logs in API routes

### Environment Variable Issues
- Ensure all variables are set in production environment
- Restart the application after changing variables
- Check for typos in variable names

## Support

For technical issues:
- Check GitHub Issues
- Review Next.js documentation: https://nextjs.org/docs
- Contact hosting provider support

## Security Notes

- Never commit `.env.local` or any file containing secrets
- Regularly update dependencies for security patches
- Monitor for suspicious API activity
- Keep backup of all environment variables in a secure location
- Use strong API keys and rotate them periodically
