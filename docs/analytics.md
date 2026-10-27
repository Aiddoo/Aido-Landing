# Aido Landing 검색·분석 운영

## 연결 대상

- 정규 웹사이트: https://aido.kr (ko/en 16개 공개 페이지).
- Search Console: `sc-domain:aido.kr`. `https://aido.kr/sitemap.xml`은 2026-10-04 확인 당시 성공적으로 읽혔고 14개 URL이 발견됐다. 이는 당시 관측값이며 현재 정규 페이지 수 16개와 구분한다.
- GA4: 기존 Aido/Firebase 속성 `519461006` / 계정 `380211368` 안의 웹 스트림 **Aido Landing (aido.kr)** (`16039012294`). 모바일 iOS/Android 스트림과 구분해서 분석한다.
- 웹 측정 ID: `G-H6J12TDN8E`. 인증 비밀이 아닌 공개 Google 태그 식별자다. Vercel **Production**의 `NEXT_PUBLIC_GA_MEASUREMENT_ID`에만 설정한다.
- 배포는 Vercel Git 연동으로 진행한다. 로컬·Preview 빌드는 분석 공급자를 렌더링하지 않는다. 프리뷰의 noindex/robots 차단은 유지한다.

## 이벤트 계약

이벤트 이름·파라미터는 `features/analytics/schemas/analytics.schema.ts`의 `analyticsEventSchema`(Zod `discriminatedUnion`) 한 곳에만 정의하고 타입은 `z.infer`로 유도한다. 보낼 때는 `track(event)` 하나만 쓰며 같은 이름·파라미터가 GA4와 Vercel에 함께 간다. 스키마에 없는 이름·키·값은 버린다.

| 이벤트 | 의미 | 파라미터 |
|---|---|---|
| `page_view` | 초기 방문과 실제 페이지 이동(코드가 직접 전송) | `page_location`, `page_path`, `page_type`, `site_locale`, `feature_slug` |
| `download_click` | App Store/Google Play 버튼 클릭 | `store`: `app_store`/`google_play`, `cta_placement`: `hero`/`download`/`invite` |
| `select_content` | 기능 사용법 카드 선택 | `content_type`: `feature_guide`, `item_id`, `cta_placement`: `home_guides`/`related_guides` |
| `language_switch` | 다른 언어로 전환(같은 언어는 버림) | `target_locale` |
| `invite_code_copy` | 초대 코드 복사 버튼 | `copy_result`: `copied`/`manual`(코드 값은 보내지 않음) |

GA4에는 이벤트 파라미터에 현재 페이지 파라미터를 더해 보낸다. Server Component 링크는 `analyticsAttributes(event)`로 `data-analytics`에 이벤트 JSON을 싣고, 문서 클릭 리스너가 스키마로 다시 검증해 `track()`을 부른다. 클라이언트 코드는 `track()`을 직접 부른다(예: 초대 코드 복사).

페이지 종류는 `home`, `services`, `feature_guide`, `patch_notes`, `terms`, `privacy`, `account_deletion`, `invite`이다. 초대 링크 `/i/{코드}`와 실제 경로 `/{locale}/invite/{코드}`는 코드를 버리고 `/{locale}/invite`로만 집계한다(`getPublicPath`). 주소에 언어가 있으면 그 언어, 없으면(`/`, `/i/{코드}`) 화면 언어로 집계한다. `feature_slug`는 현재 보고 있는 사용법이며, `select_content.item_id`는 이동할 사용법이다. 사용법 화면의 하단 CTA는 `cta_placement=download`이고 `page_type=feature_guide`로 홈 하단과 구분한다.

`download_click`은 웹사이트의 주요 이벤트로 등록하며 주요 이벤트 수는 세션당 1회 집계한다. 원시 이벤트 수는 모든 클릭을 포함한다. 기본 금액은 지정하지 않는다. **실제 설치·가입·구매가 아니다.** 실제 설치는 기존 앱의 `first_open`, 가입·구매는 앱에서 확인한다. iOS/Android 스토어 경계를 넘는 동일 사용자 연결이나 광고 설치 귀속은 이 구현에서 보장하지 않는다. URL 쿼리나 사용자 ID로 임의 연결하지 않는다.

