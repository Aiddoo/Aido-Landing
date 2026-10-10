import type { Locale } from "@/i18n/config";

export type ReleaseCategory = "bugFixes" | "features" | "improvements";

type LocalizedText = Record<Locale, string>;
type UpdateContent = {
  date: string;
  summary: LocalizedText;
  categories: {
    type: ReleaseCategory;
    items: LocalizedText[];
  }[];
};

export type ReleaseNote = UpdateContent & {
  version: string;
  /** Short, curated highlights. formatStoreNotes adds the shared introduction. */
  storeNotes: Record<Locale, string[]>;
};

export type ServiceUpdate = UpdateContent & { id: string };
export type UpdateNote =
  | (ReleaseNote & { kind: "app"; id: string })
  | (ServiceUpdate & { kind: "service" });

// Change this only when existing copy is edited, not on every build.
export const PATCH_NOTES_EDITED_AT = "2026-10-08";

export const releaseNotes: [ReleaseNote, ...ReleaseNote[]] = [
  {
    version: "1.11.0",
    date: "2026-10-05",
    summary: {
      ko: "친구가 보낸 콕에 답장하고, 위젯에서 오늘의 할 일을 더 편하게 확인할 수 있어요.",
      en: "Reply to nudges from friends and see today’s to-dos more easily in your widgets.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구가 보낸 콕에 ‘시작해볼게’, ‘응원 고마워’, ‘조금 뒤에 할게’로 답장할 수 있어요. 답장 후에도 마친 할 일은 직접 체크해 주세요.",
            en: "Reply to a friend’s nudge with “I’ll get started”, “Thanks for cheering me on”, or “I’ll do it later”. You still need to check off the to-do when you finish it.",
          },
          {
            ko: "공개한 할 일을 마치면 콕으로 응원해 준 친구들에게 한 번에 고마움을 전할 수 있어요. 답장과 감사는 무료로 이용할 때도 쓸 수 있어요.",
            en: "After finishing a public to-do, thank the friends who nudged you in one go. Replies and thanks are available on the free plan too.",
          },
          {
            ko: "중간 위젯에서는 오늘의 할 일을, 큰 위젯에서는 주간 달력과 오늘의 목록을 함께 볼 수 있어요. ‘할 일 만들기’를 누르면 앱에서 바로 추가할 수 있어요.",
            en: "See today's to-dos in the medium widget, or your weekly calendar and today's list in the large widget. Tap ‘Add a to-do’ to create one in the app.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "받은 콕과 친구의 답장, 고마움을 알림 목록에서 함께 확인할 수 있어요. 보낸 콕에서도 친구의 반응을 살펴볼 수 있어요.",
            en: "Find nudges, replies, and thanks together in your notifications. You can also follow your friends' responses in the nudges you've sent.",
          },
          {
            ko: "작은 위젯에서는 완료 수와 진행률을 확인할 수 있어요. 모든 크기의 고양이 발자국을 더 또렷하게 다듬고, iPhone과 Android의 배치를 비슷하게 맞췄어요.",
            en: "The small widget shows your completion count and progress. Paw prints are clearer in every size, with more consistent layouts on iPhone and Android.",
          },
          {
            ko: "앱을 켜 둔 채 자정이 지나거나 다음 날 앱으로 돌아오면 오늘 날짜가 바뀌도록 다듬었어요.",
            en: "Today’s date now updates after midnight while the app is open, or when you return the next day.",
          },
          {
            ko: "콕과 할 일 알림의 문구를 다듬었어요. 알림에서 할 일로 이동하거나 이전 화면으로 돌아가는 과정도 더 자연스러워졌어요.",
            en: "Nudge and to-do reminder messages read more naturally. Moving from a notification to a to-do and back is smoother too.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구의 콕에 답장하고, 공개한 할 일을 마친 뒤 고마움을 전할 수 있어요. 무료로도 이용할 수 있어요.",
        "중간 위젯에서 오늘의 할 일을, 큰 위젯에서 주간 달력과 목록을 함께 볼 수 있어요.",
        "답장과 감사 알림, 날짜 표시와 화면 이동을 다듬었어요.",
      ],
      en: [
        "Reply to nudges and thank friends after finishing a public to-do, on the free plan too.",
        "See today’s to-dos in the medium widget, or a weekly calendar and list in the large widget.",
        "We improved reply notifications, date updates, and navigation.",
      ],
    },
  },
  {
    version: "1.10.1",
    date: "2026-10-04",
    summary: {
      ko: "날씨와 화면 이동을 더 편하게 다듬고, 새로운 고양이 친구들이 찾아왔어요.",
      en: "Weather screens and navigation are easier to use, with new cat friends to meet.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "러시안 블루, 크림, 턱시도 고양이가 추가돼 프로필을 9가지 고양이 중에서 고를 수 있어요. 프리미엄 구독자는 앱 아이콘도 바꿀 수 있어요.",
            en: "Russian Blue, Cream, and Tuxedo cats bring your profile choices to nine. Premium subscribers can also change their app icon.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면의 상단과 배경을 자연스럽게 맞추고, 라이트 모드와 다크 모드에서 더 편하게 볼 수 있도록 다듬었어요.",
            en: "The weather screen has a more consistent header and background, with clearer colors in light and dark mode.",
          },
          {
            ko: "한국 밖에서는 날씨를 국내에서만 지원한다는 안내를 확인할 수 있어요.",
            en: "Outside Korea, you will see a notice explaining that weather is currently supported only in Korea.",
          },
          {
            ko: "할 일, 메모, 마이페이지를 더 쉽게 구분할 수 있도록 하단 탭 아이콘을 새롭게 다듬었어요.",
            en: "Refreshed bottom tab icons make to-dos, notes, and My Page easier to tell apart.",
          },
          {
            ko: "등록된 할 일이나 메모가 없을 때 안내가 화면 가운데에 보이고, 캘린더를 불러오지 못하면 가까운 곳에서 다시 시도할 수 있어요.",
            en: "Empty to-do and note lists show a centered message. If the calendar cannot load, you can retry without scrolling far.",
          },
          {
            ko: "목록을 스크롤하거나 불러오는 과정을 다듬고, 화면 아래 내용이 하단 탭에 가려지지 않도록 정리했어요.",
            en: "Lists are smoother to scroll and load, and content at the bottom stays clear of the tabs.",
          },
          {
            ko: "무료로 이용할 때는 AI 기능 안내를 먼저 보여드리고, 프리미엄 AI 제안을 준비 중이거나 불러오지 못했을 때도 상태를 더 쉽게 알 수 있어요.",
            en: "Free users see an introduction to AI features. Premium subscribers get clearer messages while AI suggestions are being prepared or cannot load.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱에 처음 들어왔을 때 위치와 예보가 늦게 반영되거나, 상단 온도가 가끔 보이지 않던 문제를 고쳤어요.",
            en: "We fixed delayed location and forecast updates when opening the app, and the temperature occasionally missing from the top of the screen.",
          },
          {
            ko: "Android에서 테마를 바꾸거나 이전 화면으로 돌아갈 때 앱이 갑자기 종료될 수 있던 문제를 고쳤어요.",
            en: "We fixed an issue that could unexpectedly close the app on Android when changing themes or going back.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "프로필 고양이가 9종으로 늘었어요. 프리미엄에서는 앱 아이콘도 바꿀 수 있어요.",
        "날씨 화면과 하단 탭, 목록과 AI 제안 안내를 다듬었어요.",
        "날씨 정보가 늦게 뜨거나 Android에서 테마 변경·뒤로 가기 중 앱이 종료되던 문제를 고쳤어요.",
      ],
      en: [
        "Choose from nine profile cats. Premium subscribers can change their app icon too.",
        "We refreshed weather screens, tabs, lists, and AI suggestion messages.",
        "We fixed delayed weather updates and Android crashes when changing themes or going back.",
      ],
    },
  },
  {
    version: "1.10.0",
    date: "2026-10-02",
    summary: {
      ko: "화면 이동과 위젯을 더 부드럽고 안정적으로 다듬었어요.",
      en: "Navigation and widgets now feel smoother and more reliable.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "앱 하단 탭을 새롭게 다듬어, iPhone과 Android에서 원하는 화면으로 더 자연스럽게 이동할 수 있어요.",
            en: "You can move between screens more naturally with refreshed bottom tabs on iPhone and Android.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "홈 화면 위젯에 오늘의 날짜, 할 일 목록과 완료 상태가 더 안정적으로 표시되도록 다듬었어요.",
            en: "Your home screen widgets now show today's date, to-dos, and completion progress more reliably.",
          },
          {
            ko: "입력창과 키보드 동작을 다듬어, 할 일과 댓글을 더 편하게 작성할 수 있어요.",
            en: "You can write to-dos and comments more comfortably with improved text fields and keyboard behavior.",
          },
          {
            ko: "메모를 작성하고 수정하거나 할 일로 바꾸는 과정이 더 안정적으로 이어지도록 다듬었어요.",
            en: "Creating, editing, and turning notes into to-dos now works more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone과 Android의 하단 탭과 화면 이동을 다듬었어요.",
        "위젯의 날짜, 할 일과 완료 상태가 더 안정적으로 표시돼요.",
        "할 일과 댓글 입력, 메모 작성·수정·변환을 다듬었어요.",
      ],
      en: [
        "We refreshed bottom tabs and navigation on iPhone and Android.",
        "Widgets show dates, to-dos, and completion progress more reliably.",
        "We improved typing to-dos and comments, and creating, editing, and converting notes.",
      ],
    },
  },
  {
    version: "1.9.0",
    date: "2026-08-28",
    summary: {
      ko: "할 일 속 댓글과 답글이 더 자연스럽게 이어져요.",
      en: "Conversations in your to-dos now flow more naturally.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일 상세에서 댓글과 답글을 함께 보고, 원하는 댓글에 바로 답글을 남길 수 있어요.",
            en: "You can view comments and replies together in a to-do and reply directly to a comment.",
          },
          {
            ko: "답글이 이어진 대화를 펼쳐 보고, 댓글 알림을 누르면 해당 댓글로 바로 이동할 수 있어요.",
            en: "You can expand a conversation to read its replies and jump to the relevant comment from a notification.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "댓글을 쓰거나 답글을 오갈 때 입력창과 화면 이동이 더 자연스럽게 이어지도록 다듬었어요.",
            en: "Writing comments and moving between replies now feels smoother, with the text field ready where you need it.",
          },
          {
            ko: "답글을 작성하다 뒤로 가기를 누르면 한 번에 이전 댓글 화면으로 돌아갈 수 있어요.",
            en: "You can return to the previous comment screen with one tap when you go back while writing a reply.",
          },
          {
            ko: "할 일 목록의 간격을 정돈하고, 댓글 작성자와 내용이 더 또렷하게 보이도록 다듬었어요.",
            en: "Your to-do list has tidier spacing, and comment authors and text are easier to read.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일에서 댓글과 답글을 함께 보고, 원하는 댓글에 답글을 남길 수 있어요.",
        "댓글 알림을 누르면 해당 댓글로 이동해요.",
        "답글 작성과 뒤로 가기, 목록 간격을 다듬었어요.",
      ],
      en: [
        "View comments and replies together and reply directly to a comment.",
        "Open a comment notification to jump to that comment.",
        "We improved writing replies, going back, and list spacing.",
      ],
    },
  },
  {
    version: "1.8.2",
    date: "2026-08-05",
    summary: {
      ko: "친구가 할 일을 마친 날을 캘린더에서 더 쉽게 확인할 수 있어요.",
      en: "See the days your friends finish their to-dos more easily in the calendar.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구가 공개한 할 일을 모두 마친 날에는 친구 캘린더에 물고기가 보여요.",
            en: "A fish appears on a friend's calendar when they finish all their public to-dos for the day.",
          },
          {
            ko: "친구가 어떤 카테고리의 할 일을 마쳤는지 색깔 점으로 한눈에 확인할 수 있어요.",
            en: "You can see which categories your friend completed at a glance with colored dots.",
          },
          {
            ko: "친구가 공개한 할 일만 보여드려서, 서로의 하루를 부담 없이 살펴볼 수 있어요.",
            en: "You only see your friend's public to-dos, so you can follow their day comfortably.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날짜를 바꿔도 친구의 완료 기록이 자연스럽게 이어지도록 다듬었어요.",
            en: "Your friend's completion history now stays in sync as you move between dates.",
          },
          {
            ko: "내 캘린더와 친구 캘린더를 오갈 때 필요한 정보를 더 쉽게 알아볼 수 있도록 다듬었어요.",
            en: "The details you need are easier to follow when switching between your calendar and a friend's.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구가 공개한 할 일을 모두 마친 날에는 캘린더에 물고기가 보여요.",
        "완료한 할 일의 카테고리는 색깔 점으로 확인할 수 있어요.",
        "친구의 공개 기록만 표시하고, 날짜와 캘린더를 오가는 화면을 다듬었어요.",
      ],
      en: [
        "A fish marks days when a friend finishes all their public to-dos.",
        "Colored dots show the categories they completed.",
        "Only public records are shown. We improved moving between dates and calendars.",
      ],
    },
  },
  {
    version: "1.8.1",
    date: "2026-08-03",
    summary: {
      ko: "매일 쓰는 아이두가 더 부드럽고 안정적으로 움직여요.",
      en: "Everyday planning with Aido now feels smoother and more reliable.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "화면을 이동할 때 움직임이 더 부드럽게 이어지도록 다듬었어요.",
            en: "Moving between screens now feels smoother.",
          },
          {
            ko: "로그인과 구독을 더 안정적으로 이용할 수 있도록 다듬었어요.",
            en: "Sign-in and subscriptions now work more reliably.",
          },
          {
            ko: "가끔 생기던 오류를 줄이고, 문제가 생겼을 때 원인을 확인하기 쉽도록 다듬었어요.",
            en: "We reduced occasional errors and made issues easier to investigate.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "화면 이동과 움직임을 더 부드럽게 다듬었어요.",
        "로그인과 구독을 더 안정적으로 이용할 수 있도록 다듬었어요.",
        "가끔 생기던 오류를 줄였어요.",
      ],
      en: [
        "We smoothed out screen transitions and animations.",
        "Sign-in and subscriptions work more reliably.",
        "We reduced occasional errors.",
      ],
    },
  },
  {
    version: "1.8.0",
    date: "2026-07-27",
    summary: {
      ko: "아이두의 유용한 기능을 한곳에서 만나볼 수 있어요.",
      en: "You can discover Aido's handy features in one place.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "메모 AI, 친구 찾기, 순서 정리 등 유용한 기능을 모은 기능 가이드가 생겼어요. 마이페이지에서 언제든 다시 볼 수 있어요.",
            en: "You can explore features like AI for notes, finding friends, and reordering in the new Feature Guide, then reopen it anytime from My Page.",
          },
          {
            ko: "아이두를 처음 쓴다면, 홈의 시작 체크리스트를 따라 첫 할 일을 만들고 완료할 수 있어요.",
            en: "If you're new to Aido, a starter checklist on Home guides you through creating and completing your first to-do.",
          },
          {
            ko: "할 일과 카테고리를 길게 눌러 원하는 순서로 옮길 수 있다는 안내를 화면에서 바로 확인할 수 있어요.",
            en: "You can see an on-screen tip explaining how to press and hold to reorder to-dos and categories.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "친구를 구분하는 8자리 코드를 #이 붙은 표기로 통일했어요. 검색과 프로필에서 같은 코드로 친구를 알아볼 수 있어요.",
            en: "Your 8-character friend code now uses the same # format in search and profiles.",
          },
          {
            ko: "친구가 할 일을 완료했을 때 보내드리는 알림이 더 정확한 순간에 도착하도록 다듬었어요.",
            en: "Notifications about a friend's completed to-do now arrive at a more accurate time.",
          },
          {
            ko: "할 일과 카테고리를 빠르게 연달아 정리해도 순서가 어긋나지 않도록 다듬었어요.",
            en: "Your to-dos and categories now stay in the right order, even when you rearrange them quickly.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "마이페이지에서 메모 AI, 친구 찾기, 순서 정리 등의 기능 가이드를 볼 수 있어요.",
        "처음 시작할 때 첫 할 일을 만들고 마치는 과정을 안내해요.",
        "친구 코드의 # 표기, 완료 알림과 할 일·카테고리 순서 정리를 다듬었어요.",
      ],
      en: [
        "Explore AI for notes, finding friends, and reordering in the Feature Guide on My Page.",
        "A starter checklist helps you create and finish your first to-do.",
        "We improved # friend codes, completion notifications, and reordering to-dos and categories.",
      ],
    },
  },
  {
    version: "1.7.0",
    date: "2026-07-19",
    summary: {
      ko: "아이두를 더 안정적으로 이용할 수 있도록 다듬었어요.",
      en: "We made Aido more reliable for everyday planning.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적으로 사용할 수 있도록 다듬었어요.",
            en: "We improved the app’s reliability.",
          },
          {
            ko: "문제가 생겼을 때 원인을 확인하고 수정하는 과정을 다듬었어요.",
            en: "We improved how we investigate and fix issues.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 더 안정적으로 사용할 수 있도록 다듬었어요.",
        "문제가 생겼을 때 원인을 확인하고 수정하는 과정을 다듬었어요.",
      ],
      en: [
        "We improved the app’s reliability.",
        "We improved how we investigate and fix issues.",
      ],
    },
  },
  {
    version: "1.6.0",
    date: "2026-07-18",
    summary: {
      ko: "설정을 보기 좋게 정리하고, 앱의 안정성도 다듬었어요.",
      en: "Settings have a fresh look, and the app now works more reliably.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "설정에서 언어와 화면 테마를 고르는 화면을 새롭게 꾸몄어요. 아이콘과 함께 원하는 옵션을 더 쉽게 찾을 수 있어요.",
            en: "You can find your preferred language and theme more easily in the refreshed Settings screens, now with icons.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적으로 사용할 수 있도록 다듬었어요.",
            en: "We improved the app’s reliability.",
          },
          {
            ko: "구독을 이용하고 데이터를 저장하는 과정을 더 안정적으로 다듬었어요.",
            en: "Subscriptions and saving your data now work more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "설정에서 언어와 테마를 아이콘과 함께 더 쉽게 고를 수 있어요.",
        "구독과 데이터 저장을 더 안정적으로 다듬었어요.",
      ],
      en: [
        "Choose a language and theme more easily in Settings, with helpful icons.",
        "We improved subscriptions, data saving, and app reliability.",
      ],
    },
  },
  {
    version: "1.5.2",
    date: "2026-07-14",
    summary: {
      ko: "위젯을 더 깔끔하게 다듬고, 새로운 하루도 잘 챙겨드려요.",
      en: "Widgets have a cleaner look, and Aido keeps up with each new day.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "Android에서도 iPhone과 같은 디자인의 위젯 3종을 사용할 수 있어요. 필요한 정보에 맞춰 골라보세요.",
            en: "You can choose from the same three widget styles on Android and iPhone to see the information you need.",
          },
          {
            ko: "할 일과 연속 달성을 이어갈 수 있도록 맞춤 제안과 응원 알림을 받아볼 수 있어요.",
            en: "You can receive personalized suggestions and encouragement to keep your to-dos and streaks going.",
          },
          {
            ko: "맞춤 제안 알림은 회원가입할 때 선택하거나, 마이페이지의 약관 및 정책에서 언제든 바꿀 수 있어요.",
            en: "You can choose whether to receive personalized suggestions at sign-up and change your choice anytime under Terms & Policies in My Page.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나거나 다음 날 앱으로 돌아오면, 새로운 오늘 날짜로 시작하도록 다듬었어요.",
            en: "The app now starts on the new date after midnight or when you return the next day.",
          },
          {
            ko: "알림을 누르면 관련 화면으로 이동하도록 다듬었어요. 알림을 모두 읽음으로 바꾸면 목록에도 바로 반영돼요.",
            en: "Notifications now open the relevant screen. Marking all as read updates the list right away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 iPhone과 Android 기기에서 위젯의 글자가 잘리거나 정렬이 어긋나던 문제를 고쳤어요.",
            en: "We fixed clipped text and uneven alignment in widgets on some iPhone and Android devices.",
          },
          {
            ko: "화면을 불러오는 중 문제가 생겨도 앱을 계속 사용할 수 있도록 안정성을 다듬었어요.",
            en: "We improved stability so you can keep using the app when a screen has trouble loading.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "Android에서도 iPhone과 같은 디자인의 위젯 3종을 쓸 수 있어요.",
        "맞춤 제안과 응원 알림을 받고, 마이페이지에서 수신 여부를 바꿀 수 있어요.",
        "날짜 변경과 알림 이동을 다듬고, 일부 기기의 위젯 글자와 정렬 문제를 고쳤어요.",
      ],
      en: [
        "Choose from the same three widget styles on Android and iPhone.",
        "Get personalized suggestions and encouragement. Change your choice in My Page.",
        "We improved date changes and notification navigation, and fixed clipped widget text and alignment.",
      ],
    },
  },
  {
    version: "1.5.1",
    date: "2026-07-13",
    summary: {
      ko: "홈 화면 위젯으로 오늘 할 일을 바로 확인할 수 있어요.",
      en: "You can see today's to-dos right on your home screen.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "홈 화면에 위젯을 추가하면, 앱을 열지 않아도 오늘 할 일을 한눈에 확인할 수 있어요.",
            en: "You can add a home screen widget to see today's to-dos without opening the app.",
          },
          {
            ko: "작은 위젯에서는 남은 할 일 개수와 연속 달성 일수를, 큰 위젯에서는 할 일 목록까지 확인할 수 있어요.",
            en: "You can use a small widget for your remaining to-do count and streak, or a larger one for the to-do list too.",
          },
          {
            ko: "할 일을 완료하면 위젯에서도 바로 확인할 수 있어요.",
            en: "Complete a to-do in the app, and your widget updates right away.",
          },
          {
            ko: "위젯은 iPhone과 Android에서 사용할 수 있고, 기기의 라이트 모드와 다크 모드를 따라가요.",
            en: "Widgets are available on iPhone and Android and follow your device’s light or dark mode.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나면 위젯도 새로운 하루로 바뀌도록 다듬었어요.",
            en: "The widget now switches to the new day automatically at midnight.",
          },
          {
            ko: "위젯이 배터리와 데이터를 적게 쓰도록 다듬었어요.",
            en: "The widget is designed to use little battery or data.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone과 Android 홈 화면에서 할 일 개수, 연속 달성과 목록을 확인할 수 있어요.",
        "할 일을 마치면 위젯에도 반영되고, 자정이 지나면 새날로 바뀌어요.",
        "기기의 라이트·다크 모드를 따르고, 배터리와 데이터를 적게 쓰도록 다듬었어요.",
      ],
      en: [
        "See your to-do count, streak, and list in home screen widgets on iPhone and Android.",
        "Widgets reflect completed to-dos and switch to the new day at midnight.",
        "They follow light or dark mode and use little battery or data.",
      ],
    },
  },
  {
    version: "1.5.0",
    date: "2026-07-12",
    summary: {
      ko: "이름이나 아이디로 원하는 친구를 찾을 수 있어요.",
      en: "You can find the right friend by name or ID.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "이름이나 아이디로 친구를 검색하고, 원하는 사람을 찾아 친구로 추가할 수 있어요.",
            en: "You can search for friends by name or ID and add the person you're looking for.",
          },
          {
            ko: "같은 이름을 쓰는 사람이 여러 명이어도 아이디로 구분해 원하는 친구를 찾을 수 있어요.",
            en: "You can tell people with the same name apart by their ID to find the right friend.",
          },
          {
            ko: "친구 요청을 보낸 뒤 마음이 바뀌면 요청을 취소할 수 있어요.",
            en: "You can cancel a friend request if you change your mind after sending it.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "Google이나 Apple 계정을 처음 연결할 때 더 안정적으로 처리되도록 다듬었어요.",
            en: "Connecting a Google or Apple account for the first time now works more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "이름이나 아이디로 친구를 검색하고 추가할 수 있어요.",
        "보낸 친구 요청을 취소할 수 있어요.",
        "Google과 Apple 계정을 처음 연결하는 과정을 다듬었어요.",
      ],
      en: [
        "Search for friends by name or ID and add them.",
        "Cancel a friend request after sending it.",
        "We improved connecting a Google or Apple account for the first time.",
      ],
    },
  },
  {
    version: "1.4.4",
    date: "2026-07-10",
    summary: {
      ko: "앱을 열었을 때 첫 화면이 더 자연스럽게 채워져요.",
      en: "Your first screen now loads more smoothly when you open the app.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "연결이 잠깐 불안정할 때 앱을 열어도, 로그인을 유지한 채 내용을 자동으로 다시 불러오도록 다듬었어요.",
            en: "The app now reloads content automatically while keeping you signed in if your connection is briefly unstable when you open it.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 열자마자 할 일, AI 제안, 날씨에 ‘다시 시도’ 안내가 뜨던 문제를 고쳤어요. 이제 잠시 기다리면 내용을 자동으로 불러와요.",
            en: "We fixed “Try again” messages appearing for to-dos, AI suggestions, and weather just after opening the app. Content now loads automatically after a brief wait.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 열자마자 할 일, AI 제안과 날씨에 ‘다시 시도’ 안내가 뜨던 문제를 고쳤어요.",
        "연결이 잠시 불안정해도 로그인을 유지하고 내용을 다시 불러오도록 다듬었어요.",
      ],
      en: [
        "We fixed “Try again” messages appearing for to-dos, AI suggestions, and weather just after opening the app.",
        "When the connection is briefly unstable, the app reloads content while keeping you signed in.",
      ],
    },
  },
  {
    version: "1.4.3",
    date: "2026-07-09",
    summary: {
      ko: "가끔 로그인이 풀리던 문제를 고쳤어요.",
      en: "We fixed an issue that could occasionally sign you out.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 사용자에게 가끔 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could occasionally sign some users out.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["일부 사용자에게 가끔 로그인이 풀리던 문제를 고쳤어요."],
      en: ["We fixed an issue that could occasionally sign some users out."],
    },
  },
  {
    version: "1.4.2",
    date: "2026-07-09",
    summary: {
      ko: "여러 상황에서 로그인이 풀리던 문제를 고쳤어요.",
      en: "We fixed unexpected sign-outs across several everyday situations.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적이고 편하게 사용할 수 있도록 다듬었어요.",
            en: "The app now feels more reliable and easier to use.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 업데이트한 뒤 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could sign you out after an app update.",
          },
          {
            ko: "앱을 쓰다가 갑자기 ‘다시 시도’ 안내가 뜨던 문제를 고쳤어요.",
            en: "We fixed “Try again” messages appearing unexpectedly while using the app.",
          },
          {
            ko: "휴대폰이 잠겨 있을 때 알림으로 앱을 열면 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could sign you out when opening a notification while your phone was locked.",
          },
          {
            ko: "인터넷이 연결되지 않은 상태에서 앱을 열면 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could sign you out when opening the app without an internet connection.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱 업데이트 후, 잠금 화면의 알림을 열 때, 인터넷 없이 앱을 열 때 로그인이 풀리던 문제를 고쳤어요.",
        "사용 중 갑자기 ‘다시 시도’ 안내가 뜨던 문제를 고쳤어요.",
      ],
      en: [
        "We fixed unexpected sign-outs after an update, when opening a notification from a locked phone, or when opening the app offline.",
        "We fixed “Try again” messages appearing unexpectedly while using the app.",
      ],
    },
  },
  {
    version: "1.4.1",
    date: "2026-07-08",
    summary: {
      ko: "업데이트 후 로그인이 풀리던 문제를 고쳤어요.",
      en: "We fixed an issue that could sign you out after an update.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "인터넷 연결이 잠깐 끊기거나 느려져도 로그인을 유지할 수 있도록 다듬었어요.",
            en: "The app now keeps you signed in more reliably when your internet connection briefly drops or slows down.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 업데이트한 뒤 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃된 상태라면 한 번만 다시 로그인해 주세요.",
            en: "We fixed an issue that could sign you out after an app update. If you've already been signed out, please sign in once more.",
          },
          {
            ko: "일부 iPhone 화면에서 영어 문구가 어색하게 보이던 문제를 고쳤어요.",
            en: "We fixed awkward English wording on some iPhone screens.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "업데이트 후 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
        "일부 iPhone의 영어 문구를 고쳤어요.",
        "연결이 잠시 끊기거나 느려져도 로그인을 유지하도록 다듬었어요.",
      ],
      en: [
        "We fixed sign-outs after an update. If you’ve already been signed out, please sign in once more.",
        "We fixed awkward English wording on some iPhones.",
        "We improved staying signed in when your connection briefly drops or slows down.",
      ],
    },
  },
  {
    version: "1.4.0",
    date: "2026-07-07",
    summary: {
      ko: "화면과 알림, AI 리포트까지 영어로 이용할 수 있어요.",
      en: "You can now use Aido in English, from screens to notifications and AI reports.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "영어로 아이두를 이용할 수 있어요. 설정 > 언어에서 ‘시스템 설정’, ‘한국어’, ‘English’ 중 선택해 주세요.",
            en: "You can now use Aido in English. Choose “System default”, “한국어”, or “English” in Settings > Language.",
          },
          {
            ko: "처음 설치하면 기기 언어를 따라가요. 한국어 기기에서는 한국어로, 그 외에는 영어로 시작해요.",
            en: "Aido follows your device language on first install, starting in Korean on Korean-language devices and English on others.",
          },
          {
            ko: "할 일, 친구 소식, 날씨 알림도 선택한 언어로 받아볼 수 있어요.",
            en: "To-do reminders, friend updates, and weather notifications arrive in your chosen language too.",
          },
          {
            ko: "AI 주간·월간 리포트와 반복 할 일 제안도 선택한 언어로 받아볼 수 있어요.",
            en: "You can receive weekly and monthly AI reports and recurring to-do suggestions in your chosen language.",
          },
          {
            ko: "날짜, 시간, 요일도 선택한 언어에 맞는 표기로 확인할 수 있어요.",
            en: "You can see dates, times, and weekdays formatted for your chosen language.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "언어를 바꾸면 앱을 다시 시작하지 않아도 모든 화면에 바로 적용되도록 다듬었어요.",
            en: "Language changes now apply across the app right away without a restart.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "설정 > 언어에서 시스템 설정, 한국어, English 중 선택할 수 있어요.",
        "화면, 날짜·시간, 알림과 AI 주간·월간 리포트가 선택한 언어로 표시돼요.",
        "언어를 바꾸면 앱을 다시 시작하지 않아도 적용돼요.",
      ],
      en: [
        "Choose System default, 한국어, or English in Settings > Language.",
        "Screens, dates, times, notifications, and weekly and monthly AI reports use your chosen language.",
        "Language changes apply without restarting the app.",
      ],
    },
  },
  {
    version: "1.3.5",
    date: "2026-07-06",
    summary: {
      ko: "앱을 다시 설치한 뒤 로그인이 풀리던 문제를 고쳤어요.",
      en: "We fixed unexpected sign-outs after reinstalling the app.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 지웠다가 다시 설치하면 로그인 직후 바로 로그아웃되던 문제를 고쳤어요.",
            en: "We fixed an issue that could sign you out immediately after signing in to a freshly reinstalled app.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 지웠다가 다시 설치했을 때 로그인 직후 로그아웃되던 문제를 고쳤어요.",
      ],
      en: [
        "We fixed an issue that could sign you out immediately after signing in to a freshly reinstalled app.",
      ],
    },
  },
  {
    version: "1.3.4",
    date: "2026-07-06",
    summary: {
      ko: "앱의 안정성과 로그인 유지를 다듬었어요.",
      en: "The app and sign-in now work more reliably.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱의 안정성을 높이고, 오류가 생기면 더 빨리 찾아 고칠 수 있도록 다듬었어요.",
            en: "We improved app stability and how quickly we can find and fix issues.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 상황에서 예상치 못하게 로그인이 풀리던 문제를 추가로 고쳤어요.",
            en: "We fixed more situations that could unexpectedly sign you out.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 더 안정적으로 다듬고, 문제의 원인을 확인하기 쉽게 정리했어요.",
        "예상치 못하게 로그인이 풀리던 경우를 추가로 고쳤어요.",
      ],
      en: [
        "We improved app reliability and made issues easier to investigate.",
        "We fixed more situations that could unexpectedly sign you out.",
      ],
    },
  },
  {
    version: "1.3.3",
    date: "2026-07-06",
    summary: {
      ko: "알림 문구를 다듬고, 날씨 알림과 로그인 문제를 고쳤어요.",
      en: "Notifications read more naturally, with fixes for weather alerts and sign-in.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "휴대폰으로 받는 알림 문구를 더 친근하고 자연스럽게 다듬었어요.",
            en: "Notification messages now read more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "비나 눈 예보가 있는 날에도 맑은 날씨 알림이 오던 문제를 고쳤어요.",
            en: "We fixed sunny-weather notifications being sent on days with rain or snow in the forecast.",
          },
          {
            ko: "인터넷 연결이 불안정할 때 가끔 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could occasionally sign you out on an unstable internet connection.",
          },
          {
            ko: "알림에서 친구 이름 뒤의 말이 어색하게 이어지던 문제를 고쳤어요.",
            en: "We fixed awkward wording after friends’ names in Korean notifications.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "알림 문구를 더 자연스럽게 다듬고, 친구 이름 뒤의 어색한 표현을 고쳤어요.",
        "비나 눈 예보에도 맑은 날씨 알림이 오던 문제를 고쳤어요.",
        "인터넷 연결이 불안정할 때 로그인이 풀리던 문제를 고쳤어요.",
      ],
      en: [
        "We refreshed notification messages and fixed awkward Korean wording after friends’ names.",
        "We fixed sunny-weather alerts arriving when rain or snow was forecast.",
        "We fixed occasional sign-outs on an unstable connection.",
      ],
    },
  },
  {
    version: "1.3.2",
    date: "2026-05-17",
    summary: {
      ko: "아이두를 더 안정적이고 편하게 쓸 수 있도록 다듬었어요.",
      en: "Aido now feels more reliable and easier to use.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적이고 편하게 사용할 수 있도록 다듬었어요.",
            en: "The app now feels more reliable and easier to use.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["앱을 더 안정적이고 편하게 사용할 수 있도록 다듬었어요."],
      en: ["We improved the app’s reliability and ease of use."],
    },
  },
  {
    version: "1.3.1",
    date: "2026-04-19",
    summary: {
      ko: "캘린더와 반복 설정을 다듬고, 무료 AI 이용 횟수를 월 단위로 바꿨어요.",
      en: "Calendar and repeat settings are easier to use, and free AI usage now resets monthly.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "캘린더를 좌우로 쓸어 주와 월을 넘길 수 있어요. 화면 전환도 더 부드럽게 이어져요.",
            en: "You can swipe the calendar left or right to move between weeks and months, with smoother transitions.",
          },
          {
            ko: "반복 설정에서 ‘매일’, ‘주중’, ‘주말’, ‘월~일’ 중 원하는 주기를 한 번에 선택할 수 있어요.",
            en: "Choose “Daily”, “Weekdays”, “Weekends”, or “Mon–Sun” in one tap when setting repeats.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "무료로 AI를 이용해 할 일을 정리할 수 있는 횟수를 월 5회로 바꿨어요. 한국 시간으로 매월 1일 자정에 다시 채워져요.",
            en: "The free plan now includes five uses of AI to organize to-dos per month. Your allowance resets at midnight Korean time on the first of each month.",
          },
          {
            ko: "AI가 할 일의 카테고리와 내용을 더 정확하게 구분하도록 다듬었어요.",
            en: "AI now distinguishes a to-do's category and content more accurately.",
          },
          {
            ko: "AI 리포트를 더 안정적인 품질로 받아볼 수 있도록 다듬었어요.",
            en: "AI reports now have more consistent, reliable results.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "캘린더를 넘길 때 날씨 배지가 깜빡이던 문제를 고쳤어요.",
            en: "We fixed a flickering weather badge when moving through the calendar.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "캘린더를 좌우로 넘기고, 반복 설정에서 매일·주중·주말·요일을 쉽게 고를 수 있어요.",
        "무료 AI 이용 횟수는 월 5회이며, 한국 시간으로 매월 1일 자정에 다시 채워져요.",
        "AI의 내용·카테고리 구분과 리포트를 다듬고, 캘린더의 날씨 표시가 깜빡이던 문제를 고쳤어요.",
      ],
      en: [
        "Swipe between calendar weeks and months and choose repeat days more easily.",
        "The free plan includes five AI uses per month, resetting at midnight Korean time on the first.",
        "We improved AI categories and reports, and fixed flickering calendar weather badges.",
      ],
    },
  },
  {
    version: "1.3.0",
    date: "2026-04-15",
    summary: {
      ko: "생각은 메모로 담고, AI로 할 일까지 정리할 수 있어요.",
      en: "You can capture thoughts in notes and turn them into to-dos with AI.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "메모가 생겼어요. 떠오르는 생각을 자유롭게 적어둘 수 있어요.",
            en: "You can now jot down your thoughts anytime with notes.",
          },
          {
            ko: "메모 상단의 로봇 아이콘을 누르면 AI가 내용을 할 일과 체크리스트 항목으로 정리해 줘요.",
            en: "Tap the robot icon at the top of a note to organize its contents into to-dos and checklist items with AI.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 필요한 할 일을 더 명확하게 제안하도록 다듬었어요.",
            en: "AI suggestions now explain the to-dos that fit your needs more clearly.",
          },
          {
            ko: "다크 모드 화면이 더 자연스럽게 보이도록 다듬었어요.",
            en: "Dark mode screens now have a more natural look.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "가끔 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃된 상태라면 한 번만 다시 로그인해 주세요.",
            en: "We fixed an issue that could occasionally sign you out. If you've already been signed out, please sign in once more.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "메모에 생각을 적고, 로봇 아이콘을 눌러 AI로 할 일과 체크리스트 항목을 만들 수 있어요.",
        "AI 제안과 다크 모드 화면을 다듬었어요.",
        "가끔 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
      ],
      en: [
        "Write a note, then tap the robot icon to organize it into to-dos and checklist items with AI.",
        "We improved AI suggestions and dark mode.",
        "We fixed occasional sign-outs. If you’ve already been signed out, please sign in once more.",
      ],
    },
  },
  {
    version: "1.2.4",
    date: "2026-04-07",
    summary: {
      ko: "체크리스트 항목을 한눈에 보고, 알림 글꼴도 편하게 읽을 수 있어요.",
      en: "Checklist items are easier to see, and notification text follows your font size.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "체크리스트 항목이 있는 할 일을 기본으로 펼쳐, 내용을 한눈에 볼 수 있도록 다듬었어요.",
            en: "To-dos with checklist items now open expanded by default, so you can see the details at a glance.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "알림 메시지에 글꼴 크기 설정이 반영되지 않던 문제를 고쳤어요.",
            en: "We fixed font size settings not being applied to notification messages.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "체크리스트 항목이 있는 할 일은 기본으로 펼쳐 보여드려요.",
        "알림 메시지에 글꼴 크기 설정이 반영되지 않던 문제를 고쳤어요.",
      ],
      en: [
        "To-dos with checklist items open expanded by default.",
        "We fixed notification text not following your font size setting.",
      ],
    },
  },
  {
    version: "1.2.3",
    date: "2026-04-06",
    summary: {
      ko: "알림을 눌렀을 때와 날씨를 볼 때 생기던 문제를 고쳤어요.",
      en: "We fixed issues when opening notifications and checking the weather.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "휴대폰 알림을 눌렀을 때 화면이 겹쳐 보이던 문제를 고쳤어요.",
            en: "We fixed overlapping screens when opening a notification.",
          },
          {
            ko: "날씨 알림이 할 일 카테고리로 잘못 표시되던 문제를 고쳤어요.",
            en: "We fixed weather notifications being incorrectly labeled as to-do notifications.",
          },
          {
            ko: "날씨 화면에서 비나 눈을 나타내는 아이콘과 설명이 서로 다르던 문제를 고쳤어요.",
            en: "We fixed mismatched rain and snow icons and descriptions on the weather screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "알림을 눌렀을 때 화면이 겹치던 문제를 고쳤어요.",
        "날씨 알림의 잘못된 분류와 비·눈 아이콘 및 설명이 맞지 않던 문제를 고쳤어요.",
      ],
      en: [
        "We fixed overlapping screens when opening notifications.",
        "We fixed weather notifications labeled as to-dos and mismatched rain and snow icons and descriptions.",
      ],
    },
  },
  {
    version: "1.2.2",
    date: "2026-04-04",
    summary: {
      ko: "현재 기온을 바로 보고, 알림 설정도 더 쉽게 찾을 수 있어요.",
      en: "You can see the current temperature and find notification settings more easily.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면에서 평균 기온 대신 현재 기온을 확인할 수 있도록 다듬었어요.",
            en: "The weather screen now shows the current temperature instead of the average.",
          },
          {
            ko: "알림 설정 화면을 더 깔끔하게 정리했어요.",
            en: "Notification settings now have a cleaner, easier-to-follow layout.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨 화면에서 평균 기온 대신 현재 기온을 볼 수 있어요.",
        "알림 설정 화면을 더 깔끔하게 정리했어요.",
      ],
      en: [
        "The weather screen shows the current temperature instead of the average.",
        "We tidied up notification settings.",
      ],
    },
  },
  {
    version: "1.2.1",
    date: "2026-04-03",
    summary: {
      ko: "날씨 상세 화면을 더 보기 좋게 다듬었어요.",
      en: "The weather detail screen is now easier to read.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 상세 화면을 더 보기 좋게 다듬었어요.",
            en: "The weather detail screen now has a clearer, easier-to-read design.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["날씨 상세 화면을 더 보기 좋게 다듬었어요."],
      en: ["We made the weather detail screen easier to read."],
    },
  },
  {
    version: "1.2.0",
    date: "2026-04-02",
    summary: {
      ko: "날씨 알림이 생기고, AI 제안과 리포트도 더 세심해졌어요.",
      en: "Weather notifications are here, with more thoughtful AI suggestions and reports.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "아침과 오후에 날씨에 맞는 할 일 팁을 알림으로 받아볼 수 있어요.",
            en: "You can receive weather-based to-do tips in morning and afternoon notifications.",
          },
          {
            ko: "날씨 상세 화면에서 시간대별 날씨, 체감온도, 자외선, 미세먼지와 5일 예보를 확인할 수 있어요.",
            en: "You can check hourly weather, feels-like temperature, the UV index, fine dust levels, and a five-day forecast on the weather detail screen.",
          },
          {
            ko: "날씨 알림 시간을 오전과 오후 각각 원하는 시간으로 설정할 수 있어요.",
            en: "You can set your preferred times for morning and afternoon weather notifications separately.",
          },
          {
            ko: "AI 제안이 8가지 유형으로 늘었어요. 습관 회복과 균형 잡힌 계획 등 더 다양한 맞춤 제안을 받아볼 수 있어요.",
            en: "You can receive eight types of AI suggestions, including habit recovery and balance tips, for more personalized planning.",
          },
          {
            ko: "반복 할 일의 시작일을 바꾸거나, 반복 할 일을 삭제할 수 있어요.",
            en: "You can change a recurring to-do's start date or delete it.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 리포트의 습관 패턴 분석과 맞춤 코칭을 더 세심하게 다듬었어요.",
            en: "AI reports now offer more detailed habit pattern analysis and personalized coaching.",
          },
          {
            ko: "AI가 이전에 수락하거나 거절한 제안을 참고해, 나에게 더 잘 맞는 제안을 하도록 다듬었어요.",
            en: "AI now learns from suggestions you've accepted or declined to offer recommendations that better fit you over time.",
          },
          {
            ko: "알림이 한꺼번에 몰려오지 않도록 보내는 시간을 나눴어요.",
            en: "We spread out notification times so they don’t all arrive at once.",
          },
          {
            ko: "휴대폰 알림을 꺼도 앱 안의 알림 목록에서는 내용을 확인할 수 있어요.",
            en: "You can still read updates in the app’s notification list when phone notifications are turned off.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 화면에서 글꼴 크기 설정이 적용되지 않던 문제를 고쳤어요.",
            en: "We fixed font size settings not being applied on some screens.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨 팁 알림을 오전·오후 원하는 시간에 받고, 상세 화면에서 시간별 날씨와 5일 예보를 볼 수 있어요.",
        "AI 제안이 8가지로 늘고, 이전에 답한 제안을 참고하도록 다듬었어요.",
        "반복 할 일의 시작일 변경과 삭제를 지원하고, 알림 시간과 글꼴 크기 적용을 다듬었어요.",
      ],
      en: [
        "Get morning and afternoon weather tips at your chosen times, with hourly weather and a five-day forecast.",
        "Explore eight types of AI suggestions that consider your past responses.",
        "Change the start date of recurring to-dos or delete them. We improved notification timing and font size support.",
      ],
    },
  },
  {
    version: "1.1.1",
    date: "2026-03-28",
    summary: {
      ko: "글꼴 크기를 내게 맞추고, 화면도 더 편하게 볼 수 있어요.",
      en: "You can choose a font size that suits you, with fixes for a smoother view.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "앱 안의 글꼴 크기를 아주 작게부터 아주 크게까지 5단계로 조절할 수 있어요.",
            en: "You can choose from five font sizes in the app, from Extra Small to Extra Large.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 기기에서 시간 선택 화면이 잘리던 문제를 고쳤어요.",
            en: "We fixed the time picker being cut off on some devices.",
          },
          {
            ko: "AI 제안 화면이 가끔 깜빡이던 문제를 고쳤어요.",
            en: "We fixed occasional flickering on the AI suggestions screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱 글꼴 크기를 5단계로 고를 수 있어요.",
        "시간 선택 화면이 잘리거나 AI 제안 화면이 깜빡이던 문제를 고쳤어요.",
      ],
      en: [
        "Choose from five font sizes in the app.",
        "We fixed a clipped time picker and flickering AI suggestions.",
      ],
    },
  },
  {
    version: "1.1.0",
    date: "2026-03-27",
    summary: {
      ko: "할 일을 체크리스트로 나누고, 카테고리도 더 쉽게 정리할 수 있어요.",
      en: "You can break to-dos into checklist items and organize categories more easily.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일에 체크리스트 항목을 추가할 수 있어요.",
            en: "You can add checklist items to your to-dos.",
          },
          {
            ko: "할 일을 추가할 때 카테고리를 더 쉽게 선택할 수 있어요.",
            en: "You can choose a category more easily when adding a to-do.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "카테고리 관리 화면을 더 쉽게 사용할 수 있도록 다듬었어요.",
            en: "Category management now has a more intuitive layout.",
          },
          {
            ko: "반복 설정 화면을 더 깔끔하게 정리했어요.",
            en: "Repeat settings now have a cleaner layout.",
          },
          {
            ko: "카테고리 색상을 바꾸면 캘린더에도 바로 반영되도록 다듬었어요.",
            en: "Category color changes now appear in the calendar right away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 잠깐 나갔다 돌아오면 입력 화면이 깨지던 문제를 고쳤어요.",
            en: "We fixed a broken input screen when returning to the app after a short time away.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일을 체크리스트 항목으로 나누고, 카테고리를 쉽게 선택할 수 있어요.",
        "카테고리 관리와 반복 설정 화면을 다듬었어요.",
        "색상 변경이 캘린더에 바로 반영되고, 앱에 돌아오면 입력 화면이 깨지던 문제를 고쳤어요.",
      ],
      en: [
        "Break to-dos into checklist items and choose categories more easily.",
        "We improved category management and repeat settings.",
        "Category colors update in the calendar right away. We fixed broken input screens when returning to the app.",
      ],
    },
  },
  {
    version: "1.0.5",
    date: "2026-03-21",
    summary: {
      ko: "할 일 정리가 더 빨라지고, 날짜와 친구 목록도 편하게 바꿀 수 있어요.",
      en: "To-dos respond faster, and you can adjust dates and your friend list more easily.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "오늘 할 일은 내일로 미루고, 다른 날의 할 일은 오늘로 당겨올 수 있어요.",
            en: "You can move today's to-dos to tomorrow or bring to-dos from other days forward to today.",
          },
          {
            ko: "친구 목록을 편집할 수 있는 모드가 생겼어요.",
            en: "You can now edit your friend list in a dedicated mode.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "할 일을 추가하거나 수정·삭제할 때 더 빠르게 반영되도록 다듬었어요.",
            en: "Adding, editing, and deleting to-dos now responds faster.",
          },
          {
            ko: "카테고리를 추가하거나 수정·삭제할 때 더 빠르게 반영되도록 다듬었어요.",
            en: "Adding, editing, and deleting categories now responds faster.",
          },
          {
            ko: "AI 제안 문구를 더 다양하게 다듬었어요.",
            en: "AI suggestions now use a wider variety of messages.",
          },
          {
            ko: "카테고리 관리 화면을 더 편하게 사용할 수 있도록 다듬었어요.",
            en: "Category management is now easier to use.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할 일 제목을 바꿔도 알림에 이전 제목이 표시되던 문제를 고쳤어요.",
            en: "We fixed reminders showing the old title after you renamed a to-do.",
          },
          {
            ko: "할 일 추가 화면에서 키보드와 날짜 선택을 오갈 때 화면이 끊기던 문제를 고쳤어요.",
            en: "We fixed stuttering when switching between the keyboard and date picker while adding a to-do.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "오늘 할 일은 내일로, 다른 날의 할 일은 오늘로 옮길 수 있어요.",
        "친구 목록 편집과 할 일·카테고리 변경을 더 편하게 다듬었어요.",
        "AI 제안 문구를 다양하게 다듬고, 알림의 이전 제목과 입력 화면 끊김을 고쳤어요.",
      ],
      en: [
        "Move today’s to-dos to tomorrow or bring other to-dos forward to today.",
        "We improved editing friends, to-dos, and categories.",
        "AI messages have more variety. We fixed old titles in reminders and stuttering when adding a to-do.",
      ],
    },
  },
  {
    version: "1.0.4",
    date: "2026-03-20",
    summary: {
      ko: "AI 리포트와 카테고리를 다듬고, 캘린더에서 완료 기록을 볼 수 있어요.",
      en: "AI reports and categories are easier to use, and you can see completion history in the calendar.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "하루의 완료 현황에서 카테고리를 색상으로 구분해 볼 수 있어요.",
            en: "You can see category colors in your daily completion overview.",
          },
          {
            ko: "캘린더에서 날짜별 할 일 완료 상태를 확인할 수 있어요.",
            en: "You can check each day's to-do completion status in the calendar.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "휴대폰으로 받는 알림 문구를 더 다양하게 다듬었어요.",
            en: "Notification messages now have more variety.",
          },
          {
            ko: "AI 리포트를 주간과 월간 분석으로 나누고, 맞춤 코칭의 품질을 다듬었어요.",
            en: "AI reports now separate weekly and monthly analysis, with improved personalized coaching.",
          },
          {
            ko: "AI가 더 다양한 패턴을 살펴보고 할 일을 제안하도록 다듬었어요.",
            en: "AI suggestions now recognize a wider range of patterns.",
          },
          {
            ko: "카테고리 관리를 마이페이지로 옮기고, 화면 구성을 더 보기 좋게 다듬었어요.",
            en: "Category management has moved to My Page with a clearer layout.",
          },
          {
            ko: "Android 하단 탭의 경계선을 없애 화면이 자연스럽게 이어지도록 다듬었어요.",
            en: "We removed the border on Android's bottom tabs for a more seamless screen.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iPhone에서 하단 탭과 관련해 앱이 갑자기 종료되던 문제를 고쳤어요.",
            en: "We fixed an issue with the bottom tabs that could unexpectedly close the app on iPhone.",
          },
          {
            ko: "AI 리포트가 잘못된 시간에 생성되던 문제를 고쳤어요.",
            en: "We fixed an issue with when AI reports were generated.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "완료한 할 일의 카테고리 색상과 날짜별 완료 기록을 볼 수 있어요.",
        "AI 주간·월간 리포트와 제안, 알림 문구를 다듬었어요.",
        "카테고리 관리를 마이페이지로 옮기고, 하단 탭과 리포트 생성 시간 문제를 고쳤어요.",
      ],
      en: [
        "See category colors for completed to-dos and completion history by date.",
        "We improved weekly and monthly AI reports, suggestions, and notifications.",
        "Category management moved to My Page. We fixed tab issues and report timing.",
      ],
    },
  },
  {
    version: "1.0.3",
    date: "2026-03-16",
    summary: {
      ko: "친구 목록의 순서와 할 일의 카테고리를 편하게 바꿀 수 있어요.",
      en: "You can reorder your friend list and change to-do categories more easily.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구 목록에서 친구를 끌어 옮겨 원하는 순서로 정리할 수 있어요.",
            en: "You can drag friends into your preferred order in the friend list.",
          },
          {
            ko: "할 일 메뉴에서 카테고리를 바로 바꿀 수 있어요.",
            en: "You can change a to-do's category directly from its action menu.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "문의하기 화면에서 키보드를 더 편하게 사용할 수 있도록 다듬었어요.",
            en: "We improved keyboard behavior on the contact screen for easier typing.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구를 끌어 옮겨 목록의 순서를 바꿀 수 있어요.",
        "할 일 메뉴에서 카테고리를 바꿀 수 있어요.",
        "문의하기 화면의 키보드 사용을 다듬었어요.",
      ],
      en: [
        "Drag friends to reorder your list.",
        "Change a to-do’s category from its menu.",
        "We improved keyboard behavior on the contact screen.",
      ],
    },
  },
  {
    version: "1.0.2",
    date: "2026-03-15",
    summary: {
      ko: "친구에게 콕 찌르기를 보내고, 문의도 남길 수 있어요.",
      en: "You can send friends a reminder nudge and get in touch with us.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구에게 콕 찌르기를 보내 할 일을 떠올릴 수 있도록 도와줄 수 있어요.",
            en: "Send a friend a nudge to help them remember a to-do.",
          },
          {
            ko: "문의하기에서 궁금한 점을 남길 수 있어요.",
            en: "You can get in touch with us through the new contact feature.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "선택한 캘린더 보기 모드가 유지되도록 다듬었어요.",
            en: "Your selected calendar view now stays saved.",
          },
          {
            ko: "친구 요청을 보내고 받는 과정을 더 편하게 다듬었어요.",
            en: "Sending and receiving friend requests is easier to follow.",
          },
          {
            ko: "마이페이지와 프로필 설정 화면을 더 보기 좋게 다듬었어요.",
            en: "My Page and profile settings now have a clearer design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "다크 모드에서 Apple 아이콘이 보이지 않던 문제를 고쳤어요.",
            en: "We fixed the Apple icon not appearing in dark mode.",
          },
          {
            ko: "카카오 프로필 이미지가 보이지 않던 문제를 고쳤어요.",
            en: "We fixed Kakao profile images not appearing.",
          },
          {
            ko: "Android에서 마이페이지 하단 내용이 탭에 가려지던 문제를 고쳤어요.",
            en: "We fixed the bottom tabs covering content at the bottom of My Page on Android.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구에게 콕 찌르기를 보내고, 문의하기에서 질문을 남길 수 있어요.",
        "캘린더 보기 유지, 친구 요청과 프로필 화면을 다듬었어요.",
        "Apple 아이콘·카카오 프로필 이미지 표시와 Android 마이페이지가 가려지던 문제를 고쳤어요.",
      ],
      en: [
        "Send friends a nudge and ask questions through the contact feature.",
        "We improved saved calendar views, friend requests, and profile screens.",
        "We fixed missing Apple icons and Kakao photos, and covered content on Android’s My Page.",
      ],
    },
  },
  {
    version: "1.0.1",
    date: "2026-03-13",
    summary: {
      ko: "주간 배지로 작은 성취를 나누고, 알림과 화면도 더 편하게 쓸 수 있어요.",
      en: "You can share small wins with weekly badges, with improved notifications and screens.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "주간 목표 달성 배지를 확인할 수 있는 화면이 생겼어요.",
            en: "You can see your weekly goal achievement badges on a new screen.",
          },
          {
            ko: "주간 배지를 공유해 작은 성취를 나눌 수 있어요.",
            en: "You can share your weekly badges to celebrate small wins.",
          },
          {
            ko: "점심시간에 리마인더 알림을 받아볼 수 있어요.",
            en: "You can receive a reminder notification at lunchtime.",
          },
          {
            ko: "연속 달성이 끊기기 전에 알림을 받아볼 수 있어요.",
            en: "You can receive an alert before your streak ends.",
          },
          {
            ko: "시간을 24시간제로 표시하도록 설정할 수 있어요.",
            en: "You can choose a 24-hour time format in Settings.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 할 일을 더 정확하게 이해하도록 다듬었어요.",
            en: "AI now recognizes to-dos more accurately.",
          },
          {
            ko: "AI가 매일 할 일을 살펴보고, 제안에 카테고리도 함께 안내하도록 다듬었어요.",
            en: "AI now reviews your to-dos daily and includes category suggestions in its recommendations.",
          },
          {
            ko: "프리미엄 리포트가 아직 없을 때 보이는 화면을 더 보기 좋게 다듬었어요.",
            en: "Premium reports now have a clearer screen when no report is available yet.",
          },
          {
            ko: "주간 달성 리포트를 더 안정적으로 받아볼 수 있도록 다듬었어요.",
            en: "Weekly achievement reports now work more reliably.",
          },
          {
            ko: "친구 요청을 수락하면 바로 반영되도록 다듬었어요.",
            en: "Accepted friend requests now appear right away.",
          },
          {
            ko: "소셜 로그인 버튼을 더 보기 좋게 다듬었어요.",
            en: "Social sign-in buttons now have a clearer design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "기기에서 큰 글씨를 설정했을 때 화면이 깨지던 문제를 고쳤어요.",
            en: "We fixed broken layouts when using a larger system font size.",
          },
          {
            ko: "Android에서 앱 아이콘이 잘리던 문제를 고쳤어요.",
            en: "We fixed the app icon being clipped on Android.",
          },
          {
            ko: "구독 금액이 잘못 표시되던 문제를 고쳤어요.",
            en: "We fixed an incorrect subscription price display.",
          },
          {
            ko: "일부 색상이 올바르게 표시되지 않던 문제를 고쳤어요.",
            en: "We fixed some colors not displaying correctly.",
          },
          {
            ko: "Android에서 Apple 로그인 버튼이 잘못 표시되던 문제를 고쳤어요.",
            en: "We fixed the Apple sign-in button appearing incorrectly on Android.",
          },
          {
            ko: "알림을 받을 때 앱이 갑자기 종료되던 문제를 고쳤어요.",
            en: "We fixed an issue that could unexpectedly close the app when a notification arrived.",
          },
          {
            ko: "알림을 누르면 잘못된 화면으로 이동하던 문제를 고쳤어요.",
            en: "We fixed notifications opening the wrong screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "주간 배지를 확인하고 공유할 수 있어요. 점심·연속 달성 알림과 24시간제 설정도 추가했어요.",
        "AI 제안과 리포트, 친구 요청을 다듬었어요.",
        "큰 글씨, Android 아이콘·로그인 버튼, 구독 금액과 색상 표시, 알림 중 앱 종료·잘못된 화면 이동을 고쳤어요.",
      ],
      en: [
        "View and share weekly badges. Get lunchtime and streak reminders, and choose a 24-hour clock.",
        "We improved AI suggestions, reports, and friend requests.",
        "We fixed large-text layouts, Android icons and sign-in buttons, prices, colors, and notification crashes and navigation.",
      ],
    },
  },
  {
    version: "1.0.0",
    date: "2026-03-10",
    summary: {
      ko: "아이두가 정식 출시됐어요. AI 투두 플래너로 하루를 정리하고, 친구와 작은 성취를 나눠보세요.",
      en: "Aido is officially here. Plan your day with an AI to-do planner and share small wins with friends.",
    },
    categories: [],
    storeNotes: {
      ko: ["AI로 하루의 할 일을 정리하고, 친구와 작은 성취를 나눠보세요."],
      en: ["Plan your day with AI and share small wins with friends."],
    },
  },
];

