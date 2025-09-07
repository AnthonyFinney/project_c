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
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePosts } from "@/hooks/use-posts";

interface CreateEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const eventCategories = [
    "worship",
    "fellowship",
    "outreach",
    "youth",
    "children",
    "seniors",
    "bible-study",
    "prayer",
    "service",
    "community",
];

export function CreateEventDialog({
    open,
    onOpenChange,
}: CreateEventDialogProps) {
    const { user } = useAuth();
    const { createPost } = usePosts();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [location, setLocation] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !title.trim() || !body.trim() || !eventDate) return;

        const postData = {
            title: title.trim(),
            body: body.trim(),
            type: "EVENT" as const,
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
            tags: selectedTags,
            eventDate: new Date(eventDate),
            location: location.trim() || undefined,
        };

        createPost(postData);

        // Reset form
        setTitle("");
        setBody("");
        setEventDate("");
        setLocation("");
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
                        <Calendar className="h-5 w-5 text-primary" />
                        Create Church Event
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input
                            id="event-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's the name of your event?"
                            className="bg-background"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="event-description">Description</Label>
                        <Textarea
                            id="event-description"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Describe your event, what to expect, and any important details..."
                            className="bg-background min-h-32"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="event-date">Date & Time</Label>
                            <Input
                                id="event-date"
                                type="datetime-local"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="bg-background"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="event-location">Location</Label>
                            <Input
                                id="event-location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Where will this event take place?"
                                className="bg-background"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label>Event Categories</Label>
                        <div className="flex flex-wrap gap-2">
                            {eventCategories.map((category) => (
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
                            disabled={
                                !title.trim() || !body.trim() || !eventDate
                            }
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Create Event
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
