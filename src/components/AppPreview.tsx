"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { MessageCatalog } from "@/i18n/messages";

type AppPreviewProps = {
  content: MessageCatalog["appPreview"];
};

const staggerOffsets = [0, 28, 8, 36, 16, 32, 4];

export function AppPreview({ content }: AppPreviewProps) {
  const topRow = content.screens.slice(0, 4);
  const bottomRow = content.screens.slice(4);

  return (
    <section className="overflow-hidden bg-[#fafafa] px-6 py-20 sm:py-32 relative">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 sm:mb-20 text-center">
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

        {/* 모바일: Carousel */}
        <div className="sm:hidden">
          <MobileCarousel screens={content.screens} />
        </div>

        {/* 태블릿/데스크탑: 그리드 레이아웃 */}
        <div className="hidden sm:block">
          {/* 상단 4개 - 지그재그 오프셋 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-8 justify-items-center">
            {topRow.map((screen, index) => (
              <div
                key={screen.title}
                style={{ paddingTop: staggerOffsets[index] }}
              >
                <ScreenCard screen={screen} index={index} />
              </div>
            ))}
          </div>

          {/* 하단 3개 - 중앙 정렬, 지그재그 */}
          <div className="mt-10 lg:mt-14 flex justify-center">
            <div className="grid grid-cols-3 gap-x-6 lg:gap-x-10 justify-items-center max-w-[560px] lg:max-w-[720px]">
              {bottomRow.map((screen, index) => {
                const globalIndex = index + topRow.length;
                return (
                  <div
                    key={screen.title}
                    style={{ paddingTop: staggerOffsets[globalIndex] }}
                  >
                    <ScreenCard screen={screen} index={globalIndex} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function useCarouselCurrent(api: CarouselApi) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return current;
}

function MobileCarousel({
  screens,
}: {
  screens: MessageCatalog["appPreview"]["screens"];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const current = useCarouselCurrent(api);

  return (
    <div className="space-y-6">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {screens.map((screen, index) => (
            <CarouselItem key={screen.title} className="pl-3 basis-[55%]">
              <ScreenCard screen={screen} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* 도트 인디케이터 */}
      <div className="flex justify-center gap-2">
        {screens.map((screen, index) => (
          <button
            key={screen.title}
            type="button"
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-6 bg-foreground" : "w-2 bg-foreground/25"
            }`}
            aria-label={`Go to ${screen.title}`}
          />
        ))}
      </div>
    </div>
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
      transition={{ delay: index * 0.08, duration: 0.7 }}
      whileHover={{ y: -8, rotate: 0 }}
      className="group flex flex-col items-center"
    >
      <div className="relative aspect-[9/19] w-full max-w-[240px] overflow-hidden rounded-[2.5rem] border-2 border-foreground/80 bg-black shadow-[3px_3px_0px_0px_rgba(45,45,45,0.6)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[2px_2px_0px_0px_rgba(45,45,45,0.4)]">
        <Image
          src={screen.path}
          alt={screen.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4 sm:mt-5 text-center">
        <span className="text-base sm:text-lg font-bold">{screen.title}</span>
        <p className="text-sm sm:text-base text-muted-foreground mt-0.5 leading-relaxed">
          {screen.description}
        </p>
      </div>
    </motion.div>
  );
}
