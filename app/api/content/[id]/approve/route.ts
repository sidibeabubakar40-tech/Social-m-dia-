import { NextResponse } from "next/server";
import { updatePostStatus } from "@/lib/store";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const post = await updatePostStatus(id, "scheduled");

    if (!post) return NextResponse.json({ error: "Contenu introuvable." }, { status: 404 });

    return NextResponse.json({
      ok: true,
      post,
      message: "Contenu approuvé et planifié. La publication reste bloquée jusqu'à l'activation OAuth."
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Impossible d'approuver le contenu."
    }, { status: 400 });
  }
}
