"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
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
    <nav
      aria-label={labels.navLabel}
      className="flex items-center gap-1 rounded-full border-2 border-foreground bg-white px-2 py-1 hand-shadow"
    >
      <span className="hidden px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/75 xl:block">
        {labels.label}
      </span>
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
          aria-current={item === locale ? "page" : undefined}
          className={`rounded-full border-2 px-2 py-1 text-xs font-bold transition-all ${item === locale ? "border-foreground bg-brand text-foreground" : "border-transparent text-foreground/75 hover:border-foreground/30 hover:text-foreground"}`}
        >
          {item === "ko" ? labels.ko : labels.en}
        </Link>
      ))}
    </nav>
  );
}
