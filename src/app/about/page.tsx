"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export default function About() {
  // Temporarily redirect about page in production - to be worked on later
  if (process.env.NODE_ENV === 'production') {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
      return null;
    }
  }
  // Executive Leadership
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

  // Operations & Management
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

  // Ministry Leaders
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
      image: null, // No image available
      description: "Overseeing church decoration, sanitation, and hospitality to create a welcoming and beautiful worship environment."
    },
    {
      name: "Deaconess Folake Olukinni",
      title: "Minister in Charge, Evangelism & Mission",
      image: "/Media/Leadership/Folake.png",
      description: "Leading evangelism efforts and mission outreach to spread the Gospel and reach our community with God's love."
    }
  ];

  // Fellowship Leaders
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
              <span className="text-sm font-medium text-amber-700 dark:text-amber-400 tracking-wide">Our Story</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-8 leading-tight">
              About Restoration
              <span className="block text-amber-600">House Brantford</span>
            </h1>

            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              A vibrant community where lives are restored, relationships are built, and hope is renewed through the transforming power of God's love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Journey Section - Hero Layout */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12 text-center">
              Our Journey of Faith
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Column */}
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Our journey began on <span className="font-semibold text-amber-600">April 1, 2018</span>, with the establishment of Restoration House Brantford by Pastor Oluwaseyi Akinbiyi and her husband, Dr. Tolulola Akinbiyi.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  We started in a conference room at the Best Western Brantford, but by God's grace, within the first year we received the keys to our own building and celebrated our very first anniversary there.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Six years later, we continue to grow, guided by our motto: <span className="italic font-medium text-amber-600 dark:text-amber-400">"Manifesting Power and Impacting Lives with the Enriching Word of God."</span>
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">6+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Years of Ministry</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">3</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Church Ministries</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-amber-600 dark:text-amber-400 mb-1">2018</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">Building God's Kingdom</div>
                  </motion.div>
                </div>
              </div>

              {/* Hero Image Column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/Media/Leadership/Pst. Oluwaseyi Akinbiyi.jpg"
                    alt="Pastor Oluwaseyi Akinbiyi"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Overlay Text */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">6 Years of Faithful Service</h3>
                      <p className="text-white/90 text-sm">Building God's kingdom in Brantford since 2018</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Foundation Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Our Foundation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do as a church family
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-800/30 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300">
                <HeartIcon className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To lead people into a transformative relationship with Jesus Christ, fostering spiritual growth and building a loving community that serves God and neighbors.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-800/30 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300">
                <EyeIcon className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be a beacon of hope and healing in Brantford and beyond, where every person experiences God's unconditional love, grace, and transforming power.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 border border-amber-200/30 dark:border-amber-800/30 rounded-2xl mx-auto mb-6 flex items-center justify-center transition-all duration-300">
                <UserGroupIcon className="w-10 h-10 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Values</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Faith, Authentic Community, Compassionate Service, Integrity in all things, and Grace-filled relationships guide every aspect of our church life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate servants called to guide, support, and care for our church family
            </p>
          </motion.div>

          {/* Executive Leadership */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">Executive Leadership</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {executiveLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-amber-200 dark:ring-amber-800 group-hover:ring-amber-400 transition-colors duration-300">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{leader.name}</h4>
                  <p className="text-amber-600 dark:text-amber-400 font-medium mb-3 text-sm">{leader.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Operations & Management */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">Operations & Management</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {operationsTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  <div className="relative w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-amber-200 dark:ring-amber-800 group-hover:ring-amber-400 transition-colors duration-300">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{leader.name}</h4>
                  <p className="text-amber-600 dark:text-amber-400 font-medium mb-3 text-sm">{leader.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ministry Leaders */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">Ministry Leaders</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {ministryLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  {leader.image ? (
                    <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-amber-200 dark:ring-amber-800 group-hover:ring-amber-400 transition-colors duration-300">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center ring-4 ring-amber-200 dark:ring-amber-800">
                      <UserGroupIcon className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                    </div>
                  )}
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{leader.name}</h4>
                  <p className="text-amber-600 dark:text-amber-400 font-medium mb-3 text-sm">{leader.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fellowship Leaders */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">Fellowship Leaders</h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {fellowshipLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
                >
                  <div className="relative w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full ring-4 ring-amber-200 dark:ring-amber-800 group-hover:ring-amber-400 transition-colors duration-300">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1">{leader.name}</h4>
                  <p className="text-amber-600 dark:text-amber-400 font-medium mb-3 text-sm">{leader.title}</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{leader.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unity Message */}
      <section className="py-16 bg-amber-50 dark:bg-amber-900/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Serving Together in Unity
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our leadership team works hand-in-hand with dedicated volunteers and ministry leaders who serve faithfully in various capacities. Together, we're committed to creating an environment where everyone can grow in their relationship with God and one another.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Special */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the heart of our church community and what sets us apart today
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <HeartIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Welcoming Community</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                A place where everyone belongs, regardless of background or life stage
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Biblical Teaching</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Sound, practical teaching that applies God's Word to everyday life
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <EyeIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Heartfelt Worship</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Authentic worship that connects hearts to God through music and prayer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                <HeartIcon className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">Life Transformation</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Witnessing lives changed through the power of God's love and grace
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Us Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Be Part of Our Story?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you're taking your first steps of faith or looking for a church home, we'd love to welcome you into our family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="bg-white text-amber-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                Visit Us This Sunday
              </Link>
              <Link
                href="/ministries"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                Explore Ministries
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}