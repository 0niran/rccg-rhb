"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

const NAV_ITEMS = [
  { name: "Events", href: "/events" },
  { name: "Ministries", href: "/ministries" },
  {
    name: "Community",
    href: "#",
    dropdown: [
      { name: "Fellowship", href: "/fellowship" },
      { name: "Tax Clinic", href: "/tax-clinic" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [communityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [communityMobileOpen, setCommunityMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const showSolid = scrolled || !isHomePage;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body scroll lock for mobile menu — stores and restores original overflow
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCommunityDropdownOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          showSolid
            ? "bg-cream shadow-sm border-b border-border-light py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* relative so the absolutely-centred mobile logo is anchored here */}
          <div className="relative flex items-center justify-between">

            {/* LEFT — hamburger (mobile) | logo (desktop) */}
            <div className="flex items-center">
              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden relative z-50 flex items-center gap-1.5 px-1 py-2 transition-colors duration-200 ${
                  showSolid ? 'text-charcoal' : 'text-white'
                }`}
                aria-label="Open menu"
              >
                <Bars3Icon className="w-5 h-5" />
                <span className="text-xs font-semibold tracking-wider">Menu</span>
              </button>

              {/* Desktop logo — SVG is 3840×2161 (~1.78:1) */}
              <Link href="/" className="hidden lg:flex relative z-50 items-center">
                <div className={`relative transition-all duration-300 flex-shrink-0 ${showSolid ? 'h-12 w-52' : 'h-14 w-60'}`}>
                  <Image
                    src={
                      showSolid
                        ? "/Media/RHB Logos/RCCG Restoration House Brantford-Black.svg"
                        : "/Media/RHB Logos/RCCG Restoration House Brantford-White.svg"
                    }
                    alt="Restoration House Brantford"
                    fill
                    priority
                    unoptimized
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>

            {/* MOBILE LOGO — absolutely centred between hamburger and Give */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="lg:hidden absolute left-1/2 -translate-x-1/2 z-50 flex items-center"
            >
              <div className={`relative transition-all duration-300 flex-shrink-0 ${showSolid ? 'h-10 w-44' : 'h-11 w-48'}`}>
                <Image
                  src={
                    showSolid
                      ? "/Media/RHB Logos/RCCG Restoration House Brantford-Black.svg"
                      : "/Media/RHB Logos/RCCG Restoration House Brantford-White.svg"
                  }
                  alt="Restoration House Brantford"
                  fill
                  priority
                  unoptimized
                  className="object-contain object-center"
                />
              </div>
            </Link>

            {/* CENTRE — desktop nav links */}
            <div className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setCommunityDropdownOpen(true)}
                      onMouseLeave={() => setCommunityDropdownOpen(false)}
                    >
                      <button
                        aria-haspopup="true"
                        aria-expanded={communityDropdownOpen}
                        onClick={() => setCommunityDropdownOpen((v) => !v)}
                        className={`flex items-center text-sm font-medium tracking-wide transition-colors duration-200 ${
                          showSolid
                            ? 'text-charcoal hover:text-gold'
                            : 'text-cream hover:text-white'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon
                          className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                            communityDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* pt-2 bridges the gap so onMouseLeave doesn't fire mid-travel */}
                      <div className="absolute top-full left-0 pt-2 min-w-48 z-50">
                        <div
                          className={`bg-cream rounded-xl shadow-lg border border-border-light p-2 transition-all duration-200 ${
                            communityDropdownOpen
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-1 pointer-events-none'
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block text-sm text-charcoal hover:bg-cream-50 px-4 py-2.5 rounded-lg transition-colors duration-200"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                        isActiveLink(item.href)
                          ? 'text-gold font-semibold'
                          : showSolid
                            ? 'text-charcoal hover:text-gold'
                            : 'text-cream hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT — Give CTA (always visible on mobile + desktop) */}
            <div className="relative z-50 flex items-center">
              <Link
                href="/give"
                onClick={() => setIsOpen(false)}
                className={
                  showSolid
                    ? "btn-primary px-4 lg:px-5 py-2 text-sm"
                    : "btn-outline-light px-4 lg:px-5 py-2 text-sm"
                }
              >
                Give
              </Link>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-cream flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/Media/RHB Logos/RCCG Restoration House Brantford-Black.svg"
              alt="Restoration House Brantford"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-charcoal"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.name} className="border-b border-border-light">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => setCommunityMobileOpen(!communityMobileOpen)}
                    className="w-full flex items-center justify-between font-heading text-3xl font-medium text-charcoal py-5 px-8"
                  >
                    {item.name}
                    <ChevronDownIcon
                      className={`w-6 h-6 transition-transform duration-200 ${
                        communityMobileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${
                    communityMobileOpen ? 'max-h-96' : 'max-h-0'
                  }`}>
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-lg pl-8 py-3 text-muted transition-colors duration-200 ${
                          isActiveLink(dropdownItem.href) ? 'text-gold' : ''
                        }`}
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
                  className={`block font-heading text-3xl font-medium py-5 px-8 transition-colors duration-200 ${
                    isActiveLink(item.href) ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 space-y-4">
          <Link
            href="/give"
            onClick={() => setIsOpen(false)}
            className="btn-primary w-full justify-center"
          >
            Give Online
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navigation;
