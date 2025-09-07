export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: "member" | "admin" | "pastor";
    joinDate: Date;
    isVerified: boolean;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// Mock user data for demonstration
const mockUsers: User[] = [
    {
        id: "1",
        email: "john@church.com",
        name: "John Smith",
        avatar: "/church-member-portrait.jpg",
        role: "member",
        joinDate: new Date("2023-01-15"),
        isVerified: true,
    },
    {
        id: "2",
        email: "pastor@church.com",
        name: "Pastor Michael",
        avatar: "/pastor-portrait.png",
        role: "pastor",
        joinDate: new Date("2020-06-01"),
        isVerified: true,
    },
];

class AuthService {
    private currentUser: User | null = null;
    private listeners: ((user: User | null) => void)[] = [];

    constructor() {
        // Check for stored user on initialization
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("church_user");
            if (stored) {
                this.currentUser = JSON.parse(stored);
            }
        }
    }

    subscribe(listener: (user: User | null) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener(this.currentUser));
    }

    async signIn(
        email: string,
        password: string
    ): Promise<{ success: boolean; error?: string }> {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = mockUsers.find((u) => u.email === email);
        if (user && password === "password") {
            this.currentUser = user;
            if (typeof window !== "undefined") {
                localStorage.setItem("church_user", JSON.stringify(user));
            }
            this.notify();
            return { success: true };
        }

        return { success: false, error: "Invalid credentials" };
    }

    async signUp(
        email: string,
        password: string,
        name: string
    ): Promise<{ success: boolean; error?: string }> {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (mockUsers.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role: "member",
            joinDate: new Date(),
            isVerified: false,
        };

        mockUsers.push(newUser);
        this.currentUser = newUser;
        if (typeof window !== "undefined") {
            localStorage.setItem("church_user", JSON.stringify(newUser));
        }
        this.notify();
        return { success: true };
    }

    signOut() {
        this.currentUser = null;
        if (typeof window !== "undefined") {
            localStorage.removeItem("church_user");
        }
        this.notify();
    }

    getCurrentUser(): User | null {
        return this.currentUser;
    }
}

export const authService = new AuthService();
