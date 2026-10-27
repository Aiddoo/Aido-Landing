import { Plus } from "lucide-react";
import { VStack, type VStackProps } from "@/components/ui/layout";

export type FaqListProps = Omit<VStackProps, "children" | "render"> & {
  items: readonly { question: string; answer: string }[];
};

// 기본 details라 JavaScript 없이도 열리고, 닫힌 답도 처음 HTML에 들어 있다.
export function FaqList({ items, ...props }: FaqListProps) {
  return (
    <VStack render={<ul />} gap={3} {...props}>
      {items.map((item) => (
        <li key={item.question}>
          <details
            data-slot="faq-item"
            className="group rounded-xl bg-card shadow-card open:ring-1 open:ring-brand/30"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <Plus
                aria-hidden="true"
                className="size-5 shrink-0 text-brand-deep transition-transform duration-200 group-open:rotate-45"
              />
            </summary>
            <p className="px-5 pb-5 text-gray-9">{item.answer}</p>
          </details>
        </li>
      ))}
    </VStack>
  );
}
