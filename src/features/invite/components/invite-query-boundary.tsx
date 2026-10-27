"use client";
import {
  QueryErrorResetBoundary,
  type QueryKey,
  useQueryClient,
} from "@tanstack/react-query";
import {
  type ComponentProps,
  type ReactNode,
  Suspense,
  useCallback,
  useSyncExternalStore,
} from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

type InviteQueryBoundaryProps = Omit<
  ComponentProps<typeof ErrorBoundary>,
  "fallback" | "FallbackComponent" | "fallbackRender" | "onReset" | "resetKeys"
> & {
  queryKey: QueryKey;
  pendingFallback: ReactNode;
  rejectedFallback: (props: FallbackProps) => ReactNode;
};

// useSuspenseQuery 블록 하나의 로딩·예상 밖 오류 경계. 예상한 API 실패(없는 코드 등)는 결과로
// 캐시되어 여기 오지 않는다. 다시 시도는 쿼리 오류를 초기화해 다시 조회하며, 다른 블록이
// 같은 쿼리를 다시 받아 오면 이 경계도 함께 풀린다.
export function InviteQueryBoundary({
  queryKey,
  pendingFallback,
  rejectedFallback,
  children,
  ...props
}: InviteQueryBoundaryProps) {
  const dataUpdatedAt = useQueryDataUpdatedAt(queryKey);
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          {...props}
          onReset={reset}
          resetKeys={[dataUpdatedAt]}
          fallbackRender={rejectedFallback}
        >
          <Suspense fallback={pendingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function useQueryDataUpdatedAt(queryKey: QueryKey) {
  const queryClient = useQueryClient();
  const subscribe = useCallback(
    (onChange: () => void) => queryClient.getQueryCache().subscribe(onChange),
    [queryClient],
  );
  const read = () => queryClient.getQueryState(queryKey)?.dataUpdatedAt ?? 0;
  return useSyncExternalStore(subscribe, read, read);
}
