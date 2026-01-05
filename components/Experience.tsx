"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Anchor, ArrowRight, ShieldCheck, ChefHat, User } from 'lucide-react';
import Link from 'next/link';

// --- Assets ---
// Modern geometric pattern for background (very subtle)
const ModernPattern = () => (
  <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.02] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" />
      <path d="M50 0V100M0 50H100" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  </div>
);

// --- Feature Row Component ---
const PremiumFeature = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="group flex gap-5 items-start p-4 rounded-2xl hover:bg-ivory-50/50 transition-colors duration-500 border border-transparent hover:border-ivory-100">
    <div className="w-12 h-12 shrink-0 rounded-full bg-bronze-50 flex items-center justify-center group-hover:bg-forest-950 transition-colors duration-500">
      <Icon className="w-5 h-5 text-bronze-700 group-hover:text-white transition-colors duration-500" />
    </div>
    <div>
      <h4 className="text-lg font-serif font-medium text-forest-950 mb-1 group-hover:translate-x-1 transition-transform duration-300">{title}</h4>
      <p className="text-sm text-espresso-600/70 leading-relaxed font-light">{desc}</p>
    </div>
  </div>
);

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-16 lg:py-24 bg-white overflow-hidden">
      <ModernPattern />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* LEFT COLUMN: Modern Masonry Grid */}
        <div className="relative perspective-1000">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-12 gap-5"
          >
            {/* Main Image - Interior */}
            <div className="col-span-7 row-span-2 relative rounded-3xl overflow-hidden h-[520px] shadow-2xl shadow-forest-900/10 group">
              <img
                src="/collection/interior.jpg"
                alt="Luxury Houseboat Interior"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

              {/* Image Label */}
              <div className="absolute bottom-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <p className="text-white text-xs font-medium tracking-wide">The Presidential Suite</p>
              </div>
            </div>

            {/* Top Right - Culture */}
            <div className="col-span-5 relative rounded-3xl overflow-hidden h-[250px] shadow-lg group mt-12">
              <img
                src="/collection/IMG-20250617-WA0013 (3).jpg" // Kathakali / Culture
                alt="Kathakali Art"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>

            {/* Bottom Right - Cuisine */}
            <div className="col-span-5 relative rounded-3xl overflow-hidden h-[250px] shadow-lg group">
              <img
                src="/collection/interior2.jpg" // Cuisine / Dining
                alt="Kerala Sadhya"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Premium Glass Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -bottom-8 -left-4 md:-left-8 bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 w-[260px]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-bronze-600 font-bold block mb-1">Guest Rating</span>
                <span className="text-4xl font-serif font-bold text-forest-950">4.98</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-forest-950 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-bronze-200/50 to-transparent mb-4" />

            <p className="text-xs text-espresso-600/80 leading-relaxed font-medium">
              "Impeccable service. The crew felt like family, but with the professionalism of a 5-star hotel."
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Minimalist Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pl-2 lg:pl-16 flex flex-col justify-center h-full pt-12 lg:pt-0"
        >
          {/* Badge */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-bronze-300" />
            <span className="text-bronze-700 text-[11px] font-bold uppercase tracking-[0.25em]">
              The Philosophy
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl lg:text-6xl font-serif text-forest-950 mb-8 leading-[1.05] tracking-tight">
            Heritage meets <br />
            <span className="italic font-light text-bronze-600 relative">
              unspoken luxury.
              {/* Subtle underline SVG */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-bronze-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>

          <p className="text-lg text-espresso-800/70 font-light leading-relaxed mb-12 max-w-lg">
            We don't just rent boats; we curate a silence.
            The chaos of the world fades, replaced by the rhythm of the backwaters and the warmth of a team dedicated solely to you.
          </p>

          {/* Features - Clean List */}
          <div className="space-y-4 mb-12">
            <PremiumFeature
              icon={User}
              title="Verified Private Crew"
              desc="Background-checked Captain, Chef, and Associate dedicated to your privacy."
            />
            <PremiumFeature
              icon={ChefHat}
              title="Culinary Mastery"
              desc="Fresh Pearl Spot fish and organic produce, cooked live on board to your taste."
            />
            <PremiumFeature
              icon={ShieldCheck}
              title="100% Safety Record"
              desc="International standard life-saving equipment and rigorous pre-trip audits."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-forest-950 text-white rounded-full font-medium tracking-wide shadow-xl hover:shadow-2xl hover:bg-forest-900 transition-all flex items-center gap-2"
            >
              <Link href="/fleet">Explore the Fleet</Link>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative z-10">
                    <img src={`https://randomuser.me/api/portraits/thumb/men/${i + 20}.jpg`} className="w-full h-full object-cover" />
                  </div >
                ))}
              </div >
              <div className="text-xs font-semibold text-forest-900 group-hover:text-bronze-600 transition-colors">
                <span className="block">Join 500+</span>
                <span className="text-espresso-500 font-normal">Happy Travelers</span>
              </div>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};