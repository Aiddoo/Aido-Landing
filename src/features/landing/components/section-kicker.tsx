import { BrandMotif } from "@/components/marketing/brand-motif";
import { HStack } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

/** 제목 위 손글씨 한 줄. 앱 스토어·SNS 이미지와 같은 말투로 제목을 거든다. */
export function SectionKicker({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <HStack
      render={<p />}
      align="center"
      gap={1}
      className={cn("font-hand text-hand text-brand-deep", className)}
    >
      <BrandMotif motif="paw" className="size-4 text-current opacity-80" />
      {children}
    </HStack>
  );
}
