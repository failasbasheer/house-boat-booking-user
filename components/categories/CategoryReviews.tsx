import { Category } from '@/types';
import { Quote, Star } from 'lucide-react';

export default function CategoryReviews({ category }: { category: Category }) {
    return (
        <div className="space-y-12 py-12 border-t border-forest-900/5">
            <div className="flex flex-col md:flex-row items-baseline gap-6 mb-8">
                <h2 className="text-3xl font-serif text-forest-950">Guest Stories</h2>
                <div className="flex items-center gap-2 text-bronze-500">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                    </div>
                    <span className="text-sm font-medium tracking-wide text-forest-900/60 uppercase">
                        {category.stats.rating} / 5 Average
                    </span>
                </div>
            </div>

            <div className="flex overflow-x-auto gap-8 md:gap-12 pb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {category.testimonials.map((review) => (
                    <div key={review.id} className="min-w-[300px] md:min-w-[400px] flex-shrink-0 group cursor-pointer">
                        <Quote className="w-10 h-10 text-forest-900/10 mb-6 group-hover:text-bronze-400 transition-colors duration-500" />
                        <p className="text-xl md:text-2xl text-forest-900/80 font-serif italic mb-6 leading-relaxed group-hover:text-forest-950 transition-colors">
                            "{review.text}"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-px bg-forest-900/20 group-hover:bg-bronze-400 transition-colors" />
                            <div>
                                <p className="font-display text-xs font-bold uppercase tracking-widest text-forest-900">{review.author}</p>
                                <p className="text-xs text-neutral-400 mt-1">{review.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
