"""Does a #link on the home page stay on its section?

python -I hashprobe.py SECTION_ID BASE...   (e.g. work http://localhost:3100)

Opens /#SECTION_ID and prints the section's top on screen at load, 0.4 s and
4 s later. It should stay where the browser put it.
"""
import sys
import time

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    for base in sys.argv[2:]:
        ctx = b.new_context(viewport={"width": 1440, "height": 900})
        pg = ctx.new_page()
        pg.goto(base + "/#" + sys.argv[1], wait_until="load")
        q = "[Math.round(document.getElementById('%s').getBoundingClientRect().top), scrollY]" % sys.argv[1]
        a = pg.evaluate(q)
        time.sleep(0.4)
        b1 = pg.evaluate(q)
        time.sleep(4)
        c = pg.evaluate(q)
        print(base, "#" + sys.argv[1], "top / scrollY at load", a, "0.4 s", b1, "4 s", c)
        ctx.close()
    b.close()
