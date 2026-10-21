import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/ai-agent-cost-small-business";

export const post: Post = {
  slug: "ai-agent-cost-small-business",
  title: "How Much Does an AI Agent Cost for a Small Business in 2026?",
  description:
    "What an AI agent really costs a small business: setup, monthly model fees worked out from official price lists, upkeep, and when buying beats building.",
  keywords: [
    "how much does an ai agent cost for a small business",
    "ai agent cost",
    "ai agent for small business",
    "cost to build an ai agent",
    "ai agent running costs",
    "ai customer service agent cost",
    "custom ai agent vs off the shelf",
    "n8n ai agent cost",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "15 min read",
  category: "AI",
  excerpt:
    "Most AI agent price guides quote ranges without showing the sums. We split the cost into three buckets (build, running, upkeep) and work out the monthly model bill from the providers' own price lists.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of an AI inbox assistant sorting customer emails into labelled queues, with a draft reply waiting for human approval beside a monthly model-fee meter",
    width: 1280,
    height: 720,
  },
  tldr: "A small business can switch on an off-the-shelf AI agent for a subscription or a per-outcome fee (Intercom lists its Fin agent at $0.99 per outcome), while Arrowbin's published starting point for a focused custom automation is around $10,000–$15,000 including a year of running costs. The model fees themselves are usually small: for 3,000 conversations a month we worked out about $5 to $216 a month from the providers' price lists on October 15, 2026. What sets the real budget is how many systems the agent connects to, how much it may do without a person checking, and who keeps it accurate after launch.",
  body: [
    {
      type: "p",
      text: "You run a business of roughly 5 to 100 people, you've used ChatGPT or Claude, and now you want an agent that answers customers, sorts the inbox or handles paperwork. What you need is a budget you can defend: what it costs to set up, what it costs each month, and whether to buy a tool or have one built.",
    },
    {
      type: "p",
      text: "Most price guides on this topic quote ranges and never show the sums. We build AI automation for small businesses, so we'll do it the other way round: split the cost into three buckets and work out the model bill in the open from the providers' own price pages. Every model price here is as listed on October 15, 2026, and some already have published change dates.",
    },

    {
      type: "h2",
      text: "How much does an AI agent cost for a small business?",
    },
    {
      type: "p",
      text: "An AI agent costs a small business three separate things: setting it up, running it each month, and keeping it accurate after launch. Setup runs from a subscription you switch on today to a custom build, and the monthly model fees are usually the smallest line: about $5 to $216 a month for 3,000 conversations in our worked example below.",
    },
    {
      type: "ul",
      items: [
        "Build or setup is the one-off work. For a bought tool it's configuration and loading your help content. For a custom agent it's mostly integration work and testing.",
        "Running costs arrive every month: model usage (priced per token), the server or platform it runs on, a vector database if it searches your documents, and monitoring.",
        "Upkeep is people time after launch: reviewing wrong answers, fixing integrations when a connected app changes, and re-testing when a model is retired or repriced.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/cost-buckets.svg`,
        alt: "Illustrative bar chart of AI agent cost over the first year: one tall build or setup bar, then smaller monthly bars split into running costs and upkeep, with upkeep heavier in the first three months",
        caption:
          "The usual shape of AI agent spending in year one. Illustrative, not to scale.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "At small-business volumes the running bill is often modest, so scope is what moves your total: which systems the agent touches, and how much it may do before a person checks. For custom work, Arrowbin's [AI automation service page](/services/ai-automation) puts a focused first automation, such as support triage or invoice processing, at around $10,000–$15,000 including a year of running costs. Larger agent systems cost more.",
    },
    {
      type: "p",
      text: "Agent type is the quickest way to place yourself. We've used published prices where they exist and labelled our own judgement calls.",
    },
    {
      type: "table",
      headers: [
        "Agent type",
        "Usual route",
        "Cost anchor",
        "Model usage (our view)",
        "Upkeep (our view)",
      ],
      rows: [
        [
          "FAQ bot on your website",
          "Buy: your helpdesk's built-in AI",
          "Intercom Fin: $0.99 per outcome",
          "Low per chat",
          "Light: keep help articles current",
        ],
        [
          "Inbox or triage agent",
          "No-code workflow, or custom",
          "n8n from €20 a month plus model fees; custom from about $10,000–$15,000 incl. a year of running costs (Arrowbin)",
          "Medium: reads every message",
          "Medium: routing rules drift",
        ],
        [
          "Document processing (invoices, forms)",
          "Custom",
          "From about $10,000–$15,000 incl. a year of running costs (Arrowbin)",
          "High per document; batch pricing helps",
          "Medium: new layouts and suppliers",
        ],
        [
          "Internal knowledge assistant",
          "An assistant plan first; custom if documents are messy or private",
          "Scoped per project",
          "Medium to high: long prompts",
          "Medium: re-indexing, access rules",
        ],
        [
          "Multi-step workflow agent",
          "Custom",
          "Above a focused first automation; priced after a prototype (Arrowbin)",
          "Highest: many calls per task",
          "Heavy: every integration can break",
        ],
      ],
    },

    {
      type: "h2",
      text: "What can an AI agent do for a small business today?",
    },
    {
      type: "p",
      text: "An AI agent today is dependable at answering questions from your own documents, collecting customer details, booking appointments, looking up order status and drafting replies. It still needs a human for exceptions, and for anything that moves money or commits you legally.",
    },
    {
      type: "p",
      text: "By AI agent we mean a language model wired to some of your tools, so it can look things up and take steps instead of only chatting.",
    },
    {
      type: "p",
      text: "Jobs we'd let an agent do on its own, once it's been tested on your real questions:",
    },
    {
      type: "ul",
      items: [
        "Answering questions about products, policies or opening hours from your help pages.",
        "Collecting a lead's details and asking your usual qualifying questions.",
        "Booking and moving appointments in a shared calendar.",
        "Sorting incoming email by topic and routing it to the right person.",
        "Pulling fields from invoices and forms into a spreadsheet or accounting draft.",
      ],
    },
    {
      type: "p",
      text: "Jobs where it should draft and a person should approve:",
    },
    {
      type: "ul",
      items: [
        "Refunds, credits or anything else that moves money.",
        "Complaints, and any conversation with an upset customer.",
        "Quotes, contracts or replies that commit you to something.",
        "Anything close to health, legal or financial advice.",
      ],
    },
    {
      type: "p",
      text: "Where you draw that line depends on [what a wrong answer costs](/blog/ai-automation-for-small-business). A wrong opening time costs an apology. A wrong refund costs money, and sometimes the customer.",
    },
    {
      type: "p",
      text: "Many small firms haven't started. A May 2026 [US Census Bureau analysis](https://census.gov/library/stories/2026/05/ai-use-businesses.html) found business use of AI hovered between 17% and 20% from December 2025 to May 2026, with 37% of firms with 250 or more employees using it and fewer than 20% of firms with four or fewer. In the UK, the [Office for National Statistics reported in July 2026](https://cy.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026) that 28% of businesses with 0 to 9 employees used at least one AI technology, against 49% of those with 250 or more.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/ai-adoption-by-size.svg`,
        alt: "Bar chart of AI use by business size: in the US, under 20% of firms with 1 to 4 employees, 32% with 100 to 249 and 37% with 250 or more; in the UK, 28% of firms with 0 to 9 employees, around 35% with 10 or more and 49% with 250 or more",
        caption:
          "Smaller firms use AI less in both countries. Sources: US Census Bureau (May 2026), UK ONS Wave 159 (July 2026).",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The surveys ask different questions, so compare within a country. Either way, a five-person business with no agent yet is in the majority. There's no rush to buy a platform.",
    },

    {
      type: "h2",
      text: "Should you buy an agent, build one with a no-code tool, or commission a custom one?",
    },
    {
      type: "p",
      text: "Buy when a tool already covers your channel, such as website chat in the helpdesk you use. Use a workflow tool like n8n or Zapier when the job is a few steps between apps you already have, and commission a custom agent when it has to work inside your own systems or handle sensitive data.",
    },
    {
      type: "table",
      headers: [
        "Route",
        "Upfront cost",
        "Monthly cost drivers",
        "First version",
        "Data control",
        "Who maintains it",
        "Best for",
      ],
      rows: [
        [
          "Buy off the shelf",
          "Setup time only",
          "Per-outcome or per-seat fees",
          "Days (our view)",
          "The vendor's terms",
          "The vendor; you keep content current",
          "Chat and support inside one helpdesk",
        ],
        [
          "No-code workflow (n8n, Zapier)",
          "Your time or a freelancer's",
          "Plan fee (n8n from €20, Zapier Pro from $19.99, billed annually) plus model fees",
          "Days to weeks (our view)",
          "Stronger if you self-host n8n",
          "Whoever built it, often the weak point",
          "A few steps between apps with connectors",
        ],
        [
          "Custom agent",
          "From about $10,000–$15,000 incl. a year of running costs (Arrowbin)",
          "Model fees, hosting, vector database, monitoring",
          "Prototype 2–3 weeks, production 3–6 more (Arrowbin)",
          "Yours: your provider, your logs",
          "Your developer under a support plan",
          "Your own systems, sensitive data, unusual logic",
        ],
      ],
    },
    {
      type: "p",
      text: "Off-the-shelf wins more often than agencies like to admit. If your support already runs through a helpdesk with a built-in AI agent, switching it on will usually beat building your own in year one. Intercom's [pricing page](https://www.intercom.com/pricing) lists Fin at $0.99 per outcome, charged once per conversation when the customer confirms the issue is solved, stops asking for help, or Fin completes a workflow. The same rule holds for business software in general, as our [build-or-buy comparison for business software](/blog/custom-software-vs-off-the-shelf) shows.",
    },
    {
      type: "p",
      text: "Run the sum both ways, though. At 1,000 outcomes a month, $0.99 each is $11,880 a year: the same order of money as a focused custom build in its first year. From year two the custom agent costs only running and upkeep, while the per-outcome bill keeps coming. I don't think per-outcome pricing is a rip-off. It folds the vendor's engineering into every answer, and at low volume that's a fair trade.",
    },
    {
      type: "p",
      text: "Workflow tools sit in the middle. [n8n's pricing page](https://n8n.io/pricing/) lists Starter at €20 a month for 2,500 executions and Pro at €50 for 10,000, both billed annually, and says a standard self-hosted version is on GitHub. [Zapier's pricing](https://zapier.com/pricing) starts Pro at $19.99 a month (billed annually) for 750 tasks and charges AI steps separately by model tier.",
    },
    {
      type: "p",
      text: "Watch the execution counts. If each conversation triggers two to four workflow runs, 3,000 conversations is 6,000 to 12,000 executions a month: past Starter and close to Pro's cap. The bigger catch is ownership. When the person who built the flow leaves, nobody knows why step seven exists.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/buy-or-build-decision.svg`,
        alt: "Decision flowchart for a small business choosing an AI agent route: if a tool you already pay for covers the job, switch on its built-in AI agent; if the job is a few steps between apps with connectors, use n8n or Zapier with an LLM step; if it must work inside your own systems or handle sensitive data, commission a custom agent and start read-only",
        caption:
          "Buy, no-code or custom: three questions settle most cases. Arrowbin's decision path.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Custom makes sense when the agent must read and write your own database or a legacy tool with no connector, or when the data can't sit with a third-party workflow vendor. That's when you [connect an agent to your own systems](/services/custom-software-development) properly. Logging and permissions go in on day one.",
    },
    {
      type: "cta",
      title: "Have one job you'd hand to an agent?",
      text: "Describe it in a sentence. We'll tell you whether a tool you already pay for can handle it, and if not, what a read-only pilot would involve.",
      href: "/contact",
      label: "Scope a pilot with us",
    },

    {
      type: "h2",
      text: "What does it cost to run an AI agent each month?",
    },
    {
      type: "p",
      text: "For one example workload of 3,000 conversations a month, AI model fees come to between $5.04 and $216.00 a month depending on the model, at prices listed on October 15, 2026. Add hosting, a vector database and monitoring, and a lean setup lands around $17 a month; a managed one lands around $162 plus €50.",
    },
    {
      type: "p",
      text: "The assumptions, so you can swap in your own: 3,000 conversations a month; four model calls each (say, classify the question, search your documents, write the answer, check it); about 3,000 input tokens and 300 output tokens per call. That's 12,000 calls, or 36 million input and 3.6 million output tokens a month, with no caching or batch discounts. These are illustrative numbers, not measurements from a live system.",
    },
    {
      type: "p",
      text: "For each model, multiply input tokens in millions by the input price, then add output tokens in millions times the output price. [Anthropic's pricing page](https://platform.claude.com/docs/en/about-claude/pricing) lists Claude Sonnet 5.5 at $2 per million input tokens and $10 per million output, so: 36 × $2 = $72, plus 3.6 × $10 = $36, or $108 a month.",
    },
    {
      type: "table",
      headers: [
        "Model (per 1M tokens, input / output)",
        "Input cost",
        "Output cost",
        "Monthly model fees",
      ],
      rows: [
        ["Gemini 2.5 Flash-Lite ($0.10 / $0.40)", "$3.60", "$1.44", "$5.04"],
        [
          "Claude Haiku 5.5, prompts to 100k tokens ($0.10 / $0.50)",
          "$3.60",
          "$1.80",
          "$5.40",
        ],
        [
          "OpenAI gpt-6-luna, to 272K input tokens ($0.10 / $0.50)",
          "$3.60",
          "$1.80",
          "$5.40",
        ],
        [
          "Gemini 3.6 Flash to Dec 31, 2026 ($0.75 / $3.75)",
          "$27.00",
          "$13.50",
          "$40.50",
        ],
        [
          "Gemini 3.6 Flash from Jan 1, 2027 ($1.50 / $7.50)",
          "$54.00",
          "$27.00",
          "$81.00",
        ],
        ["Claude Sonnet 5.5 ($2 / $10)", "$72.00", "$36.00", "$108.00"],
        [
          "OpenAI gpt-6.1-sol, to 272K input tokens ($2 / $10)",
          "$72.00",
          "$36.00",
          "$108.00",
        ],
        [
          "Gemini 3.1 Pro Preview, prompts to 200k ($2 / $12)",
          "$72.00",
          "$43.20",
          "$115.20",
        ],
        ["Claude Opus 5.5 ($4 / $20)", "$144.00", "$72.00", "$216.00"],
      ],
    },
    {
      type: "p",
      text: "Gemini prices come from [Google's Gemini API pricing page](https://ai.google.dev/gemini-api/docs/pricing) (last updated October 14, 2026) and the gpt-6 prices from [OpenAI's API pricing](https://developers.openai.com/api/docs/pricing). Per conversation, the whole range is between about 0.17 cents and 7.2 cents.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/model-fees-worked-example.svg`,
        alt: "Horizontal bar chart of monthly AI model fees for 3,000 conversations a month: $5.04 on Gemini 2.5 Flash-Lite, $5.40 on Claude Haiku 5.5 and OpenAI gpt-6-luna, $40.50 on Gemini 3.6 Flash rising to $81 in 2027, $108 on Claude Sonnet 5.5 and OpenAI gpt-6.1-sol, $115.20 on Gemini 3.1 Pro Preview and $216 on Claude Opus 5.5",
        caption:
          "Worked estimate, same workload on every model. Prices as listed on each provider's pricing page on Oct 15, 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "So the model is rarely the line that breaks a small-business budget. Still, don't default to the biggest one. Start small, test on your real questions, and step up only where the small model keeps failing.",
    },
    {
      type: "p",
      text: "Four things can move these numbers:",
    },
    {
      type: "ul",
      items: [
        "Tokens aren't the same size everywhere. Anthropic notes that Claude 4.7 and later models use a tokenizer producing about 30% more tokens for the same text than its earlier one. Our table assumes identical counts, so measure your own prompts.",
        "Long prompts cost more. Claude Haiku 5.5 goes from $0.10 / $0.50 to $0.50 / $2.50 per million once a prompt passes 100,000 tokens, and OpenAI's gpt-6 prices step up above 272K input tokens.",
        "Caching helps live chat. Anthropic lists Sonnet 5.5 cache hits at $0.10 per million, a twentieth of the input price. If two-thirds of each call's input came from cache, the input line would fall from $72 to $26.40 (24M × $0.10 plus 12M × $2), before the 25% premium on five-minute cache writes.",
        "Batch suits paperwork. Anthropic's Batch API takes 50% off input and output tokens for requests that can wait, which fits overnight invoice runs but not a customer in chat.",
      ],
    },
    {
      type: "p",
      text: "Model fees are one line. The full monthly stack for the same workload, lean and managed:",
    },
    {
      type: "table",
      headers: ["Running cost line", "Lean setup", "Managed setup"],
      rows: [
        [
          "Model fees (3,000 conversations)",
          "Claude Haiku 5.5: $5.40",
          "Claude Sonnet 5.5: $108.00",
        ],
        [
          "Workflow runner or hosting",
          "n8n self-hosted on a Hostinger KVM 1 server: $11.99 at renewal",
          "n8n Cloud Pro: €50, billed annually",
        ],
        [
          "Vector database for document search",
          "Postgres with pgvector on the same server: $0 extra",
          "Supabase Pro: from $25",
        ],
        [
          "Tracing and monitoring",
          "Langfuse Hobby: free (50k units, 30 days of data)",
          "Langfuse Core: $29 (100k units, 90 days of data)",
        ],
        [
          "Monthly total (worked estimate)",
          "About $17.39",
          "About $162 plus €50",
        ],
      ],
    },
    {
      type: "ul",
      items: [
        "Hostinger, which we partner with, lists its smallest [n8n VPS plan](https://www.hostinger.com/vps/n8n-hosting) (1 vCPU, 4 GB RAM) at $6.49 a month paid upfront, renewing at $11.99. We used the renewal price.",
        "[Supabase](https://supabase.com/pricing) lists Pro from $25 a month; [pgvector](https://supabase.com/docs/guides/database/extensions/pgvector) is the Postgres extension for storing embeddings and running similarity search.",
        "[Langfuse](https://langfuse.com/pricing) lists Hobby as free with 50k units a month and Core at $29 with 100k. By our count this workload makes roughly 15,000 to 25,000 units a month, so Hobby fits on paper.",
      ],
    },
    {
      type: "p",
      text: "The lean column is real, but somebody has to patch that server, back it up and keep n8n updated. That's upkeep, the bucket most budgets forget.",
    },

    {
      type: "h2",
      text: "What drives the cost of building an AI agent?",
    },
    {
      type: "p",
      text: "The number of systems an AI agent connects to, and how much it's allowed to do without a person checking, drive build cost far more than the choice of model. A read-only agent that answers from your help pages is a small job; one that updates orders and emails customers is a much bigger one.",
    },
    {
      type: "ul",
      items: [
        "Integrations. Each system the agent reads or writes needs authentication, error handling and tests. A documented API is a different job from a legacy tool with none.",
        "Read-only or taking actions. An agent that only looks things up can be wrong without breaking anything. Once it can change records, you need permissions, confirmation steps, an audit log and a way to undo.",
        "Data preparation. For document search, your PDFs and help pages must be cleaned, split into passages and indexed. Contradictory documents produce confident wrong answers, and fixing the source material is often the slowest part.",
        "Guardrails and hand-off: what the agent must refuse, when it passes a conversation to a person, and what that person sees.",
        "Evaluation: real questions with known good answers, run every time a prompt or model changes. Without it you're testing by feel.",
        "Logging and compliance: where conversation logs live, who reads them, how long you keep them, and whether the provider's data terms suit your sector.",
      ],
    },
    {
      type: "p",
      text: "When we scope an agent, the first two items decide most of the estimate. It's the same pattern as any software project, and our guide to [what custom development costs](/blog/how-much-does-custom-software-development-cost) covers those drivers.",
    },
    {
      type: "p",
      text: "Model choice still matters at the edges. An agent reading scanned invoices may need a larger model to read them reliably, but that lands in the running bill, not the build.",
    },

    {
      type: "h2",
      text: "What hidden costs come with an AI agent after launch?",
    },
    {
      type: "p",
      text: "The hidden costs of an AI agent are mostly people time: checking its answers, fixing integrations when a connected app changes, reviewing hand-offs, and re-testing when a model is repriced or retired. None of it appears on the model provider's invoice.",
    },
    {
      type: "ul",
      items: [
        "Answer checks. Someone reads a sample of conversations every week, especially early on. Plan on a few hours a week at first, falling as the test set grows (our estimate).",
        "Integration breakage. When your helpdesk or store platform changes its API, the agent can fail quietly. Pay for alerting, and agree support terms with whoever built it.",
        "Hand-off review. Count hand-offs during the pilot and multiply by the minutes each one takes.",
        "Model changes. Anthropic's pricing page marks several older Claude models as retired, and Google has published a doubling of Gemini 3.6 Flash prices from January 1, 2027. Each switch means a re-test against your evaluation set.",
        "Content upkeep. New products, new policies, new opening hours: make updating the agent part of someone's job.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/model-price-jumps.svg`,
        alt: "Three cards showing where AI model input prices jump: Gemini 3.6 Flash doubles from $0.75 to $1.50 per million tokens on January 1, 2027, Claude Haiku 5.5 rises five times from $0.10 to $0.50 for prompts over 100,000 tokens, and OpenAI gpt-6-luna doubles from $0.10 to $0.20 above 272K input tokens",
        caption:
          "Price cliffs worth knowing before you commit. Sources: Google Gemini API pricing, Anthropic pricing, OpenAI API pricing (Oct 15, 2026).",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "As a planning figure, we use the same [maintenance rule as for other custom software](/blog/software-maintenance-cost): set aside roughly 15–20% of the build cost per year for ownership (an Arrowbin estimate, not an industry statistic). I'd expect agents to sit at the top of that range, because the models under them keep moving. Put [monitoring and upkeep after launch](/services/maintenance-support) in the budget from the start if nobody inside the business will own it.",
    },

    {
      type: "h2",
      text: "Will an AI agent pay for itself?",
    },
    {
      type: "p",
      text: "An AI agent pays for itself when the hours it saves, times what those hours cost you, outweigh its full monthly cost (upkeep and a share of the build included). If the sums only work at a volume you don't have yet, start smaller.",
    },
    {
      type: "ol",
      items: [
        "Count the work. For two weeks, log how many target tasks arrive (emails, chats, invoices) and time a sample of about 30.",
        "Price the hour with the loaded cost of the person doing it: wages plus taxes and overheads.",
        "Estimate the share the agent can take from the pilot's real resolution rate, not a vendor's headline.",
        "Subtract hand-off time, since passed-on conversations still cost minutes.",
        "Compare the result with the full monthly cost: running costs plus upkeep hours plus the build spread over 12 to 24 months.",
      ],
    },
    {
      type: "p",
      text: "A quick sanity check: divide the full monthly cost by your loaded hourly cost. That's the number of staff hours the agent must save each month just to break even. If it's more than the task takes today, stop there.",
    },
    {
      type: "p",
      text: "Money isn't the only barrier. A [July 2026 brief from the Federal Reserve Bank of San Francisco](https://www.frbsf.org/research-and-insights/publications/community-development-research-briefs/2026/07/ai-adoption-in-small-businesses-2024-sbcs/), drawing on the 2024 Small Business Credit Survey, found nearly 40% of respondents were using or planning to use AI. The barriers it lists include the cost of suitable tools, time for staff training and system upgrades, and gaps in knowing how to implement AI.",
    },
    {
      type: "p",
      text: "In my view, training time is the one owners underestimate. A tool the team doesn't trust gets bypassed, and a bypassed agent saves nothing.",
    },

    {
      type: "h2",
      text: "How do you start an AI agent project without wasting money?",
    },
    {
      type: "p",
      text: "Start an AI agent project with one workflow, run it read-only with a person approving anything it sends, and measure it for a month on real traffic. Only then let it act on its own or add a second job.",
    },
    {
      type: "ol",
      items: [
        "Pick one job with volume and a clear right answer, such as order-status questions or invoice entry.",
        "Write down 50 to 100 real examples with the answer you'd want. That's your evaluation set, and it outlives the pilot.",
        "Build it read-only: the agent drafts, a person approves. Arrowbin's service page puts a working prototype on real data at 2–3 weeks.",
        "Run it for a month and track the numbers below.",
        "Widen in steps: low-risk replies first, then actions, then a second workflow. Production adds another 3–6 weeks in our published estimate.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/pilot-plan.svg`,
        alt: "Five-step AI agent pilot plan for a small business: pick one job, write 50 to 100 test cases, build a read-only prototype in 2 to 3 weeks, run it for a month with a person approving everything, then widen in small steps with 3 to 6 more weeks to production",
        caption:
          "A pilot that keeps a person in the loop until the numbers hold. Durations from Arrowbin's AI automation service page.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "What to collect during the pilot month:",
    },
    {
      type: "ul",
      items: [
        "Volume the agent handled versus volume received.",
        "Drafts approved as written, approved with edits, and rejected.",
        "Every hand-off, with the reason.",
        "Model fees per conversation, from the provider's usage dashboard.",
        "Staff minutes spent reviewing.",
      ],
    },
    {
      type: "p",
      text: "If you're hiring someone to build it, ask to see their evaluation set and how they log conversations before you watch a single demo. Our guide on [how to choose who builds it](/blog/how-to-choose-a-software-development-company) covers the rest. If the agent is the product you plan to sell rather than a helper for your staff, the same pilot logic applies to [budgeting a first version before the full build](/blog/mvp-development-cost).",
    },

    {
      type: "h2",
      text: "Do you need MCP or a custom integration for an AI agent?",
    },
    {
      type: "p",
      text: "You need MCP only if you want an AI assistant such as Claude or ChatGPT to work directly with your own systems. Many small businesses can start without it, using a tool's built-in connectors or a workflow tool.",
    },
    {
      type: "p",
      text: "The [MCP documentation](https://modelcontextprotocol.io/docs/getting-started/intro) defines the Model Context Protocol as an open-source standard for connecting AI applications to external systems, and likens it to a USB-C port for AI applications. In practice an MCP server is a small program that exposes your data or actions (look up a customer, create a booking) to any assistant that speaks the protocol; the same page names Claude and ChatGPT among them.",
    },
    {
      type: "ul",
      items: [
        "Skip it if your tools already have connectors in the assistant your team uses, or the job lives inside one helpdesk.",
        "Consider it if staff want to query your own database or bespoke system from an assistant.",
        "Build it carefully if it can take actions. An MCP server that writes to your systems needs permissions and an approval step, like any agent that acts.",
      ],
    },
    {
      type: "p",
      text: "MCP doesn't change the cost model much. It's one way to do the integration work, and that work is still the expensive part. Getting your products recommended by ChatGPT or Gemini is a separate job with its own checklist, covered in our guide to [AI shopping assistants for online stores](/blog/chatgpt-shopping-for-online-stores).",
    },

    { type: "h2", text: "Which job should your first AI agent take on?" },
    {
      type: "p",
      text: "Pick [the one job that eats the most staff hours](/blog/ai-automation-for-small-business) and has a clear right answer. If a tool you already pay for can do it, switch it on and measure it for a month. If not, a read-only custom pilot is the cheapest way to find out whether an agent is worth building. The model fees will be the smallest number on the invoice.",
    },
    {
      type: "p",
      text: `Our [AI automation and agents for small businesses](/services/ai-automation) work follows the same order: find the job with the clearest payback, prototype it on your real data, and keep a person in the loop until the numbers say otherwise. If you have a job in mind, [book a 30-minute call](${site.bookingUrl}) and bring a week of examples.`,
    },
  ],
  takeaways: [
    "An AI agent's cost splits into setup or build, monthly running costs, and upkeep after launch.",
    "Model fees are usually the smallest line: about $5 to $216 a month for 3,000 conversations in our worked example, at prices listed on October 15, 2026.",
    "Integrations, and how much the agent may do without approval, drive build cost far more than the choice of model.",
    "Off-the-shelf tools win when they already cover your channel; per-outcome pricing only gets expensive at volume.",
    "Arrowbin's published starting point for a focused first custom automation is around $10,000–$15,000 including a year of running costs.",
    "Model prices change on published dates, so recheck them and keep an evaluation set ready for every switch.",
    "Start with one read-only workflow, measure it for a month on real traffic, then widen.",
  ],
  faqs: [
    {
      question:
        "What is the cheapest way for a small business to try an AI agent?",
      answer:
        "Switch on the AI agent inside a tool you already use, such as your helpdesk's website chat, and point it at your existing help content. Measure it for a month before paying for custom work. If it handles your common questions well, you may never need more.",
    },
    {
      question: "Are AI model fees the biggest cost of running an agent?",
      answer:
        "Usually not at small-business volumes. In our worked example of 3,000 conversations a month, model fees ranged from about $5 to about $216 a month depending on the model. The build and the upkeep tend to cost far more.",
    },
    {
      question: "Can an AI agent take payments or issue refunds?",
      answer:
        "It can be connected to do both, but we don't recommend letting it act alone on money. Keep a person approving anything that moves money or commits you legally, and let the agent prepare the case so approval takes seconds.",
    },
    {
      question: "Will an AI agent replace my staff?",
      answer:
        "For most small businesses it takes repetitive questions and data entry off people's plates. Someone still has to handle exceptions, check its work and keep its knowledge current, so plan for changed roles rather than an empty desk.",
    },
    {
      question: "Is customer data safe with an AI agent?",
      answer:
        "It depends on the provider's data terms and how the agent is built. Check where conversation data is stored, whether the provider uses it for training, how long logs are kept and who on your team can read them. Get those answers in writing before launch.",
    },
    {
      question: "How quickly can a custom AI agent go live?",
      answer:
        "It depends on integrations and how much the agent may do on its own. Arrowbin's published estimate is 2–3 weeks for a working prototype on your real data, then another 3–6 weeks to take it into production with integrations, security and monitoring.",
    },
    {
      question: "Which AI model should a small business pick for an agent?",
      answer:
        "Start with the smallest model that passes your evaluation set, because it's the cheapest to run and usually the fastest. Move a specific step to a larger model only where the small one keeps failing, and recheck prices before you commit.",
    },
    {
      question: "Do AI model prices go up or down over time?",
      answer:
        "Both happen. Google's pricing page lists Gemini 3.6 Flash prices doubling on January 1, 2027, while Anthropic's page says Claude Sonnet 5 kept its $2 / $10 introductory price instead of rising as first scheduled. Date any price you rely on and check it again before signing a contract.",
    },
  ],
};
