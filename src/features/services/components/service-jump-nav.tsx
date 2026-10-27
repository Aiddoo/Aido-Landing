import { HStack, type HStackProps } from "@/components/ui/layout";
import { serviceFeatures } from "@/features/services/data/service-features";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export type ServiceJumpNavProps = Omit<HStackProps, "children" | "render"> & {
  locale: Locale;
};

export function ServiceJumpNav({ locale, ...props }: ServiceJumpNavProps) {
  const content = getMessages(locale).services;
  return (
    <HStack
      render={<nav aria-label={content.jumpLabel} />}
      wrap="wrap"
      gap={2}
      {...props}
    >
      {serviceFeatures.map(({ id }) => (
        <a
          key={id}
          href={`#${id}`}
          className="inline-flex h-11 items-center rounded-full bg-card px-4 text-caption font-semibold text-gray-9 shadow-press-soft transition-colors hover:bg-brand-soft hover:text-brand-deep"
        >
          {content.features[id].navigationLabel}
        </a>
      ))}
    </HStack>
  );
}
