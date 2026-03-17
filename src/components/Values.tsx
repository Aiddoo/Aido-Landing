"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, Users } from "lucide-react";
import type { MessageCatalog } from "@/i18n/messages";

type ValuesProps = {
  content: MessageCatalog["values"];
};

const iconMap = {
  sparkles: Sparkles,
  users: Users,
  crown: Crown,
} as const;

export function Values({ content }: ValuesProps) {
  return (
    <section className="px-6 py-24 sm:py-32 bg-muted/20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center relative">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 relative inline-block">
            {content.title}
            <svg
              className="absolute -bottom-3 left-0 w-full"
              height="12"
              viewBox="0 0 200 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 10C50 2 150 2 198 10"
                stroke="#FF6843"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </h2>
        </div>
        <div className="grid gap-12 sm:grid-cols-3 lg:gap-16">
          {content.items.map((value, index) => {
            const Icon = iconMap[value.icon];

            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center wobbly border-[3px] border-foreground bg-white hand-shadow transition-transform group-hover:rotate-12 mb-8"
                  style={{ rotate: `${value.rotate}deg` }}
                >
                  <Icon className="h-10 w-10 text-brand" strokeWidth={2.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">{value.title}</h3>
                  <p className="text-xl text-muted-foreground leading-relaxed px-4">
                    {value.description.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
