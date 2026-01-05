"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // PERFORMANCE
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';
import { FLEET_CATEGORIES } from '@/constants';
import { Category } from '@/types';

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

export const Fleet = ({ categories = [] }: { categories?: Category[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Using passed categories or fallback to empty (parent should provide data)


  return (
    <div ref={containerRef} id="fleet" className="bg-white min-h-screen text-[#1C1917] font-sans relative">

      {/* --- MAIN LISTING VIEW --- */}
      <FleetGrid tiers={categories} />

      {/* --- VIEW ALL BUTTON --- */}
      <div className="flex justify-center pb-12">
        <a
          href="/fleet"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-black transition-colors"
        >
          View Full Fleet
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT 1: THE FLEET GRID (The List View)
// ============================================================================
const FleetGrid = ({ tiers }: { tiers: any[] }) => {
  const gridRef = useRef(null);

  useGSAP(() => {
    if (tiers.length === 0) return;

    // Staggered Entry for Cards
    gsap.fromTo(".fleet-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        }
      }
    );
  }, { scope: gridRef, dependencies: [tiers] });

  return (
    <section ref={gridRef} className="py-12 lg:py-16 px-6 lg:px-12 max-w-[96rem] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 border-b border-[#E7E5E4] pb-10">
        <div className="max-w-3xl">
          <span className="text-[#A8A29E] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
            Our Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1C1917] leading-[0.9] tracking-tight">
            The Royal Fleet
          </h1>
        </div>
        <div className="hidden md:block max-w-sm text-right">
          <p className="text-[#57534E] font-light text-sm leading-relaxed">
            Select a houseboat to view full details, itinerary, and interiors.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-6 md:gap-x-4 md:gap-y-10">
        {tiers.map((tier, index) => (
          <Link
            key={tier.id}
            href={`/categories/${tier.slug}`}
            className={`fleet-card group cursor-pointer block ${index >= 4 ? 'hidden lg:block' : ''}`}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E7E5E4] mb-3">
              <Image
                src={tier.heroImage}
                alt={tier.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:flex">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
                  <ArrowRight className="w-5 h-5 text-[#1C1917]" />
                </div>
              </div>

              {/* Tag */}
              {tier.tagline && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-white/90 backdrop-blur-md text-[#1C1917] text-[8px] font-bold uppercase tracking-widest">
                    {tier.tagline}
                  </span>
                </div>
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <h3 className="text-sm md:text-base lg:text-lg font-serif text-[#1C1917] group-hover:text-[#78716C] transition-colors leading-tight truncate">
                {tier.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#A8A29E] font-medium">
                  <Users className="w-3 h-3" />
                  <span>{tier.guestCapacity}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#F5F5F4] px-1.5 py-0.5 rounded">
                  <Star className="w-2.5 h-2.5 fill-[#1C1917]" />
                  <span className="text-[9px] font-bold">{tier.stats.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};