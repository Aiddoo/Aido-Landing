import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { localizedPath } from "@/lib/public-routes";

export interface PageBreadcrumbItem {
  label: string;
  /** 같은 사이트의 앵커(예: 홈의 기능 가이드 목록). 없으면 텍스트만 보인다. */
  anchorHref?: string;
}

export function PageBreadcrumb({
  locale,
  items,
  current,
}: {
  locale: Locale;
  items?: readonly PageBreadcrumbItem[];
  current: string;
}) {
  const messages = getMessages(locale);
  return (
    <Breadcrumb aria-label={messages.accessibility.breadcrumb}>
      <BreadcrumbList className="text-caption">
        <BreadcrumbItem>
          <Link
            href={localizedPath(locale, "")}
            className="transition-colors hover:text-brand-deep"
          >
            {messages.accessibility.home}
          </Link>
        </BreadcrumbItem>
        {items?.map((item) => (
          <Fragment key={item.label}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.anchorHref ? (
                <a
                  href={item.anchorHref}
                  className="transition-colors hover:text-brand-deep"
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="line-clamp-1">{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
