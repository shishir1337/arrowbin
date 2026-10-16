# Arrowbin accounts: what exists, what's wrong, what to create

Checked 16 October 2026, logged out, as a visitor would see each page. Images for every profile are in this folder (`docs/brand/social/`). Longer directory instructions are in `docs/seo/13-sprint-2026-10-15/offpage-kit/directories.md`.

## Rules for every profile

| Field | Use |
|---|---|
| Display name | **Arrowbin**, everywhere. Never "Arrowbin LLC" (LLC is only the legal entity type and may change, for example to a Ltd) and never "Arrowbin Digital Agency". |
| Handle | **arrowbinhq** everywhere (see the plan below). Plain "arrowbin" is taken on Instagram, X, YouTube, TikTok, Pinterest and GitHub; "arrowbinhq" was free on all of them on 16 Oct. Exception: the LinkedIn page URL can be `/company/arrowbin`, which is free. |
| Legal name | **Arrowbin LLC** only where the law needs the entity: Terms, Privacy, contracts, invoices, payment and tax forms, and "legal name" fields in directories. |
| Website | `https://arrowbin.com` (no www) |
| Email | `hello@arrowbin.com` (not info@) |
| Location | Dhaka, Bangladesh, or leave it blank. Never St. Petersburg or Tampa on a social profile. |
| Founded | 2020 |
| Profile picture | `arrowbin-profile-ultra-1080.png` (or the 400 px version) |

---

## Name and username change plan (decided 16 Oct)

The brand is **Arrowbin**. The username moves from `arrowbinllc` to **`arrowbinhq`** so "LLC" leaves every public URL too.

Do it in one sitting, in this order, so the links never point to a dead username for long:

1. **Facebook** (you can do this now): Settings → Page setup → Name: `Arrowbin`. Username: `arrowbin` if Facebook says it's available, otherwise `arrowbinhq`. Also edit the "Privacy and legal info" description to start "Arrowbin is a software development company…" (it currently starts "Arrowbin LLC is…"). Facebook reviews name changes, which can take a few days.
2. **YouTube** (you can do this now): YouTube Studio → Customisation → Basic info → Handle: `@arrowbinhq`.
3. **GitHub**: rename the organisation `Arrowbin-LLC` to `arrowbinhq` (Settings → Rename organisation) and set the display name to `Arrowbin`.
4. **Discord**: rename the server to `Arrowbin`.
5. **Instagram and X** (after recovery): name `Arrowbin`, username `arrowbinhq`. Threads follows Instagram.
6. **New accounts** (LinkedIn page, TikTok, Pinterest and the rest): create them as `Arrowbin` / `arrowbinhq` from the start.
7. **Tell dev the new URLs.** The website's social links (`site.ts`), the X handle on share cards (`metadata.ts`) and the `sameAs` list still point to the old usernames, on purpose, until they change. Old usernames stop working when you change them, so the site must be updated and deployed the same day.

---

## Cover images (redone 16 Oct so nothing is cut on any device)

| Platform | File | Upload tip |
|---|---|---|
| Facebook | `arrowbin-facebook-cover-1640x856.png` | The first design, pulled in from the sides so the Facebook app's crop no longer clips it. Upload and click Save without dragging. |
| X | `arrowbin-x-header-1500x500.png` | Upload as is. X may ask you to zoom: leave it at the default. |
| LinkedIn company page | `arrowbin-linkedin-cover-2256x382.png` | Upload as is; it's twice the 1128x191 size so it stays sharp on phones. |
| YouTube | `arrowbin-youtube-banner-2560x1440.png` | Upload as is; YouTube's preview shows the same crops. |

`mockups/` shows each cover inside every profile layout measured on 16 Oct 2026, with the profile picture or logo in place:
- **X:** desktop and phones at 320, 390 and 430 px. Phones show only the middle of the header.
- **LinkedIn:** desktop (with your admin edit button), tablet and phone.
- **YouTube:** desktop, tablet, phone and the older phone layout.

An automatic check confirms that no text or artwork is cut off or touches the profile picture in any of them.

---

## Part 1: Accounts that exist, and what's wrong with them

### 1. Instagram: instagram.com/arrowbinllc (locked, being recovered)

Now: name "Arrowbin LLC"; bio "At Arrowbin Digital Agency, we're dedicated to turning your concepts into captivating digital realities."; old black "Digital Agency" logo; **no website link**; 2 old posts in the old style; 1 follower, 0 following.

