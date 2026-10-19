# Social posts

Folders go platform → week (Monday to Sunday) → type. Each week has a `PLAN.md` that says what goes out on which day and how to post it.

```
posts/
  facebook/
    week-01_2026-10-19/
      PLAN.md
      posts/         feed posts: image + caption .txt
      reels/         videos (.mp4), cover image, caption .txt
      stories/       story images
      group-posts/   group post text + image, link for the first comment
    week-02_2026-10-26/ ...
  instagram/
    week-01_2026-10-19/
      PLAN.md        includes the alt text for each post
      posts/
      stories/
    week-02_2026-10-26/ ...
```

| Folder | Status |
|---|---|
| `facebook/` | Posts 1–12 scheduled (19 Oct to 13 Nov 2026). Week 1 challenge items ready to schedule. |
| `instagram/` | Ready; schedule once the account is recovered. |

## Every week

Meta sets a new weekly challenge (for week 1: 5 posts, 5 reels, 5 stories and 5 group posts on Facebook, plus 5 posts and 5 stories on Instagram).

1. On Monday, check the new challenge in Meta Business Suite.
2. Tell Claude the numbers.
3. Claude fills that week's folders from the blog articles: images, reels, captions and `PLAN.md`.
4. Schedule everything from `PLAN.md`. Group posts are posted by hand.

How the files are made is in `../make/README.md`.

## Rules

- Every fact in a post comes from the Arrowbin article it links to. If an article changes, update the posts that quote it in every folder.
- Each day uses one topic across the post, reel, story and group post, so the same message reaches people in every format.
- No em dashes. The public name is "Arrowbin".
- The blog articles are live on arrowbin.com/blog (source: `src/lib/blog.ts` and `src/lib/posts/`).
