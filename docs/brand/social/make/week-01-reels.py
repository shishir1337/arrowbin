"""Write the week-1 Arrowbin reels as HyperFrames compositions (1080x1920, one HTML file per reel).

usage: python -I week-01-reels.py
Writes projects/<reel>/index.html. Then, per reel: npx hyperframes check projects/<reel>, and
npx hyperframes render projects/<reel> -o renders/<reel>.mp4
Every number on screen comes from the Arrowbin article the reel points to.
"""
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
MARK = "M50 6 94 90 50 70 6 90Z M50 36 60.5 57H39.5Z"
INK, INK2, ULTRA, PLASMA, SUN, FROST, LILAC = "#0E0B24", "#4A4766", "#3B2BFF", "#FF4DA6", "#FFD23F", "#F1F2F7", "#CFC4FF"

# Safe area: Reels UI covers roughly the top 230px, the bottom 500px and a 120px icon column on the right.
CSS = """
@font-face{font-family:Anybody;src:url(assets/fonts/anybody.woff2) format("woff2");font-weight:100 900;font-stretch:50% 150%}
@font-face{font-family:Geist;src:url(assets/fonts/geist.woff2) format("woff2");font-weight:100 900}
@font-face{font-family:GeistMono;src:url(assets/fonts/geist-mono.woff2) format("woff2");font-weight:100 900}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:var(--bg)}
#root{position:relative;width:1080px;height:1920px;overflow:hidden;background:var(--bg);color:var(--fg);font-family:Geist}
.clip{position:absolute;inset:0}
.brand{display:flex;align-items:center;gap:16px;position:absolute;left:80px;top:236px}
.brand .wm{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 118;font-size:40px;letter-spacing:-.02em}
.scene{position:absolute;left:80px;right:120px;top:340px;bottom:520px;display:flex;flex-direction:column;justify-content:center}
.label{font-family:GeistMono;font-weight:500;font-size:28px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.h{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 112;letter-spacing:-.035em;line-height:.92;text-transform:uppercase;margin-top:30px}
.h em,.accent{font-style:normal;color:var(--accent)}
.big{font-family:Anybody;font-weight:800;font-variation-settings:"wdth" 110;letter-spacing:-.04em;line-height:.95;white-space:nowrap}
.p{font-size:46px;font-weight:600;line-height:1.25}
.small{font-family:GeistMono;font-size:24px;letter-spacing:.04em;color:var(--muted);line-height:1.4}
.chip{display:inline-block;border-radius:28px;padding:26px 36px;font-size:54px;font-weight:700}
.op{font-family:Geist;font-weight:800;font-size:76px;color:var(--accent);line-height:1;margin:14px 0 14px 18px}
.card{border-radius:30px;padding:36px 40px}
.sign{font-family:Geist;font-weight:800;margin-right:6px}
.end{align-items:center;text-align:center}
"""


def mark(fill, bit, px):
    return (f'<svg width="{px}" height="{px}" viewBox="0 0 100 100" style="display:block;flex:none">'
            f'<path fill="{fill}" fill-rule="evenodd" d="{MARK}"/>'
            f'<rect x="43.5" y="77" width="13" height="13" rx="1.5" fill="{bit}"/></svg>')


