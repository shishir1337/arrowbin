"""CSS rule usage per page via CDP (what Lighthouse's unused-css-rules measures).

python -I cssuse.py --base URL [--desktop] [--dump DIR] path...
Prints, per page and stylesheet: raw size and used share. With --dump, writes
the unused rule texts per stylesheet so dead CSS can be traced to its source.
"""
import argparse
import os
import time

from playwright.sync_api import sync_playwright


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", required=True)
    ap.add_argument("--desktop", action="store_true")
    ap.add_argument("--dump", default=None)
    ap.add_argument("paths", nargs="+")
    a = ap.parse_args()
    with sync_playwright() as p:
        b = p.chromium.launch()
        if a.desktop:
            ctx = b.new_context(viewport={"width": 1350, "height": 940})
        else:
            ctx = b.new_context(viewport={"width": 412, "height": 823}, device_scale_factor=1.75,
                                is_mobile=True, has_touch=True)
        totals = {}
        for path in a.paths:
            page = ctx.new_page()
            cdp = ctx.new_cdp_session(page)
            sheets = {}
            cdp.on("CSS.styleSheetAdded", lambda e: sheets.__setitem__(e["header"]["styleSheetId"], e["header"]))
            cdp.send("DOM.enable")
            cdp.send("CSS.enable")
            cdp.send("CSS.startRuleUsageTracking")
            page.goto(a.base + path, wait_until="load")
            time.sleep(4)
            usage = cdp.send("CSS.stopRuleUsageTracking")["ruleUsage"]
            per = {}
            raw = {}
            for r in usage:
                raw.setdefault(r["styleSheetId"], {})[(r["startOffset"], r["endOffset"])] = (
                    raw.get(r["styleSheetId"], {}).get((r["startOffset"], r["endOffset"]), False) or r["used"])
            for sid, rules in raw.items():
                # Leaf rules only: drop any range that contains another range.
                spans = sorted(rules)
                leaves = [sp for i, sp in enumerate(spans)
                          if not any(o != sp and sp[0] <= o[0] and o[1] <= sp[1] for o in spans[i:i + 400])]
                used = sum(e - s0 for s0, e in leaves if rules[(s0, e)])
                per[sid] = [used, [sp for sp in leaves if not rules[sp]]]
            print(f"== {path}")
            for sid, h in sheets.items():
                if h.get("origin") != "regular":
                    continue
                text = cdp.send("CSS.getStyleSheetText", {"styleSheetId": sid})["text"]
                used = per.get(sid, [0, []])[0]
                name = (h.get("sourceURL") or "inline").split("/")[-1]
                print(f"   {name:30s} {len(text)/1024:7.1f} KiB  used {used/1024:6.1f} KiB ({used/len(text)*100 if text else 0:4.1f}%)")
                totals.setdefault(name, []).append(used / len(text) if text else 0)
                if a.dump:
                    os.makedirs(a.dump, exist_ok=True)
                    with open(os.path.join(a.dump, f"{path.strip('/').replace('/', '_') or 'home'}--{name}.unused.css"), "w", encoding="utf8") as f:
                        for s0, e0 in per.get(sid, [0, []])[1]:
                            f.write(text[s0:e0].strip() + "\n")
            page.close()
        b.close()


if __name__ == "__main__":
    main()
