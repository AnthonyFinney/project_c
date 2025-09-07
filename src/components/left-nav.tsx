"use client";

import { Home, BookOpen, Calendar, Heart, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Sermons", href: "/sermons" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: Heart, label: "Prayer Wall", href: "/prayer" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

export function LeftNav() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <nav className="sticky top-24 space-y-2">
            <div className="fresco-card p-4">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                    Navigation
                </h3>

                <div className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Button
                                key={item.href}
                                variant="ghost"
                                onClick={() => router.push(item.href)}
                                className={`w-full justify-start ${
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                                }`}
                            >
                                <Icon className="h-4 w-4 mr-3" />
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Illuminated Divider */}
            <div className="flex justify-center py-4">
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
        </nav>
    );
}
