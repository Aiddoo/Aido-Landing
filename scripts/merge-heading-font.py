from hashlib import sha256
from io import BytesIO
from pathlib import Path
import re

from fontTools.merge import Merger

font_directory = Path(__file__).resolve().parents[1] / "public" / "fonts"
source_fonts = sorted(
    path
    for path in font_directory.glob("black-han-sans-*.woff2")
    if re.fullmatch(r"black-han-sans-[0-9a-f]{12}\.woff2", path.name)
)
if not source_fonts:
    raise FileNotFoundError("Black Han Sans 원본 서브셋을 찾을 수 없어요.")

font = Merger().merge([str(path) for path in source_fonts])
font.recalcTimestamp = False
font.flavor = "woff2"
buffer = BytesIO()
font.save(buffer)
content = buffer.getvalue()
filename = f"black-han-sans-full-{sha256(content).hexdigest()[:12]}.woff2"
destination = font_directory / filename
destination.write_bytes(content)
print(f"{destination.name}: {len(content):,} bytes, {len(font.getBestCmap()):,} glyphs")
