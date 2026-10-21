"""Render LinkedIn carousel 1, "What an AI agent really costs a small business (2026)".

usage: python -I linkedin-carousel-01.py OUTDIR
Writes OUTDIR/carousel-01-ai-agent-cost.pdf (the file you upload to LinkedIn as a document)
and OUTDIR/slides/slide-01.png ... slide-11.png (1080x1350, for review and reuse).
Fails if any text overflows its box or the slide.

Every fact comes from arrowbin.com/blog/ai-agent-cost-small-business. Model and Intercom prices,
and the Census figures, were re-checked on the providers' own pages on 21 Oct 2026.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1]).resolve()
HERE = Path(__file__).resolve().parent
FONTS = (HERE / "fonts").as_uri()
INK, INK2, ULTRA, PLASMA, SUN, FROST, LILAC = "#0E0B24", "#4A4766", "#3B2BFF", "#FF4DA6", "#FFD23F", "#F1F2F7", "#CFC4FF"
MARK = "M50 6 94 90 50 70 6 90Z M50 36 60.5 57H39.5Z"
TOPIC = "AI agent costs · 2026"
N = 11


def mark(px):
    """The standard mark: Ultra arrowhead, Plasma bit (src/components/brand/mark.ts)."""
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 100 100" style="display:block;flex:none">'
            f'<path fill="{ULTRA}" fill-rule="evenodd" d="{MARK}"/>'
            f'<rect x="43.5" y="77" width="13" height="13" rx="1.5" fill="{PLASMA}"/></svg>')


def app_icon(px):
    """The app icon, unchanged (src/app/icon.svg), for Ultra slides where the plain mark would vanish."""
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 100 100" style="display:block;flex:none;'
            f'border-radius:{px * .24:.0f}px;box-shadow:0 0 0 3px rgba(255,255,255,.4)">'
            f'<rect width="100" height="100" rx="24" fill="{ULTRA}"/><g transform="translate(14 12) scale(.72)">'
            f'<path fill="#FFFFFF" fill-rule="evenodd" d="{MARK}"/>'
            f'<rect x="43.5" y="77" width="13" height="13" rx="1.5" fill="{PLASMA}"/></g></svg>')


def arrow(color, w=46, stroke=5):
    return (f'<svg width="{w}" height="{w * .6:.0f}" viewBox="0 0 50 30" style="display:block;flex:none">'
            f'<path d="M2 15H45M33 3l12 12-12 12" fill="none" stroke="{color}" stroke-width="{stroke}" '
            f'stroke-linecap="round" stroke-linejoin="round"/></svg>')


def slide(i, body, *, bg=FROST, fg=INK, muted=INK2, deco="", label=TOPIC, swipe=True):
    on_ultra = bg == ULTRA
    logo = app_icon(50) if on_ultra else mark(50)
    track = "rgba(255,255,255,.22)" if on_ultra else "rgba(14,11,36,.08)"
    fill = SUN if on_ultra else ULTRA
    right = (f'<span class="swipe">Swipe {arrow(fg, 40, 4)}</span>' if swipe
             else f'<span class="url" style="color:{muted}">arrowbin.com</span>')
    return f"""<section class="slide" style="background:{bg};color:{fg}">
      {deco}
      <div class="top" style="color:{muted}"><span>{label}</span><span>{i:02d} / {N:02d}</span></div>
      <div class="body">{body}</div>
      <div class="foot"><div class="brand">{logo}<span class="wm">Arrowbin</span></div>{right}</div>
      <div class="track" style="background:{track}"><div style="width:{i / N * 100:.2f}%;background:{fill}"></div></div>
    </section>"""


CSS = """
@font-face{font-family:Anybody;src:url(FONTS/anybody.woff2) format("woff2");font-weight:100 900;font-stretch:50% 150%}
@font-face{font-family:Geist;src:url(FONTS/geist.woff2) format("woff2");font-weight:100 900}
@font-face{font-family:GeistMono;src:url(FONTS/geist-mono.woff2) format("woff2");font-weight:100 900}
@page{size:1080px 1350px;margin:0}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#fff}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;display:flex;flex-direction:column;
  padding:78px 84px 0;font-family:Geist;break-after:page;page-break-after:always}
