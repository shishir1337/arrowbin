"""Service-page boilerplate share (audit finding M-8, content.md).

Method, as in the 14 Oct audit: take the visible text of each of the 8 service
pages between the breadcrumb and the footer, split it into lines the way a
browser's innerText does, keep lines longer than 25 characters, and count a line
as boilerplate when the same line appears on 3 or more of the 8 pages. Report the
share of lines and the share of words per page. Target: under 25%.

Usage (read-only; it only GETs pages from a server that is already running):
    python -I docs/seo/13-sprint-2026-10-15/tools/boilerplate_share.py \
        --base http://localhost:3002 [--save DIR] [--list]
    python -I .../boilerplate_share.py --dir DIR   # re-score saved HTML files

The innerText model is an approximation: block-level tags, Tailwind display
classes (desktop width: base, sm, md, lg and xl prefixes apply) and flex/grid
children start a new line; script, style, template, [hidden] and display:none
are skipped. It is close enough to compare before and after on the same pages.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

SLUGS = [
    "custom-software-development",
    "ecommerce-development",
    "mobile-app-development",
    "saas-product-engineering",
    "ui-ux-design",
    "ai-automation",
    "cloud-devops-hosting",
    "maintenance-support",
]

BLOCK_TAGS = {
    "address", "article", "aside", "blockquote", "details", "dialog", "dd",
    "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form",
    "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "li", "main", "nav",
    "ol", "p", "pre", "section", "table", "tr", "td", "th", "ul", "summary",
    "legend", "output", "caption",
}
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
    "param", "source", "track", "wbr",
}
SKIP_TAGS = {"script", "style", "template", "noscript", "title", "desc", "head"}
DISPLAY_TOKENS = {
    "block": "block", "inline-block": "block", "flex": "flexbox",
    "inline-flex": "flexbox", "grid": "flexbox", "inline-grid": "flexbox",
    "hidden": "none", "inline": "inline", "contents": "inline",
    "table": "block", "flow-root": "block", "list-item": "block",
}
PREFIX_ORDER = ["", "sm:", "md:", "lg:", "xl:"]


def tw_display(cls: str) -> str | None:
    """Desktop display from Tailwind classes (last applicable prefix wins)."""
    found: dict[str, str] = {}
    for tok in cls.split():
        for p in PREFIX_ORDER:
            if p and tok.startswith(p):
                rest = tok[len(p):]
            elif not p and ":" not in tok:
                rest = tok
            else:
                continue
            if rest in DISPLAY_TOKENS:
                found[p] = DISPLAY_TOKENS[rest]
    for p in reversed(PREFIX_ORDER):
        if p in found:
            return found[p]
    return None


class TextLines(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[dict] = []
        self.in_main = 0
        self.skip = 0
        self.buf: list[str] = []
        self.lines: list[str] = []

    def _flush(self) -> None:
        text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
        if text:
            self.lines.append(text)
        self.buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in VOID_TAGS:
            if tag in ("br", "hr") and self.in_main and not self.skip:
                self._flush()
            return
        parent_box = self.stack[-1]["box"] if self.stack else None
        disp = tw_display(a.get("class") or "")
        style = (a.get("style") or "").replace(" ", "")
        hidden = (
            "hidden" in a
            or disp == "none"
            or "display:none" in style
            or tag in SKIP_TAGS
            or (tag == "nav" and a.get("aria-label") == "Breadcrumb")
        )
        block = tag in BLOCK_TAGS or disp in ("block", "flexbox") or parent_box == "flexbox"
        if disp == "inline":
            block = False
        if tag == "main":
            self.in_main += 1
        frame = {"tag": tag, "skip": hidden, "block": block, "box": disp}
        self.stack.append(frame)
        if hidden:
            self.skip += 1
        if block and self.in_main and not self.skip:
            self._flush()

    def handle_startendtag(self, tag, attrs):
        if tag in VOID_TAGS:
            self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag):
        if tag in VOID_TAGS:
            return
        # Pop to the matching tag (tolerates sloppy nesting).
        idx = None
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i]["tag"] == tag:
                idx = i
                break
        if idx is None:
            return
        while len(self.stack) > idx:
            f = self.stack.pop()
            if f["block"] and self.in_main and not self.skip:
                self._flush()
            if f["skip"]:
                self.skip -= 1
            if f["tag"] == "main":
                self._flush()
                self.in_main -= 1

    def handle_data(self, data):
        if self.in_main and not self.skip:
            self.buf.append(data)


def page_lines(html: str) -> list[str]:
    p = TextLines()
    p.feed(html)
    p.close()
    return [ln for ln in p.lines if len(ln) > 25]


def fetch(base: str, slug: str) -> str:
    with urllib.request.urlopen(f"{base.rstrip('/')}/services/{slug}", timeout=120) as r:
        return r.read().decode("utf-8")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", help="server base URL, e.g. http://localhost:3002")
    ap.add_argument("--dir", help="read <slug>.html files from this folder instead")
    ap.add_argument("--save", help="save fetched HTML and lines JSON to this folder")
    ap.add_argument("--list", action="store_true", help="print the repeated lines")
    args = ap.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    if not args.base and not args.dir:
        ap.error("give --base or --dir")

    pages: dict[str, list[str]] = {}
    for slug in SLUGS:
        if args.dir:
            html = Path(args.dir, f"{slug}.html").read_text(encoding="utf-8")
        else:
            html = fetch(args.base, slug)
            if args.save:
                Path(args.save).mkdir(parents=True, exist_ok=True)
                Path(args.save, f"{slug}.html").write_text(html, encoding="utf-8")
        pages[slug] = page_lines(html)

    presence = Counter()
    for lines in pages.values():
        for ln in set(lines):
            presence[ln] += 1

    out = {}
    print(f"{'page':32} {'lines':>5} {'rep':>4} {'lines%':>7} {'words%':>7}")
    for slug, lines in pages.items():
        rep = [ln for ln in lines if presence[ln] >= 3]
        words = sum(len(ln.split()) for ln in lines)
        rep_words = sum(len(ln.split()) for ln in rep)
        lp = 100 * len(rep) / max(len(lines), 1)
        wp = 100 * rep_words / max(words, 1)
        out[slug] = {"lines": len(lines), "repeated": len(rep), "lines_pct": round(lp, 1), "words_pct": round(wp, 1)}
        print(f"{slug:32} {len(lines):5} {len(rep):4} {lp:6.1f}% {wp:6.1f}%")

    if args.list:
        print("\nLines on 3+ pages (count, text):")
        for ln, c in sorted(presence.items(), key=lambda kv: (-kv[1], kv[0])):
            if c >= 3:
                print(f"  {c}  {ln}")

    if args.save:
        Path(args.save, "lines.json").write_text(
            json.dumps({"scores": out, "pages": pages}, ensure_ascii=False, indent=1),
            encoding="utf-8",
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
