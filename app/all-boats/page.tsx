"use client";

import { useState, useEffect, Suspense, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchHouseboats, fetchCategories } from '@/lib/apiClient';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Boat } from '@/types';
import { Filter, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import BoatDetailsModal from '@/components/BoatDetailsModal';
import BoatCard from '@/components/BoatCard';

function BoatFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [category, setCategory] = useState(searchParams.get('category') || 'all');
    const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'all');
    const [minGuests, setMinGuests] = useState(searchParams.get('guests') || '0');
    const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMounted, setIsMounted] = useState(false);

    const [boats, setBoats] = useState<any[]>([]);
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const ITEMS_PER_PAGE = 12;
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (resultsRef.current && isMounted) {
            const offset = 100;
            const elementPosition = resultsRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }, [currentPage, isMounted]);

    useEffect(() => {
        setIsMounted(true);
        const loadData = async () => {
            try {
                const [dbBoats, dbCategories] = await Promise.all([
                    fetchHouseboats(),
                    fetchCategories()
                ]);

                setBoats(dbBoats);

                if (dbCategories && dbCategories.length > 0) {
                    setCategoriesData(dbCategories.filter((c: any) => c.slug !== 'romantic' && c.title && c.title.trim() !== ''));
                }
            } catch (err) {
                setError('Failed to load data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredBoats = useMemo(() => {
        return boats.filter(boat => {
            if (category !== 'all') {
                if (category === 'shared-tours') {
                    if (!boat.shared_package_availability) return false;
                } else if (boat.categorySlug !== category) {
                    return false;
                }
            }

            if (bedrooms !== 'all') {
                if (bedrooms === '5+' && boat.bedrooms < 5) return false;
                if (bedrooms !== '5+' && boat.bedrooms !== parseInt(bedrooms)) return false;
            }

            if (parseInt(minGuests) > 0 && boat.maxGuests < parseInt(minGuests)) return false;

            return true;
        }).sort((a, b) => {
            switch (sortBy) {
                case 'price_asc':
                    return a.pricePerNight - b.pricePerNight || a.id.localeCompare(b.id);
                case 'price_desc':
                    return b.pricePerNight - a.pricePerNight || a.id.localeCompare(b.id);
                case 'capacity_desc':
                    return b.maxGuests - a.maxGuests || a.id.localeCompare(b.id);
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    if (a.featured !== b.featured) return a.featured ? -1 : 1;
                    return a.id.localeCompare(b.id);
            }
        });
    }, [boats, category, bedrooms, minGuests, sortBy]);

    const totalPages = Math.ceil(filteredBoats.length / ITEMS_PER_PAGE);
    const paginatedBoats = filteredBoats.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const updateFilters = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all' || value === '0') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`/all-boats?${params.toString()}`, { scroll: false });
        setCurrentPage(1);
    };

    useEffect(() => {
        setCategory(searchParams.get('category') || 'all');
        setBedrooms(searchParams.get('bedrooms') || 'all');
        setMinGuests(searchParams.get('guests') || '0');
        setSortBy(searchParams.get('sort') || 'newest');
    }, [searchParams]);

    if (!isMounted) return null;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-900"></div>
                <p className="text-forest-800 font-medium">Loading valid boats...</p>
            </div>
        );
    }

    return (
        <div ref={resultsRef} className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start relative">
            <BoatDetailsModal boat={selectedBoat} onClose={() => setSelectedBoat(null)} />

            <div className="lg:hidden sticky top-20 z-30 w-full mb-6">
                <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-100 text-forest-950 shadow-lg shadow-stone-900/5 transition-transform active:scale-[0.99]"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-stone-100 rounded-full">
                            <SlidersHorizontal className="w-4 h-4 text-forest-900" />
                        </div>
                        <div className="text-left">
                            <span className="block text-sm font-bold text-forest-900 uppercase tracking-wide">Filters & Sort</span>
                            <span className="block text-[10px] text-stone-500 font-medium">Refine your search</span>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-stone-100 flex items-center justify-center">
                        <ChevronDown className="w-4 h-4 text-forest-900" />
                    </div>
                </button>
            </div>

            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-[60] lg:hidden backdrop-blur-sm"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 z-[70] w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-stone-100">
                                <h2 className="text-xl font-serif text-forest-900">Filters</h2>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-stone-500" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Experience Type</h3>
                                    <div className="space-y-3">
                                        <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${category === 'all' ? 'border-forest-900 bg-forest-50' : 'border-stone-100'}`}>
                                            <span className={`text-sm font-medium ${category === 'all' ? 'text-forest-900' : 'text-stone-600'}`}>All Houseboats</span>
                                            <input type="radio" name="mobile_cat" value="all" checked={category === 'all'} onChange={() => updateFilters('category', 'all')} className="hidden" />
                                            {category === 'all' && <div className="w-2 h-2 rounded-full bg-forest-900" />}
                                        </label>
                                        {categoriesData.map((cat: any) => (
                                            <label key={cat.slug} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${category === cat.slug ? 'border-forest-900 bg-forest-50' : 'border-stone-100'}`}>
                                                <span className={`text-sm font-medium ${category === cat.slug ? 'text-forest-900' : 'text-stone-600'}`}>{cat.title}</span>
                                                <input type="radio" name="mobile_cat" value={cat.slug} checked={category === cat.slug} onChange={() => updateFilters('category', cat.slug)} className="hidden" />
                                                {category === cat.slug && <div className="w-2 h-2 rounded-full bg-forest-900" />}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Bedrooms</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {['all', '1', '2', '3', '4', '5+'].map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => updateFilters('bedrooms', opt)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${bedrooms === opt
                                                    ? 'bg-forest-900 text-white border-forest-900'
                                                    : 'bg-white text-stone-600 border-stone-200'
                                                    }`}
                                            >
                                                {opt === 'all' ? 'Any' : opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">Sort Order</h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { label: 'Newest Arrivals', value: 'newest' },
                                            { label: 'Price: Low to High', value: 'price_asc' },
                                            { label: 'Price: High to Low', value: 'price_desc' },
                                            { label: 'Capacity: High to Low', value: 'capacity_desc' },
                                        ].map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => updateFilters('sort', opt.value)}
                                                className={`text-left px-4 py-3 rounded-lg text-sm transition-colors ${sortBy === opt.value ? 'bg-stone-100 text-forest-900 font-bold' : 'text-stone-500'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-stone-100 bg-white">
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full py-4 bg-forest-900 text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-black transition-colors"
                                >
                                    Show {filteredBoats.length} Boats
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <aside className="hidden lg:block lg:w-72 lg:sticky lg:top-28 transition-all">
                <div className="lg:h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-stone-100">
                    <div className="space-y-3 mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-bronze-500">Category</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${category === 'all' ? 'border-forest-800 bg-forest-800' : 'border-ivory-300 group-hover:border-forest-500'}`}>
                                    {category === 'all' && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <input
                                    type="radio"
                                    name="category"
                                    value="all"
                                    checked={category === 'all'}
                                    onChange={() => updateFilters('category', 'all')}
                                    className="hidden"
                                />
                                <span className={`text-sm transition-colors ${category === 'all' ? 'text-forest-900 font-medium' : 'text-espresso-500 group-hover:text-forest-800'}`}>All Categories</span>
                            </label>
                            {categoriesData.map((cat: any) => (
                                <label key={cat.slug} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${category === cat.slug ? 'border-forest-800 bg-forest-800' : 'border-ivory-300 group-hover:border-forest-500'}`}>
                                        {category === cat.slug && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <input
                                        type="radio"
                                        name="category"
                                        value={cat.slug}
                                        checked={category === cat.slug}
                                        onChange={() => updateFilters('category', cat.slug)}
                                        className="hidden"
                                    />
                                    <span className={`text-sm transition-colors ${category === cat.slug ? 'text-forest-900 font-medium' : 'text-espresso-500 group-hover:text-forest-800'}`}>{cat.title}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-stone-100 w-full mb-8" />

                    <div className="space-y-3 mb-8">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-bronze-500">Bedrooms</h3>
                        <div className="flex flex-wrap gap-2">
                            {['all', '1', '2', '3', '4', '5+'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => updateFilters('bedrooms', opt)}
                                    className={`w-9 h-9 rounded-lg text-sm border transition-all duration-300 ${bedrooms === opt
                                        ? 'bg-forest-900 text-white border-forest-900 shadow-lg shadow-forest-900/20'
                                        : 'bg-transparent text-espresso-500 border-ivory-200 hover:border-bronze-400 hover:text-forest-900'
                                        }`}
                                >
                                    {opt === 'all' ? 'All' : opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-stone-100 w-full mb-8" />

                    <div className="space-y-3">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-bronze-500">Minimum Guests</h3>
                        <div className="relative">
                            <select
                                value={minGuests}
                                onChange={(e) => updateFilters('guests', e.target.value)}
                                className="w-full bg-ivory-50 border border-ivory-200 rounded-lg px-3 py-2 text-forest-900 text-sm focus:outline-none focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 appearance-none cursor-pointer hover:border-bronze-300 transition-colors"
                            >
                                <option value="0">Any Capacity</option>
                                <option value="2">2+ Guests</option>
                                <option value="4">4+ Guests</option>
                                <option value="6">6+ Guests</option>
                                <option value="10">10+ Guests</option>
                                <option value="20">20+ Guests</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-espresso-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </aside>

            <div className="flex-1 w-full min-w-0">
                <div className="hidden lg:flex justify-between items-center mb-6 px-1">
                    <p className="text-espresso-500 text-sm font-medium">
                        Showing <span className="text-forest-900 font-bold">{filteredBoats.length}</span> results
                    </p>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-ivory-200">
                        <span className="text-xs text-espresso-500">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => updateFilters('sort', e.target.value)}
                            className="bg-transparent border-none text-forest-900 text-sm font-medium focus:outline-none cursor-pointer text-right"
                        >
                            <option value="newest">Newest Arrivals</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="capacity_desc">Capacity: High to Low</option>
                        </select>
                    </div>
                </div>

                {error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-6 py-2 bg-forest-900 text-white rounded-full text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        {filteredBoats.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                    {paginatedBoats.map((boat, index) => (
                                        <BoatCard
                                            key={boat.id}
                                            boat={boat}
                                            onClick={setSelectedBoat}
                                            priority={index < 4}
                                        />
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-12 pb-12">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="px-5 py-2 rounded-full border border-ivory-200 bg-white text-forest-900 text-sm font-medium hover:bg-forest-900 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${currentPage === page
                                                        ? 'bg-forest-900 text-white shadow-lg shadow-forest-900/10'
                                                        : 'bg-white border border-ivory-200 text-forest-900 hover:border-forest-900'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-5 py-2 rounded-full border border-ivory-200 bg-white text-forest-900 text-sm font-medium hover:bg-forest-900 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-3xl border border-ivory-200 shadow-sm">
                                <div className="w-20 h-20 bg-ivory-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-ivory-200">
                                    <Filter className="w-8 h-8 text-bronze-400" />
                                </div>
                                <h3 className="text-2xl font-serif text-forest-900 mb-2">No boats found</h3>
                                <p className="text-espresso-500 mb-8 max-w-sm mx-auto">We couldn't find any houseboats matching your current filters. Try adjusting them to see more results.</p>
                                <button
                                    onClick={() => {
                                        updateFilters('category', 'all');
                                        updateFilters('bedrooms', 'all');
                                        updateFilters('guests', '0');
                                    }}
                                    className="px-8 py-3 bg-forest-900 hover:bg-forest-800 text-white rounded-full font-medium transition-colors shadow-lg shadow-forest-900/10"
                                >
                                    Clear Results
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function AllBoatsPage() {
    return (
        <main className="min-h-screen bg-ivory-50 selection:bg-bronze-200 selection:text-forest-900">
            <Navbar scrollThreshold={300} />

            <section className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-900 to-forest-950">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                <div className="relative z-10 text-center px-4 md:px-6 mt-8 md:mt-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-6xl font-serif text-bronze-400 mb-2 md:mb-4"
                    >
                        Our Fleet
                    </motion.h1>
                    <p className="text-white/80 text-sm md:text-lg font-light max-w-xl mx-auto">
                        Explore our complete collection of luxury houseboats, filtered to your preference.
                    </p>
                </div>
            </section>

            <section className="py-4 md:py-8 px-4 md:px-12 max-w-[1920px] mx-auto min-h-[600px]">
                <Suspense fallback={
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-900"></div>
                    </div>
                }>
                    <BoatFilters />
                </Suspense>
            </section>

            <Footer />
        </main>
    );
}
