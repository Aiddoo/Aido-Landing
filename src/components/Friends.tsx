import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";
export function Friends({ content }: { content: MessageCatalog["friends"] }) {
  return (
    <section
      id="friends"
      className="section-space"
      aria-labelledby="friends-title"
    >
      <div className="page-width">
        <div className="section-heading">
          <p className="section-tag">{content.label}</p>
          <h2 id="friends-title" className="section-title">
            {content.title}
          </h2>
          <p>
            {content.descriptionLead} {content.descriptionTail}
          </p>
        </div>
        <div className="cat-grid">
          {content.cards.map((card) => (
            <figure
              key={card.name}
              className={`cat-card${card.isNew ? " cat-card-new" : ""}`}
              style={{ transform: `rotate(${card.rotate}deg)` }}
            >
              {card.isNew && (
                <span className="cat-new-label">{content.newLabel}</span>
              )}
              <div
                className="cat-image"
                style={{ backgroundColor: card.color }}
              >
                <Image
                  src={card.path}
                  alt={card.alt}
                  width={160}
                  height={160}
                  sizes="(min-width:768px) 128px, 96px"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 text-center font-bold">
                {card.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