def reel(name, total, scenes, js, *, bg=FROST, fg=INK, muted=INK2, accent=ULTRA, mark_fill=ULTRA, brand=True):
    """scenes: list of (id, start, duration, inner_html). js: GSAP calls on `tl`."""
    clips = "\n".join(
        f'<div id="{sid}" class="clip" data-start="{start}" data-duration="{dur}" data-track-index="1">'
        f'<div class="scene{" end" if sid == "end" else ""}">{inner}</div></div>'
        for sid, start, dur, inner in scenes)
    head_clip = (f'<div id="brand" class="clip" data-start="0" data-duration="{scenes[-1][1]}" data-track-index="0">'
                 f'<div class="brand">{mark(mark_fill, PLASMA, 52)}<span class="wm">Arrowbin</span></div></div>') if brand else ""
    html = f"""<!doctype html>
<html lang="en" data-resolution="portrait">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>:root{{--bg:{bg};--fg:{fg};--muted:{muted};--accent:{accent}}}{CSS}</style>
</head>
<body>
<div id="root" data-composition-id="{name}" data-start="0" data-duration="{total}" data-width="1080" data-height="1920">
{head_clip}
{clips}
</div>
<script>
const tl = gsap.timeline({{ paused: true, defaults: {{ duration: 0.6, ease: "power3.out" }} }});
const enter = (sel, at, stagger = 0.12) => tl.from(sel, {{ y: 60, opacity: 0, stagger }}, at);
const leave = (sel, at) => tl.to(sel, {{ y: -40, opacity: 0, duration: 0.35, ease: "power2.in" }}, at);
{js}
window.__timelines = window.__timelines || {{}};
window.__timelines["{name}"] = tl;
tl.seek(0);
</script>
</body>
</html>
"""
    # One project folder per reel: HyperFrames wants a single root index.html per project.
    proj = HERE / "projects" / name
    (proj / "assets" / "fonts").mkdir(parents=True, exist_ok=True)
    for font in (HERE / "fonts").glob("*.woff2"):
        shutil.copyfile(font, proj / "assets" / "fonts" / font.name)
    (proj / "index.html").write_text(html, encoding="utf8")
    return name


def end_card(line1, line2, src=""):
    return (f'<div class="e1">{mark(ULTRA, PLASMA, 200)}</div>'
            f'<div class="e2 big" style="font-size:96px;margin-top:36px">Arrowbin</div>'
            f'<div class="e3 p" style="margin-top:56px">{line1}</div>'
            f'<div class="e4 big accent" style="font-size:72px;margin-top:18px">{line2}</div>'
            + (f'<div class="e5 small" style="margin-top:44px">{src}</div>' if src else ""))


END_JS = """
tl.from("#end .e1", { scale: 0.4, opacity: 0, duration: 0.7, ease: "back.out(1.7)" }, T);
enter("#end .e2, #end .e3, #end .e4, #end .e5", T + 0.3);
"""

REELS = []

# 1. MVP cost per build week (mvp-development-cost)
REELS.append(reel("reel-01-mvp-cost-per-week", 19, [
    ("s1", 0, 3.4, '<div class="label">MVP budget / 2026</div>'
                   '<h1 class="h" style="font-size:112px">What does one week of <em>MVP</em> cost?</h1>'
                   '<div class="p" style="margin-top:44px;color:var(--muted)">Count the weeks before you compare hourly rates.</div>'),
    ("s2", 3.4, 4.8, '<div class="label">The formula</div><div style="margin-top:34px">'
                     f'<div class="chip" style="background:#fff">Build weeks</div><div class="op">×</div>'
                     f'<div class="chip" style="background:{LILAC}">Team size</div><div class="op">×</div>'
                     f'<div class="chip" style="background:{SUN}">Weekly rate</div></div>'
                     '<div class="p f2" style="font-size:38px;margin-top:40px;color:var(--muted)">+ launch costs + year-one running costs</div>'
                     '<div class="p f3" style="margin-top:22px">The first part is nearly all of it.</div>'),
    ("s3", 8.2, 4.8, '<div class="label">Our worked example</div>'
                     '<div class="big x1" style="font-size:96px;margin-top:34px">$60,000 SaaS MVP</div>'
                     '<div class="p x2" style="font-size:54px;margin-top:14px;color:var(--muted)">÷ about 14 weeks of build</div>'
                     f'<div class="x3" style="height:6px;background:{INK};border-radius:3px;margin:46px 0 30px;transform-origin:left center"></div>'
                     '<div class="big accent x4" style="font-size:230px">$4,300</div>'
                     '<div class="p x5" style="margin-top:10px">per build week</div>'),
    ("s4", 13, 3, '<div class="card c1" style="background:#fff"><div class="label">Add a week of scope</div>'
                  '<div class="big" style="font-size:120px;margin-top:16px"><span class="sign">+</span>$4,300</div></div>'
                  f'<div class="card c2" style="background:{SUN};margin-top:28px"><div class="label">Cut a week</div>'
                  '<div class="big" style="font-size:120px;margin-top:16px"><span class="sign">−</span>$4,300</div></div>'
                  '<div class="small c3" style="margin-top:30px">Roughly, on the $60,000 example</div>'),
    ("end", 16, 3, end_card("The full guide, phase by phase:", "arrowbin.com/blog", "Arrowbin estimates, 2026")),
], """
enter("#s1 .label, #s1 .h, #s1 .p", 0.15, 0.18);
leave("#s1 .scene > *", 3.0);
enter("#s2 .label", 3.5);
enter("#s2 .chip, #s2 .op", 3.7, 0.28);
enter("#s2 .f2", 5.5);
enter("#s2 .f3", 6.2);
leave("#s2 .scene > *", 7.8);
enter("#s3 .label, #s3 .x1, #s3 .x2", 8.3, 0.25);
tl.from("#s3 .x3", { scaleX: 0, duration: 0.6 }, 9.4);
tl.from("#s3 .x4", { scale: 0.6, opacity: 0, duration: 0.7, ease: "back.out(1.6)" }, 9.9);
enter("#s3 .x5", 10.4);
leave("#s3 .scene > *", 12.6);
enter("#s4 .c1", 13.1);
enter("#s4 .c2", 13.7);
enter("#s4 .c3", 14.3);
leave("#s4 .scene > *", 15.6);
const T = 16.1;""" + END_JS))

