
import { notFound } from 'next/navigation';
import { getPackageBySlug, getAllPackages } from '@/lib/packages';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import PackageEnquiryForm from '@/components/packages/PackageEnquiryForm';
import { Clock, Users, MapPin, CheckCircle, Star } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 60;
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const packages = await getAllPackages();
    return packages.map((pkg) => ({
        slug: pkg.slug,
    }));
}

export default async function PackageDetailPage({ params }: { params: { slug: string } }) {
    const pkg = await getPackageBySlug(params.slug);

    if (!pkg) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-ivory-50 text-forest-900 font-sans selection:bg-forest-100 selection:text-forest-900">
            <Navbar />

            <div className="relative h-[60vh] md:h-[70vh] bg-forest-950 overflow-hidden">
                <Image
                    src={pkg.images?.hero || pkg.imagePlaceholder || '/images/default-houseboat.jpg'}
                    alt={pkg.title}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <div className="container mx-auto">
                        <span className="block text-bronze-500 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                            {pkg.tagline || 'Experience'}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 max-w-4xl">
                            {pkg.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-bronze-500" />
                                <span>{pkg.shortDescription || 'Flexible'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-bronze-500" />
                                <span>{pkg.guestCapacity || 'Ideal for Couples & Families'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    <div className="lg:col-span-8 space-y-12">

                        <div>
                            <h2 className="text-2xl font-serif text-forest-950 mb-6">About this Package</h2>
                            <p className="text-lg text-forest-900/70 leading-relaxed whitespace-pre-line">
                                {pkg.description}
                            </p>
                        </div>

                        {pkg.amenities && pkg.amenities.length > 0 && (
                            <div>
                                <h3 className="text-xl font-serif text-forest-950 mb-6">Package Inclusions</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {pkg.amenities.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-forest-900/5">
                                            <div className="w-8 h-8 rounded-full bg-bronze-50 flex items-center justify-center shrink-0">
                                                <CheckCircle className="w-4 h-4 text-bronze-600" />
                                            </div>
                                            <span className="text-forest-900 font-medium">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pkg.itinerary && pkg.itinerary.length > 0 && (
                            <div>
                                <h3 className="text-xl font-serif text-forest-950 mb-6">Itinerary</h3>
                                <div className="space-y-6">
                                    {pkg.itinerary.map((item, idx) => (
                                        <div key={idx} className="relative pl-8 md:pl-10 border-l border-bronze-200 ml-3">
                                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-bronze-500" />
                                            <h4 className="text-lg font-bold text-forest-950 mb-2">{item.title || `Day ${item.day}`}</h4>
                                            <p className="text-forest-900/70">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-8">
                            {pkg.priceDisplay && (
                                <div className="bg-white p-6 rounded-xl border border-forest-900/5 shadow-sm">
                                    <p className="text-xs text-forest-900/50 uppercase tracking-widest font-bold mb-2">Package Price</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-serif text-forest-950">{pkg.priceDisplay}</span>
                                    </div>
                                    <p className="text-xs text-forest-900/40 mt-2">*Prices may vary based on seasonality and customization.</p>
                                </div>
                            )}

                            <PackageEnquiryForm pkg={pkg} />
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
