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
| `pnpm format` | 코드 포맷팅 |

## 프로젝트 구조

```
src/
├── app/              # App Router — [locale]/ 하위가 정규 라우트
│   ├── [locale]/     # 홈 · patch-notes · terms · privacy (ko/en SSG)
│   ├── robots.ts     # robots.txt
│   └── sitemap.ts    # sitemap.xml (lastmod는 실제 변경일 기준)
├── components/       # UI 컴포넌트
├── content/legal/    # 약관·개인정보처리방침 (ko/en 마크다운)
├── data/             # 패치노트 데이터 (최신이 배열 맨 앞)
├── i18n/             # 로케일 설정 · 메시지 카탈로그
├── lib/seo.ts        # 도메인·스토어 URL 상수, OG 메타데이터 헬퍼
└── proxy.ts          # 로케일 라우팅 미들웨어
```

## 배포 & CI

- **CD**: Vercel Git 연동 — `main` push는 프로덕션([aido.kr](https://aido.kr)), PR은 프리뷰 URL 자동 배포
- **CI**: GitHub Actions ([`ci.yml`](.github/workflows/ci.yml)) — PR·main push에서 린트 → 타입체크 → 빌드
- 루트 문서(README, AGENTS.md 등)만 바뀐 커밋은 CI·배포를 건너뜁니다

## 기여 규칙

작업 규칙(SEO 규칙, 패치노트·약관 갱신 절차, i18n 원칙)은 [AGENTS.md](AGENTS.md)에 정리되어 있습니다. AI 에이전트(Claude Code, Codex)도 같은 파일을 참조합니다.

---

© 2026 Aido · 상호 레드밴드 · 문의 [matthew@redband.co.kr](mailto:matthew@redband.co.kr)
