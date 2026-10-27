type AppCatPath = `/app-assets/cat-${string}.webp`;

// 서버의 프로필 아이콘 키(PROFILE_ICON_KEYS) → 랜딩이 가진 고양이 이미지.
// white_cat은 대응 이미지가 없어 기본 고양이를 쓴다. 없는 키·URL·null은 기본 고양이로 보여 준다(외부 URL은 로드하지 않는다).
export const catByIconKey: Readonly<Record<string, AppCatPath>> = {
  default: "/app-assets/cat-default.webp",
  scottish_fold: "/app-assets/cat-scottish-fold.webp",
  orange_tabby: "/app-assets/cat-orange-tabby.webp",
  black_cat: "/app-assets/cat-black.webp",
  siamese: "/app-assets/cat-shyam.webp",
  russian_blue: "/app-assets/cat-russian-blue.webp",
  cream_cat: "/app-assets/cat-cream.webp",
  tuxedo_cat: "/app-assets/cat-tuxedo.webp",
};

export const defaultInviterCat: AppCatPath = "/app-assets/cat-default.webp";

export function getInviterCat(profileImage: string | null | undefined) {
  if (!profileImage) return defaultInviterCat;
  return catByIconKey[profileImage] ?? defaultInviterCat;
}
