# Local SEO audit: arrowbin.com (2026-10-01)

Builds on `docs/seo/08-local/local-seo-plan.md`. Method: curl of live HTML and sitemap, WebFetch of Bing, DuckDuckGo and OpenCorporates. WebSearch was unavailable, Google Maps, Clutch, Yelp, GoodFirms and Sunbiz blocked direct fetches (403, Cloudflare or no response). Absence findings below are therefore "no evidence found", not proof.

## Local score: 22 / 100

| Dimension | Weight | Score | Note |
|---|---|---|---|
| GBP signals | 25 | 2 | No listing found, no Maps embed, no review widget. Correct for US (virtual office), a gap for Dhaka. |
| Reviews and reputation | 20 | 0 | No aggregateRating, no review platform profile found. |
| Local on-page SEO | 20 | 5 | No visible address, no local landing pages (all 404), 8 service pages exist. |
| NAP and citations | 15 | 4 | Phones and email consistent, but address only in schema, zero citations found, Mohammadpur has no street. |
| Local schema | 10 | 6 | Structure sound, but a virtual office is marked up as a LocalBusiness and the Dhaka address is incomplete. |
| Local links and authority | 10 | 5 | Social sameAs present, LinkedIn URL is a personal-profile path. No directory links. |

Business type: hybrid in schema, but effectively online-only (no address or Maps on page). Vertical: professional services / software development (not one of the six listed verticals).

## What the live site shows

- Visible page (home, contact): only `hello@arrowbin.com`, `+8801843596038`, `+1 813-421-5874`. No street address, no city, no Maps iframe (0 iframes on /contact). This matches the founder's wish not to emphasise offices.
- JSON-LD (home): Organization (`legalName` "Arrowbin LLC", both addresses in an array, two ContactPoints), WebSite, and two ProfessionalService nodes: `#localbusiness-dhaka` and `#localbusiness-st-petersburg`, each with parentOrganization, geo, Mon to Fri 09:00 to 18:00 hours, priceRange "$$".
- Sitemap: 19 URLs (home, services, work, about, blog, contact, privacy, terms, 8 service pages, 3 blog posts). No location pages. Probed `/software-company-dhaka`, `/locations`, `/locations/tampa-bay`, `/software-development-tampa-bay`: all 404.
- No aggregateRating or Review markup anywhere.

## NAP consistency (vs plan section 5)

| Element | Plan standard | Page text | Schema | Verdict |
|---|---|---|---|---|
| Name | Arrowbin (BD), Arrowbin LLC (US) | Arrowbin | Org "Arrowbin", legalName "Arrowbin LLC", nodes named "Arrowbin (Dhaka, Bangladesh)" and "Arrowbin (St. Petersburg, Florida)" | Node names add city suffixes, which do not match the plan's "exactly Arrowbin". Low risk on schema, but do not reuse as GBP name. |
| BD phone | +880 1843-596038 | +8801843596038 | +8801843596038 | Match (formatting differs, same number). |
| US phone | +1 813-421-5874 | +1 813-421-5874 | +18134215874 | Match. |
| Email | hello@arrowbin.com | hello@arrowbin.com | hello@arrowbin.com | Match. GitHub org still info@ (per plan, not rechecked). |
| BD address | full street, Mohammadpur | none | streetAddress "Mohammadpur", postal 1207 | Incomplete: neighbourhood is in the street field. Street still unsupplied. |
| US address | 7901 4th St N, Ste 300, FL 33702 | none | "7901 4th St N" | Suite 300 missing from schema, so it differs from the standard used in citations. |
| Website | https://arrowbin.com/ | - | https://arrowbin.com | Match. |

Geo check: Dhaka 23.766, 90.359 (3 decimals, below the 5-decimal recommendation, and approximate). St. Pete 27.8206, -82.6389 (4 decimals) is a centroid, not verified to the building.

## Schema findings

1. ProfessionalService is a valid subtype and the right one for a software firm. Good.
2. `#localbusiness-st-petersburg` marks a shared virtual office as a business location with opening hours. This contradicts plan section 4 ("for the US page use Organization with areaServed, not a LocalBusiness with the virtual office address") and implies walk-in hours that are not true. Also it is a mismatch risk if the LLC is dissolved.
3. Organization `address` as a two-item array is valid but mixes a virtual office in as a primary address. Prefer one address (legal) or `location` entries only for real places.
4. Hours 09:00 to 18:00 have no timeZone, and the same hours are given for both offices (Dhaka is UTC+6, Florida is UTC-4/-5). Unverified by the founder.
5. Dhaka node lacks a street address, so it fails the "address specificity" expectation; Google may ignore it.
6. `sameAs` LinkedIn is `linkedin.com/in/arrowbinllc`, a personal-profile path. A company page would be `/company/...`. Verify it resolves and is the company. No Clutch, GoodFirms, Crunchbase, GitHub in sameAs.
7. `areaServed` is the string "Worldwide" (acceptable, but less useful than country list).

