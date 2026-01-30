import Link from "next/link";


const CtaSection = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-linear-to-br from-teal-600 to-cyan-600 px-6 py-6 text-center shadow-xl sm:py-16">
                <h2 className="text-3xl font-bold text-white">
                    Ready to take control of your finances?
                </h2>
                <p className="mt-4 text-lg text-teal-50">
                    Join the thousands of users who trust FinWise with their financial data.
                </p>
                <Link
                    href="/sign-up"
                    className="mt-8 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-teal-900 shadow-lg transition-all hover:bg-zinc-100 hover:shadow-xl">
                    Get Started for Free
                </Link>
            </div>

        </section>
    )
}
export default CtaSection
