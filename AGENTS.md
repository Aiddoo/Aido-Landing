# Aido 랜딩 (aido.kr)

AI 투두 플래너 앱 "아이두"의 랜딩 페이지. Next.js 16 App Router, 완전 정적(SSG), 한/영 커스텀 i18n.

## 명령어

```bash
pnpm dev          # 개발 서버
pnpm build        # 프로덕션 빌드 (--webpack, Turbopack 아님)
pnpm lint         # Biome (biome check)
pnpm typecheck    # tsc --noEmit
pnpm seo:check    # 빌드 HTML·메타데이터·SSG·사이트맵 검증 (build 이후)
```

## CI/CD

- **CD는 Vercel Git 연동**: `main` push → 프로덕션 자동 배포, PR/브랜치 push → 프리뷰 URL. 수동 `vercel --prod`는 쓰지 않는다.
- **CI는 GitHub Actions** (`.github/workflows/ci.yml`): PR과 main push에서 린트 → 타입체크 → 빌드 → SEO 검증. 머지 전에 CI 초록불을 확인할 것.

## 아키텍처 규칙

- 라우팅: 정규 URL은 `/{locale}{path}` 뿐이다 (`ko`|`en`). bare 경로(`/`, `/terms` 등)는 `src/proxy.ts`가 rewrite하거나 스텁 페이지가 redirect하는 비정규 주소 — 사이트맵·링크에 넣지 않는다.
- **SSG 유지가 최우선**: `[locale]/layout.tsx`는 `dynamicParams = false`. 로케일 하위 레이아웃/페이지에서 `headers()`/`cookies()` 등 요청시점 API를 쓰면 정적 생성이 깨진다. 금지.
- i18n: 모든 UI 문구는 `src/i18n/messages.ts`의 단일 카탈로그. **문구를 추가·수정할 땐 반드시 ko/en 둘 다** 채운다. 법적 문서만 예외적으로 `src/content/legal/*.md`(ko) + `*.en.md`.

## SEO 규칙 (2026-07 정비 완료 — 이 상태를 유지할 것)

- 정규 도메인은 **`https://aido.kr`** (www 없음). www는 Vercel에서 308 리다이렉트. 도메인·스토어·SNS URL 상수는 `src/lib/seo.ts`에서만 가져다 쓴다 — 하드코딩 금지.
- **새 페이지를 추가할 때** 반드시 함께 할 것:
  1. `generateMetadata()`에서 `buildPageMetadata()`로 title / description / canonical / hreflang(`ko`·`en`·`x-default`) 작성
  2. `buildSocialMetadata()`(`src/lib/seo.ts`) 스프레드로 OG/Twitter 추가 — Next.js는 `openGraph`를 부모와 딥 머지하지 않고 통째로 교체하므로 이 헬퍼 없이 일부 필드만 쓰면 홈의 og:url을 상속받는 버그가 재발한다
  3. `src/app/sitemap.ts`의 `routes` 배열에 항목 추가 (lastModified 포함)
- **sitemap `lastModified`는 실제 변경일만**: 홈·패치노트는 최신 릴리스일(자동), 법적 문서는 시행일 상수. `new Date()`로 매 빌드 갱신하면 검색엔진이 이 값을 무시하게 된다 — 금지.
- **`public/google*.html`, `public/naver*.html`은 절대 삭제 금지** — Google/네이버 소유확인 파일. 지우면 서치콘솔 소유권이 풀린다.
- 이미지: `next.config.ts`의 `images.unoptimized: true`는 의도된 설정(과금 회피). 대신 `public/`에 넣는 이미지는 **300KB 이하로 압축**해서 커밋한다 (특히 og-image는 카카오톡 크롤러 대응).
- JSON-LD의 Organization·WebSite는 `src/app/[locale]/layout.tsx`, MobileApplication은 홈 `src/app/[locale]/page.tsx`에 있다. 하위 페이지는 BreadcrumbList를 제공한다. 채널(SNS·스토어) 추가 시 Organization `sameAs`도 갱신.
- `GOOGLE_SITE_VERIFICATION`/`NAVER_SITE_VERIFICATION` env는 조건부 meta 태그용 — 현재는 HTML 파일 방식을 쓰므로 비워둔 상태가 정상.

## 콘텐츠 절차

- **패치노트 추가**: `src/data/patch-notes.ts`의 `releaseNotes` 배열 **맨 앞**에 추가 (최신이 index 0 — sitemap lastmod가 여기서 자동 반영). ko/en 요약·항목 모두 작성. 최신 기록만 기본 펼침이며 나머지는 날짜 기준 월별 보관함에 자동으로 묶인다. 기록 본문은 접힌 상태에서도 SSR HTML에 포함된다. 커밋 메시지 관례: `feat: v1.x.x 패치노트`.
- **약관/개인정보 개정**: `src/content/legal/`의 ko·en 파일 쌍 수정 + `src/app/sitemap.ts`의 시행일 상수(`termsEffectiveDate`/`privacyEffectiveDate`) 갱신.

## 공식 표기 (임의로 바꾸지 말 것)

- 상호: **레드밴드** (영문 **RedBand**) / 대표: 김용민 (Yongmin Kim)
- 고객 문의: **matthew@redband.co.kr**
- 앱: App Store id6757722325, Google Play `com.aido.mobile`, Instagram `aiddoo_official`

- 프리뷰는 빌드 시 `VERCEL_ENV=preview`로 noindex / robots disallow. 프로덕션은 index 유지.
- 폰트는 Google Fonts의 동일한 Black Han Sans·Noto Sans KR를 `public/fonts`에서 직접 제공한다. 출처·라이선스는 해당 디렉터리 README/OFL 파일에 있다.

## GitHub 운영

- 비공개 작업 보드: [Aido Landing](https://github.com/orgs/Aiddoo/projects/1). 모든 이슈·PR은 실제 작업 담당자를 지정하고 보드에 연결한다.
- 이슈 Type은 `Feature` / `Bug` / `Task` 중 선택한다. GitHub PR에는 Issue Type이 없으므로 라벨로 목적을 표시한다.
- 라벨은 필요한 것만 조합한다: `enhancement`(기능), `bug`(수정), `documentation`(문구·문서), `maintenance`·`dependencies`(업데이트), `design`(화면), `seo`(검색).
- 필드는 `Status`(Todo / In Progress / Done), `Priority`(P1 긴급 장애·배포 차단 / P2 일반 개선 / P3 문서·기록 정비)만 사용한다. 머지된 PR과 완료 확인한 이슈는 Done으로 정리한다.
- 패치노트는 ko/en 모두 완결된 문장으로 쓴다. 한국어는 친근한 해요체, 영어는 짧은 문장과 마침표를 사용한다. 개발 용어·과장된 약속은 피하고, 버전·날짜·사용 한도 등 실제 변경 사실은 유지한다. 영어 기능명은 to-dos / notes / checklist items / AI suggestions / My Page로 통일한다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
