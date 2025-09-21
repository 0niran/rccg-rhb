"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DollarSign, Smartphone, Building } from "lucide-react";

export default function Give() {
  const givingOptions = [
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: "Online Giving",
      description: "Make a secure one-time or recurring donation through our trusted online platform. It's fast, convenient, and allows you to manage your giving history.",
      features: [
        "Easy setup for recurring gifts",
        "Track your donation history", 
        "Secure and confidential"
      ],
      buttonText: "Give Online"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-white" />,
      title: "Text-to-Give",
      description: "A simple way to give using your smartphone. Just text your dedication giving number. It's quick, easy, and impactful.",
      features: [
        "Text \"GIVE\" to (555) 123-4567",
        "Quick and convenient",
        "Connects to your bank account"
      ],
      buttonText: "Get Started"
    },
    {
      icon: <Building className="w-8 h-8 text-white" />,
      title: "In-Person & Mail",
      description: "You can always give during Sunday services or mail your contribution directly to the church office. Your physical presence and support are greatly valued.",
      features: [
        "During Sunday services",
        "Mail to 7 Burnley Ave, Brantford",
        "Anonymous options available"
      ],
      buttonText: "Visit Us"
    }
  ];

  const impactAreas = [
    {
      title: "Supporting Community Outreach",
      image: "/Events/Digging Deep.jpeg",
      description: "Your gifts empower us to serve our neighbors through food drives, mentorship programs, and local aid initiatives."
    },
    {
      title: "Nurturing Youth Programs", 
      image: "/Events/Faith Clinic.jpeg",
      description: "Contributions help fund our vibrant youth groups, Sunday school, and family events, building faith in the next generation."
    },
    {
      title: "Maintaining Our Sanctuary",
      image: "/Media/Testimony.png", 
      description: "Donations ensure our church building remains a welcoming and safe space for worship, fellowship, and community gatherings."
    }
  ];

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Your Generosity Makes a Difference
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Every contribution fuels our mission to spread hope, build community, and serve 
            those in need. Join us in making a lasting impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8"
          >
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300">
              Give Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Ways to Give Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ways to Give</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {givingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-amber-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{option.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-600 text-sm">• {feature}</li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                    {option.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Generosity in Action */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Generosity in Action</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-600 mb-8">
              Thank you for being a vital part of Restoration House Brantford. Your support transforms lives 
              and strengthens our community.
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Together, We Build a Stronger Community
            </h2>
          </motion.div>
        </div>
      </section>
    </>
  );
}