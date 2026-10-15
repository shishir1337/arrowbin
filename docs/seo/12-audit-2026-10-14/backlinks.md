# arrowbin.com backlink audit, 2026-10-14

Builds on `../09-links/backlink-baseline.md` and `../11-audit-2026-10-01/backlinks.md`. Free sources only (curl, Wayback CDX). Read-only. No health score: fewer than 4 scoring factors have data, so the result is INSUFFICIENT DATA.

## Data limits (read first)
- WebSearch is not available to this agent. Bing and DuckDuckGo HTML scraping returned zero parseable results (bot-blocked). So no new-mention search for "arrowbin", "arrowbin.com" or "Arrowbin LLC" could be run. New mentions: UNKNOWN, not "none".
- Clutch, DesignRush and Crunchbase return HTTP 403 to curl, so profile existence cannot be confirmed or denied there. Probing guessed URLs is weak evidence anyway (slugs unknown). GoodFirms returned 307 (redirect target not captured). LinkedIn guessed slug 404, Sortlist guessed slug 404. GitHub org Arrowbin-LLC returns 200.
- No Moz, Bing Webmaster, Ahrefs, Majestic, DataForSEO or Search Console data. No inbound-link index was queried. Everything is a floor.
- Client-site checks are homepage HTML only (curl, raw, no JS render). Inner pages and JS-injected footers were not checked.

## Client footer credits (fetched 2026-10-14, raw HTML)
| Site | HTTP | Credit | Clickable | rel | Anchor | Status vs 1 Oct | Confidence |
|---|---|---|---|---|---|---|---|
| nbafl.net | 200 | Footer "Designed & built by" | Yes, `href="https://arrowbin.com"` target=_blank | noopener noreferrer (FOLLOWED) | Arrowbin LLC | Unchanged | 0.95 |
| maneelclub.com | 200 (first attempt timed out, retry and www OK) | Footer "Designed & built by" | Yes, same href | noopener noreferrer (FOLLOWED) | Arrowbin LLC | Unchanged. Also `<link rel="author" href="https://arrowbin.com">`, meta author/creator "Arrowbin LLC" and JSON-LD `creator` Organization with url | 0.95 |
| brandingly.agency | 200 | HTML comment line 4 plus JSON-LD node (name "Arrowbin LLC", url arrowbin.com) | No `<a>` | n/a | n/a | Unchanged. The JSON-LD url is a machine-readable reference, not a followed link | 0.90 |
| silentlifestylebd.com | 200 | None ("arrowbin" absent) | No | | | Unchanged | 0.80 |
| flexoverbd.com (www) | 200 | None | No | | | Unchanged | 0.80 |
| gtegoyna.com.bd | 200 | None | No | | | Unchanged | 0.80 |
| ytshopindia.com | 200 | None | No | | | Unchanged | 0.80 |
| outnet.it.com | 200 | None | No | | | Unchanged | 0.80 |

Result: 2 of 8 clients link, both followed, both sitewide footers, 100% branded "Arrowbin LLC". 5 of 8 give no credit. Brandingly is comment and schema only. Net change since 1 Oct: none.

## New mentions, directories, toxic links
- New mentions: not testable (see limits). Carry forward baseline: GitHub org (200 now), Facebook, Instagram, YouTube, all nofollow profiles.
- Directory profiles: none confirmed. Peers' own sites link to their Clutch/GoodFirms profiles; Arrowbin has nothing to link to yet.
- Toxic links: 0 found, but no link index was checked. Wayback CDX (domain-wide, 400 URL sample) matched my spam-pattern grep only on WordPress internals (wp-login.php, wp-admin/load-*.php, xmlrpc.php on www and nextjs subdomains, from the old WP install). No casino, pharma or CJK keyword-spam URLs. Absence of evidence only. No disavow without GSC Links data.
- Technical side risk stays with the technical audit: legacy WP and marketplace URLs, nextjs.arrowbin.com. The local build's 410/308 rules (src/proxy.ts, next.config.ts) are FIXED-LOCAL, awaiting deploy.

