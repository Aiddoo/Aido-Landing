import type { ComponentProps, CSSProperties } from "react";
import { cn } from "@/lib/utils";

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: ComponentProps<"div"> & { ratio: number }) {
  // 비율은 CSS 변수 하나로만 넘겨 이미지가 오기 전에도 자리를 차지한다(CLS 0).
  const ratioStyle: CSSProperties & { "--ratio": number } = {
    ...style,
    "--ratio": ratio,
  };
  return (
    <div
      data-slot="aspect-ratio"
      style={ratioStyle}
      className={cn("relative aspect-(--ratio)", className)}
      {...props}
    />
  );
}

export { AspectRatio };
