export type Platform = "instagram" | "facebook" | "tiktok" | "linkedin";

export type PostStatus = "draft" | "pending_review" | "scheduled" | "published" | "failed";

export type AgentStatus = "active" | "waiting" | "error";

export interface SocialAccount {
  id: string;
  platform: Platform;
  displayName: string;
  connected: boolean;
}

export interface SocialPost {
  id: string;
  title: string;
  platform: Platform;
  status: PostStatus;
  scheduledAt?: string;
  caption?: string;
}

export interface Agent {
  id: string;
  name: string;
  mission: string;
  status: AgentStatus;
}