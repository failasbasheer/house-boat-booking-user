"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, CalendarCheck, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: CalendarCheck,
      title: "1. Request Availability",
      description: "Select your preferred dates and boat type. No payment is required to send an inquiry."
    },
    {
      icon: MessageCircle,
      title: "2. Discuss on WhatsApp",
      description: "Connect instantly with our team. We'll share photos, confirm specific boat availability, and finalize the seasonal rate."
    },
    {
      icon: ShieldCheck,
      title: "3. Secure Reservation",
      description: "Once you are 100% happy with the boat and price, secure your booking with a deposit. Complete transparency."
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-ivory-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-forest-800 text-xs font-bold uppercase tracking-widest mb-2 block">
            Seamless & Secure
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-forest-950">How to Book Your Sanctuary</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gray-200 -z-10"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-white border border-ivory-200 flex items-center justify-center mb-6 group-hover:border-bronze-300 group-hover:bg-white transition-all shadow-sm group-hover:shadow-md z-10">
                <step.icon className="w-8 h-8 text-forest-800" />
              </div>
              <h3 className="text-xl font-serif text-forest-950 mb-3">{step.title}</h3>
              <p className="text-espresso-500 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="inline-block bg-forest-50 text-forest-900 px-4 py-2 rounded-full text-xs font-semibold border border-forest-100">
            ⚡ Typical response time: Under 10 minutes
          </p>
        </div>
      </div>
    </section>
  );
};