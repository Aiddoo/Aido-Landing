// Records which characters each page renders in each web font face, so generate-fonts.py can
// split every face into unicode-range slices that a page downloads only when it renders them.
// Usage: pnpm build && pnpm start --port 3217, then `node scripts/collect-font-usage.mjs`.
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { featureGuides } from "../src/features/feature-guides/data/feature-guides.ts";

const origin = process.env.FONT_USAGE_ORIGIN ?? "http://localhost:3217";
const inputs = JSON.parse(
  await readFile("src/components/fonts/data/font-subset-inputs.json", "utf8"),
);
const paths = [
  "",
  "/services",
  "/invite",
  ...featureGuides.map((guide) => guide.path),
  "/patch-notes",
  "/terms",
  "/privacy",
  "/account-deletion",
];

const browser = await chromium.launch();
const pages = {};
for (const scheme of ["light", "dark"]) {
  for (const locale of ["ko", "en"]) {
    for (const path of paths) {
      const page = await browser.newPage({ colorScheme: scheme });
      await page.goto(`${origin}/${locale}${path}`, { waitUntil: "load" });
      const faces = await page.evaluate(
        (families) => {
          const used = {};
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
          );
          for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            const element = node.parentElement;
            if (
              !element ||
              element.closest("script, style, noscript, template")
            )
              continue;
            const style = getComputedStyle(element);
            const family = style.fontFamily
              .split(",")[0]
              .replaceAll('"', "")
              .trim();
            if (!families.includes(family)) continue;
            const key = `${family}|${style.fontWeight}`;
            used[key] = (used[key] ?? "") + node.data;
          }
          return used;
        },
        inputs.families.map((family) => family.family),
      );
      const route = `/${locale}${path}`;
      pages[route] ??= {};
      for (const [key, text] of Object.entries(faces)) {
        const characters = new Set([...(pages[route][key] ?? ""), ...text]);
        pages[route][key] = [...characters]
          .filter((character) => character >= " ")
          .sort()
          .join("");
      }
      await page.close();
    }
  }
}
await browser.close();
await writeFile(
  "src/components/fonts/data/font-usage.json",
  `${JSON.stringify({ pages }, null, 2)}\n`,
);
console.log(`font-usage.json: ${Object.keys(pages).length} pages`);
