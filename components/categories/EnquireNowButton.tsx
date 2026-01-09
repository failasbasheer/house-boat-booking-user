'use client';
import { useState } from 'react';
import { Category } from '@/types';
import QuickEnquiryModal from '@/components/modals/QuickEnquiryModal';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

export default function EnquireNowButton({ category }: { category: Category }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="group/btn inline-flex items-center gap-4 text-xs font-display font-bold uppercase tracking-[0.2em] text-white mt-2"
            >
                <span>Enquire Now</span>
                <WhatsAppIcon className="w-4 h-4 text-bronze-500 group-hover/btn:scale-110 transition-transform" />
            </button>

            <QuickEnquiryModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                category={category}
            />
        </>
    );
}
