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

const posts: StoredPost[] = [\n  { id: "demo-1", title: "Conseil de la semaine", platform: "instagram", status: "pending_review", brief: "Partager un conseil utile à la communauté.", caption: "Un conseil simple pour mieux communiquer.", hook: "Votre contenu peut être plus clair.", cta: "Dites-nous votre avis.", hashtags: ["#SIDIBESTUDIO"], creative: "Post social 4:5", updatedAt: new Date().toISOString() }\n];

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
