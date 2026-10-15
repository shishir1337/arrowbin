# Local SEO audit: arrowbin.com (2026-10-14)

Builds on `../08-local/local-seo-plan.md` (plan) and `../11-audit-2026-10-01/local.md` (prior, 22/100). Read-only. Method: curl of live (arrowbin.com) and local build (localhost:3117), WebFetch, DuckDuckGo HTML. WebSearch was not available in this run. Google Maps, Sunbiz, GoodFirms, Crunchbase, Yelp, LinkedIn and Facebook blocked or returned no usable data, so "not found" means "no evidence", not proof.

## Local score: 26 / 100 live (30 projected once local fixes deploy)

| Dimension | Weight | Score | Note |
|---|---|---|---|
| GBP signals | 25 | 2 | No GBP evidenced; correct for US, gap for Dhaka. No Maps embed (0 iframes). |
| Reviews and reputation | 20 | 1 | A Clutch profile exists but has 0 reviews. No review markup anywhere. |
| Local on-page SEO | 20 | 5 | No visible address, no local landing pages (404 live and local). |
| NAP and citations | 15 | 6 | One citation found (Clutch, NEW). Phones/email consistent. GitHub NAP still stale. |
| Local schema | 10 | 6 live / 9 local | Local build removes the virtual-office node and adds Suite 300. |
| Links and authority | 10 | 6 | Clutch profile links to site; LinkedIn sameAs is a personal path live. |

Business type: effectively online-only, hybrid in schema. Vertical: professional services / software agency (none of the six standard verticals).

## Evidence: NAP vs plan section 5

| Element | Plan standard | Live schema | Local schema | Clutch profile | GitHub org |
|---|---|---|---|---|---|
| Name | Arrowbin / Arrowbin LLC | Org "Arrowbin", nodes "Arrowbin (Dhaka, Bangladesh)" and "Arrowbin (St. Petersburg, Florida)" | one ProfessionalService node (Dhaka); St. Pete is mailing-only | "Arrowbin" | "Arrowbin LLC", tagline "Arrowbin Digital Agency" |
| BD phone | +880 1843-596038 | +8801843596038 | same | +8801843596038 | none |
| US phone | +1 813-421-5874 | +18134215874 | same | +1 813-421-5874 | none |
| Email | hello@ | hello@ | hello@ | not shown | **info@arrowbin.com** (mismatch) |
| US address | 7901 4th St N, Ste 300, 33702 | "7901 4th St N" (no suite) | "7901 4th St N, Ste 300" (match) | "7901 4th Street North" (no suite) | "United States of America" |
| BD address | full Mohammadpur street | "Mohammadpur", 1207 (no street) | unchanged, still no street | "Dhaka 1207" | none |
| Geo | 5 decimals | 23.766/90.359 and 27.8206/-82.6389 | Dhaka 23.766/90.359 (3 dp), St. Pete geo removed | n/a | n/a |
| URL | https://arrowbin.com/ | https://arrowbin.com | same | https://arrowbin.com | https://www.arrowbin.com/ (www variant) |

Visible page text contains no street address on live or local (matches founder rule). Live /contact JSON-LD has 4 ProfessionalService nodes (duplicates); local has 1.

## Findings

### Critical

1. **Florida LLC still shows Inactive** (OPEN, founder, S-M). OpenCorporates detail page (2026-10-14) shows ARROWBIN LLC L24000209589 status "Inactive", head and mailing office 7901 4TH ST N STE 300, 2 inactive officers. Sunbiz returns 403 to automated fetch, so it is still not confirmed at the primary source; earlier snippet said administrative dissolution 09/26/2025. Site, Clutch and GitHub all present "Arrowbin LLC" at that address. Fix: founder opens search.sunbiz.org, document L24000209589, and files reinstatement (annual report + fees) or decides which entity name to use publicly. Fail signal: Sunbiz says "INACTIVE" or "ADMIN DISSOLVED"; directory verification (Clutch, BBB, D&B) rejects the entity.

### High

