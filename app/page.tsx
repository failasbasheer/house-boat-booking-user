


import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Experience } from '@/components/Experience';
import { Fleet } from '@/components/Fleet';
import { KeralaPromoSection } from '@/components/KeralaPromoSection';
import { Testimonials } from '@/components/Testimonials';
import { Gallery } from '@/components/Gallery';
import { FAQ } from '@/components/FrequencyAskQuestions';
import { Footer } from '@/components/Footer';
import { PricingSplitFocus as Pricing } from '@/components/Pricing';

import { getAllCategories } from '@/lib/categories';

export default async function Home() {
    const categories = await getAllCategories();

    return (
        <div className="min-h-screen bg-white text-espresso-900 font-sans">
            <Navbar />

            <main>
                <Hero />

                {/* Clarity first */}
                <HowItWorks />

                {/* Emotional reinforcement */}
                <Experience />

                {/* Concrete offering - Show only top 5 */}
                <Fleet categories={categories.slice(0, 5)} />

                {/* Special Promotional Section */}
                <KeralaPromoSection />

                {/* Trust before visuals */}
                <Testimonials />

                {/* Desire */}
                <Gallery />

                {/* Objection handling */}
                <FAQ />
            </main>

            <Footer />
        </div>
    );
}
