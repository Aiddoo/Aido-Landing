import { StoreButtons } from "@/components/marketing/store-buttons";
import type { MessageCatalog } from "@/i18n/messages";
import type { CopyStatus } from "../hooks/use-copy-invite-code";
import type { InviteCode } from "../schemas/invite.schema";
import { buildPlayStoreInviteUrl } from "../utils/invite-store-links";

const EMPTY_CODE = "······";

type InviteReceiptProps = {
  labels: MessageCatalog["invite"];
  storeButtons: MessageCatalog["storeButtons"];
  /** 쓸 수 있는 코드. 없으면 자리 표시만 하고 복사를 막는다. */
  code: InviteCode | null;
  copyStatus: CopyStatus;
  onCopy: () => void;
};

// 영수증 한 장. 위·아래 톱니는 CSS mask, 구분선은 점선이다.
export function InviteReceipt({
  labels,
  storeButtons,
  code,
  copyStatus,
  onCopy,
}: InviteReceiptProps) {
  const hint =
    copyStatus === "manual"
      ? labels.codeManualStatus
      : copyStatus === "copied"
        ? labels.codeCopiedStatus
        : labels.codeHint;
  return (
    <div className="invite-ticket">
      <div className="invite-ticket-paper">
        <p className="invite-receipt-head">
          <span>{labels.receiptLabel}</span>
          <PawMark />
        </p>
        <hr className="invite-divider" />
        <p className="invite-reward">
          <span>{labels.rewardLabel}</span>
          <strong className="invite-reward-value">{labels.rewardValue}</strong>
        </p>
        <hr className="invite-divider" />
        <p className="invite-code-label">{labels.codeLabel}</p>
        <div className="invite-code-row">
          <span className="invite-code" data-empty={code ? undefined : ""}>
            {code ?? EMPTY_CODE}
          </span>
          <button
            type="button"
            className="invite-copy"
            onClick={onCopy}
            disabled={!code}
            aria-label={labels.codeCopyAria}
          >
            {copyStatus === "copied" ? labels.codeCopied : labels.codeCopy}
          </button>
        </div>
        <p className="invite-hint" role="status">
          {hint}
        </p>
        <hr className="invite-divider" />
        <StoreButtons
          content={storeButtons}
          placement="invite"
          playStoreUrl={buildPlayStoreInviteUrl(code)}
        />
      </div>
    </div>
  );
}

function PawMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="6" cy="10" rx="2.2" ry="2.8" />
      <ellipse cx="10.5" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="16.5" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="21" cy="10" rx="2.2" ry="2.8" transform="rotate(10 21 10)" />
      <path d="M13.5 11c-3.2 0-6 3.3-6 6 0 2 1.6 3 3.4 3 1 0 1.7-.4 2.6-.4s1.6.4 2.6.4c1.8 0 3.4-1 3.4-3 0-2.7-2.8-6-6-6z" />
    </svg>
  );
}
