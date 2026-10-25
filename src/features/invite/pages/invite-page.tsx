import Image from "next/image";
import { SiteFooter } from "@/components/layout/site-footer";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { InviteView } from "../components/invite-view";
import "../styles/invite.css";

// 정적 셸. 코드와 초대한 사람은 브라우저에서 채우므로 서버 HTML에는 담기지 않는다.
// 언어 전환은 코드를 잃으므로 이 페이지에서는 제공하지 않는다(언어는 프록시가 정한다).
export function InvitePage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  return (
    <>
      <a href="#content" className="skip-link">
        {messages.accessibility.skip}
      </a>
      <header className="invite-header">
        <a
          href={`/${locale}`}
          aria-label={`Aido · ${messages.accessibility.home}`}
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
        <p className="invite-brand-label">{messages.invite.brandLabel}</p>
      </header>
      <main id="content" className="invite-main" lang={locale}>
        <InviteView
          labels={messages.invite}
          storeButtons={messages.storeButtons}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
