"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowPathIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
          <ArrowPathIcon className="w-8 h-8 text-gold" />
        </div>

        <h1 className="font-heading text-3xl font-semibold text-charcoal mt-6">
          Something Went Wrong
        </h1>
        <p className="text-muted font-body mt-4 leading-relaxed">
          We encountered an unexpected error. Please try again. If the problem
          persists, contact us and we&apos;ll sort it out.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <button onClick={reset} className="btn-primary">
            <ArrowPathIcon className="w-4 h-4" />
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <HomeIcon className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
