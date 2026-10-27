"use client";
import { Menu } from "lucide-react";
import { type ComponentType, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Box } from "@/components/ui/layout";
import {
  MobileMenuLinks,
  type MobileMenuLinksProps,
  menuTriggerClass,
} from "./mobile-menu-links";
import type { MobileMenuSheetProps } from "./mobile-menu-sheet";

type MobileMenuProps = Omit<MobileMenuLinksProps, "onNavigate"> &
  Pick<MobileMenuSheetProps, "themeLabels">;

// 시트 코드는 처음 열 때 불러온다. 불러오지 못하면 기본 details 메뉴로 대신한다.
export function MobileMenu({ themeLabels, ...props }: MobileMenuProps) {
  const triggerId = useId();
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const navigated = useRef(false);
  const [SheetMenu, setSheetMenu] =
    useState<ComponentType<MobileMenuSheetProps> | null>(null);
  useEffect(() => {
    if (!open || SheetMenu) return;
    let disposed = false;
    void import("./mobile-menu-sheet")
      .then(({ MobileMenuSheet }) => {
        if (!disposed) setSheetMenu(() => MobileMenuSheet);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });
    return () => {
      disposed = true;
    };
  }, [open, SheetMenu]);
  return (
    <Box data-slot="mobile-menu" className="relative lg:hidden">
      <Box data-slot="mobile-menu-enhanced">
        {failed ? (
          <StaticMenu {...props} open />
        ) : SheetMenu ? (
          <SheetMenu
            {...props}
            themeLabels={themeLabels}
            triggerId={triggerId}
            open={open}
            onOpenChange={(next) => {
              if (next) navigated.current = false;
              setOpen(next);
            }}
            onNavigate={() => {
              navigated.current = true;
              setOpen(false);
            }}
            returnFocusToTrigger={() => !navigated.current}
          />
        ) : (
          <Button
            id={triggerId}
            variant="ghost"
            aria-label={props.labels.open}
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-busy={open}
            className={menuTriggerClass}
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
          </Button>
        )}
      </Box>
      <noscript>
        <style>{"[data-slot=mobile-menu-enhanced]{display:none}"}</style>
        <StaticMenu {...props} />
      </noscript>
    </Box>
  );
}

function StaticMenu({
  open = false,
  ...props
}: Omit<MobileMenuProps, "themeLabels"> & { open?: boolean }) {
  return (
    <details open={open} data-slot="mobile-menu-static">
      <summary
        aria-label={props.labels.open}
        className="flex size-11 cursor-pointer list-none items-center justify-center rounded-full border border-border bg-paper [&::-webkit-details-marker]:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </summary>
      <Box className="absolute top-14 right-0 w-[min(20rem,calc(100vw-2rem))] rounded-2xl bg-popover p-3 shadow-lift">
        <MobileMenuLinks {...props} />
      </Box>
    </details>
  );
}
