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
    version: "1.3.4",
    date: "2026-07-06",
    summary: {
      ko: "앱 안정성 강화 및 로그인 유지 개선",
      en: "Stronger app stability and more reliable sign-in",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱의 안정성을 강화하고, 오류가 생겼을 때 더 빠르게 찾아 고칠 수 있도록 개선했어요",
            en: "Strengthened app stability and improved how quickly we can detect and fix issues",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 상황에서 로그인이 예기치 않게 풀리던 문제를 추가로 개선했어요",
            en: "Further fixed cases where you could be unexpectedly signed out",
          },
        ],
      },
    ],
  },
  {
    version: "1.3.3",
    date: "2026-07-06",
    summary: {
      ko: "푸시 알림 문구 개선, 날씨 알림·로그아웃 버그 수정",
      en: "Friendlier push notifications, weather and logout bug fixes",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "푸시 알림 문구를 더 친근하고 자연스럽게 다듬었어요",
            en: "Refined push notification copy to feel friendlier and more natural",
          },
          {
            ko: "전반적인 앱의 안정성과 사용성을 개선했어요",
            en: "Improved overall app stability and usability",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "비나 눈 예보가 있는 날에도 맑은 날씨 알림이 오던 문제를 고쳤어요",
            en: "Fixed sunny-weather notifications being sent on days with rain or snow in the forecast",
          },
          {
            ko: "네트워크가 불안정할 때 간헐적으로 로그아웃되던 문제를 고쳤어요",
            en: "Fixed intermittent logouts on unstable network connections",
          },
          {
            ko: "알림 속 친구 이름 뒤 조사가 어색하게 표시되던 문제를 고쳤어요",
            en: "Fixed awkward Korean particles after friend names in notifications",
          },
        ],
      },
    ],
  },
  {
    version: "1.3.2",
    date: "2026-05-17",
    summary: {
      ko: "앱 안정성 및 사용성 개선",
      en: "Stability and usability improvements",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "전반적인 앱의 안정성과 사용성을 개선했어요",
            en: "Improved overall app stability and usability",
          },
        ],
      },
    ],
  },
  {
    version: "1.3.1",
    date: "2026-04-19",
    summary: {
      ko: "캘린더 좌우 스와이프, 반복 설정 주중/주말 프리셋, AI 월간 한도 전환",
      en: "Calendar swipe, weekday/weekend repeat presets, AI monthly quota",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "캘린더를 좌우로 스와이프해서 주/월을 넘길 수 있어요 — 넘기는 애니메이션도 더 매끄러워졌어요",
            en: "Swipe the calendar left or right to move between weeks and months — with smoother transitions",
          },
          {
            ko: "반복 설정에 주중/주말 프리셋이 추가됐어요 — [매일], [주중], [주말], [월~일] 중 원하는 주기를 한 번에 선택할 수 있어요",
            en: "New weekday/weekend presets in repeat settings — pick [Daily], [Weekdays], [Weekends], or [Mon–Sun] in one tap",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "무료 플랜의 AI 할 일 파싱 한도가 월 5회로 바뀌었어요 — 매월 1일 0시(KST)에 리셋돼요",
            en: "Free plan AI task parsing is now 5 times per month — resets at 00:00 KST on the 1st of every month",
          },
          {
            ko: "AI가 할 일의 카테고리와 내용을 더 정확하게 구분해줘요",
            en: "AI now separates task category and content more accurately",
          },
          {
            ko: "AI 리포트 품질이 더 안정적으로 개선됐어요",
            en: "AI reports are now more consistent and reliable",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "캘린더를 넘길 때 날씨 배지가 깜빡이던 문제를 수정했어요",
            en: "Fixed weather badge flickering when swiping through the calendar",
          },
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-04-15",
    summary: {
      ko: "메모 기능 추가, AI 메모 변환, AI 제안 품질 개선",
      en: "Memo feature, AI memo-to-task conversion, improved AI suggestions",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "메모 기능이 추가됐어요 — 떠오르는 생각을 자유롭게 메모할 수 있어요",
            en: "Memo feature is here — jot down your thoughts freely anytime",
          },
          {
            ko: "AI 메모 변환 기능이 추가됐어요 — 메모 작성 후 상단의 로봇 아이콘을 누르면 AI가 할 일과 하위 항목으로 자동 정리해줘요",
            en: "AI memo conversion is here — tap the robot icon at the top after writing a memo and AI will automatically organize it into tasks and sub-items",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "간헐적으로 로그아웃되던 문제를 해결했어요 — 한 번만 재로그인해 주시면 이후로는 정상적으로 유지돼요",
            en: "Fixed intermittent forced logout issue — please log in once more and it will stay connected from now on",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 더 명확하게 유저에게 필요한 할 일을 제안해줘요",
            en: "AI now suggests tasks more clearly tailored to your needs",
          },
          {
            ko: "다크모드 화면이 더 자연스러워졌어요",
            en: "Dark mode screens now look more natural",
          },
          {
            ko: "전반적인 앱의 안정성과 사용성을 개선했어요",
            en: "Improved overall app stability and usability",
          },
        ],
      },
    ],
  },
  {
    version: "1.2.4",
    date: "2026-04-07",
    summary: {
      ko: "하위 항목 기본 펼침 및 버그 수정",
      en: "Sub-tasks expanded by default and bug fix",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "하위 항목이 있는 할 일이 기본으로 펼쳐져서 한눈에 확인할 수 있어요",
            en: "Tasks with sub-items are now expanded by default so you can see everything at a glance",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "알림 메시지에 글꼴 크기 설정이 반영되지 않던 문제를 수정했어요",
            en: "Fixed font size setting not being applied to notification messages",
          },
        ],
      },
    ],
  },
  {
    version: "1.2.3",
    date: "2026-04-06",
    summary: {
      ko: "푸시 알림 및 날씨 화면 버그 수정",
      en: "Push notification and weather screen bug fixes",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "푸시 알림을 눌렀을 때 화면이 겹쳐 보이던 문제를 수정했어요",
            en: "Fixed screens overlapping when tapping a push notification",
          },
          {
            ko: "날씨 알림이 '할일' 카테고리로 잘못 표시되던 문제를 수정했어요",
            en: "Fixed weather notifications incorrectly labeled as 'To-do'",
          },
          {
            ko: "날씨 화면에서 강수 아이콘과 텍스트가 일치하지 않던 문제를 수정했어요",
            en: "Fixed precipitation icon and text mismatch on the weather screen",
          },
        ],
      },
    ],
  },
  {
    version: "1.2.2",
    date: "2026-04-04",
    summary: {
      ko: "날씨 화면 현재 기온 표시, 알림 설정 화면 개선",
      en: "Current temperature display, improved notification settings",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면에서 평균 기온 대신 현재 기온이 표시돼요",
            en: "Weather screen now shows current temperature instead of average",
          },
          {
            ko: "알림 설정 화면이 더 깔끔하게 정리됐어요",
            en: "Notification settings screen has been reorganized for a cleaner layout",
          },
        ],
      },
    ],
  },
  {
    version: "1.2.1",
    date: "2026-04-03",
    summary: {
      ko: "날씨 상세 화면 디자인 개선",
      en: "Weather detail screen design improvements",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 상세 화면 디자인이 더 보기 좋게 개선됐어요",
            en: "Weather detail screen has been redesigned for better readability",
          },
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-04-02",
    summary: {
      ko: "날씨 알림 시스템 추가, AI 프리미엄 기능 대폭 개선",
      en: "Weather notifications, major AI premium improvements",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "날씨 알림이 추가됐어요 — 아침·오후에 날씨에 맞는 할 일 팁을 알려드려요",
            en: "Weather notifications are here — get weather-based task tips every morning and afternoon",
          },
          {
            ko: "날씨 상세 화면에서 시간대별 날씨, 체감온도, 자외선, 미세먼지, 5일 예보를 확인할 수 있어요",
            en: "Check hourly weather, feels-like temp, UV index, air quality, and 5-day forecast in the new weather screen",
          },
          {
            ko: "날씨 알림 시간을 오전/오후 각각 원하는 시간으로 설정할 수 있어요",
            en: "Set your preferred morning and afternoon weather notification times",
          },
          {
            ko: "AI 제안이 8가지 유형으로 확장됐어요 — 습관 회복, 밸런스 제안 등 더 맞춤화된 추천을 받아보세요",
            en: "AI suggestions expanded to 8 types — get more personalized recommendations including habit recovery and balance tips",
          },
          {
            ko: "반복 할 일의 시작일을 변경하거나 삭제할 수 있어요",
            en: "You can now change the start date or delete recurring tasks",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 리포트가 더 정교해졌어요 — 습관 패턴 분석과 맞춤 코칭이 강화됐어요",
            en: "AI reports are now more refined — enhanced habit pattern analysis and personalized coaching",
          },
          {
            ko: "AI가 이전에 수락하거나 거절한 제안을 학습해서 점점 더 나에게 맞는 추천을 해줘요",
            en: "AI learns from your accepted and declined suggestions to give better recommendations over time",
          },
          {
            ko: "알림이 한꺼번에 몰려오지 않도록 시간대를 분산했어요",
            en: "Notifications are now spread out so they don't all arrive at once",
          },
          {
            ko: "푸시 알림을 꺼도 앱 내 알림 목록에서는 확인할 수 있어요",
            en: "You can still see notifications in the app even with push notifications turned off",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 화면에서 글꼴 크기 설정이 적용되지 않던 문제를 수정했어요",
            en: "Fixed font size settings not being applied on some screens",
          },
        ],
      },
    ],
  },
  {
    version: "1.1.1",
    date: "2026-03-28",
    summary: {
      ko: "글꼴 크기 설정 추가 및 안정성 개선",
      en: "Font size settings and stability improvements",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "앱 내 글꼴 크기를 5단계로 조절할 수 있어요 (아주 작게 ~ 아주 크게)",
            en: "You can now adjust the font size in 5 levels (Extra Small to Extra Large)",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "시간 선택 화면이 일부 기기에서 잘리던 문제를 수정했어요",
            en: "Fixed time picker being cut off on some devices",
          },
          {
            ko: "AI 제안 화면이 간헐적으로 깜빡이던 문제를 수정했어요",
            en: "Fixed AI suggestion screen flickering intermittently",
          },
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-03-27",
    summary: {
      ko: "하위 항목(체크리스트) 추가, 카테고리 UX 개선",
      en: "Sub-tasks (checklists), improved category UX",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일에 하위 항목(체크리스트)을 추가할 수 있어요",
            en: "You can now add sub-tasks (checklists) to your to-dos",
          },
          {
            ko: "할 일 추가 시 카테고리를 더 쉽게 선택할 수 있어요",
            en: "Selecting a category when adding a task is now easier",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "카테고리 관리 화면이 더 직관적으로 개선됐어요",
            en: "Category management screen is now more intuitive",
          },
          {
            ko: "반복 설정 화면이 더 깔끔해졌어요",
            en: "Repeat settings UI has been refined",
          },
          {
            ko: "카테고리 색상을 변경하면 캘린더에 바로 반영돼요",
            en: "Changing a category color now updates the calendar instantly",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 잠깐 나갔다 돌아올 때 입력 화면이 깨지던 문제를 수정했어요",
            en: "Fixed input screen breaking when returning from background",
          },
        ],
      },
    ],
  },
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
            ko: "오늘 할 일은 내일로 미루고, 다른 날 할 일은 오늘로 당겨올 수 있어요",
            en: "Postpone today's tasks to tomorrow, or pull other days' tasks to today",
          },
          {
            ko: "친구 목록을 편집할 수 있는 모드가 추가됐어요",
            en: "Added a new edit mode for your friend list",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "할 일을 추가하거나 수정·삭제할 때 반응 속도가 훨씬 빨라졌어요",
            en: "Adding, editing, and deleting tasks now feels much faster",
          },
          {
            ko: "카테고리를 추가하거나 수정·삭제할 때 반응 속도가 훨씬 빨라졌어요",
            en: "Adding, editing, and deleting categories now feels much faster",
          },
          {
            ko: "AI 추천 문구가 더 다양해졌어요, 매일 새로운 제안을 받아보세요",
            en: "AI suggestion messages are now more varied — get fresh recommendations every day",
          },
          {
            ko: "카테고리 관리 화면의 사용성이 개선됐어요",
            en: "Improved usability of the category management screen",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "리마인더 알림에 수정 전 할 일 제목이 표시되던 문제를 수정했어요",
            en: "Fixed reminder notifications showing the old task title after editing",
          },
          {
            ko: "할 일 추가 화면에서 키보드와 날짜 선택을 오갈 때 화면이 끊기던 문제를 수정했어요",
            en: "Fixed screen stuttering when switching between keyboard and date picker on the task creation screen",
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