After recovery:
- [ ] Profile picture: `arrowbin-profile-ultra-1080.png`
- [ ] Name: Arrowbin
- [ ] Bio: `Software that moves. Custom software, web & mobile apps, SaaS and AI automation for startups and SMBs worldwide. Free consultation below.`
- [ ] Link: `https://arrowbin.com/contact?utm_source=instagram&utm_medium=social&utm_campaign=profile`
- [ ] Switch to a Professional (Business) account, category "Software company", add hello@arrowbin.com as the contact email
- [ ] Connect it to the Facebook page in Meta Business Suite, so the scheduled posts can go to both
- [ ] Archive the 2 old posts (archiving hides them and can be undone)
- [ ] Threads comes with Instagram: set the same picture and bio there
- [ ] Tell me when it's done, so I can send Google a refresh request for the old snippet

### 2. X: x.com/Arrowbinllc (locked, being recovered)

Now: name "Arrowbin LLC"; same old "Digital Agency" bio; **location "St. Petersburg, FL 33702"** (the virtual office); header says "ARROWBIN DIGITAL AGENCY, We Work for the implementation of your dreams"; old logo; 0 posts, 0 followers; joined May 2024.

After recovery:
- [ ] Header: `arrowbin-x-header-1500x500.png`; picture: `arrowbin-profile-ultra-400.png`
- [ ] Name: Arrowbin
- [ ] Bio: `Software that moves. We build custom software, web & mobile apps, SaaS and AI automation for startups and SMBs worldwide. arrowbin.com`
- [ ] Location: Dhaka, Bangladesh (or blank). Website: `https://arrowbin.com`
- [ ] Post the calendar posts here too (short version), and pin the first one
- [ ] Tell me, for the Google refresh request

### 3. Facebook: facebook.com/arrowbinhq (fixed today, a few items left; username changed from arrowbinllc on 16 Oct)

Done: picture, cover, bio, categories, specialities, email, address removed, Contact us button, privacy and legal text, offer.

Still to do:
- [ ] **About 20 old posts** in the 2024 template ("Need a professional restaurant / solar / hospital website?") plus the old "Digital Agency" logo and cover are still in Photos. Archive them so the page looks like the new brand (archiving can be undone).
- [ ] Founding date is empty: add 2020.
- [ ] Nothing is pinned: pin post 1 after it goes out on 19 Oct.
- [ ] Optional: rename the page from "Arrowbin LLC" to "Arrowbin" (same reason as the naming rule above; Facebook reviews name changes).
- [ ] 16 followers, 0 reviews. Ask real clients for reviews only once they've agreed (no incentives).

### 4. YouTube: youtube.com/@arrowbinllc (new find, not linked from the site)

Now: name "Arrowbin", 42 subscribers, joined July 2021, **no videos**. The banner is a red-and-black gaming design reading "SHISHIR", and the picture is a green and yellow logo (green is off-brand). The description reads "Vibe coding a $1,000,000 software studio, live, every single day… Streaming 10 to 12 hours daily from Bangladesh". That conflicts with the website (a company that builds software for clients), and it promises streams the channel doesn't have.

**Your decision:** make it the company channel, or turn it back into your personal channel. I'd make it the company channel: it's already called Arrowbin (move the handle to @arrowbinhq, see the plan above).

If it becomes the company channel:
- [ ] Banner: `arrowbin-youtube-banner-2560x1440.png`; picture: `arrowbin-profile-ultra-1080.png`
- [ ] Description:
  ```
  Arrowbin is a software development company. Since 2020 we've built custom software, web and mobile apps, e-commerce stores, SaaS products and AI automation for startups and small businesses worldwide.

  Here we share what we learn on real projects: what software costs, how long it takes and how we build it.

  Free consultation: https://arrowbin.com/contact
  ```
- [ ] Keep the links (website, X, Facebook, Instagram, Discord); add LinkedIn once the page exists
- [ ] Then I add it to the website's social links

### 5. GitHub organisation: github.com/Arrowbin-LLC (the website already lists it, so fix it first)

Now: name "Arrowbin LLC"; description "At Arrowbin Digital Agency, we're dedicated to…"; email `info@arrowbin.com`; location "United States of America"; website `https://www.arrowbin.com/`; 0 public repositories; domain not verified.

