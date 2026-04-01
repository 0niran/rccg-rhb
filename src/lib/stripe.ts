import Stripe from "stripe";

// Defer the error to runtime (API route call) rather than build time
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiVersion: "2025-02-24.acacia" as any,
});

export default stripe;

export type GivingCategory =
  | "love_offering"
  | "tithes"
  | "thanksgiving"
  | "promiseland";

export type GivingFrequency =
  | "one_time"
  | "weekly"
  | "biweekly"
  | "monthly";

export const GIVING_CATEGORIES: Record<GivingCategory, string> = {
  love_offering: "Love Offering",
  tithes: "Tithes",
  thanksgiving: "Thanksgiving Offering",
  promiseland: "Promiseland Project",
};

// Maps subscription frequency to Stripe interval params
export const FREQUENCY_INTERVAL: Record<
  Exclude<GivingFrequency, "one_time">,
  { interval: "week" | "month"; interval_count: number }
> = {
  weekly: { interval: "week", interval_count: 1 },
  biweekly: { interval: "week", interval_count: 2 },
  monthly: { interval: "month", interval_count: 1 },
};
