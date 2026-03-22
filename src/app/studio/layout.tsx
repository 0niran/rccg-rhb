import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RHB Events - Sanity Studio",
  description: "Content Management System",
  robots: "noindex, nofollow",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          overflow: 'hidden',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div
          style={{
            height: '100vh',
            width: '100vw'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}