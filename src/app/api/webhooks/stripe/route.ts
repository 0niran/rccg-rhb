import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import stripe from "@/lib/stripe";
import { resendService } from "@/lib/resend";

// Must read raw body before any parsing for signature verification
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    console.warn("[webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Signature verification failed";
    console.warn("[webhook] Signature error:", msg);
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  console.log(`[webhook] ${event.type} — id: ${event.id}`);

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.processing":
        await handlePaymentIntentProcessing(event.data.object as Stripe.PaymentIntent);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        // Log but don't error on unhandled event types
        console.log(`[webhook] Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error(`[webhook] Handler error for ${event.type}:`, err);
    // Return 200 so Stripe doesn't retry — log the error for investigation
  }

  return NextResponse.json({ received: true });
}

// ─── Handlers ────────────────────────────────────────────────────────────────

async function handlePaymentIntentSucceeded(pi: Stripe.PaymentIntent) {
  const { category, frequency, donor_name, note } = pi.metadata ?? {};

  console.log("[webhook] payment_intent.succeeded", {
    id: pi.id,
    amount: pi.amount,
    currency: pi.currency,
    category,
    frequency,
    donor: donor_name,
  });

  if (donor_name && pi.receipt_email) {
    await resendService.sendGivingNotification({
      eventType: "succeeded",
      amount: pi.amount,
      currency: pi.currency,
      category: category ?? "General",
      frequency: frequency ?? "one_time",
      donorName: donor_name,
      donorEmail: pi.receipt_email,
      note,
      stripeId: pi.id,
      timestamp: new Date(pi.created * 1000).toISOString(),
    });
  }
}

async function handlePaymentIntentFailed(pi: Stripe.PaymentIntent) {
  const { category, frequency, donor_name, note } = pi.metadata ?? {};
  const failureReason =
    pi.last_payment_error?.message ?? "Payment was declined";

  console.warn("[webhook] payment_intent.payment_failed", {
    id: pi.id,
    amount: pi.amount,
    category,
    donor: donor_name,
    reason: failureReason,
  });

  if (donor_name && pi.receipt_email) {
    await resendService.sendGivingNotification({
      eventType: "failed",
      amount: pi.amount,
      currency: pi.currency,
      category: category ?? "General",
      frequency: frequency ?? "one_time",
      donorName: donor_name,
      donorEmail: pi.receipt_email,
      note,
      stripeId: pi.id,
      timestamp: new Date(pi.created * 1000).toISOString(),
      failureReason,
    });
  }
}

async function handlePaymentIntentProcessing(pi: Stripe.PaymentIntent) {
  const { category, frequency, donor_name, note } = pi.metadata ?? {};

  // Fired for delayed payment methods (PAD, SEPA) — confirmation comes later
  console.log("[webhook] payment_intent.processing", {
    id: pi.id,
    amount: pi.amount,
    currency: pi.currency,
    category,
    donor: donor_name,
  });

  if (donor_name && pi.receipt_email) {
    await resendService.sendGivingNotification({
      eventType: "processing",
      amount: pi.amount,
      currency: pi.currency,
      category: category ?? "General",
      frequency: frequency ?? "one_time",
      donorName: donor_name,
      donorEmail: pi.receipt_email,
      note,
      stripeId: pi.id,
      timestamp: new Date(pi.created * 1000).toISOString(),
    });
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  // Fetch customer to get giving metadata (category, frequency, note)
  const customer = typeof invoice.customer === "string"
    ? await stripe.customers.retrieve(invoice.customer)
    : invoice.customer;

  const meta = (customer && !("deleted" in customer) ? customer.metadata : {}) as Record<string, string>;
  const donorName = invoice.customer_name ?? meta.donor_name ?? "Donor";
  const donorEmail = invoice.customer_email ?? "";

  console.log("[webhook] invoice.payment_succeeded", {
    invoiceId: invoice.id,
    amount: invoice.amount_paid,
    category: meta.category,
    donor: donorName,
  });

  if (donorEmail) {
    await resendService.sendGivingNotification({
      eventType: "succeeded",
      amount: invoice.amount_paid,
      currency: invoice.currency,
      category: meta.category ?? "General",
      frequency: meta.frequency ?? "recurring",
      donorName,
      donorEmail,
      note: meta.note,
      stripeId: invoice.id,
      timestamp: new Date(invoice.created * 1000).toISOString(),
    });
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customer = typeof invoice.customer === "string"
    ? await stripe.customers.retrieve(invoice.customer)
    : invoice.customer;

  const meta = (customer && !("deleted" in customer) ? customer.metadata : {}) as Record<string, string>;
  const donorName = invoice.customer_name ?? meta.donor_name ?? "Donor";
  const donorEmail = invoice.customer_email ?? "";

  console.warn("[webhook] invoice.payment_failed", {
    invoiceId: invoice.id,
    amount: invoice.amount_due,
    category: meta.category,
    donor: donorName,
  });

  if (donorEmail) {
    await resendService.sendGivingNotification({
      eventType: "failed",
      amount: invoice.amount_due,
      currency: invoice.currency,
      category: meta.category ?? "General",
      frequency: meta.frequency ?? "recurring",
      donorName,
      donorEmail,
      note: meta.note,
      stripeId: invoice.id,
      timestamp: new Date(invoice.created * 1000).toISOString(),
      failureReason: "Recurring payment could not be processed. The donor may need to update their payment method.",
    });
  }
}
