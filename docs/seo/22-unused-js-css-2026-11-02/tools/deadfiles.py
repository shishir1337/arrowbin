"""List files under src/ that no Next.js route file (src/app/**) or src/proxy.ts reaches."""
import os
import re
import sys

root = sys.argv[1] if len(sys.argv) > 1 else "."
os.chdir(root)
files = []
for d, _, fs in os.walk("src"):
    for f in fs:
        if f.endswith((".ts", ".tsx", ".js", ".mjs", ".css", ".json")):
            files.append(os.path.join(d, f).replace(os.sep, "/"))
fileset = set(files)


def resolve(spec, frm):
    if spec.startswith("@/"):
        base = "src/" + spec[2:]
    elif spec.startswith("."):
        base = os.path.normpath(os.path.join(os.path.dirname(frm), spec)).replace(os.sep, "/")
    else:
        return None
    for c in [base, base + ".ts", base + ".tsx", base + ".js", base + ".mjs", base + ".json",
              base + "/index.ts", base + "/index.tsx"]:
        if c in fileset:
            return c
    return "MISSING:" + base


pat = re.compile(r"""(?:from\s+|import\s*\(\s*|import\s+|require\s*\(\s*)["']([^"']+)["']""")
cssimp = re.compile(r"""@import\s+["']([^"']+)["']""")
edges = {}
for f in files:
    s = open(f, encoding="utf8").read()
    specs = pat.findall(s) + (cssimp.findall(s) if f.endswith(".css") else [])
    edges[f] = [r for r in (resolve(x, f) for x in specs) if r]
entries = [f for f in files if f.startswith("src/app/")] + ["src/proxy.ts"]
seen = set()
stack = list(entries)
while stack:
    f = stack.pop()
    if f in seen:
        continue
    seen.add(f)
    for t in edges.get(f, []):
        if t.startswith("MISSING"):
            print("missing", t, "from", f)
            continue
        stack.append(t)
for f in sorted(fileset - seen):
    print("UNREACHED", f, os.path.getsize(f))
