# Directories and profiles: step by step

For each profile: where to start, what it needs, what to paste (all text comes from `profile-facts.md`), and which URL to send back to dev so it goes into the site's `sameAs` list in `src/lib/site.ts` (FIX-PLAN P2.4, P4.3).

**How the start URLs were checked (15 October 2026):** "Opened" means the page loaded for us that day. Several directories block automated requests (HTTP 403); for those the URL comes from the directory's own help pages or search results, and it says so. If a link fails for you in a normal browser, search the directory's site for "get listed" or "claim profile".

**Before you start:** fill in the [FOUNDER] items in `profile-facts.md` (Sunbiz status, Dhaka address, phone, team size, minimum project size, hourly rate). Every profile asks for them, and they must match across all of them.

**Rules for every profile**
- Name: **Arrowbin** (the display name). "Arrowbin LLC" goes only in a field that asks for a legal name, after Sunbiz shows ACTIVE. Website: `https://arrowbin.com`. Email: `hello@arrowbin.com`. Logo: `https://arrowbin.com/logo.png`.
- Headquarters: Dhaka (see profile-facts section 5). Add the US mailing address only after Sunbiz shows the LLC ACTIVE.
- Never write "Tampa" or "Digital Agency". Never add a keyword to the name.
- No paid placement is needed for any of this. Skip upsells.
- Write each new profile URL in the tracking table at the end of this file.

---

## 1. Clutch (claim the existing profile)

This is the most important profile in the kit. Do it in week 1 (FIX-PLAN P1.3).

**Start here:** https://clutch.co/profile/arrowbin-0 (opened 15 Oct 2026).

**What is on it now (15 Oct 2026):** name "Arrowbin"; headquarters "St. Petersburg, FL", 7901 4th Street North, 33702 (no suite); a second location "Dhaka 1207, Bangladesh"; both phone numbers; website link to arrowbin.com; services AI Development, Custom Software Development, E-Commerce Development, Mobile App Development, Web Development; 0 reviews; and a description that mentions "teams in Dhaka and Tampa, Florida". A duplicate check of `clutch.co/profile/arrowbin` returned 404, so no obvious duplicate exists, but search Clutch for "Arrowbin" while logged in to be sure.

