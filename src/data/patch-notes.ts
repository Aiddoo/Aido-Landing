export type ReleaseCategory = "bugFixes" | "features" | "improvements";

export type ReleaseNote = {
  version: string;
  date: string;
  summary: { ko: string; en: string };
  categories: {
    type: ReleaseCategory;
    items: { ko: string; en: string }[];
  }[];
};

export const releaseNotes: ReleaseNote[] = [
  {
    version: "1.0.3",
    date: "2026-03-16",
    summary: {
      ko: "친구 목록 순서 변경, 카테고리 변경 기능 추가",
      en: "Friend list reordering, category change from action menu",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구 목록 드래그 앤 드롭 순서 변경 기능 추가",
            en: "Added drag-and-drop reordering for friend list",
          },
          {
            ko: "할일 액션 메뉴에서 카테고리 변경 기능 추가",
            en: "Added category change from to-do action menu",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "문의하기 화면 키보드 UX 개선",
            en: "Improved keyboard UX on contact screen",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.2",
    date: "2026-03-15",
    summary: {
      ko: "리마인드 콕 찌르기, 문의하기 기능 추가 및 UI 개선",
      en: "Remind nudge, contact feature, and UI improvements",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "다크모드에서 Apple 아이콘 미표시 수정",
            en: "Fixed Apple icon not displaying in dark mode",
          },
          {
            ko: "카카오 프로필 이미지 미표시 수정",
            en: "Fixed Kakao profile image not displaying",
          },
          {
            ko: "Android 마이페이지 하단 컨텐츠 탭 바 가림 수정",
            en: "Fixed tab bar overlapping bottom content on Android My Page",
          },
        ],
      },
      {
        type: "features",
        items: [
          {
            ko: "리마인드 콕 찌르기 기능 추가",
            en: "Added remind nudge feature",
          },
          {
            ko: "문의하기 기능 추가",
            en: "Added contact/inquiry feature",
          },
          {
            ko: "캘린더 뷰 모드 선택 값 MMKV 저장",
            en: "Persist calendar view mode selection with MMKV",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "analytics 이벤트 강화 및 친구 요청 lifecycle 추적",
            en: "Enhanced analytics events and friend request lifecycle tracking",
          },
          {
            ko: "마이페이지/프로필 설정 UI 리팩토링 및 SettingNavigation 공통 컴포넌트 추출",
            en: "Refactored My Page/Profile settings UI and extracted shared SettingNavigation component",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.1",
    date: "2026-03-13",
    summary: {
      ko: "주간 배지, 푸시 알림 개선 및 다수 버그 수정",
      en: "Weekly badges, push notification improvements, and multiple bug fixes",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "시스템 폰트 크기 확대 시 리포트/바텀시트 텍스트 줄넘김 수정",
            en: "Fixed text wrapping in reports/bottom sheets when system font size is enlarged",
          },
          {
            ko: "Android adaptive icon 원형 크롭 시 잘림 수정",
            en: "Fixed Android adaptive icon clipping in circular crop",
          },
          {
            ko: "디스코드 알림 구독 금액 표기 오류 수정",
            en: "Fixed incorrect subscription amount display in Discord notifications",
          },
          {
            ko: "oklch 색상 값 교정",
            en: "Corrected oklch color values",
          },
          {
            ko: "Android에서 계정 연결 화면에 Apple 로그인 노출 수정",
            en: "Fixed Apple sign-in showing on account linking screen on Android",
          },
          {
            ko: "푸시 알림 수신 시 크래시 수정",
            en: "Fixed crash when receiving push notifications",
          },
          {
            ko: "푸시 알림 탭 시 라우팅 오류 수정",
            en: "Fixed routing error when tapping push notifications",
          },
        ],
      },
      {
        type: "features",
        items: [
          {
            ko: "주간 목표 달성 배지 화면 추가",
            en: "Added weekly goal achievement badge screen",
          },
          {
            ko: "주간 배지 공유 기능 추가",
            en: "Added weekly badge sharing feature",
          },
          {
            ko: "점심 시간대 푸시 알림 추가",
            en: "Added lunchtime push notifications",
          },
          {
            ko: "스트릭 위기 알림 추가",
            en: "Added streak at-risk alerts",
          },
          {
            ko: "친구 승인 실시간 반영",
            en: "Real-time friend approval updates",
          },
          {
            ko: "24시간제 시간 형식 설정 및 앱 전체 적용",
            en: "Added 24-hour time format setting applied app-wide",
          },
          {
            ko: "소셜 로그인 버튼 UI 통일 및 Apple HIG 준수",
            en: "Unified social login button UI following Apple HIG",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 투두 파싱 정확도 향상 — 한국어 날짜/시간/기간 표현 전면 커버",
            en: "Improved AI to-do parsing accuracy — full coverage of Korean date/time/duration expressions",
          },
          {
            ko: "AI 제안에 카테고리 추천 추가 및 분석 주기 매일로 변경",
            en: "Added category suggestions to AI recommendations and changed analysis frequency to daily",
          },
          {
            ko: "프리미엄 리포트 빈 상태 화면 개선",
            en: "Improved empty state screen for premium reports",
          },
          {
            ko: "scheduler 내부 정리 및 WeeklyAchievement catch-up 추가",
            en: "Cleaned up scheduler internals and added WeeklyAchievement catch-up logic",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-03-10",
    summary: {
      ko: "Aido 정식 출시! AI 투두 플래너와 함께 친구와 성장하세요.",
      en: "Aido officially launched! Grow with friends using the AI to-do planner.",
    },
    categories: [],
  },
];
