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
          <h2 className="text-pretty text-4xl font-bold tracking-tight sm:text-6xl leading-tight! text-center">
            {content.titleLead}{" "}
            <span className="block">{content.titleTail}</span>
          </h2>
          <div className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground leading-relaxed! text-center space-y-1">
            <p>{content.quoteOneLead}</p>
            <p>{content.quoteOneTail}</p>
            <p className="pt-4">{content.quoteTwoLead}</p>
            <p>{content.quoteTwoTail}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