**How to claim** (from Clutch's help article https://help.clutch.co/en/knowledge/claim-clutch-profile, opened 15 Oct 2026):
1. Open the profile and scroll to the bottom. If it is unclaimed you'll see an "Unclaimed Profile" tag and a **Claim Profile** button.
2. Sign in with Gmail, LinkedIn, or a company email and password. Use **hello@arrowbin.com** or another @arrowbin.com address: if your email matches what Clutch has on record you get a verification email straight away; if not, Clutch checks your connection to the company first. The invite expires after 3 days.
3. If there is no Claim button, someone has already claimed it. Ask Clutch who has admin access through https://help.clutch.co/contact-us.

**Fix these fields after you claim it:**

| Field | Paste |
|---|---|
| Company name | Arrowbin |
| Tagline | Software development for startups and SMBs |
| Website | https://arrowbin.com |
| Founded | 2020 |
| Employees | [FOUNDER: team size band] |
| Min. project size | [FOUNDER: minimum project size] |
| Avg. hourly rate | [FOUNDER: hourly rate band] |
| Description | Long description from profile-facts section 2 (this replaces the Tampa wording) |
| Locations | 1st (primary): Dhaka, with the street line if D8 allows. 2nd, only if the LLC is ACTIVE: 7901 4th St N, **Ste 300**, St. Petersburg, FL 33702. Delete any "Tampa" text. |
| Phone | +880 1843-596038 (Dhaka); +1 813-421-5874 (US, only with the US address) |
| Email | hello@arrowbin.com |
| Service lines | profile-facts section 9, with your real percentages |
| Portfolio | the 8 projects from profile-facts section 8, with the screenshot URLs from section 7 |
| Logo | https://arrowbin.com/logo.png |

**Then ask for reviews.** In the vendor dashboard, go to Reviews and submit client references (help article: https://help.clutch.co/en/knowledge/submit-client-references). Clutch emails each client an invitation and a reminder. Only send references for clients who said yes to the request in `client-outreach.md`. Clutch collects one review per client company, from past or current clients, never from former employees or family (https://help.clutch.co/knowledge/who-can-leave-review-on-clutch).

**Never** write a review for a client, edit their words, or offer anything in return.

**Send to dev:** `https://clutch.co/profile/arrowbin-0` once the Tampa wording is gone and Dhaka is primary.

---

## 2. LinkedIn company page

**Start here:** https://www.linkedin.com/company/setup/new/ (opened 15 Oct 2026; it redirects to the LinkedIn login when you are signed out, which is expected). LinkedIn's help page: https://www.linkedin.com/help/linkedin/answer/a543852 (opened 15 Oct 2026). You can create a Page on desktop or the iOS app, **not on Android**.

**Steps:** sign in as yourself, choose **Company**, fill in the fields below, tick the box confirming you can act for the company, then **Create page**.

| Field | Paste |
|---|---|
| Name | Arrowbin |
| LinkedIn public URL | `arrowbin` (the audit found `/company/arrowbin`, `/company/arrowbinllc` and `/company/arrowbin-llc` all free on 14 Oct 2026; take `arrowbin` if it is still free) |
| Website | https://arrowbin.com |
| Industry | Software Development |
| Organization size | [FOUNDER: team size band] |
| Organization type | Privately held [FOUNDER: confirm] |
| Logo | https://arrowbin.com/logo.png |
| Tagline | One-line description from profile-facts section 2 (keep it under the character counter LinkedIn shows) |
| About / Overview | Long description from profile-facts section 2 |
| Specialties | The specialties list from profile-facts section 3 |
| Location | Dhaka 1207, Bangladesh (with the street line if D8 allows). Mark it primary. |
| Founded | 2020 |
| Phone | +880 1843-596038 |
| Cover | [pending: see profile-facts section 7] |

**After it is live:**
- On your personal profile (https://www.linkedin.com/in/md-shishir-ahmed), set your current role to "Founder and Lead Engineer" at **Arrowbin** and pick the new Page from the dropdown so your profile links to it.
- Post the first guide from `linkedin-posts.md` from your profile and reshare it from the Page.

**Send to dev:** `https://www.linkedin.com/company/<slug>/`. Dev adds it to `site.socials` (footer) and `sameAs` (FIX-PLAN P1.4, P2.4).

---

## 3. GoodFirms

**Start here:** https://www.goodfirms.co/get-listed (opened 15 Oct 2026; page title "Get Listed on Goodfirms - Showcase Your Expertise"). GoodFirms' own pages describe a free listing with verification by its research team, and a paid PRO plan you don't need.

**What it asks for:** company name, website, founding year, employees, hourly rate, minimum project size, description, service lines with percentages, locations, portfolio and client references.

| Field | Paste |
|---|---|
| Company name | Arrowbin |
| Website | https://arrowbin.com |
| Founded | 2020 |
| Description | Long description |
| Summary / tagline | One-line description |
| Services | profile-facts section 9 |
| Locations | Dhaka (primary); US mailing address only if LLC ACTIVE |
| Contact email | hello@arrowbin.com |
| Phone | +880 1843-596038 |
| Portfolio | Pick 4 to 6 of the projects in profile-facts section 8 |
| Logo | https://arrowbin.com/logo.png |

**Send to dev:** `https://www.goodfirms.co/company/<slug>` once it is published.

---

## 4. DesignRush

**Start here:** https://www.designrush.com/add-listing. This page blocked our automated check (403) on 15 Oct 2026; search results show it as DesignRush's "Agency Submission Form", and DesignRush's FAQ says they reply within one working day. They review the website, portfolio and reputation before publishing, so a listing is not guaranteed. A free plan is mentioned in their FAQ, but what it includes isn't spelled out. Choose the free option and skip paid sponsorship.

| Field | Paste |
|---|---|
| Agency name | Arrowbin |
| Website | https://arrowbin.com |
| Description | Long description |
| Services | profile-facts section 9 |
| Location | Dhaka, Bangladesh (primary) |
| Founded | 2020 |
| Team size, rate, min budget | [FOUNDER: team size band], [FOUNDER: hourly rate band], [FOUNDER: minimum project size] |
| Contact | hello@arrowbin.com, +880 1843-596038 |
| Portfolio | 4 to 6 projects from profile-facts section 8 |

**Send to dev:** the public profile URL (it usually looks like `https://www.designrush.com/agency/profile/<slug>`).

---

## 5. Crunchbase (company and founder)

**Start here:** https://www.crunchbase.com/ (opened 15 Oct 2026). Sign in (Crunchbase needs a social-authenticated account), **search for "Arrowbin" first**, then go to **Resources > Create Profile**, pick the profile type, fill it in and click **Save All Edits**. Source: Crunchbase's help article https://support.crunchbase.com/hc/en-us/articles/115011823988 (found through search; it blocked our direct fetch). Crunchbase only accepts tech-ecosystem companies, which Arrowbin is. Its help center recommends a logo, founded date, website and social links, short and long descriptions, headquarters, and 3 to 5 industries.

**Organization profile**

| Field | Paste |
|---|---|
| Name | Arrowbin |
| Legal name | Arrowbin LLC [FOUNDER: confirm Sunbiz shows ACTIVE first; if not, leave this field blank] |
| Website | https://arrowbin.com |
| Short description | One-line description |
| Full description | Long description |
| Founded date | 2020 |
| Founders | Md. Shishir Ahmed (link to the person profile below) |
| Headquarters | Dhaka, Bangladesh |
| Industries | Software, Web Development, E-Commerce, Artificial Intelligence (AI), SaaS |
| Employees | [FOUNDER] |
| Contact email | hello@arrowbin.com |
| Social links | LinkedIn company page, X, Facebook, GitHub (profile-facts section 6) |
| Logo | https://arrowbin.com/logo.png |

**Person profile (founder)**

| Field | Paste |
|---|---|
| Name | Md. Shishir Ahmed |
| Job | Founder and Lead Engineer, Arrowbin (current, since 2020) |
| Bio | Longer founder bio from profile-facts section 10 |
| LinkedIn | https://www.linkedin.com/in/md-shishir-ahmed |
| Website | https://arrowbin.com/about |
| Photo | https://arrowbin.com/team/shishir-ahmed.webp |

**Send to dev:** both URLs: `https://www.crunchbase.com/organization/<slug>` (goes into the company `sameAs`) and `https://www.crunchbase.com/person/<slug>` (goes into the founder's `author.sameAs`).

---

## 6. TechBehemoths

**Start here:** https://techbehemoths.com/register (opened 15 Oct 2026; it shows a registration form). TechBehemoths describes itself as free, with paid visibility options you don't need.

Paste the same fields as GoodFirms: name, website, founded 2020, long description, services (profile-facts section 9), Dhaka as primary location, hello@arrowbin.com, logo, 4 to 6 portfolio items.

**Send to dev:** `https://techbehemoths.com/company/<slug>`.

---

## 7. The Manifest (no separate sign-up)

The Manifest is Clutch's sister site. Its get-listed page (https://themanifest.com/get-listed, found through search; it blocked our direct fetch) says a company with a Clutch profile is featured automatically. So there is nothing to fill in.

**Action:** about a week after you correct the Clutch profile, search The Manifest for "Arrowbin". If the profile appears, check that it shows the corrected description and Dhaka as primary.

**Send to dev:** the Manifest profile URL, if one appears.

---

## 8. Hostinger Agency Directory and partner link (FIX-PLAN P4.7)

**Directory:** https://www.hostinger.com/agency-directory (opened 15 Oct 2026; it listed 190 agencies and no Arrowbin). Requirements: https://www.hostinger.com/support/partner-program-and-agency-directory-requirements/ (opened 15 Oct 2026).

What the requirements page says, in short:
- You must be in the Hostinger Partner Program, but "membership alone does not put you in the Directory". Listing is a separate review.
- Partners "can submit a profile from the For Partners section" (in your Hostinger account).
- "Descriptions must reflect your actual business." No filler, placeholder text, copy-pasted descriptions or keyword stuffing.
- Hostinger also advises against using a tagline as the whole description, vague buzzwords, mixing first and third person, and listing every technology.
- Directory cards show a description, service tags and a **starting price**.

| Field | Paste |
|---|---|
| Agency name | Arrowbin |
| Description | Long description (it is written in one voice, "we", and has no buzzwords) |
| Services | Web development, e-commerce, maintenance and support, hosting setup (only the tags Hostinger offers that match) |
| Starting price | [FOUNDER: minimum project size] (decision F5; leave the profile unsubmitted until you have it) |
| Website | https://arrowbin.com |
| Location | Dhaka, Bangladesh |
| Portfolio | Projects hosted on Hostinger first [FOUNDER: which client sites are on Hostinger?] |

**Ask for a partner link.** Send this through Hostinger support or your partner manager:

> Subject: Partner profile and link for Arrowbin
>
> Hi,
>
> Arrowbin (https://arrowbin.com) is in the Hostinger Partner Program under the referral code ARROWBIN. We've submitted our profile for the Agency Directory and wanted to ask two things:
>
> 1. Is there anything missing from our directory profile that would stop it being approved?
> 2. Do you feature partners anywhere else, such as a partner page, case studies or the Hostinger blog? We'd be glad to write up how we set up hosting, deployments and backups for client sites if that's useful to you.
>
> Thanks,
> Md. Shishir Ahmed
> Founder, Arrowbin
> hello@arrowbin.com

**Send to dev:** the directory profile URL once it is approved.

---

## 9. GitHub organization (FIX-PLAN P0.1)

**Start here:** https://github.com/organizations/arrowbinhq/settings/profile (needs an owner login, so we could not open it). The public org page is https://github.com/arrowbinhq (renamed from Arrowbin-LLC on 16 Oct 2026).

**What it shows now** (GitHub API, 15 Oct 2026): description "At Arrowbin Digital Agency, we're dedicated to turning your concepts into captivating digital realities."; email `info@arrowbin.com`; location "United States of America"; URL `https://www.arrowbin.com/`; 0 public repositories. The site already lists this org in `sameAs`, so fix it **before** the next deploy.

| Field | Paste |
|---|---|
| Display name | Arrowbin |
| Email | hello@arrowbin.com |
| Description | Arrowbin is a software development company for startups and SMBs worldwide. We build custom software, web & mobile apps, SaaS, AI automation and cloud services. |
| URL | https://arrowbin.com |
| Location | Dhaka, Bangladesh (as FIX-PLAN P0.1 says) |
| X / Twitter | Arrowbinllc (already set) |
| Social accounts | add the LinkedIn company page once it exists |

Later (FIX-PLAN P4.6): one or two useful public repositories, each with a README that links to arrowbin.com. That is dev work, not part of this kit.

**Send to dev:** nothing new; just tell dev it's done so the P0.1 check passes.

---

## 10. Google Business Profile (only if the Dhaka office qualifies)

**Do this only if FIX-PLAN D8 is answered "yes":** the Dhaka office has signage, is staffed during set hours and clients can visit. If not, skip it. A GBP at a home office where clients never visit, or at the St. Petersburg virtual office, breaks Google's rules ("If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible", from https://support.google.com/business/answer/3038177, quoted in `docs/seo/08-local/local-seo-plan.md`).

**Start here:** https://www.google.com/business/ (opened 15 Oct 2026; it redirects to business.google.com). First search Google Maps for "Arrowbin Dhaka" to check nothing exists already.

| Field | Paste |
|---|---|
| Business name | Arrowbin (nothing else) |
| Primary category | Software company |
| Extra categories | Website designer, E-commerce service (only if true) |
| Address | the Dhaka street address from D8, exactly as on the signage; place the pin on the building |
| Phone | +880 1843-596038 |
| Website | `https://arrowbin.com/?utm_source=gbp&utm_medium=organic&utm_campaign=dhaka` |
| Appointment link | https://cal.com/arrowbin/30min |
| Hours | only real, staffed hours |
| Description | GBP description from profile-facts section 2 |
| Services | the 8 services from profile-facts section 3 |
| Photos | real ones only: signage, office, team, founder |

Google may ask for video verification showing the signage, workspace and staff. Reviews from Bangladeshi clients can go here as well as Clutch, with the same no-incentive rule.

**Send to dev:** the Maps share link. Dev decides whether it belongs in the schema (it is usually a `hasMap` value, not a `sameAs`).

---

## 11. Bing Places (same condition as Google)

**Start here:** https://www.bingplaces.com/ (opened 15 Oct 2026; it redirects to https://www.bing.com/forbusiness/). Only after the Google profile is verified: Bing can import it, which keeps the details identical. No US listing at the virtual office.

**Send to dev:** the Bing Places listing URL, for the tracking table only.

---

## Not now (and why)

- **UpCity, Sortlist, Expertise.com, Built In:** lower value than the list above for a team based in Dhaka; revisit after week 4.
- **BASIS and e-CAB:** paid memberships in Bangladesh. Worth it if you will attend events; see `pr-and-mentions.md`.
- **General Bangladeshi business directories** (BDTalika and similar): low value; only after the profiles above are live.
- **Anything that offers "submit to 500 directories":** never.

---

## Tracking table (fill in as you go)

| Profile | Date created | Public URL | Sent to dev | In `sameAs` |
|---|---|---|---|---|
| Clutch | | https://clutch.co/profile/arrowbin-0 | | |
| LinkedIn company page | | | | |
| GoodFirms | | | | |
| DesignRush | | | | |
| Crunchbase organization | | | | |
| Crunchbase person | | | | (founder `sameAs`) |
| TechBehemoths | | | | |
| The Manifest | | | | |
| Hostinger Agency Directory | | | | |
| GitHub org (fixed) | | https://github.com/arrowbinhq | | already in |
| Google Business Profile (if D8 yes) | | | | (`hasMap`) |
| Bing Places (if D8 yes) | | | | no |
