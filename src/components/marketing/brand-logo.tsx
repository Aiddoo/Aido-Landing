import Image from "next/image";
import { HStack, type HStackProps } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export type BrandLogoProps = Omit<HStackProps, "children"> & {
  locale: Locale;
};

/** 앱 아이콘 고양이와 서비스 이름. 한국어는 아이두, 영어는 Aido를 앞에 둔다. */
export function BrandLogo({ locale, className, ...props }: BrandLogoProps) {
  return (
    <HStack
      align="center"
      gap={2}
      className={cn("shrink-0", className)}
      {...props}
    >
      <Image
        src="/logo-small.webp"
        alt=""
        width={36}
        height={36}
        sizes="36px"
        className="size-9 rounded-[30%] shadow-press-soft"
      />
      <span className="font-display text-[1.375rem] leading-none text-ink">
        {locale === "ko" ? "아이두" : "Aido"}
      </span>
    </HStack>
  );
}
