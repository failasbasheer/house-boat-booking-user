"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { PRICING_PACKAGES, WHATSAPP_NUMBER } from '../constants';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-8 bg-white border-t border-ivory-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-red-200 shadow-sm animate-pulse">
            <Tag className="w-3.5 h-3.5" />
            Limited Time Offer! 20% OFF
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-4">
            Discover Great<br className="hidden md:block" /> Houseboat Discounts & Packages
          </h2>
          <p className="text-espresso-500 font-light max-w-lg mx-auto">
            Book before the deal ends to secure your preferred date.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl p-8 border border-ivory-200 shadow-sm hover:shadow-xl hover:border-bronze-200 transition-all duration-300 flex flex-col"
            >
              <div className="absolute top-0 right-0 p-6">
                <span className="text-[10px] font-bold text-forest-800 uppercase tracking-widest bg-forest-50 border border-forest-100 px-3 py-1 rounded-full">
                  {pkg.bestFor}
                </span>
              </div>

              <h3 className="text-2xl font-serif text-forest-950 mb-2">{pkg.title}</h3>
              <div className="flex items-center gap-2 text-espresso-500 mb-6">
                <Clock className="w-3.5 h-3.5 text-bronze-600" />
                <span className="text-xs font-medium uppercase tracking-wide">{pkg.duration}</span>
              </div>

              <p className="text-espresso-800 mb-6 leading-relaxed font-normal text-sm flex-grow">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-espresso-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-bronze-400"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-ivory-100">
                <div>
                  <p className="text-espresso-400 text-[10px] uppercase tracking-wide font-bold">Starting from</p>
                  <p className="text-xl md:text-2xl text-forest-900 font-serif">{pkg.priceEstimate}</p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="px-6 py-2.5 bg-forest-900 text-white hover:bg-forest-800 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-forest-900/10 hover:shadow-forest-900/20"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl border border-ivory-200 max-w-3xl mx-auto text-center shadow-sm">
          <h4 className="text-forest-950 font-serif mb-2 text-sm font-semibold">Transparency Promise</h4>
          <p className="text-espresso-500 text-[11px] opacity-80 leading-relaxed font-light">
            * Houseboat pricing in Alleppey fluctuates based on seasonality, peak holidays, and specific boat availability.
            We do not display static price lists to avoid misleading our guests. All estimates above are starting rates.
            The final confirmed price for your specific dates will be shared directly via WhatsApp before you pay.
          </p>
        </div>
      </div>
    </section>
  );
};