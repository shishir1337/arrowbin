# Audit context (read first) - 14 October 2026

Site: https://arrowbin.com (software development agency, founder-led, clients worldwide; offices Dhaka BD + a US mailing address that is a shared virtual office).
Business brief: ../00-brief/business-brief.md. Previous audit (1 Oct, Health 63/100): ../11-audit-2026-10-01/AUDIT-REPORT.md and its detail files. Keyword map: ../05-keyword-map/keyword-map.md.

## Two versions exist
1. LIVE production = commit 959866d (29 Sep). None of the post-audit fixes are deployed.
2. LOCAL build with 7 uncommitted fixes, running at http://localhost:3117 (production build). Use it to confirm whether a finding is already fixed pending deploy. Mark each finding: OPEN (live and local), FIXED-LOCAL (fixed locally, awaiting deploy), FIXED-LIVE, or NEW.

Local fixes (uncommitted): (1) hero H1 word spaces in raw HTML on all pages; (2) new titles/descriptions on 14 pages, homepage title now "Software Development Company for Startups & SMBs | Arrowbin"; (3) next.config redirects for 12 legacy URLs + src/proxy.ts returning 410 for dead marketplace/spam paths and 308 for /?channel= spam; (4) schema: sameAs without LinkedIn placeholder, +GitHub, Organization.founder, St. Pete office mailing-only (no ProfessionalService node), no duplicates on /contact; (5) favicon.ico, sitemap lastmod 2026-10-01, robots disallow /api + Claude-SearchBot/Claude-User; (6) image alt on blog covers, eager above-fold images, 44px tap targets; (7) portfolio result lines now factual (no unconfirmed metrics); homepage Suspense wrappers removed so all text is inside <main>.

## Known founder decisions / constraints
- Placeholder testimonials (Sarah Mitchell, David Chen, Rafiul Islam) are KEPT by founder decision for now; still report the risk but do not repeat it at length.
- Founder rules: no em dashes in copy; no sticker badges next to hero headlines; no preloader; no trust-chip strips under heroes; do not emphasise offices; design must not change visually without approval.
- Florida LLC (L24000209589) likely administratively dissolved (OpenCorporates: Inactive); unverified on Sunbiz.
- No Search Console data for arrowbin.com is available. The GSC/GA4 connector in this environment belongs to a different business (ooraa.org): never use it.

## Environment constraints
- Do NOT install anything (no pip install, no `claude-seo setup`): the plugin Python runtime is not set up. Use curl, WebFetch, WebSearch, Python stdlib, and the already-installed Python Playwright (chromium). `npx -y lighthouse@12` works for lab performance.
- Do NOT edit source code, do NOT run builds, do NOT start/stop servers. Read-only.
- Write your report into this folder. No em dashes (—) in reports. Cite evidence (command output, URLs).
- Each finding: priority (Critical/High/Medium/Low/Info), status (OPEN/FIXED-LOCAL/FIXED-LIVE/NEW), evidence, fix (point at source files), effort (S/M/L), owner (dev/founder), and "how we'd know it failed".
