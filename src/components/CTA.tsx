"use client";

import { motion } from "framer-motion";
import type { MessageCatalog } from "@/i18n/messages";
import { StoreButtons } from "./StoreButtons";

type CTAProps = {
  content: MessageCatalog["cta"];
  storeButtons: MessageCatalog["storeButtons"];
};

const pillColors = ["#fff9c4", "#e3f2fd", "#f3e5f5", "#e8f5e9", "#fdf1e3"];
const pillRotations = [-2, 1, -1.5, 2, -1];

export function CTA({ content, storeButtons }: CTAProps) {
  return (
    <section
      id="download"
      className="px-6 py-32 sm:py-48 text-center relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.03]">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          aria-hidden="true"
          role="img"
        >
          <title>Decorative background circle</title>
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="20,10"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#fff9c4] wobbly border-[3px] border-foreground p-8 sm:p-14 hand-shadow-lg -rotate-1"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-foreground opacity-10 rotate-1" />

          <h2 className="text-pretty text-5xl font-bold tracking-tight sm:text-7xl leading-tight! mb-6 sm:mb-8">
            {content.titleLineOne} <br />
            {content.titleLineTwo}
          </h2>

          <p className="mx-auto max-w-lg text-xl sm:text-2xl font-medium text-foreground/80 leading-relaxed! mb-10 sm:mb-12">
            {content.description}
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-3 mb-12 sm:mb-14">
            {content.highlights.map((tag, i) => (
              <motion.li
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="inline-block px-4 py-1.5 text-sm sm:text-base font-bold border-2 border-foreground wobbly-sm hand-shadow select-none"
                style={{
                  backgroundColor: pillColors[i % pillColors.length],
                  rotate: `${pillRotations[i % pillRotations.length]}deg`,
                }}
              >
                {tag}
              </motion.li>
            ))}
          </ul>

          <div className="mb-10 sm:mb-12">
            <StoreButtons content={storeButtons} />
          </div>

          <p className="text-sm sm:text-base font-bold opacity-50">
            {content.closingNote}
          </p>
        </motion.div>

        <div className="absolute -right-12 -bottom-20 hidden xl:block rotate-6">
          <span className="text-2xl font-bold block mb-1 text-foreground whitespace-nowrap">
            {content.playfulText}
          </span>
          <svg
            width="80"
            height="40"
            viewBox="0 0 80 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
            role="img"
            className="text-brand"
          >
            <title>Playful underline</title>
            <path d="M5,20 C20,10 40,35 75,15" />
          </svg>
        </div>

        <div className="absolute -left-16 -bottom-12 hidden lg:block opacity-40">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            role="img"
          >
            <title>Decorative star scribble</title>
            <path d="M10,30 L50,30 M30,10 L30,50 M15,15 L45,45 M45,15 L15,45" />
          </svg>
        </div>
      </div>
    </section>
  );
}
