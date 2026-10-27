import { cva, type VariantProps } from "class-variance-authority";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

// gap으로 해결되지 않는 불규칙한 간격에만 쓴다. 크기는 Tailwind 간격 단계(1 = 4px).
const verticalSpacingVariants = cva("shrink-0", {
  variants: {
    size: {
      1: "h-1",
      2: "h-2",
      3: "h-3",
      4: "h-4",
      5: "h-5",
      6: "h-6",
      8: "h-8",
      10: "h-10",
      12: "h-12",
      16: "h-16",
      20: "h-20",
      section: "h-section",
      "section-sm": "h-section-sm",
    },
  },
});

const horizontalSpacingVariants = cva("shrink-0", {
  variants: {
    size: {
      1: "w-1",
      2: "w-2",
      3: "w-3",
      4: "w-4",
      5: "w-5",
      6: "w-6",
      8: "w-8",
      10: "w-10",
      12: "w-12",
      16: "w-16",
      20: "w-20",
      section: "w-section",
      "section-sm": "w-section-sm",
    },
  },
});

type SpacingSize = NonNullable<
  VariantProps<typeof verticalSpacingVariants>["size"]
>;

export type SpacingProps = Omit<LayoutElementProps, "children"> & {
  size: SpacingSize;
  direction?: "vertical" | "horizontal";
};

export function Spacing({
  render,
  ref,
  className,
  size,
  direction = "vertical",
  ...props
}: SpacingProps) {
  return renderLayoutElement("spacing", render, {
    ...props,
    ref,
    "aria-hidden": true,
    className: cn(
      match(direction)
        .with("vertical", () => verticalSpacingVariants({ size }))
        .with("horizontal", () => horizontalSpacingVariants({ size }))
        .exhaustive(),
      className,
    ),
  });
}