Vercel 맞춤 이벤트(`track`)는 Vercel 요금제에 따라 수집되지 않을 수 있다. 페이지뷰는 모든 요금제에서 집계된다.

## 중복 집계 방지

GA4 웹 스트림의 **Enhanced measurement는 OFF**다. 태그에 `send_page_view: false`를 설정하고 코드가 페이지뷰를 보낸다. Vercel도 `disableAutoTrack`으로 자동 추적을 끄고 같은 코드가 `pageview`를 보낸다. 자동 history pageview/GTM pageview를 추가하면 중복 집계된다. 별도 GTM 태그를 중복으로 설치하지 않는다.

페이지뷰는 경로·쿼리가 바뀔 때마다 한 번, 직전과 같은 정리된 URL이면 보내지 않는다. Vercel `beforeSend`도 연속된 같은 페이지뷰를 버린다. `/`에 방문하더라도 `/ko` 또는 `/en`로 집계한다. 같은 페이지의 앵커 이동은 새 페이지뷰로 집계하지 않는다. GA에는 `config`와 `set`으로 정리된 `page_location`을 먼저 넣어 이후 hit가 실제 주소(초대 코드 포함)를 쓰지 않게 하고, 클라이언트 이동 시 직전의 정리된 페이지 URL을 referrer로 보낸다. 스토어 링크는 브라우저의 기본 이동을 유지하고 이벤트는 beacon 방식으로 전송한다. 외부 스크립트 차단·빠른 이탈 때문에 일부 클릭은 측정되지 않을 수 있다.

## 동의와 데이터 범위

- **Vercel Web Analytics는 항상 켠다.** 쿠키 없이 집계만 하며, `beforeSend`가 모든 페이지뷰·이벤트 URL을 정리된 공개 경로로 바꾸고 알 수 없는 경로는 버린다.
- **GA4는 Consent Mode v2(고급)로 항상 로드한다.** gtag.js를 그리기 전에 `consent default`로 `ad_storage`·`ad_user_data`·`ad_personalization`·`analytics_storage`를 모두 `denied`, `wait_for_update: 500`으로 넣는다. 동의 전·거부 시에는 쿠키 없는 ping만 간다. 저장된 수락이 있으면 `config`보다 먼저 `consent update`로 `analytics_storage: granted`를 넣는다. 광고 3종은 수락해도 `denied`이며 Google Signals/광고 개인화 신호는 태그에서 끈다. gtag.js는 `next/script` `lazyOnload`로 유휴 시간에 읽는다.
- 첫 방문에는 하단 카드(모바일 하단 고정, 데스크톱 좌하단)로 허용/거부를 받는다. 카드는 하이드레이션 뒤 fixed로만 그려 레이아웃·첫 페인트에 영향이 없다. 선택은 `localStorage`(`aido.analytics-consent.v1`)에 180일 저장하고 저장 실패 시 오류를 표시하며 denied를 유지한다. 푸터의 **쿠키 설정**으로 다시 열 수 있고(포커스 이동, Esc로 닫기, 닫으면 포커스 복귀), 거부로 바꾸면 `analytics_storage: denied`로 갱신하고 `_ga` 쿠키를 지운다. 다른 탭의 변경·만료도 구독한다.
- Do Not Track/Global Privacy Control이 켜져 있으면 저장된 수락보다 우선해 거부로 처리하고 카드를 띄우지 않는다(쿠키 설정에서 허용 버튼 비활성). 이때는 gtag.js를 아예 읽지 않아 GA4로는 아무것도 보내지 않고, Vercel의 쿠키 없는 집계만 남는다.
- 알려진 공개 경로(ko/en)만 집계한다. URL 해시·임의 쿼리·초대 코드·회원 ID·이메일·메모·할 일 텍스트를 이벤트에 추가하지 않는다. GA의 외부 referrer는 origin만 유지한다. Vercel의 referrer는 SDK가 브라우저 값으로 보낸다.
- UTM 5종은 영문/숫자/밑줄/하이픈, 1~100자만 허용한다. 민감한 정보나 사람 이름을 캠페인 값에 넣지 않는다. 캠페인 URL에는 일반적인 슬러그를 사용한다.

