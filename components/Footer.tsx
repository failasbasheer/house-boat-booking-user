import React from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';
import { Anchor, MapPin, ShieldCheck, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-950 pt-10 pb-6 relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[20vw] font-serif text-white/[0.03] pointer-events-none whitespace-nowrap leading-none select-none">
        Alleppey
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
          Ready to drift away?
        </h2>
        <p className="text-ivory-200 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
          We handle everything personally via WhatsApp to ensure your requirements are met with precision.
        </p>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-forest-900 hover:bg-ivory-100 px-10 py-4 rounded-xl text-lg font-bold transition-all mb-16 shadow-glow hover:scale-105"
        >
          Start Planning on WhatsApp
        </a>

        <div className="grid md:grid-cols-3 gap-8 text-ivory-300 text-sm mb-16 border-t border-b border-white/10 py-8">
          <div className="flex flex-col items-center gap-2">
            <MapPin className="w-5 h-5 text-bronze-500" />
            <span className="font-semibold text-white">Location</span>
            <span className="opacity-80">Finishing Point, Alleppey<br />Kerala, India 688013</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock className="w-5 h-5 text-bronze-500" />
            <span className="font-semibold text-white">Operation</span>
            <span className="opacity-80">Serving Guests Since 2015<br />Daily 9:00 AM - 8:00 PM</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-bronze-500" />
            <span className="font-semibold text-white">Guarantee</span>
            <span className="opacity-80">Verified Fleet<br />Authorized Operators</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-ivory-400 text-xs">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Anchor className="w-3 h-3 text-bronze-500" />
            <p>&copy; {new Date().getFullYear()} The Backwaters. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};