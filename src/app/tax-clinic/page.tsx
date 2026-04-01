"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import {
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { CONTACT_INFO } from "@/lib/constants";

const FAQ_DATA = [
  {
    question: "What does our Tax Clinic cover?",
    subtitle: "Services included under the CRA CVITP program",
    answer: (
      <div className="space-y-4">
        <p className="text-body-primary text-muted leading-relaxed">
          Our Tax Clinic is part of the Canada Revenue Agency&apos;s Community Volunteer
          Income Tax Program (CVITP). We provide free tax preparation for individuals
          and families with modest incomes and simple tax situations.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-card-heading text-charcoal mb-2">We prepare returns with</h4>
            <ul className="space-y-1.5 text-body-secondary text-muted">
              {[
                "Employment income (T4 slips)",
                "Pension income",
                "Government benefits (CPP, OAS, EI)",
                "RRSP withdrawals",
                "Scholarships & bursaries",
                "Interest income under $1,200",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h4 className="text-card-heading text-red-700 mb-2">We do NOT prepare</h4>
            <ul className="space-y-1.5 text-body-secondary text-red-600">
              {[
                "Self-employment income",
                "Business income",
                "Rental income",
                "Capital gains",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "Why should I file my taxes?",
    subtitle: "Benefits even if you owe nothing",
    answer: (
      <div className="space-y-4">
        <p className="text-body-primary text-muted leading-relaxed">
          Filing your taxes is important even if you don&apos;t owe any tax. Here&apos;s why:
        </p>
        <ul className="space-y-2">
          {[
            "You may be entitled to refunds, GST/HST credit, Canada Child Benefit, or Working Income Tax Benefit",
            "You need to file to maintain eligibility for government benefits",
            "Filing establishes your income for benefit calculations",
            "You can carry forward unused credits and deductions",
            "It&apos;s required by law if you owe taxes or if the CRA requests it",
            "Even with no income, filing can unlock benefit payments you&apos;re entitled to",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-body-secondary text-muted">
              <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    question: "Do I qualify for our Tax Clinic?",
    subtitle: "Income, limits and eligibility criteria",
    answer: (
      <div className="space-y-5">
        <p className="text-body-primary text-muted leading-relaxed">
          To qualify, your household must have a <strong>modest income</strong> and a{" "}
          <strong>simple tax situation</strong> (see the first FAQ for details on tax situations).
        </p>
        <div>
          <h4 className="text-card-heading text-charcoal mb-3">Income limits (total family income)</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              ["1 person", "$40,000"],
              ["2 people", "$55,000"],
              ["3 people", "$60,000"],
              ["4 people", "$65,000"],
              ["5 people", "$70,000"],
              ["5+ people", "$70k + $5k each"],
            ].map(([size, limit]) => (
              <div key={size} className="bg-gold/5 border border-gold/20 rounded-xl p-3 text-center">
                <p className="text-body-secondary text-muted">{size}</p>
                <p className="text-card-heading text-gold mt-0.5">{limit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "What documents should I bring?",
    subtitle: "Preparing for your appointment",
    answer: (
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-card-heading text-charcoal mb-3">Income documents</h4>
          <ul className="space-y-1.5 text-body-secondary text-muted">
            {["T4 slips (employment)", "T4A slips (pension, EI, other)", "T5 slips (investment income)", "RRSP withdrawal slips"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-card-heading text-charcoal mb-3">Deduction & personal</h4>
          <ul className="space-y-1.5 text-body-secondary text-muted">
            {["Medical & donation receipts", "Tuition & child care receipts", "Social Insurance Number", "Last year's tax return", "Banking info for direct deposit", "Government-issued photo ID"].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
];

export default function TaxClinic() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  }, []);

  return (
    <>
      {/* Hero — matches all other inner pages */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/4.JPG"
          alt="Tax Clinic — Restoration House Brantford"
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
            <div className="section-label text-gold mb-4">COMMUNITY SERVICE</div>
            <h1 className="section-heading-lg text-cream">
              Free Tax Preparation
              <span className="block text-gold">For Our Community</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              Our volunteers file tax returns for individuals and families with modest incomes
              and simple tax situations, completely free of charge.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="https://outlook.office.com/book/CVITPTaxClinicRestorationHouseBrantford1@rccgbrantford.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
              <Link href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`} className="btn-outline-light">
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call {CONTACT_INFO.phone}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-charcoal border-t border-border-dark py-5">
        <div className="container-width section-padding">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-cream/80 text-body-secondary">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gold" />
              <span>March 2 – April 30, 2026</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-gold" />
              <span>Tue / Thu / Fri 12–4 PM · Sat 10 AM–3 PM</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4 text-gold" />
              <span>7 Burnley Ave, Brantford</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule & Contact */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-heading text-charcoal mb-4">Schedule Your Appointment</h2>
            <p className="text-body-primary text-muted max-w-2xl mx-auto">
              Free tax preparation available throughout tax season
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="premium-card p-6 md:p-8"
            >
              <h3 className="text-subsection-heading text-charcoal mb-6 font-heading">Tax Season Hours</h3>
              <div className="space-y-4">
                {[
                  { days: "Tuesday, Thursday & Friday", time: "12:00 PM – 4:00 PM" },
                  { days: "Saturday", time: "10:00 AM – 3:00 PM" },
                  { days: "Sunday & Monday", time: "Closed" },
                ].map(({ days, time }) => (
                  <div key={days} className="flex items-start justify-between gap-4 py-3 border-b border-border-light last:border-0">
                    <p className="text-body-primary font-medium text-charcoal">{days}</p>
                    <p className={`text-body-primary font-semibold flex-shrink-0 ${time === "Closed" ? "text-muted" : "text-gold"}`}>{time}</p>
                  </div>
                ))}
              </div>
              <p className="text-body-secondary text-muted mt-4 italic">* March 2 – April 30, 2026</p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="premium-card p-6 md:p-8"
            >
              <h3 className="text-subsection-heading text-charcoal mb-6 font-heading">Location & Contact</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-primary font-semibold text-charcoal">Address</p>
                    <p className="text-body-secondary text-muted">RCCG Restoration House Brantford</p>
                    <p className="text-body-secondary text-muted">{CONTACT_INFO.address.main}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-primary font-semibold text-charcoal">Phone</p>
                    <a href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`} className="text-gold hover:text-gold/80 transition-colors text-body-secondary">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-body-primary font-semibold text-charcoal">Tax Clinic Email</p>
                    <a href="mailto:taxclinic@rccgbrantford.com" className="text-gold hover:text-gold/80 transition-colors text-body-secondary break-all">
                      taxclinic@rccgbrantford.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-heading text-charcoal mb-4">Frequently Asked Questions</h2>
            <p className="text-body-primary text-muted max-w-2xl mx-auto">
              Everything you need to know about our free tax preparation service
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  openFAQ === index
                    ? "shadow-luxury bg-gold/5 border-gold/20"
                    : "premium-card hover:shadow-lg"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between hover:bg-cream-50/50 transition-colors duration-300 group"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-4">
                      <div className={`w-1 h-8 rounded-full transition-all duration-300 ${openFAQ === index ? "bg-gold shadow-lg" : "bg-border group-hover:bg-gold/60"}`} />
                      <h3 className={`text-card-heading transition-colors duration-300 ${openFAQ === index ? "text-gold" : "text-charcoal group-hover:text-gold"}`}>
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-1" />
                      <p className={`text-body-secondary transition-colors duration-300 ${openFAQ === index ? "text-muted" : "text-muted group-hover:text-charcoal"}`}>
                        {faq.subtitle}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ml-4 ${openFAQ === index ? "text-gold" : "text-muted"}`}
                  >
                    <ChevronDownIcon className="w-6 h-6" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: openFAQ === index ? "auto" : 0, opacity: openFAQ === index ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 pt-2">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing section-dark">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="section-heading text-cream">Ready to Get Started?</h2>
            <p className="text-body-primary text-cream/80 max-w-2xl mx-auto font-body">
              Book online or call us to schedule your free tax preparation appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="https://outlook.office.com/book/CVITPTaxClinicRestorationHouseBrantford1@rccgbrantford.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
              <Link href={`tel:${CONTACT_INFO.phone.replace(/[\s()]/g, "")}`} className="btn-outline-light">
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call {CONTACT_INFO.phone}
              </Link>
            </div>
            <Link
              href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-text text-cream/60 mt-2 inline-block"
            >
              Learn about the CRA Community Volunteer Income Tax Program →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
