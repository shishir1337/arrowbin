"""
Assigns every keyword in 04-keywords/keyword-universe.csv to one target URL.

Rules are checked in order and the first match wins, so specific pages come
before broad ones. Keywords that are not buyer intent (people starting an
agency, job seekers, templates, definitions) are excluded first.
Re-run after editing the rules or the universe:
    python docs/seo/05-keyword-map/build_keyword_map.py
Outputs keyword-map.csv (one row per keyword) and page-targets.csv (one row per page).
"""

import csv
import re
from collections import defaultdict
from pathlib import Path

HERE = Path(__file__).parent
UNIVERSE = HERE.parent / "04-keywords" / "keyword-universe.csv"

COST = r"\b(costs?|prices?|pricing|budget|expensive|cheap|afford|affordable|how much)\b"

# (url, status, priority, primary_keyword, regex). Status: existing / new.
PAGES = [
    # 1. Market pages (most specific).
    ("/software-development-tampa-bay", "new", "P1", "software development company tampa",
     r"\b(tampa|st\.? ?pete|st\.? ?petersburg|clearwater|florida|fl)\b"),
    ("/ecommerce-website-development-bangladesh", "new", "P1",
     "ecommerce website development company in bangladesh",
     r"(e-?commerce|online shop|online store|shopify|woocommerce).*\b(bangladesh|dhaka|bd)\b"
     r"|\b(bangladesh|dhaka|bd)\b.*(e-?commerce|online shop|online store|shopify|woocommerce)"),
    ("/blog/app-development-cost-bangladesh", "new", "P1", "app development cost in bangladesh",
     COST + r".*\b(bangladesh|dhaka)\b|\b(bangladesh|dhaka)\b.*" + COST),
    ("/offshore-software-development-bangladesh", "new", "P1", "offshore software development bangladesh",
     r"\b(bangladesh|dhaka|bangladeshi|bd)\b"),
    # 2. Comparisons (before cost and pricing, so "x vs y pricing" lands here).
    ("/blog/shopify-vs-custom-ecommerce", "new", "P1", "shopify vs custom ecommerce website",
     r"\bshopify vs\b|\bvs shopify\b|\bwoocommerce vs\b|\bvs woocommerce\b|\bshopify or custom\b"),
    ("/blog/mvp-vs-prototype-vs-poc", "new", "P1", "mvp vs prototype",
     r"\bmvp\b.*\bvs\b|\bvs\b.*\bmvp\b|\bprototype vs\b|\bvs prototype\b|\bproof of concept\b|\bpoc\b"),
    ("/blog/staff-augmentation-vs-dedicated-team", "new", "P1", "staff augmentation vs dedicated team",
     r"augmentation.*\bvs\b|\bvs\b.*augmentation|\bdedicated team vs\b"),
    ("/blog/offshore-vs-nearshore-vs-onshore", "new", "P2", "offshore vs nearshore software development",
     r"\b(offshore|nearshore|onshore)\b.*\bvs\b|\bvs\b.*\b(offshore|nearshore|onshore)\b"),
    ("/blog/in-house-vs-outsourcing-software-development", "new", "P2",
     "in-house vs outsourcing software development",
     r"in[- ]?house.*\b(vs|or)\b|\b(vs|or)\b.*in[- ]?house|outsourc\w*.*\bvs\b"),
    ("/blog/fixed-price-vs-time-and-materials", "new", "P2", "fixed price vs time and materials",
     r"\bfixed (price|fee|bid)\b|\btime and materials?\b|\bt&m\b"),
    ("/blog/custom-software-vs-off-the-shelf", "new", "P2", "custom software vs off the shelf",
     r"off.the.shelf|\bbuild vs buy\b|\bcustom vs\b|\bno.?code vs\b|\bvs\b.*\bno.?code\b|\bbubble vs\b"),
    ("/blog/flutter-vs-react-native", "new", "P3", "flutter vs react native",
     r"\bflutter\b.*\bvs\b|\breact native\b.*\bvs\b|\bvs\b.*\b(flutter|react native)\b|native vs cross"),
    ("/blog/agency-vs-freelancer", "new", "P3", "freelancer vs agency",
     r"\b(freelancer|upwork|fiverr|toptal)\b.*\bvs\b|\bvs\b.*\b(freelancer|upwork|fiverr|toptal|agency)\b"),
    ("/blog/comparisons", "new", "P3", "(comparison backlog)",
     r"\bvs\.?\b|\bversus\b"),
    # 3. Tools and pricing.
    ("/tools/software-cost-calculator", "new", "P1", "software development cost calculator",
     r"\bcalculator\b|\bestimator\b|\bestimate\b"),
    ("/pricing", "new", "P1", "software development pricing",
     r"\b(pricing|price list|rates?|hourly|packages?|quote)\b"),
    # 4. Cost guides.
    ("/blog/mvp-development-cost", "new", "P1", "mvp development cost",
     r"\bmvp\b.*" + COST + r"|" + COST + r".*\bmvp\b"),
    ("/blog/saas-development-cost", "new", "P2", "saas development cost",
     r"\bsaas\b.*" + COST + r"|" + COST + r".*\bsaas\b"),
    ("/blog/ecommerce-website-cost", "new", "P2", "custom ecommerce website cost",
     r"(e-?commerce|online store|shopify)\b.*" + COST + r"|" + COST + r".*(e-?commerce|online store)"),
    ("/blog/web-app-development-cost", "new", "P2", "web app development cost",
     r"(web app|web application)\b.*" + COST + r"|" + COST + r".*(web app|web application)"),
    ("/blog/app-development-cost", "new", "P2", "app development cost",
     r"\b(apps?|mobile app|ios|android|flutter)\b.*" + COST + r"|" + COST + r".*\b(apps?)\b"),
    ("/blog/software-maintenance-cost", "new", "P3", "software maintenance cost",
     r"(maintenance|support|retainer)\b.*" + COST + r"|" + COST + r".*(maintenance|support)"),
    ("/blog/how-much-does-custom-software-development-cost", "existing", "P1",
     "how much does custom software development cost", COST),
    # 5. Timeline, MVP, hiring and engagement models.
    ("/blog/how-long-does-it-take-to-build-an-mvp", "existing", "P1", "how long does it take to build an mvp",
     r"\bhow long\b|\btimeline\b|\btime to (build|develop|make)\b"),
    ("/services/mvp-development", "new", "P2", "mvp development company",
     r"\bmvp\b|\bminimum viable\b|\bfor startups?\b|\bstartup (app|software|product|development|tech)\b"),
    ("/hire/nextjs-developers", "new", "P2", "hire next js developers",
     r"\bhire\b.*\bnext\.? ?js\b|\bnext\.? ?js developers?\b"),
    ("/hire/react-developers", "new", "P3", "hire react developers",
     r"\bhire\b.*\breact(js|\.js)?\b|\breact(js|\.js)? developers?\b"),
    ("/services/dedicated-development-team", "new", "P2", "dedicated development team",
     r"\bdedicated (team|developers?|development)\b|\bstaff augmentation\b|\bteam extension\b"
     r"|\bhire (dedicated|remote|offshore)\b"),
    ("/blog/software-development-outsourcing-guide", "new", "P2", "software development outsourcing",
     r"\boutsourc\w*|\boffshore\b|\bnearshore\b"),
    ("/blog/how-to-choose-a-software-development-company", "existing", "P1",
     "how to choose a software development company",
     r"\bhow to (choose|find|hire|select|vet|evaluate|pick)\b|\bquestions to ask\b|\bred flags\b|\bchecklist\b|\brfp\b"),
    # 6. Technology pages.
    ("/services/nextjs-development", "new", "P2", "nextjs development agency",
     r"\bnext\.? ?js\b|\bnextjs\b"),
    ("/services/web-application-development", "new", "P2", "web application development company",
     r"\bweb app\b|\bweb application\b|\breact(js|\.js)?\b|\bnode\.?js\b|\blaravel\b|\bdjango\b|\bprogressive web\b|\bpwa\b"),
    # 7. Industry and segment pages (only once there is proof to show).
    ("/blog/bangladesh-ecommerce-integrations", "new", "P2", "bkash payment gateway integration",
     r"\b(bkash|nagad|sslcommerz|rocket|pathao|steadfast|redx|f-?commerce)\b"),
    ("/services/custom-software-development#crm-erp", "existing", "P2", "custom crm development",
     r"\b(crm|erp|lms|learning management|inventory|pos)\b"),
    ("/industries", "new", "P3", "(industry backlog: fintech, healthcare, real estate, logistics, education)",
     r"\b(fintech|finance|financial|bank\w*|health\w*|medical|real estate|property|logistics|delivery|"
     r"education|edtech|school|restaurant|retail|fashion|agri\w*|agro|travel|insurance|legal)\b"),
    ("/custom-software-for-small-business", "new", "P2", "custom software development for small business",
     r"\bsmall business\b|\bsmb\b|\bsmall and medium\b"),
    # 8. Existing service pages.
    ("/services/ai-automation", "existing", "P1", "ai automation agency",
     r"\bai\b|artificial intelligence|\bchatbots?\b|\bllm\b|\bgpt\b|\bagents?\b|\bautomation\b|\bn8n\b|"
     r"\bzapier\b|\bmake\.com\b|\brag\b|machine learning|\bml\b"),
    ("/services/ecommerce-development", "existing", "P1", "ecommerce development company",
     r"e-?commerce|online store|\bshopify\b|\bwoocommerce\b|\bmagento\b|headless commerce|\bmarketplace\b"),
    ("/services/mobile-app-development", "existing", "P1", "mobile app development company",
     r"\bapps?\b|\bmobile\b|\bios\b|\bandroid\b|\bflutter\b|react native|\bswift\b|\bkotlin\b"),
    ("/services/saas-product-engineering", "existing", "P1", "saas development company",
     r"\bsaas\b|product engineering|product development|multi-?tenant|\bsubscription\b"),
    ("/services/ui-ux-design", "existing", "P1", "ui ux design agency",
     r"\bui\b|\bux\b|\bdesign\w*|\bfigma\b|\bprototyp\w*|\bwireframe\w*|\busability\b"),
    ("/services/cloud-devops-hosting", "existing", "P1", "devops consulting services",
     r"\bdevops\b|\bcloud\b|\baws\b|\bazure\b|\bgcp\b|\bvercel\b|\bhosting\b|\bkubernetes\b|\bdocker\b|"
     r"\bci/?cd\b|\bservers?\b|\bmigration\b"),
    ("/services/maintenance-support", "existing", "P1", "software maintenance and support services",
     r"\bmaintenance\b|\bsupport\b|\blegacy\b|\bmoderni[sz]\w*|\bupgrade\b|bug fix|\bretainer\b|\bsla\b"),
    ("/services/custom-software-development", "existing", "P1", "custom software development company",
     r"\bcustom\b.*\bsoftware\b|\bbespoke\b|\btailor\w*"),
    ("/services", "existing", "P1", "software development services",
     r"\b(software development|development|api development|integration) services\b"),
    ("/", "existing", "P1", "software development company",
     r"\bsoftware\b|\bdevelopers?\b|\bdevelopment (company|agency|firm|studio)\b|\bit (company|firm|services)\b|"
     r"\bweb development\b|\bwebsite development\b|\bdigital agency\b|\btech (company|partner)\b"),
]

