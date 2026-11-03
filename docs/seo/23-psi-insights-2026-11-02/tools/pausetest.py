"""Restyles per 3 s with chosen animations paused. python -I pausetest.py BASE path label 'css selector'..."""
import sys
import time

from playwright.sync_api import sync_playwright

BASE, PATH, LABEL = sys.argv[1], sys.argv[2], sys.argv[3]
SELS = sys.argv[4:]


def window(cdp, secs=3):
    m0 = {x["name"]: x["value"] for x in cdp.send("Performance.getMetrics")["metrics"]}
    time.sleep(secs)
    m1 = {x["name"]: x["value"] for x in cdp.send("Performance.getMetrics")["metrics"]}
    return {k: round(m1[k] - m0[k], 3) for k in ("RecalcStyleCount", "LayoutCount", "TaskDuration")}


opts = dict(viewport={"width": 412, "height": 823}, is_mobile=True, has_touch=True) if LABEL == "phone" else dict(viewport={"width": 1350, "height": 940})
with sync_playwright() as p:
    b = p.chromium.launch(args=["--disable-gpu"])
    for sel in ["(none)"] + SELS:
        ctx = b.new_context(**opts)
        pg = ctx.new_page()
        cdp = ctx.new_cdp_session(pg)
        cdp.send("Performance.enable")
        pg.goto(BASE + PATH, wait_until="load")
        time.sleep(3)
        if sel != "(none)":
            pg.add_style_tag(content=sel + "{animation-play-state:paused!important}")
        time.sleep(0.5)
        vis = pg.evaluate("""(s) => s === '(none)' ? '' : [...document.querySelectorAll(s)].map(e => { const r = e.getBoundingClientRect(); return Math.round(r.top) + '/' + Math.round(r.width) + 'x' + Math.round(r.height); }).join(' ')""", sel)
        print(LABEL, PATH, sel, window(cdp), vis[:120])
        ctx.close()
    b.close()
