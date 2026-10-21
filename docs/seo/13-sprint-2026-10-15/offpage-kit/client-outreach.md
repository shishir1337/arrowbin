# Client outreach: footer credits and Clutch reviews

Three asks, in this order:
1. **Footer credit** (FIX-PLAN P4.1): a small "Designed & built by Arrowbin" link in each client's site footer.
2. **Clutch review** (FIX-PLAN P4.2): an honest review on Clutch, once you have claimed the profile (P1.3).
3. **One follow-up** a week later if there's no reply. Then stop.

Send ask 1 first. Send ask 2 a few days later, after the Clutch profile is claimed and corrected. If you talk to a client often, you can put both in one message (the combined WhatsApp version below does that).

## Ground rules (read once)

- **No incentives, ever.** Don't offer a discount, free work, a free audit, a gift or payment for a review or for a link. Google's review policy bans "payment, discounts, free goods and/or services" in exchange for a review (https://support.google.com/business/answer/2622994). Google's spam policy lists "exchanging goods or services for links" as link spam (https://developers.google.com/search/docs/essentials/spam-policies). That rules out the "offer a free speed audit as thanks" idea in the older `09-links/link-opportunities.csv`.
- **The credit is the client's choice.** Never make it a condition of a contract or a discount. Google's spam policy also lists "requiring a link as part of a Terms of Service, contract, or similar arrangement".
- **Branded anchor text only:** "Arrowbin", the display name. Never a keyword anchor like "best software company in Dhaka". Google's spam policy lists "widely distributed links in the footers or templates of various sites" as link spam, so keep this to your real clients, with a plain branded credit.
- **Ask every client, not only the happiest ones.** Google bans asking only happy customers ("selectively solicit positive reviews"). Ask for an honest review and mean it.
- **Never write or edit the review for them.** Clutch requires the client to complete it.
- **Quotes on arrowbin.com need written permission.** If a client agrees, you can swap a placeholder testimonial for their real words (FIX-PLAN P3.9). Never add review stars or rating markup to the site.

## Where each client stands (homepages re-checked 21 Oct 2026; first check 14 Oct in `docs/seo/12-audit-2026-10-14/backlinks.md`)

| Client | Site | Credit now | Ask |
|---|---|---|---|
| Silent Lifestyle BD | silentlifestylebd.com | none live yet (founder: deploy due in a few days) | check after deploy, then review |
| FlexOver BD | www.flexoverbd.com | none live yet (founder: deploy due in a few days) | check after deploy, then review |
| North Bengal Agro Farms | nbafl.net | yes: "Designed & built by Arrowbin", followed link to arrowbin.com | review only |
| Maneel Club | maneelclub.com | yes: followed link "Arrowbin" to arrowbin.com | review only |
| Brandingly | brandingly.agency | still HTML comment and JSON-LD only ("Arrowbin LLC"), no visible link | turn the comment into a visible link, then review |
| গ তে গয়না | gtegoyna.com.bd | yes: "Designed & built by Arrowbin", link to arrowbin.com | review |
| YT Shop India | ytshopindia.com | none | footer credit, then review |
| OutNet | outnet.it.com | yes: "Designed & built by Arrowbin", followed link to arrowbin.com (live 21 Oct, in the server HTML) | review |

**If you still maintain a client's code:** ask first, and once they say yes, add the credit yourself (FIX-PLAN P4.1). Don't add it without a clear yes.

**[FOUNDER: fill in each contact's first name and best channel (email or WhatsApp).]**

---

## A. Footer credit request (email)

**Subject:** A small credit on [site]?

> Hi [first name],
>
> [personal opener from the list below]
>
> I have a small favour to ask. Would you be happy to add a one-line credit to your site footer, something like "Designed & built by Arrowbin", linking to arrowbin.com? It's a normal thing for a site's developer to ask for, and it helps people who like your site find out who built it.
>
> It's completely your call. If it doesn't fit your design, or you'd rather not, that's fine and nothing changes on our side.
>
> If you say yes, [we can add it for you this week / your developer can paste the snippet below]. It's one line, styled to match your footer:
>
> `Designed & built by <a href="https://arrowbin.com/">Arrowbin</a>`
>
> Thanks either way,
> Shishir
>
> Md. Shishir Ahmed
> Founder, Arrowbin
> https://arrowbin.com

Notes:
- Keep the link as a normal link (no `rel="nofollow"` needed, but if the client's developer adds it, don't argue).
- `target="_blank" rel="noopener noreferrer"` is fine; the two existing credits use exactly that.
- New credits say "Arrowbin". "Arrowbin LLC" is the legal name and only belongs in legal-name fields. The two existing credits (nbafl.net, maneelclub.com) say "Arrowbin LLC"; leave them as they are rather than asking those clients for a change.

### Personal openers (one per client)

Use one or two sentences. Facts come from the /work page only; don't add numbers or results.

- **Silent Lifestyle BD:** "I was looking at the Silent Lifestyle storefront again this week. The cash-on-delivery ordering with phone confirmation is still one of my favourite builds, because it fits how your customers actually like to buy."
- **FlexOver BD:** "I had another look at the FlexOver store recently. Moving all those categories (fashion, gadgets, home and beauty) off WordPress and onto Next.js was a big job, and I'm glad to see it running."
- **North Bengal Agro Farms:** "Thank you for keeping the 'Designed & built by' credit on nbafl.net. It really does help us." (No credit ask. Go straight to the review request in section B.)
- **Maneel Club:** "Thank you for keeping our credit in the Maneel Club footer. I still like how quickly the store works on a phone." (No credit ask. Go straight to section B.)
- **Brandingly:** "When we rebuilt brandingly.agency on Next.js, we left a credit for Arrowbin in the code as an HTML comment, but visitors can't see it. Would you be open to making it a small visible line in the footer instead? If a visible credit doesn't suit an agency site, a mention on your partners or about page works too, or nothing at all."
- **গ তে গয়না:** "I was on the গ তে গয়না store this week. The mobile-first checkout we built for your handcrafted pieces is holding up well, and it's still quick on a phone."
- **YT Shop India:** "I had another look at YT Shop India recently. The verified listings and the secure payment flow were the parts we spent the most care on, and they're holding up well."
- **OutNet:** "I was on the OutNet site this week. Rebuilding it from WordPress on Next.js so it works as your portfolio and your lead source was a project I enjoyed. If a visible developer credit doesn't suit an agency site, a mention on your about page is just as welcome, or nothing at all."

Before you send, open the site and check each opener is still true. If something isn't (for example, someone else did the checkout), cut it.

---

## B. Clutch review request (email)

Send after the Clutch profile is claimed. Submit the client as a reference in the Clutch dashboard on the same day, so Clutch's invitation arrives while your email is fresh.

**Subject:** Would you review our work on Clutch?

> Hi [first name],
>
> [one-line opener, or "Thanks again for working with us on [site]."]
>
> I'd like to ask a favour. We're building up our profile on Clutch, a site where companies review the developers they've hired, and an honest review from you would help other founders decide whether we're a good fit.
>
> How it works:
> - Clutch will email you an invitation in the next few days. You fill in a short online form (it may ask you to sign in with LinkedIn or a work email so it can check you're a real client). On some plans Clutch offers a short phone call with one of its staff instead.
> - It covers five things: your business, what you needed, what we did, how it turned out, and ratings for quality, schedule, cost and whether you'd refer us. You can keep the project cost private.
> - It should take about 15 minutes.
>
> Please be honest, including anything we could have done better. That is more useful to us, and to anyone reading, than a perfect score.
>
> There's nothing in it for you except my thanks, and I understand completely if you'd rather not.
>
> One more, optional: if you're happy for us to quote a line from your review on arrowbin.com, just reply "yes". I'll show you the exact words before anything goes up.
>
> Thanks,
> Shishir

The five parts come from Clutch's own help article on review structure (https://help.clutch.co/en/knowledge/clutch-review-structure-references). The 15 minutes is our estimate, not Clutch's.

### Who to ask for reviews

Goal (FIX-PLAN P4.2): 3 reviews by week 6, 7 by day 90.

| Client | Status | Contact |
|---|---|---|
| Silent Lifestyle BD | live portfolio | [FOUNDER] |
| FlexOver BD | live portfolio | [FOUNDER] |
| North Bengal Agro Farms | live portfolio | [FOUNDER] |
| Maneel Club | live portfolio | [FOUNDER] |
| Brandingly | live portfolio | [FOUNDER] |
| গ তে গয়না | live portfolio | [FOUNDER] |
| YT Shop India | removed from the site 16 Oct 2026 (founder request); footer credit only | [FOUNDER] |
| OutNet | live portfolio | [FOUNDER] |
| Sikkhon, Dizishore, Rize Capital, Vellio Properties, Khaza Confectionery, ABC Tiles, Hatch Apps | past clients listed on /work | [FOUNDER: who is still reachable?] |

Clutch takes one review per client company.

---

## C. Follow-up (send once, 7 days later, then stop)

**Subject:** Re: [original subject]

> Hi [first name],
>
> Just bumping this in case it got buried. No pressure at all; if now's a bad time, or it's a no, that's completely fine.
>
> Shishir

If there's still no reply after the follow-up, leave it. Don't chase a third time.

---

## D. WhatsApp versions (for Bangladeshi clients)

Write these in Bangla if that's how you normally talk to the client. Keep the same points: what you're asking, that it's optional, and that nothing is offered in return.

**Footer credit**

> Hi [name], Shishir from Arrowbin here. Small favour: would you be OK with a one-line "Designed & built by Arrowbin" link in your site footer? Totally optional, and no problem if not. If yes, I can add it myself this week.

**Clutch review**

> Hi [name], one more small request. We're collecting reviews on Clutch (a site where businesses review their developers). Could you leave an honest one? Clutch will email you a short form, about 15 minutes. Good or bad, honest is what helps. No problem if you'd rather not.

**Both in one (for clients you talk to often)**

> Hi [name], Shishir from Arrowbin. Two small, optional requests: (1) a one-line "Designed & built by Arrowbin" link in your site footer (I can add it), and (2) an honest review on Clutch, about 15 minutes, Clutch will email you the form. Either, both or neither is fine. Thank you!

**Follow-up**

> Hi [name], just checking you saw my message about the footer credit and Clutch review. No pressure at all.

---

## E. After a yes

1. **Credit added:** open the client's homepage, view the source, and check the link is a plain `<a href="https://arrowbin.com/">` (not inside a comment, not `nofollow` unless they chose it). Note the date in the tracking table in `README.md`.
2. **Review agreed:** submit them as a reference in the Clutch dashboard the same day.
3. **Quote agreed:** save their written "yes" (email or WhatsApp screenshot) before dev puts their words on the site.
4. **Thank them** once it's done. A short "thank you, I saw it go up" is enough.
