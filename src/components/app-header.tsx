"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMenu } from "./user-menu";
import { CreatePostDialog } from "./create-post-dialog";
import { MobileNav } from "./mobile-nav";
import { useState } from "react";

export function AppHeader() {
    const [showCreatePost, setShowCreatePost] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Left section - Logo and title */}
                        <div className="flex items-center space-x-4">
                            <MobileNav />

                            <div className="flex items-center space-x-3">
                                {/* Church Crest/Logo */}
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-primary-foreground rounded-full" />
                                </div>
                                <h1 className="font-serif text-xl font-bold text-foreground hidden sm:block">
                                    Fellowship
                                </h1>
                            </div>
                        </div>

                        {/* Center section - Search */}
                        <div className="flex-1 max-w-md mx-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search discussions, prayers, sermons..."
                                    className="pl-10 bg-background"
                                />
                            </div>
                        </div>

                        {/* Right section - Actions */}
                        <div className="flex items-center space-x-2">
                            <Button
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                onClick={() => setShowCreatePost(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">
                                    Create Post
                                </span>
                            </Button>

                            <UserMenu />
                        </div>
                    </div>
                </div>

                {/* Arch bottom decoration */}
                <div className="h-3 bg-primary/10 arch-bottom" />
            </header>

            <CreatePostDialog
                open={showCreatePost}
                onOpenChange={setShowCreatePost}
            />
        </>
    );
}
