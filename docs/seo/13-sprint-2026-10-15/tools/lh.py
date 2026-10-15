"""Run Lighthouse (performance only) on a list of paths and print a summary.

Usage:
  python -I docs/seo/13-sprint-2026-10-15/tools/lh.py --base http://localhost:3117 \
      [--runs 3] [--form mobile|desktop|both] [--out DIR] / /services /blog ...

Prints one line per path and form factor with the MEDIAN score, LCP, TBT, CLS,
FCP, SI and the LCP element. Raw JSON reports go to --out (default: a temp dir).
Uses the Lighthouse 12 CLI cached by npx (no install).
"""
import argparse
import json
import os
import statistics
import subprocess
import sys
import tempfile

LH = r"C:/Users/amaiz/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js"


def run_once(url, form, out_path):
    cmd = [
        "node", LH, url, "--quiet", "--only-categories=performance",
        "--chrome-flags=--headless=new", "--output=json", f"--output-path={out_path}",
    ]
    if form == "desktop":
        cmd.append("--preset=desktop")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=240)
    with open(out_path, encoding="utf8") as f:
        d = json.load(f)
    a = d["audits"]
    lcp_el = ""
    try:
        items = a["largest-contentful-paint-element"]["details"]["items"]
        node = items[0]["items"][0]["node"] if "items" in items[0] else items[0]["node"]
        lcp_el = node.get("selector", "")[:70]
    except Exception:
        pass
    return {
        "score": round(d["categories"]["performance"]["score"] * 100),
        "lcp": a["largest-contentful-paint"]["numericValue"] / 1000,
        "tbt": a["total-blocking-time"]["numericValue"],
        "cls": a["cumulative-layout-shift"]["numericValue"],
        "fcp": a["first-contentful-paint"]["numericValue"] / 1000,
        "si": a["speed-index"]["numericValue"] / 1000,
        "lcp_el": lcp_el,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", default="http://localhost:3117")
    ap.add_argument("--runs", type=int, default=1)
    ap.add_argument("--form", default="mobile", choices=["mobile", "desktop", "both"])
    ap.add_argument("--out", default=None)
    ap.add_argument("paths", nargs="+")
    args = ap.parse_args()
    out = args.out or tempfile.mkdtemp(prefix="lh-")
    os.makedirs(out, exist_ok=True)
    forms = ["mobile", "desktop"] if args.form == "both" else [args.form]
    for path in args.paths:
        for form in forms:
            res = []
            for i in range(args.runs):
                name = (path.strip("/").replace("/", "_") or "home") + f"-{form}-{i}.json"
                try:
                    res.append(run_once(args.base + path, form, os.path.join(out, name)))
                except Exception as e:  # noqa: BLE001
                    print(f"{path} {form} run {i} failed: {e}", file=sys.stderr)
            if not res:
                continue
            med = lambda k: statistics.median(r[k] for r in res)  # noqa: E731
            print(
                f"{form:7} {path:52} score {med('score'):>5.0f}  LCP {med('lcp'):.2f}s  "
                f"TBT {med('tbt'):>5.0f}ms  CLS {med('cls'):.3f}  FCP {med('fcp'):.2f}s  "
                f"SI {med('si'):.2f}s  lcp-el {res[0]['lcp_el']}",
                flush=True,
            )


if __name__ == "__main__":
    main()
