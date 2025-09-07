"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { FeedTabs } from "@/components/feed-tabs"
import { FrescoPostCard } from "@/components/fresco-post-card"
import { RightRail } from "@/components/right-rail"
import { LeftNav } from "@/components/left-nav"
import { PostDetailDialog } from "@/components/post-detail-dialog"
import { usePosts } from "@/hooks/use-posts"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("latest")
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const { posts, isLoading } = usePosts(activeTab)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftNav />
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              <FeedTabs activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading posts...</div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No posts found.</div>
                ) : (
                  posts.map((post) => (
                    <FrescoPostCard key={post.id} post={post} onOpen={() => setSelectedPostId(post.id)} />
                  ))
                )}
              </div>
            </div>
          </main>

          {/* Right Rail - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightRail />
          </aside>
        </div>
      </div>

      <PostDetailDialog
        postId={selectedPostId}
        open={!!selectedPostId}
        onOpenChange={(open) => !open && setSelectedPostId(null)}
      />
    </div>
  )
}
