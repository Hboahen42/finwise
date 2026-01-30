import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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