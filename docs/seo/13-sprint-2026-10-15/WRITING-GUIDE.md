# Blog writing guide for Arrowbin posts (read fully before writing)

Also read `SPRINT-RULES.md` in this folder. Those rules apply too: no em dashes, never invent facts.

The founder's own structure guide is at the repo root: `4000 word blog guide seo aeo geo aio.md`. This file turns it into concrete rules for our data format.

---

## 1. Who is writing, and who is reading

- **Byline:** Md. Shishir Ahmed, founder and lead engineer at Arrowbin. He has built and rebuilt production sites and software since 2020: Next.js, WordPress migrations, e-commerce stores, payment and courier integrations, and AI features.
- **Voice:** an experienced engineer explaining something to a smart, busy founder over coffee.
  - Plain words, specific nouns, and opinions with reasons.
  - Use "we" for the team. An occasional "I" for a personal view is fine.
  - Contractions are fine.
- **Readers:** startup founders, SMB owners and e-commerce brand owners in the US, UK, Australia and Bangladesh. Most are not engineers. They want a straight answer, a number or range with its source, the trade-offs, and what to do next.

---

## 2. Sounding like a person, not a model (this is graded)

Write it, then run your own draft through these checks. An editor agent will check again.

### Never use

- **Em dashes (U+2014).** Not one. En dashes only in ranges (6–14 weeks).
- **Words and phrases that read as AI:**
  - Verbs: delve, embark, harness, unlock, elevate, empower, foster, bolster, underscore, showcase.
  - Nouns and adjectives: tapestry, landscape (meaning "field"), realm, pivotal, crucial, vital, robust, seamless(ly), cutting-edge, state-of-the-art, game-changer, transformative, revolutionary, groundbreaking, unparalleled, ever-evolving, holistic, synergy, testament, beacon.
  - Fillers and stock phrases: "navigate the complexities", "in today's fast-paced world", "in the digital age", "it's important to note", "it's worth noting", "let's dive in", "in this article we will", "without further ado", "at the end of the day".
  - Transition openers: "In conclusion", "Ultimately," "Moreover," "Furthermore," "Additionally," at the start of sentences.
- **Formula shapes:**
  - "It's not X, it's Y" (and "not just X, but Y").
  - "Whether you're a X or a Y".
  - "Despite [challenge], [positive]".
  - A summary sentence at the end of every section that repeats the heading.
  - Questions you answer yourself straight away ("The result? Faster sites.").
- **Groups of three by reflex.** Lists of exactly three adjectives or examples every time are a tell. Use the number that fits.
- **Vague attributions** ("experts say", "studies show", "many businesses find"). Name the source and link it, or say it is our view.
- **Sales puffery about Arrowbin.** One short, plain mention of what we do near the end is enough. The post must be useful even to someone who never hires us.

### Do

- **Vary sentence length.** Some sentences are four words. Some run longer because the idea needs it.
  - Paragraphs: 1 to 4 sentences.
  - An occasional one-line paragraph is fine.
- **Be concrete.** Name the tools, the numbers (sourced), the failure modes, and what a sensible person would do. Example: "bKash's checkout API sends you back to a callback URL, and that is where most broken integrations fail" is far better than "payment integrations can be complex".
- **Show judgement:**
  - Say when something is a bad idea.
  - Say what you would pick and why.
  - Admit the trade-offs.
  - Disagree with common advice when you have a reason.
- **Experience without fabrication.** You may describe how we work and what we check, as process, in present tense ("When we take over a WordPress store, the first thing we look at is…").
  - Do NOT invent specific client stories, incidents, metrics, quotes or "a client once…" anecdotes.
  - Use clearly framed hypotheticals instead ("Say you run a 30-person logistics company…").
- **Sentence case headings**, written as the real question people ask ("How much does an AI agent cost to build in 2026?").
- **British or American spelling?** American (most buyers are in the US), but keep Bangladeshi terms correct (lakh, crore, Taka/BDT, bKash, Nagad).

---

## 3. Structure (SEO + AEO + GEO)

Follow the founder's guide. In our data model:

