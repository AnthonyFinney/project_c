"use client"

import { useState } from "react"
import { usePosts } from "@/hooks/use-posts"
import { PrayerCard } from "./prayer-card"
import { PostDetailDialog } from "./post-detail-dialog"
import { Button } from "@/components/ui/button"

const prayerFilters = [
  { id: "all", label: "All Prayers" },
  { id: "urgent", label: "Urgent" },
  { id: "answered", label: "Answered" },
  { id: "ongoing", label: "Ongoing" },
]

export function PrayerWall() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const { posts, isLoading } = usePosts("prayers")

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true
    if (activeFilter === "urgent") return post.tags.includes("urgent")
    if (activeFilter === "answered") return post.isAnswered
    if (activeFilter === "ongoing") return !post.isAnswered && !post.tags.includes("urgent")
    return true
  })

  return (
    <>
      {/* Prayer Filters */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {prayerFilters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "ghost"}
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

      {/* Prayer Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading prayers...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No prayer requests found. Be the first to share a prayer need.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PrayerCard key={post.id} post={post} onOpen={() => setSelectedPostId(post.id)} />
          ))
        )}
      </div>

      <PostDetailDialog
        postId={selectedPostId}
        open={!!selectedPostId}
        onOpenChange={(open) => !open && setSelectedPostId(null)}
      />
    </>
  )
}
