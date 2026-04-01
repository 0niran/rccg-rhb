import { generateMetadata as gen } from "@/lib/metadata";

export const metadata = gen({
  title: "Free Tax Clinic",
  description: "Restoration House Brantford offers a free community tax clinic. Get help filing your taxes at no cost. Open to residents of Brantford and surrounding areas.",
  path: "/tax-clinic",
  image: "/Media/Image/1.JPG",
});

export default function TaxClinicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
