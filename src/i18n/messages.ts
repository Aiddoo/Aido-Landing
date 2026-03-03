import type { Locale } from "./config";

type FriendCard = {
  name: string;
  path: string;
  color: string;
  rotate: number;
};

type ValueItem = {
  icon: "sparkles" | "users" | "crown";
  title: string;
  description: string;
  rotate: number;
};

type FeatureGroup = {
  title: string;
  icon: string;
  goal: string;
  items: string[];
  color: string;
  rotate: number;
};

type PreviewScreen = {
  title: string;
  description: string;
  path: string;
  rotate: number;
};

export type MessageCatalog = {
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    keywords: string[];
  };
  languageSwitcher: {
    label: string;
    ko: string;
    en: string;
  };
  nav: {
    friends: string;
    notify: string;
  };
  hero: {
    headingLead: string;
    headingHighlight: string;
    descriptionLead: string;
    descriptionTail: string;
    arrowNote: string;
    launchBadge: string;
    scrollLabel: string;
  };
  storeButtons: {
    bubble: string;
    appStorePrefix: string;
    appStoreLabel: string;
    playStorePrefix: string;
    playStoreLabel: string;
  };
  friends: {
    label: string;
    title: string;
    descriptionLead: string;
    descriptionTail: string;
    cards: FriendCard[];
  };
  vision: {
    label: string;
    titleLead: string;
    titleTail: string;
    quoteOneLead: string;
    quoteOneTail: string;
    quoteTwoLead: string;
    quoteTwoTail: string;
  };
  values: {
    title: string;
    items: ValueItem[];
  };
  roadmap: {
    label: string;
    title: string;
    groups: FeatureGroup[];
  };
  appPreview: {
    titleLead: string;
    titleHighlight: string;
    descriptionLead: string;
    descriptionTail: string;
    screens: PreviewScreen[];
  };
  cta: {
    titleLineOne: string;
    titleLineTwo: string;
    descriptionLineOne: string;
    descriptionLineTwo: string;
    bubble: string;
    emailPlaceholder: string;
    buttonLabel: string;
    privacyNote: string;
    playfulText: string;
  };
  footer: {
    copyright: string;
    tagline: string;
    contactBadge: string;
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
};

