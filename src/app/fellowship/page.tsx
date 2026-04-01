"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, ClockIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface FellowshipCell {
  id: number;
  name: string;
  address: string;
  meetingTime?: string;
  contact: string;
  contact2?: string;
  area: string;
}

interface AccordionData {
  title: string;
  subtitle: string;
  content: JSX.Element;
}

const fellowshipCells: FellowshipCell[] = [
  {
    id: 1,
    name: "TABERNACLE OF TESTIMONIES",
    address: "Longboat Run, West Brantford",
    meetingTime: "6-7pm every Sunday (EXCEPT FIRST SUNDAYS)",
    contact: "226-966-6779",
    area: "West Brantford"
  },
  {
    id: 2,
    name: "ONLY BY HIS GRACE!",
    address: "Burgess Cres, Brantford, ON. (West Brant)",
    meetingTime: "6-7 pm every other Sunday",
    contact: "416-303-8852",
    area: "West Brant"
  },
  {
    id: 3,
    name: "PLACE OF HIS PRESENCE",
    address: "Munro Circle, West Brant, Brantford",
    meetingTime: "6-7 pm (once a month)",
    contact: "226-966-4583",
    area: "West Brant"
  },
  {
    id: 4,
    name: "Harmonious Grace Centre",
    address: "Tom Brown Drive, Paris, ON",
    contact: "226-450-0166",
    area: "Paris"
  },
  {
    id: 5,
    name: "The Rehoboth",
    address: "McConkey Crescent, Brantford, ON",
    meetingTime: "6-7pm Twice a month (1st and 3rd Sunday)",
    contact: "514-576-8064",
    contact2: "519-955-0574",
    area: "Brantford"
  },
  {
    id: 6,
    name: "Blessed Assurance",
    address: "Emilie Street, Brantford",
    meetingTime: "Every Sunday, excluding the first Sunday, at 6 pm",
    contact: "226-387-4683",
    contact2: "519-751-9566",
    area: "Brantford"
  },
  {
    id: 7,
    name: "The Lighthouse Fellowship",
    address: "Barlow Pl, Paris",
    meetingTime: "6-7pm every 2nd and 4th Sunday",
    contact: "416-875-1908",
    area: "Paris"
  },
  {
    id: 8,
    name: "Rehoboth House Fellowship Centre",
    address: "247 Gillespie Drive",
    meetingTime: "5-6pm on Sundays",
    contact: "+1 (226) 934-7111",
    area: "Brantford"
  }
];

