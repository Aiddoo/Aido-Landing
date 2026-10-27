"""Generate immutable unicode-range slices from licensed originals; never modify source bytes.

Korean pages use each family split by the page group that first renders a character in that face
(font-usage.json): `home` (everything /ko renders), `ascii` (the rest of ASCII), `pages`, `updates`, `legal`,
then `rest` so every public glyph stays available. English pages use "<Family> Latin", one slice
with ASCII and what the English pages render, so they never touch the Korean slices.
"""
from collections import Counter
from fnmatch import fnmatch
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
sources = root / "scripts/fonts/source"
directory = root / "public/fonts"
data = root / "src/components/fonts/data"
inputs = json.loads((data / "font-subset-inputs.json").read_text())
usage = json.loads((data / "font-usage.json").read_text())["pages"]

characters = set(range(32, 127))
korean_text = Counter()
english_text = Counter()
for pattern in inputs["patterns"]:
    for path in sorted(root.glob(pattern)):
        text = path.read_text()
        characters.update(ord(character) for character in text if character >= " ")
        (english_text if path.name.endswith(".en.md") else korean_text).update(text)


def is_hangul(codepoint):
    return (0x1100 <= codepoint <= 0x11FF or 0x3130 <= codepoint <= 0x318F
            or 0xAC00 <= codepoint <= 0xD7A3)


# Measured system fallbacks (Hangul syllable advance, average a-z advance in em).
# Apple SD Gothic Neo: macOS/iOS. Noto Sans CJK KR: Android.
KOREAN_FALLBACKS = [
    {
        "name": "Apple",
        "hangul": 0.865,
        "latin": 0.472,
        "locals": {
            400: ["Apple SD Gothic Neo Regular", "AppleSDGothicNeo-Regular"],
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
            600: ["Noto Sans CJK KR Bold", "NotoSansCJKkr-Bold", "Noto Sans KR Bold"],
            700: ["Noto Sans CJK KR Bold", "NotoSansCJKkr-Bold", "Noto Sans KR Bold"],
        },
    },
]
# Arial advances (2048 units per em) for English pages, like next/font's automatic fallback.
ARIAL_GLYPHS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
ARIAL = {
    400: {
        "locals": ["Arial", "ArialMT"],
        "advances": [1139, 1139, 1024, 1139, 1139, 569, 1139, 1139, 455, 455, 1024, 455, 1706,
                     1139, 1139, 1139, 1139, 682, 1024, 569, 1139, 1024, 1479, 1024, 1024, 1024,
                     1366, 1366, 1479, 1479, 1366, 1251, 1593, 1479, 569, 1024, 1366, 1139, 1706,
                     1479, 1593, 1366, 1593, 1479, 1366, 1251, 1479, 1366, 1933, 1366, 1366, 1251,
                     *[1139] * 10, 569],
    },
    700: {
        "locals": ["Arial Bold", "Arial-BoldMT"],
        "advances": [1139, 1251, 1139, 1251, 1139, 682, 1251, 1251, 569, 569, 1139, 569, 1821,
                     1251, 1251, 1251, 1251, 797, 1139, 682, 1251, 1139, 1593, 1139, 1139, 1024,
                     1479, 1479, 1479, 1479, 1366, 1251, 1593, 1479, 569, 1139, 1479, 1251, 1706,
                     1479, 1593, 1366, 1593, 1479, 1366, 1251, 1479, 1366, 1933, 1366, 1366, 1251,
                     *[1139] * 10, 569],
    },
}


def percent(value):
    return f"{value * 100:.2f}%"


def overrides(font, text, system_advance):
    """Scale the fallback to the web font's average advance and copy its vertical metrics."""
    cmap = font.getBestCmap()
    units = font["head"].unitsPerEm
    web = system = 0
    for character, count in text.items():
        codepoint = ord(character)
        advance = system_advance(character)
        if codepoint not in cmap or advance is None:
            continue
        web += count * font["hmtx"][cmap[codepoint]][0] / units
        system += count * advance
    size_adjust = web / system
    header = font["hhea"]
    return (f"size-adjust: {percent(size_adjust)}; "
            f"ascent-override: {percent(header.ascent / units / size_adjust)}; "
            f"descent-override: {percent(abs(header.descent) / units / size_adjust)}; "
            f"line-gap-override: {percent(header.lineGap / units / size_adjust)};")


def korean_advance(fallback):
    def advance(character):
        if is_hangul(ord(character)):
            return fallback["hangul"]
        return fallback["latin"] if character.isascii() and character.isalnum() else None
    return advance


def arial_advance(weight):
    table = dict(zip(ARIAL_GLYPHS, ARIAL[weight]["advances"]))
    return lambda character: table[character] / 2048 if character in table else None


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
    operation = subset.Subsetter(options=options)
    operation.populate(unicodes=codepoints)
    operation.subset(font)
    return save_font(font, name)


