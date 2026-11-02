"""Lighthouse unused JS / CSS report per page.

python -I unused.py --base http://localhost:3100 --out DIR [--form mobile|desktop] [--psi] path...

Prints, per page: the unused-javascript and unused-css-rules audit result (what
PageSpeed shows), then every script and stylesheet with its transfer size and
unused share, from script-treemap-data and the raw CSS usage.
"""
import argparse
import json
import os
import subprocess
import sys

LH = r"C:/Users/amaiz/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js"


def run(url, form, out, psi):
    cmd = ["node", LH, url, "--quiet", "--only-categories=performance",
           f"--chrome-flags=--headless=new{' --disable-gpu' if psi else ''}",
           "--output=json", f"--output-path={out}"]
    if form == "desktop":
        cmd.append("--preset=desktop")
    if psi:
        cmd.append(f"--throttling.cpuSlowdownMultiplier={4 if form == 'desktop' else 5}")
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=300)
    with open(out, encoding="utf8") as f:
        return json.load(f)


def short(u):
    return u.split("/_next/static/")[-1] if "/_next/static/" in u else u


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--form", default="mobile")
    ap.add_argument("--psi", action="store_true")
    ap.add_argument("--quiet", action="store_true", help="audit lines only")
    ap.add_argument("paths", nargs="+")
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    summary = {}
    for p in a.paths:
        name = p.strip("/").replace("/", "_") or "home"
        d = run(a.base + p, a.form, os.path.join(a.out, f"{name}-{a.form}.json"), a.psi)
        au = d["audits"]
        perf = round((d["categories"]["performance"]["score"] or 0) * 100)
        uj, uc = au.get("unused-javascript", {}), au.get("unused-css-rules", {})
        print(f"\n== {p}  perf {perf}  | unused-js: {uj.get('displayValue') or 'pass'} | unused-css: {uc.get('displayValue') or 'pass'}")
        for k, aud in (("JS", uj), ("CSS", uc)):
            for it in (aud.get("details") or {}).get("items", []):
                print(f"   FLAG {k} {short(it['url'])}: total {it['totalBytes']/1024:.1f} KiB, unused {it['wastedBytes']/1024:.1f} KiB ({it.get('wastedPercent', 0):.0f}%)")
        js_total = js_unused = 0
        nodes = (au.get("script-treemap-data", {}).get("details") or {}).get("nodes", [])
        rows = []
        for n in nodes:
            rb, ub = n.get("resourceBytes", 0), n.get("unusedBytes", 0)
            js_total += rb
            js_unused += ub
            rows.append((rb, ub, n["name"]))
        css_rows = []
        for it in (au.get("network-requests", {}).get("details") or {}).get("items", []):
            if it.get("resourceType") == "Stylesheet":
                css_rows.append((it.get("transferSize", 0), it.get("resourceSize", 0), it["url"]))
        summary[p] = {"perf": perf, "js_total": js_total, "js_unused": js_unused,
                      "uj": uj.get("displayValue") or "pass", "uc": uc.get("displayValue") or "pass",
                      "css": sum(r[1] for r in css_rows)}
        if a.quiet:
            continue
        print(f"   JS raw total {js_total/1024:.1f} KiB, unused {js_unused/1024:.1f} KiB")
        for rb, ub, nm in sorted(rows, reverse=True):
            if rb > 2048:
                print(f"     {rb/1024:7.1f} KiB raw  {ub/1024:6.1f} unused ({(ub/rb*100) if rb else 0:3.0f}%)  {short(nm)}")
        for tb, rb, u in css_rows:
            print(f"     CSS {rb/1024:7.1f} KiB raw  {tb/1024:5.1f} KiB transfer  {short(u)}")
    print("\nSUMMARY")
    for p, s in summary.items():
        print(f"  {p:55s} perf {s['perf']:3d}  js {s['js_total']/1024:6.1f} KiB raw / {s['js_unused']/1024:6.1f} unused  css {s['css']/1024:6.1f} KiB raw | {s['uj']} | {s['uc']}")


if __name__ == "__main__":
    main()
