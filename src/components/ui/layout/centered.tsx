import { cn } from "@/lib/utils";
import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

export type CenteredProps = LayoutElementProps;

/** 자식을 가로·세로 가운데에 쌓는다. 글자 정렬은 부모가 className으로 정한다. */
export function Centered({ render, ref, className, ...props }: CenteredProps) {
  return renderLayoutElement("centered", render, {
    ...props,
    ref,
    className: cn("flex flex-col items-center justify-center", className),
  });
}
