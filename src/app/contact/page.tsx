"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Users, Heart, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-full px-6 py-3 mb-8">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400 tracking-wide">We'd Love to Meet You</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              Connect With Our
              <span className="block text-amber-600">Church Family</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Whether you're planning your first visit, have questions about our faith community, 
              or need prayer support, we're here for you with open hearts and open arms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information & Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Contact Details */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">Visit Us</p>
                      <p className="text-gray-600 dark:text-gray-300">7 Burnley Ave</p>
                      <p className="text-gray-600 dark:text-gray-300">Brantford, ON N3T 1T5, Canada</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">Call Us</p>
                      <p className="text-gray-600 dark:text-gray-300">(519) 304-3600</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">Email Us</p>
                      <p className="text-gray-600 dark:text-gray-300">hello@rccgbrantford.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-amber-100/50 dark:border-gray-700/50">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
                    />
                  </div>
                  
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300"
                  />
                  
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-all duration-300">
                    <option>How can we help you?</option>
                    <option>I'm planning my first visit</option>
                    <option>I have questions about faith</option>
                    <option>I need prayer support</option>
                    <option>I want to join a ministry</option>
                    <option>I'd like to volunteer</option>
                    <option>Other</option>
                  </select>
                  
                  <textarea
                    rows={4}
                    placeholder="Share your prayer requests, questions, or how we can support you..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 dark:text-gray-100 resize-none transition-all duration-300"
                  ></textarea>
                  
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-amber-100/50 dark:border-gray-700/50">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Find Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">We're located in the heart of Brantford</p>
                </div>
                <div className="relative h-96">
                  <iframe
                    src="https://www.google.com/maps?q=43.150684217397675,-80.26277720274693&hl=en&z=16&output=embed&markers=color:purple%7C43.150684217397675,-80.26277720274693"
                    width="100%"
                    height="100%"
                    style={{ 
                      border: 0,
                      filter: 'grayscale(0.3) contrast(1.1) brightness(0.95)'
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restoration House Brantford Location - 7 Burnley Ave, Brantford, ON"
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-6">
                  <Link
                    href="https://www.google.com/maps/dir//43.150684217397675,-80.26277720274693"
                    target="_blank"
                    className="inline-flex items-center text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300"
                  >
                    Get Directions →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Times & Information */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Service Times & Programs
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join us for worship, fellowship, and spiritual growth throughout the week
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Sunday Service</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">10:00 AM - 12:00 PM</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Main Worship Service</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Digging Deep</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Tue 7:00 PM - 8:00 PM</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Bible Study</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Faith Clinic</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Thu 7:00 PM - 8:00 PM</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Prayer & Healing</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">House Fellowship</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Various Times</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Small Groups</p>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}