import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "sidibe-social-ai",
    publisherEnabled: false,
    socialAccountsConnected: false
  });
}