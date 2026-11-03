"""After load, what keeps the main thread busy? python -I survey.py BASE path...

For each page (phone 412x823 touch, desktop 1350x940): waits for load + 3 s,
then measures a 3 s idle window with CDP Performance metrics (style recalcs,
layouts, task time) and lists running animations that Chrome cannot run on the
compositor (targets inside an <svg>, or non transform/opacity properties), and
whether their target is on screen.
"""
import sys
import time

from playwright.sync_api import sync_playwright

BASE = sys.argv[1]
PATHS = sys.argv[2:]

JS = """() => {
  const vh = innerHeight, out = [];
  for (const a of document.getAnimations()) {
    if (a.playState !== 'running') continue;
    const t = a.effect && a.effect.target; if (!t) continue;
    const kf = a.effect.getKeyframes ? a.effect.getKeyframes() : [];
    const props = new Set(); kf.forEach(k => Object.keys(k).forEach(p => { if (!['offset','easing','composite','computedOffset'].includes(p)) props.add(p); }));
    const svgChild = (t instanceof SVGElement) && !(t instanceof SVGSVGElement);
    const onlyComp = [...props].every(p => ['transform','opacity','translate','rotate','scale'].includes(p));
    const r = t.getBoundingClientRect();
    const inView = r.bottom > 0 && r.top < vh && r.width > 0;
    const it = a.effect.getComputedTiming().iterations;
    out.push({name: a.animationName || a.id || '(waapi)', tag: t.tagName, cls: String(t.getAttribute('class')||'').slice(0,40),
      props: [...props].join(','), mainThread: svgChild || !onlyComp, inView, infinite: it === Infinity});
  }
  return out;
}"""


def metrics(cdp):
    m = {x["name"]: x["value"] for x in cdp.send("Performance.getMetrics")["metrics"]}
    return m


with sync_playwright() as p:
    b = p.chromium.launch(args=["--disable-gpu"])
    for label, opts in (("phone", dict(viewport={"width": 412, "height": 823}, is_mobile=True, has_touch=True, device_scale_factor=1.75)),
                        ("desktop", dict(viewport={"width": 1350, "height": 940}))):
        ctx = b.new_context(**opts)
        for path in PATHS:
            pg = ctx.new_page()
            cdp = ctx.new_cdp_session(pg)
            cdp.send("Performance.enable")
            pg.goto(BASE + path, wait_until="load")
            time.sleep(3)
            m0 = metrics(cdp)
            time.sleep(3)
            m1 = metrics(cdp)
            d = {k: m1[k] - m0[k] for k in ("RecalcStyleCount", "LayoutCount", "TaskDuration", "ScriptDuration")}
            anims = pg.evaluate(JS)
            main = [a for a in anims if a["mainThread"] and a["infinite"]]
            print(f"{label:7} {path:45} idle 3s: styles={d['RecalcStyleCount']:.0f} layouts={d['LayoutCount']:.0f} task={d['TaskDuration']*1000:.0f}ms script={d['ScriptDuration']*1000:.0f}ms | running={len(anims)} main-thread-infinite={len(main)}")
            seen = {}
            for a in main:
                k = (a["name"], a["tag"], a["cls"], a["props"], a["inView"])
                seen[k] = seen.get(k, 0) + 1
            for k, v in seen.items():
                print(f"          {v}x {k[0]} <{k[1]} class='{k[2]}'> props={k[3]} inView={k[4]}")
            pg.close()
        ctx.close()
    b.close()
