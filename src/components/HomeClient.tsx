"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ClockIcon,
  PlayCircleIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import HeroSlideshow from "@/components/HeroSlideshow";
import { type Event } from "@/lib/sanity-events";
import { getImageUrl, shouldOptimizeImage } from "@/lib/sanity-image";
import { useState } from "react";
import { trackNewsletterSignup } from "@/lib/analytics";

export default function HomeClient({ upcomingEvents }: { upcomingEvents: Event[] }) {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || newsletterStatus === "loading") return;
    setNewsletterStatus("loading");
    setNewsletterMsg("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus("success");
        setNewsletterMsg(data.message ?? "You're subscribed!");
        setEmail("");
        trackNewsletterSignup();
      } else {
        setNewsletterStatus("error");
        setNewsletterMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <HeroSlideshow />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/40 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 sm:pb-28 md:pb-32">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="section-heading-lg text-cream mb-4"
            >
              Restoration House Brantford
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-xl text-cream/75 font-body mt-4 max-w-lg leading-relaxed"
            >
              Where Faith Meets Family and Love Never Fails
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
            >
              <Link href="/give" className="btn-primary">
                Give Online
              </Link>
              <Link
                href="https://www.youtube.com/@rccgrestorationhousebrantf8713"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
              >
                Watch Online
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-cream/15 bg-charcoal/30 py-4 px-8">
          <div className="max-w-7xl mx-auto">
            <p className="text-cream/60 text-sm font-body text-center">
              Sundays at 10:00 AM  ·  7 Burnley Ave, Brantford
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Quick Info Strip */}
      <section className="bg-charcoal py-10">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-dark">
            <div className="flex flex-col items-center gap-2 text-center px-6 py-5 md:py-0 md:px-8">
              <MapPinIcon className="w-5 h-5 text-gold" />
              <div className="section-label">VISIT US</div>
              <p className="text-cream/80 text-sm font-body">7 Burnley Ave, Brantford ON</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center px-6 py-5 md:py-0 md:px-8">
              <ClockIcon className="w-5 h-5 text-gold" />
              <div className="section-label">SERVICE TIMES</div>
              <p className="text-cream/80 text-sm font-body">Sun 10AM · Tue 7PM · Thu 7PM</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center px-6 py-5 md:py-0 md:px-8">
              <PlayCircleIcon className="w-5 h-5 text-gold" />
              <div className="section-label">WATCH ONLINE</div>
              <Link
                href="https://www.youtube.com/@rccgrestorationhousebrantf8713"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-text text-gold"
              >
                Live Every Sunday →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Welcome Strip */}
      <section className="section-light section-spacing">
        <div className="max-w-3xl mx-auto section-padding text-center">
          <div className="section-label">A PLACE TO CALL HOME</div>
          <h2 className="section-heading mt-3">Everyone Is Welcome at Restoration House</h2>
          <p className="text-muted mt-6 leading-relaxed font-body">
            Whether you're searching for faith, community, or simply a place to belong,
            our doors are open to you. Come as you are.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-12 mt-12">
            <div className="text-center">
              <HeartIcon className="w-8 h-8 text-gold mx-auto" />
              <h3 className="text-lg font-heading font-medium mt-3">Faith</h3>
              <p className="text-sm text-muted mt-1 font-body">Rooted in God's Word</p>
            </div>

            <div className="text-center">
              <UserGroupIcon className="w-8 h-8 text-gold mx-auto" />
              <h3 className="text-lg font-heading font-medium mt-3">Community</h3>
              <p className="text-sm text-muted mt-1 font-body">A family that cares</p>
            </div>

            <div className="text-center">
              <SparklesIcon className="w-8 h-8 text-gold mx-auto" />
              <h3 className="text-lg font-heading font-medium mt-3">Purpose</h3>
              <p className="text-sm text-muted mt-1 font-body">Gifted for a reason</p>
            </div>
          </div>

          <Link href="/about" className="btn-primary mt-12">
            I'm New Here
          </Link>
        </div>
      </section>

      {/* Section 4 - From Our Pastor */}
      <section className="section-dark section-spacing">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="section-label">FROM OUR PASTOR</div>
              <h2 className="section-heading text-cream mt-3">A Warm Welcome to Our Church Family</h2>

              <div className="text-cream/70 mt-6 leading-relaxed space-y-4 font-body">
                <p>
                  Welcome to Restoration House Brantford! I'm Pastor Oluwaseyi Akinbiyi, and along with my husband Dr. Tolulola Akinbiyi, we are blessed to serve this wonderful congregation.
                </p>
                <p>
                  Since April 1, 2018, God has been faithful in building this community of believers. What started in a conference room has grown into a thriving church family where lives are transformed by God's love and power.
                </p>
                <p>
                  Our heart's desire is to see every person who walks through our doors experience the restoring power of Jesus Christ. Whether you're seeking healing, hope, or simply a place to belong, you'll find a home here with us.
                </p>
              </div>

              <div className="border-l-4 border-gold pl-6 mt-8">
                <p className="font-heading italic text-xl text-gold-muted">
                  "Manifesting Power and Impacting Lives with the Enriching Word of God"
                </p>
                <p className="text-sm text-cream/50 mt-2 font-body">- Our Church Motto</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/give" className="btn-outline-light">
                  Give Online
                </Link>
                <Link href="/about" className="btn-text text-gold">
                  Learn More About Us →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-2 ring-gold/30 ring-offset-4 ring-offset-charcoal">
                <Image
                  src="/Media/Leadership/Dr-And-Pastor.jpg"
                  alt="Pastor Oluwaseyi Akinbiyi and Dr. Tolulola Akinbiyi - Restoration House Brantford"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Upcoming Events */}
      <section className="section-alt section-spacing">
        <div className="container-width section-padding">
          <div className="mb-16">
            <div className="section-label">UPCOMING EVENTS</div>
            <h2 className="section-heading">Upcoming Events</h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <>
              {/* Featured Event */}
              <div className="flex flex-col lg:flex-row gap-8 mb-10">
                <div className="lg:w-1/2">
                  <div className="relative h-72 rounded-xl overflow-hidden">
                    <Image
                      src={getImageUrl(upcomingEvents[0].image, upcomingEvents[0].imageFallback)}
                      alt={upcomingEvents[0].title}
                      fill
                      className="object-cover"
                      unoptimized={!shouldOptimizeImage(upcomingEvents[0].image)}
                    />
                  </div>
                </div>

                <div className="lg:w-1/2 lg:border-l-4 lg:border-gold lg:pl-8 flex flex-col justify-center">
                  <div className="section-label">{upcomingEvents[0].category}</div>
                  <h3 className="font-heading text-3xl font-semibold mt-2 mb-4">{upcomingEvents[0].title}</h3>
                  <p className="text-muted mb-4 font-body">{upcomingEvents[0].description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span>{upcomingEvents[0].date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <ClockIcon className="w-4 h-4" />
                      <span>{upcomingEvents[0].time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <MapPinIcon className="w-4 h-4" />
                      <span>{upcomingEvents[0].location || "7 Burnley Ave, Brantford"}</span>
                    </div>
                  </div>

                  <Link href="/events" className="btn-primary">
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Remaining Events Grid */}
              {upcomingEvents.slice(1, 4).length > 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                  {upcomingEvents.slice(1, 4).map((event, index) => (
                    <div
                      key={index}
                      className="bg-cream rounded-2xl border border-border-light overflow-hidden hover:border-gold transition-colors duration-200"
                    >
                      <div className="relative h-48">
                        <Image
                          src={getImageUrl(event.image, event.imageFallback)}
                          alt={event.title}
                          fill
                          className="object-cover"
                          unoptimized={!shouldOptimizeImage(event.image)}
                        />
                      </div>

                      <div className="p-5">
                        <div className="section-label">{event.category}</div>
                        <h3 className="font-heading text-xl font-semibold mt-1">{event.title}</h3>
                        <p className="text-sm text-muted mt-2 font-body">{event.date}</p>
                        <Link href="/events" className="btn-text mt-4">
                          Learn More →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="bg-cream rounded-2xl border border-border-light p-10 text-center">
              <CalendarDaysIcon className="w-12 h-12 text-gold mx-auto" />
              <h3 className="font-heading text-2xl mt-4">Events Coming Soon</h3>
              <p className="text-muted text-sm mt-2 font-body">Check back shortly for upcoming gatherings.</p>
              <Link href="/contact" className="btn-secondary mt-6">
                Subscribe for Updates
              </Link>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/events" className="btn-secondary">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 - Promise Land Project */}
      <section className="section-spacing text-cream relative overflow-hidden">
        <Image
          src="/Media/Image/1.JPG"
          alt="Promise Land Project"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/85" />

        <div className="relative max-w-3xl mx-auto section-padding text-center">
          <div className="section-label">BUILDING OUR FUTURE</div>
          <h2 className="section-heading text-cream mt-3">The Promise Land Project</h2>
          <p className="text-cream/70 mt-6 max-w-xl mx-auto leading-relaxed font-body">
            Our vision is to build a permanent church home, a sanctuary,
            children's ministry, and youth centre for our growing family.
          </p>

          <div className="flex justify-center gap-8 sm:gap-16 mt-12">
            <div className="text-center">
              <div className="font-heading text-5xl text-gold font-bold">7+</div>
              <p className="text-sm text-cream/60 mt-1 font-body">Years of Ministry</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-5xl text-gold font-bold">300+</div>
              <p className="text-sm text-cream/60 mt-1 font-body">Church Family</p>
            </div>
            <div className="text-center">
              <div className="font-heading text-5xl text-gold font-bold">3</div>
              <p className="text-sm text-cream/60 mt-1 font-body">Vision Pillars</p>
            </div>
          </div>

          <Link href="/give?category=promiseland" className="btn-primary mt-10">
            Give to Promiseland
          </Link>
        </div>
      </section>

      {/* Section 8 - Connect CTA */}
      <section className="bg-gold text-charcoal section-spacing">
        <div className="max-w-2xl mx-auto section-padding text-center">
          <div className="section-label text-charcoal/60">STAY IN THE LOOP</div>
          <h2 className="section-heading font-heading mt-3">Stay Connected With Our Community</h2>
          <p className="text-charcoal/70 mt-4 font-body">
            Get updates on events, messages, and ways to get involved.
          </p>

          {newsletterStatus === "success" ? (
            <p className="mt-8 text-charcoal font-medium text-sm bg-white/60 rounded-full px-6 py-3.5 inline-block font-body">
              {newsletterMsg}
            </p>
          ) : (
            <>
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white border-0 rounded-full px-6 py-3.5 text-charcoal placeholder-muted flex-1 focus:ring-2 focus:ring-charcoal/20 outline-none text-sm font-body disabled:opacity-60"
                  required
                  disabled={newsletterStatus === "loading"}
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="bg-charcoal text-cream rounded-full px-6 py-3.5 text-sm font-semibold hover:bg-charcoal/90 transition-colors font-body disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === "loading" ? "Subscribing…" : "Subscribe"}
                </button>
              </form>
              {newsletterStatus === "error" && newsletterMsg && (
                <p className="mt-3 text-charcoal/80 text-sm font-body">{newsletterMsg}</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
