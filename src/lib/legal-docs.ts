import { constants } from "node:fs";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/i18n/config";

const LEGAL_DOCS_DIR = path.join(process.cwd(), "src", "content", "legal");

export type LegalDocumentKey = "privacy-policy" | "terms-of-service";

async function fileExists(fullPath: string): Promise<boolean> {
  try {
    await access(fullPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function readLegalDocument(
  key: LegalDocumentKey,
  locale: Locale,
): Promise<string> {
  const localizedPath = path.join(LEGAL_DOCS_DIR, `${key}.${locale}.md`);
  const defaultPath = path.join(LEGAL_DOCS_DIR, `${key}.md`);

  const targetPath = (await fileExists(localizedPath))
    ? localizedPath
    : defaultPath;
  return readFile(targetPath, "utf8");
}
