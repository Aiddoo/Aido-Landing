import { StructuredData } from "@/components/seo/structured-data";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { SITE_URL } from "@/lib/seo";
export function BreadcrumbData({
  locale,
  path,
  title,
  parents = [],
}: {
  locale: Locale;
  path: string;
  title: string;
  /** 홈과 현재 페이지 사이의 상위 페이지(예: 패치노트 > 1.15.0) */
  parents?: readonly { name: string; path: string }[];
}) {
  const trail = [
    { name: getMessages(locale).accessibility.home, path: "" },
    ...parents,
    { name: title, path },
  ];
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}/${locale}${item.path}`,
        })),
      }}
    />
  );
}
