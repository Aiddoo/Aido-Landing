import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

// 앱 ReadableContent처럼 넓은 화면에서 내용을 가운데 최대 폭으로 모은다. 배경은 부모가 깐다.
export const readableContentVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      page: "max-w-page",
      narrow: "max-w-narrow",
      reading: "max-w-reading",
    },
    gutter: {
      true: "px-gutter",
      false: "",
    },
  },
  defaultVariants: {
    size: "page",
    gutter: true,
  },
});

export type ReadableContentProps = LayoutElementProps &
  VariantProps<typeof readableContentVariants>;

export function ReadableContent({
  render,
  ref,
  className,
  size,
  gutter,
  ...props
}: ReadableContentProps) {
  return renderLayoutElement("readable-content", render, {
    ...props,
    ref,
    className: cn(readableContentVariants({ size, gutter }), className),
  });
}
