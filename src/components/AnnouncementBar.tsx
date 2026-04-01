"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  return (
    <div className="w-full bg-gold text-charcoal py-2.5 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center text-center pr-10">
          <span className="text-sm font-medium">
            Join us this Sunday, 10:00 AM at 7 Burnley Ave, Brantford{" "}
            <a
              href="https://maps.google.com/?q=7+Burnley+Ave+Brantford+ON"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline underline-offset-2"
            >
              Get Directions →
            </a>
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity duration-200"
        aria-label="Dismiss announcement"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}