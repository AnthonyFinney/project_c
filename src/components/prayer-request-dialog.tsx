"use client";

import type React from "react";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";

interface PrayerRequestDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const prayerCategories = [
    "healing",
    "family",
    "work",
    "finances",
    "relationships",
    "guidance",
    "protection",
    "salvation",
    "church",
    "community",
];

export function PrayerRequestDialog({
    open,
    onOpenChange,
}: PrayerRequestDialogProps) {
    const { user } = useAuth();
    const { createPost } = usePosts();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [isUrgent, setIsUrgent] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !title.trim() || !body.trim()) return;

        const tags = [...selectedTags];
        if (isUrgent) tags.push("urgent");

        const postData = {
            title: title.trim(),
            body: body.trim(),
            type: "PRAYER" as const,
            authorId: user.id,
            author: {
                id: user.id,
                name: isAnonymous ? "Anonymous" : user.name,
                username: isAnonymous ? "anonymous" : user.email.split("@")[0],
                role: user.role.toUpperCase() as
                    | "PASTOR"
                    | "DEACON"
                    | "MOD"
                    | "MEMBER",
                avatar: isAnonymous ? undefined : user.avatar,
            },
            tags,
        };

        createPost(postData);

        // Reset form
        setTitle("");
        setBody("");
        setIsUrgent(false);
        setIsAnonymous(false);
        setSelectedTags([]);
        onOpenChange(false);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-serif text-xl flex items-center gap-2">
                        <Heart className="h-5 w-5 text-primary" />
                        Share a Prayer Request
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm text-foreground leading-relaxed">
                            "Cast all your anxiety on him because he cares for
                            you." - 1 Peter 5:7
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prayer-title">
                            Prayer Request Title
                        </Label>
                        <Input
                            id="prayer-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What can we pray for?"
                            className="bg-background"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="prayer-body">Details</Label>
                        <Textarea
                            id="prayer-body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Share more details about your prayer request. Our church family is here to support you."
                            className="bg-background min-h-32"
                            required
                        />
                    </div>

                    <div className="space-y-4">
                        <Label>Prayer Categories</Label>
                        <div className="flex flex-wrap gap-2">
                            {prayerCategories.map((category) => (
                                <Badge
                                    key={category}
                                    variant={
                                        selectedTags.includes(category)
                                            ? "default"
                                            : "outline"
                                    }
                                    className="cursor-pointer hover:bg-primary/10"
                                    onClick={() => toggleTag(category)}
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="urgent"
                                checked={isUrgent}
                                onCheckedChange={(checked) =>
                                    setIsUrgent(!!checked)
                                }
                            />
                            <Label htmlFor="urgent" className="text-sm">
                                This is an urgent prayer request
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="anonymous"
                                checked={isAnonymous}
                                onCheckedChange={(checked) =>
                                    setIsAnonymous(!!checked)
                                }
                            />
                            <Label htmlFor="anonymous" className="text-sm">
                                Post anonymously
                            </Label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={!title.trim() || !body.trim()}
                        >
                            <Heart className="h-4 w-4 mr-2" />
                            Share Prayer Request
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
