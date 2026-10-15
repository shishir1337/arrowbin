#!/usr/bin/env bash
# Post-deploy gate for arrowbin.com (FIX-PLAN.md, "Deployed and verified" rule).
# A fix only counts as done when its check here passes against production.
#
# Usage:  bash docs/seo/12-audit-2026-10-14/verify-live.sh [base-url]
#         default base-url: https://arrowbin.com   (use http://localhost:3117 for a local prod build)
# Exit code = number of failed checks. Needs curl and python (stdlib only).

BASE="${1:-https://arrowbin.com}"
FAIL=0
pass() { printf '  PASS  %s\n' "$1"; }
fail() { printf '  FAIL  %s\n' "$1"; FAIL=$((FAIL + 1)); }
code() { curl -s -o /dev/null -m 20 -w '%{http_code}' "$@"; }
loc()  { curl -s -o /dev/null -m 20 -w '%{redirect_url}' "$@"; }
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

echo "Checking $BASE"

echo "1. Titles and H1 text (raw HTML)"
curl -s -m 20 "$BASE/" > "$TMP/home.html"
grep -q "<title>Software Development Company for Startups &amp; SMBs | Arrowbin</title>" "$TMP/home.html" \
  && pass "home title" || fail "home title is not the new one"
while IFS='|' read -r p want; do
  curl -s -m 20 "$BASE$p" > "$TMP/p.html"
  h1=$(python -I -c 'import re,sys,html;s=open(sys.argv[1],encoding="utf8").read();m=re.search(r"<h1[^>]*>(.*?)</h1>",s,re.S);print(" ".join(html.unescape(re.sub(r"<[^>]+>","",m.group(1))).split()) if m else "")' "$TMP/p.html")
  [ "$h1" = "$want" ] && pass "$p H1: $h1" || fail "$p H1 is '$h1' (want '$want')"
done <<'H1S'
/services|Software development services
/services/custom-software-development|Custom Software Development
/work|Built. Shipped. Live.
/about|We build it like it's ours.
/contact|Tell us what you're building.
/blog|Read before you build.
H1S

echo "2. Homepage text inside <main> (needs > 1,000 words)"
words=$(python -I -c 'import re,sys;s=open(sys.argv[1],encoding="utf8").read();m=re.search(r"<main[^>]*>(.*?)</main>",s,re.S);t=re.sub(r"<script.*?</script>|<style.*?</style>","",m.group(1) if m else "",flags=re.S);print(len(re.sub(r"<[^>]+>"," ",t).split()))' "$TMP/home.html")
[ "${words:-0}" -gt 1000 ] && pass "home <main> words: $words" || fail "home <main> words: $words"

echo "3. Hidden streamed blocks (Suspense) on key pages (target 0)"
for p in / /services /services/custom-software-development /about /blog; do
  n=$(curl -s -m 20 "$BASE$p" | grep -o '<div hidden id="S:' | wc -l | tr -d ' ')
  [ "$n" = "0" ] && pass "$p hidden blocks: 0" || fail "$p hidden blocks: $n"
done

echo "4. Manifesto words not doubled"
grep -q '>We</span><span aria-hidden="true"[^>]*>We<' "$TMP/home.html" && fail "manifesto still doubles words" || pass "manifesto single text"

echo "5. Legacy redirects (308/301) and dead paths (410)"
for pair in "/contact-us:/contact" "/portfolio:/work" "/about-us:/about" "/refund:/terms" "/services/web-development:/services/custom-software-development"; do
  from="${pair%%:*}"; to="${pair#*:}"
  c=$(code "$BASE$from"); l=$(loc "$BASE$from")
  { [ "$c" = "308" ] || [ "$c" = "301" ]; } && [ "${l%/}" = "$BASE$to" ] && pass "$from -> $to ($c)" || fail "$from gave $c $l"
done
for p in /explore /products5070048.html /products/ultimate-seo-optimizer /become-seller; do
  c=$(code "$BASE$p"); [ "$c" = "410" ] && pass "$p 410" || fail "$p gave $c (want 410)"
done
c=$(code "$BASE/?channel=5f1f69&name=LARRY"); [ "$c" = "308" ] || [ "$c" = "301" ] && pass "?channel= spam redirects ($c)" || fail "?channel= spam gave $c"

echo "6. Basics"
[ "$(code "$BASE/favicon.ico")" = "200" ] && pass "favicon.ico 200" || fail "favicon.ico not 200"
curl -s -I -m 20 "$BASE/" | grep -qi '^x-powered-by' && fail "X-Powered-By header present" || pass "no X-Powered-By"
curl -s -m 20 "$BASE/robots.txt" | grep -q "Claude-SearchBot" && pass "robots lists Claude-SearchBot" || fail "robots missing Claude-SearchBot"
curl -s -m 20 "$BASE/" | grep -q "linkedin.com/in/arrowbinllc" && fail "placeholder LinkedIn still in HTML" || pass "no placeholder LinkedIn"
c=$(curl -s -m 20 "$BASE/contact" | grep -o '"@type":"ProfessionalService"' | wc -l | tr -d ' ')
[ "$c" -le 1 ] && pass "/contact ProfessionalService nodes: $c" || fail "/contact ProfessionalService nodes: $c"
curl -s -m 20 "$BASE/this-page-does-not-exist-xyz" | grep -q 'rel="canonical"' && fail "404 page outputs a canonical" || pass "404 page has no canonical"

