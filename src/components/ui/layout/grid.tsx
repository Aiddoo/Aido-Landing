import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

// columns는 가장 넓은 화면의 열 수다. 좁은 화면에서는 읽기 좋게 열을 줄인다.
export const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-2 lg:grid-cols-4",
    },
    gap: {
      0: "gap-0",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    columns: 1,
  },
});

export type GridProps = LayoutElementProps & VariantProps<typeof gridVariants>;

export function Grid({
  render,
  ref,
  className,
  columns,
  gap,
  align,
  ...props
}: GridProps) {
  return renderLayoutElement("grid", render, {
    ...props,
    ref,
    className: cn(gridVariants({ columns, gap, align }), className),
  });
}
