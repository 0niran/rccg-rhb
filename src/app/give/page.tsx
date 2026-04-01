"use client";

import { useState, useEffect, Suspense, Component, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  HeartIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  SunIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import type { GivingCategory, GivingFrequency } from "@/lib/stripe";
import { CONTACT_INFO } from "@/lib/constants";
import { trackGivingCategorySelected, trackGivingCompleted } from "@/lib/analytics";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const ELEMENTS_OPTIONS = {
  mode: "payment" as const,
  amount: 100,
  currency: "cad",
  paymentMethodTypes: ["card"],
  appearance: {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#C8963A",
      colorBackground: "#ffffff",
      colorText: "#1A1612",
      colorTextSecondary: "#7A6E65",
      colorDanger: "#dc2626",
      fontFamily: "Inter, ui-sans-serif, sans-serif",
      borderRadius: "8px",
      spacingUnit: "4px",
    },
  },
};

class StripeErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const CATEGORIES: {
  id: GivingCategory;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "tithes", label: "Tithes", icon: SparklesIcon },
  { id: "love_offering", label: "Love Offering", icon: HeartIcon },
  { id: "thanksgiving", label: "Thanksgiving", icon: SunIcon },
  { id: "promiseland", label: "Promise Land", icon: BuildingLibraryIcon },
];

const PRESETS = [25, 50, 100, 250];

const FREQUENCIES: { id: GivingFrequency; label: string }[] = [
  { id: "one_time", label: "One-time" },
  { id: "weekly", label: "Weekly" },
  { id: "biweekly", label: "Bi-weekly" },
  { id: "monthly", label: "Monthly" },
];

const FREQ_LABEL: Record<Exclude<GivingFrequency, "one_time">, string> = {
  weekly: "week",
  biweekly: "2 weeks",
  monthly: "month",
};

const inputClass =
  "w-full border border-border-light rounded-xl py-3 px-4 text-sm font-body text-charcoal placeholder-muted focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors bg-white";

