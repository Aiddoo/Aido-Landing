import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";
import { defaultInviterCat, getInviterCat } from "../data/inviter-cats";
import type { InviteInviter } from "../schemas/invite.schema";
import { fillInviterName, formatUserTag } from "../utils/format-invite-text";

const AVATAR_SIZE = 88;

type InviterProfileProps = {
  labels: Pick<
    MessageCatalog["invite"],
    "avatarAltTemplate" | "avatarAltFallback"
  >;
  /** null이면 이름·태그 자리는 스켈레톤이거나 비어 있다. */
  inviter: InviteInviter | null;
  isLoading: boolean;
};

// 로딩·오류·완료가 같은 박스를 쓴다. 이름·태그는 줄 높이를 고정해 교체해도 움직이지 않는다.
export function InviterProfile({
  labels,
  inviter,
  isLoading,
}: InviterProfileProps) {
  const cat = inviter ? getInviterCat(inviter.profileImage) : defaultInviterCat;
  return (
    <div className="invite-inviter">
      <div className="invite-avatar wobbly-md">
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
          className="invite-avatar-image"
        />
      </div>
      <div className="invite-inviter-text">
        <p className="invite-name">
          {isLoading ? (
            <span className="invite-skeleton invite-bar-name" />
          ) : null}
          {inviter ? inviter.name : null}
        </p>
        <p className="invite-tag">
          {isLoading ? (
            <span className="invite-skeleton invite-bar-tag" />
          ) : null}
          {inviter ? formatUserTag(inviter.userTag) : null}
        </p>
      </div>
    </div>
  );
}
