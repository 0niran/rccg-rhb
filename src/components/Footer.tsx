"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  HeartIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from "@heroicons/react/24/solid";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Ministries", href: "/ministries" },
    { name: "Tax Clinic", href: "/tax-clinic" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-600/5 to-orange-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-600/5 to-amber-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Church Info & Branding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 bg-amber-100/10 rounded-2xl p-3">
                <Image
                  src="/Media/RHB Logos/RCCG Restoration House Brantford-White.svg"
                  alt="Restoration House Brantford Logo"
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-bold text-2xl text-white">
                  Restoration House
                </h3>
                <p className="text-amber-400 font-medium">Brantford</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              A vibrant community of faith committed to spiritual growth, worship, and service. 
              Come as you are - you belong here.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/19mkBkVF5S/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="group bg-white/5 hover:bg-amber-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-500" aria-label="Follow us on Facebook">
                <FaFacebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/restorationhouse_brantford" target="_blank" rel="noopener noreferrer" className="group bg-white/5 hover:bg-amber-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-500" aria-label="Follow us on Instagram">
                <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@rccgrestorationhousebrantf8713" target="_blank" rel="noopener noreferrer" className="group bg-white/5 hover:bg-amber-600 p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-white/10 hover:border-amber-500" aria-label="Subscribe to our YouTube channel">
                <FaYoutube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-xl mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <ArrowRightIcon className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ministries & Service Times */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-xl mb-6 text-white">Service Times</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                  <UserGroupIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Sunday Service</p>
                  <p className="text-gray-400 text-sm">10:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Digging Deep</p>
                  <p className="text-gray-400 text-sm">Tue 7:00 PM - 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center group-hover:bg-amber-600/30 transition-colors">
                  <HeartIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Faith Clinic</p>
                  <p className="text-gray-400 text-sm">Thu 7:00 PM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-xl mb-6 text-white">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPinIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Visit Us</p>
                  <p className="text-gray-300">
                    7 Burnley Ave<br />
                    Brantford, ON N3T 1T5
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <a href="tel:+15193043600" className="text-gray-300 hover:text-amber-400 transition-colors">
                    (519) 304-3600
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-600/20 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a href="mailto:hello@rccgbrantford.com" className="text-gray-300 hover:text-amber-400 transition-colors">
                    hello@rccgbrantford.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 mb-12"
        >
          <div className="bg-gradient-to-r from-amber-600/10 to-orange-600/10 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Stay Connected With Our Community
              </h3>
              <p className="text-gray-300 mb-6">
                Get updates on upcoming events, inspiring messages, and ways to get involved in our church family.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400">&copy; {currentYear} Restoration House Brantford. All rights reserved.</p>
              <p className="text-gray-500 text-sm mt-1">Member of the Redeemed Christian Church of God</p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center space-x-2 text-gray-500">
                <span>Made with</span>
                <HeartIcon className="w-4 h-4 text-amber-500" />
                <span>by</span>
                <a
                  href="https://cortexcreative.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Cortex Creative
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;