# 2. MVP timeline (how-long-does-it-take-to-build-an-mvp)
def range_row(cls, label, lo, hi):
    return (f'<div class="{cls}" style="margin-bottom:54px"><div style="display:flex;justify-content:space-between;align-items:baseline">'
            f'<span class="p" style="font-size:44px">{label}</span><span class="big accent" style="font-size:56px">{lo}–{hi} wks</span></div>'
            f'<div style="position:relative;height:44px;border-radius:22px;background:#E2E3EE;margin-top:18px">'
            f'<div class="fill" style="position:absolute;left:{lo / 20 * 100}%;width:{(hi - lo) / 20 * 100}%;top:0;bottom:0;border-radius:22px;background:{ULTRA};transform-origin:left center"></div></div></div>')


REELS.append(reel("reel-02-mvp-timeline", 19.5, [
    ("s1", 0, 3, '<div class="label">MVP timeline / 2026</div><h1 class="h" style="font-size:124px">How long does an <em>MVP</em> take?</h1>'),
    ("s2", 3, 7, '<div class="label" style="margin-bottom:50px">Arrowbin estimates, in weeks</div>'
                 + range_row("r1", "Simple tool", 6, 8) + range_row("r2", "Standard MVP", 10, 14) + range_row("r3", "Complex SaaS MVP", 14, 20)
                 + '<div class="small ax" style="display:flex;justify-content:space-between"><span>0</span><span>5</span><span>10</span><span>15</span><span>20 weeks</span></div>'),
    ("s3", 10, 3.5, '<div class="p">Most well-scoped MVPs launch in</div>'
                    '<div class="big accent" style="font-size:210px;margin-top:20px">6–14</div>'
                    '<div class="big" style="font-size:110px;margin-top:6px">weeks</div>'),
    ("s4", 13.5, 3, '<div class="label">The biggest lever</div><h2 class="h" style="font-size:120px">Scope.</h2>'
                    '<div class="p" style="margin-top:40px">Every feature you move to version two buys you time.</div>'),
    ("end", 16.5, 3, end_card("The full guide, with a worked example:", "arrowbin.com/blog", "Arrowbin estimates, 2026")),
], """
enter("#s1 .label, #s1 .h", 0.15, 0.2);
leave("#s1 .scene > *", 2.6);
enter("#s2 .label", 3.1);
enter("#s2 .r1", 3.4); tl.from("#s2 .r1 .fill", { scaleX: 0, duration: 0.8 }, 3.8);
enter("#s2 .r2", 4.6); tl.from("#s2 .r2 .fill", { scaleX: 0, duration: 0.8 }, 5.0);
enter("#s2 .r3", 5.8); tl.from("#s2 .r3 .fill", { scaleX: 0, duration: 0.8 }, 6.2);
enter("#s2 .ax", 6.8);
leave("#s2 .scene > *", 9.6);
enter("#s3 .scene > *", 10.1, 0.25);
leave("#s3 .scene > *", 13.1);
enter("#s4 .scene > *", 13.6, 0.3);
leave("#s4 .scene > *", 16.1);
const T = 16.6;""" + END_JS))

