


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
import PromoModal from '@/components/modals/PromoModal';
// import PackageModel from '@/models/Package';
// import connectToDatabase from '@/lib/db';
import { getAllCategories } from '@/lib/categories';
import { getHeroPackage } from '@/lib/packages';

export default async function Home() {
    const categories = await getAllCategories();
    const heroPackage = await getHeroPackage();

    return (
        <div className="min-h-screen bg-white text-espresso-900 font-sans">
            <PromoModal />
            <Navbar />

            <main>
                <Hero />

                {/* Clarity first */}
                <HowItWorks />

                {/* Emotional reinforcement */}
                <Experience />

                {/* Concrete offering - Show only top 5 */}
                <Fleet categories={categories.slice(0, 5)} />

                {/* Special Promotional Section - Dynamic from DB (isHero=true) */}
                <KeralaPromoSection data={heroPackage} />

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
