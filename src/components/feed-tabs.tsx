"use client"
import { Button } from "@/components/ui/button"

const tabs = [
  { id: "latest", label: "Latest" },
  { id: "top", label: "Top Amen'd" },
  { id: "prayers", label: "Answered Prayers" },
  { id: "events", label: "Upcoming Events" },
]

interface FeedTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
  return (
    <div className="flex space-x-1 bg-muted p-1 rounded-lg">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 ${
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}
