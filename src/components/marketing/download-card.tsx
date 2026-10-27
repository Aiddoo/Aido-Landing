import Image from "next/image";
import { useId } from "react";
import { BrandMotif } from "@/components/marketing/brand-motif";
import { StoreButtons } from "@/components/marketing/store-buttons";
import { Box, Stack, type StackProps, VStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

export type DownloadCardProps = Omit<StackProps, "children" | "render"> & {
  locale: Locale;
};

/** 스토어 버튼으로 마무리하는 다운로드 안내. 바깥 간격은 쓰는 쪽이 정한다. */
export function DownloadCard({
  locale,
  className,
  ...props
}: DownloadCardProps) {
  const { cta, storeButtons } = getMessages(locale);
  const titleId = useId();
  return (
    <Stack
      render={<section aria-labelledby={titleId} />}
      direction="column-to-row"
      align="stretch"
      justify="between"
      className={cn(
        "relative overflow-hidden rounded-3xl md:items-end bg-linear-to-br from-brand-soft to-cream ring-1 ring-brand/15",
        className,
      )}
      {...props}
    >
      <BrandMotif
        motif="paw"
        className="absolute top-3 right-3 size-14 rotate-12 text-brand/10 sm:top-6 sm:right-8 sm:size-20 md:right-auto md:left-[46%]"
      />
      <BrandMotif
        motif="fish-bone"
        className="absolute bottom-6 left-[55%] h-5 w-10 -rotate-12 text-bone/70 max-md:hidden"
      />
      <VStack
        gap={4}
        className="relative items-center px-6 pt-10 text-center md:items-start md:px-12 md:py-14 md:text-left"
      >
        <p className="font-hand text-hand-lg text-brand-deep">
          {cta.titleLineOne}
        </p>
        <h2 id={titleId} className="-mt-2 text-display-md text-ink">
          {cta.titleLineTwo}
        </h2>
        <p className="max-w-reading text-gray-9">{cta.description}</p>
        <StoreButtons
          content={storeButtons}
          placement="download"
          className="mx-auto md:mx-0"
        />
        <p className="text-caption font-semibold text-gray-9">{cta.devices}</p>
        <p className="-mt-3 text-caption text-gray-8">{cta.closingNote}</p>
      </VStack>
      <Box className="relative mx-auto -mb-2 w-44 shrink-0 md:mx-0 md:mr-10 md:w-64">
        <Image
          src="/app-assets/cat-hi.webp"
          alt=""
          width={480}
          height={480}
          sizes="(min-width: 768px) 256px, 176px"
          className="h-auto w-full"
        />
      </Box>
    </Stack>
  );
}
