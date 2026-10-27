import { BrandMotif } from "@/components/marketing/brand-motif";
import { Box, type BoxProps } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

type InviteGreetingCardProps = Omit<BoxProps, "render">;

// 초대한 친구의 프로필·제목·안내를 담는 카드. 초대 화면과 오류 화면이 같은 크기를 쓴다.
export function InviteGreetingCard({
  className,
  children,
  ...props
}: InviteGreetingCardProps) {
  return (
    <Box
      render={<section aria-labelledby="invite-title" />}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-brand-soft px-6 py-7 md:px-9 md:py-10",
        className,
      )}
      {...props}
    >
      <BrandMotif
        motif="paw"
        className="absolute -right-5 -bottom-5 size-32 -rotate-12 text-brand/10"
      />
      {children}
    </Box>
  );
}
