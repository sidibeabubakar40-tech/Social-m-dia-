import { NextResponse } from "next/server";
import { runSocialWorkflow } from "@/lib/agents/orchestrator";
import type { WorkflowInput } from "@/lib/agents/types";

const platforms = ["instagram", "facebook", "tiktok", "linkedin"] as const;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<WorkflowInput>;

    if (!body.brief?.trim() || !body.platform || !platforms.includes(body.platform)) {
      return NextResponse.json({ error: "brief et platform valide sont obligatoires." }, { status: 400 });
    }

    const result = await runSocialWorkflow({
      brief: body.brief.trim(),
      platform: body.platform,
      objective: body.objective,
      audience: body.audience,
      tone: body.tone,
      publishDate: body.publishDate
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur du workflow IA." },
      { status: 500 }
    );
  }
}
