"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon, UserGroupIcon, HeartIcon, ChatBubbleLeftRightIcon, XMarkIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getEventsByCategory, getUpcomingEvents, getPastEvents, Event, parseEventDate } from "@/lib/events";

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const eventCategories = ["All", "Weekly", "Monthly", "Youth & Young Adult", "Special Events"];
  
  const upcomingEvents = getUpcomingEvents(); // Get all upcoming events sorted by priority
  const pastEvents = getPastEvents(); // Get past events
  const allEvents = [...upcomingEvents, ...pastEvents]; // Combine with upcoming first

  // Filter events based on selected category
  const filteredEvents = selectedCategory === "All" 
    ? allEvents 
    : allEvents.filter(event => event.category === selectedCategory);

  // Helper function to check if event is past
  const isPastEvent = (event: Event): boolean => {
    if (event.isRecurring) return false;
    const eventDate = parseEventDate(event);
    return eventDate < new Date();
  };

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
                className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 ${
                  isPastEvent(event) 
                    ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 opacity-75' 
                    : 'bg-white dark:bg-gray-800 border-amber-100/50 dark:border-gray-700/50'
                }`}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="inline-block bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.category}
                    </span>
                    {isPastEvent(event) && (
                      <span className="inline-block bg-gray-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Past Event
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">{event.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">{event.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <ClockIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPinIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <span>{event.location || "7 Burnley Ave, Brantford, ON"}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(event)}
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                      isPastEvent(event)
                        ? 'bg-gray-500 hover:bg-gray-600 text-white cursor-default'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white'
                    }`}
                  >
                    {isPastEvent(event) ? 'Past Event' : 'Learn More'}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-all duration-300"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>

                {/* Event Category & Status */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="inline-block bg-amber-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedEvent.category}
                  </span>
                  {isPastEvent(selectedEvent) && (
                    <span className="inline-block bg-gray-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Past Event
                    </span>
                  )}
                </div>

                {/* Event Title */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(90vh-16rem)] overflow-y-auto">
                {/* Event Details */}
                <div className="grid gap-4 mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="w-5 h-5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span className="font-medium">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <ClockIcon className="w-5 h-5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-start text-gray-600 dark:text-gray-300">
                    <MapPinIcon className="w-5 h-5 mr-3 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{selectedEvent.location || "7 Burnley Ave, Brantford, ON"}</span>
                  </div>
                </div>

                {/* Event Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                    About This Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Additional Details for Different Event Types */}
                {selectedEvent.category === "Weekly" && (
                  <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                      Weekly Schedule
                    </h4>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      This is a recurring weekly event. Join us every week for consistent spiritual growth and community fellowship.
                    </p>
                  </div>
                )}

                {selectedEvent.category === "Special Events" && !isPastEvent(selectedEvent) && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                      Special Event Details
                    </h4>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      This is a special one-time event. Don't miss this unique opportunity to connect and grow with our community.
                    </p>
                  </div>
                )}

                {selectedEvent.category === "Youth & Young Adult" && (
                  <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      Youth & Young Adult Focus
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Designed specifically for young people to connect, learn, and grow together in faith and fellowship.
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Need More Information?
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <PhoneIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm">+1 (519) 304-3600</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <EnvelopeIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm">hello@rccgbrantford.com</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <GlobeAltIcon className="w-4 h-4 mr-3 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm">rccgbrantford.com</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isPastEvent(selectedEvent) && selectedEvent.id === "marriage-weekend-2025" && (
                  <div className="flex gap-3 mt-6">
                    <a
                      href="https://www.restorationhouse.ca/event-details/mw2025"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg text-center"
                    >
                      Register Now
                    </a>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                )}

                {!isPastEvent(selectedEvent) && selectedEvent.id !== "marriage-weekend-2025" && (
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                )}

                {isPastEvent(selectedEvent) && (
                  <div className="mt-6">
                    <button 
                      onClick={() => setSelectedEvent(null)}
                      className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}