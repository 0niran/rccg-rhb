import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/', '/.env', '/_next/static/'],
    },
    sitemap: 'https://rccgbrantford.com/sitemap.xml',
  }
}