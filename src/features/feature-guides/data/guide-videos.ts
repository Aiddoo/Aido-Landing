import type { AppVideoKey } from "@/components/media/data/app-videos";

/** 날씨 18가지 장면. 문구의 weather.scenes와 같은 순서이며, 앱의 날씨 상태(condition) 순서를 따른다. */
export const weatherSceneVideos = [
  { video: "weather-clear-night", time: "night" },
  { video: "weather-mostly-clear", time: "day" },
  { video: "weather-partly-cloudy", time: "day" },
  { video: "weather-mostly-cloudy", time: "day" },
  { video: "weather-cloudy", time: "day" },
  { video: "weather-foggy", time: "day" },
  { video: "weather-hazy", time: "day" },
  { video: "weather-windy", time: "day" },
  { video: "weather-drizzle", time: "day" },
  { video: "weather-rain-night", time: "night" },
  { video: "weather-heavy-rain", time: "day" },
  { video: "weather-thunderstorms-night", time: "night" },
  { video: "weather-sleet", time: "day" },
  { video: "weather-snow", time: "day" },
  { video: "weather-heavy-snow", time: "day" },
  { video: "weather-hail", time: "day" },
  { video: "weather-hot", time: "day" },
  { video: "weather-frigid", time: "day" },
] as const satisfies readonly { video: AppVideoKey; time: "day" | "night" }[];

/** 댓글 가이드의 실제 녹화. 문구의 comments.story와 같은 순서다. */
export const commentStoryVideos = [
  "comments-replies",
  "comments-reply-keyboard",
  "comments-heart",
  "comments-notification",
] as const satisfies readonly AppVideoKey[];
