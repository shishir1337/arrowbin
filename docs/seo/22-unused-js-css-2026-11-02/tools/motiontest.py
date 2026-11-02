"""Behaviour checks for the motion layer (no-GSAP rewrites) on a running build.

python -I motiontest.py BASE
"""
import sys
import time

from playwright.sync_api import sync_playwright

BASE = sys.argv[1]
fails = []


def check(name, cond, info=""):
    print(("PASS " if cond else "FAIL ") + name + (f"  [{info}]" if info else ""))
    if not cond:
        fails.append(name)


def scripts(page):
    return page.evaluate("performance.getEntriesByType('resource').filter(e=>e.initiatorType==='script').map(e=>e.name.split('/').pop())")


def gsap_loaded(page):
    # GSAP is bundled as an ES module (no window.gsap), so look for its core
    # chunk among the scripts the page has loaded.
    return page.evaluate("""(async () => {
      const urls = performance.getEntriesByType('resource').filter(e=>e.name.includes('/_next/static/chunks/')&&e.name.endsWith('.js')).map(e=>e.name);
      for (const u of urls) { const t = await (await fetch(u)).text(); if (t.includes('GreenSock') || t.includes('gsap')) { if (/ScrollTrigger|_gsap|GSAP/.test(t) && t.includes('getProperty')) return true; } }
      return false; })()""")


