import { Grid, VStack } from "@/components/ui/layout";
import { supportedDeviceIds } from "@/features/landing/data/supported-devices";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

/** 지원 기기마다 좋은 점 한 줄과 최소 요구 사항 */
export function SupportedDeviceList({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { items } = getMessages(locale).home.devices;
  return (
    <Grid
      render={<ul />}
      className={cn(
        "grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5 lg:gap-x-6",
        className,
      )}
    >
      {supportedDeviceIds.map((id) => (
        <VStack
          key={id}
          render={<li />}
          gap={2}
          className="border-t-2 border-brand/25 pt-4 last:max-md:col-span-2"
        >
          <h3 className="font-display text-title font-normal">
            {items[id].name}
          </h3>
          <p className="text-caption text-gray-9">{items[id].description}</p>
          <p className="mt-auto text-xs font-semibold text-brand-deep">
            {items[id].requirement}
          </p>
        </VStack>
      ))}
    </Grid>
  );
}
