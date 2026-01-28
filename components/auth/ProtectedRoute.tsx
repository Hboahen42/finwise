'use client'

import React, {useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {useRouter} from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user,loading, router]);

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-zinc-900 border-r-transparent dark:border-zinc-50"></div>
                    <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render children if not authenticated
    if (!user) {
        return null;
    }

    return <>{children}</>;
}
