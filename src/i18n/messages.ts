import type { ServiceFeatureId } from "@/features/services/data/service-features";
import type { Locale } from "./config";

/** 가이드 화면(data/feature-guides.ts의 screens)과 같은 순서의 대체 텍스트·설명 */
type GuideScreenCopy = { alt: string; caption: string };
type FeatureGuideContent = {
  /** 제목 위 손글씨 한 줄 */
  kicker: string;
  title: string;
  summary: string;
  cardDescription: string;
  steps: { title: string; body: string }[];
  example: { introduction: string; items: string[]; note: string };
  details: { title: string; body: string }[];
  plans: { free: string; premium: string };
  faq: { question: string; answer: string }[];
  screens: GuideScreenCopy[];
};
/** 친구 초대 가이드는 요금제 대신 누가·언제·무엇을 받는지와 조건을 보여 준다. */
export type FriendInviteGuideContent = Omit<FeatureGuideContent, "plans"> & {
  rewards: {
    items: { who: string; when: string; reward: string; condition: string }[];
    limits: string[];
    termsNote: string;
    termsLink: string;
  };
};

type PremiumBenefitId =
  | "aiParsing"
  | "nudge"
  | "friends"
  | "reminder"
  | "aiReport"
  | "aiRepeat"
  | "categories"
  | "appIcon";