const catalogs: Record<Locale, MessageCatalog> = {
  ko: {
    meta: {
      title: "Aido | 2026년 봄, 가장 설레는 할 일 관리가 시작됩니다",
      description:
        "친구와 함께 성장하는 새로운 Todo 경험. 말로 쓰면 AI가 정리하고, 친구와 콕 찌르기로 서로 독촉하세요. 2026년 봄 출시 예정.",
      openGraphTitle: "Aido | 2026년 봄, 가장 설레는 할 일 관리가 시작됩니다",
      openGraphDescription:
        "친구와 함께 성장하는 새로운 Todo 경험. 말로 쓰면 AI가 정리하고, 친구와 콕 찌르기로 서로 독촉하세요.",
      keywords: [
        "Aido",
        "에이도",
        "Todo 앱",
        "할 일 관리",
        "AI 비서",
        "고양이 Todo",
        "소셜 Todo",
        "생산성",
        "2026 신규 앱",
        "곧 출시",
      ],
    },
    languageSwitcher: {
      label: "언어",
      ko: "KO",
      en: "EN",
    },
    nav: {
      friends: "고양이 친구들",
      notify: "출시 알람 받기",
    },
    hero: {
      headingLead: "작심삼일은 이제 그만,",
      headingHighlight: "친구와 함께 매일 성취하세요",
      descriptionLead: "혼자서는 미루던 일도, 친구와 함께라면 달라집니다.",
      descriptionTail:
        "말로 쓰면 AI가 정리하고, 고양이 친구들이 매일 응원해줄 거예요.",
      arrowNote: "곧 만나요!",
      launchBadge: "🌸 2026년 봄, 가장 먼저 만나보세요",
      scrollLabel: "더 알아보기",
    },
    storeButtons: {
      bubble: "아직 출시 준비 중이에요! 조금만 기다려주세요 🐾",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    friends: {
      label: "Meet the Team",
      title: "열심히 하는 여러분을 응원해요!",
      descriptionLead: "개성 넘치는 고양이 친구들이 매일 당신을 응원해요.",
      descriptionTail:
        "할 일을 완료할 때마다 함께 기뻐하고, 힘들 땐 격려해줍니다!",
      cards: [
        {
          name: "스코티시폴드",
          path: "/app-assets/cat-scottish-fold.png",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "치즈 태비",
          path: "/app-assets/cat-orange-tabby.png",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "검은 고양이",
          path: "/app-assets/cat-black.png",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "샴",
          path: "/app-assets/cat-shyam.png",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "하얀 고양이",
          path: "/app-assets/cat-abyssinian.png",
          color: "#fdf1e3",
          rotate: -3,
        },
      ],
    },
    vision: {
      label: "우리의 약속",
      titleLead: "할 일 관리,",
      titleTail: "이렇게 즐거울 수 있습니다",
      quoteOneLead: "복잡한 기능은 오히려 집중을 방해합니다.",
      quoteOneTail: "우리는 정말 필요한 것만 남기고 모두 덜어냈어요.",
      quoteTwoLead: "친구와 함께하는 즐거움, 성취의 기쁨.",
      quoteTwoTail: "Aido는 당신의 하루를 가장 단순하고 즐겁게 만듭니다.",
    },
    values: {
      title: "Aido의 핵심 가치",
      items: [
        {
          icon: "sparkles",
          title: "개인 생산성",
          description:
            "말로 쓰면 AI가 정리하고, 반복 Todo로 완벽한 하루를 계획하세요.",
          rotate: -1,
        },
        {
          icon: "users",
          title: "소셜 동기부여",
          description: "콕 찌르기와 응원으로 친구와 함께 성장하세요.",
          rotate: 2,
        },
        {
          icon: "sparkles",
          title: "스마트 알림",
          description:
            "아침 리마인더부터 마감 3단계 알림까지, 미루기를 막아줍니다.",
          rotate: -2,
        },
      ],
    },
    roadmap: {
      label: "Our Journey",
      title: "주요 기능",
      groups: [
        {
          title: "소셜 기능",
          icon: "👥",
          goal: "친구와 함께 성장하기",
          items: [
            "친구 태그로 검색 & 요청",
            "친구 Todo 피드 공유",
            "콕 찌르기로 친구 독촉",
            "응원 메시지 보내기",
          ],
          color: "#fff9c4",
          rotate: -1,
        },
        {
          title: "할 일 관리",
          icon: "✓",
          goal: "스마트한 Todo 관리",
          items: [
            "AI 자연어 파싱으로 자동 생성",
            "날짜별 Todo 생성 & 관리",
            "반복 Todo (일/주/월)",
            "일별 완료율 캘린더",
          ],
          color: "#e3f2fd",
          rotate: 2,
        },
        {
          title: "알림 & 리마인더",
          icon: "🔔",
          goal: "놓치지 않는 알림",
          items: [
            "마감 전 3단계 알림",
            "맞춤 아침/저녁 리마인더",
            "친구 활동 알림",
            "주간 성취 요약 알림",
          ],
          color: "#f3e5f5",
          rotate: -2,
        },
        {
          title: "프리미엄 기능",
          icon: "⭐",
          goal: "더 넓은 가능성",
          items: [
            "5종 고양이 앱 아이콘",
            "무제한 AI 자연어 파싱",
            "무제한 콕 찌르기 & 응원",
            "카테고리 30개, 무제한 친구",
          ],
          color: "#e8f5e9",
          rotate: 1,
        },
        {
          title: "계정 & 보안",
          icon: "🔐",
          goal: "안전한 사용 환경",
          items: [
            "카카오/구글/애플 소셜 로그인",
            "프로필 관리",
            "보안 로그인 제한",
            "JWT 기반 안전한 인증",
          ],
          color: "#fce4ec",
          rotate: -1,
        },
      ],
    },
    appPreview: {
      titleLead: "이런 기능들이",
      titleHighlight: "당신을 기다리고 있어요",
      descriptionLead: "할 일 관리부터 친구와의 소통까지,",
      descriptionTail: "Aido의 주요 화면들을 미리 만나보세요.",
      screens: [
        {
          title: "홈",
          description: "오늘의 할 일을 한눈에",
          path: "/app-assets/home.png",
          rotate: -1,
        },
        {
          title: "주간 캘린더",
          description: "한 주를 한눈에 관리",
          path: "/app-assets/week-calendar.png",
          rotate: 1,
        },
        {
          title: "월간 캘린더",
          description: "한 달의 일정을 한 번에",
          path: "/app-assets/month-calendar.png",
          rotate: -1,
        },
        {
          title: "로그인",
          description: "간편한 소셜 로그인",
          path: "/app-assets/login.png",
          rotate: 2,
        },
        {
          title: "알림",
          description: "놓치지 않는 리마인더",
          path: "/app-assets/alert.png",
          rotate: -2,
        },
        {
          title: "콕 찌르기",
          description: "친구에게 동기부여",
          path: "/app-assets/nudge.png",
          rotate: 1,
        },
        {
          title: "앱 아이콘",
          description: "나만의 고양이 아이콘",
          path: "/app-assets/app-icon-change.png",
          rotate: -1,
        },
      ],
    },
    cta: {
      titleLineOne: "가장 먼저",
      titleLineTwo: "경험해보세요.",
      descriptionLineOne: "준비가 되는 대로 가장 설레는 소식을 보내드릴게요.",
      descriptionLineTwo: "무분별한 광고는 보내지 않습니다.",
      bubble: "속았죠? 아직 메일도 보낼 수 없답니다!",
      emailPlaceholder: "이메일 주소 입력",
      buttonLabel: "알림 받기",
      privacyNote: "* 우리는 당신의 개인정보를 소중히 여깁니다.",
      playfulText: "아이두 아이두~ 🎵",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "친구와 함께 성장하는 할 일 관리",
      contactBadge: "고객 문의",
      representativeLabel: "대표",
      representativeValue: "김용민",
      businessNumberLabel: "사업자 번호",
      businessNumberValue: "309-08-95749",
      ecommerceLabel: "통신판매업 신고번호",
      ecommerceValue: "2026-서울강동-0281",
      hostingLabel: "호스팅사업자",
      hostingValue: "Vercel Inc.",
      inquiryLabel: "고객 문의",
      inquiryValue: "dydals3440@gmail.com",
      termsLabel: "이용약관",
      privacyLabel: "개인정보처리방침",
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
  },
  en: {
    meta: {
      title:
        "Aido | The Most Delightful To-Do Experience Arrives in Spring 2026",
      description:
        "A fresh social to-do experience that helps you grow with friends. Speak naturally and AI organizes your tasks. Nudge friends to stay on track. Coming Spring 2026.",
      openGraphTitle:
        "Aido | The Most Delightful To-Do Experience Arrives in Spring 2026",
      openGraphDescription:
        "Speak naturally and AI organizes your tasks. Nudge friends to stay on track. Grow together with Aido.",
      keywords: [
        "Aido",
        "to-do app",
        "task management",
        "AI assistant",
        "social productivity",
        "habit tracking",
        "cat productivity app",
        "upcoming app",
      ],
    },
    languageSwitcher: {
      label: "Language",
      ko: "KO",
      en: "EN",
    },
    nav: {
      friends: "Cat Friends",
      notify: "Get Launch Alerts",
    },
    hero: {
      headingLead: "No more quitting after three days,",
      headingHighlight: "achieve more every day with friends",
      descriptionLead:
        "Tasks you used to postpone become easier when you do them with friends.",
      descriptionTail:
        "Just speak, AI organizes it all — and your cat crew cheers you on every step.",
      arrowNote: "See you soon!",
      launchBadge: "🌸 Be the first to meet Aido in Spring 2026",
      scrollLabel: "Learn more",
    },
    storeButtons: {
      bubble: "We are still preparing for launch. Please stay tuned 🐾",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    friends: {
      label: "Meet the Team",
      title: "We're cheering for all of you!",
      descriptionLead: "A unique group of cat friends supports you every day.",
      descriptionTail:
        "They celebrate your wins and encourage you through hard moments.",
      cards: [
        {
          name: "Scottish Fold",
          path: "/app-assets/cat-scottish-fold.png",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "Cheese Tabby",
          path: "/app-assets/cat-orange-tabby.png",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "Black Cat",
          path: "/app-assets/cat-black.png",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "Siamese",
          path: "/app-assets/cat-shyam.png",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "White Cat",
          path: "/app-assets/cat-abyssinian.png",
          color: "#fdf1e3",
          rotate: -3,
        },
      ],
    },
    vision: {
      label: "Our Promise",
      titleLead: "Task management",
      titleTail: "can be this joyful",
      quoteOneLead: "Too many features get in the way of focus.",
      quoteOneTail: "We removed the noise and kept only what truly matters.",
      quoteTwoLead: "The joy of doing things together, the thrill of progress.",
      quoteTwoTail: "Aido keeps your day simple, clear, and rewarding.",
    },
    values: {
      title: "Core Values of Aido",
      items: [
        {
          icon: "sparkles",
          title: "Personal Productivity",
          description:
            "Just speak and AI organizes your tasks. Plan each day with recurring todos.",
          rotate: -1,
        },
        {
          icon: "users",
          title: "Social Motivation",
          description: "Nudge and cheer friends to grow together.",
          rotate: 2,
        },
        {
          icon: "sparkles",
          title: "Smart Reminders",
          description:
            "From morning reminders to 3-stage deadline alerts — no more procrastinating.",
          rotate: -2,
        },
      ],
    },
    roadmap: {
      label: "Our Journey",
      title: "Key Features",
      groups: [
        {
          title: "Social Features",
          icon: "👥",
          goal: "Grow together with friends",
          items: [
            "Search friends by tag",
            "Shared to-do feed",
            "Nudge friends to stay on track",
            "Send cheer messages",
          ],
          color: "#fff9c4",
          rotate: -1,
        },
        {
          title: "Task Management",
          icon: "✓",
          goal: "Smarter daily planning",
          items: [
            "AI natural language parsing",
            "Date-based to-do creation",
            "Recurring tasks (day/week/month)",
            "Daily completion calendar",
          ],
          color: "#e3f2fd",
          rotate: 2,
        },
        {
          title: "Alerts & Reminders",
          icon: "🔔",
          goal: "Never miss what matters",
          items: [
            "3-stage deadline alerts",
            "Custom morning/evening reminders",
            "Friend activity alerts",
            "Weekly achievement summary",
          ],
          color: "#f3e5f5",
          rotate: -2,
        },
        {
          title: "Premium Tools",
          icon: "⭐",
          goal: "Unlock more possibilities",
          items: [
            "5 cat app icons",
            "Unlimited AI parsing",
            "Unlimited nudge & cheer",
            "30 categories, unlimited friends",
          ],
          color: "#e8f5e9",
          rotate: 1,
        },
        {
          title: "Account & Security",
          icon: "🔐",
          goal: "A safer experience",
          items: [
            "Kakao/Google/Apple sign-in",
            "Profile management",
            "Secure login controls",
            "JWT-based secure auth",
          ],
          color: "#fce4ec",
          rotate: -1,
        },
      ],
    },
    appPreview: {
      titleLead: "Here's what's",
      titleHighlight: "waiting for you",
      descriptionLead: "From task management to social motivation,",
      descriptionTail: "take a sneak peek at Aido's key screens.",
      screens: [
        {
          title: "Home",
          description: "Your daily tasks at a glance",
          path: "/app-assets/home.png",
          rotate: -1,
        },
        {
          title: "Weekly",
          description: "Plan your week ahead",
          path: "/app-assets/week-calendar.png",
          rotate: 1,
        },
        {
          title: "Monthly",
          description: "See the full month view",
          path: "/app-assets/month-calendar.png",
          rotate: -1,
        },
        {
          title: "Login",
          description: "Quick social sign-in",
          path: "/app-assets/login.png",
          rotate: 2,
        },
        {
          title: "Alerts",
          description: "Never miss a reminder",
          path: "/app-assets/alert.png",
          rotate: -2,
        },
        {
          title: "Nudge",
          description: "Motivate your friends",
          path: "/app-assets/nudge.png",
          rotate: 1,
        },
        {
          title: "App Icons",
          description: "Pick your cat icon",
          path: "/app-assets/app-icon-change.png",
          rotate: -1,
        },
      ],
    },
    cta: {
      titleLineOne: "Be among the first",
      titleLineTwo: "to try Aido.",
      descriptionLineOne: "We will send updates as soon as we are ready.",
      descriptionLineTwo: "No spam, only meaningful launch news.",
      bubble: "Got you. We cannot send real emails just yet!",
      emailPlaceholder: "Enter your email",
      buttonLabel: "Notify me",
      privacyNote: "* We respect and protect your personal data.",
      playfulText: "Aido, Aido~ 🎵",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "A social to-do experience that helps friends grow together",
      contactBadge: "Contact",
      representativeLabel: "Representative",
      representativeValue: "Yongmin Kim",
      businessNumberLabel: "Business Registration No.",
      businessNumberValue: "309-08-95749",
      ecommerceLabel: "E-commerce Registration No.",
      ecommerceValue: "2026-Seoul-Gangdong-0281",
      hostingLabel: "Hosting Provider",
      hostingValue: "Vercel Inc.",
      inquiryLabel: "Customer Inquiry",
      inquiryValue: "dydals3440@gmail.com",
      termsLabel: "Terms of Service",
      privacyLabel: "Privacy Policy",
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
  },
};

export function getMessages(locale: Locale): MessageCatalog {
  return catalogs[locale];
}
