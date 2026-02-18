"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [outreachDropdownOpen, setOutreachDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Ministries", href: "/ministries" },
    {
      name: "Outreach",
      href: "#",
      dropdown: [
        { name: "Tax Clinic", href: "/tax-clinic" }
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-700 ${
          scrolled
            ? "bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-700/20 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group relative">
              <div className={`relative transition-all duration-500 ${scrolled ? 'w-28 h-28' : 'w-32 h-32'}`}>
                <Image
                  src="/Media/RHB Logos/RCCG Restoration House Brantford-White.svg"
                  alt="Restoration House Brantford"
                  fill
                  priority
                  sizes="(max-width: 768px) 112px, 128px"
                  className="object-contain transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOutreachDropdownOpen(true)}
                      onMouseLeave={() => setOutreachDropdownOpen(false)}
                    >
                      <button
                        className={`flex items-center text-nav-desktop tracking-wide transition-all duration-300 group ${
                          scrolled
                            ? 'text-gray-300 hover:text-amber-400'
                            : 'text-white/90 hover:text-white'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform duration-300 ${outreachDropdownOpen ? 'rotate-180' : ''}`} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                      </button>

                      <AnimatePresence>
                        {outreachDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 py-2 z-50"
                          >
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative text-nav-desktop tracking-wide transition-all duration-300 group ${
                        scrolled
                          ? 'text-gray-300 hover:text-amber-400'
                          : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-white hover:bg-white/10 backdrop-blur-xl'
                }`}
              >
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl border-t border-gray-700/20"
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {item.dropdown ? (
                        <div className="space-y-3">
                          <div className="text-nav-mobile text-gray-100">{item.name}</div>
                          <div className="pl-4 space-y-3">
                            {item.dropdown.map((dropdownItem, dropdownIndex) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-nav-desktop text-gray-300 hover:text-amber-400 transition-colors duration-300"
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-nav-mobile text-gray-100 hover:text-amber-400 transition-colors duration-300"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;