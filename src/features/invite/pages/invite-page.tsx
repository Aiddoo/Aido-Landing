import Link from "next/link";
import { Suspense } from "react";
import { preconnect } from "react-dom";
import { SiteFooter } from "@/components/layout/site-footer";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { BrandMotif } from "@/components/marketing/brand-motif";
import {
  Box,
  Grid,
  HStack,
  ReadableContent,
  VStack,
} from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";
import { API_URL } from "@/lib/seo";
import {
  InviteCodeCopy,
  InviteCodeCopyLoading,
} from "../components/invite-code-copy";
import { InviteLead } from "../components/invite-lead";
import {
  InviteStoreLinks,
  InviteStoreLinksLoading,
} from "../components/invite-store-links";
import { InviterCard, InviterCardLoading } from "../components/inviter-card";

// 위에서 아래로 읽는 정적 페이지. 코드·초대한 친구에 따라 달라지는 블록만 클라이언트
// 컴포넌트로 나눠 각자 Suspense로 감싸고, 로딩·완료가 같은 크기를 쓴다.
// 언어 전환은 코드를 잃으므로 두지 않는다(언어는 프록시가 정한다).
export function InvitePage({ locale }: { locale: Locale }) {
  const { invite, storeButtons, accessibility } = getMessages(locale);
  // 하이드레이션 직후 미리보기를 요청하므로 API 연결을 HTML 단계에서 미리 연다.
  preconnect(API_URL, { crossOrigin: "anonymous" });
  return (
    <>
      <a
        href="#content"
        className="fixed top-2 left-2 z-60 -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-cream focus:translate-y-0"
      >
        {accessibility.skip}
      </a>
      <ReadableContent
        render={<header />}
        className="flex h-16 items-center justify-between gap-3 md:h-20"
      >
        <Link
          href={localizedPath(locale, "")}
          aria-label={`${accessibility.home} · Aido`}
          className="-ml-1 rounded-xl p-1"
        >
          <BrandLogo locale={locale} />
        </Link>
        <p className="text-caption font-semibold text-brand-deep">
          {invite.brandLabel}
        </p>
      </ReadableContent>

      <ReadableContent
        render={<main id="content" lang={locale} />}
        className="max-w-[62rem] pt-2 pb-14 md:pt-6"
      >
        <Grid
          gap={6}
          className="md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:grid-rows-[auto_1fr] md:items-start md:gap-x-14"
        >
          <Box
            render={<section aria-labelledby="invite-title" />}
            className="relative overflow-hidden rounded-3xl bg-brand-soft px-6 py-7 md:col-start-1 md:row-start-1 md:px-9 md:py-10"
          >
            <BrandMotif
              motif="paw"
              className="absolute -right-5 -bottom-5 size-32 -rotate-12 text-brand/10"
            />
            <Suspense fallback={<InviterCardLoading labels={invite} />}>
              <InviterCard labels={invite} />
            </Suspense>
            <Suspense
              fallback={
                <p className="relative mt-3.5 h-[calc(3*1.7em)] overflow-hidden text-[0.9375rem] leading-[1.7] text-gray-9 md:text-body-lg">
                  {invite.lead}
                </p>
              }
            >
              <InviteLead labels={invite} />
            </Suspense>
          </Box>

          <Box className="md:col-start-2 md:row-span-2 md:row-start-1 drop-shadow-[0_18px_28px_hsl(var(--shadow-color)/0.18)]">
            <VStack className="receipt-edge bg-card px-6 pt-9 pb-10">
              <HStack
                align="center"
                justify="between"
                className="h-6 text-caption font-bold text-gray-9"
              >
                {invite.receiptLabel}
                <BrandMotif motif="fish-bone" className="h-4 w-8 text-bone" />
              </HStack>
              <ReceiptDivider />
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
              <ReceiptDivider />
              <Suspense fallback={<InviteCodeCopyLoading labels={invite} />}>
                <InviteCodeCopy labels={invite} />
              </Suspense>
              <ReceiptDivider />
              <Suspense
                fallback={<InviteStoreLinksLoading content={storeButtons} />}
              >
                <InviteStoreLinks content={storeButtons} />
              </Suspense>
            </VStack>
          </Box>

          <p className="rounded-xl border border-dashed border-fish/50 bg-fish/8 px-4 py-3.5 text-caption text-gray-10 md:col-start-1 md:row-start-2">
            {invite.outdatedNote}
          </p>
        </Grid>
      </ReadableContent>

      <SiteFooter locale={locale} />
    </>
  );
}

function ReceiptDivider() {
  return (
    <Box
      render={<hr />}
      className="my-3.5 border-0 border-t-2 border-dashed border-gray-4"
    />
  );
}
