"""Developer pay by country from the Stack Overflow Developer Survey public data.

Builds the CSV behind /blog/developer-salaries-by-country. Standard library only.
Run it with an isolated interpreter and keep the downloaded survey files in their
own folder (they are untrusted data):

    python -I salary_by_country.py \
        --wave 2026=<folder>/survey_results_public.csv \
        --wave 2025=<folder>/results.csv \
        --out public/blog/developer-salaries-by-country/developer-salaries-by-country-2026.csv

Data: Stack Overflow Developer Survey (Stack Exchange Inc.), public results files
from https://github.com/StackExchange/Survey/tree/main/packages/archive , licensed
under the Open Database License (ODbL) 1.0, cell contents under the Database
Contents License (DbCL) 1.0. The output CSV is a derived database and stays under
ODbL 1.0 with the same attribution.

Method (keep the post's methodology section in sync with these constants):
- Population: respondents who are developers by profession (2025: MainBranch
  "I am a developer by profession"; 2026: CodeMain "I create code as a primary
  part of my job") and whose Employment is "Employed" (not freelance or
  self-employed). Neither wave separates full-time from part-time employees.
- Pay: ConvertedCompYearly, the survey's own conversion of total annual
  compensation to US dollars. Values outside MIN_USD..MAX_USD are dropped as
  likely entry errors (monthly pay typed as yearly, wrong currency, joke values).
- Waves are pooled: each respondent counts once in the wave they answered.
- A country median is published only when the pooled n is at least MIN_N.
  Per-wave medians need MIN_N in that wave. Experience-band medians (WorkExp,
  years working professionally) need MIN_N_BAND in the band.
- Medians and quartiles are rounded to the nearest whole dollar.

Re-run yearly: add the new wave with another --wave flag (and its filter in
WAVES if the questionnaire changed), drop the oldest one, and update the post.
"""

from __future__ import annotations

import argparse
import csv
import statistics
import sys
from collections import defaultdict

MIN_USD = 1_000
MAX_USD = 1_000_000
MIN_N = 100
MIN_N_BAND = 50
BANDS = (("0_4", 0, 4), ("5_9", 5, 9), ("10plus", 10, 99))

# How to pick professional developers in each wave's questionnaire.
WAVES = {
    "2025": {"col": "MainBranch", "value": "I am a developer by profession", "local": "CompTotal"},
    "2026": {"col": "CodeMain", "value": "I create code as a primary part of my job", "local": "Compensation"},
}

# Countries the post always reports on, even when they miss the threshold.
ALWAYS = [
    "Bangladesh", "India", "Pakistan", "Vietnam", "Philippines", "Indonesia",
    "Sri Lanka", "Nepal", "Poland", "Ukraine", "Romania", "Germany",
    "United Kingdom", "United States", "Canada", "Australia", "Brazil",
    "Argentina", "Mexico", "Egypt", "Nigeria", "Turkey",
]

NAMES = {
    "United States of America": "United States",
    "United Kingdom of Great Britain and Northern Ireland": "United Kingdom",
    "Viet Nam": "Vietnam",
    "Russian Federation": "Russia",
    "Iran, Islamic Republic of...": "Iran",
    "Republic of Korea": "South Korea",
    "Netherlands": "Netherlands",
}

REGIONS = {
    "United States": "North America", "Canada": "North America",
    "Germany": "Western Europe", "United Kingdom": "Western Europe",
    "France": "Western Europe", "Netherlands": "Western Europe",
    "Spain": "Southern Europe", "Italy": "Southern Europe",
    "Switzerland": "Western Europe", "Austria": "Western Europe",
    "Belgium": "Western Europe", "Ireland": "Western Europe",
    "Portugal": "Southern Europe", "Sweden": "Northern Europe",
    "Denmark": "Northern Europe", "Norway": "Northern Europe",
    "Finland": "Northern Europe",
    "Poland": "Eastern Europe", "Ukraine": "Eastern Europe",
    "Romania": "Eastern Europe", "Czech Republic": "Eastern Europe",
    "Hungary": "Eastern Europe", "Bulgaria": "Eastern Europe",
    "Russia": "Eastern Europe", "Serbia": "Eastern Europe",
    "Greece": "Southern Europe", "Turkey": "Middle East",
    "Israel": "Middle East", "Egypt": "Africa", "Nigeria": "Africa",
    "South Africa": "Africa", "Kenya": "Africa",
    "Brazil": "Latin America", "Mexico": "Latin America",
    "Argentina": "Latin America", "Colombia": "Latin America",
    "Chile": "Latin America",
    "India": "South Asia", "Pakistan": "South Asia", "Bangladesh": "South Asia",
    "Sri Lanka": "South Asia", "Nepal": "South Asia",
    "Vietnam": "Southeast Asia", "Philippines": "Southeast Asia",
    "Indonesia": "Southeast Asia", "Australia": "Oceania",
    "New Zealand": "Oceania", "Japan": "East Asia", "China": "East Asia",
}


