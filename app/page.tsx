import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Experience } from '@/components/Experience';
import { Fleet } from '@/components/Fleet';
import { Pricing } from '@/components/Pricing';
import { Gallery } from '@/components/Gallery';
import { FAQ } from '@/components/FrequencyAskQuestions';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-espresso-900 font-sans">
            <Navbar />
            <main>
                <Hero />
                <HowItWorks />

                <Experience />
                <Fleet />

                <Pricing />

                <Gallery />

                <FAQ />

                <Testimonials />
            </main>
            <Footer />
        </div>
    );
}
