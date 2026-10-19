"""Render week 1's new images: posts 13 and 14 (Facebook 1080x1080, Instagram 1080x1350) and stories 1-5 (1080x1920).

usage: python -I week-01-images.py OUTDIR
Writes OUTDIR/facebook/, OUTDIR/instagram/ and OUTDIR/stories/. Fails if any text overflows its box or the canvas.
Every fact comes from the Arrowbin article the post links to.
"""
import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1])
HERE = Path(__file__).resolve().parent
FONTS = (HERE / "fonts").as_uri()
MARK = "M50 6 94 90 50 70 6 90Z M50 36 60.5 57H39.5Z"
INK, INK2, ULTRA, PLASMA, SUN, FROST, LILAC = "#0E0B24", "#4A4766", "#3B2BFF", "#FF4DA6", "#FFD23F", "#F1F2F7", "#CFC4FF"

# Canvas: (height, padding, headline scale, .main zoom). Stories keep the top 250px and bottom 250px clear for the app's UI.
SIZES = {"square": (1080, "76px 80px 64px", 1.0, 1.0), "portrait": (1350, "118px 80px 96px", 1.1, 1.08),
         "story": (1920, "270px 80px 270px", 1.2, 1.25)}


def mark(fill, bit, px):
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 100 100" style="display:block;flex:none">'
            f'<path fill="{fill}" fill-rule="evenodd" d="{MARK}"/>'
            f'<rect x="43.5" y="77" width="13" height="13" rx="1.5" fill="{bit}"/></svg>')


