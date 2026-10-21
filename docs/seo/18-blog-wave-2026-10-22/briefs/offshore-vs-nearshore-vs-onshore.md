# Brief: offshore-vs-nearshore-vs-onshore

Researched 22 October 2026 with WebSearch and WebFetch (US results). Writer: blog wave agent.

## Target

- Slug: `/blog/offshore-vs-nearshore-vs-onshore`
- Primary keyword: offshore vs nearshore vs onshore software development
- Secondary keywords (confirmed in the SERP check below): nearshore vs offshore, onshore vs offshore software development, offshore software development pros and cons, offshore development time zone overlap, how to manage an offshore development team, hybrid onshore offshore model
- Reader: a US founder or small-business owner (also UK and Australia) deciding where to hire a development team, worried about cost, communication, time zones, quality and IP
- Template: content plan template C (comparison post)
- Category: Guides
- Keep country-neutral: the planned Bangladesh landing page owns "offshore software development bangladesh" and "outsourcing to Bangladesh". Dhaka appears only as one row in the time-zone table.

## SERP check (22 Oct 2026)

| Query | What ranks | Page types |
|---|---|---|
| offshore vs nearshore vs onshore software development | getontop.com, brainhub.eu, engineerbabu.com (Jan 2026), orientsoftware.com, mechdyne.com, rootstack.com, calamari.io | Vendor blogs, each based in the geography it recommends (India, Poland, Vietnam, Latin America) |
| nearshore vs offshore software development pros and cons | bairesdev.com, assuresoft.com, codev.com, getontop.com, clickittech.com, flatirons.com | Nearshore vendor blogs (Latin America) and one Philippines staffing firm |
| onshore vs offshore software development cost comparison | baytechconsulting.com, morsoftware.com, creolestudios.com, elpassion.com, codewave.com, reliasoftware.com, engineerbabu.com | Vendor blogs; rate tables without sources |
| offshore development team time zone overlap hours US | bsscommerce.com, wisemonk.io, turnkeystaffing.com, peerbits.com, wearepresta.com, lemon.io | Staffing and vendor blogs with rough ranges ("2 to 4 hours with the US") |
| how to manage an offshore development team | appsierra.com, riseuplabs.com, procoders.tech, qubit-labs.com, cleveroad.com, mindbowser.com | Vendor how-to lists |
| offshore software development pros and cons 2026 | fireart.studio, designveloper.com, morsoftware.com, biz4group.com, innowise.com, cleveroad.com, designrush.com | Vendor and directory listicles |

### What the top pages cover (opened)

- **EngineerBabu** (1 Jan 2026, Indian vendor): definitions, a quick comparison table, a risk table, unsourced hourly rates (US $80–150, India $20–45), "2–4 hours of daily overlap" with no cities, a mistakes list, then a pitch for its own services with unverified award and client-count claims. No DST, no IP assignment mechanics.
- **Orient Software** (published 27 Oct 2023, updated 26 Aug 2026, Vietnamese vendor): prose comparison, no table. US rate "as high as $200" sourced to a Hacker News comment; Asia rates unsourced. No overlap math, no DST, no IP, no hybrid. Ends with "Partner up with us".
- **Brainhub** (updated 27 Jan 2026, Polish vendor): headings like "Onshore = comfortable, but pricey". No table, no rates; says Poland is 6 hours from New York (true only part of the year). Template placeholders still visible in its table of contents. Calls nearshore a model with "no drawbacks".
- **ClickIT** (published 31 Mar 2021, Mexican vendor): summary table, unsourced and self-contradicting figures (offshore gap "7–10 hours" in the table and "10–14" in the text), heavy self-promotion for Mexico.
- bairesdev.com returned 403 when opened (not used).

### What they miss (our angle)