| Field | What goes in it |
|---|---|
| `title` | Question-style or keyword-first, ideally under 60 characters. It is also the H1. |
| `description` | Meta description, 140 to 155 characters, contains the primary keyword, says what the reader gets. |
| `excerpt` | 1 to 2 sentences for cards and RSS. |
| `keywords` | The primary keyword first, then 4 to 7 secondary terms. |
| `tldr` | **2 to 4 sentences that directly answer the title question**, with the key number or verdict. This is what AI engines quote. No links. |
| `body` | See the body rules below. |
| `takeaways` | 5 to 7 scannable lines, each a complete thought. No links. |
| `faqs` | 6 to 8 question/answer pairs: long-tail and conversational, answers 2 to 4 sentences, self-contained. No links. Do not repeat the H2 questions word for word. |
| `category` | One of "Guides", "Product", "E-commerce", "AI", "Engineering" (pick the closest). |
| `date` / `dateLabel` | "2026-10-15" / "October 15, 2026" |
| `author` | "Md. Shishir Ahmed" |
| `readingTime` | Round(words / 230) + " min read" |
| `image` | The cover (see section 5). |

**Body rules:**
- Open with 1 to 3 short intro paragraphs: who this is for and why we can speak to it. No throat-clearing.
- **7 to 10 H2 sections**, each phrased as a real question, each **opening with a 1 to 2 sentence direct answer** that still makes sense if lifted out alone. Then expand with detail, examples, a table or list, and a visual.
- Each section must be self-contained: name the subject again instead of saying "this" or "it" at the start.
- Use comparison tables where a comparison exists. Headers must be unique within a table, and no two tables may have identical header rows.
- **Length: 2,200 to 3,500 words** of body (not counting FAQ). Depth beats padding: every paragraph must earn its place.
- One `cta` block after roughly the first third, shaped `{ type: "cta", title, text, href, label }`. Example: title "Want a fixed number for your project?", href "/contact", label "Get a fixed estimate". This block type is being added by another agent; use exactly that shape. If `pnpm tsc` complains that "cta" is not a ContentBlock type yet, leave it in anyway and say so in your report.
- **End with a short, natural closing section.** It must not be headed "Conclusion"; use a question like "So what should you do first?". It links to the most relevant service page and gives the booking or contact link once.

**Links (inline `[label](href)` syntax, only inside `p` and list items; headings, tldr, takeaways and FAQ are plain text):**
- 3 to 6 internal links:
  - 1 to 3 to the most relevant service pages, with descriptive anchors (e.g. "[custom e-commerce development](/services/ecommerce-development)").
  - Existing or sibling posts where relevant.
  - `/contact` or the booking link once.
- **Cite every external number inline** with a link to the primary source ("Stripe's [2026 pricing page](https://stripe.com/pricing) lists…"). 4 to 10 external citations is normal. Only cite URLs you opened and checked yourself or that the brief verified.
- Never link the same URL twice in one paragraph. Avoid more than 2 links in one paragraph.

**Other gotchas in the data model:**
- Block text is used as a React key, so **no two blocks in a post may have identical text**, and no two list items in one list may be identical.
- The only inline markup is `[label](href)` (no bold, no italics, no markdown headings inside text).
- Straight quotes in TypeScript strings: use double-quoted strings and escape inner double quotes, or use a typographic apostrophe (’) inside text. Match the existing posts' style: they use plain ' inside double-quoted strings.

---

## 4. Original visuals (GEO loves original diagrams)

Make **4 to 6 original SVG charts or diagrams** per post, plus the cover. Put them in `public/blog/<slug>/`.

**House style** (copy the look of `public/blog/how-to-choose-a-software-development-company/selection-process.svg`):
- `viewBox="0 0 1280 720"`, a white rounded background (`<rect width="1280" height="720" rx="24" fill="#ffffff"/>`).
- Title at top left (font-size about 40, weight 700, ink `#0e0b24`) with a subtitle (24, `#4a4766`).
- `font-family="Inter, Segoe UI, Helvetica, Arial, sans-serif"`.
- Palette: ultra `#3b2bff`, plasma `#ff4da6`, sun `#ffd23f`, lilac `#cfc4ff`, coral `#ff6b3d`, ink `#0e0b24`, muted `#4a4766`, light lines `#e4e4e7`, frost `#F1F2F7`. **No green, no dark backgrounds.**
- Text must be at least 18px in the 1280 viewBox (readable on phones).
- Escape `&` as `&amp;` and `<` as `&lt;`. No external fonts or images. No em dashes. Keep each file under about 15 KB.

**What makes a good visual:**
- Comparison bars, timelines, decision trees, flow diagrams, cost stacks, checklists or matrices.
- Every number on a chart must come from a cited source (name it in the caption: "Source: …") or be labelled "Illustrative" / "Arrowbin estimate".
- Don't make charts that just restate a sentence; each one must show something faster than the text could.

