"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { LeftNav } from "@/components/left-nav"
import { RightRail } from "@/components/right-rail"
import { PrayerWall } from "@/components/prayer-wall"
import { PrayerRequestDialog } from "@/components/prayer-request-dialog"
import { Button } from "@/components/ui/button"
import { Plus, Heart } from "lucide-react"

export default function PrayerPage() {
  const [showCreatePrayer, setShowCreatePrayer] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftNav />
          </aside>

          {/* Main Prayer Wall */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {/* Prayer Wall Header */}
              <div className="fresco-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="font-serif text-2xl font-bold text-foreground">Prayer Wall</h1>
                      <p className="text-muted-foreground">Share your prayer requests with our fellowship</p>
                    </div>
                  </div>
                  <Button onClick={() => setShowCreatePrayer(true)} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Prayer
                  </Button>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed">
                    "Therefore confess your sins to each other and pray for each other so that you may be healed. The
                    prayer of a righteous person is powerful and effective." - James 5:16
                  </p>
                </div>
              </div>

              {/* Prayer Requests Feed */}
              <PrayerWall />
            </div>
          </main>

          {/* Right Rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightRail />
          </aside>
        </div>
      </div>

      <PrayerRequestDialog open={showCreatePrayer} onOpenChange={setShowCreatePrayer} />
    </div>
  )
}
