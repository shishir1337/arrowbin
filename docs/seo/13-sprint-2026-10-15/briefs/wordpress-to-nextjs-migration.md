# Brief: wordpress-to-nextjs-migration (top 5, #2)

## Keywords
- **Slug:** `/blog/wordpress-to-nextjs-migration`
- **Primary keyword:** wordpress to next.js migration
- **Secondary (4 to 8):** migrate wordpress to next.js · headless wordpress next.js · wordpress to next.js seo · wordpress to next.js redirects · wordpress to next.js migration cost · next.js vs wordpress for business website · woocommerce to next.js
- **Question phrasings seen in results:** "How to migrate from WordPress to Next.js", "WordPress vs Next.js: which is right for your business in 2026?", "Will I lose rankings moving from WordPress to Next.js?", "How much does a WordPress to Next.js migration cost?", "Should I keep WordPress as a headless CMS?"

## Search intent and reader
Commercial investigation with a how-to layer. The reader is a business owner, marketing lead or e-commerce brand on WordPress or WooCommerce whose site is slow, keeps breaking after plugin updates, or has been hacked, and who has been told "move to Next.js". They want to know whether it is worth it, what the steps are, how to keep their Google rankings, and roughly what it involves. Some readers are developers scoping the job; write for the owner, with a technical appendix-style section for the developer.

## SERP snapshot (web search, 15 Oct 2026)
| # | Title | URL | Gap |
|---|---|---|---|
| 1 | Migrate WordPress to Next.js | https://www.browsercat.com/post/migrate-wordpress-to-nextjs | Developer tutorial (export to MDX); nothing for the owner's decision |
| 2 | WordPress to Next.js Migration (service page) | https://johnkavanagh.co.uk/services/wordpress-to-nextjs-migration/ | Freelancer service page |
| 3 | WordPress to Next.js Migration Checklist for Content, Preview and SEO | https://johnkavanagh.co.uk/articles/wordpress-to-nextjs-migration-checklist/ | Strong checklist (24 Feb 2026) but no cost, timeline, e-commerce or 410 guidance |
| 4 | How to Migrate from WordPress to Next.js | https://eseospace.com/blog/migrate-wordpress-to-nextjs/ | Agency guide; generic, unsourced performance claims |
| 5 | Migrating from WordPress to Next.js guide | https://www.index.dev/blog/migrating-from-wordpress-to-nextjs-guide | Dated 27 Nov 2024; pre-Next.js 16 |
| 6 | WordPress to Next.js migration cost/timeline 2026 (one of many city variants) | https://kolonell.com/en/blog/wordpress-to-nextjs-migration-cost-timeline-2026 | Near-duplicate city pages with conflicting numbers |
| 7 | Website Redesign and Migration to Next.js (gig) | https://contra.com/s/EUsBrAOs-website-redesign-and-migration-to-nextjs | Gig listing |
| 8 | I will convert wordpress website to nextjs (gig) | https://fiverr.com/azaz_khan_dev/convert-wordpress-to-code | Gig listing |

**Overall gaps:** nobody combines the owner's decision (should I?), the step list, the SEO mechanics (308 vs 301, 410 for dead URLs, redirect limits) and e-commerce (WooCommerce, payments, order history) in one page; no one shows a real redirect config; most cost numbers are unsourced. Two gig listings on page one signal a weak SERP.

## Our angle
"We have done this for every site in our portfolio, and for arrowbin.com itself." First-hand, Next.js 16 specific (the `proxy.ts` file convention, `permanent: true` = 308), with a real redirect pattern from arrowbin.com: old WordPress URLs with an equivalent get a permanent redirect in `next.config.ts`; URLs with no equivalent return **410 Gone** from `src/proxy.ts` so search engines drop them faster. Include an honest "when not to migrate" section (editors who publish daily and a tight budget). Cover WooCommerce stores, since several portfolio sites are Bangladesh e-commerce stores.

## Title, meta, excerpt
- **Title (58 chars):** WordPress to Next.js Migration: Steps, SEO Risks and Costs
- **Meta description (152 chars):** Moving from WordPress to Next.js? See the steps we follow, how to keep your Google rankings with redirects and 410s, and when staying on WordPress wins.
- **Excerpt:** Every site in our portfolio started on WordPress and now runs on Next.js. This is the process we follow, the SEO details that protect rankings, and when a move is not worth it.

## Outline (H2s as questions, each opening with the direct answer)
1. **Should you move from WordPress to Next.js?**
   Answer: Move when speed, security upkeep or custom features are costing you money; stay on WordPress when non-technical editors publish daily and the site works.
   **Comparison table columns:** Option (WordPress as is · Headless WordPress + Next.js · Next.js + another CMS or Markdown) | Editing experience | Plugin dependency | Security upkeep | Speed work needed | Who can maintain it | Best for. Absorbs "next.js vs wordpress".
