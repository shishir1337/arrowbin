// Tell IndexNow search engines (Bing, Yandex, Seznam, Naver; Bing's index also
// feeds ChatGPT search and Copilot) that URLs changed, so they recrawl in hours
// instead of weeks. Run it AFTER a deploy, never before: the key file must be
// live at https://arrowbin.com/<key>.txt or the ping is rejected.
//
//   node scripts/indexnow.mjs              # every URL in the live sitemap
//   node scripts/indexnow.mjs /blog/a /x   # only these paths
//   node scripts/indexnow.mjs --dry-run    # print what would be sent
//
// Google does not use IndexNow; use Search Console for Google.
const HOST = "arrowbin.com";
const KEY = "153b8750f638c8c3ef93f06a89168199"; // public/<KEY>.txt holds the same value
const ORIGIN = `https://${HOST}`;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const paths = args.filter((a) => a.startsWith("/"));

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const keyRes = await fetch(`${ORIGIN}/${KEY}.txt`);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
if (keyBody !== KEY) {
  console.error(
    `Key file ${ORIGIN}/${KEY}.txt is not live (status ${keyRes.status}). Deploy first.`,
  );
  process.exit(1);
}

const urlList = paths.length
  ? paths.map((p) => `${ORIGIN}${p}`)
  : await sitemapUrls();

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

if (dryRun) {
  console.log(JSON.stringify(body, null, 2));
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
// 200 = accepted, 202 = accepted and key validation pending.
console.log(
  `IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`,
);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}
