# PHP2Shell guide, 25 October 2026

The founder asked for an in-depth post on the October 2026 PHP vulnerabilities: what happened, how to check a site, how to fix it, and how to tell if it was hacked. Readers are expected to follow it step by step.

- **Post:** `src/lib/posts/php2shell-php-vulnerability-check-and-fix.ts`, at `/blog/php2shell-php-vulnerability-check-and-fix`.
- **Visuals:** `public/blog/php2shell-php-vulnerability-check-and-fix/`, a cover plus 6 SVG charts.

## Who it is for

The post is written for owners of PHP sites: WordPress, WooCommerce, Laravel, Drupal and similar. Those owners are people who might hire Arrowbin for maintenance or hosting, so the post keeps to the "buyers, not developers" rule. The server commands are included for whoever looks after the site.

The calls to action point to `/services/maintenance-support`, `/services/cloud-devops-hosting` and `/contact`.

## What changed outside the post

- **New `code` block type on the blog:**
  - `src/lib/blog.ts` defines the block, with optional `label` and `wrap`.
  - `src/components/blog/PostBody.tsx` renders it with a Copy button (`src/components/blog/CopyCode.tsx`).
  - Body prose now also supports `` `inline code` `` (backticks), in paragraphs and list items only.
- **Fixes in `PostBody.tsx`:** table cards on phones now wrap long values, such as package versions, instead of making the page scroll sideways. The code-block label also wraps.
- **New `copy` icon** in `src/components/ui/Icon.tsx`.
- **Inbound links** from two posts:
  - `software-maintenance-cost` (the "Why does software need maintenance" answer)
  - `wordpress-to-nextjs-migration` (the Patchstack security paragraph)
- **Related guides:** the post is added to the guide cards on the cloud and maintenance service pages, in `src/lib/services.ts`.
- **llms.txt:** the blog line now mentions the topic.
- **Registered** in `src/lib/posts/index.ts`.

## How the sources were checked

Three research passes collected primary sources: php.net, the PHP GitHub advisories, the PHP Foundation, NVD, CISA and the distribution advisories, followed by the vendors and hosts. Every external link in the post returned HTTP 200 on 25 Oct 2026.

Points where sources disagree are written as disagreements in the post, not settled:
- whether attacks have succeeded;
- which versions are affected;
- the CVSS score (9.2 vs 10).

## Update the post when

- **PHP ships its next regular release.** It fixes CVE-2026-115560. Add the version numbers and the date, and set `updated` on the post.
- **Red Hat ships the RHEL 9 php:8.4 stream fix.** It was not out on 23 Oct.
- **CISA adds either CVE to the KEV catalog.** Neither was listed as of 23 Oct.
- **The SimpleXML regression fix ships.** This is php-src PR #24494, tracked at codeberg.org/oerdnj/deb.sury.org/issues/152.
- **Exploitation status changes.** For example, a confirmed mass campaign.

## Not done

- Not committed or deployed. The founder decides when.
- IndexNow and Search Console requests: do these after the deploy.
