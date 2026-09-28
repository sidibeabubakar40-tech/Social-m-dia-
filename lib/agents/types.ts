export type WorkflowPlatform = "instagram" | "facebook" | "tiktok" | "linkedin";

export interface WorkflowInput {
  brief: string;
  platform: WorkflowPlatform;
  objective?: string;
  audience?: string;
  tone?: string;
  publishDate?: string;
}

export interface AgentResult<T = unknown> {
  agent: string;
  output: T;
  mode: "ai" | "demo";
}

export interface StrategyOutput {
  objective: string;
  audience: string;
  pillars: string[];
  angle: string;
  kpis: string[];
}

export interface CopyOutput {
  hook: string;
  caption: string;
  cta: string;
  hashtags: string[];
}

export interface CreativeOutput {
  format: string;
  concept: string;
  visualDirection: string;
  shotList: string[];
}

export interface PlanOutput {
  recommendedDate: string;
  recommendedTime: string;
  reason: string;
}

export interface WorkflowOutput {
  strategy: StrategyOutput;
  copy: CopyOutput;
  creative: CreativeOutput;
  plan: PlanOutput;
  approvalRequired: true;
  publisherStatus: "disabled_until_oauth";
}
