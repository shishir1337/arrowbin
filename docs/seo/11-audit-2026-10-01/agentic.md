# Agent-readiness audit: arrowbin.com (2026-10-01)

Method: curl plus source review. Lighthouse Agentic Browsing and the plugin runtime were not run (per instructions), so no X/N fraction is reported. The Agent-UX score below is a manual heuristic.

## Score: 58 / 100

| Area | Result |
|---|---|
| Server rendering / HTML structure | Good (static prerender, 1 h1, main, header, footer, 3 nav) |
| Form and control labelling | Good |
| robots.txt | Good, but contradicted by edge (see P0) |
| WAF / agent access | Fail for GPTBot and ClaudeBot |
| llms.txt | Present, good; no llms-full.txt |
| Markdown delivery | Absent |
| /.well-known discovery | Absent |
| WebMCP | Absent |
| Key action completability | Forms OK; booking is external link only |

## Access policy (robots.txt vs real edge behaviour)

Test: `curl -A <UA> https://arrowbin.com/`

| Agent class | UA tested | robots.txt | Actual HTTP |
|---|---|---|---|
| Training | GPTBot/1.1 | Allow | 403 "Your request was blocked." (25 bytes) |
| Training | CCBot, Google-Extended, Applebot-Extended | Allow | not UA-tested (robots-only tokens, except CCBot) |
| Training | anthropic-ai | not listed (falls under *) | 403 |
| Training/general | ClaudeBot | Allow | 403 |
| Search | OAI-SearchBot | Allow | 200 |
| Search | PerplexityBot | Allow | 200 |
| Search | Claude-SearchBot | not listed (falls under *) | 403 |
| User-triggered | ChatGPT-User | Allow | 200 |
| User-triggered | Claude-User | not listed (falls under *) | 200 |
| Baseline | Mozilla/5.0 | Allow | 200 (308 KB) |

Server header is `cloudflare`. The 403 body is a Cloudflare-style block, not from the Next.js app (no matching code in src). It is most likely Cloudflare "Block AI bots" / managed robots / Bot Fight setting.

## Findings

### P0: Cloudflare blocks GPTBot, ClaudeBot, Claude-SearchBot, anthropic-ai while robots.txt says Allow
Evidence: 403 on those UAs above; 200 for OAI-SearchBot, PerplexityBot, ChatGPT-User, Claude-User. `src/app/robots.ts` explicitly allows GPTBot and ClaudeBot and `src/app/llms.txt/route.ts` invites LLM use, so the intent is clearly to be visible.
Fix: Cloudflare dashboard, Security > Bots: turn off "Block AI Scrapers and Crawlers" (and Cloudflare managed robots.txt injection if enabled), or add a WAF custom skip rule for verified bots / these UAs. Re-test with the same curl commands. If blocking training crawlers is actually desired, then change robots.ts to Disallow GPTBot/ClaudeBot/CCBot so policy and enforcement agree, and keep search and user agents allowed. Note UA strings can be spoofed, so verify with Cloudflare verified-bot signals rather than UA alone.

### P1: No Content-Signal or per-class policy statement
robots.txt has no `Content-Signal:` line (draft proposal, vendor check date per the seo-agentic vendor-matrix; status not re-verified in this run). Fix in `src/app/robots.ts`: if the plugin allows custom lines, add e.g. `Content-Signal: search=yes, ai-input=yes, ai-train=<your choice>` under `User-Agent: *`. Also add explicit groups for Claude-SearchBot, Claude-User, anthropic-ai so behaviour is not implicit. Every group repeats the same rules; consider consolidating.

### P2: Booking a call is not completable in-page by an agent
`site.bookingUrl` (`src/lib/site.ts:16`) is `https://cal.com/arrowbin/30min`, rendered as an external link in Navbar, Hero, ContactBrief, etc. An agent can follow the link, but completion depends on cal.com's own UI and agent access (not tested). llms.txt lists Contact but not the booking URL. Fix: add `- [Book a 30-min call](https://cal.com/arrowbin/30min)` to `src/app/llms.txt/route.ts`; ensure link text says "Book a free call" (not just an icon) wherever used.

### P2: No Markdown delivery
`/index.md` returns 404; `Accept: text/markdown` on `/` returns text/html. Opportunity, not a defect. Option: Next.js rewrite/middleware that serves a Markdown rendering for `Accept: text/markdown` and `*.md` for services and blog posts (content already exists in `src/lib/services.ts` and `src/lib/blog.ts`).

### P3: llms.txt good; no llms-full.txt
`/llms.txt` 200 text/plain, generated from live data (`src/app/llms.txt/route.ts`), lists 8 services, guides, company, policies. `/llms-full.txt` is 404. Optional: generate a full-text version from the same sources. Add the booking URL and the `/api/contact` description only if you want agents to use it.

### P3: No /.well-known discovery, no WebMCP
All 404: ai-catalog.json, mcp.json, api-catalog, agent.json, security.txt. No `navigator.modelContext` or `toolname` markup in source. These are drafts or proposals (ai-catalog.json, WebMCP, Content-Signal; check dates in the plugin vendor-matrix.md) and absence is an opportunity. Cheap wins: `/.well-known/security.txt` (a settled standard, RFC 9116). If desired later, annotate the contact form with WebMCP declarative attributes once the spec stabilises.

### Passes (no action)
- Landmarks: `<header>`, `<main>`, `<footer>`, 3 `<nav>`, single `<h1>`, "Skip to content" link present.
- Mobile menu button has `aria-label="Open menu"`, `aria-expanded`, `aria-controls`; dialog role present.
- Contact form (`src/components/contact/ContactBrief.tsx`): every field has a `<label for>` (name, email, company, message); option chips are in `<fieldset>/<legend>` ("What do you need?", "Rough budget", "Timeline") with `aria-pressed` toggle buttons; submit is a real `type="submit"`; `aria-live="polite"` region exists; `aria-invalid` is used for errors.
- Service quote form (`src/components/services/ServiceQuoteForm.tsx`, id prefix `hero-`): labels for name, email, message; hidden `service` field is set automatically; `required` attributes. Extra calculator sliders (people, hours, rate, share) have labels.
- Honeypot (`company_website`) is off-screen and `aria-hidden`, with `tabindex=-1`; a well-behaved agent will leave it empty. Minor risk: a DOM-reading agent could fill it and be silently rejected. Consider a less label-like honeypot text.
- Forms submit via JSON POST to `/api/contact` (`src/app/api/contact/route.ts`): same-origin check, 5 per 10 min per IP rate limit, so an agent acting for a user in a browser can send a brief. Direct non-browser POSTs with a foreign Origin get 403; no-Origin POSTs work.
- Copy-email button has a descriptive aria-label; `hello@arrowbin.com` is also present in llms.txt.
- Pages are statically prerendered (`x-nextjs-prerender: 1`, cache HIT), so content is in the initial HTML; JSON-LD present (4 blocks on /contact).
- Sitemap at /sitemap.xml (200) and referenced in robots.txt.

## Completability summary
- Send a brief: yes, for browsing agents (labelled form, JSON API). Blocked for GPTBot and ClaudeBot UAs at the edge (P0) before they reach the form.
- Book a call: only via external cal.com link; not verified beyond the link.

## Standards notes
Content-Signal, ai-catalog.json, WebMCP and Web Bot Auth are drafts or proposals; vendor-matrix.md was not re-read in this run, so cite its check date before publishing any claim. No ranking, citation or traffic effects are implied.
