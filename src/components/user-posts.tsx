"use client";

import { useState } from "react";
import { usePosts } from "@/hooks/use-posts";
import { FrescoPostCard } from "./fresco-post-card";
import { PostDetailDialog } from "./post-detail-dialog";
import { Button } from "@/components/ui/button";

interface UserPostsProps {
    userId: string;
}

const postFilters = [
    { id: "all", label: "All Posts" },
    { id: "discussions", label: "Discussions" },
    { id: "prayers", label: "Prayers" },
    { id: "events", label: "Events" },
];

export function UserPosts({ userId }: UserPostsProps) {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const { posts, isLoading } = usePosts();

    const userPosts = posts.filter((post) => post.authorId === userId);

    const filteredPosts = userPosts.filter((post) => {
        switch (activeFilter) {
            case "all":
                return true;
            case "discussions":
                return post.type === "DISCUSSION" || post.type === "TESTIMONY";
            case "prayers":
                return post.type === "PRAYER";
            case "events":
                return post.type === "EVENT" || post.type === "SERMON";
            default:
                return true;
        }
    });

    return (
        <>
            <div className="fresco-card p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                    My Posts
                </h3>

                {/* Post Filters */}
                <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-6">
                    {postFilters.map((filter) => (
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

                {/* Posts List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-8 text-muted-foreground">
                            Loading posts...
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No posts found. Start sharing with the community!
                        </div>
                    ) : (
                        filteredPosts.map((post) => (
                            <FrescoPostCard
                                key={post.id}
                                post={post}
                                onOpen={() => setSelectedPostId(post.id)}
                            />
                        ))
                    )}
                </div>
            </div>

            <PostDetailDialog
                postId={selectedPostId}
                open={!!selectedPostId}
                onOpenChange={(open) => !open && setSelectedPostId(null)}
            />
        </>
    );
}
