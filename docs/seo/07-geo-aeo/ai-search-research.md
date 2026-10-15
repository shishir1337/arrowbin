# AI search visibility research (GEO / AEO) for Arrowbin

**Date:** 29 September 2026. **Scope:** how ChatGPT search, Perplexity, Google AI Overviews / AI Mode, Gemini, Microsoft Copilot and Claude pick sources and brands for B2B service prompts ("best software development company for startups", "top software companies in Bangladesh", "who can build an MVP"), plus an audit of Arrowbin's AI-readiness.

House rules: every number below comes from the linked source. Where a number is from a vendor with a commercial interest (for example Clutch reporting on Clutch), that is flagged. Correlation studies are correlation, not proof of cause.

Companion files in this folder:
- `prompt-citation-map.csv`: 30 buyer prompts, the sources that currently answer them, the brands that recur.
- `geo-aeo-playbook.md`: what to do, in order.
- `ai-prompt-tracking.csv`: 40 prompts to re-test monthly.
- `llm-visibility-baseline.md` + raw file: the 29 Sep 2026 baseline (Arrowbin in 0 of 20 AI answers).

---

## 1. Key findings in one screen

1. **For "best X company" prompts, AI answers are assembled from listicles and directories.** Ahrefs found "best X" blog lists were 43.8% of page types cited by ChatGPT across 750 prompts that included software, product and agency queries ([Ahrefs, Dec 2025](https://ahrefs.com/blog/best-lists-research/)). Our own baseline test showed the same pattern: clutch.co and designrush.com were the most-cited domains, followed by agency-written "best companies" posts (see `llm-visibility-baseline.md`).
2. **Off-site brand mentions matter more than backlinks.** Across 75,000 brands, branded web mentions correlated with AI Overview visibility at 0.664, versus 0.218 for backlinks ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)). A 2026 follow-up reported YouTube mentions as the strongest correlate on every platform tested (0.74 for AI Overviews, 0.737 for ChatGPT) ([Business Wire, Ahrefs report, May 2026](https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals)).
3. **Freshness is close to mandatory for list content.** 79.1% of the "best" lists ChatGPT cited were updated in 2025, 26% within the previous two months ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)).
4. **Low-authority sites can get cited.** About 35% of the cited lists in that Ahrefs study came from domains with Domain Rating below 30 ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)). A new domain like arrowbin.com is not locked out.
5. **For agency prompts specifically, the company's own service pages get cited too.** When a company's own site appeared, internal landing pages were cited more than its blog lists in the agency category (30.4% vs 17.2%) ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)). Service pages need to be citable, not just the blog.
6. **Each engine has its own index and favourite sources.** Only 11% of domains are cited by both ChatGPT and Perplexity for the same query ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)). Visibility has to be tracked per engine.
7. **Being cited is what pays.** On Google results with AI Overviews, organic CTR fell 61% (1.76% to 0.61%), but brands cited inside the AI Overview earned 35% more organic clicks than uncited ones ([Seer Interactive, Sep 2025](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update); [2026 update](https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update)).
8. **Google says there is no special AI markup.** Its July 2026 guide states llms.txt, special schema and content chunking are not needed for AI Overviews / AI Mode; normal SEO fundamentals apply ([Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)).
9. **Arrowbin today:** 0% mention rate in 20 AI answers; no Clutch, GoodFirms, DesignRush, Crunchbase, Wikidata or LinkedIn company entity found; robots.txt and llms.txt are in good shape but the schema `sameAs` points to a placeholder LinkedIn URL. Details in section 5.

---

## 2. How each engine finds and chooses sources

