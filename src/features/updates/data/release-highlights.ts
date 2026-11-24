import type { GuideScreenKey } from "@/features/feature-guides/data/guide-screens";
import type { ReleaseScreenKey } from "@/features/updates/data/release-screens";
import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Readonly<Record<Locale, readonly string[]>>;

type HighlightScreen = {
  key: ReleaseScreenKey;
  alt: LocalizedText;
  caption: LocalizedText;
};

/** 이전 버전 화면(기능 가이드의 기존 캡처)과 새 화면을 나란히 보여 준다. */
type HighlightComparison = {
  before: { key: GuideScreenKey; label: LocalizedText; alt: LocalizedText };
  after: { key: ReleaseScreenKey; label: LocalizedText; alt: LocalizedText };
};

export type HighlightIcon =
  | "mic"
  | "list-checks"
  | "audio-lines"
  | "notebook-pen"
  | "repeat"
  | "crown"
  | "tablet"
  | "sparkles"
  | "chart"
  | "gift"
  | "bell"
  | "wrench"
  | "calendar"
  | "tags"
  | "sliders"
  | "undo";

type HighlightSection = {
  /** 페이지 안 앵커. 공개 후 바꾸지 않는다. */
  id: string;
  icon: HighlightIcon;
  /** 목차에 쓰는 짧은 이름 */
  navLabel: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  points: LocalizedList;
  screens: readonly HighlightScreen[];
  comparison?: HighlightComparison;
};

type PlanRow = {
  label: LocalizedText;
  free: LocalizedText;
  premium: LocalizedText;
};

/**
 * 큰 앱 업데이트를 실제 화면으로 소개하는 /patch-notes/{slug} 페이지. 출시 기록(patch-notes.ts의 releaseNotes)과
 * 같은 버전에만 만든다. 한도 숫자는 스토어 문안(docs/releases/{버전}/store-listing.md)의 공식 값만 쓴다.
 * updatedAt은 이 페이지 내용을 실제로 고친 날이며 사이트맵이 쓴다.
 */
