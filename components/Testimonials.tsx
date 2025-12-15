"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  // Duplicate testimonials to create seamless loop
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-8 bg-white relative border-t border-ivory-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
          Guest Stories
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-forest-950">
          What Our Guests Say
        </h2>
      </div>

      <div className="relative w-full mask-gradient-x">
        {/* Gradient Masks for fade effect edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        <motion.div
          className="flex gap-6 w-max pl-6"
          animate={{ x: "-33.33%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, // Adjust speed here
          }}
          whileHover={{ animationPlayState: 'paused' }} // Start/stop handled via CSS usually, strict Framer Motion needs different approach for pause
          style={{ display: 'flex' }}
        >
          {/* Note: Framer Motion default animate pause on hover is tricky. 
               For simple marquee, we rely on the linear animation. 
               Interaction: Hover to pause is best done via CSS animation or complex state control. 
               For now, we deliver smooth auto-scroll. 
           */}
          {duplicatedTestimonials.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="w-[300px] md:w-[400px] flex-shrink-0 bg-white p-8 rounded-2xl border border-ivory-200 relative group hover:border-bronze-200 transition-colors select-none"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-bronze-400 fill-bronze-400" />)}
              </div>

              <Quote className="w-8 h-8 text-bronze-200 absolute top-6 right-6 opacity-30 group-hover:opacity-60 transition-opacity" />

              <p className="text-espresso-800 text-base md:text-lg font-serif italic mb-6 leading-relaxed min-h-[5rem]">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-forest-900 text-white flex items-center justify-center font-serif font-bold text-sm">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <p className="text-forest-900 font-bold text-sm">{t.author}</p>
                  <p className="text-bronze-600 text-[10px] uppercase tracking-wider font-semibold">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};