echo "9. AI-readable files (added 15 Oct sprint)"
curl -s -m 20 "$BASE/llms.txt" > "$TMP/llms.txt"
grep -q "Md. Shishir Ahmed" "$TMP/llms.txt" && grep -q "/services" "$TMP/llms.txt" && grep -q "/blog/" "$TMP/llms.txt" \
  && pass "llms.txt names the founder and links hubs and posts" || fail "llms.txt missing founder, /services or /blog/ links"
[ "$(code "$BASE/llms-full.txt")" = "200" ] && pass "llms-full.txt 200" || fail "llms-full.txt not 200"
curl -s -m 20 "$BASE/.well-known/security.txt" | grep -q "^Contact:" && pass "security.txt has Contact" || fail "security.txt missing or no Contact"
curl -s -m 20 "$BASE/robots.txt" > "$TMP/robots.txt"
grep -qi "Content-Signal" "$TMP/robots.txt" && pass "robots.txt states a content signal" || fail "robots.txt has no content signal"
bad=$(grep -v '^\s*#' "$TMP/robots.txt" | grep -v '^\s*$' | grep -viE '^(user-agent|allow|disallow|sitemap|crawl-delay):' | wc -l | tr -d ' ')
[ "$bad" = "0" ] && pass "robots.txt has no unknown directives" || fail "robots.txt has $bad unknown directive lines (Lighthouse marks it invalid)"

echo "10. og:url matches the page, og:locale present"
for p in / /services /services/ecommerce-development /work /about /contact /blog /privacy /terms; do
  curl -s -m 20 "$BASE$p" > "$TMP/og.html"
  og=$(python -I -c 'import re,sys;s=open(sys.argv[1],encoding="utf8").read();m=re.search(r"<meta property=\"og:url\" content=\"([^\"]*)\"",s);print(m.group(1) if m else "")' "$TMP/og.html")
  want="https://arrowbin.com$p"; [ "$p" = "/" ] && want="https://arrowbin.com"
  { [ "${og%/}" = "${want%/}" ]; } && pass "$p og:url $og" || fail "$p og:url is '$og' (want $want)"
  grep -q 'property="og:locale"' "$TMP/og.html" || fail "$p has no og:locale"
done

echo "11. Unknown slugs return 404"
for p in /services/not-a-service /blog/not-a-post; do
  c=$(code "$BASE$p"); [ "$c" = "404" ] && pass "$p 404" || fail "$p gave $c (want 404)"
done

echo "12. Every sitemap URL returns 200 and has no hidden streamed blocks or em dashes in visible text"
curl -s -m 20 "$BASE/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -e 's#<loc>##' -e 's#</loc>##' > "$TMP/locs.txt"
n=$(wc -l < "$TMP/locs.txt" | tr -d ' '); [ "$n" -ge 15 ] && pass "sitemap lists $n URLs" || fail "sitemap lists only $n URLs"
posts=$(grep -c '/blog/.' "$TMP/locs.txt"); [ "$posts" -ge 8 ] && pass "sitemap lists $posts blog posts" || fail "sitemap lists $posts blog posts (want 8+)"
while read -r u; do
  path="${u#https://arrowbin.com}"; [ -z "$path" ] && path="/"
  c=$(curl -s -o "$TMP/s.html" -m 30 -w '%{http_code}' "$BASE$path")
  [ "$c" = "200" ] || { fail "$path gave $c"; continue; }
  h=$(grep -o '<div hidden id="S:' "$TMP/s.html" | wc -l | tr -d ' ')
  d=$(python -I -c 'import re,sys;s=open(sys.argv[1],encoding="utf8").read();s=re.sub(r"<script.*?</script>|<style.*?</style>","",s,flags=re.S);t=re.sub(r"<[^>]+>"," ",s);print(t.count(chr(8212))+t.count("&mdash;")+t.count("&#8212;"))' "$TMP/s.html")
  { [ "$h" = "0" ] && [ "$d" = "0" ]; } && pass "$path ok" || fail "$path hidden blocks: $h, em dashes: $d"
done < "$TMP/locs.txt"

if [ "$BASE" = "https://arrowbin.com" ]; then
  echo "7. AI crawler access at the Cloudflare edge (official user agents, all should be 200)"
  while IFS='|' read -r name ua; do
    c=$(code -A "$ua" "$BASE/"); [ "$c" = "200" ] && pass "$name 200" || fail "$name $c"
  done <<'UAS'
GPTBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.3; +https://openai.com/gptbot
OAI-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.3; +https://openai.com/searchbot
ChatGPT-User|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot
ClaudeBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)
Claude-SearchBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Claude-SearchBot/1.0; +https://www.anthropic.com)
PerplexityBot|Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)
CCBot|CCBot/2.0 (https://commoncrawl.org/faq/)
UAS
  echo "8. Host redirects (one hop each)"
  for u in http://arrowbin.com/ https://www.arrowbin.com/ http://www.arrowbin.com/; do
    hops=$(curl -s -o /dev/null -L -m 20 -w '%{num_redirects}' "$u")
    [ "$hops" = "1" ] && pass "$u 1 hop" || fail "$u $hops hops"
  done
fi

echo
[ "$FAIL" = "0" ] && echo "ALL CHECKS PASSED" || echo "$FAIL CHECK(S) FAILED"
exit "$FAIL"
