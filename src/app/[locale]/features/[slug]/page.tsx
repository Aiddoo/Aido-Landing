import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppScreenshot } from "@/components/AppScreenshot";
import { BreadcrumbData } from "@/components/BreadcrumbData";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { FeatureGuides } from "@/components/FeatureGuides";
import { SiteHeader } from "@/components/SiteHeader";
import { featureGuides, getFeatureGuide } from "@/data/feature-guides";
import { getMessages } from "@/i18n/messages";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return featureGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const guide = getFeatureGuide(slug);
  if (!guide) notFound();
  const content = getMessages(locale).featureGuides.guides[guide.slug];
  return buildPageMetadata({
    locale,
    path: guide.path,
    title: content.title,
    description: content.summary,
  });
}

export default async function FeatureGuidePage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const guide = getFeatureGuide(slug);
  if (!guide) notFound();
  const messages = getMessages(locale);
  const labels = messages.featureGuides;
  const content = labels.guides[guide.slug];
  const prefix = `/${locale}`;
  const reviewed = new Intl.DateTimeFormat(
    locale === "ko" ? "ko-KR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(`${guide.updatedAt}T00:00:00Z`));

  return (
    <>
      <BreadcrumbData locale={locale} path={guide.path} title={content.title} />
      <SiteHeader locale={locale} />
      <main id="content">
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
          <div className="guide-details">
            {content.details.map((detail) => (
              <section key={detail.title}>
                <h2>{detail.title}</h2>
                <p>{detail.body}</p>
              </section>
            ))}
          </div>
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
        </article>
        <FAQ
          content={{
            title: messages.faq.title,
            description: messages.faq.description,
            items: content.faq,
          }}
        />
        <FeatureGuides locale={locale} currentSlug={guide.slug} />
        <CTA content={messages.cta} storeButtons={messages.storeButtons} />
      </main>
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
    </>
  );
}
