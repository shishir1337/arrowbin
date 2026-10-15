# Brief: shopify-vs-custom-ecommerce (backup 1)

## Keywords
- **Slug:** `/blog/shopify-vs-custom-ecommerce` (matches the P1 slug in `05-keyword-map/keyword-map.md`)
- **Primary keyword:** shopify vs custom ecommerce website
- **Secondary (4 to 8):** shopify vs custom website · shopify vs woocommerce vs custom · is shopify worth it for a small business · shopify transaction fees third party payment · shopify in bangladesh · custom ecommerce website cost · when to leave shopify
- **Question phrasings seen in results:** "Shopify vs custom website: which is better?", "Ecommerce website development: Shopify vs custom in 2026", "Is Shopify worth it?", "When should you move off Shopify?", "Does Shopify Payments work in Bangladesh?"

## Search intent and reader
Commercial investigation. The reader is a founder or e-commerce brand owner (US, UK, Australia, Bangladesh) about to launch or re-platform, comparing a monthly Shopify subscription with a custom build. They want a verdict, a cost comparison over time, and the deciding factors for their market.

## SERP snapshot (web search, 15 Oct 2026; plus `03-serp` on 29 Sep 2026)
| # | Title | URL | Gap |
|---|---|---|---|
| 1 | Ecommerce website development: Shopify vs custom in 2026 | https://mecanik.dev/en/posts/ecommerce-website-development-shopify-vs-custom-in-2026/ | UK freelancer; sensible but generic; no local payments |
| 2 | Shopify vs custom website | https://ecommerce.folio3.com/blog/shopify-vs-custom-website | Agency; dated framing |
| 3 | Shopify vs custom ecommerce development 2026 | https://www.groovyweb.co/blog/shopify-vs-custom-ecommerce-development-2026 | Published 22 Feb 2026; headline "$29K+/yr" fee claim contradicts its own body; compares card processing against platform fees |
| 4 | Shopify vs custom website development for ecommerce | https://aundigital.ae/blog/shopify-vs-custom-website-development-for-ecommerce | UAE agency; thin |
| 5 | Custom ecommerce versus Shopify Plus comparison 2026 | https://kolonell.com/en/blog/custom-ecommerce-versus-shopify-plus-comparison-2026 | Content-farm pattern |
| 6 to 8 | gosharpei.com, pixlogix.com, wezom.com (from `03-serp/serp-summary.csv`, 29 Sep 2026) | see `03-serp` | Small agency blogs; `03-serp` rated the SERP Low difficulty |

**Overall gaps:** fee maths is often wrong (mixing card processing with Shopify's platform fee); nobody covers markets where Shopify Payments is unavailable (Bangladesh); nobody covers 2026 AI shopping channels as a decision factor; few give an honest "Shopify is right for most" verdict from a team that builds custom.

## Our angle
A custom-store builder telling readers when Shopify is the better choice, with correct fee arithmetic from Shopify's own pricing page, a Bangladesh section (no Shopify Payments, so the third-party fee stacks on top of the local gateway's fee), and the 2026 factor of Shopify's built-in AI channels versus doing that work yourself on a custom store. Proof: Arrowbin's custom Next.js stores (named only as WordPress to Next.js rebuilds, no metrics).

## Title, meta, excerpt
- **Title (56 chars):** Shopify vs Custom Ecommerce Website: Which Wins in 2026?
- **Meta description (154 chars):** Shopify or a custom-built store? Compare real monthly and per-order costs, local payment limits in markets like Bangladesh, AI shopping channels and more.
- **Excerpt:** Shopify is the right start for many stores, and a custom build wins for others. Here is how to decide, with fee maths from Shopify's own pricing and the cases where custom pays off.

