import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Git-owned Markdown is rendered on the server; raw HTML stays disabled.
// The surrounding document page owns h1, so Markdown headings start at h2.
const components = {
  h1: ({ children }) => (
    <h2 className="pt-6 text-2xl font-bold sm:pt-8 sm:text-3xl">{children}</h2>
  ),
  h2: ({ children }) => (
    <h3 className="pt-3 text-xl font-bold sm:pt-4 sm:text-2xl">{children}</h3>
  ),
  h3: ({ children }) => (
    <h4 className="pt-2 text-lg font-bold sm:text-xl">{children}</h4>
  ),
  h4: ({ children }) => (
    <h5 className="pt-2 text-base font-bold sm:text-lg">{children}</h5>
  ),
  h5: ({ children }) => (
    <h6 className="pt-2 text-sm font-bold sm:text-base">{children}</h6>
  ),
  h6: ({ children }) => (
    <h6 className="pt-2 text-sm font-bold sm:text-base">{children}</h6>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="ml-5 list-disc space-y-2 text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="ml-5 list-decimal space-y-2 text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
      {children}
    </ol>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target={/^https?:\/\//.test(href ?? "") ? "_blank" : undefined}
      rel={/^https?:\/\//.test(href ?? "") ? "noreferrer noopener" : undefined}
      className="font-semibold text-brand-ink underline decoration-dashed underline-offset-4 hover:decoration-solid"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm sm:text-base">
        {children}
      </table>
    </div>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-foreground/10">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-3 py-2.5 text-left font-bold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2.5 text-foreground/85">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="rounded-xl border-l-4 border-brand/60 bg-brand/5 px-4 py-3 text-sm leading-7 sm:px-5 sm:text-base sm:leading-8">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-6 border-foreground/10" />,
  code: ({ children }) => (
    <code className="rounded-md bg-foreground/10 px-1.5 py-0.5 text-[0.9em]">
      {children}
    </code>
  ),
} satisfies Components;
export function LegalMarkdown({ markdown }: { markdown: string }) {
  return (
    <article className="w-full rounded-2xl border-2 border-foreground/10 bg-white/85 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur sm:p-8 lg:p-10">
      <div className="space-y-4 sm:space-y-5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={components}
          skipHtml
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
