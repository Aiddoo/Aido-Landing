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
