import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";

const SITE_URL = "https://aido.kr";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

// 정규 URL은 로케일 세그먼트가 붙은 /{locale}{path} 뿐이다. bare "/"는
// 로케일로 리다이렉트되는 비정규 스텁이라 사이트맵에 넣지 않는다.
const routes: Route[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/patch-notes", changeFrequency: "weekly", priority: 0.7 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
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
