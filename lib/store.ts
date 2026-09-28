import type { SocialPost, Platform, PostStatus } from "./types";

export interface StoredPost extends SocialPost {
  brief: string;
  objective?: string;
  audience?: string;
  hook?: string;
  cta?: string;
  hashtags?: string[];
  creative?: string;
  updatedAt: string;
}

const posts: StoredPost[] = [];

export function listPosts() {
  return posts;
}

export function getPost(id: string) {
  return posts.find(post => post.id === id);
}

export function createPost(input: Omit<StoredPost, "id" | "updatedAt">) {
  const post: StoredPost = {
    ...input,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString()
  };
  posts.unshift(post);
  return post;
}

export function updatePostStatus(id: string, status: PostStatus) {
  const post = getPost(id);
  if (!post) return null;
  post.status = status;
  post.updatedAt = new Date().toISOString();
  return post;
}

export function isPublishable(post: StoredPost) {
  return post.status === "scheduled" && post.platform !== undefined;
}

export function normalizePlatform(value: string): Platform | null {
  return ["instagram", "facebook", "tiktok", "linkedin"].includes(value)
    ? value as Platform
    : null;
}
