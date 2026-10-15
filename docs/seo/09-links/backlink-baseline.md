# arrowbin.com backlink baseline

Checked 2026-09-29. This is a **manual, free-tools baseline**, not an Ahrefs/Semrush/Moz export.

## Data limits (read first)
- **No link index data was available.** Ahrefs' free backlink checker needs a browser/captcha and returned only its landing page to our fetcher. OpenLinkProfiler returned 404. Moz, Semrush and Majestic require accounts. Common Crawl's index API rate-limited us (HTTP 429).
- **No Search Console for arrowbin.com** (the connected GSC property belongs to ooraa.org). The GSC "Links" report is the best free source of truth and should be the first number recorded once arrowbin.com is verified.
- Everything below comes from: Google-style web searches for "arrowbin" and "arrowbin.com" -site:arrowbin.com, direct fetches of the 8 portfolio sites, and Wayback Machine CDX data.
- So the counts below are a **floor** (links we could confirm), not a total.

## What we could confirm

### Links from client sites (checked by fetching each homepage)
| Site | Credit found | Link | Anchor | rel |
|---|---|---|---|---|
| https://nbafl.net/ (North Bengal Agro Farms) | Yes, footer | https://arrowbin.com | "Arrowbin LLC" (after "Designed & built by") | noopener noreferrer (followed) |
| https://maneelclub.com/ (Maneel Club) | Yes, footer | https://arrowbin.com | "Arrowbin LLC" (after "Designed & built by") | noopener noreferrer (followed) |
| https://brandingly.agency/ (Brandingly) | HTML comment + JSON-LD `creator`-style reference only | No visible `<a>` link | n/a | n/a |
| https://silentlifestylebd.com/ | None found | No | | |
| https://www.flexoverbd.com/ | None found | No | | |
| https://ytshopindia.com/ | None found | No | | |
| https://outnet.it.com/ | None found | No | | |
| https://gtegoyna.com.bd/ | Unknown (Cloudflare challenge blocked the fetch) | ? | | |

Result: **2 confirmed followed links from client sites** (both sitewide footers, same anchor "Arrowbin LLC"). Brandingly has an HTML comment and structured data but no clickable link, which passes no link value.

### Brand profiles and mentions (from search)
| Source | URL | Links to arrowbin.com? | Notes |
|---|---|---|---|
| GitHub org | https://github.com/Arrowbin-LLC | Yes (profile website field, typically nofollow) | Lists info@arrowbin.com, "Arrowbin Digital Agency", no public repos |
| GitHub repo | https://github.com/shishir1337/arrowbin | Likely (founder repo) | Founder's personal repo |
| Facebook | https://www.facebook.com/arrowbinllc/ | Yes (nofollow) | Shows 7901 4th St N STE 300 and (813) 421-5874 |
| Instagram | https://www.instagram.com/arrowbinllc/ and https://www.instagram.com/arrowbin/ | Bio link (nofollow) | Two handles exist; confirm which is official |
| YouTube | https://www.youtube.com/channel/UCWk7fxXHRkb1iFJCqlxrAAA | Probably (nofollow) | |
| Pinterest | https://www.pinterest.com/arrowbin/ | Unclear | Profile name "arrowbin chou"; may be unrelated |
| Sunbiz (Florida) | search.sunbiz.org | No link | State record; snippet says administratively dissolved 09/26/2025 (verify) |
| Bag Organizers Shop | https://bagorganizersshop.com/author/arrowbin/ | No (fetched; no link to arrowbin.com) | 26 posts under author "Arrowbin". If this is a client project, ask for an author-bio link |

**Not found:** any Clutch, GoodFirms, DesignRush, UpCity, Crunchbase or LinkedIn company listing; any press mention, guest post, podcast, listicle inclusion or Hostinger Agency Directory profile.

### Domain history (Wayback Machine CDX)
Captures exist from 2018-08-04, 2021, 2023, 2024 and 2025. The 2018 capture may predate Arrowbin (founded 2020 per the brief), so the domain may have prior-owner history and possibly old links. Worth a one-off look in GSC "Links" and Ahrefs Webmaster Tools once verified.

## Baseline summary
- Confirmed referring domains with followed links: **2** (nbafl.net, maneelclub.com).
- Confirmed nofollow/profile links: about 4 to 6 (GitHub, Facebook, Instagram, YouTube).
- Editorial links (press, guest posts, listicles): **0 found**.
- Directory profiles: **0 found**.
- Anchor text: 100% branded ("Arrowbin LLC") among the followed links found. Healthy, just thin.
- Competitive context: Dhaka leaders are listed on Clutch/GoodFirms with 9 to 72 reviews, publish their own "top companies" listicles, and appear across dozens of directories. Arrowbin is effectively starting from zero off-page.

## Set up for a real baseline (do in week 1)
1. Verify arrowbin.com in Google Search Console, export Links report (top linking sites, top linked pages, anchor text).
2. Verify in **Bing Webmaster Tools** (free backlink report, and required for Copilot/ChatGPT visibility via Bing index).
3. Create a free **Ahrefs Webmaster Tools** account (free for verified site owners) for DR, referring domains and new/lost links.
4. Record month-0 numbers in a sheet: referring domains, followed referring domains, DR, branded vs non-branded anchors, review counts per platform.
