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
export const PATCH_NOTES_EDITED_AT = "2026-10-27";

export const releaseNotes: [ReleaseNote, ...ReleaseNote[]] = [
  {
    version: "1.15.1",
    date: "2026-11-11",
    summary: {
      ko: "카테고리를 지울 때 안의 할 일을 어떻게 할지 고를 수 있어요. 서버를 새로 정비해 알림은 제시간에, 저장은 더 든든하게 다듬었어요.",
      en: "Delete categories your way.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "카테고리를 지울 때 안에 있는 할 일을 다른 카테고리로 옮길지, 함께 지울지 고를 수 있어요. 지우기 전에 할 일과 반복 할 일이 몇 개 있는지 먼저 보여 드리고, 지운 뒤에는 어떻게 처리됐는지 알려 드려요.",
            en: "When you delete a category, choose whether to move its to-dos to another category or delete them too. You'll see how many to-dos and repeating to-dos it has before you decide, and what happened once it's done.",
          },
          {
            ko: "할 일이 없는 카테고리는 확인 한 번으로 지워져요. 마지막 남은 카테고리는 왜 지울 수 없는지 알려 드려요.",
            en: "Empty categories are deleted after a quick confirmation. If it's your last category, we'll explain why it can't be deleted.",
          },
          {
            ko: "마이 탭 > 새로운 기능에서 지난 업데이트를 버전과 날짜별로 다시 볼 수 있어요. 맨 아래 ‘전체 업데이트 내역’을 누르면 모든 기록을 볼 수 있어요.",
            en: "Me > What's new now lists past updates by version and date. Tap All updates at the bottom to see the full history.",
          },
          {
            ko: "새로운 기능의 말로 할 일 만들기 카드를 누르면 오늘 화면에서 바로 말로 할 일을 만들 수 있어요.",
            en: "Tap the Speak to add card in What's new to start right from today's screen.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "같은 시각에 할 일 알림이 많이 몰려도 늦거나 빠지지 않고 제시간에 와요. 한 시간에 할 일이 많아도 시각을 정한 할 일 알림은 모두 받아요.",
            en: "To-do reminders arrive on time even when many are due at once, and every to-do you set a time for gets its reminder, even in a busy hour.",
          },
          {
            ko: "할 일이 이미 시작됐다면 ‘10분 뒤 시작’ 알림을 보내지 않아요.",
            en: "We no longer send the “starts in 10 minutes” reminder once a to-do has already started.",
          },
          {
            ko: "야간 알림을 꺼 두어도 직접 시각을 정한 할 일 알림과 프리미엄 아침·저녁 알림은 제시간에 와요. 혜택·친구 알림의 야간 설정은 그대로예요.",
            en: "Reminders for to-dos you set a time for, and Premium morning and evening reminders, now arrive even with night notifications off. Night settings for offers and friend notifications stay the same.",
          },
          {
            ko: "휴대폰이 꺼져 있다가 다시 켜져도 이미 지난 할 일 알림이 한꺼번에 쏟아지지 않아요.",
            en: "When your phone comes back on, reminders that have already passed don't pile up.",
          },
          {
            ko: "서버를 새로 정비했어요. 할 일을 저장하면 알림 예약도 같은 순간에 함께 저장돼서, 서버에 문제가 생겨도 알림이 사라지지 않아요.",
            en: "We rebuilt much of our server. Saving a to-do now saves its reminder at the same moment, so reminders aren't lost even if something goes wrong on our end.",
          },
          {
            ko: "서버를 업데이트하는 동안 울려야 했던 알림도 놓치지 않고, 업데이트가 끝나는 대로 보내 드려요. 15분 넘게 늦어진 알림은 헷갈리지 않도록 보내지 않아요.",
            en: "Reminders due while we update the server are sent as soon as it's back. Reminders that would arrive more than 15 minutes late are skipped so they don't confuse you.",
          },
          {
            ko: "많은 분께 소식을 한꺼번에 보내는 중에도 내 할 일 알림이 먼저 가요.",
            en: "Your to-do reminders go out first, even while we're sending news to many people at once.",
          },
          {
            ko: "로그아웃했거나 오래 접속하지 않아 로그인이 끝난 기기에는 더 이상 알림이 가지 않아요.",
            en: "Devices that are signed out, or whose sign-in has expired, no longer get notifications.",
          },
          {
            ko: "앱 아이콘의 배지 숫자가 읽지 않은 알림 수와 같아지고, 다른 기기에서 읽은 알림도 반영돼요. 알림을 한 번 누르면 화면도 한 번만 열려요.",
            en: "The app icon badge now matches your unread notifications, including ones read on another device, and tapping a notification opens it only once.",
          },
          {
            ko: "할 일·하위 할 일·카테고리를 바꾸면 화면에 바로 보여요. 저장에 실패하면 실패한 그 변경만 되돌리고, 그사이 바꾼 다른 내용은 그대로 둬요. 카테고리를 만들거나 고친 뒤 시트도 더 빨리 닫혀요.",
            en: "Changes to to-dos, checklist items, and categories show up right away. If one fails to save, only that change is undone and everything else stays. The category sheet also closes faster after you save.",
          },
          {
            ko: "접은 iPhone Duo나 iPhone SE처럼 화면이 낮아도, 키보드가 올라온 카테고리 시트에서 이름·색·확인 버튼이 함께 보여요. 색은 한 줄로 정리했어요.",
            en: "On short screens like a folded iPhone Duo or iPhone SE, the category sheet keeps the name, colors, and confirm button visible above the keyboard, with colors in a single row.",
          },
          {
            ko: "Android 태블릿과 접는 폰의 큰 화면에서는 가로로도 쓸 수 있고, 화면을 접거나 펴도 보던 화면과 입력한 내용이 그대로 남아요. iPad에서 사이드바를 열어도 목록과 상세 칸이 짓눌리지 않아요.",
            en: "Android tablets and foldables can use landscape on the big screen, and folding or unfolding keeps what you were viewing and typing. On iPad, opening the sidebar no longer squeezes the list and detail panes.",
          },
          {
            ko: "영어나 큰 글자에서는 달력 머리가 두 줄로 나뉘어 버튼이 겹치지 않아요.",
            en: "With English or large text, the calendar header splits into two tidy rows so buttons don't overlap.",
          },
          {
            ko: "여러 날에 걸친 할 일을 시작일만이 아니라 기간 안의 모든 날에 세요. 여러 날 할 일이 있다면 연속 기록과 완료율, 주간 성취 숫자가 달라질 수 있어요.",
            en: "To-dos that span several days now count on every day in their range, so your streak, completion rate, and weekly achievements may change if you have them.",
          },
          {
            ko: "카테고리 이름·색·순서를 바꾸면 친구가 보는 화면에도 바로 반영돼요.",
            en: "Category name, color, and order changes now show up right away for friends.",
          },
          {
            ko: "매일 오는 AI 제안이 해외에서도 그곳의 아침에 도착해요.",
            en: "Daily AI suggestions now arrive in your local morning, even abroad.",
          },
          {
            ko: "오류 화면에서 ‘다시 시도’를 눌러도 로그인이 풀리지 않아요.",
            en: "Tapping Try again on the error screen no longer signs you out.",
          },
          {
            ko: "서버가 잠시 응답하지 않을 때 앱이 하염없이 기다리지 않고, 잠시 뒤 다시 시도해 달라고 바로 알려 드려요.",
            en: "If our server is briefly unavailable, the app tells you right away to try again shortly instead of waiting with no end.",
          },
          {
            ko: "계정을 더 안전하게 지키도록 로그인 확인과 서버 사이의 연결 확인을 더 꼼꼼하게 했어요.",
            en: "We now check sign-ins and our server connections more strictly to keep your account safer.",
          },
          {
            ko: "알림·리포트처럼 정해진 시간에 도는 작업이 멈추면 저희가 바로 알 수 있게 했어요. 문제가 생겨도 더 빨리 고칠 수 있어요.",
            en: "We now get alerted right away if scheduled work like reminders and reports stops, so we can fix problems faster.",
          },
          {
            ko: "그 밖에 앱의 안정성과 성능을 다듬었어요.",
            en: "Other stability and performance improvements.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할 일을 완료하자마자 ‘고마움 현황을 불러오지 못했어요’ 카드가 뜨던 문제를 고쳤어요.",
            en: "Fixed “Couldn't load thanks” appearing right after completing a to-do.",
          },
          {
            ko: "하위 할 일을 만들자마자 순서를 바꾸면 저장되지 않던 문제를 고쳤어요.",
            en: "Fixed reordering a checklist item right after adding it.",
          },
          {
            ko: "친구가 친구를 끊은 뒤 그 친구의 피드를 열면 오류 화면이 보이던 문제를 고쳤어요. 이제 ‘이제 친구 피드를 볼 수 없어요’ 안내와 ‘내 피드로 가기’ 버튼을 보여 드려요.",
            en: "Fixed an error screen when opening the feed of a friend who removed you. You'll now see a short note and a Go to my feed button.",
          },
          {
            ko: "최근 매일 AI 제안과 AI 리포트가 오지 않던 문제를 고쳤어요.",
            en: "Fixed daily AI suggestions and AI reports not arriving recently.",
          },
          {
            ko: "알림을 허용했는데도 어느 순간부터 알림이 오지 않던 문제를 고쳤어요.",
            en: "Fixed notifications sometimes stopping even though they were allowed.",
          },
          {
            ko: "프리미엄을 시작하거나 바꾼 직후 잠깐 이전 요금제로 보이던 문제를 고쳤어요.",
            en: "Fixed your previous plan briefly showing right after starting or changing Premium.",
          },
          {
            ko: "메모를 고치는 동시에 순서를 바꾸거나, 콕에 답장하는 순간 읽음 처리가 겹치면 내용이 사라질 수 있던 문제를 고쳤어요.",
            en: "Fixed edits to a note, or a reply to a nudge, that could be lost when another change happened at the same moment.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "카테고리를 지울 때 안의 할 일을 함께 지울지, 다른 카테고리로 옮길지 고를 수 있어요.",
        "마이 > 새로운 기능에서 지난 업데이트를 버전별로 다시 볼 수 있어요.",
        "할 일·하위 할 일·카테고리 변경이 바로 보이고, 저장에 실패하면 그 변경만 되돌려요.",
        "접는 휴대폰과 태블릿에서 화면과 시트가 더 알맞게 보여요.",
        "키보드가 올라와도 입력칸과 확인 버튼이 가려지지 않아요.",
        "할 일 알림이 한꺼번에 몰려도 제시간에 와요.",
        "로그아웃한 기기에는 알림이 오지 않아요.",
        "할 일을 완료한 직후 '고마움 현황을 불러오지 못했어요'가 뜨던 문제를 고쳤어요.",
        "하위 할 일을 만들자마자 순서를 바꾸면 저장되지 않던 문제를 고쳤어요.",
        "큰 글자에서 달력 머리가 어긋나던 문제를 고쳤어요.",
      ],
      en: [
        "Deleting a category? Delete its to-dos or move them.",
        "Past updates are now in Me > What's new.",
        "To-dos and categories update instantly.",
        "Better layouts on foldables and tablets.",
        "The keyboard no longer covers fields or buttons.",
        "Reminders arrive on time, even at busy times.",
        "Signed-out devices no longer get notifications.",
        'Fixed "Couldn\'t load thanks" after completing a to-do.',
        "Fixed reordering a new subtask.",
        "Fixed the calendar header with large text.",
      ],
    },
  },
  {
    version: "1.15.0",
    date: "2026-11-10",
    summary: {
      ko: "길게 말하면 AI가 할 일 여러 개로 나눠 주는 말로 할 일 만들기와, 회의·수업 녹음을 요약해 주는 말로 메모하기가 생겼어요. 반복 할 일과 프리미엄 화면도 새로 다듬었어요.",
      en: "Talk, and AI makes your to-dos.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "말로 할 일 만들기가 새로워졌어요. 할 일 추가 화면에서 마이크를 누르고 길게 말하면, 음성 인식이 말을 글자로 바꾸고 AI가 그 글을 할 일 여러 개로 나눠요. 날짜·시간·반복·카테고리·나만 보기까지 채워요.",
            en: "Speak to add is all new. Tap the mic on the add screen and talk as long as you like. Speech recognition turns your words into text, and AI splits that text into several to-dos with dates, times, repeats, categories, and private settings filled in.",
          },
          {
            ko: "추가하기 전에 고를 수 있어요. 추가할 할 일만 체크하고, 할 일을 누르면 제목·날짜·시간·반복을 고칠 수 있어요. 이미 있는 할 일은 ‘이미 있어요’로 알려 주고, 아래 버튼을 누르기 전에는 저장되지 않아요.",
            en: "Pick before you add. Check only the to-dos you want, and tap one to edit its title, date, time, or repeat. To-dos you already have are marked, and nothing is saved until you tap the button at the bottom.",
          },
          {
            ko: "말로 메모하기가 새로 생겼어요. 회의나 수업을 녹음하면 AI가 요약과 핵심 포인트, 할 일을 찾아 줘요. 중요한 순간에는 표시를 남기고, 핵심 포인트를 누르면 그 지점부터 다시 들을 수 있어요.",
            en: "New Voice notes. Record a meeting or class, and AI finds a summary, key points, and to-dos. Mark important moments as you go, and tap a key point to listen from there.",
          },
          {
            ko: "녹음 파일은 기기에 저장되고 아이두 서버로 보내지 않아요. 30일이 지나면 자동으로 지워지고, 마이 탭 > 녹음 저장 공간에서 언제든 지울 수 있어요.",
            en: "Audio files are saved on your device and aren't sent to Aido's servers. They're deleted automatically after 30 days, and you can delete them anytime in Me > Recording storage.",
          },
          {
            ko: "메모에 적어 둔 글도 ‘AI로 할 일 나누기’를 누르면 AI가 할 일로 정리해요. 같은 화면에서 골라 추가할 수 있어요.",
            en: "Tap “Split into to-dos with AI” on a note, and AI turns what you wrote into to-dos you can pick from on the same screen.",
          },
          {
            ko: "연간 구독을 처음 시작하면 2주 무료 체험을 받을 수 있어요(스토어가 대상으로 정한 계정). 체험이 끝나기 3일 전에 알려 드려요.",
            en: "New yearly subscribers can get 2 weeks free (accounts the store marks as eligible). We'll remind you 3 days before the trial ends.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "반복 할 일을 매일·평일·매주·격주·매월로 만들고, 기간을 정하거나 계속 반복할 수 있어요. 고치거나 지울 때는 이 할 일만, 이 할 일과 이후 할 일, 이 반복 전체 중에서 골라요.",
            en: "Repeat to-dos daily, on weekdays, weekly, every other week, or monthly, for a set period or with no end. When you edit or delete one, choose Just this one, This and following, or All in this repeat.",
          },
          {
            ko: "프리미엄 화면을 새로 만들었어요. 혜택을 넘겨 보고, 무료와 프리미엄을 표로 비교할 수 있어요. 결제가 끝나면 바로 써 볼 수 있는 시작 화면을 보여 줘요.",
            en: "The Premium screen is new. Swipe through the benefits and compare Free and Premium in a table. After you subscribe, a welcome screen helps you get started.",
          },
          {
            ko: "AI를 쓰는 곳에는 이번 달 남은 횟수가 보이고, 횟수를 다 쓰면 몇 회 썼는지와 언제 초기화되는지 알려 드려요. 잘 안 되면 횟수는 차감되지 않고, 할 일 추가와 완료는 무료에서도 그대로 써요.",
            en: "Places that use AI show how many uses are left this month. Run out? See your usage and when it resets. Failed attempts don't count, and adding and completing to-dos stays free.",
          },
          {
            ko: "무료에서는 AI 할 일 만들기를 월 10회, 말로 메모하기를 월 3회(회당 3분까지) 쓸 수 있어요. 프리미엄은 AI 할 일 만들기를 월 1,000회까지 넉넉하게, 말로 메모하기를 월 100회(회당 30분까지) 써요.",
            en: "Free includes 10 AI to-dos and 3 voice notes (up to 3 minutes each) a month. Premium gives you up to 1,000 AI to-dos and 100 voice notes (up to 30 minutes each) a month.",
          },
          {
            ko: "연간 구독은 갱신 7일 전에 알려 드려요.",
            en: "We'll let you know 7 days before your yearly plan renews.",
          },
          {
            ko: "알림은 가입 직후 한 번만 묻고, 위치는 날씨를 볼 때만 물어요. 알림을 꺼 둔 채 할 일 시간을 정하면 그 자리에서 알려 드려요.",
            en: "We ask for notifications once at sign-up and for location only when you check the weather. If notifications are off when you set a time for a to-do, we'll tell you right there.",
          },
          {
            ko: "iPad, 접는 폰, 펼친 iPhone Duo처럼 넓은 화면에서는 마이 탭이 두 칸으로 보여요. 왼쪽 메뉴는 그대로 두고 오른쪽 화면만 바뀌어요.",
            en: "On wide screens like iPad, foldable phones, and an unfolded iPhone Duo, the Me tab shows two panes. The menu stays on the left while the right side changes.",
          },
          {
            ko: "해외에 가도 할 일 시간이 그대로예요. 한국에서 오전 10시로 정한 할 일은 다른 나라에서도 오전 10시에 알려 드려요.",
            en: "To-do times stay put when you travel. A to-do set for 10 AM in Korea still reminds you at 10 AM local time abroad.",
          },
          {
            ko: "읽지 않은 알림이 있으면 채운 종과 주황 점으로 알려 줘요.",
            en: "A filled bell with an orange dot shows when you have unread notifications.",
          },
          {
            ko: "그 밖에 앱의 안정성과 성능을 다듬었어요.",
            en: "Other stability and performance improvements.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "숨길 답글이 없는데도 ‘답글 숨기기’가 보이던 문제를 고쳤어요.",
            en: "Fixed “Hide replies” showing when there was nothing to hide.",
          },
          {
            ko: "앱이 꺼져 있을 때 알림을 누르면 알림 내용 대신 할 일 탭이 열리던 문제를 고쳤어요.",
            en: "Fixed tapping a notification while the app was closed opening the to-do tab instead of the notification's screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "말로 할 일 만들기: 말하면 AI가 할 일로 나눠요. 저장 전에 하나씩 확인해요.",
        "말로 메모하기: 긴 이야기를 요약과 핵심 포인트, 할 일로 정리해요.",
        "핵심 포인트를 누르면 그 지점부터 다시 들을 수 있어요.",
        "연간 구독을 처음 시작하면 2주 무료 체험을 받을 수 있어요.",
        "반복 할 일은 이 할 일만, 이후 할 일까지, 반복 전체 중에 골라 고치거나 지울 수 있어요.",
        "횟수를 다 쓰면 몇 회 썼는지와 언제 초기화되는지 알려 드려요.",
        "프리미엄은 AI 할 일 만들기를 월 1,000회까지 넉넉하게 써요.",
        "알림은 가입 직후 한 번만 묻고, 위치는 날씨를 볼 때만 물어요.",
        "숨길 답글이 없는데도 '답글 숨기기'가 보이던 문제를 고쳤어요.",
      ],
      en: [
        "Speak to add: AI drafts to-dos you check before saving.",
        "Voice notes: summaries, key points, and to-dos.",
        "Tap a key point to listen from there.",
        "New yearly subscribers can get 2 weeks free.",
        "Edit or delete one repeat, the ones after it, or all.",
        "Run out? See your usage and when it resets.",
        "Up to 1,000 AI to-dos a month on Premium.",
        "We ask for notifications once at sign-up, location only for weather.",
        '"Hide replies" no longer shows with nothing to hide.',
      ],
    },
  },
  {
    version: "1.14.2",
    date: "2026-11-04",
    summary: {
      ko: "알림을 꺼 둔 분도 홈과 설정에서 쉽게 다시 켤 수 있어요. 리마인더와 알림이 더 안정적으로 도착하고, iOS 16.4~17 일부 기기에서 앱이 바로 꺼지던 문제를 고쳤어요.",
      en: "Turning notifications back on is now easy from Home and Settings. Reminders arrive more reliably, and we fixed the app closing right after launch on some iOS 16.4–17 devices.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "알림을 꺼 둔 경우 홈에 안내 카드가 보이고, 알림 설정 맨 위에서 ‘기기 알림 권한’ 상태를 확인한 뒤 ‘설정 열기’로 바로 이동할 수 있어요. 기기 설정에서 켜고 돌아오면 바로 반영돼요.",
            en: "If notifications are off, Home now shows a card, and the top of Notification settings shows your device permission with an Open Settings button. Turn it on in your device settings and come back to see it update right away.",
          },
          {
            ko: "앱 푸시를 꺼 둔 경우 홈에서 바로 켤 수 있도록 안내해요. 마케팅 알림 배너와는 겹치지 않아요.",
            en: "If app push notifications are off, Home now lets you turn them on right there, without overlapping the marketing notification banner.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "알림 권한을 처음 물을 때 앱에서 왜 필요한지 먼저 알려주고, 원할 때만 시스템 권한 창을 띄워요.",
            en: "Before asking for notification permission for the first time, the app explains why it's needed, and the system prompt appears only if you want it.",
          },
          {
            ko: "리마인더와 알림이 더 안정적으로 도착해요. 앱을 다시 열거나 기기를 바꾸거나 재설치해도 알림 수신 정보가 자동으로 맞춰지고, 로그아웃한 기기로는 알림이 가지 않아요.",
            en: "Reminders and notifications arrive more reliably. Your notification settings sync automatically when you reopen the app, switch devices, or reinstall, and signed-out devices no longer get notifications.",
          },
          {
            ko: "그 밖에 앱의 안정성과 성능을 다듬었어요.",
            en: "Other stability and performance improvements.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iOS 16.4~17 일부 기기에서 앱을 열자마자 꺼지던 문제를 고쳤어요.",
            en: "Fixed the app closing right after launch on some iOS 16.4–17 devices.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "알림을 꺼 둔 분도 홈 안내 카드와 알림 설정에서 쉽게 다시 켤 수 있어요.",
        "알림 권한을 묻기 전에 왜 필요한지 먼저 안내해요.",
        "리마인더와 알림이 더 안정적으로 도착해요.",
        "iOS 16.4~17 일부 기기에서 앱이 바로 꺼지던 문제를 고쳤어요.",
      ],
      en: [
        "Turn notifications back on easily from the Home card and Notification settings.",
        "The app now explains why notifications are needed before asking.",
        "Reminders and notifications arrive more reliably.",
        "Fixed the app closing right after launch on some iOS 16.4–17 devices.",
      ],
    },
  },
  {
    version: "1.14.1",
    date: "2026-11-04",
    summary: {
      ko: "할 일 댓글을 한 화면에서 봐요. 답글은 그 자리에서 펼치고, 댓글을 톡톡 두 번 누르면 하트가 팡 터져요. 날씨는 18가지 장면이 실제처럼 움직여요.",
      en: "Comments and replies now live on one screen, replies open in place, and a double-tap pops a heart. Weather comes alive with 18 lifelike scenes.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일 상세 한 화면에서 댓글과 답글을 모두 볼 수 있어요. 답글은 화면을 옮기지 않고 그 자리에서 펼치고, 답글에 답해도 같은 묶음에 @이름과 함께 붙어요.",
            en: "See every comment and reply on the to-do’s detail screen. Replies open right where they are, and a reply to a reply joins the same thread with an @name.",
          },
          {
            ko: "댓글을 톡톡 두 번 눌러 보세요. 하트가 팡 터지며 좋아요가 남아요! 처음 한 번은 앱이 살짝 알려줘요.",
            en: "Double-tap a comment and a heart pops as your like lands! The app shows a quick tip the first time.",
          },
          {
            ko: "⋯ 버튼을 누르거나 댓글을 길게 눌러 수정·복사·삭제·신고·차단을 한곳에서 할 수 있어요.",
            en: "Tap ⋯ or long-press a comment to edit, copy, delete, report, or block, all in one place.",
          },
          {
            ko: "날씨 배경이 18가지 장면으로 실제처럼 움직여요. 비·눈·우박·천둥번개·안개·무더위·강추위까지, 낮에는 해가 밤에는 달이 떠요.",
            en: "The weather background now moves through 18 lifelike scenes, from rain, snow, and hail to thunderstorms, fog, heat, and freezing cold, with the sun by day and the moon by night.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "답글 작성창이 키보드 바로 위에 붙고, 답글을 달 댓글이 가려지지 않게 위로 올라와요.",
            en: "The reply box sits right above the keyboard, and the comment you’re replying to moves up so it stays in view.",
          },
          {
            ko: "댓글 알림을 누르면 할 일 상세가 그 댓글 위치로 열리고 잠깐 강조해 줘요.",
            en: "Tapping a comment notification opens the to-do right at that comment and highlights it for a moment.",
          },
          {
            ko: "영하 기온의 기호와 °를 작게 다듬고, 큰 제목에는 도시 이름만 보여 긴 지역 이름도 깔끔하게 보여요.",
            en: "Below-zero temperatures and the ° symbol look cleaner, and the big title shows just the city name so long place names fit nicely.",
          },
          {
            ko: "날씨 이름을 더 쉽게 바꿨어요. ‘연무’는 ‘뿌연 하늘’, ‘뇌우’는 ‘천둥번개’로 보여요.",
            en: "Weather names are easier to read. “Frigid” is now “Freezing.”",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일 댓글과 답글을 한 화면에서 봐요. 답글은 그 자리에서 펼치고 @이름으로 이어져요.",
        "댓글을 톡톡 두 번 눌러 보세요. 하트가 팡 터지며 좋아요가 남아요!",
        "답글 작성창이 키보드 위에 딱 붙고, 댓글 알림을 누르면 그 댓글로 바로 가요.",
        "날씨가 18가지 장면으로 실제처럼 움직이고, 낮엔 해가 밤엔 달이 떠요.",
      ],
      en: [
        "See comments and replies on one screen. Replies open in place and continue with @names.",
        "Double-tap a comment and a heart pops as your like lands!",
        "The reply box hugs the keyboard, and comment notifications take you straight to the comment.",
        "Weather moves through 18 lifelike scenes, with the sun by day and the moon by night.",
      ],
    },
  },
  {
    version: "1.14.0",
    date: "2026-11-03",
    summary: {
      ko: "날씨가 크게 좋아졌어요. 해외에서도 날씨를 볼 수 있고, 아이두 브리핑이 오늘 할\u00a0일과 날씨를 맞춰 알려줘요. 비나 더위와 겹친 할\u00a0일은 한 번에 시간을\u00a0옮겨요.",
      en: "Weather got a big upgrade. Check it anywhere in the world, and Aido briefing matches today's to-dos with the forecast and helps you move the ones that clash with rain or\u00a0heat.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "날씨 화면이 새로워졌어요. 해외에서도 지금 있는 곳의 날씨를 볼 수 있고, 하늘·비·눈·번개가 움직이는 배경과 함께 시간별(24시간)·10일 예보를\u00a0보여줘요.",
            en: "The weather screen is all new. See the weather wherever you are, even abroad, with a sky that moves with rain, snow, and lightning, plus 24-hour and 10-day\u00a0forecasts.",
          },
          {
            ko: "지원하는 지역에서는 다음 1시간 동안의 비 소식을 분 단위로 알려줘요. 체감 온도, 자외선, 바람, 습도, 해와 달, 대기질(한국)과 기상 특보도 한 화면에서 볼 수\u00a0있어요.",
            en: "In supported areas, see rain for the next hour minute by minute. Feels-like temperature, UV, wind, humidity, sun and moon, air quality (Korea), and weather alerts are all on one\u00a0screen.",
          },
          {
            ko: "‘아이두 브리핑’이 오늘 시간이 정해진 할\u00a0일과 날씨를 맞춰 알려줘요. 브리핑에서 바로 할\u00a0일을 체크하거나 수정하고, 제안을 눌러 할\u00a0일을 추가할 수\u00a0있어요.",
            en: "Aido briefing matches today's scheduled to-dos with the weather. Check off or edit to-dos right from the briefing, or tap a suggestion to add a\u00a0to-do.",
          },
          {
            ko: "비나 더위와 겹친 할\u00a0일은 날씨가 더 나은 시간을 추천받아 한 번에 옮길 수 있어요. 마음이 바뀌면 되돌릴 수도\u00a0있어요.",
            en: "For to-dos that clash with rain or heat, get a better time suggested and move them all at once. Changed your mind? You can undo\u00a0it.",
          },
          {
            ko: "아침·저녁 날씨 알림을 해외에서도 받아요. 비나 더위와 겹친 할\u00a0일이 있으면 알림을 눌러 바로 시간을 옮길 수\u00a0있어요.",
            en: "Morning and evening weather notifications now arrive abroad too. If a to-do clashes with rain or heat, tap the notification to move it right\u00a0away.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면이 다크 모드, 큰 글씨, 태블릿과 폴더블 화면에 맞춰 보이고, 새로고침 버튼으로 바로 새로 불러올 수\u00a0있어요.",
            en: "The weather screen now fits dark mode, larger text, tablets, and foldables, and a refresh button brings in the latest weather right\u00a0away.",
          },
          {
            ko: "인터넷이 끊기면 위쪽에 안내가 뜨고, 마지막으로 본 할\u00a0일과 날씨를 그대로 보여줘요. 다시 연결되면 자동으로 새로 불러오고, 연결이 없어도 로그아웃할 수\u00a0있어요.",
            en: "When you're offline, a notice appears at the top and your last-seen to-dos and weather stay on screen. They refresh automatically once you're back online, and you can sign out while\u00a0offline.",
          },
          {
            ko: "위치는 날씨에만 쓰고, 정확한 위치 대신 약 5km 단위로 묶어 날씨를\u00a0가져와요.",
            en: "Your location is used only for weather, and we look it up by a roughly 5\u00a0km area instead of your exact\u00a0spot.",
          },
          {
            ko: "스토어에 문제가 있을 때 구독 화면에서 안내를 보고 바로 문의할 수\u00a0있어요.",
            en: "If the store has a problem, the Subscription screen explains what's happening and lets you contact us right\u00a0away.",
          },
          {
            ko: "친구 초대 안내를 닫을 수 있고, 시작하기 체크리스트의 보상 표시를 깔끔하게\u00a0다듬었어요.",
            en: "You can now dismiss the friend invite banner, and rewards on the getting-started checklist are easier to\u00a0read.",
          },
          {
            ko: "알림 문구를 더 다정한 말투로\u00a0다듬었어요.",
            en: "Notifications now sound warmer and\u00a0friendlier.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨 화면이 새로워졌어요. 해외에서도 시간별·10일 예보를 보고, 지원 지역에서는 다음 1시간 비 소식도 알려줘요.",
        "아이두 브리핑이 오늘 할 일과 날씨를 맞춰 알려줘요.",
        "비나 더위와 겹친 할 일은 한 번에 시간을 옮기고 되돌릴 수 있어요.",
        "날씨 알림을 해외에서도 받고, 인터넷이 끊겨도 마지막으로 본 할 일과 날씨를 보여줘요.",
      ],
      en: [
        "All-new weather with 24-hour and 10-day forecasts worldwide, plus next-hour rain in supported areas.",
        "Aido briefing matches today's to-dos with the weather.",
        "Move to-dos that clash with rain or heat in one go, and undo anytime.",
        "Weather notifications work abroad, and your to-dos and weather stay visible offline.",
      ],
    },
  },
  {
    version: "1.13.1",
    date: "2026-11-02",
    summary: {
      ko: "해외에 있거나 기기 시간대를 바꿔도 할\u00a0일 날짜가 정확하게 표시되고, 앱을 더 안정적으로 다듬었어요.",
      en: "To-do dates stay accurate when you travel or change time zones, and the app runs more\u00a0smoothly.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "해외에 있거나 기기 시간대를 바꿔도 할\u00a0일 날짜가 정확하게\u00a0표시돼요.",
            en: "To-do dates now stay accurate when you travel or change your device's time\u00a0zone.",
          },
          {
            ko: "앱을 더 안정적으로 쓸 수 있도록 내부를\u00a0다듬었어요.",
            en: "Behind-the-scenes improvements to keep the app running\u00a0smoothly.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "해외에 있거나 기기 시간대를 바꿔도 할 일 날짜가 정확하게 표시돼요.",
        "앱을 더 안정적으로 쓸 수 있도록 내부를 다듬었어요.",
      ],
      en: [
        "To-do dates now stay accurate when you travel or change your device's time zone.",
        "Behind-the-scenes improvements to keep the app running smoothly.",
      ],
    },
  },
  {
    version: "1.13.0",
    date: "2026-10-27",
    summary: {
      ko: "초대 링크로 친구를 불러요. 친구는 가입하면 바로, 나는 친구가 2일 동안 할 일을 끝내면 프리미엄 7일을 받아요. 신고·차단이 생겼고, AI와 위젯이 더 정확해졌어요.",
      en: "Invite friends with a link: your friend gets 7 days of Premium on joining, you get 7 days once they complete to-dos on 2 days. You can now report and block, and AI and widgets are more accurate.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "초대 링크를 카카오톡이나 다른 앱으로 보내 친구를 불러요. 새로 가입한 친구는 바로 친구가 되고 프리미엄 7일을\u00a0받아요.",
            en: "Send an invite link on KakaoTalk or any app. A friend who just signed up becomes your friend right away and gets 7\u00a0days of\u00a0Premium.",
          },
          {
            ko: "초대한 친구가 2일 동안 할\u00a0일을 끝내면 나는 프리미엄 7일을 받고, 친구를 1명 더 추가할 수 있어요. ‘발자국 모으기’에서 초대 현황을 보고, 기다리는 친구에게 콕을 보내 응원할 수\u00a0있어요.",
            en: "When a friend you invited completes to-dos on 2\u00a0days, you get 7\u00a0days of Premium and can add 1\u00a0more friend. Track it in “Collect paw prints” and send a nudge to friends who are still on their\u00a0way.",
          },
          {
            ko: "불편한 할\u00a0일·댓글·콕·응원은 신고하고, 그 사람을 차단할 수 있어요. 내 할\u00a0일에 달린 댓글은 직접 지울 수\u00a0있어요.",
            en: "Report to-dos, comments, nudges, or cheers that bother you, and block the person. You can also delete comments on your own\u00a0to-dos.",
          },
          {
            ko: "AI에 메모나 할\u00a0일을 보내기 전에 동의를 받아요. 설정에서 언제든 바꿀 수\u00a0있어요.",
            en: "We ask for your consent before sending notes or to-dos to AI. You can change it anytime in Settings.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 ‘내일 오후 3시’, ‘다음 주 금요일’ 같은 날짜를 더 정확하게 알아듣고, 긴 메모는 할\u00a0일 5개까지 나눠\u00a0만들어요.",
            en: "AI understands dates like “tomorrow at 3 PM” or “next Friday” more accurately, and turns long notes into up to 5\u00a0to-dos.",
          },
          {
            ko: "위젯이 자정이 지나면 앱을 열지 않아도 새 날짜로 바뀌고, 기기 언어로\u00a0보여요.",
            en: "Widgets switch to the new day after midnight without opening the app, and follow your device language.",
          },
          {
            ko: "주간 성취와 AI 리포트에 ‘10월 19일 ~ 10월 25일’처럼 날짜 범위를 함께\u00a0보여줘요.",
            en: "Weekly achievements and AI reports now show the date range, like “Oct 19 – Oct\u00a025.”",
          },
          {
            ko: "구독 화면에서 초대 보상으로 받은 프리미엄 기간을 확인할 수 있어요. 구독 중에 받은 보상은 구독이 끝난 뒤 이어서\u00a0시작해요.",
            en: "See your reward Premium period on the Subscription screen. Rewards earned while subscribed start after your subscription\u00a0ends.",
          },
          {
            ko: "콕 고마움 카드, 친구 목록, 댓글 화면을 더 편하게 다듬었고, 키보드가 버튼을 가리지 않아요. 탭 아이콘은 고양이 귀 모양이\u00a0됐어요.",
            en: "We polished the nudge thank-you card, friends list, and comments, and the keyboard no longer covers buttons. Tab icons now have cat\u00a0ears.",
          },
          {
            ko: "초대한 친구가 첫날 할\u00a0일을 끝내면 알림으로 알려 줘요. 홈의 새 기능 카드는 닫을 수\u00a0있어요.",
            en: "We let you know when a friend you invited finishes their first day. You can now dismiss the what's-new card on\u00a0Home.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "달력이 몇 년 뒤로 넘어가거나 서머타임에 반복 할\u00a0일이 빠지던 문제를\u00a0고쳤어요.",
            en: "Fixed the calendar jumping years ahead and recurring to-dos going missing when daylight saving time\u00a0begins.",
          },
          {
            ko: "고양이 프로필이 비어 보이거나 위젯 날짜가 잘리던 문제를\u00a0고쳤어요.",
            en: "Fixed blank cat profiles and cut-off widget\u00a0dates.",
          },
          {
            ko: "알림이나 링크를 눌렀을 때 엉뚱한 화면이 열리거나 오류가 보이던 문제를\u00a0고쳤어요.",
            en: "Fixed notifications and links that opened the wrong screen or showed an\u00a0error.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "초대 링크로 가입한 친구는 바로 프리미엄 7일을 받아요.",
        "친구가 2일 동안 할 일을 끝내면 나는 프리미엄 7일을 받고, 친구를 1명 더 추가할 수 있어요.",
        "신고·차단이 생겼고, AI에 보내기 전에 동의를 받아요.",
        "AI가 날짜를 더 정확하게 알아듣고, 위젯은 자정이 지나면 새 날짜로 바뀌어요.",
      ],
      en: [
        "Friends you invite get 7 days of Premium when they join.",
        "You get 7 days of Premium + 1 more friend once they complete to-dos on 2 days.",
        "Report or block people, and we ask for consent before sending data to AI.",
        "AI reads dates more accurately, and widgets switch to the new day after midnight.",
      ],
    },
  },
  {
    version: "1.12.1",
    date: "2026-10-25",
    summary: {
      ko: "iPhone Duo와 폴더블 폰에서 접고 펼쳐도 더 안정적으로 쓸 수 있고, 할 일 순서 바꾸기가 부드러워졌어요.",
      en: "Aido feels steadier as you fold and unfold iPhone Duo and foldable phones, and reordering to-dos is smoother.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "iPhone Duo나 폴더블 폰을 반쯤 접으면 목록과 상세가 접히는 선을 기준으로 나뉘어 보여요. 내용이 접히는 부분에 걸리지\u00a0않아요.",
            en: "Half-fold your iPhone\u00a0Duo or foldable phone, and the list and details split neatly along the fold, so nothing sits across the\u00a0crease.",
          },
          {
            ko: "보낸 콕을 알림의 친구 탭에서 받은 알림과 함께 확인할 수 있어요. ‘받은 알림’과 ‘보낸 콕’을 눌러 바로 오갈 수\u00a0있어요.",
            en: "Find the nudges you sent in the Friends tab of your notifications. Switch between Received and Sent with a single\u00a0tap.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "접은 iPhone Duo에서는 뒤로 가기, 저장, 검색 같은 화면 위쪽 버튼이 옆쪽 막대로 옮겨져 더 편하게 누를 수 있어요. 일반 iPhone에서도 버튼 모양이 기기와 자연스럽게\u00a0어울려요.",
            en: "On a folded iPhone\u00a0Duo, top buttons like Back, Save, and Search move to the side bar within easy reach. On other iPhones, they now match the look of your\u00a0device.",
          },
          {
            ko: "할\u00a0일 옵션, 날짜, 시간처럼 아래에서 올라오는 창이 화면 너비에 맞게 펼쳐지고, 시계 아래에서 열려 잘리지 않아요. 내용이 길면 창 안에서 스크롤할 수\u00a0있어요.",
            en: "Sheets for to-do options, date, and time now fit the width of your screen and open below the clock without getting cut off. Longer content scrolls inside the\u00a0sheet.",
          },
          {
            ko: "할\u00a0일, 하위 할\u00a0일, 친구, 카테고리 순서를 끌어서 바꿀 때 더 부드럽게 움직이고, 자리를 옮길 때마다 가벼운 진동으로\u00a0알려줘요.",
            en: "Dragging to reorder to-dos, checklist items, friends, and categories feels smoother, with a light tap of feedback each time an item\u00a0moves.",
          },
          {
            ko: "VoiceOver와 TalkBack에서 할\u00a0일 완료, 댓글 보기, 더보기를 바로 사용할 수\u00a0있어요.",
            en: "With VoiceOver or TalkBack, you can complete a to-do, open its comments, or see more options right from the\u00a0list.",
          },
          {
            ko: "Mac에서는 창 크기와 관계없이 익숙한 휴대폰 화면으로\u00a0보여요.",
            en: "On Mac, Aido keeps its familiar phone layout at any window\u00a0size.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "끌어서 순서를 바꾼 뒤 줄이 겹치거나 빈칸이 남던 문제를\u00a0고쳤어요.",
            en: "We fixed rows overlapping or leaving gaps after you dragged to\u00a0reorder.",
          },
          {
            ko: "할\u00a0일 옵션에서 날짜 변경을 누르면 창이 덜 열린 채 멈춰 있던 문제를\u00a0고쳤어요.",
            en: "We fixed the date sheet getting stuck halfway open when chosen from to-do\u00a0options.",
          },
          {
            ko: "펼친 화면에서 메모를 보다가 다른 탭으로 옮긴 뒤 접으면 메모가 엉뚱하게 열리던 문제와, 펼친 직후 화면이 살짝 흔들리던 문제를\u00a0고쳤어요.",
            en: "We fixed a note opening in the wrong tab after folding, and the screen shifting slightly right after unfolding.",
          },
          {
            ko: "보낸 콕을 열 때 오류 화면이 보이던 문제를\u00a0고쳤어요.",
            en: "We fixed an error screen that appeared when opening the nudges you\u00a0sent.",
          },
          {
            ko: "영어로 쓸 때 시간이 ‘PM 2:30’처럼 보이거나 24시간제 설정을 따르지 않던 문제, 자정이 지나도 날짜 선택의 ‘오늘·내일’이 바뀌지 않던 문제를\u00a0고쳤어요.",
            en: "We fixed times showing as “PM 2:30” in English or ignoring your 24-hour setting, and Today and Tomorrow in the date picker not updating after midnight.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone Duo나 폴더블 폰을 반쯤 접으면 목록과 상세가 접히는 선을 기준으로 나뉘어 보여요.",
        "접은 iPhone Duo에서는 화면 위쪽 버튼을 옆쪽 막대에서 편하게 누를 수 있어요.",
        "할 일 옵션·날짜·시간 창이 잘리지 않고, 끌어서 순서를 바꿀 때 더 부드러워요.",
        "보낸 콕을 알림의 친구 탭에서 확인할 수 있고, 날짜·시간 표시와 화면 읽기 기능을 다듬었어요.",
      ],
      en: [
        "Half-fold your iPhone Duo or foldable phone to split the list and details along the fold.",
        "On a folded iPhone Duo, top buttons sit in the side bar within easy reach.",
        "To-do option, date, and time sheets no longer get cut off, and dragging to reorder is smoother.",
        "Find sent nudges in the Friends tab of notifications. We also refined date and time display and screen reader support.",
      ],
    },
  },
  {
    version: "1.12.0",
    date: "2026-10-24",
    summary: {
      ko: "폴더블 폰과 iPhone Duo를 펼치면 목록과 상세를 나란히 볼 수 있어요.",
      en: "Unfold a foldable phone or iPhone Duo to see lists and details side by side.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "폴더블 폰과 iPhone Duo를 펼치면 할\u00a0일, 친구의 할\u00a0일, 메모, 설정을 왼쪽 목록과 오른쪽 상세로 나눠 볼 수 있어요. 목록을 보면서 할\u00a0일의 댓글이나 메모 내용을 바로\u00a0확인해요.",
            en: "On an unfolded foldable phone or iPhone\u00a0Duo, to-dos, your friends’ to-dos, notes, and settings show a list on the left and details on the right. Read comments or notes while keeping your list in\u00a0view.",
          },
          {
            ko: "작성 중인 댓글과 메모는 화면을 접거나 펼쳐도 그대로 남아 있어요. 로그인이 만료돼도 다시 로그인하면 이어서 쓸 수\u00a0있어요.",
            en: "Comments and notes you’re writing stay put when you fold or unfold your phone. If you’re signed out, pick up where you left off after signing back\u00a0in.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "작성 중인 글은 이 기기에 암호화해 보관하고, 다른 계정으로 로그인하면 이전 계정의 글을\u00a0정리해요.",
            en: "Unsent writing is encrypted on your device and cleared when a different account signs\u00a0in.",
          },
          {
            ko: "iPhone Duo의 세로 레일과 겹치지 않도록 화면 내용, 알림 메시지, 아래에서 올라오는 창과 하단 버튼의 위치를\u00a0다듬었어요.",
            en: "Screen content, toasts, bottom sheets, and bottom buttons now stay clear of the iPhone\u00a0Duo\u00a0rail.",
          },
          {
            ko: "넓은 화면에서는 로그인 화면이 가운데 알맞은 폭으로 보이고, 아래에서 올라오는 창도 너무 넓어지지\u00a0않아요.",
            en: "On wide screens, sign-in screens sit at a comfortable width in the center, and bottom sheets no longer stretch too\u00a0wide.",
          },
          {
            ko: "펼친 화면에서 아직 선택한 항목이 없으면 상세 영역에 안내가 보여요. Android에서는 뒤로 가기로 열린 상세를 먼저 닫을 수\u00a0있어요.",
            en: "When nothing is selected on an unfolded screen, the detail area shows a short guide. On Android, Back closes the open details\u00a0first.",
          },
          {
            ko: "답글 대상을 바꿔도 쓰던 글을 이어서 쓸 수 있어요. 할\u00a0일 변경이 실패하면 해당 할\u00a0일만 원래대로 되돌리도록\u00a0다듬었어요.",
            en: "Switching who you reply to keeps your draft. If a to-do change fails, only that to-do is restored.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "화면을 접거나 펼칠 때 보던 내용이 처음부터 다시 그려지던 문제를\u00a0고쳤어요.",
            en: "We fixed content redrawing from scratch when you fold or unfold your\u00a0phone.",
          },
          {
            ko: "펼친 화면에서 주간·월간 달력을 넘길 때 폭이 어긋나던 문제를\u00a0고쳤어요.",
            en: "We fixed misaligned weekly and monthly calendars when swiping on an unfolded\u00a0screen.",
          },
          {
            ko: "펼친 화면에서 댓글을 쓸 때 입력창과 목록이 키보드보다 높게 떠오르던 문제를\u00a0고쳤어요.",
            en: "We fixed the comment field and list rising too far above the keyboard on an unfolded\u00a0screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "폴더블 폰과 iPhone Duo를 펼치면 할 일, 친구의 할 일, 메모, 설정을 목록과 상세로 나란히 볼 수 있어요.",
        "작성 중인 댓글과 메모는 접고 펼치거나 다시 로그인해도 이어서 쓸 수 있어요.",
        "iPhone Duo 화면 배치와 펼친 화면의 달력·키보드 동작을 다듬었어요.",
      ],
      en: [
        "Unfold a foldable phone or iPhone Duo to see to-dos, friends’ to-dos, notes, and settings as a list beside details.",
        "Keep writing comments and notes after folding, unfolding, or signing back in.",
        "We refined iPhone Duo layouts and calendar and keyboard behavior on unfolded screens.",
      ],
    },
  },
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
            ko: "친구가 보낸 콕에 ‘시작해볼게’, ‘응원 고마워’, ‘조금 뒤에 할게’로 답장할 수 있어요. 답장 후에도 마친 할\u00a0일은 직접 체크해\u00a0주세요.",
            en: "Reply to a friend’s nudge with “I’ll get started”, “Thanks for cheering me on”, or “I’ll do it later”. You still need to check off the to-do when you finish\u00a0it.",
          },
          {
            ko: "공개한 할\u00a0일을 마치면 콕으로 응원해 준 친구들에게 한 번에 고마움을 전할 수 있어요. 답장과 감사는 무료로 이용할 때도 쓸 수\u00a0있어요.",
            en: "After finishing a public to-do, thank the friends who nudged you in one go. Replies and thanks are available on the free plan\u00a0too.",
          },
          {
            ko: "중간 위젯에서는 오늘의 할\u00a0일을, 큰 위젯에서는 주간 달력과 오늘의 목록을 함께 볼 수 있어요. ‘할\u00a0일 만들기’를 누르면 앱에서 바로 추가할 수\u00a0있어요.",
            en: "See today's to-dos in the medium widget, or your weekly calendar and today's list in the large widget. Tap ‘Add a to-do’ to create one in the\u00a0app.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "받은 콕과 친구의 답장, 고마움을 알림 목록에서 함께 확인할 수 있어요. 보낸 콕에서도 친구의 반응을 살펴볼 수\u00a0있어요.",
            en: "Find nudges, replies, and thanks together in your notifications. You can also follow your friends' responses in the nudges you've\u00a0sent.",
          },
          {
            ko: "작은 위젯에서는 완료 수와 진행률을 확인할 수 있어요. 모든 크기의 고양이 발자국을 더 또렷하게 다듬고, iPhone과 Android의 배치를 비슷하게\u00a0맞췄어요.",
            en: "The small widget shows your completion count and progress. Paw prints are clearer in every size, with more consistent layouts on iPhone and\u00a0Android.",
          },
          {
            ko: "앱을 켜 둔 채 자정이 지나거나 다음 날 앱으로 돌아오면 오늘 날짜가 바뀌도록\u00a0다듬었어요.",
            en: "Today’s date now updates after midnight while the app is open, or when you return the next\u00a0day.",
          },
          {
            ko: "콕과 할\u00a0일 알림의 문구를 다듬었어요. 알림에서 할\u00a0일로 이동하거나 이전 화면으로 돌아가는 과정도 더 자연스러워졌어요.",
            en: "Nudge and to-do reminder messages read more naturally. Moving from a notification to a to-do and back is smoother\u00a0too.",
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
            ko: "러시안 블루, 크림, 턱시도 고양이가 추가돼 프로필을 9가지 고양이 중에서 고를 수 있어요. 프리미엄 구독자는 앱 아이콘도 바꿀 수\u00a0있어요.",
            en: "Russian Blue, Cream, and Tuxedo cats bring your profile choices to nine. Premium subscribers can also change their app\u00a0icon.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면의 상단과 배경을 자연스럽게 맞추고, 라이트 모드와 다크 모드에서 더 편하게 볼 수 있도록\u00a0다듬었어요.",
            en: "The weather screen has a more consistent header and background, with clearer colors in light and dark\u00a0mode.",
          },
          {
            ko: "한국 밖에서는 날씨를 국내에서만 지원한다는 안내를 확인할 수\u00a0있어요.",
            en: "Outside Korea, you will see a notice explaining that weather is currently supported only in\u00a0Korea.",
          },
          {
            ko: "할\u00a0일, 메모, 마이페이지를 더 쉽게 구분할 수 있도록 하단 탭 아이콘을 새롭게\u00a0다듬었어요.",
            en: "Refreshed bottom tab icons make to-dos, notes, and My Page easier to tell\u00a0apart.",
          },
          {
            ko: "등록된 할\u00a0일이나 메모가 없을 때 안내가 화면 가운데에 보이고, 캘린더를 불러오지 못하면 가까운 곳에서 다시 시도할 수\u00a0있어요.",
            en: "Empty to-do and note lists show a centered message. If the calendar cannot load, you can retry without scrolling\u00a0far.",
          },
          {
            ko: "목록을 스크롤하거나 불러오는 과정을 다듬고, 화면 아래 내용이 하단 탭에 가려지지 않도록\u00a0정리했어요.",
            en: "Lists are smoother to scroll and load, and content at the bottom stays clear of the\u00a0tabs.",
          },
          {
            ko: "무료로 이용할 때는 AI 기능 안내를 먼저 보여드리고, 프리미엄 AI 제안을 준비 중이거나 불러오지 못했을 때도 상태를 더 쉽게 알 수\u00a0있어요.",
            en: "Free users see an introduction to AI features. Premium subscribers get clearer messages while AI suggestions are being prepared or cannot\u00a0load.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱에 처음 들어왔을 때 위치와 예보가 늦게 반영되거나, 상단 온도가 가끔 보이지 않던 문제를\u00a0고쳤어요.",
            en: "We fixed delayed location and forecast updates when opening the app, and the temperature occasionally missing from the top of the\u00a0screen.",
          },
          {
            ko: "Android에서 테마를 바꾸거나 이전 화면으로 돌아갈 때 앱이 갑자기 종료될 수 있던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could unexpectedly close the app on Android when changing themes or going\u00a0back.",
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
            ko: "앱 하단 탭을 새롭게 다듬어, iPhone과 Android에서 원하는 화면으로 더 자연스럽게 이동할 수\u00a0있어요.",
            en: "You can move between screens more naturally with refreshed bottom tabs on iPhone and\u00a0Android.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "홈 화면 위젯에 오늘의 날짜, 할\u00a0일 목록과 완료 상태가 더 안정적으로 표시되도록\u00a0다듬었어요.",
            en: "Your home screen widgets now show today's date, to-dos, and completion progress more reliably.",
          },
          {
            ko: "입력창과 키보드 동작을 다듬어, 할\u00a0일과 댓글을 더 편하게 작성할 수\u00a0있어요.",
            en: "You can write to-dos and comments more comfortably with improved text fields and keyboard behavior.",
          },
          {
            ko: "메모를 작성하고 수정하거나 할\u00a0일로 바꾸는 과정이 더 안정적으로 이어지도록\u00a0다듬었어요.",
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
            ko: "할\u00a0일 상세에서 댓글과 답글을 함께 보고, 원하는 댓글에 바로 답글을 남길 수\u00a0있어요.",
            en: "You can view comments and replies together in a to-do and reply directly to a\u00a0comment.",
          },
          {
            ko: "답글이 이어진 대화를 펼쳐 보고, 댓글 알림을 누르면 해당 댓글로 바로 이동할 수\u00a0있어요.",
            en: "You can expand a conversation to read its replies and jump to the relevant comment from a notification.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "댓글을 쓰거나 답글을 오갈 때 입력창과 화면 이동이 더 자연스럽게 이어지도록\u00a0다듬었어요.",
            en: "Writing comments and moving between replies now feels smoother, with the text field ready where you need\u00a0it.",
          },
          {
            ko: "답글을 작성하다 뒤로 가기를 누르면 한 번에 이전 댓글 화면으로 돌아갈 수\u00a0있어요.",
            en: "You can return to the previous comment screen with one tap when you go back while writing a\u00a0reply.",
          },
          {
            ko: "할\u00a0일 목록의 간격을 정돈하고, 댓글 작성자와 내용이 더 또렷하게 보이도록\u00a0다듬었어요.",
            en: "Your to-do list has tidier spacing, and comment authors and text are easier to\u00a0read.",
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
            ko: "친구가 공개한 할\u00a0일을 모두 마친 날에는 친구 캘린더에 물고기가\u00a0보여요.",
            en: "A fish appears on a friend's calendar when they finish all their public to-dos for the\u00a0day.",
          },
          {
            ko: "친구가 어떤 카테고리의 할\u00a0일을 마쳤는지 색깔 점으로 한눈에 확인할 수\u00a0있어요.",
            en: "You can see which categories your friend completed at a glance with colored\u00a0dots.",
          },
          {
            ko: "친구가 공개한 할\u00a0일만 보여드려서, 서로의 하루를 부담 없이 살펴볼 수\u00a0있어요.",
            en: "You only see your friend's public to-dos, so you can follow their day comfortably.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날짜를 바꿔도 친구의 완료 기록이 자연스럽게 이어지도록\u00a0다듬었어요.",
            en: "Your friend's completion history now stays in sync as you move between\u00a0dates.",
          },
          {
            ko: "내 캘린더와 친구 캘린더를 오갈 때 필요한 정보를 더 쉽게 알아볼 수 있도록\u00a0다듬었어요.",
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
            ko: "화면을 이동할 때 움직임이 더 부드럽게 이어지도록\u00a0다듬었어요.",
            en: "Moving between screens now feels smoother.",
          },
          {
            ko: "로그인과 구독을 더 안정적으로 이용할 수 있도록\u00a0다듬었어요.",
            en: "Sign-in and subscriptions now work more reliably.",
          },
          {
            ko: "가끔 생기던 오류를 줄이고, 문제가 생겼을 때 원인을 확인하기 쉽도록\u00a0다듬었어요.",
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
            ko: "메모 AI, 친구 찾기, 순서 정리 등 유용한 기능을 모은 기능 가이드가 생겼어요. 마이페이지에서 언제든 다시 볼 수\u00a0있어요.",
            en: "You can explore features like AI for notes, finding friends, and reordering in the new Feature Guide, then reopen it anytime from My\u00a0Page.",
          },
          {
            ko: "아이두를 처음 쓴다면, 홈의 시작 체크리스트를 따라 첫 할\u00a0일을 만들고 완료할 수\u00a0있어요.",
            en: "If you're new to Aido, a starter checklist on Home guides you through creating and completing your first\u00a0to-do.",
          },
          {
            ko: "할\u00a0일과 카테고리를 길게 눌러 원하는 순서로 옮길 수 있다는 안내를 화면에서 바로 확인할 수\u00a0있어요.",
            en: "You can see an on-screen tip explaining how to press and hold to reorder to-dos and categories.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "친구를 구분하는 8자리 코드를 #이 붙은 표기로 통일했어요. 검색과 프로필에서 같은 코드로 친구를 알아볼 수\u00a0있어요.",
            en: "Your 8-character friend code now uses the same # format in search and profiles.",
          },
          {
            ko: "친구가 할\u00a0일을 완료했을 때 보내드리는 알림이 더 정확한 순간에 도착하도록\u00a0다듬었어요.",
            en: "Notifications about a friend's completed to-do now arrive at a more accurate\u00a0time.",
          },
          {
            ko: "할\u00a0일과 카테고리를 빠르게 연달아 정리해도 순서가 어긋나지 않도록\u00a0다듬었어요.",
            en: "Your to-dos and categories now stay in the right order, even when you rearrange them\u00a0quickly.",
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
            ko: "문제가 생겼을 때 원인을 확인하고 수정하는 과정을\u00a0다듬었어요.",
            en: "We improved how we investigate and fix\u00a0issues.",
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
            ko: "설정에서 언어와 화면 테마를 고르는 화면을 새롭게 꾸몄어요. 아이콘과 함께 원하는 옵션을 더 쉽게 찾을 수\u00a0있어요.",
            en: "You can find your preferred language and theme more easily in the refreshed Settings screens, now with\u00a0icons.",
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
            ko: "구독을 이용하고 데이터를 저장하는 과정을 더 안정적으로\u00a0다듬었어요.",
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
            ko: "Android에서도 iPhone과 같은 디자인의 위젯 3종을 사용할 수 있어요. 필요한 정보에 맞춰\u00a0골라보세요.",
            en: "You can choose from the same three widget styles on Android and iPhone to see the information you\u00a0need.",
          },
          {
            ko: "할\u00a0일과 연속 달성을 이어갈 수 있도록 맞춤 제안과 응원 알림을 받아볼 수\u00a0있어요.",
            en: "You can receive personalized suggestions and encouragement to keep your to-dos and streaks\u00a0going.",
          },
          {
            ko: "맞춤 제안 알림은 회원가입할 때 선택하거나, 마이페이지의 약관 및 정책에서 언제든 바꿀 수\u00a0있어요.",
            en: "You can choose whether to receive personalized suggestions at sign-up and change your choice anytime under Terms & Policies in My\u00a0Page.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나거나 다음 날 앱으로 돌아오면, 새로운 오늘 날짜로 시작하도록\u00a0다듬었어요.",
            en: "The app now starts on the new date after midnight or when you return the next\u00a0day.",
          },
          {
            ko: "알림을 누르면 관련 화면으로 이동하도록 다듬었어요. 알림을 모두 읽음으로 바꾸면 목록에도 바로\u00a0반영돼요.",
            en: "Notifications now open the relevant screen. Marking all as read updates the list right\u00a0away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 iPhone과 Android 기기에서 위젯의 글자가 잘리거나 정렬이 어긋나던 문제를\u00a0고쳤어요.",
            en: "We fixed clipped text and uneven alignment in widgets on some iPhone and Android\u00a0devices.",
          },
          {
            ko: "화면을 불러오는 중 문제가 생겨도 앱을 계속 사용할 수 있도록 안정성을\u00a0다듬었어요.",
            en: "We improved stability so you can keep using the app when a screen has trouble\u00a0loading.",
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
            ko: "홈 화면에 위젯을 추가하면, 앱을 열지 않아도 오늘 할\u00a0일을 한눈에 확인할 수\u00a0있어요.",
            en: "You can add a home screen widget to see today's to-dos without opening the\u00a0app.",
          },
          {
            ko: "작은 위젯에서는 남은 할\u00a0일 개수와 연속 달성 일수를, 큰 위젯에서는 할\u00a0일 목록까지 확인할 수\u00a0있어요.",
            en: "You can use a small widget for your remaining to-do count and streak, or a larger one for the to-do list\u00a0too.",
          },
          {
            ko: "할\u00a0일을 완료하면 위젯에서도 바로 확인할 수 있어요.",
            en: "Complete a to-do in the app, and your widget updates right\u00a0away.",
          },
          {
            ko: "위젯은 iPhone과 Android에서 사용할 수 있고, 기기의 라이트 모드와 다크 모드를\u00a0따라가요.",
            en: "Widgets are available on iPhone and Android and follow your device’s light or dark\u00a0mode.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나면 위젯도 새로운 하루로 바뀌도록\u00a0다듬었어요.",
            en: "The widget now switches to the new day automatically at midnight.",
          },
          {
            ko: "위젯이 배터리와 데이터를 적게 쓰도록 다듬었어요.",
            en: "The widget is designed to use little battery or\u00a0data.",
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
            ko: "이름이나 아이디로 친구를 검색하고, 원하는 사람을 찾아 친구로 추가할 수\u00a0있어요.",
            en: "You can search for friends by name or ID and add the person you're looking\u00a0for.",
          },
          {
            ko: "같은 이름을 쓰는 사람이 여러 명이어도 아이디로 구분해 원하는 친구를 찾을 수\u00a0있어요.",
            en: "You can tell people with the same name apart by their ID to find the right\u00a0friend.",
          },
          {
            ko: "친구 요청을 보낸 뒤 마음이 바뀌면 요청을 취소할 수\u00a0있어요.",
            en: "You can cancel a friend request if you change your mind after sending\u00a0it.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "Google이나 Apple 계정을 처음 연결할 때 더 안정적으로 처리되도록\u00a0다듬었어요.",
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
            ko: "연결이 잠깐 불안정할 때 앱을 열어도, 로그인을 유지한 채 내용을 자동으로 다시 불러오도록\u00a0다듬었어요.",
            en: "The app now reloads content automatically while keeping you signed in if your connection is briefly unstable when you open\u00a0it.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 열자마자 할\u00a0일, AI 제안, 날씨에 ‘다시 시도’ 안내가 뜨던 문제를 고쳤어요. 이제 잠시 기다리면 내용을 자동으로\u00a0불러와요.",
            en: "We fixed “Try again” messages appearing for to-dos, AI suggestions, and weather just after opening the app. Content now loads automatically after a brief\u00a0wait.",
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
            ko: "일부 사용자에게 가끔 로그인이 풀리던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could occasionally sign some users\u00a0out.",
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
            ko: "앱을 더 안정적이고 편하게 사용할 수 있도록\u00a0다듬었어요.",
            en: "The app now feels more reliable and easier to\u00a0use.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 업데이트한 뒤 로그인이 풀리던 문제를 고쳤어요.",
            en: "We fixed an issue that could sign you out after an app\u00a0update.",
          },
          {
            ko: "앱을 쓰다가 갑자기 ‘다시 시도’ 안내가 뜨던 문제를\u00a0고쳤어요.",
            en: "We fixed “Try again” messages appearing unexpectedly while using the\u00a0app.",
          },
          {
            ko: "휴대폰이 잠겨 있을 때 알림으로 앱을 열면 로그인이 풀리던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could sign you out when opening a notification while your phone was\u00a0locked.",
          },
          {
            ko: "인터넷이 연결되지 않은 상태에서 앱을 열면 로그인이 풀리던 문제를\u00a0고쳤어요.",
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
            ko: "인터넷 연결이 잠깐 끊기거나 느려져도 로그인을 유지할 수 있도록\u00a0다듬었어요.",
            en: "The app now keeps you signed in more reliably when your internet connection briefly drops or slows\u00a0down.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 업데이트한 뒤 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃된 상태라면 한 번만 다시 로그인해\u00a0주세요.",
            en: "We fixed an issue that could sign you out after an app update. If you've already been signed out, please sign in once\u00a0more.",
          },
          {
            ko: "일부 iPhone 화면에서 영어 문구가 어색하게 보이던 문제를\u00a0고쳤어요.",
            en: "We fixed awkward English wording on some iPhone\u00a0screens.",
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
            ko: "영어로 아이두를 이용할 수 있어요. 설정 > 언어에서 ‘시스템 설정’, ‘한국어’, ‘English’ 중 선택해\u00a0주세요.",
            en: "You can now use Aido in English. Choose “System default”, “한국어”, or “English” in Settings > Language.",
          },
          {
            ko: "처음 설치하면 기기 언어를 따라가요. 한국어 기기에서는 한국어로, 그 외에는 영어로\u00a0시작해요.",
            en: "Aido follows your device language on first install, starting in Korean on Korean-language devices and English on\u00a0others.",
          },
          {
            ko: "할\u00a0일, 친구 소식, 날씨 알림도 선택한 언어로 받아볼 수\u00a0있어요.",
            en: "To-do reminders, friend updates, and weather notifications arrive in your chosen language\u00a0too.",
          },
          {
            ko: "AI 주간·월간 리포트와 반복 할\u00a0일 제안도 선택한 언어로 받아볼 수\u00a0있어요.",
            en: "You can receive weekly and monthly AI reports and recurring to-do suggestions in your chosen language.",
          },
          {
            ko: "날짜, 시간, 요일도 선택한 언어에 맞는 표기로 확인할 수\u00a0있어요.",
            en: "You can see dates, times, and weekdays formatted for your chosen language.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "언어를 바꾸면 앱을 다시 시작하지 않아도 모든 화면에 바로 적용되도록\u00a0다듬었어요.",
            en: "Language changes now apply across the app right away without a\u00a0restart.",
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
            ko: "앱을 지웠다가 다시 설치하면 로그인 직후 바로 로그아웃되던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could sign you out immediately after signing in to a freshly reinstalled\u00a0app.",
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
            ko: "앱의 안정성을 높이고, 오류가 생기면 더 빨리 찾아 고칠 수 있도록\u00a0다듬었어요.",
            en: "We improved app stability and how quickly we can find and fix\u00a0issues.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 상황에서 예상치 못하게 로그인이 풀리던 문제를 추가로\u00a0고쳤어요.",
            en: "We fixed more situations that could unexpectedly sign you\u00a0out.",
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
            ko: "휴대폰으로 받는 알림 문구를 더 친근하고 자연스럽게\u00a0다듬었어요.",
            en: "Notification messages now read more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "비나 눈 예보가 있는 날에도 맑은 날씨 알림이 오던 문제를\u00a0고쳤어요.",
            en: "We fixed sunny-weather notifications being sent on days with rain or snow in the forecast.",
          },
          {
            ko: "인터넷 연결이 불안정할 때 가끔 로그인이 풀리던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could occasionally sign you out on an unstable internet connection.",
          },
          {
            ko: "알림에서 친구 이름 뒤의 말이 어색하게 이어지던 문제를\u00a0고쳤어요.",
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
            ko: "앱을 더 안정적이고 편하게 사용할 수 있도록\u00a0다듬었어요.",
            en: "The app now feels more reliable and easier to\u00a0use.",
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
            ko: "캘린더를 좌우로 쓸어 주와 월을 넘길 수 있어요. 화면 전환도 더 부드럽게\u00a0이어져요.",
            en: "You can swipe the calendar left or right to move between weeks and months, with smoother transitions.",
          },
          {
            ko: "반복 설정에서 ‘매일’, ‘주중’, ‘주말’, ‘월~일’ 중 원하는 주기를 한 번에 선택할 수\u00a0있어요.",
            en: "Choose “Daily”, “Weekdays”, “Weekends”, or “Mon–Sun” in one tap when setting\u00a0repeats.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "무료로 AI를 이용해 할\u00a0일을 정리할 수 있는 횟수를 월 5회로 바꿨어요. 한국 시간으로 매월 1일 자정에 다시\u00a0채워져요.",
            en: "The free plan now includes five uses of AI to organize to-dos per month. Your allowance resets at midnight Korean time on the first of each\u00a0month.",
          },
          {
            ko: "AI가 할\u00a0일의 카테고리와 내용을 더 정확하게 구분하도록\u00a0다듬었어요.",
            en: "AI now distinguishes a to-do's category and content more accurately.",
          },
          {
            ko: "AI 리포트를 더 안정적인 품질로 받아볼 수 있도록\u00a0다듬었어요.",
            en: "AI reports now have more consistent, reliable\u00a0results.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "캘린더를 넘길 때 날씨 배지가 깜빡이던 문제를\u00a0고쳤어요.",
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
            ko: "메모가 생겼어요. 떠오르는 생각을 자유롭게 적어둘 수\u00a0있어요.",
            en: "You can now jot down your thoughts anytime with\u00a0notes.",
          },
          {
            ko: "메모 상단의 로봇 아이콘을 누르면 AI가 내용을 할\u00a0일과 체크리스트 항목으로 정리해\u00a0줘요.",
            en: "Tap the robot icon at the top of a note to organize its contents into to-dos and checklist items with\u00a0AI.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 필요한 할\u00a0일을 더 명확하게 제안하도록\u00a0다듬었어요.",
            en: "AI suggestions now explain the to-dos that fit your needs more\u00a0clearly.",
          },
          {
            ko: "다크 모드 화면이 더 자연스럽게 보이도록 다듬었어요.",
            en: "Dark mode screens now have a more natural\u00a0look.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "가끔 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃된 상태라면 한 번만 다시 로그인해\u00a0주세요.",
            en: "We fixed an issue that could occasionally sign you out. If you've already been signed out, please sign in once\u00a0more.",
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
            ko: "체크리스트 항목이 있는 할\u00a0일을 기본으로 펼쳐, 내용을 한눈에 볼 수 있도록\u00a0다듬었어요.",
            en: "To-dos with checklist items now open expanded by default, so you can see the details at a\u00a0glance.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "알림 메시지에 글꼴 크기 설정이 반영되지 않던 문제를\u00a0고쳤어요.",
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
            ko: "휴대폰 알림을 눌렀을 때 화면이 겹쳐 보이던 문제를\u00a0고쳤어요.",
            en: "We fixed overlapping screens when opening a notification.",
          },
          {
            ko: "날씨 알림이 할\u00a0일 카테고리로 잘못 표시되던 문제를\u00a0고쳤어요.",
            en: "We fixed weather notifications being incorrectly labeled as to-do notifications.",
          },
          {
            ko: "날씨 화면에서 비나 눈을 나타내는 아이콘과 설명이 서로 다르던 문제를\u00a0고쳤어요.",
            en: "We fixed mismatched rain and snow icons and descriptions on the weather\u00a0screen.",
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
            ko: "날씨 화면에서 평균 기온 대신 현재 기온을 확인할 수 있도록\u00a0다듬었어요.",
            en: "The weather screen now shows the current temperature instead of the\u00a0average.",
          },
          {
            ko: "알림 설정 화면을 더 깔끔하게 정리했어요.",
            en: "Notification settings now have a cleaner, easier-to-follow\u00a0layout.",
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
            en: "The weather detail screen now has a clearer, easier-to-read\u00a0design.",
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
            ko: "아침과 오후에 날씨에 맞는 할\u00a0일 팁을 알림으로 받아볼 수\u00a0있어요.",
            en: "You can receive weather-based to-do tips in morning and afternoon notifications.",
          },
          {
            ko: "날씨 상세 화면에서 시간대별 날씨, 체감온도, 자외선, 미세먼지와 5일 예보를 확인할 수\u00a0있어요.",
            en: "You can check hourly weather, feels-like temperature, the UV index, fine dust levels, and a five-day forecast on the weather detail\u00a0screen.",
          },
          {
            ko: "날씨 알림 시간을 오전과 오후 각각 원하는 시간으로 설정할 수\u00a0있어요.",
            en: "You can set your preferred times for morning and afternoon weather notifications separately.",
          },
          {
            ko: "AI 제안이 8가지 유형으로 늘었어요. 습관 회복과 균형 잡힌 계획 등 더 다양한 맞춤 제안을 받아볼 수\u00a0있어요.",
            en: "You can receive eight types of AI suggestions, including habit recovery and balance tips, for more personalized planning.",
          },
          {
            ko: "반복 할\u00a0일의 시작일을 바꾸거나, 반복 할\u00a0일을 삭제할 수\u00a0있어요.",
            en: "You can change a recurring to-do's start date or delete\u00a0it.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 리포트의 습관 패턴 분석과 맞춤 코칭을 더 세심하게\u00a0다듬었어요.",
            en: "AI reports now offer more detailed habit pattern analysis and personalized coaching.",
          },
          {
            ko: "AI가 이전에 수락하거나 거절한 제안을 참고해, 나에게 더 잘 맞는 제안을 하도록\u00a0다듬었어요.",
            en: "AI now learns from suggestions you've accepted or declined to offer recommendations that better fit you over\u00a0time.",
          },
          {
            ko: "알림이 한꺼번에 몰려오지 않도록 보내는 시간을\u00a0나눴어요.",
            en: "We spread out notification times so they don’t all arrive at\u00a0once.",
          },
          {
            ko: "휴대폰 알림을 꺼도 앱 안의 알림 목록에서는 내용을 확인할 수\u00a0있어요.",
            en: "You can still read updates in the app’s notification list when phone notifications are turned\u00a0off.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 화면에서 글꼴 크기 설정이 적용되지 않던 문제를\u00a0고쳤어요.",
            en: "We fixed font size settings not being applied on some\u00a0screens.",
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
            ko: "앱 안의 글꼴 크기를 아주 작게부터 아주 크게까지 5단계로 조절할 수\u00a0있어요.",
            en: "You can choose from five font sizes in the app, from Extra Small to Extra\u00a0Large.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 기기에서 시간 선택 화면이 잘리던 문제를\u00a0고쳤어요.",
            en: "We fixed the time picker being cut off on some\u00a0devices.",
          },
          {
            ko: "AI 제안 화면이 가끔 깜빡이던 문제를 고쳤어요.",
            en: "We fixed occasional flickering on the AI suggestions\u00a0screen.",
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
            ko: "할\u00a0일에 체크리스트 항목을 추가할 수 있어요.",
            en: "You can add checklist items to your\u00a0to-dos.",
          },
          {
            ko: "할\u00a0일을 추가할 때 카테고리를 더 쉽게 선택할 수\u00a0있어요.",
            en: "You can choose a category more easily when adding a\u00a0to-do.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "카테고리 관리 화면을 더 쉽게 사용할 수 있도록\u00a0다듬었어요.",
            en: "Category management now has a more intuitive\u00a0layout.",
          },
          {
            ko: "반복 설정 화면을 더 깔끔하게 정리했어요.",
            en: "Repeat settings now have a cleaner\u00a0layout.",
          },
          {
            ko: "카테고리 색상을 바꾸면 캘린더에도 바로 반영되도록\u00a0다듬었어요.",
            en: "Category color changes now appear in the calendar right\u00a0away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 잠깐 나갔다 돌아오면 입력 화면이 깨지던 문제를\u00a0고쳤어요.",
            en: "We fixed a broken input screen when returning to the app after a short time\u00a0away.",
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
            ko: "오늘 할\u00a0일은 내일로 미루고, 다른 날의 할\u00a0일은 오늘로 당겨올 수\u00a0있어요.",
            en: "You can move today's to-dos to tomorrow or bring to-dos from other days forward to\u00a0today.",
          },
          {
            ko: "친구 목록을 편집할 수 있는 모드가 생겼어요.",
            en: "You can now edit your friend list in a dedicated\u00a0mode.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "할\u00a0일을 추가하거나 수정·삭제할 때 더 빠르게 반영되도록\u00a0다듬었어요.",
            en: "Adding, editing, and deleting to-dos now responds\u00a0faster.",
          },
          {
            ko: "카테고리를 추가하거나 수정·삭제할 때 더 빠르게 반영되도록\u00a0다듬었어요.",
            en: "Adding, editing, and deleting categories now responds\u00a0faster.",
          },
          {
            ko: "AI 제안 문구를 더 다양하게 다듬었어요.",
            en: "AI suggestions now use a wider variety of messages.",
          },
          {
            ko: "카테고리 관리 화면을 더 편하게 사용할 수 있도록\u00a0다듬었어요.",
            en: "Category management is now easier to\u00a0use.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할\u00a0일 제목을 바꿔도 알림에 이전 제목이 표시되던 문제를\u00a0고쳤어요.",
            en: "We fixed reminders showing the old title after you renamed a\u00a0to-do.",
          },
          {
            ko: "할\u00a0일 추가 화면에서 키보드와 날짜 선택을 오갈 때 화면이 끊기던 문제를\u00a0고쳤어요.",
            en: "We fixed stuttering when switching between the keyboard and date picker while adding a\u00a0to-do.",
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
            ko: "하루의 완료 현황에서 카테고리를 색상으로 구분해 볼 수\u00a0있어요.",
            en: "You can see category colors in your daily completion overview.",
          },
          {
            ko: "캘린더에서 날짜별 할\u00a0일 완료 상태를 확인할 수\u00a0있어요.",
            en: "You can check each day's to-do completion status in the calendar.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "휴대폰으로 받는 알림 문구를 더 다양하게 다듬었어요.",
            en: "Notification messages now have more\u00a0variety.",
          },
          {
            ko: "AI 리포트를 주간과 월간 분석으로 나누고, 맞춤 코칭의 품질을\u00a0다듬었어요.",
            en: "AI reports now separate weekly and monthly analysis, with improved personalized coaching.",
          },
          {
            ko: "AI가 더 다양한 패턴을 살펴보고 할\u00a0일을 제안하도록\u00a0다듬었어요.",
            en: "AI suggestions now recognize a wider range of patterns.",
          },
          {
            ko: "카테고리 관리를 마이페이지로 옮기고, 화면 구성을 더 보기 좋게\u00a0다듬었어요.",
            en: "Category management has moved to My Page with a clearer\u00a0layout.",
          },
          {
            ko: "Android 하단 탭의 경계선을 없애 화면이 자연스럽게 이어지도록\u00a0다듬었어요.",
            en: "We removed the border on Android's bottom tabs for a more seamless\u00a0screen.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iPhone에서 하단 탭과 관련해 앱이 갑자기 종료되던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue with the bottom tabs that could unexpectedly close the app on\u00a0iPhone.",
          },
          {
            ko: "AI 리포트가 잘못된 시간에 생성되던 문제를\u00a0고쳤어요.",
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
            ko: "친구 목록에서 친구를 끌어 옮겨 원하는 순서로 정리할 수\u00a0있어요.",
            en: "You can drag friends into your preferred order in the friend\u00a0list.",
          },
          {
            ko: "할\u00a0일 메뉴에서 카테고리를 바로 바꿀 수 있어요.",
            en: "You can change a to-do's category directly from its action\u00a0menu.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "문의하기 화면에서 키보드를 더 편하게 사용할 수 있도록\u00a0다듬었어요.",
            en: "We improved keyboard behavior on the contact screen for easier\u00a0typing.",
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
            ko: "친구에게 콕 찌르기를 보내 할\u00a0일을 떠올릴 수 있도록 도와줄 수\u00a0있어요.",
            en: "Send a friend a nudge to help them remember a\u00a0to-do.",
          },
          {
            ko: "문의하기에서 궁금한 점을 남길 수 있어요.",
            en: "You can get in touch with us through the new contact\u00a0feature.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "선택한 캘린더 보기 모드가 유지되도록 다듬었어요.",
            en: "Your selected calendar view now stays\u00a0saved.",
          },
          {
            ko: "친구 요청을 보내고 받는 과정을 더 편하게\u00a0다듬었어요.",
            en: "Sending and receiving friend requests is easier to\u00a0follow.",
          },
          {
            ko: "마이페이지와 프로필 설정 화면을 더 보기 좋게\u00a0다듬었어요.",
            en: "My Page and profile settings now have a clearer\u00a0design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "다크 모드에서 Apple 아이콘이 보이지 않던 문제를\u00a0고쳤어요.",
            en: "We fixed the Apple icon not appearing in dark\u00a0mode.",
          },
          {
            ko: "카카오 프로필 이미지가 보이지 않던 문제를 고쳤어요.",
            en: "We fixed Kakao profile images not appearing.",
          },
          {
            ko: "Android에서 마이페이지 하단 내용이 탭에 가려지던 문제를\u00a0고쳤어요.",
            en: "We fixed the bottom tabs covering content at the bottom of My Page on\u00a0Android.",
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
            ko: "주간 목표 달성 배지를 확인할 수 있는 화면이\u00a0생겼어요.",
            en: "You can see your weekly goal achievement badges on a new\u00a0screen.",
          },
          {
            ko: "주간 배지를 공유해 작은 성취를 나눌 수 있어요.",
            en: "You can share your weekly badges to celebrate small\u00a0wins.",
          },
          {
            ko: "점심시간에 리마인더 알림을 받아볼 수 있어요.",
            en: "You can receive a reminder notification at lunchtime.",
          },
          {
            ko: "연속 달성이 끊기기 전에 알림을 받아볼 수 있어요.",
            en: "You can receive an alert before your streak\u00a0ends.",
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
            ko: "AI가 할\u00a0일을 더 정확하게 이해하도록 다듬었어요.",
            en: "AI now recognizes to-dos more accurately.",
          },
          {
            ko: "AI가 매일 할\u00a0일을 살펴보고, 제안에 카테고리도 함께 안내하도록\u00a0다듬었어요.",
            en: "AI now reviews your to-dos daily and includes category suggestions in its recommendations.",
          },
          {
            ko: "프리미엄 리포트가 아직 없을 때 보이는 화면을 더 보기 좋게\u00a0다듬었어요.",
            en: "Premium reports now have a clearer screen when no report is available\u00a0yet.",
          },
          {
            ko: "주간 달성 리포트를 더 안정적으로 받아볼 수 있도록\u00a0다듬었어요.",
            en: "Weekly achievement reports now work more reliably.",
          },
          {
            ko: "친구 요청을 수락하면 바로 반영되도록 다듬었어요.",
            en: "Accepted friend requests now appear right\u00a0away.",
          },
          {
            ko: "소셜 로그인 버튼을 더 보기 좋게 다듬었어요.",
            en: "Social sign-in buttons now have a clearer\u00a0design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "기기에서 큰 글씨를 설정했을 때 화면이 깨지던 문제를\u00a0고쳤어요.",
            en: "We fixed broken layouts when using a larger system font\u00a0size.",
          },
          {
            ko: "Android에서 앱 아이콘이 잘리던 문제를\u00a0고쳤어요.",
            en: "We fixed the app icon being clipped on\u00a0Android.",
          },
          {
            ko: "구독 금액이 잘못 표시되던 문제를 고쳤어요.",
            en: "We fixed an incorrect subscription price\u00a0display.",
          },
          {
            ko: "일부 색상이 올바르게 표시되지 않던 문제를 고쳤어요.",
            en: "We fixed some colors not displaying correctly.",
          },
          {
            ko: "Android에서 Apple 로그인 버튼이 잘못 표시되던 문제를\u00a0고쳤어요.",
            en: "We fixed the Apple sign-in button appearing incorrectly on\u00a0Android.",
          },
          {
            ko: "알림을 받을 때 앱이 갑자기 종료되던 문제를\u00a0고쳤어요.",
            en: "We fixed an issue that could unexpectedly close the app when a notification\u00a0arrived.",
          },
          {
            ko: "알림을 누르면 잘못된 화면으로 이동하던 문제를\u00a0고쳤어요.",
            en: "We fixed notifications opening the wrong\u00a0screen.",
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
            ko: "메모를 AI로 정리할 때 적어 둔 날짜와 시간, 세부 내용을 더 잘 반영하도록\u00a0다듬었어요.",
            en: "AI for notes now handles the dates, times, and details you write more carefully.",
          },
          {
            ko: "이미 수락하거나 거절한 활동이 AI 제안에 다시 나타나는 경우를\u00a0줄였어요.",
            en: "AI suggestions are less likely to repeat activities you have already accepted or declined.",
          },
          {
            ko: "남은 할\u00a0일과 친구의 활동에 맞춰 알림 문구를 더 자연스럽게\u00a0다듬었어요.",
            en: "Notification messages now describe your remaining to-dos and friends’ activity more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "주간·월간 리포트에서 일부 완료 기록이 다른 날짜에 반영되거나 빠지던 문제를\u00a0고쳤어요.",
            en: "We fixed some completion records appearing on the wrong date or missing from weekly and monthly\u00a0reports.",
          },
          {
            ko: "날짜가 바뀔 때 일부 날씨 정보가 이전 날짜를 기준으로 표시될 수 있던 문제를\u00a0고쳤어요.",
            en: "We fixed some weather information using the previous date after a new day\u00a0began.",
          },
          {
            ko: "메모를 할\u00a0일로 바꾸거나 AI 제안을 수락하는 과정에서 같은 할\u00a0일이 겹쳐 만들어질 수 있던 문제를\u00a0고쳤어요.",
            en: "We fixed a case where converting a note or accepting an AI suggestion could create the same to-do\u00a0twice.",
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

// 날짜는 YYYY-MM-DD 문자열이라 Math.max가 아니라 위 정렬과 같은 문자열 비교로 고른다.
export const patchNotesUpdatedAt = updateNotes.reduce(
  (latest, update) =>
    update.date.localeCompare(latest) > 0 ? update.date : latest,
  PATCH_NOTES_EDITED_AT,
);

/** The exact plain text shared by the website clipboard and store submissions. */
export function formatStoreNotes(release: ReleaseNote, locale: Locale): string {
  return `${release.summary[locale]}\n\n${release.storeNotes[locale]
    .map((item) => `- ${item}`)
    .join("\n")}`;
}