type HomeCatalog = {
  hero: {
    release: string;
    titleLead: string;
    titleTail: string;
    description: string;
    note: string;
    screenAlt: string;
    nudgeName: string;
    nudgeText: string;
    doneNote: string;
  };
  ai: {
    kicker: string;
    title: string;
    description: string;
    exampleLabel: string;
    examples: { input: string; date: string; time: string }[];
    voiceAlt: string;
    parseAlt: string;
    repeatAlt: string;
    guideLink: string;
    repeatGuideLink: string;
  };
  friends: {
    kicker: string;
    title: string;
    description: string;
    feedAlt: string;
    nudgeAlt: string;
    nudgeName: string;
    nudgeText: string;
    guideLink: string;
  };
  invite: {
    badge: string;
    kicker: string;
    title: string;
    description: string;
    rewardTitle: string;
    friendLabel: string;
    friendWhen: string;
    friendReward: string;
    myLabel: string;
    myWhen: string;
    myReward: string;
    conditionBadge: string;
    conditionNote: string;
    boardTitle: string;
    boardSummary: string;
    boardHint: string;
    boardAlt: string;
    fullBoardAlt: string;
    guideLink: string;
  };
  largeScreen: {
    badge: string;
    kicker: string;
    title: string;
    description: string;
    foldedNote: string;
    unfoldedNote: string;
    foldedAlt: string;
    unfoldedAlt: string;
    ipadTitle: string;
    ipadDescription: string;
    ipadAlt: string;
    widgetTitle: string;
    widgetDescription: string;
    widgetAlt: string;
  };
  routine: {
    kicker: string;
    title: string;
    reportTitle: string;
    reportDescription: string;
    reportAlt: string;
    reminderTitle: string;
    reminderDescription: string;
    reminderAlt: string;
    premiumLabel: string;
  };
  premium: {
    kicker: string;
    title: string;
    description: string;
    note: string;
    /** 앱 구독 화면(subscription.json benefits)과 같은 문구. 지어내지 않는다. */
    benefits: { id: PremiumBenefitId; title: string; description: string }[];
  };
  /** MobileApplication JSON-LD featureList */
  appFeatures: string[];
};
export type MessageCatalog = {
  analyticsConsent: {
    title: string;
    description: string;
    accept: string;
    reject: string;
    privacy: string;
    settings: string;
    storageError: string;
    close: string;
  };
  featureGuides: {
    title: string;
    description: string;
    readGuide: string;
    breadcrumbLabel: string;
    screenNote: string;
    stepsTitle: string;
    exampleTitle: string;
    plansTitle: string;
    freeLabel: string;
    premiumLabel: string;
    plansNote: string;
    rewardsTitle: string;
    rewardsLimitsTitle: string;
    pawBoardLabel: string;
    faqTitle: string;
    relatedTitle: string;
    relatedDescription: string;
    updatedLabel: string;
    guides: {
      "shared-todo": FeatureGuideContent;
      "recurring-todo": FeatureGuideContent;
      "ai-todo": FeatureGuideContent;
      "friend-invite": FriendInviteGuideContent;
    };
  };
  services: {
    kicker: string;
    title: string;
    description: string;
    introduction: string;
    screenshotNote: string;
    premiumLabel: string;
    sampleLabel: string;
    iosLabel: string;
    androidLabel: string;
    jumpLabel: string;
    features: Record<
      ServiceFeatureId,
      {
        navigationLabel: string;
        title: string;
        description: string;
        details: string[];
        captions: string[];
      }
    >;
  };
  meta: {
    title: string;
    description: string;
    openGraphTitle: string;
    openGraphDescription: string;
    keywords: string[];
  };
  home: HomeCatalog;
  faq: {
    title: string;
    description: string;
    items: { question: string; answer: string }[];
  };
  footer: {
    copyright: string;
    tagline: string;
    serviceTitle: string;
    policyTitle: string;
    linkHubTitle: string;
    linkHubLabel: string;
    downloadTitle: string;
    businessLabel: string;
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
    accountDeletionLabel: string;
    instagramLabel: string;
    externalLinkLabel: string;
  };
  legal: {
    badge: string;
    viewTermsLabel: string;
    viewPrivacyLabel: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    accountDeletionTitle: string;
    accountDeletionDescription: string;
  };
  patchNotes: {
    kicker: string;
    title: string;
    description: string;
    appUpdate: string;
    serviceUpdate: string;
    noAppUpdateNeeded: string;
    updateSummary: string;
    copySummary: string;
    summaryCopied: string;
    copySummaryFallback: string;
    bugFixes: string;
    features: string;
    improvements: string;
    newRelease: string;
    latest: string;
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
    ko: string;
    en: string;
    navLabel: string;
  };
  nav: {
    label: string;
    guides: string;
    invite: string;
    services: string;
    download: string;
    patchNotes: string;
    open: string;
    close: string;
    menuTitle: string;
    guidesTitle: string;
    moreTitle: string;
  };
  accessibility: {
    skip: string;
    home: string;
    breadcrumb: string;
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
  invite: {
    metaTitle: string;
    metaDescription: string;
    brandLabel: string;
    loadingLabel: string;
    /** `{name}`을 초대한 사람의 닉네임으로 바꾼다. */
    titleTemplate: string;
    titleFallback: string;
    lead: string;
    /** `{name}`을 초대한 사람의 닉네임으로 바꾼다. */
    avatarAltTemplate: string;
    avatarAltFallback: string;
    receiptLabel: string;
    rewardLabel: string;
    rewardValue: string;
    codeLabel: string;
    codeCopy: string;
    codeCopied: string;
    codeCopyAria: string;
    codeCopiedStatus: string;
    codeManualStatus: string;
    codeHint: string;
    outdatedNote: string;
    rewardTermsNote: string;
    rewardTermsLink: string;
    errors: Record<
      "invalidCode" | "notFound" | "changed" | "unavailable" | "unknown",
      { title: string; description: string }
    >;
  };
};

const catalogs: Record<Locale, MessageCatalog> = {
  ko: {
    services: {
      kicker: "아이두 한 바퀴 둘러보기",
      title: "친구와 함께하는 하루를 둘러보세요",
      description:
        "친구와 할 일을 공유하고 콕으로 응원해요. 캘린더와 메모, AI 정리까지 아이두의 실제 iOS와 Android 화면으로 살펴보세요.",
      introduction:
        "친구의 할 일을 보고 응원을 보내요. 하나를 끝내면 고마운 마음도 전해 보세요. 각자의 계획을 함께 이어 가는 방법을 보여드릴게요.",
      screenshotNote:
        "실제 iOS와 Android 앱을 예시 계정으로 촬영했어요. 이름과 할 일은 소개를 위한 예시예요.",
      premiumLabel: "프리미엄",
      sampleLabel: "예시 화면",
      iosLabel: "iPhone",
      androidLabel: "Android",
      jumpLabel: "보고 싶은 기능으로 이동",
      features: {
        planning: {
          navigationLabel: "캘린더",
          title: "오늘부터 한 달까지 한눈에",
          description: "주간·월간 캘린더에서 나의 속도로 계획을 세워요.",
          details: [
            "날짜를 눌러 할 일을 확인하고, 오늘 버튼으로 돌아와요.",
            "카테고리 색으로 계획을 구분하고, 마친 날에는 작은 발자국을 남겨요.",
          ],
          captions: ["주간 캘린더와 오늘의 할 일", "월간 캘린더의 날짜별 계획"],
        },
        todos: {
          navigationLabel: "할 일",
          title: "큰일도 작은 단계부터",
          description: "날짜와 시간을 정하고 반복 일정과 체크리스트를 더해요.",
          details: [
            "체크리스트로 해야 할 일을 차근차근 나눠요.",
            "매일, 주중, 주말 또는 원하는 요일에 반복하도록 설정해요.",
            "할 일마다 공개 범위를 골라 나만의 계획도 간직해요.",
          ],
          captions: ["할 일 상세와 체크리스트", "반복할 요일과 기간 선택"],
        },
        notes: {
          navigationLabel: "메모",
          title: "아직 계획이 아닌 생각도 괜찮아요",
          description: "떠오른 생각을 메모해 두고, 준비가 되면 할 일로 옮겨요.",
          details: [
            "자주 보는 메모는 고정하고, 원하는 순서로 정리해요.",
            "메모를 한 개의 할 일로 바꾸거나, AI로 여러 할 일로 나눠요.",
          ],
          captions: ["고정 메모와 메모 목록", "메모 상세와 할 일로 바꾸기"],
        },
        ai: {
          navigationLabel: "AI 입력",
          title: "생각나는 대로 적거나 말해요",
          description: "자연스러운 문장과 음성으로 할 일을 입력해요.",
          details: [
            "날짜와 시간을 함께 적으면 AI가 계획으로 정리해요.",
            "메모에서 나눈 할 일은 결과를 살펴보고 선택해 추가해요.",
            "AI 입력의 이용 한도는 앱의 현재 요금제 안내에서 확인할 수 있어요.",
          ],
          captions: [
            "날짜와 시간, AI 입력이 있는 할 일 추가",
            "메모에서 AI 할 일 정리 시작",
          ],
        },
        friends: {
          navigationLabel: "친구",
          title: "친구와 할 일을 나누고 응원해요",
          description:
            "공개한 할 일을 친구와 나누고 콕과 댓글로 서로 응원해요.",
          details: [
            "이름이나 고유 해시태그로 친구를 찾고 연결해요.",
            "친구의 할 일에 콕을 보내거나 댓글과 답글로 이야기를 나눠요.",
            "보낸 콕은 따로 모아 확인할 수 있어요.",
          ],
          captions: ["친구의 캘린더와 할 일", "내가 보낸 콕 목록"],
        },
        nudges: {
          navigationLabel: "콕과 답장",
          title: "콕에 답하고 완료 소식을 전해요",
          description:
            "받은 콕에 내 마음을 답하고, 할 일을 마친 뒤 고마움을 전해요.",
          details: [
            "시작할게, 응원 고마워, 조금 뒤에 할게. 지금 마음에 맞는 답장을 골라요.",
            "응원해 준 친구들을 확인하고, 완료 소식과 고마운 마음을 함께 전해요.",
            "답장만으로 할 일이 완료되지는 않아요.",
          ],
          captions: [
            "친구가 보낸 콕과 세 가지 답장",
            "응원해 준 친구들에게 고마움 전하기",
          ],
        },
        notifications: {
          navigationLabel: "알림",
          title: "친구의 마음과 내 일정, 한곳에서",
          description: "알림을 살펴보고 필요한 화면으로 자연스럽게 이동해요.",
          details: [
            "친구 소식과 콕은 친구 탭에 모아봐요.",
            "아침·저녁 리마인더와 날씨 알림 시간을 나의 하루에 맞춰요.",
            "받고 싶은 알림과 광고성 알림 동의는 직접 관리해요.",
          ],
          captions: [
            "친구 소식을 모은 알림 목록",
            "내 시간에 맞춘 리마인더 설정",
          ],
        },
        weather: {
          navigationLabel: "날씨",
          title: "나가기 전에 날씨도 살펴요",
          description: "할 일을 확인하면서 현재 위치의 날씨도 함께 봐요.",
          details: [
            "홈의 날씨 버튼에서 자세한 시간별·주간 예보를 열어요.",
            "위치 권한은 선택할 수 있고, 날씨가 준비되지 않아도 할 일은 계속 쓸 수 있어요.",
            "현재 날씨 서비스는 대한민국 지역을 지원해요. 해외에서는 안내 화면을 보여드려요.",
          ],
          captions: ["현재 날씨와 시간별 예보", "Android 날씨 화면"],
        },
        widgets: {
          navigationLabel: "위젯",
          title: "홈 화면에서 오늘 할 일을 봐요",
          description:
            "작은 진행 상황부터 주간 달력까지, 홈 화면 크기에 맞게 골라요.",
          details: [
            "작은 위젯은 완료 수, 진행률, 연속 기록을 보여줘요.",
            "중간 위젯은 오늘 할 일을, 큰 위젯은 주간 달력과 목록을 함께 보여줘요.",
            "할 일을 누르면 앱에서 확인하고, 만들기 버튼으로 새 할 일을 시작해요.",
            "위젯 갱신 시점은 기기와 운영체제에 따라 달라질 수 있어요.",
          ],
          captions: [
            "iPhone 홈 화면의 아이두 위젯",
            "Android의 주간 달력 위젯",
            "Android의 작은·중간 위젯",
          ],
        },
        insights: {
          navigationLabel: "리포트와 제안",
          title: "기록을 돌아보고 다음 계획을 세워요",
          description: "AI 리포트와 반복 제안으로 나에게 맞는 패턴을 돌아봐요.",
          details: [
            "주간·월간 리포트에서 달성률과 카테고리별 기록을 확인해요.",
            "반복되는 할 일은 AI 제안을 살펴보고 내 일정에 더해요.",
            "아래 리포트와 제안은 기능 소개를 위한 예시예요.",
          ],
          captions: [
            "앱에서 제공하는 샘플 주간 리포트",
            "반복 제안 예시와 수락·건너뛰기",
          ],
        },
        personal: {
          navigationLabel: "나만의 아이두",
          title: "나의 고양이, 나의 아이두",
          description: "마이 페이지에서 프로필과 나에게 편한 화면을 고르세요.",
          details: [
            "아홉 가지 고양이 프로필 중 나를 닮은 친구를 골라요.",
            "라이트 모드나 다크 모드를 고르고 글자 크기와 앱 언어를 설정해요.",
            "프리미엄에서는 iOS와 Android 앱 아이콘도 바꿀 수 있어요.",
          ],
          captions: [
            "아홉 고양이 중 프로필 선택",
            "기기 홈 화면의 앱 아이콘 선택",
            "다크 모드로 보는 오늘의 할 일",
          ],
        },
      },
    },
    analyticsConsent: {
      title: "웹사이트 이용 분석",
      description:
        "동의하면 Google Analytics와 Vercel Analytics로 방문 경로와 스토어 버튼 이용을 분석해요. 선택은 언제든 변경할 수 있어요.",
      accept: "분석 허용",
      reject: "허용 안 함",
      privacy: "개인정보처리방침",
      settings: "웹사이트 분석 설정",
      storageError: "선택을 저장하지 못했어요. 분석은 꺼진 상태로 유지됩니다.",
      close: "닫기",
    },
    featureGuides: {
      title: "친구와 함께 시작하는 아이두",
      description:
        "친구를 연결하고 할 일을 공유해 보세요. 반복 일정과 AI 정리도 차근차근 알아봐요.",
      readGuide: "가이드 보기",
      breadcrumbLabel: "기능 가이드",
      screenNote: "실제 앱 화면이에요",
      stepsTitle: "이렇게 시작해 보세요",
      exampleTitle: "내 하루에 이렇게 써 봐요",
      plansTitle: "무료로 시작하고, 필요할 때 더 넉넉하게",
      freeLabel: "무료",
      premiumLabel: "프리미엄",
      plansNote: "구독 가격과 상세 이용 조건은 앱에서 확인할 수 있어요.",
      rewardsTitle: "누가, 언제 받나요",
      rewardsLimitsTitle: "조건이 있어요",
      pawBoardLabel: "발자국 모으기 판",
      faqTitle: "자주 묻는 질문",
      relatedTitle: "다음으로 알아볼 기능",
      relatedDescription: "내 하루에 필요한 기능을 하나씩 더해 보세요.",
      updatedLabel: "내용 확인일",
      guides: {
        "ai-todo": {
          kicker: "말 한마디면 정리 끝",
          title: "메모와 음성을 AI로 할 일로 정리하기",
          summary:
            "아이두는 떠오르는 생각을 메모로 남기고, AI로 여러 할 일과 체크리스트 항목으로 정리할 수 있는 투두 리스트 앱이에요. 문장을 입력하거나 말로 할 일을 만들 수도 있어요. 정리된 결과를 확인한 뒤 내 계획에 맞게 선택하고 수정해요.",
          steps: [
            {
              title: "생각나는 내용을 메모해요",
              body: "하단의 메모 탭에서 새 메모를 만들어요. 여행 준비처럼 한 번에 정리하기 어려운 일도 떠오르는 순서대로 적어 보세요.",
            },
            {
              title: "메모 상단의 로봇 아이콘을 눌러요",
              body: "AI 이용 횟수와 안내를 확인하고 시작하기를 눌러요. 결과가 나올 때까지 화면에서 기다려 주세요.",
            },
            {
              title: "필요한 할 일만 남기고 다듬어요",
              body: "AI가 정리한 제목과 체크리스트 항목을 읽어봐요. 필요 없는 할 일은 닫기 버튼으로 제외하고, 제목, 날짜, 시간, 카테고리를 내 계획에 맞게 수정해요.",
            },
            {
              title: "할 일로 만들고 하나씩 끝내요",
              body: "남겨 둔 할 일을 생성해요. 할 일 상세의 수정하기에서 내용을 다시 다듬을 수 있고, 끝낸 일은 완료로 표시해요.",
            },
          ],
          example: {
            introduction:
              "여행 전에 머릿속이 복잡하다면, 먼저 메모에 준비할 일을 모아 보세요.",
            items: [
              "메모 예시: 제주 여행 전에 항공권을 확인하고, 숙소를 예약하고, 짐을 챙겨야 해요.",
              "정리 예시: 항공권 확인하기, 숙소 예약하기, 짐 챙기기.",
              "짐 챙기기에 충전기, 세면도구 같은 체크리스트 항목을 더해요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. AI 결과는 입력 내용에 따라 달라지므로 생성 전에 확인해 주세요.",
          },
          details: [
            {
              title: "짧은 할 일은 마이크 버튼으로 말해요",
              body: "할 일 추가 화면의 마이크 버튼을 눌러요. ‘이번 주 금요일 저녁 7시 약속’처럼 날짜와 시간을 함께 말해 보세요. AI가 채운 내용은 저장 전에 확인해요. 음성 입력에는 기기의 마이크와 음성 인식 권한이 필요할 수 있어요.",
            },
            {
              title: "AI 없이 직접 정리해도 괜찮아요",
              body: "한 가지 할 일은 직접 입력하고 날짜, 시간, 반복, 공개 범위와 카테고리를 설정할 수 있어요. 메모 상세의 할 일로 변환을 이용하면 메모를 한 개의 할 일로 옮길 수도 있어요.",
            },
          ],
          plans: {
            free: "메모 작성과 기본 할 일 관리를 무료로 시작할 수 있어요. AI로 할 일을 정리하는 기능은 메모 AI와 함께 월 5회 한도를 사용하며, 매월 1일 0시(한국 시간)에 초기화돼요.",
            premium:
              "AI 할 일 정리를 횟수 제한 없이 이용할 수 있어요. AI 주간·월간 리포트와 반복 할 일 제안도 프리미엄에서 제공해요.",
          },
          faq: [
            {
              question: "AI가 만든 할 일을 수정할 수 있나요?",
              answer:
                "네. 생성 전에 필요 없는 할 일을 제외하고 제목, 날짜, 시간, 카테고리를 수정할 수 있어요. 생성한 뒤에도 할 일 상세에서 수정하기를 눌러 내용을 바꿀 수 있어요.",
            },
            {
              question: "메모마다 AI를 꼭 사용해야 하나요?",
              answer:
                "아니에요. 메모만 남겨 두거나 직접 할 일을 만들 수 있어요. 메모 상세의 할 일로 변환으로 한 개의 할 일로 옮기는 방법도 있어요.",
            },
            {
              question: "음성으로 날짜와 시간도 입력할 수 있나요?",
              answer:
                "네. 할 일 추가 화면의 마이크 버튼을 눌러 날짜와 시간을 포함해 말할 수 있어요. 인식한 내용과 AI가 정리한 일정을 확인한 뒤 저장해 주세요.",
            },
          ],
          screens: [
            {
              alt: "‘말로 할 일을 추가해요’ 안내가 보이는 아이두 할 일 추가 화면",
              caption: "마이크 버튼을 누르고 날짜와 시간을 함께 말해요.",
            },
            {
              alt: "AI가 메모를 할 일 4개로 나눈 아이두 결과 화면",
              caption: "AI가 나눈 할 일을 확인하고, 필요 없는 건 빼요.",
            },
          ],
          cardDescription:
            "메모를 여러 할 일로 나누거나 말로 입력해요. AI가 정리한 내용을 확인하고 내 계획에 더해요.",
        },
        "recurring-todo": {
          kicker: "매일 조금씩, 꾸준히",
          title: "반복 일정과 위젯으로 하루 관리하기",
          summary:
            "매일 공부하기나 주중 운동처럼 다시 챙겨야 하는 일은 아이두의 반복 할 일로 등록해요. 주간·월간 캘린더에서 계획을 살펴보고, iPhone과 Android 홈 화면 위젯에서 오늘의 할 일과 완료 상태를 확인할 수 있어요.",
          steps: [
            {
              title: "반복할 할 일을 만들어요",
              body: "할 일 추가에서 ‘20분 책 읽기’처럼 실행할 일을 적어요. 시작할 날짜를 정하고, 시간이 필요한 일이라면 시간도 설정해요.",
            },
            {
              title: "반복할 요일과 기간을 골라요",
              body: "반복을 눌러 매일, 주중, 주말 중 하나를 고르거나 원하는 요일을 선택해요. 캘린더에서 시작일과 종료일을 정한 뒤 선택을 완료해요.",
            },
            {
              title: "캘린더에서 계획을 확인해요",
              body: "주간·월간 캘린더에서 날짜별 할 일을 살펴봐요. 끝낸 일은 완료로 표시하고, 일정이 달라지면 해당 할 일의 날짜나 시간을 확인해 바꿔요.",
            },
            {
              title: "홈 화면에 아이두 위젯을 더해요",
              body: "앱에 로그인한 뒤 기기의 홈 화면 위젯 목록에서 아이두를 찾아 추가해요. 작은 크기는 진행 상황을, 더 큰 크기는 오늘의 할 일 목록을 확인하기 좋아요.",
            },
          ],
          example: {
            introduction:
              "퇴근 후 독서를 습관으로 만들고 싶다면, 부담 없는 분량부터 정해 보세요.",
            items: [
              "할 일: 저녁에 20분 책 읽기.",
              "반복: 주중. 시작일과 종료일을 정해 이번 달 계획을 만들어요.",
              "캘린더에서 오늘 할 일을 확인하고, 홈 화면 위젯으로 남은 일과 완료 상태를 살펴봐요.",
            ],
            note: "위젯은 확인을 돕는 기능이에요. 표시 갱신 시점은 기기의 운영체제에 따라 달라질 수 있어요.",
          },
          details: [
            {
              title: "iPhone에서 위젯 추가하기",
              body: "홈 화면의 빈 공간을 길게 누르고 편집 메뉴에서 위젯 추가를 선택해요. 아이두를 검색한 뒤 원하는 크기를 골라 추가해요. 기기의 iOS 버전에 따라 메뉴 위치가 조금 다를 수 있어요.",
            },
            {
              title: "Android에서 위젯 추가하기",
              body: "홈 화면의 빈 공간을 길게 누르고 위젯을 열어요. 아이두를 찾아 원하는 위젯을 홈 화면에 놓아요. 기기와 홈 화면 앱에 따라 추가 방법이나 크기 조절 방식이 달라질 수 있어요.",
            },
            {
              title: "위젯이 이전 내용을 보여준다면",
              body: "위젯은 자정이 지나면 앱을 열지 않아도 새 날짜로 바뀌어요. 갱신 시점은 기기 운영체제에 따라 조금 늦을 수 있어요. 지난 내용이 계속 보이면 아이두 앱을 열어 로그인 상태와 오늘의 할 일을 확인해 주세요.",
            },
          ],
          plans: {
            free: "반복 할 일을 직접 설정하고 주간·월간 캘린더에서 확인해요. iOS와 Android 홈 화면 위젯도 이용할 수 있어요.",
            premium:
              "AI 주간·월간 리포트로 달성 기록을 돌아보고, AI가 제안한 반복 할 일 중 나에게 맞는 제안을 수락할 수 있어요.",
          },
          faq: [
            {
              question: "월요일과 수요일에만 반복할 수 있나요?",
              answer:
                "네. 반복 설정에서 월요일과 수요일을 선택하고 시작일과 종료일을 정해요. 매일, 주중, 주말을 한 번에 선택하는 방법도 있어요.",
            },
            {
              question: "반복 설정을 하려면 프리미엄이 필요한가요?",
              answer:
                "직접 반복 할 일을 설정하는 기능은 무료로 사용할 수 있어요. AI가 반복 할 일을 제안하는 기능은 프리미엄에서 제공해요.",
            },
            {
              question: "위젯은 iPhone과 Android 모두 지원하나요?",
              answer:
                "네. 두 플랫폼의 홈 화면에서 사용할 수 있어요. 기기에서 아이두 앱에 로그인한 뒤 위젯을 추가해주세요.",
            },
          ],
          screens: [
            {
              alt: "날짜·시간·반복을 고르는 아이두 할 일 추가 화면",
              caption: "할 일을 추가하면서 날짜, 시간, 반복을 정해요.",
            },
            {
              alt: "오늘 할 일과 달성률이 보이는 아이두 홈 화면 위젯",
              caption: "홈 화면 위젯으로 오늘 할 일과 달성률을 확인해요.",
            },
          ],
          cardDescription:
            "반복할 요일을 정하고 캘린더에서 계획을 살펴봐요. 홈 화면 위젯에서도 오늘 할 일을 확인해요.",
        },
        "shared-todo": {
          kicker: "같이 하면 끝까지 해요",
          title: "친구와 할 일을 나누고 응원하기",
          summary:
            "아이두에서는 친구가 공개한 할 일을 보고, 콕 찌르기와 댓글과 답글로 응원할 수 있어요. 각자의 투두 리스트를 관리하면서 필요한 일만 공유해요. 개인적인 할 일은 비공개로 설정하고, 혼자서 사용하는 것도 괜찮아요.",
          steps: [
            {
              title: "이름이나 해시태그로 친구를 찾아요",
              body: "친구 관리에서 검색 아이콘을 눌러 이름 또는 고유한 8자리 해시태그로 검색해요. 이름이 같은 사람이 있다면 해시태그로 친구가 맞는지 확인해요.",
            },
            {
              title: "친구 요청을 보내고 연결해요",
              body: "검색 결과의 추가를 눌러 요청을 보내요. 상대방은 받은 요청에서 수락할 수 있어요. 요청 상태는 친구 관리의 보낸 요청과 받은 요청에서 확인해요.",
            },
            {
              title: "공유할 할 일의 공개 범위를 정해요",
              body: "할 일을 만들거나 수정할 때 공개·비공개를 선택해요. 친구는 공개한 할 일만 볼 수 있어요. 개인적인 메모를 할 일로 옮겼다면 생성한 할 일의 공개 설정도 확인해 주세요.",
            },
            {
              title: "친구의 하루에 작은 응원을 보내요",
              body: "친구 캘린더에서 공개된 할 일을 살펴봐요. 콕 찌르기로 알림을 보내거나, 할 일 상세에서 댓글과 답글로 이야기를 나눠요.",
            },
          ],
          example: {
            introduction:
              "친구와 각자 운동 목표를 지키고 싶다면, 공유할 일만 공개해 보세요.",
            items: [
              "내 할 일: 퇴근 후 30분 걷기. 공개로 설정해 친구가 볼 수 있게 해요.",
              "친구의 공개된 운동 계획을 보고, 콕 찌르기나 ‘오늘도 같이 힘내자!’라는 댓글을 남겨요.",
              "개인적인 일정은 비공개로 설정하고, 완료한 운동 기록은 친구 캘린더에서 함께 살펴봐요.",
            ],
            note: "댓글과 콕 찌르기는 실제 친구에게 전달돼요. 서로 편한 방식으로 응원해 보세요.",
          },
          details: [
            {
              title: "할 일마다 공개 범위를 선택해요",
              body: "모든 할 일을 공유할 필요는 없어요. 친구에게 보여주고 싶은 일은 공개로, 혼자 챙길 일은 비공개로 정해요. 친구 캘린더에도 공개된 할 일의 기록만 보여요.",
            },
            {
              title: "댓글에 답글로 이어서 이야기해요",
              body: "할 일 상세에서 댓글을 읽고 원하는 댓글에 답글을 남길 수 있어요. 이어진 대화를 펼쳐 보거나 댓글 알림을 눌러 해당 댓글로 이동해요.",
            },
          ],
          plans: {
            free: "친구를 최대 5명까지 추가할 수 있어요. 콕 찌르기는 하루 3회 이용할 수 있고, 공개한 할 일을 살펴보며 댓글로 응원할 수 있어요.",
            premium:
              "친구 수와 하루 콕 찌르기 횟수 제한 없이 이용할 수 있어요. 같은 할 일에는 24시간이 지난 뒤 다시 콕 찌르기를 보낼 수 있어요.",
          },
          faq: [
            {
              question: "친구를 추가하면 모든 할 일이 보이나요?",
              answer:
                "아니에요. 친구는 공개한 할 일만 볼 수 있어요. 할 일을 만들거나 수정할 때 공개 범위를 확인해 주세요.",
            },
            {
              question: "친구 요청을 보냈는데 목록에 바로 보이지 않아요",
              answer:
                "친구 관리의 보낸 요청에서 상태를 확인해요. 상대방이 받은 요청에서 수락하면 친구로 연결돼요.",
            },
            {
              question: "친구 없이 혼자 사용해도 되나요?",
              answer:
                "물론이에요. 메모, 할 일, 반복 설정과 캘린더로 혼자 하루를 관리할 수 있어요. 함께하고 싶을 때 친구를 추가해 보세요.",
            },
          ],
          screens: [
            {
              alt: "친구들의 고양이 프로필과 공개한 할 일이 보이는 아이두 친구 화면",
              caption:
                "친구를 누르면 공개한 할 일이 보이고, 콕으로 응원할 수 있어요.",
            },
            {
              alt: "콕 횟수와 댓글 입력창이 있는 아이두 할 일 상세 화면",
              caption: "할 일 상세에서 댓글과 답글로 이야기를 나눠요.",
            },
          ],
          cardDescription:
            "친구를 연결하고 공개한 할 일을 함께 봐요. 콕과 댓글로 응원을 보내는 방법을 알아봐요.",
        },
        "friend-invite": {
          kicker: "링크 하나면 충분해요",
          title: "친구 초대하고 프리미엄 받기",
          summary:
            "초대 링크나 6자리 초대 코드로 친구를 아이두에 불러요. 친구는 가입하면 바로 프리미엄 7일을 받고, 나는 친구가 2일 동안 할 일을 끝내면 프리미엄 7일을 받고 친구를 1명 더 추가할 수 있어요. 받는 사람과 시점, 조건을 정리했어요.",
          steps: [
            {
              title: "친구 초대 화면을 열어요",
              body: "마이 탭에서 ‘친구 초대 · 발자국’을 눌러요. 내 초대 링크와 6자리 초대 코드, 지금까지 모은 발자국이 보여요.",
            },
            {
              title: "초대 링크를 보내요",
              body: "카카오톡으로 초대하기를 누르거나 링크를 복사해 다른 앱으로 보내요. 친구가 링크를 열면 누가 초대했는지와 초대 코드를 확인하고 앱을 설치할 수 있어요.",
            },
            {
              title: "친구가 가입하면 바로 친구가 돼요",
              body: "친구가 초대 링크로 앱을 열거나 로그인 화면에 초대 코드를 입력해 가입하면, 서로 친구가 되고 친구는 바로 프리미엄 7일을 받아요.",
            },
            {
              title: "친구가 2일 동안 할 일을 끝내면 발자국이 찍혀요",
              body: "친구가 가입하고 14일 안에 2일 동안 할 일을 끝내면 내 발자국 판에 발자국이 하나 찍혀요. 그때 나는 프리미엄 7일을 받고, 친구를 1명 더 추가할 수 있어요.",
            },
          ],
          example: {
            introduction:
              "같이 운동할 친구가 있다면, 초대 링크 하나로 시작해 보세요.",
            items: [
              "나: 카카오톡으로 초대 링크를 보내요.",
              "친구: 링크로 가입하면 바로 나와 친구가 되고, 프리미엄 7일을 받아요.",
              "친구가 월요일과 수요일에 할 일을 끝내면 내 판에 발자국이 찍혀요. 나는 프리미엄 7일을 받고 친구를 1명 더 추가할 수 있어요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. 보상에는 조건이 있으니 아래 내용과 이용약관을 확인해 주세요.",
          },
          rewards: {
            items: [
              {
                who: "친구",
                when: "가입하면 바로",
                reward: "프리미엄 7일",
                condition: "가입한 지 7일 안에 초대를 수락하면 받아요.",
              },
              {
                who: "나",
                when: "친구가 2일 동안 할 일을 끝내면",
                reward: "프리미엄 7일 + 친구 1명 더",
                condition:
                  "친구가 가입하고 14일 안에 채워야 해요. 하루에 여러 개를 끝내도 1일로 세요.",
              },
            ],
            limits: [
              "초대해서 내가 받는 프리미엄은 30일마다 최대 30일, 모두 합쳐 최대 90일까지예요.",
              "최대치를 채운 뒤에도 발자국은 계속 모을 수 있고, 발자국이 찍힐 때마다 친구를 1명 더 추가할 수 있어요.",
              "보상은 아이두 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없어요. 같은 기기나 계정으로는 한 번만 받을 수 있어요.",
              "구독 중에 받은 보상은 구독이 끝난 뒤 이어서 시작해요.",
            ],
            termsNote: "자세한 조건은 이용약관 제13조의2에 있어요.",
            termsLink: "초대 보상 조건 보기",
          },
          details: [
            {
              title: "발자국 판에서 진행 상황을 봐요",
              body: "‘발자국 모으기’ 판에 발자국이 한 칸씩 찍혀요. 12칸을 다 채우면 새 판이 열리고, 초대한 친구 목록에서 누가 발자국을 찍었는지 확인할 수 있어요.",
            },
            {
              title: "기다리는 친구에게 콕을 보내요",
              body: "아직 2일을 채우지 못한 친구에게는 콕을 보내 응원할 수 있어요. 친구가 할 일을 끝내면 앱 알림으로 알려 드려요.",
            },
          ],
          faq: [
            {
              question: "링크 없이 코드로도 초대할 수 있나요?",
              answer:
                "네. 친구 초대 화면의 6자리 초대 코드를 알려 주세요. 친구가 앱을 설치하고 로그인 화면에서 초대 코드를 입력하면 돼요.",
            },
            {
              question: "이미 아이두를 쓰는 친구도 프리미엄을 받나요?",
              answer:
                "가입한 지 7일이 지난 친구가 초대를 수락하면 친구로만 연결되고, 친구는 프리미엄을 받지 않아요.",
            },
            {
              question: "친구 수가 다 찼는데 초대해도 되나요?",
              answer:
                "네. 내 친구 수가 추가 한도에 이르렀다면 초대를 수락한 친구에게 친구 요청이 가요. 발자국이 찍히면 친구를 1명 더 추가할 수 있어요.",
            },
            {
              question: "보상 프리미엄이 끝나면 결제되나요?",
              answer:
                "아니에요. 보상 프리미엄은 결제가 없고 자동으로 갱신되지 않아요. 기간이 끝나면 무료로 돌아가요.",
            },
          ],
          screens: [
            {
              alt: "초대 보상과 6자리 초대 코드가 보이는 아이두 친구 초대 화면",
              caption: "친구 초대 화면에서 링크를 보내거나 코드를 알려 줘요.",
            },
            {
              alt: "발자국 12칸이 모두 찍힌 아이두 발자국 모으기 판",
              caption:
                "친구가 2일 동안 할 일을 끝낼 때마다 발자국이 하나씩 찍혀요.",
            },
            {
              alt: "초대한 사람 이름과 가입 혜택이 보이는 아이두 초대 카드",
              caption: "친구는 초대 카드에서 혜택을 확인하고 바로 가입해요.",
            },
          ],
          cardDescription:
            "초대 링크로 친구를 불러요. 누가 언제 프리미엄을 받는지, 발자국 모으기까지 알아봐요.",
        },
      },
    },
    meta: {
      title: "아이두(Aido) | 친구와 함께 끝내는 AI 투두 플래너",
      description:
        "말하면 AI가 날짜·시간·반복까지 채워 할 일로 만들어요. 친구와 할 일을 나누고 콕으로 응원하며, 친구를 초대하면 발자국 판에 발자국이 찍혀요. 홈 화면 위젯과 iPhone Duo·iPad 두 칸 화면도 지원해요. iOS와 Android에서 무료로 시작해요.",
      openGraphTitle: "아이두 | 혼자 하면 미루고, 같이 하면 끝내요",
      openGraphDescription:
        "말하면 AI가 할 일로 정리하고, 친구가 콕 찔러 응원해요. 친구를 초대하면 발자국이 찍혀요.",
      keywords: [
        "아이두",
        "Aido",
        "친구와 할 일",
        "할 일 공유",
        "할 일 관리 앱",
        "투두 리스트",
        "반복 할 일",
        "AI 할 일 정리",
        "AI 투두",
        "친구 초대",
        "홈 화면 위젯",
      ],
    },
    nav: {
      label: "주요 메뉴",
      guides: "기능 가이드",
      invite: "친구 초대",
      services: "서비스 둘러보기",
      download: "앱 다운로드",
      patchNotes: "패치노트",
      open: "메뉴 열기",
      close: "메뉴 닫기",
      menuTitle: "메뉴",
      guidesTitle: "기능 가이드",
      moreTitle: "더 알아보기",
    },
    accessibility: {
      skip: "본문으로 바로 가기",
      home: "홈",
      breadcrumb: "현재 위치",
    },
    home: {
      hero: {
        release: "1.13.0 새 기능: 친구 초대와 발자국 판",
        titleLead: "혼자 하면 미루고,",
        titleTail: "같이 하면 끝내요",
        description:
          "말하면 AI가 할 일로 정리하고, 친구가 콕 찔러 응원해요. 오늘 할 일, 이번엔 끝까지 해봐요.",
        note: "iOS·Android에서 무료로 시작해요",
        screenAlt:
          "오늘 할 일 목록과 친구들의 고양이 프로필이 보이는 아이두 홈 화면",
        nudgeName: "두부",
        nudgeText: "콕! 필라테스 같이 가자",
        doneNote: "디자인 리뷰 정리 끝!",
      },
      ai: {
        kicker: "말하면 뚝딱, 할 일은 바로",
        title: "말만 하면, 할 일이 돼요",
        description:
          "말하거나 적기만 하면 날짜와 시간, 반복까지 알아서 채워져요. 긴 메모도 AI가 할 일 여러 개로 나눠줘요.",
        exampleLabel: "AI가 할 일을 정리하는 예시",
        examples: [
          {
            input: "내일 오후 3시 치과 예약",
            date: "내일",
            time: "오후 3:00",
          },
          {
            input: "매주 월요일 아침 7시 러닝",
            date: "매주 월요일",
            time: "오전 7:00",
          },
        ],
        voiceAlt:
          "말로 할 일을 추가하는 방법을 알려 주는 아이두 할 일 추가 화면",
        parseAlt: "메모 한 개에서 AI가 할 일 4개를 만든 아이두 화면",
        repeatAlt:
          "필라테스 할 일에 날짜와 시간이 채워진 아이두 할 일 추가 화면",
        guideLink: "AI 할 일 사용법",
        repeatGuideLink: "반복 할 일 사용법",
      },
      friends: {
        kicker: "미루면 콕, 함께하면 쭉",
        title: "친구가 콕 찌르면, 미루던 일도 시작돼요",
        description:
          "친구가 공개한 할 일을 보고 콕이나 댓글로 응원해요. 끝내면 응원해 준 친구에게 고마움을 전해요. 보여 줄 할 일은 하나씩 직접 골라요.",
        feedAlt:
          "친구의 고양이 프로필과 할 일 옆에 콕 버튼이 보이는 아이두 친구 화면",
        nudgeAlt: "친구 할 일의 상세와 댓글 입력창이 보이는 아이두 화면",
        nudgeName: "치즈",
        nudgeText: "콕! 오늘 하체 운동 잊지 마",
        guideLink: "함께하는 할 일 사용법",
      },
      invite: {
        badge: "새 기능",
        kicker: "링크 하나면 충분해요",
        title: "친구를 초대하면, 발자국이 찍혀요",
        description:
          "초대 링크로 친구가 가입하면 바로 친구가 돼요. 친구가 꾸준히 할 일을 끝내면 내 발자국 판에 발자국이 하나씩 찍혀요.",
        rewardTitle: "누가, 언제 받나요?",
        friendLabel: "친구",
        friendWhen: "가입하면 바로",
        friendReward: "프리미엄 7일",
        myLabel: "나",
        myWhen: "친구가 2일 동안 할 일을 끝내면",
        myReward: "프리미엄 7일 + 친구 1명 더",
        conditionBadge: "조건 있음",
        conditionNote:
          "친구가 가입하고 14일 안에 2일 동안 할 일을 끝내면 발자국이 찍혀요. 하루에 여러 개를 끝내도 1일로 세요. 보상 프리미엄은 30일마다 최대 30일, 모두 합쳐 90일까지예요.",
        boardTitle: "발자국 판",
        boardSummary: "12칸 중 5칸에 발자국이 찍혔어요",
        boardHint: "12칸을 다 채우면 새 판이 열려요",
        boardAlt:
          "카카오톡 초대 버튼 아래 발자국 1개가 찍힌 12칸 발자국 판이 보이는 아이두 친구 초대 화면",
        fullBoardAlt:
          "12칸이 모두 찍혀 1번째 판을 다 채운 아이두 발자국 판 화면",
        guideLink: "친구 초대 자세히 보기",
      },
      largeScreen: {
        badge: "큰 화면",
        kicker: "넓게 보면 더 편해요",
        title: "접으면 폰, 펼치면 한눈에",
        description:
          "iPhone Duo를 펼치면 왼쪽엔 할 일 목록, 오른쪽엔 상세가 나란히 보여요. 화면을 오가지 않고 콕과 댓글까지 이어서 봐요.",
        foldedNote: "접었을 때",
        unfoldedNote: "펼치면 두 칸",
        foldedAlt: "접은 iPhone Duo 바깥 화면에 보이는 아이두 오늘 할 일 목록",
        unfoldedAlt:
          "펼친 iPhone Duo에서 왼쪽엔 할 일 목록, 오른쪽엔 할 일 상세가 함께 보이는 아이두 화면",
        ipadTitle: "iPad에서도 두 칸으로",
        ipadDescription:
          "넓은 화면에서 목록을 보며 상세와 댓글을 함께 확인해요.",
        ipadAlt: "iPad에서 할 일 목록과 상세가 나란히 보이는 아이두 화면",
        widgetTitle: "홈 화면에서 바로 확인해요",
        widgetDescription:
          "앱을 열지 않아도 오늘 할 일과 진행률이 위젯에 보여요. iOS와 Android에서 쓸 수 있어요.",
        widgetAlt:
          "아이폰 홈 화면에 놓인 아이두 위젯 두 개. 오늘 할 일 3/8과 할 일 목록이 보여요",
      },
      routine: {
        kicker: "쌓인 기록에서 다음 한 걸음",
        title: "한 주를 돌아보고, 알림은 내 하루에 맞게",
        reportTitle: "AI 주간·월간 리포트",
        reportDescription:
          "달성률과 카테고리별 기록, 요일별 패턴을 한눈에 돌아봐요.",
        reportAlt:
          "주간 달성률 100%, 완료 25개, 연속 7일과 카테고리별 분석이 보이는 아이두 AI 리포트 화면",
        reminderTitle: "리마인드 알림",
        reminderDescription:
          "아침과 저녁에 오늘 할 일을 알려줘요. 프리미엄에서는 원하는 시간으로 바꿀 수 있어요.",
        reminderAlt:
          "푸시 알림, 날씨 알림, 오전 8시와 오후 7시 리마인드 알림이 켜진 아이두 알림 설정 화면",
        premiumLabel: "프리미엄",
      },
      premium: {
        kicker: "더 쓰고 싶어지면",
        title: "프리미엄이면 더 넉넉하게",
        description:
          "기본 기능은 무료예요. 프리미엄에서는 이런 혜택이 더해져요.",
        note: "구독 가격과 자세한 조건은 앱에서 확인할 수 있어요.",
        benefits: [
          {
            id: "aiParsing",
            title: "AI 할 일 만들기 무제한",
            description: "월 5회 제한 없이, 자연어로 할 일을 마음껏 정리해요",
          },
          {
            id: "nudge",
            title: "콕 찌르기 무제한",
            description: "하루 3회 제한 없이, 친구에게 마음껏 찔러요",
          },
          {
            id: "friends",
            title: "친구 무제한 추가",
            description: "5명 제한 없이, 친구를 자유롭게 추가해요",
          },
          {
            id: "reminder",
            title: "리마인더 시간 자유 설정",
            description: "고정 시간 대신, 내가 원하는 시간에 알림을 받아요",
          },
          {
            id: "aiReport",
            title: "AI 주간/월간 리포트",
            description: "내 할 일 달성률과 패턴을 한눈에 확인해요",
          },
          {
            id: "aiRepeat",
            title: "AI 반복 제안",
            description: "반복되는 할 일을 AI가 자동으로 제안해요",
          },
          {
            id: "categories",
            title: "카테고리 최대 30개",
            description: "3개 제한에서 최대 30개까지 늘어나요",
          },
          {
            id: "appIcon",
            title: "앱 아이콘 커스터마이징",
            description: "나만의 스타일로 앱 아이콘을 바꿀 수 있어요",
          },
        ],
      },
      appFeatures: [
        "말하거나 적으면 AI가 날짜·시간·반복을 채우는 할 일 만들기",
        "친구와 할 일을 나누고 콕과 댓글로 응원하기",
        "친구 초대와 12칸 발자국 판",
        "iOS·Android 홈 화면 위젯",
        "iPhone Duo·폴더블·iPad 두 칸 화면",
        "AI 주간·월간 리포트와 반복 제안",
        "리마인드 알림",
      ],
    },
    faq: {
      title: "궁금한 점이 있나요?",
      description: "시작하기 전에 아이두를 조금 더 알아봐요.",
      items: [
        {
          question: "친구와 어떻게 함께하나요?",
          answer:
            "이름이나 해시태그로 친구를 연결하고 공개한 할 일을 서로 살펴봐요. 콕 찌르기와 댓글로 응원하고, 할 일을 마치면 응원해 준 친구에게 고마움을 전해요.",
        },
        {
          question: "아이두는 무료로 사용할 수 있나요?",
          answer:
            "네, 무료로 시작할 수 있어요. 기본 할 일 관리와 캘린더, 친구 기능을 이용하고, AI 정리 등 일부 기능은 사용 한도가 있어요. 프리미엄에서는 AI 리포트와 반복 제안, 고양이 아이콘 변경과 더 넉넉한 사용 범위를 제공해요. 구독 가격과 상세 조건은 앱에서 확인할 수 있어요.",
        },
        {
          question: "AI가 메모와 음성을 어떻게 정리해주나요?",
          answer:
            "자연스러운 문장으로 할 일을 적거나 음성으로 입력할 수 있어요. 메모 AI는 떠오르는 내용을 실행할 여러 할 일로 나눠줘요. 정리된 내용을 확인하고 나에게 맞게 수정해 사용해 보세요.",
        },
        {
          question: "매일 반복되는 할 일도 만들 수 있나요?",
          answer:
            "네. 매일, 주중, 주말 또는 원하는 요일을 골라 반복 할 일을 만들 수 있어요. 시작일과 종료일을 정하고 주간·월간 캘린더에서 일정을 확인해요. AI 반복 제안은 프리미엄 기능이에요.",
        },
        {
          question: "친구 없이 혼자 사용해도 괜찮나요?",
          answer:
            "물론이에요. 혼자서도 메모, 할 일, 캘린더로 하루를 정리할 수 있어요. 함께하고 싶을 때 친구를 찾아 콕 찌르기와 댓글로 응원해 보세요.",
        },
        {
          question: "모든 할 일이 친구에게 보이나요?",
          answer:
            "할 일마다 공개 범위를 선택할 수 있어요. 친구는 공개한 할 일을 볼 수 있고, 비공개로 설정한 할 일은 공유되지 않아요. 생성하거나 수정할 때 공개 설정을 확인해 주세요.",
        },
        {
          question: "어떤 기기와 언어를 지원하나요?",
          answer:
            "App Store에서 iOS 앱을, Google Play에서 Android 앱을 다운로드할 수 있어요. 폴더블 폰과 iPhone Duo를 펼치거나 iPad에서 쓰면 목록과 상세를 나란히 볼 수 있어요. 앱과 이 웹사이트는 한국어와 영어를 지원하고, 홈 화면 위젯도 iOS와 Android에서 사용할 수 있어요.",
        },
        {
          question: "친구를 초대하면 어떤 보상을 받나요?",
          answer:
            "가입한 지 7일 안의 친구가 초대를 수락하면 친구는 바로 프리미엄 7일을 받아요. 나는 친구가 가입하고 14일 안에 2일 동안 할 일을 끝내면(하루에 여러 개를 끝내도 1일로 세요) 프리미엄 7일을 받고, 친구를 1명 더 추가할 수 있어요. 보상은 앱 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없어요. 초대해서 내가 받는 프리미엄은 30일 동안 최대 30일, 전체 최대 90일까지예요. 자세한 조건은 이용약관 제13조의2에 있어요.",
        },
        {
          question: "계정을 삭제하려면 어떻게 하나요?",
          answer:
            "앱의 마이 탭 가장 아래 탈퇴하기에서 바로 삭제할 수 있어요. 앱을 쓸 수 없다면 계정 삭제 요청 안내 페이지를 보고 이메일로 요청해 주세요. 구독은 계정을 지워도 자동으로 해지되지 않으니 스토어에서 먼저 해지해 주세요.",
        },
      ],
    },
    cta: {
      titleLineOne: "오늘 하나부터,",
      titleLineTwo: "친구와 함께 시작해요",
      description:
        "서로의 할 일을 나누고 응원하며 오늘의 계획을 하나씩 해내요.",
      closingNote: "무료로 시작해요. 일부 기능은 프리미엄 구독이 필요해요.",
    },
    storeButtons: {
      ariaLabel: "앱 다운로드 링크",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    invite: {
      metaTitle: "친구 초대",
      metaDescription:
        "친구가 아이두에 초대했어요. 앱을 설치하고 가입하면 프리미엄 7일을 받아요.",
      brandLabel: "아이두 친구 초대",
      loadingLabel: "초대 정보를 불러오는 중이에요",
      titleTemplate: "{name}님이 아이두에 초대했어요",
      titleFallback: "친구가 아이두에 초대했어요",
      lead: "함께 시작하면 서로의 할 일을 응원하며 하루를 끝낼 수 있어요.",
      avatarAltTemplate: "{name}님의 고양이 프로필",
      avatarAltFallback: "아이두 고양이 프로필",
      receiptLabel: "초대 영수증",
      rewardLabel: "가입하면",
      rewardValue: "프리미엄 7일",
      codeLabel: "초대 코드",
      codeCopy: "복사",
      codeCopied: "복사했어요",
      codeCopyAria: "초대 코드 복사",
      codeCopiedStatus: "초대 코드를 복사했어요",
      codeManualStatus: "자동 복사가 막혔어요. 코드를 길게 눌러 복사해 주세요.",
      codeHint:
        "앱을 설치한 뒤 가입할 때 이 코드를 입력해요. 안드로이드는 자동으로 채워져요.",
      outdatedNote:
        "이미 아이두를 쓰고 있나요? 앱을 최신 버전으로 업데이트한 뒤 이 링크를 다시 열어 주세요.",
      rewardTermsNote:
        "가입한 지 7일 안에 초대를 수락하면 받아요. 앱 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없고, 이미 보상을 받은 기기나 계정은 받을 수 없어요.",
      rewardTermsLink: "초대 보상 조건 보기",
      errors: {
        invalidCode: {
          title: "초대 링크를 확인해 주세요",
          description:
            "링크가 잘리거나 바뀐 것 같아요. 친구에게 링크를 다시 받아 보세요.",
        },
        notFound: {
          title: "초대 코드를 찾을 수 없어요",
          description: "코드를 다시 확인하거나 친구에게 새 링크를 받아 보세요.",
        },
        changed: {
          title: "친구가 초대 링크를 새로 만들었어요",
          description:
            "이 링크는 더는 쓸 수 없어요. 친구에게 최신 링크를 받아 보세요.",
        },
        unavailable: {
          title: "지금은 초대를 받을 수 없어요",
          description:
            "잠시 뒤에 다시 열어 주세요. 아이두는 먼저 설치해도 좋아요.",
        },
        unknown: {
          title: "친구 정보를 불러오지 못했어요",
          description:
            "코드는 그대로 쓸 수 있어요. 잠시 뒤에 다시 열어도 좋아요.",
        },
      },
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "친구와 함께, 할 일을 해내요.",
      serviceTitle: "서비스",
      policyTitle: "정책·도움말",
      linkHubTitle: "링크 모음",
      linkHubLabel: "공식 링크 모음",
      downloadTitle: "앱 받기",
      businessLabel: "사업자 정보",
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
      accountDeletionLabel: "계정 삭제",
      instagramLabel: "인스타그램",
      externalLinkLabel: "새 창에서 열려요",
    },
    legal: {
      badge: "약관·정책",
      viewTermsLabel: "이용약관 보기",
      viewPrivacyLabel: "개인정보처리방침 보기",
      privacyTitle: "개인정보처리방침",
      privacyDescription:
        "Aido 서비스 이용 시 처리되는 개인정보에 대해 안내합니다.",
      termsTitle: "이용약관",
      termsDescription:
        "Aido 서비스 이용 조건, 결제 및 자동 갱신, 이용자 권리와 책임을 안내합니다.",
      accountDeletionTitle: "계정 삭제 요청",
      accountDeletionDescription:
        "아이두 계정을 앱에서 삭제하는 방법과 앱 없이 이메일로 삭제를 요청하는 방법, 삭제·보관되는 정보를 안내합니다.",
    },
    patchNotes: {
      kicker: "조금씩 자라는 아이두",
      title: "패치노트",
      description:
        "아이두가 조금씩 달라지고 있어요. 앱 업데이트와 따로 설치할 필요 없는 서비스 개선 소식을 모았어요.",
      appUpdate: "앱 업데이트",
      serviceUpdate: "서비스 개선",
      noAppUpdateNeeded: "앱을 따로 업데이트하지 않아도 적용돼요.",
      updateSummary: "업데이트 요약",
      copySummary: "요약 복사",
      summaryCopied: "요약을 복사했어요.",
      copySummaryFallback:
        "아래 문구를 선택해 직접 복사해 주세요. 줄바꿈도 함께 복사돼요.",
      bugFixes: "고친 문제",
      features: "새로운 기능",
      improvements: "더 편해진 부분",
      newRelease: "첫 출시",
      latest: "최신",
      archiveTitle: "지난 업데이트",
      archiveDescription:
        "앱 업데이트와 서비스 개선을 월별로 모아뒀어요. 궁금한 기록을 펼쳐보세요.",
      releaseCount: "업데이트 {count}개",
      releaseCountOne: "업데이트 1개",
      expand: "자세히 보기",
      collapse: "접기",
      initialNote:
        "아이두의 첫 번째 출시 기록이에요. 함께 시작해주셔서 고마워요.",
      closingNote: "더 좋은 하루를 위해, 조금씩 다듬고 있어요. 🐾",
    },
    languageSwitcher: {
      ko: "KO",
      en: "EN",
      navLabel: "언어 선택",
    },
  },
  en: {
    services: {
      kicker: "A quick tour of Aido",
      title: "A day with friends and Aido",
      description:
        "Share to-dos with friends and cheer each other on. Explore nudges, calendars, notes and AI planning through real iOS and Android app screens.",
      introduction:
        "See what your friends are working on and send some encouragement. When you finish a to-do, share your thanks. Here’s how to keep going together.",
      screenshotNote:
        "Captured in the real iOS and Android apps with example accounts. Names and plans are sample data.",
      premiumLabel: "Premium",
      sampleLabel: "Example screens",
      iosLabel: "iPhone",
      androidLabel: "Android",
      jumpLabel: "Jump to a feature",
      features: {
        planning: {
          navigationLabel: "Calendar",
          title: "Start with today. See the whole month.",
          description:
            "Make room for your plans in weekly and monthly calendars.",
          details: [
            "Tap a date to see its to-dos, then return with Today.",
            "Category colors keep plans clear. A little paw print marks a day you finished.",
          ],
          captions: [
            "Weekly calendar and today’s to-dos",
            "A month of plans at a glance",
          ],
        },
        todos: {
          navigationLabel: "To-dos",
          title: "Big plans, small steps",
          description:
            "Give a to-do a date, time, repeat schedule and checklist.",
          details: [
            "Break a plan into checklist items you can work through.",
            "Repeat daily, on weekdays or weekends, or on days you choose.",
            "Choose who can see each to-do. Some plans can stay just yours.",
          ],
          captions: [
            "To-do details and checklist items",
            "Choosing repeat days and a date range",
          ],
        },
        notes: {
          navigationLabel: "Notes",
          title: "A thought doesn’t need to be a plan yet",
          description:
            "Keep a note for now. Turn it into a to-do when you’re ready.",
          details: [
            "Pin the notes you return to and arrange them your way.",
            "Turn a note into one to-do, or let AI split it into several.",
          ],
          captions: [
            "Pinned notes and your notes list",
            "A note, ready to become a to-do",
          ],
        },
        ai: {
          navigationLabel: "AI input",
          title: "Type it as you think it. Say it as you go.",
          description: "Add to-dos in everyday language or with voice input.",
          details: [
            "Include a date and time, and AI helps turn your words into a plan.",
            "Review the to-dos extracted from a note before adding them.",
            "Check the app’s current plan information for AI input limits.",
          ],
          captions: [
            "Adding a to-do with dates, times and AI input",
            "Starting AI planning from a note",
          ],
        },
        friends: {
          navigationLabel: "Friends",
          title: "A little company for your day",
          description: "Share to-dos with friends with nudges and comments.",
          details: [
            "Find friends by name or their unique hashtag.",
            "Send a nudge or leave comments and replies on a friend’s to-do.",
            "Keep track of your encouragement in Sent nudges.",
          ],
          captions: [
            "A friend’s calendar and shared to-dos",
            "The nudges you’ve sent",
          ],
        },
        nudges: {
          navigationLabel: "Encouragement",
          title: "A reply for now. A little thanks when you’re done.",
          description:
            "Reply to a nudge, then share your thanks after finishing a to-do.",
          details: [
            "Choose the reply that fits: I’ll get started, thanks for cheering me on, or I’ll do it later.",
            "See who encouraged you and send the good news with your thanks.",
            "Sending a reply does not complete the to-do.",
          ],
          captions: [
            "A friend’s nudge and three ways to reply",
            "Saying thanks to friends who cheered you on",
          ],
        },
        notifications: {
          navigationLabel: "Notifications",
          title: "Friendly news and gentle reminders",
          description:
            "Find what matters in your notifications and open the right screen.",
          details: [
            "Keep friends’ updates and nudges together in the Friends tab.",
            "Set morning, evening and weather reminder times around your day.",
            "Choose which alerts you want, including promotional notification consent.",
          ],
          captions: [
            "Friends’ updates in Notifications",
            "Reminders set to your own schedule",
          ],
        },
        weather: {
          navigationLabel: "Weather",
          title: "A quick look at the sky, before you go",
          description:
            "Check the weather for your location alongside your plans.",
          details: [
            "Open hourly and weekly forecasts from the weather button at home.",
            "Location access is your choice. To-dos keep working while weather is unavailable.",
            "Weather currently supports locations in South Korea. An information screen is shown elsewhere.",
          ],
          captions: [
            "Current weather and hourly forecasts",
            "Weather in the Android app",
          ],
        },
        widgets: {
          navigationLabel: "Widgets",
          title: "Today at a glance, right on your home screen",
          description:
            "Choose a small progress view or a calendar with room for your plans.",
          details: [
            "Small widgets show completed to-dos, progress and your streak.",
            "Medium widgets show today’s to-dos. Large widgets add a weekly calendar.",
            "Tap a to-do to open it in Aido, or start a new one with the add button.",
            "Widget refresh timing depends on your device and operating system.",
          ],
          captions: [
            "Aido widgets on an iPhone home screen",
            "The weekly calendar widget on Android",
            "Small and medium widgets on Android",
          ],
        },
        insights: {
          navigationLabel: "Reports & suggestions",
          title: "Look back on your days. Find your next step.",
          description:
            "Reflect on your patterns with AI reports and recurring suggestions.",
          details: [
            "Weekly and monthly reports show completion rates and category patterns.",
            "Review recurring suggestions and add the ones that fit your routine.",
            "The report and suggestions below are examples for this walkthrough.",
          ],
          captions: [
            "The sample weekly report available in the app",
            "Example recurring suggestions to accept or skip",
          ],
        },
        personal: {
          navigationLabel: "Make it yours",
          title: "Your cat. Your Aido.",
          description: "Make the app feel like you from My Page.",
          details: [
            "Choose your profile from nine different cats.",
            "Set light or dark mode, text size and your app language.",
            "Premium also lets you change the app icon on iOS and Android.",
          ],
          captions: [
            "Choosing a profile from nine cats",
            "Choosing an icon for your home screen",
            "Today’s to-dos in dark mode",
          ],
        },
      },
    },
    analyticsConsent: {
      title: "Website analytics",
      description:
        "With your consent, Google Analytics and Vercel Analytics help us understand visits and store button use. You can change your choice at any time.",
      accept: "Allow analytics",
      reject: "Decline",
      privacy: "Privacy policy",
      settings: "Website analytics settings",
      storageError: "Your choice could not be saved. Analytics remains off.",
      close: "Close",
    },
    featureGuides: {
      title: "Start using Aido with friends",
      description:
        "Connect with friends and share your plans. Learn how recurring to-dos and AI planning can help, too.",
      readGuide: "Read the guide",
      breadcrumbLabel: "Guides",
      screenNote: "Real app screens",
      stepsTitle: "Start with these steps",
      exampleTitle: "Try it in your day",
      plansTitle: "Start free, with more room when you need it",
      freeLabel: "Free",
      premiumLabel: "Premium",
      plansNote:
        "Check the app for current subscription prices and full terms.",
      rewardsTitle: "Who gets what, and when",
      rewardsLimitsTitle: "Good to know",
      pawBoardLabel: "Paw print board",
      faqTitle: "Questions",
      relatedTitle: "More ways to use Aido",
      relatedDescription: "Find the next feature that fits your day.",
      updatedLabel: "Content reviewed",
      guides: {
        "ai-todo": {
          kicker: "Just say it",
          title: "Turn notes into to-dos with AI",
          summary:
            "Aido is a to-do list app that can turn a note into several to-dos and checklist items with AI. You can also type a sentence or speak to create a to-do. Review the results, select what you need and adjust the plan before you get started.",
          steps: [
            {
              title: "Capture your thoughts in a note",
              body: "Open the notes tab and create a note. Write down what comes to mind, such as everything you need to prepare for a trip.",
            },
            {
              title: "Tap the robot icon at the top",
              body: "Check your remaining AI uses and the instructions, then start. Stay on the screen while Aido prepares the results.",
            },
            {
              title: "Keep and adjust the to-dos you need",
              body: "Read the suggested titles and checklist items. Remove unwanted to-dos with the close button, then edit titles, dates, times and categories to fit your plan.",
            },
            {
              title: "Create your to-dos and get started",
              body: "Create the remaining to-dos. Use Edit in a to-do's detail screen to make further changes, and mark it complete when you finish.",
            },
          ],
          example: {
            introduction:
              "Before a trip, collect the things you need to do in one note.",
            items: [
              "Example note: Before my Jeju trip, I need to check flights, book a hotel and pack.",
              "Example to-dos: Check flights. Book a hotel. Pack for the trip.",
              "Add checklist items such as a charger and toiletries to the packing to-do.",
            ],
            note: "This example illustrates the workflow. AI results depend on your input, so review them before creating to-dos.",
          },
          details: [
            {
              title: "Use the microphone for a short to-do",
              body: "Tap the microphone button on the Add to-do screen. Say a date and time, such as 'Meet on Friday at 7 p.m.' Review the details AI fills in before saving. Voice input may require microphone and speech recognition permissions on your device.",
            },
            {
              title: "Organize things yourself, too",
              body: "You can add a to-do directly and set its date, time, repeat schedule, visibility and category. Use Convert to to-do in a note's detail screen to move the note into a single to-do.",
            },
          ],
          plans: {
            free: "Start free with notes and basic to-do management. AI to-do creation and note organization share five uses per month. The limit resets at 00:00 Korea time on the first of each month.",
            premium:
              "Use AI to-do organization without a usage limit. Premium also includes weekly and monthly AI reports and recurring to-do suggestions.",
          },
          faq: [
            {
              question: "Can I edit the to-dos AI creates?",
              answer:
                "Yes. Remove unwanted to-dos and edit titles, dates, times and categories before creating them. After creation, open a to-do's detail screen and use Edit to adjust it.",
            },
            {
              question: "Do I need AI for every note?",
              answer:
                "No. Keep a note as it is or create to-dos yourself. You can also use Convert to to-do in the note's detail screen to move it into one to-do.",
            },
            {
              question: "Can I include dates and times in voice input?",
              answer:
                "Yes. Tap the microphone button on the Add to-do screen and include dates and times when speaking. Check the recognized text and the resulting schedule before saving.",
            },
          ],
          screens: [
            {
              alt: "Aido Add to-do screen with the “Add to-dos by voice” tip",
              caption: "Tap the microphone and say the date and time, too.",
            },
            {
              alt: "Aido screen where AI split a note into 4 to-dos",
              caption:
                "Review the to-dos AI suggests and remove what you don’t need.",
            },
          ],
          cardDescription:
            "Turn notes into to-dos or add them by voice. Review the AI results before adding them to your plans.",
        },
        "recurring-todo": {
          kicker: "A little every day",
          title: "Plan recurring to-dos",
          summary:
            "Set up recurring to-dos in Aido for activities such as daily reading or weekday exercise. Review your plans in weekly and monthly calendars, and check today's to-dos and progress with home screen widgets on iPhone and Android.",
          steps: [
            {
              title: "Create the to-do you want to repeat",
              body: "Add something specific, such as 'Read for 20 minutes.' Set a start date and choose a time if you need one.",
            },
            {
              title: "Choose the days and date range",
              body: "Open Repeat and select daily, weekdays, weekends or individual days. Choose a start and end date in the calendar, then confirm your selection.",
            },
            {
              title: "Review the plan in your calendar",
              body: "Use the weekly and monthly calendars to see each day's to-dos. Mark finished items complete. If a plan changes, check and update the relevant to-do's date or time.",
            },
            {
              title: "Add an Aido home screen widget",
              body: "Sign in to the app, then find Aido in your device's widget list. A small widget shows progress, while larger widgets also show today's to-do list.",
            },
          ],
          example: {
            introduction:
              "Make reading after work easier to remember with a small, specific plan.",
            items: [
              "To-do: Read for 20 minutes in the evening.",
              "Repeat: Weekdays. Set start and end dates for this month's plan.",
              "Check today's plan in the calendar and use the home screen widget to see remaining to-dos and progress.",
            ],
            note: "Widgets help you check your day. Refresh timing can vary with your device's operating system.",
          },
          details: [
            {
              title: "Add a widget on iPhone",
              body: "Touch and hold an empty area on your home screen. Open Edit and choose Add Widget. Search for Aido, choose a size and add it. Menu locations may vary with your iOS version.",
            },
            {
              title: "Add a widget on Android",
              body: "Touch and hold an empty area on your home screen and open Widgets. Find Aido and place a widget on the home screen. Adding and resizing widgets can vary by device and launcher.",
            },
            {
              title: "If the widget shows older information",
              body: "Widgets switch to the new day after midnight without opening the app. Timing can vary a little by operating system. If older to-dos stay on screen, open Aido and check your sign-in status and today’s to-dos.",
            },
          ],
          plans: {
            free: "Set recurring to-dos yourself, use weekly and monthly calendars, and add home screen widgets on iOS and Android.",
            premium:
              "Review your progress with weekly and monthly AI reports. Accept the AI's recurring to-do suggestions that fit your routine.",
          },
          faq: [
            {
              question: "Can I repeat a to-do only on Mondays and Wednesdays?",
              answer:
                "Yes. Select Monday and Wednesday in Repeat, then choose start and end dates. You can also select daily, weekdays or weekends with a preset.",
            },
            {
              question: "Do recurring to-dos require Premium?",
              answer:
                "No. You can set recurring to-dos yourself for free. AI suggestions for recurring to-dos are a Premium feature.",
            },
            {
              question: "Do widgets work on both iPhone and Android?",
              answer:
                "Yes. You can use them on both platforms' home screens. Sign in to Aido on your device before adding a widget.",
            },
          ],
          screens: [
            {
              alt: "Aido Add to-do screen with date, time and repeat options",
              caption: "Set the date, time and repeat as you add a to-do.",
            },
            {
              alt: "Aido home screen widgets showing today’s to-dos and progress",
              caption: "See today’s to-dos and progress from your home screen.",
            },
          ],
          cardDescription:
            "Set repeat days and check your calendar. See today’s to-dos from your home screen, too.",
        },
        "shared-todo": {
          kicker: "Finish more, together",
          title: "Share to-dos with friends",
          summary:
            "In Aido, you can see friends' public to-dos and encourage them with nudges, comments and replies. Manage your own to-do list and choose what to share. Keep personal to-dos private, and use the app on your own whenever you prefer.",
          steps: [
            {
              title: "Find a friend by name or hashtag",
              body: "Open friend management and tap the search icon. Search by name or unique eight-character hashtag. Use the hashtag to identify the right person when names are similar.",
            },
            {
              title: "Send a friend request",
              body: "Tap Add in the search results. Your friend can accept in received requests. Check the sent and received request tabs to follow the status.",
            },
            {
              title: "Choose which to-dos to share",
              body: "Choose Public or Private when creating or editing a to-do. Friends can only see public to-dos. If you turn a personal note into a to-do, check the created to-do's visibility too.",
            },
            {
              title: "Send a little encouragement",
              body: "See public to-dos in your friend's calendar. Send a nudge as a reminder, or open a to-do's detail screen to leave a comment or reply.",
            },
          ],
          example: {
            introduction:
              "If you and a friend want to keep exercising, share the activities you want encouragement with.",
            items: [
              "My to-do: Walk for 30 minutes after work. Set it to Public so my friend can see it.",
              "Check a friend's public exercise plan and send a nudge or a comment such as 'Let's keep going today!'",
              "Keep personal plans private and follow completed exercise in the friend's calendar.",
            ],
            note: "Comments and nudges are sent to real friends. Choose a way to encourage each other that feels comfortable.",
          },
          details: [
            {
              title: "Choose visibility for each to-do",
              body: "Share the to-dos you want friends to see by setting them to Public. Set personal ones to Private. A friend's calendar only shows activity from public to-dos.",
            },
            {
              title: "Keep conversations going with replies",
              body: "Read comments in a to-do's detail screen and reply to a specific comment. Expand a conversation to read its replies, or tap a comment notification to jump to that comment.",
            },
          ],
          plans: {
            free: "Add up to five friends and send up to three nudges a day. View public to-dos and encourage friends with comments.",
            premium:
              "Add friends and send nudges without daily count limits. Wait 24 hours before nudging the same to-do again.",
          },
          faq: [
            {
              question: "Can friends see every to-do after I add them?",
              answer:
                "No. Friends can only see public to-dos. Check visibility when creating or editing a to-do.",
            },
            {
              question:
                "Why isn't someone in my friend list after I send a request?",
              answer:
                "Check the sent requests tab in friend management. You become friends after the other person accepts in received requests.",
            },
            {
              question: "Can I use Aido without adding friends?",
              answer:
                "Yes. Manage your day on your own with notes, to-dos, repeat settings and calendars. Add a friend when you want company.",
            },
          ],
          screens: [
            {
              alt: "Aido friends screen with cat profiles and a friend’s public to-dos",
              caption:
                "Tap a friend to see their public to-dos and send a nudge.",
            },
            {
              alt: "Aido to-do detail with nudge count and a comment field",
              caption: "Talk it through with comments and replies on a to-do.",
            },
          ],
          cardDescription:
            "Connect with friends and share the to-dos you choose. Learn how to send nudges and leave comments.",
        },
        "friend-invite": {
          kicker: "One link is all it takes",
          title: "Invite friends and earn Premium",
          summary:
            "Invite friends to Aido with your invite link or 6-character invite code. Your friend gets 7 days of Premium right when they join. You get 7 days of Premium + 1 more friend once they complete to-dos on 2 days. Here is who gets what, when, and the conditions.",
          steps: [
            {
              title: "Open the invite screen",
              body: "On the Me tab, tap “Invites · paw prints.” You’ll see your invite link, your 6-character invite code and the paw prints you’ve collected.",
            },
            {
              title: "Send your invite link",
              body: "Tap Invite via KakaoTalk, or copy the link and share it in any app. When your friend opens it, they see who invited them and the invite code, then install the app.",
            },
            {
              title: "Your friend joins and you’re connected",
              body: "When your friend opens the app from the link, or enters the invite code on the sign-in screen, you become friends and they get 7 days of Premium right away.",
            },
            {
              title: "A paw print for 2 days of to-dos",
              body: "Once your friend completes to-dos on 2 days within 14 days of joining, a paw print lands on your board. You get 7 days of Premium and can add 1 more friend.",
            },
          ],
          example: {
            introduction:
              "Have a friend you want to work out with? Start with one invite link.",
            items: [
              "You: send your invite link on KakaoTalk.",
              "Your friend: joins from the link, becomes your friend right away and gets 7 days of Premium.",
              "Your friend completes to-dos on Monday and Wednesday, and a paw print lands on your board. You get 7 days of Premium and can add 1 more friend.",
            ],
            note: "This is an example of how it works. Rewards have conditions, so check the details below and the Terms of Service.",
          },
          rewards: {
            items: [
              {
                who: "Your friend",
                when: "Right when they join",
                reward: "7 days of Premium",
                condition: "They need to accept within 7 days of signing up.",
              },
              {
                who: "You",
                when: "Once they complete to-dos on 2 days",
                reward: "7 days of Premium + 1 more friend",
                condition:
                  "Within 14 days of their sign-up. Several to-dos on one day count as 1 day.",
              },
            ],
            limits: [
              "You can earn up to 30 days of Premium every 30 days from invites, and 90 days in total.",
              "After that, you can keep collecting paw prints, and each one still lets you add 1 more friend.",
              "Rewards are in-app Premium with no cash value, once per device and account.",
              "Rewards earned while subscribed start after your subscription ends.",
            ],
            termsNote:
              "See Article 13-2 of the Terms of Service for full conditions.",
            termsLink: "View invite reward terms",
          },
          details: [
            {
              title: "Track progress on your paw print board",
              body: "Each paw print fills one spot in “Collect paw prints.” When all 12 are filled, a new board opens, and your invited friends list shows who left a paw print.",
            },
            {
              title: "Nudge friends who are on their way",
              body: "Send a nudge to friends who haven’t reached 2 days yet. You’ll get a notification when a friend completes their to-dos.",
            },
          ],
          faq: [
            {
              question: "Can I invite with a code instead of a link?",
              answer:
                "Yes. Share the 6-character invite code from the invite screen. Your friend installs the app and enters the code on the sign-in screen.",
            },
            {
              question: "Do friends who already use Aido get Premium?",
              answer:
                "If a friend signed up more than 7 days ago, accepting your invite only connects you as friends. They don’t get Premium.",
            },
            {
              question: "What if I’ve reached my friend limit?",
              answer:
                "You can still invite. If you’re at your limit, your friend gets a friend request when they accept. Each paw print lets you add 1 more friend.",
            },
            {
              question: "Will I be charged when reward Premium ends?",
              answer:
                "No. Reward Premium involves no payment and doesn’t renew. When it ends, you’re back on the free plan.",
            },
          ],
          screens: [
            {
              alt: "Aido invite screen with invite rewards and a 6-character invite code",
              caption:
                "Send your link or share your code from the invite screen.",
            },
            {
              alt: "Aido “Collect paw prints” board with all 12 paw prints filled",
              caption:
                "A paw print lands each time a friend completes to-dos on 2 days.",
            },
            {
              alt: "Aido invite card showing who sent the invite and the sign-up reward",
              caption:
                "Your friend sees the reward on the invite card and joins.",
            },
          ],
          cardDescription:
            "Invite friends with a link. See who gets Premium and when, and how paw prints work.",
        },
      },
    },
    meta: {
      title: "Aido | AI To-Do Planner You Finish with Friends",
      description:
        "Say it and AI fills in the date, time and repeat. Share to-dos with friends, cheer each other on with nudges, and collect paw prints when friends join from your invite. Home screen widgets and a two-pane view on iPhone Duo and iPad, too. Start free on iOS and Android.",
      openGraphTitle: "Aido | Put it off alone. Get it done together.",
      openGraphDescription:
        "Say it and AI turns it into a to-do. Friends nudge you along. Invite a friend and collect paw prints.",
      keywords: [
        "Aido",
        "to-dos with friends",
        "share to-dos",
        "task management app",
        "daily planner",
        "recurring tasks",
        "AI to-do planning",
        "AI to-do app",
        "invite friends",
        "home screen widget",
      ],
    },
    nav: {
      label: "Main navigation",
      guides: "Guides",
      invite: "Invite friends",
      services: "Explore Aido",
      download: "Get the app",
      patchNotes: "Patch notes",
      open: "Open menu",
      close: "Close menu",
      menuTitle: "Menu",
      guidesTitle: "Guides",
      moreTitle: "More",
    },
    accessibility: {
      skip: "Skip to content",
      home: "Home",
      breadcrumb: "Breadcrumb",
    },
    home: {
      hero: {
        release: "New in 1.13.0: friend invites and paw prints",
        titleLead: "Put it off alone.",
        titleTail: "Get it done together.",
        description:
          "Say it and AI turns it into a to-do. Friends nudge you along. This time, see today's list through.",
        note: "Start free on iOS and Android",
        screenAlt:
          "Aido home screen with today's to-dos and friends' cat profiles",
        nudgeName: "Dubu",
        nudgeText: "Nudge! Pilates tonight?",
        doneNote: "Design review, done!",
      },
      ai: {
        kicker: "Say it, and it’s on your list",
        title: "Just say it. It’s a to-do.",
        description:
          "Say it or type it, and the date, time and repeat fill themselves in. AI can also split a long note into separate to-dos.",
        exampleLabel: "Examples of AI organizing a to-do",
        examples: [
          {
            input: "Dentist tomorrow at 3pm",
            date: "Tomorrow",
            time: "3:00 PM",
          },
          {
            input: "Run every Monday at 7am",
            date: "Every Monday",
            time: "7:00 AM",
          },
        ],
        voiceAlt: "Aido add-to-do screen showing how to add a to-do by voice",
        parseAlt: "Aido screen where AI made 4 to-dos from a single note",
        repeatAlt:
          "Aido add-to-do screen with the date and time filled in for Pilates",
        guideLink: "How AI to-dos work",
        repeatGuideLink: "How recurring to-dos work",
      },
      friends: {
        kicker: "Put it off? Get a nudge.",
        title: "A nudge from a friend gets you going",
        description:
          "See the to-dos friends share and cheer them on with a nudge or a comment. When you finish, thank the friends who cheered you on. You pick which to-dos to show.",
        feedAlt:
          "Aido friends screen with cat profiles and a nudge button next to a friend's to-dos",
        nudgeAlt: "Aido screen with a friend's to-do details and a comment box",
        nudgeName: "Cheese",
        nudgeText: "Nudge! Leg day today",
        guideLink: "How shared to-dos work",
      },
      invite: {
        badge: "New",
        kicker: "One link is all it takes",
        title: "Invite a friend, collect paw prints",
        description:
          "When a friend joins from your invite link, you're friends right away. As they keep finishing to-dos, paw prints land on your board one by one.",
        rewardTitle: "Who gets what, and when?",
        friendLabel: "Your friend",
        friendWhen: "Right when they join",
        friendReward: "7 days of Premium",
        myLabel: "You",
        myWhen: "Once they complete to-dos on 2 days",
        myReward: "7 days of Premium + 1 more friend",
        conditionBadge: "Conditions apply",
        conditionNote:
          "You get a paw print when your friend completes to-dos on 2 days within 14 days of joining. Several to-dos on the same day count as 1 day. You can earn up to 30 days of reward Premium every 30 days, and up to 90 days in total.",
        boardTitle: "Paw print board",
        boardSummary: "5 of 12 paw prints added",
        boardHint: "Fill all 12 and a new board opens",
        boardAlt:
          "Aido invite screen with a KakaoTalk invite button and a 12-cell paw print board with 1 paw print",
        fullBoardAlt:
          "Aido paw print board with all 12 cells filled, completing board 1",
        guideLink: "How friend invites work",
      },
      largeScreen: {
        badge: "Big screens",
        kicker: "More room, less tapping",
        title: "Folded, it’s a phone. Unfolded, it’s all in view.",
        description:
          "Unfold iPhone Duo and your list sits on the left with details on the right. Keep up with nudges and comments without switching screens.",
        foldedNote: "Folded",
        unfoldedNote: "Unfolded, two panes",
        foldedAlt:
          "Today's to-dos in Aido on the outer screen of a folded iPhone Duo",
        unfoldedAlt:
          "Aido on an unfolded iPhone Duo with the to-do list on the left and details on the right",
        ipadTitle: "Two panes on iPad, too",
        ipadDescription:
          "See your list alongside details and comments on a bigger screen.",
        ipadAlt: "Aido on iPad with the to-do list and details side by side",
        widgetTitle: "Check in from your home screen",
        widgetDescription:
          "See today's to-dos and progress in a widget without opening the app. Available on iOS and Android.",
        widgetAlt:
          "Two Aido widgets on an iPhone home screen showing 3 of 8 to-dos done and a to-do list",
      },
      routine: {
        kicker: "From your record to your next step",
        title: "Look back on your week. Get reminders on your schedule.",
        reportTitle: "AI weekly and monthly reports",
        reportDescription:
          "See your completion rate, categories and day-by-day patterns at a glance.",
        reportAlt:
          "Aido AI report with a 100% weekly completion rate, 25 done, a 7-day streak and category breakdown",
        reminderTitle: "Reminders",
        reminderDescription:
          "Get today's to-dos in the morning and evening. With Premium, pick any time you like.",
        reminderAlt:
          "Aido notification settings with push, weather and 8:00 AM and 7:00 PM reminders on",
        premiumLabel: "Premium",
      },
      premium: {
        kicker: "When you want a little more",
        title: "More room with Premium",
        description: "The basics are free. Premium adds these.",
        note: "Check the app for current prices and details.",
        benefits: [
          {
            id: "aiParsing",
            title: "Unlimited AI to-dos",
            description:
              "Organize to-dos in natural language, without the 5-per-month limit",
          },
          {
            id: "nudge",
            title: "Unlimited nudges",
            description:
              "Nudge your friends freely, without the 3-per-day limit",
          },
          {
            id: "friends",
            title: "Unlimited friends",
            description: "Add friends freely, without the 5-friend limit",
          },
          {
            id: "reminder",
            title: "Custom reminder times",
            description: "Get notified when you want, not at fixed times",
          },
          {
            id: "aiReport",
            title: "AI weekly/monthly reports",
            description: "See your completion rate and patterns at a glance",
          },
          {
            id: "aiRepeat",
            title: "AI repeat suggestions",
            description: "AI automatically suggests recurring to-dos",
          },
          {
            id: "categories",
            title: "Up to 30 categories",
            description: "Grow from the 3-category limit up to 30",
          },
          {
            id: "appIcon",
            title: "App icon customization",
            description: "Change the app icon to match your style",
          },
        ],
      },
      appFeatures: [
        "AI to-dos that fill in the date, time and repeat from what you say or type",
        "Share to-dos with friends and cheer them on with nudges and comments",
        "Friend invites with a 12-cell paw print board",
        "Home screen widgets on iOS and Android",
        "Two-pane view on iPhone Duo, foldables and iPad",
        "AI weekly and monthly reports and repeat suggestions",
        "Reminders",
      ],
    },
    faq: {
      title: "A few things you might be wondering",
      description: "Get to know Aido before your first small step.",
      items: [
        {
          question: "How do I use Aido with friends?",
          answer:
            "Find friends by name or hashtag and see the to-dos they choose to share. Send a nudge or leave a comment to cheer them on. When you finish a to-do, thank the friends who encouraged you.",
        },
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
            "Yes. Choose daily, weekdays, weekends or specific days, then set a start and end date. See your plans in weekly and monthly calendars. AI recurring suggestions are a Premium feature.",
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
            "Download the iOS app from the App Store or the Android app from Google Play. On an unfolded foldable phone, iPhone Duo or iPad, lists and details appear side by side. Both the app and this website support English and Korean. Home screen widgets are available on iOS and Android, too.",
        },
        {
          question: "What do I get for inviting friends?",
          answer:
            "When a friend who joined within the last 7 days accepts your invite, they get 7 days of Premium right away. You get 7 days of Premium and can add 1 more friend once they complete to-dos on 2 days within 14 days of joining (several on the same day count as 1 day). Rewards are in-app Premium only and have no cash value. You can earn up to 30 days of Premium every 30 days, and up to 90 days in total. See Article 13-2 of the Terms of Service for details.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Open the Me tab in the app and tap Delete Account at the bottom. If you can't use the app, follow the account deletion page to request it by email. Deleting your account doesn't cancel your subscription, so cancel it in the store first.",
        },
      ],
    },
    cta: {
      titleLineOne: "One small step.",
      titleLineTwo: "Start with a friend.",
      description:
        "Share your plans, encourage each other and work through today’s to-dos.",
      closingNote: "Start free. Some features require Premium.",
    },
    storeButtons: {
      ariaLabel: "App download links",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
    },
    invite: {
      metaTitle: "Friend invite",
      metaDescription:
        "A friend invited you to Aido. Install the app and join to get 7 days of Premium.",
      brandLabel: "Aido friend invite",
      loadingLabel: "Loading your invite",
      titleTemplate: "{name} invited you to Aido",
      titleFallback: "A friend invited you to Aido",
      lead: "Start together and cheer each other on until today’s to-dos are done.",
      avatarAltTemplate: "{name}’s cat profile",
      avatarAltFallback: "Aido cat profile",
      receiptLabel: "Invite receipt",
      rewardLabel: "When you join",
      rewardValue: "7 days of Premium",
      codeLabel: "Invite code",
      codeCopy: "Copy",
      codeCopied: "Copied",
      codeCopyAria: "Copy invite code",
      codeCopiedStatus: "Invite code copied",
      codeManualStatus: "Copy was blocked. Press and hold the code to copy it.",
      codeHint:
        "Enter this code when you join after installing. On Android it fills in automatically.",
      outdatedNote:
        "Already use Aido? Update the app to the latest version, then open this link again.",
      rewardTermsNote:
        "Accept the invite within 7 days of joining to get it. It's in-app Premium only, has no cash value, and can't be claimed again on a device or account that already got it.",
      rewardTermsLink: "See invite reward terms",
      errors: {
        invalidCode: {
          title: "Please check your invite link",
          description:
            "The link may be cut off or changed. Ask your friend to send it again.",
        },
        notFound: {
          title: "We couldn’t find this invite code",
          description:
            "Check the code again or ask your friend for a new link.",
        },
        changed: {
          title: "Your friend made a new invite link",
          description:
            "This link no longer works. Ask your friend for the latest one.",
        },
        unavailable: {
          title: "Invites are unavailable right now",
          description:
            "Please try again in a bit. You can still install Aido first.",
        },
        unknown: {
          title: "We couldn’t load your friend’s info",
          description:
            "Your code still works. You can also try again in a bit.",
        },
      },
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "Get things done with friends.",
      serviceTitle: "Aido",
      policyTitle: "Policies & help",
      linkHubTitle: "Links",
      linkHubLabel: "All official links",
      downloadTitle: "Get the app",
      businessLabel: "Business information",
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
      accountDeletionLabel: "Account deletion",
      instagramLabel: "Instagram",
      externalLinkLabel: "Opens in a new tab",
    },
    legal: {
      badge: "Policies",
      viewTermsLabel: "View Terms of Service",
      viewPrivacyLabel: "View Privacy Policy",
      privacyTitle: "Privacy Policy",
      privacyDescription:
        "How Aido collects, uses, stores, and protects your personal data.",
      termsTitle: "Terms of Service",
      termsDescription:
        "Usage terms, subscription conditions, and user rights for Aido.",
      accountDeletionTitle: "Account deletion",
      accountDeletionDescription:
        "How to delete your Aido account in the app or request deletion by email without the app, and what data is deleted or kept.",
    },
    patchNotes: {
      kicker: "Growing a little every day",
      title: "Patch Notes",
      description:
        "Aido keeps getting a little better. Catch up on app updates and service improvements that need no new installation.",
      appUpdate: "App update",
      serviceUpdate: "Service improvements",
      noAppUpdateNeeded: "These changes apply without an app update.",
      updateSummary: "Update summary",
      copySummary: "Copy summary",
      summaryCopied: "Summary copied.",
      copySummaryFallback:
        "Select the text below and copy it manually. Line breaks are included.",
      bugFixes: "Fixes",
      features: "New features",
      improvements: "Improvements",
      newRelease: "First release",
      latest: "Latest",
      archiveTitle: "Earlier updates",
      archiveDescription:
        "Explore app updates and service improvements by month. Open a record to see what changed.",
      releaseCount: "{count} updates",
      releaseCountOne: "1 update",
      expand: "Read more",
      collapse: "Show less",
      initialNote:
        "This is Aido's very first release. Thanks for taking the first step with us.",
      closingNote: "We keep making little improvements for better days. 🐾",
    },
    languageSwitcher: {
      ko: "KO",
      en: "EN",
      navLabel: "Language selection",
    },
  },
};

export function getMessages(locale: Locale): MessageCatalog {
  return catalogs[locale];
}
