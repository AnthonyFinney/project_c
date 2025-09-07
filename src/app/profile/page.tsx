"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { LeftNav } from "@/components/left-nav";
import { RightRail } from "@/components/right-rail";
import { UserProfile } from "@/components/user-profile";
import { UserPosts } from "@/components/user-posts";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth();
    const [showEditProfile, setShowEditProfile] = useState(false);

    if (!isAuthenticated || !user) {
        return (
            <div className="min-h-screen bg-background">
                <AppHeader />
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">
                            Please sign in to view your profile.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <AppHeader />

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Navigation */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <LeftNav />
                    </aside>

                    {/* Main Profile Content */}
                    <main className="lg:col-span-6">
                        <div className="space-y-6">
                            {/* Profile Header */}
                            <div className="fresco-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h1 className="font-serif text-2xl font-bold text-foreground">
                                        My Profile
                                    </h1>
                                    <Button
                                        onClick={() => setShowEditProfile(true)}
                                        variant="outline"
                                    >
                                        <Settings className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </div>
                                <UserProfile user={user} />
                            </div>

                            {/* User's Posts */}
                            <UserPosts userId={user.id} />
                        </div>
                    </main>

                    {/* Right Rail */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <RightRail />
                    </aside>
                </div>
            </div>

            <EditProfileDialog
                open={showEditProfile}
                onOpenChange={setShowEditProfile}
            />
        </div>
    );
}
