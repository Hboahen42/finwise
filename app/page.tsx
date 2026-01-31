import Navbar from "@/components/landingPage/Navbar";
import HeroSection from "@/components/landingPage/HeroSection";
import FeatureSection from "@/components/landingPage/FeatureSection";
import CTASection from "@/components/landingPage/CTASection";
import Footer from "@/components/landingPage/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/* Features Section*/}
            <FeatureSection />

            {/* CTA Section */}
            <CTASection />

            {/* Footer Section */}
            <Footer />
        </div>
    );
}