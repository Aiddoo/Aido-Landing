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
| `pnpm audit` | 전체 의존성의 등록된 보안 취약점 검사 |
| `pnpm test` / `pnpm analytics:check` | Vitest 분석 경계·동의·공급자 DI 계약 검증 |
| `pnpm test:browser` | Playwright 상호작용·동의·폰트 차단 검증 |
| `pnpm images:generate` / `pnpm images:check` | 정적 반응형 이미지 생성 / 해시·치수 검사 |
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
├── components/       # 공용 layout/navigation/marketing/media/motion/seo/fonts/ui
├── content/legal/    # 약관·개인정보처리방침 (ko/en 마크다운)
├── features/         # landing/services/feature-guides/updates/legal/analytics
├── i18n/             # 로케일 설정 · 메시지 카탈로그
├── lib/seo.ts        # 도메인·스토어 URL 상수, OG 메타데이터 헬퍼
└── proxy.ts          # 로케일 라우팅 미들웨어
```

## 배포 & CI

- **CD**: Vercel Git 연동 — `main` push는 프로덕션([aido.kr](https://aido.kr)), PR은 프리뷰 URL 자동 배포
- **CI**: GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) — PR·main push에서 보안 감사 → 린트 → 타입체크 → 단위·이미지·패치노트 검사 → 빌드 → SEO·폰트 검증 → 브라우저 검사
- 루트 문서(README, AGENTS.md 등)만 바뀐 커밋은 CI·배포를 건너뜁니다

## 구현·운영 문서

| 작업 | 참고 문서 |
|---|---|
| 구조·Props·Server/Client 경계 | [프론트엔드 아키텍처](docs/frontend-architecture.md) |
| 성능·폰트·자원 측정 | [성능 기록](docs/performance.md) |
| 렌더링·새 페이지·SEO | [렌더링과 SEO](docs/rendering-seo.md) |
| 앱 출시·서비스 개선·스토어 문안·법적 문서 갱신 | [업데이트 기록](docs/updates.md) |
| 폰트 출처·로딩·캐시·재생성 | [폰트 안내](public/fonts/README.md) |
| GA4·Search Console·동의·이벤트 | [검색·분석 운영](docs/analytics.md) |
| 의존성·보안·shadcn·Issue·PR·CI·배포 | [기여와 배포](docs/contributing.md) |

16개 한영 공개 페이지는 **SSG + Server Components**로 배포 시 생성합니다. 브라우저 상호작용에 작은 Client Components를 사용하고, Git 콘텐츠에는 ISR을 사용하지 않습니다. 폰트는 로컬 WOFF2로 제공하며 한국어 제목만 미리 받습니다. 자세한 판단 근거와 검증 범위는 해당 문서에서 관리합니다.

## 기여 규칙

공통 제약과 작업별 문서 안내는 [AGENTS.md](AGENTS.md)에 있습니다. Codex와 Claude Code는 같은 규칙을 참조하며, 절차·배경 설명은 위의 작업별 문서에서 관리합니다.

---

© 2026 Aido · 상호 레드밴드 · 문의 [matthew@redband.co.kr](mailto:matthew@redband.co.kr)
