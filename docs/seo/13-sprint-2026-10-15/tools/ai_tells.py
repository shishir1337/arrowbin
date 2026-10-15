"""Lint a blog post for AI-writing tells and rhythm problems.

Usage:  python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py src/lib/posts/<slug>.ts [more files]

Reads the prose out of a post data file (every double-quoted string longer than
40 characters, plus template strings), then reports:
  - em dashes (hard fail), banned AI vocabulary, formula phrases
  - sentence-length spread ("burstiness"): human prose mixes short and long
  - share of sentences opening with the same word, "X, Y, and Z" triplet rate
  - contraction rate (very low reads stiff)
Exit code 1 if any hard fail (em dash, chatbot artifact) is found.
Patterns adapted from the Wikipedia "Signs of AI writing" detectors in the
ai-anti-patterns skill, plus our own house list.
"""
import re
import statistics
import sys
from collections import Counter

BANNED_WORDS = [
    "delve", "delves", "delving", "tapestry", "realm", "pivotal", "crucial",
    "robust", "seamless", "seamlessly", "cutting-edge", "state-of-the-art",
    "game-changer", "game changer", "transformative", "revolutionary",
    "groundbreaking", "unparalleled", "ever-evolving", "holistic", "synergy",
    "testament", "beacon", "embark", "harness", "unlock", "unlocks", "elevate",
    "empower", "empowers", "foster", "fosters", "bolster", "underscore",
    "underscores", "showcase", "showcases", "leverage", "leverages",
    "leveraging", "navigate the", "landscape", "meticulous", "meticulously",
    "paramount", "furthermore", "moreover", "additionally", "ultimately",
    "in conclusion", "in summary", "it's important to note", "it is important to note",
    "it's worth noting", "it is worth noting", "let's dive", "dive in", "deep dive",
    "in today's", "fast-paced", "digital age", "without further ado",
    "at the end of the day", "plays a vital role", "plays a crucial role",
    "plays a key role", "stands as", "serves as a", "a testament", "nestled",
    "in the heart of", "boasts", "thriving", "vibrant", "intricate", "intricacies",
    "comprehensive guide", "look no further", "rest assured", "whether you're",
]
FORMULA = [
    (r"\bnot just\b[^.]{0,80}\bbut\b", "'not just X but Y'"),
    (r"\bnot only\b[^.]{0,80}\bbut\b", "'not only X but also Y'"),
    (r"\bit'?s not (about|a|an|the|just)\b[^.]{0,60}[,;] it'?s\b", "'it's not X, it's Y'"),
    (r"\bdespite (these |the )?(challenges|obstacles|hurdles)\b", "'despite challenges'"),
    (r"\bThe (result|answer|catch|kicker|truth)\?", "self-answered question"),
    (r"\b(experts|studies|research) (say|show|suggest)s?\b", "vague attribution"),
    (r"\bin (an|the) (ever|increasingly)[- ]\w+ (world|landscape|market)\b", "stock opener"),
    (r"\bhere'?s (the thing|why|what|how)\b", "'here's the thing/why'"),
    (r"\bspoiler( alert)?:", "'spoiler:'"),
    (r"\bthat said,", "'that said,' (use sparingly)"),
]
ARTIFACTS = [r"turn\d+search\d+", r"oaicite", r"contentReference", r"as an ai language model",
             r"i hope this helps", r"feel free to (ask|reach out)"]


def string_literals(src: str):
    """Every string literal in source order, whatever its quote style (Biome
    switches strings that contain double quotes to single quotes)."""
    out, i, n = [], 0, len(src)
    while i < n:
        c = src[i]
        if c == "/" and src[i:i + 2] == "//":
            i = src.find(chr(10), i)
            i = n if i < 0 else i
            continue
        if c == "/" and src[i:i + 2] == "/*":
            i = src.find("*/", i + 2)
            i = n if i < 0 else i + 2
            continue
        if c in "\"'`":
            j, buf = i + 1, []
            while j < n and src[j] != c:
                if src[j] == "\\" and j + 1 < n:
                    buf.append(src[j + 1])
                    j += 2
                    continue
                buf.append(src[j])
                j += 1
            out.append("".join(buf))
            i = j + 1
            continue
        i += 1
    return out


def prose(src: str) -> str:
    strings = [s for s in string_literals(src) if len(s) >= 40]
    text = chr(10).join(strings)
    return re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)  # keep link labels only


def sentences(text: str):
    out = []
    for chunk in text.splitlines():
        parts = re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\"'(])", chunk)
        out += [p.strip() for p in parts if len(p.split()) >= 2]
    return out


def lint(path: str) -> int:
    src = open(path, encoding="utf8").read()
    text = prose(src)
    low = text.lower()
    hard = 0
    print(f"\n=== {path}")
    em = src.count("\u2014") + src.count("&mdash;")
    if em:
        hard += 1
        print(f"  HARD  em dashes: {em}")
    for a in ARTIFACTS:
        if re.search(a, low):
            hard += 1
            print(f"  HARD  artifact: {a}")
    hits = Counter()
    for w in BANNED_WORDS:
        n = len(re.findall(r"(?<![a-z])" + re.escape(w) + r"(?![a-z])", low))
        if n:
            hits[w] = n
    if hits:
        print("  WARN  banned words: " + ", ".join(f"{w} x{n}" for w, n in hits.most_common()))
    for rx, name in FORMULA:
        n = len(re.findall(rx, text, flags=re.I))
        if n:
            print(f"  WARN  formula {name}: {n}")
    sents = sentences(text)
    if sents:
        lens = [len(s.split()) for s in sents]
        words = sum(lens)
        sd = statistics.pstdev(lens)
        mean = statistics.mean(lens)
        short = sum(1 for n in lens if n <= 8) / len(lens)
        long_ = sum(1 for n in lens if n >= 28) / len(lens)
        openers = Counter(s.split()[0].lower().strip('"\'(') for s in sents)
        top_open, top_n = openers.most_common(1)[0]
        triplets = len(re.findall(r"\b\w+(?: \w+)?, \w+(?: \w+)?,? and \w+", text))
        contractions = len(re.findall(r"\b\w+'(s|t|re|ve|ll|d|m)\b", text, flags=re.I))
        print(f"  INFO  words~{words} sentences={len(sents)} mean={mean:.1f} sd={sd:.1f} "
              f"short(<=8)={short:.0%} long(>=28)={long_:.0%}")
        print(f"  INFO  top opener '{top_open}' {top_n / len(sents):.0%}, triplets={triplets} "
              f"({triplets / max(1, words) * 1000:.1f}/1k words), contractions={contractions} "
              f"({contractions / max(1, words) * 1000:.1f}/1k words)")
        if sd < 7:
            print("  WARN  low sentence-length spread (sd < 7): vary rhythm, add short and long sentences")
        if short < 0.12:
            print("  WARN  few short sentences (<12% at 8 words or fewer)")
        if top_n / len(sents) > 0.08 and top_open in ("the", "this", "it", "you", "if", "and", "but", "so"):
            print(f"  WARN  many sentences start with '{top_open}'")
        if triplets / max(1, words) * 1000 > 4:
            print("  WARN  lots of 'X, Y and Z' triplets (rule of three)")
        if contractions / max(1, words) * 1000 < 4:
            print("  WARN  very few contractions; reads stiff")
    return hard


if __name__ == "__main__":
    total = sum(lint(p) for p in sys.argv[1:])
    sys.exit(1 if total else 0)
