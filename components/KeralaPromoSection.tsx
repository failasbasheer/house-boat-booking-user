"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const KeralaPromoSection = () => {
    return (
        <section className="w-full max-w-[96rem] mx-auto px-6 lg:px-12 py-12 lg:py-16 font-sans bg-white">
            <div className="relative w-full h-[350px] md:h-[420px] rounded-lg overflow-hidden group cursor-pointer bg-neutral-900">
                {/* Background Image - Less Zoom on Hover, structured */}
                <Image
                    src="/kerala-tourism.jpg"
                    alt="Kerala Backwaters"
                    fill
                    className="object-cover opacity-90 transition-transform duration-[2s] ease-out group-hover:scale-102"
                />

                {/* Refined Overlay - Lower contrast, cleaner */}
                <div className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                {/* Content Container - Compact, Structure */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-4xl"
                    >
                        {/* Eyebrow Label - Editorial Style */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-white/60"></span>
                            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Signature Experience
                            </span>
                        </div>

                        {/* Flex Container for Headline & Action */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">

                            {/* Typography - Smaller, Stronger, Cleaner */}
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight tracking-tight">
                                    The Kerala Holiday Package
                                </h3>
                                <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
                                    A curated 3-day voyage through the untapped backwaters.
                                </p>
                            </div>

                            {/* Info & CTA - Aligned, No Pills */}
                            <div className="flex items-center gap-8 md:gap-12 border-t border-white/20 pt-6 md:pt-0 md:border-t-0">
                                <div>
                                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1">Duration</p>
                                    <p className="text-white font-serif text-lg">3 Days / 4 Nights</p>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-white/20"></div>
                                <div>
                                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1">Starting</p>
                                    <p className="text-white font-serif text-lg">₹ 12,999</p>
                                </div>

                                <span className="ml-4 h-10 w-10 flex items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