| Engine | Where retrieval comes from | Source biases seen in studies | Implication for Arrowbin |
|---|---|---|---|
| **ChatGPT search** | Primarily Bing-based retrieval. Seer found 87% of SearchGPT citations matched Bing's top results ([Seer](https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results)); a later 400-query replication found far lower overlap (27%) ([AI+Automation](https://aiplusautomation.com/blog/bing-replication-chatgpt-citations)), and there is evidence of a Google fallback ([Search Engine Journal](https://www.searchenginejournal.com/chatgpt-appears-to-use-google-search-as-a-fallback/552089/)). Crawlers: OAI-SearchBot (search), ChatGPT-User (user fetch), GPTBot (training). | Wikipedia was the single most-cited ChatGPT domain in Profound's 680M-citation dataset ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)). Semrush saw heavy swings: Reddit fell from ~60% of responses to ~10% between Aug and Sep 2025, while Forbes, Medium and PR Newswire gained ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)). "Best X" lists dominate commercial prompts ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)). | Bing indexing is non-negotiable (Bing Webmaster Tools + IndexNow). Get onto the listicles ChatGPT cites. Press releases and bylined articles on high-trust publishers are a realistic path. |
| **Perplexity** | Own index (PerplexityBot) plus live fetch (Perplexity-User). | The most community-skewed engine: Reddit ~46.7% of its top-10 source share; also favours G2, Gartner and review aggregators for commercial queries ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)). Semrush: Reddit, LinkedIn among top domains ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)). | Reddit and LinkedIn presence (genuine, founder-led) and review profiles matter most here. |
| **Google AI Overviews** | Google index with "query fan-out" into sub-queries. Only 38% of cited pages rank in the top 10 for the query; 31% rank outside the top 100 ([Ahrefs, 2026](https://ahrefs.com/blog/ai-overview-citations-top-10/)). | YouTube is now the most cited AIO domain (5.6% of all citations) ([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)). Brand web mentions correlate most with AIO brand visibility ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)). | Rank for the sub-questions (cost, timeline, how to choose) not only the head term. Short YouTube explainers are an unusually strong lever. |
| **Google AI Mode / Gemini** | Google index, fan-out. | AI Mode top domains: LinkedIn, YouTube, Reddit, Google properties; Wikipedia in only ~2% of responses ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)). Kevin Indig's usability research found AI Mode users accept the shortlist the model builds rather than building their own ([Growth Memo](https://www.growth-memo.com/p/2026-growth-memo-research-summary)). | Being in the AI Mode shortlist is close to being in the consideration set. LinkedIn (company page + founder posts) is a priority surface. |
| **Microsoft Copilot** | Bing index. | Bing Webmaster Tools now has an **AI Performance** report (Feb 2026) showing Copilot citations, cited pages and "grounding queries" ([Bing blog](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)). | The only first-party AI citation report available. Verify arrowbin.com in Bing Webmaster Tools. |
| **Claude** | Web search appears to run on Brave Search: Brave is on Anthropic's subprocessor list and citations match Brave's results, though Anthropic has not formally confirmed it ([Profound](https://www.tryprofound.com/blog/what-is-claude-web-search-explained)). Crawlers: ClaudeBot (training), Claude-SearchBot (search indexing), Claude-User (user fetch) ([Search Engine Land](https://searchengineland.com/anthropic-claude-bots-470171)). | Few public source-share studies. | Make sure arrowbin.com is in Brave's index (Brave has a URL submission page). Allow Claude-SearchBot and Claude-User explicitly. |

### Cross-engine source types that matter for a software agency
- **Directories with reviews (Clutch, DesignRush, GoodFirms, Techreviewer, TechBehemoths, The Manifest, Expertise.com).** These appeared on almost every "best company" query we checked (see `prompt-citation-map.csv`). Clutch itself reports that Clutch Verified profiles average about 8x more AI citations than free profiles ([Clutch press release, May 2026](https://clutch.co/press-releases/ai-visibility-dashboard); vendor claim, treat with care). Clutch has also shipped an AI Visibility Dashboard with Conductor, which confirms it sees itself as an AI-citation source ([Business Wire](https://www.businesswire.com/news/home/20260505600976/en/Clutch-Launches-AI-Visibility-Dashboard-to-Help-B2B-Agencies-Improve-Their-Presence-in-AI-Search)).
- **Agency-written "best X companies" listicles.** Heavily cited despite obvious bias (lowcode.agency, esparkinfo.com, keyholesoftware.com, andersenlab.com, upsilonit.com, riseuplabs.com, vivasoftltd.com). Ahrefs found brands that write their own lists often rank themselves first, and higher list placement correlated with more ChatGPT recommendations ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)).
- **Reddit.** Top-cited domain across engines in several datasets ([Search Engine Land coverage of a 30M-source study](https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138); [Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)), but volatile on ChatGPT ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)). For agency prompts it shows up mainly on "how to choose / questions to ask" queries (baseline raw data cited r/webdev).
- **LinkedIn and YouTube.** Both in the top five across engines in the 30M-source study ([Search Engine Land](https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138)); LinkedIn is the top AI Mode domain ([Semrush](https://www.semrush.com/blog/most-cited-domains-ai/)).
- **Wikipedia / Wikidata.** Wikipedia is a major ChatGPT source ([Profound](https://www.tryprofound.com/blog/ai-platform-citation-patterns)), but Arrowbin is not Wikipedia-notable today. Wikidata's bar is lower: an item is acceptable if it fulfils a structural need or is backed by serious external references ([Wikidata:Notability](https://www.wikidata.org/wiki/Wikidata:Notability)). Practitioners report a Crunchbase entry, registry record or authoritative directory can be enough ([MLforSEO](https://www.mlforseo.com/knowledge-graph-strategy/wikidata-for-brands-notability-criteria-and-a-realistic-path/)); this is opinion, not policy. Build external references first, then create the item.
- **Structured data.** Not required for AI features ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)), but Organization/Person `sameAs` still helps disambiguate the entity for all engines and knowledge graphs. Keep it; fix it (section 5).

---

## 3. What content gets cited (page-level patterns)

- **Focused pages beat "ultimate guides".** Kevin Indig's analysis of 815K query-page pairs found focused pages outperform sprawling guides for ChatGPT citations; a separate 1.2M-result analysis found AI reads "like a busy editor", favouring what is stated early and plainly ([Growth Memo research summary](https://www.growth-memo.com/p/2026-growth-memo-research-summary); [The science of how AI picks its sources](https://www.growth-memo.com/p/the-science-of-how-ai-picks-its-sources)).
- **Original data is disproportionately cited.** Primary research is rare but much more citation-dense than ordinary pages ([Growth Memo](https://www.growth-memo.com/p/2026-growth-memo-research-summary)). Arrowbin's own delivered-project data (timelines, cost ranges by project type) is an asset no competitor can copy.
- **Fresh, dated, structured comparison content.** Lists with a visible "last updated" date, comparison tables and clear criteria dominate cited lists ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)).
- **Answer-first passages.** Google says no chunking is required ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)), yet an answer in the first one or two sentences under a question heading is what fan-out retrieval and the "busy editor" behaviour reward. Do it for readers, not as a hack.
- **What the current cost/timeline answers look like.** For "how much does custom software cost" the sources that rank are Andersen, Soltech, Keyhole, Adevs, Clutch pricing data; for MVP cost, Upsilon, Helpware, Appinventiv; for MVP timeline, Netguru, Altar, Vivasoft. They all give ranges by project type, cost drivers and regional rate tables. Arrowbin's three existing posts target exactly these queries, so they need to be at least as specific (see `prompt-citation-map.csv`).

