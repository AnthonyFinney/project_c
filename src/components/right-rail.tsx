import { Calendar, BookOpen, Heart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RightRail() {
    return (
        <div className="sticky top-24 space-y-6">
            {/* Weekly Service */}
            <Card className="fresco-card">
                <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-lg flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-primary" />
                        This Sunday
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p className="font-medium text-foreground">
                            The Parable of the Mustard Seed
                        </p>
                        <p className="text-sm text-muted-foreground">
                            10:30 AM - Main Sanctuary
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Pastor David Williams
                        </p>
                    </div>
                    <Button className="w-full mt-3 bg-primary hover:bg-primary/90">
                        Set Reminder
                    </Button>
                </CardContent>
            </Card>

            {/* Verse of the Week */}
            <Card className="fresco-card">
                <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-lg flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Verse of the Week
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="drop-cap text-foreground italic leading-relaxed">
                        "For truly I tell you, if you have faith the size of a
                        mustard seed, you can say to this mountain, 'Move from
                        here to there,' and it will move."
                    </blockquote>
                    <p className="text-sm text-muted-foreground mt-2 text-right">
                        — Matthew 17:20
                    </p>
                </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card className="fresco-card">
                <CardHeader className="pb-3">
                    <CardTitle className="font-serif text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-primary" />
                        Top Contributors
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { name: "Ruth A.", role: "Deacon", amens: 231 },
                            {
                                name: "Pastor David",
                                role: "Pastor",
                                amens: 189,
                            },
                            {
                                name: "Mary Johnson",
                                role: "Member",
                                amens: 156,
                            },
                        ].map((contributor, index) => (
                            <div
                                key={contributor.name}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">
                                            {contributor.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {contributor.role}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-sm text-primary font-medium">
                                    {contributor.amens}
                                </span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Donate
                </Button>

                <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                    <Heart className="h-4 w-4 mr-2" />
                    Volunteer
                </Button>
            </div>
        </div>
    );
}
