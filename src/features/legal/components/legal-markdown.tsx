import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, VStack } from "@/components/ui/layout";

// Git-owned Markdown is rendered on the server; raw HTML stays disabled.
// The surrounding document page owns h1, so Markdown headings start at h2.
const components = {
  h1: ({ children }) => (
    <h2 className="pt-6 text-display-md text-ink first:pt-0">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="pt-2 text-title-lg font-bold text-ink">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="pt-2 text-title font-bold text-ink">{children}</h4>
  ),
  h4: ({ children }) => <h5 className="pt-2 font-bold text-ink">{children}</h5>,
  h5: ({ children }) => (
    <h6 className="pt-2 text-caption font-bold text-ink">{children}</h6>
  ),
  h6: ({ children }) => (
    <h6 className="pt-2 text-caption font-bold text-ink">{children}</h6>
  ),
  p: ({ children }) => <p className="text-gray-10">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="ml-5 list-disc space-y-2 text-gray-10 marker:text-brand">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="ml-5 list-decimal space-y-2 text-gray-10 marker:font-semibold marker:text-brand-deep">
      {children}
    </ol>
  ),
  a: ({ children, href }) => {
    const external = /^https?:\/\//.test(href ?? "");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="font-semibold break-all text-brand-deep underline underline-offset-4 hover:decoration-2"
      >
        {children}
      </a>
    );
  },
  table: ({ children }) => (
    <Box className="-mx-1 overflow-x-auto rounded-xl ring-1 ring-border">
      <table className="w-full min-w-120 border-collapse text-caption">
        {children}
      </table>
    </Box>
  ),
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  tr: ({ children }) => (
    <tr className="border-b last:border-b-0">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-bold text-ink">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 align-top text-gray-10">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="rounded-xl border-l-4 border-brand bg-brand-soft px-5 py-4 text-ink [&>p]:text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-4 border-dashed border-gray-4" />,
  code: ({ children }) => (
    <code className="rounded-sm bg-secondary px-1.5 py-0.5 text-[0.9em]">
      {children}
    </code>
  ),
} satisfies Components;

export function LegalMarkdown({ markdown }: { markdown: string }) {
  return (
    <VStack
      render={<article />}
      gap={4}
      className="rounded-3xl bg-card p-6 shadow-card sm:p-10"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        skipHtml
      >
        {markdown}
      </ReactMarkdown>
    </VStack>
  );
}