**How it renders:** add each one as a body block, `{ type: "image", image: { src: "/blog/<slug>/<name>.svg", alt, caption, width: 1280, height: 720 } }`.
- **Alt text:** specific and keyword-aware (what the chart shows and its key takeaway).
- **Caption:** one short line plus the source.
- **Spacing:** roughly one visual every 400 to 600 words.

**Check your SVGs visually** by rendering a PNG preview with sharp and viewing it with the Read tool:

```
node -e "require('sharp')('public/blog/<slug>/<name>.svg').png().toFile(process.env.TEMP + '/<name>.png')"
```

Fix overlaps, clipped text and anything that looks clumsy.

---

## 5. Cover image

The cover is required. It shows on /blog cards, the article banner and social shares. The founder prefers realistic product mockups to abstract art.

- Draw a 1280x720 SVG **UI or product mockup relevant to the topic**, in the brand palette:
  - Examples: a browser window showing a checkout with bKash and Nagad buttons; a phone showing an app; a code editor beside a deploy log; a dashboard; an AI chat panel.
  - Background: frost `#F1F2F7`, or a soft gradient of the brand colours. Shapes must be clean, with realistic UI chrome (window dots, address bar, buttons, cards).
  - **Minimal text**: UI labels only. No post title baked in, and no paragraph text.
- Save the source as `public/blog/<slug>/cover.svg`, then convert it to `public/blog/<slug>/cover.webp`:

```
node -e "require('sharp')('public/blog/<slug>/cover.svg').resize(1280,720).webp({quality:86}).toFile('public/blog/<slug>/cover.webp')"
```

  Keep the .svg next to it as the editable source.
- In the post, set `image: { src: "/blog/<slug>/cover.webp", alt, width: 1280, height: 720 }`. The alt text describes the mockup and ties it to the topic.
- View the .webp with the Read tool and iterate until it looks like something a designer would ship.

---

## 6. The file you write

Write one post to `src/lib/posts/<slug>.ts`:

```ts
import type { Post } from "@/lib/blog";

const DIR = "/blog/<slug>";

export const post: Post = {
  slug: "<slug>",
  title: "...",
  description: "...",
  keywords: ["...", "..."],
  date: "2026-10-15",
  dateLabel: "October 15, 2026",
  author: "Md. Shishir Ahmed",
  readingTime: "12 min read",
  category: "Guides",
  excerpt: "...",
  image: { src: `${DIR}/cover.webp`, alt: "...", width: 1280, height: 720 },
  tldr: "...",
  body: [ /* blocks */ ],
  takeaways: [ "..." ],
  faqs: [ { question: "...", answer: "..." } ],
};
```

- Do **not** edit `src/lib/posts/index.ts`. The lead registers posts.
- After writing, run:
  - `pnpm tsc --noEmit -p .` (fix errors in your file; ignore other files),
  - `pnpm biome check --write src/lib/posts/<slug>.ts`,
  - `grep -nP '\x{2014}' src/lib/posts/<slug>.ts public/blog/<slug>/*.svg` (must print nothing).

---

## 7. Self-check before you report

- [ ] TL;DR answers the title question in the first sentence, with the key number or verdict.
- [ ] Every H2 is a question and opens with a direct answer.
- [ ] Every external number has a working source link, and you opened every source.
- [ ] No invented anecdotes, client results, prices for Arrowbin or awards.
- [ ] 4 to 6 SVG visuals plus the cover; all viewed, all on-palette, no green.
- [ ] 3 to 6 internal links, including at least one service page; 1 cta block.
- [ ] Zero em dashes, and none of the banned words or shapes in section 2.
  - Search the file for: delve, landscape, crucial, robust, seamless, leverage, furthermore, moreover, "it's important", "in today's", tapestry, pivotal, "not just".
- [ ] Read the whole post aloud in your head once. Rewrite any sentence that sounds like a brochure.
- [ ] Run the linter and fix every HARD and WARN line:
  `python -I docs/seo/13-sprint-2026-10-15/tools/ai_tells.py src/lib/posts/<slug>.ts`
  - It flags em dashes, banned words, formula phrases, flat sentence rhythm, "X, Y and Z" triplet overuse and too few contractions.
  - Aim for a sentence-length spread (sd) of 8 or more, at least 15% short sentences (8 words or fewer), and under 4 triplets per 1,000 words.
