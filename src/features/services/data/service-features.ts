import type { AppScreenshotKey } from "@/components/media/data/app-screenshots";

export const serviceFeatures = [
  { id: "planning", screenshots: ["week", "month"] },
  { id: "todos", screenshots: ["todo", "repeat"] },
  { id: "notes", screenshots: ["notes", "note"] },
  { id: "ai", screenshots: ["add", "note"] },
  { id: "friends", screenshots: ["friend", "sent"] },
  { id: "nudges", screenshots: ["reply", "thanks"] },
  { id: "notifications", screenshots: ["inbox", "reminders"] },
  { id: "weather", screenshots: ["weather", "androidWeather"] },
  {
    id: "widgets",
    screenshots: ["iosWidgets", "androidWidgets", "androidWidgetsSmall"],
  },
  {
    id: "insights",
    screenshots: ["report", "suggestions"],
    premium: true,
    sample: true,
  },
  { id: "personal", screenshots: ["profile", "icons", "dark"] },
] as const satisfies ReadonlyArray<{
  id: string;
  screenshots: readonly AppScreenshotKey[];
  premium?: boolean;
  sample?: boolean;
}>;

export type ServiceFeatureId = (typeof serviceFeatures)[number]["id"];
