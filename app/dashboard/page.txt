"use client";

import {useAuth} from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {useCallback, useState} from "react";
import {getAccounts} from "@/lib/plaidApi";
import ConnectBankButton from "@/components/plaid/ConnectBankButton";
import {PlaidProvider} from "@/contexts/PlaidContext";

function DashboardContent() {
    const { user, signOut } = useAuth();
    const [connectedCount, setConnectedCount] = useState(0);

    const refreshCounts = useCallback(async () => {
        try {
            const res = await getAccounts();
            setConnectedCount(res.count);
        } catch {

        }
    }, []);

    const handleConnected = useCallback(() => {
        refreshCounts();
    }, [refreshCounts]);

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
                    <div className="flex items-center gap-4">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                Welcome,{" "}
                                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                    {user?.name}
                                </span>
                            </span>
                        <button
                            onClick={signOut}
                            className="rounded-md border logout-button"
                        >
                            Logout
                        </button>
                    </div>
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
                            {connectedCount}
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
                    <div className="mt-4 flex justify-center">
                        <ConnectBankButton
                            sandbox={false}
                            className={""}
                            onConnected={handleConnected}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <PlaidProvider>
                <DashboardContent />
            </PlaidProvider>
        </ProtectedRoute>
    );
}