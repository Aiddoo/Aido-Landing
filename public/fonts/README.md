# Aido fonts

Black Han Sans (Google Fonts v24, weight 400) and Noto Sans KR (Google Fonts v40, variable weights 400–700) are self-hosted under the SIL Open Font License. The original WOFF2 files and both OFL files are preserved byte for byte. Source: Google's official CSS2 API, `family=Black+Han+Sans&family=Noto+Sans+KR:wght@400..700&display=swap`.

## Visitor assets

Korean pages request the **site subsets**, generated with standard fontTools from the licensed originals. Glyph outlines, advances and variable weights stay intact; unused glyphs are removed. The heading subset is about 31KiB, compared with the original full merged heading's 109KiB. Noto Sans KR retains Unicode ranges, with each range reduced to the site's public text. The original `fonts-ko-1553ca02ef76.css` remains the source registry; visitors request the generated stylesheet referenced by `src/components/fonts/font-assets.ts`.

The locale layout hoists this content-hashed stylesheet into the Korean HTML head using React 19's `precedence="fonts"`. English pages do not request it. English uses the original small Latin assets through `next/font/local`, generated fallback metrics and `preload: false` so the shared layout does not download unused Latin fonts on Korean pages.

All fonts use `display: optional`. A slow cold visit can keep the system fallback for that navigation, without a late font swap. This does not promise identical typography on slow networks. Body fallbacks include Apple SD Gothic Neo and Malgun Gothic. The application never hides content or waits for `document.fonts.ready`.

Keep **one Korean heading preload and zero English font preloads**. FontPreload uses React DOM's supported preload API with WOFF2 type and anonymous cross-origin mode. Do not preload every body subset. `/fonts/*` uses a one-year immutable cache. Never change the bytes of a hashed asset; generate a new filename instead.

## Regeneration

The input registry is `src/components/fonts/data/font-subset-inputs.json`: messages, update records and both legal document pairs. The generator also includes Latin-1 characters. `font-subset-manifest.json` records the text codepoints. `pnpm seo:check` compares the current public text with that manifest and fails when new glyphs need regeneration. This prevents silently shipping missing characters after content changes.

Regenerate outside the application runtime with the standard fontTools merger/subsetter:

```bash
python3 -m venv /tmp/aido-font-tools
/tmp/aido-font-tools/bin/pip install 'fonttools[woff]==4.66.1'
/tmp/aido-font-tools/bin/python scripts/generate-fonts.py
pnpm format src/components/fonts/font-assets.ts
pnpm build
pnpm seo:check
```

The generator replaces the previous merge-only script: it merges the original heading subsets, subsets both font families, writes new hashed WOFF2/CSS assets and updates the asset constants/manifest. Original source files and licenses remain unchanged. Python/fontTools are optional asset-authoring tools, not runtime or CI dependencies; CI validates the committed assets with Node.

`seo:check` also checks the rendered locale preload counts, same-origin URLs, stylesheet hash, WOFF2 signatures/content hashes, the per-file 300KiB limit, Unicode ranges, optional display and OFL files. For new text sources, add their patterns to the input registry before regeneration. See [performance measurements](../../docs/performance.md) for actual page transfer costs.
