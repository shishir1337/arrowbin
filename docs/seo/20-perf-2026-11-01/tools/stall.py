"""Detect Chrome's first-paint stall: Lighthouse mobile (5x CPU, no GPU) with observed FCP per run.

python -I stall.py BASE OUTDIR RUNS path...

Point BASE at delayproxy.py (http://localhost:3401) to mimic live-site timing: the
stall (first paint at about 1.4 s or 2.4 s although the page has loaded) did not
reproduce against a bare local server. A run has stalled when obsFCP > obsLoad.
"""
import sys, json, os, subprocess
LH = r"C:/Users/amaiz/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js"
base, out, runs = sys.argv[1], sys.argv[2], int(sys.argv[3])
os.makedirs(out, exist_ok=True)
for path in sys.argv[4:]:
    res = []
    for i in range(runs):
        f = os.path.join(out, (path.strip("/").replace("/", "_") or "home") + f"-{i}.json")
        subprocess.run(["node", LH, base + path, "--quiet", "--only-categories=performance", "--throttling.cpuSlowdownMultiplier=5",
                        "--chrome-flags=--headless=new --disable-gpu", "--output=json", f"--output-path={f}"],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=300)
        d = json.load(open(f, encoding="utf8")); m = d["audits"]["metrics"]["details"]["items"][0]
        res.append((round(m["observedFirstContentfulPaint"]), round(m["observedLoad"]), round(d["categories"]["performance"]["score"] * 100)))
    print(f"{path:30} (obsFCP, obsLoad, score): {res}", flush=True)