with sync_playwright() as p:
    b = p.chromium.launch()

    # ── mobile: inner pages load no GSAP; reveals, rails, wordmark work ──
    m = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    for path in ["/privacy", "/about", "/blog", "/contact", "/services", "/services/custom-software-development", "/work", "/work/maneel-club", "/blog/php2shell-php-vulnerability-check-and-fix"]:
        pg = m.new_page()
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(BASE + path, wait_until="load")
        time.sleep(3)
        check(f"mobile {path}: no GSAP at load", not gsap_loaded(pg))
        check(f"mobile {path}: no page errors", not errs, "; ".join(errs)[:200])
        pg.close()

    pg = m.new_page()
    pg.goto(BASE + "/services/custom-software-development", wait_until="load")
    time.sleep(3)
    n_split = pg.evaluate("document.querySelectorAll('h2[data-split]').length")
    check("service page: below-fold headings split into words", n_split > 0, f"{n_split} headings")
    hidden = pg.evaluate("""(() => { const w = document.querySelector('h2[data-split] .wr-word'); return w ? getComputedStyle(w).transform : 'none-found'; })()""")
    check("service page: words wait below their clip line", hidden not in ("none", "none-found"), hidden)
    rv_paused = pg.evaluate("""(() => { const a=[...document.querySelectorAll('[data-rv]')].flatMap(e=>e.getAnimations()); return [a.length, a.filter(x=>x.playState==='paused').length]; })()""")
    print("   data-rv animations before scroll (total, paused):", rv_paused)
    rail0 = pg.evaluate("(() => { const r=document.querySelector('[data-rail]'); return r ? getComputedStyle(r).getPropertyValue('--p') : 'none'; })()")
    # scroll through the page in steps
    h = pg.evaluate("document.documentElement.scrollHeight")
    rails_seen = set()
    for y in range(0, h, 300):
        pg.evaluate(f"window.scrollTo(0,{y})")
        time.sleep(0.12)
        v = pg.evaluate("(() => { const r=document.querySelector('[data-rail]'); return r ? r.style.getPropertyValue('--p') : ''; })()")
        if v:
            rails_seen.add(round(float(v), 1))
    time.sleep(2.5)
    shown = pg.evaluate("""(() => { const ws=[...document.querySelectorAll('h2[data-split] .wr-word')]; return [ws.length, ws.filter(w=>getComputedStyle(w).transform==='none'||getComputedStyle(w).transform==='matrix(1, 0, 0, 1, 0, 0)').length]; })()""")
    check("service page: every split word has risen after scrolling", shown[0] > 0 and shown[0] == shown[1], f"{shown[1]}/{shown[0]}")
    check("service page: rail --p moved through values", len(rails_seen) >= 3, f"initial {rail0!r}, seen {sorted(rails_seen)}")
    rv_after = pg.evaluate("""(() => { const els=[...document.querySelectorAll('[data-rv]')]; const op=els.filter(e=>getComputedStyle(e).opacity!=='1').length; const anims=els.flatMap(e=>e.getAnimations()).filter(a=>a.playState!=='finished'&&a.effect&&a.effect.getKeyframes().some(k=>k.opacity==='0'||k.opacity===0)).length; return [els.length, op, anims]; })()""")
    check("service page: every data-rv item visible after scrolling", rv_after[1] == 0 and rv_after[2] == 0, f"items {rv_after[0]}, not opaque {rv_after[1]}, unfinished {rv_after[2]}")
    wm = pg.evaluate("[...document.querySelectorAll('.fw-l')].map(l=>[l.style.fontVariationSettings,l.style.transform])")
    check("footer wordmark at bottom: full width, no offset", all('104' in a for a, _ in wm) and all(not t for _, t in wm), str(wm[:3]))
    # mid-way: scroll so the wordmark is half in view
    pg.evaluate("(() => { const el=document.querySelector('.fw-l').closest('[aria-hidden]'); const r=el.getBoundingClientRect(); window.scrollTo(0, window.scrollY + r.top - innerHeight + r.height*0.3); })()")
    time.sleep(1.5)
    wm2 = pg.evaluate("[...document.querySelectorAll('.fw-l')].map(l=>l.style.fontVariationSettings)")
    check("footer wordmark part-way: letters condensed in stagger", any('104' not in a for a in wm2), str(wm2))
    pg.close()

    pg = m.new_page()
    pg.goto(BASE + "/services", wait_until="load")
    time.sleep(3)
    before = pg.evaluate("[...document.querySelectorAll('.svi-row')].map(r=>getComputedStyle(r).opacity)")
    for y in range(0, pg.evaluate("document.documentElement.scrollHeight"), 350):
        pg.evaluate(f"window.scrollTo(0,{y})")
        time.sleep(0.1)
    time.sleep(1.5)
    after = pg.evaluate("[...document.querySelectorAll('.svi-row')].map(r=>getComputedStyle(r).opacity)")
    check("/services: index rows all visible after scrolling", after and all(o == "1" for o in after), f"before {before[:4]} after {after}")
    pg.close()

    # anchor jump past a heading: it must still end up visible
    pg = m.new_page()
    pg.goto(BASE + "/services/ai-automation", wait_until="load")
    time.sleep(3)
    pg.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
    time.sleep(0.5)
    pg.evaluate("window.scrollTo(0, 0)")
    time.sleep(2.5)
    shown = pg.evaluate("""(() => { const ws=[...document.querySelectorAll('h2[data-split] .wr-word')]; return [ws.length, ws.filter(w=>{const t=getComputedStyle(w).transform; return t==='none'||t==='matrix(1, 0, 0, 1, 0, 0)'}).length]; })()""")
    check("jump to bottom and back: all headings revealed", shown[0] == shown[1], f"{shown[1]}/{shown[0]}")
    rv = pg.evaluate("[...document.querySelectorAll('[data-rv]')].filter(e=>getComputedStyle(e).opacity!=='1').length")
    check("jump to bottom and back: all data-rv visible", rv == 0, f"{rv} hidden")
    pg.close()

    # home on mobile: GSAP yes (home motion), Draggable only near testimonials
    pg = m.new_page()
    pg.goto(BASE + "/", wait_until="load")
    time.sleep(4)
    src_before = pg.evaluate("""(async()=>{for(const e of performance.getEntriesByType('resource')){if(!e.name.endsWith('.js'))continue;const t=await (await fetch(e.name)).text();if(t.includes('Draggable')&&t.includes('dragClickables'))return true}return false})()""")
    check("home: Draggable not loaded during page load", not src_before)
    pg.evaluate("document.querySelector('figure').scrollIntoView({block:'center'})")
    time.sleep(3)
    src_after = pg.evaluate("""(async()=>{for(const e of performance.getEntriesByType('resource')){if(!e.name.endsWith('.js'))continue;const t=await (await fetch(e.name)).text();if(t.includes('Draggable')&&t.includes('dragClickables'))return true}return false})()""")
    check("home: Draggable loaded once testimonials are near", src_after)
    pg.close()
    m.close()

    # ── desktop: cursor, magnetic, lenis ──
    d = b.new_context(viewport={"width": 1440, "height": 900})
    pg = d.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/about", wait_until="load")
    time.sleep(3)
    check("desktop /about: no GSAP before any input", not gsap_loaded(pg))
    lenis = pg.evaluate("!!window.__lenis")
    check("desktop /about: Lenis running without GSAP", lenis)
    pg.mouse.move(200, 200)
    pg.mouse.move(400, 300, steps=8)
    time.sleep(0.6)
    cur = pg.evaluate("[document.documentElement.classList.contains('has-cursor'), document.querySelector('.cursor-ring')?.style.transform, document.querySelector('.cursor-dot')?.style.transform]")
    check("desktop: custom cursor follows the pointer", cur[0] and "400" in (cur[2] or "") and "300" in (cur[2] or ""), str(cur))
    time.sleep(2.5)
    check("desktop: GSAP loads after the first pointer move (magnetic)", gsap_loaded(pg))
    # hover the CTA magnetic button
    mag = pg.evaluate("(() => { const m=[...document.querySelectorAll('div.inline-block')].find(d=>d.querySelector('a')); if(!m) return null; m.scrollIntoView({block:'center'}); const r=m.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2]; })()")
    if mag:
        time.sleep(1.0)
        mag = pg.evaluate("(() => { const m=[...document.querySelectorAll('div.inline-block')].find(d=>d.querySelector('a')); const r=m.getBoundingClientRect(); return [r.left+r.width/2, r.top+r.height/2]; })()")
        pg.mouse.move(mag[0] + 5, mag[1] + 3, steps=4)
        pg.mouse.move(mag[0] + 25, mag[1] + 10, steps=6)
        time.sleep(0.5)
        tf = pg.evaluate("(() => { const m=[...document.querySelectorAll('div.inline-block')].find(d=>d.querySelector('a')); return m.style.transform; })()")
        check("desktop: magnetic button follows the pointer", bool(tf) and tf not in ("translate(0px, 0px)", "none"), tf)
    pg.mouse.move(1500, 450)  # leave window area
    check("desktop /about: no page errors", not errs, "; ".join(errs)[:200])
    # wheel scroll with Lenis then GSAP hand-over
    y0 = pg.evaluate("scrollY")
    pg.mouse.move(700, 400)
    pg.mouse.wheel(0, 800)
    time.sleep(1.2)
    y1 = pg.evaluate("scrollY")
    check("desktop: wheel scroll moves the page (Lenis on GSAP ticker)", y1 > y0 + 300, f"{y0} -> {y1}")
    pg.close()

    pg = d.new_page()
    errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto(BASE + "/", wait_until="load")
    time.sleep(3)
    pg.mouse.move(600, 400)
    pg.mouse.wheel(0, 2500)
    time.sleep(2)
    y = pg.evaluate("scrollY")
    check("desktop home: smooth scroll works", y > 1500, str(y))
    check("desktop home: no page errors", not errs, "; ".join(errs)[:200])
    # client-side navigation then back
    pg.evaluate("window.scrollTo(0,0)")
    time.sleep(0.5)
    pg.click("header a[href='/about']")
    pg.wait_for_url("**/about")
    time.sleep(2)
    pg.mouse.wheel(0, 1500)
    time.sleep(1.5)
    check("desktop: after client navigation, wheel scroll works", pg.evaluate("scrollY") > 600, str(pg.evaluate("scrollY")))
    check("desktop nav: no page errors", not errs, "; ".join(errs)[:200])
    pg.close()
    b.close()

print("\nFAILED:" if fails else "\nALL PASSED", fails)
