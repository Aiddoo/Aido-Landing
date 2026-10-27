"use client";
import { InviteErrorPage } from "@/features/invite/pages/invite-error-page";
import { useInviteErrorContent } from "@/features/invite/providers/invite-error-content-provider";

export default function InviteCodeError({ retry }: { retry: () => void }) {
  return <InviteErrorPage {...useInviteErrorContent()} onRetry={retry} />;
}
