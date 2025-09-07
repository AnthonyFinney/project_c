"use client";

import type React from "react";

import { Play, BookOpen, Heart, MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/lib/posts";

interface SermonCardProps {
    post: Post;
    onOpen: () => void;
}

export function SermonCard({ post, onOpen }: SermonCardProps) {
    const { user } = useAuth();
    const { toggleAmen } = usePosts();

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (user) {
            toggleAmen(post.id, user.id);
        }
    };

    const isLiked = user ? post.amenedBy.includes(user.id) : false;

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
                            <Badge className="bg-primary text-primary-foreground text-xs">
                                pastor
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {formatDistanceToNow(post.createdAt, {
                                addSuffix: true,
                            })}
                        </p>
                    </div>
                </div>

                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Sermon
                </Badge>
            </div>

            {/* Sermon Content */}
            <div className="mb-4">
                <h2 className="font-serif text-xl font-semibold text-foreground mb-2 leading-tight">
                    {post.title}
                </h2>
                <div className="drop-cap text-foreground leading-relaxed line-clamp-3">
                    {post.body}
                </div>
            </div>

            {/* Sermon Details */}
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-foreground">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        <span>45 minutes</span>
                    </div>
                    <div className="flex items-center text-foreground">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        <span>Scripture: Matthew 5:1-12</span>
                    </div>
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

            {/* Sermon Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={`${
                            isLiked
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                    >
                        <Heart
                            className={`h-4 w-4 mr-1 ${
                                isLiked ? "fill-current" : ""
                            }`}
                        />
                        <span className="text-sm">{post.amenCount}</span>
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

                <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Play className="h-4 w-4 mr-2" />
                    Listen
                </Button>
            </div>
        </article>
    );
}