.slide>*{position:relative}
.deco{position:absolute!important;pointer-events:none}
.top{display:flex;justify-content:space-between;font-family:GeistMono;font-weight:500;font-size:22px;
  letter-spacing:.14em;text-transform:uppercase}
.body{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
.foot{height:158px;flex:none;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:16px}
.wm{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 118;font-size:36px;letter-spacing:-.02em}
.swipe{display:flex;align-items:center;gap:14px;font-family:GeistMono;font-weight:600;font-size:22px;
  letter-spacing:.14em;text-transform:uppercase}
.url{font-family:GeistMono;font-weight:600;font-size:23px;letter-spacing:.04em}
.track{position:absolute!important;left:0;right:0;bottom:0;height:12px}
.track>div{height:100%}
.kicker{font-family:GeistMono;font-weight:600;font-size:23px;letter-spacing:.14em;text-transform:uppercase}
h1,h2{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 112;letter-spacing:-.035em;
  text-transform:uppercase;margin:0}
h1{font-size:112px;line-height:.9}
h2{font-size:78px;line-height:.93;margin-top:22px}
h1 em,h2 em{font-style:normal}
p{margin:0}
.lead{font-size:35px;line-height:1.32;font-weight:500}
.card{background:#fff;border-radius:28px;padding:32px 36px}
.num{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 108;letter-spacing:-.04em;line-height:1;white-space:nowrap}
.small{font-size:26px;line-height:1.38}
.src{font-family:GeistMono;font-size:18px;letter-spacing:.03em;line-height:1.45}
.row{display:flex;gap:22px}
.tag{display:inline-block;font-family:GeistMono;font-weight:600;font-size:19px;letter-spacing:.12em;
  text-transform:uppercase;border-radius:999px;padding:9px 16px}
"""


def bars():
    rows = [("Gemini 2.5 Flash-Lite", 5.04), ("Claude Haiku 5.5", 5.40), ("OpenAI gpt-6-luna", 5.40),
            ("Gemini 3.6 Flash", 40.50), ("Claude Sonnet 5.5", 108.00), ("OpenAI gpt-6.1-sol", 108.00),
            ("Gemini 3.1 Pro Preview", 115.20), ("Claude Opus 5.5", 216.00)]
    track = 360
    out = []
    for name, v in rows:
        w = max(v / 216 * track, 6)
        ghost = ""
        if name == "Gemini 3.6 Flash":  # the published Jan 2027 price doubles this line
            ghost = (f'<div style="position:absolute;left:{w:.0f}px;top:0;height:100%;width:{w:.0f}px;'
                     f'border:3px dashed {PLASMA};border-left:none;border-radius:0 10px 10px 0"></div>')
        out.append(f"""<div style="display:grid;grid-template-columns:300px 1fr;align-items:center;gap:18px;margin-bottom:17px">
          <span style="font-size:26px;font-weight:600">{name}</span>
          <div style="display:flex;align-items:center;gap:16px">
            <div data-overflow-ok style="position:relative;height:40px;width:{w:.0f}px;border-radius:10px;background:{ULTRA};flex:none">{ghost}</div>
            <span class="num" style="font-size:31px;{'margin-left:' + str(round(w)) + 'px' if ghost else ''}">${v:,.2f}</span>
          </div></div>""")
    return "".join(out)


def step(n, title, text, color):
    return f"""<div style="display:grid;grid-template-columns:76px 1fr;gap:24px;align-items:start;margin-bottom:24px">
      <div class="num" style="width:76px;height:76px;border-radius:22px;background:{color};display:flex;align-items:center;
        justify-content:center;font-size:38px">{n}</div>
      <div><div style="font-size:31px;font-weight:700;line-height:1.2">{title}</div>
        <div class="small" style="color:{INK2};margin-top:6px">{text}</div></div></div>"""


def bucket(n, name, when, text, color):
    return f"""<div class="card" style="display:grid;grid-template-columns:96px 1fr;gap:26px;align-items:start;margin-bottom:20px">
      <div class="num" style="font-size:82px;color:{color}">{n}</div>
      <div><div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <span style="font-family:Anybody;font-weight:800;font-variation-settings:'wdth' 112;font-size:40px;letter-spacing:-.02em;text-transform:uppercase">{name}</span>
          <span class="tag" style="background:{FROST};color:{INK2}">{when}</span></div>
        <div class="small" style="margin-top:10px;color:{INK2}">{text}</div></div></div>"""


def route(when, then, color):
    return f"""<div style="display:grid;grid-template-columns:1fr 46px 1fr;gap:18px;align-items:center;margin-bottom:16px">
      <div class="card" style="padding:24px 28px;font-size:27px;font-weight:600;line-height:1.28">{when}</div>
      {arrow(ULTRA, 46, 5)}
      <div class="card" style="padding:24px 28px;font-size:27px;font-weight:700;line-height:1.28;background:{color}">{then}</div></div>"""


def box(text, color, sub):
    return f"""<div style="flex:1;border-radius:24px;background:{color};padding:24px 22px;min-height:170px;display:flex;flex-direction:column;justify-content:center">
      <div style="font-size:30px;font-weight:700;line-height:1.2">{text}</div>
      <div style="font-size:21px;line-height:1.3;color:{INK2};margin-top:8px">{sub}</div></div>"""


def op(sym):
    return f'<div style="font-family:Geist;font-weight:800;font-size:84px;line-height:1;color:{ULTRA};align-self:center">{sym}</div>'


COVER_DECO = f"""
  <div class="deco" style="right:-150px;top:-170px;width:620px;height:620px;border-radius:50%;background:{PLASMA}"></div>
  <div class="deco" style="right:250px;top:300px;width:230px;height:230px;border-radius:56px;background:{SUN};transform:rotate(-12deg)"></div>
  <div class="deco" style="right:-170px;top:360px;width:300px;height:300px;border-radius:50%;background:{LILAC};opacity:.9"></div>"""

CTA_DECO = f"""
  <div class="deco" style="right:-170px;top:-190px;width:520px;height:520px;border-radius:50%;background:{PLASMA}"></div>
  <div class="deco" style="right:210px;top:96px;width:160px;height:160px;border-radius:44px;background:{SUN};transform:rotate(14deg)"></div>"""

SLIDES = [
    # 1. Cover
    slide(1, f"""<div style="margin-top:auto;padding-bottom:10px">
        <span class="tag" style="background:#fff;color:{ULTRA}">For small business owners</span>
        <h1 style="margin-top:34px;font-size:104px">The model is<br>the <em style="color:{SUN}">cheapest</em><br>part of your<br>AI agent.</h1>
        <p class="lead" style="margin-top:34px;color:rgba(255,255,255,.88);max-width:860px">What an AI agent really costs a small business, with every sum shown.</p></div>""",
          bg=ULTRA, fg="#fff", muted="rgba(255,255,255,.75)", deco=COVER_DECO),

    # 2. Context: most small firms haven't started
    slide(2, f"""<div class="kicker" style="color:{ULTRA}">First, some context</div>
        <h2>Most small firms <em style="color:{ULTRA}">haven't started</em> yet.</h2>
        <div class="card" style="margin-top:44px">
          <div class="small" style="font-weight:600;color:{INK2}">US firms using AI in their operations</div>
          <div style="display:grid;grid-template-columns:230px 1fr;gap:18px 22px;align-items:center;margin-top:26px">
            <span style="font-size:27px;font-weight:600">1 to 4 staff</span>
            <div style="display:flex;align-items:center;gap:18px"><div style="height:56px;width:{20 / 37 * 430:.0f}px;border-radius:12px;background:{PLASMA}"></div><span class="num" style="font-size:44px">under 20%</span></div>
            <span style="font-size:27px;font-weight:600">250+ staff</span>
            <div style="display:flex;align-items:center;gap:18px"><div style="height:56px;width:430px;border-radius:12px;background:{ULTRA}"></div><span class="num" style="font-size:44px">37%</span></div>
          </div></div>
        <p class="lead" style="margin-top:40px;color:{INK2}">A five-person business with no AI agent is in the majority. There's no rush to buy a platform, but there is a reason to get the budget right.</p>
        <div class="src" style="color:{INK2};margin-top:26px">US Census Bureau, May 2026. All US firms: 17% to 20%, Dec 2025 to May 2026.</div>"""),

    # 3. The headline sum
    slide(3, f"""<div class="kicker">The sum</div>
        <p class="lead" style="margin-top:22px;font-weight:600;font-size:40px;line-height:1.25">3,000 customer conversations a month costs</p>
        <div class="num" style="font-size:190px;color:{ULTRA};margin-top:20px;letter-spacing:-.05em">$5–$216</div>
        <p class="lead" style="margin-top:14px;font-weight:700;font-size:44px">a month in AI model fees.</p>
        <div class="card" style="margin-top:50px;font-size:31px;font-weight:600;line-height:1.32">That's between 0.17 and 7.2 cents a conversation, depending on the model you pick.</div>
        <div class="src" style="margin-top:28px;color:{INK}">Worked example: 4 model calls per conversation, about 3,000 input and 300 output tokens per call, no caching or batch discounts.</div>""",
          bg=SUN),

    # 4. The chart
    slide(4, f"""<div class="kicker" style="color:{ULTRA}">Same workload, 8 models</div>
        <h2 style="font-size:70px">Start with the <em style="color:{ULTRA}">smallest</em> model that passes your tests.</h2>
        <div class="card" style="margin-top:38px;padding:34px 34px 20px">
          <div class="small" style="font-weight:600;color:{INK2};margin-bottom:22px">Monthly model fees, 3,000 conversations</div>
          {bars()}
          <div style="display:flex;align-items:center;gap:12px;margin:8px 0 12px;font-size:22px;color:{INK2}">
            <span style="width:34px;height:20px;border:3px dashed {PLASMA};border-radius:5px;flex:none"></span>
            Gemini 3.6 Flash doubles to $81 on Jan 1, 2027 (published price change)</div></div>
        <div class="src" style="color:{INK2};margin-top:24px">Each provider's own pricing page, checked Oct 21, 2026. Step up a size only where the small model keeps failing.</div>"""),

    # 5. Three buckets
    slide(5, f"""<div class="kicker" style="color:{ULTRA}">So where does the money go?</div>
        <h2>Three buckets, <em style="color:{ULTRA}">not one</em>.</h2>
        <div style="margin-top:40px">
          {bucket("1", "Build", "One-off", "Integrations and testing. For a bought tool: setup and loading your help content.", ULTRA)}
          {bucket("2", "Running", "Monthly", "Model fees, hosting, a vector database for document search, and monitoring.", PLASMA)}
          {bucket("3", "Upkeep", "People time", "Checking answers, fixing integrations when apps change, re-testing when models change.", "#E0A800")}
        </div>
        <div style="margin-top:14px;background:{LILAC};border-radius:24px;padding:24px 30px;font-size:30px;font-weight:700">Upkeep is the bucket most budgets forget.</div>"""),

    # 6. What sets the build cost
    slide(6, f"""<div class="kicker" style="color:{ULTRA}">What sets the build cost</div>
        <h2>Two questions matter more than <em style="color:{ULTRA}">the model</em>.</h2>
        <div class="card" style="margin-top:42px">
          <span class="tag" style="background:{ULTRA};color:#fff">Question 1</span>
          <div style="font-size:40px;font-weight:700;line-height:1.18;margin-top:18px">How many of your systems does it connect to?</div>
          <div class="small" style="color:{INK2};margin-top:14px">Each one needs authentication, error handling and tests. A documented API is a different job from a legacy tool with none.</div></div>
        <div class="card" style="margin-top:22px">
          <span class="tag" style="background:{PLASMA};color:#fff">Question 2</span>
          <div style="font-size:40px;font-weight:700;line-height:1.18;margin-top:18px">What can it do without a person checking?</div>
          <div class="small" style="color:{INK2};margin-top:14px">A read-only agent can be wrong without breaking anything. Once it changes records, you need permissions, confirmation steps, an audit log and a way to undo.</div></div>"""),

    # 7. Upkeep and price changes
    slide(7, f"""<div class="kicker" style="color:{ULTRA}">After launch</div>
        <h2>Model prices move on <em style="color:{ULTRA}">published dates</em>.</h2>
        <div class="card" style="margin-top:40px;padding:34px 38px">
          <div class="small" style="font-weight:600;color:{INK2}">Gemini 3.6 Flash, input, per million tokens</div>
          <div style="display:flex;align-items:center;gap:26px;margin-top:18px">
            <div><div class="num" style="font-size:96px">$0.75</div><div class="src" style="color:{INK2};margin-top:8px">TO DEC 31, 2026</div></div>
            {arrow(PLASMA, 80, 5)}
            <div><div class="num" style="font-size:96px;color:{PLASMA}">$1.50</div><div class="src" style="color:{INK2};margin-top:8px">FROM JAN 1, 2027</div></div></div></div>
        <div style="margin-top:34px">
          {step("1", "Keep 50 to 100 real test questions", "Re-run them every time a model or prompt changes, or you're testing by feel.", LILAC)}
          {step("2", "Budget people time", "Someone reads a sample of conversations each week. A few hours a week at first (our estimate).", LILAC)}
          {step("3", "Set aside 15 to 20% of the build a year", "Our planning figure for owning any custom software. Agents sit at the top of it.", LILAC)}
        </div>"""),

    # 8. Buy before you build
    slide(8, f"""<div class="kicker" style="color:{ULTRA}">Buy or build?</div>
        <h2>Off the shelf wins <em style="color:{ULTRA}">more often</em> than agencies admit.</h2>
        <div class="card" style="margin-top:36px;display:flex;gap:30px;align-items:center">
          <div class="num" style="font-size:92px;color:{ULTRA}">$0.99</div>
          <div class="small" style="color:{INK2}"><b style="color:{INK}">per outcome</b> for Intercom's Fin agent. At 1,000 outcomes a month that's $11,880 a year, and the bill keeps coming.</div></div>
        <div style="margin-top:30px">
          {route("A tool you already pay for covers the job", "Switch on its built-in AI agent", "#fff")}
          {route("A few steps between apps you already use", "A workflow tool like n8n or Zapier", LILAC)}
          {route("Your own systems or sensitive data", "A custom agent, read-only first", SUN)}
        </div>
        <div class="src" style="color:{INK2};margin-top:14px">Intercom pricing page, checked Oct 21, 2026.</div>"""),

    # 9. Break-even check
    slide(9, f"""<div class="kicker" style="color:{ULTRA}">Will it pay for itself?</div>
        <h2>A one-minute <em style="color:{ULTRA}">break-even</em> check.</h2>
        <div style="display:flex;gap:16px;margin-top:46px">
          {box("Full monthly cost", "#fff", "Running costs, upkeep hours, the build spread over 12 to 24 months")}
          {op("÷")}
          {box("Loaded hourly cost", LILAC, "Wages plus taxes and overheads")}
        </div>
        <div style="display:flex;justify-content:center;margin:10px 0 14px">{op("=")}</div>
        <div style="background:{ULTRA};color:#fff;border-radius:28px;padding:34px 38px">
          <div style="font-size:42px;font-weight:700;line-height:1.18">Staff hours it must save every month just to break even</div></div>
        <p class="lead" style="margin-top:38px;color:{INK2}">If that's more hours than the task takes today, stop there. Use the agent's real resolution rate from a pilot, not a vendor's headline.</p>"""),

    # 10. The pilot
    slide(10, f"""<div class="kicker" style="color:{ULTRA}">How to start without wasting money</div>
        <h2>One job.<br><em style="color:{ULTRA}">Read-only.</em><br>One month.</h2>
        <div style="margin-top:42px">
          {step("1", "Pick one job with volume and a clear right answer", "Order-status questions or invoice entry, not a do-everything chatbot.", "#fff")}
          {step("2", "Write 50 to 100 real examples", "With the answer you'd want. It becomes your test set.", "#fff")}
          {step("3", "Build it read-only", "The agent drafts, a person approves. A prototype on real data takes 2 to 3 weeks.", SUN)}
          {step("4", "Run it for a month on real traffic", "Track drafts approved, edited and rejected, every hand-off, and fees per conversation.", "#fff")}
          {step("5", "Widen in steps", "Low-risk replies first, then actions, then a second job.", "#fff")}
        </div>
        <div class="src" style="color:{INK2};margin-top:6px">Durations: Arrowbin estimates, 2026.</div>"""),

    # 11. CTA
    slide(11, f"""<div style="margin-top:20px">
        <span class="tag" style="background:#fff;color:{ULTRA}">Your turn</span>
        <h2 style="font-size:96px;line-height:.92;margin-top:34px">Have one job you'd hand to an <em style="color:{SUN}">AI agent?</em></h2>
        <p class="lead" style="margin-top:34px;color:rgba(255,255,255,.9);max-width:820px">Describe it in a sentence. We'll tell you whether a tool you already pay for can do it, and if not, what a read-only pilot would involve.</p>
        <div style="margin-top:44px;display:flex;flex-direction:column;gap:16px;max-width:760px">
          <div style="background:#fff;color:{INK};border-radius:24px;padding:24px 30px;font-size:29px;font-weight:700">Full guide and every source in the comments</div>
          <div style="background:rgba(255,255,255,.14);border-radius:24px;padding:24px 30px;font-size:29px;font-weight:600">Save this for your next budget meeting</div></div></div>""",
          bg=ULTRA, fg="#fff", muted="rgba(255,255,255,.75)", deco=CTA_DECO, swipe=False),
]

CHECK = """() => {
  const bad = [];
  document.querySelectorAll('.slide').forEach((s, i) => {
    const r = s.getBoundingClientRect();
    const body = s.querySelector('.body');
    if (body.scrollHeight > body.clientHeight + 1) bad.push(`slide ${i + 1}: body overflows by ${body.scrollHeight - body.clientHeight}px`);
    s.querySelectorAll('.body *, .top *, .foot *').forEach(el => {
      if (el.closest('.deco') || el.hasAttribute('data-overflow-ok')) return;
      const e = el.getBoundingClientRect();
      if (e.width && (e.left < r.left + 40 || e.right > r.right - 40)) bad.push(`slide ${i + 1}: "${(el.innerText || el.tagName).slice(0, 40)}" leaves the side margin`);
      // Catches nowrap text that runs past its own box even when nothing clips it.
      if (el.clientWidth && el.scrollWidth > el.clientWidth + 1) bad.push(`slide ${i + 1}: "${(el.innerText || el.tagName).slice(0, 40)}" overflows its box`);
    });
  });
  return bad;
}"""


def main():
    html = (f'<!doctype html><html><head><meta charset="utf-8"><style>{CSS.replace("FONTS", FONTS)}</style></head>'
            f'<body>{"".join(SLIDES)}</body></html>')
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "slides").mkdir(exist_ok=True)
    src = OUT / "carousel-01.html"
    src.write_text(html, encoding="utf-8")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1350})
        page.goto(src.as_uri())
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(400)
        bad = page.evaluate(CHECK)
        if bad:
            sys.exit("Layout problems:\n" + "\n".join(dict.fromkeys(bad)))
        for i, el in enumerate(page.query_selector_all(".slide"), 1):
            el.screenshot(path=str(OUT / "slides" / f"slide-{i:02d}.png"))
        page.pdf(path=str(OUT / "carousel-01-ai-agent-cost.pdf"), width="1080px", height="1350px",
                 print_background=True, prefer_css_page_size=True)
        browser.close()
    print(f"{len(SLIDES)} slides -> {OUT}")


if __name__ == "__main__":
    main()
