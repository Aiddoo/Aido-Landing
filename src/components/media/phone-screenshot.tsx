import Image from "next/image";
import type { ComponentProps } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Box } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export type PhoneScreenshotProps = Omit<
  ComponentProps<typeof Image>,
  "fill" | "width" | "height" | "className"
> & {
  /** 원본 크기. 비율로만 쓰여 이미지가 오기 전에도 자리를 차지한다. */
  width: number;
  height: number;
  className?: string;
};

/** 실제 앱 화면을 얇은 기기 테두리 안에 넣는다. 폭은 부모가 정한다. */
export function PhoneScreenshot({
  width,
  height,
  className,
  ...props
}: PhoneScreenshotProps) {
  return (
    <Box
      data-slot="phone-screenshot"
      className={cn(
        "rounded-[2.25rem] bg-neutral-900 p-1.5 shadow-lift ring-1 ring-black/5",
        className,
      )}
    >
      <AspectRatio
        ratio={width / height}
        className="overflow-hidden rounded-[1.875rem] bg-paper"
      >
        <Image fill className="object-cover" {...props} />
      </AspectRatio>
    </Box>
  );
}
