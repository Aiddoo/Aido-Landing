# 프론트엔드 아키텍처

## Before → After

| 경계 | Before | After |
|---|---|---|
| 화면 구성 | 라우트가 화면·문서 레이아웃·지역 UI를 함께 소유 | `app`은 params/metadata/static params, `features/*/pages`는 위에서 아래로 읽는 화면 구성 |
| 폴더 | 평평한 `components`, 중앙 `data` | 기능별 `pages/components/data/hooks/styles`, 실제 재사용 UI는 `components/*` |
| 법적 문서 | 중복 화면, 자체 정규식 Markdown 파서, 번역 누락 시 한국어 대체 | 공통 LegalPage, 서버 react-markdown/GFM, 명시적인 한영 파일 쌍 |
| 분석 | 한 Client Component의 GA/Vercel/동의/DOM 처리 | Zod 계약 → 동의 저장소 → 공급자 독립 런타임 → 어댑터 → 브라우저 통합 |
| UI | 사용하지 않는 Radix 버튼, 직접 모바일 메뉴 닫기, 손그림 유틸 | shadcn CLI(base-nova) 생성 Base UI 컴포넌트 + 브랜드 cva 변형, 앱과 같은 이름의 레이아웃 원시 컴포넌트 |
| 타입 | strict, 단언과 배열 첫 항목 가정 | 추가 strict 옵션, Next typegen/typedRoutes, unknown 경계 Zod, schema-dts |
| 자원 | 모든 언어가 한국어 폰트 CSS 수신, 원본 크기 이미지 | 한국어 전용 해시 CSS/공개 문구 폰트 서브셋, 정적 반응형 이미지 loader |

## 소유권과 읽는 순서

```text
src/
  app/[locale]/...       # Next.js 라우팅·SSG·metadata
  features/
    landing/{pages,components,styles}
    services/{pages,components,data}
    feature-guides/{pages,components,data}   # data: 가이드 목록·실제 화면 카탈로그
    updates/{pages,components,data,hooks}
    legal/{pages,components,data}
    invite/{pages,components,hooks,api,models,schemas,utils,data,tests}  # /i/{코드}, 필요한 블록만 클라이언트
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
    layout/             # MarketingLayout, SiteHeader, SiteFooter, PageHeader(하위 페이지 머리)
    navigation/         # 언어 전환·모바일 메뉴(Sheet)·PageBreadcrumb
    marketing/          # BrandLogo·StoreButtons·DownloadCard·FaqList(details)·BrandMotif
    media/              # PhoneScreenshot(AspectRatio+fill)·AppScreenshot·정적 loader/data
    motion/             # 지연 로드 GSAP 경계/정리
    seo/                # schema-dts JSON-LD·Breadcrumb
    fonts/              # locale 자원 목록·preload
    ui/                 # shadcn CLI 생성 Base UI 원본 기반 + 브랜드 cva 변형
      layout/           # Box·Stack/HStack/VStack·Grid·Centered·Spacing·ListRow·ReadableContent
  hooks/                # 기능 독립 useHydrated
  i18n/                 # 한영 문구/locale 정책
  content/legal/        # Git으로 관리하는 한영 문서
  lib/                  # 도메인/스토어/SNS, 공개 경로, UTC 날짜 포맷
```

라우트에서 로케일·slug를 검증하고 필요한 식별값을 화면에 전달합니다. LandingPage는 Hero → Values → Foldable → AppPreview → FeatureGuides → Friends → FAQ → CTA 순서입니다. 사용법은 GuideWalkthrough → GuideExample → GuideDetails → GuidePlans 순서이며 한 화면에서만 쓰는 컴포넌트는 페이지 아래에 둡니다. 화면의 서로 다른 의미를 가진 섹션을 배열로 일반화하지 않습니다. 실제 콘텐츠 목록은 안정된 키로 map합니다. map 자체가 모든 행의 DOM을 다시 만드는 것은 아닙니다.

