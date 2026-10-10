"""Generate immutable site subsets from licensed originals; never modify source bytes."""
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re

from fontTools import subset
from fontTools.merge import Merger
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
directory = root / "public/fonts"
inputs = json.loads((root / "src/components/fonts/data/font-subset-inputs.json").read_text())
characters = set(range(32, 256))
for pattern in inputs["patterns"]:
    for path in root.glob(pattern):
        characters.update(map(ord, path.read_text()))


def save_font(font, name):
    font.recalcTimestamp = False
    font.flavor = "woff2"
    buffer = BytesIO()
    font.save(buffer)
    content = buffer.getvalue()
    filename = f"{name}-{sha256(content).hexdigest()[:12]}.woff2"
    destination = directory / filename
    if destination.exists() and destination.read_bytes() != content:
        raise RuntimeError(f"Immutable asset collision: {filename}")
    destination.write_bytes(content)
    return filename


def subset_font(font, codepoints, name):
    options = subset.Options()
    options.recalc_timestamp = False
    # Keep all supported variable weights and glyph metrics; only remove unused glyphs.
    operation = subset.Subsetter(options=options)
    operation.populate(unicodes=codepoints)
    operation.subset(font)
    return save_font(font, name)


heading_sources = sorted(path for path in directory.glob("black-han-sans-*.woff2")
                         if re.fullmatch(r"black-han-sans-[0-9a-f]{12}\.woff2", path.name))
heading = Merger().merge([str(path) for path in heading_sources])
heading_name = subset_font(heading, characters & set(heading.getBestCmap()), "black-han-sans-site")
stylesheet = (root / inputs["stylesheet"]).read_text()
faces = []
for block in re.findall(r"@font-face\s*\{[^}]+\}", stylesheet):
    source = re.search(r"url\(([^)]+)\)", block).group(1)
    if '"Black Han Sans"' in block:
        faces.append(block.replace(source, f"/fonts/{heading_name}"))
        continue
    ranges = re.search(r"unicode-range:\s*([^;]+);", block).group(1)
    coverage = set()
    for value in ranges.split(","):
        parts = value.strip()[2:].split("-")
        start = int(parts[0], 16)
        end = int(parts[-1], 16)
        coverage.update(range(start, end + 1))
    used = characters & coverage
    if not used:
        continue
    font = TTFont(root / f"public{source}", recalcTimestamp=False)
    used &= set(font.getBestCmap())
    if not used:
        continue
    name = subset_font(font, used, "noto-sans-kr-site")
    block = block.replace(source, f"/fonts/{name}")
    block = re.sub(r"unicode-range:\s*[^;]+;", "unicode-range: " +
                   ", ".join(f"U+{codepoint:X}" for codepoint in sorted(used)) + ";", block)
    faces.append(block)

content = ("/* Licensed Google Fonts; generated with fontTools. See public/fonts/README.md. */\n" +
           "\n".join(faces) + "\n").encode()
stylesheet_name = f"fonts-ko-{sha256(content).hexdigest()[:12]}.css"
(directory / stylesheet_name).write_bytes(content)
(root / "src/components/fonts/font-assets.ts").write_text(
    f'export const koreanFontStylesheet = "/fonts/{stylesheet_name}";\n'
    f'export const koreanHeadingFont = "/fonts/{heading_name}";\n')
(root / "src/components/fonts/data/font-subset-manifest.json").write_text(
    json.dumps({"codepoints": sorted(characters)}, indent=2) + "\n")
print(f"{stylesheet_name}: {len(faces)} faces; heading {heading_name}")
