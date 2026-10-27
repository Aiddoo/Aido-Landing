import Link from "next/link";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { HStack, ReadableContent } from "@/components/ui/layout";
import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath, type PublicPath } from "@/lib/public-routes";

const navLinkClass =
  "inline-flex h-11 items-center rounded-full px-3.5 text-caption font-semibold text-gray-9 transition-colors hover:bg-brand-soft hover:text-brand-deep aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-deep";

export function SiteHeader({
  locale,
  path = "",
}: {
  locale: Locale;
  path?: PublicPath;
}) {
  const messages = getMessages(locale);
  const { nav } = messages;
  const guides = featureGuides.map((guide) => ({
    slug: guide.slug,
    href: localizedPath(locale, guide.path),
    label: messages.featureGuides.guides[guide.slug].title,
  }));
  const current = (target: PublicPath): "page" | undefined =>
    path === target ? "page" : undefined;
  return (
    <>
      <a
        href="#content"
        className="fixed top-2 left-2 z-60 -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-cream focus:translate-y-0"
      >
        {messages.accessibility.skip}
      </a>
      <header
        data-slot="site-header"
        className="site-header sticky top-0 z-40 h-16 border-b border-transparent md:h-18"
      >
        <ReadableContent
          render={<HStack align="center" justify="between" gap={3} />}
          className="h-full"
        >
          <Link
            href={localizedPath(locale, "")}
            data-slot="site-brand"
            className="-ml-1 rounded-xl p-1"
          >
            <BrandLogo locale={locale} />
          </Link>
          <HStack
            render={<nav aria-label={nav.label} />}
            align="center"
            gap={1}
            className="hidden lg:flex"
          >
            <a href={`/${locale}#guides`} className={navLinkClass}>
              {nav.guides}
            </a>
            <Link
              href={localizedPath(locale, "/features/friend-invite")}
              aria-current={current("/features/friend-invite")}
              className={navLinkClass}
            >
              {nav.invite}
            </Link>
            <Link
              href={localizedPath(locale, "/services")}
              aria-current={current("/services")}
              className={navLinkClass}
            >
              {nav.services}
            </Link>
            <Link
              href={localizedPath(locale, "/patch-notes")}
              aria-current={current("/patch-notes")}
              className={navLinkClass}
            >
              {nav.patchNotes}
            </Link>
          </HStack>
          <HStack
            align="center"
            gap={2}
            data-slot="site-header-actions"
            className="shrink-0"
          >
            <LanguageSwitcher
              locale={locale}
              labels={messages.languageSwitcher}
              path={path}
            />
            <ThemeToggle
              labels={messages.theme}
              className="hidden lg:inline-flex"
            />
            <a
              href={`/${locale}#download`}
              className="hidden h-11 items-center rounded-full bg-primary px-5 text-caption font-semibold text-primary-foreground shadow-press-brand transition-transform hover:-translate-y-px active:translate-y-0.5 active:shadow-none sm:inline-flex"
            >
              {nav.download}
            </a>
            <MobileMenu
              locale={locale}
              labels={nav}
              guides={guides}
              themeLabels={messages.theme}
            />
          </HStack>
        </ReadableContent>
      </header>
    </>
  );
}