2. **NEW: a Clutch profile already exists** at https://clutch.co/profile/arrowbin-0 (found via DuckDuckGo; page fetched). Arrowbin, HQ St. Petersburg FL plus Dhaka, both phones, website link, services (AI, custom software, e-commerce, mobile, web), **0 reviews, 0.0 rating**, claimed status unknown. Issues: the "-0" slug implies an earlier or duplicate profile may exist; description mentions Tampa; US listed as HQ though Dhaka is the real office; address lacks Suite 300. Fix (founder): log in or claim, make Dhaka the primary location, add Ste 300, remove Tampa wording, add to sameAs, then request reviews from past clients. Fail signal: profile stays at 0 reviews in 30 days; a duplicate profile is found.
3. **Dhaka street address still unsupplied** (OPEN live and local, founder). Schema streetAddress is "Mohammadpur" only; blocks GBP, Bing Places, Apple and geo precision. Fix: founder supplies the signage address; dev updates `src/lib/site.ts` with 5-decimal geo from the actual pin.
4. **GitHub org NAP stale** (OPEN, founder, S). github.com/Arrowbin-LLC: email info@arrowbin.com, location "United States of America", tagline "Arrowbin Digital Agency", website www variant, 0 public repos, 1 follower. Local sameAs now includes this URL, so fix it before deploy. Set email hello@, location "Dhaka, Bangladesh", current tagline, website https://arrowbin.com.
5. **Live JSON-LD still marks the virtual office as a staffed business with hours** (OPEN live, FIXED-LOCAL). Live home has 2 ProfessionalService nodes (St. Pete with Mon-Fri 09:00-18:00); /contact has 4 (duplicates). Local: 1 node. Fix: deploy the local build (`src/lib/schema.ts`, `src/lib/site.ts`).
6. **No Dhaka GBP evidenced** (OPEN, founder, M). Not verifiable without Google. DuckDuckGo for "arrowbin software dhaka" returned the site, Facebook and the Clutch profile, no Maps place. Founder must search Google Maps ("Arrowbin Dhaka") and business.google.com, and only create a profile if the office is staffed and visitable (plan section 3).

### Medium

7. **LinkedIn company page does not exist at guessed URLs** (OPEN). /company/arrowbin and /company/arrowbinllc return 404; live sameAs uses a personal path `/in/arrowbinllc` (999 to bots, unverifiable). Local build dropped the LinkedIn entry (FIXED-LOCAL). Founder: create a company page, then add to sameAs.
8. **No local landing pages** (OPEN live and local). /software-company-dhaka, /locations, /software-development-tampa-bay all 404 on both. Plan section 4 still applies; do not build more than the two pages. Tampa page: Organization + areaServed only, no address.
9. **No evidence of GoodFirms, DesignRush, Crunchbase, Yelp, BASIS, Bing Places or Apple Business Connect** (OPEN). GoodFirms and Crunchbase returned 403, DesignRush no response, Bing returned no third-party results. Treat as absent until checked by hand while logged in.
10. **Facebook page**: fetch returned only the name "Arrowbin LLC"; address, phone and category not verifiable. Founder should confirm name, phone, website, no "Digital Agency" wording.

### Low

11. Dhaka geo is 3 decimals and approximate (OPEN live and local). Phone display formatting differs from plan (+8801843596038 vs +880 1843-596038). `areaServed` "Worldwide" string. Placeholder testimonials: kept by founder; no aggregateRating exists, so no review-markup risk now; never add it before genuine reviews.
12. Hours 09:00-18:00 have no time zone and are unverified (OPEN).

## Strategy given the constraints

- US: no GBP, Bing Places or Apple listing at the virtual office (Google rules: virtual offices ineligible). Use the St. Pete address only as legal/mailing on B2B directories, and only after the LLC is active. Compete in Tampa Bay with one organic page plus Clutch/directory profiles, as out-of-area competitors do.
- Dhaka is the real office: it is the only place a GBP, Bing Places and Apple listing can honestly go, subject to a staffed, visitable office and a street address. If the founder prefers not to publish an address, skip map products and rely on Clutch, GoodFirms, DesignRush and reviews.
- Make Dhaka the first-listed or primary location on directories, since claiming a US HQ at a virtual office conflicts with where the team works and is a verification risk.

## Step list for the founder (in order)

1. Open search.sunbiz.org, search ARROWBIN LLC, record the exact status and dates; reinstate if dissolved.
2. Send the full Dhaka street address and confirm whether the office is staffed and visitable.
3. Log in to Clutch (profile arrowbin-0), claim it, set Dhaka as primary location, add Ste 300, remove Tampa wording, check no duplicate profile.
4. Edit GitHub org: hello@arrowbin.com, Dhaka, current tagline, https://arrowbin.com.
5. Ask 5 to 10 past clients (Silent Lifestyle BD, FlexOver BD and others in the brief) for a Clutch review; no incentives.
6. Search Google Maps for "Arrowbin"; if office is eligible, create the Dhaka GBP per plan section 3.
7. Create a LinkedIn company page (same NAP) and a GoodFirms profile; send URLs to dev for sameAs.
8. Approve deploying the local build (items 1-7 in CONTEXT.md), then dev adds Clutch/GitHub/LinkedIn to sameAs and the two landing pages when copy is ready.

## Limitations

No live Google Maps, local pack, GBP, Bing Places or Apple data; no DataForSEO; WebSearch unavailable; Sunbiz, GoodFirms, Crunchbase, Yelp, LinkedIn and Facebook not readable by tooling. Proximity (about 55% of local ranking variance) is outside our control.
