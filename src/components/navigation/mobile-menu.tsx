"use client";
import { Menu } from "lucide-react";
import { type ComponentType, useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MobileMenuLinks,
  type MobileMenuLinksProps,
} from "./mobile-menu-links";
import type { MobileMenuPopoverProps } from "./mobile-menu-popover";

type MobileMenuProps = Omit<MobileMenuLinksProps, "onNavigate">;
export function MobileMenu({ locale, labels }: MobileMenuProps) {
  const triggerId = useId();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [PopoverMenu, setPopoverMenu] =
    useState<ComponentType<MobileMenuPopoverProps> | null>(null);
  useEffect(() => {
    if (!open || PopoverMenu) return;
    let disposed = false;
    void import("./mobile-menu-popover")
      .then(({ MobileMenuPopover }) => {
        if (!disposed) setPopoverMenu(() => MobileMenuPopover);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
    };
  }, [open, PopoverMenu]);
  return (
    <div className="mobile-menu lg:hidden">
      <div className="mobile-menu-enhanced">
        {failed ? (
          <StaticMenu locale={locale} labels={labels} open />
        ) : PopoverMenu ? (
          <PopoverMenu
            locale={locale}
            labels={labels}
            triggerId={triggerId}
            open={open}
            onOpenChange={setOpen}
            onNavigate={() => setOpen(false)}
          />
        ) : (
          <Button
            id={triggerId}
            variant="ghost"
            aria-label={labels.open}
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-busy={open}
            className="mobile-menu-button"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} aria-hidden="true" />
          </Button>
        )}
      </div>
      <noscript>
        <style>{".mobile-menu-enhanced{display:none}"}</style>
        <StaticMenu locale={locale} labels={labels} />
      </noscript>
    </div>
  );
}
function StaticMenu({
  locale,
  labels,
  open = false,
}: MobileMenuProps & { open?: boolean }) {
  return (
    <details open={open}>
      <summary aria-label={labels.open} className="mobile-menu-button">
        <Menu size={20} aria-hidden="true" />
      </summary>
      <div className="mobile-menu-panel mobile-menu-static">
        <MobileMenuLinks locale={locale} labels={labels} />
      </div>
    </details>
  );
}
