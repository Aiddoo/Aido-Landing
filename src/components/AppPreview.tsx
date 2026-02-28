"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { MessageCatalog } from "@/i18n/messages";

type AppPreviewProps = {
  content: MessageCatalog["appPreview"];
};

export function AppPreview({ content }: AppPreviewProps) {
  const topRow = content.screens.slice(0, 4);
  const bottomRow = content.screens.slice(4);

  return (
    <section className="overflow-hidden bg-[#fafafa] px-6 py-20 sm:py-32 relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-7xl leading-tight">
              {content.titleLead}{" "}
              <span className="relative inline-block">
                {content.titleHighlight}
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 100 8"
                  fill="none"
                  aria-hidden="true"
                  role="img"
                >
                  <title>Underline highlight</title>
                  <path
                    d="M0 4C30 1 70 1 100 4"
                    stroke="#2d5da1"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground leading-relaxed">
              {content.descriptionLead}{" "}
              <span className="block sm:inline mt-2 sm:mt-0">
                {content.descriptionTail}
              </span>
            </p>
          </motion.div>
        </div>

        {/* 상단 4개 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
          {topRow.map((screen, index) => (
            <ScreenCard key={screen.title} screen={screen} index={index} />
          ))}
        </div>

        {/* 하단 3개 - 중앙 정렬 */}
        <div className="mt-6 lg:mt-8 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 justify-items-center">
            {bottomRow.map((screen, index) => (
              <ScreenCard
                key={screen.title}
                screen={screen}
                index={index + topRow.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenCard({
  screen,
  index,
}: {
  screen: MessageCatalog["appPreview"]["screens"][number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: screen.rotate }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -10, rotate: 0 }}
      className="group flex flex-col items-center"
    >
      <div className="relative aspect-[9/19] w-full max-w-[200px] overflow-hidden rounded-[2rem] border-3 border-foreground bg-white hand-shadow transition-all duration-300 group-hover:-translate-y-2">
        <Image
          src={screen.path}
          alt={screen.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-sm font-bold">{screen.title}</span>
        <p className="text-xs text-muted-foreground mt-1">
          {screen.description}
        </p>
      </div>
    </motion.div>
  );
}
