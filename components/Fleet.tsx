"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Ship } from 'lucide-react';
import { HOUSEBOAT_TIERS, WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from '../constants';

export const Fleet: React.FC = () => {
  return (
    <section id="fleet" className="py-8 bg-white relative border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
            Choose Your Experience
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-4">
            Choose Your Perfect<br className="hidden md:block" /> Houseboat Experience
          </h2>
          <p className="text-espresso-500 max-w-xl mx-auto font-light text-sm md:text-base">
            Real-time availability with instant booking confirmation. All houseboats personally verified for quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOUSEBOAT_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full border border-ivory-200 hover:border-bronze-200"
            >
              {/* Image Area */}
              <div className="h-48 md:h-60 overflow-hidden relative">
                <img
                  src={tier.imagePlaceholder}
                  alt={tier.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Available Badge */}
                {tier.availableCount && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1.5 border border-white/10">
                    <Ship className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-400" />
                    {tier.availableCount} available
                  </div>
                )}

                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-forest-900 text-[10px] md:text-xs font-bold rounded-full border border-ivory-200 uppercase tracking-wider shadow-sm">
                    {tier.tagline}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl md:text-2xl font-serif text-forest-950 leading-tight">{tier.name}</h3>
                  </div>
                  <p className="text-espresso-800/80 text-sm leading-relaxed mb-4 font-normal min-h-[3rem]">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-2 mb-6 flex-grow">
                  {tier.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-0.5 min-w-[14px]">
                        <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-bronze-600" />
                      </div>
                      <span className="text-espresso-900 text-xs md:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-ivory-200 mt-auto">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE} Specifically interested in ${tier.name}.`)}`}
                    className="flex items-center justify-between w-full py-3 px-5 rounded-xl bg-forest-50 text-forest-900 font-semibold border border-forest-100 hover:bg-forest-900 hover:text-white hover:border-forest-900 transition-all duration-300 group/btn"
                  >
                    <span className="text-sm">Explore option</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};