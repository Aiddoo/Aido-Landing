# 성능 기록

2026-10-10 기준. 변경 전은 `bad060b`의 별도 checkout(Next 16.3.8), 변경 후는 이 작업의 Production 빌드(Next 16.4.0)입니다. 같은 Mac/Chrome 154와 Lighthouse 13.5, 모바일 기본 simulated throttling(RTT 150ms, 약 1.6Mbps, CPU 4배)을 사용했습니다. 각 경로를 **cold cache로 3회** 측정하고 중앙값을 기록했습니다. 한영 홈·서비스·AI 투두 사용법 6개 경로의 총 36회 측정입니다.

양쪽 모두 분석 수집을 비활성화했습니다. 변경 후는 ANALYTICS_PROVIDERS=none으로 빌드했습니다. 외부 태그/동의 배너의 차이를 제외한 사이트 자원 비교이며, 실제 Production의 동의 배너나 동의 후 SDK 비용을 측정한 표는 아닙니다. 요청 시 이미지 최적화 캐시를 준비하지 않고 로컬 Production 서버가 제공하는 자원을 사용했습니다. [개별 실행 기록](performance-measurements.json)에 지표와 전송량을 남겼습니다.

## Before → After (3회 중앙값)

| 경로 | 성능 점수 | FCP (초) | LCP (초) | TBT (ms) | CLS |
|---|---:|---:|---:|---:|---:|
| /ko | 77 → 85 | 3.01 → 2.11 | 4.89 → 4.13 | 7 → 9.5 | 0 → 0 |
| /en | 96 → 94 | 1.50 → 1.51 | 2.76 → 3.00 | 4.5 → 7 | 0 → 0 |
| /ko/services | 75 → 86 | 3.16 → 2.26 | 4.96 → 3.90 | 8 → 10.5 | 0 → 0 |
| /en/services | 95 → 95 | 1.50 → 1.50 | 2.84 → 2.92 | 3.5 → 7 | 0 → 0 |
| /ko/features/ai-todo | 78 → 89 | 3.01 → 1.96 | 4.58 → 3.60 | 7 → 9 | 0 → 0 |
| /en/features/ai-todo | 98 → 97 | 1.35 → 1.35 | 2.38 → 2.54 | 1.5 → 6.5 | 0 → 0 |

모든 실행의 CLS는 0입니다. 한국어 홈 LCP는 약 15.5%, 서비스는 21.3%, 사용법은 21.4% 줄었습니다. 영어 홈/사용법 LCP는 각각 약 0.23/0.16초 늘었고 성능 점수는 96→94, 98→97입니다. 모든 페이지의 모든 지표가 개선됐다고 해석하지 않습니다.

## 전송량 (KiB, 3회 중앙값)

| 경로 | 전체 | 폰트 | JavaScript | 이미지 | CSS |
|---|---:|---:|---:|---:|---:|
| /ko | 720.5 → 541.1 | 375.4 → 175.6 | 147.9 → 184.7 | 93.1 → 94.2 | 36.2 → 15.2 |
| /en | 359.7 → 369.3 | 35.1 → 35.1 | 143.1 → 170.6 | 78.8 → 82.1 | 36.2 → 12.1 |
| /ko/services | 744.3 → 507.1 | 375.4 → 175.6 | 147.9 → 184.7 | 115.6 → 59.5 | 36.2 → 14.8 |
| /en/services | 410.7 → 354.0 | 35.1 → 35.1 | 143.1 → 170.6 | 128.8 → 65.9 | 36.2 → 11.7 |
| /ko/features/ai-todo | 659.7 → 455.6 | 392.2 → 175.6 | 147.9 → 184.6 | 22.8 → 20.0 | 36.2 → 13.6 |
| /en/features/ai-todo | 298.5 → 298.2 | 35.1 → 35.1 | 143.1 → 170.5 | 24.3 → 21.3 | 36.2 → 10.5 |

한국어 홈의 폰트 전송량은 53.2%, 전체는 24.9% 줄었습니다. 한국어/영어 서비스의 이미지 전송량은 각각 약 48.5%/48.8% 줄었습니다. 홈은 hero와 작은 preview가 서로 다른 크기를 요청하면서 이미지 요청이 하나 늘고 총 이미지 전송량도 조금 늘었습니다.

Base UI 접근성 동작, Zod 계약 검증과 정적 이미지 URL 목록의 비용으로 JavaScript는 홈 기준 한글 약 37KiB, 영어 약 28KiB 늘었습니다. 대신 메뉴 Popover는 첫 열기, GSAP은 첫 스크롤, 분석 SDK는 동의 후에 로드합니다. 공용 스키마는 공식 zod/mini를 사용하고 언어 전환의 순수 캠페인 정리를 분석 검증과 분리했습니다. CSS는 기능별로 나누고 한국어 폰트 CSS를 영어에서 제외했습니다. fontTools 서브셋은 원본 글꼴/라이선스를 보존합니다.

## 회귀 검사와 실제 방문자 지표

Playwright로 한영 화면/언어 전환, 키보드 메뉴, 팝오버 chunk 차단 시 native 메뉴, GSAP reduced-motion 변경 시 transform 정리, 폰트 요청 차단, 2.5초 지연 폰트의 cold/warm 방문을 확인했습니다. 폰트 지연 후 제목 영역이 바뀌지 않고 CLS가 0.1 이하인지 검사합니다. JavaScript를 꺼도 본문·FAQ·업데이트 아카이브·법적 문서·언어 링크가 동작합니다. 소유확인 HTML, 원본 스크린샷과 폰트/OFL, 출시일과 법적 시행일은 보존했습니다.

이 표는 로컬 실험실 결과입니다. TBT는 INP 측정값이 아니며, 실제 사용자 Core Web Vitals의 75번째 백분위 LCP≤2.5초 / INP≤200ms / CLS≤0.1 통과를 보장하지 않습니다. 특히 한국어 LCP는 이번 개선 후에도 느린 모바일 실험 조건에서 2.5초를 넘습니다. 배포 뒤 Search Console/CrUX의 실제 지표와 오류를 확인해야 합니다. 실제 Search Console 검색어·순위 데이터를 가져와 분석한 작업은 포함하지 않습니다.

## 재측정

별도 깨끗한 checkout에서 frozen install → pnpm build → pnpm start로 변경 전후 Production 서버를 준비합니다. 동일 Chrome/Lighthouse 버전, cold cache, 동의 상태, 기기/네트워크 조건으로 각 URL을 3회 이상 순차 실행하고 중앙값을 비교합니다. 단일 실행의 점수만 골라 비교하지 않습니다.

```bash
pnpm dlx lighthouse@13.5.0 http://localhost:3219/ko \
  --chrome-flags="--headless" \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=/tmp/aido-ko.json
```

폰트 재생성·캐시 정책은 [폰트 안내](../public/fonts/README.md), 자동 검사 역할은 [기여 안내](contributing.md)를 참고합니다. Core Web Vitals의 정의는 [Google 공식 문서](https://developers.google.com/search/docs/appearance/core-web-vitals)를 기준으로 합니다.
