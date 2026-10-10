# Aido Landing 검색·분석 운영

## 연결 대상

- 정규 웹사이트: https://aido.kr (ko/en 16개 공개 페이지).
- Search Console: `sc-domain:aido.kr`. `https://aido.kr/sitemap.xml`은 2026-10-04 확인 당시 성공적으로 읽혔고 14개 URL이 발견됐다. 이는 당시 관측값이며 현재 정규 페이지 수 16개와 구분한다.
- GA4: 기존 Aido/Firebase 속성 `519461006` / 계정 `380211368` 안의 웹 스트림 **Aido Landing (aido.kr)** (`16039012294`). 모바일 iOS/Android 스트림과 구분해서 분석한다.
- 웹 측정 ID: `G-H6J12TDN8E`. 인증 비밀이 아닌 공개 Google 태그 식별자다. Vercel **Production**의 `NEXT_PUBLIC_GA_MEASUREMENT_ID`에만 설정한다.
- 배포는 Vercel Git 연동으로 진행한다. 로컬·Preview 빌드는 분석 공급자를 렌더링하지 않는다. 프리뷰의 noindex/robots 차단은 유지한다.

## 이벤트 계약

| 이벤트 | 의미 | 주요 파라미터 |
|---|---|---|
| `page_view` | 초기 방문과 실제 페이지 이동 | `page_path`, `page_type`, `site_locale`, `feature_slug` |
| `download_click` | App Store/Google Play 버튼 클릭 | `store`: `app_store`/`google_play`, `cta_placement`: `hero`/`download` |
| `select_content` | 기능 사용법 카드 선택 | `content_type`: `feature_guide`, `item_id`, `cta_placement`: `home_guides`/`related_guides` |
| `language_switch` | 다른 언어로 전환 | `target_locale`, 현재 `site_locale` |

페이지 종류는 `home`, `services`, `feature_guide`, `patch_notes`, `terms`, `privacy`이다. `feature_slug`는 현재 보고 있는 사용법이며, `select_content.item_id`는 이동할 사용법이다. 사용법 화면의 하단 CTA는 `cta_placement=download`이고 `page_type=feature_guide`로 홈 하단과 구분한다.

`download_click`은 웹사이트의 주요 이벤트로 등록하며 주요 이벤트 수는 세션당 1회 집계한다. 원시 이벤트 수는 모든 클릭을 포함한다. 기본 금액은 지정하지 않는다. **실제 설치·가입·구매가 아니다.** 실제 설치는 기존 앱의 `first_open`, 가입·구매는 앱에서 확인한다. iOS/Android 스토어 경계를 넘는 동일 사용자 연결이나 광고 설치 귀속은 이 구현에서 보장하지 않는다. URL 쿼리나 사용자 ID로 임의 연결하지 않는다.

## 중복 집계 방지

GA4 웹 스트림의 **Enhanced measurement는 OFF**다. 태그에 `send_page_view: false`를 설정하고 코드가 페이지뷰를 보낸다. 자동 history pageview/GTM pageview를 추가하면 중복 집계된다. 별도 GTM 태그를 중복으로 설치하지 않는다.

페이지 URL은 실제 공개 경로로 정규화한다. `/`에 방문하더라도 `/ko` 또는 `/en`로 집계한다. 같은 페이지의 앵커 이동은 새 페이지뷰로 집계하지 않는다. Next.js 클라이언트 이동 시 직전의 정리된 페이지 URL을 referrer로 보낸다. 스토어 링크는 브라우저의 기본 이동을 유지하고 이벤트는 beacon 방식으로 전송한다. 외부 스크립트 차단·빠른 이탈·동의 거절 때문에 일부 클릭은 측정되지 않을 수 있다.

## 동의와 데이터 범위

