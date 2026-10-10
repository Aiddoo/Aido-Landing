import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";

export interface MobileMenuLinksProps {
  locale: Locale;
  labels: MessageCatalog["nav"];
  onNavigate?: () => void;
}
export function MobileMenuLinks({
  locale,
  labels,
  onNavigate,
}: MobileMenuLinksProps) {
  return (
    <nav aria-label={labels.label}>
      <a
        href={`/${locale}/services#top`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.services}
      </a>
      <a
        href={`/${locale}#guides`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.guides}
      </a>
      <a
        href={`/${locale}#friends`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.friends}
      </a>
      <a
        href={`/${locale}#faq`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.faq}
      </a>
      <Link
        href={`/${locale}/patch-notes`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.patchNotes}
      </Link>
      <a
        href={`/${locale}#download`}
        {...(onNavigate ? { onClick: onNavigate } : {})}
      >
        {labels.download}
      </a>
    </nav>
  );
}
