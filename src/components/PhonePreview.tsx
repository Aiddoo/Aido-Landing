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
  return (
    <figure
      style={{ "--phone-rotation": `${rotate}deg` } as CSSProperties}
      className={className}
    >
      {children}
    </figure>
  );
}
