import type { MessageCatalog } from "@/i18n/messages";
import { StoreButtons } from "./StoreButtons";
export function CTA({
  content,
  storeButtons,
}: {
  content: MessageCatalog["cta"];
  storeButtons: MessageCatalog["storeButtons"];
}) {
  return (
    <section
      id="download"
      className="section-space"
      aria-labelledby="download-title"
    >
      <div className="page-width download-card">
        <h2 id="download-title" className="section-title">
          {content.titleLineOne}
          <br />
          {content.titleLineTwo}
        </h2>
        <p className="my-6 text-lg leading-8">{content.description}</p>
        <StoreButtons content={storeButtons} />
        <p className="mt-5 text-sm text-foreground/75">{content.closingNote}</p>
      </div>
    </section>
  );
}
