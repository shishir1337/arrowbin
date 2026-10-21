import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/offshore-vs-nearshore-vs-onshore";

export const post: Post = {
  slug: "offshore-vs-nearshore-vs-onshore",
  title: "Offshore vs Nearshore vs Onshore Software Development",
  description:
    "Offshore vs nearshore vs onshore software development: real overlap hours for 10 team cities, sourced pay data and IP risks, plus how to choose.",
  keywords: [
    "offshore vs nearshore vs onshore software development",
    "nearshore vs offshore",
    "onshore vs offshore software development",
    "offshore software development pros and cons",
    "offshore development time zone overlap",
    "how to manage an offshore development team",
    "hybrid onshore offshore model",
  ],
  date: "2026-10-22",
  dateLabel: "October 22, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "15 min read",
  category: "Guides",
  excerpt:
    "Onshore, nearshore or offshore? A plain comparison for founders choosing where their development team works, with overlap hours for 10 team cities, sourced pay data and a contract checklist.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a video call app with world clocks for four cities from New York to Bengaluru, four participant tiles and a panel showing today's shared working hours across time zones",
    width: 1280,
    height: 720,
  },
  tldr: "Choose onshore if you need live decisions with your developers most days or must keep the work in-country, nearshore if you want most of a working day in common at a lower cost, and offshore if the work can be written down and price matters most. With a 9-to-5 day on both sides, a New York client shares 6 to 7 hours with Mexico City, Bogotá or São Paulo, 1 to 3 hours with Lisbon, Warsaw or Kyiv, and none with Bengaluru or Manila. Senior offshore developers earn roughly a quarter to two-fifths of senior US pay in our salary data, but management time and slower feedback eat into that saving.",
  body: [
    {
      type: "p",
      text: "Pick onshore if your project needs live decisions with the team most days, in-person work or in-country data rules, and the budget can carry local pay. Pick nearshore if you want most of the working day in common at a lower price. Pick offshore if you can write down what you want, review it weekly and live with a few hours of overlap or none, because that's where the price gap is widest.",
    },
    {
      type: "p",
      text: "This guide is for founders and business owners deciding where their development team should sit, mostly in the US but also in the UK and Australia. Most pages on this question come from vendors who recommend their own region without saying so. Full disclosure, then: Arrowbin's own engineering team is offshore, in Bangladesh, so weigh my view with that in mind.",
    },
    {
      type: "p",
      text: "I've tried to make this useful whichever way you go. You'll find the working hours you'd really share with ten common team cities, computed from today's clocks, plus pay figures from our own published data and the cases where offshore is the wrong call.",
    },

    {
      type: "h2",
      text: "Offshore, nearshore or onshore: which should you choose?",
    },
    {
      type: "p",
      text: "Choose by how many working hours you need to share with the team, then by budget. Onshore gives you the most overlap at the highest price, nearshore keeps most of the workday in common for less, and offshore costs the least but asks you to run the project in writing.",
    },
    { type: "h3", text: "What counts as nearshore or offshore?" },
    {
      type: "p",
      text: "Onshore means your developers work in your own country. Nearshore means a nearby country whose clock is within about three hours of yours; for a US company that's usually Mexico, Colombia, Brazil or Argentina. Offshore means five or more hours apart, which for US clients means Eastern Europe or South and Southeast Asia.",
    },
    {
      type: "p",
      text: "The labels move with you. For a London company, Portugal is nearshore and India is offshore. For a Sydney company, Manila shares more working hours than London does. Hours of overlap matter more than air miles, which is why this post measures distance in hours.",
    },
    {
      type: "table",
      headers: [
        "Criterion",
        "Onshore (same country)",
        "Nearshore (0–3 hours apart)",
        "Offshore (5+ hours apart)",
      ],
      rows: [
        [
          "Cost",
          "Highest; US median developer pay is $155,000 a year",
          "Lower; Latin American medians are roughly a quarter of the US figure",
          "Lowest in South Asia; Eastern Europe overlaps with Latin America",
        ],
        [
          "Working-hours overlap (New York, 9-to-5)",
          "Full day; 5 hours coast to coast",
          "6–8 hours with Mexico City, Bogotá or São Paulo",
          "1–4 hours with Europe; none with South or Southeast Asia",
        ],
        [
          "Communication",
          "Same language and habits; easy to meet",
          "Live calls inside your day; English varies by person",
          "Mostly written; the team's writing decides everything",
        ],
        [
          "Legal and IP",
          "Your own law and courts",
          "Foreign contract; needs an IP assignment and a dispute clause",
          "Same paperwork as nearshore; distance doesn't change it",
        ],
        [
          "Talent pool",
          "Large, but you compete with big-tech pay",
          "Mid-sized hubs; easy to visit",
          "Largest; India is set to pass the US in GitHub developers",
        ],
        [
          "Management overhead",
          "Lowest",
          "Low to moderate",
          "Highest; you write specs and review handoffs",
        ],
        [
          "Main risk",
          "Budget runs out before the product is done",
          "Picking a team on rate instead of skill",
          "Rework and slow feedback on unclear work",
        ],
        [
          "Best for",
          "Regulated work, daily product decisions, in-person needs",
          "Products that change weekly and need live calls",
          "Well-specified builds, maintenance, tight budgets",
        ],
      ],
    },
    {
      type: "p",
      text: "Two rows settle most cases: overlap and management overhead. Cost is why people look abroad. Overlap is usually why the project either flows or stalls once they do.",
    },
    {
      type: "p",
      text: "Talent is rarely the deciding row any more. GitHub's [Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) counts more than 180 million developers on the platform and says India, which added over 5 million in a single year, is poised to overtake the US developer population within a few years. Good engineers exist in every region on this list. Finding the right team is the hard part.",
    },

    {
      type: "h2",
      text: "How much cheaper are nearshore and offshore developers?",
    },
    {
      type: "p",
      text: "On pay alone, a lot. In our [developer salary data](/blog/developer-salaries-by-country), the median US developer earns $155,000 a year, against $32,767 in Brazil, $35,821 in Mexico, $40,487 in Colombia, $55,040 in Poland and $19,761 in India.",
    },
    {
      type: "p",
      text: "Those medians mix juniors with seniors, and you'll want seniors. With 10 or more years of experience, the US median is $171,000. Indian developers at that level earn $40,684, Brazilian ones $42,573 and Polish ones $69,093. So an experienced offshore developer earns roughly a quarter to two-fifths of an experienced American's pay. Not a tenth.",
    },
    {
      type: "p",
      text: "Pay isn't price. A vendor's rate adds employer costs and overheads to salary, then a margin, and the salary post shows the formula. Our cost guide's section on [how location and seniority change a project budget](/blog/how-much-does-custom-software-development-cost) gives blended rates by region, so I won't repeat them here.",
    },
    {
      type: "p",
      text: "Here's a quick sanity check I use. Divide the onshore rate by the offshore one. The answer is how many times more hours the offshore team could spend before it costs you more. At 40% of the rate, that's 2.5 times the hours, and no reasonable team needs that.",
    },
    {
      type: "p",
      text: "So the rate saving usually survives some rework. What the invoice doesn't count is your own time and the calendar weeks. Those are where offshore savings leak, and the next two sections measure them.",
    },

    {
      type: "h2",
      text: "How many working hours will you share with an offshore or nearshore team?",
    },
    {
      type: "p",
      text: "With a 9-to-5 day on both sides, a New York client shares 6 to 7 hours with Mexico City, Bogotá or São Paulo, 1 to 3 hours with Lisbon, Warsaw, Bucharest or Kyiv, and none with Bengaluru, Dhaka, Ho Chi Minh City or Manila. From San Francisco, only Latin America overlaps for most of the year.",
    },
    {
      type: "p",
      text: "These are our own calculations for October 22, 2026. We took each city's current UTC offset from time.is (for example [New York](https://time.is/New_York) at UTC-4 and [Warsaw](https://time.is/Warsaw) at UTC+2) and assumed both sides work 9:00 to 17:00 local time on weekdays, lunch included.",
    },
    {
      type: "table",
      headers: [
        "Team city",
        "UTC offset on Oct 22, 2026",
        "Shared hours with New York",
        "Shared hours with San Francisco",
        "Their clock at 9am in New York (Oct 22)",
      ],
      rows: [
        ["Mexico City", "UTC-6 (no DST)", "6", "7", "7am"],
        ["Bogotá", "UTC-5 (no DST)", "7", "6", "8am"],
        ["São Paulo", "UTC-3 (no DST)", "7", "4", "10am"],
        ["Lisbon", "UTC+1 (summer time)", "3", "0", "2pm"],
        ["Warsaw", "UTC+2 (summer time)", "2", "0", "3pm"],
        ["Bucharest or Kyiv", "UTC+3 (summer time)", "1", "0", "4pm"],
        ["Bengaluru", "UTC+5:30", "0", "0", "6:30pm"],
        ["Dhaka", "UTC+6", "0", "0", "7pm"],
        ["Ho Chi Minh City", "UTC+7", "0", "0", "8pm"],
        ["Manila", "UTC+8", "0", "0", "9pm"],
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/overlap-new-york.svg`,
        alt: "Timeline chart placing ten team cities' 9-to-5 workdays on a New York clock on October 22, 2026: the Latin American cities share 6 to 7 hours with New York, the European cities 1 to 3, and the South and Southeast Asian cities none",
        caption:
          "Each team's 9-to-5 on a New York clock, October 22, 2026. Offsets from time.is; Arrowbin calculation.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Zero overlap doesn't mean zero contact. It means someone works outside 9-to-5. For a two-hour daily call during New York's 9 to 11am, a team in Bengaluru works until 8:30pm, Dhaka until 9pm, Ho Chi Minh City until 10pm and Manila until 11pm.",
    },
    {
      type: "p",
      text: "West Coast clients get a better deal with Southeast Asia. San Francisco's 3 to 5pm is 6 to 8am in Manila while the US is on daylight saving time, and 7 to 9am in the US winter. An early start in Manila is far easier to sustain than a late night in Dhaka.",
    },
    { type: "h3", text: "How does daylight saving time change the overlap?" },
    {
      type: "p",
      text: "The US and Europe change their clocks on different Sundays, and most nearshore and offshore hubs don't change them at all. So your overlap moves during the year:",
    },
    {
      type: "ul",
      items: [
        "Europe goes back an hour on October 25, 2026, a week before the US does on November 1. [NIST](https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst) gives the US rule (second Sunday of March to first Sunday of November) and the [European Commission](https://transport.ec.europa.eu/transport-themes/summertime_en) gives the EU's (last Sunday of March to last Sunday of October).",
        "In those gap weeks, from October 25 to November 1 this year and from March 14 to 28 in 2027 (by the same rules), every European city in the table gains an hour with New York.",
        "The three Latin American cities don't use daylight saving time, so US clocks move around them. From November 1, Bogotá matches New York hour for hour (8 shared hours), Mexico City rises to 7 and São Paulo drops to 6. From San Francisco, all three lose an hour.",
        "South and Southeast Asia don't change either, so in the US winter every evening call lands an hour later for the team: 9am in New York becomes 8pm in Dhaka instead of 7pm.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/overlap-by-season.svg`,
        alt: "Heatmap of shared 9-to-5 hours for New York and San Francisco clients in summer, in the daylight saving gap weeks and in winter: Bogotá reaches 8 hours with New York in winter, European cities gain an hour during the gap weeks, and the Asian cities stay at zero all year",
        caption:
          "Shared hours by season, 2026–27. Offsets from time.is; DST rules from NIST and the European Commission. Arrowbin calculation.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Any page that gives one fixed time difference for a country is right for only part of the year. Put the overlap hours in the contract as local times on your side, and check them again in late October and mid-March.",
    },
    { type: "h3", text: "What about clients in the UK or Australia?" },
    {
      type: "p",
      text: "The same math gives UK and Australian companies a different map. London is on UTC+1 until October 25 and Sydney is on UTC+11 until April 4, 2027, according to time.is for [London](https://time.is/London) and [Sydney](https://time.is/Sydney).",
    },
    {
      type: "table",
      headers: [
        "Team city (9-to-5 overlap)",
        "London, summer (BST)",
        "London, winter (GMT)",
        "Sydney, Oct to Apr (AEDT)",
        "Sydney, Apr to Oct (AEST)",
      ],
      rows: [
        ["Lisbon", "8", "8", "0", "0"],
        ["Warsaw", "7", "7", "0", "0"],
        ["Bucharest or Kyiv", "6", "6", "0", "1"],
        ["São Paulo", "4", "5", "0", "0"],
        ["Bengaluru", "3.5", "2.5", "2.5", "3.5"],
        ["Dhaka", "3", "2", "3", "4"],
        ["Ho Chi Minh City", "2", "1", "4", "5"],
        ["Manila", "1", "0", "5", "6"],
      ],
    },
    {
      type: "p",
      text: "For a UK company, Portugal or Poland gives close to a full shared day, Romania only slightly less, and South Asia a workable morning. Australian companies can treat the Philippines and Vietnam as nearshore in all but name.",
    },
    {
      type: "cta",
      title: "Weighing a team in another time zone?",
      text: "Tell us where you are and where the team you're considering works. We'll tell you how much of your day you'd share, how the project should run because of it, and whether a closer team would suit you better.",
      href: "/contact",
      label: "Ask about your setup",
    },

    {
      type: "h2",
      text: "What are the hidden costs of offshore development?",
    },
    {
      type: "p",
      text: "The hidden costs are your own time and the calendar. You spend more hours writing specs and checking work, rework grows when something is misunderstood, and every question that can't be answered live waits for the other side to wake up. None of it shows on the vendor's invoice.",
    },
    {
      type: "p",
      text: "Researchers who followed six software projects a German financial firm sent to India found the client paid extra after signing in four areas: specifying requirements, transferring knowledge, controlling the vendor's work and coordinating ([MIS Quarterly, 2008](https://aisel.aisnet.org/misq/vol32/iss2/9/)). Those costs were substantially higher on projects that needed deep knowledge of the client's own business. Staff turnover pushed them up too.",
    },
    {
      type: "p",
      text: "Time-zone distance also cuts live conversation. A study of more than 12,000 employees at a Fortune 100 company used daylight saving changes as a natural experiment. One extra hour of distance cut synchronous communication by 11%, and that hour was 19% of the shared business day, as [Rice Business reports](https://news.rice.edu/news/2024/hidden-cost-working-across-time-zones) on the Organization Science paper.",
    },
    {
      type: "p",
      text: "People in collaborative, non-routine roles made up for it by moving calls outside their working day. Building software for a business that's still working out what it wants is exactly that kind of work. Here's where the time goes:",
    },
    {
      type: "ul",
      items: [
        "Your management time. Someone on your side writes up what's needed and accepts the work, and fields questions in between. In our experience that's a few hours a week on any outsourced build, and more with no overlap.",
        "Rework. With no overlap, a misunderstanding often surfaces a day later, after more work has been built on top of it.",
        "Feedback loops. Each question that can't be answered live adds about a working day, so two clarifications can turn an afternoon's fix into a three-day one.",
        "Knowledge loss. When a developer leaves, what they knew leaves too, unless it was written down.",
      ],
    },
    {
      type: "image",
      image: {
        src: `${DIR}/feedback-loop.svg`,
        alt: "Illustrative timeline of the same unclear requirement handled two ways: with four or more shared hours, the question and follow-up are settled and the change is visible within 2 hours; with no shared hours, the same exchange takes 42 hours, from Tuesday afternoon to Thursday morning",
        caption:
          "Illustrative: one question plus one follow-up, handled with shared hours and without (New York time).",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Vendors sometimes sell the time difference as a feature: the team works while you sleep. That's true for well-defined jobs, like testing a release overnight or fixing a bug you reported at close of business. For product work where the next step depends on your answer, it mostly means waiting overnight.",
    },

    {
      type: "h2",
      text: "Is communication or quality worse with an offshore team?",
    },
    {
      type: "p",
      text: "Not by default. Quality follows the people and the process, and English skill varies more between individuals than between regions. Distance does punish weak communication harder, because there's less live time to fix a misunderstanding.",
    },
    {
      type: "p",
      text: "EF's [2025 English Proficiency Index](https://www.ef.com/wwen/epi/) tests adults in general, not developers, across 123 countries. Portugal ranks 6th. Romania is 11th and Poland 15th, with the Philippines at 28th. Lower down sit India (74th), Brazil (75th) and Colombia (76th), while Mexico is 103rd.",
    },
    {
      type: "p",
      text: "So the nearshore option isn't automatically the easier one to talk to. Developers usually speak better English than their country's average, which makes the index a prompt to test rather than a verdict. The only test that counts is a call with the people who'll actually build your product.",
    },
    {
      type: "p",
      text: "Quality works the same way. Ask who will write the code, how senior they are, how they review each other's work and how they test it. Then read a sample of their written updates. With an offshore team, writing is the skill that matters most, because most of your conversation will happen in it.",
    },
    {
      type: "p",
      text: "Watch the seniority mix most of all. In our salary data, developers in India with up to four years' experience earn a median of $9,299, against $40,684 for those with 10 or more. The cheapest quotes tend to come from the first group.",
    },

    {
      type: "h2",
      text: "Who owns the code when your developers are in another country?",
    },
    {
      type: "p",
      text: "You own it only if the contract says so. Under US law, code written by an outside company isn't automatically yours, so the contract needs a signed assignment of the copyright and other IP to you, wherever the vendor sits.",
    },
    {
      type: "p",
      text: "The US Copyright Office's [Circular 30](https://www.copyright.gov/circs/circ30.pdf) explains that commissioned work counts as 'made for hire' only if it fits one of nine listed categories and both sides sign a written agreement saying so. Custom software usually doesn't fit any of the nine. That's why a development contract should include an explicit assignment of rights instead of relying on 'work for hire' wording.",
    },
    {
      type: "p",
      text: "If the vendor uses freelancers or subcontractors, the vendor has to hold their rights before it can pass them to you. Ask for that promise in writing. This is what I'd want in place before work starts:",
    },
    {
      type: "ul",
      items: [
        "An assignment of all IP in the work to your company, with the vendor confirming it holds the rights from its own staff and subcontractors.",
        "Code in a repository your company owns, with the vendor's people added as members you can remove.",
        "Cloud and domain accounts, plus app store and payment accounts, in your company's name, with billing you control.",
        "A confidentiality clause, and access to real customer data only for the people who need it.",
        "A dispute clause that names arbitration and a place. Court judgments don't always travel, while arbitral awards are recognized across the 172 parties to the [New York Convention](https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards/status2), and every country in this post, client side and team side, is a party.",
        "A handover clause: documentation and credentials on exit, with a notice period if either side ends the contract.",
      ],
    },
    {
      type: "p",
      text: "This isn't legal advice. Have a lawyer in your own country read the contract; it's a small cost next to the build. If you handle health, financial or government data, check where your rules allow that data to be processed before you pick a country. Sometimes onshore is the only option.",
    },

    {
      type: "h2",
      text: "How do you manage an offshore or nearshore team so it works?",
    },
    {
      type: "p",
      text: "Agree a fixed overlap window, run the project in writing, see working software every week, keep the code and accounts in your name, and start with a small paid milestone. Skip two of those and you'll usually feel it within a month.",
    },
    {
      type: "ol",
      items: [
        "Book the overlap. Agree 2 to 4 hours a day in writing, with named people available in that window. Use it for decisions and unblocking, not status reports.",
        "Write each feature down. A short spec says what the user does, what should happen and what 'done' looks like, with a sketch where it helps. Ten minutes of writing can save a day of waiting.",
        "Demo every week. A 30-minute call where the team shows working software on a test link, not slides. If a week ends with nothing to click, you'll know early.",
        "Keep everything in your name from day one: the repository and the cloud accounts, the domains, the design files, the task board.",
        "Sign the IP assignment before work starts, not at handover.",
        "Start with a paid trial: a week or two, or a first milestone you could use even if you stopped there. You'll learn more from it than from any sales call.",
        "Name one owner on each side. Questions go to one person, who answers within an agreed time.",
        "Ask for a written update at the end of the team's day covering what's done, what's blocked and what needs your answer. Then answer it at the start of yours.",
      ],
    },
    {
      type: "p",
      text: "Async work is a skill. A team that writes clear end-of-day notes and asks precise questions can make even a zero-overlap setup work. A team that has to be chased can't, at any distance.",
    },

    { type: "h2", text: "When does a hybrid team make sense?" },
    {
      type: "p",
      text: "A hybrid team puts one person in or near your time zone, usually a product owner or tech lead, in front of a remote engineering team. It makes sense when you want daily conversations but nearshore or offshore pricing for most of the hours.",
    },
    {
      type: "p",
      text: "The local lead joins your calls, turns decisions into written specs and reviews the team's work before you see it. The engineers overlap with the lead for a few hours a day, not with you.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/hybrid-model.svg`,
        alt: "Diagram of a hybrid onshore offshore model: the business owner talks daily with a local lead in the same time zone, the lead shares two to four hours and written specs with a remote engineering team, while the code and the accounts stay owned by the client's company",
        caption:
          "A hybrid setup: one lead in your hours, engineers in theirs. Arrowbin view.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "It works when the local person has real authority and enough technical depth to push back on you and on the team. It fails when that person is only a relay. Then you get an extra hop, an extra salary and the same misunderstandings.",
    },
    {
      type: "p",
      text: "There's a lighter version too. The remote team's lead shifts their day to give you three or four shared hours, and you act as product owner yourself. For most small builds, that's how I'd set things up.",
    },

    {
      type: "h2",
      text: "What red flags should you watch for with a remote development team?",
    },
    {
      type: "p",
      text: "Watch for vendors who won't put overlap hours in writing, keep your code in their own accounts, or push back on a small paid trial. These remote-specific signs show up before anyone writes a line of code:",
    },
    {
      type: "ul",
      items: [
        "No named overlap window, or 'we're flexible' with no hours attached.",
        "The repository, hosting or domain sits in the vendor's account 'for convenience'.",
        "Senior people on the sales call and unnamed people on the project. Ask for the names of who will build it.",
        "A rate that looks low for the seniority promised. Run it through the formula in our salary post.",
        "Demos made of slides and screenshots instead of working software.",
        "Resistance to an IP assignment, or to your lawyer reading the contract.",
        "Slow replies inside the overlap hours they promised, even during the sales process, when the vendor is trying hardest.",
        "A fixed price for the whole project before anyone has asked you detailed questions.",
      ],
    },
    {
      type: "p",
      text: "For the general checks, from portfolios and references to comparing quotes, see our guide to [choosing a software development company](/blog/how-to-choose-a-software-development-company). It also covers whether an agency, a freelancer or an in-house hire fits you.",
    },

    { type: "h2", text: "So which model should you start with?" },
    {
      type: "p",
      text: "Start from how you'll work, not from the rate card. If you'll want to talk to the team most days, pick nearshore, or onshore if the budget allows. If you can write down what you want and review it weekly, offshore gets you the most software for the money.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/decision-tree.svg`,
        alt: "Decision tree for picking a team location (onshore, nearshore or offshore) or a hybrid team, based on whether you need live decisions most days, whether the budget can carry local pay and whether the work is written down and stable",
        caption:
          "Three questions that settle most location decisions. Arrowbin view.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Whichever you pick, the same habits keep it on track. Put the overlap and the specs in writing, ask for a demo every week, and keep everything in your name. Plan for the years after launch as well. Our guide to [what software maintenance costs per year](/blog/software-maintenance-cost) covers that budget, and the same time-zone math applies to support.",
    },
    {
      type: "p",
      text: `At Arrowbin we build [custom software for founders and small businesses](/services/custom-software-development) worldwide, and we set each project up around the overlap the client needs. Want a second opinion on a team or a quote? [Book a 30-minute call](${site.bookingUrl}). If someone closer suits you better, we'll say so.`,
    },
  ],
  takeaways: [
    "Onshore suits daily live decisions and in-country rules, nearshore suits frequent calls at a lower cost, and offshore suits clearly written work where price matters most.",
    "With a 9-to-5 day on both sides, New York shares 6 to 7 hours with Mexico City, Bogotá or São Paulo, 1 to 3 hours with Lisbon, Warsaw or Kyiv, and none with South or Southeast Asia.",
    "Daylight saving moves the overlap: European teams gain an hour with the US during two gap periods a year (one week in late October, two in March), and Bogotá matches New York exactly in the US winter.",
    "Experienced offshore developers earn roughly a quarter to two-fifths of experienced US pay in our salary data, so the real saving is smaller than headline medians suggest.",
    "The hidden costs are management time and slower feedback; one study links each extra hour of time-zone distance to 11% less live communication.",
    "Commissioned code isn't automatically yours under US law, so get a signed IP assignment and keep the code and accounts in your company's name.",
    "Start any remote team with a small paid milestone and weekly demos before you commit to the full build.",
  ],
  faqs: [
    {
      question: "What is the difference between nearshore and offshore?",
      answer:
        "Nearshore teams work in a nearby country with a similar clock, usually within about three hours of yours, so you share most of the working day. Offshore teams are five or more hours away, which means less live overlap and more written communication. For a US company, Latin America is the usual nearshore choice, while Eastern Europe and Asia are offshore.",
    },
    {
      question: "Is nearshore worth paying more for than offshore?",
      answer:
        "It is when your project needs frequent live decisions, such as a product that's still finding its shape. If the work is well specified and you can review it weekly, offshore's lower cost usually wins. The deciding question is how often you'll need a same-day answer from the team.",
    },
    {
      question:
        "How many hours of overlap do you need with a development team?",
      answer:
        "In our view, 2 to 4 hours a day is enough for most projects, as long as that time goes on decisions and unblocking. Less can work for well-specified tasks if the team writes clear daily updates. Products that change week to week benefit from more.",
    },
    {
      question: "Can an offshore team work with no time-zone overlap at all?",
      answer:
        "Yes, for well-defined work such as maintenance, testing or a feature with a clear written spec. It struggles when the next step depends on your answer, because each question waits a day. Most teams fix that by shifting a few hours so a short daily call is possible.",
    },
    {
      question:
        "Is it safe to give an offshore company my source code and data?",
      answer:
        "It can be, with the right setup: code in repositories you own, access you can revoke, a confidentiality clause and an IP assignment signed before work starts. Limit access to real customer data to the people who need it. In a regulated industry, check where your data may be processed before you choose a country.",
    },
    {
      question: "Do offshore developers write lower-quality code?",
      answer:
        "Not as a rule. Code quality depends on seniority and on how the team reviews and tests its work, and those vary by team in every country. Very cheap quotes often mean junior-heavy teams, which is where most quality problems start.",
    },
    {
      question:
        "Which countries work best for nearshore development from the US?",
      answer:
        "For overlap with a New York 9-to-5, the Latin American hubs share six to eight hours for most of the year, and Mexico City shares the most with San Francisco. Beyond the clock, choose the team rather than the country: check their live work and their process, and talk to them before you sign.",
    },
    {
      question: "What is a hybrid onshore-offshore team?",
      answer:
        "It's a team with a lead in your time zone and engineers farther away. The lead handles daily conversations and writes specs, and the remote team builds and demos the work. It costs more than a fully offshore team and less than a fully local one, and it only works if the lead has real authority.",
    },
  ],
};