export default function Fellowship() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionData: AccordionData[] = [
    {
      title: "What is House Fellowship?",
      subtitle: "Understanding our intimate community gatherings",
      content: (
        <div className="space-y-6">
          <div className="max-w-none">
            <p className="text-body-primary text-muted leading-relaxed">
              House fellowship is where believers gather in homes across Brantford and surrounding areas for intimate worship,
              prayer, Bible study, and fellowship. These smaller gatherings complement our Sunday services by creating
              opportunities for deeper relationships and spiritual growth in a family atmosphere.
            </p>
          </div>
          <div className="bg-gold/5 rounded-xl p-6 border-l-4 border-gold">
            <p className="text-body-primary text-charcoal leading-relaxed">
              Each fellowship cell is hosted by dedicated members who open their homes to create a welcoming space for
              spiritual community, making faith more personal and accessible in neighborhood settings.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "What We Do in House Fellowship",
      subtitle: "Our activities and community focus",
      content: (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-card-heading text-charcoal mb-3">Spiritual Activities</h4>
            <ul className="space-y-2 text-body-secondary text-muted">
              <li>• Bible study and discussion</li>
              <li>• Worship and praise</li>
              <li>• Prayer and intercession</li>
              <li>• Fellowship and sharing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-card-heading text-charcoal mb-3">Community Focus</h4>
            <ul className="space-y-2 text-body-secondary text-muted">
              <li>• Pastoral care and support</li>
              <li>• Community outreach planning</li>
              <li>• Life application discussions</li>
              <li>• Celebrating life milestones</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Benefits of Joining House Fellowship",
      subtitle: "What you'll gain from our community",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="text-card-heading text-charcoal mb-2">Deeper Relationships</h4>
            <p className="text-body-secondary text-muted">Build meaningful connections with fellow believers in an intimate setting.</p>
          </div>
          <div>
            <h4 className="text-card-heading text-charcoal mb-2">Family Atmosphere</h4>
            <p className="text-body-secondary text-muted">Experience warmth and comfort in neighborhood homes where faith feels personal.</p>
          </div>
          <div>
            <h4 className="text-card-heading text-charcoal mb-2">Spiritual Growth</h4>
            <p className="text-body-secondary text-muted">Grow in faith through interactive study and consistent spiritual community.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/6.JPG"
          alt="House Fellowship"
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
            <div className="section-label text-gold mb-4">COMMUNITY</div>
            <h1 className="section-heading-lg text-cream">
              House
              <span className="block text-gold">Fellowship</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              Join a fellowship cell near you for intimate worship, prayer, and community
              in homes across Brantford and surrounding areas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-charcoal border-t border-border-dark py-5">
        <div className="container-width section-padding">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-cream/80 text-body-secondary">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4 text-gold" />
              <span>8 Fellowship Cells</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4 text-gold" />
              <span>Sunday Evenings · 5-7 PM</span>
            </div>
            <div className="w-px h-4 bg-border-dark hidden sm:block" />
            <div className="flex items-center space-x-2">
              <MapPinIcon className="w-4 h-4 text-gold" />
              <span>Brantford, West Brant & Paris</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="section-heading text-charcoal mb-4">Learn About House Fellowship</h2>
              <p className="text-body-primary text-muted max-w-2xl mx-auto">
                Discover what makes our house fellowship special. Click on any section below to explore.
              </p>
            </div>

            <div className="space-y-4">
              {accordionData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    openAccordion === index
                      ? "shadow-luxury bg-gold/5 border-gold/20"
                      : "premium-card hover:shadow-lg"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-5 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between hover:bg-cream-50/50 transition-colors duration-300 group"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-1 h-8 transition-all duration-300 rounded-full ${
                            openAccordion === index ? "bg-gold shadow-lg" : "bg-border group-hover:bg-gold/60"
                          }`}
                        />
                        <h3
                          className={`text-card-heading transition-colors duration-300 ${
                            openAccordion === index ? "text-gold" : "text-charcoal group-hover:text-gold"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-1" />
                        <p
                          className={`text-body-secondary transition-colors duration-300 ${
                            openAccordion === index ? "text-muted" : "text-muted group-hover:text-charcoal"
                          }`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openAccordion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ${openAccordion === index ? "text-gold" : "text-muted"}`}
                    >
                      <ChevronDownIcon className="w-6 h-6" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openAccordion === index ? "auto" : 0,
                      opacity: openAccordion === index ? 1 : 0
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2">
                      <div
                        className={`transition-all duration-300 ${
                          openAccordion === index ? "translate-y-0" : "translate-y-4"
                        }`}
                      >
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fellowship Cells Grid */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-heading text-charcoal mb-4">Find a Cell Near You</h2>
            <p className="text-body-primary text-muted max-w-2xl mx-auto">
              We have fellowship cells across Brantford, West Brant, and Paris. Find the one closest to you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fellowshipCells.map((cell, index) => (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="premium-card p-6"
              >
                <div className="section-label mb-3">{cell.area}</div>

                <h3 className="text-card-heading text-charcoal mb-4">{cell.name}</h3>

                <div className="flex items-start space-x-2 mb-3 text-body-secondary text-muted">
                  <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                  <span>{cell.address}</span>
                </div>

                {cell.meetingTime && (
                  <div className="flex items-start space-x-2 mb-4 text-body-secondary text-muted">
                    <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                    <span>{cell.meetingTime}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <a
                    href={`tel:${cell.contact}`}
                    className="flex items-center space-x-2 text-gold hover:text-gold/80 text-body-secondary font-medium transition-colors duration-200"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    <span>{cell.contact}</span>
                  </a>

                  {cell.contact2 && (
                    <a
                      href={`tel:${cell.contact2}`}
                      className="flex items-center space-x-2 text-gold hover:text-gold/80 text-body-secondary font-medium transition-colors duration-200"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span>{cell.contact2}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing section-dark">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading text-cream mb-6">Find Your Fellowship Home</h2>
            <p className="text-body-primary text-cream/80 mb-8 max-w-2xl mx-auto">
              Do you have questions or need help finding a House Fellowship cell? Call or send us an email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+1-519-304-3600" className="btn-primary">(519) 304-3600</a>
              <a href="mailto:hello@rccgbrantford.com" className="btn-outline-light">hello@rccgbrantford.com</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
