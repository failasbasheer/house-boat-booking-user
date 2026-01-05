"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: "01",
      icon: CalendarCheck,
      title: "Request Availability",
      desc: "Select dates & boat type. No payment is required to start."
    },
    {
      id: "02",
      icon: WhatsAppIcon,
      title: "Discuss on WhatsApp",
      desc: "We share real-time photos, seasonal rates & availability."
    },
    {
      id: "03",
      icon: ShieldCheck,
      title: "Secure Reservation",
      desc: "Once satisfied, book with a deposit. Instant confirmation."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="max-w-xl">
            <span className="text-bronze-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Seamless Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-forest-950 leading-tight">
              Book your sanctuary <br />
              <span className="italic text-bronze-700">in three simple steps.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-forest-900/60 bg-ivory-50 px-4 py-2 rounded-full border border-ivory-200">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            Typical response: Under 10 mins
          </div>
        </div>

        {/* The Grid System - Compact & Premium */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full border-t border-b border-ivory-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ivory-200">
            {steps.map((step, index) => (
              <motion.div
                variants={itemVariants}
                key={index}
                className="group relative p-8 lg:p-10 hover:bg-ivory-50/50 transition-colors duration-500 cursor-default"
              >
                {/* Step Number (Small & Elegant) */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold text-bronze-300 font-serif tracking-widest">
                    {step.id}
                  </span>
                  <step.icon className="w-6 h-6 text-forest-900/40 group-hover:text-bronze-600 transition-colors duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif text-forest-950 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-espresso-600/70 font-light leading-relaxed max-w-xs">
                  {step.desc}
                </p>

                {/* Hover Progress Bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-bronze-500 group-hover:w-full transition-all duration-700 ease-out" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Compact CTA */}
        <div className="mt-10 text-center md:text-left">
          <button className="text-forest-900 text-sm font-semibold border-b border-bronze-300 pb-0.5 hover:border-forest-900 hover:text-forest-950 transition-all inline-flex items-center gap-2 group">
            <WhatsAppIcon className="w-5 h-5 fill-white text-forest-900 group-hover:text-forest-950" />
            Start a WhatsApp Enquiry
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};