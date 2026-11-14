import type {
  FeatureGroupId,
  FeatureGuideSlug,
} from "@/features/feature-guides/data/feature-guides";
import type { ProfileCatId } from "@/features/landing/data/home-cats";
import type { SupportedDeviceId } from "@/features/landing/data/supported-devices";
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

/** 날씨 가이드는 요금제 대신 화면 구성과 아이두 브리핑이 언제 무엇을 보여주는지 정리한다. */
export type WeatherGuideContent = Omit<FeatureGuideContent, "plans"> & {
  layout: { title: string; body: string }[];
  /** 상황별 실제 화면. data/guide-screens.ts의 weatherCaseScreens와 같은 순서다. */
  cases: { title: string; body: string; points: string[]; alt: string }[];
  briefing: {
    introduction: string;
    rows: { when: string; shows: string }[];
    note: string;
  };
  /** 움직이는 날씨 장면. data/guide-videos.ts의 weatherSceneVideos와 같은 순서다. */
  scenes: { name: string; alt: string }[];
  /** 장면 옆의 Android 전체 화면 녹화 */
  scenePhone: { alt: string; caption: string };
  /** 기기별 화면. data/guide-screens.ts의 weatherDeviceScreens와 같은 순서다. */
  devices: { name: string; body: string; alt: string }[];
};

/** 댓글 가이드는 요금제 대신 실제 녹화로 댓글·답글·하트·알림이 어떻게 움직이는지 보여 준다. */
export type CommentsGuideContent = Omit<FeatureGuideContent, "plans"> & {
  /** data/guide-videos.ts의 commentStoryVideos와 같은 순서다. */
  story: { title: string; body: string; alt: string }[];
};

/** 비교 표는 앱 구독 화면의 비교 표와 같은 값이다. 지어내지 않는다. */
export type PremiumGuideContent = FeatureGuideContent & {
  comparison: {
    title: string;
    caption: string;
    featureLabel: string;
    rows: { feature: string; free: string; premium: string }[];
  };
};

type FeatureHubContent = {
  title: string;
  metaTitle: string;
  description: string;
  kicker: string;
  summaryTitle: string;
  summary: { title: string; body: string }[];
  groupsLabel: string;
  groups: Record<FeatureGroupId, { title: string; hand: string; body: string }>;
  premiumBadge: string;
  screensTitle: string;
  screensDescription: string;
  compareTitle: string;
  compareBody: string;
  compareLink: string;
  faq: { question: string; answer: string }[];
};

/** 경쟁 앱 정보는 공식 페이지·스토어에서 확인한 사실만 쓴다. */
type CompareContent = {
  title: string;
  metaTitle: string;
  description: string;
  kicker: string;
  checkedLabel: string;
  intro: string[];
  tableTitle: string;
  tableCaption: string;
  featureLabel: string;
  apps: { aido: string; todomate: string; ticktick: string; todoist: string };
  rows: {
    feature: string;
    aido: string;
    todomate: string;
    ticktick: string;
    todoist: string;
  }[];
  tableNote: string;
  chooseTitle: string;
  choose: { title: string; body: string }[];
  aidoTitle: string;
  aidoPoints: { title: string; body: string; slug: FeatureGuideSlug }[];
  sourcesTitle: string;
  sources: { label: string; url: string }[];
  disclaimer: string;
  faq: { question: string; answer: string }[];
};