1. **Nobody computes the overlap.** Everyone says "2–4 hours" or "0–3 hours". We compute 9-to-5 overlap for New York and San Francisco against 10 team cities, from UTC offsets opened today, and show it as a chart.
2. **Nobody mentions daylight saving time.** The US and Europe change clocks on different dates, and Mexico, Colombia, Brazil and the Asian hubs don't change at all, so the overlap moves during the year. We show by how much and when (25 Oct to 1 Nov 2026 and 14 to 28 Mar 2027 are the "gap weeks").
3. **Rates are unsourced and self-serving.** We use only our own published salary data (Stack Overflow survey, n = 25,416) and point to the cost guide for blended rates, and we show that at 10+ years of experience the gap shrinks from about 8x to about 4x.
4. **IP advice stops at "sign a contract".** We cite the US Copyright Office: commissioned software from a contractor isn't automatically "work made for hire", so the contract needs an assignment. Plus the New York Convention (172 parties) for why arbitration clauses travel better than court judgments.
5. **Every top page is a vendor recommending its own geography without saying so.** We disclose that Arrowbin's engineers are offshore, and say plainly when onshore or nearshore is the better call.
6. **Hidden costs are asserted, not sourced.** We cite peer-reviewed work: the Organization Science study (12,038 employees, DST as a natural experiment) and Dibbern, Winkler and Heinzl in MIS Quarterly on client extra costs in offshored projects.

## Time-zone method and assumptions

- Workday: 9:00 to 17:00 local time on both sides, Monday to Friday, no lunch carve-out. Overlap = intersection of the two windows in UTC.
- Offsets checked on time.is on 22 Oct 2026 and cross-checked with Node's ICU time-zone data (same results):
  - New York UTC-4 (EDT), back to UTC-5 on 1 Nov 2026. San Francisco UTC-7 (PT), back to UTC-8 on 1 Nov 2026.
  - London UTC+1 (BST), Lisbon UTC+1 (WEST), Warsaw UTC+2 (CEST), Bucharest and Kyiv UTC+3 (EEST): all go back one hour on 25 Oct 2026.
  - Mexico City UTC-6, no DST. Bogotá UTC-5, no DST since 1993. São Paulo UTC-3, no DST since 2019.
  - Bengaluru UTC+5:30 (none since 1945), Dhaka UTC+6 (none since 2009), Ho Chi Minh City UTC+7 (no change), Manila UTC+8 (none since 1990).
  - Sydney UTC+11 (AEDT), back to UTC+10 on 4 Apr 2027.
- Rules: NIST (US: second Sunday of March to first Sunday of November; 2026 dates 8 Mar and 1 Nov). European Commission (EU: last Sunday of March and last Sunday of October). 14 Mar 2027 and 28 Mar 2027 are computed from those rules.

| Team city | Overlap with NY now | NY gap weeks | NY winter | Overlap with SF now | SF gap weeks | SF winter |
|---|---|---|---|---|---|---|
| Mexico City | 6 | 6 | 7 | 7 | 7 | 6 |
| Bogotá | 7 | 7 | 8 | 6 | 6 | 5 |
| São Paulo | 7 | 7 | 6 | 4 | 4 | 3 |
| Lisbon | 3 | 4 | 3 | 0 | 1 | 0 |
| Warsaw | 2 | 3 | 2 | 0 | 0 | 0 |
| Bucharest, Kyiv | 1 | 2 | 1 | 0 | 0 | 0 |
| Bengaluru, Dhaka, Ho Chi Minh City, Manila | 0 | 0 | 0 | 0 | 0 | 0 |

Team clock at 9am New York now (winter in brackets): Bengaluru 6:30pm (7:30pm), Dhaka 7pm (8pm), Ho Chi Minh City 8pm (9pm), Manila 9pm (10pm). Team clock at 5pm San Francisco now (winter): Manila 8am (9am), Ho Chi Minh City 7am (8am).

London now: Lisbon 8, Warsaw 7, Kyiv 6, São Paulo 4, Bengaluru 3.5, Dhaka 3, HCMC 2, Manila 1. London after 25 Oct: Bengaluru 2.5, Dhaka 2, HCMC 1, Manila 0. Sydney now (AEDT): Manila 5, HCMC 4, Dhaka 3, Bengaluru 2.5. Sydney from 4 Apr 2027 (AEST): Manila 6, HCMC 5, Dhaka 4, Bengaluru 3.5.

## Sources (all opened 22 Oct 2026 unless marked)

