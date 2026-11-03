"""Does content stay put when the visitor's first action is a jump?

python -I jumpprobe.py BASE...

Opens the home page, jumps straight to the testimonials deck with a script
(no touch, wheel or key, like the browser's find bar), then checks the deck's
position on screen right away and 4 s later, when the scroll motion has set
up. The deck's top should not change.
"""
import sys
import time

from playwright.sync_api import sync_playwright

Q = "[Math.round(document.querySelector('figure').getBoundingClientRect().top), scrollY, document.documentElement.scrollHeight]"

with sync_playwright() as p:
    b = p.chromium.launch()
    for base in sys.argv[1:]:
        for label, opts in (
            ("desktop", dict(viewport={"width": 1440, "height": 900})),
            ("phone", dict(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)),
        ):
            ctx = b.new_context(**opts)
            pg = ctx.new_page()
            pg.goto(base + "/", wait_until="load")
            time.sleep(2)
            pg.evaluate("document.querySelector('figure').scrollIntoView({block:'center'})")
            t0 = pg.evaluate(Q)
            time.sleep(4)
            t1 = pg.evaluate(Q)
            print(base, label, "deck top / scrollY / page height after the jump", t0, "-> 4 s later", t1)
            ctx.close()
    b.close()
