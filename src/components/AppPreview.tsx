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
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
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

        <div className="relative">
          <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-16">
            {content.screens.map((screen, index) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 40, rotate: screen.rotate }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                whileHover={{ y: -10, rotate: 0 }}
                className="group relative"
              >
                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-foreground rounded-tl-lg" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-foreground rounded-br-lg" />

                <div className="relative aspect-9/19 w-full max-w-[280px] overflow-hidden rounded-[2.5rem] border-4 border-foreground bg-white hand-shadow-lg transition-all duration-300">
                  <Image
                    src={screen.path}
                    alt={screen.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground bg-muted px-4 py-1 wobbly-md border-2 border-foreground -rotate-2 inline-block">
                    {screen.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
