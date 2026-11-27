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
export const PATCH_NOTES_EDITED_AT = "2026-11-17";

export const releaseNotes: [ReleaseNote, ...ReleaseNote[]] = [
  {
    version: "1.17.1",
    date: "2026-11-27",
    summary: {
      ko: "알림 시각과 말로 메모, Android 날씨에서 생기던 문제를 고쳤어요.",
      en: "Fixes for reminder times, voice notes and Weather on Android.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "로그인, 친구 요청, 초대 코드 확인, 캘린더 일정 가져오기 버튼을 빠르게 두 번 눌러도 한 번만 처리해요.",
            en: "Double-tapping log in, friend request, invite code or calendar import now runs it just once.",
          },
          {
            ko: "화면 안내 문구를 더 짧고 알기 쉽게 다듬었어요.",
            en: "Wording across the app is shorter and clearer.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "오프라인에서 알림의 ‘완료하기’를 누르면 나중에 연결될 때 조용히 완료되던 문제를 고쳤어요. 이제 바로 알려 드려요.",
            en: "Fixed the Complete action on a notification running quietly later if you tapped it offline. It now tells you right away.",
          },
          {
            ko: "기기 시간대를 읽지 못했을 때 리마인드 시각이 어긋날 수 있던 문제를 고쳤어요.",
            en: "Fixed reminder times that could be off when the app couldn't read your device's time zone.",
          },
          {
            ko: "24시간 표기를 써도 알림 글의 시각이 오전·오후로 나오던 문제를 고쳤어요.",
            en: "Fixed notification text showing AM/PM times even when you use the 24-hour format.",
          },
          {
            ko: "말로 메모에서 다른 메모의 녹음이 섞이거나, 시작에 실패한 뒤 ‘이어서 말하기’가 되지 않던 문제를 고쳤어요.",
            en: "Fixed voice notes picking up audio from another note, and “Keep talking” not working after a failed start.",
          },
          {
            ko: "저장하는 사이 화면을 벗어나면 다른 화면이 닫히거나, 링크로 바로 연 화면이 저장 뒤 닫히지 않던 문제를 고쳤어요.",
            en: "Fixed a different screen closing if you left during a save, and screens opened from a link not closing after you saved.",
          },
          {
            ko: "안내 말풍선이 아래에서 올라온 창 위에 겹쳐 글자를 가리던 문제를 고쳤어요.",
            en: "Fixed a tip bubble appearing on top of a sheet and covering its text.",
          },
          {
            ko: "Android에서 날씨를 열면 앱이 꺼지던 문제를 고쳤어요.",
            en: "Fixed the app closing when you opened Weather on Android.",
          },
          {
            ko: "Android에서 기기 애니메이션을 꺼 두면 날씨의 지역과 기온이 보이지 않던 문제를 고쳤어요.",
            en: "Fixed the location and temperature missing from Weather on Android with animations turned off.",
          },
          {
            ko: "Android 카테고리 관리에서 수정·삭제 버튼이 줄 밖에 보이던 문제를 고쳤어요.",
            en: "Fixed the Edit and Delete buttons appearing out of place in Manage categories on Android.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "버튼을 빠르게 두 번 눌러도 한 번만 처리해요.",
        "오프라인에서 알림의 ‘완료하기’를 누르면 나중에 실행되던 문제를 고쳤어요.",
        "리마인드 시각이 어긋나거나 알림 글에 24시간 표기가 반영되지 않던 문제를 고쳤어요.",
        "말로 메모에서 녹음이 섞이거나 ‘이어서 말하기’가 되지 않던 문제를 고쳤어요.",
        "Android에서 날씨를 열면 앱이 꺼지던 문제를 고쳤어요.",
      ],
      en: [
        "Double-tapping a button now runs it just once.",
        "Fixed the Complete action on a notification running later if you tapped it offline.",
        "Fixed reminder times that could be off, and 24-hour time not showing in notifications.",
        "Fixed voice notes mixing audio and “Keep talking” not working.",
        "Fixed the app closing when you opened Weather on Android.",
      ],
    },
  },
  {
    version: "1.17.0",
    date: "2026-11-25",
    summary: {
      ko: "기기 캘린더의 일정을 골라 할 일로 한 번에 가져올 수 있어요.",
      en: "Import events from your device calendar as to-dos in one go.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "캘린더에 적어 둔 일정이 많아 아이두로 옮기기 어렵다는 이야기를 듣고, 일정을 할 일로 한 번에 옮기는 기능을 만들었어요.",
            en: "Switching is hard when your plans already live in your calendar, so now you can turn calendar events into to-dos in one go.",
          },
          {
            ko: "마이 > 설정 > 캘린더 일정 가져오기에서 캘린더와 기간만 고르면 일정이 할 일로 들어와요.",
            en: "In Me > Settings > Import calendar events, pick calendars and a date range, and your events arrive as to-dos.",
          },
          {
            ko: "기기에 있는 iCloud·Google·Outlook 캘린더를 권한 한 번으로 읽어요. 아이두에 따로 로그인하지 않아요.",
            en: "Aido reads the iCloud, Google and Outlook calendars already on your device after one permission tap. There's no separate sign-in.",
          },
          {
            ko: "캘린더는 읽기만 하고 바꾸거나 지우지 않아요. 한 번 옮겨 오는 기능이라 나중에 바꾼 일정은 따라오지 않아요.",
            en: "Aido only reads your calendar and never changes or deletes events. It's a one-time copy, so later changes don't carry over.",
          },
          {
            ko: "기간은 1주·1개월·3개월·6개월·1년으로 바로 고르거나, 시작일과 종료일을 직접 정해요.",
            en: "Tap 1 week, 1 month, 3 months, 6 months or 1 year, or set the start and end dates yourself.",
          },
          {
            ko: "공휴일·생일·구독 캘린더는 처음에 빼 둬요. 캘린더가 안 보이면 ‘캘린더가 목록에 없나요?’를 눌러 보세요.",
            en: "Holiday, birthday and subscribed calendars start unchecked. If one is missing, tap “Missing a calendar?” to see how to add it.",
          },
          {
            ko: "가져온 일정은 기본으로 아이두 카테고리 한 곳에 모두 들어가요. 원하면 ‘캘린더마다 다른 곳에 넣을래요’로 나눠요.",
            en: "Imported events all go into one Aido category by default. Tap “Put each calendar somewhere else” to split them up.",
          },
          {
            ko: "넣을 곳에서 새 아이두 카테고리를 만들 수 있고, 가져온 뒤에도 할 일을 언제든 옮길 수 있어요.",
            en: "You can create a new Aido category for them, and move the to-dos anytime after importing.",
          },
          {
            ko: "‘시간도 가져오기’를 끄면 날짜만 가져와 리마인드가 오지 않아요. ‘친구에게 공개’는 처음에 꺼져 있어요.",
            en: "Turn off “Include times” to bring in dates only, with no reminders. “Share with friends” starts off.",
          },
          {
            ko: "가져오는 동안 앱을 나가도 괜찮아요. 끝나면 가져온 수와 건너뛴 이유를 알려 드려요.",
            en: "You can leave the app while it imports. When it's done, you see how many came in and why any were skipped.",
          },
          {
            ko: "같은 일정은 두 번 들어오지 않아요. 7일 안에는 아직 끝내지 않은 가져온 할 일만 한 번에 되돌려요.",
            en: "The same event is never imported twice. Within 7 days, undo to remove only the imported to-dos you haven't finished.",
          },
          {
            ko: "무료 플랜은 오늘부터 30일, 프리미엄은 365일 뒤 일정까지 가져와요. 가져오기 자체는 무료예요.",
            en: "The free plan imports events for the next 30 days, and Premium up to 365. Importing itself is free.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "구독 혜택에 ‘캘린더 일정 더 멀리 가져오기’를 더했어요.",
            en: "Premium benefits now include “Import calendar events further ahead.”",
          },
          {
            ko: "업데이트하면 캘린더 일정 가져오기를 짧게 소개해 드려요. 마이 > 새로운 기능에서 다시 볼 수 있어요.",
            en: "A short tour shows Import calendar events after you update. Find it again in Me > What's new.",
          },
          {
            ko: "VoiceOver·TalkBack으로도 캘린더와 기간을 고르고 진행 상태를 들을 수 있어요.",
            en: "VoiceOver and TalkBack can read the calendar and range choices and the import progress.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "Mac에서 날씨를 열 때마다 위치 권한을 다시 묻던 문제를 고쳤어요.",
            en: "Fixed Weather asking for location again every time you opened it on Mac.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "기기 캘린더의 일정을 골라 할 일로 한 번에 가져와요. 캘린더는 읽기만 해요.",
        "아이두 카테고리 한 곳에 모아 넣거나 캘린더마다 나누고, 시간과 친구 공개 여부를 골라요.",
        "가져온 뒤 7일 안에는 끝내지 않은 할 일만 되돌릴 수 있어요.",
        "무료는 30일, 프리미엄은 365일 뒤 일정까지 가져와요. 가져오기는 무료예요.",
        "Mac에서 날씨를 열 때마다 위치 권한을 다시 묻던 문제를 고쳤어요.",
      ],
      en: [
        "Import events from your device calendars as to-dos in one go. Aido only reads your calendar.",
        "Put everything in one Aido category or split by calendar, then choose times and sharing.",
        "Undo within 7 days to remove only to-dos you haven't finished.",
        "Free covers the next 30 days, Premium up to 365. Importing is free.",
        "Fixed Weather asking for location every time you opened it on Mac.",
      ],
    },
  },
  {
    version: "1.16.1",
    date: "2026-11-23",
    summary: {
      ko: "아래에서 올라오는 창이 기기 기본 시트로 바뀌고, iPad·Mac 친구 검색을 고쳤어요.",
      en: "Sheets now use your device's native sheets, and friend search works on iPad and Mac.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "아래에서 올라오는 창을 iPhone·Android 기본 시트로 바꿔, 끌어 내려 닫기와 키보드 입력을 다듬었어요.",
            en: "Sheets that slide up from the bottom now use native iPhone and Android sheets, so swiping down to close and typing feel more natural.",
          },
          {
            ko: "AI 리포트(프리미엄)의 ‘모두 끝낸 날’을 연속 기록과 같은 기준으로 세요. 가장 많이 끝낸 시간이 여럿이면 더 이른 시간을 보여 드려요.",
            en: "AI reports (Premium) count “Perfect days” the same way as your streak. If several hours tie for the most to-dos finished, the earliest one shows.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iPad·Mac에서 친구 검색을 열면 앱이 닫히던 문제를 고쳤어요.",
            en: "Fixed the app closing when you opened friend search on iPad or Mac.",
          },
          {
            ko: "자정 직후 홈 화면 위젯 요약을 불러올 때 생기던 오류를 고쳤어요.",
            en: "Fixed an error when the home screen widget loaded its summary right after midnight.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "아래에서 올라오는 창이 기기 기본 시트로 바뀌어 더 자연스러워요.",
        "AI 리포트의 ‘모두 끝낸 날’을 연속 기록과 같은 기준으로 세요.",
        "iPad·Mac에서 친구 검색을 열면 앱이 닫히던 문제를 고쳤어요.",
        "자정 직후 홈 화면 위젯 오류를 고쳤어요.",
      ],
      en: [
        "Sheets now use native iPhone and Android sheets.",
        "AI reports count Perfect days the same way as your streak.",
        "Fixed the app closing on friend search on iPad and Mac.",
        "Fixed a home screen widget error right after midnight.",
      ],
    },
  },
  {
    version: "1.16.0",
    date: "2026-11-17",
    summary: {
      ko: "AI 제안과 리포트가 이유와 차트로 한눈에 보여요.",
      en: "AI suggestions and reports now show reasons and charts at a glance.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "AI 제안이 새로워졌어요(프리미엄). 최근 2주 동안 자주 한 할 일을 ‘14번 중 13번 끝냈어요’처럼 이유와 함께 제안해요.",
            en: "New AI suggestions (Premium) find to-dos you did often in the last 2 weeks and show why, like “Done 13 of 14 times.”",
          },
          {
            ko: "제안은 ‘오후 12:40 · 매주 월·화·목’처럼 만들어질 반복 할 일 모양으로 보여요. ‘반복으로 만들기’나 ‘필요 없어요’로 정해요.",
            en: "Each suggestion looks like the repeating to-do it becomes, like “12:40 PM · Weekly on Mon, Tue, Thu.” Tap Make it repeat or Not needed.",
          },
          {
            ko: "아침까지 기다리지 않아도 돼요. 오늘 분석 전이라면 ‘지금 분석 받기’로 바로 제안을 받아요.",
            en: "No need to wait for the morning. If today's check hasn't run, tap Check now to get suggestions right away.",
          },
          {
            ko: "제안이 없으면 빈 화면 대신 살펴보는 중인지, 오늘 다 정리했는지, 할 일이 더 필요한지와 다음에 살펴볼 시각을 알려 드려요.",
            en: "With nothing to suggest, you'll see why (still looking, all caught up, or more to-dos needed) and when we'll look again.",
          },
          {
            ko: "AI 리포트가 새로워졌어요(프리미엄). 달성률 변화와 날마다 끝낸 할 일, 주로 끝내는 시간대를 차트로 보고, 막대를 누르면 그날 기록이 보여요.",
            en: "AI reports got a new look (Premium): your completion rate and its change, daily progress, and a 24-hour chart of when you finish. Tap a bar to see that day.",
          },
          {
            ko: "리포트 목록 맨 위에서 최근 8주 달성률 흐름을 봐요. 누르거나 밀면 주마다 달성률이 보이고, 해가 바뀌어도 이어져요.",
            en: "The top card in reports shows your last 8 weeks of completion. Tap or slide to see each week, even across the new year.",
          },
          {
            ko: "리포트 끝에서 AI 코치가 이번 기간을 돌아보고 다음에 해 볼 팁을 알려 줘요.",
            en: "At the end of each report, your AI coach recaps the period and suggests what to try next.",
          },
          {
            ko: "무료로도 AI 리포트 화면에서 이번 주 요일별로 끝낸 할 일을 막대로 봐요. 아직 오지 않은 날은 따로 표시해요.",
            en: "Free users can see this week's record on the AI reports screen, with a bar for each day and days ahead marked.",
          },
          {
            ko: "무료에서도 AI 제안과 AI 리포트를 예시로 미리 볼 수 있어요. 예시 리포트도 AI 코치 글까지 실제 화면과 같아요.",
            en: "Free users can preview AI suggestions and AI reports with sample data. Sample reports look just like real ones, coach notes included.",
          },
          {
            ko: "알림 설정에 ‘AI 제안·리포트 알림’이 생겼어요. 끄면 푸시만 멈추고 앱 알림 목록에는 그대로 남아요. 무료에서도 미리 끌 수 있어요.",
            en: "Notification settings now have “AI suggestions & reports.” Turn it off to stop just those push alerts; they still show in the app. Free users can turn it off too.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "‘운동하기’, ‘운동 하기 🏃’처럼 띄어쓰기·문장부호·이모지·대소문자만 다른 제목은 하나로 묶어 제안하고 기록도 합쳐 세요.",
            en: "Titles that differ only in spacing, punctuation, emoji, or capitalization, like “Yoga” and “yoga 🧘,” become one suggestion with their records combined.",
          },
          {
            ko: "이미 반복 중인 할 일은 다시 제안하지 않아요.",
            en: "To-dos that already repeat aren't suggested again.",
          },
          {
            ko: "AI 제안 알림은 오전 9시에 와요. ‘지금 분석 받기’로 받은 제안은 이미 보고 있으니 알림을 보내지 않아요.",
            en: "AI suggestion alerts arrive at 9 AM. Suggestions from Check now don't send an alert, since you're already looking at them.",
          },
          {
            ko: "AI 제안 알림은 이제 광고가 아닌 서비스 알림이라 ‘(광고)’ 표시 없이, 광고 수신 동의 없이도 받아요.",
            en: "AI suggestion alerts are now service notifications, not promotions, so they arrive without opting in to promotional push.",
          },
          {
            ko: "AI 코치 글이 내 기록 숫자와 맞는지 한 번 더 확인해요. AI가 글을 쓰지 못하면 ‘이번 기간 요약’으로 보여 드려요.",
            en: "Coach notes are checked against your numbers. If AI couldn't write one, you'll see “Summary for this period” instead.",
          },
          {
            ko: "전에 받은 리포트도 새 화면으로 열려요. 날마다 끝낸 할 일 막대만 빠져요.",
            en: "Older reports open in the new layout too, just without the daily bars.",
          },
          {
            ko: "VoiceOver·TalkBack이 차트에서 고른 날과 시간의 값을 읽어 줘요.",
            en: "VoiceOver and TalkBack read the values for the day or hour you pick on a chart.",
          },
          {
            ko: "업데이트하면 새 AI 제안과 리포트를 짧게 소개해 드려요. 마이 > 새로운 기능에서 다시 볼 수 있어요.",
            en: "A short tour shows the new AI suggestions and reports after you update. Find it again in Me > What's new.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "다음 리포트가 오전 8시에 온다고 잘못 보이던 문제를 고쳤어요. 주간은 월요일, 월간은 1일 오전 11시 30분으로 보여요.",
            en: "Fixed the next report time showing 8 AM. It now shows 11:30 AM on Monday for weekly reports and on the 1st for monthly ones.",
          },
          {
            ko: "영어로 쓸 때 지운 카테고리가 리포트에 ‘기타’로 보이던 문제를 고쳤어요. 이제 ‘Other’로 보여요.",
            en: "Fixed deleted categories showing as “기타” in English reports. They now say “Other.”",
          },
          {
            ko: "할 일이 아주 많으면 AI 제안을 받지 못하던 문제를 고쳤어요.",
            en: "Fixed AI suggestions not arriving when you have lots of to-dos.",
          },
          {
            ko: "영어로 쓸 때 AI 제안 이유가 ‘1 records’처럼 어색하게 보이던 문제를 고쳤어요.",
            en: "Fixed awkward English suggestion reasons like “1 records.”",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "AI 제안이 최근 2주 기록을 이유로 보여 주고, 바로 분석도 받을 수 있어요.",
        "띄어쓰기나 이모지만 다른 할 일도 하나로 묶어 찾아요.",
        "AI 리포트가 날마다 끝낸 할 일, 시간대 차트, 코치 한마디로 바뀌었어요.",
        "무료로도 이번 주 기록을 보고, AI 제안과 리포트를 예시로 미리 봐요.",
        "AI 제안 알림은 오전 9시에 오고, 설정에서 따로 끌 수 있어요.",
      ],
      en: [
        "AI suggestions show why, and you can get one right away.",
        "To-dos that differ only in spacing or emoji group together.",
        "AI reports show daily progress, hourly charts, and a coach note.",
        "Free plan shows this week's record and sample AI suggestions and reports.",
        "Suggestion alerts arrive at 9 AM, and you can turn AI alerts off in Settings.",
      ],
    },
  },
  {
    version: "1.15.3",
    date: "2026-11-14",
    summary: {
      ko: "친구 알림과 연속 기록이 빠지지 않고, 친구 추가 화면 키보드가 쉽게 내려가요.",
      en: "Friend alerts and streaks stay reliable, and the keyboard closes easily when adding friends.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "친구 요청·응원·콕 알림과 할 일을 끝냈을 때의 연속 기록·달성 알림이 드물게 빠지던 경우가 없도록 다듬었어요.",
            en: "Friend request, cheer, and nudge alerts, plus streak and achievement alerts, no longer go missing in rare cases.",
          },
          {
            ko: "이름을 정하지 않은 친구는 댓글·답글과 댓글 알림에 해시태그로 보여요.",
            en: "Friends without a name now show their hashtag in comments, replies, and comment alerts.",
          },
          {
            ko: "할 일 순서 바꾸기와 친구 찾기가 더 빨라졌어요.",
            en: "Reordering to-dos and finding friends is faster.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "친구 추가 화면에서 빈 곳을 눌러도 키보드가 내려가지 않고, 쓸 수 없는 해시태그에서 완료 키가 반응하지 않던 문제를 고쳤어요.",
            en: "Fixed the keyboard staying open when you tapped outside on Add friend, and the Done key doing nothing for a hashtag that can't be used.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구 요청·응원·콕 알림과 연속 기록·달성 알림이 빠지지 않아요.",
        "할 일 순서 바꾸기와 친구 찾기가 더 빨라졌어요.",
        "이름을 정하지 않은 친구는 댓글과 알림에 해시태그로 보여요.",
        "친구 추가 화면에서 빈 곳을 누르면 키보드가 내려가요.",
      ],
      en: [
        "Friend, cheer, and nudge alerts and streaks no longer go missing.",
        "Reordering to-dos and finding friends is faster.",
        "Unnamed friends show their hashtag in comments and alerts.",
        "Tap outside to close the keyboard when adding friends.",
      ],
    },
  },
  {
    version: "1.15.2",
    date: "2026-11-13",
    summary: {
      ko: "쓰던 글이 그대로 남고, 뒤로 가면 보던 곳으로 돌아와요.",
      en: "Drafts stay put, and Back takes you to where you were.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "iPhone에서 메모 카드나 말로 남긴 메모를 길게 누르면 미리보기와 메뉴가 떠서, 열지 않고 고정하거나 지울 수 있어요.",
            en: "On iPhone, long-press a note card or voice note to preview it, then pin or delete it without opening it.",
          },
          {
            ko: "친구 피드에서 눌러도 반응이 없던 할 일도 열려요. 마이 > 친구 관리에서 친구를 누르면 그 피드로 가고, iPhone에서는 길게 눌러 콕 같은 메뉴를 써요.",
            en: "To-dos in a friend's feed that did nothing when tapped now open. Tap a friend in Me > Manage friends to see their feed, or long-press on iPhone for quick actions like a nudge.",
          },
          {
            ko: "VoiceOver·TalkBack 동작 메뉴로 메모를 고정하거나 지우고, 말로 남긴 메모도 지울 수 있어요.",
            en: "With VoiceOver or TalkBack, use the actions menu to pin or delete notes and delete voice notes.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "메모·할 일·하위 할 일·카테고리·이름을 고치는 중에 새 내용이 들어와도 쓰던 글이 덮이지 않아요.",
            en: "While you edit a note, to-do, checklist item, category, or your name, incoming updates no longer overwrite what you're typing.",
          },
          {
            ko: "다른 탭·알림·알림함에서 연 화면도 뒤로 가면 보던 곳으로 돌아와요. 알림함은 지금 보던 탭 안에서 열려요.",
            en: "Back returns you to where you were, even from screens opened from another tab, a notification, or Notifications. Notifications open inside your current tab.",
          },
          {
            ko: "알림·링크로 연 할 일과 메모는 뒤로 가면 피드나 메모 탭으로 가요. 앱이 꺼져 있어도 알맞은 화면이 한 번만 열려요.",
            en: "Back from a to-do or note opened by a notification or link goes to your feed or notes. Notifications open the right screen just once, even when the app is closed.",
          },
          {
            ko: "날씨를 보다가 알림이나 위젯으로 다시 열어도 날씨 화면이 하나 더 쌓이지 않아요.",
            en: "Reopening weather from a notification or widget while you're viewing it no longer opens a second weather screen.",
          },
          {
            ko: "초대 링크로 가입하거나 로그인하면 피드를 거치지 않고 바로 초대로 가요. 받아들인 뒤 뒤로 가도 끝난 초대로 돌아가지 않아요.",
            en: "Signing up or logging in from an invite link goes straight to the invite, and Back after accepting skips the finished invite.",
          },
          {
            ko: "안내 메시지가 열린 시트에 가려지지 않고 VoiceOver도 읽어 줘요. 할 일을 저장하며 시트가 닫히면 완료 안내는 한 번만 떠요.",
            en: "Status messages show above open sheets and VoiceOver reads them. Saving a to-do shows its confirmation just once.",
          },
          {
            ko: "지우기·차단·친구 끊기가 실패하면 확인 창이 남아 다시 시도할 수 있어요. 알림 권한 창에서 고르면 기다리지 않고 바로 넘어가요.",
            en: "If deleting, blocking, or removing a friend fails, the dialog stays open so you can retry. After you allow or deny notifications, the app moves on right away.",
          },
          {
            ko: "로그아웃·탈퇴하거나 로그인이 만료되면 기기에 남은 아이두 알림을 지우고, 탈퇴하면 이 기기의 계정 기록도 지워요.",
            en: "Signing out, deleting your account, or an expired sign-in clears Aido notifications from your device. Deleting your account also clears its records here.",
          },
          {
            ko: "달력·위젯·주간 성취·AI 리포트가 그 주 가운데 날의 달로 주차를 세요. 그래서 리포트도 ‘49주차’ 대신 ‘12월 1주차’처럼 보여요.",
            en: "The calendar, widget, weekly achievements, and AI reports now number weeks by the month of the week's middle day. Some weeks get a new name, and reports say “Week 1 of Dec” instead of “Week 49.”",
          },
          {
            ko: "할 일 날짜에 ‘내일’, 알림·댓글 시간에 ‘어제’가 보여요. 피드 달력은 달을 넘겨도 점이 바로 보여요.",
            en: "To-do dates say “Tomorrow,” notification and comment times say “yesterday,” and feed calendar dots appear right away when you change months.",
          },
          {
            ko: "초대·배지 화면 일부만 못 불러와도 그 부분만 다시 시도해요. 프리미엄 비교표와 요금제 카드는 불러오는 중에도 화면이 밀리지 않아요.",
            en: "If part of the invite or badge screen fails to load, retry just that part. The Premium table and plan card no longer jump while loading.",
          },
          {
            ko: "문제가 생기면 원인에 맞게 안내하고, 오류 화면의 ‘문의하기’는 필요한 정보가 담긴 초안으로 열려요.",
            en: "Error messages match what went wrong, and Contact us on an error screen opens a draft with the details we need.",
          },
          {
            ko: "가입·재설정·변경 때 비밀번호에 쓸 수 없는 문자가 있으면 이유와 쓸 수 있는 특수문자(@$!%*#?&)를 알려 드려요. 재설정 중 코드가 틀리면 코드 단계로 돌아가요.",
            en: "On sign-up, reset, and change, if your password has a character that can't be used, you'll see why and the allowed symbols (@$!%*#?&). If the code fails at the last reset step, you go back to fix it.",
          },
          {
            ko: "초대 코드에 헷갈리는 글자(0·O·1·I·L)나 쓸 수 없는 글자를 넣으면 틀린 칸을 바로 알려 드려요.",
            en: "Invite code boxes flag easy-to-confuse (0, O, 1, I, L) or invalid characters right away.",
          },
          {
            ko: "메모 AI 정리를 기다리다 다른 화면으로 가도 결과가 갑자기 뜨지 않아요. 그 메모에서 다시 누르면 횟수 차감 없이 열려요.",
            en: "Leaving while AI organizes a note no longer pops the result up over you. Tap again on that note to open it without using another try.",
          },
          {
            ko: "iPadOS 26 이상에서 사이드바를 열어도 목록이 좁아지지 않고, Mac·iPad에서 창 크기를 바꿀 때 달력이 매끄러워요.",
            en: "On iPadOS 26 or later, the sidebar no longer squeezes the list, and the calendar resizes smoothly on Mac and iPad.",
          },
          {
            ko: "날씨 장면과 녹음 화면을 오래 켜 둬도 가볍고, 메모 카드가 옆에서 날아 들어오지 않아요. 메모리가 적은 Android에서는 아지랑이 효과만 꺼요.",
            en: "Weather scenes and the voice recorder stay light when left on, and note cards no longer fly in from the side. Low-memory Android devices skip only the heat-haze effect.",
          },
          {
            ko: "아이콘이 앱 글꼴 크기를 따라 커지고, 스크린리더가 주 화살표를 ‘이전 주’·‘다음 주’로 읽어요. 반복 효과는 다른 앱으로 넘어가거나 동작 줄이기를 켜면 멈춰요.",
            en: "Icons scale with the app's font size, screen readers call the week arrows “Previous week” and “Next week,” and looping animations pause with Reduce Motion or in the background.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할 일에 쓰던 댓글이 앱을 다시 열면 사라지던 문제를 고쳤어요.",
            en: "Fixed comment drafts on to-dos disappearing after reopening the app.",
          },
          {
            ko: "저장이 늦어 다시 누르면 메모가 두 개 생기던 문제를 고쳤어요.",
            en: "Fixed a note being created twice when you saved again after a slow save.",
          },
          {
            ko: "오래 쉬었다 열면 로딩에서 멈추던 문제를 고쳤어요. 서버 응답이 늦으면 다시 시도 화면을 보여 드려요.",
            en: "Fixed screens stuck loading after a long break. If our server is slow, you'll see a retry screen.",
          },
          {
            ko: "계정을 바꾼 직후 결제가 이전 계정에 잡힐 수 있던 문제를 고쳤어요. 결제·복원·완료를 여러 번 눌러도 한 번만 처리돼요.",
            en: "Fixed purchases right after switching accounts possibly going to the previous account. Repeated taps on purchase, restore, or Done now count once.",
          },
          {
            ko: "Android에서 카카오·구글·네이버 로그인 화면이 두 번 뜨거나, 설정에서 계정을 연결하면 피드로 넘어가던 문제를 고쳤어요. 알림·초대 링크로 들어와 로그인하면 바로 그 화면이 열려요.",
            en: "Fixed Kakao, Google, and Naver sign-in on Android showing twice, and linking an account in Settings jumping to the feed. Signing in from a notification or invite link now takes you straight there.",
          },
          {
            ko: "시트나 할 일을 연 채 Android 위젯을 누르면 화면이 겹겹이 쌓이던 문제를 고쳤어요.",
            en: "Fixed screens piling up when you tapped an Android widget with a sheet or to-do open.",
          },
          {
            ko: "구독이 끝난 직후 AI 제안을 열면 다른 화면에 잠깐 프리미엄으로 보이던 문제를 고쳤어요.",
            en: "Fixed Premium briefly showing elsewhere after your subscription ended and you opened AI suggestions.",
          },
          {
            ko: "인증 코드를 다시 보낼 때 남은 시간이 보이지 않던 문제를 고쳤어요.",
            en: "Fixed the countdown not showing when resending a verification code.",
          },
          {
            ko: "서머타임이 시작되는 날이나 기기와 앱의 시간대가 다를 때 고른 시각이 바뀌던 문제를 고쳤어요.",
            en: "Fixed a chosen time shifting when daylight saving time starts or your device and the app use different time zones.",
          },
          {
            ko: "고치던 메모를 고정하면 풀려 보이거나, 하위 할 일 하나가 실패하면 다른 체크까지 되돌아가거나, 받아쓴 하위 할 일이 사라지던 문제를 고쳤어요.",
            en: "Fixed a note looking unpinned when pinned mid-edit, other checklist items reverting when one failed to save, and dictated checklist text getting lost.",
          },
          {
            ko: "콕·신고가 두 번 보내지거나 친구를 끊은 뒤 목록이 중간에 끝나던 문제를 고쳤어요. 할 일 상세에서 차단하면 바로 볼 수 없다고 알려 드려요.",
            en: "Fixed double taps sending a nudge or report twice, and the friends list ending early after removing a friend. Blocking from a to-do now shows right away that it's unavailable.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "댓글과 고치던 글이 앱을 다시 열어도 그대로 남아요.",
        "다른 탭이나 알림에서 연 화면도 뒤로 가면 보던 곳으로 돌아와요.",
        "오래 쉬었다 열어도 화면이 로딩에서 멈추지 않아요.",
        "iPhone에서 메모를 길게 눌러 바로 고정하거나 지울 수 있어요.",
        "계정을 바꾼 직후 결제가 이전 계정에 잡히던 문제를 고쳤어요.",
      ],
      en: [
        "Comment drafts and edits stay after reopening the app.",
        "Back returns you to where you were, even from another tab or a notification.",
        "No more endless loading after a long break.",
        "On iPhone, long-press a note to pin or delete it.",
        "Fixed purchases going to a previous account after switching.",
      ],
    },
  },
  {
    version: "1.15.1",
    date: "2026-11-11",
    summary: {
      ko: "카테고리를 지울 때 안의 할 일을 옮길지 고르고, 알림은 제시간에 와요.",
      en: "Choose what happens to a category's to-dos when you delete it, and reminders arrive on time.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "카테고리를 지울 때 안의 할 일을 옮길지, 함께 지울지 골라요. 지우기 전엔 할 일·반복 할 일 개수를, 지운 뒤엔 결과를 알려 드려요.",
            en: "When deleting a category, move its to-dos to another category or delete them too. You'll see how many to-dos and repeats it has first, and what happened after.",
          },
          {
            ko: "할 일이 없는 카테고리는 확인 한 번으로 지워지고, 마지막 남은 카테고리는 왜 지울 수 없는지 알려 드려요.",
            en: "Empty categories delete after one confirmation, and your last category explains why it can't be deleted.",
          },
          {
            ko: "마이 > 새로운 기능에서 지난 업데이트를 버전·날짜별로 다시 보고, 맨 아래 ‘전체 업데이트 내역’에서 모든 기록을 봐요.",
            en: "Me > What's new lists past updates by version and date, with All updates at the bottom for the full history.",
          },
          {
            ko: "새로운 기능의 말로 할 일 만들기 카드를 누르면 오늘 화면에서 바로 시작해요.",
            en: "Tap the Speak to add card in What's new to start right from today's screen.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "같은 시각에 알림이 몰려도 시각을 정한 할 일 알림은 늦거나 빠지지 않고 와요. 할 일을 저장하면 알림 예약도 함께 저장돼 서버에 문제가 생겨도 사라지지 않아요.",
            en: "Every timed to-do gets its reminder on time, even when many are due at once. A to-do's reminder is saved with it, so it isn't lost if something goes wrong on our end.",
          },
          {
            ko: "야간 알림을 꺼 둬도 시각을 정한 할 일 알림과 프리미엄 아침·저녁 알림은 와요. 혜택·친구 알림의 야간 설정은 그대로예요.",
            en: "Reminders for timed to-dos and Premium morning and evening reminders now arrive even with night notifications off. Night settings for offers and friends stay the same.",
          },
          {
            ko: "이미 시작한 할 일에는 ‘10분 뒤 시작’ 알림을 보내지 않고, 휴대폰을 다시 켜도 지난 알림이 쏟아지지 않아요.",
            en: "No “starts in 10 minutes” reminder once a to-do has started, and past reminders don't pile up when your phone turns back on.",
          },
          {
            ko: "서버 업데이트 중 울려야 했던 알림은 끝나는 대로 보내고, 15분 넘게 늦은 알림은 보내지 않아요. 소식을 보내는 중에도 할 일 알림이 먼저 가요.",
            en: "Reminders due during a server update are sent once it's back and skipped if more than 15 minutes late. Your reminders go first even while news is going out.",
          },
          {
            ko: "로그아웃했거나 오래 접속하지 않아 로그인이 만료된 기기에는 알림이 가지 않아요.",
            en: "Devices that are signed out, or whose sign-in has expired, no longer get notifications.",
          },
          {
            ko: "앱 아이콘 배지가 다른 기기에서 읽은 알림까지 반영해 읽지 않은 수와 같아지고, 알림을 한 번 누르면 화면도 한 번만 열려요.",
            en: "The app icon badge matches your unread notifications, including ones read on other devices, and a notification opens only once.",
          },
          {
            ko: "할 일·하위 할 일·카테고리 변경이 바로 보이고, 저장에 실패하면 그 변경만 되돌려요. 카테고리 시트도 더 빨리 닫혀요.",
            en: "Changes to to-dos, checklist items, and categories show instantly. If one fails to save, only that change is undone, and the category sheet closes faster.",
          },
          {
            ko: "접은 iPhone Duo나 iPhone SE처럼 낮은 화면에서도 키보드 위로 카테고리 이름·색·확인 버튼이 함께 보여요.",
            en: "On short screens like a folded iPhone Duo or iPhone SE, the category sheet keeps the name, colors, and confirm button above the keyboard.",
          },
          {
            ko: "Android 태블릿·접는 폰은 큰 화면에서 가로로 쓰고, 접거나 펴도 보던 화면이 남아요. iPad에서는 사이드바를 열어도 목록이 좁아지지 않아요.",
            en: "Android tablets and foldables support landscape on the big screen and keep your place when you fold or unfold. On iPad, the sidebar no longer squeezes the list.",
          },
          {
            ko: "영어나 큰 글자에서는 달력 머리가 두 줄로 나뉘어 버튼이 겹치지 않아요.",
            en: "With English or large text, the calendar header splits into two rows so buttons don't overlap.",
          },
          {
            ko: "여러 날에 걸친 할 일을 기간 안의 모든 날에 세요. 그래서 연속 기록·완료율·주간 성취 숫자가 달라질 수 있어요.",
            en: "Multi-day to-dos now count on every day in their range, so your streak, completion rate, and weekly achievements may change.",
          },
          {
            ko: "카테고리 이름·색·순서를 바꾸면 친구 화면에도 바로 반영돼요.",
            en: "Category name, color, and order changes show up right away for friends.",
          },
          {
            ko: "매일 오는 AI 제안이 해외에서도 그곳의 아침에 와요.",
            en: "Daily AI suggestions arrive in your local morning, even abroad.",
          },
          {
            ko: "오류 화면에서 ‘다시 시도’를 눌러도 로그인이 풀리지 않고, 서버가 잠시 응답하지 않으면 기다리지 않고 바로 알려 드려요.",
            en: "Try again on the error screen no longer signs you out, and if our server is briefly unavailable, you're told right away.",
          },
          {
            ko: "계정을 지키려고 로그인과 서버 연결 확인을 더 꼼꼼하게 했어요.",
            en: "Sign-ins and server connections are checked more strictly to keep your account safe.",
          },
          {
            ko: "알림·리포트처럼 정해진 시간에 도는 작업이 멈추면 바로 알아채고 고칠 수 있게 했어요.",
            en: "Scheduled work like reminders and reports is now monitored, so problems get fixed faster.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할 일을 완료하자마자 ‘고마움 현황을 불러오지 못했어요’가 뜨던 문제를 고쳤어요.",
            en: "Fixed “Couldn't load thanks” appearing right after completing a to-do.",
          },
          {
            ko: "하위 할 일을 만들자마자 순서를 바꾸면 저장되지 않던 문제를 고쳤어요.",
            en: "Fixed a new checklist item's order not saving when you moved it right away.",
          },
          {
            ko: "나를 끊은 친구의 피드를 열면 오류가 보이던 문제를 고쳤어요. 이제 안내와 ‘내 피드로 가기’ 버튼이 보여요.",
            en: "Fixed an error when opening the feed of a friend who removed you. You'll see a short note and a Go to my feed button instead.",
          },
          {
            ko: "매일 AI 제안과 AI 리포트가 한동안 오지 않던 문제를 고쳤어요.",
            en: "Fixed daily AI suggestions and AI reports not arriving for a while.",
          },
          {
            ko: "알림을 허용했는데도 어느 순간 알림이 끊기던 문제를 고쳤어요.",
            en: "Fixed notifications stopping even though they were allowed.",
          },
          {
            ko: "프리미엄을 시작하거나 바꾼 직후 잠깐 이전 요금제로 보이던 문제를 고쳤어요.",
            en: "Fixed your previous plan briefly showing right after starting or changing Premium.",
          },
          {
            ko: "메모를 고치며 순서를 바꾸거나 콕에 답장하는 순간 다른 변경과 겹치면 내용이 사라지던 문제를 고쳤어요.",
            en: "Fixed note edits or nudge replies that could be lost when another change happened at the same moment.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "카테고리를 지울 때 안의 할 일을 옮길지, 함께 지울지 고를 수 있어요.",
        "마이 > 새로운 기능에서 지난 업데이트를 버전별로 다시 봐요.",
        "할 일 알림이 한꺼번에 몰려도 제시간에 와요.",
        "할 일·카테고리 변경이 바로 보이고, 실패하면 그 변경만 되돌려요.",
        "접는 폰·태블릿과 큰 글자에서 화면이 더 알맞게 보여요.",
      ],
      en: [
        "Deleting a category? Move its to-dos or delete them too.",
        "Past updates are now in Me > What's new.",
        "Reminders arrive on time, even at busy times.",
        "Changes show instantly, and only a failed change is undone.",
        "Better layouts on foldables, tablets, and large text.",
      ],
    },
  },
  {
    version: "1.15.0",
    date: "2026-11-10",
    summary: {
      ko: "말하면 AI가 할 일을 나눠 주고, 회의·수업 녹음은 요약해 줘요.",
      en: "Talk, and AI makes your to-dos. Record a meeting or class, and AI sums it up.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "말로 할 일 만들기가 새로워졌어요. 마이크를 누르고 길게 말하면 AI가 날짜·시간·반복·카테고리·나만 보기까지 채운 할 일 여러 개로 나눠요.",
            en: "Speak to add is all new. Tap the mic and talk as long as you like, and AI splits it into to-dos with dates, times, repeats, categories, and privacy filled in.",
          },
          {
            ko: "추가하기 전에 원하는 할 일만 체크하고, 눌러서 제목·날짜·시간·반복을 고쳐요. 이미 있는 할 일은 ‘이미 있어요’로 알려 주고, 버튼을 누르기 전엔 저장되지 않아요.",
            en: "Pick before you add: check the ones you want and tap to edit the title, date, time, or repeat. Existing to-dos are marked, and nothing saves until you tap the button.",
          },
          {
            ko: "말로 메모하기가 생겼어요. 회의·수업을 녹음하며 순간을 표시하면 AI가 요약·핵심 포인트·할 일을 찾고, 핵심 포인트부터 다시 들을 수 있어요.",
            en: "New Voice notes. Record a meeting or class, mark key moments, and AI finds a summary, key points, and to-dos. Tap a key point to listen from there.",
          },
          {
            ko: "녹음 파일은 기기에만 저장하고 아이두 서버로 보내지 않아요. 30일 뒤 자동으로 지워지고, 마이 > 녹음 저장 공간에서 언제든 지울 수 있어요.",
            en: "Recordings stay on your device and aren't sent to Aido's servers. They're deleted after 30 days, or anytime in Me > Recording storage.",
          },
          {
            ko: "메모에서 ‘AI로 할 일 나누기’를 누르면 적어 둔 글을 할 일로 정리해 골라 추가할 수 있어요.",
            en: "Tap “Split into to-dos with AI” on a note to turn it into to-dos you can pick from.",
          },
          {
            ko: "연간 구독을 처음 시작하면 2주 무료 체험을 받을 수 있어요(스토어가 정한 대상 계정). 끝나기 3일 전에 알려 드려요.",
            en: "New yearly subscribers can get 2 weeks free (accounts the store marks as eligible), with a reminder 3 days before it ends.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "반복을 매일·평일·매주·격주·매월로 정하고 기간을 두거나 계속 반복해요. 고치거나 지울 땐 이 할 일만·이후 할 일까지·반복 전체 중에 골라요.",
            en: "Repeat daily, on weekdays, weekly, every other week, or monthly, for a set period or with no end. Edit or delete Just this one, This and following, or All in this repeat.",
          },
          {
            ko: "프리미엄 화면이 새로워졌어요. 혜택을 넘겨 보고 무료와 표로 비교하며, 결제 뒤에는 시작 화면이 안내해요.",
            en: "The Premium screen is new: swipe through benefits, compare Free and Premium in a table, and get a welcome screen after you subscribe.",
          },
          {
            ko: "AI를 쓰는 곳에 이번 달 남은 횟수가 보이고, 다 쓰면 사용량과 초기화 날짜를 알려 드려요. 실패하면 차감하지 않고, 할 일 추가·완료는 무료예요.",
            en: "AI features show uses left this month, plus your usage and reset date when you run out. Failed attempts don't count, and adding and completing to-dos stays free.",
          },
          {
            ko: "무료는 AI 할 일 만들기 월 10회, 말로 메모하기 월 3회(회당 3분)예요. 프리미엄은 각각 월 1,000회, 월 100회(회당 30분)까지 써요.",
            en: "Free: 10 AI to-dos and 3 voice notes (up to 3 minutes each) a month. Premium: up to 1,000 AI to-dos and 100 voice notes (up to 30 minutes each).",
          },
          {
            ko: "연간 구독은 갱신 7일 전에 알려 드려요.",
            en: "Yearly plans get a reminder 7 days before renewal.",
          },
          {
            ko: "알림은 가입 직후 한 번만, 위치는 날씨를 볼 때만 물어요. 알림이 꺼진 채 할 일 시간을 정하면 그 자리에서 알려 드려요.",
            en: "Aido asks for notifications once at sign-up and for location only when you check the weather. If notifications are off when you set a to-do time, you'll be told right there.",
          },
          {
            ko: "iPad·접는 폰·펼친 iPhone Duo처럼 넓은 화면에서는 마이 탭이 메뉴와 화면 두 칸으로 보여요.",
            en: "On wide screens like iPad, foldables, and an unfolded iPhone Duo, the Me tab shows the menu and screen side by side.",
          },
          {
            ko: "해외에서도 할 일 시간이 그대로예요. 한국에서 오전 10시로 정한 할 일은 그곳에서도 오전 10시에 알려 드려요.",
            en: "To-do times stay put abroad: a 10 AM to-do set in Korea still reminds you at 10 AM local time.",
          },
          {
            ko: "읽지 않은 알림이 있으면 채운 종과 주황 점으로 알려 줘요.",
            en: "A filled bell with an orange dot shows unread notifications.",
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
            en: "Fixed notifications opening the to-do tab instead of the right screen when the app was closed.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "말로 할 일 만들기: 말하면 AI가 할 일로 나누고, 저장 전에 골라요.",
        "말로 메모하기: 녹음을 요약·핵심 포인트·할 일로 정리해요.",
        "반복 할 일을 이 할 일만, 이후까지, 전체 중에 골라 고쳐요.",
        "연간 구독을 처음 시작하면 2주 무료 체험을 받을 수 있어요.",
        "프리미엄은 AI 할 일 만들기를 월 1,000회까지 써요.",
      ],
      en: [
        "Speak to add: AI drafts to-dos you pick before saving.",
        "Voice notes: summaries, key points, and to-dos from recordings.",
        "Edit just one repeat, the ones after it, or all.",
        "New yearly subscribers can get 2 weeks free.",
        "Up to 1,000 AI to-dos a month on Premium.",
      ],
    },
  },
  {
    version: "1.14.2",
    date: "2026-11-04",
    summary: {
      ko: "꺼 둔 알림을 홈과 설정에서 쉽게 다시 켜고, 알림이 더 잘 도착해요.",
      en: "Turn notifications back on easily from Home and Settings, and reminders arrive more reliably.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "알림이 꺼져 있으면 홈에 안내 카드가 보이고, 알림 설정 맨 위에서 기기 권한을 확인해 ‘설정 열기’로 바로 가요. 켜고 돌아오면 바로 반영돼요.",
            en: "If notifications are off, Home shows a card, and Notification settings shows your device permission with Open Settings. Turn it on and come back to see it update right away.",
          },
          {
            ko: "앱 푸시를 꺼 뒀다면 홈에서 바로 켤 수 있어요. 마케팅 알림 배너와는 겹치지 않아요.",
            en: "If app push is off, turn it on right from Home, without overlapping the marketing notification banner.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "알림 권한을 처음 물을 때 왜 필요한지 먼저 알려 드리고, 원할 때만 시스템 권한 창을 띄워요.",
            en: "Before the first notification request, the app explains why, and shows the system prompt only if you want it.",
          },
          {
            ko: "리마인더와 알림이 더 잘 도착해요. 앱을 다시 열거나 기기를 바꾸거나 재설치해도 수신 정보가 맞춰지고, 로그아웃한 기기로는 가지 않아요.",
            en: "Reminders and notifications arrive more reliably. Your settings sync when you reopen, switch devices, or reinstall, and signed-out devices no longer get notifications.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iOS 16.4~17 일부 기기에서 앱을 열자마자 꺼지던 문제를 고쳤어요.",
            en: "Fixed the app closing right after launch on some iOS 16.4–17 devices.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "꺼 둔 알림을 홈 안내 카드와 알림 설정에서 쉽게 다시 켜요.",
        "알림 권한을 묻기 전에 왜 필요한지 먼저 알려 드려요.",
        "리마인더와 알림이 더 잘 도착해요.",
        "iOS 16.4~17 일부 기기에서 앱이 바로 꺼지던 문제를 고쳤어요.",
      ],
      en: [
        "Turn notifications back on easily from the Home card and Notification settings.",
        "The app explains why notifications help before asking.",
        "Reminders and notifications arrive more reliably.",
        "Fixed the app closing right after launch on some iOS 16.4–17 devices.",
      ],
    },
  },
  {
    version: "1.14.1",
    date: "2026-11-04",
    summary: {
      ko: "댓글과 답글을 한 화면에서 보고, 날씨는 18가지 장면으로 움직여요.",
      en: "Comments and replies live on one screen, and weather comes alive in 18 scenes.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일 상세 한 화면에서 댓글과 답글을 모두 봐요. 답글은 그 자리에서 펼치고, 답글의 답글도 같은 묶음에 @이름으로 붙어요.",
            en: "See every comment and reply on the to-do's detail screen. Replies open in place, and replies to replies join the thread with an @name.",
          },
          {
            ko: "댓글을 두 번 톡톡 누르면 하트가 팡 터지며 좋아요가 남아요. 처음 한 번은 살짝 알려 드려요.",
            en: "Double-tap a comment and a heart pops as your like lands. A quick tip shows the first time.",
          },
          {
            ko: "⋯ 버튼을 누르거나 댓글을 길게 눌러 수정·복사·삭제·신고·차단을 한곳에서 해요.",
            en: "Tap ⋯ or long-press a comment to edit, copy, delete, report, or block, all in one place.",
          },
          {
            ko: "날씨 배경이 비·눈·우박·천둥번개·안개·무더위·강추위 등 18가지 장면으로 움직이고, 낮엔 해가 밤엔 달이 떠요.",
            en: "The weather background moves through 18 lifelike scenes, from rain, snow, and hail to thunderstorms, fog, heat, and freezing cold, with the sun by day and the moon by night.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "답글 입력창이 키보드 바로 위에 붙고, 답할 댓글이 가려지지 않게 올라와요.",
            en: "The reply box sits right above the keyboard, and the comment you're replying to stays in view.",
          },
          {
            ko: "댓글 알림을 누르면 그 댓글 위치로 열리고 잠깐 강조해요.",
            en: "Comment notifications open right at the comment and highlight it briefly.",
          },
          {
            ko: "영하 기호와 °를 다듬고 큰 제목엔 도시 이름만 보여요. ‘연무’는 ‘뿌연 하늘’, ‘뇌우’는 ‘천둥번개’처럼 쉬운 이름으로 바꿨어요.",
            en: "Below-zero temperatures and ° look cleaner, the big title shows just the city name, and weather names are easier to read, like “Freezing” instead of “Frigid.”",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일 댓글과 답글을 한 화면에서 보고, 답글은 그 자리에서 펼쳐요.",
        "댓글을 두 번 톡톡 누르면 하트가 팡 터지며 좋아요가 남아요.",
        "댓글 알림을 누르면 그 댓글로 바로 가요.",
        "날씨가 18가지 장면으로 움직이고, 낮엔 해가 밤엔 달이 떠요.",
      ],
      en: [
        "See comments and replies on one screen, with replies opening in place.",
        "Double-tap a comment and a heart pops as your like lands.",
        "Comment notifications take you straight to the comment.",
        "Weather moves through 18 lifelike scenes, with the sun by day and the moon by night.",
      ],
    },
  },
  {
    version: "1.14.0",
    date: "2026-11-03",
    summary: {
      ko: "날씨가 새로워졌어요. 해외에서도 보고, 비나 더위와 겹친 할 일은 한 번에 옮겨요.",
      en: "Weather is all new: check it anywhere, and move to-dos that clash with rain or heat in one go.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "날씨 화면이 새로워졌어요. 해외에서도 지금 있는 곳의 날씨를 움직이는 하늘과 함께 시간별(24시간)·10일 예보로 봐요.",
            en: "The weather screen is all new. See local weather even abroad, with a moving sky and 24-hour and 10-day forecasts.",
          },
          {
            ko: "지원 지역에서는 다음 1시간 비 소식을 분 단위로 알려 줘요. 체감 온도·자외선·바람·습도·해와 달·대기질(한국)·기상 특보도 한 화면에 있어요.",
            en: "In supported areas, see rain for the next hour minute by minute. Feels-like temperature, UV, wind, humidity, sun and moon, air quality (Korea), and weather alerts are all on one screen.",
          },
          {
            ko: "‘아이두 브리핑’이 오늘 시간을 정한 할 일과 날씨를 맞춰 알려 줘요. 브리핑에서 바로 체크·수정하고, 제안을 눌러 할 일을 추가해요.",
            en: "Aido briefing matches today's timed to-dos with the weather. Check off or edit to-dos right there, or tap a suggestion to add one.",
          },
          {
            ko: "비나 더위와 겹친 할 일은 날씨가 나은 시간을 추천받아 한 번에 옮기고, 되돌릴 수도 있어요.",
            en: "Move to-dos that clash with rain or heat to a better suggested time all at once, and undo if you change your mind.",
          },
          {
            ko: "아침·저녁 날씨 알림을 해외에서도 받고, 겹친 할 일이 있으면 알림에서 바로 시간을 옮겨요.",
            en: "Morning and evening weather notifications now work abroad, and you can move clashing to-dos right from the notification.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면이 다크 모드·큰 글씨·태블릿·폴더블에 맞춰 보이고, 새로고침 버튼으로 바로 새로 불러와요.",
            en: "The weather screen fits dark mode, larger text, tablets, and foldables, and a refresh button updates it right away.",
          },
          {
            ko: "인터넷이 끊기면 위쪽에 안내가 뜨고 마지막으로 본 할 일과 날씨가 남아요. 다시 연결되면 새로 불러오고, 오프라인에서도 로그아웃할 수 있어요.",
            en: "When you're offline, a notice appears and your last-seen to-dos and weather stay on screen. They refresh once you're back, and you can sign out offline.",
          },
          {
            ko: "위치는 날씨에만 쓰고, 정확한 위치 대신 약 5km 단위로 묶어 날씨를 가져와요.",
            en: "Your location is used only for weather, looked up by a roughly 5 km area instead of your exact spot.",
          },
          {
            ko: "스토어에 문제가 있으면 구독 화면에서 안내를 보고 바로 문의할 수 있어요.",
            en: "If the store has a problem, the Subscription screen explains it and lets you contact us right away.",
          },
          {
            ko: "친구 초대 안내를 닫을 수 있고, 시작하기 체크리스트의 보상 표시를 깔끔하게 다듬었어요.",
            en: "You can dismiss the friend invite banner, and rewards on the getting-started checklist are easier to read.",
          },
          {
            ko: "알림 문구를 더 다정한 말투로 다듬었어요.",
            en: "Notifications sound warmer and friendlier.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨가 새로워졌어요. 해외에서도 시간별·10일 예보를 봐요.",
        "아이두 브리핑이 오늘 할 일과 날씨를 맞춰 알려 줘요.",
        "비나 더위와 겹친 할 일은 한 번에 옮기고 되돌릴 수 있어요.",
        "인터넷이 끊겨도 마지막으로 본 할 일과 날씨를 보여 줘요.",
      ],
      en: [
        "All-new weather with 24-hour and 10-day forecasts, even abroad.",
        "Aido briefing matches today's to-dos with the weather.",
        "Move to-dos that clash with rain or heat in one go, and undo anytime.",
        "Your last-seen to-dos and weather stay visible offline.",
      ],
    },
  },
  {
    version: "1.13.1",
    date: "2026-11-02",
    summary: {
      ko: "해외에 있거나 시간대를 바꿔도 할 일 날짜가 정확하게 보여요.",
      en: "To-do dates stay accurate when you travel or change time zones.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "해외에 있거나 기기 시간대를 바꿔도 할 일 날짜가 정확하게 보여요.",
            en: "To-do dates stay accurate when you travel or change your device's time zone.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["해외에 있거나 기기 시간대를 바꿔도 할 일 날짜가 정확하게 보여요."],
      en: [
        "To-do dates stay accurate when you travel or change your device's time zone.",
      ],
    },
  },
  {
    version: "1.13.0",
    date: "2026-10-27",
    summary: {
      ko: "초대 링크로 친구를 부르면 친구와 나 모두 프리미엄 7일을 받을 수 있어요. 신고·차단도 생겼어요.",
      en: "Invite friends with a link, and you can both earn 7 days of Premium. You can now report and block, too.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "초대 링크를 카카오톡이나 다른 앱으로 보내요. 새로 가입한 친구는 바로 친구가 되고 프리미엄 7일을 받아요.",
            en: "Send an invite link on KakaoTalk or any app. A friend who signs up becomes your friend right away and gets 7 days of Premium.",
          },
          {
            ko: "초대한 친구가 2일 동안 할 일을 끝내면 나는 프리미엄 7일을 받고 친구를 1명 더 추가할 수 있어요. ‘발자국 모으기’에서 현황을 보고 기다리는 친구에게 콕으로 응원해요.",
            en: "When a friend you invited completes to-dos on 2 days, you get 7 days of Premium and can add 1 more friend. Track it in “Collect paw prints” and nudge friends who are still on their way.",
          },
          {
            ko: "불편한 할 일·댓글·콕·응원은 신고하고 그 사람을 차단할 수 있어요. 내 할 일에 달린 댓글은 직접 지워요.",
            en: "Report to-dos, comments, nudges, or cheers that bother you, and block the person. You can also delete comments on your own to-dos.",
          },
          {
            ko: "AI에 메모나 할 일을 보내기 전에 동의를 받아요. 설정에서 언제든 바꿀 수 있어요.",
            en: "Aido asks for your consent before sending notes or to-dos to AI. Change it anytime in Settings.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 ‘내일 오후 3시’, ‘다음 주 금요일’ 같은 날짜를 더 정확히 알아듣고, 긴 메모는 할 일 5개까지 나눠 만들어요.",
            en: "AI understands dates like “tomorrow at 3 PM” or “next Friday” more accurately, and turns long notes into up to 5 to-dos.",
          },
          {
            ko: "위젯이 자정이 지나면 앱을 열지 않아도 새 날짜로 바뀌고, 기기 언어로 보여요.",
            en: "Widgets switch to the new day after midnight without opening the app, and follow your device language.",
          },
          {
            ko: "주간 성취와 AI 리포트에 ‘10월 19일 ~ 10월 25일’처럼 날짜 범위가 보여요.",
            en: "Weekly achievements and AI reports show the date range, like “Oct 19 – Oct 25.”",
          },
          {
            ko: "구독 화면에서 초대 보상으로 받은 프리미엄 기간을 확인해요. 구독 중에 받은 보상은 구독이 끝난 뒤 이어서 시작해요.",
            en: "See your reward Premium on the Subscription screen. Rewards earned while subscribed start after your subscription ends.",
          },
          {
            ko: "콕 고마움 카드·친구 목록·댓글 화면을 다듬었고 키보드가 버튼을 가리지 않아요. 탭 아이콘은 고양이 귀 모양이 됐어요.",
            en: "The nudge thank-you card, friends list, and comments are more polished, and the keyboard no longer covers buttons. Tab icons now have cat ears.",
          },
          {
            ko: "초대한 친구가 첫날 할 일을 끝내면 알려 드려요. 홈의 새 기능 카드는 닫을 수 있어요.",
            en: "You'll hear when a friend you invited finishes their first day, and you can dismiss the what's-new card on Home.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "달력이 몇 년 뒤로 넘어가거나 서머타임에 반복 할 일이 빠지던 문제를 고쳤어요.",
            en: "Fixed the calendar jumping years ahead and repeating to-dos going missing when daylight saving time begins.",
          },
          {
            ko: "고양이 프로필이 비어 보이거나 위젯 날짜가 잘리던 문제를 고쳤어요.",
            en: "Fixed blank cat profiles and cut-off widget dates.",
          },
          {
            ko: "알림이나 링크를 눌렀을 때 엉뚱한 화면이 열리거나 오류가 보이던 문제를 고쳤어요.",
            en: "Fixed notifications and links opening the wrong screen or showing an error.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "초대 링크로 가입한 친구는 바로 프리미엄 7일을 받아요.",
        "친구가 2일 동안 할 일을 끝내면 나도 프리미엄 7일을 받고 친구를 1명 더 추가해요.",
        "신고·차단이 생겼고, AI에 보내기 전에 동의를 받아요.",
        "AI가 날짜를 더 정확히 알아듣고, 위젯은 자정이 지나면 새 날짜로 바뀌어요.",
      ],
      en: [
        "Friends you invite get 7 days of Premium when they join.",
        "You get 7 days of Premium and 1 more friend slot once they complete to-dos on 2 days.",
        "Report or block people, and Aido asks for consent before sending data to AI.",
        "AI reads dates more accurately, and widgets switch to the new day after midnight.",
      ],
    },
  },
  {
    version: "1.12.1",
    date: "2026-10-25",
    summary: {
      ko: "접는 폰과 iPhone Duo에서 더 편하고, 할 일 순서 바꾸기가 부드러워졌어요.",
      en: "Foldables and iPhone Duo feel steadier, and reordering to-dos is smoother.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "iPhone Duo나 폴더블 폰을 반쯤 접으면 목록과 상세가 접히는 선을 따라 나뉘어, 내용이 접힌 곳에 걸리지 않아요.",
            en: "Half-fold your iPhone Duo or foldable phone, and the list and details split along the fold so nothing sits across the crease.",
          },
          {
            ko: "알림의 친구 탭에서 보낸 콕도 볼 수 있어요. ‘받은 알림’과 ‘보낸 콕’을 눌러 바로 오가요.",
            en: "See the nudges you sent in the Friends tab of your notifications, and switch between Received and Sent with a tap.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "접은 iPhone Duo에서는 뒤로 가기·저장·검색 같은 위쪽 버튼이 옆 막대로 옮겨져 누르기 쉬워요. 일반 iPhone에서도 버튼 모양이 기기와 어울려요.",
            en: "On a folded iPhone Duo, top buttons like Back, Save, and Search move to the side bar within easy reach. On other iPhones, they match your device's look.",
          },
          {
            ko: "할 일 옵션·날짜·시간 창이 화면 너비에 맞게 열리고 시계 아래에서 잘리지 않아요. 내용이 길면 창 안에서 스크롤해요.",
            en: "To-do option, date, and time sheets fit your screen width and open below the clock without getting cut off. Longer content scrolls inside.",
          },
          {
            ko: "할 일·하위 할 일·친구·카테고리를 끌어 순서를 바꿀 때 더 부드럽고, 옮길 때마다 가볍게 진동해요.",
            en: "Dragging to reorder to-dos, checklist items, friends, and categories is smoother, with a light tap each time an item moves.",
          },
          {
            ko: "VoiceOver·TalkBack에서 할 일 완료·댓글 보기·더보기를 목록에서 바로 써요.",
            en: "With VoiceOver or TalkBack, complete a to-do, open its comments, or see more right from the list.",
          },
          {
            ko: "Mac에서는 창 크기와 상관없이 익숙한 휴대폰 화면으로 보여요.",
            en: "On Mac, Aido keeps its familiar phone layout at any window size.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "끌어서 순서를 바꾼 뒤 줄이 겹치거나 빈칸이 남던 문제를 고쳤어요.",
            en: "Fixed rows overlapping or leaving gaps after dragging to reorder.",
          },
          {
            ko: "할 일 옵션에서 날짜 변경을 누르면 창이 덜 열린 채 멈추던 문제를 고쳤어요.",
            en: "Fixed the date sheet getting stuck halfway open from to-do options.",
          },
          {
            ko: "펼친 화면에서 다른 탭으로 옮긴 뒤 접으면 메모가 엉뚱하게 열리거나, 펼친 직후 화면이 흔들리던 문제를 고쳤어요.",
            en: "Fixed a note opening in the wrong tab after folding, and the screen shifting right after unfolding.",
          },
          {
            ko: "보낸 콕을 열면 오류 화면이 보이던 문제를 고쳤어요.",
            en: "Fixed an error screen when opening nudges you sent.",
          },
          {
            ko: "영어에서 시간이 ‘PM 2:30’처럼 보이거나 24시간제를 따르지 않고, 자정이 지나도 날짜 선택의 ‘오늘·내일’이 그대로이던 문제를 고쳤어요.",
            en: "Fixed times showing as “PM 2:30” in English or ignoring your 24-hour setting, and Today and Tomorrow in the date picker not updating after midnight.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone Duo나 폴더블 폰을 반쯤 접으면 접힌 선을 따라 목록과 상세가 나뉘어요.",
        "접은 iPhone Duo에서는 위쪽 버튼을 옆 막대에서 편하게 눌러요.",
        "할 일 옵션·날짜·시간 창이 잘리지 않고, 순서 바꾸기가 부드러워요.",
        "알림의 친구 탭에서 보낸 콕도 볼 수 있어요.",
      ],
      en: [
        "Half-fold your iPhone Duo or foldable to split the list and details along the fold.",
        "On a folded iPhone Duo, top buttons sit in the side bar within easy reach.",
        "Option, date, and time sheets no longer get cut off, and reordering is smoother.",
        "See sent nudges in the Friends tab of notifications.",
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
            ko: "폴더블 폰과 iPhone Duo를 펼치면 할 일·친구의 할 일·메모·설정을 왼쪽 목록과 오른쪽 상세로 나눠, 목록을 보면서 댓글이나 메모를 바로 봐요.",
            en: "On an unfolded foldable phone or iPhone Duo, to-dos, friends' to-dos, notes, and settings show a list on the left and details on the right, so you can read comments or notes with your list in view.",
          },
          {
            ko: "쓰던 댓글과 메모는 접거나 펼쳐도 남고, 로그인이 만료돼도 다시 로그인하면 이어서 써요.",
            en: "Comments and notes you're writing stay when you fold or unfold, and after you sign back in.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "쓰던 글은 이 기기에 암호화해 보관하고, 다른 계정으로 로그인하면 지워요.",
            en: "Unsent writing is encrypted on your device and cleared when another account signs in.",
          },
          {
            ko: "iPhone Duo의 세로 레일과 화면 내용·알림 메시지·아래 창·하단 버튼이 겹치지 않아요.",
            en: "Content, messages, bottom sheets, and buttons stay clear of the iPhone Duo rail.",
          },
          {
            ko: "넓은 화면에서 로그인 화면이 가운데 알맞은 폭으로 보이고, 아래 창도 너무 넓어지지 않아요.",
            en: "On wide screens, sign-in sits at a comfortable width in the center, and bottom sheets don't stretch too wide.",
          },
          {
            ko: "펼친 화면에서 고른 항목이 없으면 상세 영역에 안내가 보이고, Android에서는 뒤로 가기로 상세를 먼저 닫아요.",
            en: "With nothing selected on an unfolded screen, the detail area shows a short guide, and on Android, Back closes the details first.",
          },
          {
            ko: "답글 대상을 바꿔도 쓰던 글이 남고, 할 일 변경이 실패하면 그 할 일만 되돌려요.",
            en: "Switching who you reply to keeps your draft, and a failed to-do change restores only that to-do.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "접거나 펼칠 때 보던 내용이 처음부터 다시 그려지던 문제를 고쳤어요.",
            en: "Fixed content redrawing from scratch when you fold or unfold your phone.",
          },
          {
            ko: "펼친 화면에서 주간·월간 달력을 넘길 때 폭이 어긋나던 문제를 고쳤어요.",
            en: "Fixed misaligned weekly and monthly calendars when swiping on an unfolded screen.",
          },
          {
            ko: "펼친 화면에서 댓글을 쓸 때 입력창과 목록이 키보드보다 높이 뜨던 문제를 고쳤어요.",
            en: "Fixed the comment field and list floating too far above the keyboard on an unfolded screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "폴더블 폰과 iPhone Duo를 펼치면 목록과 상세를 나란히 봐요.",
        "쓰던 댓글과 메모는 접고 펼치거나 다시 로그인해도 이어서 써요.",
        "iPhone Duo 화면 배치와 펼친 화면의 달력·키보드를 다듬었어요.",
      ],
      en: [
        "Unfold a foldable or iPhone Duo to see a list beside its details.",
        "Keep writing comments and notes after folding, unfolding, or signing back in.",
        "Refined iPhone Duo layouts and calendar and keyboard behavior on unfolded screens.",
      ],
    },
  },
  {
    version: "1.11.0",
    date: "2026-10-05",
    summary: {
      ko: "친구의 콕에 답장하고, 위젯에서 오늘 할 일을 더 편하게 봐요.",
      en: "Reply to friends' nudges and see today's to-dos more easily in widgets.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구의 콕에 ‘시작해볼게’, ‘응원 고마워’, ‘조금 뒤에 할게’로 답장해요. 답장해도 마친 할 일은 직접 체크해 주세요.",
            en: "Reply to a friend's nudge with “I'll get started,” “Thanks for cheering me on,” or “I'll do it later.” You still check off the to-do yourself when it's done.",
          },
          {
            ko: "공개한 할 일을 마치면 콕으로 응원한 친구들에게 한 번에 고마움을 전해요. 답장과 감사는 무료예요.",
            en: "Finish a public to-do and thank everyone who nudged you in one go. Replies and thanks are free.",
          },
          {
            ko: "중간 위젯은 오늘 할 일을, 큰 위젯은 주간 달력과 오늘 목록을 보여 줘요. ‘할 일 만들기’를 누르면 앱에서 바로 추가해요.",
            en: "The medium widget shows today's to-dos, and the large one adds a weekly calendar alongside today's list. Tap Add a to-do to create one in the app.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "받은 콕과 친구의 답장·고마움을 알림 목록에서 함께 보고, 보낸 콕에서도 친구 반응을 볼 수 있어요.",
            en: "Nudges, replies, and thanks appear together in notifications, and you can see friends' responses to nudges you sent.",
          },
          {
            ko: "작은 위젯은 완료 수와 진행률을 보여 줘요. 모든 크기에서 고양이 발자국을 또렷하게 다듬고 iPhone과 Android 배치를 맞췄어요.",
            en: "The small widget shows your completion count and progress, with clearer paw prints in every size and matching layouts on iPhone and Android.",
          },
          {
            ko: "앱을 켜 둔 채 자정이 지나거나 다음 날 돌아오면 오늘 날짜가 바뀌어요.",
            en: "Today's date updates after midnight while the app is open, or when you come back the next day.",
          },
          {
            ko: "콕·할 일 알림 문구와, 알림에서 할 일로 갔다가 돌아오는 흐름을 다듬었어요.",
            en: "Nudge and reminder messages read more naturally, and going from a notification to a to-do and back is smoother.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구의 콕에 답장하고, 공개한 할 일을 마치면 고마움을 전해요(무료).",
        "중간 위젯은 오늘 할 일을, 큰 위젯은 주간 달력과 목록을 보여 줘요.",
        "알림 목록에서 콕·답장·고마움을 함께 봐요.",
      ],
      en: [
        "Reply to nudges and thank friends after finishing a public to-do, free.",
        "The medium widget shows today's to-dos; the large one adds a weekly calendar.",
        "See nudges, replies, and thanks together in notifications.",
      ],
    },
  },
  {
    version: "1.10.1",
    date: "2026-10-04",
    summary: {
      ko: "날씨와 화면 이동을 다듬고, 새 고양이 친구들이 찾아왔어요.",
      en: "Weather and navigation are easier to use, and new cats have arrived.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "러시안 블루·크림·턱시도 고양이가 생겨 프로필 고양이를 9가지 중에서 골라요. 프리미엄에서는 앱 아이콘도 바꿀 수 있어요.",
            en: "Russian Blue, Cream, and Tuxedo cats bring profile choices to nine, and Premium subscribers can change the app icon.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면 위쪽과 배경을 자연스럽게 맞추고, 라이트·다크 모드에서 보기 편하게 다듬었어요.",
            en: "The weather screen has a consistent header and background, with clearer colors in light and dark mode.",
          },
          {
            ko: "한국 밖에서는 날씨를 아직 국내에서만 지원한다고 안내해요.",
            en: "Outside Korea, a notice explains that weather is supported only in Korea for now.",
          },
          {
            ko: "할 일·메모·마이페이지를 쉽게 구분하도록 하단 탭 아이콘을 새로 다듬었어요.",
            en: "New bottom tab icons make to-dos, notes, and My Page easier to tell apart.",
          },
          {
            ko: "할 일·메모가 없을 때 안내가 가운데 보이고, 달력을 못 불러오면 가까운 곳에서 다시 시도해요.",
            en: "Empty to-do and note lists show a centered message, and if the calendar can't load, you can retry without scrolling far.",
          },
          {
            ko: "목록 스크롤과 불러오기를 다듬고, 아래쪽 내용이 하단 탭에 가려지지 않아요.",
            en: "Lists scroll and load more smoothly, and content at the bottom stays clear of the tabs.",
          },
          {
            ko: "무료에서는 AI 기능 안내를 먼저 보여 드리고, 프리미엄 AI 제안을 준비 중이거나 못 불러올 때도 상태를 알려 드려요.",
            en: "Free users see an introduction to AI features, and Premium users get clear messages while AI suggestions are being prepared or can't load.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 처음 열 때 위치·예보가 늦게 반영되거나 위쪽 온도가 가끔 안 보이던 문제를 고쳤어요.",
            en: "Fixed delayed location and forecast updates on opening the app, and the temperature sometimes missing at the top.",
          },
          {
            ko: "Android에서 테마를 바꾸거나 뒤로 갈 때 앱이 꺼질 수 있던 문제를 고쳤어요.",
            en: "Fixed the app closing on Android when changing themes or going back.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "프로필 고양이가 9가지로 늘고, 프리미엄에서는 앱 아이콘도 바꿔요.",
        "날씨 화면과 하단 탭, 목록과 AI 제안 안내를 다듬었어요.",
        "Android에서 테마 변경·뒤로 가기 중 앱이 꺼지던 문제를 고쳤어요.",
      ],
      en: [
        "Choose from nine profile cats, and change the app icon on Premium.",
        "Refreshed weather, tabs, lists, and AI suggestion messages.",
        "Fixed Android crashes when changing themes or going back.",
      ],
    },
  },
  {
    version: "1.10.0",
    date: "2026-10-02",
    summary: {
      ko: "화면 이동과 위젯이 더 부드러워졌어요.",
      en: "Navigation and widgets feel smoother.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "하단 탭이 새로워져 iPhone과 Android에서 화면을 더 자연스럽게 오가요.",
            en: "Refreshed bottom tabs make moving between screens feel more natural on iPhone and Android.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "홈 화면 위젯이 오늘 날짜·할 일·완료 상태를 더 안정적으로 보여 줘요.",
            en: "Home screen widgets show today's date, to-dos, and progress more reliably.",
          },
          {
            ko: "입력창과 키보드를 다듬어 할 일과 댓글을 더 편하게 써요.",
            en: "Improved text fields and keyboard behavior make writing to-dos and comments easier.",
          },
          {
            ko: "메모를 쓰고 고치거나 할 일로 바꾸는 과정이 더 안정적으로 이어져요.",
            en: "Writing, editing, and turning notes into to-dos works more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone과 Android의 하단 탭과 화면 이동을 다듬었어요.",
        "위젯의 날짜, 할 일과 완료 상태가 더 안정적으로 보여요.",
        "할 일·댓글 입력과 메모 쓰기를 다듬었어요.",
      ],
      en: [
        "Refreshed bottom tabs and navigation on iPhone and Android.",
        "Widgets show dates, to-dos, and progress more reliably.",
        "Smoother typing for to-dos, comments, and notes.",
      ],
    },
  },
  {
    version: "1.9.0",
    date: "2026-08-28",
    summary: {
      ko: "할 일 속 댓글과 답글이 자연스럽게 이어져요.",
      en: "Comments and replies in your to-dos flow more naturally.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일 상세에서 댓글과 답글을 함께 보고, 원하는 댓글에 바로 답글을 달아요.",
            en: "View comments and replies together in a to-do and reply to any comment.",
          },
          {
            ko: "답글이 달린 대화를 펼쳐 보고, 댓글 알림을 누르면 그 댓글로 바로 가요.",
            en: "Expand a thread to read its replies, and jump to a comment from its notification.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "댓글을 쓰거나 답글을 오갈 때 입력창과 화면 이동을 다듬었어요.",
            en: "Writing comments and moving between replies feels smoother, with the text field ready where you need it.",
          },
          {
            ko: "답글을 쓰다 뒤로 가면 한 번에 이전 댓글 화면으로 돌아가요.",
            en: "Going back while writing a reply returns you to the previous comment screen in one tap.",
          },
          {
            ko: "할 일 목록 간격을 정돈하고, 댓글 작성자와 내용을 또렷하게 다듬었어요.",
            en: "The to-do list has tidier spacing, and comment authors and text are easier to read.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일에서 댓글과 답글을 함께 보고, 원하는 댓글에 답글을 달아요.",
        "댓글 알림을 누르면 그 댓글로 바로 가요.",
        "답글 쓰기와 뒤로 가기, 목록 간격을 다듬었어요.",
      ],
      en: [
        "View comments and replies together and reply to any comment.",
        "Open a comment notification to jump to that comment.",
        "Smoother replies, going back, and list spacing.",
      ],
    },
  },
  {
    version: "1.8.2",
    date: "2026-08-05",
    summary: {
      ko: "친구가 할 일을 마친 날을 달력에서 쉽게 봐요.",
      en: "See the days your friends finish their to-dos in the calendar.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구가 공개한 할 일을 모두 마친 날에는 친구 달력에 물고기가 보여요.",
            en: "A fish appears on a friend's calendar on days they finish all their public to-dos.",
          },
          {
            ko: "친구가 어떤 카테고리의 할 일을 마쳤는지 색깔 점으로 한눈에 봐요.",
            en: "Colored dots show which categories your friend completed.",
          },
          {
            ko: "친구가 공개한 할 일만 보여서 서로의 하루를 부담 없이 볼 수 있어요.",
            en: "Only your friend's public to-dos are shown, so you can follow their day comfortably.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "날짜를 바꾸거나 내 달력과 친구 달력을 오갈 때도 완료 기록이 자연스럽게 이어져요.",
            en: "Completion records stay in sync as you change dates or switch between your calendar and a friend's.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구가 공개한 할 일을 모두 마친 날엔 달력에 물고기가 보여요.",
        "완료한 할 일의 카테고리는 색깔 점으로 봐요.",
        "친구의 공개 기록만 보여요.",
      ],
      en: [
        "A fish marks days when a friend finishes all their public to-dos.",
        "Colored dots show the categories they completed.",
        "Only public records are shown.",
      ],
    },
  },
  {
    version: "1.8.1",
    date: "2026-08-03",
    summary: {
      ko: "매일 쓰는 아이두가 더 부드럽게 움직여요.",
      en: "Everyday planning with Aido feels smoother.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "화면을 옮길 때 움직임이 더 부드러워요.",
            en: "Moving between screens feels smoother.",
          },
          {
            ko: "로그인과 구독을 더 안정적으로 다듬었어요.",
            en: "Sign-in and subscriptions work more reliably.",
          },
          {
            ko: "가끔 생기던 오류를 줄이고, 문제가 생기면 원인을 찾기 쉽게 했어요.",
            en: "Occasional errors are reduced, and issues are easier to track down.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "화면 이동이 더 부드러워요.",
        "로그인과 구독을 더 안정적으로 다듬었어요.",
        "가끔 생기던 오류를 줄였어요.",
      ],
      en: [
        "Smoother screen transitions.",
        "Sign-in and subscriptions work more reliably.",
        "Fewer occasional errors.",
      ],
    },
  },
  {
    version: "1.8.0",
    date: "2026-07-27",
    summary: {
      ko: "아이두의 유용한 기능을 한곳에서 볼 수 있어요.",
      en: "Discover Aido's handy features in one place.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "메모 AI·친구 찾기·순서 정리 같은 기능을 모은 기능 가이드가 생겼어요. 마이페이지에서 언제든 다시 봐요.",
            en: "A new Feature Guide covers AI for notes, finding friends, reordering, and more. Reopen it anytime from My Page.",
          },
          {
            ko: "처음이라면 홈의 시작 체크리스트를 따라 첫 할 일을 만들고 끝내 봐요.",
            en: "New to Aido? A starter checklist on Home walks you through creating and finishing your first to-do.",
          },
          {
            ko: "할 일과 카테고리를 길게 눌러 순서를 바꿀 수 있다고 화면에서 알려 드려요.",
            en: "An on-screen tip shows how to press and hold to reorder to-dos and categories.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "친구를 구분하는 8자리 코드를 검색과 프로필 모두 #이 붙은 표기로 맞췄어요.",
            en: "Your 8-character friend code now uses the same # format in search and profiles.",
          },
          {
            ko: "친구의 할 일 완료 알림이 더 정확한 때에 와요.",
            en: "Alerts about a friend's completed to-do arrive at a more accurate time.",
          },
          {
            ko: "할 일과 카테고리를 빠르게 연달아 옮겨도 순서가 어긋나지 않아요.",
            en: "To-dos and categories stay in order even when you rearrange them quickly.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "마이페이지에서 메모 AI, 친구 찾기 등을 담은 기능 가이드를 봐요.",
        "처음 시작할 때 첫 할 일을 만들고 끝내도록 안내해요.",
        "친구 코드 # 표기와 완료 알림, 순서 바꾸기를 다듬었어요.",
      ],
      en: [
        "Explore AI for notes, finding friends, and more in the Feature Guide on My Page.",
        "A starter checklist helps you create and finish your first to-do.",
        "Refined # friend codes, completion alerts, and reordering.",
      ],
    },
  },
  {
    version: "1.7.0",
    date: "2026-07-19",
    summary: {
      ko: "아이두를 더 안정적으로 쓸 수 있게 다듬었어요.",
      en: "Aido is more reliable for everyday planning.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적으로 다듬고, 문제가 생기면 더 빨리 찾아 고칠 수 있게 했어요.",
            en: "The app is more reliable, and issues are quicker to find and fix.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["앱을 더 안정적으로 다듬고, 문제를 더 빨리 고칠 수 있게 했어요."],
      en: ["The app is more reliable, and issues are quicker to fix."],
    },
  },
  {
    version: "1.6.0",
    date: "2026-07-18",
    summary: {
      ko: "설정에서 언어와 테마를 더 쉽게 골라요.",
      en: "Pick your language and theme more easily in Settings.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "설정의 언어·화면 테마 화면을 새로 꾸며, 아이콘과 함께 원하는 옵션을 쉽게 찾아요.",
            en: "Refreshed language and theme screens in Settings, now with icons, make options easier to find.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "구독과 데이터 저장을 더 안정적으로 다듬었어요.",
            en: "Subscriptions and saving your data work more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "설정에서 언어와 테마를 아이콘과 함께 쉽게 골라요.",
        "구독과 데이터 저장을 더 안정적으로 다듬었어요.",
      ],
      en: [
        "Choose a language and theme more easily in Settings, with icons.",
        "Subscriptions and data saving work more reliably.",
      ],
    },
  },
  {
    version: "1.5.2",
    date: "2026-07-14",
    summary: {
      ko: "위젯이 깔끔해지고, 새로운 하루도 잘 챙겨 드려요.",
      en: "Widgets look cleaner, and Aido keeps up with each new day.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "Android에서도 iPhone과 같은 디자인의 위젯 3종을 골라 써요.",
            en: "Android now has the same three widget styles as iPhone.",
          },
          {
            ko: "할 일과 연속 달성을 이어 가도록 맞춤 제안과 응원 알림을 받을 수 있어요.",
            en: "Get personalized suggestions and encouragement to keep your to-dos and streaks going.",
          },
          {
            ko: "맞춤 제안 알림은 가입할 때 고르고, 마이페이지 > 약관 및 정책에서 언제든 바꿔요.",
            en: "Choose whether to get personalized suggestions at sign-up, and change the setting anytime in My Page > Terms & Policies.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나거나 다음 날 돌아오면 새 날짜로 시작해요.",
            en: "The app starts on the new date after midnight or when you return the next day.",
          },
          {
            ko: "알림을 누르면 관련 화면으로 가고, 모두 읽음으로 바꾸면 목록에도 바로 반영돼요.",
            en: "Notifications open the relevant screen, and Mark all as read updates the list right away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 iPhone·Android 기기에서 위젯 글자가 잘리거나 정렬이 어긋나던 문제를 고쳤어요.",
            en: "Fixed clipped text and uneven alignment in widgets on some iPhone and Android devices.",
          },
          {
            ko: "화면을 불러오다 문제가 생겨도 앱을 계속 쓸 수 있게 고쳤어요.",
            en: "You can keep using the app even when a screen has trouble loading.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "Android에서도 iPhone과 같은 위젯 3종을 써요.",
        "맞춤 제안과 응원 알림을 받고, 마이페이지에서 수신 여부를 바꿔요.",
        "일부 기기에서 위젯 글자가 잘리던 문제를 고쳤어요.",
      ],
      en: [
        "Android gets the same three widget styles as iPhone.",
        "Get personalized suggestions and encouragement, and change it in My Page.",
        "Fixed clipped widget text on some devices.",
      ],
    },
  },
  {
    version: "1.5.1",
    date: "2026-07-13",
    summary: {
      ko: "홈 화면 위젯으로 오늘 할 일을 바로 봐요.",
      en: "See today's to-dos right on your home screen.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "홈 화면에 위젯을 추가하면 앱을 열지 않아도 오늘 할 일을 한눈에 봐요. iPhone과 Android 모두 써요.",
            en: "Add a home screen widget to see today's to-dos without opening the app, on iPhone and Android.",
          },
          {
            ko: "작은 위젯은 남은 할 일 개수와 연속 달성 일수를, 큰 위젯은 할 일 목록까지 보여 줘요.",
            en: "The small widget shows your remaining to-dos and streak, and the large one adds your list.",
          },
          {
            ko: "할 일을 완료하면 위젯에도 바로 반영되고, 기기의 라이트·다크 모드를 따라가요.",
            en: "Completed to-dos show up in the widget right away, and widgets follow light or dark mode.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "자정이 지나면 위젯도 새 날로 바뀌어요.",
            en: "Widgets switch to the new day at midnight.",
          },
          {
            ko: "위젯이 배터리와 데이터를 적게 써요.",
            en: "Widgets use little battery or data.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "iPhone과 Android 홈 화면에서 할 일 개수·연속 달성·목록을 봐요.",
        "할 일을 마치면 위젯에도 반영되고, 자정이 지나면 새날로 바뀌어요.",
        "라이트·다크 모드를 따르고, 배터리와 데이터를 적게 써요.",
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
      ko: "이름이나 아이디로 친구를 찾을 수 있어요.",
      en: "Find friends by name or ID.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "이름이나 아이디로 친구를 검색해 추가해요. 같은 이름이 여럿이어도 아이디로 구분해요.",
            en: "Search for friends by name or ID and add them. Same name? Tell people apart by their ID.",
          },
          {
            ko: "보낸 친구 요청은 마음이 바뀌면 취소할 수 있어요.",
            en: "Cancel a friend request if you change your mind.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "Google이나 Apple 계정을 처음 연결하는 과정을 다듬었어요.",
            en: "Connecting a Google or Apple account for the first time works more reliably.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "이름이나 아이디로 친구를 찾아 추가해요.",
        "보낸 친구 요청을 취소할 수 있어요.",
        "Google·Apple 계정을 처음 연결하는 과정을 다듬었어요.",
      ],
      en: [
        "Search for friends by name or ID and add them.",
        "Cancel a friend request after sending it.",
        "Smoother first-time Google or Apple account linking.",
      ],
    },
  },
  {
    version: "1.4.4",
    date: "2026-07-10",
    summary: {
      ko: "앱을 열면 첫 화면이 자연스럽게 채워져요.",
      en: "Your first screen loads more smoothly when you open the app.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "연결이 잠깐 불안정할 때 앱을 열어도 로그인을 유지한 채 내용을 다시 불러와요.",
            en: "If your connection is briefly unstable when you open the app, content reloads automatically and you stay signed in.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 열자마자 할 일·AI 제안·날씨에 ‘다시 시도’가 뜨던 문제를 고쳤어요. 잠시 기다리면 자동으로 불러와요.",
            en: "Fixed “Try again” showing for to-dos, AI suggestions, and weather right after opening the app. Content now loads on its own after a moment.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 열자마자 할 일·AI 제안·날씨에 ‘다시 시도’가 뜨던 문제를 고쳤어요.",
        "연결이 잠시 불안정해도 로그인을 유지하고 내용을 다시 불러와요.",
      ],
      en: [
        "Fixed “Try again” showing for to-dos, AI suggestions, and weather right after opening the app.",
        "Content reloads and you stay signed in when the connection is briefly unstable.",
      ],
    },
  },
  {
    version: "1.4.3",
    date: "2026-07-09",
    summary: {
      ko: "가끔 로그인이 풀리던 문제를 고쳤어요.",
      en: "Fixed occasional sign-outs.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 사용자에게 가끔 로그인이 풀리던 문제를 고쳤어요.",
            en: "Fixed some users being signed out now and then.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["일부 사용자에게 가끔 로그인이 풀리던 문제를 고쳤어요."],
      en: ["Fixed some users being signed out now and then."],
    },
  },
  {
    version: "1.4.2",
    date: "2026-07-09",
    summary: {
      ko: "여러 상황에서 로그인이 풀리던 문제를 고쳤어요.",
      en: "Fixed unexpected sign-outs in several everyday situations.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적이고 편하게 쓸 수 있게 다듬었어요.",
            en: "The app is more reliable and easier to use.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱 업데이트 뒤, 잠긴 휴대폰에서 알림으로 열 때, 인터넷 없이 열 때 로그인이 풀리던 문제를 고쳤어요.",
            en: "Fixed sign-outs after an app update, when opening a notification on a locked phone, or when opening the app offline.",
          },
          {
            ko: "앱을 쓰다 갑자기 ‘다시 시도’가 뜨던 문제를 고쳤어요.",
            en: "Fixed “Try again” appearing unexpectedly while using the app.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "업데이트 뒤, 잠금 화면 알림을 열 때, 인터넷 없이 열 때 로그인이 풀리던 문제를 고쳤어요.",
        "사용 중 갑자기 ‘다시 시도’가 뜨던 문제를 고쳤어요.",
      ],
      en: [
        "Fixed sign-outs after an update, from a locked-screen notification, or when opening the app offline.",
        "Fixed “Try again” appearing unexpectedly.",
      ],
    },
  },
  {
    version: "1.4.1",
    date: "2026-07-08",
    summary: {
      ko: "업데이트 뒤 로그인이 풀리던 문제를 고쳤어요.",
      en: "Fixed sign-outs after an update.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "인터넷이 잠깐 끊기거나 느려져도 로그인이 유지돼요.",
            en: "You stay signed in when your connection briefly drops or slows down.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 업데이트한 뒤 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
            en: "Fixed sign-outs after an app update. If you were already signed out, please sign in once more.",
          },
          {
            ko: "일부 iPhone 화면의 어색한 영어 문구를 고쳤어요.",
            en: "Fixed awkward English wording on some iPhone screens.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "업데이트 뒤 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
        "연결이 잠시 끊기거나 느려져도 로그인이 유지돼요.",
        "일부 iPhone의 영어 문구를 고쳤어요.",
      ],
      en: [
        "Fixed sign-outs after an update. If you were already signed out, please sign in once more.",
        "You stay signed in when your connection briefly drops or slows down.",
        "Fixed awkward English wording on some iPhones.",
      ],
    },
  },
  {
    version: "1.4.0",
    date: "2026-07-07",
    summary: {
      ko: "화면과 알림, AI 리포트까지 영어로 쓸 수 있어요.",
      en: "Use Aido in English, from screens to notifications and AI reports.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "아이두를 영어로 쓸 수 있어요. 설정 > 언어에서 ‘시스템 설정’, ‘한국어’, ‘English’ 중 골라요.",
            en: "Aido now speaks English. Choose “System default,” “한국어,” or “English” in Settings > Language.",
          },
          {
            ko: "처음 설치하면 기기 언어를 따라 한국어 기기는 한국어로, 그 밖에는 영어로 시작해요.",
            en: "On first install, Aido follows your device: Korean on Korean-language devices, English elsewhere.",
          },
          {
            ko: "할 일·친구 소식·날씨 알림과 AI 주간·월간 리포트, 반복 할 일 제안, 날짜·시간·요일 표기도 고른 언어로 보여요.",
            en: "To-do, friend, and weather notifications, weekly and monthly AI reports, repeat suggestions, and dates, times, and weekdays all follow your chosen language.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "언어를 바꾸면 앱을 다시 시작하지 않아도 바로 적용돼요.",
            en: "Language changes apply right away without a restart.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "설정 > 언어에서 시스템 설정, 한국어, English 중 골라요.",
        "화면, 날짜·시간, 알림과 AI 리포트가 고른 언어로 보여요.",
        "언어를 바꾸면 다시 시작하지 않아도 적용돼요.",
      ],
      en: [
        "Choose System default, 한국어, or English in Settings > Language.",
        "Screens, dates, notifications, and AI reports follow your language.",
        "Language changes apply without restarting.",
      ],
    },
  },
  {
    version: "1.3.5",
    date: "2026-07-06",
    summary: {
      ko: "앱을 다시 설치한 뒤 로그인이 풀리던 문제를 고쳤어요.",
      en: "Fixed sign-outs after reinstalling the app.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 지웠다가 다시 설치하면 로그인 직후 로그아웃되던 문제를 고쳤어요.",
            en: "Fixed being signed out right after signing in to a reinstalled app.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 지웠다가 다시 설치하면 로그인 직후 로그아웃되던 문제를 고쳤어요.",
      ],
      en: [
        "Fixed being signed out right after signing in to a reinstalled app.",
      ],
    },
  },
  {
    version: "1.3.4",
    date: "2026-07-06",
    summary: {
      ko: "로그인 유지와 앱 안정성을 다듬었어요.",
      en: "Sign-in stays put more reliably, and the app is steadier.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적으로 다듬고, 오류가 생기면 더 빨리 찾아 고칠 수 있게 했어요.",
            en: "The app is more reliable, and issues are quicker to find and fix.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 상황에서 예상치 못하게 로그인이 풀리던 문제를 더 고쳤어요.",
            en: "Fixed more cases of unexpected sign-outs.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱을 더 안정적으로 다듬었어요.",
        "예상치 못하게 로그인이 풀리던 경우를 더 고쳤어요.",
      ],
      en: [
        "The app is more reliable.",
        "Fixed more cases of unexpected sign-outs.",
      ],
    },
  },
  {
    version: "1.3.3",
    date: "2026-07-06",
    summary: {
      ko: "알림 문구를 다듬고, 날씨 알림과 로그인 문제를 고쳤어요.",
      en: "Friendlier notifications, plus fixes for weather alerts and sign-in.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "휴대폰 알림 문구를 더 친근하게 다듬었어요.",
            en: "Notification messages read more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "비나 눈 예보가 있는 날에도 맑은 날씨 알림이 오던 문제를 고쳤어요.",
            en: "Fixed sunny-weather alerts on days with rain or snow in the forecast.",
          },
          {
            ko: "인터넷이 불안정할 때 가끔 로그인이 풀리던 문제를 고쳤어요.",
            en: "Fixed occasional sign-outs on an unstable connection.",
          },
          {
            ko: "알림에서 친구 이름 뒤 조사가 어색하게 붙던 문제를 고쳤어요.",
            en: "Fixed awkward Korean wording after friends' names in notifications.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "알림 문구를 다듬고, 친구 이름 뒤 어색한 표현을 고쳤어요.",
        "비나 눈 예보에도 맑은 날씨 알림이 오던 문제를 고쳤어요.",
        "인터넷이 불안정할 때 로그인이 풀리던 문제를 고쳤어요.",
      ],
      en: [
        "Refreshed notification messages and fixed awkward Korean wording after friends' names.",
        "Fixed sunny-weather alerts when rain or snow was forecast.",
        "Fixed occasional sign-outs on an unstable connection.",
      ],
    },
  },
  {
    version: "1.3.2",
    date: "2026-05-17",
    summary: {
      ko: "아이두를 더 안정적이고 편하게 쓸 수 있게 다듬었어요.",
      en: "Aido is more reliable and easier to use.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "앱을 더 안정적이고 편하게 쓸 수 있게 다듬었어요.",
            en: "The app is more reliable and easier to use.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["앱을 더 안정적이고 편하게 쓸 수 있게 다듬었어요."],
      en: ["The app is more reliable and easier to use."],
    },
  },
  {
    version: "1.3.1",
    date: "2026-04-19",
    summary: {
      ko: "달력과 반복 설정을 다듬고, 무료 AI 횟수를 월 단위로 바꿨어요.",
      en: "Calendar and repeats are easier, and free AI uses now reset monthly.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "달력을 좌우로 밀어 주와 월을 넘겨요. 넘기는 움직임도 더 부드러워요.",
            en: "Swipe the calendar left or right to move between weeks and months, with smoother transitions.",
          },
          {
            ko: "반복 설정에서 ‘매일’, ‘주중’, ‘주말’, ‘월~일’ 중 원하는 주기를 한 번에 골라요.",
            en: "Choose “Daily,” “Weekdays,” “Weekends,” or “Mon–Sun” in one tap when setting repeats.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "무료 AI 할 일 정리 횟수를 월 5회로 바꿨어요. 한국 시간 매월 1일 자정에 다시 채워져요.",
            en: "The free plan now includes 5 AI uses a month to organize to-dos, resetting at midnight Korean time on the 1st.",
          },
          {
            ko: "AI가 할 일의 카테고리와 내용을 더 정확히 구분하고, AI 리포트 품질도 고르게 다듬었어요.",
            en: "AI tells a to-do's category and content apart more accurately, and AI reports are more consistent.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "달력을 넘길 때 날씨 배지가 깜빡이던 문제를 고쳤어요.",
            en: "Fixed the weather badge flickering when moving through the calendar.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "달력을 좌우로 넘기고, 반복 주기를 한 번에 골라요.",
        "무료 AI 횟수는 월 5회, 한국 시간 매월 1일 자정에 다시 채워져요.",
        "AI 카테고리 구분과 리포트를 다듬고, 날씨 배지 깜빡임을 고쳤어요.",
      ],
      en: [
        "Swipe between calendar weeks and months, and pick repeat days in one tap.",
        "Free plan: 5 AI uses a month, resetting at midnight Korean time on the 1st.",
        "Better AI categories and reports, and no more flickering weather badge.",
      ],
    },
  },
  {
    version: "1.3.0",
    date: "2026-04-15",
    summary: {
      ko: "생각은 메모로 담고, AI로 할 일까지 정리해요.",
      en: "Capture thoughts in notes and turn them into to-dos with AI.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "메모가 생겼어요. 떠오르는 생각을 자유롭게 적어 둬요.",
            en: "New notes let you jot down thoughts anytime.",
          },
          {
            ko: "메모 위쪽 로봇 아이콘을 누르면 AI가 할 일과 체크리스트 항목으로 정리해 줘요.",
            en: "Tap the robot icon at the top of a note, and AI organizes it into to-dos and checklist items.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 필요한 할 일을 더 분명하게 제안하고, 다크 모드 화면도 자연스럽게 다듬었어요.",
            en: "AI suggests the to-dos you need more clearly, and dark mode looks more natural.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "가끔 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
            en: "Fixed occasional sign-outs. If you were already signed out, please sign in once more.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "메모에 생각을 적고, 로봇 아이콘으로 AI가 할 일과 체크리스트를 만들어요.",
        "AI 제안과 다크 모드를 다듬었어요.",
        "가끔 로그인이 풀리던 문제를 고쳤어요. 이미 로그아웃됐다면 한 번만 다시 로그인해 주세요.",
      ],
      en: [
        "Write a note, then tap the robot icon to turn it into to-dos and checklist items with AI.",
        "Better AI suggestions and dark mode.",
        "Fixed occasional sign-outs. If you were already signed out, please sign in once more.",
      ],
    },
  },
  {
    version: "1.2.4",
    date: "2026-04-07",
    summary: {
      ko: "체크리스트를 한눈에 보고, 알림 글꼴도 편하게 읽어요.",
      en: "Checklist items are easier to see, and notification text follows your font size.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "체크리스트 항목이 있는 할 일은 처음부터 펼쳐 보여 드려요.",
            en: "To-dos with checklist items open expanded, so you see the details at a glance.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "알림 메시지에 글꼴 크기 설정이 반영되지 않던 문제를 고쳤어요.",
            en: "Fixed notification messages ignoring your font size setting.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "체크리스트 항목이 있는 할 일은 처음부터 펼쳐 보여요.",
        "알림 메시지에 글꼴 크기가 반영되지 않던 문제를 고쳤어요.",
      ],
      en: [
        "To-dos with checklist items open expanded.",
        "Fixed notification text ignoring your font size.",
      ],
    },
  },
  {
    version: "1.2.3",
    date: "2026-04-06",
    summary: {
      ko: "알림을 열 때와 날씨를 볼 때 생기던 문제를 고쳤어요.",
      en: "Fixed issues when opening notifications and checking the weather.",
    },
    categories: [
      {
        type: "bugFixes",
        items: [
          {
            ko: "휴대폰 알림을 누르면 화면이 겹쳐 보이던 문제를 고쳤어요.",
            en: "Fixed overlapping screens when opening a notification.",
          },
          {
            ko: "날씨 알림이 할 일 알림으로 잘못 분류되고, 비·눈 아이콘과 설명이 맞지 않던 문제를 고쳤어요.",
            en: "Fixed weather notifications labeled as to-do notifications, and rain and snow icons not matching their descriptions.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "알림을 누르면 화면이 겹치던 문제를 고쳤어요.",
        "날씨 알림 분류와 비·눈 아이콘·설명이 맞지 않던 문제를 고쳤어요.",
      ],
      en: [
        "Fixed overlapping screens when opening notifications.",
        "Fixed weather alert labels and mismatched rain and snow icons.",
      ],
    },
  },
  {
    version: "1.2.2",
    date: "2026-04-04",
    summary: {
      ko: "지금 기온을 바로 보고, 알림 설정도 쉽게 찾아요.",
      en: "See the current temperature and find notification settings more easily.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 화면에서 평균 기온 대신 지금 기온을 보여 줘요.",
            en: "The weather screen shows the current temperature instead of the average.",
          },
          {
            ko: "알림 설정 화면을 깔끔하게 정리했어요.",
            en: "Notification settings have a cleaner layout.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨 화면에서 평균 대신 지금 기온을 봐요.",
        "알림 설정 화면을 깔끔하게 정리했어요.",
      ],
      en: [
        "The weather screen shows the current temperature.",
        "Tidier notification settings.",
      ],
    },
  },
  {
    version: "1.2.1",
    date: "2026-04-03",
    summary: {
      ko: "날씨 상세 화면을 더 보기 좋게 다듬었어요.",
      en: "The weather detail screen is easier to read.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "날씨 상세 화면을 더 보기 좋게 다듬었어요.",
            en: "The weather detail screen has a clearer design.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: ["날씨 상세 화면을 더 보기 좋게 다듬었어요."],
      en: ["The weather detail screen is easier to read."],
    },
  },
  {
    version: "1.2.0",
    date: "2026-04-02",
    summary: {
      ko: "날씨 알림이 생기고, AI 제안과 리포트가 더 세심해졌어요.",
      en: "Weather notifications arrive, with more thoughtful AI suggestions and reports.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "아침과 오후에 날씨에 맞는 할 일 팁을 알림으로 받고, 오전·오후 알림 시간을 각각 정해요.",
            en: "Get weather-based to-do tips in morning and afternoon notifications, at times you set for each.",
          },
          {
            ko: "날씨 상세 화면에서 시간대별 날씨·체감 온도·자외선·미세먼지·5일 예보를 봐요.",
            en: "The weather detail screen shows hourly weather, feels-like temperature, the UV index, fine dust, and a 5-day forecast.",
          },
          {
            ko: "AI 제안이 습관 회복·균형 잡힌 계획 등 8가지 유형으로 늘었어요.",
            en: "AI suggestions now come in 8 types, including habit recovery and balanced planning.",
          },
          {
            ko: "반복 할 일의 시작일을 바꾸거나 반복 할 일을 지울 수 있어요.",
            en: "Change a repeating to-do's start date or delete it.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 리포트의 습관 패턴 분석과 맞춤 코칭을 세심하게 다듬었어요.",
            en: "AI reports offer more detailed habit analysis and personalized coaching.",
          },
          {
            ko: "AI가 전에 수락하거나 거절한 제안을 참고해 나에게 맞게 제안해요.",
            en: "AI learns from suggestions you've accepted or declined to fit you better.",
          },
          {
            ko: "알림이 한꺼번에 몰리지 않게 보내는 시간을 나눴어요.",
            en: "Notifications are spread out so they don't all arrive at once.",
          },
          {
            ko: "휴대폰 알림을 꺼도 앱 알림 목록에서는 내용을 볼 수 있어요.",
            en: "Even with phone notifications off, you can read them in the app's notification list.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 화면에 글꼴 크기 설정이 적용되지 않던 문제를 고쳤어요.",
            en: "Fixed font size settings not applying on some screens.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "날씨 팁 알림을 오전·오후 원하는 시간에 받고, 시간별 날씨와 5일 예보를 봐요.",
        "AI 제안이 8가지로 늘고, 전에 답한 제안을 참고해요.",
        "반복 할 일의 시작일을 바꾸거나 지울 수 있어요.",
      ],
      en: [
        "Get morning and afternoon weather tips at your chosen times, plus hourly weather and a 5-day forecast.",
        "8 types of AI suggestions that learn from your past answers.",
        "Change a repeating to-do's start date or delete it.",
      ],
    },
  },
  {
    version: "1.1.1",
    date: "2026-03-28",
    summary: {
      ko: "글꼴 크기를 내게 맞추고, 화면도 더 편하게 봐요.",
      en: "Pick a font size that suits you, with fixes for a smoother view.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "앱 글꼴 크기를 아주 작게부터 아주 크게까지 5단계로 골라요.",
            en: "Choose from 5 font sizes in the app, from Extra Small to Extra Large.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "일부 기기에서 시간 선택 화면이 잘리거나 AI 제안 화면이 깜빡이던 문제를 고쳤어요.",
            en: "Fixed the time picker being cut off on some devices and the AI suggestions screen flickering.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "앱 글꼴 크기를 5단계로 골라요.",
        "시간 선택 화면이 잘리거나 AI 제안 화면이 깜빡이던 문제를 고쳤어요.",
      ],
      en: [
        "Choose from 5 font sizes in the app.",
        "Fixed a clipped time picker and flickering AI suggestions.",
      ],
    },
  },
  {
    version: "1.1.0",
    date: "2026-03-27",
    summary: {
      ko: "할 일을 체크리스트로 나누고, 카테고리를 쉽게 정리해요.",
      en: "Break to-dos into checklist items and organize categories more easily.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "할 일에 체크리스트 항목을 추가할 수 있어요.",
            en: "Add checklist items to your to-dos.",
          },
          {
            ko: "할 일을 추가할 때 카테고리를 더 쉽게 골라요.",
            en: "Pick a category more easily when adding a to-do.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "카테고리 관리와 반복 설정 화면을 더 쉽고 깔끔하게 다듬었어요.",
            en: "Category management and repeat settings have cleaner, easier layouts.",
          },
          {
            ko: "카테고리 색을 바꾸면 달력에도 바로 반영돼요.",
            en: "Category color changes show in the calendar right away.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "앱을 잠깐 나갔다 돌아오면 입력 화면이 깨지던 문제를 고쳤어요.",
            en: "Fixed the input screen breaking when you returned to the app after a moment away.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "할 일을 체크리스트 항목으로 나누고, 카테고리를 쉽게 골라요.",
        "카테고리 관리와 반복 설정 화면을 다듬었어요.",
        "앱에 돌아오면 입력 화면이 깨지던 문제를 고쳤어요.",
      ],
      en: [
        "Break to-dos into checklist items and pick categories more easily.",
        "Improved category management and repeat settings.",
        "Fixed broken input screens when returning to the app.",
      ],
    },
  },
  {
    version: "1.0.5",
    date: "2026-03-21",
    summary: {
      ko: "할 일이 더 빨리 반영되고, 날짜와 친구 목록도 편하게 바꿔요.",
      en: "To-dos respond faster, and dates and your friend list are easier to change.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "오늘 할 일은 내일로 미루고, 다른 날 할 일은 오늘로 당겨 와요.",
            en: "Push today's to-dos to tomorrow, or bring other days' to-dos forward to today.",
          },
          {
            ko: "친구 목록을 편집하는 모드가 생겼어요.",
            en: "A new edit mode for your friend list.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "할 일과 카테고리를 추가·수정·삭제하면 더 빨리 반영되고, 카테고리 관리 화면도 편하게 다듬었어요.",
            en: "Adding, editing, and deleting to-dos and categories responds faster, and category management is easier.",
          },
          {
            ko: "AI 제안 문구를 더 다양하게 다듬었어요.",
            en: "AI suggestions use a wider variety of messages.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "할 일 제목을 바꿔도 알림에 이전 제목이 보이던 문제를 고쳤어요.",
            en: "Fixed reminders showing a to-do's old title after renaming.",
          },
          {
            ko: "할 일 추가 화면에서 키보드와 날짜 선택을 오갈 때 화면이 끊기던 문제를 고쳤어요.",
            en: "Fixed stuttering when switching between the keyboard and date picker while adding a to-do.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "오늘 할 일은 내일로, 다른 날 할 일은 오늘로 옮겨요.",
        "할 일·카테고리 변경이 더 빨리 반영되고, 친구 목록을 편집해요.",
        "알림에 이전 제목이 보이던 문제와 입력 화면 끊김을 고쳤어요.",
      ],
      en: [
        "Move today's to-dos to tomorrow or bring others forward to today.",
        "Faster to-do and category changes, and an edit mode for friends.",
        "Fixed old titles in reminders and stuttering when adding a to-do.",
      ],
    },
  },
  {
    version: "1.0.4",
    date: "2026-03-20",
    summary: {
      ko: "AI 리포트와 카테고리를 다듬고, 달력에서 완료 기록을 봐요.",
      en: "Better AI reports and categories, and completion history in the calendar.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "하루 완료 현황에서 카테고리를 색으로 구분하고, 달력에서 날짜별 완료 상태를 봐요.",
            en: "See category colors in your daily completion overview, and each day's completion status in the calendar.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI 리포트를 주간·월간으로 나누고, 맞춤 코칭을 다듬었어요.",
            en: "AI reports are split into weekly and monthly, with better personalized coaching.",
          },
          {
            ko: "AI가 더 다양한 패턴을 보고 할 일을 제안하고, 알림 문구도 다양해졌어요.",
            en: "AI suggestions recognize more patterns, and notification messages have more variety.",
          },
          {
            ko: "카테고리 관리를 마이페이지로 옮기고 화면을 보기 좋게 다듬었어요.",
            en: "Category management moved to My Page with a clearer layout.",
          },
          {
            ko: "Android 하단 탭의 경계선을 없애 화면이 자연스럽게 이어져요.",
            en: "Android's bottom tabs lost their border for a more seamless screen.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "iPhone에서 하단 탭 때문에 앱이 갑자기 꺼지던 문제를 고쳤어요.",
            en: "Fixed the bottom tabs closing the app unexpectedly on iPhone.",
          },
          {
            ko: "AI 리포트가 엉뚱한 시간에 만들어지던 문제를 고쳤어요.",
            en: "Fixed AI reports being created at the wrong time.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "완료한 할 일의 카테고리 색과 날짜별 완료 기록을 봐요.",
        "AI 주간·월간 리포트와 제안, 알림 문구를 다듬었어요.",
        "카테고리 관리를 마이페이지로 옮겼어요.",
      ],
      en: [
        "See category colors and completion history by date.",
        "Improved weekly and monthly AI reports, suggestions, and notifications.",
        "Category management moved to My Page.",
      ],
    },
  },
  {
    version: "1.0.3",
    date: "2026-03-16",
    summary: {
      ko: "친구 목록 순서와 할 일 카테고리를 편하게 바꿔요.",
      en: "Reorder your friend list and change to-do categories more easily.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구를 끌어 옮겨 원하는 순서로 정리해요.",
            en: "Drag friends into your preferred order.",
          },
          {
            ko: "할 일 메뉴에서 카테고리를 바로 바꿔요.",
            en: "Change a to-do's category right from its menu.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "문의하기 화면에서 키보드를 더 편하게 쓸 수 있게 다듬었어요.",
            en: "Typing on the contact screen is easier with improved keyboard behavior.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구를 끌어 옮겨 목록 순서를 바꿔요.",
        "할 일 메뉴에서 카테고리를 바꿔요.",
        "문의하기 화면의 키보드를 다듬었어요.",
      ],
      en: [
        "Drag friends to reorder your list.",
        "Change a to-do's category from its menu.",
        "Improved the keyboard on the contact screen.",
      ],
    },
  },
  {
    version: "1.0.2",
    date: "2026-03-15",
    summary: {
      ko: "친구에게 콕 찌르기를 보내고, 문의도 남길 수 있어요.",
      en: "Send friends a nudge and get in touch with us.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "친구에게 콕 찌르기를 보내 할 일을 떠올리게 도와줘요.",
            en: "Send a friend a nudge to help them remember a to-do.",
          },
          {
            ko: "문의하기에서 궁금한 점을 남겨요.",
            en: "Ask us anything with the new contact feature.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "고른 달력 보기 모드가 그대로 유지돼요.",
            en: "Your chosen calendar view stays saved.",
          },
          {
            ko: "친구 요청을 보내고 받는 과정을 편하게 다듬었어요.",
            en: "Sending and receiving friend requests is easier to follow.",
          },
          {
            ko: "마이페이지와 프로필 설정 화면을 보기 좋게 다듬었어요.",
            en: "My Page and profile settings have a clearer design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "다크 모드의 Apple 아이콘과 카카오 프로필 이미지가 보이지 않던 문제를 고쳤어요.",
            en: "Fixed the Apple icon missing in dark mode and Kakao profile images not appearing.",
          },
          {
            ko: "Android에서 마이페이지 아래쪽 내용이 탭에 가려지던 문제를 고쳤어요.",
            en: "Fixed the bottom tabs covering content at the bottom of My Page on Android.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "친구에게 콕 찌르기를 보내고, 문의하기에서 질문을 남겨요.",
        "달력 보기 유지와 친구 요청, 프로필 화면을 다듬었어요.",
        "Apple 아이콘·카카오 프로필 이미지가 안 보이던 문제를 고쳤어요.",
      ],
      en: [
        "Send friends a nudge and ask us questions in the app.",
        "Saved calendar views, smoother friend requests, and clearer profiles.",
        "Fixed missing Apple icons and Kakao profile photos.",
      ],
    },
  },
  {
    version: "1.0.1",
    date: "2026-03-13",
    summary: {
      ko: "주간 배지로 작은 성취를 나누고, 알림과 화면도 편해졌어요.",
      en: "Share small wins with weekly badges, with better notifications and screens.",
    },
    categories: [
      {
        type: "features",
        items: [
          {
            ko: "주간 목표 달성 배지를 모아 보고 공유해 작은 성취를 나눠요.",
            en: "View your weekly goal badges and share them to celebrate small wins.",
          },
          {
            ko: "점심시간 리마인더 알림을 받을 수 있어요.",
            en: "Get a reminder at lunchtime.",
          },
          {
            ko: "연속 달성이 끊기기 전에 알림을 받을 수 있어요.",
            en: "Get an alert before your streak ends.",
          },
          {
            ko: "설정에서 시간을 24시간제로 볼 수 있어요.",
            en: "Choose a 24-hour clock in Settings.",
          },
        ],
      },
      {
        type: "improvements",
        items: [
          {
            ko: "AI가 할 일을 더 정확히 이해하고, 매일 할 일을 살펴 카테고리까지 제안해요.",
            en: "AI understands to-dos more accurately, reviews them daily, and suggests categories too.",
          },
          {
            ko: "프리미엄 리포트가 아직 없을 때의 화면을 다듬고, 주간 달성 리포트를 더 안정적으로 받아요.",
            en: "Premium reports show a clearer screen before your first report, and weekly reports arrive more reliably.",
          },
          {
            ko: "친구 요청을 수락하면 바로 반영돼요.",
            en: "Accepted friend requests show up right away.",
          },
          {
            ko: "소셜 로그인 버튼을 보기 좋게 다듬었어요.",
            en: "Social sign-in buttons have a clearer design.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "기기에서 큰 글씨를 쓰면 화면이 깨지던 문제를 고쳤어요.",
            en: "Fixed broken layouts with a larger system font size.",
          },
          {
            ko: "Android에서 앱 아이콘이 잘리고 Apple 로그인 버튼이 잘못 보이던 문제를 고쳤어요.",
            en: "Fixed the app icon being clipped and the Apple sign-in button appearing incorrectly on Android.",
          },
          {
            ko: "구독 금액과 일부 색상이 잘못 보이던 문제를 고쳤어요.",
            en: "Fixed incorrect subscription price display and some colors.",
          },
          {
            ko: "알림을 받을 때 앱이 갑자기 꺼지던 문제를 고쳤어요.",
            en: "Fixed the app closing unexpectedly when a notification arrived.",
          },
          {
            ko: "알림을 누르면 엉뚱한 화면으로 가던 문제를 고쳤어요.",
            en: "Fixed notifications opening the wrong screen.",
          },
        ],
      },
    ],
    storeNotes: {
      ko: [
        "주간 배지를 보고 공유해요. 점심·연속 달성 알림과 24시간제도 생겼어요.",
        "AI 제안과 리포트, 친구 요청을 다듬었어요.",
        "큰 글씨 화면, Android 아이콘, 알림 중 앱 종료 등을 고쳤어요.",
      ],
      en: [
        "View and share weekly badges, plus lunchtime and streak reminders and a 24-hour clock.",
        "Improved AI suggestions, reports, and friend requests.",
        "Fixed large-text layouts, Android icons, notification crashes, and more.",
      ],
    },
  },
  {
    version: "1.0.0",
    date: "2026-03-10",
    summary: {
      ko: "아이두가 정식 출시됐어요. AI 투두 플래너로 하루를 정리하고, 친구와 작은 성취를 나눠 보세요.",
      en: "Aido is officially here. Plan your day with an AI to-do planner and share small wins with friends.",
    },
    categories: [],
    storeNotes: {
      ko: ["AI로 하루의 할 일을 정리하고, 친구와 작은 성취를 나눠 보세요."],
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
      ko: "메모 AI와 리포트, 날씨와 알림을 꼼꼼하게 다듬었어요.",
      en: "AI for notes, reports, weather, and notifications got more careful.",
    },
    categories: [
      {
        type: "improvements",
        items: [
          {
            ko: "메모를 AI로 정리할 때 적어 둔 날짜·시간·세부 내용을 더 잘 반영해요.",
            en: "AI for notes handles the dates, times, and details you write more carefully.",
          },
          {
            ko: "이미 수락하거나 거절한 활동이 AI 제안에 다시 나오는 경우를 줄였어요.",
            en: "AI suggestions are less likely to repeat activities you already accepted or declined.",
          },
          {
            ko: "남은 할 일과 친구 활동에 맞춰 알림 문구를 자연스럽게 다듬었어요.",
            en: "Notification messages describe your remaining to-dos and friends' activity more naturally.",
          },
        ],
      },
      {
        type: "bugFixes",
        items: [
          {
            ko: "주간·월간 리포트에서 일부 완료 기록이 다른 날짜에 들어가거나 빠지던 문제를 고쳤어요.",
            en: "Fixed some completions landing on the wrong date or missing from weekly and monthly reports.",
          },
          {
            ko: "날짜가 바뀐 뒤 일부 날씨 정보가 전날 기준으로 보이던 문제를 고쳤어요.",
            en: "Fixed some weather info using the previous date after a new day began.",
          },
          {
            ko: "메모를 할 일로 바꾸거나 AI 제안을 수락할 때 같은 할 일이 두 번 생기던 문제를 고쳤어요.",
            en: "Fixed converting a note or accepting an AI suggestion sometimes creating the same to-do twice.",
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
