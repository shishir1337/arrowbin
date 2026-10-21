# Blog wave, 22 October 2026

Four new posts, chosen from real Search Console data and the founder's direction. Writers follow `docs/seo/13-sprint-2026-10-15/WRITING-GUIDE.md` and `SPRINT-RULES.md` (date 22 Oct 2026). Research notes and sources for each post are in `briefs/`; writer reports are in `agent-log.md`.

## The founder's direction (22 Oct 2026)

Posts must bring people who might hire Arrowbin, not developers. Developer guides (for example a Steadfast or RedX API reference) would bring traffic but not business, so they are off the blog. US buyers come first.

## What Search Console showed (3 months to 19 Oct 2026, web search)

| Measure | Value |
|---|---|
| Clicks | 11 |
| Impressions | 970 |
| Average position | 35.6 |
| United States | 372 impressions, average position 46.6 |
| Bangladesh | 147 impressions, average position 7.9 (5 clicks) |

| Page | Impressions | Average position |
|---|---|---|
| /blog/mvp-development-cost | 395 | 45.9 |
| /blog/courier-api-integration-bangladesh | 108 | 6.5 |
| /blog/developer-salaries-by-country | 17 | 9.8 |

Query groups:
- MVP cost and budget queries ("mvp development cost", "how much should i spend on a mvp", "mvp budget") are the biggest group, at positions 35 to 65. They are mostly US.
- Software maintenance cost queries: positions 46 to 62.
- Courier API developer queries ("steadfast sandbox api", "redx courier api", "pathao sandbox"): positions 6 to 10. These are developers, so we don't chase them.
- "headless commerce": 2 impressions at position 68.5. The site has some relevance and no page on it.
- "wordpress to next.js migration services/agency": position 71. That needs the service page in `15-next-wave`, not a post.

## The four posts

| Slug | Primary keyword | Reader | Why |
|---|---|---|---|
| `custom-software-vs-off-the-shelf` | custom software vs off the shelf | US small-business owner or ops lead outgrowing spreadsheets and SaaS | The step before hiring a custom software company; it also takes over the cost guide's short FAQ on the same question |
| `headless-commerce` | headless commerce / is headless commerce worth it | Owner or e-commerce lead of a growing online brand | Search Console already shows impressions; it feeds the e-commerce service page |
| `offshore-vs-nearshore-vs-onshore` | offshore vs nearshore vs onshore software development | US founder deciding where to hire | Buyers weighing a remote team, which is how Arrowbin works. It stays country-neutral, because the planned Bangladesh landing page owns "offshore Bangladesh" |
| `app-development-cost-bangladesh` | app development cost in bangladesh | Bangladeshi business owner, and foreign founders comparing a Bangladeshi team | The brief has been ready since 15 Oct; foreign buyers searching this are Arrowbin's prospects |

## Not in this wave, and why

- **Steadfast, Pathao and RedX API guides:** developer audience (founder's direction). The existing courier post stays as it is.
- **`fixed-price-vs-time-and-materials`:** still waiting on F4 (is the discovery call free, paid, or both).
- **WordPress to Next.js and vibe-code cleanup service pages:** pages, not posts; still waiting on F8.

## Status (22 Oct 2026, end of day)

All four posts are written, reviewed by the lead, registered in `src/lib/posts/index.ts` and building (`pnpm build` passes, and the sitemap lists 19 posts). They aren't committed or deployed yet.

**What the lead checked by hand**
- The five-year cost table in the custom vs off-the-shelf post.
- Every overlap figure in the offshore post, including the 2026–27 daylight-saving dates.
- The London and Sydney overlap in the Bangladesh post.
- Shopify's prices against shopify.com/pricing (USA | English, 22 Oct).

**Edits made during review**
- **App development cost in Bangladesh:**
  - It no longer puts a named vendor's blog rate beside that same vendor's Clutch rate.
  - It no longer says that vendor's own tables disagree.
- **Shopify vs custom (existing post):**
  - Yearly prices changed from $22 / $58 / $359 to $19 / $49 / $299.
  - The 3-year table and chart were recomputed.
  - The crossover moved from about $142,000 to about $152,000 a month.
  - The post is marked updated 22 Oct.
- **Cost guide FAQ "Is custom software cheaper than off-the-shelf?":** the answer was rewritten. The old "break-even within 2–3 years" line contradicted the new post's worked example.
- **E-commerce service keywords:** "headless commerce" became "headless commerce development", so the post owns the general term.
- **Service-page guide cards:**
  - Custom software now shows the off-the-shelf post instead of the choosing guide (still 3 cards).
  - Mobile apps adds the Bangladesh app cost post (2 cards become 3).

**Inbound body links added** (no paragraph has more than 2 links):

| Post | Linked from |
|---|---|
| Headless commerce | the Shopify vs custom post, the WordPress migration post, the ChatGPT shopping post |
| Custom vs off-the-shelf | the cost guide intro, the AI agent cost post, the AI automation post, the maintenance post |
| Offshore vs nearshore | the cost guide (location section), the choosing guide, the salary post, the Bangladesh app post |
| App cost Bangladesh | the cost guide, the SaaS cost post, the salary post, the payment gateway post |

The llms.txt blog line now names the new topics.

## For the founder

1. **Offshore post disclosure:** "Arrowbin's own engineering team is offshore, in Bangladesh, so weigh my view with that in mind." It's kept, because honesty helps with US buyers, and the Clutch profile already shows Dhaka. Say if you want it softened to "in a lower-cost country".
2. **Custom vs off-the-shelf** names Silent Lifestyle BD and Maneel Club as examples of custom admin features (no numbers). Say if you'd rather keep client names out of US-facing posts.
3. **App cost Bangladesh** cites Bdtask's and Dcastalia's published price lists as sources. That's neutral, but it does name local competitors.
4. **E-commerce service page copy** says headless storefronts "score high on Core Web Vitals and rank well on Google". The headless post explains that headless isn't fast by itself. Optional softening.
5. **Still waiting:** F4 (is the discovery call free, paid, or both) unblocks `fixed-price-vs-time-and-materials`; D4 (Arrowbin's own prices) would add a "What Arrowbin charges" box to the Bangladesh post.