2. **What are the steps in a WordPress to Next.js migration?**
   Answer: Inventory every URL and plugin, decide where content will live, map old URLs to new ones, rebuild templates as components, port SEO metadata, test on staging, then switch DNS and watch Search Console.
   Cover: numbered list of 8 to 10 steps; who does what (owner vs developer).
3. **Should you keep WordPress as a headless CMS or move the content out?**
   Answer: Keep WordPress headless if editors rely on its admin and plugins for content; move content out when the site is mostly static or the plugins are the problem.
   Cover: REST vs GraphQL (WPGraphQL) in one line each; preview, roles, revisions; the cost of running two systems.
4. **How do you keep your Google rankings during the move?**
   Answer: Give every old URL a server-side permanent redirect to its closest new page, return 410 for pages you are deleting on purpose, keep redirects for at least a year, and expect some temporary movement.
   Cover: Google site-move guidance (sourced); Next.js `permanent: true` returns 308; the 1,024-redirect platform limit on Vercel and the proxy approach beyond it; arrowbin.com's own pattern (redirects in `next.config.ts`, 410 in `src/proxy.ts`); canonical tags, sitemap, structured data, internal links.
   **Diagram:** redirect decision flow (see chart 3).
5. **What happens to plugins, forms and WooCommerce?**
   Answer: Each plugin's job is rebuilt as code or replaced with a service; list what every plugin does before you start, because some do more than their name suggests.
   **Table columns:** Plugin type (SEO, forms, caching, security, page builder, WooCommerce, payments, analytics, multilingual) | What it did | Next.js replacement | Watch-out.
   Cover: WooCommerce options (headless WooCommerce, move to a custom checkout, or move to Shopify); keeping order history and customer accounts; local payment gateways (link to the Bangladesh payment post when live).
6. **How long does a WordPress to Next.js migration take?**
   Answer: It depends mainly on page templates, plugins to replace and whether there is a store; use our own ranges from founder input.
   Cover: drivers table (templates, content volume, store, integrations, multilingual). Use Arrowbin's ranges only if the founder supplies them; otherwise give drivers, not numbers.
7. **What does a migration cost, and what drives it?**
   Answer: Cost follows the same drivers as the timeline: templates, plugin replacements, e-commerce and the redirect work. Hosting can cost less or more than WordPress hosting depending on traffic and setup.
   Cover: cost drivers; link to the custom software cost post for rates. No price ranges unless the founder supplies them.
8. **Is Next.js more secure than WordPress?**
   Answer: A Next.js site has a smaller public attack surface because there is no public admin or plugin layer by default, but it still needs patched dependencies and secure hosting.
   Cover: Patchstack 2025 data (91% of new WordPress-ecosystem vulnerabilities in plugins, 46% unpatched at disclosure); what still needs care in Next.js (dependencies, environment variables, API routes).
9. **What should you check in the first 30 days after launch?**
   Answer: Watch Search Console coverage and 404 reports daily for the first two weeks, re-crawl the old URL list, and fix any redirect that lands on the wrong page.
   Cover: checklist (crawl old URLs, GSC page indexing, Core Web Vitals report, forms and payments test, analytics events, backup).

## Original chart and diagram ideas
1. **Bar or donut: WordPress's share of the web.** Data: 40.0% of all websites, 58.5% of sites with a known CMS (data as of 14 Oct 2026). Source: https://w3techs.com/technologies/details/cm-wordpress
2. **Stacked bar: where WordPress vulnerabilities come from (2025).** Data: 11,334 new vulnerabilities, 91% plugins, 9% themes, 6 in core; +42% vs 2024. Source: https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/
3. **Flowchart: what to do with each old URL.** Old URL → has an equivalent page? → 308 permanent redirect; merged into another page? → 308 to the closest page; deleted on purpose with no equivalent? → 410 Gone; spam or junk parameters? → redirect to clean URL. Data: arrowbin.com's `next.config.ts` and `src/proxy.ts` (first-hand) plus Google's site-move guidance.
4. **Architecture diagram: three ways to run the site.** Classic WordPress; headless WordPress feeding Next.js; Next.js with content in a headless CMS or Markdown. No data needed.
5. **Phase timeline (Gantt style).** Inventory, content model, build, SEO port, staging QA, cutover, 30-day watch. Week counts only from founder input; otherwise show phases without durations.

