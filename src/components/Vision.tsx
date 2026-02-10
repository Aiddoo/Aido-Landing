"use client";

import { motion } from "framer-motion";
import type { MessageCatalog } from "@/i18n/messages";

type VisionProps = {
  content: MessageCatalog["vision"];
};

export function Vision({ content }: VisionProps) {
  return (
    <section className="px-6 py-32 sm:py-48 relative overflow-hidden">
      <div className="absolute top-20 right-10 opacity-10">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          aria-hidden="true"
          role="img"
        >
          <title>Decorative Scribble Circle</title>
          <path
            d="M10,100 C50,20 150,20 190,100 S50,180 10,100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8,8"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-12 bg-white wobbly border-[3px] border-foreground p-6 sm:p-12 hand-shadow-lg rotate-1"
        >
          <div className="inline-block px-4 py-1 bg-secondary-accent text-white wobbly-md border-2 border-foreground hand-shadow transform -rotate-3 font-bold">
            {content.label}
          </div>
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-7xl leading-tight!">
            {content.titleLead}{" "}
            <span className="block sm:inline">{content.titleTail}</span>
          </h2>
          <div className="grid gap-8 sm:gap-12 text-lg sm:text-xl lg:text-2xl font-medium text-foreground sm:grid-cols-2 leading-relaxed!">
            <p className="text-balance relative pl-6 sm:pl-0">
              <span className="absolute left-0 sm:-left-6 top-0 text-brand text-3xl sm:text-4xl">
                "
              </span>
              {content.quoteOneLead}{" "}
              <span className="block mt-2">{content.quoteOneTail}</span>
            </p>
            <p className="text-balance">
              {content.quoteTwoLead}{" "}
              <span className="block mt-2">{content.quoteTwoTail}</span>
              <span className="text-brand text-3xl sm:text-4xl leading-none">
                "
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
