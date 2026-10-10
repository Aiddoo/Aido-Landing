# 프론트엔드 아키텍처

## Before → After

| 경계 | Before | After |
|---|---|---|
| 화면 구성 | 라우트가 화면·문서 레이아웃·지역 UI를 함께 소유 | `app`은 params/metadata/static params, `features/*/pages`는 위에서 아래로 읽는 화면 구성 |
| 폴더 | 평평한 `components`, 중앙 `data` | 기능별 `pages/components/data/hooks/styles`, 실제 재사용 UI는 `components/*` |
| 법적 문서 | 중복 화면, 자체 정규식 Markdown 파서, 번역 누락 시 한국어 대체 | 공통 LegalPage, 서버 react-markdown/GFM, 명시적인 한영 파일 쌍 |
| 분석 | 한 Client Component의 GA/Vercel/동의/DOM 처리 | Zod 계약 → 동의 저장소 → 공급자 독립 런타임 → 어댑터 → 브라우저 통합 |
| UI | 사용하지 않는 Radix 버튼, 직접 모바일 메뉴 닫기 | shadcn CLI 생성 Base UI Button/Popover/Textarea, 원본 Props 유지 |
| 타입 | strict, 단언과 배열 첫 항목 가정 | 추가 strict 옵션, Next typegen/typedRoutes, unknown 경계 Zod, schema-dts |
| 자원 | 모든 언어가 한국어 폰트 CSS 수신, 원본 크기 이미지 | 한국어 전용 해시 CSS/공개 문구 폰트 서브셋, 정적 반응형 이미지 loader |

## 소유권과 읽는 순서

```text
src/
  app/[locale]/...       # Next.js 라우팅·SSG·metadata
  features/
    landing/{pages,components,styles}
    services/{pages,components,data,styles}
    feature-guides/{pages,components,data,styles}
    updates/{pages,components,data,hooks,styles}
    legal/{pages,components,data}
    analytics/
      components/       # 동의 상태의 UI 소유자, 설정/배너
      hooks/            # React 구독·라우팅 수명 주기
      schemas/          # 런타임 검증과 z.infer 타입의 단일 원본
      models/           # AnalyticsAdapter 인터페이스
      config/           # server-only 환경변수 읽기
      runtime/          # 공급자 독립 실행·동의 저장, 브라우저 등록부
      adapters/         # GA4/Vercel 계약 변환
      browser/          # DOM/storage/script/vendor globals 경계
      utils/            # URL·data-* 순수 변환
      tests/            # 경계/DI 계약 테스트
      styles/
  components/
    layout/             # MarketingLayout, SiteHeader, SiteFooter
    navigation/         # 언어 전환·모바일 메뉴
    marketing/          # 다운로드 CTA·스토어 링크·FAQ
    media/              # AppScreenshot·PhonePreview·정적 loader/data
    motion/             # 지연 로드 GSAP 경계/정리
    seo/                # schema-dts JSON-LD·Breadcrumb
    fonts/              # locale 자원 목록·preload
    ui/                 # shadcn CLI 생성 Base UI 원본 기반
  hooks/                # 기능 독립 useHydrated
  i18n/                 # 한영 문구/locale 정책
  content/legal/        # Git으로 관리하는 한영 문서
  lib/                  # 도메인/스토어/SNS, 공개 경로, UTC 날짜 포맷
```

라우트에서 로케일·slug를 검증하고 필요한 식별값을 화면에 전달합니다. LandingPage는 Hero → Values → AppPreview → FeatureGuides → Friends → FAQ → CTA 순서입니다. 사용법은 GuideWalkthrough → GuideExample → GuideDetails → GuidePlans 순서이며 한 화면에서만 쓰는 컴포넌트는 페이지 아래에 둡니다. 화면의 서로 다른 의미를 가진 섹션을 배열로 일반화하지 않습니다. 실제 콘텐츠 목록은 안정된 키로 map합니다. map 자체가 모든 행의 DOM을 다시 만드는 것은 아닙니다.

전체 카탈로그는 서버에서만 읽습니다. Client에는 메뉴·동의·복사에 필요한 문구와 검증된 공개 설정만 전달합니다. Git 콘텐츠는 SSG로 읽으므로 API 요청, TanStack Query/Router, loaderDeps, oRPC, react-hook-form, 업로드 훅을 도입할 이유가 없습니다. 실제 비동기 데이터/폼이 생기면 해당 기능 경계에서 도입합니다. 정적 페이지에 의미 없는 Loading/Error 컴포넌트를 추가하지 않습니다.

## Props·상태·순수 함수

원본 UI를 확장할 때 `ComponentProps<typeof Original>` 또는 Base UI의 원본 Props를 기준으로 하고, 변경할 계약만 Omit합니다. AppScreenshot은 Image의 src/치수 소유권만 바꾸며 alt/sizes/loading 등은 Image 계약 그대로입니다. 입력 값은 value/onChange, 체크박스는 해당 원본의 checked/onCheckedChange를 유지합니다. 내부 구현을 설명하는 별도 prop 이름으로 바꾸지 않습니다.

상태 소유자는 AnalyticsProvider와 복사 훅입니다. 공용 Button과 메뉴 트리거는 useHydrated로 이벤트 핸들러 연결 전의 클릭을 막습니다. 언어/스토어 링크는 서버 HTML에서도 동작합니다. 메뉴 팝오버는 첫 열기 시 로드하고 실패하면 native details로 대체합니다. 언어 전환의 캠페인 정리 함수는 분석 스키마와 분리해 불필요한 검증 번들을 가져오지 않습니다. ConsentBanner는 값과 명확한 변경 콜백만 받습니다. 복사 상태는 idle/copying/copied/manual 중 하나이고 중복 클릭·unmount 후 비동기 결과를 차단합니다. readOnly Textarea의 값은 서버가 제공한 문안입니다. 소비하지 않는 상태 구독이나 전역 저장소를 추가하지 않습니다.

URL/캠페인/동의 레코드·이벤트 변환은 순수 함수입니다. 날짜는 `formatContentDate`의 명시적인 UTC/로케일 Intl 정책을 따릅니다. 조합과 분기는 es-toolkit groupBy와 ts-pattern의 exhaustive match를 사용합니다. 외부 JSON·환경변수·dataset을 타입 단언으로 신뢰하지 않습니다.

## 수명 주기와 검증

GSAP은 첫 스크롤 뒤 동적으로 읽으며 RSC children을 유지합니다. 제목·본문·LCP 이미지·CTA는 처음부터 보입니다. useGSAP scope/contextSafe, matchMedia/revert와 IntersectionObserver.disconnect로 해제합니다. 회전은 기존 부모에, 이동은 내부 장식에 적용합니다. reduced-motion에서는 애니메이션을 하지 않고 설정이 바뀌면 정리합니다.

분석 스크립트는 유효한 동의 뒤에만 요청합니다. 동의 전 이벤트를 큐에 담았다가 재생하지 않습니다. DOM 클릭 리스너·동의 timer/storage 리스너·abort listener를 해제합니다. 자세한 공급자 교체·키 관리·집계 한계는 [분석 운영](analytics.md)에 있습니다.

검사는 [기여 안내](contributing.md), 자원/측정 결과는 [성능 기록](performance.md)을 참고합니다. TypeScript와 스키마 검증은 코드·런타임 경계의 안전성을 강화하지만 외부 SDK/브라우저의 동작까지 “100% 오류 없음”을 보장하지 않습니다.
