import type { MetadataRoute } from "next";
import { releaseNotes } from "@/data/patch-notes";
import { defaultLocale, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
};

// 홈·패치노트는 릴리스마다 갱신되므로 최신 릴리스 날짜를,
// 법적 문서는 각 문서의 시행일을 lastModified로 쓴다.
const latestReleaseDate = new Date(releaseNotes[0].date);
const termsEffectiveDate = new Date("2026-04-19");
const privacyEffectiveDate = new Date("2026-03-13");

// 정규 URL은 로케일 세그먼트가 붙은 /{locale}{path} 뿐이다. bare "/"는
// 로케일로 리다이렉트되는 비정규 스텁이라 사이트맵에 넣지 않는다.
const routes: Route[] = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: latestReleaseDate,
  },
  {
    path: "/patch-notes",
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: latestReleaseDate,
  },
  {
    path: "/terms",
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: termsEffectiveDate,
  },
  {
    path: "/privacy",
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: privacyEffectiveDate,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${route.path}`]),
          ),
          "x-default": `${SITE_URL}/${defaultLocale}${route.path}`,
        },
      },
    })),
  );
}
