import type { MetadataRoute } from "next";
import { SERVICE_CONTENT_UPDATED_AT } from "@/data/app-screenshots";
import { featureGuides } from "@/data/feature-guides";
import { releaseNotes } from "@/data/patch-notes";
import { defaultLocale, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
};

const latestReleaseDate = new Date(releaseNotes[0].date);
const termsEffectiveDate = new Date("2026-04-19");
// Website analytics notice added; the app policy's effective date is unchanged.
const privacyLastModifiedDate = new Date("2026-10-04");

// 정규 URL은 로케일 세그먼트가 붙은 /{locale}{path} 뿐이다. bare "/"는
// 로케일로 리다이렉트되는 비정규 스텁이라 사이트맵에 넣지 않는다.
const routes: Route[] = [
  {
    path: "/services",
    changeFrequency: "monthly",
    priority: 0.9,
    lastModified: new Date(SERVICE_CONTENT_UPDATED_AT),
  },
  ...featureGuides.map((guide) => ({
    path: guide.path,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    lastModified: new Date(guide.updatedAt),
  })),
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
    lastModified: privacyLastModifiedDate,
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
