"use client";

import React, { useState, useRef } from 'react';
import { ArrowDown, Calendar, Users, Ship, Clock, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { WhatsAppIcon } from './WhatsAppIcon';
import QuickEnquiryModal from './modals/QuickEnquiryModal';

const WaveSeparator = () => (
    <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none translate-y-1">
        <svg
            className="w-full h-32 md:h-40 lg:h-56"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,200 C360,40 1080,360 1440,200 L1440,320 L0,320 Z"
            ></path>
        </svg>
    </div>
);

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLImageElement>(null);

    const [form, setForm] = useState({
        date: '',
        guests: '2 Guests',
        type: 'The Elevated Journey',
        duration: 'Overnight'
    });

    useGSAP(() => {
        const tl = gsap.timeline();

        gsap.to(bgImageRef.current, {
            scale: 1,
            duration: 20,
            ease: "none",
            repeat: -1,
            yoyo: true
        });

        tl.from('.hero-badge', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        })
            .from('.hero-title', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out"
            }, "-=0.4")
            .from('.hero-desc', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5")
            .from('.hero-form', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.4");

    }, { scope: containerRef });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getBookingMessage = () => {
        return `Hi, I'm checking availability for a houseboat in Alleppey.\n\n📝 *Trip Details*\n📅 Date: ${form.date || 'Flexible'}\n👥 Guests: ${form.guests}\n🛥️ Preference: ${form.type}\n⏳ Duration: ${form.duration}\n\nPlease verify availability.`;
    };

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <section ref={containerRef} className="relative min-h-[115vh] w-full flex flex-col pt-0 pb-0 overflow-hidden">
            <QuickEnquiryModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                customMessage={getBookingMessage()}
                source="Hero Availability Check"
            />
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    ref={bgImageRef}
                    src="/collection/hero.jpg"
                    alt="Backwaters Luxury"
                    className="w-full h-full object-cover brightness-[0.95] scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col justify-center h-screen">
                <div className="text-center w-full max-w-4xl mx-auto mb-12 md:mb-16 mt-10 md:mt-0">
                    <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mt-6 border border-white/20 mb-8">
                        <Star className="w-3.5 h-3.5 text-bronze-400 fill-bronze-400" />
                        <span className="text-white text-xs font-semibold tracking-wide uppercase">Premium Houseboat Experience</span>
                    </div>

                    <h1 className="hero-title font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] mb-12 tracking-tight drop-shadow-lg">
                        Silence is the <br />
                        <span className="italic text-ivory-100 font-light">ultimate luxury.</span>
                    </h1>

                    <p className="hero-desc text-lg md:text-xl text-ivory-100/90 max-w-2xl mx-auto font-light leading-relaxed mb-16">
                        Drift through the untouched canals of Alleppey. Verified premium houseboats.
                        Professional crews. Transparent pricing.
                    </p>
                </div>

                <div className="hero-form w-full max-w-6xl mx-auto">
                    <form onSubmit={handleBooking} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-3 md:p-4 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-20 bg-white/5 blur-3xl rounded-full -z-10" />

                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <div className="relative flex-1 bg-black/20 md:bg-transparent rounded-xl md:rounded-none px-5 py-4 md:border-r border-white/10 transition-colors hover:bg-white/5">
                                <label className="block text-[10px] text-ivory-200 font-bold uppercase tracking-wider mb-1">Trip Date</label>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-bronze-400" />
                                    <input
                                        type="date"
                                        className="bg-transparent border-none text-white text-sm focus:ring-0 p-0 w-full placeholder:text-white/50 cursor-pointer outline-none"
                                        style={{ colorScheme: 'dark' }}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        value={form.date}
                                    />
                                </div>
                            </div>

                            <div className="relative flex-1 bg-black/20 md:bg-transparent rounded-xl md:rounded-none px-5 py-4 md:border-r border-white/10 transition-colors hover:bg-white/5">
                                <label className="block text-[10px] text-ivory-200 font-bold uppercase tracking-wider mb-1">Guests</label>
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-bronze-400" />
                                    <select
                                        className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 p-0 w-full cursor-pointer [&>option]:text-black appearance-none outline-none"
                                        value={form.guests}
                                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                                    >
                                        <option>2 Guests</option>
                                        <option>4 Guests</option>
                                        <option>6+ Group</option>
                                    </select>
                                    <ArrowDown className="w-3 h-3 text-white/40 ml-auto" />
                                </div>
                            </div>

                            <div className="relative flex-[1.2] bg-black/20 md:bg-transparent rounded-xl md:rounded-none px-5 py-4 md:border-r border-white/10 transition-colors hover:bg-white/5">
                                <label className="block text-[10px] text-ivory-200 font-bold uppercase tracking-wider mb-1">Experience Tier</label>
                                <div className="flex items-center gap-3">
                                    <Ship className="w-5 h-5 text-bronze-400" />
                                    <select
                                        className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 p-0 w-full cursor-pointer [&>option]:text-black appearance-none outline-none"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    >
                                        <option>The Essential Comfort</option>
                                        <option>The Elevated Journey</option>
                                        <option>The Sovereign (Luxury)</option>
                                        <option value="The Intimate Haven (Honeymoon)">Romantic (Honeymoon)</option>
                                    </select>
                                    <ArrowDown className="w-3 h-3 text-white/40 ml-auto" />
                                </div>
                            </div>

                            <div className="relative flex-1 hidden lg:block px-5 py-4 transition-colors hover:bg-white/5">
                                <label className="block text-[10px] text-ivory-200 font-bold uppercase tracking-wider mb-1">Duration</label>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-bronze-400" />
                                    <select
                                        className="bg-transparent border-none text-white text-sm font-medium focus:ring-0 p-0 w-full cursor-pointer [&>option]:text-black appearance-none outline-none"
                                        value={form.duration}
                                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                    >
                                        <option>Overnight</option>
                                        <option>Day Cruise</option>
                                    </select>
                                    <ArrowDown className="w-3 h-3 text-white/40 ml-auto" />
                                </div>
                            </div>

                            <div className="p-2 md:pl-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-gradient-to-br from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 text-white font-bold py-3 md:py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/20 shadow-lg group-hover:shadow-xl active:scale-95"
                                >
                                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                                    <span className="whitespace-nowrap">Check Availability</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="hidden md:flex justify-center gap-8 mt-6 text-white/60 text-xs font-medium tracking-wide">
                        <div className="flex items-center gap-2">
                            <Star className="w-3.5 h-3.5 text-bronze-400" />
                            <span>Safety Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-bronze-400" />
                            <span>No Hidden Fees</span>
                        </div>
                    </div>
                </div>
            </div>

            <WaveSeparator />
        </section>
    );
};