import type { AppScreenshotKey } from "@/components/media/data/app-screenshots";
import type { FeatureGuideSlug } from "@/features/feature-guides/data/feature-guides";
import type { ServiceFeatureId } from "@/features/services/data/service-features";
import type { Locale } from "./config";

type FeatureGuideContent = {
  title: string;
  summary: string;
  steps: { title: string; body: string }[];
  example: { introduction: string; items: string[]; note: string };
  details: { title: string; body: string }[];
  plans: { free: string; premium: string };
  faq: { question: string; answer: string }[];
  imageAlt: string;
  imageCaption: string;
};

type FriendCard = {
  name: string;
  path: string;
  alt: string;
  color: string;
  rotate: number;
  isNew?: boolean;
};
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
  screenshot: AppScreenshotKey;
  alt: string;
  secondScreenshot?: AppScreenshotKey;
  secondAlt?: string;
  rotate: number;
  premium?: boolean;
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
    backToGuides: string;
    stepsTitle: string;
    exampleTitle: string;
    plansTitle: string;
    freeLabel: string;
    premiumLabel: string;
    plansNote: string;
    relatedTitle: string;
    relatedDescription: string;
    updatedLabel: string;
    guides: Record<FeatureGuideSlug, FeatureGuideContent>;
  };
  services: {
    title: string;
    description: string;
    eyebrow: string;
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
  values: { title: string; items: ValueItem[] };
  appPreview: {
    titleLead: string;
    titleHighlight: string;
    descriptionLead: string;
    descriptionTail: string;
    premiumLabel: string;
    screens: PreviewScreen[];
    viewAll: string;
  };
  friends: {
    label: string;
    title: string;
    descriptionLead: string;
    descriptionTail: string;
    newLabel: string;
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
    appUpdate: string;
    serviceUpdate: string;
    noAppUpdateNeeded: string;
    updateSummary: string;
    copySummary: string;
    summaryCopied: string;
    copySummaryFallback: string;
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
    guides: string;
    services: string;
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
    functionalTitle: string;
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
    services: {
      title: "아이두의 하루를 둘러보세요",
      description:
        "AI 할 일 정리부터 메모, 캘린더, 친구와 콕, 날씨, 위젯까지. 아이두의 실제 iOS·Android 화면으로 나에게 맞는 사용법을 찾아보세요.",
      eyebrow: "서비스 둘러보기",
      introduction:
        "해야 할 일을 떠올리는 순간부터, 하나를 끝내고 친구에게 마음을 전하는 순간까지. 아이두와 함께하는 하루를 보여드릴게요.",
      screenshotNote:
        "실제 iOS·Android 앱을 예시 계정으로 촬영했어요. 이름과 할 일은 소개를 위한 예시예요.",
      premiumLabel: "프리미엄",
      sampleLabel: "예시 화면",
      iosLabel: "iPhone",
      androidLabel: "Android",
      jumpLabel: "보고 싶은 기능으로 이동",
      features: {
        planning: {
          navigationLabel: "캘린더",
          title: "오늘은 가볍게, 한 달은 한눈에",
          description: "주간·월간 캘린더에서 나의 속도로 계획을 세워요.",
          details: [
            "날짜를 눌러 할 일을 확인하고, 오늘 버튼으로 돌아와요.",
            "카테고리 색으로 계획을 구분하고, 마친 날에는 작은 발자국을 남겨요.",
          ],
          captions: ["주간 캘린더와 오늘의 할 일", "월간 캘린더의 날짜별 계획"],
        },
        todos: {
          navigationLabel: "할 일",
          title: "큰 일도, 작은 단계부터",
          description: "할 일 하나에 날짜·시간·반복과 체크리스트를 담아요.",
          details: [
            "체크리스트로 해야 할 일을 차근차근 나눠요.",
            "매일·주중·주말 또는 원하는 요일에 반복하도록 설정해요.",
            "할 일마다 공개 범위를 골라 나만의 계획도 간직해요.",
          ],
          captions: ["할 일 상세와 체크리스트", "반복할 요일과 기간 선택"],
        },
        notes: {
          navigationLabel: "메모",
          title: "아직 계획이 아닌 생각도 괜찮아요",
          description: "떠오른 생각을 메모해두고, 준비가 되면 할 일로 옮겨요.",
          details: [
            "자주 보는 메모는 고정하고, 원하는 순서로 정리해요.",
            "메모를 한 개의 할 일로 바꾸거나, AI로 여러 할 일로 나눠요.",
          ],
          captions: ["고정 메모와 메모 목록", "메모 상세와 할 일로 바꾸기"],
        },
        ai: {
          navigationLabel: "AI 입력",
          title: "생각나는 대로, 말하는 대로",
          description: "자연스러운 문장과 음성으로 할 일을 입력해요.",
          details: [
            "날짜와 시간을 함께 적으면 AI가 계획으로 정리해요.",
            "메모에서 나눈 할 일은 결과를 살펴보고 선택해 추가해요.",
            "AI 입력의 이용 한도는 앱의 현재 요금제 안내에서 확인할 수 있어요.",
          ],
          captions: [
            "날짜·시간·AI 입력이 있는 할 일 추가",
            "메모에서 AI 할 일 정리 시작",
          ],
        },
        friends: {
          navigationLabel: "친구",
          title: "서로의 하루에, 작은 응원 하나",
          description:
            "다른 고양이 프로필을 가진 친구들과 공개한 할 일을 함께 봐요.",
          details: [
            "이름이나 고유 해시태그로 친구를 찾고 연결해요.",
            "친구의 할 일에 콕을 보내거나 댓글·답글로 이야기를 나눠요.",
            "보낸 콕은 따로 모아 확인할 수 있어요.",
          ],
          captions: ["친구의 캘린더와 할 일", "내가 보낸 콕 목록"],
        },
        nudges: {
          navigationLabel: "콕과 답장",
          title: "응원에는 한마디, 해냈을 땐 고마움",
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
          title: "나가기 전에, 오늘 하늘도 살펴요",
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
          title: "앱을 열기 전에도, 오늘 한눈에",
          description:
            "작은 진행 상황부터 주간 달력까지, 홈 화면 크기에 맞게 골라요.",
          details: [
            "작은 위젯은 완료 수·진행률·연속 기록을 보여줘요.",
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
          title: "쌓인 하루에서, 다음 한 걸음으로",
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
            "라이트·다크 모드와 글자 크기, 앱 언어를 편하게 설정해요.",
            "프리미엄에서는 iOS·Android 앱 아이콘도 바꿀 수 있어요.",
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
      title: "아이두로 할 일을 관리하는 방법",
      description:
        "생각을 할 일로 바꾸고, 반복 일정을 챙기고, 친구와 함께 끝내는 과정을 알아봐요.",
      readGuide: "사용법 알아보기",
      backToGuides: "모든 사용법 보기",
      stepsTitle: "이렇게 시작해보세요",
      exampleTitle: "내 하루에 이렇게 써봐요",
      plansTitle: "무료로 시작하고, 필요할 때 더 넉넉하게",
      freeLabel: "무료",
      premiumLabel: "프리미엄",
      plansNote: "구독 가격과 상세 이용 조건은 앱에서 확인할 수 있어요.",
      relatedTitle: "다음으로 알아볼 기능",
      relatedDescription: "내 하루에 필요한 기능을 하나씩 더해보세요.",
      updatedLabel: "내용 확인일",
      guides: {
        "ai-todo": {
          title: "메모·음성을 AI로 할 일로 정리하기",
          summary:
            "아이두는 떠오르는 생각을 메모로 남기고, AI로 여러 할 일과 체크리스트 항목으로 정리할 수 있는 투두 리스트 앱이에요. 문장을 입력하거나 말로 할 일을 만들 수도 있어요. 정리된 결과를 확인한 뒤 내 계획에 맞게 선택하고 수정해요.",
          steps: [
            {
              title: "생각나는 내용을 메모해요",
              body: "하단의 메모 탭에서 새 메모를 만들어요. 여행 준비처럼 한 번에 정리하기 어려운 일도 떠오르는 순서대로 적어보세요.",
            },
            {
              title: "메모 상단의 로봇 아이콘을 눌러요",
              body: "AI 이용 횟수와 안내를 확인하고 시작하기를 눌러요. 결과가 나올 때까지 화면에서 기다려주세요.",
            },
            {
              title: "필요한 할 일만 남기고 다듬어요",
              body: "AI가 정리한 제목과 체크리스트 항목을 읽어봐요. 필요 없는 할 일은 닫기 버튼으로 제외하고, 제목·날짜·시간·카테고리를 내 계획에 맞게 수정해요.",
            },
            {
              title: "할 일로 만들고 하나씩 끝내요",
              body: "남겨둔 할 일을 생성해요. 할 일 상세의 수정하기에서 내용을 다시 다듬을 수 있고, 끝낸 일은 완료로 표시해요.",
            },
          ],
          example: {
            introduction:
              "여행 전에 머릿속이 복잡하다면, 먼저 메모에 준비할 일을 모아보세요.",
            items: [
              "메모 예시: 제주 여행 전에 항공권을 확인하고, 숙소를 예약하고, 짐을 챙겨야 해요.",
              "정리 예시: 항공권 확인하기 · 숙소 예약하기 · 짐 챙기기.",
              "짐 챙기기에 충전기, 세면도구 같은 체크리스트 항목을 더해요.",
            ],
            note: "사용 방법을 설명하기 위한 예시예요. AI 결과는 입력 내용에 따라 달라지므로 생성 전에 확인해주세요.",
          },
          details: [
            {
              title: "짧은 할 일은 마이크 버튼으로 말해요",
              body: "할 일 추가 화면의 마이크 버튼을 눌러요. ‘이번 주 금요일 저녁 7시 약속’처럼 날짜와 시간을 함께 말해보세요. AI가 채운 내용은 저장 전에 확인해요. 음성 입력에는 기기의 마이크와 음성 인식 권한이 필요할 수 있어요.",
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
                "네. 생성 전에 필요 없는 할 일을 제외하고 제목·날짜·시간·카테고리를 수정할 수 있어요. 생성한 뒤에도 할 일 상세에서 수정하기를 눌러 내용을 바꿀 수 있어요.",
            },
            {
              question: "메모마다 AI를 꼭 사용해야 하나요?",
              answer:
                "아니에요. 메모만 남겨두거나 직접 할 일을 만들 수 있어요. 메모 상세의 할 일로 변환으로 한 개의 할 일로 옮기는 방법도 있어요.",
            },
            {
              question: "음성으로 날짜와 시간도 입력할 수 있나요?",
              answer:
                "네. 할 일 추가 화면의 마이크 버튼을 눌러 날짜와 시간을 포함해 말할 수 있어요. 인식한 내용과 AI가 정리한 일정을 확인한 뒤 저장해주세요.",
            },
          ],
          imageAlt: "직접 입력과 음성 입력을 지원하는 아이두 할 일 추가 화면",
          imageCaption:
            "할 일 추가 화면에서 직접 입력하거나 마이크 버튼으로 말할 수 있어요.",
        },
        "recurring-todo": {
          title: "반복 할 일·캘린더·위젯으로 하루 관리하기",
          summary:
            "매일 공부하기나 주중 운동처럼 다시 챙겨야 하는 일은 아이두의 반복 할 일로 등록해요. 주간·월간 캘린더에서 계획을 살펴보고, iPhone·Android 홈 화면 위젯에서 오늘의 할 일과 완료 상태를 확인할 수 있어요.",
          steps: [
            {
              title: "반복할 할 일을 만들어요",
              body: "할 일 추가에서 ‘20분 책 읽기’처럼 실행할 일을 적어요. 시작할 날짜를 정하고, 시간이 필요한 일이라면 시간도 설정해요.",
            },
            {
              title: "반복할 요일과 기간을 골라요",
              body: "반복을 눌러 매일·주중·주말 중 하나를 고르거나 원하는 요일을 선택해요. 캘린더에서 시작일과 종료일을 정한 뒤 선택을 완료해요.",
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
              "퇴근 후 독서를 습관으로 만들고 싶다면, 부담 없는 분량부터 정해보세요.",
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
              body: "아이두 앱을 열어 로그인 상태와 오늘의 할 일을 확인해요. 앱에서 변경한 내용이 위젯에 반영되는지 살펴보고, 새로운 하루 안내가 보이면 앱을 다시 열어 확인해주세요.",
            },
          ],
          plans: {
            free: "반복 할 일은 직접 설정할 수 있고, 주간·월간 캘린더와 iOS·Android 홈 화면 위젯도 이용할 수 있어요.",
            premium:
              "AI 주간·월간 리포트로 달성 기록을 돌아보고, AI가 제안한 반복 할 일 중 나에게 맞는 제안을 수락할 수 있어요.",
          },
          faq: [
            {
              question: "월요일과 수요일에만 반복할 수 있나요?",
              answer:
                "네. 반복 설정에서 월요일과 수요일을 선택하고 시작일과 종료일을 정해요. 매일·주중·주말을 한 번에 선택하는 방법도 있어요.",
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
          imageAlt: "날짜별 할 일과 완료 상태가 표시된 아이두 주간 캘린더",
          imageCaption: "주간 캘린더에서 날짜별 할 일과 완료 상태를 살펴봐요.",
        },
        "shared-todo": {
          title: "친구와 할 일을 공유하고 함께 응원하기",
          summary:
            "아이두에서는 친구가 공개한 할 일을 보고, 콕 찌르기와 댓글·답글로 응원할 수 있어요. 각자의 투두 리스트를 관리하면서 필요한 일만 공유해요. 개인적인 할 일은 비공개로 설정하고, 혼자서 사용하는 것도 괜찮아요.",
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
              body: "할 일을 만들거나 수정할 때 공개·비공개를 선택해요. 친구는 공개한 할 일만 볼 수 있어요. 개인적인 메모를 할 일로 옮겼다면 생성한 할 일의 공개 설정도 확인해주세요.",
            },
            {
              title: "친구의 하루에 작은 응원을 보내요",
              body: "친구 캘린더에서 공개된 할 일을 살펴봐요. 콕 찌르기로 알림을 보내거나, 할 일 상세에서 댓글과 답글로 이야기를 나눠요.",
            },
          ],
          example: {
            introduction:
              "친구와 각자 운동 목표를 지키고 싶다면, 공유할 일만 공개해보세요.",
            items: [
              "내 할 일: 퇴근 후 30분 걷기. 공개로 설정해 친구가 볼 수 있게 해요.",
              "친구의 공개된 운동 계획을 보고, 콕 찌르기나 ‘오늘도 같이 힘내자!’라는 댓글을 남겨요.",
              "개인적인 일정은 비공개로 설정하고, 완료한 운동 기록은 친구 캘린더에서 함께 살펴봐요.",
            ],
            note: "댓글과 콕 찌르기는 실제 친구에게 전달돼요. 서로 편한 방식으로 응원해보세요.",
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
                "아니에요. 친구는 공개한 할 일만 볼 수 있어요. 할 일을 만들거나 수정할 때 공개 범위를 확인해주세요.",
            },
            {
              question: "친구 요청을 보냈는데 목록에 바로 보이지 않아요",
              answer:
                "친구 관리의 보낸 요청에서 상태를 확인해요. 상대방이 받은 요청에서 수락하면 친구로 연결돼요.",
            },
            {
              question: "친구 없이 혼자 사용해도 되나요?",
              answer:
                "물론이에요. 메모, 할 일, 반복 설정과 캘린더로 혼자 하루를 관리할 수 있어요. 함께하고 싶을 때 친구를 추가해보세요.",
            },
          ],
          imageAlt: "친구의 할 일에 콕 찌르기 메시지를 보내는 아이두 화면",
          imageCaption: "친구가 공개한 할 일에 콕 찌르기로 응원을 보내요.",
        },
      },
    },
    meta: {
      title: "아이두(Aido) | AI 할 일 관리·투두 리스트 앱",
      description:
        "아이두는 메모와 음성을 할 일로 정리하는 AI 투두 리스트 앱이에요. 반복 일정·캘린더·홈 화면 위젯으로 하루를 관리하고, 친구와 공개한 할 일을 공유하며 응원해요. iOS·Android에서 무료로 시작하세요.",
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
      guides: "사용법",
      services: "서비스 둘러보기",
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
      functionalTitle: "메모와 음성을 할 일로 정리하는 AI 플래너",
      description:
        "반복 일정·캘린더·홈 화면 위젯으로 하루를 관리하고, 친구와 할 일을 공유하며 서로 응원해요.",
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
      viewAll: "실제 화면으로 모든 기능 살펴보기",
      screens: [
        {
          title: "메모가 할 일이 되는 순간",
          subtitle: "AI 할 일 정리",
          description: [
            "떠오르는 내용을 메모하면 AI가 여러 할 일로 나눠줘요. 자연스러운 문장이나 음성으로도 할 일을 입력할 수 있어요.",
            "날짜와 시간, 반복, 카테고리를 내 흐름에 맞게 정리해요.",
          ],
          screenshot: "add",
          alt: "직접 입력과 음성 입력을 지원하는 아이두 할 일 추가 화면",
          rotate: -2,
        },
        {
          title: "오늘부터 한 달까지, 한눈에",
          subtitle: "주간·월간 캘린더",
          description: [
            "오늘 할 일과 주간·월간 일정을 한눈에 살펴봐요. 반복 할 일과 알림으로 꾸준한 하루를 만들어가요.",
            "iOS·Android 홈 화면 위젯에서도 오늘의 할 일과 완료 상태를 확인할 수 있어요.",
          ],
          screenshot: "month",
          secondScreenshot: "week",
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
          screenshot: "friend",
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
          screenshot: "report",
          alt: "아이두 AI 리포트의 달성률과 카테고리 분석",
          rotate: 2,
          premium: true,
        },
      ],
    },
    friends: {
      label: "함께할 고양이를 골라요",
      title: "내 하루에 작은 귀여움을",
      descriptionLead: "9가지 고양이 중 내 프로필과 함께할 친구를 골라보세요.",
      descriptionTail:
        "프리미엄에서는 마음에 드는 고양이로 앱 아이콘도 바꿀 수 있어요.",
      newLabel: "새 친구",
      cards: [
        {
          name: "러시안 블루",
          path: "/app-assets/cat-russian-blue.webp",
          alt: "연보라 배경에 졸린 표정을 짓고 있는 회색 고양이",
          color: "#f3e5f5",
          rotate: -2,
          isNew: true,
        },
        {
          name: "크림 고양이",
          path: "/app-assets/cat-cream.webp",
          alt: "연노랑 배경에 졸린 표정을 짓고 있는 크림색 고양이",
          color: "#fff9c4",
          rotate: 2,
          isNew: true,
        },
        {
          name: "턱시도 고양이",
          path: "/app-assets/cat-tuxedo.webp",
          alt: "민트색 배경에 흰 얼굴과 검은 털을 가진 고양이",
          color: "#e8f5e9",
          rotate: -1,
          isNew: true,
        },
        {
          name: "아이두 고양이",
          path: "/app-assets/cat-default.webp",
          alt: "주황색 배경에 졸린 표정을 짓고 있는 아이두의 기본 고양이",
          color: "#fdf1e3",
          rotate: 2,
        },
        {
          name: "스코티시폴드",
          path: "/app-assets/cat-scottish-fold.webp",
          alt: "연보라 배경에 접힌 귀를 가진 회색 고양이",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "치즈 태비",
          path: "/app-assets/cat-orange-tabby.webp",
          alt: "하늘색 배경에 줄무늬가 있는 치즈색 고양이",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "검은 고양이",
          path: "/app-assets/cat-black.webp",
          alt: "분홍색 배경에 졸린 표정을 짓고 있는 검은 고양이",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "샴",
          path: "/app-assets/cat-abyssinian.webp",
          alt: "연녹색 배경에 갈색 얼굴과 귀를 가진 고양이",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "하얀 고양이",
          path: "/app-assets/cat-shyam.webp",
          alt: "검은 배경에 졸린 표정을 짓고 있는 하얀 고양이",
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
            "네, 매일·주중·주말 또는 원하는 요일을 골라 반복 할 일을 만들 수 있어요. 시작일과 종료일을 정하고 주간·월간 캘린더에서 일정을 확인해요. AI 반복 제안은 프리미엄 기능이에요.",
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
        "아이두가 조금씩 달라지고 있어요. 앱 업데이트와 따로 설치할 필요 없는 서비스 개선 소식을 모았어요.",
      appUpdate: "앱 업데이트",
      serviceUpdate: "서비스 개선",
      noAppUpdateNeeded: "앱을 따로 업데이트하지 않아도 적용돼요.",
      updateSummary: "업데이트 요약",
      copySummary: "요약 복사",
      summaryCopied: "요약을 복사했어요.",
      copySummaryFallback:
        "아래 문구를 선택해 직접 복사해 주세요. 줄바꿈도 함께 복사돼요.",
      backHome: "홈으로",
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
    services: {
      title: "A day with Aido",
      description:
        "Explore AI to-do planning, notes, calendars, friends, nudges, weather and widgets through real iOS and Android app screens. Find a rhythm that feels like you.",
      eyebrow: "Explore Aido",
      introduction:
        "From a passing thought to a finished to-do—and a little thanks to a friend. Take a look at the small moments that make a day with Aido.",
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
          description:
            "See the to-dos friends share, each with a cat of their own.",
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
      title: "How to manage your to-dos with Aido",
      description:
        "Turn thoughts into to-dos, plan recurring activities and encourage friends along the way.",
      readGuide: "Read the guide",
      backToGuides: "All guides",
      stepsTitle: "Start with these steps",
      exampleTitle: "Try it in your day",
      plansTitle: "Start free, with more room when you need it",
      freeLabel: "Free",
      premiumLabel: "Premium",
      plansNote:
        "Check the app for current subscription prices and full terms.",
      relatedTitle: "More ways to use Aido",
      relatedDescription: "Find the next feature that fits your day.",
      updatedLabel: "Content reviewed",
      guides: {
        "ai-todo": {
          title: "Turn notes and voice into to-dos with AI",
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
          imageAlt:
            "Aido Add to-do screen with text input and a microphone button",
          imageCaption:
            "Type a to-do or tap the microphone to speak. The app screen shown here is in Korean.",
        },
        "recurring-todo": {
          title: "Plan with recurring to-dos, calendars and widgets",
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
              body: "Open Aido and check your sign-in status and today's to-dos. Check whether changes appear in the widget. If it says a new day has started, open the app again to refresh your view.",
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
          imageAlt:
            "Aido weekly calendar showing daily to-dos and completion progress",
          imageCaption:
            "Review to-dos and progress in the weekly calendar. The app screen shown here is in Korean.",
        },
        "shared-todo": {
          title: "Share to-dos with friends and encourage each other",
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
          imageAlt:
            "Aido screen for sending a nudge message about a friend's to-do",
          imageCaption:
            "Encourage a friend with a nudge on a public to-do. The app screen shown here is in Korean.",
        },
      },
    },
    meta: {
      title: "Aido | AI To-Do List & Task Planner",
      description:
        "Aido turns notes and voice input into to-dos with AI. Plan with recurring to-dos, calendars and home screen widgets. Share public to-dos with friends and encourage each other. Start free on iOS and Android.",
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
      guides: "Guides",
      services: "Explore Aido",
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
      functionalTitle: "An AI planner that turns notes and voice into to-dos",
      description:
        "Plan your day with recurring to-dos, calendars and home screen widgets. Share to-dos with friends and encourage each other along the way.",
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
      viewAll: "Explore every feature in the app",
      screens: [
        {
          title: "A note becomes your next step",
          subtitle: "AI Task Planning",
          description: [
            "Jot down a note and let AI turn it into multiple to-dos. Add tasks in everyday language or with voice input, too.",
            "Set the date, time, repetition, and category to fit your day.",
          ],
          screenshot: "add",
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
          screenshot: "month",
          secondScreenshot: "week",
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
          screenshot: "friend",
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
          screenshot: "report",
          alt: "Completion rates and category insights in an Aido AI report",
          rotate: 2,
          premium: true,
        },
      ],
    },
    friends: {
      label: "Pick your little companion",
      title: "A little more cute in your day",
      descriptionLead:
        "Choose from nine cats to make your profile feel like you.",
      descriptionTail:
        "With Premium, you can also choose your favorite for your app icon.",
      newLabel: "New",
      cards: [
        {
          name: "Russian Blue",
          path: "/app-assets/cat-russian-blue.webp",
          alt: "A sleepy gray cat against a lavender background",
          color: "#f3e5f5",
          rotate: -2,
          isNew: true,
        },
        {
          name: "Cream Cat",
          path: "/app-assets/cat-cream.webp",
          alt: "A sleepy cream-colored cat against a pale yellow background",
          color: "#fff9c4",
          rotate: 2,
          isNew: true,
        },
        {
          name: "Tuxedo Cat",
          path: "/app-assets/cat-tuxedo.webp",
          alt: "A black cat with a white face against a mint background",
          color: "#e8f5e9",
          rotate: -1,
          isNew: true,
        },
        {
          name: "Aido Cat",
          path: "/app-assets/cat-default.webp",
          alt: "Aido's sleepy default cat against an orange background",
          color: "#fdf1e3",
          rotate: 2,
        },
        {
          name: "Scottish Fold",
          path: "/app-assets/cat-scottish-fold.webp",
          alt: "A gray cat with folded ears against a lavender background",
          color: "#fff9c4",
          rotate: -2,
        },
        {
          name: "Cheese Tabby",
          path: "/app-assets/cat-orange-tabby.webp",
          alt: "An orange striped cat against a sky blue background",
          color: "#e3f2fd",
          rotate: 3,
        },
        {
          name: "Black Cat",
          path: "/app-assets/cat-black.webp",
          alt: "A sleepy black cat against a pink background",
          color: "#f3e5f5",
          rotate: -1,
        },
        {
          name: "Siamese",
          path: "/app-assets/cat-abyssinian.webp",
          alt: "A cat with a brown face and ears against a pale green background",
          color: "#e8f5e9",
          rotate: 2,
        },
        {
          name: "White Cat",
          path: "/app-assets/cat-shyam.webp",
          alt: "A sleepy white cat against a black background",
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
        "Aido keeps getting a little better. Catch up on app updates and service improvements that need no new installation.",
      appUpdate: "App update",
      serviceUpdate: "Service improvements",
      noAppUpdateNeeded: "These changes apply without an app update.",
      updateSummary: "Update summary",
      copySummary: "Copy summary",
      summaryCopied: "Summary copied.",
      copySummaryFallback:
        "Select the text below and copy it manually. Line breaks are included.",
      backHome: "Home",
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
