import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://aido.kr",
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://aido.kr/ko",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://aido.kr/en",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://aido.kr/ko/terms",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://aido.kr/ko/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://aido.kr/en/terms",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://aido.kr/en/privacy",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
