import { Badge } from "@/components/ui/badge";
import { Box, HStack, VStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { cn } from "@/lib/utils";

/** 초대 보상을 누가·언제 받는지 영수증처럼 적는다. 조건이 있다는 사실을 항상 함께 보여 준다. */
export function InviteRewardReceipt({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { invite } = getMessages(locale).home;
  return (
    <VStack
      gap={1}
      data-motion="float"
      className={cn("rounded-3xl bg-paper p-6 shadow-card", className)}
    >
      <h3 className="text-title-lg">{invite.rewardTitle}</h3>
      <Box
        render={<dl />}
        className="mt-2 divide-y-2 divide-dashed divide-border border-y-2 border-dashed border-border"
      >
        <RewardRow
          label={invite.friendLabel}
          variant="fish"
          when={invite.friendWhen}
          reward={invite.friendReward}
        />
        <RewardRow
          label={invite.myLabel}
          variant="default"
          when={invite.myWhen}
          reward={invite.myReward}
        />
      </Box>
      <VStack align="start" gap={2} className="mt-4">
        <Badge variant="outline" className="h-6 px-2.5 text-micro">
          {invite.conditionBadge}
        </Badge>
        <p className="text-caption text-muted-foreground">
          {invite.conditionNote}
        </p>
      </VStack>
    </VStack>
  );
}

// dl 안에서는 dt·dd를 감싸는 div 한 겹만 허용된다.
function RewardRow({
  label,
  variant,
  when,
  reward,
}: {
  label: string;
  variant: "fish" | "default";
  when: string;
  reward: string;
}) {
  return (
    <HStack align="start" gap={3} className="py-4">
      <Badge
        render={<dt />}
        variant={variant}
        className="h-7 min-w-14 shrink-0 px-3 text-caption"
      >
        {label}
      </Badge>
      <VStack render={<dd />} gap={1} className="min-w-0">
        <span className="text-caption font-medium text-gray-9">{when}</span>
        <span className="font-display text-title-lg text-brand-deep">
          {reward.split(" + ").map((part, index) => (
            <span key={part} className="block">
              {index > 0 && "+ "}
              {part}
            </span>
          ))}
        </span>
      </VStack>
    </HStack>
  );
}
