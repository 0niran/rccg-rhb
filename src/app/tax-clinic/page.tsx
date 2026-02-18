"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function TaxClinic() {
  return (
    <>
      {/* Hero Section - Matching Screenshot Design */}
      <section className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 relative overflow-hidden">
        {/* Background gradient elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-blue-900/90"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center bg-teal-600/20 border border-teal-400/30 rounded-full px-6 py-3 mb-8">
                <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                <span className="text-teal-300 font-medium tracking-wide">Free Community Service</span>
              </div>

              {/* Main Heading - Matching Screenshot */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Free Tax Preparation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-green-400">
                  For Our Community
                </span>
              </h1>

              {/* Description - Matching Screenshot */}
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
                Restoration House Brantford offers free income tax preparation services for low
                and modest-income individuals and families. Our certified volunteer preparers are
                here to help you maximize your refund and ensure compliance.
              </p>

              {/* CTA Button - Matching Screenshot */}
              <div className="pt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold px-12 py-4 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-teal-500/25">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section Title */}
        <div className="absolute bottom-20 left-0 right-0">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Serving Our Community
            </h2>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional, confidential, and completely free tax preparation services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-teal-200/50 dark:border-teal-800/50"
            >
              <DocumentTextIcon className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tax Return Preparation</h3>
              <p className="text-gray-600 dark:text-gray-300">Complete preparation of personal income tax returns for individuals and families with simple tax situations.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-green-200/50 dark:border-green-800/50"
            >
              <CheckIcon className="w-12 h-12 text-green-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Maximize Your Refund</h3>
              <p className="text-gray-600 dark:text-gray-300">Our certified preparers help ensure you claim all eligible deductions and credits to maximize your tax refund.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50"
            >
              <DocumentTextIcon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ensure Compliance</h3>
              <p className="text-gray-600 dark:text-gray-300">Professional preparation ensures your tax return meets all CRA requirements and is filed correctly.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact and Schedule Section */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
                Schedule Your Appointment
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-teal-100/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <ClockIcon className="w-6 h-6 text-teal-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Tax Season Hours</h3>
                  </div>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p><strong>Monday - Friday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-teal-600 dark:text-teal-400 mt-3">
                      *Available February through April
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-teal-100/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <MapPinIcon className="w-6 h-6 text-teal-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Location</h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <p>Restoration House Brantford</p>
                    <p>7 Burnley Ave</p>
                    <p>Brantford, ON N3T 1T5</p>
                    <p className="mt-3">
                      <strong>Phone:</strong> <a href="tel:+15193043600" className="text-teal-600 hover:text-teal-700">(519) 304-3600</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-teal-600 to-green-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Certified preparers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Electronic filing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Maximize your refund</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href="tel:+15193043600"
                    className="block w-full bg-white text-teal-600 font-semibold px-6 py-4 rounded-full text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    <PhoneIcon className="w-5 h-5 inline mr-2" />
                    Call (519) 304-3600
                  </Link>
                  <button className="block w-full border-2 border-white text-white font-semibold px-6 py-4 rounded-full text-center transition-all duration-300 hover:bg-white hover:text-teal-600">
                    <CalendarIcon className="w-5 h-5 inline mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-teal-50/30 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Who Can We Help?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our free tax preparation services are available to qualifying individuals and families
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-teal-100/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Eligibility Requirements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Annual household income under $35,000</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Simple tax situation (employment income, pensions, benefits)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Canadian resident for tax purposes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Have all required tax documents ready</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-teal-100/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">What to Bring</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <DocumentTextIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">T4 slips (employment income)</span>
                  </li>
                  <li className="flex items-start">
                    <DocumentTextIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">T4A slips (pension, employment insurance)</span>
                  </li>
                  <li className="flex items-start">
                    <DocumentTextIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Previous year's tax return</span>
                  </li>
                  <li className="flex items-start">
                    <DocumentTextIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Receipts for deductions (medical, donations)</span>
                  </li>
                  <li className="flex items-start">
                    <DocumentTextIcon className="w-5 h-5 text-teal-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">Social Insurance Number and banking info</span>
                  </li>
                </ul>
              </div>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Questions About Our Tax Clinic?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Don't hesitate to reach out. Our friendly staff is here to help you navigate
              the tax preparation process and answer any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-teal-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white hover:text-teal-600"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}