import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { MessageCatalog } from "@/i18n/messages";
import { AppScreenshot } from "./AppScreenshot";
import { PhonePreview } from "./PhonePreview";
export function AppPreview({
  locale,
  content,
}: {
  locale: Locale;
  content: MessageCatalog["appPreview"];
}) {
  return (
    <section
      id="features"
      className="section-space feature-section"
      aria-labelledby="features-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <h2 id="features-title" className="section-title">
            {content.titleLead}
            <br />
            <span className="text-brand-ink">{content.titleHighlight}</span>
          </h2>
          <p>
            {content.descriptionLead} {content.descriptionTail}
          </p>
        </div>
        <div className="feature-list">
          {content.screens.map((screen, index) => (
            <article
              key={screen.title}
              className={`feature-row ${index % 2 ? "feature-row-reverse" : ""}`}
            >
              <div className="feature-copy">
                <p className="section-tag">{screen.subtitle}</p>
                {screen.premium && (
                  <p className="premium-tag">{content.premiumLabel}</p>
                )}
                <h3 className="feature-title">{screen.title}</h3>
                <div className="feature-description">
                  {screen.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div
                className={`feature-phones ${screen.secondScreenshot ? "feature-phones-dual" : ""}`}
              >
                <PhonePreview
                  rotate={screen.rotate}
                  className="phone-frame feature-phone"
                >
                  <AppScreenshot
                    locale={locale}
                    screenshot={screen.screenshot}
                    alt={screen.alt}
                    sizes="(min-width:768px) 220px, 190px"
                    className="block h-auto w-full"
                  />
                </PhonePreview>
                {screen.secondScreenshot && (
                  <PhonePreview
                    rotate={-screen.rotate}
                    className="phone-frame feature-phone second-phone"
                  >
                    <AppScreenshot
                      locale={locale}
                      screenshot={screen.secondScreenshot}
                      alt={screen.secondAlt ?? screen.alt}
                      sizes="(min-width:768px) 200px, 160px"
                      className="block h-auto w-full"
                    />
                  </PhonePreview>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="service-link-wrap">
          <Link className="service-link" href={`/${locale}/services#top`}>
            {content.viewAll} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
