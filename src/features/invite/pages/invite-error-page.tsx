import { Grid, ReadableContent } from "@/components/ui/layout";
import { InviteGreetingCard } from "../components/invite-greeting-card";
import { InviteHeader } from "../components/invite-header";
import { InviteLead } from "../components/invite-lead";
import { InviteReceipt } from "../components/invite-receipt";
import { InviteStoreLinks } from "../components/invite-store-links";
import { InviterCard } from "../components/inviter-card";
import type { InviteErrorContent } from "../providers/invite-error-content-provider";

type InviteErrorPageProps = InviteErrorContent & { onRetry: () => void };

// 초대 화면을 그리다 예상 밖 오류가 났을 때. 초대 화면과 같은 카드 크기로 이유를 보여 주고,
// 다시 시도와 스토어 링크를 둔다. 코드를 확인하지 못했으므로 Play referrer는 싣지 않는다.
export function InviteErrorPage({
  locale,
  labels,
  storeButtons,
  accessibility,
  onRetry,
}: InviteErrorPageProps) {
  return (
    <>
      <InviteHeader
        locale={locale}
        brandLabel={labels.brandLabel}
        accessibility={accessibility}
      />

      <ReadableContent
        render={<main id="content" lang={locale} />}
        className="max-w-[62rem] pt-2 pb-14 md:pt-6"
      >
        <Grid
          gap={6}
          className="md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-start md:gap-x-14"
        >
          <InviteGreetingCard>
            <InviterCard.Error labels={labels} failure="render_error" />
            <InviteLead.Error
              labels={labels}
              failure="render_error"
              onRetry={onRetry}
            />
          </InviteGreetingCard>

          <InviteReceipt>
            <InviteStoreLinks content={storeButtons} code={null} />
          </InviteReceipt>
        </Grid>
      </ReadableContent>
    </>
  );
}
