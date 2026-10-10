import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import type { PublicPath } from "@/lib/public-routes";

export function SiteHeader({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: PublicPath;
}) {
  const messages = getMessages(locale);
  const prefix = `/${locale}` as const;
  return (
    <>
      <a href="#content" className="skip-link">
        {messages.accessibility.skip}
      </a>
      <header className="site-header">
        <a
          href={`${prefix}#top`}
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
        </a>
        <div className="flex items-center gap-3">
          <nav
            aria-label={messages.nav.label}
            className="desktop-nav hidden lg:flex"
          >
            <a href={`${prefix}/services#top`}>{messages.nav.services}</a>
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
            path={path}
          />
          <MobileMenu locale={locale} labels={messages.nav} />
        </div>
      </header>
    </>
  );
}