# Not buyer intent: starting an agency, job seekers, students, DIY builders, definitions.
EXCLUDE = re.compile(
    r"\bhow to (start|become|build|make|create|open|run|learn)\b|\bjobs?\b|\bsalary\b|\bsalaries\b|\bcareers?\b|"
    r"\bcourses?\b|\binternships?\b|\bcertification\b|\btutorials?\b|\bfor beginners\b|\btemplates?\b|"
    r"\bwhat (is|are|does)\b(?!.*\b(costs?|prices?|rates?)\b)|\bmeaning\b|\bdefinition\b|\bexamples?\b|"
    r"\bpdf\b|\breddit\b|\bstartup ideas?\b|\bbusiness plan\b|\bhow to validate\b|"
    r"\b(is|are|now|startups|agency|developers?) hiring\b|\bhiring (now|for developers)\b|\bdeveloper hiring\b",
    re.I,
)

COMPILED = [(u, s, p, pk, re.compile(rx, re.I)) for u, s, p, pk, rx in PAGES]
EXCLUDED = "(excluded: not buyer intent)"
UNMAPPED = "(unmapped)"


def main() -> None:
    rows = list(csv.DictReader(UNIVERSE.open(encoding="utf-8")))
    by_page = defaultdict(list)
    out = []
    for r in rows:
        kw = r["keyword"].strip()
        if EXCLUDE.search(kw):
            target = (EXCLUDED, "", "", "")
        else:
            target = next(((u, s, p, pk) for u, s, p, pk, rx in COMPILED if rx.search(kw)),
                          (UNMAPPED, "", "", ""))
        by_page[target[0]].append(kw)
        out.append({
            "keyword": kw,
            "target_url": target[0],
            "page_status": target[1],
            "page_priority": target[2],
            "is_primary": "yes" if kw.lower() == target[3].lower() else "",
            "service_cluster": r["service_cluster"],
            "intent": r["intent"],
            "funnel": r["funnel"],
            "volume_us": r.get("volume_us", ""),
        })

    with (HERE / "keyword-map.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(out[0].keys()))
        w.writeheader()
        w.writerows(sorted(out, key=lambda x: (x["target_url"], x["is_primary"] != "yes", x["keyword"])))

    with (HERE / "page-targets.csv").open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["url", "status", "priority", "primary_keyword", "mapped_keywords", "secondary_keywords"])
        for u, s, p, pk, _ in COMPILED:
            kws = [k for k in by_page.get(u, []) if k.lower() != pk.lower()]
            w.writerow([u, s, p, pk, len(by_page.get(u, [])), "; ".join(kws)])
        for bucket in (EXCLUDED, UNMAPPED):
            w.writerow([bucket, "", "", "", len(by_page.get(bucket, [])), "; ".join(by_page.get(bucket, []))])

    pages = [u for u in by_page if not u.startswith("(")]
    print(f"{len(rows)} keywords: {sum(len(by_page[u]) for u in pages)} mapped to {len(pages)} pages, "
          f"{len(by_page.get(EXCLUDED, []))} excluded, {len(by_page.get(UNMAPPED, []))} unmapped")


if __name__ == "__main__":
    main()
