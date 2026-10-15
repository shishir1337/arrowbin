# arrowbin.com backlink audit, 2026-10-01

Builds on `docs/seo/09-links/backlink-baseline.md`. Free sources only (curl). No Moz, Bing, Ahrefs or DataForSEO data. No health score is given: fewer than 4 scoring factors have data, so the result is INSUFFICIENT DATA.

## Data limits (read first)
- WebSearch was unavailable in this session. Bing and DuckDuckGo HTML scraping returned nothing usable. So no mention search ("arrowbin.com" -site, "Arrowbin LLC", "built by Arrowbin") was possible this round. The baseline's search findings (GitHub, Facebook, Instagram, YouTube) are carried forward, not re-verified.
- Common Crawl CDX: CC-MAIN-2026-39 returned 504, CC-MAIN-2026-34 returned 502, CC-MAIN-2026-08 and CC-MAIN-2025-51 returned "No captures for arrowbin.com". The CDX API lists pages of a domain, it does not list inbound links. A true inbound-link list needs the Common Crawl web graph or WAT files (large downloads, not attempted). Treat "no captures" as "arrowbin.com was not crawled in those snapshots", not as "no links".
- Everything below is a floor, not a total. Real numbers need Search Console, Bing Webmaster Tools and Ahrefs Webmaster Tools once arrowbin.com is verified.

## Referring domains found (direct fetch of homepages, today)
| Domain | Credit | Link | Anchor | rel | Evidence | Confidence |
|---|---|---|---|---|---|---|
| nbafl.net | Footer | https://arrowbin.com | Arrowbin LLC | noopener noreferrer (followed) | `<a href="https://arrowbin.com" target="_blank" rel="noopener noreferrer">Arrowbin LLC` in fetched HTML | 0.95 |
| maneelclub.com | Footer | https://arrowbin.com | Arrowbin LLC | noopener noreferrer (followed) | same pattern in fetched HTML | 0.95 |
| brandingly.agency | HTML comment only ("Arrowbin LLC, https://arrowbin.com") plus a text mention | None clickable | n/a | n/a | Comment and text found, no `<a>` tag matched | 0.85 |
| silentlifestylebd.com | None | No | | | No "arrowbin" string in HTML (HTTP 200) | 0.80 (homepage only, inner pages and footer JS not checked) |
| flexoverbd.com | None | No | | | same | 0.80 |
| ytshopindia.com | None | No | | | same | 0.80 |
| outnet.it.com | None | No | | | same | 0.80 |
| gtegoyna.com.bd | None | No | | | Fetch now succeeded (433 KB, no Cloudflare challenge), no "arrowbin" string. Resolves the baseline's "unknown" | 0.80 |

Result: 2 followed referring domains confirmed, unchanged from baseline. 5 of 8 portfolio clients give no credit at all. Brandingly has the credit in a comment only.

## Anchor text
Followed links: 2 of 2 are "Arrowbin LLC" (100% branded, exact brand). Zero descriptive or keyword anchors. Healthy but thin; no risk of over-optimisation. Source: parsed HTML (0.95). Full anchor profile is unknown.

## Toxic and old-hack signals
- Wayback CDX for arrowbin.com (all subdomains, 316 collapsed URLs; captures 2018: 3, 2023: 25, 2024: 209, 2025: 79): no Japanese keyword-spam paths, no percent-encoded CJK URLs, no casino/pharma/brand-goods patterns found. Only WordPress internals (wp-admin, xmlrpc.php) on www and nextjs subdomains in Feb 2025, and a Next.js plugin/theme marketplace (Pickbazar-style, `/backend/`, `/authors/arrowbin-llc`) in Oct 2024.
- The current homepage has no Japanese spam strings (checked for a few common terms only) and the live sitemap has 19 URLs.
- Conclusion: the old WordPress hack left no discoverable trace in the free archive data. This is absence of evidence: CDX is sampled, and inbound spam links would only appear in GSC or a link index.
- Toxic links found: 0. Disavow candidates: none. Do not file a disavow file without GSC Links evidence.
- Side risks: old marketplace URLs (/products/, /authors/, /backend/) and the nextjs.arrowbin.com subdomain may still be linked from elsewhere. Confirm they 301 or 410 cleanly (hand to technical audit).

## Competitor gap vs 3 Bangladesh peers
Not computed. No referring-domain counts are obtainable without Ahrefs, Moz or Semrush. Qualitative gap from the baseline: Dhaka leaders appear on Clutch and GoodFirms with 9 to 72 reviews and many directories; Arrowbin has 0 directory profiles and 0 editorial links. To quantify later, run Ahrefs Webmaster Tools (own site) plus a manual Ahrefs backlink checker on each peer and use link intersect.

## 10 highest-value next links
1. Client footer credits on the 5 missing portfolio sites (silentlifestylebd.com, flexoverbd.com, ytshopindia.com, outnet.it.com, gtegoyna.com.bd): followed, "Web design by Arrowbin" style. Fastest, fully in your control.
2. Brandingly: convert the comment to a visible footer `<a>` link.
3. Upgrade the nbafl.net and maneelclub.com anchors on at least one site to a descriptive variant ("Custom software development by Arrowbin"), keep the other as brand.
4. Clutch profile with client reviews (from the 8 projects and named clients such as Rize Capital, Hatch Apps).
5. GoodFirms profile.
6. Hostinger partner or agency directory listing (verified partner, brief).
7. Google Business Profile (Tampa Bay) with website link, plus consistent NAP citations (Bing Places, Apple Business Connect).
8. LinkedIn company page and founder profile linking to arrowbin.com; Crunchbase; GitHub org site field (exists, nofollow).
9. Case-study or testimonial backlinks from named clients on their own sites (Sikkhon, Dizishore, Rize Capital, Vellio Properties, Khaza Confectionery, ABC Tiles, Hatch Apps).
10. Bag Organizers Shop author bio (26 posts under "Arrowbin"): add a link, plus Bangladesh listicle or press placements (DesignRush, local tech media such as TBS or Daily Star tech pages) via founder-led content from the /blog cost and MVP guides.

## Week-1 actions
Verify arrowbin.com in GSC and Bing Webmaster Tools, register Ahrefs Webmaster Tools, export Links reports, and record month-0 referring domains. Re-run this audit with that data; only then score and consider disavow.
