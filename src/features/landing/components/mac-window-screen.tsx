import Image from "next/image";
import type { ComponentProps } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Box, HStack } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

type MacWindowScreenProps = Omit<
  ComponentProps<typeof Image>,
  "fill" | "overrideSrc" | "className" | "width" | "height"
> & {
  width: number;
  height: number;
  /** 노트북 바깥 틀의 className */
  className?: string;
};

/**
 * Apple 실리콘 Mac에서 iPad용 앱이 창으로 열린 모습. 덮개·받침은 CSS로 그리고,
 * 크기는 노트북 폭(cqw)에 비례한다.
 */
export function MacWindowScreen({
  width,
  height,
  className,
  ...imageProps
}: MacWindowScreenProps) {
  return (
    <Box data-device="mac" className={cn("@container", className)}>
      <Box className="relative mx-auto w-[88%] rounded-t-[3.4cqw] bg-ink p-[1.5cqw] pb-[2.2cqw] shadow-lift before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:ring-1 before:ring-white/15 before:ring-inset">
        <AspectRatio
          ratio={16 / 10}
          className="overflow-hidden rounded-[1cqw] bg-linear-to-br from-[#ffd9c7] via-[#fff1e8] to-[#ffc3a8]"
        >
          <Box
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2.4cqw] bg-white/55 backdrop-blur-sm"
          />
          <Box className="absolute top-[5.6cqw] left-1/2 h-[47cqw] -translate-x-1/2 overflow-hidden rounded-[1.4cqw] bg-paper shadow-lift ring-1 ring-black/10">
            <HStack
              aria-hidden="true"
              align="center"
              gap={0}
              className="h-[3cqw] gap-[0.7cqw] border-b border-black/5 bg-[#f3f1ef] px-[1.2cqw]"
            >
              <Box className="size-[1.1cqw] rounded-full bg-[#ff5f57]" />
              <Box className="size-[1.1cqw] rounded-full bg-[#febc2e]" />
              <Box className="size-[1.1cqw] rounded-full bg-[#28c840]" />
            </HStack>
            <AspectRatio ratio={width / height} className="h-[44cqw]">
              <Image fill className="object-cover" {...imageProps} />
            </AspectRatio>
          </Box>
        </AspectRatio>
      </Box>
      <Box
        aria-hidden="true"
        className="relative h-[2.2cqw] rounded-b-[2.4cqw] bg-linear-to-b from-[#dcd9d6] to-[#a8a5a2] shadow-lift"
      >
        <Box className="absolute top-0 left-1/2 h-[0.9cqw] w-[14cqw] -translate-x-1/2 rounded-b-[1cqw] bg-[#97948f]" />
      </Box>
    </Box>
  );
}
