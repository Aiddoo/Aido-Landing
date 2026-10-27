import { getAppScreenshot } from "@/components/media/data/app-screenshots";
import { DeviceScreen } from "@/components/media/device-screen";
import { Box } from "@/components/ui/layout";
import { MacWindowScreen } from "@/features/landing/components/mac-window-screen";
import { getDeviceShowcaseScreen } from "@/features/landing/data/supported-devices";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

/**
 * Mac 앞에 iPad·Android 폰·iPhone·가로로 펼친 iPhone Duo를 세운 한 장면. 장면 비율을 먼저 정해
 * 이미지가 늦게 와도 자리가 바뀌지 않고, 기기 폭은 장면 폭에 비례한다.
 */
export function DeviceShowcase({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { items } = getMessages(locale).home.devices;
  const android = getAppScreenshot(locale, "month");
  return (
    <Box
      className={cn(
        "relative aspect-[10/9] w-full sm:aspect-[16/10] md:aspect-[2/1]",
        className,
      )}
    >
      <Box
        aria-hidden="true"
        className="absolute inset-x-[8%] bottom-[-2%] h-[18%] rounded-[50%] bg-brand/15 blur-2xl"
      />
      <Box className="absolute top-0 left-1/2 w-[92%] -translate-x-1/2 sm:w-[74%] md:w-[60%]">
        <Box data-motion="float">
          <MacWindowScreen
            {...getDeviceShowcaseScreen(locale, "mac-friend-feed")}
            alt={items.mac.alt}
            sizes="(min-width: 1024px) 150px, (min-width: 768px) 14vw, 22vw"
          />
        </Box>
      </Box>
      <Box className="absolute bottom-0 left-0 w-[36%] sm:left-[3%] sm:w-[28%] md:left-[6%] md:w-[24%]">
        <Box data-motion="float">
          <DeviceScreen
            {...getDeviceShowcaseScreen(locale, "ipad-checklist")}
            device="ipad"
            alt={items.tablet.alt}
            sizes="(min-width: 1024px) 260px, (min-width: 768px) 24vw, 36vw"
          />
        </Box>
      </Box>
      <Box className="absolute right-0 bottom-0 w-[47%] sm:right-[1%] sm:w-[39%] md:right-[2%] md:w-[36%]">
        <Box data-motion="float">
          <DeviceScreen
            locale={locale}
            screen="duo-open"
            tone="graphite"
            alt={items.foldable.alt}
            sizes="(min-width: 1024px) 370px, (min-width: 768px) 36vw, 47vw"
          />
        </Box>
      </Box>
      <Box className="absolute bottom-0 left-[25%] w-[17%] sm:left-[25%] sm:w-[13%] md:left-[27%] md:w-[11%]">
        <Box data-motion="float">
          <DeviceScreen
            device={android.device}
            src={android.src}
            width={android.width}
            height={android.height}
            alt={items.android.alt}
            sizes="(min-width: 1024px) 120px, (min-width: 768px) 11vw, 17vw"
          />
        </Box>
      </Box>
      <Box className="absolute right-[38%] bottom-0 w-[17%] sm:right-[33%] sm:w-[13%] md:right-[35%] md:w-[11%]">
        <Box data-motion="float">
          <DeviceScreen
            locale={locale}
            screen="widgets"
            alt={items.iphone.alt}
            sizes="(min-width: 1024px) 120px, (min-width: 768px) 11vw, 17vw"
          />
        </Box>
      </Box>
    </Box>
  );
}
