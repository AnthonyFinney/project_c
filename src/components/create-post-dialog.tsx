"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, ImageIcon, Video } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { usePosts } from "@/hooks/use-posts"

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { user } = useAuth()
  const { createPost } = usePosts()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [type, setType] = useState<"DISCUSSION" | "PRAYER" | "EVENT" | "SERMON" | "TESTIMONY">("DISCUSSION")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [location, setLocation] = useState("")
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaPreview, setMediaPreview] = useState<string | null>(null)

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const file = e.target.files?.[0]
    if (file) {
      setMediaFile(file)
      setMediaType(type)

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setMediaPreview(previewUrl)
    }
  }

  const removeMedia = () => {
    if (mediaPreview) {
      URL.revokeObjectURL(mediaPreview)
    }
    setMediaFile(null)
    setMediaType(null)
    setMediaPreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !body.trim()) return

    const postData = {
      title: title.trim(),
      body: body.trim(),
      type,
      authorId: user.id,
      author: {
        id: user.id,
        name: user.name,
        username: user.email.split("@")[0],
        role: user.role.toUpperCase() as "PASTOR" | "DEACON" | "MOD" | "MEMBER",
        avatar: user.avatar,
      },
      tags,
      ...(type === "EVENT" && eventDate && { eventDate: new Date(eventDate) }),
      ...(type === "EVENT" && location && { location }),
      ...(mediaType &&
        mediaPreview && {
          mediaType,
          mediaUrl: mediaPreview,
          mediaThumbnail: mediaPreview,
        }),
    }

    createPost(postData)

    // Reset form
    setTitle("")
    setBody("")
    setType("DISCUSSION")
    setTags([])
    setTagInput("")
    setEventDate("")
    setLocation("")
    removeMedia()
    onOpenChange(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Share with the Fellowship</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="post-type">Post Type</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger className="bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DISCUSSION">Discussion</SelectItem>
                <SelectItem value="PRAYER">Prayer Request</SelectItem>
                <SelectItem value="EVENT">Event</SelectItem>
                <SelectItem value="SERMON">Sermon</SelectItem>
                <SelectItem value="TESTIMONY">Testimony</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-title">Title</Label>
            <Input
              id="post-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to share?"
              className="bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-body">Message</Label>
            <Textarea
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts, prayer request, or testimony..."
              className="bg-background min-h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Add Media (Optional)</Label>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMediaUpload(e, "image")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ImageIcon className="h-4 w-4" />
                  Add Image
                </Button>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleMediaUpload(e, "video")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="video-upload"
                />
                <Button type="button" variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Video className="h-4 w-4" />
                  Add Video
                </Button>
              </div>
            </div>

            {/* Media Preview */}
            {mediaPreview && (
              <div className="relative border rounded-lg p-4 bg-background">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeMedia}
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                {mediaType === "image" ? (
                  <img
                    src={mediaPreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded"
                  />
                ) : (
                  <video src={mediaPreview} controls className="max-w-full h-auto max-h-48 rounded" />
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  {mediaType === "image" ? "Image" : "Video"} ready to share
                </p>
              </div>
            )}
          </div>

          {type === "EVENT" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="event-date">Event Date</Label>
                <Input
                  id="event-date"
                  type="datetime-local"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="bg-background"
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
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                className="bg-background"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !body.trim()}>
              Share Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
