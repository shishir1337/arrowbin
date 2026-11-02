"""Find Tailwind utilities generated only because a word appears in content or comments.

python -I junkutil.py REPO CSSFILE
For every class selector in the utilities layer, look for the class token in
src/ code with comments stripped and src/lib/posts excluded. Classes found
nowhere there were generated from prose, comments or data alone.
"""
import glob
import os
import re
import sys

repo, cssfile = sys.argv[1], sys.argv[2]
css = open(cssfile, encoding="utf8").read()
start = css.index("@layer utilities{")


def unescape(sel):
    return re.sub(r"\\(.)", r"\1", sel)


# class tokens in selectors: .foo\:bar  (escaped chars allowed)
tokens = set()
for m in re.finditer(r"\.((?:\\.|[\w-])+)", css[start:]):
    tokens.add(unescape(m.group(1)))

code = []
content = []
for f in glob.glob(os.path.join(repo, "src", "**", "*.*"), recursive=True):
    if not f.endswith((".ts", ".tsx")):
        continue
    s = open(f, encoding="utf8").read()
    norm = f.replace(os.sep, "/")
    if "/src/lib/posts/" in norm:
        content.append(s)
        continue
    # strip block and line comments (rough: good enough for class tokens)
    s = re.sub(r"/\*.*?\*/", " ", s, flags=re.S)
    s = re.sub(r"(^|[^:\"'`])//[^\n]*", r"\1 ", s)
    code.append(s)
code = "\n".join(code)
content = "\n".join(content)

boundary = r"(?<![\w:/\[\]-]){}(?![\w-])"
junk = []
for t in sorted(tokens):
    if re.search(boundary.format(re.escape(t)), code):
        continue
    where = "posts" if re.search(boundary.format(re.escape(t)), content) else "comments/elsewhere"
    junk.append((t, where))

size = 0
for t, where in junk:
    esc = re.escape(t).replace("\\", "\\\\")
    print(f"{where:20s} {t}")
print(len(junk), "of", len(tokens))
