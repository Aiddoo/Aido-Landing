# Aido Landing

AI 투두 플래너 아이두의 Next.js 16 App Router 랜딩입니다. 한영 공개 콘텐츠는 Git 파일에서 관리합니다. 시작 방법·명령어는 [README](README.md)를 참고합니다.

## 공통 제약

- 정규 경로는 `/{ko|en}/...`, 도메인은 `https://aido.kr`입니다. 도메인·스토어·SNS 상수는 `src/lib/seo.ts`에서 가져옵니다.
- 공개 페이지의 SSG를 유지합니다. 로케일 레이아웃은 `dynamic = "error"`, `dynamicParams = false`이며 Git 콘텐츠는 배포 때 갱신합니다. Client Components에는 필요한 상호작용 데이터만 전달합니다.
- UI 문구는 `src/i18n/messages.ts`에 ko/en을 함께 작성합니다. 법적 문서는 `src/content/legal/`의 한영 Markdown 쌍을 사용합니다.
- 앱 출시 버전·출시일과 서비스 적용일을 구분합니다. 과거 출시일을 문구 편집일로 덮지 않습니다. 내부 정리만 있는 작업은 공개 기록에 넣지 않습니다.
- 사이트맵은 실제 콘텐츠 변경일을 사용합니다. Google·네이버 소유확인 HTML, 폰트 OFL 라이선스와 해시 파일명을 보존합니다. 해시 파일의 바이트를 바꾸면 새 이름을 사용합니다.
- 분석에는 알려진 공개 경로·허용된 이벤트만 보냅니다. 메모·할 일·회원 식별값을 추가하지 않으며 Production에서 방문자 동의 후 태그를 로드합니다.
- 배포는 Vercel Git 연동입니다. 수동 `vercel --prod`를 사용하지 않으며 머지 전에 CI 성공을 확인합니다.

## 작업별 안내

필요한 문서만 읽습니다. 세부 절차와 배경은 해당 문서 한 곳에서 관리하고, 새로운 지침은 반복 설명보다 실제 실수·경계를 방지하는 내용에 집중합니다.

| 작업 | 문서 |
|---|---|
| 렌더링·라우팅·새 페이지·메타데이터 | [렌더링과 SEO](docs/rendering-seo.md) |
| 패치노트·스토어 문안·약관 갱신 | [업데이트 기록](docs/updates.md) |
| 폰트 변경·로딩·재생성 | [폰트 안내](public/fonts/README.md) |
| GA4·Search Console·동의·이벤트 | [검색·분석 운영](docs/analytics.md) |
| Issue·PR·검증·배포 | [기여와 배포](docs/contributing.md) |

로컬 검사는 운영 데이터를 수정하지 않습니다. 요청 범위의 구현·관련 검증·오류 수정을 계속 수행하고, PR·머지가 요청됐다면 CI 확인과 해당 단계까지 완료합니다. 작은 문구 수정을 위해 모든 문서를 읽거나 같은 검사를 반복할 필요는 없습니다.

## 공식 정보

상호 **레드밴드 / RedBand**, 대표 **김용민 / Yongmin Kim**, 문의 **matthew@redband.co.kr**. 앱·공식 채널 URL은 `src/lib/seo.ts`를 기준으로 합니다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
