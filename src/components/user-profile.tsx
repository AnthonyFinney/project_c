"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Crown, Shield, Calendar, CheckCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { User as AuthUser } from "@/lib/auth"

interface UserProfileProps {
  user: AuthUser
}

const roleIcons = {
  pastor: Crown,
  admin: Crown,
  deacon: Shield,
  mod: Shield,
  member: Shield,
}

const roleColors = {
  pastor: "bg-primary text-primary-foreground",
  admin: "bg-primary text-primary-foreground",
  deacon: "bg-secondary text-secondary-foreground",
  mod: "bg-accent text-accent-foreground",
  member: "bg-muted text-muted-foreground",
}

export function UserProfile({ user }: UserProfileProps) {
  const RoleIcon = roleIcons[user.role as keyof typeof roleIcons] || Shield

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start space-x-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="font-serif text-2xl font-bold text-foreground">{user.name}</h2>
            {user.isVerified && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <Badge className={`${roleColors[user.role as keyof typeof roleColors]} flex items-center gap-1`}>
              <RoleIcon className="h-3 w-3" />
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Joined {formatDistanceToNow(user.joinDate, { addSuffix: true })}</span>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="font-serif text-2xl font-bold text-foreground">12</div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="font-serif text-2xl font-bold text-foreground">48</div>
          <div className="text-sm text-muted-foreground">Comments</div>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="font-serif text-2xl font-bold text-foreground">156</div>
          <div className="text-sm text-muted-foreground">Amens Given</div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2">About</h3>
        <p className="text-foreground leading-relaxed">
          Blessed to be part of this wonderful church family. Passionate about serving God and our community through
          love and fellowship.
        </p>
      </div>
    </div>
  )
}
