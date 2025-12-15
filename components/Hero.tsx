"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Calendar, Users, Ship, MessageCircle, CheckCircle, Clock, Shield, Star } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

export const Hero: React.FC = () => {
    const [form, setForm] = useState({
        date: '',
        guests: '2 Guests',
        type: 'The Elevated Journey', // Default to Premium
        duration: 'Overnight'
    });

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();

        const text = `Hi, I'm checking availability for a houseboat in Alleppey.
    
📝 *Trip Details*
📅 Date: ${form.date || 'Flexible'}
👥 Guests: ${form.guests}
🛥️ Preference: ${form.type}
⏳ Duration: ${form.duration}

Please verify availability and share the seasonal rates.`;

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center pt-16 pb-6">
            {/* Background Image with Slow Drift Animation */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
            >
                <img
                    src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2069&q=80"
                    alt="Backwaters Luxury"
                    className="w-full h-full object-cover brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60"></div>
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center">

                {/* Text Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-7 text-center lg:text-left pt-10 lg:pt-0"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 mx-auto lg:mx-0">
                        <Star className="w-3.5 h-3.5 text-bronze-400 fill-bronze-400" />
                        <span className="text-white text-xs font-semibold tracking-wide uppercase">Trusted by 2,000+ Travelers</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8 tracking-tight drop-shadow-sm">
                        Silence is the <br />
                        <span className="italic text-ivory-100 font-light">ultimate luxury.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-ivory-100/90 max-w-xl mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
                        Drift through the untouched canals of Alleppey.
                        Verified premium houseboats. Professional crews. Transparent pricing.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-x-8 gap-y-4 justify-center lg:justify-start text-white/90 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-bronze-400" />
                            <span className="border-b border-white/20 pb-0.5">Safety Certified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-bronze-400" />
                            <span className="border-b border-white/20 pb-0.5">Private Charters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-bronze-400" />
                            <span className="border-b border-white/20 pb-0.5">No Hidden Fees</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating SaaS-style Booking Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="lg:col-span-5 w-full"
                >
                    <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-soft border border-white/50 relative overflow-hidden">

                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-serif text-forest-950">Check Availability</h3>
                                    <span className="text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold uppercase tracking-wider">Free Enquiry</span>
                                </div>
                                <p className="text-espresso-500 text-sm mt-2 leading-relaxed">
                                    Check dates and get instant seasonal rates via WhatsApp. No payment required now.
                                </p>
                            </div>

                            <form onSubmit={handleBooking} className="space-y-4">
                                {/* Date Input */}
                                <div className="space-y-1.5">
                                    <label className="text-xs text-forest-800 font-bold uppercase tracking-wider ml-1">Preferred Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-bronze-500 group-focus-within:text-forest-800 transition-colors" />
                                        <input
                                            type="date"
                                            className="w-full bg-white border border-ivory-200 rounded-xl py-3 pl-12 pr-4 text-espresso-900 focus:outline-none focus:border-forest-800 focus:ring-1 focus:ring-forest-800 transition-all placeholder:text-espresso-500 font-medium cursor-pointer"
                                            value={form.date}
                                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {/* Grid for Guests & Duration */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-forest-800 font-bold uppercase tracking-wider ml-1">Guests</label>
                                        <div className="relative group">
                                            <select
                                                className="w-full bg-white border border-ivory-200 rounded-xl py-3 px-4 text-espresso-900 focus:outline-none focus:border-forest-800 appearance-none font-medium cursor-pointer"
                                                value={form.guests}
                                                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                                            >
                                                <option>2 Guests</option>
                                                <option>4 Guests</option>
                                                <option>6+ Group</option>
                                            </select>
                                            <ArrowDown className="absolute right-4 top-4 w-3 h-3 text-bronze-500 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-forest-800 font-bold uppercase tracking-wider ml-1">Duration</label>
                                        <div className="relative group">
                                            <select
                                                className="w-full bg-white border border-ivory-200 rounded-xl py-3 px-4 text-espresso-900 focus:outline-none focus:border-forest-800 appearance-none font-medium cursor-pointer"
                                                value={form.duration}
                                                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                            >
                                                <option>Overnight</option>
                                                <option>Day Cruise</option>
                                                <option>2 Nights</option>
                                            </select>
                                            <ArrowDown className="absolute right-4 top-4 w-3 h-3 text-bronze-500 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Boat Type */}
                                <div className="space-y-1.5">
                                    <label className="text-xs text-forest-800 font-bold uppercase tracking-wider ml-1">Service Tier</label>
                                    <div className="relative group">
                                        <Ship className="absolute left-4 top-3.5 w-5 h-5 text-bronze-500 group-focus-within:text-forest-800 transition-colors" />
                                        <select
                                            className="w-full bg-white border border-ivory-200 rounded-xl py-3 pl-12 pr-4 text-espresso-900 focus:outline-none focus:border-forest-800 appearance-none font-medium cursor-pointer"
                                            value={form.type}
                                            onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        >
                                            <option>The Essential Comfort</option>
                                            <option>The Elevated Journey</option>
                                            <option>The Sovereign (Luxury)</option>
                                            <option>The Intimate Haven (Honeymoon)</option>
                                            <option>The Social Voyage (Shared)</option>
                                        </select>
                                        <ArrowDown className="absolute right-4 top-4 w-3 h-3 text-bronze-500 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Submit CTA */}
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(20, 61, 50, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-forest-900 hover:bg-forest-800 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 shadow-lg shadow-forest-900/20"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span>Enquire via WhatsApp</span>
                                </motion.button>

                                <div className="flex items-center justify-center gap-2 mt-3 opacity-80">
                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <p className="text-[10px] text-espresso-500 uppercase tracking-wide font-semibold">
                                        Fast Response • No Obligation
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hidden md:block"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="w-5 h-5" />
            </motion.div>
        </section>
    );
};
