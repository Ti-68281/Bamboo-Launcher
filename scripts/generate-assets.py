from PIL import Image, ImageDraw
from pathlib import Path
import math

root = Path(__file__).resolve().parent.parent
assets = root / "src" / "renderer" / "src" / "assets"
build = root / "build"
resources = root / "resources"
for d in (assets, build, resources):
    d.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------- skin
skin = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
d = ImageDraw.Draw(skin)

SKIN = (231, 198, 160, 255)
SKIN_SHADOW = (205, 166, 128, 255)
HAIR = (45, 67, 48, 255)
HAIR_LIGHT = (77, 107, 70, 255)
GREEN = (74, 122, 83, 255)
GREEN_DARK = (39, 72, 52, 255)
GREEN_LIGHT = (140, 185, 121, 255)
CREAM = (222, 210, 172, 255)
PANTS = (48, 57, 47, 255)
BOOT = (33, 42, 35, 255)
EYE = (31, 39, 31, 255)
BLUSH = (214, 154, 127, 255)


def rect(box, color):
    d.rectangle(box, fill=color)


def mirrored_front(x, y, w, h, fill, flip=False):
    """helper for symmetrical texture regions (not actually mirrored in UV)"""
    d.rectangle([x, y, x + w - 1, y + h - 1], fill=fill)


# head: all sides base skin
rect((0, 0, 31, 15), SKIN)
# hair on top/sides/back
rect((8, 0, 15, 7), HAIR)          # top
rect((16, 8, 23, 15), HAIR)        # right side
rect((24, 8, 31, 15), HAIR)        # back
rect((0, 8, 7, 15), HAIR)          # left side
# face
rect((8, 8, 15, 15), SKIN)
rect((8, 8, 15, 10), HAIR)         # fringe
rect((8, 10, 9, 11), HAIR_LIGHT)
rect((14, 10, 15, 11), HAIR_LIGHT)
# eyes
rect((10, 11, 10, 12), EYE)
rect((13, 11, 13, 12), EYE)
# nose / mouth
rect((11, 13, 12, 13), SKIN_SHADOW)
rect((11, 14, 12, 14), BLUSH)
# headband
rect((8, 10, 15, 10), GREEN)
rect((8, 10, 8, 15), GREEN_DARK)
rect((15, 10, 15, 15), GREEN_DARK)
# hat overlay front (32,0)+(8,8)
rect((40, 8, 47, 9), GREEN_LIGHT)
rect((40, 10, 40, 15), GREEN_DARK)
rect((47, 10, 47, 15), GREEN_DARK)
rect((43, 8, 44, 9), CREAM)
# small bamboo leaf on head band
rect((42, 9, 43, 9), GREEN_LIGHT)

# body: all sides green jacket
rect((16, 16, 39, 39), GREEN)
# body front 8x12 at 20,20
rect((20, 20, 27, 31), GREEN)
rect((22, 20, 25, 20), GREEN_LIGHT)
# jacket opening
rect((23, 21, 24, 29), CREAM)
rect((23, 21, 23, 30), GREEN_DARK)
rect((24, 21, 24, 30), GREEN_DARK)
# bamboo motif
rect((21, 23, 21, 28), GREEN_LIGHT)
rect((26, 24, 26, 29), GREEN_LIGHT)
# belt
rect((20, 29, 27, 30), CREAM)
rect((23, 29, 24, 30), (175, 133, 76, 255))
# body overlay jacket layer
rect((20, 36, 27, 47), GREEN_DARK)
rect((20, 36, 20, 47), GREEN_LIGHT)
rect((27, 36, 27, 47), GREEN_LIGHT)
rect((23, 36, 24, 47), CREAM)
# side/back details
rect((16, 20, 19, 31), GREEN_DARK)
rect((28, 20, 31, 31), GREEN_DARK)
rect((32, 20, 39, 31), GREEN_DARK)

