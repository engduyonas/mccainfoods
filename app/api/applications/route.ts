import { NextRequest, NextResponse } from "next/server";
import { validateApplicationPayload } from "@/lib/applicationValidation";
import { INVITE_TOKEN_REGEX } from "@/lib/inviteToken";
import { isMongoConfigured } from "@/lib/mongodb";
import { consumeInviteAndCreateApplicant } from "@/lib/invitations";

const INVITE_DENIED_MESSAGE = "This invitation link is invalid or has already been used.";

export async function POST(request: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "Service temporarily unavailable." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const inviteToken = typeof body.inviteToken === "string" ? body.inviteToken : "";
  if (!inviteToken || !INVITE_TOKEN_REGEX.test(inviteToken)) {
    return NextResponse.json({ error: INVITE_DENIED_MESSAGE }, { status: 403 });
  }

  const validation = validateApplicationPayload({
    fullName: body.fullName,
    countryCode: body.countryCode,
    phoneLocal: body.phoneLocal,
    passportNumber: body.passportNumber,
    gender: body.gender,
    photograph: body.photograph,
    age: body.age,
  });

  if (!validation.ok) {
    return NextResponse.json({ errors: validation.errors }, { status: 400 });
  }

  const result = await consumeInviteAndCreateApplicant(inviteToken, validation.value);

  if (!result.ok) {
    if (result.reason === "invalid_invite") {
      return NextResponse.json({ error: INVITE_DENIED_MESSAGE }, { status: 410 });
    }
    return NextResponse.json(
      { error: "Could not save your application. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
