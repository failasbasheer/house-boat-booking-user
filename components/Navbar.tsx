"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Anchor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen
    ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
    : 'bg-transparent py-6'
    }`;

  const textColorClass = isScrolled || mobileMenuOpen ? 'text-forest-950' : 'text-white';
  const buttonClass = isScrolled || mobileMenuOpen
    ? 'bg-forest-900 text-white hover:bg-forest-800'
    : 'bg-white text-forest-900 hover:bg-gray-50';

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Gallery', href: '#gallery' },
  ];

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <Anchor className={`w-6 h-6 transition-colors ${isScrolled || mobileMenuOpen ? 'text-forest-800' : 'text-white'}`} />
          <span className={`font-serif text-xl tracking-wide font-medium transition-colors ${textColorClass}`}>
            The Backwaters
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${textColorClass}`}
            >
              {link.name}
            </a>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-ivory-200 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg text-forest-900 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={whatsappLink}
                className="mt-4 w-full py-3 bg-forest-900 text-white text-center font-semibold rounded-lg"
              >
                Book via WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};