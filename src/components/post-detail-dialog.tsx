"use client";

import type React from "react";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Heart,
    MessageCircle,
    Bookmark,
    Share2,
    Crown,
    Shield,
    User,
    Send,
} from "lucide-react";
import { usePost } from "@/hooks/use-posts";
import { useAuth } from "@/hooks/use-auth";
import { formatDistanceToNow } from "date-fns";

interface PostDetailDialogProps {
    postId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
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

export function PostDetailDialog({
    postId,
    open,
    onOpenChange,
}: PostDetailDialogProps) {
    const { user } = useAuth();
    const { post, comments, addComment } = usePost(postId || "");
    const [commentText, setCommentText] = useState("");

    if (!postId || !post) return null;

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !commentText.trim()) return;

        addComment({
            postId: post.id,
            authorId: user.id,
            author: {
                id: user.id,
                name: user.name,
                username: user.email.split("@")[0],
                role: user.role.toUpperCase() as
                    | "PASTOR"
                    | "DEACON"
                    | "MOD"
                    | "MEMBER",
                avatar: user.avatar,
            },
            body: commentText.trim(),
        });

        setCommentText("");
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const RoleIcon = roleIcons[post.author.role];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl bg-card border-border max-h-[90vh] overflow-y-auto">
                <div className="space-y-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={
                                        post.author.avatar || "/placeholder.svg"
                                    }
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

                    {/* Post Content */}
                    <div>
                        <h1 className="font-serif text-2xl font-semibold text-foreground mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                            {post.body}
                        </div>
                    </div>

                    {/* Event Details */}
                    {post.type === "EVENT" &&
                        (post.eventDate || post.location) && (
                            <div className="bg-muted/50 p-4 rounded-lg">
                                {post.eventDate && (
                                    <p className="text-sm text-foreground">
                                        <strong>Date:</strong>{" "}
                                        {post.eventDate.toLocaleDateString()} at{" "}
                                        {post.eventDate.toLocaleTimeString()}
                                    </p>
                                )}
                                {post.location && (
                                    <p className="text-sm text-foreground">
                                        <strong>Location:</strong>{" "}
                                        {post.location}
                                    </p>
                                )}
                            </div>
                        )}

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-primary"
                            >
                                <Heart className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                    {post.amenCount} Amen
                                </span>
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <MessageCircle className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                    {post.commentCount}
                                </span>
                            </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg font-semibold">
                            Comments
                        </h3>

                        {/* Add Comment Form */}
                        {user && (
                            <form
                                onSubmit={handleAddComment}
                                className="space-y-3"
                            >
                                <Textarea
                                    value={commentText}
                                    onChange={(e) =>
                                        setCommentText(e.target.value)
                                    }
                                    placeholder="Share your thoughts..."
                                    className="bg-background"
                                />
                                <Button
                                    type="submit"
                                    disabled={!commentText.trim()}
                                    size="sm"
                                >
                                    <Send className="h-4 w-4 mr-2" />
                                    Comment
                                </Button>
                            </form>
                        )}

                        {/* Comments List */}
                        <div className="space-y-4">
                            {comments.map((comment) => {
                                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                const CommentRoleIcon =
                                    roleIcons[comment.author.role];
                                return (
                                    <div
                                        key={comment.id}
                                        className="bg-muted/30 p-4 rounded-lg"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={
                                                        comment.author.avatar ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={comment.author.name}
                                                />
                                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                                    {comment.author.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-medium text-sm">
                                                        {comment.author.name}
                                                    </span>
                                                    <Badge
                                                        className={`text-xs ${
                                                            roleColors[
                                                                comment.author
                                                                    .role
                                                            ]
                                                        }`}
                                                    >
                                                        {comment.author.role.toLowerCase()}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatDistanceToNow(
                                                            comment.createdAt,
                                                            { addSuffix: true }
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-foreground leading-relaxed">
                                                    {comment.body}
                                                </p>

                                                <div className="flex items-center space-x-2 mt-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-xs text-muted-foreground hover:text-primary"
                                                    >
                                                        <Heart className="h-3 w-3 mr-1" />
                                                        {comment.amenCount}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
