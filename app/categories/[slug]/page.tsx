import { notFound } from 'next/navigation';
import { getAllCategories, getCategoryBySlug } from '@/lib/categories';
import CategoryHero from '@/components/categories/CategoryHero';
import CategoryOverview from '@/components/categories/CategoryOverview';
import CategoryReviews from '@/components/categories/CategoryReviews';
import EnquiryForm from '@/components/categories/EnquiryForm';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import * as LucideIcons from 'lucide-react';
import { Category } from '@/types';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';

import EnquireNowButton from '@/components/categories/EnquireNowButton';

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await getCategoryBySlug(params.slug);

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-ivory-50 text-forest-900 selection:bg-forest-100 selection:text-forest-900">
            <Navbar scrollThreshold={450} />

            {/* Hero Section */}
            <CategoryHero category={category} />

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 py-6 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 lg:gap-16">

                    {/* Left Column: Content & Inventory */}
                    <div className="lg:col-span-8 space-y-8 md:space-y-16">
                        <CategoryOverview category={category} />

                        {/* CTA to View Fleet - Architectural Card */}
                        <div className="relative overflow-hidden bg-forest-950 group cursor-pointer shadow-xl">
                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bronze-500 to-transparent" />

                            {/* Abstract Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000 grayscale"
                                style={{
                                    backgroundImage: `url('/collection/IMG-20250617-WA0019 (3).jpg')`
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/80 to-transparent" />

                            <div className="relative z-10 p-5 md:p-12 flex flex-col items-start gap-4 md:gap-6">
                                <div className="space-y-2 md:space-y-4 max-w-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-px bg-bronze-500" />
                                        <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-bronze-500">
                                            The Fleet
                                        </span>
                                    </div>
                                    <h3 className="text-2xl md:text-5xl font-serif text-white leading-none">
                                        Explore the <br />
                                        <span className="italic text-white/50">{category.slug.replace('-', ' ')}</span> fleet.
                                    </h3>
                                </div>

                                {category.slug === 'honeymoon' || category.slug === 'kerala-package' ? (
                                    <EnquireNowButton category={category} />
                                ) : (
                                    <a
                                        href={`/all-boats?category=${category.slug}`}
                                        className="group/btn inline-flex items-center gap-4 text-sm font-display font-bold uppercase tracking-[0.15em] text-white bg-bronze-500 hover:bg-bronze-400 px-8 py-4 mt-6 rounded-none transition-all duration-300 shadow-lg hover:shadow-bronze-500/20"
                                    >
                                        <span>View Houseboats</span>
                                        <LucideIcons.ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-2 transition-transform" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <CategoryReviews category={category} />
                    </div>

                    {/* Right Column: Sticky Enquiry Panel */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-20 md:top-24 space-y-6 md:space-y-8">
                            <EnquiryForm category={category} />

                            {/* Simplified Trust Signal */}
                            <div className="flex justify-center gap-6 opacity-30 grayscale mix-blend-multiply">
                                {/* Using generic icons as placeholders for trust badges */}
                                <LucideIcons.ShieldCheck className="w-5 h-5" />
                                <LucideIcons.Award className="w-5 h-5" />
                                <LucideIcons.Star className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
