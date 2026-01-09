'use client';

import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '../WhatsAppIcon';
import QuickEnquiryModal from './QuickEnquiryModal';

interface PromotionData {
    _id: string;
    title: string;
    description: string;
    image: string;
    code: string;
    isActive: boolean;
}

export default function PromoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
    const [activePromo, setActivePromo] = useState<PromotionData | null>(null);

    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const res = await fetch('/api/promotions');
                const data = await res.json();

                if (data.success && data.data) {
                    const promo = data.data;
                    const hasSeenPromo = sessionStorage.getItem(`hasSeenPromo_${promo._id}`);

                    if (!hasSeenPromo) {
                        setActivePromo(promo);
                        setIsOpen(true);
                        sessionStorage.setItem(`hasSeenPromo_${promo._id}`, 'true');
                    }
                }
            } catch (error) {
                console.error('Failed to fetch promotion:', error);
            }
        };

        fetchPromo();
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleClaim = () => {
        setIsOpen(false);
        setIsEnquiryOpen(true);
    };

    if (!activePromo) return null;

    return (
        <>
            {/* The Main Promo Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 px-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content - Glassmorphism */}
                    <div className="relative w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">

                        {/* Image Section */}
                        {activePromo.image && (
                            <div className="relative h-48 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />
                                <img
                                    src={activePromo.image}
                                    alt={activePromo.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 z-20 bg-bronze-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                    Limited Time Offer
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 z-20 p-1.5 bg-black/20 hover:bg-black/50 text-white/70 hover:text-white rounded-full backdrop-blur-md transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="p-6 md:p-8 text-center relative z-20 -mt-6">
                            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-bronze-400 to-bronze-600 rounded-full shadow-lg shadow-bronze-500/30 mb-5">
                                <Gift className="w-6 h-6 text-white" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">
                                {activePromo.title}
                            </h3>

                            <p className="text-ivory-100/80 text-sm leading-relaxed mb-6 font-light max-w-sm mx-auto">
                                {activePromo.description}
                            </p>

                            {activePromo.code && (
                                <div className="bg-white/5 border border-white/10 rounded-lg py-2 px-4 mb-6 inline-block backdrop-blur-md">
                                    <span className="text-xs text-white/40 uppercase tracking-widest mr-2">Use Code:</span>
                                    <span className="text-bronze-400 font-mono font-bold tracking-wider">{activePromo.code}</span>
                                </div>
                            )}

                            <button
                                onClick={handleClaim}
                                className="w-full py-3.5 bg-white text-forest-950 font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-ivory-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/5 active:scale-[0.98]"
                            >
                                Claim Offer Now
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-[10px] text-white/30 uppercase tracking-widest hover:text-white/60 transition-colors"
                            >
                                No thanks, I'll pay full price
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Quick Enquiry Modal for Claiming */}
            <QuickEnquiryModal
                isOpen={isEnquiryOpen}
                closeModal={() => setIsEnquiryOpen(false)}
                source={`Promo: ${activePromo.title}`}
                customMessage={`Hi, I'd like to claim the offer: ${activePromo.title} (${activePromo.code || 'No Code'}). Please confirm availability.`}
            />
        </>
    );
}
