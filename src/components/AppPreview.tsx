"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import type { MessageCatalog } from "@/i18n/messages";

type AppPreviewProps = {
  content: MessageCatalog["appPreview"];
};

export function AppPreview({ content }: AppPreviewProps) {
  return (
    <section className="overflow-hidden bg-[#fafafa] px-6 py-20 sm:py-32 relative">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 sm:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-pretty text-4xl font-bold tracking-tight sm:text-7xl leading-tight">
              {content.titleLead}{" "}
              <span className="relative inline-block">
                {content.titleHighlight}
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
                    stroke="#2d5da1"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground leading-relaxed">
              <span className="block">{content.descriptionLead}</span>
              <span className="block">{content.descriptionTail}</span>
            </p>
          </motion.div>
        </div>

        <div className="space-y-20 sm:space-y-32">
          {content.screens.map((screen, index) => {
            const isDual = !!screen.secondPath;
            const isReversed = index % 2 === 1;

            if (isDual) {
              return (
                <DualPhoneSection
                  key={screen.title}
                  screen={screen}
                  index={index}
                  isReversed={isReversed}
                />
              );
            }

            return (
              <SinglePhoneSection
                key={screen.title}
                screen={screen}
                index={index}
                isReversed={isReversed}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SinglePhoneSection({
  screen,
  index,
  isReversed,
}: {
  screen: MessageCatalog["appPreview"]["screens"][number];
  index: number;
  isReversed: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col items-center gap-8 sm:gap-20 ${
        isReversed ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      <div className="shrink-0 w-full sm:w-1/2 flex justify-center">
        <PhoneMockup
          src={screen.path}
          alt={screen.title}
          rotate={screen.rotate}
        />
      </div>

      <figcaption className="flex-1">
        <TextBlock screen={screen} align="left" />
      </figcaption>
    </motion.figure>
  );
}

function DualPhoneSection({
  screen,
  index,
  isReversed,
}: {
  screen: MessageCatalog["appPreview"]["screens"][number];
  index: number;
  isReversed: boolean;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col items-center gap-8 sm:gap-12 ${
        isReversed ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      {/* 듀얼 폰 목업 */}
      <div className="shrink-0 w-full sm:w-1/2 flex justify-center">
        <div className="relative flex items-start">
          <div className="relative z-10">
            <PhoneMockup
              src={screen.path}
              alt={screen.title}
              rotate={-3}
              size="md"
            />
          </div>
          <div className="relative -ml-12 sm:-ml-16 mt-16 sm:mt-24 z-20">
            <PhoneMockup
              src={screen.secondPath!}
              alt={`${screen.title} 2`}
              rotate={3}
              size="md"
            />
          </div>
        </div>
      </div>

      {/* 텍스트 */}
      <figcaption className="flex-1">
        <TextBlock screen={screen} align="left" />
      </figcaption>
    </motion.figure>
  );
}

function PhoneMockup({
  src,
  alt,
  rotate,
  size = "default",
}: {
  src: string;
  alt: string;
  rotate: number;
  size?: "default" | "md" | "lg";
}) {
  const sizeMap = {
    md: "w-[180px] sm:w-[200px] lg:w-[230px]",
    default: "w-[220px] sm:w-[240px] lg:w-[280px]",
    lg: "w-[260px] sm:w-[280px] lg:w-[320px]",
  };
  const sizeClasses = sizeMap[size];

  return (
    <motion.div
      whileHover={{ y: -8, rotate: 0 }}
      className={`relative aspect-9/19 ${sizeClasses} overflow-hidden rounded-[2.5rem] border-2 border-foreground/80 bg-black shadow-[4px_4px_0px_0px_rgba(45,45,45,0.6)]`}
      style={{ rotate: `${rotate}deg` }}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  );
}

function TextBlock({
  screen,
  align,
}: {
  screen: MessageCatalog["appPreview"]["screens"][number];
  align: "left" | "right";
}) {
  return (
    <div
      className={`text-center ${
        align === "right" ? "sm:text-right" : "sm:text-left"
      }`}
    >
      <span className="inline-block text-sm font-bold uppercase tracking-widest text-brand mb-3 border-2 border-foreground bg-white px-3 py-1 wobbly-md hand-shadow -rotate-1">
        {screen.subtitle}
      </span>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 leading-snug">
        {screen.title}
      </h3>
      <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto sm:mx-0">
        {screen.description.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}
