# Aido fonts

Original Black Han Sans (Google Fonts v24, weight 400) and Noto Sans KR (Google Fonts v40, variable weights 400–700), served locally under the SIL Open Font License. See the two OFL files alongside these assets.

Source: Google's official CSS2 API, requested with `family=Black+Han+Sans&family=Noto+Sans+KR:wght@400..700&display=swap`. The original source WOFF2 bytes and Unicode coverage are unmodified; filenames include a SHA-256 content prefix. The merged heading asset is described below. `src/app/fonts.css` retains Google's `unicode-range` declarations for Noto Sans KR so browsers fetch only the body-text subsets required by the page.

This removes Google Fonts network calls from builds and visitor requests. When updating fonts, fetch the official CSS and fonts, preserve the license files, regenerate the content-based names, and update the CSS URLs together.

English pages reuse the existing Latin subset files through `next/font/local`, with generated fallback metrics and `display: optional` to prevent late font swaps. The shared locale layout sets `preload: false` for both Latin files: Next's automatic layout-level preloads would otherwise download them on Korean pages too. On English pages the rendered font CSS discovers the small Latin assets (about 9KiB for headings and 25KiB for body text). Korean body text keeps Google's Unicode subsets with `font-display: optional`.

Korean headings use one merged Black Han Sans WOFF2 file (about 109KiB) instead of independently swapping 88 subsets. The merged file preserves all 2,733 Unicode mappings, outlines and advances from the original assets. The Korean layout uses the small `FontPreload` Client Component and React DOM's supported `preload()` method to emit one deduplicated resource hint into the initial server-rendered HTML, with `as="font"`, `type="font/woff2"`, and anonymous cross-origin mode. English pages do not request the Korean heading asset. `optional` keeps readable system text when a slow connection cannot deliver the font during the initial short block period; a cold visit may use the fallback font for that navigation. It does not promise identical typography on slow networks.

Keep one Korean heading preload and zero English font preloads. Do not preload all Korean body subsets: the browser requests only the Unicode ranges needed for visible text. Body fallbacks include Apple SD Gothic Neo and Malgun Gothic, while `next/font/local` continues to generate Latin fallback metrics. Existing font outlines and weights remain unchanged.

`next.config.ts` serves `/fonts/*` with `Cache-Control: public, max-age=31536000, immutable`. Never replace a hashed file with different bytes. `pnpm seo:check` checks the actual built pages' preload counts, same-origin URLs, cross-origin mode, WOFF2 signatures, SHA-256 filename prefixes, the 300KiB per-file limit, Unicode body subsets, `optional`, and OFL license files. The original source files stay in the repository for reproducible updates; they are not all downloaded by visitors.

The original subset files remain the licensed source assets. Regenerate the merged heading font with the standard fontTools merger, outside the application runtime:

```bash
python3 -m venv /tmp/aido-heading-fonts
/tmp/aido-heading-fonts/bin/pip install 'fonttools[woff]==4.66.1'
/tmp/aido-heading-fonts/bin/python scripts/merge-heading-font.py
```

The script preserves source timestamps and names the generated asset with its SHA-256 prefix. After a source update, use the generated filename in `src/app/fonts.css` and `src/app/[locale]/layout.tsx`, then run the production build and `pnpm seo:check`. Font licenses and source glyphs stay unchanged.
