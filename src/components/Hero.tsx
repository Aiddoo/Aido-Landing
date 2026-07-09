"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";
import { StoreButtons } from "./StoreButtons";

type HeroProps = {
  content: MessageCatalog["hero"];
  storeButtons: MessageCatalog["storeButtons"];
};

export function Hero({ content, storeButtons }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
      <div className="absolute top-40 left-10 hidden md:block -rotate-12 opacity-20">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
          role="img"
        >
          <title>Decorative Scribble</title>
          <path d="M10,50 Q25,25 50,50 T90,50" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8 sm:mb-12"
      >
        <div className="relative h-24 w-24 sm:h-32 lg:h-40 lg:w-40 wobbly border-4 border-foreground bg-white p-3 sm:p-4 hand-shadow-lg rotate-2 mx-auto">
          <Image
            src="/logo.png"
            alt="Aido Logo"
            fill
            sizes="(min-width: 1024px) 160px, 96px"
            priority
            className="object-contain p-3 sm:p-4"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl z-10"
      >
        <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl leading-[1.1]! mb-8">
          {content.headingLead}{" "}
          <span className="relative inline-block">
            {content.headingHighlight}
            <svg
              className="absolute -bottom-2 left-0 w-full"
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
          </span>
          <br />
          <span className="text-brand">{content.headingTail}</span>
        </h1>
        <p className="mt-8 sm:mt-12 text-pretty text-base font-medium text-foreground sm:text-lg lg:text-2xl max-w-2xl mx-auto leading-relaxed">
          <span className="block">{content.descriptionLead}</span>
          <span className="block">{content.descriptionTail}</span>
        </p>

        <div className="mt-16 flex flex-col items-center justify-center gap-12 relative">
          <div className="absolute -left-28 top-0 hidden lg:block -rotate-12">
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              role="img"
            >
              <title>Arrow pointing down</title>
              <path d="M10,10 Q40,5 70,50" />
              <path d="M60,45 L70,50 L75,35" />
            </svg>
            <span className="text-sm font-bold rotate-6 block mt-2">
              {content.arrowNote}
            </span>
          </div>

          <StoreButtons content={storeButtons} />

          <div className="flex flex-col items-center gap-4">
            <a
              href="https://disquiet.io/product/아이두"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 wobbly border-[3px] border-foreground bg-white px-6 py-3 text-foreground transition-all hand-shadow hover:bg-muted hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d2d2d] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
            >
              <div className="flex flex-col items-start leading-none group-hover:rotate-1">
                <span className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">
                  DISQUIET*
                </span>
                <span className="text-lg font-bold sm:text-xl text-nowrap">
                  디스콰이엇 투표 중
                </span>
              </div>
              <span className="flex items-center gap-1 text-brand font-bold text-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </span>
            </a>
            <div className="bg-muted px-4 py-1 wobbly-md border-2 border-foreground hand-shadow text-sm font-bold -rotate-2">
              {content.launchBadge}
            </div>
            <div className="h-12 w-px border-l-2 border-dashed border-foreground" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
            {content.scrollLabel}
          </span>
          <div className="h-10 w-px border-l-2 border-dashed border-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
