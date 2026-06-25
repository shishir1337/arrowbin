// Build-time blur generation. Runs in plain Node (where sharp loads correctly),
// NOT inside the Next/Turbopack build runtime, which can't dlopen sharp on this
// platform. Scans public/ for raster images and writes a base64 blur for each to
// src/lib/blur-manifest.json, keyed by public-relative path (with leading slash).
// Wired as the `prebuild` npm script so it refreshes on every build.
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPlaiceholder } from "plaiceholder";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(ROOT, "src", "lib", "blur-manifest.json");
const EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXT.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const files = (await walk(PUBLIC)).sort();
const manifest = {};
for (const file of files) {
  const key = `/${path.relative(PUBLIC, file).split(path.sep).join("/")}`;
  try {
    const { base64 } = await getPlaiceholder(await readFile(file));
    manifest[key] = base64;
  } catch (err) {
    console.warn(`blur skip ${key}: ${err.message}`);
  }
}

await writeFile(OUT, `${JSON.stringify(manifest, null, 0)}\n`);
console.log(
  `Generated ${Object.keys(manifest).length} blur placeholders -> ${path.relative(ROOT, OUT)}`,
);
