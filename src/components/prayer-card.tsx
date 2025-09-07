"use client";

import type React from "react";

import {
    Heart,
    MessageCircle,
    Clock,
    CheckCircle,
    AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/posts";

interface PrayerCardProps {
    post: Post;
    onOpen: () => void;
}

export function PrayerCard({ post, onOpen }: PrayerCardProps) {
    const { user } = useAuth();
    const { toggleAmen } = usePosts();

    const handlePray = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleAmen(post.id, user.id);
        }
    };

    const isPraying = user ? post.amenedBy.includes(user.id) : false;
    const isUrgent = post.tags.includes("urgent");
    const isAnswered = post.isAnswered;

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
                            {post.author.role === "PASTOR" && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                    pastor
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(post.createdAt, {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {isAnswered && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Answered
                        </Badge>
                    )}
                    {isUrgent && !isAnswered && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgent
                        </Badge>
                    )}
                    {!isAnswered && !isUrgent && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Ongoing
                        </Badge>
                    )}
                </div>
            </div>

            {/* Prayer Content */}
            <div className="mb-4">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2 leading-tight">
                    {post.title}
                </h2>
                <div className="drop-cap text-foreground leading-relaxed line-clamp-3">
                    {post.body}
                </div>
            </div>

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

            {/* Prayer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePray}
                        className={`${
                            isPraying
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                    >
                        <Heart
                            className={`h-4 w-4 mr-1 ${
                                isPraying ? "fill-current" : ""
                            }`}
                        />
                        <span className="text-sm">
                            {post.amenCount} Praying
                        </span>
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
                        <span className="text-sm">
                            {post.commentCount} Responses
                        </span>
                    </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                    {isAnswered ? "Prayer answered" : "Please keep praying"}
                </div>
            </div>
        </article>
    );
}