## FAQs
1. **Will I lose my Google rankings if I move to Next.js?** Some movement is normal during any site move. Complete permanent redirects, kept for at least a year, are what protect rankings long term.
2. **Can I keep editing in WordPress after moving to Next.js?** Yes, with a headless setup: editors keep the WordPress admin and Next.js renders the public site.
3. **Should I use 301 or 308 redirects?** Google treats both as permanent. Next.js uses 308 when `permanent: true` is set.
4. **What should happen to old pages I am deleting?** Return 410 Gone for pages removed on purpose with no replacement, and redirect pages that have a close equivalent.
5. **Is Next.js faster than WordPress?** It can be, because pages can be pre-rendered and served from a CDN, but a badly built Next.js site can still be slow. Measure before and after.
6. **Can WooCommerce move to Next.js?** Yes. You can keep WooCommerce as the store backend, or move products and checkout to another system. Plan order history and customer accounts first.
7. **Do I need Vercel to host Next.js?** No. Next.js runs on any Node.js host or container platform; check redirect and caching limits on the platform you choose.
8. **How many redirects can Next.js handle?** The config file works well for a list known in advance; platforms may cap it (Vercel at 1,024), and larger sets belong in proxy code backed by a lookup.

## Internal links
| Target | Anchor text |
|---|---|
| `/services/custom-software-development` | rebuild your site on Next.js |
| `/services/ecommerce-development` | move a WooCommerce store to a custom storefront |
| `/services/cloud-devops-hosting` | hosting and deploys for Next.js |
| `/services/maintenance-support` | keep the new site patched |
| `/work` | sites we have moved from WordPress to Next.js |
| `/blog/how-much-does-custom-software-development-cost` | what custom development costs |
| `/blog/payment-gateway-integration-bangladesh` (when live) | local payment gateways after the move |

## Verified facts to cite (all opened 15 Oct 2026)
| Fact (exact) | Source URL | Published |
|---|---|---|
| WordPress is used by 40.0% of all websites and 58.5% of websites whose CMS is known | https://w3techs.com/technologies/details/cm-wordpress | data as of 14 Oct 2026 |
| "Overall 11,334 new vulnerabilities were found in the WordPress ecosystem in 2025", "a 42% increase compared to 2024"; "91% of new vulnerabilities were found in plugins, and 9% were found in themes"; "only 6 vulnerabilities reported in the WordPress core"; "46% of vulnerabilities did not receive a patch by the time of disclosure"; weighted median time to first exploit 5 hours | https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ | updated 25 Feb 2026 |
| Google: keep redirects "generally at least 1 year"; "Expect temporary fluctuation in site ranking during the move"; small to medium sites can take "a few weeks for most pages to move"; use server-side permanent redirects such as 301 and 308 | https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | last updated 20 Aug 2026 |
| Next.js `redirects` returns 307 or 308 via the `permanent` option; "on Vercel, there's a limit of 1,024 redirects. To manage a large number of redirects (1000+), consider creating a custom solution using Proxy"; `redirects` runs before Proxy | https://nextjs.org/docs/app/guides/redirecting | last updated 19 Aug 2026 |
| Next.js: `permanent: true` "will use the 308 status code which instructs clients/search engines to cache the redirect forever" | https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects (same text in `node_modules/next/dist/docs`, Next.js 16.2.9) | Next.js 16.2.9 docs |
| First-hand: arrowbin.com sends old WordPress-era URLs with an equivalent to the current page with permanent redirects (`next.config.ts`), and returns 410 Gone with `x-robots-tag: noindex` for URLs with no equivalent (`src/proxy.ts`) | repo files | current build |
| Kavanagh checklist: crawl the site and export Search Console landing pages, then keep, redirect, consolidate, return 404 or 410, or noindex | https://johnkavanagh.co.uk/articles/wordpress-to-nextjs-migration-checklist/ | 24 Feb 2026 (cite only as "one practitioner's checklist" if needed) |

## Length
2,800 to 3,400 words.

## Do not claim
- Speed, ranking, traffic or conversion improvements for any portfolio site (Silent Lifestyle BD, FlexOver BD, North Bengal Agro Farms, Maneel Club, Brandingly, গ তে গয়না, YT Shop India, OutNet). Name them only as WordPress to Next.js rebuilds, if at all.
- "Zero ranking loss" or any guarantee about rankings.
- Cost or timeline ranges from dev.to/techpotions (page now returns 404), Kolonell (conflicting city pages) or eseospace (unsourced). Use founder-supplied ranges or none.
- "30–50% traffic drop without redirects" or similar unsourced percentages.
- That Next.js is "unhackable" or needs no maintenance.
- No em dashes.
