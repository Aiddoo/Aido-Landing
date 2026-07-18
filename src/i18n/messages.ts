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
  description: string[];
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
  subtitle: string;
  description: string[];
  path: string;
  secondPath?: string;
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
    download: string;
    patchNotes: string;
  };
  hero: {
    headingLead: string;
    headingHighlight: string;
    headingTail: string;
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
    instagramPrefix: string;
    instagramLabel: string;
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
    description: string;
    highlights: string[];
    closingNote: string;
    playfulText: string;
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
  patchNotes: {
    title: string;
    description: string;
    backHome: string;
    bugFixes: string;
    features: string;
    improvements: string;
    newRelease: string;
    latest: string;
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
      title: "아이두 - AI 투두 플래너 | 친구와 함께 성장하는 할 일 관리",
      description:
        "AI와 함께하는 소셜 투두. 말로 쓰면 AI가 정리하고, 친구와 콕 찌르기로 함께 성장하세요. 고양이 친구들이 매일 응원해주는 새로운 할 일 관리 앱.",
      openGraphTitle: "아이두 - AI 투두 플래너",
      openGraphDescription:
        "AI와 함께하는 소셜 투두. 말로 쓰면 AI가 정리하고, 친구와 콕 찌르기로 함께 성장하세요.",
      keywords: [
        "아이두",
        "Aido",
        "AI 투두",
        "AI 할 일 관리",
        "투두 플래너",
        "소셜 투두",
        "할 일 관리 앱",
        "AI 비서",
        "고양이 투두",
        "생산성 앱",
        "App Store",
        "Google Play",
      ],
    },
    languageSwitcher: {
      label: "언어",
      ko: "KO",
      en: "EN",
    },
    nav: {
      friends: "고양이 친구들",
      download: "앱 다운로드",
      patchNotes: "패치 노트",
    },
    hero: {
      headingLead: "작심삼일은",
      headingHighlight: "이제 그만,",
      headingTail: "친구와 함께 매일 성취하세요",
      descriptionLead: "혼자서는 미루던 일도, 친구와 함께라면 달라집니다.",
      descriptionTail:
        "말로 쓰면 AI가 정리하고, 고양이 친구들이 매일 응원해줄 거예요.",
      arrowNote: "지금 다운로드!",
      launchBadge: "지금 App Store와 Google Play에서 만나보세요",
      scrollLabel: "더 알아보기",
    },
    storeButtons: {
      bubble: "아직 출시 준비 중이에요! 조금만 기다려주세요 🐾",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
      instagramPrefix: "최신소식 받아보기",
      instagramLabel: "Instagram",
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
          description: [
            "말로 쓰면 AI가 정리하고,",
            "반복 Todo로 완벽한 하루를 계획하세요.",
          ],
          rotate: -1,
        },
        {
          icon: "users",
          title: "소셜 동기부여",
          description: ["콕 찌르기와 응원으로", "친구와 함께 성장하세요."],
          rotate: 2,
        },
        {
          icon: "sparkles",
          title: "스마트 알림",
          description: [
            "아침 리마인더부터 마감 3단계 알림까지,",
            "미루기를 막아줍니다.",
          ],
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
            "콕 찌르기로 친구 응원",
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
          title: "말로 쓰면, AI가 정리해요",
          subtitle: "스마트 할 일 관리",
          description: [
            "생각나는 대로 적거나 말하면",
            "AI가 자동으로 분류하고 일정에 넣어줘요.",
            "복잡한 입력은 이제 그만.",
          ],
          path: "/app-assets/home.png",
          rotate: -2,
        },
        {
          title: "한눈에 보는 나의 일정",
          subtitle: "주간·월간 캘린더",
          description: [
            "오늘 할 일부터 한 달 계획까지,",
            "캘린더 하나로 깔끔하게 관리하세요.",
          ],
          path: "/app-assets/month-calendar-new.png",
          secondPath: "/app-assets/week-calendar-new.png",
          rotate: 2,
        },
        {
          title: "친구와 콕 찔러 응원해요",
          subtitle: "소셜 동기부여",
          description: [
            "혼자 미루던 일도 친구가 콕 찌르면 달라져요.",
            "서로 콕 찌르고, 함께 달성하세요.",
          ],
          path: "/app-assets/nudge-new.png",
          rotate: -2,
        },
        {
          title: "AI가 분석하고, 알아서 추천까지",
          subtitle: "AI 리포트 & 추천",
          description: [
            "달성률과 습관 패턴을 분석하고,",
            "반복되는 할 일은 자동으로 제안해줘요.",
            "수락만 누르면 끝.",
          ],
          path: "/app-assets/ai-report.png",
          secondPath: "/app-assets/ai-recommend.png",
          rotate: 2,
        },
      ],
    },
    cta: {
      titleLineOne: "지금 시작하세요.",
      titleLineTwo: "매일이 달라집니다.",
      description: "고양이 친구들과 AI가 당신의 하루를 함께 만들어갑니다.",
      highlights: [
        "AI 할 일 정리",
        "소셜 동기부여",
        "스마트 알림",
        "5종 고양이 친구",
        "iOS & Android",
      ],
      closingNote: "작은 시작이 큰 변화를 만듭니다.",
      playfulText: "아이두 아이두~ 🎵",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "친구와 함께 성장하는 할 일 관리",
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
    patchNotes: {
      title: "패치 노트",
      description: "Aido의 최신 업데이트 내역을 확인하세요.",
      backHome: "홈으로",
      bugFixes: "버그 수정",
      features: "새로운 기능",
      improvements: "개선 사항",
      newRelease: "신규 출시",
      latest: "최신",
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
      title: "Aido - AI To-Do Planner | Social Productivity with Friends",
      description:
        "A social to-do app powered by AI. Speak naturally and AI organizes your tasks. Nudge friends and grow together. Cat friends cheer you on every day.",
      openGraphTitle: "Aido - AI To-Do Planner",
      openGraphDescription:
        "A social to-do app powered by AI. Speak naturally and AI organizes your tasks. Nudge friends and grow together.",
      keywords: [
        "Aido",
        "AI to-do",
        "AI task management",
        "to-do planner",
        "social to-do",
        "task management app",
        "AI assistant",
        "cat productivity",
        "productivity app",
        "App Store",
        "Google Play",
      ],
    },
    languageSwitcher: {
      label: "Language",
      ko: "KO",
      en: "EN",
    },
    nav: {
      friends: "Cat Friends",
      download: "Download App",
      patchNotes: "Patch Notes",
    },
    hero: {
      headingLead: "No more quitting after",
      headingHighlight: "three days,",
      headingTail: "achieve more every day with friends",
      descriptionLead:
        "Tasks you used to postpone become easier when you do them with friends.",
      descriptionTail:
        "Just speak, AI organizes it all — and your cat crew cheers you on every step.",
      arrowNote: "Download now!",
      launchBadge: "Now on the App Store and Google Play",
      scrollLabel: "Learn more",
    },
    storeButtons: {
      bubble: "We are still preparing for launch. Please stay tuned 🐾",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
      instagramPrefix: "FOLLOW US ON",
      instagramLabel: "Instagram",
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
          description: [
            "Just speak and AI organizes your tasks.",
            "Plan each day with recurring todos.",
          ],
          rotate: -1,
        },
        {
          icon: "users",
          title: "Social Motivation",
          description: ["Nudge and cheer friends", "to grow together."],
          rotate: 2,
        },
        {
          icon: "sparkles",
          title: "Smart Reminders",
          description: [
            "From morning reminders to 3-stage deadline alerts —",
            "no more procrastinating.",
          ],
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
            "Nudge friends and cheer them on",
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
          title: "Just say it, AI organizes it",
          subtitle: "Smart Task Management",
          description: [
            "Type or speak your thoughts and",
            "AI automatically categorizes and schedules them.",
            "No more complicated inputs.",
          ],
          path: "/app-assets/home.png",
          rotate: -2,
        },
        {
          title: "Your schedule at a glance",
          subtitle: "Weekly & Monthly Calendar",
          description: [
            "From today's tasks to monthly plans,",
            "manage everything cleanly with one calendar.",
          ],
          path: "/app-assets/month-calendar-new.png",
          secondPath: "/app-assets/week-calendar-new.png",
          rotate: 2,
        },
        {
          title: "Nudge friends to keep going",
          subtitle: "Social Motivation",
          description: [
            "Tasks you kept putting off change",
            "when a friend nudges you.",
            "Push each other and achieve together.",
          ],
          path: "/app-assets/nudge-new.png",
          rotate: -2,
        },
        {
          title: "AI analyzes and recommends for you",
          subtitle: "AI Report & Suggestions",
          description: [
            "Analyzes your completion rates and habit patterns,",
            "then automatically suggests recurring tasks.",
            "Just tap accept.",
          ],
          path: "/app-assets/ai-report.png",
          secondPath: "/app-assets/ai-recommend.png",
          rotate: 2,
        },
      ],
    },
    cta: {
      titleLineOne: "Start today.",
      titleLineTwo: "Every day gets better.",
      description:
        "Cat friends and AI work together to transform your daily routine.",
      highlights: [
        "AI Task Planning",
        "Social Motivation",
        "Smart Reminders",
        "5 Cat Friends",
        "iOS & Android",
      ],
      closingNote: "Small steps lead to big changes.",
      playfulText: "Aido, Aido~ 🎵",
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "A social to-do experience that helps friends grow together",
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
    patchNotes: {
      title: "Patch Notes",
      description: "Check out the latest updates for Aido.",
      backHome: "Home",
      bugFixes: "Bug Fixes",
      features: "Features",
      improvements: "Improvements",
      newRelease: "New Release",
      latest: "Latest",
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
