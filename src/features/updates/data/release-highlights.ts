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
  | "sparkles";

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
            key: "voice-note-start",
            alt: {
              ko: "메모 탭의 말로 메모 버튼 옆에 ‘말로 메모해보세요’ 안내가 뜬 아이두\u00a0화면",
              en: "Aido Notes tab with a tip next to the voice note button that invites you to record a\u00a0meeting",
            },
            caption: {
              ko: "메모 탭에서 말로 메모를 눌러요.",
              en: "Tap Voice notes on the Notes\u00a0tab.",
            },
          },
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
        screens: [
          {
            key: "memo-ai-menu",
            alt: {
              ko: "메모의 더보기 메뉴에 ‘AI로 할\u00a0일 나누기’와 이번 달 남은 횟수가 보이는 아이두\u00a0화면",
              en: "Aido note menu showing Split into to-dos with AI and the uses left this\u00a0month",
            },
            caption: {
              ko: "메모의 더보기에서 골라요.",
              en: "Find it in the note's More\u00a0menu.",
            },
          },
        ],
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
