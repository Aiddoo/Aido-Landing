import { CalendarDays, Clock, Mic, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { HStack, VStack } from "@/components/ui/layout";
import type { Locale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

/** 말한 문장이 날짜·시간이 채워진 할 일로 바뀌는 모습 */
export function AiTodoExample({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  const { ai } = getMessages(locale).home;
  return (
    <VStack
      render={<ul />}
      gap={3}
      aria-label={ai.exampleLabel}
      className={className}
    >
      {ai.examples.map((example) => (
        <VStack
          key={example.input}
          render={<li />}
          gap={3}
          data-motion="float"
          className="rounded-2xl bg-paper p-4 shadow-card"
        >
          <HStack
            align="center"
            gap={2}
            className="rounded-xl border-2 border-brand/70 px-3 py-2.5 font-medium"
          >
            <Mic
              aria-hidden="true"
              className="size-4 shrink-0 text-brand-deep"
            />
            {example.input}
          </HStack>
          <HStack
            align="center"
            gap={2}
            wrap="wrap"
            className="text-caption font-semibold"
          >
            <Sparkles aria-hidden="true" className="size-4 text-brand" />
            <ExampleChip
              icon={<CalendarDays aria-hidden="true" className="size-3.5" />}
            >
              {example.date}
            </ExampleChip>
            <ExampleChip
              icon={<Clock aria-hidden="true" className="size-3.5" />}
            >
              {example.time}
            </ExampleChip>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
}

function ExampleChip({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <HStack
      render={<span />}
      align="center"
      gap={1}
      className="rounded-full bg-cream px-3 py-1 text-brand-deep ring-1 ring-brand/30"
    >
      {icon}
      {children}
    </HStack>
  );
}
