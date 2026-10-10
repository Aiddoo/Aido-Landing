import { ChevronDown } from "lucide-react";
import type { MessageCatalog } from "@/i18n/messages";
export function FAQ({ content }: { content: MessageCatalog["faq"] }) {
  return (
    <section id="faq" className="section-space" aria-labelledby="faq-title">
      <div className="page-width max-w-3xl">
        <div className="section-heading">
          <h2 id="faq-title" className="section-title">
            {content.title}
          </h2>
          <p>{content.description}</p>
        </div>
        <div className="space-y-4">
          {content.items.map((item) => (
            <details key={item.question} className="disclosure">
              <summary className="disclosure-summary">
                <span>{item.question}</span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="disclosure-chevron"
                />
              </summary>
              <p className="disclosure-content">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
