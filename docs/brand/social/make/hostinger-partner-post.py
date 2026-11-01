"""Render post 15, the Hostinger partnership announcement (1080x1350, 4:5, for the Facebook and Instagram feeds).

usage: python -I hostinger-partner-post.py OUTDIR [BADGE_SVG]
Writes OUTDIR/facebook/post-15-hostinger-partner.png. Fails if any text overflows its box or the canvas.
BADGE_SVG defaults to the site's copy of Hostinger's square badge (public/hostinger-partner-badge/svg/Badge_brand_light_square.svg).

The badge follows the rules in src/lib/site.ts: used as supplied (no change to its colours, proportions or text),
alone on a plain white card with clear space, and not locked up next to the Arrowbin logo. The rays, rings and
sparkles stay outside the card.
Every claim matches the Hostinger block on arrowbin.com/services/cloud-devops-hosting.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path(sys.argv[1])
HERE = Path(__file__).resolve().parent
BADGE = (Path(sys.argv[2]) if len(sys.argv) > 2
         else HERE.parents[2] / "public/hostinger-partner-badge/svg/Badge_brand_light_square.svg")
FONTS = (HERE / "fonts").as_uri()
MARK = "M50 6 94 90 50 70 6 90Z M50 36 60.5 57H39.5Z"
INK, ULTRA, PLASMA, SUN, LILAC = "#0E0B24", "#3B2BFF", "#FF4DA6", "#FFD23F", "#CFC9FF"
W, H = 1080, 1350
CARD = 500  # the white badge card, centred in the hero area
SPARKLE = "M0-1C.1-.1.1-.1 1 0 .1.1.1.1 0 1-.1.1-.1.1-1 0-.1-.1-.1-.1 0-1Z"


def mark(fill, bit, px):
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 100 100" style="display:block;flex:none">'
            f'<path fill="{fill}" fill-rule="evenodd" d="{MARK}"/>'
            f'<rect x="43.5" y="77" width="13" height="13" rx="1.5" fill="{bit}"/></svg>')


def sparkles():
    # (x, y, size, colour), relative to the card's centre; all outside the card.
    stars = [(-330, -190, 34, SUN), (348, -250, 22, "#FFFFFF"), (372, 120, 40, PLASMA),
             (-372, 210, 24, "#FFFFFF"), (-290, -300, 14, "#FFFFFF"), (300, 300, 16, SUN)]
    dots = [(-405, -40, 9, SUN), (420, -60, 7, "#FFFFFF"), (-180, 335, 8, PLASMA), (160, -340, 8, LILAC)]
    out = "".join(f'<path d="{SPARKLE}" fill="{c}" transform="translate({x} {y}) scale({s})"/>' for x, y, s, c in stars)
    out += "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>' for x, y, r, c in dots)
    return out


HTML = f"""<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face{{font-family:Anybody;src:url({FONTS}/anybody.woff2) format("woff2");font-weight:100 900;font-stretch:50% 150%}}
  @font-face{{font-family:Geist;src:url({FONTS}/geist.woff2) format("woff2");font-weight:100 900}}
  @font-face{{font-family:GeistMono;src:url({FONTS}/geist-mono.woff2) format("woff2");font-weight:100 900}}
  *{{box-sizing:border-box}} html,body{{margin:0}}
  body{{width:{W}px;height:{H}px;overflow:hidden;color:#fff;font-family:Geist;display:flex;flex-direction:column;
    align-items:center;text-align:center;padding:84px 80px 64px;position:relative;
    background:radial-gradient(circle at 50% 56%,rgba(255,255,255,.20),transparent 34%),
      radial-gradient(circle at 0% 0%,rgba(207,196,255,.34),transparent 40%),
      radial-gradient(circle at 100% 100%,rgba(255,77,166,.38),transparent 42%),{ULTRA}}}
  .pill{{display:inline-flex;align-items:center;gap:14px;border:1.5px solid rgba(255,255,255,.35);border-radius:999px;
    padding:12px 26px;font-family:GeistMono;font-weight:500;font-size:22px;letter-spacing:.16em;text-transform:uppercase;
    background:rgba(255,255,255,.08);position:relative}}
  .pill b{{color:{SUN};font-family:Geist;font-weight:300;font-size:28px;letter-spacing:0}}
  .h{{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 112;letter-spacing:-.035em;line-height:.9;
    text-transform:uppercase;margin:34px 0 0;white-space:nowrap;position:relative;width:100%}}
  .h em{{font-style:normal;color:{SUN}}}
  .sub{{font-size:36px;font-weight:600;margin:22px 0 0;color:#E4E1FF;position:relative}}
  .hero{{flex:1;width:100%;display:grid;place-items:center;position:relative;min-height:0}}
  .deco{{position:absolute;left:50%;top:50%;pointer-events:none}}
  .rays{{width:1500px;height:1500px;margin:-750px 0 0 -750px;border-radius:50%;
    background:repeating-conic-gradient(from 4deg,rgba(255,255,255,.075) 0deg 5deg,transparent 5deg 15deg);
    -webkit-mask-image:radial-gradient(circle,#000 0 22%,transparent 52%);mask-image:radial-gradient(circle,#000 0 22%,transparent 52%)}}
  .card{{width:{CARD}px;height:{CARD}px;background:#fff;border-radius:60px;display:grid;place-items:center;position:relative;
    box-shadow:0 0 0 14px rgba(255,255,255,.16),0 60px 100px -40px rgba(14,11,36,.65)}}
  .code{{display:inline-flex;align-items:center;gap:14px;background:{SUN};color:{INK};border-radius:999px;
    padding:20px 36px;font-size:30px;font-weight:600;position:relative}}
  .code b{{font-family:GeistMono;font-weight:700;font-size:32px;letter-spacing:.04em}}
  .foot{{width:100%;display:flex;align-items:center;justify-content:space-between;padding-top:40px;position:relative}}
  .wm{{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 118;font-size:34px;letter-spacing:-.02em}}
  .url{{font-family:GeistMono;font-weight:600;font-size:22px;letter-spacing:.04em;color:{LILAC}}}
</style></head><body>
  <div class="pill">Arrowbin <b>×</b> Hostinger</div>
  <h1 class="h fit" style="font-size:160px">It’s official<em>.</em></h1>
  <p class="sub">Arrowbin is a verified Hostinger Partner.</p>
  <div class="hero">
    <div class="deco rays"></div>
    <svg class="deco" width="1100" height="1100" viewBox="-550 -550 1100 1100" style="margin:-550px 0 0 -550px" fill="none">
      <circle r="345" stroke="#fff" stroke-opacity=".16" stroke-width="2"/>
      <circle r="425" stroke="#fff" stroke-opacity=".10" stroke-width="2" stroke-dasharray="2 12"/>
      <circle r="520" stroke="#fff" stroke-opacity=".06" stroke-width="2"/>
      {sparkles()}
    </svg>
    <div class="card"><img src="{BADGE.as_uri()}" width="380" height="380" alt="Hostinger Partner badge"></div>
  </div>
  <div class="code">Use code <b>ARROWBIN</b> at checkout</div>
  <div class="foot"><div style="display:flex;align-items:center;gap:14px">{mark("#FFFFFF", PLASMA, 44)}<span class="wm">Arrowbin</span></div>
    <span class="url">arrowbin.com</span></div>
</body></html>"""

CHECK = """([W, H]) => {
  const problems = [];
  for (const el of document.querySelectorAll('.fit')) {
    let s = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth + 1 && s > 40) { s -= 2; el.style.fontSize = s + 'px'; }
  }
  const hero = document.querySelector('.hero'), card = document.querySelector('.card');
  if (card.getBoundingClientRect().height > hero.getBoundingClientRect().height + 1) problems.push('badge card taller than the hero area');
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg') || el.closest('.deco') || el.classList.contains('hero')) continue;
    const r = el.getBoundingClientRect();
    if (r.width && (r.right > W - 79 || r.left < 79 || r.bottom > H - 63)) problems.push('outside the margin: ' + el.tagName + ' ' + (el.textContent || '').trim().slice(0, 30));
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'hidden') problems.push('text overflows: ' + (el.textContent || '').trim().slice(0, 30));
  }
  const img = document.querySelector('.card img');
  if (!img.complete || !img.naturalWidth) problems.push('badge did not load: ' + img.src);
  return [...new Set(problems)];
}"""

with sync_playwright() as pw:
    b = pw.chromium.launch()
    (OUT / "facebook").mkdir(parents=True, exist_ok=True)
    f = HERE / "post-15-hostinger-partner.html"
    f.write_text(HTML, encoding="utf8")
    pg = b.new_page(viewport={"width": W, "height": H})
    pg.goto(f.as_uri())
    pg.evaluate("document.fonts.ready")
    pg.wait_for_load_state("networkidle")
    pg.wait_for_timeout(300)
    probs = pg.evaluate(CHECK, [W, H])
    pg.screenshot(path=str(OUT / "facebook" / "post-15-hostinger-partner.png"))
    b.close()
print("ALL OK" if not probs else f"FAILED: {probs}")
sys.exit(1 if probs else 0)
