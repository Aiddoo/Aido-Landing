import Image from "next/image";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { Box, HStack, VStack } from "@/components/ui/layout";
import type { LayoutElementProps } from "@/components/ui/layout/render-layout-element";
import { cn } from "@/lib/utils";

type NudgeBubbleProps = Omit<LayoutElementProps, "children"> & {
  catSrc: string;
  name: string;
  text: string;
};

/** 친구가 콕 찔러 보낸 응원 한 줄. 고양이 프로필과 손글씨 문구로 보여 준다. */
export function NudgeBubble({
  catSrc,
  name,
  text,
  className,
  ...props
}: NudgeBubbleProps) {
  return (
    <HStack
      align="center"
      gap={3}
      className={cn(
        "w-max rounded-2xl bg-paper py-2.5 pr-5 pl-2.5 shadow-lift",
        className,
      )}
      {...props}
    >
      <Box render={<span />} className="relative shrink-0">
        <Image
          src={catSrc}
          alt=""
          width={44}
          height={44}
          sizes="44px"
          className="size-11 rounded-full bg-brand-soft"
        />
        <Box
          render={<span />}
          className="absolute -right-1 -bottom-1 grid size-5 place-items-center rounded-full bg-brand text-paper ring-2 ring-paper"
        >
          <BrandMotif motif="paw" className="size-3" />
        </Box>
      </Box>
      <VStack render={<span />}>
        <span className="text-micro font-semibold text-muted-foreground">
          {name}
        </span>
        <span className="font-hand text-hand text-ink">{text}</span>
      </VStack>
    </HStack>
  );
}
