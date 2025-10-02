"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Play, Users, BookOpen, Clock, Car, Home as HomeIcon, MessageSquare, ArrowUpRight, Building, Heart, Target } from "lucide-react";
import HeroSlideshow from "@/components/HeroSlideshow";
import { getUpcomingEvents } from "@/lib/events";

export default function Home() {
  const upcomingEvents = getUpcomingEvents(3); // Get top 3 upcoming events

  return (
    <>
      {/* Hero Section - Warm & Welcoming */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlideshow />
        
        {/* Warm, Welcoming Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          {/* Gentle Welcome Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-2 mb-8"
          >
            <span className="text-sm font-medium tracking-wide">Welcome Home</span>
          </motion.div>

          {/* Gentle Church Identity */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight px-4"
          >
            <span className="text-white">Restoration House</span>{" "}
            <span className="text-stone-200">Brantford</span>
          </motion.h1>

          {/* Warm Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl font-light mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Where Faith Meets Family and Love Never Fails
          </motion.p>
          
          {/* Gentle Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/contact"
              className="inline-flex items-center bg-white/90 hover:bg-white text-gray-800 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl"
            >
              <span>Join Us This Sunday</span>
              <Calendar className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Warm Service Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-flex flex-col sm:flex-row items-center bg-black/20 backdrop-blur-xl border border-white/20 rounded-full px-4 sm:px-6 py-3 gap-2 sm:gap-0 mx-4"
          >
            <Clock className="w-4 h-4 sm:mr-3 text-amber-200" />
            <span className="text-xs sm:text-sm font-medium text-center">Sundays at 10:00 AM • 7 Burnley Ave</span>
          </motion.div>
        </div>

        {/* Gentle Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-xs font-light tracking-wide mb-2">Discover More</span>
            <div className="w-0.5 h-6 bg-white/40 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Pastor's Welcome Message Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-stone-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-stone-200/50 dark:border-gray-700/50">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/Media/Leadership/NewSeyi.jpg"
                      alt="Pastor Oluwaseyi Akinbiyi - Restoration House Brantford"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <h3 className="text-white text-xl font-bold mb-1">Pastor Oluwaseyi Akinbiyi</h3>
                        <p className="text-white/80 text-sm">Senior Pastor & Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center bg-stone-100 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-700 rounded-full px-6 py-3 mb-6">
                  <Heart className="w-4 h-4 mr-2 text-stone-600 dark:text-stone-400" />
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300 tracking-wide">From Our Pastor</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-6 leading-relaxed">
                  A Warm Welcome to Our Church Family
                </h2>
                
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Welcome to Restoration House Brantford! I'm Pastor Oluwaseyi Akinbiyi, and along with my husband Dr. Tolulola Akinbiyi, we are blessed to serve this wonderful congregation.
                  </p>
                  <p>
                    Since April 1, 2018, God has been faithful in building this community of believers. What started in a conference room has grown into a thriving church family where lives are transformed by God's love and power.
                  </p>
                  <p>
                    Our heart's desire is to see every person who walks through our doors experience the restoring power of Jesus Christ. Whether you're seeking healing, hope, or simply a place to belong, you'll find a home here with us.
                  </p>
                  <div className="bg-stone-50 dark:bg-stone-800/30 rounded-xl p-6 border-l-4 border-slate-600">
                    <p className="italic text-slate-700 dark:text-slate-300 font-medium">
                      "Manifesting Power and Impacting Lives with the Enriching Word of God"
                    </p>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">— Our Church Motto</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-slate-600 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  <span>Plan Your Visit</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
                
                <Link
                  href="/about"
                  className="inline-flex items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  <span>Learn More About Us</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Join Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Come as you are and be part of our warm, welcoming community
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-amber-100/50 dark:border-gray-700/50"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="block font-medium">{event.date}</span>
                      <span className="block text-xs">{event.time}</span>
                    </div>
                    
                    <Link
                      href="/events"
                      className="text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300 text-sm"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/events"
              className="inline-flex items-center bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-200 font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-md"
            >
              <span>View All Events</span>
              <Calendar className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Promise Land Project Section */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-stone-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-slate-400/10 to-stone-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-stone-400/10 to-slate-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-stone-100 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-700 rounded-full px-6 py-3 mb-8">
              <Building className="w-4 h-4 mr-2 text-stone-600 dark:text-stone-400" />
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300 tracking-wide">Building Our Future</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              The Promise Land
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-stone-600">
                Project
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Our plan to build a permanent church home that will include a worship sanctuary, 
              children's ministry, and youth centre. We need everyone's support through giving 
              to make this vision possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Worship Sanctuary</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A beautiful, modern sanctuary designed for inspiring worship, prayer, and spiritual growth for our entire congregation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Children's Ministry</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Dedicated spaces for our youngest members to learn, play, and grow in faith through age-appropriate programs and activities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Youth Centre</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                A dynamic space for our teenagers and young adults to connect, learn, and build lasting friendships in Christ.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/50 dark:border-gray-700/50 max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-slate-600 dark:text-slate-400 mr-3" />
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                  Partner With Us
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Your faithful giving toward the Promise Land Project supports the development of our church 
                and the propagation of the Gospel of Christ. Together, we're building more than a building—
                we're creating a lasting home for God's work in our community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="https://rhbpromiseland.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-slate-600 to-stone-600 hover:from-slate-700 hover:to-stone-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  <span>Give to Promise Land</span>
                  <ArrowUpRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link
                  href="https://rhbpromiseland.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg"
                >
                  Learn More About the Project
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20 bg-gradient-to-b from-white to-stone-50/30 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-stone-100 dark:bg-stone-800/30 border border-stone-200 dark:border-stone-700 rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-400">Quick Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              Quick Links
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Easy access to the services and programs you need
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Book a Shared Ride</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Can't make it to church? Our church bus ride share service is here to help! To arrange a pickup, just contact the church office.
              </p>
              <Link
                href="https://forms.gle/kRa2fFayvNpGCNLCA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300"
              >
                Book Your Ride →
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HomeIcon className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Join a House Fellowship</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Community is at the heart of our faith, and our House Fellowships are where it comes to life. These small groups meet weekly to share, pray, and grow together. Find a fellowship near you and experience true connection.
              </p>
              <Link
                href="/contact"
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300"
              >
                Find a Fellowship →
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200/50 dark:border-gray-700/50"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Give a Testimony</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Your story matters! Sharing your testimony is a powerful way to show God's faithfulness and encourage the body of Christ. Whether it's a big victory or a small moment of grace, your experience can be a light for someone else. Let us know if you'd like to share yours.
              </p>
              <Link
                href="/contact"
                className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors duration-300"
              >
                Share Your Story →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}