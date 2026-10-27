"use client";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";
import { match } from "ts-pattern";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { MessageCatalog } from "@/i18n/messages";
import { ThemeIcon } from "./theme-icon";

const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

export type ThemeMenuProps = Pick<
  ComponentProps<typeof DropdownMenu>,
  "open" | "onOpenChange"
> &
  Omit<ComponentProps<typeof DropdownMenuTrigger>, "children" | "render"> & {
    labels: MessageCatalog["theme"];
  };

export function ThemeMenu({
  open,
  onOpenChange,
  labels,
  ...triggerProps
}: ThemeMenuProps) {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" />}
        aria-label={labels.toggle}
        {...triggerProps}
      >
        <ThemeIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{labels.label}</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => {
              const next = themes.find((item) => item === value);
              if (next) setTheme(next);
            }}
          >
            {themes.map((item) => (
              <DropdownMenuRadioItem
                key={item}
                value={item}
                className="min-h-10 gap-2"
              >
                <OptionIcon theme={item} />
                {labels[item]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OptionIcon({ theme }: { theme: Theme }) {
  return match(theme)
    .with("light", () => <Sun aria-hidden="true" />)
    .with("dark", () => <Moon aria-hidden="true" />)
    .with("system", () => <Monitor aria-hidden="true" />)
    .exhaustive();
}
