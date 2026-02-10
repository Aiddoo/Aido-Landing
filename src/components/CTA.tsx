"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { MessageCatalog } from "@/i18n/messages";
import { Button } from "./ui/button";

type CTAProps = {
  content: MessageCatalog["cta"];
};

export function CTA({ content }: CTAProps) {
  const [showBubble, setShowBubble] = useState(false);

  const handleNotifyClick = () => {
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 3000);
  };

  return (
    <section
      id="notify"
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
          className="space-y-12 bg-[#fff9c4] wobbly border-[3px] border-foreground p-12 hand-shadow-lg -rotate-1"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-foreground opacity-10 rotate-1" />

          <h2 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl leading-tight!">
            {content.titleLineOne} <br />
            {content.titleLineTwo}
          </h2>
          <p className="mx-auto max-w-lg text-2xl font-medium text-foreground leading-relaxed!">
            {content.descriptionLineOne} <br />
            {content.descriptionLineTwo}
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-6 sm:flex-row items-stretch sm:items-center relative">
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute -top-24 left-1/2 -translate-x-1/2 z-20"
                >
                  <div className="bg-brand text-white font-bold px-6 py-3 wobbly-md border-[3px] border-foreground hand-shadow whitespace-nowrap relative">
                    {content.bubble}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-brand border-r-[3px] border-b-[3px] border-foreground rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              type="email"
              placeholder={content.emailPlaceholder}
              className="h-16 w-full wobbly-sm border-[3px] border-foreground bg-white px-8 text-xl font-medium focus:outline-none focus:ring-4 focus:ring-brand/20 transition-all placeholder:text-muted-foreground"
            />
            <Button
              size="lg"
              className="h-16 shrink-0 wobbly border-[3px] px-10 text-2xl font-bold"
              onClick={handleNotifyClick}
            >
              {content.buttonLabel}
            </Button>
          </div>

          <p className="text-sm font-bold opacity-60">{content.privacyNote}</p>
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
