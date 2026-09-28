import { NextResponse } from "next/server";
import { createPost, listPosts, normalizePlatform, updatePostStatus } from "@/lib/store";

export async function GET() {
  try {
    return NextResponse.json({ ok: true, posts: await listPosts() });
  } catch {
    return NextResponse.json({ error: "Base de données indisponible." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = normalizePlatform(body.platform || "");
    if (!platform || !body.brief || !body.title) {
      return NextResponse.json({ error: "title, brief et platform sont obligatoires." }, { status: 400 });
    }

    const post = await createPost({
      title: body.title,
      platform,
      status: "pending_review",
      brief: body.brief,
      caption: body.caption,
      objective: body.objective,
      audience: body.audience,
      hook: body.hook,
      cta: body.cta,
      hashtags: Array.isArray(body.hashtags) ? body.hashtags : [],
      creative: body.creative
    });

    return NextResponse.json({ ok: true, post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Impossible de créer le contenu." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    if (!body.id || !["draft", "pending_review", "scheduled"].includes(body.status)) {
      return NextResponse.json({ error: "Transition de statut invalide." }, { status: 400 });
    }

    const post = await updatePostStatus(body.id, body.status as import("@/lib/types").PostStatus);
    if (!post) return NextResponse.json({ error: "Contenu introuvable." }, { status: 404 });

    return NextResponse.json({ ok: true, post });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Impossible de modifier le contenu."
    }, { status: 400 });
  }
}
