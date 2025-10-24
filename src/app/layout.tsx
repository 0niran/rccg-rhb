import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateMetadata } from "@/lib/metadata";
import Script from "next/script";

export const metadata: Metadata = {
  ...generateMetadata(),
  verification: {
    google: "your-google-verification-code",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": "https://rccgbrantford.com/#church",
    "name": "RCCG Restoration House Brantford",
    "alternateName": ["Restoration House Brantford", "RCCG Brantford"],
    "description": "A welcoming Christian church serving Brantford, Paris, Cambridge, and surrounding communities. Join us for Sunday worship, Bible study, prayer meetings, and family ministries.",
    "url": "https://rccgbrantford.com",
    "telephone": "+1-519-304-3600",
    "email": "hello@rccgbrantford.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7 Burnley Ave",
      "addressLocality": "Brantford",
      "addressRegion": "ON",
      "postalCode": "N3T 1T5",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.1334",
      "longitude": "-80.2644"
    },
    "areaServed": [
      {"@type": "City", "name": "Brantford"},
      {"@type": "City", "name": "Paris"},
      {"@type": "City", "name": "Cambridge"}
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "10:00",
        "closes": "12:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Tuesday",
        "opens": "19:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Thursday",
        "opens": "19:00",
        "closes": "20:00"
      }
    ],
    "sameAs": [
      "https://facebook.com/rccgbrantford",
      "https://instagram.com/rccgbrantford",
      "https://youtube.com/@rccgbrantford",
      "https://twitter.com/rccgbrantford"
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased bg-gray-900 text-gray-100"
        suppressHydrationWarning={true}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NJCCMW82GC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NJCCMW82GC');
          `}
        </Script>

        {/* Structured Data for SEO */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />


        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}