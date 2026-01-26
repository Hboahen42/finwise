"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await fetch("http://localhost:3000/api/auth/sign-out", {
                method: "POST",
                credentials: "include",
            });
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Header */}
            <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                            FinWise
                        </h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        Dashboard
                    </h2>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Welcome to FinWise
                    </p>
                </div>

                {/* Dashboard Content Placeholder */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Total Balance
                        </h3>
                        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                            $0.00
                        </p>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Connected Accounts
                        </h3>
                        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                            0
                        </p>
                    </div>

                    <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Recent Transactions
                        </h3>
                        <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                            0
                        </p>
                    </div>
                </div>

                <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        Get Started
                    </h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        Connect your first bank account to start tracking your finances
                    </p>
                    <button className="mt-4 rounded-md bg-zinc-900 px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
                        Connect Bank Account
                    </button>
                </div>
            </main>
        </div>
    );
}