"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { usePosts } from "@/hooks/use-posts"

interface CreateSermonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sermonTopics = [
  "faith",
  "love",
  "hope",
  "grace",
  "forgiveness",
  "salvation",
  "discipleship",
  "prayer",
  "worship",
  "service",
  "community",
  "family",
  "stewardship",
  "evangelism",
  "series",
]

export function CreateSermonDialog({ open, onOpenChange }: CreateSermonDialogProps) {
  const { user } = useAuth()
  const { createPost } = usePosts()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [scripture, setScripture] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !title.trim() || !body.trim()) return

    const postData = {
      title: title.trim(),
      body: body.trim() + (scripture ? `\n\nScripture: ${scripture}` : ""),
      type: "SERMON" as const,
      authorId: user.id,
      author: {
        id: user.id,
        name: user.name,
        username: user.email.split("@")[0],
        role: user.role.toUpperCase() as "PASTOR" | "DEACON" | "MOD" | "MEMBER",
        avatar: user.avatar,
      },
      tags: selectedTags,
    }

    createPost(postData)

    // Reset form
    setTitle("")
    setBody("")
    setScripture("")
    setSelectedTags([])
    onOpenChange(false)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Share a Sermon
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sermon-title">Sermon Title</Label>
            <Input
              id="sermon-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's the title of your sermon?"
              className="bg-background"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sermon-scripture">Scripture Reference</Label>
            <Input
              id="sermon-scripture"
              value={scripture}
              onChange={(e) => setScripture(e.target.value)}
              placeholder="e.g., Matthew 5:1-12, Romans 8:28"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sermon-content">Sermon Summary</Label>
            <Textarea
              id="sermon-content"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share the key points, main message, or full transcript of your sermon..."
              className="bg-background min-h-40"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Sermon Topics</Label>
            <div className="flex flex-wrap gap-2">
              {sermonTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTags.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleTag(topic)}
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !body.trim()}>
              <BookOpen className="h-4 w-4 mr-2" />
              Share Sermon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
