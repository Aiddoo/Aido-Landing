# 기여와 배포

Issue·PR을 관리하거나 배포를 준비할 때 참고합니다.

## GitHub 작업 관리

[Aido Landing 보드](https://github.com/orgs/Aiddoo/projects/1)에 Issue와 PR을 연결하고 실제 담당자를 지정합니다. Issue Type은 Feature / Bug / Task 중 선택하며, PR은 목적에 맞는 라벨을 사용합니다. 필요한 라벨만 조합합니다: enhancement, bug, documentation, maintenance, dependencies, design, seo.

보드 Status는 Todo / In Progress / Done입니다. Priority는 P1(장애·배포 차단), P2(일반 개선), P3(문서·기록 정비)로 정합니다. 머지된 PR과 완료 확인한 Issue는 Done으로 정리합니다.

Issue에는 사용자가 겪는 문제와 완료 조건을, PR에는 최종 변경 동작·선택 이유·검증 결과·남은 한계를 적습니다. 기존 동작을 유지한 부분과 새로 개선한 부분을 구분합니다. 성능 수치는 측정 조건과 근거를 함께 적고 측정하지 않은 효과를 단정하지 않습니다. PR의 Closes 연결로 관련 Issue를 닫습니다.

## 검증과 완료 범위

로컬 검사는 저장소 소스와 빌드 산출물을 대상으로 하며 운영 데이터를 수정하지 않습니다. 승인된 변경 범위에서 검사·오류 수정·관련 검사 재실행을 이어서 수행할 수 있습니다. 변경에 맞는 검사만 실행하고, CI는 `.github/workflows/ci.yml`에 정의된 전체 검사를 실행합니다.

타입·코드는 lint/typecheck, 업데이트 문안은 patch-notes:check, 분석 경계는 analytics:check, 렌더링·SEO·폰트는 build 후 seo:check를 사용합니다. 화면 상호작용을 바꾸면 해당 언어·모바일·키보드 동작도 확인합니다.

완료 범위는 요청을 따릅니다. 구현 요청은 코드·문서·관련 검증까지, PR 요청은 리뷰 가능한 PR과 CI 확인까지, 머지 요청은 CI 성공 후 main 머지까지 이어갑니다. 머지·외부 게시가 요청되지 않았다면 임의로 수행하지 않습니다. 문구 수정처럼 작은 변경을 위해 모든 운영 문서를 읽을 필요는 없습니다.

## 배포

Vercel Git 연동을 사용합니다. PR/브랜치 push는 Preview, main 반영은 Production 배포를 시작합니다. 수동 `vercel --prod`는 사용하지 않습니다. 루트 문서만 바뀐 커밋은 CI·배포를 건너뜁니다.

머지 전 GitHub Actions CI가 성공했는지 확인합니다. 머지가 완료되어도 배포 성공과는 다르므로 배포 상태를 별도로 확인하고 실패나 대기 상태를 그대로 기록합니다. 운영 배포 후 공개 URL에서 핵심 변경과 메타데이터를 확인합니다.

## 검사 명령과 scripts의 범위

Next.js 권장 작업은 공식 CLI `next typegen`, `next build`, `next start`로 수행합니다. 빌드의 TypeScript 검사와 별개로 typecheck는 먼저 typegen을 실행해 새 경로의 PageProps/typedRoutes를 생성합니다. `next lint`를 재구현하지 않고 Biome를 사용합니다. GitHub Actions는 아래 명령의 실행·실패 보고·브라우저 trace 저장을 담당하며 앱 고유 콘텐츠 정책을 대신 제공하지 않습니다.

| 항목 | 도구/유지 이유 |
|---|---|
| 타입/SSG 빌드 | Next.js 공식 CLI + TypeScript |
| 분석 경계 | Vitest; 기존 check-analytics.mjs는 삭제 |
| 상호작용/동의/폰트 차단 | Playwright, 로컬 vendor mock; 실제 운영 태그 요청 없음 |
| check-patch-notes.mjs | 출시일/서비스 적용일/한영 문안/500자 스토어 제한 등 제품 규칙 |
| check-seo.mjs | 실제 16개 생성 HTML/사이트맵 날짜/한영 자원/소유확인/OFL 해시 규칙 |
| generate-images.mjs | 공식 Next custom loader용 정적 Sharp 변형 생성 및 해시/치수 검증 |
| generate-fonts.py | 선택적인 fontTools 병합/공개 문구 서브셋 재생성, CI/앱 런타임에서 실행하지 않음 |

CI는 frozen install → pnpm audit → lint → typecheck → unit tests → 이미지/출시 기록 검사 → production 테스트 설정 빌드 → SEO → Playwright 순서입니다. audit는 개발·간접 의존성도 포함하며 등록된 취약점이 있으면 실패합니다. 브라우저 검사는 Google/Vercel 요청을 mock하며 CI에 사용하는 G-TEST123은 실제 운영 ID가 아닙니다. Vercel 배포 빌드는 플랫폼의 실제 환경변수를 사용합니다. 이미 빌드한 CI는 PLAYWRIGHT_SKIP_BUILD=1로 중복 빌드를 피합니다.

로컬 `pnpm test:browser`는 테스트 Production 빌드와 서버를 직접 관리합니다. `pnpm exec playwright install chromium`으로 브라우저를 준비합니다. 설치된 Chrome을 쓰려면 `PLAYWRIGHT_CHANNEL=chrome pnpm test:browser`를 실행합니다. 공급자 회귀에 한해 `PLAYWRIGHT_DEV=1 PLAYWRIGHT_CHANNEL=chrome pnpm test:browser --grep "one initialization|no provider requests|script failure" --workers 1`로 개발 StrictMode 재실행도 확인합니다. 운영 DebugView 확인은 모의 테스트와 구분합니다.

## 의존성·보안 업데이트

현재 버전은 `package.json`/`pnpm-lock.yaml`에서 관리하고 별도의 버전 표를 중복 유지하지 않습니다. npm stable/공식 보안 공지/peer 범위를 확인한 뒤 정확한 버전을 적용하고 위 CI로 검증합니다. Node 타입은 런타임과 같은 24 major를 유지합니다. 2026-10-10 점검에서 Next 16.4.0·React 19.3.0은 latest stable이고 `pnpm audit --json`의 등록된 취약점은 전체 326개 의존성에서 0개였습니다. 등록 전 문제나 모든 환경의 안전성을 보장하는 결과는 아닙니다.

Next.js는 [10월 14일 예정 보안 업데이트](https://nextjs.org/blog/upcoming-nextjs-security-update-october-2026)를 공지했습니다. 두 Critical·한 High upstream 취약점의 전체 영향 범위와 수정 버전은 그때 공개합니다. 현재 설치 가능한 후속 stable 패치는 없으므로 적용 완료로 기록하지 않습니다. 공개되면 npm dist-tags와 공식 advisory의 수정 버전을 대조하고 package/lockfile → CI → 리뷰 → Vercel Git 배포 순서로 처리합니다. 근거 없이 canary나 개별 transitive override로 대체하지 않습니다.

공식 GitHub Dependabot alerts/security updates로 공개된 취약점의 수정 PR을 받고, Secret scanning/Push protection으로 지원되는 인증 정보 패턴을 검사합니다. 저장소 설정은 GitHub에서 관리하며 같은 기능의 자체 scripts를 추가하지 않습니다. 자동 머지는 사용하지 않습니다. 아직 advisory에 없는 사전 공지는 별도 P1 이슈로 추적합니다.

CI Actions는 공식 저장소에서 확인한 전체 commit SHA로 고정하고 버전을 주석으로 남깁니다. annotated tag는 tag object가 아닌 최종 commit을 사용합니다. `contents: read`, `pull_request` 이벤트와 checkout의 `persist-credentials: false`를 유지하며 앱 검사에 Production 비밀을 전달하지 않습니다. [GitHub 보안 지침](https://docs.github.com/en/actions/reference/security/secure-use)에 따라 업데이트 때 새 공식 release commit과 변경 내용을 확인하고 PR/CI로 검증합니다.

실제 환경 파일·Vercel 로컬 설정·개인키·브라우저 인증 상태·검사 산출물은 `.gitignore`로 제외하고 `.env.example`에는 키 이름과 빈 예시만 둡니다. `NEXT_PUBLIC_*`는 공개 번들/Client Props에 노출될 수 있으므로 인증 토큰을 넣지 않습니다. GA 측정 ID는 공개 태그 식별자입니다. 커밋 전에는 staged 파일과 이력을 redacted secret scanner로 검사하고 보고서는 저장소 밖에 둡니다. ignore 규칙은 이미 추적된 파일이나 과거 커밋을 제거하지 않습니다. 누출이 발견되면 실제 값을 Issue/PR/로그에 붙이지 않고 먼저 폐기·교체합니다.

기존 `components.json`으로 `pnpm dlx shadcn@4.21.4 add <component>`를 실행해 Base UI 컴포넌트를 추가합니다. 생성 도구는 런타임 의존성이 아니며 [공식 CLI](https://ui.shadcn.com/docs/cli)와 원본 Props를 유지합니다. Next.js의 기본 Production bundler는 Turbopack이며 기존 `next build --webpack`도 [공식 CLI](https://nextjs.org/docs/app/api-reference/cli/next)의 지원 옵션입니다. bundler 교체는 별도 렌더링·번들·성능 검증 후 진행합니다.
