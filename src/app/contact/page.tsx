"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, EnvelopeIcon, UserGroupIcon, HeartIcon, ChatBubbleLeftRightIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ReCAPTCHAProvider from "@/components/ReCAPTCHAProvider";

export default function Contact() {
  return (
    <ReCAPTCHAProvider>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/3.JPG"
          alt="Restoration House Brantford"
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
            <div className="section-label text-gold mb-4">WE'D LOVE TO MEET YOU</div>
            <h1 className="section-heading-lg text-cream">
              Connect With Our
              <span className="block text-gold">Church Family</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              Whether you're planning your first visit, have questions about our faith community,
              or need prayer support, we're here for you with open hearts and open arms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Contact Info & Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-subsection-heading text-charcoal mb-8">Get In Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-body-primary font-semibold text-charcoal">Visit Us</p>
                      <p className="text-body-secondary text-muted">7 Burnley Ave</p>
                      <p className="text-body-secondary text-muted">Brantford, ON N3T 1T5, Canada</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-body-primary font-semibold text-charcoal">Call Us</p>
                      <p className="text-body-secondary text-muted">(519) 304-3600</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-body-primary font-semibold text-charcoal">Email Us</p>
                      <p className="text-body-secondary text-muted">hello@rccgbrantford.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <ContactForm />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="premium-card overflow-hidden">
                <div className="p-6 border-b border-border-light">
                  <h3 className="text-card-heading text-charcoal">Find Us</h3>
                  <p className="text-body-secondary text-muted mt-2">We're located in the heart of Brantford</p>
                </div>
                <div className="relative h-96">
                  <iframe
                    src="https://www.google.com/maps?q=43.150684217397675,-80.26277720274693&hl=en&z=16&output=embed&markers=color:purple%7C43.150684217397675,-80.26277720274693"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1) brightness(0.95)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Restoration House Brantford Location - 7 Burnley Ave, Brantford, ON"
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <Link
                    href="https://www.google.com/maps/dir//43.150684217397675,-80.26277720274693"
                    target="_blank"
                    className="inline-flex items-center text-gold font-medium hover:text-gold/80 transition-colors duration-300"
                  >
                    Get Directions →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading text-charcoal mb-4">Service Times & Programs</h2>
            <p className="text-body-primary text-muted max-w-2xl mx-auto">
              Join us for worship, fellowship, and spiritual growth throughout the week
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: CalendarIcon, title: "Sunday Service", time: "10:00 AM - 12:00 PM", label: "Main Worship Service", delay: 0 },
              { icon: UserGroupIcon, title: "Digging Deep", time: "Tue 7:00 PM - 8:00 PM", label: "Bible Study", delay: 0.1 },
              { icon: HeartIcon, title: "Faith Clinic", time: "Thu 7:00 PM - 8:00 PM", label: "Prayer & Healing", delay: 0.2 },
              { icon: ChatBubbleLeftRightIcon, title: "House Fellowship", time: "Various Times", label: "Small Groups", delay: 0.3 }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
                className="text-center premium-card p-6"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-card-heading text-charcoal mb-2">{item.title}</h3>
                <p className="text-body-secondary text-muted">{item.time}</p>
                <p className="text-caption text-muted mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ReCAPTCHAProvider>
  );
}
