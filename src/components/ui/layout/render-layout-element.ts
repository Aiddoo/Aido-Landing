import {
  type ComponentProps,
  cloneElement,
  createElement,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

/** 시맨틱 태그로 바꿀 요소. 예: render={<section />}, render={<a href="/ko" />} */
export type LayoutRenderElement = ReactElement<ComponentProps<"div">>;

export type LayoutElementProps = ComponentProps<"div"> & {
  render?: LayoutRenderElement | undefined;
};

/**
 * Base UI useRender의 요소형 render와 같은 규칙으로 렌더한다. render 요소의 props가 우선하고
 * className은 합치며 style은 겹쳐 쓴다. 훅을 쓰지 않아 Server Component에서도 그대로 렌더된다.
 */
export function renderLayoutElement(
  slot: string,
  render: LayoutRenderElement | undefined,
  props: ComponentProps<"div">,
) {
  // 쓰는 쪽이 data-slot으로 역할 이름을 주면 그 이름을 남긴다.
  const ownProps: ComponentProps<"div"> & { "data-slot"?: string } = {
    "data-slot": slot,
    ...props,
  };
  if (render == null) return createElement("div", ownProps);
  const renderProps = render.props;
  return cloneElement(render, {
    ...ownProps,
    ...renderProps,
    className: cn(ownProps.className, renderProps.className),
    style: { ...ownProps.style, ...renderProps.style },
  });
}