def frame(body, label, size, *, bg=FROST, fg=INK, muted=INK2, accent=ULTRA, mark_fill=ULTRA, url="arrowbin.com"):
    height, pad, _, zoom = SIZES[size]
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
    @font-face{{font-family:Anybody;src:url({FONTS}/anybody.woff2) format("woff2");font-weight:100 900;font-stretch:50% 150%}}
    @font-face{{font-family:Geist;src:url({FONTS}/geist.woff2) format("woff2");font-weight:100 900}}
    @font-face{{font-family:GeistMono;src:url({FONTS}/geist-mono.woff2) format("woff2");font-weight:100 900}}
    *{{box-sizing:border-box}} html,body{{margin:0}}
    body{{width:1080px;height:{height}px;overflow:hidden;background:{bg};color:{fg};font-family:Geist;
      display:flex;flex-direction:column;padding:{pad}}}
    .label{{font-family:GeistMono;font-weight:500;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:{muted}}}
    .h{{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 112;letter-spacing:-.035em;line-height:.9;
      text-transform:uppercase;margin:26px 0 0}}
    .h em{{font-style:normal;color:{accent}}}
    .main{{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0;zoom:{zoom}}}
    .foot{{display:flex;align-items:center;justify-content:space-between;padding-top:28px}}
    .wm{{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 118;font-size:34px;letter-spacing:-.02em}}
    .url{{font-family:GeistMono;font-weight:600;font-size:22px;letter-spacing:.04em;color:{muted}}}
    .src{{font-family:GeistMono;font-size:17px;letter-spacing:.04em;color:{muted};margin-top:22px;line-height:1.4}}
    .big{{font-family:Anybody;font-weight:800;font-variation-settings:'wdth' 110;letter-spacing:-.04em;line-height:1;white-space:nowrap}}
    .sign{{font-family:Geist;font-weight:800}}
    </style></head><body>
    <div class="label">{label}</div>
    {body}
    <div class="foot"><div style="display:flex;align-items:center;gap:14px">{mark(mark_fill, PLASMA, 44)}<span class="wm">Arrowbin</span></div>
      <span class="url">{url}</span></div>
    </body></html>"""


def head(text, px, size):
    return f'<h1 class="h fit" style="font-size:{round(px * SIZES[size][2])}px">{text}</h1>'


def value_bars(rows, hi_color=ULTRA, lo_color=PLASMA, split=4):
    top = max(v for _, v in rows)
    return "".join(f"""<div style="display:grid;grid-template-columns:250px 1fr;align-items:center;gap:20px;margin:0 0 18px">
          <span style="font-size:27px;font-weight:600">{label}</span>
          <div style="display:flex;align-items:center;gap:16px">
            <div style="height:38px;width:{max(v / top * 100 * 0.6, 2):.1f}%;border-radius:10px;background:{hi_color if i < split else lo_color}"></div>
            <span class="big" style="font-size:30px">${v:,}</span></div></div>""" for i, (label, v) in enumerate(rows))


def chip(text, bg):
    return f'<span style="background:{bg};border-radius:18px;padding:16px 22px;font-size:29px;font-weight:700">{text}</span>'


def formula():
    times = f'<span style="font-family:Geist;font-weight:800;font-size:40px;color:{ULTRA}">×</span>'
    return ('<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">'
            + times.join([chip("Build weeks", "#fff"), chip("Team size", LILAC), chip("Weekly rate", SUN)]) + "</div>")


PAY = [("United States", 155000), ("United Kingdom", 95299), ("Germany", 83340), ("Poland", 55040), ("India", 19761), ("Pakistan", 9937)]


def post13(size):
    return frame(
        head("What does one week of <em>MVP</em> cost?", 92, size)
        + f"""<div class="main">{formula()}
          <div class="big fit" style="font-size:150px;color:{ULTRA};margin-top:34px">$4,300</div>
          <p style="font-size:30px;font-weight:600;margin:12px 0 26px">per build week on our $60,000, 14-week SaaS MVP example</p>
          <div style="background:#fff;border-radius:22px;padding:22px 28px;font-size:27px;font-weight:600;line-height:1.3">
          Add a week of scope and you add about $4,300. Cut one and you save it.</div>
          <div class="src">Arrowbin estimates, 2026</div></div>""",
        "Guide / MVP budget", size)


def post14(size):
    return frame(
        head("What developers <em>earn</em>, by country", 92, size)
        + f"""<div class="main"><div class="label" style="margin-bottom:22px">Median yearly pay, USD</div>{value_bars(PAY)}
          <div class="src">Employed developers. Stack Overflow Developer Survey 2025 + 2026 (25,416 developers), Arrowbin analysis</div></div>""",
        "Data / Developer pay 2026", size)


S = "story"
STORIES = [
    ("story-01-mvp-cost-per-week", frame(
        head("What does one week of <em>MVP</em> cost?", 92, S)
        + f"""<div class="main"><div class="big fit" style="font-size:190px;color:{ULTRA}">$4,300</div>
          <p style="font-size:32px;font-weight:600;margin:14px 0 30px;line-height:1.3">per build week on our $60,000, 14-week SaaS MVP example</p>
          <div style="background:{SUN};border-radius:24px;padding:26px 30px;font-size:30px;font-weight:700;line-height:1.3">
          Count the weeks before you compare hourly rates.</div>
          <div class="src">Arrowbin estimates, 2026. Full guide: arrowbin.com/blog</div></div>""",
        "Quick maths / MVP budget", S)),
    ("story-02-mvp-timeline", frame(
        head("How long does a standard <em>MVP</em> take?", 92, S)
        + f"""<div class="main"><div class="label">Our estimate</div>
          <div class="big fit" style="font-size:170px;color:{ULTRA};margin-top:18px">10–14</div>
          <div class="big" style="font-size:80px;margin-top:4px">weeks</div>
          <div style="display:flex;gap:16px;margin-top:40px">
            <div style="flex:1;background:#fff;border-radius:22px;padding:22px 24px"><div class="label" style="font-size:18px">Simple tool</div><div class="big" style="font-size:40px;margin-top:8px">6–8 wks</div></div>
            <div style="flex:1;background:{LILAC};border-radius:22px;padding:22px 24px"><div class="label" style="font-size:18px">Complex SaaS</div><div class="big" style="font-size:40px;margin-top:8px">14–20 wks</div></div></div>
          <div class="src">Arrowbin estimates, 2026. Full guide: arrowbin.com/blog</div></div>""",
        "Guess first / MVP timeline", S)),
    ("story-03-developer-pay", frame(
        head("US vs India: what developers <em>earn</em>", 92, S)
        + f"""<div class="main">
          <div style="background:{ULTRA};color:#fff;border-radius:26px;padding:28px 32px"><div class="label" style="color:#CFC9FF;font-size:20px">United States, median</div>
            <div class="big" style="font-size:110px;margin-top:10px">$155,000</div></div>
          <div style="background:{SUN};border-radius:26px;padding:28px 32px;margin-top:20px"><div class="label" style="font-size:20px">India, median</div>
            <div class="big" style="font-size:110px;margin-top:10px">$19,761</div></div>
          <p style="font-size:32px;font-weight:600;margin:30px 0 0;line-height:1.3">The US median is 7.8 times India's.</p>
          <div class="src">Yearly pay, Stack Overflow Developer Survey 2025 + 2026. All 38 countries: arrowbin.com/blog</div></div>""",
        "Data / Developer pay 2026", S)),
    ("story-04-red-flag-1", frame(
        head("A quote that seems <em>too good</em> to be true", 92, S)
        + f"""<div class="main"><p style="font-size:36px;font-weight:600;line-height:1.3;margin:0">It usually leaves out design, QA or discovery.</p>
          <div style="background:#fff;border-radius:24px;padding:26px 30px;margin-top:34px;font-size:30px;font-weight:600;line-height:1.35">
          Shortlist three to five firms and ask each one the same questions.</div>
          <div class="src">5 more red flags in the full guide: arrowbin.com/blog</div></div>""",
        "Red flag #1 / Hiring a dev company", S)),
    ("story-05-what-we-build", frame(
        f'<div style="margin-top:40px">{mark("#FFFFFF", PLASMA, 120)}</div>'
        + head("Software that <em>moves.</em>", 118, S)
        + '<div class="main"><div style="display:flex;flex-wrap:wrap;gap:12px">'
        + "".join(f'<span style="background:rgba(255,255,255,.14);border-radius:999px;padding:14px 22px;font-size:27px;font-weight:600">{s}</span>'
                  for s in ["Custom software", "Web apps", "Mobile apps", "E-commerce stores", "SaaS products", "UI/UX design", "AI automation", "Cloud & DevOps"])
        + f"""</div><p style="font-size:30px;line-height:1.35;margin:36px 0 0;color:#E4E1FF">For startups and small businesses worldwide, since 2020.</p>
          <div style="background:{SUN};color:{INK};border-radius:24px;padding:24px 30px;margin-top:34px;font-size:32px;font-weight:700">Book a free call: arrowbin.com</div></div>""",
        "Meet Arrowbin", S, bg=ULTRA, fg="#FFFFFF", muted="#CFC9FF", accent=SUN, mark_fill="#FFFFFF")),
]

PAGES = [("facebook", "post-13-mvp-cost-per-week", post13("square"), 1080), ("facebook", "post-14-developer-pay", post14("square"), 1080),
         ("instagram", "post-13-mvp-cost-per-week", post13("portrait"), 1350), ("instagram", "post-14-developer-pay", post14("portrait"), 1350)]
PAGES += [("stories", name, html, 1920) for name, html in STORIES]

CHECK = """() => {
  const problems = [];
  for (const el of document.querySelectorAll('.fit')) {
    let s = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth + 1 && s > 40) { s -= 2; el.style.fontSize = s + 'px'; }
  }
  const main = document.querySelector('.main');
  if (main && main.scrollHeight > main.clientHeight + 2) problems.push('content taller than its area by ' + (main.scrollHeight - main.clientHeight) + 'px');
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > 1080 - 79 || r.left < 79) && !el.closest('svg')) problems.push('outside side margin: ' + el.tagName + ' ' + (el.textContent || '').trim().slice(0, 30));
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'hidden' && el.tagName !== 'BODY') problems.push('text overflows: ' + (el.textContent || '').trim().slice(0, 30));
  }
  return [...new Set(problems)];
}"""

bad = False
with sync_playwright() as pw:
    b = pw.chromium.launch()
    for folder, name, html, height in PAGES:
        (OUT / folder).mkdir(parents=True, exist_ok=True)
        f = HERE / f"w01-{folder}-{name}.html"
        f.write_text(html, encoding="utf8")
        pg = b.new_page(viewport={"width": 1080, "height": height})
        pg.goto(f.as_uri())
        pg.evaluate("document.fonts.ready")
        pg.wait_for_load_state("networkidle")
        pg.wait_for_timeout(300)
        probs = pg.evaluate(CHECK)
        pg.screenshot(path=str(OUT / folder / f"{name}.png"))
        print(folder, name, "OK" if not probs else probs)
        bad = bad or bool(probs)
        pg.close()
    b.close()
print("FAILED" if bad else "ALL OK")
