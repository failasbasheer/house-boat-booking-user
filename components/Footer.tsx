'use client';


import React from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';
import { Anchor, MapPin, ShieldCheck, Clock } from 'lucide-react';

import { WhatsAppIcon } from './WhatsAppIcon';
import QuickEnquiryModal from './modals/QuickEnquiryModal';
import { useState } from 'react';


import { useSettings } from '@/context/SettingsContext';

export const Footer: React.FC = () => {
  const { whatsappMessage } = useSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-forest-950 pt-6 md:pt-10 pb-4 md:pb-6 relative overflow-hidden">
      <QuickEnquiryModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        source="Footer"
        customMessage={whatsappMessage}
      />
      {/* Decorative large text background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-serif text-white/[0.03] pointer-events-none whitespace-nowrap leading-none select-none">
        Alleppey
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-6xl font-serif text-white mb-4 md:mb-8">
          Ready to drift away?
        </h2>
        <p className="text-ivory-200 text-sm md:text-lg mb-6 md:mb-12 max-w-xl mx-auto font-light leading-relaxed">
          We handle everything personally via WhatsApp to ensure your requirements are met with precision.
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 md:gap-3 bg-white text-forest-900 hover:bg-ivory-100 px-6 py-3 md:px-10 md:py-4 rounded-xl text-base md:text-lg font-bold transition-all mb-8 md:mb-16 shadow-glow hover:scale-105"
        >
          <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-lg">Start Planning on WhatsApp</span>
        </button>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-ivory-300 text-xs md:text-sm mb-8 md:mb-16 border-t border-b border-white/10 py-4 md:py-8">
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-bronze-500" />
            <span className="font-semibold text-white text-xs md:text-sm">Location</span>
            <span className="opacity-80 text-[10px] md:text-xs text-center">Finishing Point, Alleppey<br />Kerala, India 688013</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-bronze-500" />
            <span className="font-semibold text-white text-xs md:text-sm">Operation</span>
            <span className="opacity-80 text-[10px] md:text-xs text-center">Serving Guests Since 2015<br />Daily 9:00 AM - 8:00 PM</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-bronze-500" />
            <span className="font-semibold text-white text-xs md:text-sm">Guarantee</span>
            <span className="opacity-80 text-[10px] md:text-xs text-center">Verified Fleet<br />Authorized Operators</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-ivory-200 text-[10px] md:text-xs">
          <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-0">
            <Anchor className="w-3 h-3 text-bronze-400" />
            <p>&copy; {new Date().getFullYear()} Kerala Cruise Line. All rights reserved.</p>
          </div>
          <div className="flex gap-4 md:gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer >
  );
};