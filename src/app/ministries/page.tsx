"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ministries } from "@/data/ministries";

export default function Ministries() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/5.JPG"
          alt="Church ministries"
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
            <div className="section-label text-gold mb-4">FIND YOUR PLACE</div>
            <h1 className="section-heading-lg text-cream">
              Our Church
              <span className="block text-gold">Ministries</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              Every age, every stage, every person has a place in our church family.
              Discover where you belong and how you can grow in faith.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-charcoal border-t border-border-dark py-5">
        <div className="container-width section-padding">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-cream/80 text-body-secondary">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gold" />
              <span>3 Ministries</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-gold" />
              <span>Sundays · 10:00 AM - 12:00 PM</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4 text-gold" />
              <span>All ages welcome</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Showcase */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <div className="space-y-16 sm:space-y-24">
            {ministries.map((ministry, index) => {
              const IconComponent = ministry.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Content */}
                  <div className={`space-y-8 ${isEven ? "lg:pr-8" : "lg:pl-8 lg:col-start-2"}`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-cream-50 border border-gold/20 flex-shrink-0">
                        <IconComponent className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <h2 className="section-heading text-charcoal">{ministry.title}</h2>
                        {ministry.subtitle && (
                          <p className="text-card-heading text-gold font-medium">{ministry.subtitle}</p>
                        )}
                      </div>
                    </div>

                    <p className="text-body-primary text-muted leading-relaxed">{ministry.description}</p>

                    <div className="bg-gold/5 rounded-2xl p-6 border border-gold/20">
                      <h3 className="text-card-heading text-charcoal mb-4">What We Offer</h3>
                      <ul className="space-y-2">
                        {ministry.features.map((feature, fi) => (
                          <li key={fi} className="flex items-start space-x-3">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                            <span className="text-body-secondary text-muted">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="premium-card p-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CalendarIcon className="w-5 h-5 text-gold" />
                          <span className="text-body-primary font-medium text-charcoal">{ministry.schedule}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <ClockIcon className="w-5 h-5 text-gold" />
                          <span className="text-body-secondary text-muted">{ministry.time}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="w-5 h-5 text-gold" />
                          <span className="text-body-secondary text-muted">
                            {ministry.title === "Youth & Young Adult Church"
                              ? "50 Market Street, Brantford, ON N3T 2Z5"
                              : "7 Burnley Ave, Brantford, ON"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link href="/contact" className="btn-primary">
                      Learn More & Get Involved
                    </Link>
                  </div>

                  {/* Image */}
                  <div className={`${isEven ? "lg:pl-8" : "lg:pr-8 lg:col-start-1"}`}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/10 rounded-3xl blur-xl" />
                      <div className="relative bg-white rounded-3xl overflow-hidden shadow-luxury border border-border-light">
                        <div className="aspect-[16/15] relative">
                          <Image
                            src={ministry.image}
                            alt={ministry.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                              <h3 className="text-white text-card-heading mb-1">{ministry.title}</h3>
                              {ministry.subtitle && (
                                <p className="text-white/80 text-body-secondary">{ministry.subtitle}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mid-section Quote */}
      <section className="section-spacing section-dark">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-gold text-5xl font-heading mb-6">&ldquo;</div>
            <p className="text-cream text-body-primary text-xl leading-relaxed font-heading italic">
              Manifesting Power and Impacting Lives with the Enriching Word of God.
            </p>
            <div className="text-gold text-5xl font-heading mt-4">&rdquo;</div>
            <p className="text-cream/60 text-body-secondary mt-6 tracking-widest uppercase text-xs">
              Our Motto
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing section-light">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="section-heading text-charcoal">Ready to Find Your Place?</h2>
            <p className="text-body-primary text-muted max-w-2xl mx-auto">
              Every ministry welcomes new members with open arms. Come as you are and discover
              how God wants to use you in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <Link href="/events" className="btn-secondary">View Upcoming Events</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
