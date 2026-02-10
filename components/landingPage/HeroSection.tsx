import Link from "next/link";
import {ArrowRight} from "lucide-react";
import BackgroundImage from "@/components/BackgroundImage";
import DashboardPreview from "@/components/landingPage/DashboardPreview";


const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background Image */}
            <BackgroundImage />

            {/* Teal glow */}
            <div className="absolute -top-50 left-1/2 -translate-x-1/2 w-175 h-175 rounded-full bg-teal-500/20 blur-3xl pointer-events-none z-0" />

            {/* Hero Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-30 pb-28 sm:px-6">
                <div className="text-center">
                    <h1 className="font-display text-5xl tracking-tight text-white sm:text-6xl lg:text-[82px] lg:leading-[1.05] animate-fade-up anim-delay-1">
                        Your{" "}
                        <em className="italic bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            Smart
                        </em>{" "}
                        Financial
                        <br/>
                        Companion
                    </h1>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 animate-fade-up anim-delay-2">
                        Take control of your finances with FinWise. Connect your bank accounts, track spending, and gain insights into your financial health all in one place
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-3 animate-fade-up anim-delay-3">
                        <Link
                            href="/sign-up"
                            className="group flex items-center gap-2 rounded-full bg-linear-to-r from-teal-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-teal-500/25 transition-all hover:shadow-teal-500/40 hover:-translate-y-0.5">
                            Start Free Today
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/sign-up"
                            className="rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white hover:bg-white/5"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

                {/* Floating Dashboard Preview */}
                <div className="mt-16 animate-fade-up anim-delay-5">
                    <DashboardPreview />
                </div>
            </div>
        </section>
    )
}
export default HeroSection