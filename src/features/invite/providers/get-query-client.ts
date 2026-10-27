import {
  defaultShouldDehydrateQuery,
  environmentManager,
  QueryClient,
} from "@tanstack/react-query";

// 미리보기는 한 번 본 뒤 바뀔 일이 거의 없다. 하이드레이션 직후 다시 요청하지 않도록 0보다 길게 둔다.
const STALE_TIME_MS = 5 * 60_000;

// 서버와 브라우저가 같은 기본값을 쓴다(하이드레이션 결과가 달라지지 않는다).
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: STALE_TIME_MS,
        // 미리보기 요청은 실패를 결과로 돌려주며 한 번만 보낸다(이전 동작과 같다).
        retry: false,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        // 서버가 기다리지 않고 시작한 조회도 내려보내 브라우저가 같은 요청을 다시 보내지 않게 한다.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * TanStack Query 공식 Next.js App Router 패턴. 서버는 요청마다 새 클라이언트를 만들어
 * 방문자 사이에 캐시를 공유하지 않고, 브라우저는 하나를 재사용한다.
 */
export function getQueryClient() {
  if (environmentManager.isServer()) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
