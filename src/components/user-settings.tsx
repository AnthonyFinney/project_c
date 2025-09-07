"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";

export function UserSettings() {
    const { user } = useAuth();
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [prayerReminders, setPrayerReminders] = useState(true);
    const [eventNotifications, setEventNotifications] = useState(true);

    const handleSaveSettings = () => {
        console.log("Saving settings:", {
            emailNotifications,
            prayerReminders,
            eventNotifications,
        });
    };

    return (
        <div className="space-y-6">
            {/* Account Information */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                    Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="settings-email">Email</Label>
                        <Input
                            id="settings-email"
                            value={user?.email || ""}
                            disabled
                            className="bg-muted"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="settings-role">Role</Label>
                        <Input
                            id="settings-role"
                            value={
                                user?.role
                                    ? user.role.charAt(0).toUpperCase() +
                                      user.role.slice(1)
                                    : ""
                            }
                            disabled
                            className="bg-muted"
                        />
                    </div>
                </div>
            </div>

            <Separator />

            {/* Notification Settings */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                    Notification Preferences
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">
                                Email Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about new posts and
                                comments
                            </p>
                        </div>
                        <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="prayer-reminders">
                                Prayer Reminders
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Get reminded to pray for ongoing prayer requests
                            </p>
                        </div>
                        <Switch
                            id="prayer-reminders"
                            checked={prayerReminders}
                            onCheckedChange={setPrayerReminders}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="event-notifications">
                                Event Notifications
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Receive notifications about upcoming church
                                events
                            </p>
                        </div>
                        <Switch
                            id="event-notifications"
                            checked={eventNotifications}
                            onCheckedChange={setEventNotifications}
                        />
                    </div>
                </div>
            </div>

            <Separator />

            {/* Privacy Settings */}
            <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                    Privacy
                </h3>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Profile Visibility</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow other members to view your profile
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Show Online Status</Label>
                            <p className="text-sm text-muted-foreground">
                                Let others see when you&apos;re active
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
            </div>
        </div>
    );
}
