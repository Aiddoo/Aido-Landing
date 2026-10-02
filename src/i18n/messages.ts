import type { Locale } from "./config";

type FriendCard = { name: string; path: string; color: string; rotate: number };
type ValueItem = {
  icon: "sparkles" | "users" | "calendar";
  title: string;
  description: string[];
  rotate: number;
};
type PreviewScreen = {
  title: string;
  subtitle: string;
  description: string[];
  path: string;
  alt: string;
  secondPath?: string;
  secondAlt?: string;
  rotate: number;
  premium?: boolean;
};
export type MessageCatalog = {
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    keywords: string[];
  };
  values: { title: string; items: ValueItem[] };
  appPreview: {
    titleLead: string;
    titleHighlight: string;
    descriptionLead: string;
    descriptionTail: string;
    premiumLabel: string;
    screens: PreviewScreen[];
  };
  friends: {
    label: string;
    title: string;
    descriptionLead: string;
    descriptionTail: string;
    cards: FriendCard[];
  };
  faq: {
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    copyright: string;
    tagline: string;
    contactBadge: string;
    companyLabel: string;
    companyValue: string;
    representativeLabel: string;
    representativeValue: string;
    businessNumberLabel: string;
    businessNumberValue: string;
    ecommerceLabel: string;
    ecommerceValue: string;
    hostingLabel: string;
    hostingValue: string;
    inquiryLabel: string;
    inquiryValue: string;
    termsLabel: string;
    privacyLabel: string;
    instagramLabel: string;
  };
  legal: {
    badge: string;
    backHomeLabel: string;
    viewTermsLabel: string;
    viewPrivacyLabel: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
  };
  patchNotes: {
    title: string;
    description: string;
    backHome: string;
    bugFixes: string;
    features: string;
    improvements: string;
    newRelease: string;
    latest: string;
    badge: string;
    closingNote: string;
    archiveTitle: string;
    archiveDescription: string;
    releaseCount: string;
    releaseCountOne: string;
    expand: string;
    collapse: string;
    initialNote: string;
  };
  languageSwitcher: {
    label: string;
    ko: string;
    en: string;
    navLabel: string;
  };
  nav: {
    label: string;
    features: string;
    friends: string;
    faq: string;
    download: string;
    patchNotes: string;
    open: string;
    close: string;
  };
  accessibility: {
    skip: string;
    home: string;
    footer: string;
  };
  hero: {
    eyebrow: string;
    headingLead: string;
    headingHighlight: string;
    description: string;
    note: string;
    previewAlt: string;
    previewCaption: string;
    memoLabel: string;
    memoText: string;
    doneLabel: string;
    doneText: string;
  };
  cta: {
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    closingNote: string;
  };
  storeButtons: {
    ariaLabel: string;
    appStorePrefix: string;
    appStoreLabel: string;
    playStorePrefix: string;
    playStoreLabel: string;
  };
};

