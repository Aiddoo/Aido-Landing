import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { ListRow, VStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import {
  localizedHomeAnchor,
  localizedPath,
  type PublicPath,
} from "@/lib/public-routes";

export interface MobileMenuGuideLink {
  slug: string;
  href: ReturnType<typeof localizedPath>;
  label: string;
}

export interface MobileMenuLinksProps {
  locale: Locale;
  labels: MessageCatalog["nav"];
  guides: readonly MobileMenuGuideLink[];
  path: PublicPath;
  onNavigate?: () => void;
}

export const menuTriggerClass =
  "size-11 rounded-full border border-border bg-paper text-ink hover:bg-brand-soft aria-expanded:bg-brand-soft [&_svg:not([class*='size-'])]:size-5";

const rowClass =
  "min-h-12 rounded-lg px-3 font-semibold text-ink transition-colors hover:bg-brand-soft hover:text-brand-deep aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand-deep";

export function MobileMenuLinks({
  locale,
  labels,
  guides,
  path,
  onNavigate,
}: MobileMenuLinksProps) {
  const guidesId = useId();
  const moreId = useId();
  const navigate = onNavigate ? { onClick: onNavigate } : {};
  const current = (href: string) =>
    href === localizedPath(locale, path) ? "page" : undefined;
  return (
    <VStack render={<nav aria-label={labels.label} />} gap={6}>
      <VStack gap={1}>
        <p
          id={guidesId}
          className="px-3 text-micro font-semibold text-muted-foreground"
        >
          {labels.guidesTitle}
        </p>
        <VStack render={<ul aria-labelledby={guidesId} />}>
          {guides.map((guide) => (
            <li key={guide.slug}>
              <ListRow
                render={
                  <Link
                    href={guide.href}
                    aria-current={current(guide.href)}
                    {...navigate}
                  />
                }
                className={rowClass}
                left={<BrandMotif motif="paw" className="size-4 text-brand" />}
                contents={guide.label}
              />
            </li>
          ))}
        </VStack>
      </VStack>
      <VStack gap={1}>
        <p
          id={moreId}
          className="px-3 text-micro font-semibold text-muted-foreground"
        >
          {labels.moreTitle}
        </p>
        <VStack render={<ul aria-labelledby={moreId} />}>
          <li>
            <ListRow
              render={
                <Link
                  href={localizedPath(locale, "/services")}
                  aria-current={current(localizedPath(locale, "/services"))}
                  {...navigate}
                />
              }
              className={rowClass}
              contents={labels.services}
              right={<ChevronRight className="size-4" aria-hidden="true" />}
            />
          </li>
          <li>
            <ListRow
              render={
                <Link
                  href={localizedPath(locale, "/patch-notes")}
                  aria-current={current(localizedPath(locale, "/patch-notes"))}
                  {...navigate}
                />
              }
              className={rowClass}
              contents={labels.patchNotes}
              right={<ChevronRight className="size-4" aria-hidden="true" />}
            />
          </li>
          <li>
            <ListRow
              render={
                <Link
                  href={localizedHomeAnchor(locale, "download")}
                  {...navigate}
                />
              }
              className={rowClass}
              contents={labels.download}
              right={<ChevronRight className="size-4" aria-hidden="true" />}
            />
          </li>
        </VStack>
      </VStack>
    </VStack>
  );
}