예: `https://aido.kr/ko?utm_source=instagram&utm_medium=social&utm_campaign=launch_202610&utm_content=bio`

## 보고서 사용

GA4에서 웹 스트림 또는 플랫폼 Web을 필터로 적용한다. 앱 전체 수치를 랜딩 성과로 해석하지 않는다.

1. 유입: Traffic acquisition에서 Session source/medium과 캠페인별 방문 및 `download_click`을 확인한다.
2. 콘텐츠: Pages and screens에서 페이지별 조회수와 `download_click`을 비교한다.
3. 언어/버튼: Explore에서 `site_locale`, `store`, `cta_placement`, `page_type`, `feature_slug`의 이벤트 범위 맞춤 측정기준을 사용한다. 모두 저카디널리티 값이다.
4. 검색: 연결된 Search Console 데이터에서 검색어·노출·클릭·랜딩 URL을 확인한다. GA4 주요 이벤트와 Search Console 클릭은 정의와 동의 범위가 달라 서로 같을 필요가 없다.

Google AI Overviews/AI Mode의 노출·클릭은 Search Console의 웹 검색 실적에 포함된다. 현재 별도 AI 노출 필터가 제공되는 것으로 가정하지 않는다. 일반 검색과 AI 검색 모두 색인 가능한 실제 HTML, canonical/hreflang, 내부 링크를 유지한다. 순위나 AI 인용을 보장하지 않는다.

## 공급자와 키 관리

환경변수는 `features/analytics/config/analytics-config.server.ts` 한 곳에서 읽고 Zod로 검증합니다. 공용 스키마는 공식 `zod/mini`의 strictObject/discriminatedUnion과 z.infer를 사용합니다. Production에서 잘못된 ID/공급자/SDK 설정은 빌드를 실패시킵니다. ID가 비어 있으면 GA만 제외합니다(이때 동의 카드·쿠키 설정도 없음). Preview와 로컬은 설정을 전달하지 않습니다.

| 키 | 범위/기본값 | 역할 |
|---|---|---|
| `ANALYTICS_PROVIDERS` | 서버, 기본 `ga4,vercel` | `ga4`, `vercel`, 쉼표 조합 또는 `none` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 공개 ID, Production만 설정 | 기존 GA4 웹 스트림 유지; 비밀 키 아님 |
| `VERCEL_ENV`, `VERCEL` | 플랫폼 제공 | Production 제한, Vercel 프로젝트 연결 |
| `NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG` | 플랫폼의 공개 SDK JSON | SDK 설정 보존, JSON 형태 검증 |
| `NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH` | 플랫폼의 공개 경로 | SDK base path 보존, 같은 origin의 경로만 허용 |

인증 토큰·서버 API 비밀을 NEXT_PUBLIC 키나 Client Props에 넣지 않습니다. 현재 기능에는 비밀 키가 필요하지 않습니다.

| 파일 | 역할 |
|---|---|
| `schemas/analytics.schema.ts` | 이벤트·페이지·동의 레코드·설정 Zod 스키마와 타입 |
| `runtime/analytics-tracker.ts` | `track()`, `trackPageView()`, GA 시작·동의 갱신, Vercel 주입 |
| `runtime/google-consent.ts` | Consent Mode 기본값과 동의 → `analytics_storage` 변환(순수) |
| `runtime/create-consent-store.ts` | localStorage 동의 저장·만료·DNT/GPC 우선 |
| `utils/sanitize-analytics-page.ts` | 공개 경로 정규화, referrer origin, Vercel `beforeSend` |
| `browser/*` | gtag 대기열·쿠키 삭제, storage/DNT/GPC, 클릭 위임, 쿠키 설정 열기 이벤트 |
| `hooks/use-analytics-runtime.ts` | 라우트 변경마다 페이지뷰, 동의 구독, 클릭 리스너 |
| `components/*` | `AnalyticsProvider`(gtag.js 로드), 동의 카드, 쿠키 설정 버튼 |

