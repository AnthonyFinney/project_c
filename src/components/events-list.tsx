"use client"

import { useState } from "react"
import { usePosts } from "@/hooks/use-posts"
import { EventCard } from "./event-card"
import { PostDetailDialog } from "./post-detail-dialog"
import { Button } from "@/components/ui/button"

const eventFilters = [
  { id: "all", label: "All Events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "this-week", label: "This Week" },
  { id: "this-month", label: "This Month" },
]

export function EventsList() {
  const [activeFilter, setActiveFilter] = useState("upcoming")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const { posts, isLoading } = usePosts("events")

  const now = new Date()
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  const oneMonthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const filteredPosts = posts.filter((post) => {
    if (!post.eventDate) return false

    switch (activeFilter) {
      case "all":
        return true
      case "upcoming":
        return post.eventDate > now
      case "this-week":
        return post.eventDate > now && post.eventDate <= oneWeekFromNow
      case "this-month":
        return post.eventDate > now && post.eventDate <= oneMonthFromNow
      default:
        return true
    }
  })

  return (
    <>
      {/* Event Filters */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {eventFilters.map((filter) => (
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

      {/* Event Cards */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading events...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No events found for the selected filter.</div>
        ) : (
          filteredPosts.map((post) => <EventCard key={post.id} post={post} onOpen={() => setSelectedPostId(post.id)} />)
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
