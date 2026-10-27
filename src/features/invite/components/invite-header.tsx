import Link from "next/link";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { ReadableContent } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

type InviteHeaderProps = {
  locale: Locale;
  brandLabel: string;
  accessibility: MessageCatalog["accessibility"];
};

// 본문 바로가기와 로고만 둔다. 언어 전환은 코드를 잃으므로 두지 않는다(언어는 프록시가 정한다).
export function InviteHeader({
  locale,
  brandLabel,
  accessibility,
}: InviteHeaderProps) {
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
          {brandLabel}
        </p>
      </ReadableContent>
    </>
  );
}
