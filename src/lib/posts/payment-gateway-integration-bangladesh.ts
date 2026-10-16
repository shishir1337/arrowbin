import type { Post } from "@/lib/blog";

const DIR = "/blog/payment-gateway-integration-bangladesh";

export const post: Post = {
  slug: "payment-gateway-integration-bangladesh",
  title: "Bangladesh Payment Gateway Integration: bKash vs SSLCommerz",
  description:
    "SSLCommerz, direct bKash or Nagad for your online store? Compare published fees, setup and integration steps, and avoid the payment bugs that cost orders.",
  keywords: [
    "payment gateway integration bangladesh",
    "best payment gateway in bangladesh for ecommerce website",
    "bkash payment gateway integration",
    "sslcommerz integration",
    "sslcommerz charges",
    "nagad payment gateway integration",
    "cash on delivery ecommerce bangladesh",
    "shopify payment gateway bangladesh",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "15 min read",
  category: "E-commerce",
  excerpt:
    "Most Bangladeshi shoppers want cash on delivery or a mobile wallet at checkout. Here is how to choose between an aggregator and direct bKash or Nagad, what each costs, and how to wire it up safely.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a Bangladeshi online store checkout in a browser, with bKash, Nagad, card and cash on delivery payment options and a Tk 2,510 total, beside a phone showing the payment received",
    width: 1280,
    height: 720,
  },
  tldr: "For most Bangladeshi online stores, the right setup is cash on delivery plus one aggregator such as SSLCommerz, which takes cards and the main mobile wallets through a single integration. SSLCommerz lists a Tk 25,500 Basic plan (non-refundable) and 2.5% per successful transaction, 3.5% for AMEX, as of October 15, 2026. Add a direct bKash integration once bKash carries most of your online payments. Whichever you pick, mark an order paid only after your server has validated the payment with the gateway.",
  body: [
    {
      type: "p",
      text: "This guide is for two people. One is a Bangladeshi brand owner moving off Facebook inbox orders or a template site onto a proper store, who needs to pick a পেমেন্ট গেটওয়ে and know what it will cost. Then there's the developer who has to wire it up and keep it working. If you're an overseas brand selling into Bangladesh, most of it applies to you as well.",
    },
    {
      type: "p",
      text: "We rebuild Bangladeshi e-commerce stores, mostly WordPress sites moved to Next.js, so we work on these checkouts from the inside. Every fee and API detail below comes from the providers' own pages and developer docs, opened on October 15, 2026. Fees change. Check them again before you sign anything.",
    },
    {
      type: "p",
      text: "This table is the short answer: where we'd start, by store type. The sections below explain each row.",
    },
    {
      type: "table",
      headers: ["Store situation", "Start with", "Why"],
      rows: [
        [
          "New store, most orders cash on delivery",
          "Cash on delivery plus one aggregator, such as SSLCommerz",
          "One contract and one integration cover cards and the main wallets, and real orders show which method buyers prefer",
        ],
        [
          "bKash carries most online payments",
          "Add a direct bKash integration",
          "Saved wallets and auth-and-capture through bKash's own API",
        ],
        [
          "Many card buyers",
          "An aggregator",
          "Cards plus bKash, Nagad and Rocket in one checkout",
        ],
        [
          "Store on Shopify",
          "A third-party payment app, such as SSLCOMMERZ's",
          "Shopify Payments isn't offered in Bangladesh",
        ],
        [
          "Store on WooCommerce",
          "SSLCommerz's own WooCommerce plugin",
          "Hosted or popup checkout, and the IPN handled without extra setup",
        ],
      ],
    },

    {
      type: "h2",
      text: "Which payment methods do online shoppers in Bangladesh expect?",
    },
    {
      type: "p",
      text: "Plan for cash on delivery plus bKash and Nagad as the minimum, then add cards and Rocket for shoppers who prefer them. We wouldn't launch a Bangladeshi store without cash on delivery, and we wouldn't launch one without a wallet option either.",
    },
    {
      type: "p",
      text: "Mobile wallets are everywhere. Bangladesh Bank's [mobile financial services data](https://www.bb.org.bd/en/index.php/financialactivity/mfsdata) for February 2025, the latest month on the page when we checked, counts 2,392.40 lakh registered accounts (about 239 million) and 871.54 lakh active ones. Active means used in the last three months. Those are accounts, not people: one shopper can hold both a bKash and a Nagad account, so don't read 239 million as a head count.",
    },
    {
      type: "p",
      text: "Where the money goes tells you more. Of Tk 164,726.30 crore that moved through mobile financial services that month, merchant payments were Tk 6,922.67 crore, about 4%. Most of the rest was cash going in and out of wallets, plus person-to-person transfers. Our read is that shoppers have the wallet, but paying a business from it is still a smaller habit than sending money home. That's why a wallet button doesn't make cash on delivery go away.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/mfs-february-2025.svg`,
        alt: "Bar chart of Bangladesh mobile financial services in February 2025: 2,392.40 lakh registered accounts, 871.54 lakh active, and merchant payments of Tk 6,922.67 crore, about 4% of the Tk 164,726.30 crore transacted",
        caption:
          "Merchant payments are still a small slice of mobile money. Source: Bangladesh Bank MFS data, February 2025.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: 'Stores we\'ve built show the same mix at checkout. Silent Lifestyle BD\'s footer reads "Pay on delivery • bKash • Nagad • Card". FlexOver BD lists six options under "We accept", with Rocket, Visa and Mastercard among them. গ তে গয়না puts "Cash On Delivery Available" in its header. You can browse them among the [Bangladeshi stores we have built](/work).',
    },

    {
      type: "h2",
      text: "Should you use an aggregator like SSLCommerz or integrate bKash and Nagad directly?",
    },
    {
      type: "p",
      text: "Use an aggregator when you want one contract and one integration that covers cards and wallets together. Integrate bKash directly when most of your online payments are bKash and you want features such as saved wallets or auth-and-capture through bKash's own API.",
    },
    {
      type: "p",
      text: 'An aggregator holds the merchant relationships with banks and wallets and puts one API in front of them. SSLCommerz is one; its [pricing page](https://sslcommerz.com/pricing/) says its rate applies to "Visa, Mastercard, bKash, Nagad, Rocket, and more". Others, including aamarPay and shurjoPay, work on the same model. Going direct means a separate merchant account per wallet, each with its own API and its own settlement report.',
    },
    {
      type: "table",
      headers: [
        "Option",
        "Methods covered",
        "Contracts",
        "Build effort",
        "Refunds",
        "Best for",
      ],
      rows: [
        [
          "SSLCommerz or another aggregator",
          "Cards plus bKash, Nagad, Rocket and other wallets in one checkout",
          "One",
          "One integration: session, IPN, validation",
          "Refund API in the SSLCommerz v4 docs",
          "Most new stores, and any store with card buyers",
        ],
        [
          "Direct bKash",
          "bKash only",
          "One with bKash",
          "Token, create, execute and query, with more edge cases",
          "Full or partial, within 60 days of payment",
          "Stores where bKash carries most online payments",
        ],
        [
          "Direct Nagad",
          "Nagad only",
          "One with Nagad",
          "API documents and keys arrive after onboarding",
          "Check with provider",
          "Adding Nagad next to a direct bKash setup",
        ],
        [
          "Cash on delivery only",
          "Cash at the door",
          "Your courier",
          "No payment API, but you still need order confirmation",
          "Manual, in cash or by wallet transfer",
          "Testing demand in the first few weeks",
        ],
      ],
    },
    {
      type: "p",
      text: "For a new store, I'd start with an aggregator plus cash on delivery. There's one contract to sign and one integration to maintain, and real orders tell you which method your buyers prefer. Go direct with bKash later, when your own numbers say it carries most online payments, and accept the price: a second integration to maintain and a second report to reconcile daily.",
    },
    {
      type: "p",
      text: "Running both, an aggregator plus a direct bKash button, is a fair end state for a busy store. As a starting point it doubles your payment code before you know you need it.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/which-setup-fits.svg`,
        alt: "Decision matrix for Bangladeshi online stores: a new store with mostly cash on delivery starts with COD plus one aggregator, a bKash-heavy store adds direct bKash, a card-heavy store uses an aggregator, and a Shopify store uses a third-party payment app",
        caption:
          "Where we'd start, by store type. Our view; fee and Shopify facts from SSLCommerz and Shopify.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "cta",
      title: "Choosing between SSLCommerz and direct bKash?",
      text: "Share how orders come in today: the cash on delivery share, the wallets people use and the platform your store runs on. We'll recommend a setup and give you a fixed quote to build it.",
      href: "/contact",
      label: "Get a payment setup plan",
    },

    { type: "h2", text: "How does an SSLCommerz integration work?" },
    {
      type: "p",
      text: "Your server creates a payment session, the shopper pays on SSLCommerz's hosted page or popup, SSLCommerz notifies your server through an IPN, and your server calls the Order Validation API before it marks the order paid. Skip that last call and your store will believe anything that looks like a successful redirect.",
    },
    {
      type: "p",
      text: 'SSLCommerz\'s [v4 developer docs](https://developer.sslcommerz.com/doc/v4/) are blunt: "You must call the SSLCOMMERZ APIs from your server", and "You must validate your transaction and amount by calling our Order Validation API." They also accept only TLS 1.2 or higher. In practice the flow runs in five steps.',
    },
    {
      type: "ol",
      items: [
        "Your server saves the order as pending, then posts the amount, currency and a unique tran_id to the session API, along with four URLs: three pages the shopper returns to (success, fail, cancel) plus an IPN listener. You get the gateway page URL back.",
        "Your customer pays on SSLCommerz's hosted page, or in the Easy Checkout popup on your own page.",
        "SSLCommerz sends the IPN, a server-to-server POST carrying a status (VALID, FAILED, CANCELLED, EXPIRED or UNATTEMPTED) and a val_id.",
        "Your server calls the Order Validation API with that val_id. It checks the status, compares the amount and currency with the saved order, and finds that order by its tran_id.",
        "Only then does the order become paid. When the shopper lands on your success URL, that page reads the order status from your database instead of trusting what the browser posted.",
      ],
    },
    {
      type: "p",
      text: "Two details catch people out. A validation status of VALIDATED means the payment was fine but you've already validated it once, so treat it as already handled, not as an error. And a risk_level of 1 marks a risky transaction: SSLCommerz's advice is to \"hold the service\" and collect verification documents from the customer before you ship.",
    },
    {
      type: "p",
      text: "Your IPN listener has rules of its own. It must be reachable from the internet on port 80 or 443, and the docs ask you to whitelist SSLCommerz's IPs on your firewall. Test cards and mobile OTPs for the sandbox are in the same docs, and the [sandbox page](https://developer.sslcommerz.com/registration/) lets you create a test account yourself.",
    },
    {
      type: "p",
      text: "Between the hosted page and Easy Checkout, we'd pick hosted on a first build. Shoppers leave your site for a page SSLCommerz maintains, so less of your own front end can break mid-payment. Easy Checkout keeps the shopper on your page, which feels smoother, but it's one more script running inside your checkout.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/sslcommerz-payment-flow.svg`,
        alt: "Sequence diagram of an SSLCommerz payment: the store server creates a session, the shopper pays on the hosted page, SSLCommerz sends an IPN, and the server calls the Order Validation API and checks the amount before marking the order paid",
        caption:
          "Validation decides 'paid', not the redirect. Source: SSLCommerz v4 developer docs.",
        width: 1280,
        height: 720,
      },
    },

    { type: "h2", text: "How does a direct bKash integration work?" },
    {
      type: "p",
      text: "Your server gets a grant token, creates a payment, and sends the shopper to bKash to confirm with an OTP and their PIN. When bKash calls you back with a success status, your server executes the payment. If Execute doesn't answer within 30 seconds, query the payment before you try anything else.",
    },
    {
      type: "p",
      text: "If you've searched for a বিকাশ পেমেন্ট গেটওয়ে, this is the integration you were after. bKash documents it publicly on its [developer portal](https://developer.bka.sh/docs), and the docs are clear. For a one-off payment, which bKash calls Tokenized Without Agreement, the sequence goes like this.",
    },
    {
      type: "ol",
      items: [
        "Grant Token. Your server trades the four credentials bKash issues (an app key and secret, plus a username and password) for a token. A token lasts 3,600 seconds by default; bKash asks you to refresh it around minute 50 to 55 and not to call Grant or Refresh more than twice an hour, so cache it.",
        "Create Payment. You send the amount in BDT, your invoice number and a callback URL. bKash returns a paymentID, valid for 24 hours, plus a bkashURL to send the shopper to.",
        "Confirmation. On bKash's page the shopper enters their wallet number, then the OTP and their PIN.",
        "Callback. bKash redirects the shopper to your callback URL with the paymentID and a status of success, failure or cancel.",
        'Execute Payment, on success only. bKash\'s docs say it "should be called only after customer verification is successful and the success callback is received". A paymentID can be executed once; a repeat call on a completed payment returns error 2062.',
        "If Execute hasn't replied in 30 seconds, call Query Payment. Completed means the money moved, so mark the order paid. Initiated means it didn't, and you start again from Create Payment.",
      ],
    },
    {
      type: "p",
      text: "Step 6 is the one to test hardest. A developer who retries Execute after a timeout gets an error at best. One who marks the order failed may have just told a customer who paid that they didn't.",
    },
    {
      type: "p",
      text: "bKash offers more than one-off payments. Tokenized With Agreement links a shopper's bKash account to your store for repeat payments. Auth and Capture holds the amount first and charges or releases it later, which we think suits made-to-order items you can't confirm until stock is checked. Refunds can be full or partial, with up to 10 partial refunds per transaction, within 60 days of the payment, according to the [bKash refund docs](https://developer.bka.sh/docs/refund.md).",
    },
    {
      type: "p",
      text: "bKash also sends an IPN webhook for completed payments. You build a listener, share its URL with bKash's technical team during onboarding, acknowledge a one-time subscription message, then check the signature on every notification. We'd set it up even with Query Payment in place. It tells your server about a payment when the shopper's browser never makes it back to your callback.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/bkash-tokenized-flow.svg`,
        alt: "Flow diagram of bKash tokenized checkout: grant token, create payment, the shopper confirms with OTP and PIN, the callback, execute payment once, a 30-second timeout branch that queries the payment before any retry, and the 60-day refund path",
        caption:
          "Execute once; on a timeout, query first. Source: bKash developer portal.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Nagad is less open to developers. We couldn't find a public Nagad developer portal on October 15, 2026; its website offers a merchant sign-up form, and the API documents and keys come through onboarding. Open-source libraries describe an initialise, redirect, then verify flow signed with a key pair. Build against the documents Nagad sends you, not a GitHub README.",
    },

    {
      type: "h2",
      text: "How do you add local payments to WooCommerce, Shopify or a custom Next.js store?",
    },
    {
      type: "p",
      text: "WooCommerce uses gateway plugins. Shopify needs a third-party provider, because Shopify Payments isn't offered in Bangladesh. A custom store calls the gateway APIs from server-side code, such as Next.js route handlers.",
    },
    { type: "h3", text: "WooCommerce" },
    {
      type: "p",
      text: "SSLCommerz publishes its own [WooCommerce plugin](https://wordpress.org/plugins/wc-sslcommerz-easycheckout/). Its listing says it supports hosted and popup checkout, handles the IPN without extra setup, and creates the order as Pending before the shopper reaches the payment page, which is the right order of events.",
    },
    {
      type: "p",
      text: "For bKash and Nagad you'll find plenty of third-party plugins, and quality varies. Check who maintains one, when it was last updated, whether WordPress.org warns it hasn't been tested with recent releases, and which bKash flow it calls. Some run in a manual mode with no API credentials at all, so someone checks each payment by hand. That's a form, not an integration.",
    },
    { type: "h3", text: "Shopify" },
    {
      type: "p",
      text: "Shopify's [supported-countries list](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries) for Shopify Payments doesn't include Bangladesh. It adds that if your country isn't listed, you \"need to use a third-party payment provider\". SSL Wireless publishes a free [SSLCOMMERZ app](https://apps.shopify.com/sslcommerz) on the Shopify App Store for exactly this.",
    },
    {
      type: "p",
      text: "If you're still deciding [whether Shopify suits a Bangladeshi store](/blog/shopify-vs-custom-ecommerce) at all, our comparison with a custom build works through Shopify's extra transaction fee here and the three-year cost of each.",
    },
    { type: "h3", text: "A custom Next.js store" },
    {
      type: "p",
      text: "On a custom build we keep every payment call in server-side route handlers: one creates the session, one receives the IPN, one handles the shopper's return. Credentials sit in server-only environment variables. Anything prefixed NEXT_PUBLIC_ is [inlined into the browser bundle](https://nextjs.org/docs/app/guides/environment-variables) at build time, so a store password with that prefix is public.",
    },
    {
      type: "p",
      text: "Two rules cover most of it. Never put a gateway secret in client code. Never let the browser tell your server what the amount was. If you're weighing a rebuild anyway, our guide to [moving a WooCommerce store to Next.js](/blog/wordpress-to-nextjs-migration) covers what changes when the checkout moves with it.",
    },

    {
      type: "h2",
      text: "What goes wrong with payments in production, and how do you prevent it?",
    },
    {
      type: "p",
      text: "The common failures are orders marked paid without validation, duplicate callbacks that create duplicate orders, payments lost when the shopper closes the tab, and gateway timeouts. Each one has a standard fix. None of them shows up when you test only the happy path.",
    },
    {
      type: "table",
      headers: ["Failure", "What the customer sees", "Cause", "Prevention"],
      rows: [
        [
          "Unvalidated success redirect",
          "Nothing; you ship orders nobody paid for",
          "Server trusts the browser's return to the success URL",
          "Mark paid only after the IPN and a validation call",
        ],
        [
          "Tampered amount",
          "Nothing; you're paid Tk 10 for a Tk 2,000 order",
          "Amount taken from the browser, not your database",
          "Compare the validated amount and currency with the saved order",
        ],
        [
          "Duplicate IPN or callback",
          "Two confirmation messages, or stock taken twice",
          "Handler isn't idempotent",
          "Unique transaction ID; apply each payment once and ignore repeats",
        ],
        [
          "Shopper closes the tab before the redirect",
          "Paid, but the order still says unpaid",
          "Only the redirect updates the order",
          "Act on the IPN and query the status of stuck orders",
        ],
        [
          "bKash Execute times out",
          "An error page after paying",
          "No reply treated as failure, or Execute retried",
          "Call Query Payment after 30 seconds, then decide",
        ],
        [
          "Refund not reflected",
          "A refund promised but no money back",
          "Refund call timed out and nobody confirmed it",
          "Check refund status before retrying, and store refund IDs",
        ],
        [
          "Daily reconciliation gaps",
          "Nothing yet, while your books drift",
          "Nobody matches orders to the settlement report",
          "Match every paid order to the gateway report each day",
        ],
      ],
    },
    {
      type: "p",
      text: "Tampered amounts deserve a second look. If your checkout page posts the price to your server and your server forwards it to the gateway, anyone with browser dev tools can pay Tk 10 for a Tk 2,000 order, and the gateway will report a perfectly valid Tk 10 payment. Read the amount from your own database, every time.",
    },
    { type: "h3", text: "A go-live checklist" },
    {
      type: "ol",
      items: [
        "Test in sandbox: a success, a failure, a cancel, plus a forced timeout.",
        "Confirm the IPN reaches your server from the public internet, and that you validate it before changing the order.",
        "Check amount and currency against the saved order on every payment.",
        "Make each handler idempotent, so the same IPN arriving twice changes nothing the second time.",
        "Issue a full refund and a partial one, then confirm both in the gateway dashboard.",
        "Set up daily reconciliation: every paid order matched to a line in the settlement report.",
        "Confirm cash on delivery orders by call or SMS before they go to the courier.",
        "Keep every key and secret in server-only environment variables.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/go-live-checklist.svg`,
        alt: "Go-live checklist for a Bangladeshi payment gateway integration: sandbox outcomes tested, IPN validated server-side, amount and currency matched, idempotent handlers, refunds tested, daily reconciliation, COD orders confirmed and secrets kept on the server",
        caption:
          "Eight checks before real money moves. Arrowbin checklist, based on the SSLCommerz and bKash docs.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Server-side validation prevents most of these failures. Daily reconciliation catches whatever slips through, because each one eventually shows up as an order and a payment that don't match.",
    },

    { type: "h2", text: "How much do payment gateways cost in Bangladesh?" },
    {
      type: "p",
      text: "SSLCommerz publishes its price: a Tk 25,500 Basic plan, marked non-refundable, plus 2.5% per successful transaction and 3.5% for AMEX, as listed on October 15, 2026. bKash, Nagad and the other aggregators don't publish e-commerce merchant rates on the pages we checked, so ask for the current rate in writing.",
    },
    {
      type: "p",
      text: "Be wary of fee tables in listicles. Some still quote SSLCommerz setup and annual fees that don't match its own pricing page. Plan around the provider's page or a written quote, nothing else.",
    },
    {
      type: "table",
      headers: [
        "Gateway",
        "Setup cost",
        "Per transaction",
        "Methods",
        "Settlement",
        "Developer docs",
      ],
      rows: [
        [
          "SSLCommerz",
          "Tk 25,500 Basic plan, non-refundable",
          "2.5%, or 3.5% for AMEX",
          "Visa, Mastercard, bKash, Nagad, Rocket and more",
          "Check with provider",
          "Public v4 docs, sandbox and test cards",
        ],
        [
          "Other aggregators (aamarPay, shurjoPay, EPS)",
          "Check with provider",
          "Check with provider",
          "Cards and wallets; confirm the list",
          "Check with provider",
          "Ask for sandbox access first",
        ],
        [
          "bKash direct",
          "Check with provider",
          "Check with provider",
          "bKash only",
          "Check with provider",
          "Public developer portal",
        ],
        [
          "Nagad direct",
          "Check with provider",
          "Check with provider",
          "Nagad only",
          "Check with provider",
          "Shared after onboarding",
        ],
      ],
    },
    {
      type: "p",
      text: "On SSLCommerz's published rate, the maths is simple. A Tk 2,000 order costs Tk 50 in fees at 2.5%, or Tk 70 on an AMEX card.",
    },
    {
      type: "p",
      text: "Now say you sell 400 orders a month at that average, all paid online. That's Tk 8 lakh a month in sales and Tk 20,000 a month in fees, or Tk 2.4 lakh a year. Add the Tk 25,500 plan and year one comes to Tk 265,500.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/first-year-gateway-cost.svg`,
        alt: "Stacked bar chart of illustrative first-year SSLCommerz cost at a Tk 2,000 average order: Tk 85,500 at 100 orders a month, Tk 265,500 at 400 and Tk 625,500 at 1,000, with the Tk 25,500 plan falling from about 30% to about 4% of the total",
        caption:
          "Illustrative maths on SSLCommerz's listed rates (Oct 15, 2026). Volumes are hypothetical.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The pattern matters more than the totals. At 100 orders a month the plan fee is about 30% of your first-year gateway cost; at 1,000 orders it's about 4%. Past a few hundred online orders a month, the per-transaction rate is the number to ask about; SSLCommerz's page says rates start at 2.5%. Before you sign with anyone, get answers to these:",
    },
    {
      type: "ul",
      items: [
        "What is the setup or plan fee, and is any part of it refundable?",
        "What's the rate for each method, including AMEX?",
        "How many days until a settlement reaches your bank?",
        "Does the fee come back when you refund an order?",
        "Are there annual, renewal or minimum fees?",
        "How are chargebacks handled, and who carries the cost?",
      ],
    },

    {
      type: "h2",
      text: "How should cash on delivery work alongside online payments?",
    },
    {
      type: "p",
      text: "Keep cash on delivery for trust, and use order confirmation and clear online payment options to cut the orders that fail at the door. A refused COD parcel has already cost you the packing, the courier run and days with that stock off your shelf.",
    },
    {
      type: "p",
      text: "We can't promise results from any of these. They're the levers you have; pick the ones your margins can carry.",
    },
    {
      type: "ul",
      items: [
        "Confirm every COD order by phone call or SMS before it goes to the courier.",
        "Ask for the delivery charge up front by bKash or Nagad, and collect the rest in cash.",
        "Offer a small discount or free delivery for paying online, if your margins allow it.",
        "List the online methods first at checkout, with cash on delivery clearly available below them.",
        "Flag phone numbers with repeat refusals, so the next order from that number gets a call first.",
      ],
    },
    {
      type: "p",
      text: "Treat COD as its own payment flow in your system. An order moves from pending confirmation to confirmed, then dispatched, then delivered with cash collected, and finally reconciled when the courier's payout arrives. If your store can't tell you which delivered orders the courier hasn't paid you for yet, you're running on trust. Our [courier API integration guide](/blog/courier-api-integration-bangladesh) shows how to match those payouts line by line.",
    },
    {
      type: "p",
      text: "We wouldn't remove cash on delivery to push people online. We'd make paying online the easier choice and let shoppers move over at their own pace.",
    },

    {
      type: "h2",
      text: "What do you need before you apply for a merchant account?",
    },
    {
      type: "p",
      text: "You need a live site on your own domain with HTTPS, clear prices and policies, and the business documents the provider asks for. Check each provider's current list before you start, because the lists differ by business type.",
    },
    {
      type: "p",
      text: "SSLCommerz's [onboarding requirements](https://sslcommerz.com/onboarding-requirements/) page is a good example. For a proprietorship, its summary and detailed checklist include:",
    },
    {
      type: "ul",
      items: [
        "A trade license and a TIN.",
        "VAT and DBID documents.",
        "The NID of the person signing.",
        "A company bank account, with a cheque leaf.",
        "SSLCommerz's own merchant form, listed as MEF.",
      ],
    },
    {
      type: "p",
      text: "Private limited companies need more, including the MOA/AOA and a certificate of incorporation. Every document list we read was written for Bangladeshi entity types. If you're an overseas brand, ask each provider at the very start whether it can onboard a business registered outside Bangladesh.",
    },
    {
      type: "p",
      text: "Get the site ready first: product pages with prices in Taka, refund, delivery and privacy policies, terms, and real contact details. We put these live before any application goes in, since they're the first thing a reviewer can check.",
    },
    {
      type: "p",
      text: "Then the technical basics. Callback and IPN URLs must sit on a public domain, because localhost can't receive a server-to-server call. SSLCommerz needs TLS 1.2 or higher. Ask for test credentials first, so the build can start while the paperwork is processed.",
    },

    { type: "h2", text: "Which payment setup should you launch with?" },
    {
      type: "p",
      text: "Start with cash on delivery plus one aggregator, and get server-side validation right before you add anything else. Run the checklist above in sandbox. After a couple of months of real orders, look at which methods people actually pay with, then decide whether a direct bKash integration earns its keep.",
    },
    {
      type: "p",
      text: "Our [e-commerce development for Bangladeshi brands](/services/ecommerce-development) covers this work, checkout included, if you'd rather not build it in-house.",
    },
    {
      type: "p",
      text: "We also do [monitoring and fixing payment issues after launch](/services/maintenance-support), which is where reconciliation gaps get caught. Gateways also change their APIs over time, and following them costs money; our maintenance guide covers [budgeting for gateway upkeep](/blog/software-maintenance-cost) in its yearly figure.",
    },
    {
      type: "p",
      text: "Send us a short brief to [get help integrating payments](/contact). Tell us your platform and how your orders are paid today, and we'll come back with a plan and a fixed quote.",
    },
  ],
  takeaways: [
    "Most Bangladeshi stores need cash on delivery plus bKash and Nagad at checkout, with cards for shoppers who want them.",
    "An aggregator such as SSLCommerz gives you cards and wallets through one contract and one integration.",
    "SSLCommerz lists a Tk 25,500 non-refundable Basic plan and 2.5% per successful transaction (3.5% for AMEX), as of October 15, 2026.",
    "Go direct with bKash when it carries most of your online payments and you want saved wallets or auth-and-capture.",
    "Never mark an order paid from the redirect; validate the payment on your server and check the amount against your database.",
    "On bKash, never retry Execute after a timeout; call Query Payment first and act on its status.",
    "Reconcile every paid order against the gateway's settlement report each day.",
  ],
  faqs: [
    {
      question:
        "Which is the best payment gateway in Bangladesh for an ecommerce website?",
      answer:
        "There isn't one best gateway for every store. An aggregator such as SSLCommerz covers cards and the main mobile wallets with one integration, which suits most new stores. A direct bKash integration makes sense once bKash carries most of your online payments.",
    },
    {
      question: "Can I accept bKash on my website without a payment gateway?",
      answer:
        "You can ask customers to send money to a bKash number, but that isn't an integrated payment. Your store can't verify it, match it to an order or refund it automatically, so someone has to check every payment by hand. A merchant integration, direct or through an aggregator, does that work for you.",
    },
    {
      question: "Does Shopify Payments work in Bangladesh?",
      answer:
        "No. Bangladesh isn't on Shopify Payments' supported-countries list, and Shopify says stores in unlisted countries need a third-party payment provider. SSLCOMMERZ has a free app on the Shopify App Store for this.",
    },
    {
      question: "How much does SSLCommerz charge per transaction?",
      answer:
        "SSLCommerz's pricing page lists 2.5% per successful transaction and 3.5% for AMEX, plus a Tk 25,500 Basic plan marked non-refundable, as of October 15, 2026. On a Tk 2,000 order, 2.5% is Tk 50. Check the page again before you sign, because fees change.",
    },
    {
      question: "Can I test bKash or SSLCommerz payments before going live?",
      answer:
        "Yes for SSLCommerz, which runs a public sandbox with test cards and OTPs that you can sign up for yourself. For bKash and Nagad, ask for test credentials during onboarding. Either way, test a success, a failure, a cancellation plus a timeout before you switch to live keys.",
    },
    {
      question: "Why does a paid order sometimes show as unpaid?",
      answer:
        "Usually the shopper paid, then closed the tab or lost signal before the redirect back to your store. If only the redirect updates your orders, that payment never gets recorded. Listen for the gateway's server notification (IPN) and query the payment status of stuck orders.",
    },
    {
      question:
        "Should a new Bangladeshi online store still offer cash on delivery?",
      answer:
        "Yes, for most stores. Keep it next to your online options, confirm COD orders before dispatch, and give shoppers a reason to pay online, such as a small discount where margins allow.",
    },
    {
      question: "Can I use SSLCommerz and a direct bKash integration together?",
      answer:
        "Yes. SSLCommerz already includes bKash, so a separate direct bKash button is optional. Running both means two merchant accounts and two settlement reports to reconcile, so do it only when direct features such as saved wallets are worth the extra work.",
    },
  ],
};
