# Agent-readiness audit: arrowbin.com (2026-10-14)

Scope follows `claude-seo:seo-agentic` v2.4.1. That skill is not registered in the active plugin version (the Skill tool returned "Unknown skill"), so I followed its SKILL.md and reference files by hand from the plugin cache. The plugin Python scripts were not run because the runtime is not set up. Instead:
- **Lighthouse 13.5.0 Agentic Browsing**, run from an already-cached npx copy (`npm-cache/_npx/1fc4933a57a44b8f`, nothing installed). Local CLI, HeadlessChrome 155, 2026-10-14.
- **curl** for the user-agent matrix, robots.txt, llms.txt, Markdown and `/.well-known`.
- **Python Playwright 1.58** to walk both lead forms as an agent would. `/api/contact` was intercepted and answered locally, so no lead or email was sent.
- **Source review** of the relevant files.

LIVE = https://arrowbin.com (commit 959866d). LOCAL = http://localhost:3117 (uncommitted fixes). Previous audit: `../11-audit-2026-10-01/agentic.md` (58/100).

Vendor facts are from the skill's `vendor-matrix.md`, last checked 2026-09-23 (21 days old, inside the 60-day limit).

## Summary

| Measure | Live | Local |
|---|---|---|
| **Agent-readiness score (manual heuristic, rubric below)** | **64 / 100** | **66 / 100** |
| Lighthouse Agentic Browsing, mobile: `/`, `/contact`, `/services/ecommerce-development` | 3/3, 3/3, **2/3** | 3/3, 3/3, **2/3** |
| Lighthouse Agentic Browsing, desktop: `/`, `/contact`, `/services/ecommerce-development` | 3/3, 3/3, 3/3 | not run (same code) |
| P0 failures (skill's list) | 1 (mobile CLS on one template) | 1 |

The Lighthouse fraction and the 0-100 score are separate measures. The fraction is never a percentage. N = 3 because WebMCP audits are N/A (no tools on the page, and no WebMCP in the test browser) and `ard-schema` is N/A (no catalog).

**What most limits agents today:** for agents acting for a user, very little. Both lead forms can be completed, booking is reachable, and every search and user-triggered agent gets 200. The remaining gaps:
- Training crawlers still get a 403 from Cloudflare while robots.txt invites them.
- A 0.137 mobile CLS on the e-commerce service page.
- No machine-readable extras: Content-Signal, Markdown, booking link in llms.txt, security.txt.

### Change since 1 Oct

| Item | 1 Oct | 14 Oct | Status |
|---|---|---|---|
| Claude-SearchBot at edge | 403 | 200 | FIXED-LIVE (Cloudflare change, not code) |
| GPTBot, ClaudeBot, anthropic-ai at edge | 403 | 403 | OPEN |
| CCBot, Amazonbot, Bytespider at edge | not tested | 403 | NEW evidence |
| robots.txt Claude-SearchBot / Claude-User groups, obsolete `Claude-Web` removed | absent | local only | FIXED-LOCAL |
| Lighthouse Agentic Browsing | not run | 3/3 on 2 templates, 2/3 on e-commerce service (mobile) | NEW measurement |
| Mobile CLS on `/services/ecommerce-development` | not tested (custom-software page was 0) | 0.137 to 0.139 | NEW |
| Content-Signal, Markdown, llms-full.txt, `/.well-known`, WebMCP | absent | absent | OPEN |
| llms.txt booking link | missing | missing | OPEN |
| Forms | source review only | completed end to end in a browser (intercepted) | Pass, 4 new minor findings |

## 1. Lighthouse Agentic Browsing (13.5.0, local CLI)

| Audit | `/` mobile | `/contact` mobile | `/services/ecommerce-development` mobile | Desktop (all 3) |
|---|---|---|---|---|
| agent-accessibility-tree (33 axe rules) | pass | pass | pass | pass |
| cumulative-layout-shift | pass (0) | pass (0) | **FAIL 0.137** (local 0.139) | pass (0.009 / 0.000 / 0.002) |
| llms-txt | pass | pass | pass | pass |
| webmcp-form-coverage / registered-tools / schema-validity | N/A | N/A | N/A | N/A |
| ard-schema | N/A | N/A | N/A | N/A |
| **Fraction** | **3/3** | **3/3** | **2/3** | **3/3** |

The other 6 service pages measured mobile CLS 0.000 to 0.001 (live, CLS-only runs). Raw JSON: scratchpad `a12/lh_*.json`.

Paths that would add a counted audit, listed as options only:
- WebMCP tools: adds `webmcp-schema-validity`.
- Fully annotated forms: adds `webmcp-form-coverage`.
- A valid `ai-catalog.json`: adds `ard-schema`.

A higher N is not a better site. None of these is recommended until there is a real resource to expose (see A-12).

## 2. Access policy (live edge behaviour)

Test: `curl -A "<official UA string>" https://arrowbin.com<path>`, from Dhaka (Cloudflare DAC), two runs for `/`. These are **unverified** requests. However, unverified OAI-SearchBot, ChatGPT-User and Claude-User from the same IP all get 200. So the rule is a per-category user-agent block, not bot verification, and the real GPTBot and ClaudeBot are very likely blocked too. Confirm in Cloudflare Security > Events.

| Class | Agent | robots.txt live | `/` | `/llms.txt` | `/contact` | `/services/...` | `/robots.txt` |
|---|---|---|---|---|---|---|---|
| Training | GPTBot | Allow | **403** | **403** | **403** | **403** | 200 |
| Training | ClaudeBot | Allow | **403** | **403** | **403** | **403** | 200 |
| Training | anthropic-ai | (falls to `*`) Allow | **403** | **403** | **403** | **403** | 200 |
| Training | CCBot | Allow | **403** | **403** | **403** | **403** | 200 |
| Training | Amazonbot | (falls to `*`) Allow | **403** | **403** | **403** | **403** | 200 |
| Training | Bytespider | (falls to `*`) Allow | **403** | **403** | **403** | **403** | 200 |
| Training token | Google-Extended, Applebot-Extended | Allow | robots-only tokens, no crawler; nothing to test | | | | |
| Search | OAI-SearchBot | Allow | 200 | 200 | 200 | 200 | 200 |
| Search | Claude-SearchBot | live: falls to `*`; local: explicit Allow | 200 | 200 | 200 | 200 | 200 |
| Search | PerplexityBot | Allow | 200 | 200 | 200 | 200 | 200 |
| Search | Applebot, Googlebot, Bingbot | Allow | 200 | 200 | 200 | 200 | 200 |
| User-triggered | ChatGPT-User | Allow | 200 | 200 | 200 | 200 | 200 |
| User-triggered | Claude-User | live: falls to `*`; local: explicit Allow | 200 | 200 | 200 | 200 | 200 |
| User-triggered | Perplexity-User | Allow | 200 | 200 | 200 | 200 | 200 |
| User-triggered | Google-Agent | n/a (ignores robots) | 200 | 200 | 200 | 200 | 200 |

The block response is `HTTP/1.1 403`, `Server: cloudflare`, `Content-Type: text/plain`, `Content-Length: 25`, body `Your request was blocked.` There is no CAPTCHA or JS challenge for any allowed agent. `robots.txt` is served 200 to every user agent, so blocked crawlers can still read the policy.

One line per class:
- **Training:** blocked at the edge, while robots.txt and the `robots.ts` comment ("a deliberate AI-visibility posture") say Allow. Policy and enforcement disagree (A-2).
- **Search:** fully open, Claude-SearchBot included (it was blocked on 1 Oct). No action.
- **User-triggered:** fully open. Agents acting for a person can read every page and reach the form API. No action.

Discrepancy note: `flow.md` in this folder says GPTBot now returns 200. That did not reproduce here: GPTBot returned 403 on every path, in 3 runs, with the full official UA. `geo.md` (same date) agrees with 403.

## 3. Key actions: can an agent complete them?

| Action | Result | Evidence |
|---|---|---|
| **Send a brief** (`/contact`) | **Yes** | Playwright, live and local, desktop 1366px and mobile 390px. It filled the chips by role and name ("E-commerce Development", "Under $5k", "1-3 months") and the fields by label (Name, Email, About the project), then clicked "Send brief". The POST body was correct. Success: `<output>` (role status), "Brief received ... reply to agent-test@example.com within one business day", focus moved to it. An empty submit focused the Name field with `aria-invalid=true` and showed 3 inline errors. |
| **Request a quote** (service hero form) | **Yes** | Same method on `/services/ecommerce-development`. It filled Name, Email and Project details by label, clicked "Get my free quote", and the POST carried the hidden `service: "E-commerce Development"`. The "Thanks, we're on it" heading stays on screen (not a toast), but it is not announced and focus drops to `<body>` (A-6). |
| **Form API** for an agent in a browser | Reachable | `POST /api/contact` with `{}` and same-origin `Origin`: 422 "Please fill in your name, email and project details." for Chrome, ChatGPT-User and Claude-User UAs. A foreign `Origin` gets 403 "Forbidden." (by design). A ClaudeBot UA gets the Cloudflare 403 (irrelevant, crawlers do not post). Rate limit is 5 per 10 min per IP (`src/app/api/contact/route.ts`). |
| **Book a call** | **Yes, on a third-party page** | `https://cal.com/arrowbin/30min` returns 200 (about 190 KB) to Chrome, ChatGPT-User, Claude-User and PerplexityBot UAs. Its accessibility tree is clean: `heading "30 min meeting"`, date buttons named like `"Thursday, October 15, 2026"` (13 of 31 enabled), time slots like `"Wednesday, October 14, 2026 at 10:30"`, a `status` region, a `combobox "Timezone Select"`, and no CAPTCHA. cal.com's robots.txt publishes `Content-Signal: ai-train=no, search=yes, ai-input=yes` and an `Agentmap`. The final booking step (name and email on cal.com) was not submitted, to avoid creating a real booking. Site links are named "Book a call" or "Book a free call" and open in a new tab. The booking URL is still absent from llms.txt (A-4). |

## 4. Findings

Priority uses the audit scale. The skill's P-level is in brackets.

### A-1 High [P0] NEW: mobile CLS 0.137 on `/services/ecommerce-development`
- Evidence:
  - Lighthouse 13.5.0 mobile: 0.137 (live, run 1), 0.137 (live, run 2), 0.139 (local). Desktop 0.002.
  - `layout-shifts` names `main#main > section.relative > div.mx-auto > div.mt-10`, the hero grid in `src/components/services/ServiceHero.tsx:33`. Cause: "Web font loaded" for two `next/font` Latin files and `anek_bangla_goyna-s.*.woff2`.
  - The other 7 service pages score 0.000 to 0.001.
- Impact: the only failed counted audit (agentic fraction 2/3 on this template). CLS is also a Core Web Vital; no field data is available.
- Fix (dev, `src/app/layout.tsx` font config plus `ServiceHero.tsx`):
  - Find which line re-wraps on swap at 390px. Likely the display H1 "E-commerce Development" in Anybody (`preload: false`, `display: "swap"`) or the mono breadcrumb (Geist Mono, `preload: false`).
  - Then either preload that face, or switch it to `display: "optional"`, or reserve the height (a `min-height` on the H1 or crumb line).
  - The Bangla subset loads on this page because "গ তে গয়না" appears in its related work (`src/lib/services.ts:1000`). It is below the fold and unlikely to be the cause; confirm in a trace.
  - No visual change intended.
- Effort S to M. Owner dev.
- How we'd know it failed: Lighthouse mobile on that URL still reports `cumulative-layout-shift` above 0.1, or the fraction is not 3/3, in two consecutive runs.

### A-2 High [P0 for policy coherence] OPEN (partly FIXED-LIVE): Cloudflare blocks training crawlers that robots.txt allows
- Evidence: section 2. GPTBot, ClaudeBot, anthropic-ai, CCBot, Amazonbot and Bytespider get 403. Claude-SearchBot moved from 403 to 200 since 1 Oct. `src/app/robots.ts` explicitly allows GPTBot, ClaudeBot and CCBot, and its comment says training is welcome.
- What it does and does not affect:
  - It does not block ChatGPT search, Claude search or Perplexity: their search and user agents all get 200.
  - It does block inclusion in OpenAI, Anthropic, Common Crawl and Amazon training data. That is a legitimate business choice, but it has to be one choice, stated in both places.
- Fix (founder decision, then 10 minutes):
  - **Option 1 (matches the current robots.txt intent):** Cloudflare > AI Crawl Control (or Security > Bots, "Block AI bots"): set GPTBot, ClaudeBot, CCBot and Amazonbot to Allow. Prefer Cloudflare's verified-bot signal over raw UA rules.
  - **Option 2 (keep the block):** change `robots.ts` to `Disallow: /` for GPTBot, ClaudeBot, CCBot and anthropic-ai, keep the search and user groups on Allow, and set `ai-train=no` in Content-Signal (A-3). Never present either option as affecting Google Search.
- Effort S. Owner founder (Cloudflare) plus dev (robots.ts if option 2).
- How we'd know it failed:
  - After option 1: `curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot" https://arrowbin.com/` is still 403.
  - After option 2: robots.txt still says Allow for GPTBot.

### A-3 Medium [P1] OPEN: no Content-Signal
- Evidence: live and local robots.txt contain no `Content-Signal:` line (full files in scratchpad `a12/live_robots.txt`, `local_robots.txt`).
- Why it needs a code change: Next.js `MetadataRoute.Robots` only supports `userAgent`, `allow`, `disallow` and `crawlDelay` (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`), so custom lines cannot be added.
- Fix:
  - Replace `src/app/robots.ts` with `src/app/robots.txt/route.ts` (same `force-static` pattern as `src/app/llms.txt/route.ts`) that writes the text.
  - Put the `Content-Signal` line **inside every named group**. Under RFC 9309 a crawler with its own group ignores `*`.
  - Example for option 1 of A-2: `Content-Signal: search=yes, ai-input=yes, ai-train=yes`. For option 2, use `ai-train=no` in every group, with Disallow on the training group.
  - Merging the 12 identical groups into one multi-`User-agent` group would shorten the file; behaviour is unchanged.
- Status of the standard: Cloudflare CC0 policy. The IETF individual draft expired 2026-04-04. No Google statement exists, and Google's robots.txt spec does not list the field. It is a stated preference with no confirmed effect.
- Effort S. Owner dev, with the founder choosing `ai-train`.
- How we'd know it failed: `curl -s https://arrowbin.com/robots.txt | grep -c Content-Signal` is lower than the number of `User-Agent` groups.

### A-4 Medium [P1] OPEN: llms.txt has no way to act
- Evidence: `/llms.txt` returns 200 `text/plain` (3,142 bytes), byte-identical live and local, and passes the Lighthouse rules.
- What is missing:
  - The booking link (`site.bookingUrl`).
  - A one-line "how to start a project" pointer (the brief form, reply within one business day).
  - Engagement facts.
- What is wrong: it still leads with "offices in Dhaka, Bangladesh and St. Petersburg, Florida", against the founder's "clients worldwide" rule. Key facts are also covered in `geo.md`.
- Fix in `src/app/llms.txt/route.ts`:
  - Add a `## Start a project` section with these two links:
    - `- [Book a free 30-minute call](https://cal.com/arrowbin/30min)`
    - `- [Send a project brief](https://arrowbin.com/contact#brief): name, email and a short description; reply within one business day`
  - Reword the offices sentence to lead with "clients worldwide".
  - Do not describe `/api/contact` as an agent endpoint. The form is the supported path, and it keeps the user in the loop.
- Effort S. Owner dev.
- How we'd know it failed: `curl -s https://arrowbin.com/llms.txt | grep -c cal.com/arrowbin` returns 0.

### A-5 Low [P1 a11y] NEW: required fields on `/contact` are not exposed as required
- Evidence:
  - Raw HTML of `/contact` has 0 `required` and 0 `aria-required` (the form is `noValidate`).
  - The accessibility tree shows `textbox "Name *"`, `textbox "Email *"`, `textbox "About the project *"`. An agent has to infer "required" from an asterisk.
  - The service quote form does carry `required` on its 3 fields.
- Fix in `src/components/contact/ContactBrief.tsx`: add `aria-required="true"` (or `required`; `noValidate` keeps the custom messages) on name, email and message. Mark the asterisk spans `aria-hidden="true"` so names read "Name", "Email", "About the project".
- Effort S. Owner dev.
- How we'd know it failed: `curl -s https://arrowbin.com/contact | grep -c 'aria-required="true"'` is less than 3.

### A-6 Low [P1] NEW: quote-form success is not announced and focus is lost
- Evidence: after a successful submit on `/services/ecommerce-development`, the success card has no `role="status"` or `aria-live` ancestor, and `document.activeElement` is `BODY` (Playwright, live and local, both viewports). `ContactBrief` already does this correctly with `<output>` plus focus.
- Fix in `src/components/services/ServiceQuoteForm.tsx`: wrap the success card in `<output>` or give it `role="status"`, with `tabIndex={-1}`, and focus it after success, mirroring `ContactBrief.tsx`. No visual change.
- Effort S. Owner dev.
- How we'd know it failed: after a submit, the accessibility tree has no `status` node, or focus is on `BODY`.

### A-7 Low NEW: chip group name runs together
- Evidence: accessibility tree `group "What do you need?pick any"`. The legend text and the "pick any" span have no separator (`ContactBrief.tsx`, `Chips` legend).
- Fix: render `{" "}` before the span, or make it `(pick any)`. No visual change.
- Effort S. Owner dev.
- How we'd know it failed: the tree still shows `need?pick`.

### A-8 Low OPEN (from 1 Oct): honeypot named like a real field
- Evidence: both forms use the hidden field `name="company_website"`, labelled "Leave this field empty". The real field on `/contact` is `name="company"` ("Company or website").
  - The honeypot is `aria-hidden`, so tree-reading agents skip it (Playwright by-label filling left it empty).
  - A DOM agent that maps fields by `name` could plausibly put the user's website there.
  - The API then returns `{ ok: true }` and drops the lead silently (`src/app/api/contact/route.ts`). The user sees success; Arrowbin gets nothing.
- Fix: rename it to a non-semantic name (for example `hp_field`) in both forms and the route. Optionally log honeypot hits instead of discarding them silently.
- Effort S. Owner dev.
- How we'd know it failed: grep finds `company_website` in `src/`.

### A-9 Low [P1 in the skill, optional] OPEN: no Markdown delivery
- Evidence (live and local):
  - `/index.md`, `/contact.md`, `/services/ecommerce-development.md` and `/blog/<slug>.md` all return 404.
  - `Accept: text/markdown` on `/`, `/contact` and a service page returns `text/html`, with no `Accept` in `Vary`.
  - HTML is not cached at Cloudflare (`cf-cache-status: DYNAMIC`), so negotiation at the origin would be safe.
- No consumer agent is publicly confirmed to request Markdown, so this is optional.
- Fix if wanted:
  - A route handler `src/app/md/[[...path]]/route.ts` (`force-static`, `generateStaticParams`) that renders Markdown from `src/lib/services.ts` and `src/lib/blog.ts`.
  - `next.config.ts` `rewrites().beforeFiles` from `/services/:slug.md` and `/blog/:slug.md` to it. Optionally also from the HTML paths with `has: [{ type: "header", key: "accept", value: ".*text/markdown.*" }]`, plus `Vary: Accept`.
  - Send `Link: <html url>; rel="canonical"` on each Markdown response, and add `<link rel="alternate" type="text/markdown">` only on pages that have one.
  - Keep the Markdown content-equivalent to the HTML.
- Effort M. Owner dev.
- How we'd know it failed: `curl -sI https://arrowbin.com/services/ecommerce-development.md` is not 200 `text/markdown`.

### A-10 Low OPEN: no llms-full.txt
- `/llms-full.txt` returns 404 on both. Optional: generate the full text of the services and guides from the same sources as llms.txt. Effort S to M. Owner dev.
- How we'd know it failed: still 404 after it ships.

### A-11 Low OPEN: no security.txt
- `/.well-known/security.txt` returns 404 on both. This is the one settled standard in this group (RFC 9116).
- Fix: add `src/app/.well-known/security.txt/route.ts` returning `Contact: mailto:hello@arrowbin.com`, `Expires: <one year out>`, `Preferred-Languages: en, bn`, `Canonical: https://arrowbin.com/.well-known/security.txt`.
- Effort S. Owner dev.
- How we'd know it failed: still 404, or `Expires` is in the past.

### A-12 Info OPEN: no ai-catalog.json, MCP card, API catalog or WebMCP (correct for now)
- Evidence: `/.well-known/ai-catalog.json`, `mcp.json`, `api-catalog`, `agent-card.json`, `agent.json`, `http-message-signatures-directory`, `ucp` and `oauth-protected-resource` all return a real 404 (not a soft 404). There is no `toolname`, `modelContext` or `registerTool` anywhere in `src/`.
- Arrowbin runs no public API, MCP server or A2A agent, so none of these should be published. An empty or invalid catalog would add a counted Lighthouse failure.
- WebMCP is an optional enhancement at P3 for a lead form:
  - Chrome origin trial M149 to M156; WebKit opposes; Mozilla is neutral.
  - Only ChatGPT desktop calls tools by default.
  - If ever added, annotate every form fully and keep human confirmation on "send" (Lighthouse `webmcp-schema-validity` fails on half-annotated forms).
- How we'd know it failed: any of these paths returns 200 HTML (soft 404), or a catalog appears with no real resource behind it.

### Passes (no action)
- **Server-rendered:** every page is prerendered (`x-nextjs-prerender: 1`). Both forms, all labels and the submit buttons are in the raw HTML (`<form` count 1, `type="submit"` 1 on `/contact` and the service page).
- **Accessibility tree:** Lighthouse `agent-accessibility-tree` passes 9 of 9 runs. Fieldsets with legends, `aria-pressed` chips, labelled inputs, `aria-invalid` with `aria-describedby` errors, `role="alert"` on submit errors.
- **Overlays:** the decorative nav label duplicates and the email preview panel are `aria-hidden`. The custom cursor is `pointer-events: none` and only on fine pointers (`src/app/globals.css:397`).
- **No CAPTCHA or challenge** on content for allowed agents.
- **llms.txt** passes Lighthouse: H1, 17 Markdown links, 3,142 characters.
- **Sitemap and RSS** return 200. Unknown `/.well-known` paths return a real 404.

## 5. Score rubric (manual heuristic, 0-100)

1 Oct's 58 used an unpublished heuristic. Re-scoring the 1 Oct evidence with this rubric gives about 60, so the real movement is about +4 live.

| Area | Weight | 1 Oct (re-scored) | Live 14 Oct | Local 14 Oct | Basis |
|---|---|---|---|---|---|
| Server rendering and landmarks | 10 | 9 | 9 | 10 | Text outside `<main>`, `<header>`, `<nav>` and `<footer>` on the homepage: 8,879 characters live, 138 local (only the mobile menu dialog) |
| Accessibility tree and labelling | 15 | 12 | 13 | 13 | Lighthouse tree passes; A-5, A-6, A-7, A-8 deduct |
| Layout stability (CLS) | 10 | 10 | 7 | 7 | A-1 on one of 8 service pages |
| robots.txt groups and Content-Signal | 10 | 7 | 7 | 8 | Explicit groups; Claude agents explicit only locally; no Content-Signal |
| Edge/WAF treatment | 15 | 5 | 9 | 9 | All search and user agents 200; training 403 contrary to robots |
| llms.txt | 8 | 6 | 6 | 6 | Valid; no booking or actions; offices line |
| Markdown delivery | 7 | 0 | 0 | 0 | Absent |
| `/.well-known` and discovery | 5 | 1 | 1 | 1 | Real 404s only; no security.txt |
| WebMCP | 5 | 0 | 0 | 0 | Absent (optional) |
| Key-action completability | 15 | 10 | 12 | 12 | Brief and quote verified end to end; booking reachable and labelled but third-party, new tab, not in llms.txt |
| **Total** | **100** | **~60** | **64** | **66** | |

Projected after A-1 to A-8 plus A-11: about 80. Adding Markdown (A-9) brings it to about 85. WebMCP and a catalog are not needed to reach that.

## 6. Standards status (labelled, with dates)

| Item | Status | Checked |
|---|---|---|
| Lighthouse Agentic Browsing | Shipping in Lighthouse 13.5.0; category marked "still under development" | run 2026-10-14 |
| Content-Signal | Cloudflare CC0 policy; IETF individual draft expired 2026-04-04; no Google support statement | vendor matrix 2026-09-23 |
| WebMCP | Chrome origin trial M149 to M156; WebKit opposes; Mozilla neutral; ChatGPT desktop calls imperative tools | vendor matrix 2026-09-23 |
| ai-catalog.json (ARD 1.0) | Community spec; Lighthouse validates it | vendor matrix 2026-09-23 |
| MCP Server Card (SEP-2127) | Open proposal, unmerged; `/.well-known/mcp.json` (SEP-1649) closed | vendor matrix 2026-09-23 |
| Web Bot Auth | `draft-ietf-webbotauth-httpsig-protocol-00` (2026-09-01); OpenAI signs agent traffic | vendor matrix 2026-09-23 |
| security.txt | RFC 9116, published standard | n/a |
| ChatGPT agent / Atlas | Reported removed or stopped Aug 2026 (secondary sources) | vendor matrix 2026-09-23 |

Nothing in this file implies a ranking, citation or traffic effect. Google-Extended, Content-Signal and llms.txt do not affect Google Search.

## 7. Recommendations in order

| # | Item | Priority | Status | Effort | Owner | Unblocks | Confirm with |
|---|---|---|---|---|---|---|---|
| 1 | A-1 fix the font-swap shift on the e-commerce service hero | High | NEW | S-M | dev | Lighthouse 3/3 on every template; CWV | Lighthouse mobile agentic run x2 |
| 2 | A-2 pick one training policy and make Cloudflare and robots.txt agree | High | OPEN | S | founder + dev | Coherent policy; training inclusion if option 1 | UA matrix curl in section 2 |
| 3 | A-3 Content-Signal in every group (robots route handler) | Medium | OPEN | S | dev | Stated per-purpose preference | `grep -c Content-Signal` |
| 4 | A-4 llms.txt: booking and brief links, "clients worldwide" | Medium | OPEN | S | dev | Agents find the action URLs without crawling | `grep cal.com /llms.txt` |
| 5 | A-5, A-6, A-7 form semantics | Low | NEW | S | dev | Cleaner tree for agents and screen readers | Playwright tree / curl grep |
| 6 | A-8 rename the honeypot | Low | OPEN | S | dev | No silent lead loss from DOM agents | grep `company_website` |
| 7 | A-11 security.txt | Low | OPEN | S | dev | Standard contact for security reports | curl 200 |
| 8 | A-9 / A-10 Markdown and llms-full.txt | Low (optional) | OPEN | M | dev | Cheaper agent reads | curl `.md` |
| 9 | A-12 WebMCP or catalog | Info | n/a | n/a | n/a | Only if an API or MCP server ever exists | n/a |
