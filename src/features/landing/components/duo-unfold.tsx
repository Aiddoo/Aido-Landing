import { DeviceScreen } from "@/components/media/device-screen";
import { Box, HStack, VStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

/**
 * 접은 iPhone Duo가 책처럼 열려 거의 정사각형인 안쪽 화면이 되는 장면. 기본(자바스크립트 없음·동작 줄이기)은
 * 펼친 모습이고, 모션 컨트롤러가 data-duo 요소를 스크롤에 맞춰 덮개가 열리듯 움직인다.
 */
export function DuoUnfold({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { largeScreen } = getMessages(locale).home;
  return (
    <HStack
      render={<figure />}
      data-motion="duo"
      align="end"
      justify="center"
      className={cn("@container gap-[5%]", className)}
    >
      <VStack
        align="center"
        gap={4}
        className="w-[27%] shrink-0 @max-[34rem]:hidden"
      >
        <Box data-duo="companion" className="w-full">
          <DeviceScreen
            locale={locale}
            screen="duo-folded"
            tone="graphite"
            alt={largeScreen.foldedAlt}
            sizes="(min-width: 1024px) 180px, 27vw"
          />
        </Box>
        <span className="font-hand text-hand text-cream">
          {largeScreen.foldedNote}
        </span>
      </VStack>
      <VStack align="center" gap={4} className="w-full @min-[34rem]:w-[62%]">
        <Box className="relative w-full">
          <Box data-duo="device">
            <DeviceScreen
              locale={locale}
              screen="duo-unfolded"
              tone="graphite"
              alt={largeScreen.unfoldedAlt}
              sizes="(min-width: 1024px) 420px, calc(100vw - 4.5rem)"
              overlay={
                <Box
                  data-duo="sheen"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-[41%] w-[18%] bg-linear-to-r from-transparent via-white/50 to-transparent opacity-0"
                />
              }
            />
          </Box>
          <Box
            data-duo="cover"
            aria-hidden="true"
            className="pointer-events-none absolute top-[14.5%] left-[15%] w-[70%] opacity-0"
          >
            <DeviceScreen
              locale={locale}
              screen="duo-folded"
              tone="graphite"
              alt=""
              sizes="(min-width: 1024px) 300px, 70vw"
            />
          </Box>
        </Box>
        <span className="font-hand text-hand text-cream @min-[34rem]:text-hand-lg">
          {largeScreen.unfoldedNote}
        </span>
      </VStack>
    </HStack>
  );
}
