import Link from "next/link";


const CtaSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl border border-teal-500/20 bg-linear-to-br from-teal-500/10 to-cyan-500/5 px-6 py-16 text-center overflow-hidden sm:py-20">
                {/* Glow */}
                <div className="absolute -top-20 -right-20 w-65 h-65 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
                <h2 className="relative font-display text-3xl text-white sm:text-4xl">
                    Ready to take control?
                </h2>
                <p className="relative mt-3 text-base text-zinc-400">
                    Join thousands who trust FinWise with their financial data
                </p>
                <Link
                    href="/sign-up"
                    className="relative mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zinc-900 shadow-lg transition-all hover:bg-zinc-100 hover:-translate-y-0.5 hover:shadow-xl">
                    Get Started for Free
                </Link>
            </div>
        </section>
    )
}
export default CtaSection
