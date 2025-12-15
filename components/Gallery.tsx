"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const Gallery: React.FC = () => {
  const images = [
    { src: '/images/luxury-houseboat-exterior.webp', alt: 'Luxury Houseboat Exterior', span: 'md:col-span-2 md:row-span-2' },
    { src: '/images/palm-lined-canals.webp', alt: 'Palm Lined Canals', span: 'md:col-span-1 md:row-span-1' },
    { src: '/images/premium-interiors.webp', alt: 'Premium Interiors', span: 'md:col-span-1 md:row-span-1' },
    { src: '/images/sunset.jpg', alt: 'Backwater Sunset', span: 'md:col-span-1 md:row-span-2' },
    { src: '/images/serene-waters.jpg', alt: 'Serene Waters', span: 'md:col-span-2 md:row-span-1' },
    { src: '/images/onboard-dining.jpg', alt: 'Onboard Dining', span: 'md:col-span-1 md:row-span-1' },
  ];

  return (
    <section id="gallery" className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
            Visual Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-forest-950">Life on the Water</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-[250px]">
          {images.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <p className="text-white text-lg font-serif tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};