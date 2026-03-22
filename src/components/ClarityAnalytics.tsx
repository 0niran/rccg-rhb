"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    clarity?: (method: string, ...args: any[]) => void;
  }
}

export default function ClarityAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    if (!projectId) {
      console.warn("Microsoft Clarity project ID not found");
      return;
    }

    // Inject Clarity script if not already present
    if (typeof window.clarity === "undefined") {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    // Track page changes for client-side navigation
    if (typeof window.clarity !== "undefined") {
      window.clarity("set", "pageId", pathname);
    }
  }, [pathname]);

  return null;
}