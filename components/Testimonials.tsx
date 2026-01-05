"use client";

import React, { useEffect, useRef } from 'react';
import { Star, Play, Quote } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Testimonials: React.FC = () => {
  const containerRef = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoElement.play().catch(() => {
              // Autoplay might be blocked if not muted/interacted
            });
          } else {
            videoElement.pause();
            videoElement.load(); // Reset to thumbnail
          }
        });
      },
      { threshold: 0.6 } // Play when 60% visible
    );

    observer.observe(videoElement);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-white relative overflow-hidden border-t border-ivory-200">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <div className="gsap-fade-up">
          <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
            Guest Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-forest-950 leading-tight">
            Memories from<br />the Backwaters
          </h2>
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch gsap-stagger-container">

          {/* CARD 1: Text Focused (Left) */}
          <div className="gsap-stagger-item gsap-hover-card glass-premium p-10 rounded-[2rem] shadow-sm flex flex-col justify-between transition-all duration-500 group gsap-fade-right">
            <div>
              <div className="flex gap-1 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>
              <p className="text-forest-950 text-xl font-serif leading-relaxed italic mb-8 relative">
                <Quote className="w-10 h-10 text-stone-100 absolute -top-6 -left-4 -z-10" />
                "The silence of the backwaters changed our perspective entirely. It’s smooth, ultra-luxe, and the crew anticipates your needs before you even speak. Best part? It feels like a floating palace."
              </p>
            </div>

            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-stone-100">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-stone-100">
                <img src="/testimonial1.png" alt="Guest" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-forest-950 font-bold text-sm">Elena S.</h4>
                <p className="text-stone-500 text-xs uppercase tracking-wider font-medium">Tech Executive, London</p>
              </div>
            </div>
          </div>

          {/* CARD 2: Feature Image/Video (Center - Dominant) */}
          <div
            className="gsap-stagger-item gsap-hover-card md:-mt-8 md:mb-8 relative h-[500px] md:h-auto rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl shadow-stone-900/20 gsap-fade-left"
          >
            <div className="absolute inset-0 overflow-hidden">
              <video
                ref={videoRef}
                src="/collection/boat-video.mp4"
                poster="/collection/hero.jpg"
                loop
                muted
                playsInline
                className="w-full h-[120%] object-cover transition-transform duration-1000 group-hover:scale-105 gsap-parallax"
              />
            </div>
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Bottom Text - Tour Indicator */}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 shadow-lg">
                Houseboat Tour
              </span>
            </div>


          </div>

          {/* CARD 3: Hybrid Image + Text (Right) */}
          <div className="gsap-stagger-item gsap-hover-card glass-premium rounded-[2rem] overflow-hidden shadow-sm transition-all duration-500 flex flex-col">
            {/* Top Image Half */}
            <div className="h-56 overflow-hidden relative">
              <img
                src="/collection/chair.jpg"
                alt="Happy Guest"
                className="w-full h-[120%] object-cover transition-transform duration-700 group-hover:scale-105 gsap-parallax"
              />
            </div>

            {/* Bottom Text Half */}
            <div className="p-10 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-forest-950 text-lg font-serif leading-relaxed italic mb-8">
                  "I've stayed in 5-star hotels across Asia, but nothing compares to waking up on the water with a private chef preparing breakfast. Pure magic."
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-stone-100">
                  <img src="/testimonial2.png" alt="Guest" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-forest-950 font-bold text-sm">Arjun M.</h4>
                  <p className="text-stone-500 text-xs uppercase tracking-wider font-medium">Architect, Dubai</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};