// Publish after production deployment. Internal-only changes stay in Git history.
// 2026-10-08: platform commits 85c429f3, 6e91317b, 33e694ca, 7c0e4fdb, b86638de.
// Production deployment and public health: Actions run 37718471912 (22e823df).
export const serviceUpdates: ServiceUpdate[] = [
  {
    id: "service-2026-10-08",
    date: "2026-10-08",
    summary: {
      ko: "메모 AI와 리포트, 날씨와 알림을 더 꼼꼼하게 다듬었어요.",
      en: "We improved AI for notes, reports, weather, and notifications.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "메모를 AI로 정리할 때 적어 둔 날짜와 시간, 세부 내용을 더 잘 반영하도록 다듬었어요.",
            en: "AI for notes now handles the dates, times, and details you write more carefully.",
          },
          {
            ko: "이미 수락하거나 거절한 활동이 AI 제안에 다시 나타나는 경우를 줄였어요.",
            en: "AI suggestions are less likely to repeat activities you have already accepted or declined.",
          },
          {
            ko: "남은 할 일과 친구의 활동에 맞춰 알림 문구를 더 자연스럽게 다듬었어요.",
            en: "Notification messages now describe your remaining to-dos and friends’ activity more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "주간·월간 리포트에서 일부 완료 기록이 다른 날짜에 반영되거나 빠지던 문제를 고쳤어요.",
            en: "We fixed some completion records appearing on the wrong date or missing from weekly and monthly reports.",
          },
          {
            ko: "날짜가 바뀔 때 일부 날씨 정보가 이전 날짜를 기준으로 표시될 수 있던 문제를 고쳤어요.",
            en: "We fixed some weather information using the previous date after a new day began.",
          },
          {
            ko: "메모를 할 일로 바꾸거나 AI 제안을 수락하는 과정에서 같은 할 일이 겹쳐 만들어질 수 있던 문제를 고쳤어요.",
            en: "We fixed a case where converting a note or accepting an AI suggestion could create the same to-do twice.",
          },
        ],
      },
    ],
  },
];

export const updateNotes: UpdateNote[] = [
  ...releaseNotes.map((release) => ({
    ...release,
    kind: "app" as const,
    id: `release-${release.version.replaceAll(".", "-")}`,
  })),
  ...serviceUpdates.map((update) => ({ ...update, kind: "service" as const })),
].sort((a, b) => b.date.localeCompare(a.date));

export const patchNotesUpdatedAt = updateNotes.reduce(
  (date, update) => (update.date > date ? update.date : date),
  PATCH_NOTES_EDITED_AT,
);

/** The exact plain text shared by the website clipboard and store submissions. */
export function formatStoreNotes(release: ReleaseNote, locale: Locale): string {
  return `${release.summary[locale]}\n\n${release.storeNotes[locale]
    .map((item) => `- ${item}`)
    .join("\n")}`;
}