전체 카탈로그는 서버에서만 읽습니다. Client에는 메뉴·동의·복사에 필요한 문구와 검증된 공개 설정만 전달합니다. Git 콘텐츠는 SSG로 읽으므로 API 요청, TanStack Query/Router, loaderDeps, oRPC, react-hook-form, 업로드 훅을 도입할 이유가 없습니다. 실제 비동기 데이터/폼이 생기면 해당 기능 경계에서 도입합니다. 정적 페이지에 의미 없는 Loading/Error 컴포넌트를 추가하지 않습니다.

## 디자인 시스템과 공용 UI

토큰은 `src/app/globals.css` 한 곳에 있습니다. 색은 `brand`(#ff6b43, 행동·강조), `brand-deep`(#c2410c, 크림 위 글자·링크·포커스), `brand-soft`, `fish`(#23a2ff, 친구·소셜), `bone`, `cream`(페이지 바탕), `paper`(카드), `ink`(#222), 앱과 같은 `gray-1…10`입니다. shadcn 의미 토큰(`primary`, `muted`, `accent`, `border`, `ring`…)은 이 값을 가리킵니다. 주황 바탕의 글자는 대비 때문에 흰색이 아닌 `ink`입니다. 서체는 `font-display`(Jua, h1·h2, shadcn `font-heading`), `font-sans`(Wanted Sans), `font-hand`(나눔손글씨 펜, 짧은 메모만)입니다. 크기는 `text-display-xl|lg|md`, `text-title-lg|title`, `text-body-lg|body`, `text-caption|micro`, `text-hand|hand-lg`, 간격은 Tailwind 4px 단계 + `px-gutter`·`py-section`·`py-section-sm`, 폭은 `max-w-page|narrow|reading`입니다. 둥글기는 칩(`rounded-sm`) < 버튼(`rounded-lg`, xl 버튼은 pill) < 카드(`rounded-xl`) < 큰 패널(`rounded-3xl`), 그림자는 `shadow-card`·`shadow-lift`(따뜻한 그림자)와 눌리는 버튼 아랫단 `shadow-press-*`입니다. 새 사용자 토큰을 추가하면 `src/lib/utils.ts`의 `cn` 설정에도 그룹을 알려 클래스 병합에서 지워지지 않게 합니다. 다크 모드 토큰과 `dark:` 변형은 모든 페이지를 옮긴 뒤 `<html data-color-scheme="system">`으로 켭니다.

UI는 **shadcn 레지스트리를 먼저 확인**하고(`pnpm dlx shadcn@latest view <이름>`) CLI로 추가합니다. 현재 Button·Card·Badge·Tabs·Accordion·Sheet·Separator·AspectRatio·Carousel·Skeleton·Breadcrumb·Textarea가 있습니다. 생성물은 원본 그대로 두고 브랜드 변형만 cva에 더합니다(Button `ink`·`soft`·`xl`, Card `elevated`·`soft`, Badge `soft`·`fish`). 목적이 있는 확장은 `목적-원본.tsx`(예: `download-dialog.tsx`, `store-badge-button.tsx`)로 새 파일을 만들고 `Omit<ComponentProps<typeof Dialog>, "…">`처럼 원본 Props(open/onOpenChange, className, ...rest)를 그대로 받습니다. Button은 이벤트 연결 전 클릭을 막지만(`useHydrated`) 비활성 모양으로 바뀌지 않아 서버 HTML과 첫 화면이 같습니다. shadcn 생성물의 영어 낭독 문구(Sheet "Close", Carousel "Previous/Next slide")는 쓰는 쪽에서 한영 문구로 바꿉니다.

### 레이아웃 원시 컴포넌트 (`@/components/ui/layout`)

앱 `src/shared/ui`와 같은 이름·의미입니다. 모두 Base UI `useRender`의 요소형 `render` 계약을 따라 `render={<section />}`·`<ul />`·`<li />`·`<a />`를 받아 의미 있는 태그로 렌더합니다. render 요소의 props가 우선하고 className은 합치며 ref·이벤트는 그대로 전달합니다. Props는 원본 `ComponentProps<"div">` + `render`에 cva 변형만 더하고, 인라인 style 대신 클래스로 매핑합니다.

| 컴포넌트 | 역할 |
|---|---|
| `Box` | 의미 태그로 감싸는 가장 작은 블록 |
| `Stack` / `HStack` / `VStack` | flex 방향(`column-to-row`는 md부터 가로)·`gap`(4px 단계)·`align`·`justify`·`wrap` |
| `Grid` | 반응형 열(`columns` 1–4는 가장 넓은 화면 기준)·`gap`·`align` |
| `Centered` | 자식을 가로·세로 가운데로 |
| `Spacing` | gap으로 안 되는 불규칙한 간격(`size`, `direction`), aria-hidden |
| `ListRow` | `left`·`contents`·`right` 슬롯 행, 목록에서는 `render={<li />}` |
| `ReadableContent` | 넓은 화면에서 최대 폭(`page`·`narrow`·`reading`)과 화면 여백 |

`useRender` 훅(useRef)은 Server Component에서 쓸 수 없어, 배치만 하는 이 컴포넌트들은 같은 규칙의 훅 없는 `renderLayoutElement`로 렌더합니다. 그래서 Server Component이고 클라이언트 JavaScript를 늘리지 않습니다. 상태·이벤트가 있는 클라이언트 컴포넌트를 직접 만들 때만 `useRender`를 씁니다. `render`에는 함수가 아닌 요소를 넘깁니다. 장식 모티프는 `BrandMotif`(발자국·생선은 앱 아이콘과 같은 경로, 생선 뼈·뼈다귀, aria-hidden, `currentColor`)를 씁니다. 이미지는 `AspectRatio` 안에 `next/image`의 `fill`+`sizes`로 넣어 이미지가 오기 전에도 자리를 차지하게 합니다(CLS 0).

### 컴포넌트 규칙

- `HeroSection`·`XxxSection`·`XxxContainer`·`XxxView` 같은 일반 래퍼를 만들지 않습니다. Screen(`features/*/pages/*`)이 레이아웃 원시 컴포넌트와 `render`로 직접 배치하고, 의미 있는 UI 덩어리만 컴포넌트로 만듭니다.
- 컴포넌트는 배치를 모릅니다. 바깥 margin·위치·폭을 스스로 정하지 않고 부모(Screen)가 className이나 레이아웃 원시 컴포넌트로 정합니다.
- **ProductList**: 데이터를 쓰는 컴포넌트가 직접 읽습니다(서버에서 메시지·스크린샷 카탈로그를 필요한 곳에서 읽고 여러 단계 props로 내려보내지 않음). 바깥은 `filters`/`orderBy`처럼 보이는 방식만 바꿉니다.
- **CalculationResult**: 식별자(코드·slug)는 바깥/route에서 읽고, `.Contents`가 조회하며 `.Loading`/`.Error`를 함께 둡니다.
- **AmountInput**: 입력 래퍼는 `Omit<ComponentProps<typeof X>, "…">`로 원본 props(value/onChange 등)를 그대로 유지합니다.
- 변수·props 이름은 역할이 드러나게 짓습니다(`isOpen` 대신 원본의 `open`, `data` 대신 `inviteCode`).
- **typedRoutes**: 모든 `Link`·redirect·router 경로는 `Route` 타입으로 검사합니다. 동적 경로는 `localizedPath()`처럼 템플릿 리터럴 타입을 돌려주는 헬퍼로 만들고, 상수는 `satisfies Route`로 검사합니다. `as Route` 같은 단언을 쓰지 않습니다.
- **라우트 책임 분리**: `layout.tsx`는 그 구간의 공통 셸만 둡니다(html/lang, 폰트, 분석 같은 Provider, 헤더·푸터 틀, 모든 하위 페이지에 해당하는 JSON-LD). 한 페이지만 쓰는 내용·데이터를 두지 않습니다. `page.tsx`는 params 검증, `generateStaticParams`, `generateMetadata` 뒤 기능 Screen(`features/*/pages/*-page.tsx`)을 렌더하는 일만 합니다. Screen은 섹션을 위에서 아래로 레이아웃 원시 컴포넌트로 조합합니다.
- 조합·분기는 직접 쓴 반복문·reduce·긴 if/switch 대신 es-toolkit(`groupBy`, `keyBy`, `partition`, `uniqBy`, `orderBy`, `chunk`, `compact`, `times`, `noop`…)와 ts-pattern `match(...).exhaustive()`를 씁니다.

## Props·상태·순수 함수

원본 UI를 확장할 때 `ComponentProps<typeof Original>` 또는 Base UI의 원본 Props를 기준으로 하고, 변경할 계약만 Omit합니다. AppScreenshot은 Image의 src/치수 소유권만 바꾸며 alt/sizes/loading 등은 Image 계약 그대로입니다. 입력 값은 value/onChange, 체크박스는 해당 원본의 checked/onCheckedChange를 유지합니다. 내부 구현을 설명하는 별도 prop 이름으로 바꾸지 않습니다.

상태 소유자는 AnalyticsProvider와 복사 훅입니다. 공용 Button과 메뉴 트리거는 useHydrated로 이벤트 핸들러 연결 전의 클릭을 막습니다. 언어/스토어 링크는 서버 HTML에서도 동작합니다. 모바일 메뉴 Sheet는 첫 열기 시 로드하고 실패하면 native details로 대체합니다. 머리글의 스크롤 상태는 JavaScript 없이 CSS scroll-driven animation으로 바꿔 리스너·타이머가 없습니다(지원하지 않거나 reduced-motion이면 고정 바탕). 언어 전환의 캠페인 정리 함수는 분석 스키마와 분리해 불필요한 검증 번들을 가져오지 않습니다. ConsentBanner는 값과 명확한 변경 콜백만 받습니다. 복사 상태는 idle/copying/copied/manual 중 하나이고 중복 클릭·unmount 후 비동기 결과를 차단합니다. readOnly Textarea의 값은 서버가 제공한 문안입니다. 소비하지 않는 상태 구독이나 전역 저장소를 추가하지 않습니다.

URL/캠페인/동의 레코드·이벤트 변환은 순수 함수입니다. 날짜는 `formatContentDate`의 명시적인 UTC/로케일 Intl 정책을 따릅니다. 조합과 분기는 es-toolkit groupBy와 ts-pattern의 exhaustive match를 사용합니다. 외부 JSON·환경변수·dataset을 타입 단언으로 신뢰하지 않습니다.

## 수명 주기와 검증

GSAP은 첫 스크롤 뒤 동적으로 읽으며 RSC children을 유지합니다. 제목·본문·LCP 이미지·CTA는 처음부터 보입니다. useGSAP scope/contextSafe, matchMedia/revert와 IntersectionObserver.disconnect로 해제합니다. 회전은 기존 부모에, 이동은 내부 장식에 적용합니다. reduced-motion에서는 애니메이션을 하지 않고 설정이 바뀌면 정리합니다.

분석 스크립트는 유효한 동의 뒤에만 요청합니다. 동의 전 이벤트를 큐에 담았다가 재생하지 않습니다. DOM 클릭 리스너·동의 timer/storage 리스너·abort listener를 해제합니다. 자세한 공급자 교체·키 관리·집계 한계는 [분석 운영](analytics.md)에 있습니다.

검사는 [기여 안내](contributing.md), 자원/측정 결과는 [성능 기록](performance.md)을 참고합니다. TypeScript와 스키마 검증은 코드·런타임 경계의 안전성을 강화하지만 외부 SDK/브라우저의 동작까지 “100% 오류 없음”을 보장하지 않습니다.
