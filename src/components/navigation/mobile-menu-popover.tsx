"use client";
import { Menu } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MobileMenuLinks,
  type MobileMenuLinksProps,
} from "./mobile-menu-links";

export interface MobileMenuPopoverProps
  extends MobileMenuLinksProps,
    Pick<
      ComponentProps<typeof Popover>,
      "open" | "onOpenChange" | "triggerId"
    > {}
export function MobileMenuPopover({
  locale,
  labels,
  open,
  onOpenChange,
  triggerId,
  onNavigate,
}: MobileMenuPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange} triggerId={triggerId}>
      <PopoverTrigger
        id={triggerId ?? undefined}
        render={<Button variant="ghost" />}
        aria-label={labels.open}
        className="mobile-menu-button"
      >
        <Menu size={20} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="mobile-menu-panel">
        <PopoverTitle className="sr-only">{labels.label}</PopoverTitle>
        <MobileMenuLinks
          locale={locale}
          labels={labels}
          {...(onNavigate ? { onNavigate } : {})}
        />
      </PopoverContent>
    </Popover>
  );
}
