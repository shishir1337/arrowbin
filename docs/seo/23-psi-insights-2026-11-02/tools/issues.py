"""List what PageSpeed would show as problems in Lighthouse JSON reports.

python -I issues.py report.json...

Prints scores and metrics, then every performance audit that is not passing
(insights, diagnostics), with its display value and the top items.
"""
import json
import sys

SKIP = {"notApplicable", "manual"}


def items(a, n=6):
    d = a.get("details") or {}
    out = []
    if d.get("type") == "list":
        for sub in d.get("items", []):
            out += items({"details": sub}, n)
        return out[:n]
    for it in (d.get("items") or [])[:n]:
        if isinstance(it, dict):
            url = it.get("url") or it.get("source", {}).get("url") if isinstance(it.get("source"), dict) else it.get("url")
            bits = [str(url or it.get("source") or it.get("node", {}).get("snippet", "") or it.get("groupLabel") or it.get("group") or it.get("label") or "")[:110]]
            for k in ("wastedBytes", "wastedMs", "totalBytes", "duration", "reflowTime", "total", "scriptParseCompile"):
                if k in it and isinstance(it[k], (int, float)):
                    bits.append(f"{k}={round(it[k])}")
            out.append(" ".join(bits))
    return out


for path in sys.argv[1:]:
    d = json.load(open(path, encoding="utf8"))
    a = d["audits"]
    sc = {k: round((v["score"] or 0) * 100) for k, v in d["categories"].items()}
    m = {k: a[k]["displayValue"] for k in ("first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index") if k in a}
    print(f"\n=== {d['finalDisplayedUrl']} [{d['configSettings']['formFactor']}] {sc} {m}")
    perf = d["categories"].get("performance")
    if not perf:
        continue
    for ref in perf["auditRefs"]:
        if ref.get("group") in ("metrics", "hidden"):
            continue
        au = a[ref["id"]]
        if au["scoreDisplayMode"] in SKIP:
            continue
        s = au["score"]
        bad = (s is not None and s < 0.9) or (au["scoreDisplayMode"] == "informative" and ref.get("group") == "insights" and False)
        if not bad:
            continue
        print(f"  - {ref['id']} score={s} {au.get('displayValue', '')}")
        for line in items(au):
            print(f"      {line}")
