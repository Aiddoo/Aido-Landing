# Aido 랜딩 페이지

AI 투두 플래너 앱 **아이두(Aido)** 의 공식 랜딩 페이지입니다.

**Live**: [aido.kr](https://aido.kr) · [App Store](https://apps.apple.com/kr/app/id6757722325) · [Google Play](https://play.google.com/store/apps/details?id=com.aido.mobile) · [Instagram](https://www.instagram.com/aiddoo_official/)

## 기술 스택

- **Next.js 16** (App Router, 완전 정적 SSG, React Compiler)
- **React 19** · **Tailwind CSS 4** · framer-motion
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
| `pnpm seo:check` | 빌드 후 HTML·메타데이터·SSG·사이트맵 검증 |
| `pnpm format` | 코드 포맷팅 |

## 프로젝트 구조

```
src/
├── app/              # App Router — [locale]/ 하위가 정규 라우트
│   ├── [locale]/     # 홈 · features/[slug] · patch-notes · terms · privacy (ko/en SSG)
│   ├── robots.ts     # robots.txt
│   └── sitemap.ts    # sitemap.xml (lastmod는 실제 변경일 기준)
├── components/       # UI 컴포넌트
├── content/legal/    # 약관·개인정보처리방침 (ko/en 마크다운)
├── data/             # 패치노트 · 기능 사용법 경로/이미지/확인일
├── i18n/             # 로케일 설정 · 메시지 카탈로그
├── lib/seo.ts        # 도메인·스토어 URL 상수, OG 메타데이터 헬퍼
└── proxy.ts          # 로케일 라우팅 미들웨어
```

## 배포 & CI

- **CD**: Vercel Git 연동 — `main` push는 프로덕션([aido.kr](https://aido.kr)), PR은 프리뷰 URL 자동 배포
- **CI**: GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) — PR·main push에서 린트 → 타입체크 → 빌드 → SEO 검증
- 루트 문서(README, AGENTS.md 등)만 바뀐 커밋은 CI·배포를 건너뜁니다

## 기능 사용법 콘텐츠

`/ko/features/ai-todo`, `/ko/features/recurring-todo`, `/ko/features/shared-todo`와 같은 영어 경로를 정적으로 생성합니다. 홈과 관련 사용법 카드에서 연결하며, 단계·예시·무료/프리미엄 범위·FAQ 답변을 초기 HTML에 제공합니다.

- 문구: `src/i18n/messages.ts`의 `featureGuides`에 ko/en을 함께 작성합니다. 실제 앱 동작과 이용 한도를 확인하고 수정합니다.
- 경로·이미지·내용 확인일: `src/data/feature-guides.ts`에서 관리합니다. `updatedAt`은 해당 사용법을 실제로 수정한 날짜에만 변경합니다. 사이트맵에 자동 반영됩니다.
- 검증: `pnpm build` 후 `pnpm seo:check`를 실행합니다. 배포 후 Search Console에서 기능 URL의 색인·검색어·AI 노출을 확인합니다.

## 검색 및 방문 분석

GA4 웹 스트림과 Search Console, 페이지별 조회 및 스토어 클릭 추적은 [운영 가이드](docs/analytics.md)를 참고하세요. 운영 환경에서 방문자가 분석을 허용한 후 수집을 시작하며, 프리뷰와 개발 트래픽은 제외합니다.

## 기여 규칙

작업 규칙(SEO 규칙, 패치노트·약관 갱신 절차, i18n 원칙)은 [AGENTS.md](AGENTS.md)에 정리되어 있습니다. AI 에이전트(Claude Code, Codex)도 같은 파일을 참조합니다.

---

© 2026 Aido · 상호 레드밴드 · 문의 [matthew@redband.co.kr](mailto:matthew@redband.co.kr)
