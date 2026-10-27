"""Generate immutable site subsets from licensed originals; never modify source bytes."""
from collections import Counter
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
sources = root / "scripts/fonts/source"
directory = root / "public/fonts"
inputs = json.loads((root / "src/components/fonts/data/font-subset-inputs.json").read_text())

characters = set(range(32, 256))
korean_text = Counter()
for pattern in inputs["patterns"]:
    for path in sorted(root.glob(pattern)):
        text = path.read_text()
        characters.update(map(ord, text))
        if not path.name.endswith(".en.md"):
            korean_text.update(text)


def is_hangul(codepoint):
    return 0xAC00 <= codepoint <= 0xD7A3


def is_cjk(codepoint):
    return (0x1100 <= codepoint <= 0x11FF or 0x3000 <= codepoint <= 0x9FFF
            or 0xAC00 <= codepoint <= 0xD7FF or 0xF900 <= codepoint <= 0xFAFF
            or 0xFF00 <= codepoint <= 0xFFEF)


# English pages only receive the Latin/punctuation part of the public text.
latin_characters = {codepoint for codepoint in characters if not is_cjk(codepoint)}

# Measured system fallbacks (Hangul syllable advance, average a-z advance in em).
# Apple SD Gothic Neo: macOS/iOS. Noto Sans CJK KR: Android.
FALLBACKS = [
    {
        "name": "Apple",
        "hangul": 0.865,
        "latin": 0.472,
        "locals": {
            400: ["Apple SD Gothic Neo Regular", "AppleSDGothicNeo-Regular"],
            500: ["Apple SD Gothic Neo Medium", "AppleSDGothicNeo-Medium"],
            600: ["Apple SD Gothic Neo SemiBold", "AppleSDGothicNeo-SemiBold"],
            700: ["Apple SD Gothic Neo Bold", "AppleSDGothicNeo-Bold"],
        },
    },
    {
        "name": "Noto",
        "hangul": 0.92,
        "latin": 0.494,
        "locals": {
            400: ["Noto Sans CJK KR Regular", "NotoSansCJKkr-Regular", "Noto Sans KR Regular"],
            500: ["Noto Sans CJK KR Medium", "NotoSansCJKkr-Medium", "Noto Sans KR Medium"],
            600: ["Noto Sans CJK KR Bold", "NotoSansCJKkr-Bold", "Noto Sans KR Bold"],
            700: ["Noto Sans CJK KR Bold", "NotoSansCJKkr-Bold", "Noto Sans KR Bold"],
        },
    },
]
metric_text = Counter({
    character: count for character, count in korean_text.items()
    if is_hangul(ord(character)) or character.isascii() and character.isalnum()
})


def percent(value):
    return f"{value * 100:.2f}%"


def fallback_overrides(font, fallback):
    """Scale the fallback to the web font's average advance and copy its vertical metrics."""
    cmap = font.getBestCmap()
    units = font["head"].unitsPerEm
    web = system = 0
    for character, count in metric_text.items():
        codepoint = ord(character)
        if codepoint not in cmap:
            continue
        web += count * font["hmtx"][cmap[codepoint]][0] / units
        system += count * (fallback["hangul"] if is_hangul(codepoint) else fallback["latin"])
    size_adjust = web / system
    header = font["hhea"]
    return (f"size-adjust: {percent(size_adjust)}; "
            f"ascent-override: {percent(header.ascent / units / size_adjust)}; "
            f"descent-override: {percent(abs(header.descent) / units / size_adjust)}; "
            f"line-gap-override: {percent(header.lineGap / units / size_adjust)};")


def save_font(font, name):
    font.flavor = "woff2"
    buffer = BytesIO()
    font.save(buffer)
    content = buffer.getvalue()
    if len(content) > 300 * 1024:
        raise RuntimeError(f"{name} exceeds 300KiB; reduce the subset")
    filename = f"{name}-{sha256(content).hexdigest()[:12]}.woff2"
    destination = directory / filename
    if destination.exists() and destination.read_bytes() != content:
        raise RuntimeError(f"Immutable asset collision: {filename}")
    destination.write_bytes(content)
    return filename


def subset_font(source, codepoints, name, hinting):
    font = TTFont(sources / source, recalcTimestamp=False)
    font.recalcTimestamp = False
    options = subset.Options()
    options.recalc_timestamp = False
    # 큰 크기로만 쓰는 제목·손글씨는 힌팅을 빼 용량을 줄인다(윤곽선은 그대로).
    options.hinting = hinting
    # Keep glyph outlines/metrics and remove only unused glyphs.
    operation = subset.Subsetter(options=options)
    operation.populate(unicodes=codepoints & set(font.getBestCmap()))
    operation.subset(font)
    return save_font(font, name)


def camel(slug):
    head, *rest = slug.split("-")
    return head + "".join(part.title() for part in rest) + "Latin"


faces = []
declarations = []
preload = None
for family in inputs["families"]:
    latin_sources = []
    for face in family["faces"]:
        weight = face["weight"]
        name = f"{family['slug']}-{weight}"
        site = subset_font(face["source"], characters, f"{name}-site", family["hinting"])
        latin = subset_font(face["source"], latin_characters, f"{name}-latin",
                            family["hinting"])
        latin_sources.append(
            f'{{ path: "../../../public/fonts/{latin}", weight: "{weight}", style: "normal" }}')
        if family["preload"]:
            preload = site
        faces.append(
            f'@font-face {{ font-family: "{family["family"]}"; '
            f'src: url(/fonts/{site}) format("woff2"); font-weight: {weight}; '
            f'font-style: normal; font-display: {family["display"]}; }}')
        metrics_font = TTFont(sources / face["source"])
        for fallback in FALLBACKS:
            locals_ = ", ".join(f'local("{local}")' for local in fallback["locals"][weight])
            faces.append(
                f'@font-face {{ font-family: "{family["family"]} Fallback {fallback["name"]}"; '
                f'src: {locals_}; font-weight: {weight}; font-style: normal; '
                f'{fallback_overrides(metrics_font, fallback)} }}')
    declarations.append(
        f"const {camel(family['slug'])} = localFont({{\n"
        f"  src: [{', '.join(latin_sources)}],\n"
        f'  display: "{family["display"]}",\n'
        "  // Shared locale layout: unconditional preloads would also download Latin fonts on ko.\n"
        "  preload: false,\n"
        f'  variable: "{family["variable"]}",\n'
        "});\n")

content = ("/* Licensed OFL fonts; generated with fontTools. See public/fonts/README.md. */\n" +
           "\n".join(faces) + "\n").encode()
stylesheet_name = f"fonts-ko-{sha256(content).hexdigest()[:12]}.css"
(directory / stylesheet_name).write_bytes(content)
(root / "src/components/fonts/font-assets.ts").write_text(
    f'export const koreanFontStylesheet = "/fonts/{stylesheet_name}";\n'
    f'export const koreanDisplayFont = "/fonts/{preload}";\n')
variables = ", ".join(f"{camel(family['slug'])}.variable" for family in inputs["families"])
(root / "src/components/fonts/english-fonts.ts").write_text(
    "// Generated by scripts/generate-fonts.py. Edit font-subset-inputs.json instead.\n"
    'import localFont from "next/font/local";\n\n' + "\n".join(declarations) +
    f'\nexport const englishFontVariables = [{variables}].join(" ");\n')
(root / "src/components/fonts/data/font-subset-manifest.json").write_text(
    json.dumps({"codepoints": sorted(characters)}, indent=2) + "\n")
print(f"{stylesheet_name}: {len(faces)} faces; preload {preload}")
