"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HeartIcon,
  HandRaisedIcon,
  DocumentTextIcon,
  UserGroupIcon,
  GiftIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

export default function Outreach() {
  const outreachPrograms = [
    {
      icon: DocumentTextIcon,
      title: "Free Tax Clinic",
      description: "Professional tax preparation services for low-income individuals and families during tax season.",
      link: "/tax-clinic",
      status: "Active (Feb-April)"
    },
    {
      icon: GiftIcon,
      title: "Food Bank Support",
      description: "Monthly food drives and support for local food banks to help families in need.",
      link: "#",
      status: "Year Round"
    },
    {
      icon: AcademicCapIcon,
      title: "Educational Support",
      description: "Tutoring and educational resources for children and youth in our community.",
      link: "#",
      status: "Sept-June"
    },
    {
      icon: UserGroupIcon,
      title: "Community Events",
      description: "Free community events, workshops, and gatherings throughout the year.",
      link: "#",
      status: "Regular Events"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-green-700 dark:text-green-400 tracking-wide">Community Service</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              Community <span className="text-green-600">Outreach</span>
            </h1>

            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Serving our community with love, compassion, and practical support.
              Discover how we're making a difference in Brantford and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Our Outreach Mission
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p className="text-lg">
                  At Restoration House Brantford, we believe in being the hands and feet of Jesus in our community. Our outreach programs are designed to meet practical needs while sharing God's love.
                </p>
                <p>
                  From tax preparation services to food support, educational assistance to community events, we're committed to serving all people regardless of background or belief.
                </p>
                <p>
                  Every program we offer flows from our heart to see lives transformed and communities strengthened through practical expressions of God's love.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl p-8 border border-green-200/50 dark:border-green-800/50">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">100+</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Families Served Annually</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Programs</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Community Events</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Years of Service</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Outreach Programs */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Practical ways we serve our community throughout the year
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {outreachPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-green-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <program.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{program.title}</h3>
                    <span className="text-sm text-green-600 font-medium">{program.status}</span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {program.description}
                </p>

                {program.link !== "#" ? (
                  <Link
                    href={program.link}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  >
                    Learn More →
                  </Link>
                ) : (
                  <span className="text-gray-400 dark:text-gray-500 text-sm">More details coming soon</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-green-50/30 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Get Involved
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Whether you need our services or want to volunteer, there are many ways to be part of our community outreach efforts.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <HandRaisedIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Volunteer</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Join our volunteer team and make a direct impact in our community.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <HeartIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Donate</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Support our programs through financial gifts or in-kind donations.</p>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <UserGroupIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">Participate</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Access our services or attend community events we host.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href="/tax-clinic"
                className="inline-flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                Visit Tax Clinic
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}