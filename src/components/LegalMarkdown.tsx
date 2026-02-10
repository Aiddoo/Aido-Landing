import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "horizontal-rule" };

const INLINE_TOKEN_REGEX = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of text.matchAll(INLINE_TOKEN_REGEX)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    if (match[1] && match[2]) {
      const label = match[1];
      const href = match[2];
      const isExternal = /^https?:\/\//.test(href);

      nodes.push(
        <a
          key={`${keyPrefix}-link-${tokenIndex}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          className="font-semibold text-brand underline decoration-dashed underline-offset-4 hover:opacity-80"
        >
          {label}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${tokenIndex}`} className="font-bold">
          {match[3]}
        </strong>,
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${tokenIndex}`}
          className="rounded-md bg-foreground/10 px-1.5 py-0.5 text-[0.9em]"
        >
          {match[4]}
        </code>,
      );
    }

    lastIndex = start + match[0].length;
    tokenIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphBuffer.join(" "),
    });

    paragraphBuffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();

    if (trimmed.length === 0) {
      flushParagraph();
      continue;
    }

    if (trimmed === "---") {
      flushParagraph();
      blocks.push({ type: "horizontal-rule" });
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      const items: string[] = [];

      while (i < lines.length) {
        const current = lines[i].trim();
        const match = current.match(/^[-*]\s+(.+)$/);
        if (!match) {
          break;
        }
        items.push(match[1].trim());
        i += 1;
      }

      i -= 1;
      blocks.push({ type: "unordered-list", items });
      continue;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      const items: string[] = [];

      while (i < lines.length) {
        const current = lines[i].trim();
        const match = current.match(/^\d+\.\s+(.+)$/);
        if (!match) {
          break;
        }
        items.push(match[1].trim());
        i += 1;
      }

      i -= 1;
      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const blockquoteMatch = trimmed.match(/^>\s+(.+)$/);
    if (blockquoteMatch) {
      flushParagraph();
      const quoteLines: string[] = [];

      while (i < lines.length) {
        const current = lines[i].trim();
        const match = current.match(/^>\s+(.+)$/);
        if (!match) {
          break;
        }
        quoteLines.push(match[1].trim());
        i += 1;
      }

      i -= 1;
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

const headingClassNames: Record<number, string> = {
  1: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
  2: "pt-6 text-2xl font-bold tracking-tight text-foreground sm:pt-8 sm:text-3xl",
  3: "pt-3 text-xl font-bold text-foreground sm:pt-4 sm:text-2xl",
  4: "pt-2 text-lg font-bold text-foreground sm:text-xl",
  5: "pt-2 text-base font-bold text-foreground sm:text-lg",
  6: "pt-2 text-sm font-bold uppercase tracking-wide text-foreground/80 sm:text-base",
};

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function LegalMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <article className="w-full rounded-2xl border-2 border-foreground/10 bg-white/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur sm:p-8 lg:p-10">
      <div className="space-y-4 sm:space-y-5">
        {blocks.map((block, index) => {
          const key = `block-${index}`;

          if (block.type === "heading") {
            const className =
              headingClassNames[block.level] ?? headingClassNames[6];
            const headingLevel = Math.min(block.level, 6) as
              | 1
              | 2
              | 3
              | 4
              | 5
              | 6;
            const HeadingTag = headingTags[headingLevel];
            return (
              <HeadingTag key={key} className={className}>
                {renderInlineMarkdown(block.text, key)}
              </HeadingTag>
            );
          }

          if (block.type === "paragraph") {
            return (
              <p
                key={key}
                className="text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8"
              >
                {renderInlineMarkdown(block.text, key)}
              </p>
            );
          }

          if (block.type === "unordered-list") {
            return (
              <ul
                key={key}
                className="ml-5 list-disc space-y-2 text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8"
              >
                {block.items.map((item) => (
                  <li key={`${key}-li-${item}`}>
                    {renderInlineMarkdown(item, `${key}-li-${item}`)}
                  </li>
                ))}
              </ul>
            );
          }

          if (block.type === "ordered-list") {
            return (
              <ol
                key={key}
                className="ml-5 list-decimal space-y-2 text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8"
              >
                {block.items.map((item) => (
                  <li key={`${key}-li-${item}`}>
                    {renderInlineMarkdown(item, `${key}-li-${item}`)}
                  </li>
                ))}
              </ol>
            );
          }

          if (block.type === "blockquote") {
            return (
              <blockquote
                key={key}
                className="rounded-xl border-l-4 border-brand/60 bg-brand/5 px-4 py-3 text-sm leading-7 text-foreground/80 sm:px-5 sm:text-base sm:leading-8"
              >
                {renderInlineMarkdown(block.text, key)}
              </blockquote>
            );
          }

          return <hr key={key} className="my-6 border-foreground/10" />;
        })}
      </div>
    </article>
  );
}
