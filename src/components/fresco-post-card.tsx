"use client";

import type React from "react";

import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    Crown,
    Shield,
    User,
    Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/posts";
import Image from "next/image";

interface FrescoPostCardProps {
    post: Post;
    onOpen: () => void;
}

const roleIcons = {
    PASTOR: Crown,
    DEACON: Shield,
    MOD: Shield,
    MEMBER: User,
};

const roleColors = {
    PASTOR: "bg-primary text-primary-foreground",
    DEACON: "bg-secondary text-secondary-foreground",
    MOD: "bg-accent text-accent-foreground",
    MEMBER: "bg-muted text-muted-foreground",
};

const postTypeColors = {
    DISCUSSION: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    PRAYER: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    EVENT: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    SERMON: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    TESTIMONY: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
};

export function FrescoPostCard({ post, onOpen }: FrescoPostCardProps) {
    const { user } = useAuth();
    const { toggleAmen, toggleBookmark } = usePosts();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const RoleIcon = roleIcons[post.author.role];

    const handleAmen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleAmen(post.id, user.id);
        }
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleBookmark(post.id, user.id);
        }
    };

    const isAmened = user ? post.amenedBy.includes(user.id) : false;
    const isBookmarked = user ? post.bookmarkedBy.includes(user.id) : false;

    return (
        <article
            className="fresco-card p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer"
            onClick={onOpen}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={post.author.avatar || "/placeholder.svg"}
                            alt={post.author.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                            {post.author.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">
                                {post.author.name}
                            </span>
                            <Badge
                                className={`text-xs ${
                                    roleColors[post.author.role]
                                }`}
                            >
                                {post.author.role.toLowerCase()}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            @{post.author.username} ·{" "}
                            {formatDistanceToNow(post.createdAt, {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                </div>

                <Badge className={`${postTypeColors[post.type]}`}>
                    {post.type.toLowerCase()}
                </Badge>
            </div>

            {/* Content */}
            <div className="mb-4">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2 leading-tight">
                    {post.title}
                </h2>
                <div className="drop-cap text-foreground leading-relaxed line-clamp-3">
                    {post.body}
                </div>
            </div>

            {post.mediaType && post.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden border border-border">
                    {post.mediaType === "image" ? (
                        <div className="relative w-full max-h-96 h-auto">
                            <Image
                                src={post.mediaUrl || "/placeholder.svg"}
                                alt="Post media"
                                width={800} // set a width/height or use fill
                                height={600}
                                className="w-full h-auto max-h-96 object-cover"
                                unoptimized // important if mediaUrl is blob/object
                            />
                        </div>
                    ) : post.mediaType === "video" ? (
                        <div className="relative">
                            <video
                                src={post.mediaUrl}
                                poster={post.mediaThumbnail}
                                controls
                                className="w-full h-auto max-h-96 object-cover"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="bg-black/50 rounded-full p-3">
                                    <Play className="h-8 w-8 text-white fill-current" />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}

            {/* Event Details */}
            {post.type === "EVENT" && (post.eventDate || post.location) && (
                <div className="bg-muted/50 p-3 rounded-lg mb-4 text-sm">
                    {post.eventDate && (
                        <p className="text-foreground">
                            📅 {post.eventDate.toLocaleDateString()} at{" "}
                            {post.eventDate.toLocaleTimeString()}
                        </p>
                    )}
                    {post.location && (
                        <p className="text-foreground">📍 {post.location}</p>
                    )}
                </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleAmen}
                        className={`${
                            isAmened
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                    >
                        <Heart
                            className={`h-4 w-4 mr-1 ${
                                isAmened ? "fill-current" : ""
                            }`}
                        />
                        <span className="text-sm">{post.amenCount} Amen</span>
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpen();
                        }}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span className="text-sm">{post.commentCount}</span>
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBookmark}
                        className={`${
                            isBookmarked
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        <Bookmark
                            className={`h-4 w-4 ${
                                isBookmarked ? "fill-current" : ""
                            }`}
                        />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </article>
    );
}
