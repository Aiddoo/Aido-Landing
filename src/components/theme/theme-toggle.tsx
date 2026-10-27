"use client";
import { type ComponentType, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { MessageCatalog } from "@/i18n/messages";
import { cn } from "@/lib/utils";
import { ThemeIcon } from "./theme-icon";
import type { ThemeMenuProps } from "./theme-menu";

const triggerClass =
  "size-11 rounded-full border border-border bg-paper text-ink hover:bg-brand-soft aria-expanded:bg-brand-soft [&_svg:not([class*='size-'])]:size-5";

type ThemeToggleProps = Omit<
  ThemeMenuProps,
  "open" | "onOpenChange" | "labels"
> & {
  labels: MessageCatalog["theme"];
};

// 메뉴 코드(Base UI Menu)는 처음 열 때 불러와 첫 화면 JavaScript를 늘리지 않는다.
export function ThemeToggle({ labels, className, ...props }: ThemeToggleProps) {
  const [open, setOpen] = useState(false);
  const [Menu, setMenu] = useState<ComponentType<ThemeMenuProps> | null>(null);
  useEffect(() => {
    if (!open || Menu) return;
    let disposed = false;
    void import("./theme-menu").then(({ ThemeMenu }) => {
      if (!disposed) setMenu(() => ThemeMenu);
    });
    return () => {
      disposed = true;
    };
  }, [open, Menu]);
  if (Menu)
    return (
      <Menu
        open={open}
        onOpenChange={setOpen}
        labels={labels}
        data-slot="theme-toggle"
        className={cn(triggerClass, className)}
        {...props}
      />
    );
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={labels.toggle}
      aria-haspopup="menu"
      aria-expanded="false"
      aria-busy={open}
      data-slot="theme-toggle"
      className={cn(triggerClass, className)}
      onClick={() => setOpen(true)}
    >
      <ThemeIcon />
    </Button>
  );
}
