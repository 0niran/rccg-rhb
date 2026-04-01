import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Contact Us",
  description: "Get in touch with Restoration House Brantford. We'd love to hear from you — visit us at 7 Burnley Ave, call us, or send a message online.",
  path: "/contact",
  image: "/Media/Image/3.JPG",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
