'use client';

import { Category } from '@/types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function CategoryHero({ category }: { category: Category }) {
    return (
        <div className="flex flex-col w-full">
            {/* Cinematic Background Layer */}
            <div className="relative h-[40vh] md:h-[55vh] min-h-[350px] md:min-h-[400px] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }} // Fast smooth entrance
                        className="w-full h-full"
                    >
                        <img
                            src={category.heroImage}
                            alt={category.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = `/packages/${category.slug}.webp`;
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/30 via-transparent to-forest-950/90 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent opacity-80" />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                </div>

                {/* Editorial Content Layer */}
                <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center mt-6 md:mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="max-w-6xl mx-auto text-center space-y-2 md:space-y-4"
                    >
                        {/* Top Label - The "Magazine Tag" */}
                        <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className="h-6 md:h-8 w-px bg-white/30" />
                            <span className="font-display text-[10px] md:text-xs tracking-[0.3em] text-white/80 uppercase">
                                The {category.slug.replace('-', ' ')} Collection
                            </span>
                        </div>

                        {/* Compact Editorial Title */}
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tight mix-blend-overlay opacity-90">
                            {category.title}
                        </h1>

                    </motion.div>
                </div>
            </div>

            {/* Stats Ribbon - Below Image */}
            <div className="bg-forest-950 border-t border-white/5 border-b border-forest-900">
                <div className="container mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-wrap justify-center gap-6 md:gap-24 text-ivory-50">
                    <div className="flex flex-col items-center gap-1 md:gap-2 group">
                        <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-bronze-500 group-hover:text-bronze-400 transition-colors">Fleet Size</span>
                        <span className="text-xl md:text-3xl font-serif text-white">{category.stats.totalBoats} Houseboats</span>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-bronze-500/20 to-transparent hidden md:block" />
                    <div className="flex flex-col items-center gap-1 md:gap-2 group">
                        <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-bronze-500 group-hover:text-bronze-400 transition-colors">Experience</span>
                        <span className="text-xl md:text-3xl font-serif text-white">All-Inclusive</span>
                    </div>
                    {/* Starting Price Removed */}
                </div>
            </div>
        </div>
    );
}
