import type { Post } from "@/lib/blog";

const DIR = "/blog/mvp-vs-prototype-vs-poc";

export const post: Post = {
  slug: "mvp-vs-prototype-vs-poc",
  title: "MVP vs Prototype vs POC: Which Should You Build First?",
  description:
    "MVP vs prototype vs POC: what each one proves, how long each takes, what each can't tell you, and a simple path for deciding which to build first.",
  keywords: [
    "mvp vs prototype vs poc",
    "proof of concept vs prototype",
    "prototype vs mvp",
    "poc vs mvp",
    "difference between prototype and mvp",
    "what comes first poc or prototype",
    "proof of concept vs prototype vs mvp",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "11 min read",
  category: "Product",
  excerpt:
    "A proof of concept, a prototype and an MVP each answer a different question. This guide compares them side by side and shows how to pick the one your idea needs first.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of three product stages side by side: a proof-of-concept test script with passing checks, a clickable phone prototype with tap hotspots, and a live MVP web app with its first paid sign-ups",
    width: 1280,
    height: 720,
  },
  tldr: "A proof of concept (POC) tests whether something can be built, a prototype tests whether people understand it and can use it, and an MVP tests whether they'll use it for real and pay. Build first whichever one tests the assumption most likely to sink you: technical risk calls for a POC, usability risk for a prototype, demand risk for an MVP. Most web and SaaS ideas can skip the POC and go from a clickable prototype (days to 2 weeks) to an MVP (6–14 weeks), by Arrowbin's estimates.",
  body: [
    {
      type: "p",
      text: "Founders use these three words as if they meant the same thing, and plenty of agencies do too. They don't. A proof of concept, a prototype and an MVP each answer a different question and take a different amount of time. Pick the wrong one and you can spend three months answering a question nobody was asking.",
    },
    {
      type: "p",
      text: "This guide is for founders and product owners deciding where their first money goes. We build MVPs and SaaS products at Arrowbin, and the first thing we ask about any new idea is which assumption would kill it if it turned out to be wrong. That question decides which of the three you need.",
    },

    {
      type: "h2",
      text: "What's the difference between a POC, a prototype and an MVP?",
    },
    {
      type: "p",
      text: "A proof of concept (POC) tests whether something can be built. A prototype tests whether people understand it and can use it. A minimum viable product (MVP) tests whether people will use it for real and pay for it.",
    },
    {
      type: "p",
      text: "The quickest way to keep them apart is to ask who sees each one. Only your team sees a POC. A handful of test users see a prototype, and they know it's a test. Real customers use an MVP, and they don't care that it's version one.",
    },
    {
      type: "table",
      headers: ["Criterion", "Proof of concept (POC)", "Prototype", "MVP"],
      rows: [
        [
          "Purpose",
          "Check that one risky technical piece works",
          "Show how it will look and flow, and watch people use it",
          "Put a working first version in real customers' hands",
        ],
        [
          "Question it answers",
          "Can we build it?",
          "Will people understand it and want to use it?",
          "Will people use it for real, come back and pay?",
        ],
        [
          "Who it's for",
          "Your own team, or an investor's technical reviewer",
          "Five or so test users, plus stakeholders and investors",
          "Real customers in your target market",
        ],
        [
          "Fidelity",
          "Rough code with no real interface",
          "Sketches to clickable mockups, with nothing working behind them",
          "Production code for one core workflow, with real accounts, data and payments",
        ],
        [
          "Typical time",
          "Days to a few weeks, sized to one question (our view)",
          "Days to 2 weeks (Arrowbin estimate)",
          "6–14 weeks; complex SaaS 14–20 (Arrowbin estimate)",
        ],
        [
          "Typical cost",
          "Engineer time for the length of the test; we don't publish a range",
          "Design time plus a few test sessions; we don't publish a separate range",
          "$5,000–$30,000 lean, $40,000–$120,000 polished (Arrowbin estimate)",
        ],
        [
          "What you can learn",
          "Whether the hard part works, and what it costs to run",
          "Where people get stuck, what they expect to see, which flow to build",
          "Whether people sign up and return, whether they pay, and what they ask for next",
        ],
        [
          "What it can't tell you",
          "Whether anyone wants the product",
          "Whether people will pay, or whether the product can be built",
          "Whether it will scale, or what the full product should become",
        ],
        [
          "What happens to it afterwards",
          "Usually thrown away; the findings are kept",
          "Becomes the design reference for the build",
          "Becomes version one, and you keep building on it",
        ],
        [
          "Next step",
          "A prototype or an MVP, or stop if it failed",
          "An MVP, or another round of design and testing",
          "Iterate on what users do, or change direction",
        ],
      ],
    },
    {
      type: "p",
      text: "Most comparisons of the three leave out two of those rows, and they're the most useful ones. 'What it can't tell you' stops you reading too much into a good result. 'What happens to it afterwards' stops POC code from quietly becoming your product.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/reality-vs-audience.svg`,
        alt: "Map of POC vs prototype vs MVP by how real the build is and who sees it: a POC is real code seen only by your team, a prototype looks real but is shown to test users, an MVP is real code used by paying customers, and an AI-built app sits between a prototype and an MVP",
        caption:
          "Two questions separate the three: how real is it, and who uses it? Original Arrowbin diagram.",
        width: 1280,
        height: 720,
      },
    },

    {
      type: "h2",
      text: "What is a proof of concept, and when do you need one?",
    },
    {
      type: "p",
      text: "A proof of concept is a small, usually throwaway piece of work that checks whether one risky technical part of your idea works. You need one when there's a real chance the hard part can't be done, or can't be done at a price that makes sense.",
    },
    {
      type: "p",
      text: "The term comes from engineering. NASA's [technology readiness levels](https://www.nasa.gov/directorates/somd/space-communications-navigation-program/technology-readiness-levels/) put the proof-of-concept model at level 3 of 9, well before anything the scale calls a prototype. Software uses it the same way: prove the core mechanism on its own, with no interface and no users.",
    },
    {
      type: "p",
      text: "Say you want a tool that reads supplier invoices and fills in your accounting system. The risky part isn't the dashboard. It's whether extraction is accurate enough on your suppliers' real PDFs. A POC runs a couple of hundred of those files through the extraction step and counts how many come out right. That's the whole job. Other good POC candidates:",
    },
    {
      type: "ul",
      items: [
        "An AI feature where accuracy or the cost per request could break the business case.",
        "An integration with an API that's badly documented, heavily rate-limited or only partly public.",
        "A hard performance target, such as matching thousands of records in under a second.",
        "A device or sensor the software has to talk to.",
      ],
    },
    {
      type: "p",
      text: "Write the pass mark before you start. 'At least 95% of invoices extracted correctly, at a cost per invoice we can live with' is a POC. 'Let's see if it works' is a hobby.",
    },
    {
      type: "p",
      text: "A passing POC tells you it can be built. It says nothing about whether anyone wants it. Gartner predicted in 2024 that at least 30% of generative AI projects would be [abandoned after proof of concept](https://www.intelligentcio.com/eu/2024/08/05/gartner-predicts-30-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025/) by the end of 2025. The reasons it gave were poor data quality, weak risk controls, rising costs and unclear business value. Only some of those are about whether the technology worked.",
    },
    {
      type: "p",
      text: "Most web and SaaS products don't need a POC at all. Accounts, dashboards, payments and email are solved problems. If your idea is a better workflow built from standard parts, your risk is demand or usability, and a POC would spend weeks proving that Postgres works.",
    },

    {
      type: "h2",
      text: "What is a prototype, and what can it tell you?",
    },
    {
      type: "p",
      text: "A prototype is a model of the product that people can look at or click through, built to test whether they understand it and can use it. It usually has nothing real behind the screens: no database, no payment logic.",
    },
    {
      type: "p",
      text: "Nielsen Norman Group describes a prototype as [a hypothesis](https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/), a candidate design you test by watching people use it. Fidelity runs from paper sketches, where a person plays 'the computer', to clickable mockups that often look like live software to the people testing them. Low fidelity is quicker to change in the middle of a test. High fidelity lets you test whole workflows.",
    },
    {
      type: "p",
      text: "It doesn't take long. GV's design sprint builds its prototype in a single day, on the reasoning that '[a realistic façade](https://www.gv.com/sprint/) is all you need to test with customers'. Our own figure for a clickable prototype is days to 2 weeks.",
    },
    {
      type: "p",
      text: "It doesn't take many people either. Jakob Nielsen's [five-user rule](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/) says the first five test users uncover about 85% of the usability problems, and that three rounds of five, with fixes in between, beat one round of fifteen. His model assumes your users are fairly alike. If you sell to two very different groups, test each group.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/usability-problems-by-test-users.svg`,
        alt: "Line chart of usability problems found by number of prototype test users, from Jakob Nielsen's model: one user finds about 31%, five users about 85%, and it takes about 15 users to find nearly all of them",
        caption:
          "Most of what a prototype test can teach you arrives with the first five users. Source: Jakob Nielsen, Nielsen Norman Group (2000), model with L = 31%.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "What a prototype can't tell you is whether anyone will pay. People are polite in test sessions. They'll say they love it, and some will mean it, but clicking through a mockup costs them nothing. You only learn about money when you ask for it.",
    },
    {
      type: "p",
      text: "One warning about the word itself. In engineering, a prototype is often a working model, and NASA's scale only reaches 'a fully functional prototype' at level 6. In software design it usually means a clickable mockup. If a vendor quotes for a prototype, ask which kind they mean before you compare prices.",
    },
    {
      type: "p",
      text: "Prototyping is design work, and it's where our [UI/UX design and prototyping](/services/ui-ux-design) work starts. It's also the cheapest place to change your mind. The NN/g article puts it plainly: 'Ripping up code is very expensive.'",
    },
    {
      type: "cta",
      title: "Not sure which risk is biggest?",
      text: "Tell us the idea and the one assumption you're least sure about. We'll say whether it needs a POC, a prototype or an MVP first, and what that first step should prove.",
      href: "/contact",
      label: "Ask which one to build first",
    },

    {
      type: "h2",
      text: "What is an MVP, and why isn't it just a smaller product?",
    },
    {
      type: "p",
      text: "An MVP is the first version of your product that real customers can use for real. It's built around one core workflow so you can learn whether people adopt it and pay. It's working software, and a demo doesn't count.",
    },
    {
      type: "p",
      text: "Eric Ries, who popularized the term, defined it in 2009 as the version of a new product that lets a team 'collect the [maximum amount of validated learning](https://www.startuplessonslearned.com/2009/08/minimum-viable-product-guide.html) about customers with the least effort'. In the same post he wrote: 'MVP, despite the name, is not about creating minimal products.' The goal is learning. Small is how you get there quickly.",
    },
    {
      type: "p",
      text: "That's why an MVP needs the dull parts a prototype skips. Sign-up has to work, data has to persist, payments have to go through, and someone has to see the errors. Without those you aren't learning how customers behave. You're watching them hit bugs.",
    },
    {
      type: "p",
      text: "Demand is the risk that sinks a lot of products. In CB Insights' [analysis of why startups fail](https://www.cbinsights.com/research/report/startup-failure-reasons-top/) (March 2026), poor product-market fit came up in 43% of the VC-backed shutdowns where a cause could be identified. Running out of money topped the list at 70%, but the report calls that 'almost always the final cause of death, not the root problem'. An MVP exists to find out about demand before the money runs out.",
    },
    {
      type: "p",
      text: "By our estimates most MVPs take 6 to 14 weeks to build. A polished MVP for most businesses costs $40,000 to $120,000, and a lean single-workflow one $5,000 to $30,000. Our [week-by-week MVP timeline](/blog/how-long-does-it-take-to-build-an-mvp) and the breakdown of [what an MVP costs and why](/blog/mvp-development-cost) go through both, so I won't repeat them here.",
    },
    {
      type: "p",
      text: "What an MVP can't tell you is whether the architecture holds at a hundred times the users, or what the full product should look like in two years. It tells you what to build next.",
    },

    {
      type: "h2",
      text: "Which should you build first?",
    },
    {
      type: "p",
      text: "Build first whichever one tests the assumption most likely to kill the idea. Technical risk calls for a POC, usability risk for a prototype, and demand risk for an MVP or an even cheaper demand test.",
    },
    {
      type: "p",
      text: "List your assumptions and ask of each one: if this is false, is the idea dead? Then go through them in this order:",
    },
    {
      type: "ol",
      items: [
        "Could the hard part be impossible, or too expensive to run? Build a POC first, and don't design screens until it passes.",
        "Is the core interaction new, complicated or easy to get wrong? Prototype it and test it with five people before anyone writes production code.",
        "Do you have evidence people will pay, such as pre-orders or customers already paying for a worse fix? If not, the MVP is your test, so scope it around one workflow.",
        "If you already have that evidence, you're past the MVP question. Plan the product properly.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/which-to-build-first.svg`,
        alt: "Decision tree for MVP vs prototype vs POC: if the hard part might not work, build a proof of concept; if the core flow is new or easy to get wrong, build a prototype; if demand is unproven, build an MVP; if you already have proof people pay, plan the full product",
        caption:
          "Start with the assumption that would sink the idea. Original Arrowbin diagram.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "In practice, most ideas skip at least one step. Say you're building a booking tool for physiotherapy clinics. There are no technical unknowns, so it goes prototype, then MVP. A product built on a speech-to-text model might need a POC on accuracy with strong regional accents before anyone draws a screen. Few ideas need all three in a row.",
    },
    {
      type: "p",
      text: "The mistake I'd warn against hardest is building an MVP to answer a technical question. If the core mechanism fails in week nine, you've paid for eight weeks of sign-up screens around something that doesn't work.",
    },

    {
      type: "h2",
      text: "How long does each one take compared with the others?",
    },
    {
      type: "p",
      text: "A clickable prototype takes days to 2 weeks and a well-scoped MVP takes 6 to 14 weeks, by our estimates. A POC should be sized to its one question. In our view that's usually days to a few weeks, and if it runs longer, the question is too big.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/time-to-build-compared.svg`,
        alt: "Range chart comparing time to build on one week scale: a clickable prototype takes days to 2 weeks, a proof of concept days to about 4 weeks, and an MVP 6 to 14 weeks, or up to 20 weeks for a complex SaaS MVP",
        caption:
          "Time to build, on one scale. Prototype and MVP ranges are Arrowbin estimates; the POC range is our view.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The gap matters more than the exact figures. Even against the top of our prototype range, 2 weeks, an MVP takes three to seven times as long, and it keeps a bigger team busy the whole time.",
    },
    {
      type: "p",
      text: "Cost follows people times weeks, for all three:",
    },
    {
      type: "ul",
      items: [
        "POC: one or two engineers who know the specific technology, for the length of the test.",
        "Prototype: a product designer, plus a few hours of your time to recruit testers and sit in on sessions.",
        "MVP: a full team covering discovery, design, development, QA and project management for 6 to 14 weeks.",
      ],
    },
    {
      type: "p",
      text: "We don't publish price ranges for a POC or a prototype, because their size depends on the question. Planning a subscription product? Our [SaaS product engineering](/services/saas-product-engineering) page shows how we take one from first version to scale.",
    },

    {
      type: "h2",
      text: "Is an AI-built app a prototype or an MVP?",
    },
    {
      type: "p",
      text: "An app built with Lovable, Bolt, v0 or a similar tool is usually a high-fidelity prototype that happens to run. It becomes an MVP when strangers can sign up, pay and trust it with their data, and getting there takes an engineering review.",
    },
    {
      type: "p",
      text: "For prototype testing, these tools are a gift. Test users click through real flows on a real database instead of a façade.",
    },
    {
      type: "p",
      text: "The trap is that it looks finished. The happy path works while you watch, so it feels like an MVP. The parts that make software safe for strangers are the parts nobody prompted for: who can read which rows, where the secret keys live, whether a payment is processed exactly once. Our [production checklist for AI-built apps](/blog/vibe-coded-app-production-ready) shows how to check yours.",
    },
    {
      type: "p",
      text: "My rule is simple. Use the AI-built version freely as your prototype. Before it takes money or personal data, harden it first and add features after.",
    },

    {
      type: "h2",
      text: "What should each stage hand over to the next?",
    },
    {
      type: "p",
      text: "Each stage should end with a decision and a short written record. A POC hands over a yes or no with numbers, a prototype hands over tested flows and design files, and an MVP hands over usage data and a list of what to build next.",
    },
    {
      type: "p",
      text: "Agree the exit criteria in writing before you start. Otherwise each stage drifts into the next one and nobody ever decides anything.",
    },
    {
      type: "ul",
      items: [
        "POC exit: the pass mark you set was met or missed. Keep the findings, the test data and notes on what was hard. Throw the code away, or keep it only as a reference.",
        "Prototype exit: most testers finished the core tasks without help, and the problems they hit are fixed or written down. The design files go to whoever builds the MVP.",
        "MVP exit: you've hit or clearly missed a usage target agreed in advance, such as weekly active accounts or paid conversions.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/stage-handover.svg`,
        alt: "Pipeline diagram of what passes from a proof of concept to a prototype to an MVP: the POC hands over a yes or no with numbers while its code is usually discarded, the prototype hands over tested flows and design files, and the MVP hands over usage data and a list of what to build next",
        caption:
          "Keep the findings, not the scaffolding. Original Arrowbin diagram.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "The usual failures, all avoidable:",
    },
    {
      type: "ul",
      items: [
        "POC code shipped as the product. It was written fast to answer one question, with no tests and no security. Rebuild that piece properly in the MVP.",
        "A prototype polished for months. After two or three rounds of testing, more polish rarely changes what you'd build.",
        "An MVP with every feature on the list. Each one adds build weeks and blurs the result, because you can't tell which feature people came for.",
      ],
    },

    {
      type: "h2",
      text: "What's the cheapest test you can run this month?",
    },
    {
      type: "p",
      text: "Write down the one assumption that would sink your idea, then pick the cheapest build that tests it. A technical unknown gets a POC and a confusing flow gets a prototype. A demand question gets an MVP, or something smaller still, like a landing page that takes pre-orders. For a typical web or SaaS idea, that means a quick prototype followed by a tight MVP.",
    },
    {
      type: "p",
      text: "If you'd like a second opinion on which risk is biggest, [send us a short brief](/contact) with the idea and the assumption you're least sure of. We'll tell you which of the three to start with, and we'll say so when the answer is a test you can run without us.",
    },
  ],
  takeaways: [
    "A proof of concept tests whether something can be built, a prototype tests whether people can use it, and an MVP tests whether they'll use it for real and pay.",
    "Build first whichever one tests the assumption most likely to kill the idea.",
    "Most web and SaaS products can skip the POC, because accounts, payments and dashboards are solved problems.",
    "By Arrowbin's estimates a clickable prototype takes days to 2 weeks and an MVP 6 to 14 weeks.",
    "Five test users find about 85% of a prototype's usability problems, according to Jakob Nielsen's model.",
    "POC code is written to answer one question and should rarely reach customers.",
    "An AI-built app is a high-fidelity prototype until it has been hardened for real users, payments and personal data.",
  ],
  faqs: [
    {
      question: "Can a prototype be used as an MVP?",
      answer:
        "Only if it really works end to end and is safe for real users and money. A clickable mockup can't be, because nothing works behind the screens. An AI-built app can get there, but only after someone reviews its data access, secrets and payment handling.",
    },
    {
      question: "Is a pilot the same as an MVP?",
      answer:
        "No. A pilot is usually a limited rollout of a finished or nearly finished product to one customer, team or site, and it's common in B2B sales. An MVP is the first version you put in front of the market to learn whether it's wanted at all. A pilot tests fit in one setting; an MVP tests demand.",
    },
    {
      question: "Should you show investors a POC, a prototype or an MVP?",
      answer:
        "Show whatever answers their biggest doubt. For a deep-tech idea that's evidence the hard part works, which a POC gives you. For most software ideas the doubt is demand, so a tested prototype or a live MVP with usage numbers carries more weight than slides.",
    },
    {
      question: "Is proof of concept code thrown away?",
      answer:
        "Usually, and it should be. POC code is written quickly to answer one question, without tests, security or a structure meant to last. Keep the findings and notes, then build that piece properly in the MVP.",
    },
    {
      question: "Can you skip the prototype and go straight to an MVP?",
      answer:
        "Yes, when the flow uses patterns people already know, such as sign-up, a dashboard or a checkout. Skip it at your own risk when the core interaction is new. A prototype takes days, while reworking a built flow takes weeks of development.",
    },
    {
      question: "What's the difference between a wireframe and a prototype?",
      answer:
        "A wireframe is a static layout that shows what goes where on a screen. A prototype adds interaction, so people can click or tap through a flow and you can watch where they get stuck. Wireframes usually come first and feed into the prototype.",
    },
    {
      question: "How do you know an MVP is small enough?",
      answer:
        "Take each feature and ask whether the MVP could still test your core assumption without it. If it could, cut it or fake it by hand for now. What's left should be one workflow that works properly from start to finish.",
    },
  ],
};
