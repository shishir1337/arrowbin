import type { Post } from "@/lib/blog";
import { site } from "@/lib/site";

const DIR = "/blog/developer-salaries-by-country";
const CSV = `${DIR}/developer-salaries-by-country-2026.csv`;

export const post: Post = {
  slug: "developer-salaries-by-country",
  title: "Software Developer Salaries by Country in 2026 (Real Data)",
  description:
    "Median developer pay in 38 countries, from $155,000 in the US to $9,937 in Pakistan, computed from Stack Overflow survey data. Free CSV and full method.",
  keywords: [
    "software developer salaries by country",
    "developer salary by country 2026",
    "software engineer salary by country",
    "developer hourly rates by country",
    "offshore developer salaries",
    "stack overflow survey salary data",
    "developer salary in india usd",
    "salary to hourly rate formula",
  ],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "13 min read",
  category: "Guides",
  excerpt:
    "Median developer pay in 38 countries, computed from Stack Overflow's 2025 and 2026 survey files, with experience bands, a salary-to-hourly-rate formula and a free CSV you can reuse.",
  image: {
    src: `${DIR}/cover.webp`,
    alt: "Mockup of a developer pay dashboard ranking median yearly pay by country, from $155k in the United States to $20k in India, with stat tiles for 38 countries and 25,416 respondents and a Download CSV button",
    width: 1280,
    height: 720,
  },
  tldr: "Across the 38 countries with at least 100 respondents in Stack Overflow's 2025 and 2026 developer surveys, the median employed developer earns $155,000 a year in the United States, $95,299 in the UK, $83,340 in Germany, $55,040 in Poland, $19,761 in India and $9,937 in Pakistan. That puts the US median at 7.8 times India's and 15.6 times Pakistan's. The gap narrows with experience: Indian developers with 10+ years earn about a quarter of their US peers, against about a tenth for those with under five years. Bangladesh had 92 qualifying respondents, under our threshold, so we don't publish a figure for it.",
  body: [
    {
      type: "p",
      text: "Most pages that list developer salaries by country don't say where the numbers come from. Some pull from salary sites with unknown samples. Some just repeat each other. We wanted figures we could defend, so we computed them from Stack Overflow's public survey files and published our working.",
    },
    {
      type: "p",
      text: "This is for founders comparing teams in different countries, and for anyone who needs a pay figure they can cite. Arrowbin builds software for clients worldwide with engineers in a lower-cost country, so we have a stake in getting these numbers right, including the places where the data runs thin.",
    },
    {
      type: "p",
      text: `You can [download the CSV](${CSV}) with every number in this post. You'll find the method, its limits and a suggested citation near the end.`,
    },

    {
      type: "h2",
      text: "How much do software developers earn by country in 2026?",
    },
    {
      type: "p",
      text: "In Stack Overflow's 2025 and 2026 developer surveys, the median employed developer earns $155,000 a year in the United States, $95,299 in the United Kingdom, $83,340 in Germany, $55,040 in Poland, $19,761 in India and $9,937 in Pakistan. Those are medians of total yearly pay in US dollars, from 25,416 developers across both survey waves.",
    },
    {
      type: "p",
      text: "Median means the middle person: half earn more, half earn less. It's a better guide than an average, which a few very high earners can drag upward. Pay here means the survey's own question about total yearly compensation (salary, bonuses and perks, before tax), converted to dollars by Stack Overflow.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/median-pay-by-country.svg`,
        alt: "Ranked bar chart of median yearly developer pay by country in US dollars: United States $155,000, Switzerland $140,174, Australia $101,065, United Kingdom $95,299, Canada $93,142, Germany $83,340, Poland $55,040, Mexico $35,821, Brazil $32,767, Ukraine $31,765, India $19,761 and Pakistan $9,937",
        caption:
          "Median yearly pay of employed developers, 12 of the 38 countries. Source: Stack Overflow Developer Survey 2025 and 2026, Arrowbin analysis.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Most people want the ratio. In this data, the US median is 7.8 times India's and 15.6 times Pakistan's. Germany's is 4.2 times India's, and Poland's is 2.8 times.",
    },
    {
      type: "p",
      text: "Where samples are large, the two survey waves agree closely. In the US, the median is $155,000 in both years. India's is $19,761 in the 2025 wave and $19,586 in 2026, and Germany's moves from $83,531 to $81,884. That steadiness is why we were comfortable pooling them.",
    },

    {
      type: "h2",
      text: "Which countries pay software developers the most and the least?",
    },
    {
      type: "p",
      text: "Among the 38 countries with at least 100 qualifying respondents, the United States pays the most ($155,000), followed by Israel ($147,071) and Switzerland ($140,174). Pakistan ($9,937) and India ($19,761) pay the least, with Turkey ($30,297) next. Here's the full table, sorted by median.",
    },
    {
      type: "table",
      headers: [
        "Country",
        "Respondents (n)",
        "Median pay (USD a year)",
        "Middle 50% (USD)",
      ],
      rows: [
        ["United States", "6,098", "$155,000", "$115,000–$200,000"],
        ["Israel", "209", "$147,071", "$105,891–$185,310"],
        ["Switzerland", "490", "$140,174", "$112,288–$164,914"],
        ["Ireland", "168", "$113,728", "$87,881–$139,218"],
        ["Denmark", "274", "$101,088", "$82,582–$124,416"],
        ["Australia", "620", "$101,065", "$83,058–$125,460"],
        ["United Kingdom", "1,757", "$95,299", "$68,071–$126,347"],
        ["Norway", "238", "$93,886", "$78,766–$116,097"],
        ["Canada", "1,054", "$93,142", "$70,914–$127,645"],
        ["Germany", "2,472", "$83,340", "$64,968–$103,833"],
        ["Netherlands", "725", "$81,210", "$60,276–$102,355"],
        ["New Zealand", "192", "$81,088", "$60,643–$102,400"],
        ["Austria", "318", "$79,598", "$58,007–$98,612"],
        ["Finland", "211", "$76,570", "$58,007–$92,812"],
        ["Sweden", "537", "$71,698", "$58,700–$84,277"],
        ["Belgium", "220", "$68,237", "$53,251–$87,011"],
        ["Spain", "621", "$62,648", "$45,246–$85,296"],
        ["France", "1,077", "$61,488", "$48,726–$81,210"],
        ["Portugal", "262", "$58,007", "$40,605–$79,903"],
        ["Japan", "150", "$56,825", "$35,533–$79,571"],
        ["Czech Republic", "293", "$56,438", "$37,530–$78,633"],
        ["Poland", "534", "$55,040", "$33,512–$81,870"],
        ["Bulgaria", "175", "$52,315", "$34,873–$71,977"],
        ["Romania", "179", "$52,170", "$25,913–$75,525"],
        ["South Africa", "178", "$49,292", "$24,033–$71,697"],
        ["Hungary", "172", "$49,009", "$31,122–$74,616"],
        ["Italy", "597", "$46,406", "$36,393–$62,550"],
        ["Greece", "177", "$44,666", "$31,844–$69,609"],
        ["China", "106", "$41,786", "$23,560–$72,834"],
        ["Argentina", "118", "$41,347", "$27,007–$71,243"],
        ["Colombia", "103", "$40,487", "$18,975–$60,000"],
        ["Russia", "150", "$38,278", "$15,311–$60,000"],
        ["Mexico", "180", "$35,821", "$18,519–$58,193"],
        ["Brazil", "594", "$32,767", "$16,383–$54,574"],
        ["Ukraine", "611", "$31,765", "$8,896–$55,409"],
        ["Turkey", "171", "$30,297", "$13,969–$53,021"],
        ["India", "1,149", "$19,761", "$8,879–$39,521"],
        ["Pakistan", "107", "$9,937", "$4,636–$17,780"],
      ],
    },
    {
      type: "p",
      text: "Each middle 50% range runs from the 25th to the 75th percentile, so it shows how spread out pay is inside each country. Read it before you read the median. India's middle half runs from $8,879 to $39,521, about a 4.5x spread, which is wider than the gap between the Polish and German medians.",
    },
    {
      type: "p",
      text: "Our view: treat countries with fewer than about 200 respondents as rough. Small samples move around between years. Ukraine's median was $29,958 in the 2025 wave and $39,800 in 2026.",
    },

    {
      type: "h2",
      text: "How big is the developer pay gap between regions?",
    },
    {
      type: "p",
      text: "Country medians run from $93,142 to $155,000 in North America, $61,488 to $140,174 in Western Europe, $31,765 to $56,438 in Eastern Europe, $32,767 to $41,347 in Latin America and $9,937 to $19,761 in South Asia. From the lowest country to the highest, the spread is 15.6 times.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/pay-range-by-region.svg`,
        alt: "Range chart of median developer pay by region in 2026: North America $93k to $155k, Western Europe $61k to $140k, Northern Europe $72k to $101k, Oceania $81k to $101k, Southern Europe $45k to $63k, Eastern Europe $32k to $56k, Latin America $33k to $41k and South Asia $9.9k to $19.8k",
        caption:
          "Lowest to highest country median in each region, countries with 100+ respondents. Source: Stack Overflow Developer Survey 2025 and 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Eastern Europe and Latin America overlap almost completely. Brazil ($32,767) sits next to Ukraine ($31,765), and Poland ($55,040) is above every Latin American country in the data. If you're choosing between those two regions, time zone and the specific team matter more than the regional pay level.",
    },
    {
      type: "p",
      text: "Western Europe isn't one market either. Switzerland's median is more than double France's ($140,174 against $61,488). South Asia is the only region where every reported country sits under $20,000.",
    },
    {
      type: "p",
      text: "Regions are our own grouping of the countries that passed the threshold. Use the CSV's region column if you'd rather group them differently.",
    },
    {
      type: "cta",
      title: "Weighing quotes from teams in different countries?",
      text: "Send us the rates and the team mix you've been quoted. We'll show you how they line up against local pay in this data, and which questions to ask before you sign.",
      href: site.bookingUrl,
      label: "Talk it through with us",
    },

    {
      type: "h2",
      text: "How much does experience change developer pay in each country?",
    },
    {
      type: "p",
      text: "Experience raises pay everywhere, but far more steeply in lower-cost countries. In India, developers with 10 or more years of professional experience earn a median of $40,684, 4.4 times the $9,299 earned by those with up to four years. In the United States the step is 1.8 times, from $94,000 to $171,000.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/pay-by-experience.svg`,
        alt: "Dumbbell chart of median developer pay for 0 to 4 years versus 10 or more years of experience: United States $94k to $171k (1.8x), United Kingdom $57k to $105k, Germany $60k to $93k, Poland $32k to $69k, Ukraine $17.5k to $53k, Brazil $11.4k to $43k and India $9.3k to $41k (4.4x)",
        caption:
          "Median yearly pay by years working professionally. Source: Stack Overflow Developer Survey 2025 and 2026, Arrowbin analysis.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "table",
      headers: ["Country (USD a year)", "0–4 years", "5–9 years", "10+ years"],
      rows: [
        [
          "United States",
          "$94,000 (711)",
          "$135,000 (1,225)",
          "$171,000 (4,133)",
        ],
        [
          "United Kingdom",
          "$57,179 (219)",
          "$81,685 (338)",
          "$105,119 (1,194)",
        ],
        ["Germany", "$60,184 (390)", "$75,410 (622)", "$92,812 (1,451)"],
        ["Poland", "$31,520 (127)", "$60,257 (148)", "$69,093 (254)"],
        ["Ukraine", "$17,501 (201)", "$40,263 (207)", "$53,000 (199)"],
        ["Brazil", "$11,367 (112)", "$35,169 (137)", "$42,573 (340)"],
        ["India", "$9,299 (449)", "$23,248 (315)", "$40,684 (356)"],
      ],
    },
    {
      type: "p",
      text: "Respondent counts are in brackets. We show a band only when it has at least 50 respondents. That's why Pakistan, which passes the country threshold, has no bands: none of its three groups reaches 50.",
    },
    {
      type: "p",
      text: "This changes the offshore maths. For early-career developers, the US median is 10.1 times India's. For developers with 10+ years, it's 4.2 times. Brazil follows the same pattern (8.3 times, falling to 4.0), and so does Ukraine (5.4 times, falling to 3.2).",
    },
    {
      type: "p",
      text: "If you're hiring a small team to build something real, you want the experienced end of that table. You'll still save money there, just much less than headline ratios suggest. A quote that prices senior people at junior rates deserves a closer look.",
    },

    {
      type: "h2",
      text: "Why is there no salary figure for Bangladesh, Vietnam or Nigeria?",
    },
    {
      type: "p",
      text: "Too few developers from those countries answered. After filtering, Bangladesh has 92 qualifying respondents across both waves, under our threshold of 100, so we don't publish a median for it. Seven other countries we wanted to cover fall short as well.",
    },
    {
      type: "table",
      headers: ["Below threshold", "Qualifying respondents", "Region"],
      rows: [
        ["Bangladesh", "92", "South Asia"],
        ["Indonesia", "61", "Southeast Asia"],
        ["Nigeria", "60", "Africa"],
        ["Philippines", "60", "Southeast Asia"],
        ["Egypt", "55", "Africa"],
        ["Sri Lanka", "46", "South Asia"],
        ["Vietnam", "35", "Southeast Asia"],
        ["Nepal", "28", "South Asia"],
      ],
    },
    {
      type: "p",
      text: "Bangladesh matters to us, and we were tempted to lower the bar. We didn't. A median from 92 people, most of them with under ten years of experience, would look precise and mean little.",
    },
    {
      type: "p",
      text: "Be wary of any page that quotes an exact developer salary for these countries without saying how many people it's based on. Until the samples grow, ask vendors there for their salary bands by level. Their answer tells you a lot about who will be writing your code.",
    },
    {
      type: "p",
      text: "Pooling the two survey waves is what got Pakistan over the line, with 107 respondents. When Stack Overflow publishes its next survey, we'll add that wave and check these countries again.",
    },

    {
      type: "h2",
      text: "Do survey salaries match official government pay statistics?",
    },
    {
      type: "p",
      text: "No, they run higher. In the US, the survey median of $155,000 is 16% above the [Bureau of Labor Statistics median](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) of $134,040 for software developers, quality assurance analysts and testers (May 2025). In the UK, respondents who entered pay in pounds report a median of £70,000, 23% above the £56,914 that the ONS gives for full-time programmers and software development professionals.",
    },
    {
      type: "p",
      text: "That UK figure is from the [ONS Annual Survey of Hours and Earnings](https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/occupation4digitsoc2010ashetable14), 2025 provisional results, table 14.7a, occupation code 2134. We used the pound figures for the UK so no exchange rate gets in the way of the comparison.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/survey-vs-official-pay.svg`,
        alt: "Bar chart comparing developer survey pay with official statistics: in the United States the survey median of $155,000 is 16% above the BLS May 2025 median of $134,040, and in the United Kingdom the survey median of £70,000 is 23% above the ONS ASHE 2025 median of £56,914",
        caption:
          "Survey medians against official medians in local currency. Sources: Stack Overflow Developer Survey 2025 and 2026, BLS, ONS ASHE 2025.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Several things drive the gap, and none of them make the survey useless:",
    },
    {
      type: "ul",
      items: [
        "Who answers. Stack Overflow's survey reaches people engaged enough to fill in a long developer questionnaire, and they skew experienced: 4,133 of the 6,098 US respondents (68%) have 10 or more years of professional experience.",
        "What counts as pay. Respondents report total compensation, bonuses and perks included. BLS publishes a wage estimate built from a survey of employers, and ASHE comes from payroll records.",
        "Who's in the occupation. Official figures cover every employee in the occupation code, across all sectors and regions. A survey only covers the people who chose to answer it.",
      ],
    },
    {
      type: "p",
      text: "So read the survey medians for high-income countries as running somewhat above what a typical employer pays. Rankings and ratios are probably sturdier than the absolute levels, since the same survey method runs in every country, though we can't prove the bias is the same size everywhere. We haven't checked lower-income countries against official occupational data, so we can't say which way their numbers lean.",
    },

    {
      type: "h2",
      text: "How does a developer's salary turn into an hourly rate for a client?",
    },
    {
      type: "p",
      text: "Hourly rate = yearly pay × (1 + on-costs + overheads) ÷ billable hours ÷ (1 − margin). With illustrative inputs of 30% on-costs, 25% overheads, 1,500 billable hours and a 20% margin, India's median pay of $19,761 becomes about $25.52 an hour, and the US median of $155,000 becomes about $200.",
    },
    {
      type: "image",
      image: {
        src: `${DIR}/salary-to-hourly-rate.svg`,
        alt: "Worked formula turning India's median developer pay of $19,761 into an hourly rate: add 55% for on-costs and overheads to reach $30,630, divide by 1,500 billable hours for a cost of $20.42, then divide by 0.8 for a 20% margin to get $25.52 an hour; the same formula gives about $200 for the US median and $71 for Poland",
        caption:
          "From salary to hourly rate with illustrative assumptions (not Arrowbin prices). Pay data: Stack Overflow Developer Survey 2025 and 2026.",
        width: 1280,
        height: 720,
      },
    },
    {
      type: "p",
      text: "Each input is explained below, with the reason for its value. They are assumptions for the example. They aren't Arrowbin's numbers, and they aren't a survey of what vendors charge.",
    },
    {
      type: "ul",
      items: [
        "On-costs, 30%: employer taxes, insurance, paid leave and benefits. These vary a lot by country. In the US, the BLS [employer cost survey](https://www.bls.gov/news.release/ecec.nr0.htm) puts benefits at 30.0% of total private-industry compensation in June 2026: $14.07 on top of $32.82 in wages, or about 43% of wages.",
        "Overheads, 25%: laptops, software licences, office or co-working space, management, recruiting, sales and the time people spend between projects.",
        "Billable hours, 1,500: a full-time year is 2,080 paid hours (52 weeks of 40). Holidays, leave, internal meetings and training take the rest, so 1,500 is about 72% of paid hours.",
        "Margin, 20%: what the company keeps. Dividing by 0.8 is deliberate, because a 20% margin means 20% of the rate, which is more than adding 20% to cost.",
      ],
    },
    {
      type: "table",
      headers: [
        "Example",
        "Median yearly pay (USD)",
        "Illustrative hourly rate (USD)",
      ],
      rows: [
        ["United States", "$155,000", "$200"],
        ["United Kingdom", "$95,299", "$123"],
        ["Germany", "$83,340", "$108"],
        ["Poland", "$55,040", "$71"],
        ["Brazil", "$32,767", "$42"],
        ["Ukraine", "$31,765", "$41"],
        ["India, 10+ years", "$40,684", "$53"],
        ["India, all levels", "$19,761", "$26"],
        ["Pakistan", "$9,937", "$13"],
      ],
    },
    {
      type: "p",
      text: "With these inputs, the shortcut is yearly pay ÷ 774. Change any input and the shortcut moves. Using the US benefit load of about 43% instead of 30% lifts the US example to about $217 an hour, and if a team bills only 1,200 hours a year, every rate in the table rises by 25%.",
    },
    {
      type: "p",
      text: "Two cautions. A rate built on one median developer isn't a team rate, since real projects mix senior and junior people with a lead and QA. And a quoted rate far below what this formula gives for the experience you've been promised should prompt a question about who's actually doing the work.",
    },

    { type: "h2", text: "How did we calculate these numbers?" },
    {
      type: "p",
      text: "We used the public results files of the [Stack Overflow Developer Survey](https://github.com/StackExchange/Survey/tree/main/packages/archive/2026) for 2025 and 2026, published by Stack Exchange Inc. Stack Overflow's [2026 methodology page](https://survey.stackoverflow.co/2026/methodology) says that survey ran from June 23 to August 5, 2026, with 30,903 valid responses from 169 countries. For 2025, the public file has 49,191 responses.",
    },
    {
      type: "ul",
      items: [
        "Who's included: people who code as the main part of their job (2025: 'I am a developer by profession'; 2026: 'I create code as a primary part of my job') whose employment status is 'Employed'. Freelancers, the self-employed, students and the unemployed are out. Neither wave splits full-time from part-time employees.",
        "Pay: the survey's ConvertedCompYearly field, which is total yearly compensation converted to US dollars by Stack Overflow using exchange rates. Its methodology page doesn't name the rate source or date.",
        "Cleaning: we dropped converted values under $1,000 or over $1,000,000 a year as likely entry errors, such as monthly pay typed as yearly. That removed 599 of 26,015 answers, leaving 25,416.",
        "Thresholds: a country median appears only with at least 100 respondents across both waves. Experience bands need 50 in the band, and the per-wave medians in the CSV need 100 in that wave.",
        "Experience: years working professionally (the WorkExp question), grouped as 0–4, 5–9 and 10+.",
        "Rounding: medians and quartiles are rounded to the nearest dollar.",
      ],
    },
    {
      type: "p",
      text: "Limits matter as much as method, so here they are plainly:",
    },
    {
      type: "ul",
      items: [
        "It's a self-selected sample that skews toward experienced developers who use Stack Overflow.",
        "Country means where the respondent lives, so a developer in Poland paid by a US company counts as Poland.",
        "Pooling two years mixes two sets of exchange rates, and some people may have answered both years.",
        "Stack Overflow applies extra exclusion flags to the charts it publishes. Those flags aren't in the public files, so our medians can differ from pay figures Stack Overflow reports.",
        "Stack Overflow corrects some Ukrainian answers that look like dollars typed under hryvnia. Ukraine's big move between waves suggests caution with that country.",
      ],
    },
    { type: "h3", text: "What's in the CSV file?" },
    {
      type: "p",
      text: `The [CSV](${CSV}) has one row per country: region, respondents_n, median_usd, p25_usd and p75_usd, then per-wave counts and medians, experience-band counts and medians, and a note for countries below the threshold. A blank cell means too few respondents.`,
    },
    {
      type: "p",
      text: "Our CSV is a derived database under the [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/), like the survey data it comes from. If you reuse it, credit 'Stack Overflow Developer Survey, Stack Exchange Inc.' and Arrowbin, and share any database you build from it under the same licence.",
    },
    { type: "h3", text: "How to cite this data" },
    {
      type: "p",
      text: "Suggested citation: Arrowbin, 'Software Developer Salaries by Country in 2026 (Real Data)', October 15, 2026, arrowbin.com/blog/developer-salaries-by-country. Based on Stack Overflow Developer Survey 2025 and 2026 public data (Stack Exchange Inc., ODbL 1.0).",
    },

    {
      type: "h2",
      text: "How should you use these numbers when comparing development quotes?",
    },
    {
      type: "p",
      text: "Use them to check that a quote fits where the team lives and how senior it is. Choosing a country by its median alone is a quick way to land the cheapest rate and the most expensive project.",
    },
    {
      type: "p",
      text: "Our [custom software cost guide](/blog/how-much-does-custom-software-development-cost) gives blended hourly rates by region as Arrowbin estimates. This data gives you a sourced view of the pay underneath those rates, so you can test our estimate instead of taking it on trust.",
    },
    {
      type: "p",
      text: "When you're down to a shortlist, ask each vendor for the experience mix of the people on your project and run their rates through the formula above. Our guide to [choosing a software development company](/blog/how-to-choose-a-software-development-company) covers the other questions worth asking.",
    },
    {
      type: "p",
      text: "If you're budgeting a first version, the hours matter as much as the rate, and [our MVP cost guide](/blog/mvp-development-cost) shows how to estimate both. For a second opinion on a quote, or to see how our [custom software development](/services/custom-software-development) team would scope your project, [send us a short brief](/contact).",
    },
  ],
  takeaways: [
    "In the US the median employed developer earns $155,000 a year, against $19,761 in India and $9,937 in Pakistan, so the US median is 7.8 times India's and 15.6 times Pakistan's.",
    "Experience narrows the gap: with 10+ years, Indian developers earn about a quarter of the US median for the same band, against about a tenth for those with up to four years.",
    "Eastern Europe ($31,765 to $56,438) and Latin America ($32,767 to $41,347) overlap, so the team and time zone matter more than the region.",
    "Bangladesh, Vietnam, the Philippines, Indonesia, Nigeria, Egypt, Sri Lanka and Nepal had fewer than 100 qualifying respondents, so we publish no median for them.",
    "Survey medians run above official statistics: 16% above BLS in the US and 23% above ONS in the UK.",
    "With illustrative inputs, an hourly rate is roughly yearly pay divided by 774; the formula matters more than the shortcut.",
  ],
  faqs: [
    {
      question:
        "What is the median software developer salary in India in 2026?",
      answer:
        "In Stack Overflow's 2025 and 2026 survey data, the median employed developer in India earns $19,761 a year, based on 1,149 respondents. Its middle half runs from $8,879 to $39,521. Developers with 10 or more years of experience earn a median of $40,684.",
    },
    {
      question: "How much do software developers in Bangladesh earn?",
      answer:
        "We don't publish a figure, because only 92 Bangladeshi developers met our filters across the two survey waves, below our 100-respondent threshold. Any precise Bangladesh salary should come with its sample size. Until better data exists, ask vendors for their salary bands by level.",
    },
    {
      question: "Which country pays software developers the most?",
      answer:
        "Among the 38 countries with enough respondents, the United States has the highest median at $155,000 a year. Israel ($147,071) and Switzerland ($140,174) come next. These are medians of total pay, including bonuses and perks, converted to US dollars.",
    },
    {
      question:
        "Are developers in Eastern Europe cheaper than in Latin America?",
      answer:
        "Not as a rule. Country medians in Eastern Europe run from $31,765 (Ukraine) to $56,438 (Czech Republic), and in Latin America from $32,767 (Brazil) to $41,347 (Argentina). Poland, at $55,040, sits above every Latin American country in the data.",
    },
    {
      question: "Why are these salaries higher than some other salary sites?",
      answer:
        "Stack Overflow asks for total compensation, including bonuses and perks, and its respondents skew experienced. In the US its median is 16% above the BLS figure, and in the UK it's 23% above the ONS figure. Rankings and ratios between countries are steadier than the absolute levels.",
    },
    {
      question: "Can I use this salary data in my own article or report?",
      answer:
        "Yes. Our CSV is a derived database under the Open Database License 1.0, so credit Stack Overflow Developer Survey (Stack Exchange Inc.) and Arrowbin, and share any database you build from it under the same licence. A suggested citation is in the methodology section.",
    },
    {
      question: "How do I convert a developer's salary into an hourly rate?",
      answer:
        "Multiply yearly pay by one plus on-costs and overheads, divide by billable hours, then divide by one minus the margin. With 30% on-costs, 25% overheads, 1,500 billable hours and a 20% margin, that's roughly yearly pay divided by 774. These are illustrative inputs, so swap in your own.",
    },
    {
      question: "How often will this salary data be updated?",
      answer:
        "Once a year, after Stack Overflow publishes its next developer survey. We'll rerun the same analysis script with the new wave and update the table, the charts and the CSV, and change the date at the top of the post.",
    },
  ],
};
