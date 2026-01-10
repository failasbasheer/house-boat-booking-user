'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone, Mail, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import QuickEnquiryModal from './modals/QuickEnquiryModal';
import { FAQ_DATA } from "@/constants";
import { useSettings } from "@/context/SettingsContext";

// Types
interface FAQItemProps {
    item: {
        question?: string;
        answer?: string | string[];
        q?: string;
        a?: string;
    };
    isOpen: boolean;
    onClick: () => void;
}

// Individual FAQ  Component
const FAQItem = ({ item, isOpen, onClick }: FAQItemProps) => {
    return (
        <motion.div initial={false} animate={{ backgroundColor: isOpen ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.6)" }}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden group
            ${isOpen ? 'border-bronze-200/50 shadow-lg shadow-bronze-900/5' : 'border-ivory-200/60 hover:border-bronze-200/30 hover:bg-white hover:shadow-sm'}
            `}
        >
            <button onClick={onClick} className="w-full flex items-center justify-between py-3 px-4 md:py-5 md:px-6 text-left focus:outline-none" aria-expanded={isOpen}>
                <span className={`text-sm md:text-lg font-serif font-medium pr-4 md:pr-8 transition-colors duration-300
                    ${isOpen ? 'text-forest-900' : 'text-forest-950/80 group-hover:text-forest-900'}
                        `}>{item.question || item.q}</span>

                <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full border transition-all duration-300
                            ${isOpen ? 'bg-forest-900 border-forest-900 text-white rotate-180' : 'bg-white border-ivory-300 text-bronze-600 group-hover:border-bronze-300'}
                            `}>
                    {isOpen ? <Minus className="w-3 h-3 md:w-4 md:h-4" /> : <Plus className="w-3 h-3 md:w-4 md:h-4" />}
                </div>

            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="px-4 pb-4 pt-0 md:px-6 md:pb-6">
                            <div className="pt-2 md:pt-4 border-t border-dashed border-ivory-200">
                                <div className="text-espresso-600 text-sm md:text-base leading-relaxed space-y-2">
                                    {Array.isArray(item.answer) ? (
                                        <ul className="space-y-2">
                                            {item.answer.map((line: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <ChevronRight className="w-4 h-4 text-bronze-500 mt-1 flex-shrink-0" />
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>{item.answer || item.a}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// Main Component
export const FAQ: React.FC = () => {
    const { whatsappMessage, contactPhone, contactEmail } = useSettings();
    const [openIndex, setOpenIndex] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleItem = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className="py-8 md:py-24 bg-gradient-to-b from-white to-ivory-50/50">
            <QuickEnquiryModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                source="FAQ - Support"
                customMessage={whatsappMessage}
            />
            <div className="max-w-4xl mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center mb-8 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block py-0.5 px-2 md:py-1 md:px-3 rounded-full bg-bronze-50 border border-bronze-100 text-broze-700 text-bronze-700 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:mb-4"
                    >
                        Support & Help
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-5xl font-serif text-forest-950 mb-3 md:mb-6"
                    >
                        Frequently Asked Questions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-espresso-500/80 text-sm md:text-lg max-w-xl mx-auto leading-relaxed"
                    >
                        Everything you need to know about your houseboat experience, tailored for your peace of mind.
                    </motion.p>
                </div>

                {/* FAQ Groups */}
                <div className="space-y-6 md:space-y-10">
                    {FAQ_DATA.map((category, catIdx) => (
                        <div key={catIdx} className="space-y-2 md:space-y-4">
                            {category.title && (
                                <h3 className="text-base md:text-lg font-serif italic text-bronze-600 pl-2">
                                    {category.title}
                                </h3>
                            )}

                            <div className="grid gap-2 md:gap-4">
                                {category.items.map((item, itemIdx) => {
                                    const uniqueId = `${catIdx}-${itemIdx}`;
                                    return (
                                        <FAQItem
                                            key={uniqueId}
                                            item={item}
                                            isOpen={openIndex === uniqueId}
                                            onClick={() => toggleItem(uniqueId)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Block */}
                <div className="mt-10 md:mt-20">
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-forest-950 p-8 md:p-12">
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-bronze-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

                        <div className="relative flex flex-col items-center text-center">
                            <h3 className="text-3xl md:text-4xl font-serif text-white mb-4">
                                Still have <span className="text-bronze-300 italic">questions?</span>
                            </h3>
                            <p className="text-ivory-100/70 text-sm md:text-base leading-relaxed max-w-2xl mb-10">
                                Our concierge team is available 24/7 to handle special requests or clarify specific details about your trip.
                            </p>

                            {/* Contact Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                                {/* WhatsApp */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <WhatsAppIcon className="w-6 h-6 fill-current" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-white font-medium mb-0.5">WhatsApp</span>
                                        <span className="text-xs text-white/50 group-hover:text-green-300 transition-colors">Chat Instantly</span>
                                    </div>
                                </button>

                                {/* Phone */}
                                <a
                                    href={`tel:${contactPhone?.replace(/\s/g, '')}`}
                                    className="group flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-bronze-500/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-bronze-500 text-white flex items-center justify-center shadow-lg shadow-bronze-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-5 h-5 fill-current" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-white font-medium mb-0.5">Call Us</span>
                                        <span className="text-xs text-white/50 group-hover:text-bronze-300 transition-colors">{contactPhone}</span>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="group flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-white font-medium mb-0.5">Email Support</span>
                                        <span className="text-xs text-white/50 group-hover:text-blue-300 transition-colors">Response within 2h</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    )
}