"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon, ClockIcon, MapPinIcon, XMarkIcon,
  PhoneIcon, EnvelopeIcon, GlobeAltIcon, ArrowTopRightOnSquareIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";
import { getUpcomingEvents, getPastEvents, isPastEvent, type Event } from "@/lib/sanity-events";
import { getImageUrl, shouldOptimizeImage } from "@/lib/sanity-image";
import { trackEventRegistrationClick } from "@/lib/analytics";

const EVENT_CATEGORIES = ["All", "Weekly", "Monthly", "Youth & Young Adult", "Special Events"];

export default function EventsClient({ events }: { events: Event[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const upcomingEvents = useMemo(() => getUpcomingEvents(events), [events]);
  const pastEvents = useMemo(() => getPastEvents(events), [events]);
  const eventsToShow = useMemo(() => [...upcomingEvents, ...pastEvents], [upcomingEvents, pastEvents]);

  const filteredEvents = useMemo(
    () =>
      selectedCategory === "All"
        ? eventsToShow
        : eventsToShow.filter((event) => event.category === selectedCategory),
    [eventsToShow, selectedCategory]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    if (selectedEvent) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  return (
    <>
      {/* Hero — dark with background image */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/1.JPG"
          alt="Restoration House Brantford congregation"
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
            <div className="section-label text-gold mb-4">JOIN US</div>
            <h1 className="section-heading-lg text-cream">
              Upcoming Events &{" "}
              <span className="block text-gold">Programs</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-lg font-body leading-relaxed">
              Discover meaningful ways to grow in faith, connect with community,
              and serve others through our weekly services and special events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick info strip */}
      <section className="bg-charcoal border-t border-border-dark py-5">
        <div className="container-width section-padding">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3">
            {[
              { icon: CalendarIcon, text: "Weekly services every Sunday" },
              { icon: ClockIcon, text: "10:00 AM · Tue & Thu 7:00 PM" },
              { icon: MapPinIcon, text: "7 Burnley Ave, Brantford" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-cream/70 text-sm font-body">
                <Icon className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Events Grid */}
      <section className="section-spacing section-light">
        <div className="container-width section-padding">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {EVENT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold font-body transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gold text-charcoal"
                      : "bg-white border border-border-light text-charcoal hover:border-gold hover:text-gold"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <motion.p
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-body-secondary text-muted font-body"
            >
              {selectedCategory === "All"
                ? `Showing all ${upcomingEvents.length} upcoming events`
                : `${filteredEvents.length} ${selectedCategory.toLowerCase()} event${filteredEvents.length !== 1 ? "s" : ""}`}
            </motion.p>
          </motion.div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={`${event.title}-${selectedCategory}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                  className={`premium-card overflow-hidden rounded-2xl ${
                    isPastEvent(event) ? "opacity-70" : ""
                  }`}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={getImageUrl(event.image, event.imageFallback)}
                      alt={event.title}
                      fill
                      unoptimized={!shouldOptimizeImage(event.image)}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-gold/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-caption font-medium">
                        {event.category}
                      </span>
                      {isPastEvent(event) && (
                        <span className="bg-muted/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-caption font-medium">
                          Past
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-card-heading text-white drop-shadow-lg">{event.title}</h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-body-secondary text-muted mb-5 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-3 text-body-secondary text-muted">
                        <CalendarIcon className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-body-secondary text-muted">
                        <ClockIcon className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-body-secondary text-muted">
                        <MapPinIcon className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{event.location || "7 Burnley Ave, Brantford, ON"}</span>
                      </div>
                    </div>

                    {!isPastEvent(event) && event.registrationUrl ? (
                      <div className="flex gap-3">
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackEventRegistrationClick(event.title)}
                          className="flex-1 btn-primary justify-center"
                        >
                          <span>{event.linkText || "Register Now"}</span>
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setSelectedEvent(event)}
                          className="btn-secondary px-4"
                        >
                          Info
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => !isPastEvent(event) && setSelectedEvent(event)}
                        className={`w-full btn-${isPastEvent(event) ? "secondary" : "primary"} justify-center`}
                        disabled={isPastEvent(event)}
                      >
                        {isPastEvent(event) ? "Past Event" : "Learn More"}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <SparklesIcon className="w-12 h-12 text-gold mx-auto mb-4" />
              <h3 className="section-heading text-charcoal">Events Coming Soon</h3>
              <p className="text-muted text-body-primary mt-3 font-body">
                Check back shortly for upcoming gatherings and programs.
              </p>
              <Link href="/contact" className="btn-primary mt-8">
                Subscribe for Updates
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA — dark section */}
      <section className="section-spacing section-dark">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="section-label mb-4">STAY CONNECTED</div>
            <h2 className="section-heading text-cream">Never Miss What's Coming Up</h2>
            <p className="text-cream/70 text-body-primary mt-6 max-w-xl mx-auto font-body leading-relaxed">
              Subscribe for event reminders, or catch our services live every Sunday on YouTube.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Link href="/contact" className="btn-primary">
                Subscribe for Updates
              </Link>
              <a
                href="https://www.youtube.com/@rccgrestorationhousebrantf8713"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                Watch Online
              </a>
            </div>
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
              role="dialog"
              aria-modal="true"
              aria-labelledby="event-modal-title"
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <Image
                  src={getImageUrl(selectedEvent.image, selectedEvent.imageFallback)}
                  alt={selectedEvent.title}
                  fill
                  unoptimized={!shouldOptimizeImage(selectedEvent.image)}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  aria-label="Close event details"
                  className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-all"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-gold/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-caption font-medium">
                    {selectedEvent.category}
                  </span>
                  {isPastEvent(selectedEvent) && (
                    <span className="bg-muted/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-caption font-medium">
                      Past Event
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 id="event-modal-title" className="text-subsection-heading text-white drop-shadow-lg">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6 max-h-[calc(92vh-12rem)] sm:max-h-[calc(92vh-16rem)] overflow-y-auto">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted">
                    <CalendarIcon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-body-primary font-medium">{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted">
                    <ClockIcon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-body-primary">{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-muted">
                    <MapPinIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-body-primary">
                      {selectedEvent.location || "7 Burnley Ave, Brantford, ON"}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-card-heading text-charcoal mb-3">About This Event</h3>
                  <p className="text-body-primary text-muted leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>

                {selectedEvent.category === "Weekly" && (
                  <div className="mb-6 p-4 bg-gold/5 rounded-xl border border-gold/20">
                    <h4 className="text-card-heading text-gold mb-2">Weekly Schedule</h4>
                    <p className="text-body-secondary text-charcoal">
                      This is a recurring weekly event. Join us every week for consistent spiritual growth and community fellowship.
                    </p>
                  </div>
                )}

                {selectedEvent.category === "Youth & Young Adult" && (
                  <div className="mb-6 p-4 bg-gold/5 rounded-xl border border-gold/20">
                    <h4 className="text-card-heading text-gold mb-2">Youth & Young Adult Focus</h4>
                    <p className="text-body-secondary text-charcoal">
                      Designed specifically for young people to connect, learn, and grow together in faith and fellowship.
                    </p>
                  </div>
                )}

                <div className="border-t border-border-light pt-6 mb-6">
                  <h4 className="text-card-heading text-charcoal mb-4">Need More Information?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted">
                      <PhoneIcon className="w-4 h-4 text-gold" />
                      <span className="text-body-secondary">+1 (519) 304-3600</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted">
                      <EnvelopeIcon className="w-4 h-4 text-gold" />
                      <span className="text-body-secondary">hello@rccgbrantford.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted">
                      <GlobeAltIcon className="w-4 h-4 text-gold" />
                      <span className="text-body-secondary">rccgbrantford.com</span>
                    </div>
                  </div>
                </div>

                {!isPastEvent(selectedEvent) && selectedEvent.registrationUrl ? (
                  <div className="flex gap-3">
                    <a
                      href={selectedEvent.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEventRegistrationClick(selectedEvent.title)}
                      className="flex-1 btn-primary justify-center"
                    >
                      {selectedEvent.linkText || "Register Now"}
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                    </a>
                    <button onClick={() => setSelectedEvent(null)} className="btn-secondary px-6">
                      Close
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full btn-secondary justify-center"
                  >
                    Close
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