## Competitor gap (qualitative only)
Referring-domain counts were not obtainable. What was observable from peer homepages (raw HTML links):
| Peer | Directory/profile links on own site | Notes |
|---|---|---|
| Vivasoft (vivasoftltd.com) | Clutch (clutch.co/profile/vivasoftltd), GoodFirms (vivasoft-limited), LinkedIn, Clutch BD category pages | Active on at least 3 external profile platforms |
| Kaz Software (kaz.com.bd) | GoodFirms (kaz-software-limited), LinkedIn | At least 2 |
| SJ Innovation (sjinnovation.com) | Fetch from this machine gave connection failure on www, 200 on apex but no directory links parsed | Unknown |
| Arrowbin | None; 2 client footer links, GitHub/social nofollow profiles | Gap is directories, reviews and editorial, not anchor health |

To quantify: Ahrefs Webmaster Tools (own site) plus a manual Ahrefs/Moz check per peer, then link intersect.

## Anchor text
2 of 2 followed links: "Arrowbin LLC" (100% exact brand). Healthy, thin. Source: parsed HTML (0.95). Full profile unknown.

## 15 highest-value next links
| # | Link | How to get it | Effort |
|---|---|---|---|
| 1 | Footer credits on silentlifestylebd.com, flexoverbd.com, gtegoyna.com.bd, ytshopindia.com, outnet.it.com (5 links) | Ask each owner, or add yourself if you maintain the code: "Designed & built by Arrowbin LLC", followed, sitewide | S |
| 2 | brandingly.agency visible footer link | Replace the HTML comment with an `<a>`; keep JSON-LD | S |
| 3 | Descriptive anchor variant on one of nbafl.net / maneelclub.com | Change text to "Custom software development by Arrowbin" on one site only | S |
| 4 | Clutch profile | Create listing, invite 3 to 5 named clients for verified reviews | M |
| 5 | GoodFirms profile | Free listing, same review invites | S |
| 6 | DesignRush agency profile | Free tier submission | S |
| 7 | Google Business Profile / Bing Places / Apple Business Connect | Only where a genuine verifiable presence exists; do not use the shared virtual office as a storefront | M |
| 8 | LinkedIn company page + founder profile website field | Create page, link arrowbin.com (nofollow but entity signal; also feeds sameAs) | S |
| 9 | Crunchbase organization | Create profile with website (nofollow, entity signal) | S |
| 10 | Client case-study/testimonial links (Sikkhon, Dizishore, Rize Capital, Vellio Properties, Khaza Confectionery, ABC Tiles, Hatch Apps) | Offer a written testimonial in exchange for a link on their site or a "Built by" credit | M |
| 11 | Bag Organizers Shop author bio (26 posts as "Arrowbin") | Ask for a bio link or credit to arrowbin.com | S |
| 12 | Hostinger agency/partner directory | Apply if eligible, since the build uses Hostinger | M |
| 13 | Bangladesh listicles and local tech press (TBS, Daily Star tech, Prothom Alo tech, DesignRush/Clutch BD roundups) | Pitch the /blog cost and MVP guides with founder commentary | L |
| 14 | Developer community profiles (GitHub org site field exists; add dev.to / Hashnode author with canonical-linked posts) | Republish 2 blog guides with canonical to arrowbin.com | M |
| 15 | Startup/SaaS directories relevant to buyers (Product Hunt maker page, Indie Hackers, BetaList) for any Arrowbin-built product | Launch a client or own product and link to the studio | M |

## Week-1 actions
1. Verify arrowbin.com in GSC and Bing Webmaster Tools, register Ahrefs Webmaster Tools, export Links, record month-0 referring domains.
2. Do items 1 and 2 above (7 links from owned relationships).
3. Re-run this audit with link-index data; only then score and consider disavow.

## Finding status
| Finding | Priority | Status | Owner | Failure signal |
|---|---|---|---|---|
| 5 of 8 clients give no credit | High | OPEN | founder | Still 2 referring domains in next export |
| Brandingly comment-only credit | Medium | OPEN | founder/dev | No `<a>` in footer HTML |
| No directory profiles/reviews | High | OPEN | founder | No Clutch/GoodFirms URL resolvable |
| No new-mention data | Info | OPEN (tool limit) | n/a | n/a |
