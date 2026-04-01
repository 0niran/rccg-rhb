declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

// ─── Page view ───────────────────────────────────────────────────────────────

export function trackPageView(url: string, measurementId: string): void {
  gtag("config", measurementId, { page_path: url });
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export function trackNewsletterSignup(): void {
  gtag("event", "newsletter_signup", {
    event_category: "engagement",
    event_label: "homepage_newsletter",
  });
}

// ─── Contact form ─────────────────────────────────────────────────────────────

export function trackContactFormSubmit(subject: string): void {
  gtag("event", "contact_form_submit", {
    event_category: "engagement",
    event_label: subject,
  });
}

// ─── Events page ─────────────────────────────────────────────────────────────

export function trackEventRegistrationClick(eventTitle: string): void {
  gtag("event", "event_registration_click", {
    event_category: "engagement",
    event_label: eventTitle,
  });
}

// ─── Give form ────────────────────────────────────────────────────────────────

export function trackGivingCategorySelected(category: string): void {
  gtag("event", "giving_category_selected", {
    event_category: "giving",
    event_label: category,
  });
}

export function trackGivingCompleted(params: {
  category: string;
  amount: number;
  frequency: string;
  currency: string;
}): void {
  gtag("event", "purchase", {
    currency: params.currency,
    value: params.amount / 100,
    items: [
      {
        item_name: params.category,
        item_category: "giving",
        quantity: 1,
        price: params.amount / 100,
      },
    ],
    giving_frequency: params.frequency,
  });
}
