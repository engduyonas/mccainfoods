import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isMongoConfigured } from "@/lib/mongodb";
import { createApplyInvitation } from "@/lib/invitations";
import { invitationApplyUrl } from "@/lib/publicSiteUrl";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const { token } = await createApplyInvitation();
    const url = invitationApplyUrl(request.headers, token);
    return NextResponse.json({ url, token });
  } catch (e) {
    console.error("createApplyInvitation", e);
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}
