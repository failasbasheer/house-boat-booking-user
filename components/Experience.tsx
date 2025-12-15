"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sunset, ShieldCheck, UserCheck, Anchor } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex flex-col gap-3 group">
    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-ivory-200 group-hover:border-bronze-400 transition-colors duration-300">
      <Icon className="w-5 h-5 text-forest-800" />
    </div>
    <h3 className="text-xl font-serif text-forest-950">{title}</h3>
    <p className="text-espresso-800/80 text-sm leading-relaxed font-normal">{text}</p>
  </div>
);

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-10 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
              The Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-forest-950 mb-8 leading-tight">
              Safety, silence, and<br />
              <span className="text-forest-700 italic">impeccable service.</span>
            </h2>
            <p className="text-espresso-900 text-lg mb-6 font-light leading-relaxed">
              We understand the hesitation of booking internationally. That’s why we operate differently.
              Our fleet is strictly vetted for safety, hygiene, and crew professionalism.
            </p>
            <p className="text-espresso-900/80 text-lg mb-12 font-light border-l-2 border-bronze-500/30 pl-6 leading-relaxed">
              You are not just renting a boat; you are hiring a dedicated team consisting of a captain,
              a chef, and a service associate who ensure your privacy and comfort 24/7.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <FeatureItem
                icon={ShieldCheck}
                title="Verified Safety"
                text="Every boat undergoes rigorous annual safety checks and carries life-saving equipment for all guests."
              />
              <FeatureItem
                icon={UserCheck}
                title="Professional Crew"
                text="English-speaking, background-verified staff trained in hospitality and first-response."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-t-[12rem] rounded-b-2xl overflow-hidden shadow-soft border border-ivory-200 relative group">
              <img
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80"
                alt="Houseboat Safety and Luxury"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              {/* Overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-center gap-4 text-white/95">
                  <Anchor className="w-5 h-5 text-bronze-200" />
                  <span className="font-serif italic text-lg leading-snug">"Felt safe and pampered from the moment we stepped onboard."</span>
                </div>
              </div>
            </div>

            {/* Decorative Offset Border */}
            <div className="absolute -inset-4 border border-bronze-500/10 rounded-t-[13rem] rounded-b-3xl -z-10 hidden md:block"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};