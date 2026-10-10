import type { Thing, WithContext } from "schema-dts";
export function StructuredData({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Trusted structured data is serialized and escapes HTML delimiters.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
