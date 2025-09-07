"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePosts } from "@/hooks/use-posts"

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { posts } = usePosts("events")

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsForDate = (date: number) => {
    const targetDate = new Date(year, month, date)
    return posts.filter((post) => {
      if (!post.eventDate) return false
      const eventDate = new Date(post.eventDate)
      return eventDate.toDateString() === targetDate.toDateString()
    })
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-2"></div>)
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const events = getEventsForDate(date)
      const isToday = new Date().toDateString() === new Date(year, month, date).toDateString()

      days.push(
        <div key={date} className={`h-24 p-2 border border-border ${isToday ? "bg-primary/5" : ""}`}>
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-primary" : "text-foreground"}`}>{date}</div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event) => (
              <Badge key={event.id} variant="secondary" className="text-xs block truncate">
                {event.title}
              </Badge>
            ))}
            {events.length > 2 && <div className="text-xs text-muted-foreground">+{events.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="fresco-card p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="bg-muted p-3 text-center text-sm font-medium text-muted-foreground border-b border-border"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {renderCalendarDays()}
      </div>
    </div>
  )
}
