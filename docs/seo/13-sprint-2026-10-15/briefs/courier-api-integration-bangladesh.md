# Brief: courier-api-integration-bangladesh (backup 4, Bangladesh)

## Source rule for this post (lead's instruction)
Use **official courier documentation only** for API facts. Tonight's status:
- **RedX:** official OpenAPI docs read in full at https://redx.com.bd/developer-api/ (JavaScript-rendered; read in a browser on 15 Oct 2026). Usable.
- **Steadfast:** no public API reference found. Usable official sources: Steadfast's own WordPress plugin page (author "SteadFast Courier LTD"), its business page and its pricing page. Endpoint request and response formats are not public; the writer must not describe them beyond the plugin page.
- **Pathao:** the developer API page (https://merchant.pathao.com/courier/developer-api) redirected to the merchant login screen on 15 Oct 2026. **Official docs are behind a merchant login.** Do not describe Pathao endpoints, auth flow or field names from third-party packages (packagist, PyPI, npm, dev.to). Describe Pathao only at the level the founder can confirm from a merchant account, or say "Pathao provides API access to merchants through its merchant panel."
- **Never** state or imply which courier any Arrowbin client store uses.

## Keywords
- **Slug:** `/blog/courier-api-integration-bangladesh`
- **Primary keyword:** courier api integration bangladesh
- **Secondary (4 to 8):** steadfast courier api integration · pathao courier api · redx api integration · woocommerce courier integration bangladesh · courier webhook order status · cash on delivery reconciliation · shopify courier app bangladesh
- **Question phrasings seen in results:** "How to integrate Steadfast courier API", "Pathao courier API integration with Laravel", "RedX for WooCommerce", "Manual WooCommerce courier management for Bangladesh with SteadFast, RedX, and Pathao support" (plugin tagline)

## Search intent and reader
Mixed: an e-commerce owner in Bangladesh who books parcels by hand (copying addresses into a courier panel) and wants it automated, and the developer who will build it. Lead with the owner's questions (what it automates, which courier, what it costs), then a developer section. The pairing post is `payment-gateway-integration-bangladesh`.

## SERP snapshot (web search, 15 Oct 2026)
| # | Title | URL | Gap |
|---|---|---|---|
| 1 | SteadFast API (WordPress plugin, by SteadFast Courier LTD) | https://wordpress.org/plugins/steadfast-api/ | Official plugin; WooCommerce only, no guidance |
| 2 | Steadfast Courier Python SDK Documentation | https://steadfast-python.readthedocs.io/ | Unofficial SDK |
| 3 | Pathao courier API integration with Laravel | https://dev.to/enan/pathao-courier-api-integration-with-laravel-195h | Developer tutorial; third-party |
| 4 | pathao-courier (Laravel package) | https://github.com/codeboxrcodehub/pathao-courier | Unofficial package |
| 5 | Redx for WooCommerce | https://wordpress.org/plugins/redx-for-woocommerce/ | Plugin listing |
| 6 | BC CourierHub BD | https://wordpress.org/plugins/bc-courierhub-bd/ | Multi-courier plugin |
| 7 | WD: Easy Courier BD (Shopify app) | https://apps.shopify.com/wd-easy-courier-bd | App listing |
| 8 | routexpress-bd (npm README) | https://unpkg.com/routexpress-bd@1.0.0/README.md | Unofficial wrapper |

**Overall gaps:** no editorial page at all. Everything is a plugin, package or SDK. Nobody explains, for an owner, what an integration automates, how to compare couriers, or how to keep order status and cash-on-delivery money in sync. Nobody covers webhook security or status mapping across couriers. Near-empty results: the most winnable topic in this sprint.

## Our angle
"What a courier integration should do for your store, and how to build one that doesn't lose parcels or money." Use RedX's official OpenAPI as the worked reference (because its docs are public), Steadfast's official plugin and pricing pages for what Steadfast publishes, and a neutral note on Pathao's login-gated docs. The citable assets: a lifecycle diagram, a status-mapping table (RedX's published statuses mapped to store order states), and a "what goes wrong" table. Written from the view of a team that builds Bangladeshi stores, without naming which courier any client uses.

## Title, meta, excerpt
- **Title (59 chars):** Bangladesh Courier API Integration: Steadfast, Pathao, RedX
- **Meta description (152 chars):** Stop copying orders into courier panels. What a Steadfast, Pathao or RedX integration automates, how to choose, and how to keep parcels and COD in sync.
- **Excerpt:** A courier integration books parcels from your orders, pulls status updates back and helps reconcile cash on delivery. Here is how it works, using RedX's public API as the example.

