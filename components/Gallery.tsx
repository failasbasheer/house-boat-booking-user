"use client";

import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Gallery: React.FC = () => {
  const containerRef = useScrollAnimation();

  const images = [
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/luxury-houseboat-exterior.webp', alt: 'Luxury Houseboat Exterior', className: 'md:col-span-2 md:row-span-2 h-[500px]' },
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/palm-lined-canals.webp', alt: 'Palm Lined Canals', className: 'md:col-span-1 md:row-span-1 h-[240px]' },
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/premium-interiors.webp', alt: 'Premium Interiors', className: 'md:col-span-1 md:row-span-1 h-[240px]' },
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/sunset.jpg', alt: 'Backwater Sunset', className: 'md:col-span-1 md:row-span-2 h-[500px]' },
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/serene-waters.webp', alt: 'Serene Waters', className: 'md:col-span-2 md:row-span-1 h-[240px]' },
    { src: 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/images/onboard-dining.webp', alt: 'Onboard Dining', className: 'md:col-span-1 md:row-span-1 h-[240px]' },
  ];

  return (
    <section ref={containerRef} id="gallery" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="gsap-fade-up max-w-2xl">
            <span className="text-bronze-600 uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
              Visual Journey
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-forest-950 leading-[1.1]">
              Life on the <br />
              <span className="italic text-bronze-700">Backwaters</span>
            </h2>
          </div>
          <div className="gsap-fade-up md:pb-2">
            <p className="text-espresso-600 max-w-sm text-sm leading-relaxed">
              Experience the timeless beauty of Alleppey through our lens. Every moment is a painting in motion.
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 gsap-stagger-container">
          {images.map((item, i) => (
            <div
              key={i}
              className={`gsap-stagger-item relative group rounded-3xl overflow-hidden shadow-lg ${item.className}`}
            >
              <div className="overflow-hidden w-full h-full relative">
                {/* Parallax Image */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-[115%] object-cover absolute top-0 left-0 transition-transform duration-[2s] ease-out group-hover:scale-105"
                  style={{ top: '-7.5%' }} // Center the overflow
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://houseboat-booking.s3.ap-south-1.amazonaws.com/packages/budget.jpg';
                  }}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold mb-2 block">
                  Moments
                </span>
                <p className="text-white text-xl font-serif tracking-wide">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};