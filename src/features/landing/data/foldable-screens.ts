export const foldableScreens = {
  todo: "/app-assets/foldable/todo-detail.webp",
  feed: "/app-assets/foldable/friend-feed.webp",
  notes: "/app-assets/foldable/notes.webp",
  settings: "/app-assets/foldable/settings.webp",
} as const;

export type FoldableScreenKey = keyof typeof foldableScreens;
export const FOLDABLE_SCREEN_SIZE = { width: 1440, height: 1010 } as const;
