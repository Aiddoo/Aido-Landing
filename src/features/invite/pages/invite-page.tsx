import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Grid, HStack, ReadableContent } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";
import { InviteCodeCopy } from "../components/invite-code-copy";
import { InviteGreetingCard } from "../components/invite-greeting-card";
import { InviteHeader } from "../components/invite-header";
import { InviteLead } from "../components/invite-lead";
import { InviteReceipt } from "../components/invite-receipt";
import { InviteStoreLinks } from "../components/invite-store-links";
import { InviterCard } from "../components/inviter-card";
import type { InviteCode } from "../schemas/invite.schema";

// 위에서 아래로 읽는 페이지. 초대한 친구에 따라 달라지는 블록만 클라이언트 컴포넌트로 나누고,
// 각 블록이 자기 Suspense·Loading을 가지며 로딩·오류·완료가 같은 크기를 쓴다.
// code는 라우트가 검증한 값이고, null이면 형식이 틀린 링크다.
export function InvitePage({
  locale,
  code,
}: {
  locale: Locale;
  code: InviteCode | null;
}) {
  const { invite, storeButtons, accessibility } = getMessages(locale);
  return (
    <>
      <InviteHeader
        locale={locale}
        brandLabel={invite.brandLabel}
        accessibility={accessibility}
      />

      <ReadableContent
        render={<main id="content" lang={locale} />}
        className="max-w-[62rem] pt-2 pb-14 md:pt-6"
      >
        <Grid
          gap={6}
          className="md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:grid-rows-[auto_1fr] md:items-start md:gap-x-14"
        >
          <InviteGreetingCard className="md:col-start-1 md:row-start-1">
            <InviterCard labels={invite} code={code} />
            <InviteLead labels={invite} code={code} />
          </InviteGreetingCard>

          <InviteReceipt className="md:col-start-2 md:row-span-2 md:row-start-1">
            <HStack
              align="center"
              justify="between"
              className="h-6 text-caption font-bold text-gray-9"
            >
              {invite.receiptLabel}
              <BrandMotif motif="fish-bone" className="h-4 w-8 text-bone" />
            </HStack>
            <InviteReceipt.Divider />
            <HStack
              render={<p />}
              align="center"
              justify="between"
              gap={3}
              className="h-10 font-semibold text-ink"
            >
              <span>{invite.rewardLabel}</span>
              <strong className="rounded-full bg-primary px-3.5 py-1 font-display text-title whitespace-nowrap text-primary-foreground">
                {invite.rewardValue}
              </strong>
            </HStack>
            <p className="mt-2 text-[0.8125rem] leading-relaxed wrap-anywhere text-gray-8">
              {invite.rewardTermsNote}{" "}
              <Link
                href={localizedPath(locale, "/terms")}
                className="font-semibold text-brand-deep underline underline-offset-3"
              >
                {invite.rewardTermsLink}
              </Link>
            </p>
            <InviteReceipt.Divider />
            <InviteCodeCopy labels={invite} code={code} />
            <InviteReceipt.Divider />
            <InviteStoreLinks content={storeButtons} code={code} />
          </InviteReceipt>

          <p className="rounded-xl border border-dashed border-fish/50 bg-fish/8 px-4 py-3.5 text-caption text-gray-10 md:col-start-1 md:row-start-2">
            {invite.outdatedNote}
          </p>
        </Grid>
      </ReadableContent>

      <SiteFooter locale={locale} />
    </>
  );
}
