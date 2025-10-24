"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BuildingOfficeIcon, EyeIcon, HeartIcon, UserGroupIcon, CalendarIcon, MapPinIcon, StarIcon, TrophyIcon, BookOpenIcon, MapIcon } from "@heroicons/react/24/outline";

export default function About() {
  // Executive Leadership
  const executiveLeaders = [
    {
      name: "Pastor Oluwaseyi Akinbiyi",
      role: "Lead Pastor",
      image: "/Media/Leadership/NewSeyi.jpg",
      description: "Providing spiritual leadership and vision for our church family, with a heart for transformation and community building.",
      tier: "executive"
    },
    {
      name: "Dr. Tolulola Akinbiyi",
      role: "Co-Pastor & Head of Operations",
      image: "/Media/Leadership/DR. Akinbiyi.png",
      description: "Supporting pastoral care and overseeing church operations to ensure our church family is well cared for.",
      tier: "executive"
    },
    {
      name: "Pastor Taiwo Sodipo",
      role: "Chief of Staff",
      image: "/Media/Leadership/Taiwo.png",
      description: "Coordinating ministry activities and ensuring smooth operation of church programs and initiatives.",
      tier: "executive"
    }
  ];

  // Operations & Management
  const operationsTeam = [
    {
      name: "Sis. Temitope Kagho",
      role: "Finance Manager",
      image: "/Media/Leadership/Temi.png",
      description: "Managing church finances with integrity and ensuring proper stewardship of God's resources."
    },
    {
      name: "Akinlolu Oladosu",
      role: "Director of Programs",
      image: "/Media/Leadership/Oladosu.png",
      description: "Overseeing church programs and events to foster spiritual growth and community engagement."
    }
  ];

  // Ministry Leaders
  const ministryLeaders = [
    {
      name: "Pastor Kwadwo Adjei",
      role: "Minister in Charge, Fellowship & Welfare",
      image: "/Media/Leadership/Kwado.png",
      description: "Managing fellowship programs, follow-up ministry, and welfare initiatives for church members."
    },
    {
      name: "Pastor Godstime Iwenekhai",
      role: "Minister in Charge, Sunday School, Workers in Training, Digging Deep & Believers Class",
      image: "/Media/Leadership/Godstime.png",
      description: "Leading spiritual development through Sunday School, Workers in Training, Digging Deep, and Believers Class programs."
    },
    {
      name: "Pastor Dipo Ajayi",
      role: "Minister in Charge, Choir & Media",
      image: "/Media/Leadership/Dipo.jpg",
      description: "Leading worship through music and overseeing media ministry to enhance our worship experience."
    },
    {
      name: "Deaconess Yetunde Ajayi",
      role: "Minister in Charge, Children & Youth",
      image: "/Media/Leadership/Deaconess Yetunde Ajayi.jpg",
      description: "Nurturing the next generation through dedicated ministry to children, teenagers, and youth."
    },
    {
      name: "Pastor David Ojeyinka",
      role: "Lead Pastor, Youth and Young Adult Church",
      image: "/Media/Leadership/David Ojeyinka.jpg",
      description: "Providing spiritual leadership and guidance to the youth and young adult congregation."
    },
    {
      name: "Pastor Johnson Oluwaleke",
      role: "Minister in Charge, Prayer",
      image: "/Media/Leadership/Pst. Johnson Oluwaleke.jpg",
      description: "Leading the prayer ministry and intercession for our church family and community."
    },
    {
      name: "Deaconess Oluwadamilola Sodipo",
      role: "Minister in Charge, Decoration, Sanitation & Hospitality",
      image: "/Media/Leadership/Sodipo2.jpg",
      description: "Overseeing church decoration, sanitation, and hospitality to create a welcoming and beautiful worship environment."
    },
    {
      name: "Deaconess Folake Olukinni",
      role: "Minister in Charge, Evangelism & Mission",
      image: "/Media/Leadership/Folake.png",
      description: "Leading evangelism efforts and mission outreach to spread the Gospel and reach our community with God's love."
    }
  ];

  // Fellowship Leaders
  const fellowshipLeaders = [
    {
      name: "Bro. Ladi Ogunsuilire",
      role: "Men Fellowship Leader",
      image: "/Media/Leadership/Ladi.JPG",
      description: "Leading the men's fellowship and encouraging spiritual growth among the brothers in our church."
    },
    {
      name: "Sis. Hope Didi",
      role: "Women's Fellowship Leader",
      image: "/Media/Leadership/Hope.png",
      description: "Leading the women's fellowship and nurturing spiritual growth among the sisters in our church."
    },
    {
      name: "Bro. Basil Akinbinu",
      role: "Elder's Fellowship",
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
              About <span className="text-amber-600">Restoration House Brantford</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A vibrant community where lives are restored, relationships are built, and hope is renewed through the transforming power of God's love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Moved to second position */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                  Our Journey of Faith
                </h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    Our journey began on <strong className="text-amber-600">April 1, 2018</strong>, with the establishment of Restoration House Brantford by Pastor Oluwaseyi Akinbiyi and her husband, Dr. Tolulola Akinbiyi.
                  </p>
                  <p>
                    We started in a conference room at the Best Western Brantford, but by God's grace, within the first year we received the keys to our own building and celebrated our very first anniversary there.
                  </p>
                  <p>
                    Six years later, we continue to grow, guided by our motto: <strong className="text-amber-600">"Manifesting Power and Impacting Lives with the Enriching Word of God."</strong>
                  </p>
                </div>
              </div>
              
              {/* Church Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 text-center border border-amber-200/50 dark:border-amber-800/50">
                  <div className="text-3xl font-bold text-amber-600 mb-2">6+</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Years of Ministry</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 text-center border border-amber-200/50 dark:border-amber-800/50">
                  <div className="text-3xl font-bold text-amber-600 mb-2">3</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Church Ministries</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-amber-100/50 dark:border-gray-700/50">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/Media/Leadership/Pastor & Dr.jpg"
                      alt="Pastor Oluwaseyi and Dr. Tolulola Akinbiyi - Restoration House Brantford Leaders"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <h3 className="text-white text-xl font-bold mb-1">6 Years of Faithful Service</h3>
                        <p className="text-white/80 text-sm">Building God's kingdom in Brantford since 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Our Foundation
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do as a church family
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200/50 dark:border-amber-800/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To lead people into a transformative relationship with Jesus Christ, fostering spiritual growth and building a loving community that serves God and neighbors.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <EyeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To be a beacon of hope and healing in Brantford and beyond, where every person experiences God's unconditional love, grace, and transforming power.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border border-yellow-200/50 dark:border-yellow-800/50 text-center group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HeartIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Our Values</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Faith, Authentic Community, Compassionate Service, Integrity in all things, and Grace-filled relationships guide every aspect of our church life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate servants called to guide, support, and care for our church family
            </p>
          </motion.div>

          {/* Executive Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Executive Leadership</h3>
              <div className="w-20 h-1 bg-amber-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {executiveLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-white to-amber-50/50 dark:from-gray-800 dark:to-gray-800/50 rounded-3xl overflow-hidden shadow-xl border border-amber-200/30 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                          <h3 className="text-white text-xl font-bold mb-1">{leader.name}</h3>
                          <p className="text-amber-200 text-base font-semibold">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Operations & Management */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Operations & Management</h3>
              <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {operationsTeam.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-orange-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-72 overflow-hidden bg-gray-50 dark:bg-gray-900">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <h3 className="text-white text-lg font-bold">{leader.name}</h3>
                          <p className="text-orange-200 text-sm font-medium">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ministry Leaders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Ministry Leaders</h3>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {ministryLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-blue-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                          <h3 className="text-white text-base font-bold leading-tight">{leader.name}</h3>
                          <p className="text-blue-200 text-xs font-medium">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fellowship Leaders */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Fellowship Leaders</h3>
              <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {fellowshipLeaders.map((leader, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-green-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative h-72 overflow-hidden">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                          <h3 className="text-white text-lg font-bold">{leader.name}</h3>
                          <p className="text-green-200 text-sm font-medium">{leader.role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Team Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-12 border border-amber-200/50 dark:border-amber-800/50 max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
                Serving Together in Unity
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Our leadership team works hand-in-hand with dedicated volunteers and ministry leaders 
                who serve faithfully in various capacities. Together, we're committed to creating an 
                environment where everyone can grow in their relationship with God and one another.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Makes Us Special - Moved to sixth position */}
      <section className="py-20 bg-gradient-to-b from-amber-50/30 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the heart of our church community and what sets us apart today
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Welcoming Community</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">A place where everyone belongs, regardless of background or life stage</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Biblical Teaching</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Sound, practical teaching that applies God's Word to everyday life</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Heartfelt Worship</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Authentic worship that connects hearts to God through music and prayer</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-amber-100/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Life Transformation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Witnessing lives changed through the power of God's love and grace</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
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
              Ready to Be Part of Our Story?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you're taking your first steps of faith or looking for a church home, 
              we'd love to welcome you into our family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-amber-600 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span>Visit Us This Sunday</span>
                <CalendarIcon className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/ministries"
                className="inline-flex items-center border-2 border-white text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white hover:text-amber-600"
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