# 3. Developer pay by country (developer-salaries-by-country)
PAY = [("United States", 155000), ("United Kingdom", 95299), ("Germany", 83340), ("Poland", 55040), ("India", 19761), ("Pakistan", 9937)]
pay_rows = "".join(
    f'<div class="row" style="margin-bottom:40px"><div style="display:flex;justify-content:space-between;align-items:baseline">'
    f'<span class="p" style="font-size:42px">{c}</span><span class="big" style="font-size:52px">${v:,}</span></div>'
    f'<div class="fill" style="height:34px;width:{v / PAY[0][1] * 100:.1f}%;min-width:14px;border-radius:12px;background:{ULTRA if i < 4 else PLASMA};margin-top:12px;transform-origin:left center"></div></div>'
    for i, (c, v) in enumerate(PAY))
REELS.append(reel("reel-03-developer-pay", 20.5, [
    ("s1", 0, 3, '<div class="label">Data / Developer pay</div><h1 class="h" style="font-size:108px">What do developers <em>earn</em> around the world?</h1>'),
    ("s2", 3, 8, '<div class="label" style="margin-bottom:44px">Median yearly pay, USD</div>' + pay_rows
                 + '<div class="small src">Stack Overflow Developer Survey 2025 + 2026, 25,416 developers</div>'),
    ("s3", 11, 3.5, '<div class="p">The US median is</div><div class="big accent" style="font-size:300px;margin-top:10px">7.8×</div>'
                    '<div class="p">India’s.</div>'),
    ("s4", 14.5, 3, '<div class="p">Pay varies inside each country too.</div>'
                    f'<div class="card" style="background:{SUN};margin-top:40px"><div class="label">India, middle 50%</div>'
                    '<div class="big" style="font-size:82px;margin-top:16px">$8,879 to $39,521</div></div>'),
    ("end", 17.5, 3, end_card("All 38 countries, plus a free CSV:", "arrowbin.com/blog", "Arrowbin analysis of Stack Overflow survey data")),
], """
enter("#s1 .label, #s1 .h", 0.15, 0.2);
leave("#s1 .scene > *", 2.6);
enter("#s2 .label", 3.1);
document.querySelectorAll("#s2 .row").forEach((row, i) => {
  const at = 3.4 + i * 0.9;
  tl.from(row, { y: 40, opacity: 0, duration: 0.5 }, at);
  tl.from(row.querySelector(".fill"), { scaleX: 0, duration: 0.8 }, at + 0.25);
});
enter("#s2 .src", 9.0);
leave("#s2 .scene > *", 10.6);
enter("#s3 .p:first-child", 11.1);
tl.from("#s3 .big", { scale: 0.5, opacity: 0, duration: 0.7, ease: "back.out(1.6)" }, 11.5);
enter("#s3 .p:last-child", 12.0);
leave("#s3 .scene > *", 14.1);
enter("#s4 .scene > *", 14.6, 0.35);
leave("#s4 .scene > *", 17.1);
const T = 17.6;""" + END_JS))

