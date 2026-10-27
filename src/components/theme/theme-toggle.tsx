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
import { cn } from "@/lib/utils";

const themes = ["light", "dark", "system"] as const;
type Theme = (typeof themes)[number];

type ThemeToggleProps = Omit<
  ComponentProps<typeof DropdownMenuTrigger>,
  "children" | "render"
> & {
  labels: MessageCatalog["theme"];
};

/** 밝게·어둡게·기기 설정 중 하나를 고른다. 아이콘은 CSS(dark:)로 바뀌어 하이드레이션 전후가 같다. */
export function ThemeToggle({ labels, className, ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon" />}
        aria-label={labels.toggle}
        data-slot="theme-toggle"
        className={cn(
          "size-11 rounded-full border border-border bg-paper text-ink hover:bg-brand-soft aria-expanded:bg-brand-soft [&_svg:not([class*='size-'])]:size-5",
          className,
        )}
        {...props}
      >
        <Sun aria-hidden="true" className="dark:hidden" />
        <Moon aria-hidden="true" className="hidden dark:block" />
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
                <ThemeIcon theme={item} />
                {labels[item]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  return match(theme)
    .with("light", () => <Sun aria-hidden="true" />)
    .with("dark", () => <Moon aria-hidden="true" />)
    .with("system", () => <Monitor aria-hidden="true" />)
    .exhaustive();
}
