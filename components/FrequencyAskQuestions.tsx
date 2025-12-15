"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Phone, Mail, MessageCircle } from 'lucide-react';
import { FAQ_DATA, WHATSAPP_NUMBER, WHATSAPP_MESSAGE, CONTACT_PHONE, CONTACT_EMAIL } from '../constants';

const FAQItem = ({ item }: { item: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-ivory-100 last:border-0 bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 px-5 text-left group hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
            >
                <span className={`text-base md:text-lg font-medium pr-4 transition-colors ${isOpen ? 'text-forest-900' : 'text-espresso-800'}`}>
                    {item.question}
                </span>
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-forest-900 text-white rotate-180' : 'text-bronze-500 bg-white group-hover:bg-bronze-100'}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 pt-0 text-espresso-600 text-sm md:text-base leading-relaxed">
                            {Array.isArray(item.answer) ? (
                                <ul className="space-y-1.5">
                                    {item.answer.map((line: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            {!line.startsWith('✓') && !line.startsWith('•') && (
                                                <span className="w-1 h-1 rounded-full bg-bronze-400 mt-2 flex-shrink-0" />
                                            )}
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>{item.answer}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const FAQ: React.FC = () => {
    return (
        <section className="py-8 md:py-12 bg-white">
            <div className="max-w-3xl mx-auto px-4 md:px-6">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <span className="text-bronze-600 uppercase tracking-widest text-xs font-bold mb-3 block">
                        Support
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-forest-950 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-espresso-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                        Answers to common questions about your houseboat experience.
                    </p>
                </div>

                {/* FAQ Groups */}
                <div className="space-y-6">
                    {FAQ_DATA.map((category, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="text-lg font-serif text-forest-800 px-1 flex items-center gap-2">
                                {category.title}
                            </h3>
                            <div className="rounded-xl border border-ivory-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                {category.items.map((item, i) => (
                                    <FAQItem key={i} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Compact CTA Block */}
                {/* Compact CTA Block */}
                <div className="mt-12 relative overflow-hidden rounded-3xl shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950"></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bronze-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative p-8 md:p-10 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-3xl font-serif text-white mb-3">Still <span className="italic text-bronze-200">have questions?</span></h3>
                            <p className="text-ivory-200/90 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                                Our dedicated concierge team is available 24/7 to help you tailor your perfect backwater journey.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 group text-left relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    <div className="bg-green-500/20 p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <MessageCircle className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-white font-medium text-sm block">WhatsApp</span>
                                        <span className="text-green-400/80 text-xs block mt-0.5">Start Planning</span>
                                    </div>
                                </a>

                                <a
                                    href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
                                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 group text-left"
                                >
                                    <div className="bg-bronze-500/20 p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-5 h-5 text-bronze-200" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-white font-medium text-sm block">Call Us</span>
                                        <span className="text-ivory-200/60 text-xs block mt-0.5">{CONTACT_PHONE}</span>
                                    </div>
                                </a>

                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    className="flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 group text-left"
                                >
                                    <div className="bg-blue-500/20 p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-5 h-5 text-blue-200" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-white font-medium text-sm block">Email Us</span>
                                        <span className="text-ivory-200/60 text-xs block mt-0.5">Get a quote</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