| URL | What we used |
|---|---|
| https://time.is/New_York | UTC-4 now; back to UTC-5 on 1 Nov 2026 |
| https://time.is/San_Francisco | UTC-7 now; back to UTC-8 on 1 Nov 2026 |
| https://time.is/London | UTC+1 now; GMT from 25 Oct 2026 |
| https://time.is/Sydney | UTC+11 now; UTC+10 from 4 Apr 2027 |
| https://time.is/Mexico_City | UTC-6, no DST |
| https://time.is/Bogotá | UTC-5, no DST since 1993 |
| https://time.is/São_Paulo | UTC-3, no DST since 2019 |
| https://time.is/Lisbon | UTC+1 now, UTC+0 from 25 Oct 2026 |
| https://time.is/Warsaw | UTC+2 now, UTC+1 from 25 Oct 2026 |
| https://time.is/Bucharest | UTC+3 now, UTC+2 from 25 Oct 2026 |
| https://time.is/Kyiv | UTC+3 now, UTC+2 from 25 Oct 2026 |
| https://time.is/Bangalore | UTC+5:30, no DST since 1945 |
| https://time.is/Dhaka | UTC+6, no DST since 2009 |
| https://time.is/Ho_Chi_Minh_City | UTC+7, no DST |
| https://time.is/Manila | UTC+8, no DST since 1990 |
| https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst | US DST rule; 2026 dates 8 Mar and 1 Nov |
| https://transport.ec.europa.eu/transport-themes/summertime_en | EU rule: last Sunday of March to last Sunday of October |
| https://news.rice.edu/news/2024/hidden-cost-working-across-time-zones | 1 hour more time-zone distance cut synchronous communication by 11%; that hour was 19% of business-hour overlap; 12,000+ employees at a Fortune 100 firm; Organization Science 35(5) |
| https://econpapers.repec.org/paper/ehllserod/128758.htm | Paper details: Chauvin, Choudhury and Pan Fang, Organization Science 2024, 12,038 employees, DST as identification |
| https://aisel.aisnet.org/misq/vol32/iss2/9/ | Dibbern, Winkler and Heinzl (MIS Quarterly 2008): six offshored projects; client extra costs in four areas (requirements and design, knowledge transfer, control, coordination), higher where client-specific knowledge was needed |
| https://www.copyright.gov/circs/circ30.pdf | Circular 30 (revised 08/2024): commissioned work is "made for hire" only if it fits one of nine categories and there's a signed written agreement; software isn't one of the nine |
| https://uncitral.un.org/en/texts/arbitration/conventions/foreign_arbitral_awards/status2 | New York Convention: 172 parties, including the US, UK, Australia and every team country in the post |
| https://www.ef.com/wwen/epi/ (plus the country pages for the Philippines, India, Mexico, Colombia, Brazil, Bangladesh, Vietnam, Ukraine) | EF EPI 2025, 123 countries: Portugal 6th, Romania 11th, Poland 15th, Philippines 28th, Ukraine 45th, India 74th, Brazil 75th, Colombia 76th, Mexico 103rd |
| https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/ | 180M+ developers on GitHub; India added 5M+ in 2025 and is "poised to overtake the US developer population within the next few years" |
| /blog/developer-salaries-by-country (our own data asset) | US median $155,000; Mexico $35,821; Colombia $40,487; Brazil $32,767; Poland $55,040; Portugal $58,007; Romania $52,170; Ukraine $31,765; India $19,761; 10+ years: US $171,000, Poland $69,093, Ukraine $53,000, Brazil $42,573, India $40,684 |

Opened for the SERP review only (not cited): engineerbabu.com, orientsoftware.com, brainhub.eu, clickittech.com.

Not opened, do not cite: timeanddate.com (returned 403 on every page), bairesdev.com (403), eur-lex Directive 2000/84/EC (empty page), the Wharton and SIOE PDFs of the time-zone paper, the full EF EPI PDF report.

## Outline

1. Offshore, nearshore or onshore: which should you choose? (verdict, definitions, 7-row table)
2. How much cheaper are nearshore and offshore developers? (salary data, seniority gap, link to cost guide)
3. How many working hours will you actually share? (computed overlap table, two charts, DST, UK and Australia)
4. What are the hidden costs of offshore development? (research, feedback-loop chart)
5. Is communication or quality worse with an offshore team? (EF EPI, quality is a team property)
6. Who owns the code when your developers are in another country? (Circular 30, accounts, arbitration)
7. How do you manage an offshore or nearshore team so it works? (playbook)
8. When does a hybrid team make sense? (diagram)
9. What red flags should you watch for with a remote team? (remote-specific; general list stays in the choosing guide)
10. So which model should you start with? (decision tree, service link, booking link)
