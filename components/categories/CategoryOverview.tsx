
import { Category } from '@/types';

export default function CategoryOverview({ category }: { category: Category }) {
    return (
        <div className="space-y-10">
            {/* Editorial Description - Compact */}
            <div className="relative pl-6 md:pl-10 border-l border-forest-900/10">
                <h2 className="text-3xl md:text-4xl font-serif mb-4 text-forest-950 tracking-tight leading-tight">
                    The {category.title} Experience.
                </h2>
                <div className="prose prose-neutral max-w-4xl">
                    <p className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed">
                        <span className="text-5xl float-left mr-2 mt-[-4px] font-serif text-bronze-500">
                            {category.description.charAt(0)}
                        </span>
                        {category.description.slice(1)}
                    </p>
                </div>
            </div>

            {/* Asymmetric Amenities List - Compact */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="h-px w-8 bg-bronze-500" />
                    <span className="font-display text-[10px] uppercase tracking-[0.2em] text-bronze-600">
                        Signature Inclusions *
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {(category.amenities || []).map((amenity, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start group border-b border-forest-900/5 pb-6 last:border-0 hover:pl-2 transition-all duration-500 ease-out`}
                        >
                            {/* Numbering */}
                            <div className="font-display text-4xl md:text-5xl text-forest-900/5 group-hover:text-bronze-500/20 transition-colors duration-500 -mt-2">
                                {(idx + 1).toString().padStart(2, '0')}
                            </div>

                            <div className="space-y-2 max-w-2xl">
                                <h3 className="text-xl font-serif text-forest-900 group-hover:text-bronze-700 transition-colors">
                                    {amenity.title}
                                </h3>
                                <p className="text-neutral-500 leading-relaxed font-light text-base">
                                    {amenity.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] md:text-xs text-neutral-400 italic mt-6">
                    * These amenities are subject to availability and boat selection.
                </p>
            </div>
        </div>
    );
}