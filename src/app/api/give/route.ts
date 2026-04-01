import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Stripe from "stripe";
import stripe, {
  GIVING_CATEGORIES,
  FREQUENCY_INTERVAL,
  type GivingCategory,
  type GivingFrequency,
} from "@/lib/stripe";
import { rateLimit, getRateLimitIdentifier } from "@/lib/rateLimit";

const schema = z.object({
  amount: z.number().int().min(100).max(1_000_000), // $1.00 – $10,000 CAD
  category: z.enum(["love_offering", "tithes", "thanksgiving", "promiseland"]),
  frequency: z.enum(["one_time", "weekly", "biweekly", "monthly"]),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  note: z.string().max(200).optional(),
});

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Giving is not configured yet" }, { status: 503 });
  }

  const identifier = getRateLimitIdentifier(req);
  const { allowed } = rateLimit(identifier, { maxRequests: 10, windowMs: 10 * 60 * 1000 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { amount, category, frequency, name, email, note } = result.data;
  const categoryLabel = GIVING_CATEGORIES[category as GivingCategory];

  try {
    if (frequency === "one_time") {
      const intent = await stripe.paymentIntents.create({
        amount,
        currency: "cad",
        payment_method_types: ["card"],
        description: categoryLabel,
        receipt_email: email,
        metadata: {
          category,
          frequency,
          donor_name: name,
          ...(note ? { note } : {}),
        },
      });

      return NextResponse.json({ clientSecret: intent.client_secret });
    }

    // Recurring — find or create customer to avoid duplicates
    const existing = await stripe.customers.list({ email, limit: 1 });
    let customer: Stripe.Customer;
    if (existing.data.length > 0) {
      customer = await stripe.customers.update(existing.data[0].id, {
        name,
        metadata: { category, ...(note ? { note } : {}) },
      });
    } else {
      customer = await stripe.customers.create({
        email,
        name,
        metadata: { category, ...(note ? { note } : {}) },
      });
    }

    const { interval, interval_count } =
      FREQUENCY_INTERVAL[frequency as Exclude<GivingFrequency, "one_time">];

    const price = await stripe.prices.create({
      currency: "cad",
      unit_amount: amount,
      recurring: { interval, interval_count },
      product_data: { name: categoryLabel },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
        payment_method_types: ["card"],
      },
      expand: ["latest_invoice.payment_intent"],
      metadata: { category, frequency, ...(note ? { note } : {}) },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = subscription.latest_invoice as any;
    const clientSecret = (invoice?.payment_intent as Stripe.PaymentIntent)?.client_secret;

    if (!clientSecret) {
      throw new Error("Subscription created but payment could not be initialised. Please contact us.");
    }

    return NextResponse.json({ clientSecret, subscriptionId: subscription.id });
  } catch (err) {
    console.error("[give/route]", err);
    const isDev = process.env.NODE_ENV === "development";
    const message = isDev && err instanceof Error
      ? err.message
      : "Payment processing failed. Please try again or contact us.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
