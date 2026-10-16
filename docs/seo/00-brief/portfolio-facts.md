# Portfolio facts (checked 16 October 2026)

What each live project really is, so site copy, posts and directory profiles say the same true thing. Sources: the founder's notes, each public site, and a read-only look at each admin dashboard (nothing was changed). Client revenue, customer data and logins are deliberately left out: this repo is public.

**Correction:** earlier docs said every portfolio site is a WordPress to Next.js rebuild. That is wrong. Only North Bengal Agro Farms and Maneel Club are (plus arrowbin.com). Never write "every site in our portfolio started on WordPress" again.

| Project | Before | What Arrowbin built | Platform | Status on 16 Oct 2026 |
|---|---|---|---|---|
| Silent Lifestyle BD | Dhaka fashion brand with physical showrooms (per founder), no website | First online store, from scratch, with a custom admin | Next.js | Built; the client isn't selling through it yet, so no results to quote |
| FlexOver BD | Brand-new business, no website | Multi-category store from scratch, with a custom admin | Next.js | Built; the client isn't selling through it yet, so no results to quote |
| North Bengal Agro Farms | Organic farm in Rajshahi ("since 2010"), basic WordPress site | Premium site with shop, manual bKash/Nagad/Rocket payment checks, blog and a custom admin | Next.js | Live, real seasonal orders (mango season, June to July) |
| Maneel Club | Online men's fashion brand, basic WordPress store | Rebuilt store with a large custom admin | Next.js | Live since February 2026; **10,000+ orders** (10,306 on the dashboard, 16 Oct 2026) |
| গ তে গয়না | Well-known Bangladeshi jewellery brand (about 120k Facebook followers, per founder), no website | First online store | Shopify | Live; a Next.js rebuild with Android and iOS apps is in progress |
| Brandingly | Branding and marketing agency in Dhaka, basic WordPress site | UI/UX redesign, kept on WordPress | WordPress | Live |
| OutNet | Unknown | Marketing site for a digital agency | Next.js | Live; "rebuilt from WordPress" on the site is **unconfirmed**, ask the founder |
| YT Shop India | | | | Removed from the site at the founder's request. Do not showcase |

## Build times and what was wrong before (founder, 16 October 2026)

- **Maneel Club:** first version built in **10 days**, live in February 2026; features added since as the business asked for them. The old WordPress store was slow, had a messy dashboard with many plugins to manage, kept breaking after plugin updates, couldn't take the custom features the business needed and couldn't grow with it.
- **North Bengal Agro Farms:** built in **about 2 weeks**, live in May 2026. The old WordPress site was basic and slow, and its dated design didn't feel modern or premium.

## Custom admin features (proof for "custom software" and "e-commerce" pages)

- **Silent Lifestyle BD:** order queue where staff call the customer, then confirm (pending, confirmed, on hold, packed, shipped, delivered, cancelled, returned), keyboard shortcuts, products with live/hidden states, categories and collections, discount codes, customers, cash-on-delivery analytics (money collected vs orders placed), content editor (banners, strip, pages, tiles, size charts, menus), media, roles (staff, manager, owner) and an activity log. Changes reach the shop in seconds with no deploy.
- **FlexOver BD:** order queue, out-of-stock and low-stock alerts, cash tracking (collected vs awaiting collection), coupons, timed flash sales, newsletter list, review moderation, content, staff and an activity log.
- **North Bengal Agro Farms:** orders with payment status, a payment verification queue (match the bKash, Nagad or Rocket transaction ID before confirming), products and categories, customers, a blog with authors, categories and tags, team and users, and an audit log.
- **Maneel Club:** orders, products with attributes, stock audit, reviews, coupons and offers, IP bans and phone-number bans (fake-order control), delivery cities, hero slider, and analytics (revenue, units, average order value, cancellation rate, period comparison, CSV export).

## Numbers: what may be published

Both clients approved their case studies on 16 October 2026: the numbers, the screenshots and the quote, as written in `src/lib/case-studies.ts` (pages at /work/maneel-club and /work/north-bengal-agro-farms). Only those figures are approved; anything new needs a fresh OK.

- **Maneel Club** (approved by Md. Omar Faruk, founder and owner): 10,000+ orders and 17,000+ items sold since February 2026, orders from 70+ cities and towns, monthly sales up about 84% from March to September 2026, about 99% cash on delivery, 65 phone numbers blocked for fake orders.
- **North Bengal Agro Farms** (approved by Shahin Alam, manager): Google impressions in the same mango-season weeks went from 48 (old site, 2025) to 26,353 (new site, 2026); 63,800 impressions in the first 20 weeks; average position 2 for "amrapali mango" and 1 for "amrapali aam"; 7 of 7 products eligible for Google's product rich results.
- Never publish revenue, order values or customer details for any client.

## Notes for the founder (client sites)

- Silent Lifestyle BD's store page shows a placeholder phone number (+880 1711-000000) and only one showroom (Panthapath), while the brand has several. Worth fixing before it launches properly.
