"use client";

import { useState, useEffect } from "react";
import { postService, type Post, type Comment } from "@/lib/posts";

export function usePosts(filter?: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPosts = () => {
            setPosts(postService.getPosts(filter));
            setIsLoading(false);
        };

        loadPosts();
        const unsubscribe = postService.subscribe(loadPosts);
        return unsubscribe;
    }, [filter]);

    const toggleAmen = (postId: string, userId: string) => {
        return postService.toggleAmen(postId, userId);
    };

    const toggleBookmark = (postId: string, userId: string) => {
        return postService.toggleBookmark(postId, userId);
    };

    const createPost = (
        postData: Parameters<typeof postService.createPost>[0]
    ) => {
        return postService.createPost(postData);
    };

    return {
        posts,
        isLoading,
        toggleAmen,
        toggleBookmark,
        createPost,
    };
}

export function usePost(postId: string) {
    const [post, setPost] = useState<Post | undefined>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPost = () => {
            setPost(postService.getPost(postId));
            setComments(postService.getComments(postId));
            setIsLoading(false);
        };

        loadPost();
        const unsubscribe = postService.subscribe(loadPost);
        return unsubscribe;
    }, [postId]);

    const addComment = (
        commentData: Parameters<typeof postService.addComment>[0]
    ) => {
        return postService.addComment(commentData);
    };

    return {
        post,
        comments,
        isLoading,
        addComment,
    };
}
