import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

interface PageMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = SITE_CONFIG.description,
  path = '',
  image = SITE_CONFIG.ogImage,
  noIndex = false
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title 
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} - RCCG | Church in Brantford`;

  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title: pageTitle,
    description,
    keywords: SITE_CONFIG.keywords.join(', '),
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: path || '/',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      type: 'website',
      locale: 'en_CA',
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_CONFIG.name} Logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
      creator: '@rccgbrantford',
    },
  };
}