새 이벤트는 스키마에 한 항목을 더하고 `track()`이나 `analyticsAttributes()`로 보냅니다. 새 공급자는 `analytics-tracker.ts`의 `track`/`trackPageView`에 전송을 더하고 설정 스키마·서버 등록에 추가합니다.

## 동의를 거절한 방문자를 어떻게 분석하나

랜딩페이지라는 이유만으로 GA 쿠키 동의가 면제되는 것은 아닙니다. 이 프로젝트는 GA 쿠키를 사전 동의 뒤에만 쓰고, 동의 전·거부 시에는 Consent Mode의 쿠키 없는 ping과 Vercel의 쿠키 없는 집계를 사용합니다. 이 방식이 모든 지역에서 자동으로 법적 면제가 된다고 해석하지 않으며, 대상 지역이 바뀌면 다시 판단합니다.

거부한 방문자는 Vercel 페이지뷰(전체 방문 추세)와 GA4의 쿠키 없는 ping(행동 모델링은 Google 트래픽 요건을 충족할 때만)으로 봅니다. GA4 모델링 결과를 실측으로 단정하지 않습니다. 검색 노출/클릭/검색어는 Search Console에서, 실제 설치는 스토어/앱 first_open에서 별도로 확인합니다. 서로 다른 시스템의 수치를 사용자 식별값으로 임의 연결하지 않습니다.

## 검증

분석 코드 변경은 Vitest 계약 검사인 `pnpm analytics:check`(이벤트 스키마, 동의 전이·DNT/GPC, 경로 정규화·Vercel beforeSend)와 lint/typecheck로 확인한다. 라우팅·HTML·메타데이터까지 바꿨다면 빌드 후 `pnpm seo:check`를 사용한다. 전체 CI·배포 절차는 [기여 안내](contributing.md)에 있다.

`pnpm test:browser`는 로컬 테스트 ID와 모의 Google/Vercel 스크립트만 사용하며 운영 수집 요청을 보내지 않습니다. 브라우저에서는 dataLayer 첫 명령이 denied 기본값인지, 저장된 수락의 update가 config보다 앞서는지, 거부·DNT/GPC 뒤 update가 없는지, `/i/{코드}`의 GA·Vercel URL에 코드가 없는지, 이동마다 페이지뷰 1개와 클릭 이벤트가 두 공급자에 가는지 확인한다. GA4 DebugView로 처음 `page_view` 1개, 기능 카드 `select_content` 후 페이지뷰 1개, 언어 전환·스토어 클릭과 파라미터를 확인한다. 검증 방문에는 `?analytics_debug=1`을 붙일 수 있고 이 파라미터는 전송 URL에서 제거된다. DebugView 검증도 테스트 트래픽이므로 운영 보고서에서 감안한다.

Search Console 색인 요청은 크롤링 대기열 등록이며 색인 완료를 의미하지 않는다. 새 사용법 URL 6개는 사이트맵과 내부 링크로 연결돼 있고, 개별 요청 결과는 배포 기록에 남긴다. 이미 canonical 대체 페이지인 주소·정상 리디렉션·폐기 URL은 무조건 오류로 취급하거나 홈으로 리디렉트하지 않는다.

공식 근거: [GA4 pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views), [SPA 측정](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent), [Google AI 검색](https://developers.google.com/search/docs/appearance/ai-features), [Vercel 데이터 정리](https://vercel.com/docs/analytics/redacting-sensitive-data).
