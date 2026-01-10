"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PromoSectionProps {
    data: {
        slug: string;
        title: string;
        tagline?: string;
        description?: string;
        shortDescription?: string;
        images: { hero: string };
        priceDisplay?: string;
    } | null;
}

export const KeralaPromoSection = ({ data }: PromoSectionProps) => {
    if (!data) return null;

    return (
        <section className="w-full max-w-[96rem] mx-auto px-6 lg:px-12 py-12 lg:py-16 font-sans bg-white">
            <div className="relative w-full h-[350px] md:h-[420px] rounded-lg overflow-hidden group cursor-pointer bg-neutral-900">
                {/* Main Action Link - Absolute covering the card */}
                <Link
                    href={`/packages/${data.slug}`}
                    className="absolute inset-0 z-0"
                    aria-label={`View ${data.title}`}
                />

                {/* Background Image - Less Zoom on Hover, structured */}
                <Image
                    src={data.images.hero}
                    alt={data.title}
                    fill
                    className="object-cover opacity-90 transition-transform duration-[2s] ease-out group-hover:scale-102 pointer-events-none"
                />

                {/* Refined Overlay - Lower contrast, cleaner */}
                <div className="absolute inset-0 bg-black/30 transition-colors duration-700 group-hover:bg-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Content Container - Compact, Structure */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full max-w-4xl pointer-events-none"
                    >
                        {/* Eyebrow Label - Editorial Style */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-8 bg-white/60"></span>
                            <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em]">
                                {data.tagline || 'Signature Experience'}
                            </span>
                        </div>

                        {/* Flex Container for Headline & Action */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">

                            {/* Typography - Smaller, Stronger, Cleaner */}
                            <div className="max-w-xl">
                                <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 leading-tight tracking-tight">
                                    {data.title}
                                </h3>
                                <p className="text-white/70 text-sm font-light leading-relaxed max-w-md">
                                    {data.description}
                                </p>
                            </div>

                            {/* Info & CTA - Aligned, No Pills */}
                            <div className="flex items-center gap-8 md:gap-12 border-t border-white/20 pt-6 md:pt-0 md:border-t-0">
                                <div>
                                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1">Duration</p>
                                    <p className="text-white font-serif text-lg">{data.shortDescription || 'Flexible Duration'}</p>
                                </div>
                                <div className="hidden md:block w-px h-10 bg-white/20"></div>
                                <div>
                                    <p className="text-[9px] text-white/50 uppercase tracking-widest mb-1">Starting</p>
                                    <p className="text-white font-serif text-lg">{data.priceDisplay}</p>
                                </div>

                                <span className="ml-4 h-10 w-10 flex items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>

                        {/* Secondary Action for More Packages - Clickable, on top */}
                        <div className="mt-8 flex justify-end pointer-events-auto">
                            <Link href="/packages" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors z-10 relative">
                                <span>Explore All Packages</span>
                                <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
