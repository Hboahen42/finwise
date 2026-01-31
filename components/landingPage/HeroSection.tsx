import Link from "next/link";
import {ArrowRight} from "lucide-react";
import Image from "next/image";


const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/hero-bg.jpg"
                    alt="Financial background"
                    fill={true}
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-linear-to-br from-white/70 via-white/50 to-teal-900/50 dark:from-black/70 dark:via-black/50"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 lg:py-32">
                <div className="text-center">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
                        Your Smart Financial
                        <span className="block bg-linear-to-r from-blue-600 bg-clip-text text-transparent">
                            Companion
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Take control of your finances with FinWise. Connect your bank accounts, track spending, and gain insights into your financial health all in one place.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-4">
                        <Link
                            href="/sign-up"
                            className="flex items-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            Start Free Today
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/sign-in"
                        className="rounded-md border border-zinc-300 bg-white px-6 py-3 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-zinc-50 to-transparent dark:from-zinc-900"></div>
        </section>
    )
}
export default HeroSection
