"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { LeftNav } from "@/components/left-nav"
import { RightRail } from "@/components/right-rail"
import { EventsCalendar } from "@/components/events-calendar"
import { EventsList } from "@/components/events-list"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, List } from "lucide-react"

export default function EventsPage() {
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list")

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftNav />
          </aside>

          {/* Main Events Content */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              {/* Events Header */}
              <div className="fresco-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="font-serif text-2xl font-bold text-foreground">Church Events</h1>
                      <p className="text-muted-foreground">Stay connected with our fellowship activities</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex bg-muted p-1 rounded-lg">
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === "calendar" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("calendar")}
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button onClick={() => setShowCreateEvent(true)} className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm text-foreground leading-relaxed">
                    "And let us consider how we may spur one another on toward love and good deeds, not giving up
                    meeting together, as some are in the habit of doing, but encouraging one another." - Hebrews
                    10:24-25
                  </p>
                </div>
              </div>

              {/* Events Content */}
              {viewMode === "calendar" ? <EventsCalendar /> : <EventsList />}
            </div>
          </main>

          {/* Right Rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightRail />
          </aside>
        </div>
      </div>

      <CreateEventDialog open={showCreateEvent} onOpenChange={setShowCreateEvent} />
    </div>
  )
}