def to_int(value: str) -> int | None:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def rounded(x: float) -> int:
    return int(x + 0.5)


def load(wave: str, path: str):
    spec = WAVES[wave]
    csv.field_size_limit(10**9)
    kept, dropped = [], 0
    with open(path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if row[spec["col"]] != spec["value"] or row["Employment"] != "Employed":
                continue
            usd = to_int(row["ConvertedCompYearly"])
            if usd is None:
                continue
            if not MIN_USD <= usd <= MAX_USD:
                dropped += 1
                continue
            country = NAMES.get(row["Country"], row["Country"])
            kept.append(
                {
                    "wave": wave,
                    "country": country,
                    "usd": usd,
                    "exp": to_int(row.get("WorkExp", "")),
                    "currency": row.get("Currency", ""),
                    "local": to_int(row.get(spec["local"], "")),
                }
            )
    return kept, dropped


def med(values):
    return rounded(statistics.median(values)) if values else None


def quartiles(values):
    q = statistics.quantiles(values, n=4, method="inclusive")
    return rounded(q[0]), rounded(q[2])


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--wave", action="append", required=True, help="YEAR=path/to/results.csv")
    ap.add_argument("--out", required=True)
    args = ap.parse_args()

    rows, waves = [], []
    for item in args.wave:
        wave, path = item.split("=", 1)
        kept, dropped = load(wave, path)
        waves.append(wave)
        rows += kept
        print(f"wave {wave}: kept {len(kept)} respondents, dropped {dropped} outside ${MIN_USD:,}..${MAX_USD:,}")

    by_country = defaultdict(list)
    for r in rows:
        by_country[r["country"]].append(r)

    out = []
    for country, rs in by_country.items():
        n = len(rs)
        if n < MIN_N and country not in ALWAYS:
            continue
        usd = [r["usd"] for r in rs]
        rec = {"country": country, "region": REGIONS.get(country, "Other"), "respondents_n": n}
        if n >= MIN_N:
            rec["median_usd"] = med(usd)
            rec["p25_usd"], rec["p75_usd"] = quartiles(usd)
            rec["note"] = ""
        else:
            rec["median_usd"] = rec["p25_usd"] = rec["p75_usd"] = ""
            rec["note"] = f"below {MIN_N}-respondent threshold, no median published"
        for w in sorted(waves):
            wv = [r["usd"] for r in rs if r["wave"] == w]
            rec[f"n_{w}_wave"] = len(wv)
            rec[f"median_usd_{w}_wave"] = med(wv) if len(wv) >= MIN_N else ""
        for name, lo, hi in BANDS:
            bv = [r["usd"] for r in rs if r["exp"] is not None and lo <= r["exp"] <= hi]
            rec[f"n_{name}_years"] = len(bv)
            ok = n >= MIN_N and len(bv) >= MIN_N_BAND
            rec[f"median_usd_{name}_years"] = med(bv) if ok else ""
        out.append(rec)

    out.sort(key=lambda r: (r["median_usd"] == "", -(r["median_usd"] or 0), -r["respondents_n"]))
    fields = ["country", "region", "respondents_n", "median_usd", "p25_usd", "p75_usd"]
    fields += [f"{p}_{w}_wave" for w in sorted(waves) for p in ("n", "median_usd")]
    fields += [f"{p}_{b[0]}_years" for b in BANDS for p in ("n", "median_usd")]
    fields += ["note"]
    with open(args.out, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, lineterminator="\n")
        w.writeheader()
        w.writerows(out)
    print(f"wrote {len(out)} rows to {args.out}")

    # Console summary used for the post and its cross-checks.
    for rec in out:
        bands = " ".join(f"{b[0]}:{rec[f'median_usd_{b[0]}_years'] or '-'}(n={rec[f'n_{b[0]}_years']})" for b in BANDS)
        print(f"  {rec['country']:<16} {rec['region']:<16} n={rec['respondents_n']:<5} median={rec['median_usd']!s:<8} "
              f"p25={rec['p25_usd']!s:<7} p75={rec['p75_usd']!s:<7} {bands}")
    ok = sorted([r for r in out if r["median_usd"] != ""], key=lambda r: -r["median_usd"])
    print(f"countries with a published median: {len(ok)}; total kept respondents: {len(rows)}")
    for region in sorted({r["region"] for r in ok}):
        meds = [(r["median_usd"], r["country"]) for r in ok if r["region"] == region]
        print(f"  region {region:<16} {min(meds)} .. {max(meds)}")
    for country, code in (("United Kingdom", "GBP"), ("United States", "USD")):
        local = [r["local"] for r in by_country[country] if r["currency"].startswith(code) and r["local"]]
        print(f"  {country} in {code} (as typed, same USD bounds applied): n={len(local)} median={med(local)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
