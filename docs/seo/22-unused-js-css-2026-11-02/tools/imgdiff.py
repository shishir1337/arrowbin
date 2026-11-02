"""Compare before/after screenshots: size, share of changed pixels, changed bands.

python -I imgdiff.py BEFORE_DIR AFTER_DIR OUT_DIR
Writes side-by-side crops of changed regions to OUT_DIR for review.
"""
import os
import sys

from PIL import Image, ImageChops

bd, ad, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
for name in sorted(os.listdir(bd)):
    if not name.endswith(".png"):
        continue
    a = Image.open(os.path.join(bd, name)).convert("RGB")
    b = Image.open(os.path.join(ad, name)).convert("RGB")
    note = ""
    if a.size != b.size:
        note = f" SIZE {a.size} -> {b.size}"
    w, h = min(a.width, b.width), min(a.height, b.height)
    a2, b2 = a.crop((0, 0, w, h)), b.crop((0, 0, w, h))
    diff = ImageChops.difference(a2, b2).convert("L").point(lambda v: 255 if v > 40 else 0)
    bbox = diff.getbbox()
    changed = sum(diff.histogram()[255:]) / (w * h) * 100
    # changed horizontal bands (rows with any change), merged
    bands = []
    if bbox:
        px = diff.load()
        rows = [y for y in range(0, h, 4) if any(px[x, y] for x in range(0, w, 3))]
        start = prev = None
        for y in rows:
            if start is None:
                start = prev = y
            elif y - prev > 40:
                bands.append((start, prev))
                start = prev = y
            else:
                prev = y
        if start is not None:
            bands.append((start, prev))
    print(f"{name:55s} changed {changed:5.2f}%{note}  bands {[(s, e) for s, e in bands][:8]}")
    for i, (s, e) in enumerate(bands[:6]):
        top, bot = max(0, s - 60), min(h, e + 60)
        pair = Image.new("RGB", (w * 2 + 10, bot - top), "red")
        pair.paste(a2.crop((0, top, w, bot)), (0, 0))
        pair.paste(b2.crop((0, top, w, bot)), (w + 10, 0))
        if pair.height > 1600:
            pair = pair.crop((0, 0, pair.width, 1600))
        pair.save(os.path.join(out, f"{name[:-4]}--{i}.png"))
