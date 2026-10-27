import type { ReactNode } from "react";
import { SentenceFlow } from "@/components/layout/sentence-flow";
import {
  PageBreadcrumb,
  type PageBreadcrumbItem,
} from "@/components/navigation/page-breadcrumb";
import { VStack, type VStackProps } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export type PageHeaderProps = Omit<VStackProps, "children" | "title"> & {
  locale: Locale;
  title: string;
  description: string;
  /** sentences: 문장마다 한 덩어리로 묶어, 줄이 바뀔 때 문장 경계에서 먼저 끊는다. */
  descriptionLayout?: "flow" | "sentences";
  /** 제목 위 손글씨 한 줄(앱·SNS 이미지의 주황 손글씨와 같은 역할) */
  kicker?: string;
  breadcrumbs?: readonly PageBreadcrumbItem[];
  /** 제목 아래 날짜·링크처럼 페이지마다 다른 보조 정보 */
  children?: ReactNode;
};

/** 하위 페이지의 머리: 현재 위치, 하나뿐인 h1, 요약. */
export function PageHeader({
  locale,
  title,
  description,
  descriptionLayout = "flow",
  kicker,
  breadcrumbs,
  children,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <VStack
      render={<header />}
      gap={5}
      className={cn("items-start", className)}
      {...props}
    >
      <PageBreadcrumb
        locale={locale}
        current={title}
        {...(breadcrumbs ? { items: breadcrumbs } : {})}
      />
      <VStack gap={1}>
        {kicker && (
          <p className="font-hand text-hand-lg text-brand-deep">{kicker}</p>
        )}
        <h1 className="text-display-lg text-ink">{title}</h1>
      </VStack>
      <p
        className={cn(
          "max-w-reading text-body-lg text-gray-9",
          descriptionLayout === "sentences" &&
            "max-w-[36em] text-balance [&:lang(en)]:max-w-[46ch]",
        )}
      >
        {descriptionLayout === "sentences" ? (
          <SentenceFlow text={description} />
        ) : (
          description
        )}
      </p>
      {children}
    </VStack>
  );
}
