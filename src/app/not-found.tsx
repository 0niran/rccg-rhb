import Link from "next/link";
import { HomeIcon, CalendarDaysIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="font-heading text-8xl font-bold text-gold/30 leading-none">404</div>

        <h1 className="font-heading text-3xl font-semibold text-charcoal mt-4">
          Page Not Found
        </h1>
        <p className="text-muted font-body mt-4 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Link href="/" className="btn-primary">
            <HomeIcon className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/events" className="btn-secondary">
            <CalendarDaysIcon className="w-4 h-4" />
            Upcoming Events
          </Link>
          <Link href="/contact" className="btn-secondary">
            <EnvelopeIcon className="w-4 h-4" />
            Contact Us
          </Link>
        </div>

        <p className="text-muted text-sm font-body mt-10">
          Need help?{" "}
          <Link href="/contact" className="text-gold hover:underline">
            Reach out to us
          </Link>{" "}
          and we&apos;ll point you in the right direction.
        </p>
      </div>
    </div>
  );
}
