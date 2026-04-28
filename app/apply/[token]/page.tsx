import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findApplyInvitation } from "@/lib/invitations";
import { INVITE_TOKEN_REGEX } from "@/lib/inviteToken";
import { isMongoConfigured } from "@/lib/mongodb";
import ApplyRegistrationForm from "./ApplyRegistrationForm";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  return {
    title: INVITE_TOKEN_REGEX.test(token) ? "Complete your registration | McCain Foods" : "Registration",
  };
}

export default async function InviteApplyPage({ params }: Props) {
  const { token } = await params;

  if (!INVITE_TOKEN_REGEX.test(token)) notFound();

  if (!isMongoConfigured()) notFound();

  try {
    const inv = await findApplyInvitation(token);
    if (!inv) notFound();
  } catch {
    notFound();
  }

  return <ApplyRegistrationForm inviteToken={token} />;
}
