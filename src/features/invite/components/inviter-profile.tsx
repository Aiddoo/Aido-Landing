import Image from "next/image";
import { Box, HStack } from "@/components/ui/layout";
import type { MessageCatalog } from "@/i18n/messages";
import { defaultInviterCat, getInviterCat } from "../data/inviter-cats";
import type { InviteInviter } from "../schemas/invite.schema";
import { fillInviterName } from "../utils/format-invite-text";

const AVATAR_SIZE = 88;

type InviterProfileProps = {
  labels: Pick<
    MessageCatalog["invite"],
    "avatarAltTemplate" | "avatarAltFallback"
  >;
  /** null이면 이름 자리는 스켈레톤이거나 비어 있다. */
  inviter: InviteInviter | null;
  isLoading: boolean;
};

// 로딩·오류·완료가 같은 박스를 쓴다. 이름은 줄 높이를 고정해 교체해도 움직이지 않는다.
export function InviterProfile({
  labels,
  inviter,
  isLoading,
}: InviterProfileProps) {
  const cat = inviter ? getInviterCat(inviter.profileImage) : defaultInviterCat;
  return (
    <HStack align="center" gap={4} className="relative h-22">
      <Box className="size-22 shrink-0 overflow-hidden rounded-[30%] bg-card shadow-card">
        <Image
          key={cat}
          src={cat}
          alt={
            inviter
              ? fillInviterName(
                  labels.avatarAltTemplate,
                  inviter.name,
                  labels.avatarAltFallback,
                )
              : labels.avatarAltFallback
          }
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          sizes={`${AVATAR_SIZE}px`}
          preload
          fetchPriority="high"
          className="size-full object-cover"
        />
      </Box>
      <Box className="min-w-0 flex-1">
        <p className="block h-7 truncate text-title-lg leading-7 font-bold text-ink">
          {isLoading ? (
            <span className="mt-1.5 block h-[1.1rem] w-[55%] animate-pulse rounded-full bg-muted" />
          ) : null}
          {inviter ? inviter.name : null}
        </p>
      </Box>
    </HStack>
  );
}
