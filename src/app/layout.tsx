import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { generateMetadata } from "@/lib/metadata";
import Script from "next/script";
import ClarityAnalytics from "@/components/ClarityAnalytics";

export const metadata: Metadata = {
  ...generateMetadata(),
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Church",
        "@id": "https://rccgbrantford.com/#church",
        "name": "RCCG Restoration House Brantford",
        "alternateName": ["Restoration House Brantford", "RCCG Brantford"],
        "description": "A welcoming Christian church serving Brantford, Paris, Cambridge, and surrounding communities. Join us for Sunday worship, Bible study, prayer meetings, and family ministries.",
        "url": "https://rccgbrantford.com",
        "telephone": "+1-519-304-3600",
        "email": "hello@rccgbrantford.com",
        "priceRange": "Free",
        "image": "https://rccgbrantford.com/Media/RHB%20Logos/RCCG%20Restoration%20House%20Brantford-White.svg",
        "logo": "https://rccgbrantford.com/Media/RHB%20Logos/RCCG%20Restoration%20House%20Brantford-White.svg",
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
            "closes": "12:00",
            "description": "Sunday Worship Service"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Tuesday",
            "opens": "19:00",
            "closes": "20:00",
            "description": "Digging Deep Bible Study"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Thursday",
            "opens": "19:00",
            "closes": "20:00",
            "description": "Faith Clinic Prayer Meeting"
          }
        ],
        "sameAs": [
          "https://facebook.com/rccgbrantford",
          "https://instagram.com/rccgbrantford",
          "https://youtube.com/@rccgbrantford",
          "https://twitter.com/rccgbrantford"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Church Services and Programs",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Sunday Worship Service",
                "description": "Weekly worship service with sermon, music, and fellowship"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "House Fellowship",
                "description": "Small group meetings in homes across Brantford and surrounding areas"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Youth Ministry",
                "description": "Programs designed for children, teens, and young adults"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://rccgbrantford.com/#website",
        "url": "https://rccgbrantford.com",
        "name": "RCCG Restoration House Brantford",
        "description": "Official website of RCCG Restoration House Brantford",
        "publisher": {
          "@id": "https://rccgbrantford.com/#church"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://rccgbrantford.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <body
        className="font-sans antialiased bg-gray-900 text-gray-100"
        suppressHydrationWarning={true}
      >

        {/* Structured Data for SEO */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData)
          }}
        />

        <ClarityAnalytics />

        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}