


'use client';
import { useState } from 'react';
import { Category } from '@/types';
import { Calendar, Users, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export default function EnquiryForm({ category }: { category: Category }) {
    const [formData, setFormData] = useState({ name: '', date: '', guests: '2' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = encodeURIComponent(`${category.whatsappTemplate}\n\nName: ${formData.name}\nDate: ${formData.date}\nGuests: ${formData.guests}\nCategory: ${category.title}`);
        window.open(`https://wa.me/917907689772?text=${message}`, '_blank');
    };


    return (
        <div className="bg-forest-950 text-white p-4 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Architectural Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bronze-500 to-transparent" />

            <div className="relative z-10 space-y-4 md:space-y-6">
                <div>
                    <span className="font-display text-[10px] uppercase tracking-[0.3em] text-bronze-500 block mb-1">
                        Reservations
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide">
                        Houseboat Enquiry
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* Date Input */}
                    <div className="group">
                        <label className="block font-display text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1 group-focus-within:text-bronze-400 transition-colors">
                            Preferred Date
                        </label>
                        <div className="relative border-b border-white/20 group-focus-within:border-bronze-500/50 transition-colors pb-1">
                            <input
                                type="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full bg-transparent text-base font-light text-white outline-none placeholder:text-white/40 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer relative z-10"
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40 pointer-events-none" />
                        </div>
                    </div>

                    {/* Guests Selection */}
                    <div className="group">
                        <label className="block font-display text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1 group-focus-within:text-bronze-400 transition-colors">
                            Number of Guests
                        </label>
                        <div className="relative border-b border-white/20 group-focus-within:border-bronze-500/50 transition-colors pb-1">
                            <select
                                className="w-full bg-forest-950 text-base font-light text-white outline-none appearance-none cursor-pointer"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'].map(n => <option key={n} value={n}>{n} Guests</option>)}
                            </select>
                            <Users className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                        </div>
                    </div>

                    {/* Personal Details */}
                    <div className="group">
                        <label className="block font-display text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1 group-focus-within:text-bronze-400 transition-colors">
                            Guest Name
                        </label>
                        <input
                            type="text"
                            className="w-full bg-transparent border-b border-white/20 pb-1 text-base font-light text-white outline-none focus:border-bronze-500/50 transition-colors placeholder:text-white/40"
                            placeholder="Full Name"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-forest-950 hover:bg-ivory-100 transition-colors text-xs font-display font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4"
                    >
                        Enquire
                        <WhatsAppIcon className="w-4 h-4 mb-0.5" />
                    </button>

                    <div className="flex justify-center gap-2 text-[9px] text-white/20 uppercase tracking-widest pt-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Private & Secure</span>
                    </div>
                </form>
            </div>
        </div>
    );
}


