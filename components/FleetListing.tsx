"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Star, Users } from 'lucide-react';
import { Category } from '@/types';

export default function FleetListing({ categories }: { categories: Category[] }) {

    return (
        <main className="bg-ivory-50 min-h-screen selection:bg-bronze-200 selection:text-forest-950">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-900 to-forest-950">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                <div className="relative z-10 text-center px-4 md:px-6 mt-8 md:mt-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-6xl font-serif text-bronze-400 mb-2 md:mb-4"
                    >
                        Our Collections
                    </motion.h1>
                    <p className="text-white/80 text-sm md:text-lg font-light max-w-xl mx-auto">
                        Choose your perfect backwater experience from our curated categories.
                    </p>
                </div>
            </section>

            {/* --- GRID SECTION --- */}
            <section className="py-8 md:py-20 px-4 md:px-12 max-w-[1920px] mx-auto min-h-[600px]">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                    {categories.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function CategoryCard({ category, index }: { category: Category, index: number }) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/categories/${category.slug}`} className="block h-full">
                {/* Card Image - 3:2 on mobile for compact view, 4:5 on desktop */}
                <div className="relative aspect-[3/2] md:aspect-[4/5] overflow-hidden bg-gray-200 mb-3 md:mb-6 rounded-xl shadow-sm md:shadow-lg">
                    <Image
                        src={imgError ? `/packages/${category.slug}.webp` : category.heroImage}
                        alt={category.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={() => setImgError(true)}
                    />

                    {/* Tag */}
                    <div className="absolute top-3 left-3 md:top-6 md:left-6">
                        <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/95 backdrop-blur-md text-[#1C1917] text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm rounded-sm">
                            {category.tagline}
                        </span>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                    {/* View Details Indicator */}
                    <div className="hidden md:block absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <ArrowRight className="w-6 h-6 text-[#1C1917]" />
                        </div>
                    </div>
                </div>

                {/* Card Details */}
                <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="text-2xl md:text-3xl font-serif text-[#1C1917] group-hover:text-bronze-600 transition-colors leading-tight">
                            {category.title}
                        </h3>
                        <div className="flex items-center gap-1 md:gap-2 bg-[#F5F5F4] px-2 py-1 md:px-3 md:py-1.5 rounded-full flex-shrink-0">
                            <Star className="w-3 h-3 md:w-4 md:h-4 fill-[#1C1917] text-[#1C1917]" />
                            <span className="text-xs md:text-sm font-bold text-[#1C1917]">{category.stats.rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 font-light">
                        {category.shortDescription}
                    </p>
                    <div className="pt-2 flex items-center gap-4 border-t border-gray-100 md:border-none mt-2 md:mt-0">
                        <div className="flex items-center gap-1.5 text-xs md:text-xs text-[#A8A29E] font-medium uppercase tracking-wider">
                            <Users className="w-3.5 h-3.5" />
                            <span>{category.guestCapacity}</span>
                        </div>
                        {/* Duration removed */}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
