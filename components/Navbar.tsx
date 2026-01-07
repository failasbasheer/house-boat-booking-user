"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Anchor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';
import Link from 'next/link';

interface NavbarProps {
  scrollThreshold?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ scrollThreshold }) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Initial scroll movement (e.g. > 10px) = 90% transparent (10% opacity)
      setHasScrolled(window.scrollY > 10);

      // 2. Past Hero logic
      // Default to window.innerHeight - 100 if no threshold provided
      const threshold = scrollThreshold ?? (window.innerHeight - 100);
      setIsPastHero(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  // Determine base styles
  // Determine base styles
  let bgClass = '';

  if (mobileMenuOpen) {
    bgClass = 'bg-white py-3 md:py-4 shadow-none';
  } else if (isPastHero) {
    bgClass = 'bg-white md:glass-premium py-3 md:py-4 shadow-sm';
  } else if (hasScrolled) {
    bgClass = 'bg-white/10 backdrop-blur-md md:bg-white/10 md:backdrop-blur-sm py-3 md:py-4 shadow-sm md:shadow-none border-b border-white/10 md:border-white/5';
  } else {
    bgClass = 'bg-transparent py-3 md:py-6 border-none';
  }

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`;

  // Text color: Always dark on mobile (since bg is white). On desktop, depends on state.
  const textColorClass = isPastHero || mobileMenuOpen
    ? 'text-forest-950'
    : 'text-white';

  const buttonClass = isPastHero || mobileMenuOpen
    ? 'bg-forest-900 text-white hover:bg-forest-800'
    : 'bg-forest-900 text-white md:bg-white/10 md:text-white md:backdrop-blur-md md:border md:border-white/20 md:hover:bg-white/20';

  const navLinks = [
    { name: 'Experience', href: '/#experience' },
    { name: 'Categories', href: '/fleet' },
    { name: 'All Boats', href: '/all-boats' },
    { name: 'Gallery', href: '/#gallery' },
  ];

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="Kerala Cruise Line"
            className="h-8 md:h-10 w-auto object-contain"
          />
          <span className={`font-serif text-lg md:text-xl tracking-wide font-medium transition-colors ${textColorClass}`}>
            Kerala Cruise Line
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${textColorClass}`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-black/5 ${buttonClass}`}
          >
            Check Availability
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 ${textColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-serif text-stone-900 leading-tight block hover:text-stone-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 border-t border-stone-200 pt-8"
              >
                <p className="text-xs uppercase tracking-widest text-stone-500 mb-4">Direct Contact</p>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`} // Fallback or direct phone
                  className="block text-xl font-medium text-stone-900 mb-6"
                >
                  +91 98765 43210
                </a>

                <a
                  href={whatsappLink}
                  className="w-full py-4 bg-[#1C1917] text-white text-center text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-colors block"
                >
                  Start Whatsapp Chat
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};