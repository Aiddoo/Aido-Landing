import {
  type LayoutElementProps,
  renderLayoutElement,
} from "./render-layout-element";

export type BoxProps = LayoutElementProps;

/** 의미 있는 태그로 감싸는 가장 작은 블록. 간격·색은 className으로 정한다. */
export function Box({ render, ...props }: BoxProps) {
  return renderLayoutElement("box", render, props);
}
