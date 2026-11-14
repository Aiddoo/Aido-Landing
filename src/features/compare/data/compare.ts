// 경쟁 앱 정보를 공식 페이지에서 다시 확인하면 이 날짜도 바꾼다(사이트맵 날짜).
export const COMPARE_CHECKED_AT = "2026-11-14";

export const compareApps = ["aido", "todomate", "ticktick", "todoist"] as const;
export type CompareAppId = (typeof compareApps)[number];
