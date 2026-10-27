import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { InvitePage } from "@/features/invite/pages/invite-page";
import { getQueryClient } from "@/features/invite/providers/get-query-client";
import { InviteQueryProvider } from "@/features/invite/providers/invite-query-provider";
import { getInvitePreviewQueryOptions } from "@/features/invite/queries/invite-queries";
import { parseInviteCode } from "@/features/invite/utils/invite-code";
import { buildInviteMetadata } from "@/features/invite/utils/invite-metadata";
import { resolveLocale } from "@/i18n/resolve-locale";

type Props = PageProps<"/[locale]/invite/[inviteCode]">;

// 공개 주소 /i/{코드}를 proxy가 이 경로로 rewrite한다. 초대한 친구는 코드마다 다르고 바뀔 수 있어
// 요청마다 그리며 결과를 캐시하지 않는다.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildInviteMetadata(resolveLocale((await params).locale));
}

export default async function Page({ params }: Props) {
  const { locale: localeParam, inviteCode } = await params;
  const locale = resolveLocale(localeParam);
  const code = parseInviteCode(inviteCode);
  const queryClient = getQueryClient();
  // await하지 않는다. 페이지 셸을 먼저 스트리밍하고, 진행 중인 쿼리를 dehydrate해
  // 미리보기가 끝나면 같은 응답 안에서 Suspense 블록이 채워진다(느린 API가 첫 바이트를 막지 않는다).
  if (code != null)
    void queryClient.prefetchQuery(getInvitePreviewQueryOptions(code));
  return (
    <InviteQueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InvitePage locale={locale} code={code} />
      </HydrationBoundary>
    </InviteQueryProvider>
  );
}
