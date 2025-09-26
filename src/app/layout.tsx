import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Restoration House Brantford - RCCG | Church in Brantford",
  description: "Welcome to Restoration House Brantford, a vibrant community of faith committed to spiritual growth, worship, and service. Join us for life-changing services and fellowship in Brantford, Ontario.",
  keywords: "church brantford, RCCG, Restoration House, christian church, worship, community, faith, sunday service, brantford ontario, church ministries",
  authors: [{ name: "Restoration House Brantford" }],
  creator: "Restoration House Brantford",
  publisher: "Restoration House Brantford",
  metadataBase: new URL("https://rccgbrantford.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Restoration House Brantford - RCCG",
    description: "A vibrant community of faith committed to spiritual growth, worship, and service in Brantford, Ontario",
    type: "website",
    locale: "en_CA",
    url: "https://rccgbrantford.com",
    siteName: "Restoration House Brantford",
    images: [
      {
        url: "/Media/RHB Logo.svg",
        width: 1200,
        height: 630,
        alt: "Restoration House Brantford Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Restoration House Brantford - RCCG",
    description: "A vibrant community of faith in Brantford, Ontario",
    images: ["/Media/RHB Logo.svg"],
    creator: "@rccgbrantford",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className="font-sans antialiased bg-gray-900 text-gray-100"
        suppressHydrationWarning={true}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}