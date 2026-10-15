# Topic research: what to write tonight (R1, 15 October 2026)

**Agent:** R1 (trend + keyword research). **Inputs:** live web search and page fetches on 15 Oct 2026, plus `04-keywords/`, `03-serp/`, `05-keyword-map/keyword-map.md`, `06-content-plan/content-plan.md`, `02-competitors/gap-analysis.md`, `07-geo-aeo/`.

**Limits, stated up front**
- No keyword-volume tool or Google Trends access tonight. Search volumes in this file are **not measured**. Trend momentum is a judgment built from dated news, primary data releases, how fresh the visible results are (share of 2026-dated pages), and new supply (agencies and gig sellers launching offers for the topic).
- "SERP" below means the results returned by web search on 15 Oct 2026 (US-based search). It approximates Google page one; it is not a rank tracker.
- Every number below has a source URL and date. Items marked **not opened** were seen only in search snippets and must not be cited until a writer opens the page.

---

## 1. Trend evidence

### A. AI-built ("vibe-coded") apps hitting production
| Signal | Source | Date |
|---|---|---|
| Collins named "vibe coding" its Word of the Year 2025, defined as "the use of artificial intelligence prompted by natural language to write computer code" | https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts | 6 Nov 2025 |
| 84% of developers use or plan to use AI tools; 46% distrust AI output accuracy vs 33% who trust it; 66% cite "almost right, but not quite" answers as their top frustration | https://survey.stackoverflow.co/2025/ai | 2025 survey |
| 45% of AI-generated code samples failed security tests and introduced OWASP Top 10 flaws (100+ LLMs tested; Java 72% failure) | https://www.veracode.com/blog/genai-code-security-report/ | 30 Jul 2025 |
| CVE-2025-48757: 170 of 1,645 scanned Lovable projects (10.3%) had missing or weak Supabase Row Level Security; 303 vulnerable endpoints | https://mattpalmer.io/posts/statement-on-CVE-2025-48757/ | 29 May 2025 |
| Wiz found a Supabase key in Moltbook's client-side JavaScript with no RLS policies, exposing about 1.5 million API tokens and 35,000 email addresses | https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys | 2 Feb 2026 |
| Supply is forming around the problem: Redwerk ("vibe coding cleanup specialist"), CodeConductor ("finish vibe coded apps"), Tepesoft ("vibe code production"), Fiverr gigs ("I will rescue your lovable, bolt, or v0 app"), and Sourcetoad's Lovable/Cursor-to-production pages (noted in `02-competitors/gap-analysis.md` gap 8) | SERP, see brief | 15 Oct 2026 |

**Read:** the strongest 2026 trend for Arrowbin's buyers. Founders now arrive with a working AI-built prototype and need someone to make it safe, tested and maintainable. The visible results are almost all 2026-dated vendor or tool blogs. No large agency owns the topic.

### B. Agentic commerce (AI assistants that shop)
| Signal | Source | Date |
|---|---|---|
| OpenAI moved away from in-chat Instant Checkout (launched Sept 2025): merchants use their own checkout while OpenAI focuses on product discovery. OpenAI said the first version "did not offer the level of flexibility that we aspire to provide" | https://techcrunch.com/2026/03/24/openais-plans-to-make-chatgpt-more-like-amazon-arent-going-so-well | 24 Mar 2026 |
| Shopify Agentic Storefronts: products managed from Shopify Admin appear in ChatGPT, Microsoft Copilot, AI Mode in Google Search and the Gemini app; an "Agentic plan" lets non-Shopify brands add products to Shopify Catalog; ChatGPT sales carry "no transaction fees beyond standard processing rates" | https://shopify.com/news/agentic-commerce-momentum | 24 Mar 2026 |
| Universal Commerce Protocol (UCP): open standard (Apache 2.0) co-developed by Google, Shopify, Walmart, Amazon, Stripe, Salesforce and others; covers catalog, checkout and order/post-purchase; "Compatible with MCP, A2A" | https://ucp.dev/ | 2026 (copyright line) |
| Agentic Commerce Protocol (ACP): open source (Apache 2.0), developed by Stripe and OpenAI | https://www.agenticcommerce.dev/ | page undated |
| OpenAI merchant docs: product feeds go in by SFTP file upload or by API | https://developers.openai.com/commerce | fetched 15 Oct 2026 |
| "None of the major AI crawlers currently render JavaScript" (GPTBot, ClaudeBot fetch JS files but do not execute them) | https://vercel.com/blog/the-rise-of-the-ai-crawler | 17 Dec 2024 |
| Adobe: AI-sourced visits to US retail sites +393% YoY in Q1 2026 | business.adobe.com/blog/ai-traffic-surge-retail-sites-not-machine-readable | **not opened** (timed out twice). Do not cite until a writer opens it |

