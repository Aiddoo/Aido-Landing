import { PawPrint } from "lucide-react";
import { AppScreenshot } from "@/components/media/app-screenshot";
import { getAppScreenshot } from "@/components/media/data/app-screenshots";
import { PhonePreview } from "@/components/media/phone-preview";
import { serviceFeatures } from "@/features/services/data/service-features";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export function ServiceShowcase({ locale }: { locale: Locale }) {
  const content = getMessages(locale).services;

  return (
    <>
      <nav aria-label={content.jumpLabel} className="service-jump-links">
        {serviceFeatures.map(({ id }) => (
          <a key={id} href={`#${id}`}>
            {content.features[id].navigationLabel}
          </a>
        ))}
      </nav>
      <div className="service-feature-grid">
        {serviceFeatures.map((feature) => {
          const text = content.features[feature.id];
          return (
            <section
              data-motion-section
              id={feature.id}
              key={feature.id}
              className="service-feature-card"
              aria-labelledby={`${feature.id}-title`}
            >
              <header className="service-feature-heading">
                <PawPrint
                  size={24}
                  className="text-brand-ink"
                  aria-hidden="true"
                />
                <div className="service-badges">
                  {"premium" in feature && <span>{content.premiumLabel}</span>}
                  {"sample" in feature && <span>{content.sampleLabel}</span>}
                </div>
                <h2 id={`${feature.id}-title`}>{text.title}</h2>
                <p>{text.description}</p>
              </header>
              <ul className="service-feature-details">
                {text.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div
                className={`service-screens ${feature.screenshots.length === 3 ? "service-screens-three" : ""}`}
              >
                {feature.screenshots.map((screenshot, index) => {
                  const image = getAppScreenshot(locale, screenshot);
                  const platformLabel =
                    image.platform === "ios"
                      ? content.iosLabel
                      : content.androidLabel;
                  return (
                    <PhonePreview
                      key={screenshot}
                      rotate={0}
                      className="service-screen"
                    >
                      <AppScreenshot
                        locale={locale}
                        screenshot={screenshot}
                        alt={`${platformLabel} · ${text.captions[index]}`}
                        sizes="(min-width:1024px) 210px, (min-width:640px) 230px, 42vw"
                        className="phone-frame block h-auto w-full"
                      />
                      <figcaption>
                        <span>{platformLabel}</span>
                        {text.captions[index]}
                      </figcaption>
                    </PhonePreview>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
