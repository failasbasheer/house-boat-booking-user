'use client';
import { useState, useEffect } from 'react';
import { X, Phone, User, Loader2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { WHATSAPP_NUMBER } from '@/constants';
import { Category } from '@/types';

interface QuickEnquiryModalProps {
    isOpen: boolean;
    closeModal: () => void;
    category?: Category;
    customMessage?: string;
    source?: string;
}

export default function QuickEnquiryModal({ isOpen, closeModal, category, customMessage, source }: QuickEnquiryModalProps) {
    const [formData, setFormData] = useState({ name: '', phone: '' });
    const [loading, setLoading] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let message = '';

        if (customMessage) {
            message = encodeURIComponent(`${customMessage}\n\nName: ${formData.name}\nPhone: ${formData.phone}`);
        } else if (category) {
            message = encodeURIComponent(`${category.whatsappTemplate}\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCategory: ${category.title}`);
        } else {
            message = encodeURIComponent(`Hi, I'm interested in booking a houseboat.\n\nName: ${formData.name}\nPhone: ${formData.phone}`);
        }

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        try {
            await fetch('/api/enquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    date: new Date().toISOString(),
                    guests: 'Unknown',
                    category: category?.title || source || 'General Enquiry'
                }),
            });
        } catch (error) {
            console.error('Failed to save enquiry:', error);
        } finally {
            setLoading(false);
            closeModal();
            // Small delay to ensure modal closes visually before redirect
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 300);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            />

            {/* Modal Panel */}
            <div className="relative w-full max-w-md bg-black/20 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors outline-none p-1"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-serif text-white mb-2 mt-2">
                    Quick Enquiry
                </h3>
                <p className="text-sm text-ivory-100/70 mb-6 font-light">
                    Fill in your details to start a WhatsApp chat with our team {category ? <>about the <span className="font-semibold text-bronze-400">{category.title}</span></> : 'to confirm availability'}.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ivory-100/50">Name</label>
                        <div className="relative group">
                            <input
                                type="text"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-bronze-500 focus:bg-white/10 outline-none text-white placeholder:text-white/30 transition-all font-light rounded-lg"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-bronze-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1.5 relative z-10">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-ivory-100/50">Phone</label>
                        <div className="relative group">
                            <input
                                type="tel"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 focus:border-bronze-500 focus:bg-white/10 outline-none text-white placeholder:text-white/30 transition-all font-light rounded-lg"
                                placeholder=""
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-bronze-400 transition-colors" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-bronze-500 hover:bg-bronze-600 text-white transition-all font-display font-bold uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 mt-4 shadow-lg shadow-bronze-900/20 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.99] duration-150 rounded-xl"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Continue to WhatsApp
                                <WhatsAppIcon className="w-4 h-4" />
                            </>
                        )}
                    </button>

                    <p className="text-center text-[10px] text-white/30 uppercase tracking-widest pt-2">
                        We respect your privacy
                    </p>
                </form>
            </div>
        </div>
    );
}
