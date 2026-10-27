import { Moon, Sun } from "lucide-react";

/** 지금 그려진 모드의 아이콘. .dark 클래스로 바뀌어 하이드레이션 전후가 같다. */
export function ThemeIcon() {
  return (
    <>
      <Sun aria-hidden="true" className="dark:hidden" />
      <Moon aria-hidden="true" className="hidden dark:block" />
    </>
  );
}
