import Link from "next/link";
import { MarketingLayout } from "@/components/layout/marketing-layout";
import { DownloadCTA } from "@/components/marketing/download-cta";
import { FAQ } from "@/components/marketing/faq";
import { AppScreenshot } from "@/components/media/app-screenshot";
import { BreadcrumbData } from "@/components/seo/breadcrumb-data";
import { FeatureGuides } from "@/features/feature-guides/components/feature-guides";
import type { FeatureGuide } from "@/features/feature-guides/data/feature-guides";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { getMessages } from "@/i18n/messages";
import { formatContentDate } from "@/lib/format-content-date";
export function FeatureGuidePage({
  locale,
  guide,
}: {
  locale: Locale;
  guide: FeatureGuide;
}) {
  const messages = getMessages(locale);
  const labels = messages.featureGuides;
  const content = labels.guides[guide.slug];
  const prefix = `/${locale}` as const;
  const reviewed = formatContentDate(guide.updatedAt, locale);

  return (
    <>
      <BreadcrumbData locale={locale} path={guide.path} title={content.title} />
      <MarketingLayout
        locale={locale}
        path={guide.path}
        footer={<GuideFooter locale={locale} />}
      >
        <article className="page-width guide-article">
          <nav
            aria-label={messages.accessibility.home}
            className="guide-breadcrumb"
          >
            <a href={`${prefix}#top`}>{messages.accessibility.home}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{content.title}</span>
          </nav>
          <header className="guide-intro">
            <p className="section-tag">{messages.nav.guides}</p>
            <h1>{content.title}</h1>
            <p className="guide-summary">{content.summary}</p>
            <p className="guide-reviewed">
              {labels.updatedLabel} ·{" "}
              <time dateTime={guide.updatedAt}>{reviewed}</time>
            </p>
          </header>
          <GuideWalkthrough
            locale={locale}
            guide={guide}
            content={content}
            labels={labels}
          />
          <GuideExample content={content} labels={labels} />
          <GuideDetails content={content} />
          <GuidePlans content={content} labels={labels} />
        </article>
        <FAQ
          content={{
            title: messages.faq.title,
            description: messages.faq.description,
            items: content.faq,
          }}
        />
        <FeatureGuides locale={locale} currentSlug={guide.slug} />
        <DownloadCTA
          content={messages.cta}
          storeButtons={messages.storeButtons}
        />
      </MarketingLayout>
    </>
  );
}

type GuideContent =
  MessageCatalog["featureGuides"]["guides"][keyof MessageCatalog["featureGuides"]["guides"]];
interface GuideSectionProps {
  content: GuideContent;
  labels: MessageCatalog["featureGuides"];
}
interface GuideWalkthroughProps extends GuideSectionProps {
  locale: Locale;
  guide: FeatureGuide;
}
function GuideWalkthrough({
  locale,
  guide,
  content,
  labels,
}: GuideWalkthroughProps) {
  return (
    <section aria-labelledby="steps-title" className="guide-walkthrough">
      <div>
        <h2 id="steps-title" className="feature-title">
          {labels.stepsTitle}
        </h2>
        <ol className="guide-steps">
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className="guide-step-number" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figure className="guide-screen">
        <AppScreenshot
          locale={locale}
          screenshot={guide.screenshot}
          alt={content.imageAlt}
          sizes="(min-width:768px) 280px, 240px"
          className="phone-frame"
        />
        <figcaption>{content.imageCaption}</figcaption>
      </figure>
    </section>
  );
}
function GuideExample({ content, labels }: GuideSectionProps) {
  return (
    <section className="guide-example" aria-labelledby="example-title">
      <h2 id="example-title" className="feature-title">
        {labels.exampleTitle}
      </h2>
      <p>{content.example.introduction}</p>
      <ul>
        {content.example.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="guide-example-note">{content.example.note}</p>
    </section>
  );
}
function GuideDetails({ content }: { content: GuideContent }) {
  return (
    <div className="guide-details">
      {content.details.map((detail) => (
        <section key={detail.title}>
          <h2>{detail.title}</h2>
          <p>{detail.body}</p>
        </section>
      ))}
    </div>
  );
}
function GuidePlans({ content, labels }: GuideSectionProps) {
  return (
    <section className="guide-plans" aria-labelledby="plans-title">
      <h2 id="plans-title" className="feature-title">
        {labels.plansTitle}
      </h2>
      <dl>
        <div>
          <dt>{labels.freeLabel}</dt>
          <dd>{content.plans.free}</dd>
        </div>
        <div>
          <dt>{labels.premiumLabel}</dt>
          <dd>{content.plans.premium}</dd>
        </div>
      </dl>
      <p className="guide-example-note">{labels.plansNote}</p>
    </section>
  );
}
function GuideFooter({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const labels = messages.featureGuides;
  const prefix = `/${locale}` as const;
  return (
    <footer className="page-width guide-footer">
      <Link href={`${prefix}#guides`}>{labels.backToGuides}</Link>
      <nav aria-label={messages.accessibility.footer}>
        <Link href={`${prefix}/terms`}>{messages.footer.termsLabel}</Link>
        <Link href={`${prefix}/privacy`}>{messages.footer.privacyLabel}</Link>
        <a href={`mailto:${messages.footer.inquiryValue}`}>
          {messages.footer.contactBadge}
        </a>
      </nav>
      <p>
        {messages.footer.companyValue} · {messages.footer.copyright}
      </p>
    </footer>
  );
}
