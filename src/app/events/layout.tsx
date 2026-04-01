import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Events",
  description: "Stay up to date with upcoming events at Restoration House Brantford — services, conferences, outreach, youth events, and more. All are welcome.",
  path: "/events",
  image: "/Media/Image/2.JPG",
});

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
