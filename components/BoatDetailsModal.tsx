"use client";

import { Boat } from '@/types';
import { X, Users, Bed, Anchor, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WHATSAPP_NUMBER } from '@/constants';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

interface BoatDetailsModalProps {
    boat: Boat | null;
    onClose: () => void;
}
import QuickEnquiryModal from './modals/QuickEnquiryModal';
import { WhatsAppIcon } from './WhatsAppIcon';
export default function BoatDetailsModal({ boat, onClose }: BoatDetailsModalProps) {
    const [activeImage, setActiveImage] = useState(0);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    useEffect(() => {
        if (boat) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [boat]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!boat) return null;

    const handleEnquiry = () => {
        setIsEnquiryModalOpen(true);
    };

    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi, I'm interested in the ${boat.name} (${boat.categorySlug} category). Is it available?`
    )}`;

    const enquiryMessage = `Hi, I'm interested in booking the ${boat.name} (${boat.categorySlug}).\n\nPrice: ${(boat as any).displayPrice || `₹${(boat.pricePerNight || 0).toLocaleString()}`}\nBedrooms: ${boat.bedrooms}`;


    return (
        <AnimatePresence>
            {boat && (
                <>
                    <QuickEnquiryModal
                        isOpen={isEnquiryModalOpen}
                        closeModal={() => setIsEnquiryModalOpen(false)}
                        customMessage={enquiryMessage}
                        source={`Boat Details - ${boat.name}`}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 z-[100] backdrop-blur-sm cursor-pointer"
                    />

                    <div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-ivory-50 w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row relative pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all backdrop-blur-md hover:rotate-90 duration-300"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="md:w-1/2 relative bg-neutral-900 h-[35vh] md:h-auto overflow-hidden group">
                                {(() => {
                                    const imgObj = (boat.images || {}) as any;

                                    const orderedKeys = ['hero', 'exterior', 'interior', 'bedroom', 'dining', 'bathroom', 'extra1', 'extra2', 'extra3'];

                                    const standardImages = orderedKeys
                                        .map(key => imgObj[key])
                                        .filter(img => typeof img === 'string' && img.length > 0);

                                    const galleryArray = Array.isArray(imgObj.gallery)
                                        ? imgObj.gallery.filter((img: any) => typeof img === 'string' && img.length > 0)
                                        : [];

                                    const otherKeys = Object.keys(imgObj).filter(k =>
                                        !orderedKeys.includes(k) &&
                                        k !== 'gallery' &&
                                        typeof imgObj[k] === 'string' &&
                                        imgObj[k].length > 0
                                    );
                                    const otherImages = otherKeys.map(k => imgObj[k]);

                                    const allRawImages = [...standardImages, ...galleryArray, ...otherImages];
                                    const uniqueImages = Array.from(new Set(allRawImages));

                                    const galleryImages = uniqueImages.map(img => getImageUrl(img, 'houseboats'));

                                    if (galleryImages.length === 0) return (
                                        <div className="w-full h-full flex items-center justify-center text-white/50">No images available</div>
                                    );

                                    const displayImage = galleryImages[activeImage] || galleryImages[0];

                                    return (
                                        <>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeImage}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="relative w-full h-full"
                                                >
                                                    <Image
                                                        src={displayImage}
                                                        alt={boat.name}
                                                        fill
                                                        priority
                                                        className="object-cover"
                                                    />
                                                </motion.div>
                                            </AnimatePresence>

                                            {galleryImages.length > 1 && (
                                                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade">
                                                    {galleryImages.map((img, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setActiveImage(idx)}
                                                            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 shadow-lg ${activeImage === idx
                                                                ? 'border-amber-400 scale-110 ring-2 ring-black/50'
                                                                : 'border-white/20 hover:border-white/50 opacity-80 hover:opacity-100'
                                                                }`}
                                                        >
                                                            <div className="relative w-full h-full">
                                                                <Image
                                                                    src={img}
                                                                    alt={`${boat.name} thumbnail ${idx + 1}`}
                                                                    fill
                                                                    sizes="64px"
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            <div className="md:w-1/2 flex flex-col bg-ivory-50 h-[65vh] md:h-auto">
                                <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                                    <div className="mb-5">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex items-center gap-2 mb-2"
                                        >
                                            <span className="px-2.5 py-0.5 bg-forest-900/10 text-forest-900 text-[10px] font-bold uppercase tracking-widest rounded-full border border-forest-900/10">
                                                {boat.categorySlug || 'Premium'}
                                            </span>
                                            {boat.featured && (
                                                <span className="px-2.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1 shadow-sm">
                                                    <span className="w-1 h-1 bg-white rounded-full animate-pulse" /> Featured
                                                </span>
                                            )}
                                        </motion.div>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-2xl md:text-4xl font-serif text-forest-950 mb-1 leading-tight"
                                        >
                                            {boat.name}
                                        </motion.h2>
                                        {boat.tagline && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-sm text-bronze-600 font-medium italic mb-3"
                                            >
                                                {boat.tagline}
                                            </motion.p>
                                        )}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex items-baseline gap-2"
                                        >
                                            <span className="text-3xl font-light text-forest-900">
                                                {(boat as any).displayPrice || `₹${(boat.pricePerNight || 0).toLocaleString()}`}
                                            </span>
                                            <span className="text-xs text-espresso-500 font-medium tracking-wide">/ NIGHT</span>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="space-y-6"
                                    >
                                        <p className="text-sm md:text-base text-espresso-600 leading-relaxed font-normal">
                                            Experience the backwaters in style with this {boat.categorySlug} houseboat.
                                            Featuring {boat.bedrooms} bedrooms, modern amenities, and premium service alongside traditional Kerala hospitality.
                                        </p>

                                        <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-ivory-200 shadow-sm">
                                            <div className="flex items-center gap-3 text-forest-900">
                                                <div className="w-8 h-8 rounded-full bg-bronze-50 flex items-center justify-center shrink-0">
                                                    <Bed className="w-4 h-4 text-bronze-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[9px] text-espresso-400 font-bold uppercase tracking-wider">Configuration</p>
                                                    <p className="text-xs md:text-sm font-semibold truncate">{boat.bedrooms} Bedrooms</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-forest-900">
                                                <div className="w-8 h-8 rounded-full bg-bronze-50 flex items-center justify-center shrink-0">
                                                    <Users className="w-4 h-4 text-bronze-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[9px] text-espresso-400 font-bold uppercase tracking-wider">Capacity</p>
                                                    <p className="text-xs md:text-sm font-semibold truncate">Max {boat.maxGuests || (boat as any).capacity_adults || 2} Guests</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 text-forest-900">
                                                <div className="w-8 h-8 rounded-full bg-bronze-50 flex items-center justify-center shrink-0">
                                                    <Anchor className="w-4 h-4 text-bronze-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-[9px] text-espresso-400 font-bold uppercase tracking-wider">Crew</p>
                                                    <p className="text-xs md:text-sm font-semibold truncate">
                                                        {boat.crew ? `${boat.crew.size} Members` : 'Full Crew'}
                                                    </p>
                                                </div>
                                            </div>
                                            {boat.cruise_hours && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-bronze-50 flex items-center justify-center shrink-0">
                                                        <Clock className="w-4 h-4 text-bronze-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[9px] text-espresso-400 font-bold uppercase tracking-wider">Cruise</p>
                                                        <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">{boat.cruise_hours} Hours</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {(boat.features && boat.features.length > 0) && (
                                            <div>
                                                <h4 className="text-[10px] font-bold text-espresso-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <div className="h-px bg-ivory-200 flex-1" />
                                                    Premium Highlights
                                                    <div className="h-px bg-ivory-200 flex-1" />
                                                </h4>
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    {boat.features.map((feature, idx) => (
                                                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-amber-50 to-ivory-50 text-amber-900 text-[10px] font-bold uppercase tracking-wide rounded-lg border border-amber-100 shadow-sm">
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {(boat.amenities && boat.amenities.length > 0) && (
                                            <div>
                                                <h4 className="text-[10px] font-bold text-espresso-400 uppercase tracking-widest mb-3 text-center">Amenities</h4>
                                                <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-ivory-100/30 p-4 rounded-xl border border-ivory-200/50">
                                                    {boat.amenities.map((amenity, idx) => (
                                                        <div key={idx} className="flex items-center gap-2 text-forest-900/90 text-xs font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-bronze-400 flex-shrink-0" />
                                                            <span className="truncate">{amenity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>

                                <button
                                    onClick={handleEnquiry}
                                    className="w-full px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-lg font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 group"
                                >
                                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                                    Check Availability
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