const catalogs: Record<Locale, MessageCatalog> = {
  ko: {
    meta: {
      title: "아이두(Aido) | AI 투두·메모·일정 관리 앱",
      description:
        "떠오르는 메모와 음성을 AI가 할 일로 정리해요. 반복 일정과 캘린더로 하루를 계획하고, 친구와 콕 찌르기·댓글로 함께 끝내세요. iOS·Android에서 한국어와 영어로 만나요.",
      openGraphTitle: "아이두 — 메모는 가볍게, 할 일은 함께",
      openGraphDescription:
        "AI로 정리하고, 친구와 함께 끝내요. 메모부터 반복 일정까지, 아이두와 작은 성취를 쌓아보세요.",
      keywords: [
        "아이두",
        "Aido",
        "AI 투두",
        "할 일 관리 앱",
        "메모 앱",
        "일정 관리",
        "반복 할 일",
        "투두 플래너",
      ],
    },
    nav: {
      label: "주요 메뉴",
      features: "앱 기능",
      friends: "고양이 친구들",
      faq: "궁금한 점",
      download: "앱 다운로드",
      patchNotes: "패치노트",
      open: "메뉴 열기",
      close: "메뉴 닫기",
    },
    accessibility: {
      skip: "본문으로 바로 가기",
      home: "홈",
      footer: "하단 메뉴",
    },
    hero: {
      eyebrow: "아이두 · AI 투두 플래너",
      headingLead: "메모는 가볍게,",
      headingHighlight: "할 일은 함께.",
      description:
        "떠오르는 생각을 적거나 말해보세요. AI가 할 일로 정리하고, 친구와 함께 작은 성취를 쌓아가요.",
      note: "iOS · Android에서 무료로 시작해요",
      previewAlt: "아이두 앱의 주간 캘린더와 할 일 목록",
      previewCaption: "오늘 하나부터, 같이 해봐요 🐾",
      memoLabel: "생각을 할 일로",
      memoText: "내일 장보기, 주말에 책 읽기…",
      doneLabel: "하나씩 해내는 하루",
      doneText: "작은 성취도 함께 기뻐해요",
    },
    values: {
      title: "부담은 덜고, 성취는 하나씩",
      items: [
        {
          icon: "sparkles",
          title: "생각을 할 일로",
          description: [
            "메모와 자연스러운 문장을",
            "AI가 실행할 할 일로 정리해요.",
          ],
          rotate: -1,
        },
        {
          icon: "users",
          title: "친구와 함께",
          description: [
            "콕 찌르기와 댓글로 응원하며",
            "서로의 하루에 힘을 보태요.",
          ],
          rotate: 1,
        },
        {
          icon: "calendar",
          title: "내 하루에 맞게",
          description: [
            "반복 일정과 캘린더, 알림으로",
            "놓치지 않고 차근차근 해봐요.",
          ],
          rotate: -1,
        },
      ],
    },
    appPreview: {
      titleLead: "생각에서 실행까지,",
      titleHighlight: "아이두가 같이 갈게요",
      descriptionLead: "복잡하게 준비하지 않아도 괜찮아요.",
      descriptionTail: "나에게 맞는 방식으로 하루를 정리해보세요.",
      premiumLabel: "프리미엄",
      screens: [
        {
          title: "메모가 할 일이 되는 순간",
          subtitle: "AI 할 일 정리",
          description: [
            "떠오르는 내용을 메모하면 AI가 여러 할 일로 나눠줘요. 자연스러운 문장이나 음성으로도 할 일을 입력할 수 있어요.",
            "날짜와 시간, 반복, 카테고리를 내 흐름에 맞게 정리해요.",
          ],
          path: "/app-assets/home.webp",
          alt: "자연스러운 문장으로 할 일을 입력하는 아이두 AI 입력 화면",
          rotate: -2,
        },
        {
          title: "오늘부터 한 달까지, 한눈에",
          subtitle: "주간·월간 캘린더",
          description: [
            "오늘 할 일과 주간·월간 일정을 한눈에 살펴봐요. 반복 할 일과 알림으로 꾸준한 하루를 만들어가요.",
            "iOS·Android 홈 화면 위젯에서도 오늘의 할 일과 완료 상태를 확인할 수 있어요.",
          ],
          path: "/app-assets/month-calendar-new.webp",
          secondPath: "/app-assets/week-calendar-new.webp",
          alt: "아이두 월간 캘린더의 날짜별 할 일",
          secondAlt: "아이두 주간 캘린더의 일주일 일정",
          rotate: 2,
        },
        {
          title: "혼자 미루던 일도, 같이 해봐요",
          subtitle: "친구와 콕 찌르기",
          description: [
            "이름이나 고유 해시태그로 친구를 찾고, 공개한 할 일을 서로 살펴봐요. 콕 찌르기와 댓글·답글로 작은 응원을 건네요.",
            "혼자 사용하는 것도 좋아요. 할 일마다 공개 범위를 선택할 수 있어요.",
          ],
          path: "/app-assets/nudge-new.webp",
          alt: "친구에게 콕 찌르기로 응원을 보내는 아이두 화면",
          rotate: -2,
        },
        {
          title: "쌓인 기록에서 다음 한 걸음으로",
          subtitle: "AI 리포트·반복 제안",
          description: [
            "AI 주간·월간 리포트로 달성률과 나의 패턴을 돌아봐요. 반복되는 할 일은 AI가 제안하고, 마음에 드는 제안을 수락해 일정에 더해요.",
            "AI 리포트와 반복 제안은 프리미엄에서 이용할 수 있어요.",
          ],
          path: "/app-assets/ai-report.webp",
          alt: "아이두 AI 리포트의 달성률과 카테고리 분석",
          rotate: 2,
          premium: true,
        },
      ],
    },
    friends: {
      label: "함께할 고양이를 골라요",
      title: "내 하루에 작은 귀여움을",
      descriptionLead: "마음에 드는 고양이를 앱 아이콘으로 골라보세요.",
      descriptionTail:
        "5종 고양이 아이콘 변경은 프리미엄에서 이용할 수 있어요.",
      cards: [
        {
          name: "스코티시폴드",
          path: "/app-assets/cat-scottish-fold.webp",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "치즈 태비",
          path: "/app-assets/cat-orange-tabby.webp",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "검은 고양이",
          path: "/app-assets/cat-black.webp",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "샴",
          path: "/app-assets/cat-shyam.webp",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "하얀 고양이",
          path: "/app-assets/cat-abyssinian.webp",
          color: "#fdf1e3",
          rotate: -3,
        },
      ],
    },
    faq: {
      title: "궁금한 점이 있나요?",
      description: "시작하기 전에, 아이두를 조금 더 알아봐요.",
      items: [
        {
          question: "아이두는 무료로 사용할 수 있나요?",
          answer:
            "네, 무료로 시작할 수 있어요. 기본 할 일 관리와 캘린더, 친구 기능을 이용하고, AI 정리 등 일부 기능은 사용 한도가 있어요. 프리미엄에서는 AI 리포트·반복 제안·고양이 아이콘 변경과 더 넉넉한 사용 범위를 제공해요. 구독 가격과 상세 조건은 앱에서 확인할 수 있어요.",
        },
        {
          question: "AI가 메모와 음성을 어떻게 정리해주나요?",
          answer:
            "자연스러운 문장으로 할 일을 적거나 음성으로 입력할 수 있어요. 메모 AI는 떠오르는 내용을 실행할 여러 할 일로 나눠줘요. 정리된 내용을 확인하고 나에게 맞게 수정해 사용해보세요.",
        },
        {
          question: "매일 반복되는 할 일도 만들 수 있나요?",
          answer:
            "네, 일·주·월 단위의 반복 할 일을 만들 수 있어요. 날짜와 시간을 설정하고 주간·월간 캘린더에서 일정을 확인해요. AI 반복 제안은 프리미엄 기능이에요.",
        },
        {
          question: "친구 없이 혼자 사용해도 괜찮나요?",
          answer:
            "물론이에요. 혼자서도 메모, 할 일, 캘린더로 하루를 정리할 수 있어요. 함께하고 싶을 때 친구를 찾아 콕 찌르기와 댓글로 응원해보세요.",
        },
        {
          question: "모든 할 일이 친구에게 보이나요?",
          answer:
            "할 일마다 공개 범위를 선택할 수 있어요. 친구는 공개한 할 일을 볼 수 있고, 비공개로 설정한 할 일은 공유되지 않아요. 생성하거나 수정할 때 공개 설정을 확인해주세요.",
        },
        {
          question: "어떤 기기와 언어를 지원하나요?",
          answer:
            "App Store에서 iOS 앱을, Google Play에서 Android 앱을 다운로드할 수 있어요. 앱과 이 웹사이트는 한국어·영어를 지원하고, 홈 화면 위젯도 iOS·Android에서 사용할 수 있어요.",
        },
      ],
    },
    cta: {
      titleLineOne: "오늘 하나부터,",
      titleLineTwo: "같이 시작해볼까요?",
      description:
        "완벽한 계획보다 작은 시작. 아이두와 나만의 하루를 만들어가요.",
      closingNote: "무료로 시작 · 일부 기능은 프리미엄 구독",
    },
    storeButtons: {
      ariaLabel: "앱 다운로드 링크",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "메모는 가볍게, 할 일은 함께.",
      contactBadge: "고객 문의",
      companyLabel: "상호",
      companyValue: "레드밴드",
      representativeLabel: "대표",
      representativeValue: "김용민",
      businessNumberLabel: "사업자 번호",
      businessNumberValue: "309-08-95749",
      ecommerceLabel: "통신판매업 신고번호",
      ecommerceValue: "2026-서울강동-0281",
      hostingLabel: "호스팅사업자",
      hostingValue: "Vercel Inc.",
      inquiryLabel: "고객 문의",
      inquiryValue: "matthew@redband.co.kr",
      termsLabel: "이용약관",
      privacyLabel: "개인정보처리방침",
      instagramLabel: "인스타그램",
    },
    legal: {
      badge: "Legal",
      backHomeLabel: "홈으로 돌아가기",
      viewTermsLabel: "이용약관 보기",
      viewPrivacyLabel: "개인정보처리방침 보기",
      privacyTitle: "개인정보처리방침",
      privacyDescription:
        "Aido 서비스 이용 시 처리되는 개인정보에 대해 안내합니다.",
      termsTitle: "이용약관",
      termsDescription:
        "Aido 서비스 이용 조건, 결제 및 자동 갱신, 이용자 권리와 책임을 안내합니다.",
    },
    patchNotes: {
      title: "패치노트",
      description:
        "아이두가 조금씩 달라지고 있어요. 새로 생긴 기능과 더 편해진 부분을 만나보세요.",
      backHome: "홈으로",
      bugFixes: "고친 문제",
      features: "새로운 기능",
      improvements: "더 편해진 부분",
      newRelease: "첫 출시",
      latest: "최신",
      archiveTitle: "지난 업데이트",
      archiveDescription:
        "월별로 기록을 모아뒀어요. 궁금한 버전을 펼쳐 자세히 살펴보세요.",
      releaseCount: "업데이트 {count}개",
      releaseCountOne: "업데이트 1개",
      expand: "자세히 보기",
      collapse: "접기",
      initialNote:
        "아이두의 첫 번째 출시 기록이에요. 함께 시작해주셔서 고마워요.",
      badge: "업데이트 기록",
      closingNote: "더 좋은 하루를 위해, 조금씩 다듬고 있어요. 🐾",
    },
    languageSwitcher: {
      label: "언어",
      ko: "KO",
      en: "EN",
      navLabel: "언어 선택",
    },
  },
  en: {
    meta: {
      title: "Aido | AI To-Do Planner, Notes & Task Management",
      description:
        "Turn notes and voice input into to-dos with AI. Plan with recurring tasks and calendars, and encourage friends with nudges and comments. For iOS and Android, in English and Korean.",
      openGraphTitle: "Aido — Less on your mind. More done together.",
      openGraphDescription:
        "Turn thoughts into to-dos with AI. Plan your day, encourage friends, and celebrate small wins together.",
      keywords: [
        "Aido",
        "AI to-do planner",
        "task management app",
        "notes to tasks",
        "recurring tasks",
        "daily planner",
      ],
    },
    nav: {
      label: "Main navigation",
      features: "Features",
      friends: "Cat Friends",
      faq: "FAQ",
      download: "Get the App",
      patchNotes: "Updates",
      open: "Open menu",
      close: "Close menu",
    },
    accessibility: {
      skip: "Skip to content",
      home: "Home",
      footer: "Footer navigation",
    },
    hero: {
      eyebrow: "Aido · AI To-Do Planner",
      headingLead: "Less on your mind.",
      headingHighlight: "More done together.",
      description:
        "Write down a thought or say it out loud. AI turns it into to-dos, and friends help you keep going — one small win at a time.",
      note: "Start free on iOS and Android",
      previewAlt: "Weekly calendar and to-do list in Aido",
      previewCaption: "One small step. A little company. 🐾",
      memoLabel: "Thoughts into to-dos",
      memoText: "Groceries tomorrow, a book this weekend…",
      doneLabel: "A day of small wins",
      doneText: "A little progress is worth celebrating",
    },
    values: {
      title: "A little less pressure. A little more progress.",
      items: [
        {
          icon: "sparkles",
          title: "Thoughts into tasks",
          description: [
            "Turn notes and everyday language",
            "into actionable to-dos with AI.",
          ],
          rotate: -1,
        },
        {
          icon: "users",
          title: "Better together",
          description: [
            "Send a nudge, leave a comment,",
            "and give each other a little boost.",
          ],
          rotate: 1,
        },
        {
          icon: "calendar",
          title: "Your day, your pace",
          description: [
            "Plan with recurring tasks,",
            "calendars, and timely reminders.",
          ],
          rotate: -1,
        },
      ],
    },
    appPreview: {
      titleLead: "From a thought to a small win,",
      titleHighlight: "Aido is by your side",
      descriptionLead: "You don't need a perfect plan to begin.",
      descriptionTail: "Find a way of planning that feels like you.",
      premiumLabel: "Premium",
      screens: [
        {
          title: "A note becomes your next step",
          subtitle: "AI Task Planning",
          description: [
            "Jot down a note and let AI turn it into multiple to-dos. Add tasks in everyday language or with voice input, too.",
            "Set the date, time, repetition, and category to fit your day.",
          ],
          path: "/app-assets/home.webp",
          alt: "Entering a task in everyday language with Aido AI",
          rotate: -2,
        },
        {
          title: "Today, this week, the whole month",
          subtitle: "Weekly & Monthly Calendars",
          description: [
            "See your day and upcoming plans at a glance. Recurring tasks and reminders help you keep a steady rhythm.",
            "Check today’s tasks and completion progress from an iOS or Android home screen widget.",
          ],
          path: "/app-assets/month-calendar-new.webp",
          secondPath: "/app-assets/week-calendar-new.webp",
          alt: "Date-based tasks in the Aido monthly calendar",
          secondAlt: "A week of plans in the Aido weekly calendar",
          rotate: 2,
        },
        {
          title: "A little nudge goes a long way",
          subtitle: "Plan with Friends",
          description: [
            "Find friends by name or their unique hashtag, then follow the to-dos they choose to share. Send a nudge or encourage them with comments and replies.",
            "Prefer to plan solo? That’s welcome, too. Choose the visibility of each task.",
          ],
          path: "/app-assets/nudge-new.webp",
          alt: "Sending a friendly nudge in Aido",
          rotate: -2,
        },
        {
          title: "Learn from your days. Plan your next step.",
          subtitle: "AI Reports & Recurring Suggestions",
          description: [
            "Reflect on completion rates and patterns with weekly and monthly AI reports. AI suggests recurring tasks; accept the ones that fit your routine.",
            "AI reports and recurring suggestions are included with Premium.",
          ],
          path: "/app-assets/ai-report.webp",
          alt: "Completion rates and category insights in an Aido AI report",
          rotate: 2,
          premium: true,
        },
      ],
    },
    friends: {
      label: "Pick your little companion",
      title: "A little more cute in your day",
      descriptionLead: "Choose a cat you love for your app icon.",
      descriptionTail:
        "Five cat icons are available to customize with Premium.",
      cards: [
        {
          name: "Scottish Fold",
          path: "/app-assets/cat-scottish-fold.webp",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "Cheese Tabby",
          path: "/app-assets/cat-orange-tabby.webp",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "Black Cat",
          path: "/app-assets/cat-black.webp",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "Siamese",
          path: "/app-assets/cat-shyam.webp",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "White Cat",
          path: "/app-assets/cat-abyssinian.webp",
          color: "#fdf1e3",
          rotate: -3,
        },
      ],
    },
    faq: {
      title: "A few things you might be wondering",
      description: "Get to know Aido before your first small step.",
      items: [
        {
          question: "Can I use Aido for free?",
          answer:
            "Yes, you can start for free with task management, calendars, and friend features. Some features, including AI task planning, have usage limits. Premium adds AI reports, recurring suggestions, custom cat icons, and higher limits. Check the app for current subscription prices and details.",
        },
        {
          question: "How does AI work with notes and voice input?",
          answer:
            "Enter tasks in everyday language or use voice input. Memo AI can turn a note into multiple actionable to-dos. Review the results and adjust them to fit your plans.",
        },
        {
          question: "Can I create recurring tasks?",
          answer:
            "Yes. Set daily, weekly, or monthly recurring tasks, choose dates and times, and see your plans in weekly and monthly calendars. AI recurring suggestions are a Premium feature.",
        },
        {
          question: "Can I use Aido without friends?",
          answer:
            "Absolutely. You can plan on your own with notes, tasks, and calendars. When you want some company, find a friend and encourage each other with nudges and comments.",
        },
        {
          question: "Can friends see all my tasks?",
          answer:
            "You choose the visibility of each task. Friends can see tasks you make public; private tasks are not shared. Check the visibility setting when creating or editing a task.",
        },
        {
          question: "Which devices and languages are supported?",
          answer:
            "Download the iOS app from the App Store or the Android app from Google Play. Both the app and this website support English and Korean. Home screen widgets are available on iOS and Android, too.",
        },
      ],
    },
    cta: {
      titleLineOne: "One small step.",
      titleLineTwo: "Let’s start together.",
      description:
        "A perfect plan can wait. Make a little room for your day with Aido.",
      closingNote: "Start free · Some features require Premium",
    },
    storeButtons: {
      ariaLabel: "App download links",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "Less on your mind. More done together.",
      contactBadge: "Contact",
      companyLabel: "Company",
      companyValue: "RedBand",
      representativeLabel: "Representative",
      representativeValue: "Yongmin Kim",
      businessNumberLabel: "Business Registration No.",
      businessNumberValue: "309-08-95749",
      ecommerceLabel: "E-commerce Registration No.",
      ecommerceValue: "2026-Seoul-Gangdong-0281",
      hostingLabel: "Hosting Provider",
      hostingValue: "Vercel Inc.",
      inquiryLabel: "Customer Inquiry",
      inquiryValue: "matthew@redband.co.kr",
      termsLabel: "Terms of Service",
      privacyLabel: "Privacy Policy",
      instagramLabel: "Instagram",
    },
    legal: {
      badge: "Legal",
      backHomeLabel: "Back to home",
      viewTermsLabel: "View Terms of Service",
      viewPrivacyLabel: "View Privacy Policy",
      privacyTitle: "Privacy Policy",
      privacyDescription:
        "How Aido collects, uses, stores, and protects your personal data.",
      termsTitle: "Terms of Service",
      termsDescription:
        "Usage terms, subscription conditions, and user rights for Aido.",
    },
    patchNotes: {
      title: "Patch Notes",
      description:
        "Aido keeps getting a little better. Meet the new features and small improvements that make your day easier.",
      backHome: "Home",
      bugFixes: "Fixes",
      features: "New features",
      improvements: "Improvements",
      newRelease: "First release",
      latest: "Latest",
      archiveTitle: "Earlier updates",
      archiveDescription:
        "Explore earlier updates by month. Open a version to see what changed.",
      releaseCount: "{count} updates",
      releaseCountOne: "1 update",
      expand: "Read more",
      collapse: "Show less",
      initialNote:
        "This is Aido's very first release. Thanks for taking the first step with us.",
      badge: "Update journal",
      closingNote: "We keep making little improvements for better days. 🐾",
    },
    languageSwitcher: {
      label: "Language",
      ko: "KO",
      en: "EN",
      navLabel: "Language selection",
    },
  },
};

export function getMessages(locale: Locale): MessageCatalog {
  return catalogs[locale];
}
