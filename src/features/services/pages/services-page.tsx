import { MarketingLayout } from "@/components/layout/marketing-layout";
import { PageHeader } from "@/components/layout/page-header";
import { DownloadCard } from "@/components/marketing/download-card";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { ReadableContent, VStack } from "@/components/ui/layout";
import { FeatureGuideList } from "@/features/feature-guides/components/feature-guide-list";
import { ServiceFeatureList } from "@/features/services/components/service-feature-list";
import { ServiceJumpNav } from "@/features/services/components/service-jump-nav";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export function ServicesPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const content = messages.services;
  return (
    <>
      <BreadcrumbData locale={locale} path="/services" title={content.title} />
      <MarketingLayout locale={locale} path="/services">
        <ReadableContent render={<VStack gap={8} />} className="pt-8 md:pt-14">
          <PageHeader
            locale={locale}
            kicker={content.kicker}
            title={content.title}
            description={content.introduction}
          >
            <p className="text-caption text-gray-8">{content.screenshotNote}</p>
          </PageHeader>
          <ServiceJumpNav locale={locale} />
        </ReadableContent>
        <ReadableContent className="mt-section-sm">
          <ServiceFeatureList locale={locale} />
        </ReadableContent>
        <ReadableContent
          render={<section aria-labelledby="guides-title" />}
          className="mt-section"
        >
          <VStack gap={3} className="mb-8">
            <h2 id="guides-title" className="text-display-md text-ink">
              {messages.featureGuides.title}
            </h2>
            <p className="text-gray-9">{messages.featureGuides.description}</p>
          </VStack>
          <FeatureGuideList
            locale={locale}
            placement="related_guides"
            columns={4}
            className="grid-cols-1 sm:grid-cols-2"
          />
        </ReadableContent>
        <ReadableContent className="mt-section-sm">
          <DownloadCard locale={locale} />
        </ReadableContent>
      </MarketingLayout>
    </>
  );
}
