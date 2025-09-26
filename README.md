# Restoration House Brantford - Official Website

A modern, responsive website for Restoration House Brantford, a vibrant RCCG church community in Brantford, Ontario.

## 🚀 Features

- **Modern Design**: Clean, responsive design with smooth animations using Framer Motion
- **Performance Optimized**: Built with Next.js 14, optimized images, and efficient caching
- **SEO Friendly**: Complete meta tags, sitemap, robots.txt, and structured data
- **Security First**: Comprehensive security headers, CSP policies, and best practices
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels
- **Mobile Responsive**: Perfect experience across all devices and screen sizes

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Deployment**: Optimized for Vercel/Netlify

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── events/            # Events page
│   ├── ministries/        # Ministries page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Dynamic sitemap
│   ├── robots.ts          # Robots configuration
│   ├── icon.tsx           # Favicon generator
│   └── apple-icon.tsx     # Apple touch icon
├── components/            # Reusable UI components
│   ├── Footer.tsx         # Site footer
│   ├── HeroSlideshow.tsx  # Hero image slideshow
│   └── Navigation.tsx     # Main navigation
├── lib/                   # Utilities and configurations
│   ├── constants.ts       # Site constants and configuration
│   └── metadata.ts        # SEO metadata utilities
└── middleware.ts          # Security middleware

public/
├── Media/                 # Optimized media files
│   ├── Image/            # Hero slideshow images
│   ├── Leadership/       # Leadership photos
│   └── RHB Logos/        # Church logos
├── Events/               # Event images
├── robots.txt            # Search engine directives
└── sitemap.xml           # Site structure map
```

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd rccg-rhb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://rccgbrantford.com
NEXT_PUBLIC_CHURCH_EMAIL=hello@rccgbrantford.com
NEXT_PUBLIC_CHURCH_PHONE=(519) 304-3600
```

### SEO Configuration

SEO settings are managed in `src/lib/constants.ts` and `src/lib/metadata.ts`. Update these files to modify:

- Site name and description
- Keywords and metadata
- Social media links
- Contact information

## 🖼 Media Management

### Images
- Hero slideshow images: `public/Media/Image/`
- Leadership photos: `public/Media/Leadership/`
- Event images: `public/Events/`
- Logos: `public/Media/RHB Logos/`

### Optimization
- All images are optimized using Next.js Image component
- WebP and AVIF formats are automatically generated
- Cache headers are set for optimal performance

## 🔒 Security Features

- **Security Headers**: X-Frame-Options, CSP, HSTS, and more
- **Input Sanitization**: All forms are properly validated
- **Content Security Policy**: Strict CSP rules prevent XSS attacks
- **HTTPS Enforcement**: Automatic HTTPS redirects and HSTS headers

## 🎨 Customization

### Colors and Styling
The site uses a warm color palette defined in Tailwind CSS:
- Primary: Amber/Orange gradient
- Accent: Stone/Slate colors
- Text: Gray scale for optimal readability

### Typography
- Font: System fonts for optimal performance and readability
- Hierarchy: Proper heading structure for accessibility

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- Mobile: 320px and up
- Tablet: 768px and up  
- Desktop: 1024px and up
- Large screens: 1440px and up

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on git push

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `out` folder to your hosting provider
3. Configure your domain and SSL certificate

## 📈 Performance

- **Core Web Vitals**: Optimized for perfect Lighthouse scores
- **Image Optimization**: Automatic WebP/AVIF conversion and sizing
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Aggressive caching for static assets

## 🧪 Testing

The site includes:
- TypeScript for type safety
- ESLint for code quality
- Built-in Next.js performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📧 Contact

For questions or support:
- **Church**: hello@rccgbrantford.com
- **Phone**: (519) 304-3600
- **Address**: 7 Burnley Ave, Brantford, ON N3T 1T5

## 📄 License

This project is developed for Restoration House Brantford - RCCG. All rights reserved.

---

Built with ❤️ for the Restoration House Brantford community.