- [ ] Settings → Profile: name `Arrowbin`; email `hello@arrowbin.com`; location `Dhaka, Bangladesh`; URL `https://arrowbin.com`
- [ ] Description: `Arrowbin is a software development company for startups and SMBs worldwide. We build custom software, web & mobile apps, SaaS, AI automation and cloud services.`
- [ ] Picture: `arrowbin-profile-ultra-400.png`
- [ ] Settings → Verified domains: add arrowbin.com (it needs one DNS TXT record in Cloudflare; I can add it if you say so)

### 6. Your personal profiles (Google and buyers check the founder too)

| Profile | Now | Fix |
|---|---|---|
| GitHub github.com/shishir1337 | Bio "Explore Yourself"; website shishir1337.com, which **no longer works** (the domain doesn't resolve) | Bio: `Founder and lead engineer at Arrowbin. I build custom software, web apps and AI automation for startups and SMBs.` Website: `https://arrowbin.com/about` |
| GitHub repo shishir1337/arrowbin | **Public**: the whole website code plus `docs/seo` | Make it private (Settings → Danger zone → Change visibility) |
| X x.com/shishir1337 | Bio "…better known online as SHISHIR1337, is an Bangladeshi YouTuber. He is a web engineer, gamer, streamer, music artist"; dead shishir1337.com link; green gaming banner; last post April 2021 | Same bio as GitHub, adding "(@arrowbinhq)"; link `https://arrowbin.com/about`. Or leave it as a personal account, but fix the dead link either way. |
| LinkedIn linkedin.com/in/md-shishir-ahmed | I couldn't open it (LinkedIn asks for a login). Every blog post links to it as the author. | Check: headline says Founder at Arrowbin; current job links to the Arrowbin company page once it exists; website arrowbin.com; same photo as the About page. |

### 7. Discord: "Arrowbin LLC" server (invite on the YouTube channel)

19 members. Rename it to "Arrowbin" and use the new logo as its icon. Low priority.

### 8. Cal.com: cal.com/arrowbin/30min (every "Book a call" button goes here)

Now: the event is called "30 min meeting", with no description and no Arrowbin branding (only your name and photo).
- [ ] Event title: `Free 30-minute project call`
- [ ] Description: `A free call with Arrowbin's founder. Tell us what you want to build; you'll leave with next steps and a rough idea of cost and timeline.`
- [ ] Settings → Appearance: brand colour `#3B2BFF`

### 9. Directory profiles that already exist

| Profile | What's wrong | Fix |
|---|---|---|
| Clutch: clutch.co/profile/arrowbin-0 | Says **founded 2024** (the site says 2020); the description says "teams in Dhaka and Tampa, Florida"; only location St. Petersburg; no logo; 0 reviews; service lines all 20% (default values); hourly rate "< $25/hr" (is that right?). I saw no "Claim" button today, so it may already be claimed, maybe by you. | Log in at clutch.co with hello@ or your Gmail. If you can't get in, ask Clutch support who manages it. Then fix every field using directories.md section 1. |
| The Manifest: themanifest.com/company/arrowbin-0 | Copied from Clutch: founded 2024, St. Petersburg, and made-up looking data (industries "Advertising 30%, Automotive, Construction…", client sizes "Enterprise 30%") | Nothing to log in to. It updates from Clutch; check it a week after fixing Clutch. |
| Trustpilot: trustpilot.com/review/arrowbin.com | Claimed in Sep 2026 (by you?), 0 reviews, country "United States" | In Trustpilot Business: country Bangladesh, logo, short description. Invite only real clients. |

---

## Part 2: Accounts to create

Checked 16 Oct: none of these exist for Arrowbin yet.

### Do this week (biggest effect)

| # | Account | Why | Start here | Notes |
|---|---|---|---|---|
| 1 | **LinkedIn company page** | The biggest gap. B2B buyers and Google both look for it; your author profile has no company page to link to. | linkedin.com/company/setup/new | URL slug `arrowbin`. Cover: `arrowbin-linkedin-cover-2256x382.png`. Logo: `arrowbin-profile-ultra-400.png`. Tagline: `Software that moves: custom software, web & mobile apps, SaaS and AI automation for startups and SMBs.` Other fields: directories.md section 2. Must be created on desktop or iPhone (not Android). |
| 2 | **Bing Webmaster Tools** | Bing's index also feeds Copilot, DuckDuckGo and Yahoo. We already ping Bing with IndexNow, but there's no dashboard to see errors. | bing.com/webmasters | Sign in with Google and choose "Import from Google Search Console"; no code change needed. Then submit `https://arrowbin.com/sitemap.xml`. |
| 3 | **Google Search Console Domain property** | Today only `https://arrowbin.com/` is verified. A Domain property also covers www, http and any subdomain, where spam URLs can hide. | search.google.com/search-console → Add property → Domain → `arrowbin.com` | Needs one DNS TXT record in Cloudflare. I can add it if you say so. |
| 4 | **Crunchbase** (company and founder) | AI assistants and data sites read Crunchbase to learn what a company is. | crunchbase.com → search "Arrowbin" first → Resources → Create profile | Fields: directories.md section 5. Leave "Legal name" blank until Sunbiz shows ACTIVE. |
| 5 | **Clutch access** | Already listed with wrong facts (see Part 1) | see Part 1 | |

### Next 2 to 3 weeks

| # | Account | Notes |
|---|---|---|
| 6 | **GoodFirms** | goodfirms.co/get-listed. Free listing. directories.md section 3. |
| 7 | **WhatsApp Business** on +880 1843-596038 | Most Bangladeshi clients will message here first. Connect it to the Facebook page for a WhatsApp button. Your decision: is this the number you want public? |
| 8 | **Google Business Profile** | **Only if** the Dhaka office has signage, staffed hours and clients can visit. Never at the St. Petersburg virtual office (Google's rules don't allow virtual offices). directories.md section 10. |
| 9 | **Hostinger Agency Directory** | From your Hostinger partner account. It needs a starting price, so decide your minimum project size first. directories.md section 8. |
| 10 | **DesignRush** and **TechBehemoths** | Free listings. directories.md sections 4 and 6. |

### Reserve the name only (2 minutes each, no posting needed)

This stops anyone else taking the name and keeps the handle the same everywhere.

| Account | Handle to take | Status 16 Oct |
|---|---|---|
| TikTok | @arrowbinhq | free (@arrowbin belongs to someone else) |
| Pinterest | arrowbinhq | free (arrowbin belongs to someone else) |
| Medium | @arrowbin | free. Later you can republish guides here with a link back to the original. |
| dev.to | arrowbin | free. Same use as Medium, for developer readers. |
| Behance | arrowbin | free. Useful later for UI/UX case studies. |
| Product Hunt | arrowbin | no product listed. Use it when you launch a product of your own. |

Dribbble "arrowbin" is already registered but not public. If it isn't yours, use "arrowbinhq".

### Not now

- **Bing Places, Apple Business Connect:** only after a Google Business Profile exists, and only at a real office.
- **Wikipedia or Wikidata:** they need independent press coverage first; a self-made page gets deleted.
- **BASIS and e-CAB (Bangladesh):** paid memberships, worth it only if you'll use their events.
- **Meta Verified, paid directory placements:** not needed.
- **Any "submit to 500 directories" service:** never.

---

## Order of work after the accounts are recovered

1. Instagram: fix the profile, connect it to the Facebook page, archive the old posts.
2. X: fix the profile, post, pin.
3. Tell me. I'll send Google refresh requests for the old Instagram and X snippets.
4. Send me every new profile URL (LinkedIn, Crunchbase, YouTube once changed, Clutch once fixed). I'll add them to the website's social links and `sameAs`. You then deploy and purge the Cloudflare cache.

## Tracking

| Account | Exists | Fixed or created | Date | URL |
|---|---|---|---|---|
| Instagram | yes, locked | | | https://www.instagram.com/arrowbinllc |
| X | yes, locked | | | https://x.com/Arrowbinllc |
| Facebook | yes | mostly, username now arrowbinhq (16 Oct) | 16 Oct | https://www.facebook.com/arrowbinhq |
| YouTube | yes | | | https://www.youtube.com/@arrowbinllc |
| GitHub org | yes | | | https://github.com/Arrowbin-LLC |
| Founder GitHub / X / LinkedIn | yes | | | |
| Discord | yes | | | |
| Cal.com | yes | | | https://cal.com/arrowbin/30min |
| Clutch | yes, wrong facts | | | https://clutch.co/profile/arrowbin-0 |
| Trustpilot | yes, claimed | | | https://www.trustpilot.com/review/arrowbin.com |
| LinkedIn company page | no | | | |
| Bing Webmaster Tools | no | | | |
| GSC Domain property | no | | | |
| Crunchbase (company, person) | no | | | |
| GoodFirms | no | | | |
| WhatsApp Business | ? | | | |
| Google Business Profile | no (only if the office qualifies) | | | |
| Hostinger Agency Directory | no | | | |
| DesignRush / TechBehemoths | no | | | |
| TikTok, Pinterest, Medium, dev.to, Behance (reserve) | no | | | |
