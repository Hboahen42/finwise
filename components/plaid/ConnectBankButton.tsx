"use client";

import { ConnectBankButtonProps } from "@/types/types";
import { usePlaid } from "@/contexts/PlaidContext";
import { useCallback, useEffect, useState } from "react";
import { exchangePublicToken } from "@/lib/plaidApi";
import { usePlaidLink } from "react-plaid-link";
import { AlertCircle, CheckCircle, CreditCard, Loader2 } from "lucide-react";

const ConnectBankButton = ({
                               onConnected,
                               sandbox = false,
                               className = "",
                           }: ConnectBankButtonProps) => {
    const {
        linkToken,
        loading: plaidLoading,
        error: plaidError,
        fetchLinkToken,
        connectSandbox,
        reset,
        connectionResult,
    } = usePlaid();

    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successName, setSuccessName] = useState<string | null>(null);

    /* ---------------- derived state ---------------- */

    const sandboxSuccessName =
        sandbox && connectionResult ? connectionResult.institutionName : null;

    const effectiveStatus = plaidError
        ? "error"
        : sandboxSuccessName
            ? "success"
            : status;

    const effectiveSuccessName = sandboxSuccessName ?? successName;
    const effectiveErrorMsg = plaidError ?? errorMsg;

    const isReadyToOpen = status === "fetchingToken" && !!linkToken;

    const isBusy =
        effectiveStatus === "fetchingToken" ||
        effectiveStatus === "exchanging" ||
        plaidLoading;

    /* ---------------- timeout reset ---------------- */

    useEffect(() => {
        if (effectiveStatus !== "success") return;

        const timeoutId = setTimeout(() => {
            setStatus("idle");
            setSuccessName(null);
            reset();
        }, 4000);

        return () => clearTimeout(timeoutId);
    }, [effectiveStatus, reset]);

    /* ---------------- plaid handlers ---------------- */

    const handleSuccess = useCallback(
        async (publicToken: string) => {
            setStatus("exchanging");
            try {
                const res = await exchangePublicToken(publicToken);
                setSuccessName(res.data.institutionName);
                setStatus("success");
                onConnected?.(res.data.institutionName);
            } catch (e) {
                setStatus("error");
                setErrorMsg(
                    e instanceof Error ? e.message : "Failed to connect bank account"
                );
            }
        },
        [onConnected]
    );

    const handleExit = useCallback(() => {
        setStatus("idle");
        reset();
    }, [reset]);

    const { open, ready } = usePlaidLink({
        token: linkToken || null,
        onSuccess: handleSuccess,
        onExit: handleExit,
    });

    useEffect(() => {
        if (ready && isReadyToOpen) {
            open();
        }
    }, [ready, isReadyToOpen, open]);

    /* ---------------- click handlers ---------------- */

    const handleRealClick = useCallback(async () => {
        setErrorMsg(null);
        setSuccessName(null);
        setStatus("fetchingToken");
        await fetchLinkToken();
    }, [fetchLinkToken]);

    const handleSandboxClick = useCallback(async () => {
        setErrorMsg(null);
        setSuccessName(null);
        setStatus("exchanging");
        reset();
        await connectSandbox();
    }, [connectSandbox, reset]);

    /* ---------------- render ---------------- */

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <button
                onClick={sandbox ? handleSandboxClick : handleRealClick}
                disabled={isBusy || effectiveStatus === "success"}
                className="inline-flex items-center gap-2.5 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
            >
                {isBusy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <CreditCard className="h-4 w-4" />
                )}
                {effectiveStatus === "fetchingToken"
                    ? "Preparing..."
                    : effectiveStatus === "exchanging"
                        ? "Connecting..."
                        : "Connect Bank Account"}
            </button>

            {effectiveStatus === "success" && effectiveSuccessName && (
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-800">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>
            <span className="font-medium">{effectiveSuccessName}</span>{" "}
                        connected successfully
          </span>
                </div>
            )}

            {effectiveStatus === "error" && effectiveErrorMsg && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{effectiveErrorMsg}</span>
                    <button
                        onClick={() => {
                            setStatus("idle");
                            setErrorMsg(null);
                            reset();
                        }}
                        className="ml-2"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConnectBankButton;