**Read:** a clearly 2026 topic with fresh, conflicting coverage (the in-chat checkout story reversed in March). Most pages are Shopify-centric. Owners of WooCommerce or custom stores have almost no practical guide, which is exactly Arrowbin's client base.

### C. AI agents and small-business AI adoption
| Signal | Source | Date |
|---|---|---|
| US: AI use among businesses "hovered between 17% and 20%" from Dec 2025 to May 2026; 37% of firms with 250+ employees; under 20% for firms with 1–4 employees; 20–23% expect to use AI within six months | https://census.gov/library/stories/2026/05/ai-use-businesses.html | 26 May 2026 |
| UK: around 35% of businesses with 10+ employees use at least one AI technology (up from around 12% in late 2023); 28% of 0–9 employee firms; 49% of 250+ | https://cy.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026 | 20 Jul 2026 |
| US small businesses: nearly 40% using or planning to use AI (2024 Small Business Credit Survey); barriers include cost of tools, staff time for training, knowledge gaps | https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/ | 15 Jul 2026 |
| Model prices are tiered enough that small-business running costs can be modelled from official price lists (for example Claude Haiku 5.5 at $0.10 per million input tokens; Gemini 2.5 Flash-Lite at $0.10 input / $0.40 output) | https://platform.claude.com/docs/en/about-claude/pricing ; https://ai.google.dev/gemini-api/docs/pricing (last updated 14 Oct 2026) | fetched 15 Oct 2026 |
| The visible results for AI agent cost are all 2026-dated agency cost guides (SoluLab, Cleveroad, SoftTeco, Apptunix, Creole, Greenice) | SERP | 15 Oct 2026 |

**Read:** adoption is rising and small firms lag large ones, so "what would an agent cost us and is it worth it" is a live buyer question. The head term is crowded with content-heavy agencies; the small-business variant is more contestable.

### D. WordPress to Next.js
| Signal | Source | Date |
|---|---|---|
| WordPress runs 40.0% of all websites and 58.5% of sites with a known CMS (the installed base that migrations come from) | https://w3techs.com/technologies/details/cm-wordpress | data as of 14 Oct 2026 |
| 11,334 new WordPress-ecosystem vulnerabilities in 2025, a 42% increase on 2024; 91% in plugins, 9% in themes, 6 in core; 46% had no patch by disclosure; weighted median time to first exploit 5 hours | https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ | updated 25 Feb 2026 |
| Commercial interest in migration cost is visible: 2026-dated cost posts (dev.to/techpotions, a run of near-duplicate Kolonell city posts) and a Vercel community case study | SERP | 15 Oct 2026 |

**Read:** steady rather than spiking, but this is Arrowbin's deepest first-hand experience (every live portfolio site is a WordPress to Next.js rebuild, and arrowbin.com itself moved off a 2023 WordPress site with 308 redirects and 410s in `next.config.ts` and `src/proxy.ts`). The results are small agencies, gig listings and a content farm, which a detailed first-hand post can beat.

