import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { FeatureGuideList } from "./feature-guide-list";

// 기존 홈 화면 전용. 홈 개편(feat/landing-2-home)에서 FeatureGuideList로 바꾸고 지운다.
export function FeatureGuides({ locale }: { locale: Locale }) {
  const content = getMessages(locale).featureGuides;
  return (
    <section
      data-motion-section
      id="guides"
      className="section-space"
      aria-labelledby="guides-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <h2 id="guides-title" className="section-title">
            {content.title}
          </h2>
          <p>{content.description}</p>
        </div>
        <FeatureGuideList locale={locale} placement="home_guides" columns={4} />
      </div>
    </section>
  );
}
