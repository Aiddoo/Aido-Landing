import type { MetadataRoute } from "next";
import { SERVICE_CONTENT_UPDATED_AT } from "@/components/media/data/app-screenshots";
import { featureGuides } from "@/features/feature-guides/data/feature-guides";
import {
  patchNotesUpdatedAt,
  releaseNotes,
} from "@/features/updates/data/patch-notes";
import { releaseHighlights } from "@/features/updates/data/release-highlights";
import { defaultLocale, locales } from "@/i18n/config";
import { HOME_CONTENT_UPDATED_AT, SITE_URL } from "@/lib/seo";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified: Date;
};

const homeLastModifiedDate = new Date(
  Math.max(
    Date.parse(HOME_CONTENT_UPDATED_AT),
    Date.parse(releaseNotes[0].date),
  ),
);
// Effective date stays 2026-04-19; plan limits, the yearly free trial, AI (Article 12) and voice notes (Article 12-2)
// were revised on 2026-11-10 for app 1.15.0.
const termsLastModifiedDate = new Date("2026-11-10");
// New version effective 2026-11-10 (app 1.15.0): voice features, AI providers, free trial and notification consent.
const privacyLastModifiedDate = new Date("2026-11-10");
// Free trial cancellation and on-device voice note recordings added on 2026-11-10.
const accountDeletionLastModifiedDate = new Date("2026-11-10");

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
    lastModified: homeLastModifiedDate,
  },
  {
    path: "/patch-notes",
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: new Date(patchNotesUpdatedAt),
  },
  ...releaseHighlights.map((highlight) => ({
    path: highlight.path,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(highlight.updatedAt),
  })),
  {
    path: "/terms",
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: termsLastModifiedDate,
  },
  {
    path: "/privacy",
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: privacyLastModifiedDate,
  },
  {
    path: "/account-deletion",
    changeFrequency: "monthly",
    priority: 0.4,
    lastModified: accountDeletionLastModifiedDate,
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
