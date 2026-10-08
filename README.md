# Aido 랜딩 페이지

AI 투두 플래너 앱 **아이두(Aido)** 의 공식 랜딩 페이지입니다.

**Live**: [aido.kr](https://aido.kr) · [App Store](https://apps.apple.com/kr/app/id6757722325) · [Google Play](https://play.google.com/store/apps/details?id=com.aido.mobile) · [Instagram](https://www.instagram.com/aiddoo_official/)

## 기술 스택

- **Next.js 16** (App Router, 완전 정적 SSG, React Compiler)
- **React 19** · **Tailwind CSS 4**
- **한/영 i18n** — 커스텀 구현 (`src/i18n/`), 정규 URL은 `/{ko|en}/...`
- **Biome** (린트/포맷) · **pnpm**

## 시작하기

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| 명령어 | 설명 |
|---|---|
| `pnpm dev` | 개발 서버 |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm lint` | Biome 린트 |
| `pnpm typecheck` | TypeScript 타입 검사 |
| `pnpm analytics:check` | 분석 URL·캠페인·referrer·동의 유효기간 검증 |
| `pnpm patch-notes:check` | 업데이트 기록·한영 문안·스토어 요약 500자 제한 검증 |
| `pnpm seo:check` | 빌드 후 HTML·메타데이터·SSG·사이트맵 검증 |
| `pnpm format` | 코드 포맷팅 |

## 프로젝트 구조

```
src/
├── app/              # App Router — [locale]/ 하위가 정규 라우트
│   ├── [locale]/     # 홈 · services · features/[slug] · patch-notes · terms · privacy (ko/en SSG)
│   ├── robots.ts     # robots.txt
│   └── sitemap.ts    # sitemap.xml (lastmod는 실제 변경일 기준)
├── components/       # UI 컴포넌트
├── content/legal/    # 약관·개인정보처리방침 (ko/en 마크다운)
├── data/             # 패치노트 · 사용법 · 서비스 기능과 실제 한영 앱 화면
├── i18n/             # 로케일 설정 · 메시지 카탈로그
├── lib/seo.ts        # 도메인·스토어 URL 상수, OG 메타데이터 헬퍼
└── proxy.ts          # 로케일 라우팅 미들웨어
```

## 배포 & CI

- **CD**: Vercel Git 연동 — `main` push는 프로덕션([aido.kr](https://aido.kr)), PR은 프리뷰 URL 자동 배포
- **CI**: GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) — PR·main push에서 린트 → 타입체크 → 분석 경계·패치노트 검사 → 빌드 → SEO·정적 렌더링·폰트 검증
- 루트 문서(README, AGENTS.md 등)만 바뀐 커밋은 CI·배포를 건너뜁니다

## 구현·운영 문서

| 작업 | 참고 문서 |
|---|---|
| 렌더링·새 페이지·SEO | [렌더링과 SEO](docs/rendering-seo.md) |
| 앱 출시·서비스 개선·스토어 문안·법적 문서 갱신 | [업데이트 기록](docs/updates.md) |
| 폰트 출처·로딩·캐시·재생성 | [폰트 안내](public/fonts/README.md) |
| GA4·Search Console·동의·이벤트 | [검색·분석 운영](docs/analytics.md) |
| Issue·PR·CI·배포 | [기여와 배포](docs/contributing.md) |

16개 한영 공개 페이지는 **SSG + Server Components**로 배포 시 생성합니다. 브라우저 상호작용에 작은 Client Components를 사용하고, Git 콘텐츠에는 ISR을 사용하지 않습니다. 폰트는 로컬 WOFF2로 제공하며 한국어 제목만 미리 받습니다. 자세한 판단 근거와 검증 범위는 해당 문서에서 관리합니다.

## 기능 사용법 콘텐츠

`/ko/features/ai-todo`, `/ko/features/recurring-todo`, `/ko/features/shared-todo`와 같은 영어 경로를 정적으로 생성합니다. 홈과 관련 사용법 카드에서 연결하며, 단계·예시·무료/프리미엄 범위·FAQ 답변을 초기 HTML에 제공합니다.

- 문구: `src/i18n/messages.ts`의 `featureGuides`에 ko/en을 함께 작성합니다. 실제 앱 동작과 이용 한도를 확인하고 수정합니다.
- 경로·이미지·내용 확인일: `src/data/feature-guides.ts`에서 관리합니다. `updatedAt`은 해당 사용법을 실제로 수정한 날짜에만 변경합니다. 사이트맵에 자동 반영됩니다.
- 검증: `pnpm build` 후 `pnpm seo:check`를 실행합니다. 배포 후 Search Console에서 기능 URL의 색인·검색어·AI 노출을 확인합니다.

## 서비스 화면과 페이지 이동

`/ko/services`, `/en/services`는 예시 계정으로 촬영한 실제 앱 화면을 보여 줍니다. `src/data/app-screenshots.ts`에서 언어·플랫폼·이미지 크기를, `src/data/service-features.ts`에서 기능별 화면 구성을 관리합니다. 리포트·제안 예시는 문구로 표시합니다.

- 페이지 이동은 Next.js `Link`, 언어 전환은 `scroll={false}`를 사용합니다.
- 위치 이동은 브라우저 기본 앵커로 처리합니다. 로고·홈 복귀·서비스 소개 첫 화면은 `#top`, 본문 영역은 해당 `id`를 지정합니다. 같은 해시를 반복 클릭해도 이동하며 별도 스크롤 훅을 만들지 않습니다.
- 부드러운 스크롤을 사용하는 `<html>`에는 Next.js 16의 권장 `data-scroll-behavior="smooth"`를 지정합니다. 고정 헤더의 높이는 기존 `scroll-margin-top`으로 확보합니다.

## 업데이트 기록

`src/data/patch-notes.ts`에서 앱 출시(`releaseNotes`)와 앱 설치 없이 적용되는 서비스 개선(`serviceUpdates`)을 구분합니다. 화면에서는 날짜순으로 함께 보여주며 앱 기록의 요약 복사 버튼으로 500자 이내의 한영 공통 스토어 문안을 복사합니다. 작성·수정·검증 절차는 [업데이트 기록 안내](docs/updates.md)에 있습니다.

## 검색 및 방문 분석

GA4 웹 스트림과 Search Console, 페이지별 조회 및 스토어 클릭 추적은 [운영 가이드](docs/analytics.md)를 참고하세요. 운영 환경에서 방문자가 분석을 허용한 후 수집을 시작하며, 프리뷰와 개발 트래픽은 제외합니다.

## 기여 규칙

공통 제약과 작업별 문서 안내는 [AGENTS.md](AGENTS.md)에 있습니다. Codex와 Claude Code는 같은 규칙을 참조하며, 절차·배경 설명은 위의 작업별 문서에서 관리합니다.

---

© 2026 Aido · 상호 레드밴드 · 문의 [matthew@redband.co.kr](mailto:matthew@redband.co.kr)
