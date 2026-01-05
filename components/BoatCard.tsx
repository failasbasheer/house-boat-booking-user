"use client";

import { memo } from 'react';
import Image from 'next/image'; // PERFORMANCE: Use next/image
import { Boat } from '@/types';
import { ArrowRight, Star } from 'lucide-react';
import { getImageUrl } from '@/lib/utils'; // CLEANUP: Use shared utility

interface BoatCardProps {
    boat: Boat;
    onClick: (boat: Boat) => void;
    priority?: boolean;
}

const BoatCard = memo(({ boat, onClick, priority = false }: BoatCardProps) => {
    // Helper for display price (matches API logic)
    const displayPrice = (boat as any).displayPrice ||
        `₹${(boat.pricePerNight || 0).toLocaleString()}`;

    return (
        <div
            className="group bg-white rounded-xl overflow-hidden border border-ivory-200 hover:border-bronze-200 hover:shadow-soft transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            onClick={() => onClick(boat)}
        >
            <div className="relative aspect-[3/2] md:aspect-[4/5] overflow-hidden bg-ivory-100">
                <Image
                    src={getImageUrl(boat.images.hero, 'houseboats')}
                    alt={boat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={priority}
                />

                {boat.featured && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 px-1.5 py-0.5 md:px-2 md:py-1 bg-white/95 backdrop-blur-sm text-forest-900 text-[8px] md:text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        Featured
                    </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hidden md:block">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ArrowRight className="w-4 h-4 text-forest-900" />
                    </div>
                </div>
            </div>

            <div className="p-3 md:p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1.5 gap-1 md:gap-0">
                    <div className="min-w-0 pr-0 md:pr-2">
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-bronze-500 mb-0.5 truncate">{boat.categorySlug}</p>
                        <h3 className="text-base md:text-lg font-serif text-forest-900 group-hover:text-forest-700 transition-colors truncate leading-tight">{boat.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 bg-ivory-50 px-1.5 py-0.5 rounded w-fit md:bg-transparent md:px-0 md:py-0">
                        <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] md:text-sm font-bold text-forest-900">4.8</span>
                    </div>
                </div>

                <div className="flex items-baseline gap-1 mb-2 md:mb-3">
                    <span className="text-sm md:text-base font-medium text-forest-900">
                        {displayPrice}
                    </span>
                    <span className="text-[8px] md:text-[10px] text-espresso-500">/ night</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 gap-y-1.5 pt-2 md:pt-3 border-t border-ivory-100">
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-espresso-500">
                        <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
                        {boat.bedrooms} Beds
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-espresso-500">
                        <span className="w-1 h-1 rounded-full bg-bronze-400 shrink-0" />
                        {boat.maxGuests || (boat as any).capacity_adults || 0} Guests
                    </div>
                </div>
            </div>
        </div>
    );
});

BoatCard.displayName = 'BoatCard';

export default BoatCard;
