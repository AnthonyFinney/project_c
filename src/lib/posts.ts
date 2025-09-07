export interface Post {
    id: string;
    title: string;
    body: string;
    type: "DISCUSSION" | "PRAYER" | "EVENT" | "SERMON" | "TESTIMONY";
    authorId: string;
    author: {
        id: string;
        name: string;
        username: string;
        role: "PASTOR" | "DEACON" | "MOD" | "MEMBER";
        avatar?: string;
    };
    createdAt: Date;
    updatedAt: Date;
    amenCount: number;
    commentCount: number;
    tags: string[];
    isAnswered?: boolean;
    eventDate?: Date;
    location?: string;
    amenedBy: string[];
    bookmarkedBy: string[];
    mediaType?: "image" | "video";
    mediaUrl?: string;
    mediaThumbnail?: string;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    author: {
        id: string;
        name: string;
        username: string;
        role: "PASTOR" | "DEACON" | "MOD" | "MEMBER";
        avatar?: string;
    };
    body: string;
    createdAt: Date;
    amenCount: number;
    amenedBy: string[];
}

// Mock data for demonstration
export const mockPosts: Post[] = [
    {
        id: "1",
        title: "Sunday Service Reflection: Walking in Faith",
        body: "What a blessed morning we had today! Pastor Michael's sermon on walking by faith and not by sight really spoke to my heart. I wanted to share how this message has been working in my life lately...",
        type: "DISCUSSION",
        authorId: "1",
        author: {
            id: "1",
            name: "John Smith",
            username: "johnsmith",
            role: "MEMBER",
            avatar: "/church-member-portrait.jpg",
        },
        createdAt: new Date("2024-01-15T10:30:00"),
        updatedAt: new Date("2024-01-15T10:30:00"),
        amenCount: 12,
        commentCount: 8,
        tags: ["faith", "sunday-service", "reflection"],
        amenedBy: ["2", "3", "4"],
        bookmarkedBy: ["2"],
    },
    {
        id: "2",
        title: "Prayer Request: Healing for My Mother",
        body: "Dear church family, I come to you with a heavy heart asking for your prayers. My mother was diagnosed with pneumonia and is currently in the hospital. Please pray for her swift recovery and for strength for our family during this time.",
        type: "PRAYER",
        authorId: "3",
        author: {
            id: "3",
            name: "Sarah Johnson",
            username: "sarahj",
            role: "MEMBER",
        },
        createdAt: new Date("2024-01-14T14:20:00"),
        updatedAt: new Date("2024-01-14T14:20:00"),
        amenCount: 24,
        commentCount: 15,
        tags: ["healing", "family", "urgent"],
        amenedBy: ["1", "2", "4", "5"],
        bookmarkedBy: [],
    },
    {
        id: "3",
        title: "Community Outreach: Food Drive Success!",
        body: "Praise God! Our monthly food drive collected over 500 items for the local food bank. Thank you to everyone who participated and volunteered. Together, we're making a real difference in our community.",
        type: "EVENT",
        authorId: "2",
        author: {
            id: "2",
            name: "Pastor Michael",
            username: "pastormike",
            role: "PASTOR",
            avatar: "/pastor-portrait.png",
        },
        createdAt: new Date("2024-01-13T16:45:00"),
        updatedAt: new Date("2024-01-13T16:45:00"),
        amenCount: 18,
        commentCount: 6,
        tags: ["outreach", "community", "success"],
        eventDate: new Date("2024-01-20T09:00:00"),
        location: "Church Fellowship Hall",
        amenedBy: ["1", "3", "4"],
        bookmarkedBy: ["1", "3"],
    },
    {
        id: "4",
        title: "Beautiful Sunrise from Church Retreat",
        body: "God painted the sky with such beautiful colors this morning at our retreat. His creation never ceases to amaze me! 'The heavens declare the glory of God; the skies proclaim the work of his hands.' - Psalm 19:1",
        type: "DISCUSSION",
        authorId: "1",
        author: {
            id: "1",
            name: "John Smith",
            username: "johnsmith",
            role: "MEMBER",
            avatar: "/church-member-portrait.jpg",
        },
        createdAt: new Date("2024-01-16T06:30:00"),
        updatedAt: new Date("2024-01-16T06:30:00"),
        amenCount: 8,
        commentCount: 3,
        tags: ["creation", "retreat", "praise"],
        amenedBy: ["2", "3"],
        bookmarkedBy: ["2"],
        mediaType: "image",
        mediaUrl: "/beautiful-sunrise-over-mountains-with-golden-light.jpg",
        mediaThumbnail:
            "/beautiful-sunrise-over-mountains-with-golden-light.jpg",
    },
    {
        id: "5",
        title: "Youth Choir Performance - Amazing Grace",
        body: "Our youth choir's beautiful rendition of Amazing Grace from last Sunday's service. So proud of these young voices praising the Lord!",
        type: "SERMON",
        authorId: "2",
        author: {
            id: "2",
            name: "Pastor Michael",
            username: "pastormike",
            role: "PASTOR",
            avatar: "/pastor-portrait.png",
        },
        createdAt: new Date("2024-01-15T20:00:00"),
        updatedAt: new Date("2024-01-15T20:00:00"),
        amenCount: 15,
        commentCount: 7,
        tags: ["youth", "choir", "worship"],
        amenedBy: ["1", "3", "4"],
        bookmarkedBy: ["1"],
        mediaType: "video",
        mediaUrl: "/youth-choir-singing-in-church-sanctuary.jpg",
        mediaThumbnail: "/youth-choir-singing-in-church-sanctuary.jpg",
    },
];

