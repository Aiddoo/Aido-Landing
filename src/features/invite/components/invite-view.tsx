"use client";
import { match } from "ts-pattern";
import type { MessageCatalog } from "@/i18n/messages";
import { useCopyInviteCode } from "../hooks/use-copy-invite-code";
import { useInviteCode } from "../hooks/use-invite-code";
import {
  type InviteViewFailure,
  useInvitePreview,
} from "../hooks/use-invite-preview";
import { fillInviterName } from "../utils/format-invite-text";
import { InviteReceipt } from "./invite-receipt";
import { InviterProfile } from "./inviter-profile";

type InviteViewProps = {
  labels: MessageCatalog["invite"];
  storeButtons: MessageCatalog["storeButtons"];
};

// 이 페이지의 유일한 상호작용 영역. 정적 HTML은 스켈레톤 상태로 나가고,
// 주소의 코드를 읽은 뒤 미리보기 API를 호출한다.
export function InviteView({ labels, storeButtons }: InviteViewProps) {
  const { resolved, code } = useInviteCode();
  const preview = useInvitePreview(code, resolved);
  const loading = preview.status === "loading";
  const inviter = preview.status === "ready" ? preview.inviter : null;
  const failure = preview.status === "failed" ? preview.failure : null;
  // 없거나 바뀐 링크의 코드는 보여 주거나 Play referrer로 넘기지 않는다.
  // 네트워크 오류(unknown)는 코드가 여전히 유효할 수 있어 그대로 쓴다.
  const usableCode = failure === null || failure === "unknown" ? code : null;
  const copy = useCopyInviteCode(usableCode);

  const error = failure ? errorCopy(labels, failure) : null;
  const title = error
    ? error.title
    : inviter
      ? fillInviterName(labels.titleTemplate, inviter.name)
      : labels.titleFallback;
  const lead = error ? error.description : labels.lead;

  return (
    <div className="invite-layout" aria-busy={loading}>
      <section className="invite-card" aria-labelledby="invite-title">
        <InviterProfile labels={labels} inviter={inviter} loading={loading} />
        <h1
          id="invite-title"
          className="invite-title"
          data-loading={loading || undefined}
        >
          {loading ? (
            <>
              <span className="sr-only">{labels.loadingLabel}</span>
              <span
                className="invite-skeleton invite-bar-title"
                aria-hidden="true"
              />
              <span
                className="invite-skeleton invite-bar-title invite-bar-short"
                aria-hidden="true"
              />
            </>
          ) : (
            title
          )}
        </h1>
        <p className="invite-lead">{lead}</p>
      </section>
      <InviteReceipt
        labels={labels}
        storeButtons={storeButtons}
        code={usableCode}
        copyStatus={copy.status}
        onCopy={copy.copy}
      />
      <p className="invite-outdated">{labels.outdatedNote}</p>
    </div>
  );
}

function errorCopy(
  labels: MessageCatalog["invite"],
  failure: InviteViewFailure,
) {
  return match(failure)
    .with("invalid_code", () => labels.errors.invalidCode)
    .with("not_found", () => labels.errors.notFound)
    .with("changed", () => labels.errors.changed)
    .with("unavailable", () => labels.errors.unavailable)
    .with("unknown", () => labels.errors.unknown)
    .exhaustive();
}