## Outline (H2s as questions, each opening with the direct answer)
1. **What does a courier API integration do for an online store?**
   Answer: It books a parcel from each confirmed order, stores the tracking ID, pulls status updates back into your order list, and gives you the data to match cash-on-delivery payouts to orders.
   Cover: manual vs integrated flow; who benefits (stores past a handful of orders a day; no invented thresholds).
2. **Which couriers offer APIs, and where are their docs?**
   Answer: RedX publishes its OpenAPI documentation openly; Steadfast offers API access and an official WooCommerce plugin; Pathao provides API access through its merchant panel.
   **Table columns:** Courier | Where the docs are | Sandbox | Webhooks | Official plugins or apps | Published charges. Fill only with the verified facts below; leave "ask the courier" where unknown.
3. **How do you choose a courier, or should you use more than one?**
   Answer: Compare coverage for where your customers are, delivery and COD charges, how fast COD is paid out, return handling, and how good the API is; many stores use more than one courier for different areas or as a fallback.
   Cover: Steadfast's published 1% COD and risk charge and ৳80 pick-and-drop minimum; RedX's charge calculator endpoint; tell readers to get current rates in writing.
4. **How does a courier integration work, step by step?**
   Answer: Map the customer's address to the courier's area ID, create the parcel with the order's details and COD amount, save the tracking ID, then update status from webhooks or by polling.
   Cover: RedX create-parcel required fields (customer_name, customer_phone, delivery_area, delivery_area_id, customer_address, cash_collection_amount, parcel_weight, value); area lookup by postal code or district; pickup stores; charge calculator. **Diagram:** parcel lifecycle.
5. **How do you keep order status in sync?**
   Answer: Receive the courier's webhook, verify it, map the courier's status to your own order states, and fall back to polling for parcels that go quiet.
   **Table columns:** RedX status | Meaning (per RedX) | Store order state | Customer message. Rows: ready-for-delivery, delivery-in-progress, delivered, agent-hold, agent-returning, returned, agent-area-change, paid.
   Cover: RedX webhook credentials go in the callback URL's query string, so treat each callback as a hint and confirm with the track or info endpoint before marking an order delivered or paid.
6. **How do you reconcile cash on delivery?**
   Answer: Match each courier payout to tracking IDs and orders, account for delivery and COD charges, and flag any parcel marked delivered with no matching payout.
   Cover: Steadfast says merchants request payouts from the dashboard once parcels are delivered and that the dashboard reconciles each parcel line by line; RedX publishes a `paid` status. Link to the payment gateway post for online payments.
7. **What about returns, exchanges and partial deliveries?**
   Answer: Treat them as their own parcel types, because couriers do: RedX lists reverse, exchange and partial delivery types.
   Cover: restocking, refund triggers, customer messages.
8. **Plugin or custom integration?**
   Answer: A plugin is fine for a WooCommerce or Shopify store with one courier and standard flows; build custom when you use several couriers, a custom storefront, or need your own status logic and reports.
   Cover: Steadfast's official WooCommerce plugin; RedX's WordPress plugin and Shopify app; what a custom build adds (queues, retries, idempotency using your invoice ID, a single status model across couriers).
9. **What goes wrong, and how do you prevent it?**
   Answer: Wrong area mapping, duplicate bookings on retries, missed or spoofed status callbacks, and payouts that don't match orders.
   **Table columns:** Problem | Symptom | Cause | Prevention.

## Original chart and diagram ideas
1. **Parcel lifecycle diagram.** Order confirmed → area mapped → parcel created (tracking ID) → picked up → in transit → delivered or returned → COD paid → reconciled. Status labels from RedX's published list. Source: https://redx.com.bd/developer-api/
2. **Status mapping table graphic.** RedX statuses to store states (from section 5). Source: same.
3. **Architecture diagram: custom multi-courier integration.** Store → job queue → courier adapters (one per courier) → webhook receiver → verify via track API → order database → reconciliation report. Original.
4. **Decision chart: plugin or custom.** Inputs: platform, number of couriers, order volume band (no invented thresholds), need for custom reports. Original.

