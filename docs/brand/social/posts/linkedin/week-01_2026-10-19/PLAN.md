# LinkedIn, week 1 (19 to 25 October 2026)

One post this week: the Page's first post, a carousel. Everything you paste is in `carousels/carousel-01-ai-agent-cost.txt`.

| When | What | Files |
|---|---|---|
| Thu 22 Oct, 9:00 am US Eastern (7:00 pm in Dhaka) | Carousel 1: "What an AI agent really costs a small business (2026)", 11 slides | `carousels/carousel-01-ai-agent-cost.pdf`, `carousels/carousel-01-ai-agent-cost.txt` |

Why this time: the main target is US clients, and LinkedIn is busiest on Tuesday to Thursday mornings. 9 am Eastern is also 6 am Pacific, so the post lands at the start of the US working day.

## Before you post

1. Open https://arrowbin.com/blog/ai-agent-cost-small-business in a private window and check it loads.
2. The Page has no followers yet. From the Page admin, use **Invite to follow** and invite your most relevant connections a day before (LinkedIn gives free invite credits every month).
3. If you haven't yet, add the Experience entry on your profile (Founder and Lead Engineer at Arrowbin, picked from the dropdown), so the Page shows a real person behind it.

## How to post

1. Go to linkedin.com/company/arrowbinhq/admin and click **Create**, then **Start a post**. Check the composer says you're posting as Arrowbin.
2. Click the **+** (more) button, then **Add a document**. Upload `carousel-01-ai-agent-cost.pdf`.
3. Document title: `What an AI agent really costs a small business (2026)`.
4. Paste the post text. Post it, or use the clock icon to schedule it for Thu 22 Oct, 9:00 am Eastern.
5. Straight after it goes live, add the first comment with the link, as the Page.
6. Within the first hour, repost it from your personal profile with the text in the `.txt` file ("Repost with your thoughts").
7. Then feature it on the Page: on the post's **...** menu, choose **Feature on top of Page**.

Don't put the link in the post text: LinkedIn shows fewer people posts that send them off-site. A link inside the PDF won't be clickable either.

## Facts and sources

Every number comes from the guide at arrowbin.com/blog/ai-agent-cost-small-business. The prices were checked again on the providers' own pages on 21 October 2026.

| Slide | Fact | Source |
|---|---|---|
| 2 | US firms using AI: 17% to 20% (Dec 2025 to May 2026); 37% of firms with 250+ staff; under 20% of firms with 4 or fewer | US Census Bureau story, May 2026 (checked 21 Oct) |
| 3, 4 | $5.04 to $216 a month for 3,000 conversations; 0.17 to 7.2 cents a conversation | The guide's worked example: 4 calls per conversation, about 3,000 input and 300 output tokens per call, no caching |
| 4 | Per-model prices: Gemini 2.5 Flash-Lite $0.10 / $0.40; Claude Haiku 5.5 $0.10 / $0.50; gpt-6-luna $0.10 / $0.50; Gemini 3.6 Flash $0.75 / $3.75; Claude Sonnet 5.5 and gpt-6.1-sol $2 / $10; Gemini 3.1 Pro Preview $2 / $12; Claude Opus 5.5 $4 / $20 (per million input / output tokens) | Google, Anthropic and OpenAI pricing pages, checked 21 Oct |
| 4, 7 | Gemini 3.6 Flash doubles on 1 Jan 2027 ($0.75 to $1.50 input, $3.75 to $7.50 output) | Google Gemini API pricing page, checked 21 Oct |
| 7 | 15 to 20% of the build cost a year; a few hours a week checking answers at first | Arrowbin estimates (labelled as such on the slide) |
| 8 | Intercom Fin: $0.99 per outcome; 1,000 outcomes a month is $11,880 a year | Intercom pricing page, checked 21 Oct; the sum is 0.99 × 1,000 × 12 |
| 10 | Prototype on real data in 2 to 3 weeks | Arrowbin's AI automation service page |

If a price changes before you post, edit `docs/brand/social/make/linkedin-carousel-01.py` and render it again (see `../../../make/README.md`).

## After posting

After 48 hours, note the impressions, clicks and new followers from the post's analytics. That tells us whether the next carousel should go deeper on cost or on how-to.
