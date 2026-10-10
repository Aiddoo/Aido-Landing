import { MarketingLayout } from "@/components/layout/marketing-layout";
import "../styles/services.css";
import { DownloadCTA } from "@/components/marketing/download-cta";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { FeatureGuides } from "@/features/feature-guides/components/feature-guides";
import { ServiceShowcase } from "@/features/services/components/service-showcase";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
export function ServicesPage({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const content = messages.services;

  return (
    <>
      <BreadcrumbData locale={locale} path="/services" title={content.title} />
      <MarketingLayout locale={locale} path="/services">
        <div className="page-width service-page">
          <header className="service-intro">
            <p className="section-tag">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="service-introduction">{content.introduction}</p>
            <p className="service-screenshot-note">{content.screenshotNote}</p>
          </header>
          <ServiceShowcase locale={locale} />
        </div>
        <FeatureGuides locale={locale} />
        <DownloadCTA
          content={messages.cta}
          storeButtons={messages.storeButtons}
        />
      </MarketingLayout>
    </>
  );
}
