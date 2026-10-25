// 카카오톡 친구 초대 피드 썸네일(public/images/invite-share.png)을 만든다.
// 앱(apps/mobile invite-share.ts)이 https://aido.kr/images/invite-share.png를 피드 이미지로 쓴다.
// 피드 제목·설명에 "OO님이 아이두에 초대했어요", "프리미엄 7일"이 이미 있으므로 이미지는 같이 하는 동기만 보여준다.
//
// pnpm images:invite-share
// pnpm images:invite-share --out /tmp/a.png --tagline "…" --headline "첫 줄/둘째 줄 [강조]"
//
// 글꼴은 scripts/invite-share/fonts의 서브셋만 쓴다(Jua, 나눔손글씨 펜 → Aido Hand Subset, Wanted Sans; 모두 OFL).
// 문구를 바꾸면 subset-text.txt에 글자를 추가하고 서브셋을 다시 만든다(fontTools pyftsubset --text-file).
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const WIDTH = 800;
const HEIGHT = 400;
// 고해상도 화면에서 흐리지 않도록 2배로 저장한다. 카카오 피드 이미지 한도(5MB) 안에서 1MB 이하를 유지한다.
const SCALE = 2;
const MAX_BYTES = 1024 * 1024;

const { values } = parseArgs({
  options: {
    out: { type: "string", default: "public/images/invite-share.png" },
    tagline: { type: "string", default: "혼자 하면 미루고, 같이 하면 끝내요" },
    headline: { type: "string", default: "서로 [콕콕],/오늘 할 일 끝!" },
  },
});

const templateDir = path.resolve("scripts/invite-share");
const subsetText = await readFile(
  path.join(templateDir, "fonts/subset-text.txt"),
  "utf8",
);
for (const char of `${values.tagline}${values.headline}`.replace(
  /[[\]/\s]/g,
  "",
)) {
  assert.ok(
    subsetText.includes(char),
    `"${char}" is not in fonts/subset-text.txt; regenerate the font subsets`,
  );
}

const browser = await chromium.launch();
try {
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE,
  });
  await page.goto(`file://${path.join(templateDir, "template.html")}`);
  await page.evaluate(
    ({ tagline, headline }) => {
      document.querySelector('[data-slot="tagline"]').textContent = tagline;
      const target = document.querySelector('[data-slot="headline"]');
      for (const [index, line] of headline.split("/").entries()) {
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
    { tagline: values.tagline, headline: values.headline },
  );
  await page.evaluate(() => document.fonts.ready);
  const fontsLoaded = await page.evaluate(() =>
    [...document.fonts].every((font) => font.status === "loaded"),
  );
  assert.ok(fontsLoaded, "Every subset font must load");
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete && image.naturalWidth),
  );

  const screenshot = await page.screenshot({ type: "png" });
  const png = await sharp(screenshot)
    .png({ palette: true, quality: 95, effort: 10, compressionLevel: 9 })
    .toBuffer();
  const { width, height } = await sharp(png).metadata();
  assert.equal(width, WIDTH * SCALE);
  assert.equal(height, HEIGHT * SCALE);
  assert.ok(png.length <= MAX_BYTES, `${png.length} bytes exceeds 1MB`);
  await writeFile(values.out, png);
  console.log(
    `Wrote ${values.out} (${width}×${height}, ${Math.round(png.length / 1024)}KiB).`,
  );
} finally {
  await browser.close();
}
