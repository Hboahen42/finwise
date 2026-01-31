export interface PlaidAccount {
    accountId: number;
    accountName: string;
    officialName: string | null;
    type: string;
    subtype: string | null;
    mask: string | null;
    currentBalance: string | null;
    availableBalance: string | null;
    currency: string | null;
    institutionName: string;
    itemId: number;
    status: string;
}

export interface User {
    email: string;
    id: number;
    name: string;
    role: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export interface PlaidContextType {
    linkToken: string | null;
    loading: boolean;
    error: string | null;
    connectionResult: { institutionName: string } | null;
    fetchLinkToken: (itemId?: number) => Promise<void>;
    /**
     * Dev-only shortcut: create a sandbox public_token and immediately
     * exchanges it - skips the interactive Link UI entirely
     */
    connectSandbox: (itemId?: number) => Promise<void>;

    reset: () => void;
}

export interface ConnectBankButtonProps {
    onConnected?: (institutionName: string) => void;
    sandbox?: boolean;
    className: string;
}