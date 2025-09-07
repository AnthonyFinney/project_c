"use client"
import { AppHeader } from "@/components/app-header"
import { LeftNav } from "@/components/left-nav"
import { RightRail } from "@/components/right-rail"
import { AdminPanel } from "@/components/admin-panel"
import { UserSettings } from "@/components/user-settings"
import { useAuth } from "@/hooks/use-auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Please sign in to access settings.</p>
          </div>
        </div>
      </div>
    )
  }

  const isAdmin = user.role === "pastor" || user.role === "admin"

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <LeftNav />
          </aside>

          {/* Main Settings Content */}
          <main className="lg:col-span-6">
            <div className="space-y-6">
              <div className="fresco-card p-6">
                <h1 className="font-serif text-2xl font-bold text-foreground mb-6">Settings</h1>

                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile Settings</TabsTrigger>
                    {isAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
                  </TabsList>

                  <TabsContent value="profile" className="mt-6">
                    <UserSettings />
                  </TabsContent>

                  {isAdmin && (
                    <TabsContent value="admin" className="mt-6">
                      <AdminPanel />
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </main>

          {/* Right Rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <RightRail />
          </aside>
        </div>
      </div>
    </div>
  )
}
