import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Our Ministries",
  description: "Discover the ministries of Restoration House Brantford — from Sunday worship and Bible study to children, youth, men, women, and prayer ministries. Find your place.",
  path: "/ministries",
  image: "/Media/Image/5.JPG",
});

export default function MinistriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