# 4. Six red flags (how-to-choose-a-software-development-company)
FLAGS = ["A quote that seems too good to be true", "Vague timelines and no clear process", "No live work you can actually use",
         "No mention of testing, security or maintenance", "Won’t confirm you own the code", "Slow, unclear replies before you sign"]
flag_rows = "".join(
    f'<div class="flag" style="display:flex;gap:28px;align-items:baseline;margin-bottom:34px">'
    f'<span class="big accent" style="font-size:52px;min-width:76px">0{i}</span>'
    f'<span class="p" style="font-size:44px">{t}</span></div>' for i, t in enumerate(FLAGS, 1))
REELS.append(reel("reel-04-hiring-red-flags", 20.5, [
    ("s1", 0, 3, '<div class="label">Hiring a software company?</div><h1 class="h" style="font-size:124px">6 red <em>flags</em> to watch for</h1>'),
    ("s2", 3, 11.5, flag_rows),
    ("s3", 14.5, 3, '<div class="label">What matters more than price</div>'
                    '<div class="p" style="font-size:64px;line-height:1.15;margin-top:30px">Track record, communication and process.</div>'),
    ("end", 17.5, 3, end_card("The questions to ask before you sign:", "arrowbin.com/blog")),
], """
enter("#s1 .label, #s1 .h", 0.15, 0.2);
leave("#s1 .scene > *", 2.6);
tl.from("#s2 .flag", { x: -60, opacity: 0, stagger: 1.6, duration: 0.55 }, 3.2);
leave("#s2 .scene > *", 14.1);
enter("#s3 .scene > *", 14.6, 0.3);
leave("#s3 .scene > *", 17.1);
const T = 17.6;""" + END_JS))

# 5. What we build (brand intro, ultraviolet)
SERVICES = ["Custom software", "Web apps", "Mobile apps", "E-commerce stores", "SaaS products", "UI/UX design", "AI automation", "Cloud & DevOps"]
svc = "".join(f'<div class="svc" style="display:flex;align-items:center;gap:22px;font-size:46px;font-weight:600;margin-bottom:30px">'
              f'<span style="width:22px;height:22px;border-radius:5px;background:{PLASMA};flex:none"></span>{s}</div>' for s in SERVICES)
REELS.append(reel("reel-05-what-we-build", 17, [
    ("s1", 0, 3.2, f'<div class="m">{mark("#FFFFFF", PLASMA, 170)}</div><h1 class="h" style="font-size:150px;margin-top:50px">Software that <em>moves.</em></h1>'),
    ("s2", 3.2, 6.8, '<div class="label" style="margin-bottom:44px">What we build</div>' + svc),
    ("s3", 10, 3.5, '<div class="p" style="font-size:64px;line-height:1.15">For startups and small businesses worldwide.</div>'
                    '<div class="big accent" style="font-size:120px;margin-top:40px">Since 2020.</div>'),
    ("end", 13.5, 3.5, f'<div class="e1">{mark("#FFFFFF", PLASMA, 200)}</div>'
                       '<div class="e2 big" style="font-size:96px;margin-top:36px">Arrowbin</div>'
                       '<div class="e3 p" style="margin-top:56px">Have a project in mind?<br>Book a free call:</div>'
                       '<div class="e4 big accent" style="font-size:84px;margin-top:18px">arrowbin.com</div>'),
], """
tl.from("#s1 .m", { scale: 0.3, rotation: -20, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, 0.1);
enter("#s1 .h", 0.6);
leave("#s1 .scene > *", 2.8);
enter("#s2 .label", 3.3);
tl.from("#s2 .svc", { x: -50, opacity: 0, stagger: 0.55, duration: 0.5 }, 3.6);
leave("#s2 .scene > *", 9.6);
enter("#s3 .scene > *", 10.1, 0.4);
leave("#s3 .scene > *", 13.1);
const T = 13.6;""" + END_JS, bg=ULTRA, fg="#FFFFFF", muted="#CFC9FF", accent=SUN, mark_fill="#FFFFFF", brand=False))

print("wrote", ", ".join(REELS))