# right arm base 40,16 16x16, front at 44,20 4x12
rect((40, 16, 55, 31), GREEN)
rect((44, 20, 47, 27), GREEN)
rect((44, 28, 47, 31), SKIN)
rect((44, 27, 47, 27), GREEN_DARK)
rect((44, 20, 47, 20), GREEN_LIGHT)
# right arm overlay
rect((44, 36, 47, 43), GREEN)
rect((44, 36, 47, 36), GREEN_LIGHT)
rect((44, 43, 47, 47), (0, 0, 0, 0))
# left arm base 32,48 16x16 front 36,52
rect((32, 48, 47, 63), GREEN)
rect((36, 52, 39, 59), GREEN)
rect((36, 60, 39, 63), SKIN)
rect((36, 59, 39, 59), GREEN_DARK)
rect((36, 52, 39, 52), GREEN_LIGHT)
# left arm overlay 48,48 front 52,52
rect((52, 52, 55, 59), GREEN)
rect((52, 52, 55, 52), GREEN_LIGHT)
rect((52, 59, 55, 63), (0, 0, 0, 0))

# right leg base 0,16, front 4,20
rect((0, 16, 15, 31), PANTS)
rect((4, 20, 7, 31), PANTS)
rect((4, 29, 7, 31), BOOT)
rect((4, 20, 7, 20), GREEN_DARK)
# right leg overlay 0,32
rect((4, 36, 7, 43), PANTS)
# left leg base 16,48 front 20,52
rect((16, 48, 31, 63), PANTS)
rect((20, 52, 23, 63), PANTS)
rect((20, 61, 23, 63), BOOT)
rect((20, 52, 23, 52), GREEN_DARK)
# left leg overlay 0,48 front 4,52
rect((4, 52, 7, 59), PANTS)

# outline the silhouette subtly by shading side pixels
for x0, y0, x1, y1 in [(8, 8, 15, 15), (20, 20, 27, 31), (44, 20, 47, 31), (36, 52, 39, 63), (4, 20, 7, 31), (20, 52, 23, 63)]:
    d.line([(x0, y1), (x1, y1)], fill=(0, 0, 0, 40))
    d.line([(x1, y0), (x1, y1)], fill=(0, 0, 0, 30))

skin.save(assets / "sample-skin.png")

# ---------------------------------------------------------------- icon
S = 1024
icon = Image.new("RGBA", (S * 2, S * 2), (0, 0, 0, 0))
d = ImageDraw.Draw(icon)
# rounded dark green square
margin = 40
d.rounded_rectangle([margin, margin, S * 2 - margin, S * 2 - margin], radius=390, fill=(10, 26, 17, 255))
# subtle inner border
d.rounded_rectangle([margin + 18, margin + 18, S * 2 - margin - 18, S * 2 - margin - 18], radius=374, outline=(143, 191, 133, 70), width=8)

def bamboo_stalk(cx, top, bottom, width, color, alpha=255):
    fill = (color[0], color[1], color[2], alpha)
    d.rounded_rectangle([cx - width // 2, top, cx + width // 2, bottom], radius=width // 2, fill=fill)
    # nodes
    node_gap = 260
    y = top + 150
    while y < bottom:
        d.rounded_rectangle([cx - width // 2 - 6, y, cx + width // 2 + 6, y + 16], radius=8, fill=(229, 242, 202, max(40, alpha - 60)))
        y += node_gap

bamboo_stalk(1160, 60, 1900, 74, (143, 198, 133), 235)
bamboo_stalk(1370, 420, 1900, 48, (111, 170, 113), 175)
bamboo_stalk(930, 760, 1900, 38, (88, 145, 96), 130)

# leaves as tapered bezier-like polygons
def leaf(points, color):
    d.polygon(points, fill=color)

leaf([(1170, 620), (1430, 500), (1560, 550), (1320, 690)], (202, 229, 158, 220))
leaf([(1050, 860), (760, 720), (690, 770), (960, 930)], (167, 210, 142, 170))
leaf([(1380, 1080), (1660, 980), (1720, 1030), (1450, 1160)], (183, 218, 150, 160))
leaf([(1100, 1300), (870, 1180), (800, 1230), (1030, 1370)], (143, 191, 133, 140))
leaf([(1180, 350), (1420, 260), (1480, 300), (1250, 420)], (213, 237, 174, 190))

# small floating leaf flecks
for i, (x, y, r) in enumerate([(620, 620, 17), (1510, 750, 13), (760, 1180, 12), (1450, 1450, 10)]):
    d.ellipse([x - r, y - r, x + r, y + r], fill=(210, 235, 171, 90))

icon = icon.resize((S, S), Image.Resampling.LANCZOS)
icon.save(build / "icon.png")
icon.save(resources / "icon.png")
icon.save(assets / "app-icon.png")
sizes = [(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
icon.save(build / "icon.ico", sizes=sizes)
print("assets generated")
