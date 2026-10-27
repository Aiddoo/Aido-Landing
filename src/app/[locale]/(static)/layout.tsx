// 공개 콘텐츠는 배포 때 바뀐다. 요청 시점 데이터를 읽으면 빌드를 실패시킨다.
export const dynamic = "error";
// ko/en과 등록한 경로만 정적 생성한다. 그 외 세그먼트는 404다(요청 시 생성 금지).
export const dynamicParams = false;

export default function StaticPagesLayout({
  children,
}: LayoutProps<"/[locale]">) {
  return children;
}
