import { cva } from "class-variance-authority";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { match } from "ts-pattern";
import {
  getHomeScreen,
  type HomeScreenDevice,
  type HomeScreenKey,
} from "@/components/media/data/home-screens";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Box } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// 테두리·둥글기는 기기 폭(cqw)에 비례해야 어떤 크기에서도 같은 기기로 보인다.
const bezelVariants = cva(
  "relative before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-white/15 before:ring-inset",
  {
    variants: {
      device: {
        iphone: "rounded-[15.5cqw] p-[3.2cqw]",
        // 가로로 펼친 iPhone Duo: 얇은 테두리의 넓은 화면, 가운데 접힘선은 그리지 않는다.
        "duo-open": "rounded-[4.6cqw] p-[1.2cqw]",
        ipad: "rounded-[6cqw] p-[2.8cqw]",
        android: "rounded-[11cqw] p-[2.4cqw]",
      },
      // 어두운 바탕에서는 잉크 테두리가 묻혀 한 단계 밝은 회색을 쓴다.
      tone: {
        ink: "bg-ink",
        graphite: "bg-gray-9",
      },
    },
    defaultVariants: { tone: "ink" },
  },
);

const screenRadius = {
  iphone: "rounded-[12.3cqw]",
  "duo-open": "rounded-[3.5cqw]",
  ipad: "rounded-[3.2cqw]",
  android: "rounded-[8.6cqw]",
} as const satisfies Record<DeviceFrame, string>;

export type DeviceFrame = HomeScreenDevice | "android";

/** 홈 카탈로그의 화면, 또는 가이드·서비스 캡처처럼 직접 가진 이미지와 원본 크기 */
type DeviceScreenSource =
  | { locale: Locale; screen: HomeScreenKey }
  | { device: DeviceFrame; src: string; width: number; height: number };

type DeviceScreenImageProps = Omit<
  ComponentProps<typeof Image>,
  "src" | "width" | "height" | "fill" | "overrideSrc" | "className"
>;

type DeviceScreenProps = DeviceScreenImageProps &
  DeviceScreenSource & {
    /** 기기 바깥 틀의 className */
    className?: string;
    tone?: "ink" | "graphite";
    /** 화면 위에 겹쳐 그릴 장식(빛 반사 등) */
    overlay?: ReactNode;
  };

function resolveDeviceScreen(
  props: DeviceScreenImageProps & DeviceScreenSource,
) {
  if ("screen" in props) {
    const { locale, screen, ...imageProps } = props;
    return { ...getHomeScreen(locale, screen), imageProps };
  }
  const { device, src, width, height, ...imageProps } = props;
  return { device, src, width, height, imageProps };
}

/** 실제 앱 화면을 CSS로 그린 기기 틀(iPhone·iPhone Duo·iPad·Android)에 넣는다. */
export function DeviceScreen({
  className,
  tone = "ink",
  overlay,
  ...props
}: DeviceScreenProps) {
  const { src, device, width, height, imageProps } = resolveDeviceScreen(props);
  return (
    <Box data-device={device} className={cn("@container", className)}>
      <Box className={cn(bezelVariants({ device, tone }), "shadow-lift")}>
        <AspectRatio
          ratio={width / height}
          className={cn("overflow-hidden bg-paper", screenRadius[device])}
        >
          <Image src={src} fill className="object-cover" {...imageProps} />
          {overlay}
        </AspectRatio>
        {match(device)
          .with("iphone", () => (
            <Box
              aria-hidden="true"
              className="absolute top-[5.4cqw] left-1/2 h-[7.4cqw] w-[26cqw] -translate-x-1/2 rounded-full bg-ink"
            />
          ))
          .with("duo-open", "ipad", "android", () => null)
          .exhaustive()}
      </Box>
    </Box>
  );
}
