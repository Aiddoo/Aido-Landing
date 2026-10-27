"use client";
import { Menu, X } from "lucide-react";
import type { ComponentProps } from "react";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/layout";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { MessageCatalog } from "@/i18n/messages";
import {
  MobileMenuLinks,
  type MobileMenuLinksProps,
  menuTriggerClass,
} from "./mobile-menu-links";

export interface MobileMenuSheetProps
  extends MobileMenuLinksProps,
    Pick<ComponentProps<typeof Sheet>, "open" | "onOpenChange" | "triggerId"> {
  themeLabels: MessageCatalog["theme"];
}

export function MobileMenuSheet({
  open,
  onOpenChange,
  triggerId,
  themeLabels,
  ...props
}: MobileMenuSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} triggerId={triggerId}>
      <SheetTrigger
        id={triggerId ?? undefined}
        render={<Button variant="ghost" />}
        aria-label={props.labels.open}
        className={menuTriggerClass}
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[min(22rem,88vw)] gap-2 overflow-y-auto bg-cream p-0"
      >
        <SheetHeader className="p-4 pb-2">
          <HStack align="center" justify="between">
            <BrandLogo locale={props.locale} />
            <SheetClose
              render={<Button variant="ghost" />}
              aria-label={props.labels.close}
              className={menuTriggerClass}
            >
              <X aria-hidden="true" />
            </SheetClose>
          </HStack>
          <SheetTitle className="sr-only">{props.labels.menuTitle}</SheetTitle>
          <SheetDescription className="sr-only">
            {props.labels.label}
          </SheetDescription>
        </SheetHeader>
        <VStack gap={6} className="px-2 pb-8">
          <MobileMenuLinks {...props} />
          <HStack align="center" justify="between" className="px-3">
            <p className="text-micro font-semibold text-muted-foreground">
              {themeLabels.label}
            </p>
            <ThemeToggle labels={themeLabels} />
          </HStack>
        </VStack>
      </SheetContent>
    </Sheet>
  );
}