### E. Bangladesh e-commerce payments
| Signal | Source | Date |
|---|---|---|
| Bangladesh Bank MFS data (latest month on the page, Feb 2025): 2,392.40 lakh registered customers (about 239.2 million accounts), 871.54 lakh active (about 87.2 million), 1,856,190 agents, Tk 164,726.30 crore transacted in the month | https://www.bb.org.bd/en/index.php/financialactivity/mfsdata | fetched 15 Oct 2026 (data month Feb 2025) |
| SSLCommerz publishes Tk 25,500 (Basic, non-refundable) and 2.5% per successful transaction (3.5% AMEX) across "Visa, Mastercard, bKash, Nagad, Rocket, and more" | https://sslcommerz.com/pricing/ | fetched 15 Oct 2026 |
| Shopify Payments is not available in Bangladesh, so Bangladeshi Shopify stores must use a third-party provider | https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries | fetched 15 Oct 2026 |
| Two stores Arrowbin rebuilt show local payment options on their public pages: silentlifestylebd.com ("Pay on delivery • bKash • Nagad • Card") and flexoverbd.com ("Cash on Delivery", "bKash", "Nagad", "Rocket", Visa, Mastercard) | live pages | fetched 15 Oct 2026 |

**Read:** not a spike, but a durable, practical question for Bangladeshi store owners, and the results are thin (plugin pages, old listicles, vendor pages). Arrowbin has live proof.

### F. Tested and weaker
- **MCP for small business:** agencies writing about it say it is an awareness item for 2026 rather than a build item for most merchants (1digitalagency, scandiweb results). Low buyer intent today. Fold MCP into the agentic commerce and AI agent posts as a section.
- **Core Web Vitals / INP:** not new in 2026; web.dev and Google own the results. Use inside the WordPress migration post instead.
- **Outsourcing to Bangladesh:** high intent, but the planned P1 landing page `/offshore-software-development-bangladesh` owns it. A blog post would cannibalise it.
- **Bangladesh e-commerce market size:** estimates conflict badly (ECDB, CPD via Apparel Resources, Daily Star op-ed, Global Brands Magazine) and none was opened tonight. Not a post on its own.

---

## 2. Scored candidates

Scale 1 (weak) to 5 (strong). **Winnability** = chance a 2-referring-domain site can reach page one with a deep first-hand post. **Service fit** includes whether Arrowbin has real experience to add. **AI-citation** = how likely an answer engine is to quote a clear table, checklist or number from the post.

| # | Topic (working slug) | Primary keyword (as people phrase it) | Trend | Intent | Win | Fit | AI cite | Total | Notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `vibe-coded-app-production-ready` | vibe coded app production ready | 5 | 4 | 4 | 4 | 4 | **21** | 2026-dated vendor blogs only; feeds custom software and maintenance pages |
| 2 | `wordpress-to-nextjs-migration` | wordpress to next.js migration | 3 | 4 | 4 | 5 | 4 | **20** | 8 live rebuilds + arrowbin.com's own migration |
| 3 | `payment-gateway-integration-bangladesh` | payment gateway integration bangladesh / bkash payment gateway integration | 3 | 4 | 4 | 5 | 4 | **20** | Bangladesh buyers; plugin pages and old listicles rank |
| 4 | `ai-agent-cost-small-business` | how much does an ai agent cost for a small business | 5 | 4 | 3 | 4 | 4 | **20** | Avoid the head term; the AI service page gets no blog links today |
| 5 | `chatgpt-shopping-for-online-stores` | how to get products on chatgpt shopping | 5 | 3 | 3 | 4 | 5 | **20** | Non-Shopify angle is the gap |
| 6 | `shopify-vs-custom-ecommerce` | shopify vs custom ecommerce website | 2 | 5 | 4 | 5 | 4 | 20 | Planned P1 (Low difficulty in `03-serp`); 2026 angle from Agentic Storefronts |
| 7 | `ecommerce-website-cost-bangladesh` | ecommerce website cost in bangladesh | 2 | 5 | 4 | 5 | 3 | 19 | **Parked:** needs founder price ranges (sprint rule 4) |
| 8 | `mvp-development-cost` | mvp development cost | 2 | 5 | 3 | 4 | 4 | 18 | Planned P1; sibling of the MVP timeline post, different primary |
| 9 | `software-maintenance-cost` | how much does software maintenance cost | 2 | 4 | 3 | 5 | 4 | 18 | Results: Kolonell city pages, Chop Dawg, Wavect |
| 10 | `vibe-coding-vs-hiring-a-developer` | vibe coding vs hiring a developer | 4 | 4 | 3 | 4 | 3 | 18 | **Fold into #1** (same cluster; avoid cannibalising) |
| 11 | `courier-api-integration-bangladesh` | steadfast / pathao courier api integration | 2 | 3 | 5 | 4 | 3 | 17 | Bangladesh; almost no editorial results, only packages and plugins |
| 12 | `saas-development-cost` | saas development cost | 2 | 5 | 2 | 4 | 4 | 17 | Medium-High in `03-serp` |
| 13 | `nextjs-vs-wordpress` | next.js vs wordpress for business website | 3 | 4 | 3 | 4 | 3 | 17 | **Fold into #2** as a "should you migrate" section |
| 14 | `ai-agent-development-cost` (head) | ai agent development cost | 5 | 4 | 1 | 4 | 3 | 17 | SoluLab, Cleveroad, SoftTeco, Apptunix own it; use #4 instead |
| 15 | `mcp-server-for-business` | do I need an mcp server | 4 | 2 | 3 | 3 | 3 | 15 | Awareness topic; fold into #4 and #5 |

