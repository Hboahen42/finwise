import React, {createContext, useCallback, useContext, useState} from "react";
import {PlaidContextType} from "@/types/types";
import {createLinkToken, createSandboxToken, exchangePublicToken} from "@/lib/plaidApi";

const PlaidContext = createContext<PlaidContextType | undefined>(undefined);

export function PlaidProvider({ children }: { children: React.ReactNode }) {
    const [linkToken, setLinkToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [connectionResult, setConnectionResult] = useState<{
        institutionName: string
    } | null>(null);

    // Fetch a link token
    const fetchLinkToken = useCallback(async (itemId?: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await createLinkToken(itemId);
            setLinkToken(res.data.linkToken);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to create link token");
        } finally {
            setLoading(false);
        }
    }, []);

    // sandbox shortcut (dev)
    const connectSandbox = useCallback(async (itemId?: number) => {
        setLoading(true);
        setError(null);
        setConnectionResult(null);
        try {
            // get a sandbox public_token
            const sandboxRes = await createSandboxToken(itemId);
            // immediately exchange it
            const exchangeRes = await exchangePublicToken(
                sandboxRes.data.publicToken
            );
            setConnectionResult({ institutionName: exchangeRes.data.institutionName });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to connect sandbox account");
        } finally {
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setConnectionResult(null);
        setLinkToken(null);
    }, []);

    return (
        <PlaidContext.Provider value={{
            linkToken,
            loading,
            error,
            connectionResult,
            fetchLinkToken,
            connectSandbox,
            reset,
        }}>
            {children}
        </PlaidContext.Provider>
    );
}

// Hook
export function usePlaid() {
    const ctx = useContext(PlaidContext);
    if (!ctx) {
        throw new Error("usePlaid must be used within a <PlaidProvider>");
    }
    return ctx;
}

