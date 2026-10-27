// 앱 고양이 프로필 이미지. 초대 페이지와 같은 원본을 써서 새 이미지를 늘리지 않는다.
export const nudgeCats = {
  dubu: "/app-assets/cat-scottish-fold.webp",
  cheese: "/app-assets/cat-orange-tabby.webp",
} as const;

// 앱의 프로필·앱 아이콘 고르기 순서(PROFILE_ICON_KEYS)와 같다.
export const profileCats = [
  { id: "default", src: "/app-assets/cat-default.webp" },
  { id: "scottishFold", src: "/app-assets/cat-scottish-fold.webp" },
  { id: "orangeTabby", src: "/app-assets/cat-orange-tabby.webp" },
  { id: "blackCat", src: "/app-assets/cat-black.webp" },
  { id: "whiteCat", src: "/app-assets/cat-white.webp" },
  { id: "siamese", src: "/app-assets/cat-siamese.webp" },
  { id: "russianBlue", src: "/app-assets/cat-russian-blue.webp" },
  { id: "creamCat", src: "/app-assets/cat-cream.webp" },
  { id: "tuxedoCat", src: "/app-assets/cat-tuxedo.webp" },
] as const;

export type ProfileCat = (typeof profileCats)[number];
export type ProfileCatId = ProfileCat["id"];
