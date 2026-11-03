"""Hover a bento tile and report its transform and console warnings.
python -I tiltprobe.py BASE"""
import sys
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    warns = []
    pg.on("console", lambda m: warns.append(m.type + ": " + m.text) if m.type in ("warning", "error") else None)
    pg.goto(sys.argv[1] + "/", wait_until="load")
    pg.mouse.move(700, 400); pg.wait_for_timeout(500)
    t = pg.locator(".bento-tile").first
    t.scroll_into_view_if_needed(); pg.wait_for_timeout(3000)
    box = t.bounding_box()
    for i in range(8):
        pg.mouse.move(box["x"] + box["width"] * (0.1 + i * 0.1), box["y"] + box["height"] * 0.15, steps=3)
        pg.wait_for_timeout(60)
    pg.wait_for_timeout(700)
    print("hovering:", t.evaluate("e => getComputedStyle(e).transform"), "| inline:", t.evaluate("e => e.style.transform"))
    pg.mouse.move(5, 5, steps=3); pg.wait_for_timeout(900)
    print("after leave:", t.evaluate("e => getComputedStyle(e).transform"))
    print("parent perspective:", t.evaluate("e => getComputedStyle(e.parentElement).perspective"))
    print(len(warns), "warnings;", sorted(set(warns))[:5])
    b.close()
