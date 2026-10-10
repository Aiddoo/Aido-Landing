import type { CSSProperties, ReactNode } from "react";
export function PhonePreview({
  children,
  rotate,
  className,
}: {
  children: ReactNode;
  rotate: number;
  className: string;
}) {
  const style: CSSProperties & { "--phone-rotation": string } = {
    "--phone-rotation": `${rotate}deg`,
  };
  return (
    <figure style={style} className={className}>
      {children}
    </figure>
  );
}
