"""Run Lighthouse 13.6 (all four categories) and print scores plus every failing audit.

python -I lhfull.py --base URL [--runs N] [--form mobile|desktop|both] [--out DIR]
                    [--cats perf] [--fails] [--psi [--mcpu 5 --dcpu 4]] path...

--psi emulates PageSpeed Insights hardware on a fast desktop (this machine
benchmarks about 3,150): GPU disabled (PSI's servers have none, so WebGL runs in
software) and a CPU slowdown of 5x on mobile and 4x on desktop. PSI's own runs
reported CPU power 574 to 822 on mobile (with its 1.2x throttle) and 356 to 1014
on desktop on 1 Nov 2026; 5x and 4x give a little headroom over the typical draw.
Uses the Lighthouse CLI cached by npx (LH below); raw JSON reports go to --out.
"""
import argparse
import json
import os
import statistics
import subprocess
import sys
import tempfile

LH = r"C:/Users/amaiz/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js"
FLAGS = ""
PSI = False
DCPU = 4.0
MCPU = 5.0
CATS = ["performance", "accessibility", "best-practices", "seo"]


def run_once(url, form, out_path, cats, extra):
    cmd = [
        "node", LH, url, "--quiet", f"--only-categories={','.join(cats)}",
        f"--chrome-flags=--headless=new {FLAGS}", "--output=json", f"--output-path={out_path}",
    ] + extra
    if form == "desktop":
        cmd.append("--preset=desktop")
    if PSI:
        # PageSpeed Insights hardware (1 Nov 2026 report): mobile CPU power 822 with
        # a 1.2x slowdown, desktop 356 with 1x; this machine benchmarks ~3150, no GPU there.
        cmd.append(f"--throttling.cpuSlowdownMultiplier={DCPU if form == 'desktop' else MCPU}")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=300)
    with open(out_path, encoding="utf8") as f:
        return json.load(f)


def summarize(d):
    a = d["audits"]
    scores = {k: round((v["score"] or 0) * 100) for k, v in d["categories"].items()}
    m = {}
    for key, aid, div in [("lcp", "largest-contentful-paint", 1000), ("tbt", "total-blocking-time", 1),
                          ("cls", "cumulative-layout-shift", 1), ("fcp", "first-contentful-paint", 1000),
                          ("si", "speed-index", 1000)]:
        if aid in a and a[aid].get("numericValue") is not None:
            m[key] = a[aid]["numericValue"] / div
    fails = []
    for cat in d["categories"].values():
        for ref in cat["auditRefs"]:
            au = a[ref["id"]]
            if au["scoreDisplayMode"] in ("notApplicable", "manual", "informative"):
                continue
            if au["score"] is not None and au["score"] < 1:
                if cat["id"] == "performance" and ref.get("group") == "metrics":
                    continue
                if cat["id"] == "performance" and ref.get("weight", 0) == 0 and (au["score"] or 0) >= 0.9:
                    continue
                fails.append(f"{cat['id'][:4]}:{ref['id']}({au['score']}){' ' + au.get('displayValue','') if au.get('displayValue') else ''}")
    return scores, m, fails


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--runs", type=int, default=1)
    ap.add_argument("--form", default="both", choices=["mobile", "desktop", "both"])
    ap.add_argument("--out", default=None)
    ap.add_argument("--cats", default="all")
    ap.add_argument("--fails", action="store_true")
    ap.add_argument("--swgl", action="store_true", help="force software WebGL like PSI servers")
    ap.add_argument("--psi", action="store_true", help="emulate PSI CPU and no GPU")
    ap.add_argument("--dcpu", type=float, default=4.0)
    ap.add_argument("--mcpu", type=float, default=5.0)
    ap.add_argument("paths", nargs="+")
    args = ap.parse_args()
    global FLAGS, PSI, DCPU, MCPU
    PSI = args.psi
    DCPU, MCPU = args.dcpu, args.mcpu
    if args.swgl or args.psi:
        FLAGS = "--disable-gpu"
    cats = CATS if args.cats == "all" else ["performance"]
    out = args.out or tempfile.mkdtemp(prefix="lh-")
    os.makedirs(out, exist_ok=True)
    forms = ["mobile", "desktop"] if args.form == "both" else [args.form]
    for path in args.paths:
        for form in forms:
            res = []
            for i in range(args.runs):
                name = (path.strip("/").replace("/", "_") or "home") + f"-{form}-{i}.json"
                try:
                    res.append(summarize(run_once(args.base + path, form, os.path.join(out, name), cats, [])))
                except Exception as e:  # noqa: BLE001
                    print(f"{path} {form} run {i} failed: {e}", file=sys.stderr)
            if not res:
                continue
            perf = [r[0].get("performance", 0) for r in res]
            med = lambda k: statistics.median(r[1].get(k, 0) for r in res)  # noqa: E731
            sc = res[0][0]
            others = " ".join(f"{k[:4]}={min(r[0].get(k,0) for r in res)}" for k in sc if k != "performance")
            print(
                f"{form:7} {path:48} perf {statistics.median(perf):>4.0f} (runs {perf}) {others} | LCP {med('lcp'):.2f} "
                f"TBT {med('tbt'):>4.0f} CLS {med('cls'):.3f} FCP {med('fcp'):.2f} SI {med('si'):.2f}",
                flush=True,
            )
            if args.fails:
                seen = set()
                for r in res:
                    for f in r[2]:
                        k = f.split("(")[0]
                        if k not in seen:
                            seen.add(k)
                            print("      ", f, flush=True)


if __name__ == "__main__":
    main()
