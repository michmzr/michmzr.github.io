"""Build identity assets from cs-monogram.svg; requires rsvg-convert."""
from pathlib import Path
import os
import struct
import subprocess
import tempfile
from xml.sax.saxutils import escape

assets = Path(__file__).resolve().parent.parent / "assets"
logos = assets / "images/logo"
source = (logos / "cs-monogram.svg").read_text()
mark = source.split(">", 1)[1].rsplit("</svg>", 1)[0].strip()


def svg(width, height, content):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" '
            f'viewBox="0 0 {width} {height}">{content}</svg>\n')


# The same paths drive every size, with an 8px safe margin in a 64px icon.
square = svg(64, 64, '<rect width="64" height="64" rx="12" fill="#0A1628"/>'
             f'<g transform="translate(8 16.16) scale(.12)">{mark}</g>')
(assets / "favicon.svg").write_text(square)
(logos / "logo.svg").write_text(square)
mask = mark.replace('#F7F4ED', '#000000').replace('#FF6B35', '#000000')
(assets / "safari-pinned-tab.svg").write_text(
    svg(64, 64, f'<g transform="translate(8 16.16) scale(.12)">{mask}</g>'))
sizes = {16: "favicon-16x16.png", 32: "favicon-32x32.png", 48: "favicon-48x48.png",
         70: "mstile-70x70.png", 144: "mstile-144x144.png",
         310: "mstile-310x310.png", 150: "mstile-150x150.png", 180: "apple-touch-icon.png",
         192: "android-chrome-192x192.png", 512: "android-chrome-512x512.png"}
for size, filename in sizes.items():
    subprocess.run(["rsvg-convert", "-w", str(size), "-h", str(size),
                    str(assets / "favicon.svg"), "-o", str(assets / filename)], check=True)
(logos / "logo.png").write_bytes((assets / sizes[512]).read_bytes())
subprocess.run(["rsvg-convert", "-w", "150", "-h", "150", "--page-width", "310",
                "--page-height", "150", "--left", "80", "--background-color", "#0A1628",
                str(assets / "favicon.svg"), "-o", str(assets / "mstile-310x150.png")], check=True)
# ICO permits PNG-compressed images; each entry uses its native dimensions.
entries, payloads, offset = [], [], 6 + 16 * 3
for size in (16, 32, 48):
    payload = (assets / sizes[size]).read_bytes()
    entries.append(struct.pack("<BBBBHHII", size, size, 0, 0, 1, 32, len(payload), offset))
    payloads.append(payload)
    offset += len(payload)
(assets / "favicon.ico").write_bytes(struct.pack("<HHH", 0, 1, 3) + b"".join(entries + payloads))
(assets.parent / "favicon.ico").write_bytes((assets / "favicon.ico").read_bytes())
# Social preview uses the local licensed font, independent of installed fonts.
with tempfile.TemporaryDirectory(prefix="cybershu-brand-") as directory:
    temporary = Path(directory)
    fontconfig = temporary / "fonts.conf"
    fontconfig.write_text(f'<fontconfig><dir>{escape(str(assets / "fonts"))}</dir>'
                          f'<cachedir>{escape(directory)}/cache</cachedir></fontconfig>')
    preview = temporary / "social.svg"
    preview.write_text(svg(1200, 630,
        '<rect width="1200" height="630" fill="#0A1628"/>'
        f'<g transform="translate(128 204) scale(.84)">{mark}</g>'
        '<text x="520" y="348" font-family="Inter CyberShu" font-weight="700" '
        'font-size="104" letter-spacing="-3" fill="#F7F4ED">Cyber'
        '<tspan fill="#FF6B35">Shu</tspan></text>'))
    subprocess.run(['rsvg-convert', str(preview), '-o', str(logos / 'social-card.png')],
                   check=True, env=dict(os.environ, FONTCONFIG_FILE=str(fontconfig)))
print("Generated identity assets from cs-monogram.svg")
