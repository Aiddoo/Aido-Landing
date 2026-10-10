import { StructuredData } from "@/components/seo/structured-data";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { SITE_URL } from "@/lib/seo";
export function BreadcrumbData({
  locale,
  path,
  title,
}: {
  locale: Locale;
  path: string;
  title: string;
}) {
  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: getMessages(locale).accessibility.home,
            item: `${SITE_URL}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: title,
            item: `${SITE_URL}/${locale}${path}`,
          },
        ],
      }}
    />
  );
}
