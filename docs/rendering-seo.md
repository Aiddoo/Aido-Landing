# 공개 페이지 렌더링과 SEO

렌더링·라우팅·메타데이터를 바꾸거나 공개 페이지를 추가할 때 참고합니다. 공개 콘텐츠는 Git 파일에서 관리하며 Vercel Git 배포로 갱신합니다.

## 렌더링 전략

| 대상 | 전략 | 이유와 갱신 방식 |
|---|---|---|
| 한영 홈·서비스 소개·사용법·패치노트·법적 문서, 총 16개 정규 페이지 | **SSG + Server Components** | 모두 공개 파일 기반 콘텐츠입니다. 배포할 때 HTML을 만들고 캐시하며, 방문마다 서버에서 본문을 다시 만들지 않습니다. |
| 복사·언어 전환·모바일 메뉴·분석 동의 | **작은 Client Components** | 초기 HTML에 포함한 뒤 필요한 부분만 하이드레이션합니다. 페이지 본문과 전체 한영 카탈로그를 클라이언트에서 다시 조립하지 않습니다. |
| 로케일 없는 주소 | **Proxy의 요청 시 언어 선택** | 쿠키·언어 헤더로 기존 정적 한영 페이지를 선택합니다. 보조 리다이렉트 경로의 동적 처리는 공개 본문의 SSR과 별개입니다. |
| ISR | **사용하지 않음** | 원본이 Git 안에 있으므로 주기적으로 다시 만들어도 새 내용이 생기지 않습니다. 변경은 Vercel Git 배포로 반영합니다. |

`[locale]/layout.tsx`의 `dynamic = "error"`는 요청 시 API나 캐시하지 않는 데이터가 공개 페이지에 들어오면 빌드를 실패시킵니다. `dynamicParams = false`는 등록하지 않은 언어·사용법 경로의 요청 시 생성을 막습니다. `pnpm seo:check`는 실제 빌드 결과에서 16개 페이지의 정적 생성·ISR 미사용, 본문의 초기 HTML 포함, canonical·hreflang·OG/Twitter·JSON-LD·실제 변경일의 사이트맵을 확인합니다. 패치노트와 FAQ는 브라우저 기본 `<details>`를 사용해 JavaScript 없이도 펼칠 수 있습니다.

## 폰트

기존 Black Han Sans·Noto Sans KR를 로컬 WOFF2로 제공합니다. 한국어 제목 한 개만 preload하고 본문은 Unicode 서브셋을 사용합니다. 영어 파일이 공유 레이아웃을 통해 한국어 페이지에서도 미리 다운로드되지 않도록 영어 자동 preload는 끄고 CSS로 발견합니다. `optional`, 시스템 대체 글꼴, 내용 해시와 1년 immutable 캐시를 사용합니다. 출처·용량·라이선스·재생성은 [폰트 안내](../public/fonts/README.md)에 모읍니다.

## 페이지 추가와 검색 메타데이터

- 정규 주소는 `https://aido.kr/{ko|en}/...`입니다. 로케일 없는 경로와 www 주소는 사이트맵·내부 링크에 넣지 않습니다. 도메인·스토어·SNS 상수는 `src/lib/seo.ts`에서 가져옵니다.
- `generateMetadata()`에서 `buildPageMetadata()`로 title·description·canonical·ko/en/x-default hreflang을 작성하고 `buildSocialMetadata()`를 함께 사용합니다. Next.js는 부모의 openGraph 객체를 깊게 병합하지 않으므로 일부 값만 덮으면 홈의 og:url 등이 남을 수 있습니다.
- Organization·WebSite JSON-LD는 로케일 레이아웃, MobileApplication은 홈, BreadcrumbList는 하위 페이지에서 제공합니다. 공식 채널 변경은 Organization의 sameAs에도 반영합니다.
- `src/app/sitemap.ts`에 페이지와 실제 변경일을 추가합니다. 홈은 최신 앱 출시일, 패치노트는 기록일과 편집일 중 최신 날짜, 서비스·사용법은 콘텐츠 변경일, 법적 문서는 시행일을 사용합니다. 빌드할 때마다 현재 날짜로 갱신하지 않습니다.
- Preview는 noindex·robots disallow, Production은 index를 유지합니다. Google/네이버 소유확인 HTML 파일은 보존합니다. 현재 파일 방식이므로 verification 환경변수가 비어 있어도 정상입니다.
- 이미지 최적화 과금을 피하려고 `images.unoptimized: true`를 사용합니다. public 이미지 한 파일은 300KB 이하로 압축하며 OG 이미지도 같은 기준을 적용합니다.

## 검증 범위

렌더링·메타데이터·폰트를 바꿨다면 `pnpm build` 후 `pnpm seo:check`로 실제 생성 HTML과 manifest를 확인합니다. 검사는 16개 정규 페이지의 SSG·ISR 미사용, 미등록 경로의 동적 생성 차단, 본문·메타데이터·사이트맵·이미지·폰트를 다룹니다. 새 경로를 만들면 검사 대상도 함께 갱신합니다.

정적 HTML 제공은 검색 접근성을 위한 조건이며 검색 순위나 AI 인용을 보장하지 않습니다. 성능 비교에서는 불필요한 리소스 제거처럼 확인한 사실과 실제 방문자 LCP/CLS 측정 결과를 구분합니다. 검색·방문 측정 운영은 [분석 안내](analytics.md)를 참고합니다.
