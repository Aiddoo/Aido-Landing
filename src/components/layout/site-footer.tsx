import Link from "next/link";
import type { ReactNode } from "react";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { SocialLinks } from "@/components/marketing/social-links";
import { StoreButtons } from "@/components/marketing/store-buttons";
import {
  Grid,
  HStack,
  ReadableContent,
  Stack,
  VStack,
} from "@/components/ui/layout";
import { AnalyticsSettingsButton } from "@/features/analytics/components/analytics-settings-button";
import { getAnalyticsConfig } from "@/features/analytics/config/analytics-config.server";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

const linkClass =
  "inline-flex min-h-11 items-center gap-1 text-caption font-medium text-gray-9 transition-colors hover:text-brand-deep";

export function SiteFooter({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const { footer, nav } = messages;
  const hasCookieConsent = getAnalyticsConfig().providers.some(
    (provider) => provider.id === "ga4",
  );
  return (
    <footer
      lang={locale}
      data-slot="site-footer"
      className="mt-section-sm rounded-t-4xl bg-paper pt-14 pb-10 shadow-[0_-1px_0_var(--border)]"
    >
      <ReadableContent render={<VStack gap={12} />}>
        <Stack direction="column-to-row" gap={10} justify="between">
          <VStack gap={4} className="max-w-xs">
            <BrandLogo locale={locale} />
            <p className="font-hand text-hand text-gray-8">{footer.tagline}</p>
            <HStack gap={2} aria-hidden="true" className="text-bone">
              <BrandMotif motif="paw" className="size-4" />
              <BrandMotif motif="paw" className="size-4 translate-y-1" />
              <BrandMotif motif="paw" className="size-4" />
            </HStack>
          </VStack>
          <Grid
            gap={8}
            className="flex-1 grid-cols-2 md:max-w-2xl md:grid-cols-3"
          >
            <FooterColumn title={footer.serviceTitle}>
              <li>
                <Link
                  href={localizedPath(locale, "/features")}
                  className={linkClass}
                >
                  {nav.features}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/compare")}
                  className={linkClass}
                >
                  {nav.compare}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/features/friend-invite")}
                  className={linkClass}
                >
                  {nav.invite}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/patch-notes")}
                  className={linkClass}
                >
                  {nav.patchNotes}
                </Link>
              </li>
            </FooterColumn>
            <FooterColumn title={footer.policyTitle}>
              <li>
                <Link
                  href={localizedPath(locale, "/terms")}
                  className={linkClass}
                >
                  {footer.termsLabel}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/privacy")}
                  className={linkClass}
                >
                  {footer.privacyLabel}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedPath(locale, "/account-deletion")}
                  className={linkClass}
                >
                  {footer.accountDeletionLabel}
                </Link>
              </li>
              {hasCookieConsent && (
                <li>
                  <AnalyticsSettingsButton
                    variant="link"
                    className={`${linkClass} h-auto rounded-none px-0 font-medium no-underline`}
                  >
                    {messages.analyticsConsent.settings}
                  </AnalyticsSettingsButton>
                </li>
              )}
              <li>
                <a href={`mailto:${footer.inquiryValue}`} className={linkClass}>
                  {footer.inquiryLabel}
                </a>
              </li>
            </FooterColumn>
            <VStack render={<nav aria-label={footer.linkHubTitle} />} gap={2}>
              <p className="text-caption font-bold text-ink">
                {footer.linkHubTitle}
              </p>
              <SocialLinks locale={locale} />
            </VStack>
          </Grid>
        </Stack>
        <StoreButtons content={messages.storeButtons} placement="download" />
        <VStack
          gap={3}
          className="border-t pt-8 text-micro text-muted-foreground"
        >
          <HStack
            render={<address aria-label={footer.businessLabel} />}
            wrap="wrap"
            className="gap-x-4 gap-y-1 not-italic"
          >
            <span>
              {footer.companyLabel} {footer.companyValue}
            </span>
            <span>
              {footer.representativeLabel} {footer.representativeValue}
            </span>
            <span>
              {footer.businessNumberLabel} {footer.businessNumberValue}
            </span>
            <span>
              {footer.ecommerceLabel} {footer.ecommerceValue}
            </span>
            <span>
              {footer.hostingLabel} {footer.hostingValue}
            </span>
            <span>
              {footer.inquiryLabel}{" "}
              <a
                href={`mailto:${footer.inquiryValue}`}
                className="underline underline-offset-2 hover:text-brand-deep"
              >
                {footer.inquiryValue}
              </a>
            </span>
          </HStack>
          <p>{footer.copyright}</p>
        </VStack>
      </ReadableContent>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <VStack render={<nav aria-label={title} />} gap={2}>
      <p className="text-caption font-bold text-ink">{title}</p>
      <VStack render={<ul />}>{children}</VStack>
    </VStack>
  );
}
