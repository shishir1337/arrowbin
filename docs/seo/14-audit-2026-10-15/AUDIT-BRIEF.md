# Re-audit brief (15 Oct 2026, after the overnight sprint)

- **Target:** http://localhost:3117, a local production build (`next start`) of arrowbin.com containing every change from the 15 Oct sprint. It is NOT deployed. https://arrowbin.com (live) is still the old build 959866d, so use live only for edge and network checks (Cloudflare bot rules, http to https hops, TLS), and say which one you measured.
- **Canonical host:** https://arrowbin.com (canonicals, sitemap and JSON-LD reference it; on localhost, map https://arrowbin.com/<path> to http://localhost:3117/<path>).
- **Baseline:** docs/seo/12-audit-2026-10-14/ (AUDIT-REPORT.md, FIX-PLAN.md and the per-specialist file matching your area). Report what changed against it: fixed, still open, new.
- **What the sprint did:** docs/seo/13-sprint-2026-10-15/agent-log.md and editor-report.md. Do not re-raise items listed there as founder decisions without new evidence; list them under "Founder-gated" instead.
- **Tools:**
  - WebFetch cannot open localhost, so use curl and python (stdlib) or Playwright (Python, installed) through Bash.
  - Lighthouse 12 runs with `node C:/Users/amaiz/AppData/Local/npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js <url> --chrome-flags="--headless=new" --output=json --output-path=<file>`. Put outputs in your scratch folder or `docs/seo/14-audit-2026-10-15/findings/raw/`.
- **Rules:**
  - Do not edit any source file, and do not build.
  - Do not stop or start servers; :3117 must keep running.
  - No git.
  - No em dashes in anything you write.
  - Never use the connected Google Search Console / GA4 tools: they belong to a different business.
- **Write your findings to** `docs/seo/14-audit-2026-10-15/findings/<area>.md`:
  - a score 0 to 100 for your category, with the 14 Oct score next to it;
  - what works;
  - findings with severity (Critical/High/Medium/Low/Info), evidence, fix, owner (dev or founder), and whether it needs visual sign-off;
  - finish with a one-paragraph summary.
