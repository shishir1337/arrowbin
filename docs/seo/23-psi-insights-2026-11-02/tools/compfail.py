"""Which running animations did Chrome fail to put on the compositor, and why?
python -I compfail.py BASE path phone|desktop"""
import json
import sys
import time

from playwright.sync_api import sync_playwright

BASE, PATH, LABEL = sys.argv[1], sys.argv[2], sys.argv[3]
# Bits from Chromium's CompositorAnimations::FailureReason.
REASONS = {
    1 << 0: "accelerated animations disabled", 1 << 1: "suppressed by devtools",
    1 << 2: "invalid animation or effect", 1 << 3: "unsupported timing",
    1 << 4: "non-replace composite", 1 << 5: "target has invalid compositing state",
    1 << 6: "target has incompatible animations", 1 << 7: "target has CSS offset",
    1 << 8: "(256)", 1 << 9: "affects non-CSS properties",
    1 << 10: "transform property cannot be accelerated on target",
    1 << 11: "(2048)", 1 << 12: "filter may move pixels", 1 << 13: "unsupported CSS property",
    1 << 14: "(16384)", 1 << 15: "mixed keyframe value types", 1 << 16: "timeline source invalid",
    1 << 17: "no visible change", 1 << 18: "(262144)", 1 << 19: "(524288)",
}

opts = dict(viewport={"width": 412, "height": 823}, is_mobile=True, has_touch=True) if LABEL == "phone" else dict(viewport={"width": 1350, "height": 940})
with sync_playwright() as p:
    b = p.chromium.launch(args=["--disable-gpu"])
    ctx = b.new_context(**opts)
    pg = ctx.new_page()
    cdp = ctx.new_cdp_session(pg)
    chunks = []
    cdp.on("Tracing.dataCollected", lambda e: chunks.extend(e["value"]))
    done = []
    cdp.on("Tracing.tracingComplete", lambda e: done.append(1))
    cdp.send("Tracing.start", {"traceConfig": {"includedCategories": ["blink.animations", "devtools.timeline", "disabled-by-default-devtools.timeline"]}})
    pg.goto(BASE + PATH, wait_until="load")
    pg.wait_for_timeout(3000)
    cdp.send("Tracing.end")
    while not done:
        pg.wait_for_timeout(100)
    seen = {}
    for e in chunks:
        if e.get("name") != "Animation":
            continue
        d = (e.get("args") or {}).get("data") or {}
        if "compositeFailed" in d:
            key = (d.get("compositeFailed"), tuple(d.get("unsupportedProperties") or []), e.get("id2", {}).get("local") or e.get("id"))
            seen[key] = seen.get(key, 0) + 1
    names = {}
    for e in chunks:
        if e.get("name") == "Animation" and e.get("ph") == "b":
            d = (e.get("args") or {}).get("data") or {}
            names[e.get("id2", {}).get("local") or e.get("id")] = f"{d.get('displayName') or d.get('name')} <{d.get('nodeName')}>"
    rows = {}
    for (code, props, aid), n in seen.items():
        why = ", ".join(v for k, v in REASONS.items() if code & k) or str(code)
        rows.setdefault((names.get(aid, aid), why, props), 0)
        rows[(names.get(aid, aid), why, props)] += 1
    for (name, why, props), n in sorted(rows.items(), key=lambda r: str(r)):
        print(f"{LABEL} {PATH}: {name} -> {why} {list(props) or ''}")
    b.close()
