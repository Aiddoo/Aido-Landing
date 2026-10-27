# Aido fonts

Three SIL Open Font License families, matching the app, store art and SNS:

| Role | Family | Weights | Source |
|---|---|---|---|
| Display (h1/h2, `font-display`, shadcn `font-heading`) | Jua 1.001 | 400 | The Jua Project Authors (Google Fonts) |
| Hand-written accent (`font-hand`) | Nanum Pen Script 1.10 | 400 | NHN Corporation (Naver Nanum) |
| Body and UI (`font-sans`) | Wanted Sans 1.003 | 400, 500, 600, 700 | The Wanted Sans Project Authors |

The licensed originals live in `scripts/fonts/source/` (not served). Medium/SemiBold/Bold are the
original Wanted Sans WOFF2 files; Jua, Nanum Pen Script and Wanted Sans Regular were converted from
the original TTF to WOFF2 without changing glyph data. License texts: `jua-OFL.txt`,
`nanum-pen-script-OFL.txt`, `wanted-sans-OFL.txt`.

## Visitor assets

- **Korean** pages receive `font-assets.ts → koreanFontStylesheet`, a content-hashed CSS file hoisted
  into the head with React 19 `precedence="fonts"`. Each face is one `*-site-<hash>.woff2` subset of
  the public text (about 82KiB Jua, 126KiB Nanum Pen Script, 55KiB per Wanted Sans weight). English
  pages never request it.
- **English** pages use `english-fonts.ts` (`next/font/local`) with Latin subsets
  (`*-latin-<hash>.woff2`, 12–16KiB each) and Next.js' automatic Arial metric fallbacks.
  `preload: false`, because the locale layout is shared and would otherwise download Latin files on
  Korean pages.
- Jua and Nanum Pen Script subsets drop TrueType hinting (large display sizes only; outlines and
  advances unchanged), which cuts Jua by about 37%. Wanted Sans keeps hinting for body text.

## Loading policy (CLS 0, no FOIT)

- **Exactly one Korean preload**: the Jua subset (`koreanDisplayFont`), the above-the-fold heading.
  Zero English font preloads. Never preload body weights.
- `font-display: swap` for Jua and Wanted Sans, `optional` for the decorative Nanum Pen Script.
- Every Korean family has metric-adjusted fallbacks in the same CSS (`"<Family> Fallback Apple"`
  for Apple SD Gothic Neo, `"<Family> Fallback Noto"` for Android's Noto Sans CJK KR) with
  `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override` computed by the
  generator from the real font: Hangul/Latin advances weighted by the Korean public text, and the
  web font's `hhea` metrics. The font stacks in `globals.css` list these fallbacks right after the
  web font, so a late swap keeps line boxes and line breaks.
- `/fonts/*` uses a one-year immutable cache. Never change the bytes of a hashed asset; generate a
  new filename instead.

## Regeneration

`src/components/fonts/data/font-subset-inputs.json` lists the text sources (messages, update
records, legal pairs) and the families (CSS family name, display policy, preload, hinting, source
files). The generator adds Latin-1, writes the hashed WOFF2/CSS files, `font-assets.ts`,
`english-fonts.ts` and `font-subset-manifest.json`. `pnpm seo:check` compares the public text with
the manifest and fails when new glyphs need regeneration.

```bash
python3 -m venv /tmp/aido-font-tools
/tmp/aido-font-tools/bin/pip install 'fonttools[woff]==4.66.1'
/tmp/aido-font-tools/bin/python scripts/generate-fonts.py
pnpm exec biome format --write src/components/fonts
pnpm build
pnpm seo:check
```

Delete superseded hashed files in `public/fonts` after regeneration (only the files referenced by
the new CSS and `english-fonts.ts` should remain). The generator refuses files over 300KiB and
hash collisions. Python/fontTools are authoring tools only; CI validates committed assets with
Node.

`seo:check` also checks the locale preload counts, same-origin URLs, stylesheet hash, WOFF2
signatures/content hashes, the 300KiB limit, display policy per family, fallback metric overrides
and OFL files. See [performance measurements](../../docs/performance.md) for page transfer costs.
