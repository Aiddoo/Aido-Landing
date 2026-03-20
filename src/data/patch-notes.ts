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
    version: "1.0.5",
    date: "2026-03-21",
    summary: {
      ko: "할일 반응 속도 개선, 오늘/내일하기 토글, 친구 목록 편집 기능 추가",
      en: "Faster task updates, today/tomorrow toggle, friend list editing",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할일 오늘하기 / 내일하기 토글 기능 추가",
            en: "Added today/tomorrow toggle for tasks",
          },
          {
            ko: "친구 목록 편집 모드 추가",
            en: "Added friend list edit mode",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "할일 추가·수정·삭제 시 반응 속도가 빨라졌어요",
            en: "Adding, editing, and deleting tasks now feels much faster",
          },
          {
            ko: "AI 추천 문구가 더 다양해졌어요",
            en: "AI suggestion messages are now more varied",
          },
          {
            ko: "카테고리 관리 화면 UX 개선",
            en: "Improved category management screen UX",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "리마인더 알림에 수정 전 할일 제목이 표시되는 문제 수정",
            en: "Fixed reminder notifications showing old task title after editing",
          },
          {
            ko: "입력 화면 키보드 전환 시 화면이 부자연스럽게 움직이는 문제 수정",
            en: "Fixed unnatural screen movement when switching keyboards on input screen",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.4",
    date: "2026-03-20",
    summary: {
      ko: "AI 리포트 개선, 카테고리 관리 UX 개편, 캘린더 완료 상태 표시",
      en: "Improved AI reports, redesigned category management, calendar completion status",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "일일 완료 현황에 카테고리 색상 표시",
            en: "Category colors now shown in daily completion status",
          },
          {
            ko: "캘린더에서 날짜별 할일 완료 상태 표시",
            en: "Calendar now shows daily task completion status",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "푸시 알림 문구가 더 다양해졌어요",
            en: "Push notification messages are now more varied",
          },
          {
            ko: "AI 리포트 주간/월간 분석 분리 및 코칭 품질 개선",
            en: "Separated weekly/monthly AI reports with improved coaching quality",
          },
          {
            ko: "AI 추천이 더 다양한 패턴을 감지해요",
            en: "AI suggestions now detect more diverse patterns",
          },
          {
            ko: "카테고리 관리를 마이 탭으로 이동 및 화면 구조 개선",
            en: "Moved category management to My tab with improved layout",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iOS 하단 탭 바 관련 앱 크래시 수정",
            en: "Fixed crash related to bottom tab bar on iOS",
          },
          {
            ko: "Android 하단 탭 바 경계선 제거",
            en: "Removed border line on Android bottom tab bar",
          },
          {
            ko: "AI 리포트 생성 시간 오류 수정",
            en: "Fixed AI report generation timing issue",
          },
        ],
      },
    ],
  },
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
            ko: "Android에서 마이페이지 하단 내용이 가려지는 문제 수정",
            en: "Fixed bottom content being hidden by tab bar on Android My Page",
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
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "캘린더 보기 모드 선택이 유지되도록 개선",
            en: "Calendar view mode selection is now preserved",
          },
          {
            ko: "앱 사용 분석 및 친구 요청 흐름 개선",
            en: "Improved app analytics and friend request flow",
          },
          {
            ko: "마이페이지 및 프로필 설정 화면 디자인 개선",
            en: "Redesigned My Page and profile settings UI",
          },
        ],
      },
    ],
  },
  {
    version: "1.0.1",
    date: "2026-03-13",
    summary: {
      ko: "주간 배지, 알림 개선 및 다수 버그 수정",
      en: "Weekly badges, notification improvements, and multiple bug fixes",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "큰 글씨 설정 시 화면 깨짐 수정",
            en: "Fixed layout breaking when system font size is enlarged",
          },
          {
            ko: "Android 앱 아이콘이 잘리는 문제 수정",
            en: "Fixed Android app icon being clipped",
          },
          {
            ko: "구독 금액 표기 오류 수정",
            en: "Fixed incorrect subscription price display",
          },
          {
            ko: "일부 색상이 올바르게 표시되지 않는 문제 수정",
            en: "Fixed some colors not displaying correctly",
          },
          {
            ko: "Android에서 Apple 로그인이 잘못 표시되는 문제 수정",
            en: "Fixed Apple sign-in incorrectly showing on Android",
          },
          {
            ko: "알림 수신 시 앱이 종료되는 문제 수정",
            en: "Fixed app crash when receiving notifications",
          },
          {
            ko: "알림을 눌렀을 때 잘못된 화면으로 이동하는 문제 수정",
            en: "Fixed navigating to wrong screen when tapping notifications",
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
            ko: "점심 시간 리마인더 알림 추가",
            en: "Added lunchtime reminder notifications",
          },
          {
            ko: "연속 달성이 끊기기 전 알림 추가",
            en: "Added alerts before losing your streak",
          },
          {
            ko: "24시간제 시간 표시 설정 추가",
            en: "Added 24-hour time format setting",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 할일 인식 정확도 향상",
            en: "Improved AI to-do recognition accuracy",
          },
          {
            ko: "AI 추천에 카테고리 제안 추가 및 매일 분석",
            en: "Added category suggestions to AI recommendations with daily analysis",
          },
          {
            ko: "프리미엄 리포트 빈 상태 화면 개선",
            en: "Improved empty state screen for premium reports",
          },
          {
            ko: "주간 달성 리포트 안정성 개선",
            en: "Improved weekly achievement report reliability",
          },
          {
            ko: "친구 요청 수락 시 즉시 반영",
            en: "Friend request acceptance now updates instantly",
          },
          {
            ko: "소셜 로그인 버튼 디자인 개선",
            en: "Improved social login button design",
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
