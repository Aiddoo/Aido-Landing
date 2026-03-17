"use client";

import { motion } from "framer-motion";
import type { MessageCatalog } from "@/i18n/messages";

type RoadmapProps = {
  content: MessageCatalog["roadmap"];
};

function RoadmapCard({
  group,
  index,
}: {
  group: MessageCatalog["roadmap"]["groups"][number];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      style={{
        rotate: `${group.rotate}deg`,
        backgroundColor: group.color,
      }}
      className="relative border-[3px] border-foreground p-8 hand-shadow-lg group"
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-foreground opacity-10 rotate-1" />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{group.icon}</span>
          <h3 className="text-2xl font-bold text-brand">
            {group.title}
          </h3>
        </div>

        <div className="pb-4 border-b-2 border-dashed border-muted">
          <p className="text-xl font-bold leading-tight">{group.goal}</p>
        </div>

        <ul className="space-y-3">
          {group.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-brand font-bold mt-1">✓</span>
              <span className="text-lg font-medium opacity-80">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute -bottom-6 -right-4 text-7xl font-bold opacity-5 -rotate-12 pointer-events-none">
        {group.icon}
      </div>
    </motion.article>
  );
}

export function Roadmap({ content }: RoadmapProps) {
  return (
    <section className="px-6 py-24 sm:py-32 relative">
      <div className="absolute top-1/2 left-0 w-full h-1 border-t-4 border-dashed border-foreground/10 -translate-y-1/2 hidden lg:block" />

      <div className="mx-auto max-w-6xl relative">
        <div className="mb-20 text-center">
          <div className="inline-block px-4 py-1 bg-secondary-accent text-white wobbly-md border-2 border-foreground hand-shadow-hover -rotate-2 font-bold mb-4">
            {content.label}
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {content.title}
          </h2>
        </div>

        {(() => {
          const cols = 3;
          const remainder = content.groups.length % cols;
          const mainGroups = remainder === 0 ? content.groups : content.groups.slice(0, -remainder);
          const lastGroups = remainder === 0 ? [] : content.groups.slice(-remainder);

          return (
            <>
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {mainGroups.map((group, index) => (
                  <RoadmapCard key={group.title} group={group} index={index} />
                ))}
              </div>
              {lastGroups.length > 0 && (
                <div className="mt-12 flex flex-wrap justify-center gap-12">
                  {lastGroups.map((group, index) => (
                    <div key={group.title} className="w-full max-w-sm">
                      <RoadmapCard group={group} index={mainGroups.length + index} />
                    </div>
                  ))}
                </div>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
}
