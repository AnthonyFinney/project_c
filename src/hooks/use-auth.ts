"use client";

import { useState, useEffect } from "react";
import { authService, type User, type AuthState } from "@/lib/auth";

export function useAuth(): AuthState & {
    signIn: (
        email: string,
        password: string
    ) => Promise<{ success: boolean; error?: string }>;
    signUp: (
        email: string,
        password: string,
        name: string
    ) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
} {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize with current user
        setUser(authService.getCurrentUser());
        setIsLoading(false);

        // Subscribe to auth changes
        const unsubscribe = authService.subscribe((newUser) => {
            setUser(newUser);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        const result = await authService.signIn(email, password);
        setIsLoading(false);
        return result;
    };

    const signUp = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        const result = await authService.signUp(email, password, name);
        setIsLoading(false);
        return result;
    };

    const signOut = () => {
        authService.signOut();
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
    };
}
