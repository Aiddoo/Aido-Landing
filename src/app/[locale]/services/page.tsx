import type { Metadata } from "next";
import { BreadcrumbData } from "@/components/BreadcrumbData";
import { CTA } from "@/components/CTA";
import { FeatureGuides } from "@/components/FeatureGuides";
import { ServiceShowcase } from "@/components/ServiceShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type ServicesPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const content = getMessages(locale).services;
  return buildPageMetadata({
    locale,
    path: "/services",
    title: content.title,
    description: content.description,
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const locale = resolveLocale((await params).locale);
  const messages = getMessages(locale);
  const content = messages.services;

  return (
    <>
      <BreadcrumbData locale={locale} path="/services" title={content.title} />
      <SiteHeader locale={locale} />
      <main id="content">
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
        <CTA content={messages.cta} storeButtons={messages.storeButtons} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
