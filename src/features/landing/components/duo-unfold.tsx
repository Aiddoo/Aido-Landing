import { getHomeScreen } from "@/components/media/data/home-screens";
import { DeviceScreen } from "@/components/media/device-screen";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Box, HStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

const openScreenSizes = "(min-width: 1024px) 520px, calc(100vw - 4.5rem)";
// 펼친 기기가 무대 폭에서 차지하는 비율. 나머지 왼쪽에 접힌 뒷면이 기기 뒤로 살짝 겹쳐 선다.
const OPEN_DEVICE_SHARE = 0.72;

/**
 * 가로로 펼친 iPhone Duo와 옆에 세운 접힌 뒷면. 기본(자바스크립트 없음·동작 줄이기)은 이음새 없는 한 장의
 * 펼친 화면이고, 모션 컨트롤러가 같은 화면을 반씩 자른 두 면(data-duo="leaf")을 V자에서 평평하게 편 뒤
 * 한 장(data-duo="flat")으로 바꾼다.
 */
export function DuoUnfold({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { largeScreen } = getMessages(locale).home;
  const { width, height } = getHomeScreen(locale, "duo-open");
  return (
    <Box
      render={<figure />}
      data-motion="duo"
      className={cn("@container", className)}
    >
      <AspectRatio
        ratio={width / (height * OPEN_DEVICE_SHARE)}
        className="@max-[34rem]:aspect-[1440/1010]"
      >
        <Box
          data-duo="companion"
          data-device="duo-back"
          aria-hidden="true"
          className="@container absolute inset-y-0 left-0 aspect-[1398/2034] @max-[34rem]:hidden"
        >
          <FoldedDuoBack />
        </Box>
        <Box
          data-duo="device"
          className="absolute top-0 right-0 w-[72%] perspective-[240cqw] @max-[34rem]:w-full"
        >
          <Box data-duo="flat">
            <DeviceScreen
              locale={locale}
              screen="duo-open"
              tone="graphite"
              alt={largeScreen.unfoldedAlt}
              sizes={openScreenSizes}
              overlay={
                <Box
                  data-duo="sheen"
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-[100deg] from-transparent via-white/45 to-transparent opacity-0"
                />
              }
            />
          </Box>
          {(["left", "right"] as const).map((side) => (
            <Box
              key={side}
              data-duo="leaf"
              data-side={side}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-0 w-1/2 overflow-hidden opacity-0",
                side === "left" ? "left-0 origin-right" : "right-0 origin-left",
              )}
            >
              <DeviceScreen
                locale={locale}
                screen="duo-open"
                tone="graphite"
                alt=""
                sizes={openScreenSizes}
                className={cn(
                  "absolute top-0 w-[200%]",
                  side === "left" ? "left-0" : "right-0",
                )}
              />
              <Box
                data-duo="shade"
                className={cn(
                  "absolute inset-0 from-black/30 to-transparent",
                  side === "left" ? "bg-linear-to-l" : "bg-linear-to-r",
                )}
              />
            </Box>
          ))}
        </Box>
      </AspectRatio>
      <HStack
        render={<figcaption />}
        align="center"
        className="mt-5 font-hand text-hand text-cream @min-[34rem]:text-hand-lg"
      >
        <span className="w-[33.5%] text-center @max-[34rem]:hidden">
          {largeScreen.foldedNote}
        </span>
        <span className="ml-auto w-[72%] text-center @max-[34rem]:w-full">
          {largeScreen.unfoldedNote}
        </span>
      </HStack>
    </Box>
  );
}

/** 접어 세운 iPhone Duo의 뒷면. 카메라 섬과 렌즈 두 개만 그린 장식이다. */
function FoldedDuoBack() {
  return (
    <Box className="relative size-full rounded-[15cqw] bg-linear-to-br from-gray-8 via-gray-9 to-gray-8 shadow-lift ring-1 ring-white/15 ring-inset">
      <Box className="absolute top-[5cqw] left-[5cqw] h-[33cqw] w-[62cqw] rounded-[16.5cqw] bg-gray-8 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]">
        {(["left-[3.5cqw]", "left-[30.5cqw]"] as const).map((position) => (
          <Box
            key={position}
            className={cn(
              "absolute top-[3.5cqw] size-[26cqw] rounded-full bg-gray-9 p-[3.5cqw] shadow-[0_0.6cqw_1.5cqw_rgb(0_0_0/0.25)]",
              position,
            )}
          >
            <Box className="size-full rounded-full bg-[radial-gradient(circle_at_35%_35%,#4a4f5c,#0b0c10_62%)] ring-[1.2cqw] ring-black/70" />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
