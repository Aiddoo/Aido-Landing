import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";
import { StoreButtons } from "./StoreButtons";
export function Hero({
  content,
  storeButtons,
}: {
  content: MessageCatalog["hero"];
  storeButtons: MessageCatalog["storeButtons"];
}) {
  return (
    <section className="hero-section">
      <div className="page-width hero-grid">
        <div className="hero-copy">
          <p className="section-tag">{content.eyebrow}</p>
          <h1 className="hero-title">
            {content.headingLead}
            <span className="block text-brand-ink sketch-underline">
              {content.headingHighlight}
            </span>
          </h1>
          <p className="hero-functional-title">{content.functionalTitle}</p>
          <p className="hero-description">{content.description}</p>
          <StoreButtons content={storeButtons} />
          <p className="mt-5 text-sm font-medium text-foreground/75">
            {content.note}
          </p>
        </div>
        <figure className="hero-visual">
          <div className="hero-note hero-note-top">
            <span className="font-bold">✦ {content.memoLabel}</span>
            <p>{content.memoText}</p>
          </div>
          <div className="hero-phone phone-frame">
            <Image
              src="/app-assets/week-calendar-new.webp"
              alt={content.previewAlt}
              width={360}
              height={760}
              sizes="(min-width:1024px) 240px, 210px"
              loading="eager"
              fetchPriority="high"
              className="block h-auto w-full"
            />
          </div>
          <div className="hero-note hero-note-bottom">
            <span className="font-bold">✓ {content.doneLabel}</span>
            <p>{content.doneText}</p>
          </div>
          <Image
            src="/app-assets/cat-scottish-fold.webp"
            alt=""
            width={104}
            height={104}
            className="hero-cat"
          />
          <figcaption className="hero-caption">
            {content.previewCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