export const releaseHighlights = [
  {
    version: "1.17.0",
    slug: "1-17-0",
    path: "/patch-notes/1-17-0",
    updatedAt: "2026-11-25",
    kicker: { ko: "아이두 1.17.0 업데이트", en: "Aido 1.17.0 update" },
    title: {
      ko: "캘린더 일정을 할 일로 한 번에 가져와요",
      en: "Bring your calendar events in as to-dos",
    },
    metaTitle: {
      ko: "아이두 1.17.0 업데이트: 캘린더 일정을 할 일로 가져오기",
      en: "Aido 1.17.0: Import calendar events as to-dos",
    },
    description: {
      ko: "기기에 있는 iCloud·Google·Outlook 캘린더에서 캘린더와 기간을 고르면 일정을 할 일로 한 번에 가져와요. 캘린더마다 카테고리를 정하고, 7일 안에는 되돌릴 수 있어요. 무료는 30일, 프리미엄은 365일 뒤 일정까지 가져와요.",
      en: "Pick iCloud, Google or Outlook calendars on your device and a date range, and their events come in as to-dos in one go. Choose a category for each calendar, and undo within 7 days. Free covers the next 30 days, Premium up to 365.",
    },
    sections: [
      {
        id: "choose-calendars",
        navLabel: { ko: "캘린더와 기간", en: "Calendars and range" },
        icon: "calendar",
        title: {
          ko: "가져올 캘린더와 기간을 골라요",
          en: "Pick calendars and a range",
        },
        body: {
          ko: "마이 > 설정 > 캘린더 일정 가져오기를 열면 어떤 정보를 읽는지 먼저 알려 드려요. ‘계속’을 누른 뒤에만 캘린더 권한을 묻고, 이 기기에 이미 있는 iCloud·Google·Outlook 캘린더를 계정 이름별로 묶어 보여 줘요. 아이두에서 따로 로그인하지 않아요.",
          en: "Open Me > Settings > Import calendar events, and Aido first explains what it reads. Calendar permission is asked only after you tap Continue, and the iCloud, Google and Outlook calendars already on your device are listed under their account names. There's no separate sign-in inside Aido.",
        },
        points: {
          ko: [
            "공휴일·생일·구독 캘린더는 목록 맨 아래에 접혀 있고 처음에 선택하지 않아요. 필요하면 직접 체크해요.",
            "캘린더가 목록에 없다면 ‘캘린더가 목록에 없나요?’에서 이 기기에 계정을 추가하는 방법을 볼 수 있어요.",
            "기간은 오늘부터 시작일과 종료일을 직접 고르거나, 1주·1개월·3개월·6개월·1년으로 바로 골라요.",
            "무료 플랜은 오늘부터 30일 동안의 일정을 가져올 수 있고, 프리미엄은 365일까지 가져올 수 있어요. 가져오기 자체는 무료예요.",
            "필요할 때 한 번 복사해 오는 기능이라 캘린더와 계속 동기화하지 않아요. 캘린더는 읽기만 하고 바꾸거나 지우지 않아요.",
          ],
          en: [
            "Holiday, birthday and subscribed calendars are folded at the bottom and start unchecked. Check them yourself if you want them.",
            "If a calendar isn't listed, tap Missing a calendar? to see how to add its account to your device.",
            "Choose start and end dates from today, or tap 1 week, 1 month, 3 months, 6 months or 1 year.",
            "The free plan imports events for the next 30 days from today, and Premium up to 365. Importing itself is free.",
            "It's a one-time copy you start yourself, so it doesn't keep syncing. Aido only reads your calendar and never changes or deletes events.",
          ],
        },
        screens: [
          {
            key: "calendar-import-intro",
            alt: {
              ko: "어떤 일정 정보를 읽고 보내는지 설명하고 ‘계속’ 버튼이 있는 아이두 캘린더 일정 가져오기 안내 화면",
              en: "Aido's Import calendar events explanation screen describing what event details are read and sent, with a Continue button",
            },
            caption: {
              ko: "권한을 묻기 전에 먼저 알려 드려요.",
              en: "You see what happens before any permission prompt.",
            },
          },
          {
            key: "calendar-import-select",
            alt: {
              ko: "계정별로 묶인 캘린더 목록과 시작일·종료일 기간 선택이 보이는 아이두 캘린더 일정 가져오기 화면",
              en: "Aido's Import calendar events screen with calendars grouped by account and start and end date options",
            },
            caption: {
              ko: "캘린더와 기간을 골라요.",
              en: "Pick calendars and a range.",
            },
          },
        ],
      },
      {
        id: "connect-categories",
        navLabel: { ko: "카테고리 연결", en: "Categories" },
        icon: "tags",
        title: {
          ko: "캘린더마다 카테고리를 정해요",
          en: "Choose a category for each calendar",
        },
        body: {
          ko: "캘린더마다 새 카테고리를 만들거나 이미 있는 카테고리로 연결해요. 새 카테고리는 캘린더 이름과 색으로 시작하고, 원하는 이름·색으로 바꿀 수 있어요. 한곳에 모으고 싶다면 ‘모두 한 카테고리에’를 눌러요.",
          en: "For each calendar, make a new category or connect one you already have. A new category starts with the calendar's name and color, and you can change both. To keep everything together, tap Put all in one category.",
        },
        points: {
          ko: [
            "카테고리 한도는 그대로예요. 무료는 3개, 프리미엄은 30개까지 만들 수 있어요.",
            "카테고리마다 진행 중인 할 일은 300개까지예요.",
          ],
          en: [
            "Category limits stay the same: 3 on Free and up to 30 on Premium.",
            "Each category holds up to 300 active to-dos.",
          ],
        },
        screens: [
          {
            key: "calendar-import-categories",
            alt: {
              ko: "캘린더마다 새 카테고리 또는 기존 카테고리를 고르고 ‘모두 한 카테고리에’ 버튼이 보이는 아이두 카테고리 연결 화면",
              en: "Aido screen connecting each calendar to a new or existing category, with a Put all in one category button",
            },
            caption: {
              ko: "캘린더마다 카테고리를 연결해요.",
              en: "Connect each calendar to a category.",
            },
          },
        ],
      },
      {
        id: "options",
        navLabel: { ko: "시간과 공개", en: "Times and sharing" },
        icon: "sliders",
        title: {
          ko: "시간과 공개 범위를 정해요",
          en: "Choose times and sharing",
        },
        body: {
          ko: "‘시간도 가져오기’는 처음에 켜져 있어 일정의 시작 시간까지 가져와요. 끄면 날짜만 가져오고 리마인드 알림은 오지 않아요.",
          en: "Include times starts on, so each event's start time comes along. Turn it off to bring in dates only, with no reminders.",
        },
        points: {
          ko: [
            "가져온 할 일은 기본으로 비공개예요. ‘친구에게 공개’를 켜면 친구에게도 보여요.",
            "가져오기 전에 고른 일정의 제목·날짜·시간을 아이두 서버로 보낸다고 알려 드리고, ‘가져오기’를 눌러야 시작해요.",
          ],
          en: [
            "Imported to-dos are private by default. Turn on Share with friends to show them to friends.",
            "Before anything is sent, Aido tells you that the titles, dates and times of the events you picked go to its server. Nothing starts until you tap Import.",
          ],
        },
        screens: [
          {
            key: "calendar-import-options",
            alt: {
              ko: "‘시간도 가져오기’와 ‘친구에게 공개’ 스위치, 보내는 정보 안내와 ‘가져오기’ 버튼이 보이는 아이두 가져오기 옵션 화면",
              en: "Aido import options screen with Include times and Share with friends switches, a note on what is sent and an Import button",
            },
            caption: {
              ko: "시간과 공개 범위를 정하고 가져와요.",
              en: "Set times and sharing, then import.",
            },
          },
        ],
      },
      {
        id: "import-undo",
        navLabel: { ko: "가져오기와 되돌리기", en: "Import and undo" },
        icon: "undo",
        title: {
          ko: "가져오고, 7일 안에는 되돌려요",
          en: "Import, and undo within 7 days",
        },
        body: {
          ko: "‘가져오기’를 누르면 고른 일정이 할 일로 들어와요. 가져오는 동안 앱을 나가도 이어서 가져오고, 끝나면 가져온 수와 건너뛴 이유를 보여 드려요. 가져온 지 7일 안에는 한 번에 되돌릴 수 있어요.",
          en: "Tap Import and the events you picked become to-dos. You can leave the app while it imports, and when it's done you see how many came in and why any were skipped. Within 7 days, you can undo the import all at once.",
        },
        points: {
          ko: [
            "같은 일정은 다시 가져와도 두 번 들어오지 않아요.",
            "되돌리면 아직 끝내지 않은 가져온 할 일만 지우고, 끝낸 할 일은 남겨 둬요.",
            "기기 캘린더에는 아무것도 쓰거나 지우지 않아요. 참석자·메모·장소는 보내지 않아요.",
            "가져오는 동안 받은 일정 정보는 할 일을 만드는 데만 써요. 자세한 내용은 개인정보처리방침에 있어요.",
          ],
          en: [
            "Importing the same events again won't add them twice.",
            "Undo removes only the imported to-dos you haven't finished. Completed ones stay.",
            "Nothing in your device calendar is changed or deleted. Attendees, notes and locations are never sent.",
            "Event details received during an import are used only to create your to-dos. See the Privacy Policy for details.",
          ],
        },
        screens: [
          {
            key: "calendar-import-done",
            alt: {
              ko: "가져오기를 마친 뒤 가져온 할 일과 7일 안 되돌리기 안내가 보이는 아이두 캘린더 일정 가져오기 완료 화면",
              en: "Aido's Import calendar events result screen with the imported to-dos and the option to undo within 7 days",
            },
            caption: {
              ko: "7일 안에는 한 번에 되돌릴 수 있어요.",
              en: "Undo it all within 7 days.",
            },
          },
        ],
      },
      {
        id: "more",
        navLabel: { ko: "그 밖에", en: "Also new" },
        icon: "wrench",
        title: { ko: "그 밖에 달라진 점", en: "Also in this update" },
        body: {
          ko: "화면 읽기 기능을 쓰는 분과 Mac에서 쓰는 분을 위해 다듬고 고쳤어요.",
          en: "A few improvements for screen reader users and a fix for Mac.",
        },
        points: {
          ko: [
            "VoiceOver·TalkBack으로도 캘린더와 기간을 고르고 가져오는 진행 상태를 들을 수 있어요.",
            "Mac에서 날씨를 열 때마다 위치 권한을 다시 묻던 문제를 고쳤어요.",
            "업데이트하면 캘린더 일정 가져오기를 짧게 소개해 드려요. 마이 > 새로운 기능에서 다시 볼 수 있어요.",
          ],
          en: [
            "VoiceOver and TalkBack can read the calendar and range choices and the import progress.",
            "Fixed Weather asking for location again every time you opened it on Mac.",
            "A short tour shows Import calendar events after you update. Find it again in Me > What's new.",
          ],
        },
        screens: [],
      },
    ],
    plans: {
      navLabel: { ko: "무료와 프리미엄", en: "Free vs Premium" },
      title: {
        ko: "무료와 프리미엄, 이만큼 달라요",
        en: "What Free and Premium include",
      },
      rows: [
        {
          label: {
            ko: "캘린더 일정 가져오기 기간",
            en: "Calendar import range",
          },
          free: { ko: "오늘부터 30일", en: "Next 30 days" },
          premium: { ko: "오늘부터 365일", en: "Up to 365 days" },
        },
        {
          label: { ko: "카테고리", en: "Categories" },
          free: { ko: "3개", en: "3" },
          premium: { ko: "30개", en: "30" },
        },
        {
          label: {
            ko: "카테고리마다 진행 중인 할 일",
            en: "Active to-dos per category",
          },
          free: { ko: "300개", en: "300" },
          premium: { ko: "300개", en: "300" },
        },
      ],
      note: {
        ko: "캘린더 일정 가져오기와 7일 안 되돌리기는 플랜과 상관없이 쓸 수 있어요. 구독 가격과 자세한 조건은 앱에서 확인할 수 있어요.",
        en: "Importing calendar events and undoing within 7 days work on every plan. See prices and full terms in the app.",
      },
      screen: {
        key: "calendar-import-premium",
        alt: {
          ko: "구독 혜택에 ‘캘린더 일정 더 멀리 가져오기’가 보이는 아이두 프리미엄 화면",
          en: "Aido Premium screen listing Import calendar events further ahead among the benefits",
        },
        caption: {
          ko: "프리미엄은 365일 뒤 일정까지 가져와요.",
          en: "Premium imports up to 365 days ahead.",
        },
      },
    },
  },
  {
    version: "1.16.0",
    slug: "1-16-0",
    path: "/patch-notes/1-16-0",
    updatedAt: "2026-11-17",
    kicker: { ko: "아이두 1.16.0 업데이트", en: "Aido 1.16.0 update" },
    title: {
      ko: "이유를 보여 주는 AI 제안, 차트로 보는 AI 리포트",
      en: "AI suggestions that show why, AI reports in charts",
    },
    metaTitle: {
      ko: "아이두 1.16.0 업데이트: 새로워진 AI 제안·AI 리포트",
      en: "Aido 1.16.0: New AI suggestions and AI reports",
    },
    description: {
      ko: "자주 하는 할 일을 최근 2주 기록과 함께 반복 할 일로 제안하고, AI 리포트는 날마다 끝낸 할 일과 주로 끝낸 시간을 차트로 보여 줘요. 무료로도 이번 주 내 기록을 보고, AI 제안과 AI 리포트를 예시로 미리 볼 수 있어요.",
      en: "AI suggests to-dos you do often as repeating to-dos, with your last 2 weeks as the reason, and AI reports chart what you finish each day and when. On the free plan, see this week's record and preview both with sample data.",
    },
    sections: [
      {
        id: "ai-suggestions",
        navLabel: { ko: "AI 제안", en: "AI suggestions" },
        icon: "repeat",
        title: {
          ko: "AI 제안: 자주 하는 할 일을 반복으로 만들어요",
          en: "AI suggestions: make what you do often repeat",
        },
        body: {
          ko: "AI가 최근 2주 기록에서 자주 하는 할 일을 찾아, 만들어질 반복 할 일과 같은 모양으로 보여 줘요. ‘최근 2주 14번 중 13번 끝냈어요’처럼 이유를 보고 ‘반복으로 만들기’를 누르면 매번 적지 않아도 돼요. 프리미엄 기능이에요.",
          en: "AI looks at your last 2 weeks, finds to-dos you do often and shows each one just like the repeating to-do it becomes. See why, like “Done 13 of 14 times in the last 2 weeks,” then tap Make it repeat so you never retype it. This is a Premium feature.",
        },
        points: {
          ko: [
            "‘오후 12:40 · 매주 월·화·목’처럼 시각과 반복이 할 일 목록과 똑같이 보여요.",
            "아침 분석을 기다리지 않아도 돼요. 오늘 아직 분석 전이라면 ‘지금 분석 받기’로 바로 받아요.",
            "제안이 없을 때도 살펴보는 중인지, 오늘 제안을 모두 정리했는지, 할 일이 더 필요한지와 다음에 살펴볼 시각을 알려 드려요.",
            "띄어쓰기·이모지만 다른 제목은 하나로 묶고, 이미 반복 중인 할 일은 다시 제안하지 않아요.",
          ],
          en: [
            "The time and repeat look just like your to-do list, like “12:40 PM · Weekly on Mon, Tue, Thu.”",
            "No need to wait for the morning. If today's check hasn't run yet, tap Check now.",
            "When there's nothing to suggest, you'll see whether we're still looking, you're all caught up, or we need more to-dos, plus when we'll look again.",
            "Titles that differ only in spacing or emoji count as one, and to-dos that already repeat aren't suggested again.",
          ],
        },
        screens: [
          {
            key: "suggestion-rows",
            alt: {
              ko: "‘영양제 먹기 · 오전 8:30 · 매일 · 최근 2주 14번 중 13번 끝냈어요’처럼 시각·반복·이유와 ‘필요 없어요’·‘반복으로 만들기’ 버튼이 보이는 아이두 AI 제안 예시 화면",
              en: "Aido AI suggestions sample screen with “Take vitamins, 8:30 AM, Daily, Done 13 of 14 times in the last 2 weeks” and Not needed and Make it repeat buttons",
            },
            caption: {
              ko: "제안마다 이유와 버튼 두 개가 붙어요(예시 화면).",
              en: "Each suggestion comes with a reason and two buttons (sample screen).",
            },
          },
        ],
      },
      {
        id: "ai-reports",
        navLabel: { ko: "AI 리포트", en: "AI reports" },
        icon: "chart",
        title: {
          ko: "AI 리포트: 나아진 만큼 차트로 보여요",
          en: "AI reports: see your progress in charts",
        },
        body: {
          ko: "맨 위에서 달성률과 지난번보다 얼마나 바뀌었는지 먼저 보고, 날마다 끝낸 할 일 막대와 주로 끝낸 시간을 보여 주는 24시간 차트, 카테고리별 분석으로 이어져요. 끝에서는 AI 코치가 이번 기간을 짧게 돌아보고 다음에 해 볼 팁을 알려 줘요. 프리미엄 기능이에요.",
          en: "Start with your completion rate and how much it changed, then see what you finished each day, a 24-hour chart of when you usually finish and a breakdown by category. At the end, your AI coach sums up the period and suggests what to try next. This is a Premium feature.",
        },
        points: {
          ko: [
            "막대를 누르면 그날 몇 개 중 몇 개를 끝냈는지 보여요.",
            "리포트 목록 맨 위 카드에서 최근 8주 달성률 흐름을 선으로 보고, 누르거나 옆으로 밀어 주마다 확인해요.",
            "주간 리포트는 월요일, 월간 리포트는 1일 오전 11시 30분에 도착해요.",
            "AI가 글을 쓰지 못한 때에는 ‘AI 코치’ 대신 ‘이번 기간 요약’으로 보여 드려요.",
          ],
          en: [
            "Tap a bar to see how many you finished that day.",
            "The card at the top of your reports shows your completion over the last 8 weeks. Tap or slide across it to see each week.",
            "Weekly reports arrive on Mondays and monthly reports on the 1st, at 11:30 AM.",
            "If AI couldn't write a note, you'll see “Summary for this period” instead of “AI coach.”",
          ],
        },
        screens: [
          {
            key: "report-summary",
            alt: {
              ko: "예시 데이터로 달성률 78%와 ‘6%p 올랐어요’, 완료 25/32, 날마다 끝낸 할 일 막대가 보이는 아이두 AI 리포트 예시 화면",
              en: "Aido AI report sample screen with 78% completion, “Up 6 pts,” 25 of 32 done and bars for what you finished each day",
            },
            caption: {
              ko: "달성률 변화와 날마다 끝낸 할 일",
              en: "Your completion change and each day",
            },
          },
          {
            key: "report-charts",
            alt: {
              ko: "오전 7시에 가장 많이 끝낸 24시간 차트와 업무·공부·운동 카테고리별 분석이 보이는 아이두 AI 리포트 예시 화면",
              en: "Aido AI report sample screen with a 24-hour chart peaking at 7 AM and a breakdown for Work, Study and Workout",
            },
            caption: {
              ko: "주로 끝낸 시간과 카테고리별 분석",
              en: "When you finish, and by category",
            },
          },
        ],
      },
      {
        id: "free",
        navLabel: { ko: "무료로도", en: "On the free plan" },
        icon: "gift",
        title: {
          ko: "무료로도 이번 주 내 기록을 봐요",
          en: "See this week's record for free",
        },
        body: {
          ko: "AI 리포트 화면에서 이번 주 요일마다 끝낸 할 일을 막대로 보여 드려요. 아직 오지 않은 날은 따로 표시하고, 막대를 누르면 그날 기록이 보여요. AI 분석과 코치 한마디는 프리미엄에서 받을 수 있어요.",
          en: "The AI reports screen shows what you finished each day this week as bars. Days still ahead are marked, and you can tap a bar to see that day. AI analysis and coach notes come with Premium.",
        },
        points: {
          ko: [
            "AI 제안은 예시 4가지로, AI 리포트는 주간·월간 예시 리포트로 미리 볼 수 있어요.",
            "예시 리포트는 실제 리포트와 같은 화면이라 AI 코치 글까지 모두 열어 볼 수 있어요.",
          ],
          en: [
            "Preview AI suggestions with 4 examples, and AI reports with sample weekly and monthly reports.",
            "Sample reports use the same screens as real ones, so you can open everything, coach notes included.",
          ],
        },
        screens: [],
      },
      {
        id: "notifications",
        navLabel: { ko: "알림", en: "Alerts" },
        icon: "bell",
        title: {
          ko: "AI 제안 알림은 오전 9시에",
          en: "AI suggestion alerts at 9 AM",
        },
        body: {
          ko: "새 제안을 찾으면 오전 9시에 ‘자주 하는 할 일을 찾았어요 ✨’ 알림으로 알려 드려요. ‘지금 분석 받기’로 받은 제안은 이미 보고 있으니 알림을 보내지 않아요.",
          en: "When we find new suggestions, you'll get “We found to-dos you do often ✨” at 9 AM. Suggestions you get with Check now don't send an alert, since you're already looking at them.",
        },
        points: {
          ko: [
            "마이 > 알림 설정의 ‘AI 제안·리포트 알림’을 끄면 AI 제안과 주간·월간 리포트 푸시만 오지 않아요. 앱의 알림 목록에는 그대로 남아요.",
            "AI 제안 알림은 광고성 알림이 아닌 서비스 알림이라 ‘(광고)’ 표시 없이 와요.",
            "무료 사용자도 이 설정을 미리 꺼 둘 수 있어요.",
          ],
          en: [
            "Turn off “AI suggestions & reports” in Me > Notifications to stop push alerts for AI suggestions and weekly and monthly reports only. They still show in Notifications in the app.",
            "AI suggestion alerts are service notifications, not promotions.",
            "Free users can turn it off ahead of time, too.",
          ],
        },
        screens: [],
      },
      {
        id: "fixes",
        navLabel: { ko: "고친 점", en: "Fixes" },
        icon: "wrench",
        title: { ko: "고친 점", en: "Fixes" },
        body: {
          ko: "리포트와 제안에서 헷갈리던 부분을 고쳤어요.",
          en: "We fixed a few confusing things in reports and suggestions.",
        },
        points: {
          ko: [
            "리포트 화면이 다음 리포트를 오전 8시에 온다고 안내하던 문제를 고쳤어요. 실제 도착 시각인 오전 11시 30분으로 보여요.",
            "영어로 쓸 때 지운 카테고리가 리포트에 ‘기타’로 보이던 문제를 고쳤어요. 이제 ‘Other’로 보여요.",
            "할 일이 아주 많으면 AI 제안을 받지 못하던 문제를 고쳤어요.",
          ],
          en: [
            "The reports screen said your next report would come at 8 AM. It now shows the actual time, 11:30 AM.",
            "Deleted categories in English reports showed as “기타.” They now show as “Other.”",
            "AI suggestions now arrive even when you have a lot of to-dos.",
          ],
        },
        screens: [],
      },
    ],
    plans: {
      navLabel: { ko: "무료와 프리미엄", en: "Free vs Premium" },
      title: {
        ko: "무료와 프리미엄, 이만큼 달라요",
        en: "What Free and Premium include",
      },
      rows: [
        {
          label: { ko: "AI 제안", en: "AI suggestions" },
          free: { ko: "예시로 미리 보기", en: "Preview with examples" },
          premium: {
            ko: "매일 오전 9시, 최근 2주 기록으로",
            en: "Every day at 9 AM, from your last 2 weeks",
          },
        },
        {
          label: {
            ko: "AI 주간·월간 리포트",
            en: "AI weekly and monthly reports",
          },
          free: { ko: "예시로 미리 보기", en: "Preview with samples" },
          premium: {
            ko: "매주·매월 내 기록으로",
            en: "Every week and month, from your to-dos",
          },
        },
        {
          label: { ko: "날마다 끝낸 할 일 막대", en: "Daily completion bars" },
          free: { ko: "이번 주 내 기록", en: "This week's record" },
          premium: {
            ko: "리포트마다 기간 전체",
            en: "The whole period in every report",
          },
        },
      ],
      note: {
        ko: "할 일 추가와 완료, 직접 만드는 반복 할 일은 플랜과 상관없이 쓸 수 있어요. 구독 가격과 자세한 조건은 앱에서 확인할 수 있어요.",
        en: "Adding and completing to-dos, and repeating to-dos you set up yourself, work on every plan. See prices and full terms in the app.",
      },
      screen: {
        key: "report-coach",
        alt: {
          ko: "예시 데이터의 AI 코치 글과 팁 두 가지, ‘구독하고 리포트 받기’ 버튼이 보이는 아이두 AI 리포트 예시 화면",
          en: "Aido AI report sample screen with a coach note, two tips and a Subscribe to get reports button",
        },
        caption: {
          ko: "예시 리포트는 AI 코치 글까지 볼 수 있어요.",
          en: "Sample reports include the coach note.",
        },
      },
    },
  },
  {
    version: "1.15.0",
    slug: "1-15-0",
    path: "/patch-notes/1-15-0",
    updatedAt: "2026-11-10",
    kicker: { ko: "아이두 1.15.0 업데이트", en: "Aido 1.15.0 update" },
    title: {
      ko: "말로 할 일 만들기와 회의 녹음 요약",
      en: "Speak to add and AI meeting summaries",
    },
    metaTitle: {
      ko: "아이두 1.15.0 업데이트: 말로 할 일 만들기·AI 회의 녹음 요약",
      en: "Aido 1.15.0: Speak to add to-dos and AI meeting summaries",
    },
    description: {
      ko: "길게 말하면 AI가 할 일 여러 개로 나누고 날짜·시간·반복까지 채워요. 회의·수업 녹음을 요약해 주는 말로 메모하기, 반복 할 일, 새 프리미엄 화면과 연간 구독 2주 무료 체험까지 실제 화면으로 소개해요.",
      en: "Talk as long as you like and AI splits it into to-dos with dates, times and repeats filled in. See the new Voice notes for meetings and classes, repeating to-dos, the new Premium screen and a 2-week free trial on yearly plans in real app screens.",
    },
    sections: [
      {
        id: "speak-to-add",
        navLabel: { ko: "말로 할 일 만들기", en: "Speak to add" },
        icon: "mic",
        title: {
          ko: "말로 할 일 만들기: 길게 말하면 AI가 나눠요",
          en: "Speak to add: talk, and AI splits it into to-dos",
        },
        body: {
          ko: "할 일 추가 화면에서 마이크를 누르고 하고 싶은 일을 이어서 말해 보세요. 음성 인식이 말을 글자로 바꾸면, AI가 그 글을 할 일 여러 개로 나누고 날짜·시간·반복·카테고리·나만 보기까지 채워요.",
          en: "Tap the mic on the add screen and say everything on your mind. Speech recognition turns your words into text, then AI splits that text into several to-dos and fills in dates, times, repeats, categories and private settings.",
        },
        points: {
          ko: [
            "“오늘 3시에 치과에 전화하고 퇴근길에 우유 사기”처럼 한 번에 말해도 돼요.",
            "“매일”, “월수금”, “다음 주 내내”, “나만 보게”도 알아들어요.",
            "말하는 동안 들은 내용이 바로 글자로 보여요.",
          ],
          en: [
            "Say it all at once, like “call the dentist at 3 and buy milk on the way home.”",
            "It understands “every day,” “Mon, Wed and Fri,” “all next week” and “just for me.”",
            "What it hears appears as text while you talk.",
          ],
        },
        screens: [
          {
            key: "speak-listening",
            alt: {
              ko: "‘내일 아침 7시에 헬스장 가고’처럼 말한 내용이 글자로 바로 보이는 아이두 말로 할\u00a0일 만들기 듣기\u00a0화면",
              en: "Aido Speak to add listening screen showing spoken words as text while you\u00a0talk",
            },
            caption: {
              ko: "말하는 동안 들은 말이 글자로 보여요.",
              en: "Your words appear as you\u00a0talk.",
            },
          },
          {
            key: "speak-ai-info",
            alt: {
              ko: "‘길게 말하면 AI가 할\u00a0일로 나눠요’ 설명과 이번 달 남은 횟수가 보이는 아이두 할\u00a0일 추가\u00a0시트",
              en: "Aido add sheet explaining that AI splits what you say into to-dos, with the uses left this\u00a0month",
            },
            caption: {
              ko: "ⓘ를 누르면 남은 횟수와 초기화 날을 봐요.",
              en: "Tap ⓘ to see uses left and when they\u00a0reset.",
            },
          },
        ],
      },
      {
        id: "review-before-adding",
        navLabel: { ko: "고르고 고치기", en: "Pick and edit" },
        icon: "list-checks",
        title: {
          ko: "추가하기 전에 고르고 고쳐요",
          en: "Pick and edit before you add",
        },
        body: {
          ko: "AI가 나눈 할 일은 목록으로 먼저 보여요. 추가할 것만 체크하고, 할 일을 누르면 제목·날짜·시간·반복을 고칠 수 있어요. 아래 버튼을 누르기 전에는 아무것도 저장되지 않아요.",
          en: "The to-dos AI suggests show up as a list first. Check only the ones you want, and tap one to edit its title, date, time or repeat. Nothing is saved until you tap the button at the bottom.",
        },
        points: {
          ko: [
            "이미 있는 할 일은 ‘이미 있어요’로 알려 주고 처음엔 체크하지 않아요.",
            "잘 안 되면 횟수는 차감되지 않고, 직접 입력은 계속 무료예요.",
          ],
          en: [
            "To-dos you already have are marked and left unchecked at first.",
            "Failed attempts don't count, and typing to-dos yourself stays free.",
          ],
        },
        screens: [],
        comparison: {
          before: {
            key: "voice-add",
            label: { ko: "1.14.2까지", en: "Up to 1.14.2" },
            alt: {
              ko: "1.14.2까지의 아이두 할 일 추가 화면. 말로 할 일을 하나씩 넣었어요",
              en: "Aido add screen up to 1.14.2, where you added one to-do at a time by voice",
            },
          },
          after: {
            key: "speak-review",
            label: { ko: "1.15.0부터", en: "From 1.15.0" },
            alt: {
              ko: "AI가 말한 내용을 할 일 여러 개로 나누고 추가할 것을 고르는 아이두 1.15.0 화면",
              en: "Aido 1.15.0 screen where AI splits what you said into several to-dos to pick from",
            },
          },
        },
      },
      {
        id: "voice-notes",
        navLabel: { ko: "말로 메모하기", en: "Voice notes" },
        icon: "audio-lines",
        title: {
          ko: "말로 메모하기: 회의·수업 녹음을 AI가 요약해요",
          en: "Voice notes: AI sums up your meetings and classes",
        },
        body: {
          ko: "메모 탭에서 말로 메모하기를 누르고 회의나 수업을 들려주세요. 녹음을 멈추고 정리하면 AI가 요약과 핵심 포인트, 해야 할 일을 찾아 줘요. 찾은 할 일은 고른 뒤 바로 추가할 수 있어요.",
          en: "Tap Voice notes on the Notes tab and let it hear a meeting or class. Stop and sort it out, and AI finds a summary, key points and to-dos. Pick the to-dos you want and add them right away.",
        },
        points: {
          ko: [
            "녹음하는 동안 중요한 순간에 표시를 남길 수 있어요.",
            "핵심 포인트를 누르면 그 지점부터 다시 들을 수 있어요.",
            "녹음 파일은 기기에 저장되고 아이두 서버로 보내지 않아요. 30일이 지나면 자동으로 지워지고, 마이 탭 > 녹음 저장 공간에서 언제든 지울 수 있어요.",
          ],
          en: [
            "Mark the moments that matter while you record.",
            "Tap a key point to listen from there.",
            "Audio files are saved on your device and aren't sent to Aido's servers. They're deleted automatically after 30 days, and you can delete them anytime in Me > Recording storage.",
          ],
        },
        screens: [
          {
            key: "voice-note-record",
            alt: {
              ko: "회의를 녹음하며 중요한 순간을 표시하는 아이두 말로 메모하기 녹음 화면",
              en: "Aido Voice notes recording screen with marks for important moments",
            },
            caption: {
              ko: "녹음하며 중요한 순간을 표시해요.",
              en: "Mark important moments as you record.",
            },
          },
          {
            key: "voice-note-result",
            alt: {
              ko: "AI가 정리한 회의 요약과 시간이 붙은 핵심 포인트가 보이는 아이두 말로 메모하기 결과 화면",
              en: "Aido Voice notes result with an AI meeting summary and time-stamped key points",
            },
            caption: {
              ko: "요약과 핵심 포인트, 할 일을 찾아 줘요.",
              en: "Get a summary, key points and to-dos.",
            },
          },
        ],
      },
      {
        id: "notes-to-todos",
        navLabel: { ko: "메모를 할 일로", en: "Notes to to-dos" },
        icon: "notebook-pen",
        title: {
          ko: "적어 둔 메모도 AI가 할 일로 정리해요",
          en: "AI turns your written notes into to-dos",
        },
        body: {
          ko: "메모에서 ‘AI로 할 일 나누기’를 누르면 AI가 적어 둔 글을 할 일로 나눠요. 말로 할 일 만들기와 같은 방식으로 추가할 것만 고르고 고칠 수 있어요.",
          en: "Tap “Split into to-dos with AI” on a note, and AI splits what you wrote into to-dos. Just like Speak to add, pick and edit the ones you want.",
        },
        points: { ko: [], en: [] },
        screens: [],
        comparison: {
          before: {
            key: "memo-ai",
            label: { ko: "1.14.2까지", en: "Up to 1.14.2" },
            alt: {
              ko: "1.14.2까지의 아이두 메모 AI 결과 화면",
              en: "Aido note AI results screen up to 1.14.2",
            },
          },
          after: {
            key: "memo-ai-review",
            label: { ko: "1.15.0부터", en: "From 1.15.0" },
            alt: {
              ko: "이사 준비 메모를 AI가 할 일 4개로 나누고 추가할 것을 고르는 아이두 1.15.0 화면",
              en: "Aido 1.15.0 screen where AI splits a moving checklist note into 4 to-dos to pick from",
            },
          },
        },
      },
      {
        id: "repeating-todos",
        navLabel: { ko: "반복 할 일", en: "Repeating to-dos" },
        icon: "repeat",
        title: {
          ko: "반복 할 일: 매일부터 매주 월수금까지",
          en: "Repeating to-dos: from daily to every Mon, Wed and Fri",
        },
        body: {
          ko: "반복을 매일·평일·매주·격주·매월로 고르고, 기간을 정하거나 계속 반복할 수 있어요. “매주 월수금 운동”처럼 말해도 반복 할 일로 만들어요.",
          en: "Repeat a to-do daily, on weekdays, weekly, every other week or monthly, for a set period or with no end. Saying “work out every Mon, Wed and Fri” works, too.",
        },
        points: {
          ko: [
            "고치거나 지울 때는 이 할 일만, 이 할 일과 이후 할 일, 이 반복 전체 중에서 골라요.",
            "목록에서 반복 주기를 바로 볼 수 있어요.",
          ],
          en: [
            "When you edit or delete one, choose Just this one, This and following, or All in this repeat.",
            "The list shows how often each to-do repeats.",
          ],
        },
        screens: [
          {
            key: "repeat-weekdays",
            alt: {
              ko: "주중 반복과 요일을 고르는 아이두 반복 설정 시트",
              en: "Aido repeat sheet with weekdays selected",
            },
            caption: {
              ko: "요일과 기간을 골라요.",
              en: "Choose the days and how long.",
            },
          },
        ],
      },
      {
        id: "premium",
        navLabel: { ko: "프리미엄·무료 체험", en: "Premium and free trial" },
        icon: "crown",
        title: {
          ko: "새 프리미엄 화면과 연간 구독 2주 무료 체험",
          en: "A new Premium screen and 2 weeks free on yearly plans",
        },
        body: {
          ko: "혜택을 한 장씩 넘겨 보고, 무료와 프리미엄을 표로 비교해요. 항목 이름을 누르면 설명이 나와요. 결제가 끝나면 방금 고른 요금제로 바로 써 볼 수 있는 시작 화면을 보여 줘요.",
          en: "Swipe through the benefits and compare Free and Premium in a table. Tap a feature name to see what it does. After you subscribe, a welcome screen helps you get started with your plan.",
        },
        points: {
          ko: [
            "연간 구독을 처음 시작하면 2주 무료 체험을 받을 수 있어요(스토어가 대상으로 정한 계정).",
            "무료 체험은 끝나기 3일 전에, 연간 구독은 갱신 7일 전에 알려 드려요.",
            "AI를 쓰는 곳에는 이번 달 남은 횟수가 보이고, 다 쓰면 몇 회 썼는지와 언제 초기화되는지 알려 드려요.",
          ],
          en: [
            "New yearly subscribers can get 2 weeks free (accounts the store marks as eligible).",
            "We'll remind you 3 days before a free trial ends and 7 days before a yearly plan renews.",
            "Places that use AI show how many uses are left this month. Run out? See your usage and when it resets.",
          ],
        },
        screens: [
          {
            key: "paywall-benefits",
            alt: {
              ko: "‘AI 할 일 만들기 넉넉하게’ 혜택 카드가 보이는 아이두 프리미엄 화면",
              en: "Aido Premium screen with a benefit card for AI to-dos",
            },
            caption: {
              ko: "혜택을 넘겨 보며 확인해요.",
              en: "Swipe through the benefits.",
            },
          },
          {
            key: "paywall-compare",
            alt: {
              ko: "AI 기능과 한도를 무료와 프리미엄으로 비교한 아이두 표",
              en: "Aido table comparing AI features and limits on Free and Premium",
            },
            caption: {
              ko: "무료와 프리미엄을 표로 비교해요.",
              en: "Compare Free and Premium at a glance.",
            },
          },
        ],
      },
      {
        id: "large-screens",
        navLabel: { ko: "큰 화면", en: "Wide screens" },
        icon: "tablet",
        title: {
          ko: "iPad·접는 폰·iPhone Duo에서는 두 칸으로",
          en: "Two panes on iPad, foldables and iPhone Duo",
        },
        body: {
          ko: "넓은 화면에서는 마이 탭이 두 칸으로 보여요. 왼쪽 메뉴는 그대로 두고 오른쪽 화면만 바뀌어서, 설정과 친구, 리포트를 오가기 편해요.",
          en: "On wide screens, the Me tab shows two panes. The menu stays on the left while the right side changes, so moving between settings, friends and reports is easier.",
        },
        points: { ko: [], en: [] },
        screens: [
          {
            key: "mypage-two-pane",
            alt: {
              ko: "펼친 iPhone Duo에서 왼쪽에 메뉴, 오른쪽에 내용이 보이는 아이두 마이 탭",
              en: "Aido Me tab on an unfolded iPhone Duo with the menu on the left and content on the right",
            },
            caption: {
              ko: "펼친 iPhone Duo의 마이 탭",
              en: "The Me tab on an unfolded iPhone Duo",
            },
          },
        ],
      },
      {
        id: "more",
        navLabel: { ko: "그 밖에", en: "More" },
        icon: "sparkles",
        title: { ko: "그 밖에 달라진 점", en: "More changes" },
        body: {
          ko: "매일 쓰는 작은 부분도 다듬었어요.",
          en: "We also polished the little things you use every day.",
        },
        points: {
          ko: [
            "알림은 가입 직후 한 번만 묻고, 위치는 날씨를 볼 때만 물어요. 알림을 꺼 둔 채 할 일 시간을 정하면 그 자리에서 알려 드려요.",
            "해외에 가도 할 일 시간이 그대로예요. 한국에서 오전 10시로 정한 할 일은 다른 나라에서도 오전 10시에 알려 드려요.",
            "읽지 않은 알림이 있으면 채운 종과 주황 점으로 알려 줘요.",
            "숨길 답글이 없는데도 ‘답글 숨기기’가 보이던 문제와, 앱이 꺼져 있을 때 알림을 누르면 할 일 탭이 열리던 문제를 고쳤어요.",
          ],
          en: [
            "We ask for notifications once at sign-up and for location only when you check the weather. If notifications are off when you set a time for a to-do, we'll tell you right there.",
            "To-do times stay put when you travel. A to-do set for 10 AM in Korea still reminds you at 10 AM local time abroad.",
            "A filled bell with an orange dot shows when you have unread notifications.",
            "Fixed “Hide replies” showing with nothing to hide, and tapping a notification while the app was closed opening the to-do tab.",
          ],
        },
        screens: [
          {
            key: "notification-intro",
            alt: {
              ko: "‘할 일 시간에 맞춰 알려드릴게요’ 안내와 알림 받기 버튼이 있는 아이두 가입 직후 화면",
              en: "Aido screen right after sign-up explaining notifications with a button to turn them on",
            },
            caption: {
              ko: "알림은 가입 직후 한 번만 물어요.",
              en: "We ask about notifications once at sign-up.",
            },
          },
        ],
      },
    ],
    plans: {
      navLabel: { ko: "무료와 프리미엄", en: "Free vs Premium" },
      title: {
        ko: "무료와 프리미엄, 이만큼 써요",
        en: "What Free and Premium include",
      },
      rows: [
        {
          label: {
            ko: "AI 할 일 만들기(글·말·메모 공통)",
            en: "AI to-dos (text, voice and notes)",
          },
          free: { ko: "월 10회", en: "10 a month" },
          premium: {
            ko: "월 1,000회까지 넉넉하게",
            en: "Up to 1,000 a month",
          },
        },
        {
          label: { ko: "말로 메모하기", en: "Voice notes" },
          free: {
            ko: "월 3회, 회당 3분까지",
            en: "3 a month, up to 3 min each",
          },
          premium: {
            ko: "월 100회, 회당 30분까지",
            en: "100 a month, up to 30 min each",
          },
        },
        {
          label: {
            ko: "녹음 다시 듣기·핵심 포인트 이동",
            en: "Replay and jump to key points",
          },
          free: { ko: "쓸 수 있어요", en: "Included" },
          premium: { ko: "쓸 수 있어요", en: "Included" },
        },
        {
          label: { ko: "친구", en: "Friends" },
          free: {
            ko: "5명(조건을 채운 초대마다 +1)",
            en: "5 (+1 for each qualifying invite)",
          },
          premium: { ko: "무제한", en: "Unlimited" },
        },
        {
          label: { ko: "카테고리", en: "Categories" },
          free: { ko: "3개", en: "3" },
          premium: { ko: "30개", en: "30" },
        },
        {
          label: { ko: "콕 찌르기·응원", en: "Nudges and cheers" },
          free: { ko: "하루 3회씩", en: "3 each a day" },
          premium: { ko: "무제한", en: "Unlimited" },
        },
      ],
      note: {
        ko: "할 일 추가와 완료는 플랜과 상관없이 쓸 수 있어요. 구독 가격과 자세한 조건은 앱에서 확인할 수 있어요.",
        en: "Adding and completing to-dos works on every plan. See prices and full terms in the app.",
      },
      screen: {
        key: "usage-card",
        alt: {
          ko: "이번 달 AI 할 일 만들기와 말로 메모 정리 사용량이 보이는 아이두 마이 탭",
          en: "Aido Me tab showing this month's AI to-do and voice note usage",
        },
        caption: {
          ko: "이번 달 사용량은 마이 탭에서 봐요.",
          en: "Check this month's usage in the Me tab.",
        },
      },
    },
  },
] as const satisfies ReadonlyArray<{
  version: string;
  slug: string;
  path: `/patch-notes/${string}`;
  updatedAt: string;
  kicker: LocalizedText;
  title: LocalizedText;
  metaTitle: LocalizedText;
  description: LocalizedText;
  sections: readonly HighlightSection[];
  plans: {
    navLabel: LocalizedText;
    title: LocalizedText;
    rows: readonly PlanRow[];
    note: LocalizedText;
    screen: HighlightScreen;
  };
}>;

export type ReleaseHighlight = (typeof releaseHighlights)[number];

export function getReleaseHighlight(slug: string) {
  return releaseHighlights.find((highlight) => highlight.slug === slug);
}

export function getReleaseHighlightByVersion(version: string) {
  return releaseHighlights.find((highlight) => highlight.version === version);
}
