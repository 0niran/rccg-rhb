"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, CalendarIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ministries } from "@/data/ministries";

export default function Ministries() {

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
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400 tracking-wide">Find Your Place</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              Our Church <span className="text-amber-600">Ministries</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every age, every stage, every person has a place in our church family. 
              Discover where you belong and how you can grow in faith.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Showcase */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-20">
            {ministries.map((ministry, index) => {
              const IconComponent = ministry.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    isEven ? '' : 'lg:grid-flow-col-dense'
                  }`}
                >
                  {/* Content Section */}
                  <div className={`space-y-8 ${isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}`}>
                    <div className="space-y-6">
                      {/* Icon and Title */}
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${ministry.gradient}`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                            {ministry.title}
                          </h2>
                          <p className="text-lg text-amber-600 dark:text-amber-400 font-medium">
                            {ministry.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        {ministry.description}
                      </p>
                      
                      {/* Features */}
                      <div className={`${ministry.bgColor} ${ministry.darkBgColor} rounded-2xl p-6 border border-amber-100/50 dark:border-gray-700/50`}>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                          What We Offer:
                        </h3>
                        <ul className="space-y-2">
                          {ministry.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center space-x-3">
                              <HeartIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Schedule Info */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CalendarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="font-medium text-gray-800 dark:text-gray-100">{ministry.schedule}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <ClockIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="text-gray-600 dark:text-gray-300">{ministry.time}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPinIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            <span className="text-gray-600 dark:text-gray-300">{ministry.title === "Youth & Young Adult Church" ? "50 Market Street, Brantford, ON N3T 2Z5" : "7 Burnley Ave, Brantford, ON"}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <Link
                        href="/contact"
                        className={`inline-flex items-center bg-gradient-to-r ${ministry.gradient} text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105`}
                      >
                        Learn More & Get Involved
                      </Link>
                    </div>
                  </div>
                  
                  {/* Image Section */}
                  <div className={`${isEven ? 'lg:pl-8' : 'lg:pr-8 lg:col-start-1'}`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50 dark:border-gray-700/50">
                        <div className="aspect-[16/15] relative">
                          <Image
                            src={ministry.image}
                            alt={ministry.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`}></div>
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                              <h3 className="text-white text-xl font-bold mb-1">{ministry.title}</h3>
                              <p className="text-white/80 text-sm">{ministry.subtitle}</p>
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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your Place?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Every ministry welcomes new members with open arms. Come as you are and discover 
              how God wants to use you in our church family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-amber-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white hover:text-amber-600"
              >
                View Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}