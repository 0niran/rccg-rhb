"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const eventCategories = ["All", "Weekly", "Monthly", "Youth & Young Adult", "Special Events"];
  
  const upcomingEvents = [
    {
      title: "Sunday Service",
      date: "Every Sunday",
      time: "10:00 AM - 12:00 PM",
      image: "/Events/Fresh Oil, New Flame.jpeg",
      category: "Weekly",
      description: "Join us for inspiring worship, powerful preaching, and fellowship with our church family at 7 Burnley Ave, Brantford, Ontario."
    },
    {
      title: "Digging Deep",
      date: "Every Tuesday", 
      time: "7:00 PM - 8:00 PM",
      image: "/Events/Digging Deep.jpeg",
      category: "Weekly",
      description: "Join us as we explore Scripture, ask questions, and learn how to apply biblical truths in everyday life at 7 Burnley Ave, Brantford, Ontario."
    },
    {
      title: "Faith Clinic",
      date: "Every Thursday",
      time: "7:00 PM - 8:00 PM", 
      image: "/Events/Faith Clinic.jpeg",
      category: "Weekly",
      description: "An hour dedicated to prayer and intercession. Come and strengthen your faith as we pray for personal needs, families, the church, and our community at 7 Burnley Ave, Brantford, Ontario."
    },
    {
      title: "RHB Youth Week",
      date: "September 19-21, 2025",
      time: "Various Times",
      image: "/Events/Faith Clinic.jpeg",
      category: "Youth & Young Adult",
      description: "3-Day Youth and Young Adult Program - Fresh Oil, New Flame. Friday 10 PM-2 AM: Prayer & Fellowship, Saturday 10 AM-3 PM: Outreach & Academic Talk, Sunday 10 AM: Youth Sunday."
    },
    {
      title: "Night Vigil",
      date: "Third Friday Monthly",
      time: "10:00 PM - 2:00 AM",
      image: "/Media/Testimony.png",
      category: "Monthly", 
      description: "Monthly All-Night Vigil - a powerful time of prayer and worship. Come ready to pray, listen, and encounter God's presence in a unique and intimate way."
    },
    {
      title: "Community Outreach BBQ",
      date: "October 12, 2025",
      time: "12:00 PM - 6:00 PM",
      image: "/Events/Digging Deep.jpeg",
      category: "Special Events",
      description: "Join us as we serve our local community with free food, music, and support services. All welcome to attend or volunteer."
    }
  ];

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "All" 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.category === selectedCategory);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
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
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400 tracking-wide">Join Us</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              Upcoming Events &
              <span className="block text-amber-600">Programs</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover meaningful ways to grow in faith, connect with community, and serve others through our weekly services and special events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integrated Filter & Content Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter - More compact and integrated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {eventCategories.map((category, index) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                      isSelected 
                        ? 'bg-amber-600 text-white shadow-lg scale-105' 
                        : 'bg-amber-50 dark:bg-gray-800 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-gray-700 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
            
            {/* Events Count */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-gray-600 dark:text-gray-400">
                {selectedCategory === "All" 
                  ? `Showing all ${upcomingEvents.length} events` 
                  : `${filteredEvents.length} ${selectedCategory.toLowerCase()} event${filteredEvents.length !== 1 ? 's' : ''}`
                }
              </p>
            </motion.div>
          </motion.div>

          {/* Events Grid with smooth transitions */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={`${event.title}-${selectedCategory}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-amber-100/50 dark:border-gray-700/50 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">{event.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">{event.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>7 Burnley Ave, Brantford, ON</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </>
  );
}