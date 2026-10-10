import { CalendarDays, Sparkles, Users } from "lucide-react";
import type { MessageCatalog } from "@/i18n/messages";

const icons = { calendar: CalendarDays, sparkles: Sparkles, users: Users };
export function Values({ content }: { content: MessageCatalog["values"] }) {
  return (
    <section
      data-motion-section
      className="section-space pt-0"
      aria-labelledby="values-title"
    >
      <div className="page-width">
        <h2 id="values-title" className="sr-only">
          {content.title}
        </h2>
        <div className="value-grid">
          {content.items.map((item, index) => {
            const Icon = icons[item.icon];
            return (
              <article
                key={item.title}
                className={`value-card value-card-${index}`}
              >
                <span
                  className="value-icon"
                  style={{ transform: `rotate(${item.rotate}deg)` }}
                >
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mb-3 text-2xl">{item.title}</h3>
                <p className="leading-7 text-foreground/80">
                  {item.description.join(" ")}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