- 방문자가 분석을 허용하기 전에는 Google/Vercel 분석 태그를 로드하지 않는다. 거절 후에도 콘텐츠·스토어 링크는 모두 사용할 수 있다.
- 브라우저에 선택을 180일간 저장한다. 하단 설정에서 변경 가능하다. 철회하면 GA 쿠키를 삭제하고 페이지를 새로고침해 이미 로드된 태그도 종료한다. Do Not Track/Global Privacy Control을 존중한다.
- Google Consent Mode는 기본 차단 방식이다. 광고 관련 동의 3종은 항상 denied이고 Google Signals/광고 개인화는 태그에서 끈다.
- 알려진 16개 경로만 집계한다. URL 해시·임의 쿼리·회원 ID·이메일·메모·할 일 텍스트를 이벤트에 추가하지 않는다. 외부 referrer는 origin만 유지한다.
- UTM 5종은 영문/숫자/밑줄/하이픈, 1~100자만 허용한다. 민감한 정보나 사람 이름을 캠페인 값에 넣지 않는다. 캠페인 URL에는 일반적인 슬러그를 사용한다.

예: `https://aido.kr/ko?utm_source=instagram&utm_medium=social&utm_campaign=launch_202610&utm_content=bio`

## 보고서 사용

GA4에서 웹 스트림 또는 플랫폼 Web을 필터로 적용한다. 앱 전체 수치를 랜딩 성과로 해석하지 않는다.

1. 유입: Traffic acquisition에서 Session source/medium과 캠페인별 방문 및 `download_click`을 확인한다.
2. 콘텐츠: Pages and screens에서 페이지별 조회수와 `download_click`을 비교한다.
3. 언어/버튼: Explore에서 `site_locale`, `store`, `cta_placement`, `page_type`, `feature_slug`의 이벤트 범위 맞춤 측정기준을 사용한다. 모두 저카디널리티 값이다.
4. 검색: 연결된 Search Console 데이터에서 검색어·노출·클릭·랜딩 URL을 확인한다. GA4 주요 이벤트와 Search Console 클릭은 정의와 동의 범위가 달라 서로 같을 필요가 없다.

Google AI Overviews/AI Mode의 노출·클릭은 Search Console의 웹 검색 실적에 포함된다. 현재 별도 AI 노출 필터가 제공되는 것으로 가정하지 않는다. 일반 검색과 AI 검색 모두 색인 가능한 실제 HTML, canonical/hreflang, 내부 링크를 유지한다. 순위나 AI 인용을 보장하지 않는다.

## 공급자 교체와 키 관리

환경변수는 `features/analytics/config/analytics-config.server.ts` 한 곳에서 읽고 Zod로 검증합니다. 공용 스키마는 공식 `zod/mini`의 strictObject/discriminatedUnion과 z.infer를 사용해 런타임 검증을 유지하면서 초기 번들 비용을 줄입니다. Production에서 잘못된 ID/공급자/SDK 설정은 빌드를 실패시킵니다. ID가 비어 있으면 GA만 제외합니다. Preview와 로컬은 설정을 전달하지 않습니다.

| 키 | 범위/기본값 | 역할 |
|---|---|---|
| `ANALYTICS_PROVIDERS` | 서버, 기본 `ga4,vercel` | `ga4`, `vercel`, 쉼표 조합 또는 `none` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | 공개 ID, Production만 설정 | 기존 GA4 웹 스트림 유지; 비밀 키 아님 |
| `VERCEL_ENV`, `VERCEL` | 플랫폼 제공 | Production 제한, Vercel 프로젝트 연결 |
| `NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG` | 플랫폼의 공개 SDK JSON | SDK 설정 보존, JSON 형태 검증 |
| `NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH` | 플랫폼의 공개 경로 | SDK base path 보존, 같은 origin의 경로만 허용 |

인증 토큰·서버 API 비밀을 NEXT_PUBLIC 키나 Client Props에 넣지 않습니다. 현재 기능에는 비밀 키가 필요하지 않습니다. GA 웹 스트림의 Enhanced measurement OFF 설정은 유지합니다.

도메인 계약은 `schemas/analytics.schema.ts`의 page/event/consent/config와 `models/analytics-adapter.ts`입니다. CTA는 공급자 이름 대신 `analyticsAttributes`로 `download_click`, `feature_guide_click`, `language_switch`를 표시합니다. 데이터셋은 다시 Zod로 검증합니다. GA 어댑터만 `feature_guide_click`을 기존 `select_content`로 바꿉니다. Vercel 기본 요금제는 pageview만 보내며 유료 custom event에 의존하지 않습니다.

