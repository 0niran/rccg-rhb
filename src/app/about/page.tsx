"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function About() {
  const executiveLeaders = [
    {
      name: "Pastor Oluwaseyi Akinbiyi",
      title: "Lead Pastor",
      image: "/Media/Leadership/Pst. Oluwaseyi Akinbiyi.jpg",
      description: "Providing spiritual leadership and vision for our church family, with a heart for transformation and community building."
    },
    {
      name: "Dr. Tolulola Akinbiyi",
      title: "Co-Pastor & Head of Operations",
      image: "/Media/Leadership/DR. Akinbiyi.png",
      description: "Supporting pastoral care and overseeing church operations to ensure our church family is well cared for."
    },
    {
      name: "Pastor Taiwo Sodipo",
      title: "Chief of Staff",
      image: "/Media/Leadership/Taiwo.png",
      description: "Coordinating ministry activities and ensuring smooth operation of church programs and initiatives."
    }
  ];

  const operationsTeam = [
    {
      name: "Sis. Temitope Kagho",
      title: "Finance Manager",
      image: "/Media/Leadership/Temi.png",
      description: "Managing church finances with integrity and ensuring proper stewardship of God's resources."
    },
    {
      name: "Akinlolu Oladosu",
      title: "Director of Programs",
      image: "/Media/Leadership/Oladosu.png",
      description: "Overseeing church programs and events to foster spiritual growth and community engagement."
    }
  ];

  const ministryLeaders = [
    {
      name: "Pastor Kwadwo Adjei",
      title: "Minister in Charge, Fellowship & Welfare",
      image: "/Media/Leadership/Kwado.png",
      description: "Managing fellowship programs, follow-up ministry, and welfare initiatives for church members."
    },
    {
      name: "Pastor Godstime Iwenekhai",
      title: "Minister in Charge, Sunday School & Workers Training",
      image: "/Media/Leadership/Godstime.png",
      description: "Leading spiritual development through Sunday School, Workers in Training, Digging Deep, and Believers Class programs."
    },
    {
      name: "Pastor Dipo Ajayi",
      title: "Minister in Charge, Choir & Media",
      image: "/Media/Leadership/Dipo.jpg",
      description: "Leading worship through music and overseeing media ministry to enhance our worship experience."
    },
    {
      name: "Deaconess Yetunde Ajayi",
      title: "Minister in Charge, Children & Youth",
      image: "/Media/Leadership/Deaconess Yetunde Ajayi.jpg",
      description: "Nurturing the next generation through dedicated ministry to children, teenagers, and youth."
    },
    {
      name: "Pastor David Ojeyinka",
      title: "Lead Pastor, Youth and Young Adult Church",
      image: "/Media/Leadership/David Ojeyinka.jpg",
      description: "Providing spiritual leadership and guidance to the youth and young adult congregation."
    },
    {
      name: "Pastor Johnson Oluwaleke",
      title: "Minister in Charge, Prayer",
      image: "/Media/Leadership/Pst. Johnson Oluwaleke.jpg",
      description: "Leading the prayer ministry and intercession for our church family and community."
    },
    {
      name: "Deaconess Oluwadamilola Sodipo",
      title: "Minister in Charge, Decoration, Sanitation & Hospitality",
      image: "/Media/Leadership/Sodipo2.jpg",
      description: "Overseeing church decoration, sanitation, and hospitality to create a welcoming and beautiful worship environment."
    },
    {
      name: "Deaconess Folake Olukinni",
      title: "Minister in Charge, Evangelism & Mission",
      image: "/Media/Leadership/Folake.png",
      description: "Leading evangelism efforts and mission outreach to spread the Gospel and reach our community with God's love."
    }
  ];

  const fellowshipLeaders = [
    {
      name: "Bro. Ladi Ogunsuilire",
      title: "Men Fellowship Leader",
      image: "/Media/Leadership/Ladi.JPG",
      description: "Leading the men's fellowship and encouraging spiritual growth among the brothers in our church."
    },
    {
      name: "Sis. Hope Didi",
      title: "Women's Fellowship Leader",
      image: "/Media/Leadership/Hope.png",
      description: "Leading the women's fellowship and nurturing spiritual growth among the sisters in our church."
    },
    {
      name: "Bro. Basil Akinbinu",
      title: "Elder's Fellowship",
      image: "/Media/Leadership/Elder Basil.jpg",
      description: "Providing wisdom and guidance as part of the elder's fellowship, supporting church leadership."
    }
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <Image
          src="/Media/Image/7.JPG"
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
            <div className="section-label text-gold mb-4">OUR STORY</div>
            <h1 className="section-heading-lg text-cream">
              About Restoration
              <span className="block text-gold">House Brantford</span>
            </h1>
            <p className="text-cream/75 text-body-primary mt-4 sm:mt-6 max-w-xl leading-relaxed">
              A vibrant community where lives are restored, relationships are built, and hope is
              renewed through the transforming power of God's love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="section-heading text-charcoal mb-12 text-center">Our Journey of Faith</h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6">
                <p className="text-body-primary text-muted leading-relaxed">
                  Our journey began on <span className="font-semibold text-gold">April 1, 2018</span>, with the
                  establishment of Restoration House Brantford by Pastor Oluwaseyi Akinbiyi and her husband, Dr. Tolulola Akinbiyi.
                </p>
                <p className="text-body-primary text-muted leading-relaxed">
                  We started in a conference room at the Best Western Brantford, but by God's grace, within the first year we
                  received the keys to our own building and celebrated our very first anniversary there.
                </p>
                <p className="text-body-primary text-muted leading-relaxed">
                  Six years later, we continue to grow, guided by our motto:{" "}
                  <span className="italic font-medium text-gold">
                    "Manifesting Power and Impacting Lives with the Enriching Word of God."
                  </span>
                </p>

                <div className="grid grid-cols-3 gap-6 pt-6">
                  {[
                    { value: "6+", label: "Years of Ministry" },
                    { value: "3", label: "Church Ministries" },
                    { value: "2018", label: "Building God's Kingdom" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-subsection-heading text-gold mb-1">{stat.value}</div>
                      <div className="text-body-secondary text-muted font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Media/Leadership/Dr-And-Pastor.jpg"
                    alt="Pastor Oluwaseyi Akinbiyi and Dr. Tolulola Akinbiyi"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <h3 className="text-card-heading mb-2">6 Years of Faithful Service</h3>
                      <p className="text-white/90 text-body-secondary">Building God's kingdom in Brantford since 2018</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading text-charcoal mb-6">Our Foundation</h2>
            <p className="text-body-primary text-muted max-w-3xl mx-auto">
              The principles that guide everything we do as a church family
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: HeartIcon,
                title: "Our Mission",
                text: "To lead people into a transformative relationship with Jesus Christ, fostering spiritual growth and building a loving community that serves God and neighbors."
              },
              {
                icon: EyeIcon,
                title: "Our Vision",
                text: "To be a beacon of hope and healing in Brantford and beyond, where every person experiences God's unconditional love, grace, and transforming power."
              },
              {
                icon: UserGroupIcon,
                title: "Our Values",
                text: "Faith, Authentic Community, Compassionate Service, Integrity in all things, and Grace-filled relationships guide every aspect of our church life."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-cream-50 border border-gold/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-subsection-heading text-charcoal mb-4">{item.title}</h3>
                <p className="text-body-primary text-muted leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading text-charcoal mb-6">Meet Our Leadership</h2>
            <p className="text-body-primary text-muted max-w-3xl mx-auto">
              Passionate servants called to guide, support, and care for our church family
            </p>
          </motion.div>

          {/* Executive Leadership */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-charcoal mb-8 text-center font-heading">Executive Leadership</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {executiveLeaders.map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="premium-card rounded-2xl p-6 text-center group"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-border-light group-hover:ring-gold transition-colors duration-300">
                    <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-semibold text-charcoal mb-1 font-heading">{leader.name}</h4>
                  <p className="text-gold font-medium mb-3 text-sm font-body">{leader.title}</p>
                  <p className="text-muted leading-relaxed text-sm font-body">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Operations & Management */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-charcoal mb-8 text-center font-heading">Operations & Management</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {operationsTeam.map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="premium-card rounded-2xl p-6 text-center group"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-border-light group-hover:ring-gold transition-colors duration-300">
                    <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-semibold text-charcoal mb-1 font-heading">{leader.name}</h4>
                  <p className="text-gold font-medium mb-3 text-sm font-body">{leader.title}</p>
                  <p className="text-muted leading-relaxed text-sm font-body">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ministry Leaders */}
          <div>
            <h3 className="text-2xl font-semibold text-charcoal mb-8 text-center font-heading">Ministry Leaders</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {ministryLeaders.map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="premium-card rounded-2xl p-6 text-center group"
                >
                  {leader.image ? (
                    <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-border-light group-hover:ring-gold transition-colors duration-300">
                      <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 bg-cream-50 rounded-full flex items-center justify-center ring-4 ring-border-light">
                      <UserGroupIcon className="w-10 h-10 text-gold" />
                    </div>
                  )}
                  <h4 className="text-lg font-semibold text-charcoal mb-1 font-heading">{leader.name}</h4>
                  <p className="text-gold font-medium mb-3 text-sm font-body">{leader.title}</p>
                  <p className="text-muted leading-relaxed text-sm font-body">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fellowship Leaders */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-charcoal mb-8 text-center font-heading">Fellowship Leaders</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {fellowshipLeaders.map((leader, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="premium-card rounded-2xl p-6 text-center group"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-border-light group-hover:ring-gold transition-colors duration-300">
                    <Image src={leader.image} alt={leader.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-semibold text-charcoal mb-1 font-heading">{leader.name}</h4>
                  <p className="text-gold font-medium mb-3 text-sm font-body">{leader.title}</p>
                  <p className="text-muted leading-relaxed text-sm font-body">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Serving Together */}
      <section className="section-spacing section-dark">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="section-heading text-cream mb-6">Serving Together in Unity</h3>
            <p className="text-body-primary text-cream/80 leading-relaxed font-body">
              Our leadership team works hand-in-hand with dedicated volunteers and ministry leaders who serve faithfully
              in various capacities. Together, we're committed to creating an environment where everyone can grow in
              their relationship with God and one another.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="section-spacing bg-white">
        <div className="container-width section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-heading text-charcoal mb-6">What Makes Us Special</h2>
            <p className="text-body-primary text-muted max-w-3xl mx-auto">
              Discover the heart of our church community and what sets us apart today
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: HeartIcon, title: "Welcoming Community", text: "A place where everyone belongs, regardless of background or life stage" },
              { icon: UserGroupIcon, title: "Biblical Teaching", text: "Sound, practical teaching that applies God's Word to everyday life" },
              { icon: EyeIcon, title: "Heartfelt Worship", text: "Authentic worship that connects hearts to God through music and prayer" },
              { icon: HeartIcon, title: "Life Transformation", text: "Witnessing lives changed through the power of God's love and grace" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-cream-50 border border-gold/20 rounded-2xl flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-gold" />
                </div>
                <h4 className="text-card-heading text-charcoal mb-3">{item.title}</h4>
                <p className="text-body-secondary text-muted leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing section-alt">
        <div className="container-width section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="section-heading text-charcoal mb-6">Ready to Be Part of Our Story?</h2>
            <p className="text-body-primary text-muted mb-8 max-w-2xl mx-auto">
              Whether you're taking your first steps of faith or looking for a church home, we'd love to welcome you into our family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events" className="btn-primary">Visit Us This Sunday</Link>
              <Link href="/ministries" className="btn-secondary">Explore Ministries</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
