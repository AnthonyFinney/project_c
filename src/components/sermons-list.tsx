"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/use-posts";
import { SermonCard } from "./sermon-card";
import { PostDetailDialog } from "./post-detail-dialog";
import { Button } from "@/components/ui/button";

const sermonFilters = [
    { id: "all", label: "All Sermons" },
    { id: "recent", label: "Recent" },
    { id: "series", label: "Series" },
    { id: "popular", label: "Most Listened" },
];

interface SermonsListProps {
    searchQuery: string;
}

export function SermonsList({ searchQuery }: SermonsListProps) {
    const [activeFilter, setActiveFilter] = useState("recent");
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const { posts, isLoading } = usePosts();

    const sermonPosts = posts.filter((post) => post.type === "SERMON");

    const filteredPosts = sermonPosts.filter((post) => {
        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                post.title.toLowerCase().includes(query) ||
                post.body.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query));
            if (!matchesSearch) return false;
        }

        // Apply category filter
        switch (activeFilter) {
            case "all":
                return true;
            case "recent":
                return true; // Already sorted by date
            case "series":
                return post.tags.includes("series");
            case "popular":
                return post.amenCount > 10;
            default:
                return true;
        }
    });

    return (
        <>
            {/* Sermon Filters */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                {sermonFilters.map((filter) => (
                    <Button
                        key={filter.id}
                        variant={
                            activeFilter === filter.id ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => setActiveFilter(filter.id)}
                        className={`flex-1 ${
                            activeFilter === filter.id
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {filter.label}
                    </Button>
                ))}
            </div>

            {/* Sermon Cards */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Loading sermons...
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        {searchQuery
                            ? "No sermons found matching your search."
                            : "No sermons found for the selected filter."}
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <SermonCard
                            key={post.id}
                            post={post}
                            onOpen={() => setSelectedPostId(post.id)}
                        />
                    ))
                )}
            </div>

            <PostDetailDialog
                postId={selectedPostId}
                open={!!selectedPostId}
                onOpenChange={(open) => !open && setSelectedPostId(null)}
            />
        </>
    );
}