## FAQs
1. **Do Steadfast, Pathao and RedX have APIs?** Yes. RedX publishes its API docs openly, Steadfast offers API access and an official WooCommerce plugin, and Pathao provides API access through its merchant panel.
2. **Is there a sandbox for testing?** RedX publishes a sandbox base URL. For other couriers, ask for test credentials before you build.
3. **Can I connect a courier to a Shopify store?** Yes. RedX lists an official Shopify app; check each courier's current apps.
4. **How do I get courier API credentials?** From your merchant account with the courier. RedX's docs page has a request-token option; Steadfast's plugin asks for your account's API credentials.
5. **What does Steadfast charge for cash on delivery?** Its pricing page lists a 1% cash on delivery and risk management charge, with delivery charges calculated by route and weight (excluding VAT and tax).
6. **Can I use more than one courier?** Yes. A custom integration can route parcels by area or courier performance and keep one status view for your team.
7. **Do webhooks replace tracking checks?** Not fully. Use webhooks for speed and confirm important changes, such as delivered or paid, through the courier's tracking API.

## Internal links
| Target | Anchor text |
|---|---|
| `/services/ecommerce-development` | e-commerce development for Bangladeshi brands |
| `/blog/payment-gateway-integration-bangladesh` (when live) | bKash, Nagad and SSLCommerz integration |
| `/blog/shopify-vs-custom-ecommerce` (when live) | Shopify or a custom store |
| `/services/custom-software-development` | custom order and courier workflows |
| `/services/maintenance-support` | keeping integrations working after launch |
| `/work` | Bangladeshi stores we have rebuilt (do not say which courier they use) |

## Verified facts to cite (opened 15 Oct 2026)
| Fact (exact) | Source URL | Published |
|---|---|---|
| RedX OpenAPI: sandbox base URL `sandbox.redx.com.bd/v1.0.0-beta`; production `openapi.redx.com.bd/v1.0.0-beta`; requests send header `API-ACCESS-TOKEN: Bearer {{jwt_token}}`; endpoints: track parcel (GET `/parcel/track/<id>`), parcel details (GET `/parcel/info/<id>`), create parcel (POST `/parcel`, returns `tracking_id`), update parcel (PATCH `/parcels`, e.g. status to cancelled), areas (GET `/areas`, by `post_code` or `district_name`), pickup stores (create, list, details), charge calculator (GET `/charge/charge_calculator`, returns `deliveryCharge` and `codCharge`) | https://redx.com.bd/developer-api/ | live docs (read in browser) |
| RedX create-parcel required fields: customer_name, customer_phone, delivery_area, delivery_area_id, customer_address, cash_collection_amount, parcel_weight, value; optional merchant_invoice_id, instruction, type, parcel_details_json, pickup_store_id | same | live docs |
| RedX webhook: POST with JSON (tracking_number, timestamp, status, message_en, message_bn, invoice_number, delivery_type); "Any required credentials should be included in the query parameters of the URL"; statuses ready-for-delivery, delivery-in-progress, delivered, agent-hold, agent-returning, returned, agent-area-change, paid; delivery types regular, reverse, exchange-delivery, exchange-return, partial-delivery, partial-return; official WordPress plugin and Shopify app listed | same | live docs |
| Steadfast official WordPress plugin "SteadFast API", by SteadFast Courier LTD: books parcels from WooCommerce orders (single and bulk), checks delivery status and balance; example endpoints `https://portal.packzy.com/api/v1/create_order`, `/status_by_cid/`, `/get_balance`; requires your Steadfast API credentials; 8,000+ active installations, version 1.1.0 | https://wordpress.org/plugins/steadfast-api/ | live listing |
| Steadfast pricing page: "1% cash on delivery and risk management charge"; "Pick and drop service has a minimum charge of ৳80"; charges exclude VAT and tax; weights up to 600 kg; delivery charge may change with parcel size | https://steadfast.com.bd/pricing | live page |
| Steadfast business page: "API and plugins", "Push orders straight from your own site and read the status back"; payouts requested from the dashboard once parcels are delivered, reconciled parcel by parcel | https://steadfast.com.bd/business | live page |
| Pathao's developer API page redirects to the merchant sign-in page (docs require a merchant account) | https://merchant.pathao.com/courier/developer-api | observed 15 Oct 2026 |

## Length
2,200 to 2,800 words.

## Do not claim
- Which courier any Arrowbin client uses, or any client's parcel volumes, delivery success or return rates.
- Pathao endpoint paths, token lifetimes, field names or sandbox hosts (seen only in third-party packages tonight).
- Steadfast request or response formats beyond the plugin page.
- Courier coverage, delivery times or "all 64 districts" claims for any courier or client.
- Delivery charge figures other than those quoted from the courier's own page; tell readers to confirm current rates.
- Fake-order or return-rate statistics (none verified).
- No em dashes.
