"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckIcon
} from "@heroicons/react/24/outline";

export default function TaxClinic() {
  const services = [
    {
      icon: DocumentTextIcon,
      title: "Tax Return Preparation",
      description: "Complete preparation of personal income tax returns for individuals and families."
    },
    {
      icon: CurrencyDollarIcon,
      title: "Tax Planning & Advice",
      description: "Strategic tax planning to help you maximize deductions and minimize tax liability."
    },
    {
      icon: UserGroupIcon,
      title: "Family Tax Services",
      description: "Specialized tax services for families including child tax benefits and credits."
    },
    {
      icon: CheckIcon,
      title: "Tax Review & Filing",
      description: "Professional review of your tax documents and electronic filing with CRA."
    }
  ];

  const eligibilityRequirements = [
    "Annual household income under $35,000",
    "Simple tax situation (employment income, pensions, benefits)",
    "Canadian resident for tax purposes",
    "Have all required tax documents ready"
  ];

  const requiredDocuments = [
    "T4 slips (employment income)",
    "T4A slips (pension, employment insurance, etc.)",
    "T5 slips (investment income)",
    "Receipts for deductions (medical, donations, etc.)",
    "Previous year's tax return",
    "Social Insurance Number",
    "Banking information for direct deposit"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400 tracking-wide">Community Service</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              Free <span className="text-blue-600">Tax Clinic</span>
            </h1>

            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional tax preparation services for low-income individuals and families.
              Book your appointment today or call us directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="tel:+15193043600"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Call (519) 304-3600
              </Link>
              <button className="inline-flex items-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Book Appointment
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Details */}
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
              Our Tax Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional, confidential, and completely free tax preparation services for qualifying individuals
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule & Contact Info */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
                Schedule & Hours
              </h2>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <ClockIcon className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Operating Hours</h3>
                  </div>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p><strong>Monday - Friday:</strong> 10:00 AM - 4:00 PM</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-3">
                      *Available during tax season (February - April)
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-blue-100/50 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <MapPinIcon className="w-6 h-6 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Location</h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <p>Restoration House Brantford</p>
                    <p>7 Burnley Ave</p>
                    <p>Brantford, ON N3T 1T5</p>
                    <p className="mt-3">
                      <strong>Phone:</strong> <a href="tel:+15193043600" className="text-blue-600 hover:text-blue-700">(519) 304-3600</a>
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
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Professional preparation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Electronic filing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckIcon className="w-5 h-5 mr-3 text-green-200" />
                    <span>Confidential service</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href="tel:+15193043600"
                    className="block w-full bg-white text-blue-600 font-semibold px-6 py-4 rounded-full text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    Call Now: (519) 304-3600
                  </Link>
                  <button className="block w-full border-2 border-white text-white font-semibold px-6 py-4 rounded-full text-center transition-all duration-300 hover:bg-white hover:text-blue-600">
                    Book Online Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="py-20 bg-blue-50/30 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Eligibility & What to Bring
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check if you qualify and see what documents you'll need for your appointment
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-blue-100/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Eligibility Requirements</h3>
                <ul className="space-y-4">
                  {eligibilityRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-blue-100/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Required Documents</h3>
                <ul className="space-y-4">
                  {requiredDocuments.map((document, index) => (
                    <li key={index} className="flex items-start">
                      <DocumentTextIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{document}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
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
                className="inline-flex items-center bg-white text-blue-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span>Contact Us</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white hover:text-blue-600"
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