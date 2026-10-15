# Overnight SEO sprint, 15 October 2026: rules for every agent

Repo: `C:\Users\amaiz\Documents\Arrowbin\arrowbin-new-one` (Next.js 16.2.9 App Router, pnpm, Biome, Windows with Git Bash).
Plan of record: `docs/seo/12-audit-2026-10-14/FIX-PLAN.md`. Audit evidence: the other files in `docs/seo/12-audit-2026-10-14/`.

## Hard rules (the founder's standing rules)

1. **No em dashes (U+2014) anywhere** you write: code comments, copy, docs, alt text, JSON-LD. Use commas, colons, full stops or parentheses. En dashes (–) are fine only in number ranges ("6–14 weeks"). Check your files with `grep -nP '\x{2014}' <file>` before you finish.
2. **No visual design changes** to existing pages. Release A work must look identical. If a fix would change how something looks or moves, do not do it; write it up in your report instead.
3. **No green** colours, no dark theme base, no cream/beige. Brand palette: frost `#F1F2F7`, ink `#0e0b24`, muted ink `#4a4766`, ultra `#3b2bff`, plasma `#ff4da6`, sun `#ffd23f`, lilac `#cfc4ff`, coral `#ff6b3d`, white.
4. **Never invent facts**: no made-up statistics, client results, testimonials, prices or awards. Every number needs a source URL, or it must be clearly labelled as an estimate or opinion.
5. **Wordmark** is "Arrowbin" (or ARROWBIN), never "arrowbin" in visible copy (URLs and emails are fine).
6. **Don't emphasise the offices** (Dhaka / Florida). Frame Arrowbin as working with clients worldwide.
7. **Do not commit, push, or deploy.** Do not run `git add`, `git commit`, `git stash`, `git checkout -- <file>`, `git reset` or anything that changes git state.
8. **Do not run `pnpm build`, `next dev`, `next start`** or anything that writes `.next/` or binds a port. The lead (orchestrator) runs builds. You may run:
   - `pnpm tsc --noEmit -p .` (if it reports errors only in files you do not own, ignore them; other agents are working in parallel)
   - `pnpm biome check --write <only the files you changed>` (never `biome check --write src`: it reformats untouched legacy files)
9. **Only edit the files you own** (listed in your task). If you need a change in a file you do not own, describe it in your report instead.
10. **Do not print secrets** from `.env.local`. Do not send real emails (mock `/api/contact`).
11. **Do not install packages.** Use what is in `node_modules` (sharp is available for image conversion).
12. **Next.js 16 is not the Next.js you know** (AGENTS.md). Before writing framework code, read the relevant guide in `node_modules/next/dist/docs/` (for example metadata, `generateMetadata`, `dynamicParams`, route handlers, `not-found`). Middleware is `src/proxy.ts`.
13. Match the surrounding code style: naming, comment density, Tailwind usage.

## Facts you may use about Arrowbin

- Arrowbin LLC, a software development company. Founder: Md. Shishir Ahmed (founder and lead engineer). Founded 2020. Site: https://arrowbin.com. Email hello@arrowbin.com. Booking: https://cal.com/arrowbin/30min. Contact brief: https://arrowbin.com/contact.
- Services and URLs: `/services/custom-software-development`, `/services/ecommerce-development`, `/services/mobile-app-development`, `/services/saas-product-engineering`, `/services/ui-ux-design`, `/services/ai-automation`, `/services/cloud-devops-hosting`, `/services/maintenance-support`. Hubs: `/services`, `/work`, `/about`, `/contact`, `/blog`.
- Live portfolio (all are WordPress to Next.js rebuilds, per the founder): Silent Lifestyle BD (silentlifestylebd.com), FlexOver BD (flexoverbd.com), North Bengal Agro Farms (nbafl.net), Maneel Club (maneelclub.com), Brandingly (brandingly.agency), গ তে গয়না (gtegoyna.com.bd), YT Shop India (ytshopindia.com), OutNet (outnet.it.com). Do not attach metrics or outcomes to these projects.
- Hostinger partner (the cloud page has a Hostinger block).
- Existing blog guides: `/blog/how-much-does-custom-software-development-cost`, `/blog/how-to-choose-a-software-development-company`, `/blog/how-long-does-it-take-to-build-an-mvp`.
- Unverified claims you must NOT repeat: "15+ brands", "live in 8 weeks", "all 64 districts", client-count claims, review ratings.

## Reporting

End with a short report: files changed, what each change does, anything you could not do and why, and anything that needs the founder's eyes. Keep it factual. Also append the same report to `docs/seo/13-sprint-2026-10-15/agent-log.md` under a heading with your agent name (create the file if missing; append, never overwrite other agents' sections).
