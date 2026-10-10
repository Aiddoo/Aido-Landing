import type { ComponentProps, ReactNode } from "react";
import { MotionBoundary } from "@/components/motion/motion-boundary";
import type { Locale } from "@/i18n/config";
import type { PublicPath } from "@/lib/public-routes";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface MarketingLayoutProps
  extends Omit<ComponentProps<"main">, "children" | "id"> {
  locale: Locale;
  path: PublicPath;
  children: ReactNode;
  footer?: ReactNode;
}
export function MarketingLayout({
  locale,
  path,
  children,
  footer,
  ...props
}: MarketingLayoutProps) {
  return (
    <>
      <SiteHeader locale={locale} path={path} />
      <MotionBoundary>
        <main id="content" {...props}>
          {children}
        </main>
      </MotionBoundary>
      {footer ?? <SiteFooter locale={locale} />}
    </>
  );
}
