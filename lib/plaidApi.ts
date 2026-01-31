import api from "@/lib/api";
import {PlaidAccount} from "@/types/types";


// Create a Plaid Link token (for real bank connection or re-linking)
export const createLinkToken = async (itemId?: number) => {
    const response = await api.post("api/plaid/create-link-token", {
        itemId: itemId ?? null,
    });
    return response.data as {
        success: boolean;
        data: {
            linkToken: string;
            expiration: string
        }
    };
};

// Create a sandbox public token (for development)
export const createSandboxToken = async (itemId?: number) => {
    const response = await api.post("api/plaid/create-sandbox-token", {
        itemId: itemId ?? null,
    });
    return response.data as {
        success: boolean;
        data: {
            publicToken: string;
        }
    };
};

// Exchange a Plaid public token for a persistent access token
export const exchangePublicToken = async (publicToken: string) => {
    const response = await api.post("api/plaid/exchange-token", { publicToken });
    return response.data as {
        success: boolean;
        message: string;
        data: {
            itemId: string;
            institutionName: string;
        }
    };
};

// Fetch all connected accounts for the authenticated user
export const getAccounts = async () => {
    const response = await api.get("api/plaid/accounts");
    return response.data as {
        success: boolean;
        count: number;
        data: PlaidAccount[]
    };
};

// Remove (disconnect) a plaid item by its local DB id
export const removeItem = async (itemId: number) => {
    const response = await api.delete(`api/plaid/items/${itemId}`);
    return response.data as {
        success: boolean;
        message: string;
    };
};

