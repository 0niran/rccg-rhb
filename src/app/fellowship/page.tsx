"use client";

import { motion } from "framer-motion";
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
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              House fellowship is where believers gather in homes across Brantford and surrounding areas for intimate worship,
              prayer, Bible study, and fellowship. These smaller gatherings complement our Sunday services by creating
              opportunities for deeper relationships and spiritual growth in a family atmosphere.
            </p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-l-4 border-amber-500">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Spiritual Activities</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Bible study and discussion</li>
              <li>• Worship and praise</li>
              <li>• Prayer and intercession</li>
              <li>• Fellowship and sharing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Community Focus</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
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
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Deeper Relationships</h4>
            <p className="text-gray-600 dark:text-gray-300">Build meaningful connections with fellow believers in an intimate setting.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Family Atmosphere</h4>
            <p className="text-gray-600 dark:text-gray-300">Experience warmth and comfort in neighborhood homes where faith feels personal.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Spiritual Growth</h4>
            <p className="text-gray-600 dark:text-gray-300">Grow in faith through interactive study and consistent spiritual community.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-[220px] pb-20 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              House Fellowship
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join a fellowship cell near you for intimate worship, prayer, and community in homes across Brantford.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive House Fellowship Information */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Learn About House Fellowship
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover what makes our house fellowship special. Click on any section below to explore.
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {accordionData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 ${
                    openAccordion === index
                      ? 'shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700'
                      : 'shadow-md bg-white dark:bg-gray-800 hover:shadow-lg'
                  }`}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 group"
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-4">
                        <div className={`w-1 h-8 transition-all duration-300 rounded-full ${
                          openAccordion === index
                            ? 'bg-gradient-to-b from-amber-500 to-orange-500 shadow-lg'
                            : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-amber-400'
                        }`}></div>
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                          openAccordion === index
                            ? 'text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text'
                            : 'text-gray-800 dark:text-gray-200 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}>
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-1"></div>
                        <p className={`text-sm transition-colors duration-300 ${
                          openAccordion === index
                            ? 'text-gray-600 dark:text-gray-400'
                            : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400'
                        }`}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openAccordion === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 ${
                        openAccordion === index
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-gray-400 dark:text-gray-600'
                      }`}
                    >
                      <ChevronDownIcon className="w-6 h-6" />
                    </motion.div>
                  </button>

                  {/* Accordion Content */}
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
                      <div className={`transition-all duration-300 ${
                        openAccordion === index ? 'translate-y-0' : 'translate-y-4'
                      }`}>
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

      {/* Fellowship Cells */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fellowshipCells.map((cell, index) => (
              <motion.div
                key={cell.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                {/* Area */}
                <div className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-3">
                  {cell.area}
                </div>

                {/* Cell Name */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {cell.name}
                </h3>

                {/* Address */}
                <div className="flex items-start space-x-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{cell.address}</span>
                </div>

                {/* Meeting Time */}
                {cell.meetingTime && (
                  <div className="flex items-start space-x-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{cell.meetingTime}</span>
                  </div>
                )}

                {/* Contact */}
                <div className="space-y-2">
                  <a
                    href={`tel:${cell.contact}`}
                    className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
                  >
                    <PhoneIcon className="w-4 h-4" />
                    <span>{cell.contact}</span>
                  </a>

                  {cell.contact2 && (
                    <a
                      href={`tel:${cell.contact2}`}
                      className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-medium"
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

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Do you have questions or need help finding a House Fellowship cell? Call or send us an email:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1-519-304-3600"
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                (519) 304-3600
              </a>
              <a
                href="mailto:hello@rccgbrantford.com"
                className="border border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-600 hover:text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                hello@rccgbrantford.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}