def used_weight(family, weight):
    """CSS font matching against the weights this family ships."""
    weights = sorted(face["weight"] for face in family["faces"])
    if weight in weights:
        return weight
    lighter = [value for value in weights if value < weight][::-1]
    heavier = [value for value in weights if value > weight]
    return (lighter + heavier if weight <= 500 else heavier + lighter)[0]


def rendered(family, weight, page_pattern):
    found = set()
    for route, faces in usage.items():
        if not fnmatch(route, page_pattern):
            continue
        for key, text in faces.items():
            name, value = key.rsplit("|", 1)
            if name == family["family"] and used_weight(family, int(value)) == weight:
                found.update(map(ord, text))
    return found


def unicode_range(codepoints):
    """Only consecutive members merge: any other codepoint in a range would download the slice."""
    ranges = []
    for codepoint in sorted(codepoints):
        if ranges and ranges[-1][1] == codepoint - 1:
            ranges[-1][1] = codepoint
        else:
            ranges.append([codepoint, codepoint])
    return ", ".join(f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}"
                     for start, end in ranges)


faces = []
preloads = {}
manifest = {"text": "".join(map(chr, sorted(characters))), "faces": {}}


def declare(family_name, family, weight, name, codepoints, entry, source, locale):
    filename = subset_font(source, codepoints, f"{family['slug']}-{weight}-{name}",
                           family["hinting"])
    if family["preload"].get(locale) == name:
        preloads[locale] = filename
    entry["slices"][filename] = "".join(map(chr, sorted(codepoints)))
    faces.append(
        f'@font-face {{ font-family: "{family_name}"; '
        f'src: url(/fonts/{filename}) format("woff2"); font-weight: {weight}; '
        f'font-style: normal; font-display: {family["display"]}; '
        f'unicode-range: {unicode_range(codepoints)}; }}')


def manifest_entry(name, covered):
    entry = manifest["faces"][name] = {
        "missing": "".join(map(chr, sorted(characters - covered))), "slices": {}}
    return entry


for family in inputs["families"]:
    for face in family["faces"]:
        weight = face["weight"]
        source = TTFont(sources / face["source"])
        available = characters & set(source.getBestCmap())

        # 한국어: /ko가 그리는 글자(라틴 포함)를 한 조각으로, 그 뒤 페이지 묶음 순서로 나눈다.
        entry = manifest_entry(f"{family['family']} {weight}", available)
        assigned = set()
        for group in inputs["slices"]:
            members = set()
            for pattern in group["pages"]:
                members |= rendered(family, weight, pattern)
            if group["name"] == "home":
                members |= {32}
            members = (members & available) - assigned
            if members:
                declare(family["family"], family, weight, group["name"], members, entry,
                        face["source"], "ko")
                assigned |= members
            if group["name"] == "home":
                # 목록 번호(::marker)처럼 글자 노드가 아닌 문자도 있어 나머지 ASCII는 작은 조각으로 둔다.
                ascii_ = (set(range(32, 127)) & available) - assigned
                declare(family["family"], family, weight, "ascii", ascii_, entry,
                        face["source"], "ko")
                assigned |= ascii_
        if available - assigned:
            declare(family["family"], family, weight, "rest", available - assigned, entry,
                    face["source"], "ko")

        # 영어: ASCII와 영어 페이지가 그리는 글자만 담은 "<글꼴> Latin" 한 조각.
        latin = (set(range(32, 127)) | rendered(family, weight, "/en*")) & available
        latin_entry = manifest_entry(f"{family['family']} Latin {weight}", latin)
        declare(f"{family['family']} Latin", family, weight, "latin", latin, latin_entry,
                face["source"], "en")
        for fallback in KOREAN_FALLBACKS:
            locals_ = ", ".join(f'local("{local}")' for local in fallback["locals"][weight])
            faces.append(
                f'@font-face {{ font-family: "{family["family"]} Fallback {fallback["name"]}"; '
                f'src: {locals_}; font-weight: {weight}; font-style: normal; '
                f'{overrides(source, korean_text, korean_advance(fallback))} }}')
        arial = 400 if weight < 600 else 700
        locals_ = ", ".join(f'local("{local}")' for local in ARIAL[arial]["locals"])
        faces.append(
            f'@font-face {{ font-family: "{family["family"]} Fallback Arial"; '
            f'src: {locals_}; font-weight: {weight}; font-style: normal; '
            f'{overrides(source, english_text, arial_advance(arial))} }}')

(root / "src/components/fonts/web-fonts.css").write_text(
    "/* Generated by scripts/generate-fonts.py from licensed OFL fonts. "
    "See public/fonts/README.md. */\n" + "\n".join(faces) + "\n")
(root / "src/components/fonts/font-assets.ts").write_text(
    "// Generated by scripts/generate-fonts.py. Edit font-subset-inputs.json instead.\n"
    f'export const koreanDisplayFont = "/fonts/{preloads["ko"]}";\n'
    f'export const englishDisplayFont = "/fonts/{preloads["en"]}";\n')
(data / "font-subset-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
files = sum(len(entry["slices"]) for entry in manifest["faces"].values())
print(f"web-fonts.css: {len(faces)} faces; {files} files; preload {preloads}")
