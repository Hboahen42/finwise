'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import api, {authApi} from "@/lib/api";

interface User {
    email: string;
    id: number;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // check if user is authenticated on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get("/api/users/me");
            setUser(response.data.user);
            router.push("/dashboard");
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await authApi.signIn({ email, password });
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            const response = await authApi.signUp({ name, email, password});
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        await authApi.signOut();
        setUser(null);
        router.push("/");
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within the AuthProvider");
    }
    return context;
}