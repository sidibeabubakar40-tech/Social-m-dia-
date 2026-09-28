import type { SocialPost, Platform, PostStatus } from "./types";
import { prisma } from "./db";

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

function mapPost(post: any): StoredPost {
  return {
    id: post.id,
    title: post.title,
    platform: post.platform as Platform,
    status: post.status as PostStatus,
    scheduledAt: post.scheduledAt?.toISOString(),
    caption: post.caption ?? undefined,
    brief: post.brief,
    objective: post.objective ?? undefined,
    audience: post.audience ?? undefined,
    hook: post.hook ?? undefined,
    cta: post.cta ?? undefined,
    hashtags: post.hashtags ?? [],
    creative: post.creative ?? undefined,
    updatedAt: post.updatedAt.toISOString()
  };
}

export async function listPosts(): Promise<StoredPost[]> {
  const posts = await prisma.socialPost.findMany({ orderBy: { updatedAt: "desc" } });
  return posts.map(mapPost);
}

export async function getPost(id: string): Promise<StoredPost | null> {
  const post = await prisma.socialPost.findUnique({ where: { id } });
  return post ? mapPost(post) : null;
}

export async function createPost(input: Omit<StoredPost, "id" | "updatedAt">) {
  const post = await prisma.socialPost.create({
    data: {
      title: input.title,
      platform: input.platform,
      status: input.status,
      brief: input.brief,
      objective: input.objective,
      audience: input.audience,
      hook: input.hook,
      caption: input.caption,
      cta: input.cta,
      hashtags: input.hashtags ?? [],
      creative: input.creative,
      scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : undefined
    }
  });
  return mapPost(post);
}

const allowedTransitions: Record<PostStatus, PostStatus[]> = {
  draft: ["pending_review"],
  pending_review: ["draft", "scheduled"],
  scheduled: ["failed"],
  published: [],
  failed: ["draft"]
};

export async function updatePostStatus(id: string, status: PostStatus) {
  const current = await prisma.socialPost.findUnique({ where: { id } });
  if (!current) return null;

  const currentStatus = current.status as PostStatus;
  if (currentStatus !== status && !allowedTransitions[currentStatus]?.includes(status)) {
    throw new Error(`Transition interdite: ${currentStatus} → ${status}`);
  }

  const post = await prisma.socialPost.update({
    where: { id },
    data: {
      status,
      ...(status === "scheduled" ? { scheduledAt: new Date() } : {}),
      ...(status === "published" ? { publishedAt: new Date() } : {})
    }
  });

  if (status === "scheduled") {
    await prisma.approval.create({
      data: { postId: id, status: "approved", approvedAt: new Date() }
    });
  }

  return mapPost(post);
}

export function isPublishable(post: StoredPost) {
  return post.status === "scheduled" && Boolean(post.platform);
}

export function normalizePlatform(value: string): Platform | null {
  return ["instagram", "facebook", "tiktok", "linkedin"].includes(value)
    ? value as Platform
    : null;
}
