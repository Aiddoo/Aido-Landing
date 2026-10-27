import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

// gap은 Tailwind 간격 단계(1 = 4px)를 그대로 쓴다. section-sm은 섹션 사이 리듬.
export const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
      // 좁은 화면은 세로, md 이상은 가로
      "column-to-row": "flex-col md:flex-row",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
      16: "gap-16",
      20: "gap-20",
      "section-sm": "gap-section-sm",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      "wrap-reverse": "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    direction: "column",
  },
});

export type StackProps = LayoutElementProps &
  VariantProps<typeof stackVariants>;

export function Stack({
  render,
  ref,
  className,
  direction,
  gap,
  align,
  justify,
  wrap,
  ...props
}: StackProps) {
  return renderLayoutElement("stack", render, {
    ...props,
    ref,
    className: cn(
      stackVariants({ direction, gap, align, justify, wrap }),
      className,
    ),
  });
}

export type HStackProps = Omit<StackProps, "direction">;

export function HStack(props: HStackProps) {
  return <Stack direction="row" {...props} />;
}

export type VStackProps = Omit<StackProps, "direction">;

export function VStack(props: VStackProps) {
  return <Stack direction="column" {...props} />;
}
