"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { HStack } from "@/components/ui/layout";
import { analyticsAttributes } from "@/features/analytics/utils/analytics-attributes";
import { type Locale, locales } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import {
  getPublicPath,
  localizedPath,
  type PublicPath,
  sanitizeAnchor,
} from "@/lib/public-routes";
import { sanitizeCampaign } from "@/lib/sanitize-campaign";

interface LanguageSwitcherProps {
  locale: Locale;
  labels: MessageCatalog["languageSwitcher"];
  path: PublicPath;
}
export function LanguageSwitcher(props: LanguageSwitcherProps) {
  return (
    <Suspense fallback={<LanguageLinks {...props} campaign="" hash="" />}>
      <CurrentLanguageLinks {...props} />
    </Suspense>
  );
}
function CurrentLanguageLinks(props: LanguageSwitcherProps) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (!pathname) return;
    const update = () => setHash(sanitizeAnchor(window.location.hash));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [pathname]);
  return (
    <LanguageLinks
      {...props}
      path={getPublicPath(pathname) ?? props.path}
      campaign={sanitizeCampaign(
        new URLSearchParams(search.toString()),
      ).toString()}
      hash={hash}
    />
  );
}
function LanguageLinks({
  locale,
  labels,
  path,
  campaign,
  hash,
}: LanguageSwitcherProps & { campaign: string; hash: string }) {
  return (
    <HStack
      render={<nav aria-label={labels.navLabel} />}
      align="center"
      data-slot="language-switcher"
      className="h-11 rounded-full border border-border bg-paper p-1"
    >
      {locales.map((item) => (
        <Link
          key={item}
          {...analyticsAttributes({
            name: "language_switch",
            targetLocale: item,
          })}
          href={{
            pathname: localizedPath(item, path),
            query: Object.fromEntries(new URLSearchParams(campaign)),
            hash,
          }}
          prefetch={false}
          scroll={false}
          lang={item}
          aria-current={item === locale ? "page" : undefined}
          className="relative inline-flex h-full min-w-10 items-center justify-center rounded-full px-2.5 text-micro font-bold text-gray-8 transition-colors after:absolute after:-inset-y-1 after:inset-x-0 hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-cream"
        >
          {item === "ko" ? labels.ko : labels.en}
        </Link>
      ))}
    </HStack>
  );
}
