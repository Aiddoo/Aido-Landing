// 홈 OG 이미지(public/og-image-ko.png, public/og-image-en.png, 1200×630)를 만든다.
// src/lib/seo.ts의 OG_IMAGE_PATHS가 가리킨다. 글꼴은 public/fonts의 사이트 서브셋(Jua, 나눔손글씨 펜, Wanted Sans; 모두 OFL)을 쓴다.
//
// pnpm images:og
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const MAX_BYTES = 300 * 1024;

const copy = {
  ko: {
    hand: "오늘 할 일, 이번엔 끝까지",
    headline: "혼자 하면 미루고,/같이 하면 [끝내요]",
    sub: "AI가 할 일을 정리하고, 친구가 콕 응원해요",
    brand: "아이두",
    chip: "iOS · Android 무료",
  },
  en: {
    hand: "Finish today's list this time",
    headline: "Put it off alone./Get it done [together.]",
    sub: "AI sorts your to-dos. Friends nudge you along.",
    brand: "Aido",
    chip: "Free on iOS & Android",
  },
};

const template = `file://${path.resolve("scripts/og-image/template.html")}`;
const browser = await chromium.launch();
try {
  for (const [locale, text] of Object.entries(copy)) {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
    });
    await page.goto(template);
    await page.evaluate(
      ({ locale, text }) => {
        document.documentElement.lang = locale;
        for (const slot of ["hand", "sub", "brand", "chip"]) {
          document.querySelector(`[data-slot="${slot}"]`).textContent =
            text[slot];
        }
        const target = document.querySelector('[data-slot="headline"]');
        for (const [index, line] of text.headline.split("/").entries()) {
          if (index > 0) target.append(document.createElement("br"));
          for (const part of line.split(/(\[[^\]]+\])/)) {
            if (part.startsWith("[")) {
              const em = document.createElement("em");
              em.textContent = part.slice(1, -1);
              target.append(em);
            } else {
              target.append(part);
            }
          }
        }
      },
      { locale, text },
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() =>
      [...document.images].every(
        (image) => image.complete && image.naturalWidth,
      ),
    );
    const screenshot = await page.screenshot({ type: "png" });
    const png = await sharp(screenshot)
      .png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 })
      .toBuffer();
    const { width, height } = await sharp(png).metadata();
    assert.equal(width, WIDTH);
    assert.equal(height, HEIGHT);
    assert.ok(png.length <= MAX_BYTES, `${png.length} bytes exceeds 300KiB`);
    const out = `public/og-image-${locale}.png`;
    await writeFile(out, png);
    console.log(
      `Wrote ${out} (${width}×${height}, ${Math.round(png.length / 1024)}KiB).`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
