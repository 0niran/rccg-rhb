import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Fellowship Groups",
  description: "Connect with a house fellowship group near you in Brantford, Paris, or Cambridge. Small groups meeting weekly for prayer, Bible study, and community.",
  path: "/fellowship",
  image: "/Media/Image/6.JPG",
});

export default function FellowshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
