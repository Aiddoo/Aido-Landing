import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n/config";

const documents = {
  "privacy-policy": { ko: "privacy-policy.md", en: "privacy-policy.en.md" },
  "terms-of-service": {
    ko: "terms-of-service.md",
    en: "terms-of-service.en.md",
  },
} as const satisfies Record<string, Record<Locale, string>>;
export type LegalDocumentKey = keyof typeof documents;
export function readLegalDocument(key: LegalDocumentKey, locale: Locale) {
  return readFile(
    path.join(process.cwd(), "src/content/legal", documents[key][locale]),
    "utf8",
  );
}
