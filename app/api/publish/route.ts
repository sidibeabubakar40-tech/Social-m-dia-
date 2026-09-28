import { NextResponse } from "next/server";
import { getPost } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const post = body.id ? getPost(body.id) : null;

  return NextResponse.json(
    {
      ok: false,
      error: "Publisher désactivé : aucune connexion OAuth officielle n'est encore autorisée.",
      postId: post?.id ?? null,
      publisherStatus: "disabled_until_oauth"
    },
    { status: 403 }
  );
}
