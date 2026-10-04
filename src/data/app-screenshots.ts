import type { Locale } from "@/i18n/config";

export const screenshotFiles = {
  week: ["ios", "home-week"],
  month: ["android", "home-month"],
  todo: ["ios", "todo-detail"],
  repeat: ["android", "repeat-picker"],
  notes: ["ios", "memo-list"],
  note: ["android", "memo-detail"],
  add: ["ios", "add-todo-filled"],
  friend: ["ios", "friend-feed"],
  sent: ["android", "sent-nudges"],
  reply: ["ios", "nudge-detail"],
  thanks: ["android", "thanks-sheet"],
  inbox: ["ios", "notifications"],
  reminders: ["android", "reminder-settings"],
  weather: ["ios", "weather"],
  androidWeather: ["android", "weather"],
  iosWidgets: ["ios", "widgets"],
  androidWidgets: ["android", "widgets"],
  androidWidgetsSmall: ["android", "widgets-small"],
  report: ["ios", "report-sample"],
  suggestions: ["android", "suggestions"],
  profile: ["ios", "profile-cats"],
  icons: ["android", "app-icons"],
  dark: ["ios", "home-dark"],
} as const;

export type AppScreenshotKey = keyof typeof screenshotFiles;
export const SERVICE_CONTENT_UPDATED_AT = "2026-10-05";

export function getAppScreenshot(locale: Locale, key: AppScreenshotKey) {
  const [platform, filename] = screenshotFiles[key];
  return {
    src: `/app-assets/screenshots/${locale}/${platform}/${filename}.webp`,
    width: 480,
    height: platform === "ios" ? 1044 : 1067,
    platform,
  };
}
