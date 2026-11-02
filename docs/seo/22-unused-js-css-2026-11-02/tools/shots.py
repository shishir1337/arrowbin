"""Full-page screenshots after scrolling through each page (so reveals finish).

python -I shots.py --base URL --out DIR [--desktop] path...
Also records console errors and failed requests per page into DIR/log.txt.
"""
import argparse
import os
import time

from playwright.sync_api import sync_playwright

FREEZE = """
*,*::before,*::after{animation-play-state:paused!important;caret-color:transparent!important}
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--desktop", action="store_true")
    ap.add_argument("paths", nargs="+")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    log = open(os.path.join(a.out, "log.txt"), "a", encoding="utf8")
    with sync_playwright() as p:
        b = p.chromium.launch()
        if a.desktop:
            ctx = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="no-preference")
        else:
            ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1,
                                is_mobile=True, has_touch=True)
        for path in a.paths:
            page = ctx.new_page()
            errs = []
            page.on("console", lambda m: errs.append(f"console.{m.type}: {m.text}") if m.type in ("error", "warning") else None)
            page.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
            page.on("requestfailed", lambda r: errs.append(f"failed: {r.url} {r.failure}"))
            page.goto(a.base + path, wait_until="load")
            time.sleep(1.5)
            h = page.evaluate("document.documentElement.scrollHeight")
            y = 0
            while y < h:
                y += 500
                page.mouse.wheel(0, 500) if a.desktop else page.evaluate(f"window.scrollTo(0,{y})")
                time.sleep(0.25)
                h = page.evaluate("document.documentElement.scrollHeight")
            time.sleep(2.5)
            page.evaluate("window.__lenis ? window.__lenis.scrollTo(0,{immediate:true}) : window.scrollTo(0,0)")
            time.sleep(1.0)
            page.add_style_tag(content=FREEZE)
            name = path.strip("/").replace("/", "_") or "home"
            page.screenshot(path=os.path.join(a.out, f"{name}.png"), full_page=True)
            log.write(f"== {path}\n" + "".join(f"   {e}\n" for e in errs))
            page.close()
        b.close()
    log.close()


if __name__ == "__main__":
    main()
