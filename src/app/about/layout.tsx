import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "About Us",
  description: "Meet the team behind Restoration House Brantford. Learn about our history, leadership, and the vision God has given us to manifest power and impact lives.",
  path: "/about",
  image: "/Media/Leadership/Dr-And-Pastor.jpg",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