export const mockComments: Comment[] = [
    {
        id: "1",
        postId: "1",
        authorId: "2",
        author: {
            id: "2",
            name: "Pastor Michael",
            username: "pastormike",
            role: "PASTOR",
            avatar: "/pastor-portrait.png",
        },
        body: "Thank you for sharing this, John. It's wonderful to see how God's word is working in your life. Keep walking in faith!",
        createdAt: new Date("2024-01-15T11:00:00"),
        amenCount: 5,
        amenedBy: ["1", "3"],
    },
    {
        id: "2",
        postId: "2",
        authorId: "1",
        author: {
            id: "1",
            name: "John Smith",
            username: "johnsmith",
            role: "MEMBER",
            avatar: "/church-member-portrait.jpg",
        },
        body: "Praying for your mother's healing, Sarah. God is faithful and He hears our prayers. Sending love to your family.",
        createdAt: new Date("2024-01-14T15:30:00"),
        amenCount: 3,
        amenedBy: ["2", "3"],
    },
];

class PostService {
    private posts: Post[] = [...mockPosts];
    private comments: Comment[] = [...mockComments];
    private listeners: (() => void)[] = [];

    subscribe(listener: () => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notify() {
        this.listeners.forEach((listener) => listener());
    }

    getPosts(filter?: string): Post[] {
        let filtered = [...this.posts];

        if (filter) {
            switch (filter) {
                case "top":
                    filtered.sort((a, b) => b.amenCount - a.amenCount);
                    break;
                case "prayers":
                    filtered = filtered.filter((p) => p.type === "PRAYER");
                    break;
                case "events":
                    filtered = filtered.filter((p) => p.type === "EVENT");
                    break;
                default:
                    filtered.sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                    );
            }
        } else {
            filtered.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
            );
        }

        return filtered;
    }

    getPost(id: string): Post | undefined {
        return this.posts.find((p) => p.id === id);
    }

    createPost(
        postData: Omit<
            Post,
            | "id"
            | "createdAt"
            | "updatedAt"
            | "amenCount"
            | "commentCount"
            | "amenedBy"
            | "bookmarkedBy"
        >
    ): Post {
        const newPost: Post = {
            ...postData,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
            amenCount: 0,
            commentCount: 0,
            amenedBy: [],
            bookmarkedBy: [],
        };

        this.posts.unshift(newPost);
        this.notify();
        return newPost;
    }

    toggleAmen(postId: string, userId: string): boolean {
        const post = this.posts.find((p) => p.id === postId);
        if (!post) return false;

        const hasAmened = post.amenedBy.includes(userId);
        if (hasAmened) {
            post.amenedBy = post.amenedBy.filter((id) => id !== userId);
            post.amenCount--;
        } else {
            post.amenedBy.push(userId);
            post.amenCount++;
        }

        this.notify();
        return !hasAmened;
    }

    toggleBookmark(postId: string, userId: string): boolean {
        const post = this.posts.find((p) => p.id === postId);
        if (!post) return false;

        const hasBookmarked = post.bookmarkedBy.includes(userId);
        if (hasBookmarked) {
            post.bookmarkedBy = post.bookmarkedBy.filter((id) => id !== userId);
        } else {
            post.bookmarkedBy.push(userId);
        }

        this.notify();
        return !hasBookmarked;
    }

    getComments(postId: string): Comment[] {
        return this.comments
            .filter((c) => c.postId === postId)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }

    addComment(
        commentData: Omit<
            Comment,
            "id" | "createdAt" | "amenCount" | "amenedBy"
        >
    ): Comment {
        const newComment: Comment = {
            ...commentData,
            id: Date.now().toString(),
            createdAt: new Date(),
            amenCount: 0,
            amenedBy: [],
        };

        this.comments.push(newComment);

        // Update post comment count
        const post = this.posts.find((p) => p.id === commentData.postId);
        if (post) {
            post.commentCount++;
        }

        this.notify();
        return newComment;
    }

    searchPosts(query: string): Post[] {
        const lowercaseQuery = query.toLowerCase();
        return this.posts.filter(
            (post) =>
                post.title.toLowerCase().includes(lowercaseQuery) ||
                post.body.toLowerCase().includes(lowercaseQuery) ||
                post.tags.some((tag) =>
                    tag.toLowerCase().includes(lowercaseQuery)
                )
        );
    }
}

export const postService = new PostService();
