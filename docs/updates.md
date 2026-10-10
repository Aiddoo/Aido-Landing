# 앱 출시와 서비스 개선 기록

업데이트를 추가하거나 기존 문구를 고칠 때 참고합니다. 원본은 `src/features/updates/data/patch-notes.ts` 한 곳이며 한국어·영어를 함께 관리합니다.

## 기록 선택

- **앱 출시**: `releaseNotes` 맨 앞에 실제 버전·출시일과 ko/en `summary`, `storeNotes`, `categories`를 추가합니다. `summary`는 한 줄 소개, `storeNotes`는 짧은 항목 배열, `categories`는 전체 변경사항입니다. 홈의 앱 버전은 이 배열만 사용합니다.
- **서비스 개선**: 앱 설치 없이 적용되는 사용자 변화는 운영 배포를 확인한 뒤 `serviceUpdates`에 날짜와 고유 ID(예: `service-2026-10-08`)를 붙여 추가합니다. 앱 버전과 스토어 문안은 붙이지 않습니다. 내부 정리만 있는 작업은 공개 기록에서 생략합니다.
- **기존 문구 수정**: 출시일·적용일은 보존하고 `PATCH_NOTES_EDITED_AT`을 실제 편집일로 바꿉니다. 패치노트 사이트맵은 기록의 최신 날짜와 편집일 중 늦은 날짜를 사용합니다.

두 종류의 기록은 날짜순으로 합쳐지며, 최신 기록만 기본으로 펼치고 나머지는 월별 보관함에 넣습니다. 접힌 기록의 본문도 처음 내려주는 HTML에 포함합니다. 기존 버전별 링크(`#release-1-11-0` 등)는 유지합니다.

앱 기록의 **요약 복사** 버튼은 현재 언어의 한 줄 소개와 `- `로 시작하는 항목을 일반 텍스트로 복사합니다. 버전·날짜·화면 제목은 포함하지 않습니다. 같은 문안을 App Store와 Google Play에 그대로 붙여 넣으면 됩니다. 자동 복사가 막히면 선택 가능한 문안을 보여줍니다.

스토어용 문안은 한영 각각 줄바꿈·공백을 포함해 **500자 이내**로 작성합니다. [Google Play는 언어별 500 Unicode 문자](https://support.google.com/googleplay/android-developer/answer/9859348?hl=en), [App Store의 업데이트 설명은 4,000자](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)까지 지원하므로 더 짧은 공통 기준을 사용합니다. 플랫폼에만 해당하는 변화는 문장에 iPhone 또는 Android를 명시합니다. `pnpm patch-notes:check`는 한영 누락·중복 ID·잘못된 날짜·길이 초과를 검사하며 문구를 자동으로 자르지 않습니다. CI에서도 빌드 전에 실행합니다.

한국어는 친근한 해요체로 씁니다. 새 기능은 “할 수 있어요”, 개선은 “다듬었어요”, 수정은 “고쳤어요”를 기본으로 사용하고, 사용자가 겪는 상황과 달라진 동작을 먼저 설명합니다. 기술명·과장된 속도 약속·반복되는 안정성 문구는 덜어내되, 이용 한도와 중요한 사용 조건은 보존합니다. 영어는 짧고 자연스러운 문장으로 쓰고 to-dos / notes / checklist items / AI suggestions / My Page 표기를 통일합니다.

## 법적 문서

약관·개인정보처리방침을 개정할 때는 `src/content/legal/`의 ko/en 파일 쌍과 사이트맵의 해당 시행일 상수를 함께 갱신합니다. 문체 정리만으로 시행일을 바꾸지 않습니다.

## 검증 범위

문안·데이터만 바꿨다면 `pnpm patch-notes:check`로 한영 누락·날짜·ID·500자 제한을 확인합니다. 화면·사이트맵까지 바꿨다면 빌드 후 `pnpm seo:check`로 초기 HTML과 변경일 반영도 확인합니다. 복사 UI를 바꿨다면 자동 복사 성공과 수동 선택 경로, 키보드 조작을 확인합니다. 같은 결과를 불필요하게 반복 검사하지 않습니다.
