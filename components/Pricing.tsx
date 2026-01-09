"use client";

import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PRICING_PACKAGES, WHATSAPP_NUMBER } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import QuickEnquiryModal from './modals/QuickEnquiryModal';

export const PricingSplitFocus: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const containerRef = useScrollAnimation();

  const handleEnquiry = (pkgTitle: string) => {
    setSelectedPackage(pkgTitle);
    setIsModalOpen(true);
  };

  return (
    <section ref={containerRef} id="pricing" className="bg-white min-h-screen flex flex-col lg:flex-row">
      <QuickEnquiryModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        customMessage={`Hi, I'm interested in the ${selectedPackage} package.`}
        source={`Pricing - ${selectedPackage}`}
      />

      <div className="w-full lg:w-[45%] p-8 lg:p-20 flex flex-col justify-center bg-white border-r border-stone-200 z-10 gsap-fade-right">
        <div className="mb-12">
          <span className="text-amber-700 font-bold tracking-widest text-xs uppercase mb-4 block">Selection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Choose Your <br />Experience</h2>
        </div>

        <div className="space-y-4 gsap-stagger-container">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.title}
              onMouseEnter={() => setActiveIdx(idx)}
              className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 border gsap-stagger-item ${activeIdx === idx
                ? 'bg-stone-900 text-white border-stone-900 shadow-xl'
                : 'bg-white text-stone-500 border-stone-100 hover:border-stone-300'
                }`}
            >
              <div className="flex justify-end items-start mb-2 min-h-[20px]">
                {activeIdx === idx && <ArrowUpRight className="w-5 h-5 text-white" />}
              </div>

              <h3 className={`text-2xl font-serif mb-2 ${activeIdx === idx ? 'text-white' : 'text-stone-900'}`}>
                {pkg.title}
              </h3>

              <div className={`overflow-hidden transition-all duration-300 ${activeIdx === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm font-light leading-relaxed opacity-80 mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <button
                    onClick={() => handleEnquiry(pkg.title)}
                    className="text-xs font-bold uppercase tracking-widest hover:text-amber-300 transition-colors"
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[55%] relative h-[50vh] lg:h-auto overflow-hidden gsap-fade-left">
        {PRICING_PACKAGES.map((pkg, idx) => (
          <div
            key={pkg.title}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${activeIdx === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            style={{
              backgroundImage: `url(${pkg.title.toLowerCase().includes('day') ? '/packages/budget.jpg' :
                pkg.title.toLowerCase().includes('luxury') ? '/packages/luxury.webp' :
                  '/packages/premium.webp'
                })`
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

    </section>
  );
};