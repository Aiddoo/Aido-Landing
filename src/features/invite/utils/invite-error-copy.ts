import { match } from "ts-pattern";
import type { MessageCatalog } from "@/i18n/messages";
import type { InvitePreviewFailure } from "../models/invite-preview";

export function inviteErrorCopy(
  labels: MessageCatalog["invite"],
  failure: InvitePreviewFailure,
) {
  return match(failure)
    .with("invalid_code", () => labels.errors.invalidCode)
    .with("not_found", () => labels.errors.notFound)
    .with("changed", () => labels.errors.changed)
    .with("unavailable", () => labels.errors.unavailable)
    .with("unknown", () => labels.errors.unknown)
    .exhaustive();
}