## Outline (verdict first, then H2s as questions)
1. **Shopify or a custom ecommerce website: which should you choose?**
   Answer: Choose Shopify if you want to launch fast with standard products and checkout; choose custom when your checkout, pricing, integrations or local payment needs don't fit Shopify, or its fees start to outweigh the cost of running your own platform.
   **Comparison table (10 to 12 rows) columns:** Factor | Shopify | Custom (e.g. Next.js) | WooCommerce. Rows: monthly platform cost, extra fee with a third-party gateway, design freedom, checkout control, local payments (bKash, Nagad, COD), apps or plugins, speed control, maintenance burden, data ownership and export, AI shopping channels, time to launch, who you need on the team.
2. **What does Shopify really cost per month and per order?**
   Answer: The subscription plus, if you don't use Shopify Payments, an extra 2% (Basic), 1% (Grow), 0.6% (Advanced) or 0.2% (Plus) on each order on top of your payment provider's fee.
   Cover: plan prices (monthly and yearly billing) as shown on 15 Oct 2026 to a US visitor; tell readers prices vary by region; app subscriptions as a cost line (no invented averages).
3. **What does a custom store cost to run?**
   Answer: No platform fee, but you pay for hosting, the payment provider's fee, and ongoing maintenance and security work.
   Cover: cost lines; link to the custom software cost post for build ranges (use Arrowbin's existing published estimates only); link to maintenance page.
4. **Where does Shopify clearly win?**
   Answer: Speed to launch, a reliable hosted checkout, a large app ecosystem, and built-in channels including AI assistants.
5. **Where does a custom store win?**
   Answer: Unusual product logic, B2B pricing, deep integrations with your own systems, full control of checkout and page speed, and markets where Shopify's payment options are limited.
6. **What about WooCommerce?**
   Answer: WooCommerce sits in between: open source and flexible, but you own hosting, updates and plugin security.
   Cover: Patchstack 2025 numbers (91% of new WordPress-ecosystem vulnerabilities in plugins); link to the WordPress to Next.js post.
7. **Does the answer change for stores in Bangladesh?**
   Answer: Yes. Shopify Payments isn't available in Bangladesh, so every gateway-paid order carries Shopify's third-party fee on top of the gateway's own fee, and local wallets and cash on delivery need extra setup.
   **Worked example (state it as arithmetic):** Shopify Basic third-party fee 2% + SSLCommerz 2.5% = 4.5% of an order paid through the gateway; on Grow, 1% + 2.5% = 3.5%; a custom store with SSLCommerz pays the 2.5% gateway fee only. Writer must confirm with Shopify's help center whether the third-party fee applies to manual methods such as cash on delivery before stating it either way.
8. **Which works better with AI shopping assistants in 2026?**
   Answer: Shopify connects products to ChatGPT, Copilot, Google AI Mode and Gemini from the admin; a custom store can be found by the same assistants but you do the data and crawler work yourself.
   Cover: Shopify Agentic Storefronts (24 Mar 2026); link to the ChatGPT shopping post for the custom-store checklist.
9. **How hard is it to switch later?**
   Answer: Products and customers export reasonably well either way; URLs, apps, reviews and order history take planning, and redirects protect search rankings.
   Cover: link to the WordPress to Next.js post for the redirect method.
10. **What do we recommend for most startups and small brands?**
   Answer: Start on Shopify unless a specific requirement rules it out; plan a custom build when fees, checkout limits or integrations cost more than running your own store.

## Original chart and diagram ideas
1. **Stacked bar: fee per gateway-paid order, Bangladesh store.** Data: Shopify Basic 2% + SSLCommerz 2.5%; Grow 1% + 2.5%; Advanced 0.6% + 2.5%; custom + SSLCommerz 2.5%. Sources: https://www.shopify.com/pricing and https://sslcommerz.com/pricing/ (both fetched 15 Oct 2026). Caveat label: excludes cash on delivery; check current prices.
2. **Line chart: Shopify third-party fee by monthly sales.** Formula: plan fee + (percentage × monthly gateway sales) for Basic, Grow, Advanced across, say, $5k to $100k a month. Source: https://www.shopify.com/pricing. Shows where moving up a plan pays off; the chart is computed, not a survey.
3. **Availability graphic: Shopify Payments.** US, UK, Australia: available; Bangladesh: not available (third-party provider required). Source: https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries
4. **Decision flowchart: Shopify, WooCommerce or custom.** Original.

## FAQs
1. **Is Shopify cheaper than a custom website?** Usually at the start. Over time it depends on sales volume, apps and whether you can use Shopify Payments.
2. **Does Shopify charge a fee if I use my own payment gateway?** Yes, on most plans: 2% on Basic, 1% on Grow, 0.6% on Advanced and 0.2% on Plus, per Shopify's pricing page on 15 October 2026.
3. **Can I use bKash or Nagad on Shopify?** Through third-party payment apps and providers, since Shopify Payments isn't available in Bangladesh. Check the provider's Shopify app before you choose.
4. **Is a custom store faster than Shopify?** It can be, because you control every page and script, but only if it's built and maintained well.
5. **Can I move from Shopify to a custom store later?** Yes. Plan URL redirects, customer accounts and order history before you switch.
6. **Should I choose WooCommerce instead?** If you want open source and are ready to own hosting, updates and plugin security, it's a reasonable middle option.
7. **Which is better for selling through ChatGPT?** Shopify has a built-in channel; custom stores can be found too but need the product data and crawler work done for them.

## Internal links
| Target | Anchor text |
|---|---|
| `/services/ecommerce-development` | custom e-commerce development |
| `/work` | stores we have rebuilt |
| `/blog/payment-gateway-integration-bangladesh` | payment gateways in Bangladesh |
| `/blog/chatgpt-shopping-for-online-stores` | getting a custom store into ChatGPT shopping |
| `/blog/wordpress-to-nextjs-migration` | moving off WooCommerce safely |
| `/blog/how-much-does-custom-software-development-cost` | what a custom build costs |
| `/services/maintenance-support` | maintenance for custom stores |

## Verified facts to cite (all opened 15 Oct 2026)
| Fact (exact) | Source URL | Published |
|---|---|---|
| Shopify plans (US view): Basic $25/mo billed monthly, $22/mo billed yearly; Grow $65 / $58; Advanced $399 / $359; Plus from $2,300/mo. Third-party payment provider fee: Basic 2%, Grow 1%, Advanced 0.6%, Plus 0.2% | https://www.shopify.com/pricing | live page (prices may vary by region) |
| Shopify Payments is available in a listed set of countries including the US, UK and Australia; Bangladesh is not listed; otherwise you "need to use a third-party payment provider" | https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries | live help page |
| SSLCommerz: 2.5% per successful transaction (3.5% AMEX); Basic plan ৳25,500 non-refundable | https://sslcommerz.com/pricing/ | live page |
| Shopify Agentic Storefronts: access to ChatGPT, Microsoft Copilot, AI Mode in Google Search and the Gemini app from Shopify Admin; ChatGPT sales "no transaction fees beyond standard processing rates" | https://shopify.com/news/agentic-commerce-momentum | 24 Mar 2026 |
| 11,334 new WordPress-ecosystem vulnerabilities in 2025, 91% in plugins | https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/ | updated 25 Feb 2026 |
| WordPress runs 40.0% of all websites | https://w3techs.com/technologies/details/cm-wordpress | data as of 14 Oct 2026 |

## Length
2,200 to 2,800 words.

## Do not claim
- Shopify fee totals at a given GMV from Groovy Web or any other agency; compute from Shopify's pricing page instead and show the formula.
- Conversion or speed uplifts from moving to custom (Groovy Web's "23% conversion lift", "3X faster pages" are unsourced).
- Any client's sales, order volumes or platform costs.
- Shopify fee rules for cash on delivery until checked on Shopify's help center.
- "All 64 districts" or delivery claims for any client.
- No em dashes.