## GBP and Maps

- No evidence of an Arrowbin Google Business Profile or Maps place. Searches could not be run against live Google (personalised, blocked), so a hand check in Google Maps ("Arrowbin Dhaka", "Arrowbin St. Petersburg") and at business.google.com is still required. The `google.com/maps/search` URL returns 200 but only a JS shell.
- No Maps embed, directions link, review widget or GBP link on the site. Recommendation stays as plan section 3: Dhaka GBP only if the office is staffed and visitable; no US GBP.
- Bing web results for `"arrowbin" software dhaka -arrowbin.com` returned nothing, which suggests no indexed third-party listing (weak evidence).

## Citations (Tier 1 and 2)

| Platform | Result |
|---|---|
| Clutch | `site:` query on Bing returned no results. Direct fetch 403. Not evidenced. |
| GoodFirms | No results, direct fetch failed. Not evidenced. |
| Yelp | No results, direct fetch 403. Not evidenced. |
| Bing Places | Cannot be checked without a login. No indexed listing. Unknown. |
| Apple Business Connect | Cannot be checked without an Apple device or account. Unknown. |
| BASIS | Not checked via web (no fetch tool result). Assume not a member until confirmed. |
| Social | Facebook, Instagram, X, LinkedIn are referenced in schema; not fetched. |

Net: zero confirmed third-party citations, so the whole citation layer in plan section 6 is still to build.

## Reviews

No reviews or ratings on-page, none in schema, none found on Clutch, GoodFirms or Yelp. Review velocity is zero. Benchmarks in plan section 1 (about 47 Google reviews, Clutch 10 reviews) still apply.

## Florida entity status (Sunbiz)

- search.sunbiz.org: still blocked by a Cloudflare challenge (403, "Just a moment") from curl, including with a browser user agent. Not directly verifiable.
- Second source: OpenCorporates (via WebFetch) lists ARROWBIN LLC, Florida, filing number L24000209589, status **Inactive**. No dates were returned. This agrees with the earlier Sunbiz snippet (administrative dissolution 09/26/2025).
- Conclusion: two independent sources say inactive. Treat as dissolved until a human opens the Sunbiz record (Document L24000209589). Florida allows reinstatement after administrative dissolution (annual report plus fees, within the statutory window; confirm on Sunbiz). Until reinstated, the site still states `legalName` "Arrowbin LLC" in JSON-LD and the footer or terms may name the LLC; that is a legal-accuracy and verification risk.

## Prioritised findings

**Critical**
1. Confirm and, if needed, reinstate ARROWBIN LLC on Sunbiz before any US listing; consider removing or qualifying `legalName` and US address in schema until resolved.
2. Remove the `#localbusiness-st-petersburg` ProfessionalService node (and its hours) from JSON-LD; keep the US details only as Organization `address`/ContactPoint or `areaServed`. Matches the plan and avoids implying a staffed office.

**High**
3. Obtain the full Mohammadpur street address (or decide the office is not public) and fix the Dhaka node: real street, 5-decimal geo from the actual pin, verified hours with timezone. If the office is not visitable, downgrade the Dhaka node to Organization too.
4. Create and verify the Dhaka GBP if eligible (plan section 3). Do a manual check that no duplicate or suspended profile already exists.
5. Claim Clutch and GoodFirms profiles and start review collection (target 10 Clutch reviews in 6 months). Add both URLs to `sameAs` once live.
6. Add Suite 300 to the US address wherever it is used, so citations match.

**Medium**
7. Build the two local landing pages from plan section 4 (`/software-company-dhaka`, `/software-development-tampa-bay`), footer and contact links only, unique content, with Organization plus `areaServed` (and LocalBusiness for Dhaka only if the office is real).
8. Fix the LinkedIn `sameAs` to a company page; add Crunchbase and GitHub org.
9. Set Bing Places and Apple Business Connect for Dhaka only after GBP and phone verification; BASIS membership decision.

**Low**
10. Normalise phone display formatting (+880 1843-596038) on page to match the plan; drop city suffixes in schema node names; replace `areaServed` "Worldwide" with a country list; add aggregateRating only after genuine reviews exist (never before).

## Limitations

No live Google Maps or local pack data, no DataForSEO, WebSearch unavailable, Clutch/Yelp/Sunbiz/GoodFirms direct fetches blocked, Bing Places and Apple Business Connect cannot be checked anonymously. Proximity (about 55% of local ranking variance) is outside our control. Score reflects only what was observable; expect a rise mainly from GBP (Dhaka), citations and reviews.
