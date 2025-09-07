"use client"

import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import type { Post } from "@/lib/posts"

interface EventCardProps {
  post: Post
  onOpen: () => void
}

export function EventCard({ post, onOpen }: EventCardProps) {
  const isUpcoming = post.eventDate && post.eventDate > new Date()
  const isPast = post.eventDate && post.eventDate < new Date()

  return (
    <article className="fresco-card p-6 hover:shadow-xl transition-shadow duration-200 cursor-pointer" onClick={onOpen}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {post.author.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-foreground">{post.author.name}</span>
              {post.author.role === "PASTOR" && (
                <Badge className="bg-primary text-primary-foreground text-xs">pastor</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Posted {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isUpcoming && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Calendar className="h-3 w-3 mr-1" />
              Upcoming
            </Badge>
          )}
          {isPast && (
            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
              <Clock className="h-3 w-3 mr-1" />
              Past Event
            </Badge>
          )}
        </div>
      </div>

      {/* Event Content */}
      <div className="mb-4">
        <h2 className="font-serif text-xl font-semibold text-foreground mb-2 leading-tight">{post.title}</h2>
        <div className="text-foreground leading-relaxed line-clamp-2">{post.body}</div>
      </div>

      {/* Event Details */}
      {(post.eventDate || post.location) && (
        <div className="bg-muted/30 p-4 rounded-lg mb-4 space-y-2">
          {post.eventDate && (
            <div className="flex items-center text-sm text-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">
                {post.eventDate.toLocaleDateString()} at {post.eventDate.toLocaleTimeString()}
              </span>
            </div>
          )}
          {post.location && (
            <div className="flex items-center text-sm text-foreground">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{post.location}</span>
            </div>
          )}
        </div>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Event Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
            <Users className="h-4 w-4 mr-1" />
            <span className="text-sm">{post.amenCount} Interested</span>
          </Button>
        </div>

        {isUpcoming && (
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            RSVP
          </Button>
        )}
      </div>
    </article>
  )
}
