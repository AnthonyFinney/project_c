"use client";

import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { LeftNav } from "@/components/left-nav";
import { RightRail } from "@/components/right-rail";
import { SermonsList } from "@/components/sermons-list";
import { CreateSermonDialog } from "@/components/create-sermon-dialog";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SermonsPage() {
    const [showCreateSermon, setShowCreateSermon] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-background">
            <AppHeader />

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Navigation */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <LeftNav />
                    </aside>

                    {/* Main Sermons Content */}
                    <main className="lg:col-span-6">
                        <div className="space-y-6">
                            {/* Sermons Header */}
                            <div className="fresco-card p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                            <BookOpen className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h1 className="font-serif text-2xl font-bold text-foreground">
                                                Sermon Library
                                            </h1>
                                            <p className="text-muted-foreground">
                                                Messages from our pastoral team
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() =>
                                            setShowCreateSermon(true)
                                        }
                                        className="bg-primary hover:bg-primary/90"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Sermon
                                    </Button>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-lg mb-4">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        "All Scripture is God-breathed and is
                                        useful for teaching, rebuking,
                                        correcting and training in
                                        righteousness." - 2 Timothy 3:16
                                    </p>
                                </div>

                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search sermons by title, scripture, or topic..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10 bg-background"
                                    />
                                </div>
                            </div>

                            {/* Sermons List */}
                            <SermonsList searchQuery={searchQuery} />
                        </div>
                    </main>

                    {/* Right Rail */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <RightRail />
                    </aside>
                </div>
            </div>

            <CreateSermonDialog
                open={showCreateSermon}
                onOpenChange={setShowCreateSermon}
            />
        </div>
    );
}
