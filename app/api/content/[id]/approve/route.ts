import { NextResponse } from "next/server";
import { updatePostStatus } from "@/lib/store";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const post = updatePostStatus(id, "scheduled");

  if (!post) return NextResponse.json({ error: "Contenu introuvable." }, { status: 404 });

  return NextResponse.json({
    ok: true,
    post,
    message: "Contenu approuvé et planifié. La publication reste bloquée jusqu'à l'activation OAuth."
  });
}
