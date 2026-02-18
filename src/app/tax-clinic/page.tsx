"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useCallback } from "react";
import {
  PhoneIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import { CONTACT_INFO } from "@/lib/constants";

const FAQ_DATA = [
  {
    question: "What does our Tax Clinic cover?",
    answer: `Our Tax Clinic is part of the Canada Revenue Agency's Community Volunteer Income Tax Program (CVITP). We provide free tax preparation for individuals and families with modest incomes and simple tax situations.

Simple tax situations include:
• Employment income (T4 slips)
• Pension income
• Government benefits (CPP, OAS, EI, social assistance)
• RRSP withdrawals
• Scholarships, fellowships, bursaries
• Interest income under $1,200

We do NOT prepare returns with self-employment, business income, rental income, or capital gains.`
  },
  {
    question: "Why should I file my taxes?",
    answer: `Filing your taxes is important even if you don't owe any tax because:

• You may be entitled to refunds and credits like the GST/HST credit, Canada Child Benefit, or Working Income Tax Benefit
• You need to file to maintain eligibility for government benefits
• Filing establishes your income for benefit calculations
• You can carry forward unused credits and deductions
• It's required by law if you owe taxes or if the CRA requests it

Even if you have no income, filing can help you receive benefit payments you're entitled to.`
  },
  {
    question: "Do I qualify for our Tax Clinic?",
    answer: `To qualify for our free tax clinic, you must have:

**Modest Income (Total Family Income):**
• 1 person: $40,000 or less
• 2 people: $55,000 or less
• 3 people: $60,000 or less
• 4 people: $65,000 or less
• 5 people: $70,000 or less
• More than 5: $70,000 + $5,000 per additional person

**Simple Tax Situation** (see first FAQ for details)

Note: We may adjust these income limits based on local economic conditions and our community's needs.`
  },
  {
    question: "What documents should I bring?",
    answer: `Please bring all relevant tax documents:

**Income Documents:**
• T4 slips (employment income)
• T4A slips (pension, EI, other income)
• T5 slips (investment income)
• RRSP withdrawal slips

**Deduction/Credit Documents:**
• Medical receipts
• Donation receipts
• Tuition receipts
• Child care receipts

**Personal Information:**
• Social Insurance Number
• Previous year's tax return (if available)
• Banking information for direct deposit
• Government-issued photo ID`
  }
];

export default function TaxClinic() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = useCallback((index: number) => {
    setOpenFAQ(prev => prev === index ? null : index);
  }, []);

  return (
    <>
      {/* Hero Section - Compact and Mobile-Friendly */}
      <section className="pt-64 pb-20 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-blue-900/90"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Main Heading - Mobile Optimized */}
              <h1 className="text-hero-primary">
                <span className="text-white">Free Tax Preparation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400">
                  For Our Community
                </span>
              </h1>

              {/* Description - Mobile Optimized */}
              <p className="text-body-primary text-gray-300 max-w-4xl mx-auto font-light px-4">
                The tax clinic helps our community, where our volunteers file tax returns for people with modest incomes and a simple tax situation.
              </p>

              {/* CTA Buttons - Mobile Optimized */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 px-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="https://outlook.office.com/book/CVITPTaxClinicRestorationHouseBrantford1@rccgbrantford.com/?ismsaljsauthenabled"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 shadow-2xl hover:shadow-teal-500/25"
                  >
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Book Appointment
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                    className="inline-flex items-center justify-center w-full sm:w-auto border-2 border-teal-400 text-teal-300 hover:bg-teal-400 hover:text-slate-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    Call {CONTACT_INFO.phone}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Schedule & Contact Section - Simplified */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-heading text-gray-800 dark:text-gray-100 mb-4">
              Schedule Your Appointment
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Free tax preparation available during tax season
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Hours */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-6 md:p-8 border border-teal-200/50 dark:border-teal-800/50">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tax Season Hours</h3>
              <div className="space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Tuesday, Thursday, Friday</div>
                  <div className="text-teal-600 dark:text-teal-400">12:00 PM - 4:00 PM</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Saturday</div>
                  <div className="text-teal-600 dark:text-teal-400">10:00 AM - 3:00 PM</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-gray-100">Sunday</div>
                  <div className="text-teal-600 dark:text-teal-400">Closed</div>
                </div>
                <p className="text-xs md:text-sm text-teal-600 dark:text-teal-400 mt-3">
                  *March 2nd - April 30th, 2026
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 md:p-8 border border-green-200/50 dark:border-green-800/50">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Location & Contact</h3>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                <p>RCCG Restoration House Brantford</p>
                <p>{CONTACT_INFO.address.main}</p>
                <p className="mt-3">
                  <strong>Phone:</strong> <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '').replace(/[()]/g, '')}`} className="text-teal-600 hover:text-teal-700 break-all">{CONTACT_INFO.phone}</a>
                </p>
                <p>
                  <strong>Email:</strong> <a href="mailto:taxclinic@rccgbrantford.com" className="text-teal-600 hover:text-teal-700 break-all">taxclinic@rccgbrantford.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-teal-50/30 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-section-heading text-gray-800 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about our free tax preparation service
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-teal-100/50 dark:border-gray-700/50 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-6 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUpIcon className="w-5 h-5 text-teal-600" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-teal-600" />
                      )}
                    </div>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-section-heading">
              Ready to Get Started?
            </h2>
            <p className="text-body-primary opacity-90 max-w-2xl mx-auto">
              Call us to schedule your free tax preparation appointment or visit our contact page for more information.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="https://outlook.office.com/book/CVITPTaxClinicRestorationHouseBrantford1@rccgbrantford.com/?ismsaljsauthenabled"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-white text-teal-600 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Appointment
              </Link>
              <Link
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '').replace(/[()]/g, '')}`}
                className="inline-flex items-center justify-center w-full sm:w-auto border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-teal-600"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call {CONTACT_INFO.phone}
              </Link>
            </div>

            {/* Learn More Link */}
            <div className="mt-6 px-4">
              <Link
                href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/community-volunteer-income-tax-program.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white underline underline-offset-4 transition-colors duration-300 text-sm sm:text-base"
              >
                Learn more about the CRA Community Volunteer Income Tax Program
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}