**Cannibalisation check against the 3 live posts:** none of the picks targets "how much does custom software development cost", "how to choose a software development company" or "how long does it take to build an mvp". `mvp-development-cost` (backup 2) is the only neighbour; it targets cost, not time, and must link to the timeline post rather than repeat its table.

---

## 3. Decision

### Top 5 to write tonight (priority order)
| # | Slug | Primary keyword | Why |
|---|---|---|---|
| 1 | `vibe-coded-app-production-ready` | vibe coded app production ready | The clearest 2026 buyer trend: founders with AI-built prototypes need production hardening, and no big agency owns the results yet. Feeds custom software, SaaS and maintenance. |
| 2 | `wordpress-to-nextjs-migration` | wordpress to next.js migration | Arrowbin's deepest first-hand experience (every live site, plus arrowbin.com). Results are small agencies, gigs and a content farm. |
| 3 | `payment-gateway-integration-bangladesh` | payment gateway integration bangladesh | Serves Bangladesh buyers with live proof; primary docs (SSLCommerz, bKash, Bangladesh Bank) let us out-cite thin plugin pages. |
| 4 | `ai-agent-cost-small-business` | how much does an ai agent cost for a small business | 2026 trend with buyer intent; we can model running cost from official price lists, which competitors don't. Gives the AI automation page its first blog links. |
| 5 | `chatgpt-shopping-for-online-stores` | how to get products on chatgpt shopping | 2026 trend (OpenAI's March pivot, Shopify Agentic Storefronts, UCP). The gap is non-Shopify stores, which is who Arrowbin builds for. |

Trend check: #1, #4 and #5 ride clearly 2026 trends. Bangladesh check: #3.

### Backups (priority order)
1. `shopify-vs-custom-ecommerce` (shopify vs custom ecommerce website): planned P1, Low difficulty, first-hand; brief written.
2. `mvp-development-cost` (mvp development cost): planned P1; brief written.
3. `software-maintenance-cost` (how much does software maintenance cost): feeds `/services/maintenance-support`.
4. `courier-api-integration-bangladesh` (steadfast pathao courier api integration): Bangladesh, near-empty results; pairs with #3.
5. `saas-development-cost` (saas development cost): feeds `/services/saas-product-engineering`.

Briefs: `briefs/<slug>.md` for the top 5 and backups 1 and 2.

### Founder questions that would sharpen these posts
- Which payment gateway (SSLCommerz, bKash direct, Nagad direct, aamarPay, shurjoPay) and which courier APIs sit behind each Bangladesh store we rebuilt? The public pages show COD, bKash, Nagad, Rocket and cards, but not the gateway.
- Typical scope and week counts for our WordPress to Next.js rebuilds (ranges only, no client names attached) so post #2 can use our own numbers instead of competitors'.
- Has Arrowbin taken over an AI-built (Lovable, Bolt, v0, Cursor) codebase? If not, post #1 must be written as an engineering checklist, not a case study.
