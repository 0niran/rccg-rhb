import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Give Online",
  description: "Support the work of God at Restoration House Brantford. Give tithes, love offerings, thanksgiving offerings, or contribute to the Promiseland Project online.",
  path: "/give",
  image: "/Media/Image/4.JPG",
});

export default function GiveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
