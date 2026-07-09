"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: MessageCatalog["languageSwitcher"];
};

function swapLocale(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/");

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = targetLocale;
  } else {
    segments.splice(1, 0, targetLocale);
  }

  const nextPath = segments.join("/");
  return nextPath === "" ? `/${targetLocale}` : nextPath;
}

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language selection"
      className="flex items-center gap-2 rounded-full border-2 border-foreground bg-white px-2 py-1 hand-shadow"
    >
      <span className="hidden px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 md:block">
        {labels.label}
      </span>
      {locales.map((item) => {
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={swapLocale(pathname, item)}
            aria-current={isActive ? "page" : undefined}
            className={[
              "rounded-full border-2 px-3 py-1 text-xs font-bold transition-all",
              isActive
                ? "border-foreground bg-brand text-white"
                : "border-transparent text-foreground/60 hover:border-foreground/30 hover:text-foreground",
            ].join(" ")}
          >
            {item === "ko" ? labels.ko : labels.en}
          </Link>
        );
      })}
    </nav>
  );
}
