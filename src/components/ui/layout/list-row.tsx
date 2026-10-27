import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

const listRowVariants = cva("flex items-center gap-3", {
  variants: {
    verticalPadding: {
      small: "py-1",
      medium: "py-2",
      large: "py-4",
      xlarge: "py-5",
    },
    horizontalPadding: {
      none: "",
      small: "px-2",
      medium: "px-4",
    },
    border: {
      none: "",
      indented: "border-b border-border",
    },
  },
  defaultVariants: {
    verticalPadding: "medium",
    horizontalPadding: "none",
    border: "none",
  },
});

const listRowSlotVariants = cva("flex shrink-0", {
  variants: {
    alignment: {
      top: "items-start self-start",
      center: "items-center",
    },
  },
  defaultVariants: {
    alignment: "center",
  },
});

type ListRowAlignment = NonNullable<
  VariantProps<typeof listRowSlotVariants>["alignment"]
>;

export type ListRowProps = Omit<LayoutElementProps, "children"> &
  VariantProps<typeof listRowVariants> & {
    left?: ReactNode;
    contents?: ReactNode;
    right?: ReactNode;
    leftAlignment?: ListRowAlignment;
    rightAlignment?: ListRowAlignment;
  };

/** 앱 ListRow와 같은 왼쪽·내용·오른쪽 슬롯 행. 목록에서는 render={<li />}로 쓴다. */
export function ListRow({
  render,
  ref,
  className,
  left,
  contents,
  right,
  verticalPadding,
  horizontalPadding,
  border,
  leftAlignment,
  rightAlignment,
  ...props
}: ListRowProps) {
  return renderLayoutElement("list-row", render, {
    ...props,
    ref,
    className: cn(
      listRowVariants({ verticalPadding, horizontalPadding, border }),
      className,
    ),
    children: (
      <>
        {left != null && (
          <div
            data-slot="list-row-left"
            className={listRowSlotVariants({ alignment: leftAlignment })}
          >
            {left}
          </div>
        )}
        {contents != null && (
          <div data-slot="list-row-contents" className="min-w-0 flex-1">
            {contents}
          </div>
        )}
        {right != null && (
          <div
            data-slot="list-row-right"
            className={listRowSlotVariants({ alignment: rightAlignment })}
          >
            {right}
          </div>
        )}
      </>
    ),
  });
}
