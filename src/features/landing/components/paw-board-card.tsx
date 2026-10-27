import { HStack, VStack } from "@/components/ui/layout";
import { PawBoard } from "@/features/feature-guides/components/paw-board";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

const EXAMPLE_STAMPED_COUNT = 5;

/** 친구 초대 가이드와 같은 12칸 발자국 판에 제목·진행·안내를 붙인 카드 */
export function PawBoardCard({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { invite } = getMessages(locale).home;
  return (
    <VStack
      render={<figure />}
      gap={5}
      className={cn("rounded-3xl bg-paper p-5 shadow-card sm:p-6", className)}
    >
      <HStack
        render={<figcaption />}
        align="baseline"
        justify="between"
        gap={3}
        wrap="wrap"
      >
        <span className="font-display text-title-lg">{invite.boardTitle}</span>
        <span className="text-caption font-semibold text-brand-deep">
          {invite.boardSummary}
        </span>
      </HStack>
      <PawBoard
        data-motion="stamp-board"
        stamped={EXAMPLE_STAMPED_COUNT}
        label={invite.boardSummary}
      />
      <p className="text-caption text-muted-foreground">{invite.boardHint}</p>
    </VStack>
  );
}
