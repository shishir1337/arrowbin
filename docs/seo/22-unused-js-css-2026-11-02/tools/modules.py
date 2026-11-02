"""Per-module unused JS from Lighthouse script-treemap-data (needs source maps).

python -I modules.py report.json [report.json ...]
Prints, per report: each script with its modules (resourceBytes, unusedBytes),
then a cross-page table of modules by unused bytes.
"""
import collections
import json
import re
import sys


def nice(p):
    p = re.sub(r".*node_modules/\.pnpm/[^/]+/node_modules/", "npm:", p)
    p = re.sub(r"^.*?/src/", "src/", p)
    return p


agg = collections.defaultdict(lambda: [0, 0, 0])
for path in sys.argv[1:]:
    d = json.load(open(path, encoding="utf8"))
    nodes = (d["audits"].get("script-treemap-data", {}).get("details") or {}).get("nodes", [])
    print(f"\n#### {d['finalDisplayedUrl']}")
    for n in sorted(nodes, key=lambda n: -n.get("resourceBytes", 0)):
        rb, ub = n.get("resourceBytes", 0), n.get("unusedBytes", 0)
        if rb < 3000 or "/_next/static/" not in n["name"]:
            continue
        print(f"  {n['name'].split('/')[-1]}  {rb/1024:.1f} KiB raw, {ub/1024:.1f} unused")
        kids = []

        def walk(node, prefix=""):
            for c in node.get("children", []) or []:
                name = prefix + "/" + c["name"] if prefix else c["name"]
                if c.get("children"):
                    walk(c, name)
                else:
                    kids.append((c.get("resourceBytes", 0), c.get("unusedBytes", 0), name))

        walk(n)
        for krb, kub, nm in sorted(kids, reverse=True)[:12]:
            if krb > 1500:
                print(f"      {krb/1024:6.1f} raw {kub/1024:6.1f} unused ({kub/krb*100 if krb else 0:3.0f}%)  {nice(nm)}")
        for krb, kub, nm in kids:
            a = agg[nice(nm)]
            a[0] += krb
            a[1] += kub
            a[2] += 1

print("\n#### modules by total unused bytes across pages (raw)")
for nm, (rb, ub, cnt) in sorted(agg.items(), key=lambda kv: -kv[1][1])[:45]:
    print(f"  {ub/1024/cnt:6.1f} KiB unused/page of {rb/1024/cnt:6.1f} ({ub/rb*100 if rb else 0:3.0f}%) on {cnt:2d} pages  {nm}")
