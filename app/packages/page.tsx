
import { getAllPackages } from '@/lib/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, MapPin, Star } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute
export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
    const packages = await getAllPackages();

    return (
        <main className="min-h-screen bg-ivory-50 text-forest-900 font-sans selection:bg-forest-100 selection:text-forest-900">
            <Navbar />

            {/* Simple Hero */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-forest-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/collection/IMG-20250617-WA0019 (3).jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-forest-950/50 to-forest-950"></div>

                <div className="relative z-10 container mx-auto text-center">
                    <span className="block text-bronze-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">Curated Journeys</span>
                    <h1 className="text-4xl md:text-6xl font-serif mb-6">Experience Kerala <br /><span className="italic text-white/50">Beyond the Ordinary</span></h1>
                    <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">
                        Select from our exclusive range of houseboat packages, designed for every kind of traveler.
                    </p>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-20 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <Link href={`/packages/${pkg.slug}`} key={String(pkg._id)} className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden bg-gray-200">
                                    <Image
                                        src={pkg.images?.hero || pkg.imagePlaceholder || '/images/default-houseboat.jpg'}
                                        alt={pkg.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {pkg.tagline && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forest-950">
                                            {pkg.tagline}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-8 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2 text-xs text-forest-600 font-medium">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{pkg.shortDescription || 'Flexible Duration'}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-bronze-600 font-bold bg-bronze-50 px-2 py-1 rounded">
                                            <Star className="w-3 h-3 fill-bronze-600" />
                                            <span>4.9</span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-serif text-forest-950 mb-3 group-hover:text-bronze-600 transition-colors">
                                        {pkg.title}
                                    </h3>

                                    <p className="text-sm text-forest-900/60 leading-relaxed mb-6 line-clamp-3">
                                        {pkg.description}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-forest-900/5 flex items-center justify-between">
                                        {pkg.priceDisplay ? (
                                            <div>
                                                <span className="block text-[10px] uppercase tracking-wider text-forest-900/40 font-bold">Starting from</span>
                                                <span className="text-lg font-serif text-forest-950">{pkg.priceDisplay}</span>
                                            </div>
                                        ) : (
                                            <div className="text-sm font-medium text-forest-900/60">
                                                View Details
                                            </div>
                                        )}
                                        <span className="w-10 h-10 rounded-full bg-forest-50 flex items-center justify-center text-forest-900 group-hover:bg-forest-950 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {packages.length === 0 && (
                        <div className="text-center py-20">
                            <h3 className="text-xl text-forest-900">No packages available at the moment.</h3>
                            <p className="text-forest-900/60 mt-2">Please check back later or contact us directly.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
