# Aido fonts

Three SIL Open Font License families, matching the app, store art and SNS:

| Role | Family | Weights | Source |
|---|---|---|---|
| Display (h1/h2, `font-display`, shadcn `font-heading`) | Jua 1.001 | 400 | The Jua Project Authors (Google Fonts) |
| Hand-written accent (`font-hand`) | Nanum Pen Script 1.10 | 400 | NHN Corporation (Naver Nanum) |
| Body and UI (`font-sans`) | Wanted Sans 1.003 | 400, 600, 700 | The Wanted Sans Project Authors |

The licensed originals live in `scripts/fonts/source/` (not served; Wanted Sans Medium is kept as an
original but not shipped). License texts: `jua-OFL.txt`, `nanum-pen-script-OFL.txt`,
`wanted-sans-OFL.txt`.

## Visitor assets: unicode-range slices

Both locales use the same families. `src/components/fonts/web-fonts.css` (generated) is imported
by `globals.css`, so the faces ship inside the one bundled stylesheet; there is no separate font
CSS request. Every face is split into slices that the browser downloads only when the page renders
one of their characters:

| Slice | Contents | Who downloads it |
|---|---|---|
| `base` | ASCII, the other non-Hangul characters pages render, the few Hangul on English pages (`한국어`) | every page that uses the face; English pages need nothing else |
| `home` | Hangul that `/ko` renders in this face | Korean home, and most Korean pages |
| `pages` | further Hangul from guides, services and the invite pages | those pages |
| `updates` | further Hangul from patch notes | patch notes |
| `legal` | further Hangul from terms, privacy and account deletion | legal pages |
| `rest` | the remaining public text, so every glyph stays available | only a page that renders one of them |

Measured on the 2026-10-27 build: `/ko` downloads about 125KiB of fonts (was 426KiB), `/en`
about 57KiB (was 84KiB). Wanted Sans ships 400/600/700 only; `globals.css` maps `font-medium` to
600 so generated shadcn components keep a real face. Jua and Nanum Pen Script have one weight; do
not combine `font-display` with bold utilities (that synthesizes a faux bold).

## Loading policy (CLS 0, no FOIT)

- **Exactly one preload, Korean only**: the Jua `home` slice (`koreanDisplayFont`), the
  above-the-fold heading. Zero English font preloads. Never preload body weights.
- `font-display: swap` for Jua and Wanted Sans, `optional` for the decorative Nanum Pen Script.
- Every family has metric-adjusted fallbacks with `size-adjust`, `ascent-override`,
  `descent-override` and `line-gap-override` computed from the real font: Korean pages use
  `"<Family> Fallback Apple"` (Apple SD Gothic Neo) and `"<Family> Fallback Noto"` (Noto Sans CJK KR)
  weighted by the Korean public text; English pages use `"<Family> Fallback Arial"` weighted by the
  English text. The stacks in `globals.css` list them right after the web font.
- `/fonts/*` uses a one-year immutable cache. Never change the bytes of a hashed asset; the
  generator writes a new filename instead.

## Regeneration

Inputs: `src/components/fonts/data/font-subset-inputs.json` (text sources, page groups, families)
and `font-usage.json` (characters each built page renders per face, recorded in light and dark,
with the analytics consent card visible).

```bash
# 1. Record what every page renders (needs a production build with the consent card).
VERCEL_ENV=production VERCEL=1 NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEST123 pnpm build
VERCEL_ENV=production VERCEL=1 NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEST123 pnpm start --port 3217 &
pnpm fonts:usage
# 2. Generate slices, then rebuild and check.
python3 -m venv /tmp/aido-font-tools
/tmp/aido-font-tools/bin/pip install 'fonttools[woff]==4.66.1'
rm public/fonts/*.woff2
/tmp/aido-font-tools/bin/python scripts/generate-fonts.py
pnpm build && pnpm seo:check
```

When only text changes, step 2 alone keeps every glyph available (new characters fall into
`rest`); re-run step 1 when a page's copy changes noticeably, so that page does not download
`rest`. The generator refuses files over 300KiB and hash collisions. Python/fontTools and
Playwright are authoring tools only; CI validates committed assets with Node.

`seo:check` compares the public text with the manifest, checks that each face's slices cover it
exactly once with non-overlapping `unicode-range`s, that only declared slices remain in
`public/fonts`, WOFF2 signatures/content hashes, the 300KiB limit, display policy per family,
fallback metric overrides, the single Korean preload and that the faces are in the bundled
stylesheet. See [performance measurements](../../docs/performance.md) for page transfer costs.