새 도구는 AnalyticsAdapter와 typed transport를 구현하고, 공개 설정 스키마/서버 등록 및 `create-browser-analytics-client` 등록부에 추가합니다. 페이지·CTA·동의 저장소·런타임은 수정하지 않습니다. adapter 초기화 실패는 해당 공급자만 제외하며 초기화 중 이동한 경우 현재 페이지를 보냅니다. script promise를 공유해 재실행 시 중복 설치하지 않고 경로별 마지막 URL을 비교해 중복 페이지뷰를 막습니다.

저장 실패 시 오류를 표시하고 전송을 차단합니다. 만료·다른 탭 변경도 구독하며 철회 시 즉시 전송을 막고 GA 쿠키를 지운 뒤 새로고침합니다. 이미 설치된 SDK의 내부 리스너는 새로고침으로 완전히 종료합니다.

## 동의를 거절한 방문자를 어떻게 분석하나

랜딩페이지라는 이유만으로 GA 쿠키 동의가 면제되는 것은 아닙니다. 의무는 대상 지역·기술·수집 목적에 따라 달라지며 이 프로젝트는 양쪽 공급자를 사전 동의 뒤 실행하는 보수적인 운영 정책을 선택했습니다. Vercel의 cookieless 방식도 자동적인 법적 면제 선언으로 해석하지 않습니다.

모두 거절하면 이 설정에서 GA/Vercel 방문·클릭 데이터는 0입니다. 동의한 표본을 전체 방문자로 단정하지 않습니다. 검색 노출/클릭/검색어는 Search Console에서, 실제 설치는 스토어/앱 first_open에서 별도로 확인합니다. 서로 다른 시스템의 수치를 사용자 식별값으로 임의 연결하지 않습니다. Advanced Consent Mode의 동의 거절 ping·모델링은 켜지 않습니다. 트래픽 요건과 별도 법적 판단 없이 “거절해도 전부 복원 가능”하다고 가정하지 않습니다. 일반 서비스는 동의한 표본, 검색 실적, 스토어/서버의 집계 지표를 각 정의에 맞춰 함께 사용합니다.

## 검증

분석 코드 변경은 Vitest 계약 검사인 `pnpm analytics:check`와 lint/typecheck로 확인한다. URL 경계·UTM/외부 referrer 정리·동의 유효기간은 CI에서도 검증한다. 라우팅·HTML·메타데이터까지 바꿨다면 빌드 후 `pnpm seo:check`를 사용한다. 전체 CI·배포 절차는 [기여 안내](contributing.md)에 있다.

`pnpm test:browser`는 로컬 테스트 ID와 모의 Google/Vercel 스크립트만 사용하며 운영 수집 요청을 보내지 않습니다. 브라우저에서는 동의 전·거절 후 태그 부재, 새로고침/언어 이동 시 선택 유지, 동의 후 태그 1개, 철회 후 태그 제거를 확인한다. GA4 DebugView로 처음 `page_view` 1개, 기능 카드 `select_content` 후 페이지뷰 1개, 언어 전환·스토어 클릭과 파라미터를 확인한다. 검증 방문에는 `?analytics_debug=1`을 붙일 수 있고 이 파라미터는 전송 URL에서 제거된다. DebugView 검증도 테스트 트래픽이므로 운영 보고서에서 감안한다.

Search Console 색인 요청은 크롤링 대기열 등록이며 색인 완료를 의미하지 않는다. 새 사용법 URL 6개는 사이트맵과 내부 링크로 연결돼 있고, 개별 요청 결과는 배포 기록에 남긴다. 이미 canonical 대체 페이지인 주소·정상 리디렉션·폐기 URL은 무조건 오류로 취급하거나 홈으로 리디렉트하지 않는다.

공식 근거: [GA4 pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views), [SPA 측정](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications), [Consent Mode](https://developers.google.com/tag-platform/security/guides/consent), [Google AI 검색](https://developers.google.com/search/docs/appearance/ai-features), [Vercel 데이터 정리](https://vercel.com/docs/analytics/redacting-sensitive-data).