/** 홈 고양이 고르기. 이름은 앱 app-icon.json의 icons와 같다. */
export type CatPickerContent = {
  groupLabel: string;
  hint: string;
  profileLabel: string;
  friendsLabel: string;
  meLabel: string;
  friendNames: readonly [string, string];
  appIconLabel: string;
  appName: string;
  premiumBadge: string;
  names: Record<ProfileCatId, string>;
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
  comments: {
    badge: string;
    kicker: string;
    title: string;
    description: string;
    /** 할 일 만들기 → 친구 댓글 → 답글·멘션 → 더블탭 하트 */
    steps: string[];
    heartAlt: string;
    replyAlt: string;
    heartNote: string;
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
  cats: {
    kicker: string;
    title: string;
    description: string;
    premiumNote: string;
    picker: CatPickerContent;
  };
  largeScreen: {
    badge: string;
    kicker: string;
    title: string;
    description: string;
    foldedNote: string;
    unfoldedNote: string;
    unfoldedAlt: string;
    ipadTitle: string;
    ipadDescription: string;
    ipadAlt: string;
    widgetTitle: string;
    widgetDescription: string;
    widgetAlt: string;
  };
  devices: {
    kicker: string;
    title: string;
    description: string;
    note: string;
    items: Record<
      SupportedDeviceId,
      { name: string; description: string; requirement: string; alt: string }
    >;
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
    privacySignal: string;
    close: string;
  };
  featureGuides: {
    title: string;
    description: string;
    readGuide: string;
    viewAll: string;
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
    layoutTitle: string;
    casesTitle: string;
    casesDescription: string;
    briefingTitle: string;
    briefingWhenLabel: string;
    briefingShowsLabel: string;
    scenesTitle: string;
    scenesDescription: string;
    dayLabel: string;
    nightLabel: string;
    devicesTitle: string;
    devicesDescription: string;
    storyTitle: string;
    storyDescription: string;
    /** 녹화 영상이 한국어 화면이라는 안내처럼, 영상 아래에 붙는 짧은 설명 */
    videoNote: string;
    faqTitle: string;
    relatedTitle: string;
    relatedDescription: string;
    updatedLabel: string;
    guides: {
      "shared-todo": FeatureGuideContent;
      "recurring-todo": FeatureGuideContent;
      "ai-todo": FeatureGuideContent;
      "friend-invite": FriendInviteGuideContent;
      weather: WeatherGuideContent;
      comments: CommentsGuideContent;
      "todo-calendar": FeatureGuideContent;
      memo: FeatureGuideContent;
      nudge: FeatureGuideContent;
      reminders: FeatureGuideContent;
      "ai-report": FeatureGuideContent;
      customize: FeatureGuideContent;
      premium: PremiumGuideContent;
    };
  };
  featureHub: FeatureHubContent;
  compare: CompareContent;
  media: { play: string; pause: string };
  services: {
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
    ogKicker: string;
    ogBadge: string;
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
    youtubeLabel: string;
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
    /** 큰 업데이트의 실제 화면 소개 페이지(/patch-notes/{slug})로 가는 링크 */
    highlightsLink: string;
  };
  releaseHighlights: {
    breadcrumbLabel: string;
    releasedLabel: string;
    contentsLabel: string;
    screenNote: string;
    freeLabel: string;
    premiumLabel: string;
    featureLabel: string;
    allNotesTitle: string;
    allNotesDescription: string;
    allNotesLink: string;
  };
  languageSwitcher: {
    ko: string;
    en: string;
    navLabel: string;
  };
  theme: {
    label: string;
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
  nav: {
    label: string;
    features: string;
    compare: string;
    invite: string;
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
    /** 스토어 버튼 아래 짧은 호환 기기 표기 */
    devices: string;
    channelsLabel: string;
    youtubeLabel: string;
    linkHubLabel: string;
  };
  storeButtons: {
    ariaLabel: string;
    appStorePrefix: string;
    appStoreLabel: string;
    playStorePrefix: string;
    playStoreLabel: string;
    newTabLabel: string;
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
    retry: string;
    errors: Record<
      | "invalidCode"
      | "notFound"
      | "changed"
      | "unavailable"
      | "unknown"
      | "renderError",
      { title: string; description: string }
    >;
  };
};

const catalogs: Record<Locale, MessageCatalog> = {
  ko: {
    services: {
      screenshotNote:
        "실제 iOS와 Android 앱을 예시 계정으로 촬영했어요. 이름과 할\u00a0일은 소개를 위한\u00a0예시예요.",
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
            "날짜를 눌러 할\u00a0일을 확인하고, 오늘 버튼으로\u00a0돌아와요.",
            "카테고리 색으로 계획을 구분하고, 마친 날에는 작은 발자국을\u00a0남겨요.",
          ],
          captions: [
            "주간 캘린더와 오늘의 할\u00a0일",
            "월간 캘린더의 날짜별 계획",
          ],
        },
        todos: {
          navigationLabel: "할\u00a0일",
          title: "큰일도 작은 단계부터",
          description:
            "날짜와 시간을 정하고 반복 일정과 체크리스트를\u00a0더해요.",
          details: [
            "체크리스트로 해야 할\u00a0일을 차근차근 나눠요.",
            "매일, 주중, 주말 또는 원하는 요일에 반복하도록\u00a0설정해요.",
            "할\u00a0일마다 공개 범위를 골라 나만의 계획도 간직해요.",
          ],
          captions: ["할\u00a0일 상세와 체크리스트", "반복할 요일과 기간 선택"],
        },
        notes: {
          navigationLabel: "메모",
          title: "아직 계획이 아닌 생각도 괜찮아요",
          description:
            "떠오른 생각을 메모해 두고, 준비가 되면 할\u00a0일로\u00a0옮겨요.",
          details: [
            "자주 보는 메모는 고정하고, 원하는 순서로 정리해요.",
            "메모를 한 개의 할\u00a0일로 바꾸거나, AI로 여러 할\u00a0일로\u00a0나눠요.",
          ],
          captions: [
            "고정 메모와 메모 목록",
            "메모 상세와 할\u00a0일로 바꾸기",
          ],
        },
        ai: {
          navigationLabel: "AI 할\u00a0일",
          title: "생각나는 대로 말하거나 적어 두세요",
          description:
            "길게 말하거나 적어 둔 메모를 AI가 할\u00a0일 여러 개로\u00a0나눠요.",
          details: [
            "말로 할\u00a0일 만들기: 말하면 AI가 날짜·시간·반복까지 채워\u00a0나눠요.",
            "메모에서 ‘AI로 할\u00a0일 나누기’를 누르면 같은 화면에서 골라\u00a0추가해요.",
            "무료는 월 10회, 프리미엄은 월 1,000회까지 쓰고, 남은 횟수는 AI 칩에서\u00a0보여요.",
          ],
          captions: [
            "말한 내용을 AI가 나눈 할\u00a0일 고르기",
            "메모를 AI가 할\u00a0일 4개로 나눈 결과",
          ],
        },
        friends: {
          navigationLabel: "친구",
          title: "친구와 할\u00a0일을 나누고 응원해요",
          description:
            "공개한 할\u00a0일을 친구와 나누고 콕과 댓글로 서로\u00a0응원해요.",
          details: [
            "이름이나 고유 해시태그로 친구를 찾고 연결해요.",
            "친구의 할\u00a0일에 콕을 보내거나 댓글과 답글로 이야기를\u00a0나눠요.",
            "보낸 콕은 따로 모아 확인할 수 있어요.",
          ],
          captions: ["친구의 캘린더와 할\u00a0일", "내가 보낸 콕 목록"],
        },
        nudges: {
          navigationLabel: "콕과 답장",
          title: "콕에 답하고 완료 소식을 전해요",
          description:
            "받은 콕에 내 마음을 답하고, 할\u00a0일을 마친 뒤 고마움을\u00a0전해요.",
          details: [
            "시작할게, 응원 고마워, 조금 뒤에 할게. 지금 마음에 맞는 답장을\u00a0골라요.",
            "응원해 준 친구들을 확인하고, 완료 소식과 고마운 마음을 함께\u00a0전해요.",
            "답장만으로 할\u00a0일이 완료되지는 않아요.",
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
            "아침·저녁 리마인더와 날씨 알림 시간을 나의 하루에\u00a0맞춰요.",
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
          description: "할\u00a0일을 확인하면서 현재 위치의 날씨도 함께 봐요.",
          details: [
            "홈의 날씨 버튼에서 자세한 시간별·10일 예보를\u00a0열어요.",
            "위치 권한은 선택할 수 있고, 날씨가 준비되지 않아도 할\u00a0일은 계속 쓸 수\u00a0있어요.",
            "해외에서도 그곳의 날씨를 볼 수 있고, 아이두 브리핑이 오늘 할\u00a0일과 날씨를 맞춰\u00a0알려줘요.",
          ],
          captions: ["현재 날씨와 시간별 예보", "Android 날씨 화면"],
        },
        widgets: {
          navigationLabel: "위젯",
          title: "홈 화면에서 오늘 할\u00a0일을 봐요",
          description:
            "작은 진행 상황부터 주간 달력까지, 홈 화면 크기에 맞게\u00a0골라요.",
          details: [
            "작은 위젯은 완료 수, 진행률, 연속 기록을\u00a0보여줘요.",
            "중간 위젯은 오늘 할\u00a0일을, 큰 위젯은 주간 달력과 목록을 함께\u00a0보여줘요.",
            "할\u00a0일을 누르면 앱에서 확인하고, 만들기 버튼으로 새 할\u00a0일을\u00a0시작해요.",
            "위젯 갱신 시점은 기기와 운영체제에 따라 달라질 수\u00a0있어요.",
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
          description:
            "AI 리포트와 반복 제안으로 나에게 맞는 패턴을\u00a0돌아봐요.",
          details: [
            "주간·월간 리포트에서 달성률과 카테고리별 기록을\u00a0확인해요.",
            "반복되는 할\u00a0일은 AI 제안을 살펴보고 내 일정에\u00a0더해요.",
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
          description:
            "마이 페이지에서 프로필과 나에게 편한 화면을\u00a0고르세요.",
          details: [
            "아홉 가지 고양이 프로필 중 나를 닮은 친구를\u00a0골라요.",
            "라이트 모드나 다크 모드를 고르고 글자 크기와 앱 언어를\u00a0설정해요.",
            "프리미엄에서는 iOS와 Android 앱 아이콘도 바꿀 수\u00a0있어요.",
          ],
          captions: [
            "아홉 고양이 중 프로필 선택",
            "기기 홈 화면의 앱 아이콘 선택",
            "다크 모드로 보는 오늘의 할\u00a0일",
          ],
        },
      },
    },
    analyticsConsent: {
      title: "방문 통계 쿠키",
      description:
        "더 나은 아이두를 위해 방문 통계를 써요. 허용하면 Google\u00a0Analytics 쿠키로 재방문을\u00a0구분해요.",
      accept: "허용",
      reject: "거부",
      privacy: "자세히",
      settings: "쿠키 설정",
      storageError: "선택을 저장하지 못했어요. 쿠키는 쓰지 않아요.",
      privacySignal:
        "브라우저의 추적 거부 설정을 따라 쿠키를 쓰지\u00a0않아요.",
      close: "닫기",
    },
    featureGuides: {
      title: "친구와 함께 시작하는 아이두",
      description:
        "친구를 연결하고 할\u00a0일을 공유해 보세요. 반복 일정과 AI 정리도 차근차근\u00a0알아봐요.",
      readGuide: "가이드 보기",
      viewAll: "기능 소개 전체 보기",
      breadcrumbLabel: "기능 소개",
      screenNote: "실제 앱 화면이에요",
      stepsTitle: "이렇게 시작해 보세요",
      exampleTitle: "내 하루에 이렇게 써 봐요",
      plansTitle: "무료로 시작하고, 필요할 때 더 넉넉하게",
      freeLabel: "무료",
      premiumLabel: "프리미엄",
      plansNote: "구독 가격과 상세 이용 조건은 앱에서 확인할 수\u00a0있어요.",
      rewardsTitle: "누가, 언제 받나요",
      rewardsLimitsTitle: "조건이 있어요",
      pawBoardLabel: "발자국 모으기 판",
      layoutTitle: "위에서부터 이렇게 보여요",
      casesTitle: "상황별 실제 화면",
      casesDescription:
        "비·더위·맑은 날, 해외와 오프라인까지 날씨 화면이 상황마다 무엇을 알려주는지 실제 화면으로\u00a0모았어요.",
      briefingTitle: "아이두 브리핑은 언제 무엇을 알려주나요",
      briefingWhenLabel: "이럴 때",
      briefingShowsLabel: "이렇게 알려줘요",
      scenesTitle: "18가지 날씨가 화면에서 움직여요",
      scenesDescription:
        "비·눈·우박·천둥번개·안개·무더위·강추위까지, 날씨마다 하늘이 실제처럼 움직여요. 낮에는 해가, 밤에는 달이 떠요. 모두 앱에서 녹화한 실제\u00a0화면이에요.",
      dayLabel: "낮",
      nightLabel: "밤",
      devicesTitle: "넓은 화면에서도 날씨가 넉넉해요",
      devicesDescription:
        "iPhone·Android는 물론, iPhone\u00a0Duo와 iPad처럼 넓은 화면에서는 지금 날씨와 예보를 나란히 보여줘요. 폴더블을 펼쳐도 두 칸으로 넓게\u00a0봐요.",
      storyTitle: "실제로 이렇게 움직여요",
      storyDescription:
        "앱에서 그대로 녹화한 화면이에요. 답글을 펼치고, 키보드 위에서 답글을 쓰고, 하트를 누르고, 알림으로 그 댓글을 찾아가는 모습을\u00a0담았어요.",
      videoNote: "소리 없이 반복되는 실제 앱 녹화예요.",
      faqTitle: "자주 묻는 질문",
      relatedTitle: "다음으로 알아볼 기능",
      relatedDescription: "내 하루에 필요한 기능을 하나씩 더해 보세요.",
      updatedLabel: "내용 확인일",
      guides: {
        "todo-calendar": {
          kicker: "오늘 할\u00a0일, 한눈에 쏙",
          title: "할\u00a0일과 달력으로 하루·한 달\u00a0계획하기",
          summary:
            "아이두는 할\u00a0일을 적고 주간·월간 달력에서 한눈에 보는 투두 리스트 앱이에요. 날짜·시간·반복·카테고리를 칩으로 바로 고르고, 큰 일은 체크리스트로 잘게 나눠요. 혼자만 볼 일은 비공개로 두면 친구에게 보이지\u00a0않아요.",
          cardDescription:
            "할\u00a0일을 적고 주·월 달력에서 계획을 봐요. 체크리스트로 큰 일을 잘게\u00a0나눠요.",
          steps: [
            {
              title: "+를 눌러 할\u00a0일을 적어요",
              body: "할\u00a0일 탭에서 할\u00a0일 추가 시트를 열고 ‘무엇을 하고 싶나요?’ 칸에 적어요. 카테고리 이름 옆 +를 누르면 그 카테고리로 바로\u00a0추가돼요.",
            },
            {
              title: "칩으로 날짜·시간·반복을 골라요",
              body: "입력칸 아래 칩에서 오늘·내일 같은 날짜, 종일이나 시간, 반복, 공개 범위, 카테고리를 골라요. 고른 값은 칩에 바로 보여서 저장 전에 한 번에 확인할 수\u00a0있어요.",
            },
            {
              title: "주·월 달력으로 계획을 살펴봐요",
              body: "달력 위 ‘주·월’ 버튼으로 보기를 바꾸고, 화살표로 지난주·다음 주를 넘겨요. 날짜를 누르면 그날 할\u00a0일이 보이고, ‘오늘’을 누르면 오늘로\u00a0돌아와요.",
            },
            {
              title: "끝낸 일은 체크해요",
              body: "동그란 체크 칸을 누르면 완료돼요. 할\u00a0일을 누르면 상세 화면에서 체크리스트와 댓글을 보고, 더보기(⋯)에서 수정·날짜 변경·시간 변경·카테고리 변경·삭제를\u00a0해요.",
            },
          ],
          example: {
            introduction:
              "여행 준비처럼 챙길 게 많은 일은 이렇게 나눠\u00a0봐요.",
            items: [
              "할\u00a0일: 제주 여행 짐 리스트 만들기 · 오후 5:00 ·\u00a0생활",
              "체크리스트: 충전기랑 보조배터리, 선크림·선글라스, 필름 카메라, 두부 펫시터\u00a0연락",
              "하나씩 체크할 때마다 진행 막대가 2/4, 3/4처럼\u00a0차올라요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. 화면의 이름과 할\u00a0일은 예시\u00a0계정이에요.",
          },
          details: [
            {
              title: "카테고리로 하루를 나눠요",
              body: "업무·운동·생활처럼 카테고리를 만들면 홈에서 카테고리별로 묶여 보여요. 마이 탭 > 카테고리 관리에서 이름을 고치고 순서를\u00a0바꿔요.",
            },
            {
              title: "비공개 할\u00a0일은 나만 봐요",
              body: "할\u00a0일을 만들 때 공개 칩을 눌러 비공개로 바꾸면 친구 피드에 보이지 않아요. 병원 예약처럼 혼자 챙길 일에\u00a0좋아요.",
            },
            {
              title: "체크리스트로 큰 일을 잘게",
              body: "할\u00a0일에 하위 할\u00a0일을 더하면 상세 화면에서 하나씩 체크하고, 홈에서도 진행률을 볼 수\u00a0있어요.",
            },
            {
              title: "말로 한 번에 적어도 돼요",
              body: "추가 시트의 마이크를 누르고 ‘내일 아침 7시 헬스장’처럼 말하면 AI가 날짜·시간까지 채워 할\u00a0일로\u00a0만들어요.",
            },
          ],
          plans: {
            free: "할\u00a0일 추가·체크·주간·월간 달력·반복·체크리스트·비공개 할\u00a0일을 무료로 써요. 카테고리는 3개까지 만들 수\u00a0있어요.",
            premium:
              "카테고리를 30개까지 만들 수 있고, AI 할\u00a0일 만들기를 월 1,000회까지 넉넉하게\u00a0써요.",
          },
          faq: [
            {
              question: "할\u00a0일 날짜를 바꿀 수 있나요?",
              answer:
                "네. 할\u00a0일의 더보기(⋯)에서 ‘날짜 변경’이나 ‘시간 변경’을 눌러요. 반복 할\u00a0일은 이 할\u00a0일만 바꿀지, 이후 할\u00a0일까지 바꿀지\u00a0골라요.",
            },
            {
              question: "친구가 내 할\u00a0일을 모두 볼 수\u00a0있나요?",
              answer:
                "공개 할\u00a0일만 친구 피드에 보여요. 비공개로 만든 할\u00a0일은 나만 볼 수\u00a0있어요.",
            },
            {
              question: "달력은 일요일부터 시작하나요?",
              answer:
                "네. 주간·월간 달력은 일요일부터 토요일까지 보여요. 주간 보기 위에는 ‘11월 2주차’처럼 몇째 주인지 함께\u00a0보여요.",
            },
          ],
          screens: [
            {
              alt: "주간 달력 아래 업무·운동·생활 카테고리별 할\u00a0일과 체크리스트 진행률이 보이는 아이두 홈\u00a0화면",
              caption: "카테고리별로 묶인 오늘 할\u00a0일",
            },
            {
              alt: "치과 예약하기를 적고 내일·오전 9:00·주중 반복·비공개 칩을 고른 아이두 할\u00a0일 추가\u00a0시트",
              caption: "칩으로 날짜·시간·반복·공개 범위를 골라요",
            },
            {
              alt: "2026년 11월 월간 달력에 날짜마다 할\u00a0일 표시가 있는 아이두\u00a0화면",
              caption: "월간 달력으로 한 달 계획을 봐요",
            },
            {
              alt: "제주 여행 짐 리스트 만들기 할\u00a0일에 체크리스트 4개 중 2개가 완료된 아이두 할\u00a0일 상세\u00a0화면",
              caption: "체크리스트로 큰 일을 잘게 나눠요",
            },
          ],
        },
        memo: {
          kicker: "끄적인 메모가 할\u00a0일로 뚝딱",
          title: "메모를 쓰고 AI로 할\u00a0일 나누기",
          summary:
            "아이두 메모 탭에는 회의 내용, 장보기 목록, 읽고 싶은 책처럼 아직 할\u00a0일이 아닌 생각을 편하게 적어 둬요. 필요할 때 ‘AI로 할\u00a0일 나누기’를 누르면 메모 속 해야 할\u00a0일을 AI가 찾아 날짜와 함께 할\u00a0일로 바꿔\u00a0줘요.",
          cardDescription:
            "떠오른 생각은 메모에 적어 두고, 필요할 때 AI가 할\u00a0일로\u00a0나눠요.",
          steps: [
            {
              title: "메모 탭에서 +를 눌러요",
              body: "아래 탭에서 메모를 열고 오른쪽 위 +를 눌러 새 메모를 적어요. 첫 줄이 제목이 되고, 목록에서는 카드로 모아\u00a0보여요.",
            },
            {
              title: "중요한 메모는 고정해요",
              body: "메모 상세 위쪽의 핀을 누르면 목록 맨 앞에 고정돼요. iPhone에서는 메모 카드를 길게 눌러 미리 보고, 바로 고정을 풀거나 지울 수도\u00a0있어요.",
            },
            {
              title: "더보기(⋯) > AI로 할\u00a0일 나누기",
              body: "메모를 열고 더보기에서 ‘AI로 할\u00a0일 나누기’를 누르면 AI가 메모 속 할\u00a0일을 찾아 날짜·시간과 함께\u00a0나눠요.",
            },
            {
              title: "추가할 것만 체크하고 추가해요",
              body: "체크한 것만 추가돼요. 연필을 눌러 제목이나 날짜를 고치고, ‘할\u00a0일 N개 추가’를 누르면 할\u00a0일 탭에\u00a0들어가요.",
            },
          ],
          example: {
            introduction: "회의가 끝나고 적어 둔 메모가 있다면요.",
            items: [
              "메모: 11월 디자인 리뷰 후속: 온보딩 2단계 카피 다시 쓰기(금요일까지), 다크모드 대비 이슈 정리해서 지훈님께 전달, 다음 주 화요일 오후 3시 후속 리뷰 잡기, 아이콘 시안 3종 비교표\u00a0만들기",
              "AI가 나눈 할\u00a0일 4개: 온보딩 2단계 카피 다시 쓰기(11월 12일~13일), 다크모드 대비 이슈 정리(오늘), 후속 리뷰 잡기(11월 17일 오후 3:00), 아이콘 시안 3종 비교표\u00a0만들기(오늘)",
              "필요 없는 건 체크를 풀고 ‘할\u00a0일 4개 추가’를\u00a0눌러요.",
            ],
            note: "실제 앱에서 예시 메모로 만든 결과예요. AI 결과는 메모 내용에 따라 달라지니 추가하기 전에 확인해\u00a0주세요.",
          },
          details: [
            {
              title: "길게 말한 건 말로 메모로",
              body: "메모 탭의 ‘말로 메모’를 누르면 회의나 수업을 녹음하고 AI가 요약·핵심 포인트·할\u00a0일을 정리해요. 녹음 파일은 기기에 저장되고 아이두 서버로 보내지\u00a0않아요.",
            },
            {
              title: "메모를 할\u00a0일 하나로 옮길 때",
              body: "메모 전체를 할\u00a0일 하나로 옮기고 싶다면 더보기의 ‘할\u00a0일로 바꾸기’를 써요. 여러 개로 나누고 싶을 때만 AI로 할\u00a0일 나누기를\u00a0써요.",
            },
            {
              title: "AI에 보내기 전에 알려 드려요",
              body: "처음 AI를 쓸 때 보내는 내용과 받는 곳을 동의 시트로 먼저 보여 줘요. ‘나중에’를 누르면 아무것도 보내지\u00a0않아요.",
            },
          ],
          plans: {
            free: "메모 쓰기와 고정은 무료예요. AI 할\u00a0일 나누기는 말로 할\u00a0일 만들기와 합쳐 월 10회, 말로 메모는 월 3회(회당 3분까지) 쓸 수\u00a0있어요.",
            premium:
              "AI 할\u00a0일 나누기를 월 1,000회까지, 말로 메모를 월 100회(회당 30분까지) 넉넉하게\u00a0써요.",
          },
          faq: [
            {
              question: "메모는 친구에게 보이나요?",
              answer:
                "아니요. 메모는 나만 볼 수 있어요. 메모에서 할\u00a0일로 옮긴 뒤에도 공개 범위는 할\u00a0일마다 따로\u00a0정해요.",
            },
            {
              question: "말로 메모 녹음은 어디에 저장되나요?",
              answer:
                "녹음 파일은 기기에 저장되고 아이두 서버로 보내지 않아요. AI 정리에는 음성 인식으로 바꾼 글자만\u00a0써요.",
            },
            {
              question: "AI 결과가 마음에 안 들면요?",
              answer:
                "체크를 풀거나 연필로 고친 뒤 추가하면 돼요. AI가 잘 나누지 못하면 횟수는 차감되지\u00a0않아요.",
            },
          ],
          screens: [
            {
              alt: "디자인 리뷰 후속·생일 선물 후보·병원 질문 메모가 카드로 모인 아이두 메모\u00a0탭",
              caption: "생각나는 대로 적어 두는 메모 탭",
            },
            {
              alt: "11월 디자인 리뷰 후속 메모에 할\u00a0일 네 줄이 적힌 아이두 메모 상세\u00a0화면",
              caption: "메모 상세에서 핀과 더보기를 써요",
            },
            {
              alt: "메모를 AI가 할\u00a0일 4개로 나누고 날짜·시간을 채운 아이두 메모를 할\u00a0일로 나누기\u00a0화면",
              caption: "AI가 메모를 할\u00a0일 4개로 나눴어요",
            },
          ],
        },
        nudge: {
          kicker: "미루면 콕, 함께하면 쭉",
          title: "콕 찌르기로 친구 할\u00a0일 응원하기",
          summary:
            "아이두의 콕 찌르기는 친구의 할\u00a0일에 짧은 응원을 보내는 기능이에요. 친구를 고르고 콕 버튼을 누르면 한마디와 함께 알림이 가고, 친구는 ‘시작해볼게’ 같은 답장으로 마음을 돌려줘요. 혼자 미루던 일도 누가 지켜봐 주면 시작이\u00a0쉬워져요.",
          cardDescription:
            "친구 할\u00a0일에 콕! 짧은 응원을 보내고 답장을\u00a0받아요.",
          steps: [
            {
              title: "홈 위쪽에서 친구를 골라요",
              body: "할\u00a0일 탭 맨 위 친구 줄에서 친구를 누르면 그 친구의 공개 할\u00a0일이 보여요. 아래에 ‘친구에게 콕 응원을 보내볼까요?’ 배너가\u00a0떠요.",
            },
            {
              title: "발바닥을 눌러 콕 응원을 보내요",
              body: "배너의 발바닥을 누르면 ‘친구에게 콕 응원 보내기’ 시트가 열려요. 한마디는 적어도 되고 비워 둬도 돼요. ‘응원 보내기’를 누르면 친구에게 알림이\u00a0가요.",
            },
            {
              title: "친구가 답장을 골라요",
              body: "콕을 받은 친구는 응원 화면에서 ‘시작해볼게’, ‘응원 고마워’, ‘조금 뒤에 할게’ 중 하나로 답해요. 답장은 콕을 보낸 친구에게만\u00a0보여요.",
            },
          ],
          example: {
            introduction: "친구가 미뤄 둔 일이 보이면 살짝 콕 찔러\u00a0봐요.",
            items: [
              "지훈 → 나: “오늘도 네 속도로, 응원할게! 선물 고르면 나한테도\u00a0보여줘!”",
              "응원과 함께 ‘서연이 생일 선물 고르기’ 할\u00a0일이 연결돼서 바로 열어 볼 수\u00a0있어요.",
              "나는 ‘시작해볼게’로 답장하고 할\u00a0일을\u00a0시작해요.",
            ],
            note: "예시 계정으로 찍은 화면이에요. 응원 문구는 자유롭게 바꿀 수\u00a0있어요.",
          },
          details: [
            {
              title: "답장해도 할\u00a0일은 그대로예요",
              body: "답장으로 할\u00a0일이 완료되지는 않아요. 답장을 바꿔도 친구에게 알림이 또 가지 않아서 부담 없이 고를 수\u00a0있어요.",
            },
            {
              title: "보낸 콕은 알림함에서",
              body: "알림 > 친구 탭의 ‘보낸 콕’에서 누구에게 언제 보냈는지, 친구가 어떤 답장을 했는지\u00a0확인해요.",
            },
            {
              title: "콕이 부담스럽다면",
              body: "받은 응원 화면의 더보기(⋯)에서 ‘신고하기’나 ‘차단하기’를 눌러요. 차단한 사용자는 마이 탭 > 차단한 사용자에서\u00a0관리해요.",
            },
          ],
          plans: {
            free: "콕 찌르기를 하루 3회까지 보낼 수 있고, 친구는 5명까지\u00a0추가해요.",
            premium:
              "콕 찌르기를 횟수 제한 없이 보내요. 친구도 5명 제한 없이 추가할 수\u00a0있어요.",
          },
          faq: [
            {
              question: "친구가 아닌 사람에게도 콕을 보낼 수 있나요?",
              answer:
                "아니요. 콕은 서로 친구인 사람에게만 보낼 수 있어요. 이름이나 해시태그로 친구를 먼저\u00a0추가해요.",
            },
            {
              question: "한마디는 꼭 써야 하나요?",
              answer:
                "아니요. 비워 두고 보내도 돼요. 적으면 응원 화면 제목 아래에 함께\u00a0보여요.",
            },
            {
              question: "밤에 콕 알림이 오면 어떡하죠?",
              answer:
                "마이 탭 > 알림 설정 > 푸시 알림에서 ‘야간 푸시 알림’을 끄면 밤 9시부터 아침 8시까지 친구 알림을 받지\u00a0않아요.",
            },
          ],
          screens: [
            {
              alt: "친구 지훈을 고른 홈 화면에 친구에게 콕 응원을 보내볼까요 배너가 보이는 아이두\u00a0화면",
              caption: "친구를 고르면 콕 배너가 떠요",
            },
            {
              alt: "지훈에게 보낼 한마디를 적는 친구에게 콕 응원 보내기\u00a0시트",
              caption: "한마디를 적어 응원을 보내요",
            },
            {
              alt: "지훈님이 보낸 응원과 연결된 할\u00a0일, 시작해볼게·응원 고마워·조금 뒤에 할게 답장이 보이는 아이두\u00a0화면",
              caption: "받은 응원에 답장을 골라요",
            },
          ],
        },
        reminders: {
          kicker: "깜빡해도 괜찮아요",
          title: "리마인드 알림으로 할\u00a0일 놓치지 않기",
          summary:
            "아이두는 아침에 오늘 할\u00a0일을, 저녁에 아직 남은 할\u00a0일을 알려 주는 리마인드 알림을 보내요. 친구의 콕·응원·댓글, AI 제안 소식은 알림함에 탭별로 모이고, 날씨 알림으로 내일 비 소식도 미리\u00a0챙겨요.",
          cardDescription:
            "아침·저녁 리마인드와 알림함으로 할\u00a0일과 친구 소식을\u00a0챙겨요.",
          steps: [
            {
              title: "처음 한 번 알림을 허용해요",
              body: "가입 직후 알림 안내 화면에서 시스템 알림 권한을 허용해요. 나중에 마이 탭 > 알림 설정 > 푸시 알림에서 켜도\u00a0돼요.",
            },
            {
              title: "아침·저녁 리마인드를 받아요",
              body: "오전 리마인드는 오늘 할\u00a0일을, 오후 리마인드는 아직 남은 할\u00a0일을 알려 줘요. 기본 시간은 오전 8시와 오후\u00a07시예요.",
            },
            {
              title: "알림함에서 모아 봐요",
              body: "홈 오른쪽 위 종을 누르면 알림함이 열려요. 전체·공지·할\u00a0일·친구 탭으로 나눠 보고, ‘모두 읽음’으로 한 번에\u00a0정리해요.",
            },
          ],
          example: {
            introduction: "이런 하루를 보내는 분께 잘 맞아요.",
            items: [
              "오전 8:00 · 오늘 할\u00a0일 3개가 있어요(오전\u00a0리마인드)",
              "오후 2:00 · 지훈의 응원과 한마디가 도착했어요(친구\u00a0탭)",
              "오후 7:00 · 아직 남은 할\u00a0일을 알려 줘요(오후\u00a0리마인드)",
            ],
            note: "알림 문구와 시간은 예시예요. 기기 설정에 따라 알림이 늦게 오거나 묶여 보일 수\u00a0있어요.",
          },
          details: [
            {
              title: "날씨 알림도 받아요",
              body: "알림 설정 > 날씨 알림을 켜면 아침엔 오늘 날씨를, 저녁엔 내일 날씨를 알려 줘요. 아침·저녁 알림 시간은 각각 눌러서\u00a0정해요.",
            },
            {
              title: "24시간제로 보기",
              body: "알림 설정의 ‘시간 표시’에서 24시간제를 켜면 앱 전체 시간이 14:00처럼\u00a0보여요.",
            },
            {
              title: "알림이 오지 않는다면",
              body: "기기 설정 > 알림 > 아이두에서 알림이 허용됐는지, 집중 모드가 켜져 있지 않은지 확인해\u00a0주세요.",
            },
          ],
          plans: {
            free: "오전 8시·오후 7시 리마인드, 알림함, 날씨 알림을 무료로\u00a0받아요.",
            premium:
              "리마인드 시간을 원하는 때로 바꿀 수 있어요. 예를 들어 오전 6시 30분과 밤 10시처럼 내 생활에\u00a0맞춰요.",
          },
          faq: [
            {
              question: "밤에는 알림을 줄이고 싶어요.",
              answer:
                "푸시 알림 설정에서 ‘야간 푸시 알림’을 끄면 밤 9시부터 아침 8시까지 혜택·친구 알림을 받지 않아요. 직접 정한 리마인드는 꺼도 제시간에\u00a0와요.",
            },
            {
              question: "로그인한 기기 모두에서 알림을 받나요?",
              answer:
                "네. 푸시 알림을 켜면 할\u00a0일·결제 알림을 이 계정으로 로그인한 모든 기기에서\u00a0받아요.",
            },
            {
              question: "광고 알림도 오나요?",
              answer:
                "광고성 알림은 ‘마케팅 수신 동의’를 따로 켠 경우에만 받아요. 언제든 푸시 알림 설정에서 끌 수\u00a0있어요.",
            },
          ],
          screens: [
            {
              alt: "읽지 않은 알림 7건과 AI 제안·콕 찌르기·달성·응원 알림이 모인 아이두\u00a0알림함",
              caption: "알림함에 소식이 탭별로 모여요",
            },
            {
              alt: "오전 리마인드 오전 8:00, 오후 리마인드 오후 7:00이 보이는 아이두 리마인드 알림\u00a0설정",
              caption: "아침·저녁 리마인드 시간",
            },
            {
              alt: "아침 날씨 알림 오전 7:00과 저녁 날씨 알림 오후 5:30이 켜진 아이두 날씨 알림\u00a0설정",
              caption: "아침엔 오늘, 저녁엔 내일 날씨",
            },
          ],
        },
        "ai-report": {
          kicker: "한 주를 돌아보는 시간",
          title: "AI 리포트로 내 할\u00a0일 패턴\u00a0돌아보기",
          summary:
            "아이두 AI 리포트는 한 주·한 달 동안의 할\u00a0일 기록을 분석해 달성률, 카테고리별 완료, 요일별 패턴, 활발한 시간대를 보여 주고 한 줄 요약을 써 줘요. 자주 반복한 일은 AI가 반복 할\u00a0일로 만들자고\u00a0제안해요.",
          cardDescription:
            "주간·월간 리포트로 달성률과 패턴을 보고, AI 반복 제안을\u00a0받아요.",
          steps: [
            {
              title: "마이 탭에서 AI 리포트를 열어요",
              body: "마이 탭 > 기록 > AI 리포트를 누르면 다음 주간·월간 리포트까지 남은 날이 D-4처럼\u00a0보여요.",
            },
            {
              title: "주간·월간을 골라 읽어요",
              body: "주간 리포트는 매주, 월간 리포트는 매달 도착해요. 달성률·완료한 할\u00a0일·연속 달성 일수를 먼저 보고 ‘자세히 보기’로\u00a0들어가요.",
            },
            {
              title: "패턴을 보고 다음 계획을 세워요",
              body: "카테고리별 분석, 요일별 달성률, 활발한 시간대를 보고 잘 되는 요일·시간에 중요한 일을 놓아\u00a0봐요.",
            },
            {
              title: "AI 반복 제안을 수락해요",
              body: "같은 일을 여러 번 끝냈다면 AI가 ‘토·일 오후 8:30 두부 발톱 깎아주기’처럼 반복 할\u00a0일을 제안해요. 수락하면 반복 할\u00a0일이 만들어지고, 원하지 않으면\u00a0거절해요.",
            },
          ],
          example: {
            introduction: "리포트에는 이런 내용이 담겨요.",
            items: [
              "11월 1주차: 달성률 93%, 할\u00a0일 29개 중 27개 완료, 6일 연속\u00a0달성",
              "카테고리별: 업무 7/8, 생활 7/7, 운동 6/6, 자기계발\u00a04/5",
              "요약: ‘지난주보다 8%p 올랐어요. 생활·운동·두부 카테고리는 모두\u00a0끝냈어요.’",
            ],
            note: "예시 계정의 실제 AI 리포트예요. 리포트 내용은 내 할\u00a0일 기록에 따라\u00a0달라져요.",
          },
          details: [
            {
              title: "주간 달성 배지도 받아요",
              body: "한 주를 마치면 그 주 완료율이 담긴 주간 달성 배지가 쌓여요. 마이 탭 > 달성 배지에서 모아 보고 공유할 수\u00a0있어요.",
            },
            {
              title: "제안에는 근거가 함께 와요",
              body: "AI 반복 제안에는 ‘토요일과 일요일에 2번 모두 완료했어요’처럼 왜 제안했는지와 신뢰도, 만료일이 함께\u00a0보여요.",
            },
            {
              title: "알림으로 도착을 알려요",
              body: "새 AI 제안이 도착하면 알림함의 AI 알림으로 알려\u00a0줘요.",
            },
          ],
          plans: {
            free: "무료에서는 예시 리포트로 어떤 내용을 받는지 미리 볼 수\u00a0있어요.",
            premium:
              "매주·매달 나만의 AI 리포트를 받고, AI 반복 할\u00a0일 제안을 받아 수락할 수\u00a0있어요.",
          },
          faq: [
            {
              question: "리포트는 언제 오나요?",
              answer:
                "주간 리포트는 한 주가 끝난 뒤, 월간 리포트는 한 달이 끝난 뒤 도착해요. AI 리포트 화면에서 다음 리포트까지 남은 날을 볼 수\u00a0있어요.",
            },
            {
              question: "할\u00a0일 내용이 AI 업체에\u00a0보내지나요?",
              answer:
                "AI 기능에 쓰는 할\u00a0일 기록은 처음 AI를 쓸 때 동의 시트로 먼저 알려 드려요. 이름·이메일·친구 정보는 보내지 않고, AI 동의는 마이 탭 > 약관 및 정책에서 끌 수\u00a0있어요.",
            },
            {
              question: "제안을 거절하면 다시 오나요?",
              answer:
                "제안마다 만료일이 있어요. 기록이 더 쌓이면 새 제안이 도착할 수\u00a0있어요.",
            },
          ],
          screens: [
            {
              alt: "다음 주간 리포트 D-4, 월간 리포트 D-19와 지난주 달성률 93%가 보이는 아이두 AI 리포트\u00a0화면",
              caption: "다음 리포트까지 남은 날과 지난 리포트",
            },
            {
              alt: "11월 1주차 달성률 93%, 카테고리별 분석과 요일별 패턴이 보이는 아이두 주간\u00a0리포트",
              caption: "주간 리포트: 카테고리·요일별 패턴",
            },
            {
              alt: "2026년 10월 달성률 87%, 완료 79개, 카테고리별 분석이 보이는 아이두 월간\u00a0리포트",
              caption: "월간 리포트로 한 달을 돌아봐요",
            },
            {
              alt: "5개의 반복 할\u00a0일 제안과 요일·시간·근거·신뢰도, 거절·수락 버튼이 보이는 아이두 AI 제안\u00a0화면",
              caption: "AI가 반복 할\u00a0일을 제안해요",
            },
          ],
        },
        customize: {
          kicker: "오늘은 어떤 고양이로 할까요?",
          title: "고양이 앱 아이콘·테마·글꼴로 나답게 꾸미기",
          summary:
            "아이두는 귀여운 고양이 9마리 중에서 프로필과 홈 화면 앱 아이콘을 고르고, 라이트·다크 테마와 다섯 단계 글꼴 크기, 한국어·English 언어를 내 눈과 취향에 맞춰 바꿀 수 있어요. 한 주를 마치면 주간 달성 배지도\u00a0모여요.",
          cardDescription:
            "고양이 앱 아이콘, 다크 모드, 글꼴 크기로 나에게 꼭 맞게\u00a0꾸며요.",
          steps: [
            {
              title: "마이 탭 > 앱 아이콘",
              body: "기본·스코티시폴드·치즈 태비·검은 고양이·하얀 고양이·샴·러시안 블루·크림 고양이·턱시도 중에서 골라요. 고르면 홈 화면 아이콘이 바로\u00a0바뀌어요.",
            },
            {
              title: "마이 탭 > 화면 테마",
              body: "시스템 설정·라이트 모드·다크 모드 중에서 골라요. 시스템 설정을 고르면 기기 설정에 맞춰 낮엔 밝게, 밤엔 어둡게\u00a0바뀌어요.",
            },
            {
              title: "마이 탭 > 글꼴 크기",
              body: "아주 작게부터 아주 크게까지 다섯 단계 중에서 골라요. 미리 보기에서 확인하고, 고른 크기는 앱 전체에 바로\u00a0적용돼요.",
            },
          ],
          example: {
            introduction: "이렇게 바꿔 보는 분들이 많아요.",
            items: [
              "밤에 할\u00a0일을 정리한다면: 다크 모드로 눈부심\u00a0줄이기",
              "글자가 작게 느껴진다면: 글꼴 크기 ‘크게’ 또는 ‘아주\u00a0크게’",
              "내 고양이와 닮은 아이콘으로: 치즈 태비, 턱시도, 러시안\u00a0블루…",
            ],
            note: "앱 아이콘 바꾸기는 프리미엄 기능이에요. 테마·글꼴 크기·언어는 누구나 바꿀 수\u00a0있어요.",
          },
          details: [
            {
              title: "언어도 골라요",
              body: "마이 탭 > 언어에서 시스템 설정·한국어·English 중에서 골라요. 앱 안의 날짜와 안내 문구가 함께\u00a0바뀌어요.",
            },
            {
              title: "주간 달성 배지",
              body: "한 주를 마치면 완료율과 완료한 할\u00a0일 수가 적힌 배지를 받아요. 마이 탭 > 달성 배지에서 지난 기록을 보고 친구에게\u00a0공유해요.",
            },
            {
              title: "카테고리 색과 순서",
              body: "마이 탭 > 카테고리 관리에서 카테고리 이름을 고치고 ‘순서 바꾸기’로 홈에 보이는 순서를\u00a0정해요.",
            },
          ],
          plans: {
            free: "화면 테마, 글꼴 크기, 언어, 카테고리 3개를 무료로\u00a0써요.",
            premium:
              "홈 화면 앱 아이콘을 고양이 9종으로 바꾸고, 카테고리를 30개까지 만들 수\u00a0있어요.",
          },
          faq: [
            {
              question: "Android에서도 앱 아이콘을 바꿀 수\u00a0있나요?",
              answer:
                "네. iPhone과 Android 모두 마이 탭 > 앱 아이콘에서 바꿀 수 있어요. 기기에 따라 홈 화면에 반영되기까지 잠시 걸릴 수\u00a0있어요.",
            },
            {
              question: "다크 모드는 무료인가요?",
              answer:
                "네. 화면 테마, 글꼴 크기, 언어는 누구나 바꿀 수 있어요. 앱 아이콘 바꾸기만\u00a0프리미엄이에요.",
            },
          ],
          screens: [
            {
              alt: "기본·스코티시폴드·치즈 태비 등 고양이 9종 중에서 홈 화면 아이콘을 고르는 아이두 앱 아이콘\u00a0화면",
              caption: "고양이 9종 중에서 앱 아이콘을 골라요",
            },
            {
              alt: "다크 모드로 본 아이두 홈 화면, 어두운 배경에 주간 달력과 카테고리별\u00a0할\u00a0일",
              caption: "밤에도 편안한 다크 모드",
            },
            {
              alt: "미리 보기와 아주 작게부터 아주 크게까지 다섯 단계를 고르는 아이두 글꼴 크기\u00a0화면",
              caption: "글꼴 크기를 다섯 단계로 골라요",
            },
            {
              alt: "11월 1주차 완료율 93%가 적힌 주간 달성 배지와 지난 배지 기록이 보이는 아이두\u00a0화면",
              caption: "한 주를 마치면 달성 배지가 쌓여요",
            },
          ],
        },
        premium: {
          kicker: "더 쓰고 싶어지면",
          title: "아이두 무료와 프리미엄 비교",
          summary:
            "아이두는 할\u00a0일·달력·반복·메모·친구·콕·댓글·위젯을 무료로 쓸 수 있는 할\u00a0일 앱이에요. 프리미엄은 AI 할\u00a0일 만들기와 말로 메모를 넉넉하게, AI 주간·월간 리포트와 반복 제안, 친구·콕 무제한, 리마인드 시간 설정, 카테고리 30개, 고양이 앱 아이콘을\u00a0더해요.",
          cardDescription:
            "무료로 충분히 쓰고, 필요할 때 프리미엄으로 넉넉하게. 한눈에\u00a0비교해요.",
          steps: [
            {
              title: "무료로 시작해요",
              body: "가입하면 바로 할\u00a0일·달력·메모·친구 기능을 써요. 마이 탭의 ‘이번 달 AI 사용량’ 카드에서 남은 AI 횟수를\u00a0확인해요.",
            },
            {
              title: "한도에 닿으면 안내가 떠요",
              body: "친구 5명, 카테고리 3개처럼 무료 한도에 닿으면 무엇이 달라지는지 시트로 알려 줘요. 친구 초대로 한도를 늘릴 수도\u00a0있어요.",
            },
            {
              title: "마이 탭 > 구독 관리에서 시작해요",
              body: "연간·월간 중에서 골라 시작하고, 스토어 구독 설정에서 언제든 해지할 수\u00a0있어요.",
            },
          ],
          example: {
            introduction: "이럴 때 프리미엄을 고민해 보세요.",
            items: [
              "말로 할\u00a0일 만들기를 매일 쓰다 보니 월 10회가 금방\u00a0끝나요.",
              "친구·가족·동료까지 5명보다 많은 사람과\u00a0함께해요.",
              "한 주·한 달 기록을 AI 리포트로 돌아보고\u00a0싶어요.",
            ],
            note: "구독 가격은 나라와 스토어에 따라 달라서 앱의 구독 관리 화면에서 확인해\u00a0주세요.",
          },
          details: [
            {
              title: "친구 초대로 프리미엄을 받아요",
              body: "초대한 친구가 2일 동안 할\u00a0일을 끝내면 발자국이 찍히고, 발자국마다 프리미엄 7일과 친구 추가 1명을 받아요. 초대받은 친구도 가입하면 바로 프리미엄 7일을\u00a0받아요.",
            },
            {
              title: "구독이 끝나면",
              body: "해지해도 남은 기간까지는 프리미엄을 쓰고, 그 뒤에는 무료 기준으로 돌아가요. 프리미엄 혜택은 마이 탭 > 구독 관리에서\u00a0확인해요.",
            },
          ],
          plans: {
            free: "할\u00a0일·달력·반복·체크리스트·메모·친구 5명·콕 하루 3회·댓글·위젯·날씨·알림을 무료로 써요. AI 할\u00a0일 만들기는 월 10회, 말로 메모는 월\u00a03회예요.",
            premium:
              "AI 할\u00a0일 만들기 월 1,000회, 말로 메모 월 100회, AI 리포트·반복 제안, 친구·콕 무제한, 리마인드 시간 설정, 카테고리 30개, 고양이 앱 아이콘을\u00a0더해요.",
          },
          comparison: {
            title: "한눈에 비교해요",
            caption: "아이두 무료와 프리미엄 기능 비교",
            featureLabel: "기능",
            rows: [
              {
                feature: "AI 할\u00a0일 만들기(말·글·메모)",
                free: "월 10회",
                premium: "월 1,000회",
              },
              {
                feature: "말로 메모 AI 정리",
                free: "월 3회 · 회당 3분",
                premium: "월 100회 · 회당 30분",
              },
              {
                feature: "AI 주간·월간 리포트",
                free: "예시만",
                premium: "매주·매달",
              },
              {
                feature: "AI 반복 할\u00a0일 제안",
                free: "없음",
                premium: "제공",
              },
              { feature: "친구", free: "5명", premium: "무제한" },
              { feature: "콕 찌르기", free: "하루 3회", premium: "무제한" },
              {
                feature: "리마인드 시간",
                free: "오전 8시·오후 7시",
                premium: "원하는 시간",
              },
              { feature: "카테고리", free: "3개", premium: "30개" },
              { feature: "앱 아이콘", free: "기본", premium: "고양이 9종" },
              {
                feature: "할\u00a0일·달력·반복·메모·댓글·위젯",
                free: "제공",
                premium: "제공",
              },
            ],
          },
          faq: [
            {
              question: "무료로만 써도 충분한가요?",
              answer:
                "할\u00a0일 관리, 달력, 반복, 메모, 친구와 공유·콕·댓글, 위젯까지 무료로 쓸 수 있어요. AI를 자주 쓰거나 친구가 많다면 프리미엄이\u00a0편해요.",
            },
            {
              question: "해지는 어떻게 하나요?",
              answer:
                "App Store 또는 Google Play의 구독 설정에서 해지해요. 해지해도 남은 기간까지는 프리미엄을 쓸 수\u00a0있어요.",
            },
            {
              question: "가족이나 친구와 구독을 나눌 수 있나요?",
              answer:
                "구독은 계정마다 따로예요. 대신 친구 초대 발자국으로 서로 프리미엄 기간을 받을 수\u00a0있어요.",
            },
          ],
          screens: [
            {
              alt: "이번 달 AI 할\u00a0일 만들기 5/10회 사용, 말로 메모 정리 0/3회 사용이 보이는 아이두 마이 탭 사용량\u00a0카드",
              caption: "이번 달 AI 사용량을 확인해요",
            },
            {
              alt: "친구를 더 추가할 수 없어요, 무료는 5명까지라는 안내와 친구 초대 버튼이 보이는 아이두\u00a0시트",
              caption: "무료 한도에 닿으면 알려 줘요",
            },
            {
              alt: "연간 구독 이용 중 표시와 친구 초대 발자국, 친구 관리가 보이는 프리미엄 계정의 아이두 마이\u00a0탭",
              caption: "프리미엄 계정의 마이 탭",
            },
          ],
        },
        "ai-todo": {
          kicker: "말 한마디면 정리 끝",
          title: "말과 메모를 AI로 할\u00a0일로 정리하기",
          summary:
            "아이두는 길게 말하거나 적어 둔 메모를 AI가 할\u00a0일 여러 개로 나누고 날짜·시간·반복까지 채워 주는 투두 리스트 앱이에요. 나눈 할\u00a0일은 추가하기 전에 하나씩 확인하고 고칠 수 있어서, 원하는 것만 내 계획에\u00a0담겨요.",
          steps: [
            {
              title: "할\u00a0일 추가 시트의 마이크를 눌러요",
              body: "할\u00a0일 탭에서 할\u00a0일 추가 시트를 열고 마이크를 눌러요. 처음 한 번은 AI 동의 시트에서 보내는 내용과 받는 곳을 확인하고 ‘동의하고 계속’을 누른 뒤 마이크 권한을\u00a0허용해요.",
            },
            {
              title: "하고 싶은 일을 이어서 말해요",
              body: "‘내일 아침 7시 헬스장, 금요일 저녁 8시 케이크 픽업’처럼 한 번에 말해도 돼요. 들은 말은 바로 글자로 보이고, ‘다 말했어요’를 누르거나 말이 멈추면 AI가 할\u00a0일로\u00a0나눠요.",
            },
            {
              title: "추가할 것만 고르고 고쳐요",
              body: "체크한 할\u00a0일만 추가돼요. 할\u00a0일을 누르면 제목·날짜·시간·반복을 고칠 수 있고, 이미 있는 할\u00a0일은 ‘이미 있어요’로 알려 주고 처음엔 체크하지\u00a0않아요.",
            },
            {
              title: "‘할\u00a0일 N개 추가’를 눌러요",
              body: "버튼을 누르기 전에는 아무것도 저장되지 않아요. 추가한 할\u00a0일은 바로 목록에 들어가고, 다시 하고 싶으면 ‘다시 말하기’를\u00a0눌러요.",
            },
          ],
          example: {
            introduction: "바쁜 하루를 한 번에 말해\u00a0보세요.",
            items: [
              "말한 내용: 내일 아침 7시에 헬스장 가고 금요일 저녁 8시에 엄마 생신 케이크 픽업, 그리고 매주 월수금에는 영어 단어 30개\u00a0외우기.",
              "AI가 나눈 할\u00a0일: 헬스장 가기(내일 오전 7:00), 엄마 생신 케이크 픽업(금요일 오후 8:00), 영어 단어 30개 외우기(매주\u00a0월·수·금).",
              "필요 없는 할\u00a0일은 체크를 풀고, 나머지만\u00a0추가해요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. AI 결과는 말한 내용에 따라 달라지므로 추가하기 전에 확인해\u00a0주세요.",
          },
          details: [
            {
              title: "적어 둔 메모도 AI로 나눠요",
              body: "메모 탭에서 메모를 열고 더보기(⋯) > ‘AI로 할\u00a0일 나누기’를 눌러요. 말로 할\u00a0일 만들기와 같은 화면에서 추가할 것만 골라요. 메모를 할\u00a0일 하나로 옮기려면 ‘할\u00a0일로 바꾸기’를\u00a0써요.",
            },
            {
              title: "남은 횟수는 AI 칩에서 봐요",
              body: "할\u00a0일 추가 시트의 ‘AI로 할\u00a0일 만들기’ 옆 칩에 이번 달 남은 횟수가 보여요. ⓘ를 누르면 알아듣는 말의 예와 다시 채워지는 날을 볼 수 있어요. 잘 안 되면 횟수는 차감되지 않고, 직접 입력은 계속\u00a0무료예요.",
            },
            {
              title: "AI에 보내는 내용을 먼저 알려 드려요",
              body: "AI가 처음 무언가를 보내기 전에 동의 시트로 보내는 내용(입력하거나 말한 글, 할\u00a0일 기록, 날짜·시간대), 받는 곳(글자는 Anthropic·Google·OpenAI, 음성은 Apple·Google 음성 인식), 쓰는 곳(AI 기능에만, 광고에는 쓰지 않음)을 알려요. 이름·이메일·친구 정보·녹음 파일은 보내지 않아요. ‘나중에’를 누르면 아무것도 보내지 않고 직접 입력할 수\u00a0있어요.",
            },
            {
              title: "긴 회의는 말로 메모하기로",
              body: "회의나 수업처럼 긴 이야기는 메모 탭의 ‘말로 메모’로 녹음해요. AI가 요약과 핵심 포인트, 할\u00a0일을 찾아 주고, 녹음 파일은 기기에 저장되며 아이두 서버로 보내지\u00a0않아요.",
            },
          ],
          plans: {
            free: "메모 작성과 기본 할\u00a0일 관리를 무료로 시작할 수 있어요. AI 할\u00a0일 만들기는 글·말·메모를 합쳐 월 10회, 말로 메모하기는 월 3회(회당 3분까지) 쓸 수 있고, 잘 안 되면 횟수는 차감되지\u00a0않아요.",
            premium:
              "AI 할\u00a0일 만들기를 월 1,000회까지 넉넉하게, 말로 메모하기를 월 100회(회당 30분까지) 쓸 수 있어요. AI 주간·월간 리포트와 반복 할\u00a0일 제안도 프리미엄에서\u00a0제공해요.",
          },
          faq: [
            {
              question: "AI가 나눈 할\u00a0일을 고칠 수 있나요?",
              answer:
                "네. 추가하기 전에 할\u00a0일을 눌러 제목·날짜·시간·반복을 고치고, 필요 없는 건 체크를 풀어요. 추가한 뒤에도 할\u00a0일 상세에서 다시 고칠 수\u00a0있어요.",
            },
            {
              question: "녹음 파일도 AI 업체로 보내나요?",
              answer:
                "아니요. 말한 내용은 음성 인식이 글자로 바꾸고, AI 업체에는 그 글자만 보내요. 말로 메모하기의 녹음 파일은 기기에 저장되고 아이두 서버로 보내지\u00a0않아요.",
            },
            {
              question: "횟수는 언제 차감되나요?",
              answer:
                "AI가 할\u00a0일로 정리할 때 1회 차감돼요. 잘 안 되면 차감되지 않고, 할\u00a0일을 추가하는 것은 횟수를 쓰지 않아요. 무료는 글·말·메모를 합쳐 월 10회이고 매월 1일에 다시\u00a0채워져요.",
            },
            {
              question: "AI 동의를 철회할 수 있나요?",
              answer:
                "네. 마이 탭 > 약관 및 정책 > AI 기능 데이터 제공에서 언제든 끌 수\u00a0있어요.",
            },
          ],
          screens: [
            {
              alt: "말한 내용을 AI가 할\u00a0일 3개로 나누고 날짜·시간·반복을 채운 아이두 할\u00a0일 고르기\u00a0화면",
              caption: "AI가 나눈 할\u00a0일에서 추가할 것만 골라요.",
            },
            {
              alt: "이사 준비 메모를 AI가 할\u00a0일 4개로 나눈 아이두\u00a0화면",
              caption: "적어 둔 메모도 AI가 할\u00a0일로 나눠요.",
            },
            {
              alt: "할\u00a0일 추가 시트의 AI 칩과 설명에 이번 달 남은 횟수와 초기화 날이 보이는 아이두\u00a0화면",
              caption: "AI 칩에서 남은 횟수를 확인해요.",
            },
            {
              alt: "AI로 정리하기 전에 보내는 내용·받는 곳·쓰는 곳을 알려 주는 아이두 동의\u00a0시트",
              caption: "처음 한 번, 보내는 내용을 확인하고 동의해요.",
            },
          ],
          cardDescription:
            "말하거나 적어 둔 메모를 AI가 할\u00a0일 여러 개로 나눠요. 추가할 것만 골라 내 계획에\u00a0더해요.",
        },
        "recurring-todo": {
          kicker: "매일 조금씩, 꾸준히",
          title: "반복 일정과 위젯으로 하루 관리하기",
          summary:
            "매일 공부하기나 주중 운동처럼 다시 챙겨야 하는 일은 아이두의 반복 할\u00a0일로 등록해요. 주간·월간 캘린더에서 계획을 살펴보고, iPhone과 Android 홈 화면 위젯에서 오늘의 할\u00a0일과 완료 상태를 확인할 수\u00a0있어요.",
          steps: [
            {
              title: "반복할 할\u00a0일을 만들어요",
              body: "할\u00a0일 추가에서 ‘20분 책 읽기’처럼 실행할\u00a0일을 적어요. 시작할 날짜를 정하고, 시간이 필요한 일이라면 시간도\u00a0설정해요.",
            },
            {
              title: "반복할 요일과 기간을 골라요",
              body: "반복을 눌러 매일, 주중, 주말 중 하나를 고르거나 원하는 요일을 선택해요. 반복 기간을 정하거나, 끝을 정하지 않으려면 ‘계속 반복’을\u00a0골라요.",
            },
            {
              title: "캘린더에서 계획을 확인해요",
              body: "주간·월간 캘린더에서 날짜별 할\u00a0일을 살펴봐요. 끝낸 일은 완료로 표시하고, 일정이 달라지면 해당 할\u00a0일의 날짜나 시간을 확인해\u00a0바꿔요.",
            },
            {
              title: "홈 화면에 아이두 위젯을 더해요",
              body: "앱에 로그인한 뒤 기기의 홈 화면 위젯 목록에서 아이두를 찾아 추가해요. 작은 크기는 진행 상황을, 더 큰 크기는 오늘의 할\u00a0일 목록을 확인하기\u00a0좋아요.",
            },
          ],
          example: {
            introduction:
              "퇴근 후 독서를 습관으로 만들고 싶다면, 부담 없는 분량부터 정해\u00a0보세요.",
            items: [
              "할\u00a0일: 저녁에 20분 책 읽기.",
              "반복: 주중. 시작일과 종료일을 정해 이번 달 계획을\u00a0만들어요.",
              "캘린더에서 오늘 할\u00a0일을 확인하고, 홈 화면 위젯으로 남은 일과 완료 상태를\u00a0살펴봐요.",
            ],
            note: "위젯은 확인을 돕는 기능이에요. 표시 갱신 시점은 기기의 운영체제에 따라 달라질 수\u00a0있어요.",
          },
          details: [
            {
              title: "반복 할\u00a0일을 고치거나 지울 때",
              body: "이 할\u00a0일만, 이 할\u00a0일과 이후 할\u00a0일, 이 반복 전체 중에서 골라요. ‘이 반복 전체’를 지우면 지난 할\u00a0일과 완료 기록도 함께 지워져요. ‘매주 월수금 운동’처럼 말로 할\u00a0일 만들기로 말해도 반복 할\u00a0일이\u00a0돼요.",
            },
            {
              title: "iPhone에서 위젯 추가하기",
              body: "홈 화면의 빈 공간을 길게 누르고 편집 메뉴에서 위젯 추가를 선택해요. 아이두를 검색한 뒤 원하는 크기를 골라 추가해요. 기기의 iOS 버전에 따라 메뉴 위치가 조금 다를 수\u00a0있어요.",
            },
            {
              title: "Android에서 위젯 추가하기",
              body: "홈 화면의 빈 공간을 길게 누르고 위젯을 열어요. 아이두를 찾아 원하는 위젯을 홈 화면에 놓아요. 기기와 홈 화면 앱에 따라 추가 방법이나 크기 조절 방식이 달라질 수\u00a0있어요.",
            },
            {
              title: "위젯이 이전 내용을 보여준다면",
              body: "위젯은 자정이 지나면 앱을 열지 않아도 새 날짜로 바뀌어요. 갱신 시점은 기기 운영체제에 따라 조금 늦을 수 있어요. 지난 내용이 계속 보이면 아이두 앱을 열어 로그인 상태와 오늘의 할\u00a0일을 확인해\u00a0주세요.",
            },
          ],
          plans: {
            free: "반복 할\u00a0일을 직접 설정하고 주간·월간 캘린더에서 확인해요. iOS와 Android 홈 화면 위젯도 이용할 수\u00a0있어요.",
            premium:
              "AI 주간·월간 리포트로 달성 기록을 돌아보고, AI가 제안한 반복 할\u00a0일 중 나에게 맞는 제안을 수락할 수\u00a0있어요.",
          },
          faq: [
            {
              question: "월요일과 수요일에만 반복할 수 있나요?",
              answer:
                "네. 반복 설정에서 월요일과 수요일을 선택하고 시작일과 종료일을 정해요. 매일, 주중, 주말을 한 번에 선택하는 방법도\u00a0있어요.",
            },
            {
              question: "반복 설정을 하려면 프리미엄이 필요한가요?",
              answer:
                "직접 반복 할\u00a0일을 설정하는 기능은 무료로 사용할 수 있어요. AI가 반복 할\u00a0일을 제안하는 기능은 프리미엄에서\u00a0제공해요.",
            },
            {
              question: "위젯은 iPhone과 Android 모두 지원하나요?",
              answer:
                "네. 두 플랫폼의 홈 화면에서 사용할 수 있어요. 기기에서 아이두 앱에 로그인한 뒤 위젯을 추가해주세요.",
            },
          ],
          screens: [
            {
              alt: "날짜·시간·반복을 고르는 아이두 할\u00a0일 추가 화면",
              caption: "할\u00a0일을 추가하면서 날짜, 시간, 반복을 정해요.",
            },
            {
              alt: "오늘 할\u00a0일과 달성률이 보이는 아이두 홈 화면 위젯",
              caption: "홈 화면 위젯으로 오늘 할\u00a0일과 달성률을 확인해요.",
            },
          ],
          cardDescription:
            "반복할 요일을 정하고 캘린더에서 계획을 살펴봐요. 홈 화면 위젯에서도 오늘 할\u00a0일을\u00a0확인해요.",
        },
        "shared-todo": {
          kicker: "같이 하면 끝까지 해요",
          title: "친구와 할\u00a0일을 나누고 응원하기",
          summary:
            "아이두에서는 친구가 공개한 할\u00a0일을 보고, 콕 찌르기와 댓글과 답글로 응원할 수 있어요. 각자의 투두 리스트를 관리하면서 필요한 일만 공유해요. 개인적인 할\u00a0일은 비공개로 설정하고, 혼자서 사용하는 것도\u00a0괜찮아요.",
          steps: [
            {
              title: "이름이나 해시태그로 친구를 찾아요",
              body: "친구 관리에서 검색 아이콘을 눌러 이름 또는 고유한 8자리 해시태그로 검색해요. 이름이 같은 사람이 있다면 해시태그로 친구가 맞는지\u00a0확인해요.",
            },
            {
              title: "친구 요청을 보내고 연결해요",
              body: "검색 결과의 추가를 눌러 요청을 보내요. 상대방은 받은 요청에서 수락할 수 있어요. 요청 상태는 친구 관리의 보낸 요청과 받은 요청에서\u00a0확인해요.",
            },
            {
              title: "공유할 할\u00a0일의 공개 범위를 정해요",
              body: "할\u00a0일을 만들거나 수정할 때 공개·비공개를 선택해요. 친구는 공개한 할\u00a0일만 볼 수 있어요. 개인적인 메모를 할\u00a0일로 옮겼다면 생성한 할\u00a0일의 공개 설정도 확인해\u00a0주세요.",
            },
            {
              title: "친구의 하루에 작은 응원을 보내요",
              body: "친구 캘린더에서 공개된 할\u00a0일을 살펴봐요. 콕 찌르기로 알림을 보내거나, 할\u00a0일 상세에서 댓글과 답글로 이야기를\u00a0나눠요.",
            },
          ],
          example: {
            introduction:
              "친구와 각자 운동 목표를 지키고 싶다면, 공유할\u00a0일만 공개해\u00a0보세요.",
            items: [
              "내 할\u00a0일: 퇴근 후 30분 걷기. 공개로 설정해 친구가 볼 수 있게\u00a0해요.",
              "친구의 공개된 운동 계획을 보고, 콕 찌르기나 ‘오늘도 같이 힘내자!’라는 댓글을\u00a0남겨요.",
              "개인적인 일정은 비공개로 설정하고, 완료한 운동 기록은 친구 캘린더에서 함께\u00a0살펴봐요.",
            ],
            note: "댓글과 콕 찌르기는 실제 친구에게 전달돼요. 서로 편한 방식으로 응원해\u00a0보세요.",
          },
          details: [
            {
              title: "할\u00a0일마다 공개 범위를 선택해요",
              body: "모든 할\u00a0일을 공유할 필요는 없어요. 친구에게 보여주고 싶은 일은 공개로, 혼자 챙길 일은 비공개로 정해요. 친구 캘린더에도 공개된 할\u00a0일의 기록만\u00a0보여요.",
            },
            {
              title: "댓글에 답글로 이어서 이야기해요",
              body: "할\u00a0일 상세에서 댓글을 읽고 원하는 댓글에 답글을 남길 수 있어요. 이어진 대화를 펼쳐 보거나 댓글 알림을 눌러 해당 댓글로\u00a0이동해요.",
            },
          ],
          plans: {
            free: "친구를 최대 5명까지 추가할 수 있어요. 콕 찌르기는 하루 3회 이용할 수 있고, 공개한 할\u00a0일을 살펴보며 댓글로 응원할 수\u00a0있어요.",
            premium:
              "친구 수와 하루 콕 찌르기 횟수 제한 없이 이용할 수 있어요. 같은 할\u00a0일에는 24시간이 지난 뒤 다시 콕 찌르기를 보낼 수\u00a0있어요.",
          },
          faq: [
            {
              question: "친구를 추가하면 모든 할\u00a0일이 보이나요?",
              answer:
                "아니에요. 친구는 공개한 할\u00a0일만 볼 수 있어요. 할\u00a0일을 만들거나 수정할 때 공개 범위를 확인해\u00a0주세요.",
            },
            {
              question: "친구 요청을 보냈는데 목록에 바로 보이지 않아요",
              answer:
                "친구 관리의 보낸 요청에서 상태를 확인해요. 상대방이 받은 요청에서 수락하면 친구로\u00a0연결돼요.",
            },
            {
              question: "친구 없이 혼자 사용해도 되나요?",
              answer:
                "물론이에요. 메모, 할\u00a0일, 반복 설정과 캘린더로 혼자 하루를 관리할 수 있어요. 함께하고 싶을 때 친구를 추가해\u00a0보세요.",
            },
          ],
          screens: [
            {
              alt: "친구들의 고양이 프로필과 공개한 할\u00a0일이 보이는 아이두 친구\u00a0화면",
              caption:
                "친구를 누르면 공개한 할\u00a0일이 보이고, 콕으로 응원할 수\u00a0있어요.",
            },
            {
              alt: "콕 횟수와 댓글 입력창이 있는 아이두 할\u00a0일 상세\u00a0화면",
              caption: "할\u00a0일 상세에서 댓글과 답글로 이야기를 나눠요.",
            },
          ],
          cardDescription:
            "친구를 연결하고 공개한 할\u00a0일을 함께 봐요. 콕과 댓글로 응원을 보내는 방법을\u00a0알아봐요.",
        },
        "friend-invite": {
          kicker: "링크 하나면 충분해요",
          title: "친구 초대하고 프리미엄 받기",
          summary:
            "초대 링크나 6자리 초대 코드로 친구를 아이두에 불러요. 친구는 가입하면 바로 프리미엄 7일을 받고, 나는 친구가 2일 동안 할\u00a0일을 끝내면 프리미엄 7일을 받고 친구를 1명 더 추가할 수 있어요. 받는 사람과 시점, 조건을\u00a0정리했어요.",
          steps: [
            {
              title: "친구 초대 화면을 열어요",
              body: "마이 탭에서 ‘친구 초대 · 발자국’을 눌러요. 내 초대 링크와 6자리 초대 코드, 지금까지 모은 발자국이\u00a0보여요.",
            },
            {
              title: "초대 링크를 보내요",
              body: "카카오톡으로 초대하기를 누르거나 링크를 복사해 다른 앱으로 보내요. 친구가 링크를 열면 누가 초대했는지와 초대 코드를 확인하고 앱을 설치할 수\u00a0있어요.",
            },
            {
              title: "친구가 가입하면 바로 친구가 돼요",
              body: "친구가 초대 링크로 앱을 열거나 로그인 화면에 초대 코드를 입력해 가입하면, 서로 친구가 되고 친구는 바로 프리미엄 7일을\u00a0받아요.",
            },
            {
              title: "친구가 2일 동안 할\u00a0일을 끝내면 발자국이 찍혀요",
              body: "친구가 가입하고 14일 안에 2일 동안 할\u00a0일을 끝내면 내 발자국 판에 발자국이 하나 찍혀요. 그때 나는 프리미엄 7일을 받고, 친구를 1명 더 추가할 수\u00a0있어요.",
            },
          ],
          example: {
            introduction:
              "같이 운동할 친구가 있다면, 초대 링크 하나로 시작해\u00a0보세요.",
            items: [
              "나: 카카오톡으로 초대 링크를 보내요.",
              "친구: 링크로 가입하면 바로 나와 친구가 되고, 프리미엄 7일을\u00a0받아요.",
              "친구가 월요일과 수요일에 할\u00a0일을 끝내면 내 판에 발자국이 찍혀요. 나는 프리미엄 7일을 받고 친구를 1명 더 추가할 수\u00a0있어요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. 보상에는 조건이 있으니 아래 내용과 이용약관을 확인해\u00a0주세요.",
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
                when: "친구가 2일 동안 할\u00a0일을 끝내면",
                reward: "프리미엄 7일 + 친구 1명 더",
                condition:
                  "친구가 가입하고 14일 안에 채워야 해요. 하루에 여러 개를 끝내도 1일로\u00a0세요.",
              },
            ],
            limits: [
              "초대해서 내가 받는 프리미엄은 30일마다 최대 30일, 모두 합쳐 최대 90일까지예요.",
              "최대치를 채운 뒤에도 발자국은 계속 모을 수 있고, 발자국이 찍힐 때마다 친구를 1명 더 추가할 수\u00a0있어요.",
              "보상은 아이두 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없어요. 같은 기기나 계정으로는 한 번만 받을 수\u00a0있어요.",
              "구독 중에 받은 보상은 구독이 끝난 뒤 이어서\u00a0시작해요.",
            ],
            termsNote: "자세한 조건은 이용약관 제13조의2에 있어요.",
            termsLink: "초대 보상 조건 보기",
          },
          details: [
            {
              title: "발자국 판에서 진행 상황을 봐요",
              body: "‘발자국 모으기’ 판에 발자국이 한 칸씩 찍혀요. 12칸을 다 채우면 새 판이 열리고, 초대한 친구 목록에서 누가 발자국을 찍었는지 확인할 수\u00a0있어요.",
            },
            {
              title: "기다리는 친구에게 콕을 보내요",
              body: "아직 2일을 채우지 못한 친구에게는 콕을 보내 응원할 수 있어요. 친구가 할\u00a0일을 끝내면 앱 알림으로 알려\u00a0드려요.",
            },
          ],
          faq: [
            {
              question: "링크 없이 코드로도 초대할 수 있나요?",
              answer:
                "네. 친구 초대 화면의 6자리 초대 코드를 알려 주세요. 친구가 앱을 설치하고 로그인 화면에서 초대 코드를 입력하면\u00a0돼요.",
            },
            {
              question: "이미 아이두를 쓰는 친구도 프리미엄을 받나요?",
              answer:
                "가입한 지 7일이 지난 친구가 초대를 수락하면 친구로만 연결되고, 친구는 프리미엄을 받지\u00a0않아요.",
            },
            {
              question: "친구 수가 다 찼는데 초대해도 되나요?",
              answer:
                "네. 내 친구 수가 추가 한도에 이르렀다면 초대를 수락한 친구에게 친구 요청이 가요. 발자국이 찍히면 친구를 1명 더 추가할 수\u00a0있어요.",
            },
            {
              question: "보상 프리미엄이 끝나면 결제되나요?",
              answer:
                "아니에요. 보상 프리미엄은 결제가 없고 자동으로 갱신되지 않아요. 기간이 끝나면 무료로\u00a0돌아가요.",
            },
          ],
          screens: [
            {
              alt: "초대 보상과 6자리 초대 코드가 보이는 아이두 친구 초대\u00a0화면",
              caption:
                "친구 초대 화면에서 링크를 보내거나 코드를 알려\u00a0줘요.",
            },
            {
              alt: "발자국 12칸이 모두 찍힌 아이두 발자국 모으기 판",
              caption:
                "친구가 2일 동안 할\u00a0일을 끝낼 때마다 발자국이 하나씩\u00a0찍혀요.",
            },
            {
              alt: "초대한 사람 이름과 가입 혜택이 보이는 아이두 초대\u00a0카드",
              caption: "친구는 초대 카드에서 혜택을 확인하고 바로 가입해요.",
            },
          ],
          cardDescription:
            "초대 링크로 친구를 불러요. 누가 언제 프리미엄을 받는지, 발자국 모으기까지\u00a0알아봐요.",
        },
        weather: {
          kicker: "날씨 사용설명서",
          title: "날씨와 아이두 브리핑으로 하루 준비하기",
          summary:
            "아이두 날씨가 새로워졌어요. 전 세계 어디서나 지금 날씨와 시간별·10일 예보를 보고, 아이두 브리핑이 오늘 시간이 정해진 할\u00a0일과 날씨를 맞춰 알려줘요. 화면 구성과 브리핑이 언제 무엇을 보여주는지, 시간 옮기기와 알림까지\u00a0정리했어요.",
          steps: [
            {
              title: "날씨 화면을 열어요",
              body: "홈의 날씨 버튼을 눌러요. 위치 권한을 허용하면 지금 있는 곳의 날씨를 보여줘요. 오른쪽 위 새로고침 버튼으로 언제든 새로 불러올 수\u00a0있어요.",
            },
            {
              title: "아이두 브리핑을 확인해요",
              body: "지금 날씨 아래에서 오늘 시간이 정해진 할\u00a0일과 그 시간의 날씨를 함께 봐요. 브리핑에서 바로 할\u00a0일을 체크하고, ⋯ 버튼으로 수정할 수\u00a0있어요.",
            },
            {
              title: "겹친 할\u00a0일은 시간을 옮겨요",
              body: "비나 더위와 겹친 할\u00a0일이 있으면 ‘비 피해서 시간 옮기기’나 ‘더 선선한 시간으로 옮기기’를 눌러요. 비가 덜 오거나 덜 더운 시간을 추천받아 한 번에 옮기고, 마음이 바뀌면 되돌릴 수\u00a0있어요.",
            },
            {
              title: "아침·저녁 날씨 알림을 받아요",
              body: "날씨 알림을 켜 두면 아침과 저녁에 날씨를 알려줘요. 비나 더위와 겹친 할\u00a0일이 있으면 알림을 눌러 바로 시간을 옮길 수\u00a0있어요.",
            },
          ],
          example: {
            introduction:
              "오후 3시에 강아지 산책을 잡아 둔 날, 비 소식이 있다면 이렇게\u00a0챙겨요.",
            items: [
              "산책 시간에 비 올 확률이 50% 이상이면 브리핑이 이 할\u00a0일을 가장 먼저\u00a0알려줘요.",
              "‘비 피해서 시간 옮기기’를 누르면 비가 덜 오는 시간을 추천해 줘요. 고르면 바로 옮겨지고, 되돌릴 수도\u00a0있어요.",
              "맑은 시간이 따로 있다면 그때 산책하라고 제안해요. 제안 버튼을 누르면 할\u00a0일 추가 창이 미리 채워져\u00a0열려요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. 실제 안내는 그날의 예보와 할\u00a0일에 따라\u00a0달라져요.",
          },
          layout: [
            {
              title: "지금 날씨",
              body: "위치 이름, 현재 기온과 하늘 상태, 오늘 최고·최저 기온이 보여요. 배경은 18가지 날씨 장면으로 실제처럼 움직이고, 낮에는 해가 밤에는 달이 떠요. 영하 기온의 기호와 °는 작게, 큰 제목에는 도시 이름만 보여 깔끔하게\u00a0읽혀요.",
            },
            {
              title: "아이두 브리핑",
              body: "오늘 시간이 정해진 할\u00a0일과 그 시간의 날씨를 맞춰 알려줘요. 무엇을 보여주는지는 아래 표에\u00a0정리했어요.",
            },
            {
              title: "다음 1시간 강수",
              body: "‘39분 뒤 비가 시작돼요’처럼 앞으로 1시간 동안의 비 소식을 분 단위로 알려줘요. 지원하는 지역에서만\u00a0보여요.",
            },
            {
              title: "시간별·10일 예보",
              body: "24시간 동안의 날씨와 기온, 비 올 확률을 옆으로 넘겨 봐요. 10일 예보에서는 날마다 최고·최저 기온을 보고, 할\u00a0일 있는 날을 점으로\u00a0구분해요.",
            },
            {
              title: "자세한 날씨",
              body: "체감 온도, 자외선, 바람, 강수량, 습도, 가시거리, 기압, 구름, 해와 달(월출·월몰·달 모양)을 보여줘요. 한국에서는 대기질도 함께\u00a0봐요.",
            },
            {
              title: "기상 특보와 데이터 출처",
              body: "기상 특보가 있으면 함께 알려줘요. 날씨는 Apple 날씨 데이터를 쓰고, 화면에서 Apple 날씨 표기와 데이터 출처 링크를 확인할 수\u00a0있어요.",
            },
          ],
          cases: [
            {
              title: "비가 할\u00a0일과 겹칠 때",
              body: "할\u00a0일 시간에 비 올 확률이 50% 이상이면 브리핑이 겹친 할\u00a0일을 먼저 모아\u00a0보여줘요.",
              points: [
                "할\u00a0일마다 그 시간의 강수 확률과 비가 그치는 시간",
                "‘비 피해서 시간 옮기기’ 버튼",
                "지금 비 올 확률과 비가 그치는\u00a0시간",
              ],
              alt: "산호세 날씨에서 아이두 브리핑이 ‘할\u00a0일 3개가 비와 겹쳐요’라고 알려주는\u00a0화면",
            },
            {
              title: "비 피해서 시간 옮기기",
              body: "비가 덜 오는 시간을 추천해 줘요. 할\u00a0일마다 시간을 골라 한 번에 옮기고, 옮긴 뒤에도 되돌릴 수\u00a0있어요.",
              points: [
                "앞으로 몇 시간의 비를 막대로 한눈에",
                "시간마다 강수 확률과 ‘추천’ 표시",
                "옮기지 않을 할\u00a0일은 그대로\u00a0두기",
              ],
              alt: "‘비 피해서 시간 옮기기’ 창에서 할\u00a0일마다 비가 덜 오는 시간을 고르는\u00a0화면",
            },
            {
              title: "더위와 겹칠 때",
              body: "낮 체감 온도가 33°C 이상이면 더운 시간과 겹친 할\u00a0일을 알려주고, 더 선선한 시간을\u00a0짚어줘요.",
              points: [
                "체감 온도가 가장 높은 시간대",
                "더위와 겹친 할\u00a0일과 그 시간 체감 온도",
                "‘더 선선한 시간으로 옮기기’\u00a0버튼",
              ],
              alt: "마나우스 날씨에서 브리핑이 ‘한낮 야외 할\u00a0일은 피해요’라고 알려주는\u00a0화면",
            },
            {
              title: "더 선선한 시간으로 옮기기",
              body: "시간마다 체감 온도를 보여주고, 가장 선선한 시간을 추천해 줘요. 고르면 바로\u00a0옮겨져요.",
              points: [
                "시간별 체감 온도",
                "가장 선선한 시간의 ‘추천’ 표시",
                "Apple 날씨 표기와 업데이트\u00a0시각",
              ],
              alt: "‘더 선선한 시간으로 옮기기’ 창에서 시간마다 체감 온도를 보여주는\u00a0화면",
            },
            {
              title: "맑은 날",
              body: "비 걱정이 없는 날엔 밖에서 하기 좋은 시간을 알려주고, 할\u00a0일마다 날씨 걱정이 없다고\u00a0표시해요.",
              points: [
                "하루 중 가장 따뜻한 시간대",
                "할\u00a0일마다 ‘오늘 가장 좋은 시간’·‘비 걱정 없어요’",
                "산책 할\u00a0일을 바로 추가하는\u00a0버튼",
              ],
              alt: "서울 맑은 날 브리핑이 ‘오늘은 밖에서 하기 좋은 날’이라고 알려주는\u00a0화면",
            },
            {
              title: "해외에 있을 때",
              body: "기기 시간대와 다른 곳의 날씨는 현지 시각으로 보여줘요. 할\u00a0일 시간과 헷갈리지 않도록 브리핑은\u00a0숨겨요.",
              points: [
                "다음 1시간 강수 그래프",
                "‘현지 오후 8시까지’처럼 현지 시각 예보",
                "현지 날짜 기준 10일\u00a0예보",
              ],
              alt: "뉴욕 날씨를 현지 시각으로 보여주는 화면과 다음 1시간 강수\u00a0그래프",
            },
            {
              title: "10일 예보 펼쳐 보기",
              body: "날짜를 누르면 그날의 낮·밤 날씨와 강수량, 바람, 자외선, 해 뜨고 지는 시간을 펼쳐\u00a0봐요.",
              points: [
                "낮·밤 날씨와 최고·최저 기온",
                "강수량·최대 바람·최대 자외선",
                "할\u00a0일 있는 날은 점으로\u00a0표시",
              ],
              alt: "10일 예보에서 오늘을 펼쳐 낮·밤 날씨와 강수량을 보여주는\u00a0화면",
            },
            {
              title: "자세한 날씨",
              body: "지금 날씨를 타일로 나눠 보여줘요. 숫자 아래 한 줄로 오늘 어떻게 하면 좋을지도\u00a0알려줘요.",
              points: [
                "체감 온도와 자외선(선크림 바를 시간)",
                "바람 방향·돌풍, 앞으로 24시간 강수량",
                "습도·이슬점, 가시거리, 기압, 구름",
              ],
              alt: "체감 온도·자외선·바람·강수량·습도·가시거리·기압·구름 타일이 보이는 자세한 날씨\u00a0화면",
            },
            {
              title: "해와 달, 대기질",
              body: "해 뜨고 지는 시간과 낮 길이, 달 모양을 보여줘요. 한국에서는 미세먼지와 초미세먼지도 함께\u00a0봐요.",
              points: [
                "일출·일몰과 낮 길이",
                "달 모양과 월출·월몰",
                "대기질은 한국에서만, 에어코리아\u00a0자료",
              ],
              alt: "해와 달 카드와 미세먼지·초미세먼지 대기질, Apple 날씨 표기가 보이는\u00a0화면",
            },
            {
              title: "인터넷이 끊겼을 때",
              body: "화면 위쪽에 오프라인 안내가 뜨고, 마지막으로 본 날씨와 브리핑을 그대로 보여줘요. 다시 연결되면 자동으로 새로\u00a0불러와요.",
              points: ["오프라인 안내", "마지막으로 받은 날씨와 브리핑 유지"],
              alt: "‘오프라인이에요. 연결되면 자동으로 다시 불러와요’ 안내가 위쪽에 뜬 날씨\u00a0화면",
            },
            {
              title: "날씨 알림",
              body: "날씨 화면 오른쪽 위 종 버튼에서 날씨 알림을 켜고, 아침·저녁 알림 시간을 내 하루에\u00a0맞춰요.",
              points: [
                "오전 알림은 오늘 날씨",
                "오후 알림은 내일 날씨",
                "시간은 언제든 바꿀 수\u00a0있어요",
              ],
              alt: "날씨 알림을 켜고 오전 7시, 오후 5시 30분 알림 시간이 보이는 설정\u00a0화면",
            },
          ],
          briefing: {
            introduction:
              "브리핑은 아래 순서대로 살펴보고, 가장 먼저 해당하는 내용을\u00a0보여줘요.",
            rows: [
              {
                when: "할\u00a0일 시간에 비·눈·낙뢰 확률이 50% 이상일 때",
                shows:
                  "겹친 할\u00a0일을 먼저 알려주고, 시간 옮기기를\u00a0권해요.",
              },
              {
                when: "낮 체감 온도가 33°C 이상일 때",
                shows:
                  "더위를 알려주고, 더위와 겹친 할\u00a0일은 시간 옮기기를\u00a0권해요.",
              },
              {
                when: "곧 비가 올 때",
                shows: "비가 오기 전에 할\u00a0일을 하도록\u00a0제안해요.",
              },
              {
                when: "맑은 시간이 있을 때",
                shows:
                  "밖에서 하기 좋은 시간을 알려주고, 산책 할\u00a0일을\u00a0제안해요.",
              },
              {
                when: "오늘 남은 할\u00a0일이 없을 때",
                shows:
                  "내일 아침 기온을 알려줘요. 10°C 이하면 쌀쌀하다고\u00a0알려줘요.",
              },
              {
                when: "모두 괜찮을 때",
                shows: "‘남은 할\u00a0일, 날씨 걱정 없어요’라고\u00a0알려줘요.",
              },
            ],
            note: "날씨 위치와 기기 시간대가 다르면(해외 위치를 볼 때 등) 브리핑은 보이지\u00a0않아요.",
          },
          details: [
            {
              title: "위치를 못 찾을 때",
              body: "날씨는 위치 권한을 허용해야 지금 있는 곳을 보여줘요. 위치를 찾지 못하면 기기 설정에서 아이두의 위치 권한과 위치 서비스가 켜져 있는지 확인하고, 새로고침 버튼을 눌러 주세요. 날씨가 없어도 할\u00a0일은 그대로 쓸 수\u00a0있어요.",
            },
            {
              title: "해외에 있을 때",
              body: "해외에서도 그곳의 날씨와 알림을 받아요. 기기 시간대와 다른 곳의 날씨는 ‘현지 오후 6시’처럼 현지 시각으로 보여줘요. 할\u00a0일 시간과 날씨 시간이 어긋나지 않도록 이때는 브리핑을\u00a0숨겨요.",
            },
            {
              title: "인터넷이 끊겼을 때",
              body: "화면 위쪽에 안내가 뜨고, 마지막으로 본 할\u00a0일과 날씨를 그대로 보여줘요. 다시 연결되면 자동으로 새로\u00a0불러와요.",
            },
            {
              title: "위치 정보는 날씨에만 써요",
              body: "정확한 위치 대신 약 5km 단위로 묶어 날씨를 가져와요. 위치 권한은 선택할 수 있고, 언제든 기기 설정에서 바꿀 수\u00a0있어요.",
            },
          ],
          faq: [
            {
              question: "브리핑이 보이지 않아요",
              answer:
                "날씨 위치와 기기 시간대가 다르면 브리핑을 숨겨요. 해외 위치의 날씨를 보고 있다면 기기 시간대와 같은 곳에서 다시\u00a0확인해\u00a0주세요.",
            },
            {
              question: "다음 1시간 강수가 안 보여요",
              answer:
                "분 단위 비 예보는 지원하는 지역에서만 보여요. 지원하지 않는 곳에서는 시간 단위로 비 소식을\u00a0알려줘요.",
            },
            {
              question: "시간을 옮긴 할\u00a0일을 되돌릴 수 있나요?",
              answer:
                "네. 시간을 옮긴 뒤 되돌리기를 누르면 원래 시간으로 돌아가요. 할\u00a0일 상세에서 직접 시간을 바꿀 수도\u00a0있어요.",
            },
            {
              question: "대기질은 어디서 보나요?",
              answer:
                "자세한 날씨에서 볼 수 있어요. 대기질은 한국에서만 제공하며 에어코리아 자료를\u00a0사용해요.",
            },
          ],
          screens: [
            {
              alt: "현재 날씨 아래 아이두 브리핑과 오늘 할\u00a0일 3개가 보이는 아이두 날씨\u00a0화면",
              caption:
                "지금 날씨 아래에서 브리핑이 오늘 할\u00a0일과 날씨를 맞춰\u00a0줘요.",
            },
            {
              alt: "‘앞으로 1시간 동안 비 소식이 없어요’ 안내와 1시간 강수 그래프가 보이는 런던 날씨\u00a0화면",
              caption:
                "지원 지역에서는 다음 1시간 비 소식을 분 단위로\u00a0알려줘요.",
            },
            {
              alt: "현지 시각으로 시간별 예보와 10일 예보가 보이는 두바이 날씨\u00a0화면",
              caption:
                "해외에서는 현지 시각으로 시간별·10일 예보를\u00a0보여줘요.",
            },
          ],
          cardDescription:
            "지금 날씨와 예보를 보고, 아이두 브리핑으로 비·더위와 겹친 할\u00a0일을 미리\u00a0챙겨요.",
          scenes: [
            {
              name: "맑음",
              alt: "밤하늘에 달과 별이 뜬 ‘맑음’ 날씨\u00a0장면",
            },
            {
              name: "대체로 맑음",
              alt: "파란 하늘에 해가 비치는 ‘대체로 맑음’ 날씨\u00a0장면",
            },
            {
              name: "구름 조금",
              alt: "파란 하늘에 구름이 조금 흘러가는 ‘구름 조금’ 날씨\u00a0장면",
            },
            {
              name: "구름 많음",
              alt: "구름이 하늘을 덮어 가는 ‘구름 많음’ 날씨\u00a0장면",
            },
            {
              name: "흐림",
              alt: "회색 구름이 낮게 깔린 ‘흐림’ 날씨\u00a0장면",
            },
            {
              name: "안개",
              alt: "뿌연 안개가 천천히 흘러가는 ‘안개’ 날씨\u00a0장면",
            },
            {
              name: "뿌연 하늘",
              alt: "누런 먼지가 떠다니는 ‘뿌연 하늘’ 날씨\u00a0장면",
            },
            {
              name: "강한 바람",
              alt: "나뭇잎이 바람에 날리는 ‘강한 바람’ 날씨\u00a0장면",
            },
            {
              name: "이슬비",
              alt: "가는 빗방울이 떨어지는 ‘이슬비’ 날씨\u00a0장면",
            },
            {
              name: "비",
              alt: "어두운 밤에 빗줄기가 내리는 ‘비’ 날씨\u00a0장면",
            },
            {
              name: "폭우",
              alt: "굵은 빗줄기가 쏟아지는 ‘폭우’ 날씨\u00a0장면",
            },
            {
              name: "천둥번개",
              alt: "밤하늘에 번개가 번쩍이는 ‘천둥번개’ 날씨\u00a0장면",
            },
            {
              name: "진눈깨비",
              alt: "비와 눈이 섞여 내리는 ‘진눈깨비’ 날씨\u00a0장면",
            },
            { name: "눈", alt: "눈송이가 천천히 내리는 ‘눈’ 날씨\u00a0장면" },
            { name: "폭설", alt: "큰 눈송이가 쏟아지는 ‘폭설’ 날씨\u00a0장면" },
            {
              name: "우박",
              alt: "얼음 알갱이가 튀어 떨어지는 ‘우박’ 날씨\u00a0장면",
            },
            {
              name: "무더위",
              alt: "붉은 하늘에 해가 이글거리는 ‘무더위’ 날씨\u00a0장면",
            },
            {
              name: "강추위",
              alt: "가장자리에 성에가 끼고 눈꽃이 날리는 ‘강추위’ 날씨\u00a0장면",
            },
          ],
          scenePhone: {
            alt: "천둥번개가 치는 밤, 시간별 예보와 10일 예보가 보이는 Android 아이두 날씨 전체\u00a0화면",
            caption: "Android에서 본 천둥번개 치는\u00a0밤",
          },
          devices: [
            {
              name: "iPhone\u00a0Duo",
              body: "펼친 화면에서는 버튼을 오른쪽에 모으고, 지금 날씨와 예보를 넓게\u00a0보여줘요.",
              alt: "iPhone\u00a0Duo를 펼친 화면에서 지금 날씨와 시간별 예보가 보이고 오른쪽에 버튼이 모인 아이두 날씨\u00a0화면",
            },
            {
              name: "iPad",
              body: "왼쪽엔 지금 날씨와 시간별 예보, 오른쪽엔 10일 예보가 나란히\u00a0보여요.",
              alt: "iPad에서 왼쪽에 달이 뜬 맑은 밤 날씨, 오른쪽에 10일 예보가 나란히 보이는 아이두 날씨\u00a0화면",
            },
          ],
        },
        comments: {
          kicker: "댓글 사용설명서",
          title: "댓글·답글로 친구와 이야기 나누기",
          summary:
            "할\u00a0일 상세 한 화면에서 댓글과 답글을 모두 봐요. 답글은 그 자리에서 펼치고, @이름으로 누구에게 단 답글인지 바로 알 수 있어요. 마음에 드는 댓글은 톡톡 두 번 눌러 하트를\u00a0남겨요.",
          steps: [
            {
              title: "할\u00a0일을 만들고 친구에게 보여줘요",
              body: "할\u00a0일을 추가할 때 친구에게 공개할지 골라요. 공개한 할\u00a0일은 친구 캘린더에 보이고, 친구가 할\u00a0일 상세에서 댓글을 남길 수\u00a0있어요.",
            },
            {
              title: "친구가 댓글을 남겨요",
              body: "내 할\u00a0일에 댓글이 달리면 알림이 와요. 알림을 누르면 할\u00a0일 상세가 그 댓글 위치로 열리고, 잠깐 강조해서 바로 찾을 수\u00a0있어요.",
            },
            {
              title: "답글과 @멘션으로 이어 가요",
              body: "댓글 아래 ‘답글 달기’를 누르면 작성창이 키보드 바로 위에 붙고, 누구에게 답하는지 함께 보여요. 답글에 답해도 같은 묶음 아래 @이름과 함께\u00a0붙어요.",
            },
            {
              title: "톡톡 두 번, 하트가 팡",
              body: "댓글을 톡톡 두 번 눌러 보세요. 하트가 팡 터지며 좋아요가 남아요! 하트 버튼을 눌러도 되고, 버튼을 한 번 더 누르면 좋아요가\u00a0취소돼요.",
            },
          ],
          example: {
            introduction:
              "‘오늘 수영 간다!’ 할\u00a0일 하나에서 이런 대화가\u00a0이어져요.",
            items: [
              "지환이 ‘오늘 수영 간다!’를 친구에게\u00a0공개해요.",
              "친구 매튜가 ‘몇 시에 가?’ 댓글을 남기면 지환에게 알림이\u00a0가요.",
              "지환이 ‘7시!’라고 답글을 달고, 다른 친구가 그 답글에 ‘@지환 나도 갈래’라고 이어\u00a0붙여요.",
              "응원하고 싶은 댓글은 톡톡 두 번 눌러 하트를\u00a0남겨요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. 이름과 내용은 실제와\u00a0달라요.",
          },
          details: [
            {
              title: "답글은 한 단계만 들여써요",
              body: "댓글 아래 대표 답글 하나가 보이고, ‘답글 N개 더 보기’를 누르면 10개씩 펼쳐져요. 다 읽었다면 ‘답글 숨기기’로\u00a0접어요.",
            },
            {
              title: "⋯ 버튼이나 길게 눌러 메뉴를 열어요",
              body: "내 댓글은 수정·복사·삭제, 친구 댓글은 복사·신고·차단을 한곳에서 골라요. 삭제할 때는 한 번 더\u00a0확인해요.",
            },
            {
              title: "지워진 댓글도 대화는 이어져요",
              body: "답글이 달린 댓글을 지우면 ‘삭제된 댓글이에요’로 자리를 지켜 대화 흐름이 끊기지 않아요. 답글이 없으면 그 줄이\u00a0사라져요.",
            },
            {
              title: "글씨 크기와 긴 이름도 깔끔하게",
              body: "큰 글씨에서도 줄이 겹치지 않고, 이름이 길면 이름과 태그 순서로 줄여 시간과 ⋯ 버튼은 그대로\u00a0보여요.",
            },
          ],
          faq: [
            {
              question: "댓글과 답글은 무료인가요?",
              answer: "네. 댓글, 답글, 하트는 모두 무료로 쓸 수\u00a0있어요.",
            },
            {
              question: "하트를 잘못 눌렀어요.",
              answer:
                "두 번 탭은 좋아요만 남겨요. 취소하려면 댓글 아래 하트 버튼을 한 번 더\u00a0누르세요.",
            },
            {
              question: "답글에 답하면 어떻게 보이나요?",
              answer:
                "답글은 한 단계까지만 들여써요. 답글에 다시 답하면 같은 묶음 아래에 붙고, 본문 앞에 @이름이 붙어 누구에게 단 답글인지 알 수\u00a0있어요.",
            },
            {
              question: "예전 버전을 쓰는 친구와도 댓글을 나눌 수 있나요?",
              answer:
                "네. 1.14.0 이하 앱에서도 댓글과 답글을 그대로 보고 쓸 수 있어요. 한 화면 보기와 더블탭 하트는 1.14.1부터 쓸 수\u00a0있어요.",
            },
          ],
          screens: [
            {
              alt: "할\u00a0일 상세 아래 댓글과 답글이 한 화면에 이어진 아이두 댓글\u00a0목록",
              caption:
                "할\u00a0일 상세 한 화면에서 댓글과 답글을 모두\u00a0봐요.",
            },
            {
              alt: "‘○○님에게 답글 남기는 중’ 안내와 함께 키보드 바로 위에 답글 작성창이 붙은 아이두\u00a0화면",
              caption: "답글 작성창은 키보드 바로 위에\u00a0붙어요.",
            },
            {
              alt: "댓글 위로 큰 하트가 터지며 좋아요가 남는 아이두 댓글\u00a0화면",
              caption: "톡톡 두 번이면 하트가 팡\u00a0터져요.",
            },
          ],
          story: [
            {
              title: "답글은 그 자리에서 펼쳐요",
              body: "‘답글 더 보기’를 누르면 화면을 옮기지 않고 바로 아래에 답글이 열려요. @이름으로 누구에게 단 답글인지\u00a0보여요.",
              alt: "‘답글 더 보기’를 눌러 댓글 아래에 @멘션이 붙은 답글들이 펼쳐지는 아이두 댓글 녹화\u00a0화면",
            },
            {
              title: "작성창은 키보드 위에 딱 붙어요",
              body: "‘답글 달기’를 누르면 누구에게 답하는지 안내가 뜨고, 작성창이 키보드 바로 위로\u00a0올라와요.",
              alt: "답글 달기를 누르자 키보드가 올라오고 그 위에 답글 작성창과 답글 대상 안내가 붙는 아이두 녹화\u00a0화면",
            },
            {
              title: "톡톡 두 번, 하트가 팡",
              body: "댓글을 두 번 누르면 하트가 터지며 좋아요가 남아요. 처음 한 번은 앱이 살짝\u00a0알려줘요.",
              alt: "댓글을 두 번 눌러 큰 하트가 터지고 좋아요가 남는 아이두 녹화\u00a0화면",
            },
            {
              title: "알림은 그 댓글로 바로",
              body: "댓글 알림을 누르면 할\u00a0일 상세가 열리고 그 댓글까지 내려가 잠깐\u00a0강조해요.",
              alt: "알림으로 열린 할\u00a0일 상세에서 해당 답글이 주황색으로 잠깐 강조되는 아이두 녹화\u00a0화면",
            },
          ],
          cardDescription:
            "친구 할\u00a0일에 댓글을 남기고, 답글과 @멘션으로 이어 가고, 톡톡 두 번 눌러 하트를\u00a0보내요.",
        },
      },
    },
    featureHub: {
      title: "아이두 기능 소개",
      metaTitle: "아이두 기능 소개: 친구와 함께 쓰는 AI 투두\u00a0플래너",
      description:
        "할\u00a0일과 달력, 메모와 AI 정리, 친구와 콕 응원, 알림·날씨·리포트까지. 아이두의 모든 기능을 실제 앱 화면과 함께 쉽게\u00a0소개해요.",
      kicker: "아이두 한 바퀴 둘러보기",
      summaryTitle: "30초 만에 알아보는 아이두",
      summary: [
        {
          title: "적고, 말하면 계획 끝",
          body: "할\u00a0일은 칩 몇 번이면 되고, 긴 계획은 말 한마디로 충분해요. AI가 날짜·시간·반복까지 채워\u00a0줘요.",
        },
        {
          title: "친구와 함께라서 끝까지",
          body: "친구의 할\u00a0일을 보고 콕 찔러 응원해요. 댓글과 하트가 오가면 미루던 일도\u00a0시작돼요.",
        },
        {
          title: "놓치지 않게 챙겨요",
          body: "아침·저녁 리마인드, 날씨 브리핑, 주간 리포트가 오늘 하루를 끝까지\u00a0챙겨요.",
        },
      ],
      groupsLabel: "보고 싶은 기능으로 이동",
      groups: {
        plan: {
          title: "할\u00a0일 쓰기",
          hand: "적고, 말하면 끝",
          body: "할\u00a0일과 달력으로 계획하고, 반복할\u00a0일은 한 번만 정해요. 말 한마디면 AI가 할\u00a0일로\u00a0정리해요.",
        },
        memo: {
          title: "메모와 AI",
          hand: "생각은 메모에, 할\u00a0일은 AI가",
          body: "아직 계획이 아닌 생각은 메모에 적어 두고, 필요할 때 AI가 할\u00a0일로\u00a0나눠요.",
        },
        friends: {
          title: "친구와 함께",
          hand: "미루면 콕, 함께하면 쭉",
          body: "친구의 할\u00a0일을 보고 콕으로 응원하고, 댓글과 하트를 주고받아요. 초대하면 발자국이\u00a0찍혀요.",
        },
        daily: {
          title: "하루 챙기기",
          hand: "깜빡해도 괜찮아요",
          body: "리마인드와 알림함, 날씨 브리핑, AI 리포트로 오늘과 이번 주를\u00a0챙겨요.",
        },
        me: {
          title: "나답게, 넉넉하게",
          hand: "고양이와 함께 나만의 아이두",
          body: "고양이 앱 아이콘과 테마, 글꼴 크기로 꾸미고, 필요하면 프리미엄으로 넉넉하게\u00a0써요.",
        },
      },
      premiumBadge: "프리미엄",
      screensTitle: "실제 화면으로 둘러보기",
      screensDescription:
        "iPhone과 Android에서 찍은 실제 화면으로 기능을 하나씩\u00a0살펴봐요.",
      compareTitle: "다른 할\u00a0일 앱과 뭐가 다를까요?",
      compareBody:
        "투두메이트·TickTick·Todoist와 아이두를 공식 정보로 나란히 놓고 비교했어요. 나에게 맞는 앱을 골라\u00a0보세요.",
      compareLink: "할\u00a0일 앱 비교 보기",
      faq: [
        {
          question: "아이두는 어떤 앱인가요?",
          answer:
            "친구와 할\u00a0일을 공유하고 서로 응원하는 AI 투두 플래너예요. iPhone·iPad·Mac(Apple 실리콘)·Android에서\u00a0써요.",
        },
        {
          question: "혼자 써도 괜찮나요?",
          answer:
            "네. 친구 없이도 할\u00a0일·달력·반복·메모·AI 정리·리마인드를 모두 쓸 수 있어요. 친구를 더하면 콕과 댓글로 응원을\u00a0주고받아요.",
        },
        {
          question: "무료로 쓸 수 있나요?",
          answer:
            "네. 할\u00a0일·달력·반복·메모·친구·콕·댓글·위젯은 무료예요. AI를 더 넉넉하게 쓰거나 AI 리포트를 받고 싶다면 프리미엄을\u00a0골라요.",
        },
        {
          question: "내 할\u00a0일과 메모는 안전한가요?",
          answer:
            "비공개 할\u00a0일과 메모는 나만 봐요. AI에 보내기 전에 동의를 받고, 이름·이메일·친구 정보는 AI에 보내지\u00a0않아요.",
        },
      ],
    },
    compare: {
      title: "할\u00a0일 앱 비교: 투두메이트, TickTick, Todoist와\u00a0아이두",
      metaTitle:
        "투두메이트·TickTick·Todoist 비교, 나에게 맞는 할\u00a0일 앱\u00a0고르기",
      description:
        "투두메이트, TickTick, Todoist와 아이두를 친구 기능·AI·달력·습관·지원 기기·요금 방식으로 비교했어요. 각 앱 공식 정보를 기준으로 나에게 맞는 투두 앱을 골라\u00a0보세요.",
      kicker: "나에게 맞는 투두 앱 고르기",
      checkedLabel: "공식 정보 확인일",
      intro: [
        "할\u00a0일 앱은 많지만 잘 맞는 앱은 쓰는 방식에 따라 달라요. 혼자 업무를 정리하는지, 친구와 함께 꾸준히 하고 싶은지, 습관과 집중 타이머가 필요한지에 따라 고르는 게\u00a0좋아요.",
        "아래 표는 각 앱의 공식 웹사이트와 App Store 소개에 적힌 내용으로 정리했어요. 공식 페이지에서 찾지 못한 기능은 ‘확인 안 됨’으로\u00a0표시했어요.",
      ],
      tableTitle: "기능 한눈에 비교",
      tableCaption: "아이두·투두메이트·TickTick·Todoist 기능\u00a0비교",
      featureLabel: "기능",
      apps: {
        aido: "아이두",
        todomate: "투두메이트",
        ticktick: "TickTick",
        todoist: "Todoist",
      },
      rows: [
        {
          feature: "친구 할\u00a0일 보기",
          aido: "친구 피드",
          todomate: "팔로우·피드",
          ticktick: "목록 공유",
          todoist: "프로젝트 공유",
        },
        {
          feature: "응원·반응",
          aido: "콕 찌르기·댓글·하트",
          todomate: "이모지 반응",
          ticktick: "확인 안 됨",
          todoist: "확인 안 됨",
        },
        {
          feature: "말로 할\u00a0일 만들기(AI)",
          aido: "말·메모 → 할\u00a0일 여러 개",
          todomate: "확인 안 됨",
          ticktick: "AI 음성 캡처(Premium)",
          todoist: "Ramble(무료는 횟수 제한)",
        },
        {
          feature: "AI 추천·리포트",
          aido: "주간·월간 리포트, 반복 제안",
          todomate: "기록 기반 할\u00a0일 추천",
          ticktick: "AI 어시스턴트(Premium)",
          todoist: "Todoist Assist",
        },
        {
          feature: "반복 할\u00a0일",
          aido: "지원",
          todomate: "지원(루틴)",
          ticktick: "지원",
          todoist: "지원",
        },
        {
          feature: "달력 보기",
          aido: "주·월",
          todomate: "지원",
          ticktick: "연·월·주·여러 날",
          todoist: "캘린더 레이아웃(Pro)",
        },
        {
          feature: "습관·집중 타이머",
          aido: "없음",
          todomate: "루틴·뽀모도로",
          ticktick: "습관·뽀모도로",
          todoist: "확인 안 됨",
        },
        {
          feature: "날씨 브리핑",
          aido: "지원",
          todomate: "확인 안 됨",
          ticktick: "확인 안 됨",
          todoist: "확인 안 됨",
        },
        {
          feature: "홈 화면 위젯",
          aido: "지원",
          todomate: "지원",
          ticktick: "지원",
          todoist: "지원",
        },
        {
          feature: "지원 기기",
          aido: "iPhone·iPad·Mac(Apple\u00a0실리콘)·Android",
          todomate: "iPhone·iPad·Apple\u00a0Watch·Android·Mac·웹",
          ticktick: "iPhone·iPad·Apple\u00a0Watch·Android·Mac·Windows·Linux·웹",
          todoist:
            "iPhone·iPad·Apple Watch·Android·Wear\u00a0OS·Mac·Windows·Linux·웹",
        },
        {
          feature: "요금 방식",
          aido: "무료 + 프리미엄",
          todomate: "무료 + 앱 내 구매",
          ticktick: "무료 + Premium",
          todoist: "무료 + Pro·Business",
        },
      ],
      tableNote:
        "가격은 나라와 스토어, 결제 주기에 따라 달라서 표에 넣지 않았어요. 각 앱의 스토어나 공식 요금 페이지에서 확인해\u00a0주세요.",
      chooseTitle: "이런 분께 잘 맞아요",
      choose: [
        {
          title: "친구와 함께 꾸준히 하고 싶다면",
          body: "친구의 할\u00a0일을 피드로 볼 수 있는 아이두와 투두메이트가 잘 맞아요. 아이두는 콕 찌르기로 응원을 보내고 답장을 받는 흐름이\u00a0있어요.",
        },
        {
          title: "말로 한 번에 정리하고 싶다면",
          body: "아이두는 길게 말하거나 적은 메모를 AI가 할\u00a0일 여러 개로 나누고 날짜·시간·반복을 채워요. TickTick과 Todoist도 음성으로 작업을 추가하는 AI 기능을\u00a0제공해요.",
        },
        {
          title: "업무 프로젝트·팀 협업이 많다면",
          body: "공유 프로젝트와 Windows·Linux 데스크톱 앱이 필요하다면 Todoist나 TickTick이 편할 수\u00a0있어요.",
        },
        {
          title: "습관 추적과 집중 타이머가 꼭 필요하다면",
          body: "TickTick은 습관 트래커와 뽀모도로를, 투두메이트는 루틴과 뽀모도로를\u00a0제공해요.",
        },
      ],
      aidoTitle: "아이두에서 이렇게 써 봐요",
      aidoPoints: [
        {
          title: "친구 피드와 콕 찌르기",
          body: "친구의 공개 할\u00a0일을 보고 콕 한 번으로\u00a0응원해요.",
          slug: "nudge",
        },
        {
          title: "말로 할\u00a0일 만들기",
          body: "말 한마디를 AI가 할\u00a0일 여러 개로\u00a0나눠요.",
          slug: "ai-todo",
        },
        {
          title: "날씨 브리핑",
          body: "비 소식이 있으면 할\u00a0일을 옮기자고 알려\u00a0줘요.",
          slug: "weather",
        },
        {
          title: "AI 리포트",
          body: "한 주·한 달의 달성률과 패턴을 돌아봐요.",
          slug: "ai-report",
        },
      ],
      sourcesTitle: "참고한 공식 정보",
      sources: [
        {
          label: "투두메이트 · App Store",
          url: "https://apps.apple.com/kr/app/id1505220130",
        },
        {
          label: "투두메이트 for desktop · Mac App\u00a0Store",
          url: "https://apps.apple.com/kr/app/id1567807901",
        },
        { label: "TickTick · 기능 소개", url: "https://ticktick.com/features" },
        { label: "TickTick · 요금", url: "https://ticktick.com/upgrade" },
        { label: "TickTick · 다운로드", url: "https://ticktick.com/download" },
        { label: "Todoist · 요금", url: "https://www.todoist.com/pricing" },
        {
          label: "Todoist · 다운로드",
          url: "https://www.todoist.com/downloads",
        },
        {
          label: "Todoist · Ramble 도움말",
          url: "https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF",
        },
      ],
      disclaimer:
        "투두메이트(todo mate), TickTick, Todoist는 각 회사의 상표이며 아이두와 제휴 관계가 없어요. 위 내용은 확인일 기준 공식 정보로 정리했고 이후 바뀔 수 있어요. 고칠 내용이 있다면 문의 메일로 알려\u00a0주세요.",
      faq: [
        {
          question: "투두메이트와 아이두는 뭐가 달라요?",
          answer:
            "두 앱 모두 친구의 할\u00a0일을 볼 수 있어요. 아이두는 콕 찌르기 응원과 답장, 댓글·하트, 말이나 메모를 할\u00a0일 여러 개로 나누는 AI, 날씨 브리핑, AI 주간·월간 리포트가 있어요. 투두메이트는 루틴·디데이·다이어리·뽀모도로를\u00a0제공해요.",
        },
        {
          question: "TickTick이나 Todoist와 함께 써도\u00a0되나요?",
          answer:
            "네. 업무 프로젝트는 다른 앱으로, 친구와 함께하는 개인 할\u00a0일과 습관은 아이두로 나눠 쓰는 분도\u00a0있어요.",
        },
        {
          question: "아이두는 무료인가요?",
          answer:
            "네. 할\u00a0일·달력·반복·메모·친구·콕·댓글·위젯은 무료이고, AI를 넉넉하게 쓰거나 AI 리포트를 받으려면 프리미엄을\u00a0골라요.",
        },
      ],
    },
    media: { play: "영상 재생", pause: "영상 일시정지" },
    meta: {
      title: "아이두(Aido) | 친구와 함께 끝내는 AI 투두\u00a0플래너",
      description:
        "말하면 AI가 날짜·시간·반복까지 채워 할\u00a0일로 만들어요. 친구와 할\u00a0일을 나누고 콕으로 응원하며, 친구를 초대하면 발자국 판에 발자국이 찍혀요. 홈 화면 위젯과 iPhone\u00a0Duo·폴더블·태블릿 두 칸 화면도 지원해요. iPhone·iPad·Android, Apple 실리콘 Mac에서 무료로\u00a0시작해요.",
      openGraphTitle: "아이두 | 혼자 하면 미루고, 같이 하면 끝내요",
      openGraphDescription:
        "말하면 AI가 할\u00a0일로 정리하고, 친구가 콕 찔러 응원해요. 친구를 초대하면 발자국이\u00a0찍혀요.",
      ogKicker: "오늘 할\u00a0일, 이번엔 끝까지",
      ogBadge: "iPhone · Android 무료",
      keywords: [
        "아이두",
        "Aido",
        "친구와 할\u00a0일",
        "할\u00a0일 공유",
        "할\u00a0일 관리 앱",
        "투두 리스트",
        "반복 할\u00a0일",
        "AI 할\u00a0일 정리",
        "AI 투두",
        "친구 초대",
        "홈 화면 위젯",
      ],
    },
    nav: {
      label: "주요 메뉴",
      features: "기능 소개",
      compare: "앱 비교",
      invite: "친구 초대",
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
        release: "1.15.0 새 기능: 말하면 AI가 할\u00a0일로 나눠요",
        titleLead: "혼자 하면 미루고,",
        titleTail: "같이 하면 끝내요",
        description:
          "말하면 AI가 할\u00a0일로 정리하고, 친구가 콕 찔러 응원해요. 오늘 할\u00a0일, 이번엔 끝까지\u00a0해봐요.",
        note: "iPhone·iPad·Android, Apple\u00a0실리콘 Mac에서 무료로\u00a0시작해요",
        screenAlt:
          "오늘 할\u00a0일 목록과 친구들의 고양이 프로필이 보이는 아이두 홈\u00a0화면",
        nudgeName: "두부",
        nudgeText: "콕! 필라테스 같이\u00a0가자",
        doneNote: "디자인 리뷰 정리 끝!",
      },
      ai: {
        kicker: "말하면 뚝딱, 할\u00a0일은 바로",
        title: "말만 하면, 할\u00a0일이 돼요",
        description:
          "길게 말하면 AI가 할\u00a0일 여러 개로 나누고 날짜와 시간, 반복까지 채워요. 적어 둔 메모도 AI가 할\u00a0일로 나눠주고, 추가할 것만 골라\u00a0담아요.",
        exampleLabel: "AI가 할\u00a0일을 정리하는 예시",
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
          "말한 내용을 AI가 할\u00a0일 3개로 나누고 날짜·시간·반복을 채운 아이두 할\u00a0일 고르기\u00a0화면",
        parseAlt:
          "이사 준비 메모를 AI가 할\u00a0일 4개로 나눈 아이두\u00a0화면",
        repeatAlt:
          "필라테스 할\u00a0일에 날짜와 시간이 채워진 아이두 할\u00a0일 추가\u00a0화면",
        guideLink: "AI 할\u00a0일 사용법",
        repeatGuideLink: "반복 할\u00a0일 사용법",
      },
      friends: {
        kicker: "미루면 콕, 함께하면 쭉",
        title: "친구가 콕 찌르면, 미루던 일도 시작돼요",
        description:
          "친구가 공개한 할\u00a0일을 보고 콕이나 댓글로 응원해요. 끝내면 응원해 준 친구에게 고마움을 전해요. 보여 줄 할\u00a0일은 하나씩 직접\u00a0골라요.",
        feedAlt:
          "친구의 고양이 프로필과 할\u00a0일 옆에 콕 버튼이 보이는 아이두 친구\u00a0화면",
        nudgeAlt:
          "친구 할\u00a0일의 상세와 댓글 입력창이 보이는 아이두\u00a0화면",
        nudgeName: "치즈",
        nudgeText: "콕! 오늘 하체 운동 잊지\u00a0마",
        guideLink: "함께하는 할\u00a0일 사용법",
      },
      comments: {
        badge: "1.14.1 새 기능",
        kicker: "톡톡 두 번이면 하트가 팡",
        title: "댓글이 달리면, 같이 하는 재미가 생겨요",
        description:
          "친구가 공개한 할\u00a0일에 댓글을 남기고, 답글과 @멘션으로 이야기를 이어 가요. 마음에 드는 댓글은 톡톡 두 번 눌러 하트를\u00a0남겨요.",
        steps: [
          "할\u00a0일을 만들고 친구에게 보여줘요",
          "친구가 댓글로 응원해요",
          "답글과 @멘션으로 이야기를 이어 가요",
          "톡톡 두 번, 하트가 팡 터져요",
        ],
        heartAlt:
          "댓글을 두 번 눌러 큰 하트가 터지고 좋아요가 남는 아이두 녹화\u00a0화면",
        replyAlt:
          "답글 달기를 누르자 키보드 위에 답글 작성창이 붙는 아이두 녹화\u00a0화면",
        heartNote: "하트\u00a0팡!",
        guideLink: "댓글 사용법",
      },
      invite: {
        badge: "새 기능",
        kicker: "링크 하나면 충분해요",
        title: "친구를 초대하면, 발자국이 찍혀요",
        description:
          "초대 링크로 친구가 가입하면 바로 친구가 돼요. 친구가 꾸준히 할\u00a0일을 끝내면 내 발자국 판에 발자국이 하나씩\u00a0찍혀요.",
        rewardTitle: "누가, 언제 받나요?",
        friendLabel: "친구",
        friendWhen: "가입하면 바로",
        friendReward: "프리미엄 7일",
        myLabel: "나",
        myWhen: "친구가 2일 동안 할\u00a0일을 끝내면",
        myReward: "프리미엄 7일 + 친구 1명 더",
        conditionBadge: "조건 있음",
        conditionNote:
          "친구가 가입하고 14일 안에 2일 동안 할\u00a0일을 끝내면 발자국이 찍혀요. 하루에 여러 개를 끝내도 1일로 세요. 보상 프리미엄은 30일마다 최대 30일, 모두 합쳐 90일까지예요.",
        boardTitle: "발자국 판",
        boardSummary: "12칸 중 5칸에 발자국이 찍혔어요",
        boardHint: "12칸을 다 채우면 새 판이 열려요",
        boardAlt:
          "카카오톡 초대 버튼 아래 발자국 1개가 찍힌 12칸 발자국 판이 보이는 아이두 친구 초대\u00a0화면",
        fullBoardAlt:
          "12칸이 모두 찍혀 1번째 판을 다 채운 아이두 발자국 판\u00a0화면",
        guideLink: "친구 초대 자세히 보기",
      },
      cats: {
        kicker: "오늘은 어떤 고양이로 할까요?",
        title: "귀여운 고양이 9마리와 함께해요",
        description:
          "누구나 마음에 드는 고양이를 골라 내\u00a0프로필로 쓸 수 있어요. 친구들에게도 그\u00a0고양이로\u00a0보여요.",
        premiumNote:
          "프리미엄이면 홈\u00a0화면의 앱\u00a0아이콘도 고양이로 바꿀 수\u00a0있어요.",
        picker: {
          groupLabel: "프로필 고양이 고르기",
          hint: "하나 골라 볼까요?",
          profileLabel: "내 프로필",
          friendsLabel: "친구 목록",
          meLabel: "나",
          friendNames: ["두부", "치즈"],
          appIconLabel: "앱 아이콘",
          appName: "아이두",
          premiumBadge: "프리미엄",
          names: {
            default: "기본",
            scottishFold: "스코티시폴드",
            orangeTabby: "치즈 태비",
            blackCat: "검은 고양이",
            whiteCat: "하얀 고양이",
            siamese: "샴",
            russianBlue: "러시안 블루",
            creamCat: "크림 고양이",
            tuxedoCat: "턱시도 고양이",
          },
        },
      },
      largeScreen: {
        badge: "큰 화면",
        kicker: "넓게 보면 더 편해요",
        title: "접으면\u00a0폰, 펼치면\u00a0한눈에",
        description:
          "iPhone\u00a0Duo를\u00a0펼치면 왼쪽엔\u00a0할\u00a0일\u00a0목록, 오른쪽엔\u00a0상세가\u00a0나란히\u00a0보여요. 화면을\u00a0오가지\u00a0않고 콕과\u00a0댓글까지\u00a0이어서\u00a0봐요.",
        foldedNote: "접었을 때",
        unfoldedNote: "펼치면 두 칸",
        unfoldedAlt:
          "펼친 iPhone Duo에서 왼쪽엔 할\u00a0일 목록, 오른쪽엔 할\u00a0일 상세가 함께 보이는 아이두\u00a0화면",
        ipadTitle: "iPad에서도 두 칸으로",
        ipadDescription:
          "넓은 화면에서 목록을 보며 상세와 댓글을 함께\u00a0확인해요.",
        ipadAlt:
          "iPad에서 할\u00a0일 목록과 상세가 나란히 보이는 아이두\u00a0화면",
        widgetTitle: "홈 화면에서 바로 확인해요",
        widgetDescription:
          "앱을 열지 않아도 오늘 할\u00a0일과 진행률이 위젯에 보여요. iOS와 Android에서 쓸 수\u00a0있어요.",
        widgetAlt:
          "아이폰 홈 화면에 놓인 아이두 위젯 두 개. 오늘 할\u00a0일 3/8과 할\u00a0일 목록이\u00a0보여요",
      },
      devices: {
        kicker: "쓰던 기기 그대로",
        title: "폰부터 Mac까지, 어디서든 아이두",
        description:
          "iPhone과 Android 폰은 물론, iPhone\u00a0Duo·폴더블·태블릿에서는 두\u00a0칸으로 넓게 봐요. Apple\u00a0실리콘 Mac에서도 App\u00a0Store로 설치해 쓸 수\u00a0있어요.",
        note: "Mac에서는 iPad용 앱이 창으로 열려요. 앱과 웹사이트는 한국어와 영어를\u00a0지원해요.",
        items: {
          iphone: {
            name: "iPhone",
            description: "홈 화면 위젯으로 오늘 할\u00a0일을 바로 봐요.",
            requirement: "iOS\u00a016.4\u00a0이상",
            alt: "iPhone 홈 화면에 놓인 아이두 위젯",
          },
          android: {
            name: "Android 폰",
            description: "Google\u00a0Play에서 받고, 위젯도 똑같이 써요.",
            requirement: "Android\u00a07.0\u00a0이상",
            alt: "Android 폰에서 주간 달력과 할\u00a0일 목록이 보이는 아이두\u00a0화면",
          },
          foldable: {
            name: "iPhone\u00a0Duo·폴더블",
            description: "펼치면 목록과 상세가 두\u00a0칸으로 나란히 보여요.",
            requirement: "iOS\u00a016.4 · Android\u00a07.0\u00a0이상",
            alt: "가로로 펼친 iPhone Duo에서 할\u00a0일 목록과 할\u00a0일 상세가 나란히 보이는 아이두\u00a0화면",
          },
          tablet: {
            name: "iPad·태블릿",
            description: "넓은 화면에서 체크리스트와 댓글까지 함께 봐요.",
            requirement: "iPadOS\u00a016.4 · Android\u00a07.0\u00a0이상",
            alt: "iPad에서 할\u00a0일 목록 옆에 체크리스트와 댓글이 보이는 아이두\u00a0화면",
          },
          mac: {
            name: "Mac",
            description:
              "App\u00a0Store로 설치해 책상에서도 창으로 띄워\u00a0써요.",
            requirement: "macOS\u00a012\u00a0이상 · Apple\u00a0M1\u00a0이상",
            alt: "Mac 화면의 창에 열린 아이두 할\u00a0일 목록",
          },
        },
      },
      routine: {
        kicker: "쌓인 기록에서 다음 한 걸음",
        title: "한 주를 돌아보고, 알림은 내 하루에 맞게",
        reportTitle: "AI 주간·월간 리포트",
        reportDescription:
          "달성률과 카테고리별 기록, 요일별 패턴을 한눈에\u00a0돌아봐요.",
        reportAlt:
          "주간 달성률 100%, 완료 25개, 연속 7일과 카테고리별 분석이 보이는 아이두 AI 리포트\u00a0화면",
        reminderTitle: "리마인드 알림",
        reminderDescription:
          "아침과 저녁에 오늘 할\u00a0일을 알려줘요. 프리미엄에서는 원하는 시간으로 바꿀 수\u00a0있어요.",
        reminderAlt:
          "푸시 알림, 날씨 알림, 오전 8시와 오후 7시 리마인드 알림이 켜진 아이두 알림 설정\u00a0화면",
        premiumLabel: "프리미엄",
      },
      premium: {
        kicker: "더 쓰고 싶어지면",
        title: "프리미엄이면 더 넉넉하게",
        description:
          "기본 기능은 무료예요. 프리미엄에서는 이런 혜택이\u00a0더해져요.",
        note: "구독 가격과 자세한 조건은 앱에서 확인할 수 있어요.",
        benefits: [
          {
            id: "aiParsing",
            title: "AI 할\u00a0일 만들기 넉넉하게",
            description:
              "무료 월 10회에서 프리미엄 월 1,000회까지 넉넉하게\u00a0써요",
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
            description: "내 할\u00a0일 달성률과 패턴을 한눈에 확인해요",
          },
          {
            id: "aiRepeat",
            title: "AI 반복 제안",
            description: "반복되는 할\u00a0일을 AI가 자동으로 제안해요",
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
        "말하면 AI가 할\u00a0일 여러 개로 나누고 날짜·시간·반복을 채우는 말로 할\u00a0일\u00a0만들기",
        "회의·수업 녹음을 AI가 요약하고 할\u00a0일을 찾아 주는 말로\u00a0메모하기",
        "친구와 할\u00a0일을 나누고 콕과 댓글로 응원하기",
        "친구 초대와 12칸 발자국 판",
        "iOS·Android 홈 화면 위젯",
        "iPhone\u00a0Duo·폴더블·iPad 두 칸 화면",
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
            "이름이나 해시태그로 친구를 연결하고 공개한 할\u00a0일을 서로 살펴봐요. 콕 찌르기와 댓글로 응원하고, 할\u00a0일을 마치면 응원해 준 친구에게 고마움을\u00a0전해요.",
        },
        {
          question: "아이두는 무료로 사용할 수 있나요?",
          answer:
            "네, 무료로 시작할 수 있어요. 기본 할\u00a0일 관리와 캘린더, 친구 기능을 이용하고, AI 정리 등 일부 기능은 사용 한도가 있어요. 프리미엄에서는 AI 리포트와 반복 제안, 고양이 아이콘 변경과 더 넉넉한 사용 범위를 제공해요. 구독 가격과 상세 조건은 앱에서 확인할 수\u00a0있어요.",
        },
        {
          question: "AI가 메모와 음성을 어떻게 정리해주나요?",
          answer:
            "할\u00a0일 추가 시트의 마이크를 누르고 길게 말하면, AI가 할\u00a0일 여러 개로 나누고 날짜·시간·반복까지 채워요. 적어 둔 메모는 ‘AI로 할\u00a0일 나누기’로 나눌 수 있어요. 추가하기 전에 하나씩 확인하고 고칠 수 있고, 회의나 수업은 말로 메모하기로 녹음하면 요약과 할\u00a0일을 찾아\u00a0줘요.",
        },
        {
          question: "매일 반복되는 할\u00a0일도 만들 수 있나요?",
          answer:
            "네. 매일, 주중, 주말 또는 원하는 요일을 골라 반복 할\u00a0일을 만들 수 있어요. 시작일과 종료일을 정하고 주간·월간 캘린더에서 일정을 확인해요. AI 반복 제안은 프리미엄\u00a0기능이에요.",
        },
        {
          question: "친구 없이 혼자 사용해도 괜찮나요?",
          answer:
            "물론이에요. 혼자서도 메모, 할\u00a0일, 캘린더로 하루를 정리할 수 있어요. 함께하고 싶을 때 친구를 찾아 콕 찌르기와 댓글로 응원해\u00a0보세요.",
        },
        {
          question: "모든 할\u00a0일이 친구에게 보이나요?",
          answer:
            "할\u00a0일마다 공개 범위를 선택할 수 있어요. 친구는 공개한 할\u00a0일을 볼 수 있고, 비공개로 설정한 할\u00a0일은 공유되지 않아요. 생성하거나 수정할 때 공개 설정을 확인해\u00a0주세요.",
        },
        {
          question: "어떤 기기에서 쓸 수 있나요?",
          answer:
            "iPhone과 iPad(iOS·iPadOS\u00a016.4 이상)는 App\u00a0Store에서, Android 폰과 태블릿(Android\u00a07.0 이상)은 Google\u00a0Play에서 받을 수 있어요. Apple\u00a0M1 이상 칩을 쓰는 Mac(macOS\u00a012 이상)에서도 App\u00a0Store로 설치하면 iPad용 앱이 창으로 열려요. iPhone\u00a0Duo나 폴더블 폰을 펼치거나 태블릿에서 쓰면 목록과 상세를 나란히 볼 수 있고, 홈 화면 위젯은 iOS와 Android에서 쓸 수 있어요. 앱과 이 웹사이트는 한국어와 영어를\u00a0지원해요.",
        },
        {
          question: "친구를 초대하면 어떤 보상을 받나요?",
          answer:
            "가입한 지 7일 안의 친구가 초대를 수락하면 친구는 바로 프리미엄 7일을 받아요. 나는 친구가 가입하고 14일 안에 2일 동안 할\u00a0일을 끝내면(하루에 여러 개를 끝내도 1일로 세요) 프리미엄 7일을 받고, 친구를 1명 더 추가할 수 있어요. 보상은 앱 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없어요. 초대해서 내가 받는 프리미엄은 30일 동안 최대 30일, 전체 최대 90일까지예요. 자세한 조건은 이용약관 제13조의2에\u00a0있어요.",
        },
        {
          question: "계정을 삭제하려면 어떻게 하나요?",
          answer:
            "앱의 마이 탭 가장 아래 탈퇴하기에서 바로 삭제할 수 있어요. 앱을 쓸 수 없다면 계정 삭제 요청 안내 페이지를 보고 이메일로 요청해 주세요. 구독은 계정을 지워도 자동으로 해지되지 않으니 스토어에서 먼저 해지해\u00a0주세요.",
        },
      ],
    },
    cta: {
      titleLineOne: "오늘 하나부터,",
      titleLineTwo: "친구와 함께 시작해요",
      description:
        "서로의 할\u00a0일을 나누고 응원하며 오늘의 계획을 하나씩\u00a0해내요.",
      closingNote:
        "무료로 시작해요. 일부 기능은 프리미엄 구독이\u00a0필요해요.",
      devices: "iPhone · iPad · Mac(Apple\u00a0실리콘) ·\u00a0Android",
      channelsLabel: "설치 전에 먼저 구경해\u00a0볼래요?",
      youtubeLabel: "유튜브에서 영상 보기",
      linkHubLabel: "공식 링크 모아보기",
    },
    storeButtons: {
      ariaLabel: "앱 다운로드 링크",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
      newTabLabel: "새 창에서 열려요",
    },
    invite: {
      metaTitle: "친구 초대",
      metaDescription:
        "친구가 아이두에 초대했어요. 앱을 설치하고 가입하면 프리미엄 7일을\u00a0받아요.",
      brandLabel: "아이두 친구 초대",
      loadingLabel: "초대 정보를 불러오는 중이에요",
      titleTemplate: "{name}님이 아이두에 초대했어요",
      titleFallback: "친구가 아이두에 초대했어요",
      lead: "함께 시작하면 서로의 할\u00a0일을 응원하며 하루를 끝낼 수\u00a0있어요.",
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
      codeManualStatus:
        "자동 복사가 막혔어요. 코드를 길게 눌러 복사해\u00a0주세요.",
      codeHint:
        "앱을 설치한 뒤 가입할 때 이 코드를 입력해요. 안드로이드는 자동으로\u00a0채워져요.",
      outdatedNote:
        "이미 아이두를 쓰고 있나요? 앱을 최신 버전으로 업데이트한 뒤 이 링크를 다시 열어\u00a0주세요.",
      rewardTermsNote:
        "가입한 지 7일 안에 초대를 수락하면 받아요. 앱 안에서만 쓰는 프리미엄이라 현금으로 바꿀 수 없고, 이미 보상을 받은 기기나 계정은 받을 수\u00a0없어요.",
      rewardTermsLink: "초대 보상 조건 보기",
      retry: "다시 시도",
      errors: {
        invalidCode: {
          title: "초대 링크를 확인해\u00a0주세요",
          description:
            "링크가 잘리거나 바뀐 것 같아요. 친구에게 링크를 다시 받아\u00a0보세요.",
        },
        notFound: {
          title: "초대 코드를 찾을 수 없어요",
          description:
            "코드를 다시 확인하거나 친구에게 새 링크를 받아\u00a0보세요.",
        },
        changed: {
          title: "친구가 초대 링크를 새로 만들었어요",
          description:
            "이 링크는 더는 쓸 수 없어요. 친구에게 최신 링크를 받아\u00a0보세요.",
        },
        unavailable: {
          title: "지금은 초대를 받을 수 없어요",
          description:
            "잠시 뒤에 다시 열어 주세요. 아이두는 먼저 설치해도\u00a0좋아요.",
        },
        unknown: {
          title: "친구 정보를 불러오지 못했어요",
          description:
            "코드는 그대로 쓸 수 있어요. 잠시 뒤에 다시 열어도\u00a0좋아요.",
        },
        renderError: {
          title: "초대 화면을 보여 주지 못했어요",
          description: "다시 시도하거나 잠시 뒤에 링크를 다시 열어 주세요.",
        },
      },
    },
    footer: {
      copyright: "© 2026 Aido. All rights reserved.",
      tagline: "친구와 함께, 할\u00a0일을 해내요.",
      serviceTitle: "서비스",
      policyTitle: "정책·도움말",
      linkHubTitle: "링크 모음",
      linkHubLabel: "공식 링크 모음",
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
      youtubeLabel: "유튜브",
      externalLinkLabel: "새 창에서 열려요",
    },
    legal: {
      badge: "약관·정책",
      viewTermsLabel: "이용약관 보기",
      viewPrivacyLabel: "개인정보처리방침 보기",
      privacyTitle: "개인정보처리방침",
      privacyDescription:
        "Aido 서비스 이용 시 처리되는 개인정보에 대해\u00a0안내합니다.",
      termsTitle: "이용약관",
      termsDescription:
        "Aido 서비스 이용 조건, 결제 및 자동 갱신, 이용자 권리와 책임을\u00a0안내합니다.",
      accountDeletionTitle: "계정 삭제 요청",
      accountDeletionDescription:
        "아이두 계정을 앱에서 삭제하는 방법과 앱 없이 이메일로 삭제를 요청하는 방법, 삭제·보관되는 정보를\u00a0안내합니다.",
    },
    patchNotes: {
      kicker: "조금씩 자라는 아이두",
      title: "패치노트",
      description:
        "아이두가 조금씩 달라지고 있어요. 앱 업데이트와, 따로 설치할 필요\u00a0없는 서비스\u00a0개선 소식을\u00a0모았어요.",
      appUpdate: "앱 업데이트",
      serviceUpdate: "서비스 개선",
      noAppUpdateNeeded: "앱을 따로 업데이트하지 않아도 적용돼요.",
      updateSummary: "업데이트 요약",
      copySummary: "요약 복사",
      summaryCopied: "요약을 복사했어요.",
      copySummaryFallback:
        "아래 문구를 선택해 직접 복사해 주세요. 줄바꿈도 함께\u00a0복사돼요.",
      bugFixes: "고친 문제",
      features: "새로운 기능",
      improvements: "더 편해진 부분",
      newRelease: "첫 출시",
      latest: "최신",
      archiveTitle: "지난 업데이트",
      archiveDescription:
        "앱 업데이트와 서비스 개선을 월별로 모아뒀어요. 궁금한 기록을\u00a0펼쳐보세요.",
      releaseCount: "업데이트 {count}개",
      releaseCountOne: "업데이트 1개",
      expand: "자세히 보기",
      collapse: "접기",
      initialNote:
        "아이두의 첫 번째 출시 기록이에요. 함께 시작해주셔서\u00a0고마워요.",
      closingNote: "더 좋은 하루를 위해, 조금씩 다듬고 있어요. 🐾",
      highlightsLink: "실제 화면으로 자세히 보기",
    },
    releaseHighlights: {
      breadcrumbLabel: "패치노트",
      releasedLabel: "출시일",
      contentsLabel: "이번 업데이트 한눈에 보기",
      screenNote: "실제 앱 화면이에요",
      freeLabel: "무료",
      premiumLabel: "프리미엄",
      featureLabel: "기능",
      allNotesTitle: "바뀐 점을 모두 보고 싶다면",
      allNotesDescription:
        "고친 문제와 작은 개선까지 패치노트에 빠짐없이\u00a0적어\u00a0뒀어요.",
      allNotesLink: "전체 패치노트 보기",
    },
    languageSwitcher: {
      ko: "KO",
      en: "EN",
      navLabel: "언어 선택",
    },
    theme: {
      label: "화면 모드",
      toggle: "화면 모드 바꾸기",
      light: "밝게",
      dark: "어둡게",
      system: "기기 설정대로",
    },
  },
  en: {
    services: {
      screenshotNote:
        "Captured in the real iOS and Android apps with example accounts. Names and plans are sample\u00a0data.",
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
            "Tap a date to see its to-dos, then return with\u00a0Today.",
            "Category colors keep plans clear. A little paw print marks a day you finished.",
          ],
          captions: [
            "Weekly calendar and today’s\u00a0to-dos",
            "A month of plans at a glance",
          ],
        },
        todos: {
          navigationLabel: "To-dos",
          title: "Big plans, small steps",
          description:
            "Give a to-do a date, time, repeat schedule and checklist.",
          details: [
            "Break a plan into checklist items you can work\u00a0through.",
            "Repeat daily, on weekdays or weekends, or on days you\u00a0choose.",
            "Choose who can see each to-do. Some plans can stay just\u00a0yours.",
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
            "Keep a note for now. Turn it into a to-do when you’re\u00a0ready.",
          details: [
            "Pin the notes you return to and arrange them your\u00a0way.",
            "Turn a note into one to-do, or let AI split it into\u00a0several.",
          ],
          captions: [
            "Pinned notes and your notes list",
            "A note, ready to become a\u00a0to-do",
          ],
        },
        ai: {
          navigationLabel: "AI to-dos",
          title: "Say it or jot it down as you\u00a0think",
          description:
            "AI splits what you say or a note you wrote into several\u00a0to-dos.",
          details: [
            "Speak to add: talk, and AI splits it into to-dos with dates, times and repeats filled\u00a0in.",
            "Tap Split into to-dos with AI on a note and pick what to add on the same\u00a0screen.",
            "Free includes 10 a month and Premium up to 1,000 a month. The AI chip shows uses\u00a0left.",
          ],
          captions: [
            "Picking from the to-dos AI split from what you\u00a0said",
            "A note AI split into 4\u00a0to-dos",
          ],
        },
        friends: {
          navigationLabel: "Friends",
          title: "A little company for your day",
          description: "Share to-dos with friends with nudges and comments.",
          details: [
            "Find friends by name or their unique\u00a0hashtag.",
            "Send a nudge or leave comments and replies on a friend’s\u00a0to-do.",
            "Keep track of your encouragement in Sent\u00a0nudges.",
          ],
          captions: [
            "A friend’s calendar and shared\u00a0to-dos",
            "The nudges you’ve sent",
          ],
        },
        nudges: {
          navigationLabel: "Encouragement",
          title: "A reply for now. A little thanks when you’re\u00a0done.",
          description:
            "Reply to a nudge, then share your thanks after finishing a\u00a0to-do.",
          details: [
            "Choose the reply that fits: I’ll get started, thanks for cheering me on, or I’ll do it\u00a0later.",
            "See who encouraged you and send the good news with your\u00a0thanks.",
            "Sending a reply does not complete the\u00a0to-do.",
          ],
          captions: [
            "A friend’s nudge and three ways to\u00a0reply",
            "Saying thanks to friends who cheered you\u00a0on",
          ],
        },
        notifications: {
          navigationLabel: "Notifications",
          title: "Friendly news and gentle reminders",
          description:
            "Find what matters in your notifications and open the right\u00a0screen.",
          details: [
            "Keep friends’ updates and nudges together in the Friends\u00a0tab.",
            "Set morning, evening and weather reminder times around your\u00a0day.",
            "Choose which alerts you want, including promotional notification\u00a0consent.",
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
            "Check the weather for your location alongside your\u00a0plans.",
          details: [
            "Open hourly and 10-day forecasts from the weather button at\u00a0home.",
            "Location access is your choice. To-dos keep working while weather is unavailable.",
            "Weather works anywhere in the world, and Aido briefing matches today’s to-dos with the\u00a0forecast.",
          ],
          captions: [
            "Current weather and hourly forecasts",
            "Weather in the Android app",
          ],
        },
        widgets: {
          navigationLabel: "Widgets",
          title: "Today at a glance, right on your home\u00a0screen",
          description:
            "Choose a small progress view or a calendar with room for your\u00a0plans.",
          details: [
            "Small widgets show completed to-dos, progress and your\u00a0streak.",
            "Medium widgets show today’s to-dos. Large widgets add a weekly calendar.",
            "Tap a to-do to open it in Aido, or start a new one with the add\u00a0button.",
            "Widget refresh timing depends on your device and operating\u00a0system.",
          ],
          captions: [
            "Aido widgets on an iPhone home\u00a0screen",
            "The weekly calendar widget on Android",
            "Small and medium widgets on Android",
          ],
        },
        insights: {
          navigationLabel: "Reports & suggestions",
          title: "Look back on your days. Find your next\u00a0step.",
          description:
            "Reflect on your patterns with AI reports and recurring suggestions.",
          details: [
            "Weekly and monthly reports show completion rates and category patterns.",
            "Review recurring suggestions and add the ones that fit your\u00a0routine.",
            "The report and suggestions below are examples for this walkthrough.",
          ],
          captions: [
            "The sample weekly report available in the\u00a0app",
            "Example recurring suggestions to accept or\u00a0skip",
          ],
        },
        personal: {
          navigationLabel: "Make it yours",
          title: "Your cat. Your Aido.",
          description: "Make the app feel like you from My\u00a0Page.",
          details: [
            "Choose your profile from nine different\u00a0cats.",
            "Set light or dark mode, text size and your app language.",
            "Premium also lets you change the app icon on iOS and\u00a0Android.",
          ],
          captions: [
            "Choosing a profile from nine cats",
            "Choosing an icon for your home\u00a0screen",
            "Today’s to-dos in dark mode",
          ],
        },
      },
    },
    analyticsConsent: {
      title: "Visit stats cookies",
      description:
        "We use visit stats to make Aido better. If you allow it, Google\u00a0Analytics uses cookies to recognize return\u00a0visits.",
      accept: "Allow",
      reject: "Decline",
      privacy: "Learn more",
      settings: "Cookie settings",
      storageError: "We couldn’t save your choice, so cookies stay\u00a0off.",
      privacySignal:
        "We’re following your browser’s do-not-track setting, so cookies stay\u00a0off.",
      close: "Close",
    },
    featureGuides: {
      title: "Start using Aido with friends",
      description:
        "Connect with friends and share your plans. Learn how recurring to-dos and AI planning can help,\u00a0too.",
      readGuide: "Read the guide",
      viewAll: "See all features",
      breadcrumbLabel: "Features",
      screenNote: "Real app screens",
      stepsTitle: "Start with these steps",
      exampleTitle: "Try it in your day",
      plansTitle: "Start free, with more room when you need\u00a0it",
      freeLabel: "Free",
      premiumLabel: "Premium",
      plansNote:
        "Check the app for current subscription prices and full\u00a0terms.",
      rewardsTitle: "Who gets what, and when",
      rewardsLimitsTitle: "Good to know",
      pawBoardLabel: "Paw print board",
      layoutTitle: "From top to bottom",
      casesTitle: "Real screens, case by case",
      casesDescription:
        "Rain, heat, clear skies, abroad and offline: here’s what the weather screen tells you in each\u00a0case.",
      briefingTitle: "What Aido briefing tells you, and when",
      briefingWhenLabel: "When",
      briefingShowsLabel: "What you see",
      scenesTitle: "18 kinds of weather, in motion",
      scenesDescription:
        "From rain, snow, and hail to thunderstorms, fog, heat, and freezing cold, the sky moves just like the real thing. The sun shows by day and the moon by night. Every scene is recorded in the app (Korean\u00a0UI).",
      dayLabel: "Day",
      nightLabel: "Night",
      devicesTitle: "Room to breathe on bigger screens",
      devicesDescription:
        "Beyond iPhone and Android, bigger screens like iPhone\u00a0Duo and iPad show current weather and forecasts side by side. Unfold a foldable for two roomy panes,\u00a0too.",
      storyTitle: "See it in action",
      storyDescription:
        "Recorded straight from the app: opening replies, writing a reply above the keyboard, leaving a heart, and jumping to a comment from a\u00a0notification.",
      videoNote: "Silent, looping recordings of the app (Korean\u00a0UI).",
      faqTitle: "Questions",
      relatedTitle: "More ways to use Aido",
      relatedDescription: "Find the next feature that fits your\u00a0day.",
      updatedLabel: "Content reviewed",
      guides: {
        "todo-calendar": {
          kicker: "Your day at a glance",
          title: "Plan your day and month with to-dos and a\u00a0calendar",
          summary:
            "Aido is a to-do list app where you jot down tasks and see them in weekly and monthly calendar views. Pick the date, time, repeat and category with quick chips, and break bigger tasks into checklists. Keep personal tasks private and they won’t show up for\u00a0friends.",
          cardDescription:
            "Write to-dos and see your plans by week or month. Break big tasks into\u00a0checklists.",
          steps: [
            {
              title: "Tap + and write a to-do",
              body: "On the To-dos tab, open the add sheet and type into “What do you want to do?”. Tap + next to a category name to add straight into that\u00a0category.",
            },
            {
              title: "Pick the date, time and repeat with\u00a0chips",
              body: "The chips under the text field set the date (today, tomorrow…), all-day or a time, repeat, visibility and category. Everything you pick shows on the chips, so you can check it at a glance before\u00a0saving.",
            },
            {
              title: "Switch between week and\u00a0month",
              body: "Use the Week/Month toggle above the calendar and the arrows to move between weeks. Tap a date to see that day’s to-dos, and tap Today to jump\u00a0back.",
            },
            {
              title: "Check things off",
              body: "Tap the round checkbox to complete a to-do. Open a to-do to see its checklist and comments, and use More (⋯) to edit, change the date, time or category, or delete\u00a0it.",
            },
          ],
          example: {
            introduction:
              "For something with lots of parts, like packing for a\u00a0trip:",
            items: [
              "To-do: Make a packing list for Jeju · 5:00 PM ·\u00a0Life",
              "Checklist: charger and power bank, sunscreen and sunglasses, film camera, call Dubu’s pet\u00a0sitter",
              "The progress bar fills up as you go: 2/4, then\u00a03/4.",
            ],
            note: "An example to show how it works. Names and to-dos on screen come from a sample\u00a0account.",
          },
          details: [
            {
              title: "Group your day with\u00a0categories",
              body: "Create categories such as Work, Exercise and Life, and the home screen groups to-dos under them. Rename and reorder them in My > Manage\u00a0categories.",
            },
            {
              title: "Private to-dos are just for\u00a0you",
              body: "Tap the visibility chip and switch to Private while adding a to-do, and it won’t appear in your friends’ feed. Handy for things like a doctor’s\u00a0appointment.",
            },
            {
              title: "Break big tasks into a\u00a0checklist",
              body: "Add sub-to-dos to a to-do, tick them off one by one in its details, and see the progress right on the home\u00a0screen.",
            },
            {
              title: "Or just say it",
              body: "Tap the mic in the add sheet and say something like “gym tomorrow at 7 AM”. AI fills in the date and time and turns it into a\u00a0to-do.",
            },
          ],
          plans: {
            free: "Adding and checking off to-dos, weekly and monthly calendars, repeats, checklists and private to-dos are all free. You can create up to 3\u00a0categories.",
            premium:
              "Create up to 30 categories and use AI to-do creation up to 1,000 times a\u00a0month.",
          },
          faq: [
            {
              question: "Can I change a to-do’s\u00a0date?",
              answer:
                "Yes. Open More (⋯) on the to-do and choose Change date or Change time. For repeating to-dos, choose whether to change just this one or this and the following\u00a0ones.",
            },
            {
              question: "Can friends see all of my\u00a0to-dos?",
              answer:
                "Only public to-dos appear in your friends’ feed. Private ones are visible only to\u00a0you.",
            },
            {
              question: "Does the calendar start on\u00a0Sunday?",
              answer:
                "Yes. The weekly and monthly calendars run Sunday to Saturday, and the weekly view shows which week of the month you’re\u00a0in.",
            },
          ],
          screens: [
            {
              alt: "Aido home screen with a weekly calendar and to-dos grouped under Work, Exercise and Life, including checklist progress (Korean\u00a0UI)",
              caption: "Today’s to-dos, grouped by\u00a0category",
            },
            {
              alt: "Aido add sheet with “Book a dentist appointment” and chips for tomorrow, 9:00 AM, weekdays and private (Korean\u00a0UI)",
              caption: "Pick date, time, repeat and visibility with\u00a0chips",
            },
            {
              alt: "Aido monthly calendar for November 2026 with to-do markers under each date (Korean\u00a0UI)",
              caption: "See the whole month",
            },
            {
              alt: "Aido to-do details for a Jeju packing list with 2 of 4 checklist items done (Korean\u00a0UI)",
              caption: "Break big tasks into a\u00a0checklist",
            },
          ],
        },
        memo: {
          kicker: "From scribbles to to-dos",
          title: "Write notes and split them into to-dos with\u00a0AI",
          summary:
            "The Notes tab in Aido is a place for thoughts that aren’t to-dos yet: meeting notes, shopping lists, books to read. When you’re ready, tap Split into to-dos with AI and it finds the tasks in your note and turns them into to-dos with\u00a0dates.",
          cardDescription:
            "Keep ideas in notes, and let AI split them into to-dos when you’re\u00a0ready.",
          steps: [
            {
              title: "Tap + on the Notes tab",
              body: "Open Notes from the bottom tabs and tap + in the top corner to write a new note. The first line becomes its title, and notes are shown as\u00a0cards.",
            },
            {
              title: "Pin the important ones",
              body: "Tap the pin at the top of a note to keep it first in the list. On iPhone, touch and hold a note card to preview it and unpin or delete it right\u00a0there.",
            },
            {
              title: "More (⋯) > Split into to-dos with\u00a0AI",
              body: "Open a note and choose Split into to-dos with AI from More. AI finds the tasks in your note and fills in dates and\u00a0times.",
            },
            {
              title: "Check what you want and\u00a0add",
              body: "Only checked items are added. Tap the pencil to fix a title or date, then tap Add N to-dos to send them to your To-dos\u00a0tab.",
            },
          ],
          example: {
            introduction: "Say you jotted this down after a\u00a0meeting:",
            items: [
              "Note: Design review follow-ups: rewrite onboarding step 2 copy (by Friday), write up dark-mode contrast issues for Jihoon, set up a follow-up review next Tuesday at 3 PM, make a comparison of 3 icon\u00a0drafts",
              "AI split it into 4 to-dos: rewrite onboarding copy (Nov 12 to 13), write up contrast issues (today), follow-up review (Nov 17, 3:00 PM), icon draft comparison\u00a0(today)",
              "Uncheck anything you don’t need and tap Add 4\u00a0to-dos.",
            ],
            note: "A real result from a sample note in the app. AI results depend on what you write, so check them before\u00a0adding.",
          },
          details: [
            {
              title: "For long talks, use Voice\u00a0note",
              body: "Tap Voice note on the Notes tab to record a meeting or class. AI writes a summary, key points and to-dos. The recording stays on your device and is never sent to Aido’s\u00a0servers.",
            },
            {
              title: "Turning a note into one\u00a0to-do",
              body: "To move a whole note into a single to-do, use Turn into a to-do from More. Use AI splitting only when you want several\u00a0to-dos.",
            },
            {
              title: "We tell you before anything goes to\u00a0AI",
              body: "The first time you use AI, a consent sheet shows what is sent and where. Tap Later and nothing is\u00a0sent.",
            },
          ],
          plans: {
            free: "Writing and pinning notes is free. AI splitting shares a monthly limit of 10 with speak-to-add, and Voice note can be used 3 times a month (up to 3 minutes\u00a0each).",
            premium:
              "Split notes with AI up to 1,000 times a month and use Voice note 100 times a month (up to 30 minutes\u00a0each).",
          },
          faq: [
            {
              question: "Can friends see my notes?",
              answer:
                "No. Notes are only visible to you. Once you move something into a to-do, you choose its visibility\u00a0separately.",
            },
            {
              question: "Where are Voice note recordings\u00a0stored?",
              answer:
                "Recordings are saved on your device and never sent to Aido’s servers. Only the transcribed text is used for\u00a0AI.",
            },
            {
              question: "What if I don’t like the AI\u00a0result?",
              answer:
                "Uncheck items or edit them with the pencil before adding. If AI can’t split the note, it doesn’t count toward your\u00a0limit.",
            },
          ],
          screens: [
            {
              alt: "Aido Notes tab with note cards for design review follow-ups, birthday gift ideas and vet questions (Korean\u00a0UI)",
              caption: "The Notes tab, for whatever’s on your\u00a0mind",
            },
            {
              alt: "Aido note details for a design review follow-up note with four lines of tasks (Korean\u00a0UI)",
              caption: "Pin a note or open More from its\u00a0details",
            },
            {
              alt: "Aido screen where AI split a note into 4 to-dos with dates and times filled in (Korean\u00a0UI)",
              caption: "AI split the note into 4\u00a0to-dos",
            },
          ],
        },
        nudge: {
          kicker: "A little poke goes a long\u00a0way",
          title: "Nudge friends and cheer on their\u00a0to-dos",
          summary:
            "Nudge lets you send a quick bit of encouragement on a friend’s to-do. Pick a friend, tap the paw and they get a notification with your message. They can reply with “I’ll start now” or “Thanks for the cheer”. Things you keep putting off get easier to start when someone’s rooting for\u00a0you.",
          cardDescription:
            "Poke a friend’s to-do with a quick cheer and get a reply\u00a0back.",
          steps: [
            {
              title: "Pick a friend at the top of\u00a0home",
              body: "Tap a friend in the row at the top of the To-dos tab to see their public to-dos. A banner asks “Send your friend a\u00a0nudge?”.",
            },
            {
              title: "Tap the paw to send a\u00a0nudge",
              body: "Tap the paw on the banner to open the nudge sheet. Adding a message is optional. Tap Send cheer and your friend gets a\u00a0notification.",
            },
            {
              title: "Your friend picks a reply",
              body: "Whoever receives the nudge can reply with “I’ll start now”, “Thanks for the cheer” or “I’ll do it a bit later”. Replies are only visible to the person who sent the\u00a0nudge.",
            },
          ],
          example: {
            introduction:
              "Spot something a friend has been putting off? Give it a little\u00a0poke.",
            items: [
              "Jihoon → me: “Go at your own pace, I’m rooting for you! Show me the gift once you pick\u00a0it!”",
              "The cheer links to the “Pick Seoyeon’s birthday gift” to-do, so it’s one tap\u00a0away.",
              "I reply “I’ll start now” and get\u00a0going.",
            ],
            note: "Screens from a sample account. You can write any message you\u00a0like.",
          },
          details: [
            {
              title: "Replying doesn’t complete the\u00a0to-do",
              body: "A reply never marks the to-do as done. Changing your reply doesn’t notify your friend again, so pick\u00a0freely.",
            },
            {
              title: "See nudges you sent",
              body: "In Notifications > Friends > Sent nudges, see who you nudged, when, and how they\u00a0replied.",
            },
            {
              title: "If a nudge feels like too\u00a0much",
              body: "Use More (⋯) on the received cheer to report or block. Manage blocked people in My > Blocked\u00a0users.",
            },
          ],
          plans: {
            free: "Send up to 3 nudges a day and add up to 5\u00a0friends.",
            premium:
              "Send as many nudges as you like and add friends without the 5-friend\u00a0limit.",
          },
          faq: [
            {
              question: "Can I nudge someone who isn’t my\u00a0friend?",
              answer:
                "No. Nudges only go to people you’re friends with. Add friends first by name or\u00a0hashtag.",
            },
            {
              question: "Do I have to write a\u00a0message?",
              answer:
                "No. You can send it blank. If you write one, it appears under the cheer\u00a0title.",
            },
            {
              question: "What about nudges late at\u00a0night?",
              answer:
                "In My > Notification settings > Push notifications, turn off Night-time push and you won’t get friend notifications from 9 PM to 8\u00a0AM.",
            },
          ],
          screens: [
            {
              alt: "Aido home with friend Jihoon selected and a banner asking to send a nudge (Korean\u00a0UI)",
              caption: "Pick a friend and the nudge banner\u00a0appears",
            },
            {
              alt: "Aido sheet for writing a message and sending a nudge to Jihoon (Korean\u00a0UI)",
              caption: "Add a message and send your\u00a0cheer",
            },
            {
              alt: "Aido screen showing a cheer from Jihoon, the linked to-do and reply options (Korean\u00a0UI)",
              caption: "Pick a reply to the cheer you\u00a0got",
            },
          ],
        },
        reminders: {
          kicker: "Forgetful? That’s okay",
          title: "Never miss a to-do with\u00a0reminders",
          summary:
            "Aido sends a morning reminder with today’s to-dos and an evening reminder with what’s left. Nudges, cheers, comments and AI suggestions from friends gather in your notifications by tab, and weather alerts give you a heads-up about tomorrow’s\u00a0rain.",
          cardDescription:
            "Morning and evening reminders plus one inbox for to-dos and\u00a0friends.",
          steps: [
            {
              title: "Allow notifications once",
              body: "Allow notification permission on the screen right after sign-up. You can also turn them on later in My > Notification settings > Push\u00a0notifications.",
            },
            {
              title: "Get morning and evening\u00a0reminders",
              body: "The morning reminder lists today’s to-dos, and the evening reminder lists what’s still left. By default they arrive at 8 AM and 7\u00a0PM.",
            },
            {
              title: "See everything in\u00a0Notifications",
              body: "Tap the bell at the top right of home. Browse by All, Announcements, To-dos and Friends, and clear everything with Mark all as\u00a0read.",
            },
          ],
          example: {
            introduction: "A day with Aido might look like\u00a0this:",
            items: [
              "8:00 AM · You have 3 to-dos today (morning\u00a0reminder)",
              "2:00 PM · Jihoon sent you a cheer and a message (Friends\u00a0tab)",
              "7:00 PM · Here’s what’s still left (evening\u00a0reminder)",
            ],
            note: "Example messages and times. Depending on your device settings, notifications may arrive late or be\u00a0grouped.",
          },
          details: [
            {
              title: "Weather alerts, too",
              body: "Turn on Notification settings > Weather alerts to get today’s weather in the morning and tomorrow’s in the evening. Tap each to set its\u00a0time.",
            },
            {
              title: "24-hour time",
              body: "Turn on 24-hour time under Time display in Notification settings to show times like 14:00 across the\u00a0app.",
            },
            {
              title: "Not getting\u00a0notifications?",
              body: "Check that Aido is allowed in your device’s notification settings and that a Focus mode isn’t\u00a0on.",
            },
          ],
          plans: {
            free: "8 AM and 7 PM reminders, the notification inbox and weather alerts are\u00a0free.",
            premium:
              "Change your reminder times to fit your day, like 6:30 AM and 10\u00a0PM.",
          },
          faq: [
            {
              question: "I want fewer notifications at\u00a0night.",
              answer:
                "Turn off Night-time push in push settings to skip offer and friend notifications from 9 PM to 8 AM. Reminders you set yourself still arrive on\u00a0time.",
            },
            {
              question: "Do notifications reach all my\u00a0devices?",
              answer:
                "Yes. With push notifications on, to-do and payment notifications reach every device signed in to your\u00a0account.",
            },
            {
              question: "Will I get ads?",
              answer:
                "Promotional notifications only come if you turn on marketing consent separately. You can turn it off anytime in push\u00a0settings.",
            },
          ],
          screens: [
            {
              alt: "Aido notifications with 7 unread items including AI suggestions, nudges, achievements and cheers (Korean\u00a0UI)",
              caption: "Notifications, grouped by\u00a0tab",
            },
            {
              alt: "Aido reminder settings with a morning reminder at 8:00 AM and an evening reminder at 7:00 PM (Korean\u00a0UI)",
              caption: "Morning and evening reminder\u00a0times",
            },
            {
              alt: "Aido weather alert settings with a morning alert at 7:00 AM and an evening alert at 5:30 PM (Korean\u00a0UI)",
              caption:
                "Today’s weather in the morning, tomorrow’s in the\u00a0evening",
            },
          ],
        },
        "ai-report": {
          kicker: "Time to look back",
          title: "Review your to-do patterns with AI\u00a0reports",
          summary:
            "Aido’s AI report looks at a week or a month of your to-dos and shows your completion rate, progress by category, patterns by weekday and your most active hours, plus a short summary. When you keep doing the same thing, AI suggests turning it into a repeating\u00a0to-do.",
          cardDescription:
            "Weekly and monthly reports on your progress, plus AI repeat\u00a0suggestions.",
          steps: [
            {
              title: "Open AI report from the My\u00a0tab",
              body: "Go to My > Records > AI report to see how many days are left until your next weekly and monthly reports, like\u00a0D-4.",
            },
            {
              title: "Read weekly or monthly",
              body: "Weekly reports arrive every week and monthly reports every month. Check your completion rate, finished to-dos and streak, then tap See\u00a0details.",
            },
            {
              title: "Plan around your patterns",
              body: "Look at categories, weekdays and active hours, and put important tasks on the days and times that work best for\u00a0you.",
            },
            {
              title: "Accept AI repeat\u00a0suggestions",
              body: "If you’ve done the same thing several times, AI suggests a repeating to-do such as “Trim Dubu’s claws, Sat & Sun 8:30 PM”. Accept to create it or decline if it’s not for\u00a0you.",
            },
          ],
          example: {
            introduction: "Here’s what a report\u00a0includes:",
            items: [
              "Week 1 of November: 93% complete, 27 of 29 to-dos done, 6-day\u00a0streak",
              "By category: Work 7/8, Life 7/7, Exercise 6/6, Self-growth\u00a04/5",
              "Summary: “Up 8 percentage points from last week. You finished everything in Life, Exercise and\u00a0Dubu.”",
            ],
            note: "A real AI report from a sample account. Your report depends on your own\u00a0to-dos.",
          },
          details: [
            {
              title: "Weekly achievement badges",
              body: "Finish a week and you get a badge showing that week’s completion rate. Collect and share them in My >\u00a0Badges.",
            },
            {
              title: "Suggestions come with\u00a0reasons",
              body: "Each repeat suggestion shows why it was made (for example, “completed both times on Saturday and Sunday”), a confidence score and an expiry\u00a0date.",
            },
            {
              title: "We let you know",
              body: "When new AI suggestions arrive, you’ll see an AI notification in your\u00a0inbox.",
            },
          ],
          plans: {
            free: "Free users can preview a sample report to see what’s\u00a0included.",
            premium:
              "Get your own AI report every week and month, and receive AI repeat suggestions you can\u00a0accept.",
          },
          faq: [
            {
              question: "When do reports arrive?",
              answer:
                "Weekly reports arrive after each week ends, and monthly reports after each month ends. The AI report screen shows how many days are\u00a0left.",
            },
            {
              question: "Is my to-do data sent to AI\u00a0providers?",
              answer:
                "The first time you use AI, a consent sheet explains which to-do records are used. Your name, email and friend information are never sent, and you can turn AI consent off in My > Terms and\u00a0policies.",
            },
            {
              question: "Do suggestions expire?",
              answer:
                "Yes, each suggestion has an expiry date. New suggestions can arrive as you keep adding\u00a0to-dos.",
            },
          ],
          screens: [
            {
              alt: "Aido AI report screen showing D-4 until the next weekly report, D-19 until the monthly one and last week at 93% (Korean\u00a0UI)",
              caption: "Days until the next report, and the last\u00a0one",
            },
            {
              alt: "Aido weekly report for week 1 of November with 93% completion, category breakdown and weekday pattern (Korean\u00a0UI)",
              caption: "Weekly report: categories and\u00a0weekdays",
            },
            {
              alt: "Aido monthly report for October 2026 with 87% completion, 79 to-dos done and a category breakdown (Korean\u00a0UI)",
              caption: "Look back on the whole\u00a0month",
            },
            {
              alt: "Aido AI suggestions screen with 5 repeating to-do suggestions, reasons, confidence and accept or decline buttons (Korean\u00a0UI)",
              caption: "AI suggests repeating\u00a0to-dos",
            },
          ],
        },
        customize: {
          kicker: "Which cat is it today?",
          title:
            "Make Aido yours with cat app icons, themes and text\u00a0size",
          summary:
            "In Aido you can pick a home screen app icon from 9 cute cats, switch between light and dark themes, choose from five text sizes and set the language to Korean or English. Finish a week and you collect weekly achievement badges,\u00a0too.",
          cardDescription:
            "Cat app icons, dark mode and text size, set up just the way you\u00a0like.",
          steps: [
            {
              title: "My > App icon",
              body: "Choose from Default, Scottish Fold, Cheese Tabby, Black Cat, White Cat, Siamese, Russian Blue, Cream Cat and Tuxedo. Your home screen icon changes right\u00a0away.",
            },
            {
              title: "My > Theme",
              body: "Choose System, Light or Dark. System follows your device, so it’s light by day and dark at night if your device does\u00a0that.",
            },
            {
              title: "My > Text size",
              body: "Pick one of five sizes, from Extra small to Extra large. Check the preview, and the size applies to the whole app right\u00a0away.",
            },
          ],
          example: {
            introduction: "Popular ways to set things\u00a0up:",
            items: [
              "Planning at night? Dark mode is easier on the\u00a0eyes.",
              "Text feels small? Try Large or Extra\u00a0large.",
              "An icon that looks like your own cat: Cheese Tabby, Tuxedo, Russian\u00a0Blue…",
            ],
            note: "Changing the app icon is a Premium feature. Anyone can change the theme, text size and\u00a0language.",
          },
          details: [
            {
              title: "Pick your language",
              body: "In My > Language, choose System, 한국어 or English. Dates and in-app text change along with\u00a0it.",
            },
            {
              title: "Weekly achievement badges",
              body: "Finish a week to get a badge with your completion rate and number of to-dos done. See past badges in My > Badges and share them with\u00a0friends.",
            },
            {
              title: "Category order",
              body: "In My > Manage categories, rename categories and use Reorder to set the order they appear on\u00a0home.",
            },
          ],
          plans: {
            free: "Theme, text size, language and up to 3 categories are\u00a0free.",
            premium:
              "Change your home screen app icon to one of 9 cats and create up to 30\u00a0categories.",
          },
          faq: [
            {
              question: "Can I change the app icon on\u00a0Android?",
              answer:
                "Yes. On both iPhone and Android, go to My > App icon. On some devices it may take a moment to update on the home\u00a0screen.",
            },
            {
              question: "Is dark mode free?",
              answer:
                "Yes. Anyone can change the theme, text size and language. Only the app icon requires\u00a0Premium.",
            },
          ],
          screens: [
            {
              alt: "Aido app icon screen for choosing a home screen icon from 9 cats including Default, Scottish Fold and Cheese Tabby (Korean\u00a0UI)",
              caption: "Choose an app icon from 9\u00a0cats",
            },
            {
              alt: "Aido home screen in dark mode with a weekly calendar and to-dos by category (Korean\u00a0UI)",
              caption: "Easy on the eyes at night",
            },
            {
              alt: "Aido text size screen with a preview and five sizes from Extra small to Extra large (Korean\u00a0UI)",
              caption: "Five text sizes to choose\u00a0from",
            },
            {
              alt: "Aido weekly achievement badge showing 93% completion for week 1 of November, with past badges below (Korean\u00a0UI)",
              caption: "Collect a badge every\u00a0week",
            },
          ],
        },
        premium: {
          kicker: "When you want more",
          title: "Aido Free vs Premium",
          summary:
            "Aido’s to-dos, calendar, repeats, notes, friends, nudges, comments and widgets are free. Premium adds more AI to-do creation and Voice notes, weekly and monthly AI reports, AI repeat suggestions, unlimited friends and nudges, custom reminder times, 30 categories and cat app\u00a0icons.",
          cardDescription:
            "Plenty for free, more with Premium. Compare them side by\u00a0side.",
          steps: [
            {
              title: "Start for free",
              body: "Sign up and start using to-dos, the calendar, notes and friends right away. The “AI usage this month” card on the My tab shows how many AI uses you have\u00a0left.",
            },
            {
              title: "We’ll let you know at a\u00a0limit",
              body: "When you reach a free limit, like 5 friends or 3 categories, a sheet explains what changes. Inviting friends can raise some\u00a0limits.",
            },
            {
              title: "Start in My >\u00a0Subscription",
              body: "Choose yearly or monthly, and cancel anytime from your store’s subscription\u00a0settings.",
            },
          ],
          example: {
            introduction: "Premium might be worth it\u00a0if:",
            items: [
              "You use speak-to-add every day and 10 a month runs out\u00a0fast.",
              "You plan with more than 5 friends, family members or\u00a0coworkers.",
              "You want AI reports to look back on each week and\u00a0month.",
            ],
            note: "Prices vary by country and store, so please check the Subscription screen in the\u00a0app.",
          },
          details: [
            {
              title: "Earn Premium by inviting\u00a0friends",
              body: "When a friend you invited finishes their to-dos on 2 days, you get a paw print. Each paw print gives you 7 days of Premium and 1 more friend slot. Friends you invite get 7 days of Premium as soon as they sign\u00a0up.",
            },
            {
              title: "If you cancel",
              body: "You keep Premium until the end of the current period, then return to the free plan. Check your benefits in My >\u00a0Subscription.",
            },
          ],
          plans: {
            free: "To-dos, calendar, repeats, checklists, notes, 5 friends, 3 nudges a day, comments, widgets, weather and notifications are free. AI to-do creation is 10 a month and Voice notes 3 a\u00a0month.",
            premium:
              "1,000 AI to-dos a month, 100 Voice notes a month, AI reports and repeat suggestions, unlimited friends and nudges, custom reminder times, 30 categories and cat app\u00a0icons.",
          },
          comparison: {
            title: "Side by side",
            caption: "Aido Free and Premium\u00a0compared",
            featureLabel: "Feature",
            rows: [
              {
                feature: "AI to-do creation (speech, text,\u00a0notes)",
                free: "10 / month",
                premium: "1,000 / month",
              },
              {
                feature: "Voice note AI summary",
                free: "3 / month · 3 min each",
                premium: "100 / month · 30 min each",
              },
              {
                feature: "AI weekly and monthly\u00a0reports",
                free: "Sample only",
                premium: "Every week and month",
              },
              {
                feature: "AI repeat suggestions",
                free: "Not included",
                premium: "Included",
              },
              { feature: "Friends", free: "5", premium: "Unlimited" },
              { feature: "Nudges", free: "3 / day", premium: "Unlimited" },
              {
                feature: "Reminder times",
                free: "8 AM and 7 PM",
                premium: "Any time",
              },
              { feature: "Categories", free: "3", premium: "30" },
              { feature: "App icon", free: "Default", premium: "9 cats" },
              {
                feature:
                  "To-dos, calendar, repeats, notes, comments,\u00a0widgets",
                free: "Included",
                premium: "Included",
              },
            ],
          },
          faq: [
            {
              question: "Is the free plan enough?",
              answer:
                "To-do management, the calendar, repeats, notes, sharing with friends, nudges, comments and widgets are all free. If you use AI often or plan with lots of friends, Premium is more\u00a0comfortable.",
            },
            {
              question: "How do I cancel?",
              answer:
                "Cancel in the App Store or Google Play subscription settings. You can keep using Premium until the end of the current\u00a0period.",
            },
            {
              question:
                "Can I share a subscription with family or\u00a0friends?",
              answer:
                "Subscriptions are per account. But you can both earn Premium days with invite paw\u00a0prints.",
            },
          ],
          screens: [
            {
              alt: "Aido My tab usage card showing AI to-do creation 5 of 10 used and Voice note 0 of 3 used this month (Korean\u00a0UI)",
              caption: "Check your AI usage this\u00a0month",
            },
            {
              alt: "Aido sheet saying you can’t add more friends because the free plan allows 5, with an invite button (Korean\u00a0UI)",
              caption: "We’ll tell you when you reach a free\u00a0limit",
            },
            {
              alt: "Aido My tab on a Premium account with the yearly plan, invite paw prints and friend management (Korean\u00a0UI)",
              caption: "The My tab on Premium",
            },
          ],
        },
        "ai-todo": {
          kicker: "Just say it",
          title: "Turn what you say and write into to-dos with\u00a0AI",
          summary:
            "Aido is a to-do list app where AI splits what you say or a note you wrote into several to-dos and fills in dates, times and repeats. You check and edit each to-do before adding it, so only what you want goes into your\u00a0plan.",
          steps: [
            {
              title: "Tap the mic on the add sheet",
              body: "Open the add sheet on the To-dos tab and tap the mic. The first time, check what's sent and who processes it on the AI consent sheet, tap Agree, then allow microphone\u00a0access.",
            },
            {
              title: "Say everything on your mind",
              body: "Say it all at once, like “gym at 7 tomorrow morning, pick up the cake at 8 on Friday.” Your words appear as text, and when you tap Done or stop talking, AI splits them into\u00a0to-dos.",
            },
            {
              title: "Pick and edit what to add",
              body: "Only checked to-dos are added. Tap one to edit its title, date, time or repeat. To-dos you already have are marked and left unchecked at\u00a0first.",
            },
            {
              title: "Tap Add to finish",
              body: "Nothing is saved until you tap the button. Added to-dos go straight to your list, and you can tap Say it again to start\u00a0over.",
            },
          ],
          example: {
            introduction: "Say your busy day in one\u00a0go.",
            items: [
              "What you say: Gym at 7 tomorrow morning, pick up Mom's birthday cake at 8 on Friday evening, and memorize 30 English words every Mon, Wed and\u00a0Fri.",
              "To-dos AI suggests: Go to the gym (tomorrow, 7:00 AM), Pick up the birthday cake (Friday, 8:00 PM), Memorize 30 words (every Mon, Wed and\u00a0Fri).",
              "Uncheck what you don't need and add the\u00a0rest.",
            ],
            note: "This example illustrates the workflow. AI results depend on what you say, so review them before\u00a0adding.",
          },
          details: [
            {
              title: "AI can split your notes, too",
              body: "Open a note on the Notes tab and tap More (⋯) > Split into to-dos with AI. Pick what to add on the same screen as Speak to add. To move a note into a single to-do, use Convert to\u00a0to-do.",
            },
            {
              title: "See uses left on the AI chip",
              body: "The chip next to Make to-dos with AI on the add sheet shows how many uses are left this month. Tap ⓘ for examples it understands and when uses refill. Failed attempts don't count, and typing to-dos yourself stays\u00a0free.",
            },
            {
              title: "We tell you what AI receives first",
              body: "Before AI sends anything for the first time, a consent sheet shows what's sent (what you type or say, your to-dos, the date and time zone), who processes it (Anthropic, Google and OpenAI for text; Apple or Google speech recognition for voice) and how it's used (only for AI features, never for ads). Your name, email, friends and audio files aren't sent. Tap Not now to send nothing and type to-dos\u00a0yourself.",
            },
            {
              title: "Use Voice notes for long meetings",
              body: "For long talks like meetings or classes, record with Voice notes on the Notes tab. AI finds a summary, key points and to-dos, and audio files are saved on your device and aren't sent to Aido's\u00a0servers.",
            },
          ],
          plans: {
            free: "Start free with notes and basic to-do management. AI to-dos from text, voice and notes share 10 uses a month, and Voice notes include 3 a month (up to 3 minutes each). Failed attempts don't\u00a0count.",
            premium:
              "Get up to 1,000 AI to-dos and 100 voice notes (up to 30 minutes each) a month. Premium also includes weekly and monthly AI reports and recurring to-do suggestions.",
          },
          faq: [
            {
              question: "Can I edit the to-dos AI suggests?",
              answer:
                "Yes. Before adding, tap a to-do to edit its title, date, time or repeat, and uncheck what you don't need. You can still edit it later from the to-do's detail\u00a0screen.",
            },
            {
              question: "Are audio files sent to AI providers?",
              answer:
                "No. Speech recognition turns what you say into text, and only that text goes to AI providers. Voice notes recordings are saved on your device and aren't sent to Aido's\u00a0servers.",
            },
            {
              question: "When does a use count?",
              answer:
                "One use counts when AI sorts things into to-dos. Failed attempts don't count, and adding to-dos doesn't use any. Free includes 10 a month across text, voice and notes, refilled on the 1st of each\u00a0month.",
            },
            {
              question: "Can I withdraw AI consent?",
              answer:
                "Yes. Turn it off anytime in Me > Terms & policies > AI data\u00a0sharing.",
            },
          ],
          screens: [
            {
              alt: "Aido review screen where AI split what was said into 3 to-dos with dates, times and repeats filled\u00a0in",
              caption: "Pick what to add from the to-dos AI\u00a0suggests.",
            },
            {
              alt: "Aido screen where AI split a moving checklist note into 4\u00a0to-dos",
              caption: "AI splits your written notes into to-dos,\u00a0too.",
            },
            {
              alt: "Aido add sheet showing the AI chip and a tip with uses left this month and the reset\u00a0date",
              caption: "Check uses left on the AI\u00a0chip.",
            },
            {
              alt: "Aido consent sheet explaining what's sent, who processes it and how it's used before AI organizes\u00a0anything",
              caption: "Agree once after checking what's\u00a0sent.",
            },
          ],
          cardDescription:
            "AI splits what you say or a note into several to-dos. Pick what to add to your\u00a0plan.",
        },
        "recurring-todo": {
          kicker: "A little every day",
          title: "Plan recurring\u00a0to-dos",
          summary:
            "Set up recurring to-dos in Aido for activities such as daily reading or weekday exercise. Review your plans in weekly and monthly calendars, and check today's to-dos and progress with home screen widgets on iPhone and\u00a0Android.",
          steps: [
            {
              title: "Create the to-do you want to repeat",
              body: "Add something specific, such as 'Read for 20\u00a0minutes.' Set a start date and choose a time if you need\u00a0one.",
            },
            {
              title: "Choose the days and date range",
              body: "Open Repeat and select daily, weekdays, weekends or individual days. Set how long it repeats, or choose Repeat forever to keep it\u00a0going.",
            },
            {
              title: "Review the plan in your calendar",
              body: "Use the weekly and monthly calendars to see each day's to-dos. Mark finished items complete. If a plan changes, check and update the relevant to-do's date or\u00a0time.",
            },
            {
              title: "Add an Aido home screen widget",
              body: "Sign in to the app, then find Aido in your device's widget list. A small widget shows progress, while larger widgets also show today's to-do\u00a0list.",
            },
          ],
          example: {
            introduction:
              "Make reading after work easier to remember with a small, specific\u00a0plan.",
            items: [
              "To-do: Read for 20\u00a0minutes in the\u00a0evening.",
              "Repeat: Weekdays. Set start and end dates for this month's\u00a0plan.",
              "Check today's plan in the calendar and use the home screen widget to see remaining to-dos and progress.",
            ],
            note: "Widgets help you check your day. Refresh timing can vary with your device's operating\u00a0system.",
          },
          details: [
            {
              title: "Editing or deleting a repeating to-do",
              body: "Choose Just this one, This and following, or All in this repeat. Deleting All in this repeat also removes past and completed ones. You can also say “work out every Mon, Wed and Fri” with Speak to add to create a repeating\u00a0to-do.",
            },
            {
              title: "Add a widget on iPhone",
              body: "Touch and hold an empty area on your home screen. Open Edit and choose Add Widget. Search for Aido, choose a size and add it. Menu locations may vary with your iOS\u00a0version.",
            },
            {
              title: "Add a widget on Android",
              body: "Touch and hold an empty area on your home screen and open Widgets. Find Aido and place a widget on the home screen. Adding and resizing widgets can vary by device and launcher.",
            },
            {
              title: "If the widget shows older information",
              body: "Widgets switch to the new day after midnight without opening the app. Timing can vary a little by operating system. If older to-dos stay on screen, open Aido and check your sign-in status and today’s\u00a0to-dos.",
            },
          ],
          plans: {
            free: "Set recurring to-dos yourself, use weekly and monthly calendars, and add home screen widgets on iOS and\u00a0Android.",
            premium:
              "Review your progress with weekly and monthly AI reports. Accept the AI's recurring to-do suggestions that fit your\u00a0routine.",
          },
          faq: [
            {
              question: "Can I repeat a to-do only on Mondays and Wednesdays?",
              answer:
                "Yes. Select Monday and Wednesday in Repeat, then choose start and end dates. You can also select daily, weekdays or weekends with a\u00a0preset.",
            },
            {
              question: "Do recurring to-dos require Premium?",
              answer:
                "No. You can set recurring to-dos yourself for free. AI suggestions for recurring to-dos are a Premium\u00a0feature.",
            },
            {
              question: "Do widgets work on both iPhone and\u00a0Android?",
              answer:
                "Yes. You can use them on both platforms' home screens. Sign in to Aido on your device before adding a\u00a0widget.",
            },
          ],
          screens: [
            {
              alt: "Aido Add to-do screen with date, time and repeat\u00a0options",
              caption: "Set the date, time and repeat as you add a\u00a0to-do.",
            },
            {
              alt: "Aido home screen widgets showing today’s to-dos and progress",
              caption:
                "See today’s to-dos and progress from your home\u00a0screen.",
            },
          ],
          cardDescription:
            "Set repeat days and check your calendar. See today’s to-dos from your home screen,\u00a0too.",
        },
        "shared-todo": {
          kicker: "Finish more, together",
          title: "Share to-dos with friends",
          summary:
            "In Aido, you can see friends' public to-dos and encourage them with nudges, comments and replies. Manage your own to-do list and choose what to share. Keep personal to-dos private, and use the app on your own whenever you\u00a0prefer.",
          steps: [
            {
              title: "Find a friend by name or hashtag",
              body: "Open friend management and tap the search icon. Search by name or unique eight-character hashtag. Use the hashtag to identify the right person when names are\u00a0similar.",
            },
            {
              title: "Send a friend request",
              body: "Tap Add in the search results. Your friend can accept in received requests. Check the sent and received request tabs to follow the\u00a0status.",
            },
            {
              title: "Choose which to-dos to share",
              body: "Choose Public or Private when creating or editing a to-do. Friends can only see public to-dos. If you turn a personal note into a to-do, check the created to-do's visibility\u00a0too.",
            },
            {
              title: "Send a little encouragement",
              body: "See public to-dos in your friend's calendar. Send a nudge as a reminder, or open a to-do's detail screen to leave a comment or\u00a0reply.",
            },
          ],
          example: {
            introduction:
              "If you and a friend want to keep exercising, share the activities you want encouragement\u00a0with.",
            items: [
              "My to-do: Walk for 30\u00a0minutes after work. Set it to Public so my friend can see\u00a0it.",
              "Check a friend's public exercise plan and send a nudge or a comment such as 'Let's keep going\u00a0today!'",
              "Keep personal plans private and follow completed exercise in the friend's calendar.",
            ],
            note: "Comments and nudges are sent to real friends. Choose a way to encourage each other that feels comfortable.",
          },
          details: [
            {
              title: "Choose visibility for each to-do",
              body: "Share the to-dos you want friends to see by setting them to Public. Set personal ones to Private. A friend's calendar only shows activity from public\u00a0to-dos.",
            },
            {
              title: "Keep conversations going with replies",
              body: "Read comments in a to-do's detail screen and reply to a specific comment. Expand a conversation to read its replies, or tap a comment notification to jump to that\u00a0comment.",
            },
          ],
          plans: {
            free: "Add up to five friends and send up to three nudges a day. View public to-dos and encourage friends with comments.",
            premium:
              "Add friends and send nudges without daily count limits. Wait 24\u00a0hours before nudging the same to-do\u00a0again.",
          },
          faq: [
            {
              question: "Can friends see every to-do after I add\u00a0them?",
              answer:
                "No. Friends can only see public to-dos. Check visibility when creating or editing a\u00a0to-do.",
            },
            {
              question:
                "Why isn't someone in my friend list after I send a\u00a0request?",
              answer:
                "Check the sent requests tab in friend management. You become friends after the other person accepts in received requests.",
            },
            {
              question: "Can I use Aido without adding friends?",
              answer:
                "Yes. Manage your day on your own with notes, to-dos, repeat settings and calendars. Add a friend when you want\u00a0company.",
            },
          ],
          screens: [
            {
              alt: "Aido friends screen with cat profiles and a friend’s public\u00a0to-dos",
              caption:
                "Tap a friend to see their public to-dos and send a\u00a0nudge.",
            },
            {
              alt: "Aido to-do detail with nudge count and a comment\u00a0field",
              caption:
                "Talk it through with comments and replies on a\u00a0to-do.",
            },
          ],
          cardDescription:
            "Connect with friends and share the to-dos you choose. Learn how to send nudges and leave comments.",
        },
        "friend-invite": {
          kicker: "One link is all it takes",
          title: "Invite friends and earn Premium",
          summary:
            "Invite friends to Aido with your invite link or 6-character invite code. Your friend gets 7\u00a0days of Premium right when they join. You get 7\u00a0days of Premium + 1\u00a0more friend once they complete to-dos on 2\u00a0days. Here is who gets what, when, and the conditions.",
          steps: [
            {
              title: "Open the invite screen",
              body: "On the Me tab, tap “Invites · paw prints.” You’ll see your invite link, your 6-character invite code and the paw prints you’ve collected.",
            },
            {
              title: "Send your invite link",
              body: "Tap Invite via KakaoTalk, or copy the link and share it in any app. When your friend opens it, they see who invited them and the invite code, then install the\u00a0app.",
            },
            {
              title: "Your friend joins and you’re connected",
              body: "When your friend opens the app from the link, or enters the invite code on the sign-in screen, you become friends and they get 7\u00a0days of Premium right\u00a0away.",
            },
            {
              title: "A paw print for 2\u00a0days of to-dos",
              body: "Once your friend completes to-dos on 2\u00a0days within 14\u00a0days of joining, a paw print lands on your board. You get 7\u00a0days of Premium and can add 1\u00a0more\u00a0friend.",
            },
          ],
          example: {
            introduction:
              "Have a friend you want to work out with? Start with one invite\u00a0link.",
            items: [
              "You: send your invite link on KakaoTalk.",
              "Your friend: joins from the link, becomes your friend right away and gets 7\u00a0days of\u00a0Premium.",
              "Your friend completes to-dos on Monday and Wednesday, and a paw print lands on your board. You get 7\u00a0days of Premium and can add 1\u00a0more\u00a0friend.",
            ],
            note: "This is an example of how it works. Rewards have conditions, so check the details below and the Terms of\u00a0Service.",
          },
          rewards: {
            items: [
              {
                who: "Your friend",
                when: "Right when they join",
                reward: "7 days of Premium",
                condition:
                  "They need to accept within 7\u00a0days of signing\u00a0up.",
              },
              {
                who: "You",
                when: "Once they complete to-dos on 2\u00a0days",
                reward: "7\u00a0days of Premium + 1\u00a0more friend",
                condition:
                  "Within 14\u00a0days of their sign-up. Several to-dos on one day count as 1\u00a0day.",
              },
            ],
            limits: [
              "You can earn up to 30\u00a0days of Premium every 30\u00a0days from invites, and 90\u00a0days in\u00a0total.",
              "After that, you can keep collecting paw prints, and each one still lets you add 1\u00a0more\u00a0friend.",
              "Rewards are in-app Premium with no cash value, once per device and\u00a0account.",
              "Rewards earned while subscribed start after your subscription\u00a0ends.",
            ],
            termsNote:
              "See Article 13-2 of the Terms of Service for full conditions.",
            termsLink: "View invite reward terms",
          },
          details: [
            {
              title: "Track progress on your paw print board",
              body: "Each paw print fills one spot in “Collect paw prints.” When all 12 are filled, a new board opens, and your invited friends list shows who left a paw\u00a0print.",
            },
            {
              title: "Nudge friends who are on their way",
              body: "Send a nudge to friends who haven’t reached 2\u00a0days yet. You’ll get a notification when a friend completes their\u00a0to-dos.",
            },
          ],
          faq: [
            {
              question: "Can I invite with a code instead of a\u00a0link?",
              answer:
                "Yes. Share the 6-character invite code from the invite screen. Your friend installs the app and enters the code on the sign-in\u00a0screen.",
            },
            {
              question: "Do friends who already use Aido get\u00a0Premium?",
              answer:
                "If a friend signed up more than 7\u00a0days ago, accepting your invite only connects you as friends. They don’t get\u00a0Premium.",
            },
            {
              question: "What if I’ve reached my friend limit?",
              answer:
                "You can still invite. If you’re at your limit, your friend gets a friend request when they accept. Each paw print lets you add 1\u00a0more\u00a0friend.",
            },
            {
              question: "Will I be charged when reward Premium\u00a0ends?",
              answer:
                "No. Reward Premium involves no payment and doesn’t renew. When it ends, you’re back on the free\u00a0plan.",
            },
          ],
          screens: [
            {
              alt: "Aido invite screen with invite rewards and a 6-character invite\u00a0code",
              caption:
                "Send your link or share your code from the invite\u00a0screen.",
            },
            {
              alt: "Aido “Collect paw prints” board with all 12 paw prints\u00a0filled",
              caption:
                "A paw print lands each time a friend completes to-dos on 2\u00a0days.",
            },
            {
              alt: "Aido invite card showing who sent the invite and the sign-up\u00a0reward",
              caption:
                "Your friend sees the reward on the invite card and\u00a0joins.",
            },
          ],
          cardDescription:
            "Invite friends with a link. See who gets Premium and when, and how paw prints\u00a0work.",
        },
        weather: {
          kicker: "Your weather guide",
          title: "Plan your day with weather and Aido\u00a0briefing",
          summary:
            "Aido’s weather is all new. Check current conditions and hourly and 10-day forecasts anywhere in the world, while Aido briefing matches today’s scheduled to-dos with the weather. Here’s what each part of the screen shows, when the briefing says what, and how moving times and notifications\u00a0work.",
          steps: [
            {
              title: "Open the weather screen",
              body: "Tap the weather button on Home. Allow location access to see the weather where you are. Tap the refresh button at the top right to update it\u00a0anytime.",
            },
            {
              title: "Check Aido briefing",
              body: "Right below the current weather, see today’s scheduled to-dos alongside the weather at those times. Check off to-dos right there, or tap ⋯ to edit\u00a0them.",
            },
            {
              title: "Move to-dos that clash",
              body: "If a to-do clashes with rain or heat, tap “Move to a dry time” or “Move to cooler hours.” Pick a suggested time with less rain or heat to move them all at once, and undo if you change your\u00a0mind.",
            },
            {
              title: "Get morning and evening weather notifications",
              body: "Turn on weather notifications to hear about the weather each morning and evening. If a to-do clashes with rain or heat, tap the notification to move it right\u00a0away.",
            },
          ],
          example: {
            introduction:
              "Say you’ve planned a dog walk at 3\u00a0PM and rain is on the way. Here’s how it\u00a0goes.",
            items: [
              "If there’s a 50% or higher chance of rain at 3\u00a0PM, the briefing shows that to-do\u00a0first.",
              "Tap “Move to a dry time” for a time with less rain. Pick one and it moves right away, and you can undo\u00a0it.",
              "If there’s a clear stretch, the briefing suggests a walk then. Tap the suggestion to open Add to-do already filled\u00a0in.",
            ],
            note: "This is an example of how it works. What you see depends on the day’s forecast and your\u00a0to-dos.",
          },
          layout: [
            {
              title: "Current weather",
              body: "Your location, current temperature and conditions, and today’s high and low. The background moves through 18 lifelike weather scenes, with the sun by day and the moon by night. Below-zero signs and the ° symbol are smaller, and the big title shows just the city\u00a0name.",
            },
            {
              title: "Aido briefing",
              body: "Matches today’s scheduled to-dos with the weather at those times. The table below shows what it tells\u00a0you.",
            },
            {
              title: "Next-hour precipitation",
              body: "Tells you about rain over the next hour, minute by minute, like “Rain starts in 39\u00a0min.” Shown only in supported\u00a0areas.",
            },
            {
              title: "Hourly and 10-day forecasts",
              body: "Swipe through 24\u00a0hours of conditions, temperatures, and chances of rain. The 10-day forecast shows each day’s high and low, with a dot on days that have\u00a0to-dos.",
            },
            {
              title: "Weather details",
              body: "Feels-like temperature, UV index, wind, precipitation, humidity, visibility, pressure, cloud cover, and sun and moon (moonrise, moonset, and moon phase). In Korea, air quality is shown\u00a0too.",
            },
            {
              title: "Weather alerts and data sources",
              body: "Weather alerts appear when there are any. Forecasts come from Apple Weather, and the screen shows the Apple Weather attribution and data source\u00a0links.",
            },
          ],
          cases: [
            {
              title: "When rain overlaps your to-dos",
              body: "If there’s a 50% or higher chance of rain at a to-do’s time, the briefing lists those to-dos\u00a0first.",
              points: [
                "Each to-do’s chance of rain and when it dries up",
                "A ‘Move to a dry time’ button",
                "The chance of rain right now and when it\u00a0stops",
              ],
              alt: "San José weather where Aido briefing says ‘3 to-dos overlap with rain’",
            },
            {
              title: "Move to a dry time",
              body: "Get a suggested time with less rain for each to-do and move them all at once. You can undo it\u00a0anytime.",
              points: [
                "Upcoming rain at a glance as bars",
                "Chance of rain for each hour, with a ‘Recommended’ pick",
                "Leave a to-do as it is if you\u00a0like",
              ],
              alt: "The ‘Move to a dry time’ sheet suggesting a drier time for each to-do",
            },
            {
              title: "When it’s too hot",
              body: "When it feels like 33°C (91°F) or hotter during the day, the briefing flags to-dos in the heat and points to a cooler\u00a0time.",
              points: [
                "The hottest hours of the day",
                "To-dos in the heat with their feels-like temperature",
                "A ‘Move to cooler hours’\u00a0button",
              ],
              alt: "Manaus weather where Aido briefing says ‘Avoid outdoor to-dos midday’",
            },
            {
              title: "Move to cooler hours",
              body: "See the feels-like temperature for each hour and pick the recommended cooler time. It moves right\u00a0away.",
              points: [
                "Feels-like temperature by hour",
                "A ‘Recommended’ pick for the coolest time",
                "Apple Weather attribution and last\u00a0update",
              ],
              alt: "The ‘Move to cooler hours’ sheet showing the feels-like temperature for each hour",
            },
            {
              title: "On a clear day",
              body: "With no weather worries, the briefing tells you the best time to be outside and marks each to-do as all\u00a0clear.",
              points: [
                "The warmest hours of the day",
                "‘Best time today’ and ‘No rain expected’ on each to-do",
                "A button to add a walk right\u00a0away",
              ],
              alt: "Seoul on a clear day where the briefing says ‘A great day to be outside’",
            },
            {
              title: "When you’re abroad",
              body: "Weather in a different time zone from your device shows local times. The briefing is hidden so to-do times don’t get mixed\u00a0up.",
              points: [
                "A next-hour precipitation chart",
                "Forecasts in local time, like ‘Until 8\u00a0PM local time’",
                "A 10-day forecast by local\u00a0date",
              ],
              alt: "New York weather in local time with the next-hour precipitation chart",
            },
            {
              title: "Open a day in the 10-day forecast",
              body: "Tap a day to see its day and night conditions, precipitation, wind, UV index, and sunrise and\u00a0sunset.",
              points: [
                "Day and night conditions with highs and lows",
                "Precipitation, max wind and max UV index",
                "A dot on days with\u00a0to-dos",
              ],
              alt: "Today expanded in the 10-day forecast with day and night conditions and precipitation",
            },
            {
              title: "Weather details",
              body: "Today’s conditions are split into tiles, each with a short tip on what it means for your\u00a0day.",
              points: [
                "Feels-like temperature and UV index (when to wear sunscreen)",
                "Wind direction and gusts, precipitation over the next 24\u00a0hours",
                "Humidity and dew point, visibility, pressure and cloud\u00a0cover",
              ],
              alt: "Weather details with feels-like, UV, wind, precipitation, humidity, visibility, pressure and cloud cover tiles",
            },
            {
              title: "Sun, moon and air quality",
              body: "See sunrise, sunset and daylight, plus the moon phase. In Korea, PM10 and PM2.5 air quality appear\u00a0too.",
              points: [
                "Sunrise, sunset and hours of daylight",
                "Moon phase with moonrise and moonset",
                "Air quality in Korea only, from\u00a0AirKorea",
              ],
              alt: "Sun and moon card with PM10 and PM2.5 air quality and the Apple Weather attribution",
            },
            {
              title: "When you’re offline",
              body: "A notice appears at the top, and your last-seen weather and briefing stay on screen. Everything refreshes once you’re back\u00a0online.",
              points: [
                "An offline notice at the top",
                "Your last weather and briefing stay\u00a0visible",
              ],
              alt: "Weather screen with ‘You’re offline. We’ll reload when you’re back online.’ at the top",
            },
            {
              title: "Weather notifications",
              body: "Tap the bell at the top right of the weather screen to turn on weather notifications and set morning and evening\u00a0times.",
              points: [
                "Morning notification: today’s weather",
                "Evening notification: tomorrow’s weather",
                "Change the times\u00a0anytime",
              ],
              alt: "Weather notification settings turned on with 7:00\u00a0AM and 5:30\u00a0PM times",
            },
          ],
          briefing: {
            introduction:
              "The briefing checks these in order and shows the first one that\u00a0applies.",
            rows: [
              {
                when: "A 50% or higher chance of rain, snow, or lightning at a to-do’s\u00a0time",
                shows:
                  "Shows that to-do first and suggests moving its\u00a0time.",
              },
              {
                when: "A daytime feels-like temperature of 33\u00a0°C (91\u00a0°F) or\u00a0higher",
                shows:
                  "Warns you about the heat and suggests moving to-dos that clash with\u00a0it.",
              },
              {
                when: "Rain on the way soon",
                shows:
                  "Suggests getting a to-do done before the rain\u00a0starts.",
              },
              {
                when: "A clear stretch of the day",
                shows:
                  "Tells you the best time to be outside and suggests adding a\u00a0walk.",
              },
              {
                when: "No to-dos left today",
                shows:
                  "Shows tomorrow morning’s temperature, and lets you know if it’ll be chilly (10\u00a0°C / 50\u00a0°F or\u00a0below).",
              },
              {
                when: "Everything looks fine",
                shows:
                  "Lets you know your remaining to-dos are clear of weather\u00a0worries.",
              },
            ],
            note: "If the weather location is in a different time zone from your device, like when you check a place abroad, the briefing is\u00a0hidden.",
          },
          details: [
            {
              title: "If your location can’t be found",
              body: "Weather needs location access to show where you are. If it can’t find you, make sure location access for Aido and location services are on in your device settings, then tap refresh. Your to-dos keep working without\u00a0weather.",
            },
            {
              title: "When you’re abroad",
              body: "You get the local weather and notifications abroad too. Weather for a place in a different time zone from your device shows local times, like “6\u00a0PM local time.” The briefing is hidden then, so to-do times and weather times never get mixed\u00a0up.",
            },
            {
              title: "When you’re offline",
              body: "A notice appears at the top, and your last-seen to-dos and weather stay on screen. Everything refreshes automatically once you’re back\u00a0online.",
            },
            {
              title: "Your location is used only for weather",
              body: "We look up weather by a roughly 5\u00a0km area instead of your exact spot. Location access is your choice, and you can change it anytime in your device\u00a0settings.",
            },
          ],
          faq: [
            {
              question: "Why don’t I see the briefing?",
              answer:
                "The briefing is hidden when the weather location is in a different time zone from your device. If you’re viewing a place abroad, check again for a place in your device’s time\u00a0zone.",
            },
            {
              question: "Why don’t I see next-hour precipitation?",
              answer:
                "Minute-by-minute rain forecasts are shown only in supported areas. Elsewhere, Aido tells you about rain hour by\u00a0hour.",
            },
            {
              question: "Can I undo a moved to-do?",
              answer:
                "Yes. Tap undo after moving it, and it goes back to its original time. You can also change the time yourself in the to-do’s\u00a0details.",
            },
            {
              question: "Where can I see air quality?",
              answer:
                "In the weather details. Air quality is available in Korea only and comes from\u00a0AirKorea.",
            },
          ],
          screens: [
            {
              alt: "Aido weather screen with Aido briefing and three of today’s to-dos below the current\u00a0weather",
              caption:
                "Below the current weather, the briefing matches today’s to-dos with the\u00a0forecast.",
            },
            {
              alt: "London weather screen showing “No precipitation in the next hour” with a next-hour precipitation\u00a0chart",
              caption:
                "In supported areas, see rain for the next hour, minute by\u00a0minute.",
            },
            {
              alt: "Dubai weather with hourly and 10-day forecasts shown in local\u00a0time",
              caption:
                "Abroad, hourly and 10-day forecasts show local\u00a0time.",
            },
          ],
          cardDescription:
            "Check the weather and forecasts, and let Aido briefing flag to-dos that clash with rain or\u00a0heat.",
          scenes: [
            {
              name: "Clear",
              alt: "“Clear” weather scene with the moon and stars in the night\u00a0sky",
            },
            {
              name: "Mostly clear",
              alt: "“Mostly clear” weather scene with the sun in a blue\u00a0sky",
            },
            {
              name: "Partly cloudy",
              alt: "“Partly cloudy” weather scene with a few clouds drifting\u00a0by",
            },
            {
              name: "Mostly cloudy",
              alt: "“Mostly cloudy” weather scene with clouds filling the\u00a0sky",
            },
            {
              name: "Cloudy",
              alt: "“Cloudy” weather scene with low gray\u00a0clouds",
            },
            {
              name: "Foggy",
              alt: "“Foggy” weather scene with mist slowly drifting\u00a0by",
            },
            {
              name: "Hazy",
              alt: "“Hazy” weather scene with dust floating in a yellowish\u00a0sky",
            },
            {
              name: "Windy",
              alt: "“Windy” weather scene with leaves blowing in the\u00a0wind",
            },
            {
              name: "Drizzle",
              alt: "“Drizzle” weather scene with fine\u00a0raindrops",
            },
            {
              name: "Rain",
              alt: "“Rain” weather scene with rain falling at\u00a0night",
            },
            {
              name: "Heavy rain",
              alt: "“Heavy rain” weather scene with heavy rain pouring\u00a0down",
            },
            {
              name: "Thunderstorms",
              alt: "“Thunderstorms” weather scene with lightning flashing in the night\u00a0sky",
            },
            {
              name: "Sleet",
              alt: "“Sleet” weather scene with rain and snow falling\u00a0together",
            },
            {
              name: "Snow",
              alt: "“Snow” weather scene with snowflakes drifting\u00a0down",
            },
            {
              name: "Heavy snow",
              alt: "“Heavy snow” weather scene with big snowflakes pouring\u00a0down",
            },
            {
              name: "Hail",
              alt: "“Hail” weather scene with ice pellets\u00a0bouncing",
            },
            {
              name: "Hot",
              alt: "“Hot” weather scene with a blazing sun in a red\u00a0sky",
            },
            {
              name: "Freezing",
              alt: "“Freezing” weather scene with frost at the edges and snowflakes\u00a0swirling",
            },
          ],
          scenePhone: {
            alt: "Full Aido weather screen on Android on a stormy night, with hourly and 10-day\u00a0forecasts",
            caption: "A thunderstorm night on\u00a0Android",
          },
          devices: [
            {
              name: "iPhone\u00a0Duo",
              body: "Unfolded, the buttons move to the right side so current weather and forecasts get more\u00a0room.",
              alt: "Aido weather on an unfolded iPhone\u00a0Duo, with current weather and hourly forecast and buttons along the right\u00a0side",
            },
            {
              name: "iPad",
              body: "Current weather and the hourly forecast sit on the left, with the 10-day forecast on the\u00a0right.",
              alt: "Aido weather on iPad with a clear night and the moon on the left and the 10-day forecast on the\u00a0right",
            },
          ],
        },
        comments: {
          kicker: "Your comments guide",
          title: "Chat with friends in comments and\u00a0replies",
          summary:
            "See every comment and reply on one to-do screen. Replies open right where they are, and @names show who each reply is for. Double-tap a comment you love to leave a\u00a0heart.",
          steps: [
            {
              title: "Create a to-do and share it",
              body: "When you add a to-do, choose whether friends can see it. Shared to-dos appear in your friends’ calendars, and they can comment on the to-do’s detail\u00a0screen.",
            },
            {
              title: "A friend leaves a comment",
              body: "You get a notification when someone comments on your to-do. Tap it to open the to-do right at that comment, briefly highlighted so it’s easy to\u00a0spot.",
            },
            {
              title: "Keep it going with replies and @mentions",
              body: "Tap Reply under a comment and the reply box sits right above the keyboard, showing who you’re replying to. Reply to a reply and it joins the same thread with an\u00a0@name.",
            },
            {
              title: "Double-tap for a heart",
              body: "Double-tap a comment and a heart pops as your like lands! You can also tap the heart button, and tap it again to take your like\u00a0back.",
            },
          ],
          example: {
            introduction:
              "Here’s how one to-do, “Swimming today!”, turns into a\u00a0chat.",
            items: [
              "Jihwan shares “Swimming today!” with\u00a0friends.",
              "Matthew comments “What time?” and Jihwan gets a\u00a0notification.",
              "Jihwan replies “7!”, and another friend adds “@Jihwan count me in” under that\u00a0reply.",
              "Double-tap any comment you want to cheer to leave a\u00a0heart.",
            ],
            note: "This is an example of how it works. Names and messages are made\u00a0up.",
          },
          details: [
            {
              title: "Replies indent just one level",
              body: "One reply shows under each comment. Tap “View more replies” to open 10 at a time, then “Hide replies” when you’re\u00a0done.",
            },
            {
              title: "Tap ⋯ or long-press for the menu",
              body: "Edit, copy, or delete your own comments, or copy, report, or block on a friend’s, all in one place. Deleting always asks you to\u00a0confirm.",
            },
            {
              title: "Deleted comments keep the thread together",
              body: "Delete a comment that has replies and it stays as “This comment was deleted,” so the conversation still makes sense. Without replies, the row\u00a0disappears.",
            },
            {
              title: "Tidy with large text and long names",
              body: "Rows don’t overlap with larger text, and long names shorten name-first and then the tag, so the time and ⋯ button always stay\u00a0visible.",
            },
          ],
          faq: [
            {
              question: "Are comments and replies free?",
              answer: "Yes. Comments, replies, and hearts are all\u00a0free.",
            },
            {
              question: "I left a heart by mistake.",
              answer:
                "A double-tap only adds a like. To take it back, tap the heart button under the comment\u00a0again.",
            },
            {
              question: "What happens when I reply to a reply?",
              answer:
                "Replies indent just one level. A reply to a reply joins the same thread with an @name in front, so you can tell who it’s\u00a0for.",
            },
            {
              question: "Can I comment with friends on an older version?",
              answer:
                "Yes. Friends on 1.14.0 or earlier can still read and write comments and replies. The one-screen view and double-tap hearts need\u00a01.14.1.",
            },
          ],
          screens: [
            {
              alt: "Aido to-do details with comments and replies together on one\u00a0screen",
              caption: "See every comment and reply on one\u00a0screen.",
            },
            {
              alt: "Aido screen with “Replying to” above a reply box that sits right on top of the\u00a0keyboard",
              caption: "The reply box sits right above the\u00a0keyboard.",
            },
            {
              alt: "Aido comment with a big heart popping after a double-tap (Korean\u00a0UI)",
              caption: "Double-tap and a heart\u00a0pops.",
            },
          ],
          story: [
            {
              title: "Replies open in place",
              body: "Tap “View more replies” and they open right below, no new screen. @names show who each reply is\u00a0for.",
              alt: "Recording of Aido comments where tapping “View more replies” opens replies with @mentions below the\u00a0comment",
            },
            {
              title: "The reply box hugs the keyboard",
              body: "Tap Reply to see who you’re replying to, with the reply box right above the\u00a0keyboard.",
              alt: "Recording of Aido where tapping Reply raises the keyboard with the reply box and reply target just above\u00a0it",
            },
            {
              title: "Double-tap, heart pops",
              body: "Double-tap a comment and a heart bursts as your like lands. The app shows a quick tip the first\u00a0time.",
              alt: "Recording of Aido where double-tapping a comment pops a big heart and adds a\u00a0like",
            },
            {
              title: "Notifications take you there",
              body: "Tap a comment notification to open the to-do, scroll to that comment, and highlight it for a\u00a0moment.",
              alt: "Recording of Aido opening a to-do from a notification and briefly highlighting the reply in\u00a0orange",
            },
          ],
          cardDescription:
            "Comment on friends’ to-dos, keep chatting with replies and @mentions, and double-tap to send a\u00a0heart.",
        },
      },
    },
    featureHub: {
      title: "Aido features",
      metaTitle:
        "Aido features: the AI to-do planner you share with\u00a0friends",
      description:
        "To-dos and calendars, notes and AI planning, nudges from friends, reminders, weather and reports. Every Aido feature, explained simply with real app\u00a0screens.",
      kicker: "A quick tour of Aido",
      summaryTitle: "Aido in 30 seconds",
      summary: [
        {
          title: "Write it or say it",
          body: "A to-do takes a few taps, and a long plan takes one sentence. AI fills in the date, time and\u00a0repeat.",
        },
        {
          title: "Finish with friends",
          body: "See what your friends are working on and nudge them along. Comments and hearts make it easier to get\u00a0started.",
        },
        {
          title: "Nothing slips through",
          body: "Morning and evening reminders, weather briefings and weekly reports keep your day on\u00a0track.",
        },
      ],
      groupsLabel: "Jump to a feature group",
      groups: {
        plan: {
          title: "Planning",
          hand: "Write it, say it, done",
          body: "Plan with to-dos and a calendar, set repeats once, and let AI turn what you say into\u00a0to-dos.",
        },
        memo: {
          title: "Notes and AI",
          hand: "Ideas in notes, tasks by\u00a0AI",
          body: "Keep thoughts that aren’t plans yet in notes, and let AI split them into to-dos when you’re\u00a0ready.",
        },
        friends: {
          title: "With friends",
          hand: "A nudge keeps you going",
          body: "See friends’ to-dos, cheer them on with nudges, and swap comments and hearts. Invite friends to collect paw\u00a0prints.",
        },
        daily: {
          title: "Every day",
          hand: "Forgetful? That’s okay",
          body: "Reminders, notifications, weather briefings and AI reports look after today and this\u00a0week.",
        },
        me: {
          title: "Make it yours",
          hand: "Your own Aido, with cats",
          body: "Customize with cat app icons, themes and text size, and go Premium when you want\u00a0more.",
        },
      },
      premiumBadge: "Premium",
      screensTitle: "Look around with real\u00a0screens",
      screensDescription:
        "Explore each feature through real screens captured on iPhone and\u00a0Android.",
      compareTitle: "How is Aido different?",
      compareBody:
        "We put Aido side by side with todo mate, TickTick and Todoist using each app’s official information. Find the one that fits\u00a0you.",
      compareLink: "Compare to-do apps",
      faq: [
        {
          question: "What is Aido?",
          answer:
            "An AI to-do planner for sharing to-dos with friends and cheering each other on. It runs on iPhone, iPad, Mac (Apple silicon) and\u00a0Android.",
        },
        {
          question: "Can I use it on my own?",
          answer:
            "Yes. To-dos, the calendar, repeats, notes, AI planning and reminders all work without friends. Add friends to trade nudges and\u00a0comments.",
        },
        {
          question: "Is it free?",
          answer:
            "Yes. To-dos, the calendar, repeats, notes, friends, nudges, comments and widgets are free. Choose Premium for more AI and AI\u00a0reports.",
        },
        {
          question: "Are my to-dos and notes\u00a0safe?",
          answer:
            "Private to-dos and notes are only visible to you. We ask before anything is sent to AI, and your name, email and friend information are never sent to\u00a0AI.",
        },
      ],
    },
    compare: {
      title: "To-do apps compared: todo mate, TickTick, Todoist and\u00a0Aido",
      metaTitle: "todo mate vs TickTick vs Todoist: choosing a to-do\u00a0app",
      description:
        "We compared todo mate, TickTick, Todoist and Aido on friend features, AI, calendars, habits, platforms and pricing model, using each app’s official\u00a0information.",
      kicker: "Pick the to-do app that\u00a0fits",
      checkedLabel: "Official info checked on",
      intro: [
        "There are lots of to-do apps, and the right one depends on how you work: organizing work on your own, staying consistent with friends, or needing habits and a focus\u00a0timer.",
        "The table below is based on each app’s official website and App Store listing. Features we couldn’t find on official pages are marked\u00a0“Not found”.",
      ],
      tableTitle: "Features at a glance",
      tableCaption: "Aido, todo mate, TickTick and Todoist\u00a0compared",
      featureLabel: "Feature",
      apps: {
        aido: "Aido",
        todomate: "todo mate",
        ticktick: "TickTick",
        todoist: "Todoist",
      },
      rows: [
        {
          feature: "See friends’ to-dos",
          aido: "Friend feed",
          todomate: "Follow + feed",
          ticktick: "Shared lists",
          todoist: "Shared projects",
        },
        {
          feature: "Cheers and reactions",
          aido: "Nudges, comments, hearts",
          todomate: "Emoji reactions",
          ticktick: "Not found",
          todoist: "Not found",
        },
        {
          feature: "Speak to create to-dos\u00a0(AI)",
          aido: "Speech or notes → several\u00a0to-dos",
          todomate: "Not found",
          ticktick: "AI Voice Capture\u00a0(Premium)",
          todoist: "Ramble (limited on free)",
        },
        {
          feature: "AI suggestions and\u00a0reports",
          aido: "Weekly and monthly reports, repeat\u00a0suggestions",
          todomate: "To-do suggestions from\u00a0history",
          ticktick: "AI Assistant (Premium)",
          todoist: "Todoist Assist",
        },
        {
          feature: "Recurring to-dos",
          aido: "Yes",
          todomate: "Yes (routines)",
          ticktick: "Yes",
          todoist: "Yes",
        },
        {
          feature: "Calendar views",
          aido: "Week, month",
          todomate: "Yes",
          ticktick: "Year, month, week,\u00a0multi-day",
          todoist: "Calendar layout (Pro)",
        },
        {
          feature: "Habits and focus timer",
          aido: "No",
          todomate: "Routines, Pomodoro",
          ticktick: "Habits, Pomodoro",
          todoist: "Not found",
        },
        {
          feature: "Weather briefing",
          aido: "Yes",
          todomate: "Not found",
          ticktick: "Not found",
          todoist: "Not found",
        },
        {
          feature: "Home screen widgets",
          aido: "Yes",
          todomate: "Yes",
          ticktick: "Yes",
          todoist: "Yes",
        },
        {
          feature: "Platforms",
          aido: "iPhone, iPad, Mac (Apple silicon),\u00a0Android",
          todomate: "iPhone, iPad, Apple Watch, Android, Mac,\u00a0web",
          ticktick:
            "iPhone, iPad, Apple Watch, Android, Mac, Windows, Linux,\u00a0web",
          todoist:
            "iPhone, iPad, Apple Watch, Android, Wear OS, Mac, Windows, Linux,\u00a0web",
        },
        {
          feature: "Pricing model",
          aido: "Free + Premium",
          todomate: "Free + in-app purchases",
          ticktick: "Free + Premium",
          todoist: "Free + Pro, Business",
        },
      ],
      tableNote:
        "Prices vary by country, store and billing period, so they aren’t listed here. Check each app’s store page or official pricing\u00a0page.",
      chooseTitle: "Which one fits you?",
      choose: [
        {
          title: "You want to stay consistent with\u00a0friends",
          body: "Aido and todo mate both show friends’ to-dos in a feed. Aido adds nudges you can send and get replies\u00a0to.",
        },
        {
          title: "You want to say it all at\u00a0once",
          body: "Aido’s AI splits a long sentence or note into several to-dos and fills in dates, times and repeats. TickTick and Todoist also offer AI voice\u00a0capture.",
        },
        {
          title: "You manage work projects or\u00a0teams",
          body: "If you need shared projects and Windows or Linux desktop apps, Todoist or TickTick may suit you\u00a0better.",
        },
        {
          title: "You need a habit tracker and focus\u00a0timer",
          body: "TickTick offers a habit tracker and Pomodoro, and todo mate offers routines and\u00a0Pomodoro.",
        },
      ],
      aidoTitle: "Try this in Aido",
      aidoPoints: [
        {
          title: "Friend feed and nudges",
          body: "See friends’ public to-dos and cheer them on with a\u00a0nudge.",
          slug: "nudge",
        },
        {
          title: "Speak to add",
          body: "AI splits one sentence into several\u00a0to-dos.",
          slug: "ai-todo",
        },
        {
          title: "Weather briefing",
          body: "Get a heads-up to move plans when rain is\u00a0coming.",
          slug: "weather",
        },
        {
          title: "AI reports",
          body: "Look back on your week and month of\u00a0progress.",
          slug: "ai-report",
        },
      ],
      sourcesTitle: "Official sources",
      sources: [
        {
          label: "todo mate · App Store",
          url: "https://apps.apple.com/kr/app/id1505220130",
        },
        {
          label: "todo mate for desktop · Mac App\u00a0Store",
          url: "https://apps.apple.com/kr/app/id1567807901",
        },
        { label: "TickTick · Features", url: "https://ticktick.com/features" },
        { label: "TickTick · Pricing", url: "https://ticktick.com/upgrade" },
        { label: "TickTick · Downloads", url: "https://ticktick.com/download" },
        { label: "Todoist · Pricing", url: "https://www.todoist.com/pricing" },
        {
          label: "Todoist · Downloads",
          url: "https://www.todoist.com/downloads",
        },
        {
          label: "Todoist · Ramble help",
          url: "https://www.todoist.com/help/articles/dictate-to-add-tasks-with-ramble-P1Raq7vVF",
        },
      ],
      disclaimer:
        "todo mate, TickTick and Todoist are trademarks of their respective companies and are not affiliated with Aido. This summary reflects official information as of the date above and may change. If something needs fixing, let us know by\u00a0email.",
      faq: [
        {
          question: "How is Aido different from todo\u00a0mate?",
          answer:
            "Both let you see friends’ to-dos. Aido adds nudges with replies, comments and hearts, AI that splits speech or notes into several to-dos, weather briefings and AI weekly and monthly reports. todo mate offers routines, D-days, a diary and\u00a0Pomodoro.",
        },
        {
          question: "Can I use Aido alongside TickTick or\u00a0Todoist?",
          answer:
            "Yes. Some people keep work projects in another app and use Aido for personal to-dos and habits with\u00a0friends.",
        },
        {
          question: "Is Aido free?",
          answer:
            "Yes. To-dos, the calendar, repeats, notes, friends, nudges, comments and widgets are free. Choose Premium for more AI and AI\u00a0reports.",
        },
      ],
    },
    media: { play: "Play video", pause: "Pause video" },
    meta: {
      title: "Aido | AI To-Do Planner You Finish with\u00a0Friends",
      description:
        "Say it and AI fills in the date, time and repeat. Share to-dos with friends, cheer each other on with nudges, and collect paw prints when friends join from your invite. Home screen widgets and a two-pane view on iPhone\u00a0Duo, foldables and tablets, too. Start free on iPhone, iPad, Android and Apple\u00a0silicon\u00a0Macs.",
      openGraphTitle: "Aido | Put it off alone. Get it done together.",
      openGraphDescription:
        "Say it and AI turns it into a to-do. Friends nudge you along. Invite a friend and collect paw\u00a0prints.",
      ogKicker: "Finish today’s list this time",
      ogBadge: "Free on iPhone & Android",
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
      features: "Features",
      compare: "Compare apps",
      invite: "Invite friends",
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
        release: "New in 1.15.0: talk, and AI makes your\u00a0to-dos",
        titleLead: "Put it off alone.",
        titleTail: "Get it done together.",
        description:
          "Say it and AI turns it into a to-do. Friends nudge you along. This time, see today's list\u00a0through.",
        note: "Start free on iPhone, iPad, Android and Macs with Apple\u00a0silicon",
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
          "Talk as long as you like, and AI splits it into to-dos with the date, time and repeat filled in. It can split a note you wrote, too, and you add only what you\u00a0pick.",
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
        voiceAlt:
          "Aido add-to-do screen showing how to add a to-do by\u00a0voice",
        parseAlt:
          "Aido screen where AI made 4\u00a0to-dos from a single\u00a0note",
        repeatAlt:
          "Aido add-to-do screen with the date and time filled in for\u00a0Pilates",
        guideLink: "How AI to-dos work",
        repeatGuideLink: "How recurring to-dos work",
      },
      friends: {
        kicker: "Put it off? Get a nudge.",
        title: "A nudge from a friend gets you going",
        description:
          "See the to-dos friends share and cheer them on with a nudge or a comment. When you finish, thank the friends who cheered you on. You pick which to-dos to\u00a0show.",
        feedAlt:
          "Aido friends screen with cat profiles and a nudge button next to a friend's\u00a0to-dos",
        nudgeAlt:
          "Aido screen with a friend's to-do details and a comment\u00a0box",
        nudgeName: "Cheese",
        nudgeText: "Nudge! Leg day today",
        guideLink: "How shared to-dos work",
      },
      comments: {
        badge: "New in 1.14.1",
        kicker: "Double-tap, heart pops",
        title: "Comments make doing it together more\u00a0fun",
        description:
          "Comment on the to-dos friends share, then keep the chat going with replies and @mentions. Double-tap a comment you love to leave a\u00a0heart.",
        steps: [
          "Create a to-do and share it",
          "A friend cheers you on in the comments",
          "Keep chatting with replies and @mentions",
          "Double-tap and a heart pops",
        ],
        heartAlt:
          "Recording of Aido where double-tapping a comment pops a big heart and adds a\u00a0like",
        replyAlt:
          "Recording of Aido where tapping Reply raises the keyboard with the reply box right above\u00a0it",
        heartNote: "Heart\u00a0pop!",
        guideLink: "How comments work",
      },
      invite: {
        badge: "New",
        kicker: "One link is all it takes",
        title: "Invite a friend, collect paw prints",
        description:
          "When a friend joins from your invite link, you're friends right away. As they keep finishing to-dos, paw prints land on your board one by\u00a0one.",
        rewardTitle: "Who gets what, and when?",
        friendLabel: "Your friend",
        friendWhen: "Right when they join",
        friendReward: "7 days of Premium",
        myLabel: "You",
        myWhen: "Once they complete to-dos on 2\u00a0days",
        myReward: "7\u00a0days of Premium + 1\u00a0more friend",
        conditionBadge: "Conditions apply",
        conditionNote:
          "You get a paw print when your friend completes to-dos on 2\u00a0days within 14\u00a0days of joining. Several to-dos on the same day count as 1\u00a0day. You can earn up to 30\u00a0days of reward Premium every 30\u00a0days, and up to 90\u00a0days in\u00a0total.",
        boardTitle: "Paw print board",
        boardSummary: "5 of 12 paw prints added",
        boardHint: "Fill all 12 and a new board opens",
        boardAlt:
          "Aido invite screen with a KakaoTalk invite button and a 12-cell paw print board with 1 paw\u00a0print",
        fullBoardAlt:
          "Aido paw print board with all 12 cells filled, completing board\u00a01",
        guideLink: "How friend invites work",
      },
      cats: {
        kicker: "Which cat are you today?",
        title: "Nine cute cats to keep you company",
        description:
          "Anyone can pick a cat for their profile. Your friends will see you as that\u00a0cat,\u00a0too.",
        premiumNote:
          "With Premium, your home screen app\u00a0icon can be a\u00a0cat,\u00a0too.",
        picker: {
          groupLabel: "Pick your profile cat",
          hint: "Go on, pick one!",
          profileLabel: "My profile",
          friendsLabel: "Friend list",
          meLabel: "Me",
          friendNames: ["Dubu", "Cheese"],
          appIconLabel: "App icon",
          appName: "Aido",
          premiumBadge: "Premium",
          names: {
            default: "Default",
            scottishFold: "Scottish Fold",
            orangeTabby: "Orange\u00a0Tabby",
            blackCat: "Black Cat",
            whiteCat: "White Cat",
            siamese: "Siamese",
            russianBlue: "Russian Blue",
            creamCat: "Cream Cat",
            tuxedoCat: "Tuxedo Cat",
          },
        },
      },
      largeScreen: {
        badge: "Big screens",
        kicker: "More room, less tapping",
        title:
          "Folded, it’s\u00a0a\u00a0phone. Unfolded, it’s\u00a0all\u00a0in\u00a0view.",
        description:
          "Unfold\u00a0iPhone\u00a0Duo and\u00a0your\u00a0list\u00a0sits\u00a0on\u00a0the\u00a0left with\u00a0details\u00a0on\u00a0the\u00a0right. Keep\u00a0up\u00a0with\u00a0nudges\u00a0and\u00a0comments without\u00a0switching\u00a0screens.",
        foldedNote: "Folded",
        unfoldedNote: "Unfolded, two panes",
        unfoldedAlt:
          "Aido on an unfolded iPhone\u00a0Duo with the to-do list on the left and details on the\u00a0right",
        ipadTitle: "Two panes on iPad, too",
        ipadDescription:
          "See your list alongside details and comments on a bigger\u00a0screen.",
        ipadAlt:
          "Aido on iPad with the to-do list and details side by\u00a0side",
        widgetTitle: "Check in from your home screen",
        widgetDescription:
          "See today's to-dos and progress in a widget without opening the app. Available on iOS and\u00a0Android.",
        widgetAlt:
          "Two Aido widgets on an iPhone home screen showing 3 of 8\u00a0to-dos done and a to-do\u00a0list",
      },
      devices: {
        kicker: "On the devices you already use",
        title: "From phone to Mac, Aido comes along",
        description:
          "Use it on iPhone and Android phones, and spread out in two panes on iPhone\u00a0Duo, foldables and tablets. On a Mac with Apple\u00a0silicon, you can install it from the App\u00a0Store,\u00a0too.",
        note: "On Mac, the iPad app opens in a window. The app and this website support English and\u00a0Korean.",
        items: {
          iphone: {
            name: "iPhone",
            description:
              "See today's to\u2011dos right from Home Screen\u00a0widgets.",
            requirement: "iOS\u00a016.4\u00a0or\u00a0later",
            alt: "Aido widgets on an iPhone Home Screen",
          },
          android: {
            name: "Android phone",
            description:
              "Get it on Google\u00a0Play, home screen widgets included.",
            requirement: "Android\u00a07.0\u00a0or\u00a0later",
            alt: "Aido on an Android phone showing the weekly calendar and to-do\u00a0list",
          },
          foldable: {
            name: "iPhone\u00a0Duo & foldables",
            description:
              "Unfold to see your list and details side by\u00a0side.",
            requirement: "iOS\u00a016.4 · Android\u00a07.0\u00a0or\u00a0later",
            alt: "Aido on an iPhone\u00a0Duo unfolded sideways with the to-do list and to-do details side by\u00a0side",
          },
          tablet: {
            name: "iPad & tablets",
            description: "Keep checklists and comments next to your\u00a0list.",
            requirement:
              "iPadOS\u00a016.4 · Android\u00a07.0\u00a0or\u00a0later",
            alt: "Aido on iPad with a checklist and comments next to the to-do\u00a0list",
          },
          mac: {
            name: "Mac",
            description:
              "Install from the App\u00a0Store and open it in a window at your\u00a0desk.",
            requirement:
              "macOS\u00a012\u00a0or\u00a0later · Apple\u00a0M1\u00a0or\u00a0later",
            alt: "Aido's to-do list open in a window on a Mac\u00a0screen",
          },
        },
      },
      routine: {
        kicker: "From your record to your next step",
        title: "Look back on your week. Get reminders on your schedule.",
        reportTitle: "AI weekly and monthly reports",
        reportDescription:
          "See your completion rate, categories and day-by-day patterns at a\u00a0glance.",
        reportAlt:
          "Aido AI report with a 100% weekly completion rate, 25 done, a 7-day streak and category breakdown",
        reminderTitle: "Reminders",
        reminderDescription:
          "Get today's to-dos in the morning and evening. With Premium, pick any time you\u00a0like.",
        reminderAlt:
          "Aido notification settings with push, weather and 8:00 AM and 7:00 PM reminders\u00a0on",
        premiumLabel: "Premium",
      },
      premium: {
        kicker: "When you want a little more",
        title: "More room with Premium",
        description: "The basics are free. Premium adds\u00a0these.",
        note: "Check the app for current prices and\u00a0details.",
        benefits: [
          {
            id: "aiParsing",
            title: "Plenty of AI to-dos",
            description:
              "Go from 10 a month on Free to up to 1,000 a month on\u00a0Premium",
          },
          {
            id: "nudge",
            title: "Unlimited nudges",
            description:
              "Nudge your friends freely, without the 3-per-day\u00a0limit",
          },
          {
            id: "friends",
            title: "Unlimited friends",
            description: "Add friends freely, without the 5-friend\u00a0limit",
          },
          {
            id: "reminder",
            title: "Custom reminder times",
            description: "Get notified when you want, not at fixed\u00a0times",
          },
          {
            id: "aiReport",
            title: "AI weekly/monthly reports",
            description:
              "See your completion rate and patterns at a\u00a0glance",
          },
          {
            id: "aiRepeat",
            title: "AI repeat suggestions",
            description: "AI automatically suggests recurring\u00a0to-dos",
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
        "Speak to add: AI splits what you say into to-dos with the date, time and repeat filled\u00a0in",
        "Voice notes: AI sums up meetings and classes and finds\u00a0to-dos",
        "Share to-dos with friends and cheer them on with nudges and comments",
        "Friend invites with a 12-cell paw print\u00a0board",
        "Home screen widgets on iOS and Android",
        "Two-pane view on iPhone\u00a0Duo, foldables and\u00a0iPad",
        "AI weekly and monthly reports and repeat suggestions",
        "Reminders",
      ],
    },
    faq: {
      title: "A few things you might be wondering",
      description: "Get to know Aido before your first small\u00a0step.",
      items: [
        {
          question: "How do I use Aido with friends?",
          answer:
            "Find friends by name or hashtag and see the to-dos they choose to share. Send a nudge or leave a comment to cheer them on. When you finish a to-do, thank the friends who encouraged\u00a0you.",
        },
        {
          question: "Can I use Aido for free?",
          answer:
            "Yes, you can start for free with task management, calendars, and friend features. Some features, including AI task planning, have usage limits. Premium adds AI reports, recurring suggestions, custom cat icons, and higher limits. Check the app for current subscription prices and\u00a0details.",
        },
        {
          question: "How does AI work with notes and voice\u00a0input?",
          answer:
            "Tap the mic on the add sheet and talk as long as you like. AI splits it into several to-dos and fills in dates, times and repeats. Use Split into to-dos with AI for notes you wrote. You check and edit each one before adding, and Voice notes sum up meetings and classes and find\u00a0to-dos.",
        },
        {
          question: "Can I create recurring tasks?",
          answer:
            "Yes. Choose daily, weekdays, weekends or specific days, then set a start and end date. See your plans in weekly and monthly calendars. AI recurring suggestions are a Premium\u00a0feature.",
        },
        {
          question: "Can I use Aido without friends?",
          answer:
            "Absolutely. You can plan on your own with notes, tasks, and calendars. When you want some company, find a friend and encourage each other with nudges and comments.",
        },
        {
          question: "Can friends see all my tasks?",
          answer:
            "You choose the visibility of each task. Friends can see tasks you make public; private tasks are not shared. Check the visibility setting when creating or editing a\u00a0task.",
        },
        {
          question: "Which devices can I use Aido on?",
          answer:
            "Get it on iPhone and iPad (iOS and iPadOS\u00a016.4 or later) from the App\u00a0Store, and on Android phones and tablets (Android\u00a07.0 or later) from Google\u00a0Play. On a Mac with Apple\u00a0M1 or later (macOS\u00a012 or later), you can install it from the App\u00a0Store and the iPad app opens in a window. Unfold an iPhone\u00a0Duo or foldable phone, or use a tablet, to see lists and details side by side. Home screen widgets work on iOS and Android, and both the app and this website support English and\u00a0Korean.",
        },
        {
          question: "What do I get for inviting friends?",
          answer:
            "When a friend who joined within the last 7\u00a0days accepts your invite, they get 7\u00a0days of Premium right away. You get 7\u00a0days of Premium and can add 1\u00a0more friend once they complete to-dos on 2\u00a0days within 14\u00a0days of joining (several on the same day count as 1\u00a0day). Rewards are in-app Premium only and have no cash value. You can earn up to 30\u00a0days of Premium every 30\u00a0days, and up to 90\u00a0days in total. See Article 13-2 of the Terms of Service for\u00a0details.",
        },
        {
          question: "How do I delete my account?",
          answer:
            "Open the Me tab in the app and tap Delete Account at the bottom. If you can't use the app, follow the account deletion page to request it by email. Deleting your account doesn't cancel your subscription, so cancel it in the store\u00a0first.",
        },
      ],
    },
    cta: {
      titleLineOne: "One small step.",
      titleLineTwo: "Start with a friend.",
      description:
        "Share your plans, encourage each other and work through today’s\u00a0to-dos.",
      closingNote: "Start free. Some features require\u00a0Premium.",
      devices: "iPhone · iPad · Mac (Apple\u00a0silicon) ·\u00a0Android",
      channelsLabel: "Want a look before you\u00a0install?",
      youtubeLabel: "Watch on YouTube",
      linkHubLabel: "All official links",
    },
    storeButtons: {
      ariaLabel: "App download links",
      appStorePrefix: "Download on the",
      appStoreLabel: "App Store",
      playStorePrefix: "Get it on",
      playStoreLabel: "Google Play",
      newTabLabel: "Opens in a new tab",
    },
    invite: {
      metaTitle: "Friend invite",
      metaDescription:
        "A friend invited you to Aido. Install the app and join to get 7\u00a0days of\u00a0Premium.",
      brandLabel: "Aido friend invite",
      loadingLabel: "Loading your invite",
      titleTemplate: "{name} invited you to Aido",
      titleFallback: "A friend invited you to Aido",
      lead: "Start together and cheer each other on until today’s to-dos are\u00a0done.",
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
      codeManualStatus:
        "Copy was blocked. Press and hold the code to copy\u00a0it.",
      codeHint:
        "Enter this code when you join after installing. On Android it fills in automatically.",
      outdatedNote:
        "Already use Aido? Update the app to the latest version, then open this link\u00a0again.",
      rewardTermsNote:
        "Accept the invite within 7\u00a0days of joining to get it. It's in-app Premium only, has no cash value, and can't be claimed again on a device or account that already got\u00a0it.",
      rewardTermsLink: "See invite reward terms",
      retry: "Try again",
      errors: {
        invalidCode: {
          title: "Please check your invite link",
          description:
            "The link may be cut off or changed. Ask your friend to send it\u00a0again.",
        },
        notFound: {
          title: "We couldn’t find this invite code",
          description:
            "Check the code again or ask your friend for a new\u00a0link.",
        },
        changed: {
          title: "Your friend made a new invite link",
          description:
            "This link no longer works. Ask your friend for the latest\u00a0one.",
        },
        unavailable: {
          title: "Invites are unavailable right now",
          description:
            "Please try again in a bit. You can still install Aido\u00a0first.",
        },
        unknown: {
          title: "We couldn’t load your friend’s info",
          description:
            "Your code still works. You can also try again in a\u00a0bit.",
        },
        renderError: {
          title: "We couldn’t show this invite",
          description: "Try again, or reopen the link in a bit.",
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
      youtubeLabel: "YouTube",
      externalLinkLabel: "Opens in a new tab",
    },
    legal: {
      badge: "Policies",
      viewTermsLabel: "View Terms of Service",
      viewPrivacyLabel: "View Privacy Policy",
      privacyTitle: "Privacy Policy",
      privacyDescription:
        "How Aido collects, uses, stores, and protects your personal\u00a0data.",
      termsTitle: "Terms of Service",
      termsDescription:
        "Usage terms, subscription conditions, and user rights for\u00a0Aido.",
      accountDeletionTitle: "Account deletion",
      accountDeletionDescription:
        "How to delete your Aido account in the app or request deletion by email without the app, and what data is deleted or\u00a0kept.",
    },
    patchNotes: {
      kicker: "Growing a little every day",
      title: "Patch Notes",
      description:
        "Aido keeps getting a little better. Catch up on app updates and on service improvements that need no new\u00a0installation.",
      appUpdate: "App update",
      serviceUpdate: "Service improvements",
      noAppUpdateNeeded: "These changes apply without an app\u00a0update.",
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
        "Explore app updates and service improvements by month. Open a record to see what\u00a0changed.",
      releaseCount: "{count} updates",
      releaseCountOne: "1 update",
      expand: "Read more",
      collapse: "Show less",
      initialNote:
        "This is Aido's very first release. Thanks for taking the first step with\u00a0us.",
      closingNote:
        "We keep making little improvements for better days.\u00a0🐾",
      highlightsLink: "See it in real app screens",
    },
    releaseHighlights: {
      breadcrumbLabel: "Patch Notes",
      releasedLabel: "Released",
      contentsLabel: "In this update",
      screenNote: "Real app screens",
      freeLabel: "Free",
      premiumLabel: "Premium",
      featureLabel: "Feature",
      allNotesTitle: "Want every change?",
      allNotesDescription:
        "The patch notes list every fix and small improvement in this\u00a0update.",
      allNotesLink: "Read the full patch notes",
    },
    languageSwitcher: {
      ko: "KO",
      en: "EN",
      navLabel: "Language selection",
    },
    theme: {
      label: "Appearance",
      toggle: "Change appearance",
      light: "Light",
      dark: "Dark",
      system: "Match device",
    },
  },
};

export function getMessages(locale: Locale): MessageCatalog {
  return catalogs[locale];
}