function GiveForm({ category }: { category: GivingCategory }) {
  const stripe = useStripe();
  const elements = useElements();

  const [preset, setPreset] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [frequency, setFrequency] = useState<GivingFrequency>("one_time");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentElementReady, setPaymentElementReady] = useState(false);

  const amount = preset ?? (parseFloat(custom) || 0);
  const amountCents = Math.round(amount * 100);
  const selectedCategory = CATEGORIES.find((c) => c.id === category)!;
  const isValid = amount >= 1 && amount <= 10000 && name.trim().length >= 2 && email.includes("@");
  const isRecurring = frequency !== "one_time";

  // Handle return from 3D Secure redirect
  useEffect(() => {
    if (!stripe) return;
    const params = new URLSearchParams(window.location.search);
    const piSecret = params.get("payment_intent_client_secret");
    const redirectStatus = params.get("redirect_status");
    if (!piSecret || !redirectStatus) return;

    window.history.replaceState({}, "", window.location.pathname);

    if (redirectStatus === "succeeded") {
      setStatus("success");
      return;
    }

    stripe.retrievePaymentIntent(piSecret).then(({ paymentIntent }) => {
      if (paymentIntent?.status === "succeeded") {
        setStatus("success");
      } else {
        setErrorMsg(
          paymentIntent?.last_payment_error?.message ??
            "Your payment was not completed. Please try again."
        );
        setStatus("error");
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !isValid) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw new Error(submitError.message);

      const res = await fetch("/api/give", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountCents,
          category,
          frequency,
          name: name.trim(),
          email: email.trim(),
          note: note.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecret,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.origin + window.location.pathname,
          payment_method_data: {
            billing_details: {
              name: name.trim(),
              email: email.trim(),
            },
          },
        },
      });
      if (stripeError) throw new Error(stripeError.message);
      trackGivingCompleted({ category: selectedCategory.label, amount: amountCents, frequency, currency: "CAD" });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-8">
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mb-5">
          <CheckCircleIcon className="w-7 h-7 text-gold" />
        </div>
        <h3 className="font-heading text-2xl text-charcoal font-semibold">Thank You!</h3>
        <p className="text-muted mt-3 font-body text-sm max-w-xs leading-relaxed">
          Your {selectedCategory.label.toLowerCase()} has been received.{" "}
          {email && <>A receipt is on its way to <span className="text-charcoal font-medium">{email}</span>.</>}
        </p>
        {isRecurring && (
          <p className="text-muted mt-2 font-body text-xs max-w-xs leading-relaxed">
            To manage or cancel your recurring gift, contact us at{" "}
            <span className="text-charcoal font-medium">{CONTACT_INFO.givingEmail}</span>.
          </p>
        )}
        <button onClick={() => setStatus("idle")} className="btn-primary mt-8 text-sm">
          Give Again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Amount */}
      <div>
        <p className="text-xs font-medium tracking-widest text-muted uppercase mb-3">Amount (CAD)</p>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {PRESETS.map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => { setPreset(val); setCustom(""); }}
              className={`py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200 ${
                preset === val
                  ? "bg-charcoal text-cream"
                  : "bg-cream-50 text-charcoal hover:bg-charcoal/10 border border-border-light"
              }`}
            >
              ${val}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">$</span>
          <input
            type="number"
            min="1"
            max="10000"
            step="0.01"
            placeholder="Other amount"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setPreset(null); }}
            className={`${inputClass} pl-8`}
          />
        </div>
      </div>

      {/* Frequency */}
      <div>
        <p className="text-xs font-medium tracking-widest text-muted uppercase mb-3">Frequency</p>
        <div className="grid grid-cols-2 gap-2">
          {FREQUENCIES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setFrequency(id)}
              className={`py-2.5 rounded-xl text-sm font-body transition-all duration-200 border ${
                frequency === id
                  ? "bg-charcoal text-cream border-charcoal"
                  : "bg-white text-charcoal border-border-light hover:border-charcoal/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Personal details */}
      <div>
        <p className="text-xs font-medium tracking-widest text-muted uppercase mb-3">Your Details</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email (for receipt)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClass}
          />
        </div>
        <textarea
          placeholder="Purpose of giving (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
          maxLength={200}
          className={`${inputClass} mt-3 resize-none`}
        />
      </div>

      {/* Payment */}
      <div>
        <p className="text-xs font-medium tracking-widest text-muted uppercase mb-3">Payment Details</p>

        {!paymentElementReady && (
          <div className="space-y-3 animate-pulse">
            <div className="h-11 bg-border-light/60 rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 bg-border-light/60 rounded-xl" />
              <div className="h-11 bg-border-light/60 rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 bg-border-light/60 rounded-xl" />
              <div className="h-11 bg-border-light/60 rounded-xl" />
            </div>
          </div>
        )}

        <div className={paymentElementReady ? undefined : "hidden"}>
          <PaymentElement
            onReady={() => setPaymentElementReady(true)}
            options={{
              fields: {
                billingDetails: { name: "never", email: "never" },
              },
            }}
          />
        </div>
      </div>

      {isRecurring && amount > 0 && (
        <p className="text-xs text-muted font-body bg-gold/8 border border-gold/20 rounded-xl px-4 py-3 leading-relaxed">
          You&apos;re setting up a recurring gift of{" "}
          <span className="text-charcoal font-medium">${amount.toFixed(2)} CAD</span> every{" "}
          <span className="text-charcoal font-medium">{FREQ_LABEL[frequency as Exclude<GivingFrequency, "one_time">]}</span>{" "}
          toward <span className="text-charcoal font-medium">{selectedCategory.label}</span>.
          You can cancel at any time by emailing us.
        </p>
      )}

      {status === "error" && errorMsg && (
        <p className="text-red-600 text-sm font-body bg-red-50 rounded-xl px-4 py-3">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || !paymentElementReady || !isValid || status === "loading"}
        className="w-full flex items-center justify-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Processing…" : (
          <>
            Give ${amount > 0 ? amount.toFixed(2) : "0.00"} CAD
            {isRecurring ? ` / ${FREQ_LABEL[frequency as Exclude<GivingFrequency, "one_time">]}` : ""}
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-muted font-body">
        <LockClosedIcon className="w-3.5 h-3.5" />
        Secured by Stripe. Card details are never stored on our servers.
      </div>
    </form>
  );
}

const stripeFallback = (
  <div className="text-center py-8 px-4">
    <p className="text-muted font-body text-sm mb-2">Online giving is temporarily unavailable.</p>
    <p className="text-muted font-body text-sm">
      Give via e-Transfer to{" "}
      <span className="text-charcoal font-medium">{CONTACT_INFO.givingEmail}</span>
      {" "}or in person at Sunday service.
    </p>
  </div>
);

function GivePageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [category, setCategory] = useState<GivingCategory>(
    categoryParam === "promiseland" ? "promiseland" : "tithes"
  );

  return (
    <>
      {/* Hero — matches all other pages */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/5.JPG"
          alt="Restoration House Brantford — Generosity"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/30" />

        <div className="relative z-10 container-width section-padding pb-16 sm:pb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="section-label text-gold mb-4">GENEROSITY</div>
            <h1 className="section-heading-lg text-cream">
              Give to
              <span className="block text-gold">God&apos;s Work Here</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              Your generosity fuels lives transformed, families restored, and a
              community built on faith.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main — two-column layout matching other pages */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Context */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-subsection-heading text-charcoal mb-4">Why We Give</h2>
                <p className="text-body-primary text-muted leading-relaxed">
                  Giving is an act of worship. A tangible expression of trust in God as our
                  provider and gratitude for all He has done. Every gift sown into Restoration
                  House Brantford directly supports our services, outreach, and the Promiseland
                  building project.
                </p>
              </div>

              {/* Scripture */}
              <blockquote className="border-l-4 border-gold pl-6 py-1">
                <p className="font-heading italic text-lg md:text-xl text-charcoal leading-relaxed">
                  &ldquo;Each of you should give what you have decided in your heart to give,
                  not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;
                </p>
                <cite className="block text-sm text-gold font-body mt-3 not-italic">
                  2 Corinthians 9:7
                </cite>
              </blockquote>

              {/* Other ways to give */}
              <div>
                <h3 className="text-xs font-medium tracking-widest text-muted uppercase mb-4">
                  Other Ways to Give
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-border-light bg-cream-50">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <HeartIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-charcoal text-sm">In Person</p>
                      <p className="text-xs text-muted font-body mt-0.5">
                        Any Sunday service or midweek gathering at 7 Burnley Ave, Brantford.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl border border-border-light bg-cream-50">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <ArrowRightIcon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-charcoal text-sm">e-Transfer</p>
                      <p className="text-xs text-muted font-body mt-0.5">
                        Send to{" "}
                        <span className="text-gold font-medium">{CONTACT_INFO.givingEmail}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Giving form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              {/* Category selection */}
              <div>
                <p className="text-xs font-medium tracking-widest text-muted uppercase mb-3">
                  What would you like to give towards?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setCategory(id); trackGivingCategorySelected(label); }}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm font-body transition-all duration-200 ${
                        category === id
                          ? "border-gold bg-gold/10 text-charcoal"
                          : "border-border-light bg-white text-muted hover:border-gold/40"
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${category === id ? "text-gold" : "text-muted"}`} />
                      <span className={`font-medium truncate ${category === id ? "text-charcoal" : "text-muted"}`}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form card */}
              <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
                <div className="px-6 md:px-8 pt-6 pb-4 border-b border-border-light">
                  <h2 className="font-heading text-xl text-charcoal font-semibold">Make a Gift</h2>
                  <p className="text-muted text-xs font-body mt-0.5">Secure giving powered by Stripe</p>
                </div>
                <div className="p-6 md:p-8">
                  <StripeErrorBoundary fallback={stripeFallback}>
                    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                      <GiveForm category={category} />
                    </Elements>
                  </StripeErrorBoundary>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function GivePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <GivePageContent />
    </Suspense>
  );
}
