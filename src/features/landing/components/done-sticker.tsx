import { Check } from "lucide-react";
import { Box, HStack } from "@/components/ui/layout";
import type { LayoutElementProps } from "@/components/ui/layout/render-layout-element";
import { cn } from "@/lib/utils";

type DoneStickerProps = Omit<LayoutElementProps, "children"> & {
  text: string;
};

/** 끝낸 할 일 하나를 체크 표시와 손글씨로 붙인 스티커 */
export function DoneSticker({ text, className, ...props }: DoneStickerProps) {
  return (
    <HStack
      align="center"
      gap={2}
      className={cn(
        "w-max rounded-xl bg-paper py-2 pr-4 pl-2.5 shadow-lift",
        className,
      )}
      {...props}
    >
      <Box
        render={<span />}
        className="grid size-6 place-items-center rounded-md bg-brand text-ink"
      >
        <Check aria-hidden="true" className="size-4" strokeWidth={3} />
      </Box>
      <span className="font-hand text-hand text-ink">{text}</span>
    </HStack>
  );
}
