import { NextResponse } from "next/server";
import { createPost, listPosts, normalizePlatform, updatePostStatus } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ ok: true, posts: listPosts() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = normalizePlatform(body.platform || "");
    if (!platform || !body.brief || !body.title) {
      return NextResponse.json({ error: "title, brief et platform sont obligatoires." }, { status: 400 });
    }

    const post = createPost({
      title: body.title,
      platform,
      status: "draft",
      brief: body.brief,
      caption: body.caption,
      objective: body.objective,
      audience: body.audience,
      hook: body.hook,
      cta: body.cta,
      hashtags: body.hashtags,
      creative: body.creative,
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
    const post = updatePostStatus(body.id, body.status);
    if (!post) return NextResponse.json({ error: "Contenu introuvable." }, { status: 404 });
    return NextResponse.json({ ok: true, post });
  } catch {
    return NextResponse.json({ error: "Impossible de modifier le contenu." }, { status: 500 });
  }
}
