import { Columns2, NotebookPen, TabletSmartphone } from "lucide-react";
import Image from "next/image";
import {
  FOLDABLE_SCREEN_SIZE,
  foldableScreens,
} from "@/features/landing/data/foldable-screens";
import type { MessageCatalog } from "@/i18n/messages";

const pointIcons = [Columns2, NotebookPen, TabletSmartphone];
export function Foldable({ content }: { content: MessageCatalog["foldable"] }) {
  return (
    <section
      data-motion-section
      id="foldable"
      className="section-space"
      aria-labelledby="foldable-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <p className="section-tag foldable-tag">{content.label}</p>
          <h2 id="foldable-title" className="section-title">
            {content.titleLead}
            <br />
            <span className="text-brand-deep">{content.titleHighlight}</span>
          </h2>
          <p>{content.description}</p>
        </div>
        <figure className="foldable-main">
          <div className="foldable-stage">
            <span className="foldable-label foldable-label-list">
              ← {content.listLabel}
            </span>
            <span className="foldable-label foldable-label-detail">
              {content.detailLabel} →
            </span>
            <div className="foldable-frame">
              <Image
                src={foldableScreens[content.main.screen]}
                {...FOLDABLE_SCREEN_SIZE}
                alt={content.main.alt}
                sizes="(min-width:1024px) 880px, calc(100vw - 2.5rem)"
                className="block h-auto w-full"
              />
            </div>
          </div>
          <figcaption className="foldable-caption">
            {content.main.title}
          </figcaption>
        </figure>
        <ul className="foldable-points">
          {content.points.map((point, index) => {
            const Icon = pointIcons[index] ?? Columns2;
            return (
              <li
                key={point.title}
                className={`foldable-point value-card-${index}`}
              >
                <span className="foldable-point-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </li>
            );
          })}
        </ul>
        <div className="foldable-grid">
          {content.screens.map((screen) => (
            <figure key={screen.screen} className="foldable-card">
              <div className="foldable-frame foldable-frame-sm">
                <Image
                  src={foldableScreens[screen.screen]}
                  {...FOLDABLE_SCREEN_SIZE}
                  alt={screen.alt}
                  sizes="(min-width:1024px) 360px, (min-width:768px) 30vw, calc(100vw - 2.5rem)"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption>{screen.title}</figcaption>
            </figure>
          ))}
        </div>
        <p className="foldable-note">{content.screenshotNote}</p>
      </div>
    </section>
  );
}
