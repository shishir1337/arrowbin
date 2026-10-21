# Search Console check, 20 October 2026

Property: `https://arrowbin.com/` (URL prefix). Performance data runs to 18 Oct (Google's usual 2-day lag). Checked in the founder's browser, read-only except for the indexing requests listed below.

## What is happening

**The 15 Oct deploy worked: impressions went up about 50x.**

| Day | Clicks | Impressions | Avg position |
|---|---|---|---|
| 1 to 14 Oct (daily average) | 0 | about 2 | varies |
| 15 Oct (deploy day) | 2 | 9 | 23.4 |
| 16 Oct | 0 | 112 | 36.8 |
| 17 Oct | 1 | 180 | 37.6 |
| 18 Oct | 0 | 196 | 38.1 |

Last 3 months in total: 10 clicks, 689 impressions, average position 32.8. Nearly all clicks are people searching "arrowbin".

**Clicks have not followed, because most new impressions are on page 4 or 5.**

| Page | Impressions (3 months) | Avg position |
|---|---|---|
| /blog/mvp-development-cost | 248 | 45.0 |
| / (home) | 167 | 13.3 |
| /blog/courier-api-integration-bangladesh | 78 | **6.9** |
| /work | 70 | 12.6 |
| /about | 67 | 6.4 |
| /blog/software-maintenance-cost | 61 | 41.3 |
| /blog/how-long-does-it-take-to-build-an-mvp | 34 | 39.1 |
| /blog/saas-development-cost | 30 | 59.3 |
| /blog/payment-gateway-integration-bangladesh | 15 | **14.0** |
| /blog/vibe-coded-app-production-ready | 8 | 10.0 |
| /blog/developer-salaries-by-country | 7 | 7.9 |
| /work/maneel-club | 4 | 8.3 |
| /blog/shopify-vs-custom-ecommerce | 4 | 9.3 |

**Where we rank depends on the country (last 7 days).**

| Country | Clicks | Impressions | Avg position |
|---|---|---|---|
| United States | 0 | 168 | 51.6 |
| **Bangladesh** | **3** | **98** | **7.5** |
| Canada | 0 | 37 | 41.5 |
| Switzerland | 0 | 32 | 39.0 |
| Australia, Germany, France, UK, Sweden | 0 | 20 to 28 each | 37 to 47 |

US "MVP cost" searches are crowded with agencies that have thousands of links, and Arrowbin sits around position 45 there. Bangladeshi developer and e-commerce searches are thin, and Arrowbin got into the top 10 within days:

| Query | Avg position |
|---|---|
| "steadfast sandbox api" | 7.5 |
| "steadfast sandbox" | 6 |
| "redx api documentation" | 7 |
| "pathao sandbox" | 9 |

**The real bottleneck is links.** The Links report shows 81 external links from only **4 sites**: maneelclub.com (28), brandingly.agency (26), nbafl.net (26) and github.com (1). The top anchor text is still "arrowbin llc". There is no LinkedIn company page and no claimed Clutch profile yet (`src/lib/site.ts` sameAs).

## Indexing status (URL Inspection, 20 Oct)

**Indexed:**
- /services/saas-product-engineering (new since 18 Oct)
- /work/maneel-club
- /privacy
- every blog post except the two below
- the core pages

**Not indexed, re-requested today (9 requests):**

| URL | Status |
|---|---|
| /services/custom-software-development | Discovered, not indexed |
| /services/ecommerce-development | Discovered, not indexed |
| /services/maintenance-support | Discovered, not indexed |
| /blog/chatgpt-shopping-for-online-stores | Discovered, not indexed |
| /services/mobile-app-development | Unknown to Google |
| /services/ui-ux-design | Unknown to Google |
| /services/ai-automation | Unknown to Google |
| /services/cloud-devops-hosting | Unknown to Google |
| /blog/ai-automation-for-small-business | Unknown to Google |

These pages are not broken. Each one:
- returns 200 to a Googlebot user agent;
- has `index, follow` and a self canonical;
- is linked from blog posts.

Google has simply not crawled them yet. After each request, Search Console now says "Submitting a page multiple times will not change its queue position or priority". So **don't re-request them again**; re-check on 27 Oct instead.

**Other checks:**
- **Sitemap:** read on 19 Oct, 34 URLs, status Success.
- **Pages report:** still frozen at the 12 Oct snapshot (7 indexed, 5,194 not indexed: old Japanese spam URLs). Google refreshes it on its own schedule.
- **5xx Validate Fix:** started 18 Oct, still running.
- **Removals:** the founder's `?channel=` prefix request (17 Oct) shows "Temporarily removed". `site:arrowbin.com` still lists the home page plus 10 others, so the site has not been hidden. Keep checking it weekly until the request expires.
- **Live site:** Clarity, the cookie banner, the arrowbinhq Facebook and GitHub links, and llms.txt are all deployed.

## Update, 21 October

Checked again in the founder's Brave browser. Nothing needed fixing, and no indexing requests were made.

**Performance:** the daily data still ends on 18 Oct. The 24-hour view (20 Oct midday to 21 Oct morning) shows 1 click, 180 impressions and average position 37.4, so the post-deploy level is holding.

**Indexing progress since 20 Oct:**

| URL | 20 Oct | 21 Oct |
|---|---|---|
| /blog/ai-automation-for-small-business | Unknown to Google | **Indexed** |
| /services/ui-ux-design | Unknown to Google | Discovered, not indexed |
| /services/ai-automation | Unknown to Google | Discovered, not indexed |
| /services/cloud-devops-hosting | Unknown to Google | Discovered, not indexed |
| /services/custom-software-development | Discovered | Discovered |
| /services/ecommerce-development | Discovered | Discovered |
| /blog/chatgpt-shopping-for-online-stores | Discovered | Discovered |
| /services/mobile-app-development | Unknown to Google | Unknown to Google |
| /services/maintenance-support | Discovered | Unknown to Google |

The maintenance page going back to "unknown" is Google's reporting, not the site: the page is in the live sitemap and returns 200. Also newly confirmed as indexed: /work/north-bengal-agro-farms, /services, /contact and /terms. Every sitemap URL except the 8 above is now indexed.

**AI features report (new in Search Console, beta):** 93 impressions in Google's AI answers over 3 months, 10 of them in the last 24 hours.
- **Pages:** home 64, courier API guide 13, payment gateway guide 9, /about 4.
- **Countries:** Bangladesh 30, United States 16, India 10.

The two Bangladesh guides are the posts Google already uses in AI answers.

**Crawl stats:**
- The average response time across the period is 1.29 s, but that figure is pulled up by spikes on the old site in August and September.
- Since the 15 Oct deploy, response time is 400 to 630 ms a day. The live pages measured 0.27 to 0.48 s to first byte and are served from cache.
- Host status: "Host had problems in the past". These were server connectivity failures in mid-August (the old site). The recent rate is acceptable, and the warning drops out of the 90-day window in mid-November.

**Unchanged:**
- **Sitemap:** last read 19 Oct, 34 URLs, Success.
- **Pages report:** still the 12 Oct snapshot.
- **5xx Validate Fix:** still "Started".
- **Removals:** the same two requests, both "Temporarily removed".
- **`site:arrowbin.com`:** still lists the home page and 9 other pages.
- **Links:** 81 links from 4 sites.
- **Manual actions and security issues:** none.

### Indexing requests, 21 October (later, at the founder's request)

All 8 pages that were still not indexed were inspected again and re-requested. Each request ended with "Indexing requested: URL was added to a priority crawl queue".

| URL | Status before the request |
|---|---|
| /services/ui-ux-design | Unknown to Google |
| /services/ai-automation | Discovered, not indexed |
| /services/cloud-devops-hosting | Discovered, not indexed |
| /services/custom-software-development | Discovered, not indexed |
| /services/ecommerce-development | Discovered, not indexed |
| /services/mobile-app-development | Discovered, not indexed (was "unknown" on 21 Oct morning) |
| /services/maintenance-support | Discovered, not indexed (was "unknown" on 21 Oct morning) |
| /blog/chatgpt-shopping-for-online-stores | Discovered, not indexed (no referring page detected) |

Google repeats that "submitting a page multiple times will not change its queue position or priority", so there is nothing more to request. Re-check on 27 Oct.

### Bing Webmaster Tools, 21 October

The site was already set up in Bing Webmaster Tools.
- **Sitemap:** submitted 16 Oct, read 18 Oct, 34 URLs, Success.
- **Indexing:** Bing has indexed the home page ("Indexed successfully", no SEO issues). Other pages, for example the courier API guide, are "Discovered but not crawled", found 16 Oct.
- **Search performance:** data starts 18 Oct, with 0 clicks and 0 impressions so far.
- **AI Performance (Copilot citations):** no data yet.
- **Recommendations:** no data yet.
- **Backlinks:** 3 referring domains (nbafl.net 25, maneelclub.com 2, brandingly.agency 1).

**IndexNow had never been sent:** before today, the submitted-URL list in Bing was empty. On 21 Oct `node scripts/indexnow.mjs` returned "200 OK for 34 URLs", and all 34 now show in Bing as submitted "Today". Check again around 28 Oct: inspect the courier guide and a service page, and look at Search Performance.

Run `node scripts/indexnow.mjs` after every deploy that adds or changes pages, as the script header says.

## Why not the Google Indexing API

Google's documentation (updated 16 Oct 2026) restricts the Indexing API to pages with JobPosting or BroadcastEvent (livestream) markup. It also says every submission goes through spam detection, and abuse can get access revoked. Service pages and blog posts don't qualify. More importantly, it wouldn't fix anything: these URLs are already known to Google through the sitemap and IndexNow. Google is choosing when to crawl them, and links and visits are what move that.

What can be automated legitimately is checking. The Search Console API gives performance data and URL Inspection status (about 2,000 inspections a day) to a service account that is added as a user on the property. That would replace the manual weekly check with a script. It cannot request indexing.

## Plan to bring traffic, in order

| # | What | Who | Time | Why |
|---|---|---|---|---|
| 1 | ~~Verify **Bing Webmaster Tools**, then run `node scripts/indexnow.mjs`~~ **Done.** The site was already verified, with its sitemap submitted 16 Oct. IndexNow was first sent on 21 Oct (see the Bing section above). | founder, Claude | done | Bing's index feeds ChatGPT search, Copilot and DuckDuckGo. |
| 2 | **Off-page kit days 2 to 5** (`13-sprint-2026-10-15/offpage-kit/`): LinkedIn company page, claim Clutch, ask Maneel Club and NBAF for Clutch reviews (both already approved their quotes), and ask each client to change the footer anchor from "Arrowbin LLC" to "Arrowbin" and point it at its case study | founder | about 3 h over a week | 4 linking sites is the ceiling on everything else. Each new real site helps every page, and the service pages get crawled faster. |
| 3 | **A Bangladesh e-commerce cluster** where we already rank 6 to 14. Candidate topics:<br>• one guide each for the Steadfast, Pathao and RedX APIs<br>• bKash and SSLCommerz checkout integration<br>• e-commerce website cost in Bangladesh (the brief is in `15-next-wave/`)<br>Each guide links to e-commerce development and the Maneel Club case study. | Claude writes, founder approves topics | 1 to 2 posts a week | It is the market Google already trusts us in, and Bangladeshi store owners are the actual client base. |
| 4 | **Open-source a small Bangladesh courier SDK** (one TypeScript client for Steadfast, Pathao and RedX) on github.com/arrowbinhq and npm, with the guide as its docs | Claude builds, founder decides | 2 to 3 days | The developers searching "steadfast sandbox api" land on us already. A useful package earns links, stars and mentions that directories can't. |
| 5 | **YouTube:**<br>• put the two 16:9 videos up with search-style titles, for example "Custom software development: when spreadsheets stop working", with a link to the service page<br>• cut 9:16 versions for Shorts<br>• first decide the channel's branding (company or personal) | founder | 1 h | The videos already exist. YouTube is a second search engine, and video results show in Google. |
| 6 | **Search Console API weekly report** (optional): the founder creates a Google Cloud service account, adds it as a restricted user in Search Console, and saves the key to a git-ignored file. Then a script prints clicks, impressions, top queries and the inspection status for all sitemap URLs. | founder 15 min, Claude the script | | Replaces this manual check |
| 7 | **Re-check on 27 Oct:**<br>• the service pages<br>• the Pages report<br>• the 5xx validation<br>• `site:arrowbin.com` | Claude | 20 min | |

**What to expect:** Google traffic for a site with 4 linking domains builds over 3 to 6 months. In the next few weeks, leads are more likely to come from direct channels: the Facebook groups, LinkedIn, and referrals from Maneel Club and NBAF. Items 2 and 3 are the ones that change the Google numbers.
