"use client";

import { Boat } from '@/types';
import { X, Users, Bed, Anchor, ArrowRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

import QuickEnquiryModal from './modals/QuickEnquiryModal';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BoatDetailsModalProps {
    boat: Boat | null;
    onClose: () => void;
}

import { useSettings } from '@/context/SettingsContext';

export default function BoatDetailsModal({ boat, onClose }: BoatDetailsModalProps) {
    const { whatsappNumber } = useSettings();
    const [activeImage, setActiveImage] = useState(0);
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

    useEffect(() => {
        if (boat) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Lock html as well

            return () => {
                document.body.style.overflow = originalStyle;
                document.documentElement.style.overflow = '';
            };
        }
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

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Hi, I'm interested in the ${boat.name} (${boat.categorySlug} category). Is it available?`
    )}`;

    const enquiryMessage = `Hi, I'm interested in booking the ${boat.name} (${boat.categorySlug}).\n\nBedrooms: ${boat.bedrooms}`;


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
                        className="fixed inset-0 bg-forest-950/80 z-[100] backdrop-blur-md cursor-pointer"
                    />

                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-ivory-50 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row relative pointer-events-auto border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 bg-white/20 hover:bg-white/40 text-white md:text-forest-900 md:bg-forest-900/5 md:hover:bg-forest-900/10 rounded-full transition-all backdrop-blur-md duration-300 group"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            </button>

                            {/* Left Column: Image Gallery */}
                            <div className="md:w-[55%] relative bg-neutral-900 h-[40vh] md:h-auto overflow-hidden group">
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
                                        !orderedKeys.includes(k) && k !== 'gallery' && typeof imgObj[k] === 'string' && imgObj[k].length > 0
                                    );

                                    const allRawImages = [...standardImages, ...galleryArray, ...otherKeys.map(k => imgObj[k])];
                                    const uniqueImages = Array.from(new Set(allRawImages)).map(img => getImageUrl(img, 'houseboats'));

                                    if (uniqueImages.length === 0) return (
                                        <div className="w-full h-full flex items-center justify-center text-white/50 font-serif">Image not available</div>
                                    );

                                    const displayImage = uniqueImages[activeImage] || uniqueImages[0];

                                    return (
                                        <>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeImage}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="relative w-full h-full"
                                                >
                                                    <Image
                                                        src={displayImage}
                                                        alt={boat.name}
                                                        fill
                                                        priority
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Thumbnails */}
                                            {uniqueImages.length > 1 && (
                                                <div className="absolute bottom-6 left-6 right-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide z-10">
                                                    {uniqueImages.map((img, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setActiveImage(idx)}
                                                            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 shadow-lg ${activeImage === idx
                                                                ? 'border-amber-400 scale-105 ring-2 ring-black/20'
                                                                : 'border-white/30 opacity-70 hover:opacity-100 hover:border-white/60'
                                                                }`}
                                                        >
                                                            <Image
                                                                src={img}
                                                                alt={`Thumbnail ${idx + 1}`}
                                                                fill
                                                                sizes="80px"
                                                                className="object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Right Column: Details */}
                            <div className="md:w-[45%] flex flex-col bg-ivory-50 h-[60vh] md:h-auto relative">
                                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">

                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-bronze-50 text-bronze-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-bronze-200/50">
                                                {boat.categorySlug} Collection
                                            </span>
                                            {boat.featured && (
                                                <span className="px-3 py-1 bg-forest-900 text-ivory-50 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
                                                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" /> Featured
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-3xl md:text-5xl font-serif text-forest-950 mb-2 leading-tight">
                                            {boat.name}
                                        </h2>

                                        {boat.tagline && (
                                            <p className="text-bronze-600 font-serif italic text-lg opacity-90">
                                                "{boat.tagline}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="prose prose-sm prose-stone mb-8">
                                        <p className="text-espresso-800 leading-relaxed text-base font-light">
                                            Experience the serenity of Alleppey backwaters in this premium {boat.categorySlug} houseboat.
                                            Designed for comfort and luxury, featuring <span className="font-semibold text-forest-900">{boat.bedrooms} bedrooms</span>
                                            and world-class amenities alongside authentic Kerala hospitality.
                                        </p>
                                    </div>

                                    {/* Key Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="bg-white p-4 rounded-xl border border-ivory-200 shadow-sm flex items-start gap-3 hover:border-bronze-200 transition-colors">
                                            <div className="p-2 bg-ivory-50 rounded-lg text-bronze-600">
                                                <Bed className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-espresso-400 font-bold uppercase tracking-wider mb-0.5">Bedroom</p>
                                                <p className="font-serif text-forest-900 text-lg">{boat.bedrooms} Rooms</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-ivory-200 shadow-sm flex items-start gap-3 hover:border-bronze-200 transition-colors">
                                            <div className="p-2 bg-ivory-50 rounded-lg text-bronze-600">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-espresso-400 font-bold uppercase tracking-wider mb-0.5">Capacity</p>
                                                <p className="font-serif text-forest-900 text-lg">Up to {boat.maxGuests || (boat as any).capacity_adults || 2}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-ivory-200 shadow-sm flex items-start gap-3 hover:border-bronze-200 transition-colors">
                                            <div className="p-2 bg-ivory-50 rounded-lg text-bronze-600">
                                                <Anchor className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-espresso-400 font-bold uppercase tracking-wider mb-0.5">Crew</p>
                                                <p className="font-serif text-forest-900 text-lg">{boat.crew ? `${boat.crew.size} Staff` : 'Full Crew'}</p>
                                            </div>
                                        </div>
                                        {boat.cruise_hours && (
                                            <div className="bg-white p-4 rounded-xl border border-ivory-200 shadow-sm flex items-start gap-3 hover:border-bronze-200 transition-colors">
                                                <div className="p-2 bg-ivory-50 rounded-lg text-bronze-600">
                                                    <Clock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-espresso-400 font-bold uppercase tracking-wider mb-0.5">Cruise</p>
                                                    <p className="font-serif text-forest-900 text-lg">{boat.cruise_hours} Hrs</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Features & Amenities */}
                                    <div className="space-y-6">
                                        {(boat.features && boat.features.length > 0) && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-bronze-500 uppercase tracking-widest mb-4">
                                                    <span className="w-8 h-px bg-bronze-200"></span>
                                                    Premium Highlights
                                                    <span className="flex-1 h-px bg-bronze-200"></span>
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {boat.features.map((feature: any, idx) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-forest-900/5 text-forest-900 text-xs font-medium rounded-lg border border-forest-900/10">
                                                            {typeof feature === 'object' ? feature.name : feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {(boat.amenities && boat.amenities.length > 0) && (
                                            <div>
                                                <h4 className="flex items-center gap-2 text-xs font-bold text-bronze-500 uppercase tracking-widest mb-4">
                                                    <span className="w-8 h-px bg-bronze-200"></span>
                                                    Amenities
                                                    <span className="flex-1 h-px bg-bronze-200"></span>
                                                </h4>
                                                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                                                    {boat.amenities.map((amenity: any, idx) => (
                                                        <div key={idx} className="flex items-center gap-2.5 text-espresso-700 text-sm">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-bronze-400 shrink-0" />
                                                            <span className="truncate">{typeof amenity === 'object' ? amenity.name : amenity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom Padding for scroll */}
                                    <div className="h-24" />
                                </div>

                                {/* Sticky Footer Action */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-ivory-50 via-ivory-50 to-transparent z-10">
                                    <button
                                        onClick={handleEnquiry}
                                        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <WhatsAppIcon className="w-5 h-5 fill-white" />
                                        <span>Check Availability</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence >
    );
}
