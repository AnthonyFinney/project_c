"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Crown, Shield, User, Trash2, Edit, Ban } from "lucide-react"
import { usePosts } from "@/hooks/use-posts"

export function AdminPanel() {
  const { posts } = usePosts()
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data for admin management
  const mockUsers = [
    {
      id: "1",
      name: "John Smith",
      email: "john@church.com",
      role: "member",
      joinDate: new Date("2023-01-15"),
      isVerified: true,
      postsCount: 12,
    },
    {
      id: "2",
      name: "Pastor Michael",
      email: "pastor@church.com",
      role: "pastor",
      joinDate: new Date("2020-06-01"),
      isVerified: true,
      postsCount: 45,
    },
    {
      id: "3",
      name: "Sarah Johnson",
      email: "sarah@church.com",
      role: "deacon",
      joinDate: new Date("2022-03-10"),
      isVerified: true,
      postsCount: 28,
    },
  ]

  const roleIcons = {
    pastor: Crown,
    admin: Crown,
    deacon: Shield,
    mod: Shield,
    member: User,
  }

  const roleColors = {
    pastor: "bg-primary text-primary-foreground",
    admin: "bg-primary text-primary-foreground",
    deacon: "bg-secondary text-secondary-foreground",
    mod: "bg-accent text-accent-foreground",
    member: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-semibold text-foreground">Admin Panel</h3>
        <Badge className="bg-primary text-primary-foreground">
          <Crown className="h-3 w-3 mr-1" />
          Administrator
        </Badge>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="settings">Church Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user-search">Search Users</Label>
            <Input
              id="user-search"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-3">
            {mockUsers.map((user) => {
              const RoleIcon = roleIcons[user.role as keyof typeof roleIcons]
              return (
                <div key={user.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{user.name}</span>
                        <Badge className={`text-xs ${roleColors[user.role as keyof typeof roleColors]}`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.postsCount} posts</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Recent Posts Requiring Review</h4>

            <div className="space-y-3">
              {posts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">{post.author.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.type.toLowerCase()}
                      </Badge>
                    </div>
                    <h5 className="font-medium text-foreground mb-1">{post.title}</h5>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="church-name">Church Name</Label>
              <Input id="church-name" defaultValue="Renaissance Fellowship" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="church-address">Church Address</Label>
              <Input id="church-address" placeholder="123 Church Street, City, State 12345" className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pastor-name">Lead Pastor</Label>
              <Input id="pastor-name" defaultValue="Pastor Michael" className="bg-background" />
            </div>

            <Button>Save Church Settings</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
