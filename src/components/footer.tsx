"use client"

import { Heart, Cross } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Cross className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold">Renaissance Fellowship</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              A community united in faith, sharing God's love through fellowship, prayer, and service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Sunday Service</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Bible Study</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Youth Ministry</div>
              <div className="text-muted-foreground hover:text-foreground cursor-pointer">Community Outreach</div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif font-semibold">Contact Us</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>123 Faith Street</div>
              <div>Renaissance City, RC 12345</div>
              <div>(555) 123-PRAY</div>
              <div>fellowship@renaissance.church</div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Renaissance Fellowship. Built with <Heart className="inline w-4 h-4 text-red-500" /> for our
            community.
          </p>
          <div className="text-sm text-muted-foreground">"Faith, Hope, Love - these three remain."</div>
        </div>
      </div>
    </footer>
  )
}
