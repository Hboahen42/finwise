import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
            <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-8 py-16 text-center">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        FinWise
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        Your smart financial companion
                    </p>
                </div>

                <p className="max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                    Take control of your finances with FinWise. Connect your bank accounts,
                    track transactions, and gain insights into your spending—all in one place.
                </p>

                <div className="flex gap-4">
                    <Link
                        href="/sign-up"
                        className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Get Started
                    </Link>
                    <Link
                        href="/sign-in"
                        className="rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
                    >
                        Sign In
                    </Link>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-3">
                    <div className="space-y-2">
                        <div className="text-3xl">🏦</div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Connect Banks
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Securely link your accounts with Plaid
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">📊</div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Track Spending
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            See where your money goes
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-3xl">💡</div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
                            Get Insights
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Make smarter financial decisions
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}