---

## 4. Tactics the evidence does NOT support

- **llms.txt as a ranking lever.** Google does not use it ([Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Log studies report AI crawlers rarely request it ([OtterlyAI 90-day experiment](https://otterly.ai/blog/the-llms-txt-experiment/); [Longato audit](https://www.longato.ch/llms-recommendation-2025-august/)). Keep Arrowbin's file (cheap, useful for agents and developer tools) but spend no further effort on it.
- **Backlinks alone.** Weak correlation with AI brand visibility (0.218) compared with mentions ([Ahrefs](https://ahrefs.com/blog/ai-overview-brand-correlation/)).
- **Self-serving listicles that rank yourself #1 with no substance.** They work today per Ahrefs, but Ahrefs itself advises transparency and linking to alternatives ([Ahrefs](https://ahrefs.com/blog/best-lists-research/)), and engines are actively de-biasing over-cited sources ([Semrush quoting its Head of Organic and AI Visibility](https://www.semrush.com/blog/most-cited-domains-ai/)). Publish honest comparisons instead (playbook section 3).

---

## 5. Arrowbin AI-readiness audit (29 Sep 2026)

### 5.1 robots.txt (live at https://arrowbin.com/robots.txt, generated by `src/app/robots.ts`)
Live file matches the new build: `User-Agent: *` allowed (except `/api/`) plus explicit Allow groups.

| Crawler | Owner / purpose | Status |
|---|---|---|
| GPTBot | OpenAI training | Allowed (explicit) |
| OAI-SearchBot | ChatGPT search index | Allowed (explicit) |
| ChatGPT-User | ChatGPT user fetch | Allowed (explicit) |
| PerplexityBot / Perplexity-User | Perplexity index / fetch | Allowed (explicit) |
| ClaudeBot | Anthropic training | Allowed (explicit) |
| Claude-Web | Legacy Anthropic agent | Listed; deprecated name, harmless |
| **Claude-SearchBot** | Anthropic search indexing | Allowed only via `*` (not listed) |
| **Claude-User** | Claude user fetch | Allowed only via `*` (not listed) |
| Google-Extended | Gemini training / grounding opt-in | Allowed (explicit) |
| Applebot-Extended | Apple Intelligence training | Allowed (explicit) |
| CCBot | Common Crawl (feeds many LLM datasets) | Allowed (explicit) |
| Bytespider | ByteDance | Allowed via `*` (not listed) |
| Bingbot / Googlebot | Search indexes behind Copilot, ChatGPT, AIO | Allowed via `*` |

Verdict: nothing important is blocked. Recommended edits in the playbook (add Claude-SearchBot, Claude-User; optional meta-externalagent, DuckAssistBot, MistralAI-User; drop Claude-Web). Also check that the host/CDN (firewall, bot protection) does not challenge these user agents, since robots.txt permission is useless if a WAF returns 403.

### 5.2 llms.txt (live at https://arrowbin.com/llms.txt, generated by `src/app/llms.txt/route.ts`)
- Valid llmstxt.org shape: H1, blockquote summary, sections with link lists; generated from live data so it cannot drift. Good.
- Gaps: no founder line (name, LinkedIn), no founding year, no "who we serve / typical budgets / engagement models" facts, no link to proof (client names, portfolio items), no `/services` hub or `/blog` index link, no `llms-full.txt` (returns 404). Given the weak evidence for llms.txt, these are low priority, 30-minute fixes.
- The summary line mentions the offices, which the founder asked not to emphasise in site copy. For a machine-facing file that is acceptable (and useful for entity disambiguation), but confirm with the founder.

### 5.3 Entity signals
| Signal | Finding | Evidence |
|---|---|---|
| Google Knowledge Panel | None observed for "Arrowbin" searches. | Web search 29 Sep 2026 returned the site, Facebook and GitHub only. |
| Wikidata | **No item.** API search for "Arrowbin" returned zero results. | `wbsearchentities` query, 29 Sep 2026 |
| Crunchbase | No profile found in search. | Search 29 Sep 2026 |
| LinkedIn company page | **Not found.** `linkedin.com/company/arrowbin` returns 404. Code comment in `src/lib/site.ts` confirms: "TODO: replace with the real Arrowbin company page once created." The schema `sameAs` currently points to `https://www.linkedin.com/in/arrowbinllc`, a personal-profile URL pattern. | curl + source |
| Founder entity | Person schema exists (`founderSchema`, `author.sameAs` = founder LinkedIn only). | `src/lib/schema.ts`, `src/lib/site.ts` |
| Clutch / GoodFirms / DesignRush | No Arrowbin profile found (site: search on Clutch returns only other "Arrow" brands). | Search 29 Sep 2026 |
| Facebook | Exists: facebook.com/arrowbinllc | Search result |
| GitHub | Exists: github.com/Arrowbin-LLC | Search result |
| Name collision | "Arrow" brands (Arrow Electronics, Arrow Digital, Arrowbits, Apache Arrow) crowd results. Consistent use of "Arrowbin" + "software development company" and a strong sameAs graph are needed to disambiguate. | Searches above |
| NAP consistency | Cannot be verified yet: there are almost no third-party listings to compare. Local SEO workstream (`08-local`) owns this; the canonical NAP is in the business brief. | |
| AI mention baseline | 0 of 20 answers (OpenAI, Anthropic, Google, Perplexity). | `llm-visibility-baseline.md` |

---

## 6. Sources
- Ahrefs, "Do Self-Promotional 'Best' Lists Boost ChatGPT Visibility?" (Glen Allsopp, Dec 2025): https://ahrefs.com/blog/best-lists-research/
- Ahrefs, "An Analysis of AI Overview Brand Visibility Factors (75K Brands)": https://ahrefs.com/blog/ai-overview-brand-correlation/
- Ahrefs, "38% of AI Overview Citations Pull From The Top 10": https://ahrefs.com/blog/ai-overview-citations-top-10/
- Business Wire, Ahrefs YouTube-mentions report (May 2026): https://www.businesswire.com/news/home/20260526119691/en/Across-75000-Brands-YouTube-Mentions-Are-the-Strongest-Signal-of-AI-Visibility-New-Ahrefs-Report-Reveals
- Semrush, "The Most-Cited Domains in AI: A 3-Month Study" (Jul–Oct 2025): https://www.semrush.com/blog/most-cited-domains-ai/
- Profound, "AI Platform Citation Patterns": https://www.tryprofound.com/blog/ai-platform-citation-patterns
- Profound, "Claude web search explained": https://www.tryprofound.com/blog/what-is-claude-web-search-explained
- Search Engine Land, "AI search engines cite Reddit, YouTube, and LinkedIn most": https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138
- Search Engine Land, "Anthropic clarifies how Claude bots crawl sites": https://searchengineland.com/anthropic-claude-bots-470171
- Seer Interactive, "87% of SearchGPT Citations Match Bing's Top Results": https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results
- Seer Interactive, AIO impact on CTR (Sep 2025 and 2026 updates): https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-september-2025-update , https://www.seerinteractive.com/insights/aio-impact-on-google-ctr-2026-update
- AI+Automation, Bing replication study: https://aiplusautomation.com/blog/bing-replication-chatgpt-citations
- Search Engine Journal, "ChatGPT Appears To Use Google Search As A Fallback": https://www.searchenginejournal.com/chatgpt-appears-to-use-google-search-as-a-fallback/552089/
- Kevin Indig, Growth Memo 2026 research summary: https://www.growth-memo.com/p/2026-growth-memo-research-summary ; "The science of how AI picks its sources": https://www.growth-memo.com/p/the-science-of-how-ai-picks-its-sources
- Google Search Central, AI optimization guide (updated 10 Jul 2026): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide ; AI features: https://developers.google.com/search/docs/appearance/ai-features
- Bing Webmaster blog, AI Performance report (Feb 2026): https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- Clutch press release, AI Visibility Dashboard (May 2026): https://clutch.co/press-releases/ai-visibility-dashboard
- OtterlyAI llms.txt experiment: https://otterly.ai/blog/the-llms-txt-experiment/ ; Longato llms.txt audit: https://www.longato.ch/llms-recommendation-2025-august/
- Wikidata:Notability: https://www.wikidata.org/wiki/Wikidata:Notability ; MLforSEO on Wikidata for brands: https://www.mlforseo.com/knowledge-graph-strategy/wikidata-for-brands-notability-criteria-and-a-realistic-path/
- GA4 AI channel setup guides: https://www.swydo.com/blog/track-ai-traffic-in-ga4/ , https://seresa.io/blog/ai-traffic-attribution/your-ga4-ai-traffic-regex-stopped-working-here-is-why
- Prompt-level SERP sources: see the `sources_cited` column of `prompt-citation-map.csv`.
