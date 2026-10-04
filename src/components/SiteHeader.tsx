import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const prefix = `/${locale}`;
  return (
    <>
      <a href="#content" className="skip-link">
        {messages.accessibility.skip}
      </a>
      <header className="site-header">
        <Link
          href={prefix}
          aria-label={`Aido · ${messages.accessibility.home}`}
          className="flex items-center gap-2"
        >
          <div className="relative h-9 w-9 wobbly-md border-2 border-foreground bg-brand">
            <Image
              src="/logo-small.webp"
              alt=""
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </div>
          <span className="text-xl font-bold">Aido</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav
            aria-label={messages.nav.label}
            className="desktop-nav hidden lg:flex"
          >
            <Link href={`${prefix}/services`}>{messages.nav.services}</Link>
            <a href={`${prefix}#guides`}>{messages.nav.guides}</a>
            <a href={`${prefix}#faq`}>{messages.nav.faq}</a>
            <Link href={`${prefix}/patch-notes`}>
              {messages.nav.patchNotes}
            </Link>
            <a href={`${prefix}#download`} className="nav-download">
              {messages.nav.download}
            </a>
          </nav>
          <LanguageSwitcher
            locale={locale}
            labels={messages.languageSwitcher}
          />
          <MobileMenu prefix={prefix} labels={messages.nav} />
        </div>
      </header>
    </>
  );
}
