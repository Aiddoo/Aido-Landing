import Image from "next/image";
import { Suspense } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
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
import "../styles/invite.css";

// 위에서 아래로 읽는 정적 페이지. 정적 문구는 여기에 두고, 코드·초대한 친구에 따라
// 달라지는 블록만 클라이언트 컴포넌트로 분리해 각자 Suspense로 감싼다.
// 서버 HTML은 모든 블록이 로딩 상태이며 같은 크기를 유지한다.
// Loading은 서버 컴포넌트에서 쓰도록 컴포넌트와 같은 파일의 이름 있는 export로 둔다
// (클라이언트 컴포넌트의 정적 멤버는 서버 경계를 넘지 못한다).
// 언어 전환은 코드를 잃으므로 제공하지 않는다(언어는 프록시가 정한다).
export function InvitePage({ locale }: { locale: Locale }) {
  const { invite, storeButtons, accessibility } = getMessages(locale);
  return (
    <>
      <a href="#content" className="skip-link">
        {accessibility.skip}
      </a>
      <header className="invite-header">
        <a
          href={`/${locale}`}
          aria-label={`Aido · ${accessibility.home}`}
          className="flex items-center gap-2"
        >
          <span className="invite-brand-mark wobbly-md">
            <Image
              src="/logo-small.webp"
              alt=""
              width={36}
              height={36}
              sizes="36px"
              className="size-full object-contain p-1"
            />
          </span>
          <span className="text-xl font-bold">Aido</span>
        </a>
        <p className="invite-brand-label">{invite.brandLabel}</p>
      </header>

      <main id="content" className="invite-main" lang={locale}>
        <div className="invite-layout">
          <section className="invite-card" aria-labelledby="invite-title">
            <Suspense fallback={<InviterCardLoading labels={invite} />}>
              <InviterCard labels={invite} />
            </Suspense>
            <Suspense fallback={<p className="invite-lead">{invite.lead}</p>}>
              <InviteLead labels={invite} />
            </Suspense>
          </section>

          <div className="invite-ticket">
            <div className="invite-ticket-paper">
              <p className="invite-receipt-head">{invite.receiptLabel}</p>
              <hr className="invite-divider" />
              <p className="invite-reward">
                <span>{invite.rewardLabel}</span>
                <strong className="invite-reward-value">
                  {invite.rewardValue}
                </strong>
              </p>
              <hr className="invite-divider" />
              <Suspense fallback={<InviteCodeCopyLoading labels={invite} />}>
                <InviteCodeCopy labels={invite} />
              </Suspense>
              <hr className="invite-divider" />
              <Suspense
                fallback={<InviteStoreLinksLoading content={storeButtons} />}
              >
                <InviteStoreLinks content={storeButtons} />
              </Suspense>
            </div>
          </div>

          <p className="invite-outdated">{invite.outdatedNote}</p>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
